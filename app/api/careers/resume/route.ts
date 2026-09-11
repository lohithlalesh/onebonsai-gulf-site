import {
  createOpaqueToken,
  getCareerBindings,
  isoAfter,
  json,
  MAX_RESUME_BYTES,
  notifyCareerResume,
  sha256,
  type CareerApplicationRow,
} from "../_shared";

function safeFileName(value: string) {
  return value.replace(/[^a-zA-Z0-9._ -]/g, "").slice(0, 120) || "resume.pdf";
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  const step = 16_384;
  for (let index = 0; index < bytes.length; index += step) {
    binary += String.fromCharCode(...bytes.subarray(index, index + step));
  }
  return btoa(binary);
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_RESUME_BYTES + 80_000) return json({ success: false, error: "The PDF must be 5 MB or smaller." }, 413);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ success: false, error: "Invalid upload." }, 400);
  }

  const applicationId = String(form.get("applicationId") ?? "");
  const uploadToken = String(form.get("uploadToken") ?? "");
  const consent = form.get("consent") === "true";
  const resume = form.get("resume");
  if (!applicationId || !uploadToken || !consent || !(resume instanceof File)) {
    return json({ success: false, error: "Choose a résumé and confirm the privacy notice." }, 400);
  }
  if (resume.size <= 0 || resume.size > MAX_RESUME_BYTES) return json({ success: false, error: "The PDF must be 5 MB or smaller." }, 413);
  if (resume.type !== "application/pdf" || !resume.name.toLowerCase().endsWith(".pdf")) {
    return json({ success: false, error: "Upload a PDF résumé." }, 415);
  }

  const bytes = await resume.arrayBuffer();
  const signature = new TextDecoder().decode(bytes.slice(0, 5));
  if (signature !== "%PDF-") return json({ success: false, error: "This file is not a valid PDF." }, 415);

  try {
    const bindings = await getCareerBindings();
    const application = await bindings.DB.prepare(
      `SELECT id, name, linkedin, work_url, locale, status, assignment_json, previous_question_ids_json,
              attempt_count, best_score, upload_token_hash, upload_token_expires_at, resume_key
       FROM career_applications WHERE id = ?`,
    ).bind(applicationId).first<CareerApplicationRow>();
    if (!application) return json({ success: false, error: "Application not found." }, 404);
    if (application.resume_key) return json({ success: false, error: "A résumé has already been received." }, 409);
    if (!application.upload_token_hash || !application.upload_token_expires_at || new Date(application.upload_token_expires_at).getTime() < Date.now()) {
      return json({ success: false, error: "The upload window expired. Restart the application." }, 401);
    }
    if ((await sha256(uploadToken)) !== application.upload_token_hash) return json({ success: false, error: "Invalid upload token." }, 401);

    const monthlyUploads = await bindings.DB.prepare(
      "SELECT COUNT(*) AS count FROM career_applications WHERE resume_uploaded_at >= datetime('now', 'start of month')",
    ).first<{ count: number }>();
    if ((monthlyUploads?.count ?? 0) >= 200) {
      return json({ success: false, error: "Applications are at capacity for this month. Please contact us through LinkedIn." }, 503);
    }

    const now = new Date();
    const resumeName = safeFileName(resume.name);
    const objectKey = `careers/${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${applicationId}/${crypto.randomUUID()}.pdf`;
    const downloadToken = createOpaqueToken();
    const downloadTokenHash = await sha256(downloadToken);
    const downloadTokenExpiresAt = isoAfter(14 * 24 * 60);

    let storageKey = objectKey;
    if (bindings.RESUMES) {
      await bindings.RESUMES.put(objectKey, bytes, {
        httpMetadata: { contentType: "application/pdf", contentDisposition: `attachment; filename="${resumeName}"` },
        customMetadata: { applicationId, originalName: resumeName },
      });
    } else {
      storageKey = `d1:${applicationId}`;
      const source = new Uint8Array(bytes);
      const chunkSize = 192 * 1024;
      const statements: D1PreparedStatement[] = [];
      for (let index = 0, chunkIndex = 0; index < source.length; index += chunkSize, chunkIndex += 1) {
        const encoded = bytesToBase64(source.subarray(index, index + chunkSize));
        statements.push(bindings.DB.prepare(
          "INSERT INTO career_resume_chunks (id, application_id, chunk_index, data) VALUES (?, ?, ?, ?)",
        ).bind(`${applicationId}:${chunkIndex}`, applicationId, chunkIndex, JSON.stringify(encoded)));
      }
      await bindings.DB.batch(statements);
    }

    await bindings.DB.prepare(
      `UPDATE career_applications
       SET status = 'resume_uploaded', resume_key = ?, resume_name = ?, resume_size = ?, resume_uploaded_at = CURRENT_TIMESTAMP,
           download_token_hash = ?, download_token_expires_at = ?, consent_at = CURRENT_TIMESTAMP,
           upload_token_hash = NULL, upload_token_expires_at = NULL, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
    ).bind(storageKey, resumeName, resume.size, downloadTokenHash, downloadTokenExpiresAt, applicationId).run();

    const downloadUrl = new URL(`/api/careers/resume/${downloadToken}`, request.url).toString();
    let notified = false;
    try {
      notified = await notifyCareerResume(bindings, application, downloadUrl);
    } catch (notificationError) {
      console.error("Career résumé stored but notification failed:", notificationError instanceof Error ? notificationError.message : "Unknown error");
      await bindings.DB.prepare(
        "UPDATE career_applications SET status = 'resume_uploaded_notification_failed', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      ).bind(applicationId).run();
    }

    return json({ success: true, notified });
  } catch (error) {
    console.error("Career résumé upload failed:", error instanceof Error ? error.message : "Unknown error");
    return json({ success: false, error: "We could not store the résumé. Please try again." }, 503);
  }
}
