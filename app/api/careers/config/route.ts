import { json } from "../_shared";

const LOCAL_TEST_SITE_KEY = "1x00000000000000000000AA";

export async function GET(request: Request) {
  const hostname = new URL(request.url).hostname;
  const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
  const runtime = await import("cloudflare:workers");
  const siteKey = (runtime.env as { TURNSTILE_SITE_KEY?: string }).TURNSTILE_SITE_KEY?.trim();

  if (!siteKey && !isLocal) return json({ success: false, error: "Human verification is unavailable." }, 503);
  return json({ success: true, siteKey: siteKey || LOCAL_TEST_SITE_KEY });
}
