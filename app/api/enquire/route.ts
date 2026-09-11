const RECIPIENT = "ivan@obgulf.com";
const REQUIREMENTS = new Set([
  "agentic-ai",
  "sovereign-cloud-integration",
  "custom-software",
  "ai-readiness",
  "corporate-academy",
  "tech-catch-up",
  "other",
]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\p{Nd}\s().-]{7,30}$/u;

type Locale = "en" | "ar";

type EnquiryPayload = {
  submissionType: "enquiry";
  name: string;
  email: string;
  phone: string;
  requirement: string;
  locale: Locale;
};

type CareerPayload = {
  submissionType: "career";
  name: string;
  linkedin: string;
  work: string;
  locale: Locale;
};

type IntakePayload = EnquiryPayload | CareerPayload;

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function parseWebUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}

function isLinkedInUrl(value: string) {
  const url = parseWebUrl(value);
  return Boolean(url && /(^|\.)linkedin\.com$/i.test(url.hostname));
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parsePayload(body: Record<string, unknown>): { payload?: IntakePayload; honeypot: string; error?: string } {
  const honeypot = cleanText(body.website, 200);
  const locale: Locale = body.locale === "ar" ? "ar" : "en";
  const name = cleanText(body.name, 120);

  if (name.length < 2) return { honeypot, error: "A full name is required." };

  if (body.submissionType === "career") {
    const linkedin = cleanText(body.linkedin, 500);
    const work = cleanText(body.work, 500);
    if (!isLinkedInUrl(linkedin)) return { honeypot, error: "A valid LinkedIn profile is required." };
    if (work && !parseWebUrl(work)) return { honeypot, error: "The work link is invalid." };
    return { honeypot, payload: { submissionType: "career", name, linkedin, work, locale } };
  }

  const email = cleanText(body.email, 180);
  const phone = cleanText(body.phone, 40);
  const requirement = cleanText(body.requirement, 60);
  if (!email && !phone) return { honeypot, error: "An email or phone number is required." };
  if (email && !EMAIL_PATTERN.test(email)) return { honeypot, error: "The email address is invalid." };
  if (phone && !PHONE_PATTERN.test(phone)) return { honeypot, error: "The phone number is invalid." };
  if (!REQUIREMENTS.has(requirement)) return { honeypot, error: "The requirement is invalid." };

  return {
    honeypot,
    payload: { submissionType: "enquiry", name, email, phone, requirement, locale },
  };
}

function emailContent(payload: IntakePayload) {
  if (payload.submissionType === "career") {
    const subject = `[OneBonsai Gulf] Career introduction - ${payload.name}`;
    const text = [
      "New OneBonsai Gulf career introduction",
      "",
      `Name: ${payload.name}`,
      `LinkedIn: ${payload.linkedin}`,
      `Selected work: ${payload.work || "Not provided"}`,
      `Locale: ${payload.locale}`,
    ].join("\n");
    const html = `
      <h1>New OneBonsai Gulf career introduction</h1>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
        <tr><th align="left">Name</th><td>${escapeHtml(payload.name)}</td></tr>
        <tr><th align="left">LinkedIn</th><td>${escapeHtml(payload.linkedin)}</td></tr>
        <tr><th align="left">Selected work</th><td>${escapeHtml(payload.work || "Not provided")}</td></tr>
        <tr><th align="left">Locale</th><td>${payload.locale}</td></tr>
      </table>
    `;
    return { subject, text, html };
  }

  const replyMethod = [payload.email, payload.phone].filter(Boolean).join(" / ");
  const subject = `[OneBonsai Gulf] ${payload.requirement} enquiry - ${payload.name}`;
  const text = [
    "New OneBonsai Gulf CEO conversation request",
    "",
    `Name: ${payload.name}`,
    `Work email: ${payload.email || "Not provided"}`,
    `Phone / WhatsApp: ${payload.phone || "Not provided"}`,
    `Requirement: ${payload.requirement}`,
    `Locale: ${payload.locale}`,
    `Reply via: ${replyMethod}`,
  ].join("\n");
  const html = `
    <h1>New OneBonsai Gulf CEO conversation request</h1>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
      <tr><th align="left">Name</th><td>${escapeHtml(payload.name)}</td></tr>
      <tr><th align="left">Work email</th><td>${escapeHtml(payload.email || "Not provided")}</td></tr>
      <tr><th align="left">Phone / WhatsApp</th><td>${escapeHtml(payload.phone || "Not provided")}</td></tr>
      <tr><th align="left">Requirement</th><td>${escapeHtml(payload.requirement)}</td></tr>
      <tr><th align="left">Locale</th><td>${payload.locale}</td></tr>
    </table>
  `;

  return { subject, text, html };
}

async function sendWithWebhook(payload: IntakePayload, webhookUrl: string) {
  const target = new URL(webhookUrl);
  if (target.protocol !== "https:") throw new Error("The enquiry webhook must use HTTPS.");
  const secret = process.env.ENQUIRY_WEBHOOK_SECRET?.trim();
  const response = await fetch(target, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
    },
    body: JSON.stringify({ ...payload, to: RECIPIENT }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new Error(`Enquiry webhook returned ${response.status}.`);
  const result = (await response.json().catch(() => null)) as { success?: unknown } | null;
  if (!result || result.success !== true) throw new Error("The enquiry webhook rejected the submission.");
}

async function sendWithResend(payload: IntakePayload, apiKey: string) {
  const content = emailContent(payload);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL?.trim() || "OneBonsai Gulf <enquiries@obgulf.com>",
      to: [RECIPIENT],
      reply_to: payload.submissionType === "enquiry" ? payload.email || undefined : undefined,
      subject: content.subject,
      text: content.text,
      html: content.html,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new Error(`Resend returned ${response.status}.`);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > 10_000) return json({ success: false, error: "Request too large." }, 413);
    body = JSON.parse(rawBody);
  } catch {
    return json({ success: false, error: "Invalid JSON." }, 400);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json({ success: false, error: "Invalid request." }, 400);
  }

  const { payload, honeypot, error } = parsePayload(body as Record<string, unknown>);
  if (honeypot) return json({ success: true });
  if (!payload || error) return json({ success: false, error }, 400);

  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL?.trim();
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (!webhookUrl && !resendApiKey) {
    return json({ success: false, error: "Enquiry delivery is not configured." }, 503);
  }

  try {
    if (webhookUrl) await sendWithWebhook(payload, webhookUrl);
    else if (resendApiKey) await sendWithResend(payload, resendApiKey);
    return json({ success: true });
  } catch (deliveryError) {
    console.error("Enquiry delivery failed:", deliveryError instanceof Error ? deliveryError.message : "Unknown error");
    return json({ success: false, error: "Enquiry delivery failed." }, 502);
  }
}
