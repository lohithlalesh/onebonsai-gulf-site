import { getCareerBindings, sha256 } from "../../_shared";

type DownloadRow = { resume_key: string; resume_name: string; download_token_expires_at: string };

function safeDownloadName(value: string) {
  return value.replace(/["\r\n]/g, "").slice(0, 120) || "resume.pdf";
}

function base64ToBytes(value: string) {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

export async function GET(_request: Request, context: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await context.params;
    if (!/^[a-f0-9]{64}$/.test(token)) return new Response("Not found", { status: 404 });

    const bindings = await getCareerBindings();
    const tokenHash = await sha256(token);
    const record = await bindings.DB.prepare(
      `SELECT resume_key, resume_name, download_token_expires_at
       FROM career_applications WHERE download_token_hash = ? AND resume_key IS NOT NULL`,
    ).bind(tokenHash).first<DownloadRow>();
    if (!record || new Date(record.download_token_expires_at).getTime() < Date.now()) {
      return new Response("This résumé link has expired.", { status: 410, headers: { "Cache-Control": "no-store" } });
    }

    let body: BodyInit;
    let size: number;
    if (record.resume_key.startsWith("d1:")) {
      const result = await bindings.DB.prepare(
        "SELECT data FROM career_resume_chunks WHERE application_id = ? ORDER BY chunk_index ASC",
      ).bind(record.resume_key.slice(3)).all<{ data: string }>() as unknown as { results?: Array<{ data: string }> };
      if (!result.results?.length) return new Response("Not found", { status: 404 });
      const chunks = result.results.map((row) => base64ToBytes(JSON.parse(row.data) as string));
      size = chunks.reduce((total, chunk) => total + chunk.byteLength, 0);
      const merged = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) {
        merged.set(chunk, offset);
        offset += chunk.byteLength;
      }
      body = new Blob([merged], { type: "application/pdf" });
    } else {
      if (!bindings.RESUMES) return new Response("Not found", { status: 404 });
      const object = await bindings.RESUMES.get(record.resume_key);
      if (!object) return new Response("Not found", { status: 404 });
      body = object.body;
      size = object.size;
    }

    return new Response(body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": String(size),
        "Content-Disposition": `attachment; filename="${safeDownloadName(record.resume_name)}"`,
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Career résumé download failed:", error instanceof Error ? error.message : "Unknown error");
    return new Response("Not found", { status: 404 });
  }
}
