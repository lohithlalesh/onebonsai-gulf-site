import type { CareerLocale, QuestionAssignment } from "./question-bank";

export const MAX_RESUME_BYTES = 5 * 1024 * 1024;
export const MAX_ATTEMPTS = 2;

export type CareerApplicationRow = {
  id: string;
  name: string;
  linkedin: string;
  work_url: string | null;
  locale: CareerLocale;
  status: string;
  assignment_json: string;
  previous_question_ids_json: string;
  attempt_count: number;
  best_score: number;
  upload_token_hash: string | null;
  upload_token_expires_at: string | null;
  resume_key: string | null;
};

type CareerBindings = {
  DB: D1Database;
  RESUMES?: R2Bucket;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  ENQUIRY_WEBHOOK_URL?: string;
  ENQUIRY_WEBHOOK_SECRET?: string;
  IP_HASH_SALT?: string;
};

export function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
    },
  });
}

export async function getCareerBindings(): Promise<CareerBindings> {
  const runtime = await import("cloudflare:workers");
  const bindings = runtime.env as unknown as Partial<CareerBindings>;
  if (!bindings.DB) throw new Error("Career storage is not configured.");
  return bindings as CareerBindings;
}

export function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function parseWebUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}

export function isLinkedInUrl(value: string) {
  const url = parseWebUrl(value);
  return Boolean(url && /(^|\.)linkedin\.com$/i.test(url.hostname));
}

export async function parseJsonRequest(request: Request, maxBytes = 12_000) {
  const raw = await request.text();
  if (raw.length > maxBytes) throw new Error("Request too large.");
  const value = JSON.parse(raw) as unknown;
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid request.");
  return value as Record<string, unknown>;
}

export function parseAssignment(value: string): QuestionAssignment {
  const parsed = JSON.parse(value) as unknown;
  if (!Array.isArray(parsed) || parsed.length !== 3) throw new Error("Invalid question assignment.");
  return parsed as QuestionAssignment;
}

export async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function createOpaqueToken(byteLength = 32) {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function verifyTurnstile(request: Request, token: string, secretValue?: string) {
  if (!token) return false;
  const hostname = new URL(request.url).hostname;
  if (hostname === "localhost" || hostname === "127.0.0.1") return true;

  const secret = secretValue?.trim();
  if (!secret) throw new Error("Human verification is not configured.");

  const form = new FormData();
  form.set("secret", secret);
  form.set("response", token);
  const remoteIp = request.headers.get("CF-Connecting-IP");
  if (remoteIp) form.set("remoteip", remoteIp);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function requestIpHash(request: Request, salt: string) {
  const ip = request.headers.get("CF-Connecting-IP") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  return sha256(`${salt}:${ip}`);
}

export function isoAfter(minutes: number) {
  return new Date(Date.now() + minutes * 60_000).toISOString();
}

export async function notifyCareerResume(
  bindings: CareerBindings,
  application: CareerApplicationRow,
  downloadUrl: string,
) {
  const webhookUrl = bindings.ENQUIRY_WEBHOOK_URL?.trim();
  if (!webhookUrl) return false;

  const target = new URL(webhookUrl);
  if (target.protocol !== "https:") throw new Error("The career webhook must use HTTPS.");
  const response = await fetch(target, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(bindings.ENQUIRY_WEBHOOK_SECRET ? { Authorization: `Bearer ${bindings.ENQUIRY_WEBHOOK_SECRET}` } : {}),
    },
    body: JSON.stringify({
      submissionType: "career",
      name: application.name,
      linkedin: application.linkedin,
      work: downloadUrl,
      locale: application.locale,
      to: "ivan@obgulf.com",
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new Error(`Career webhook returned ${response.status}.`);
  const result = (await response.json().catch(() => null)) as { success?: unknown } | null;
  if (!result || result.success !== true) throw new Error("Career webhook rejected the résumé notification.");
  return true;
}
