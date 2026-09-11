import {
  cleanText,
  getCareerBindings,
  isLinkedInUrl,
  json,
  parseJsonRequest,
  parseWebUrl,
  requestIpHash,
  verifyTurnstile,
} from "../_shared";
import { createQuestionAssignment, toPublicQuestions, type CareerLocale } from "../question-bank";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await parseJsonRequest(request);
  } catch (error) {
    return json({ success: false, error: error instanceof Error ? error.message : "Invalid request." }, 400);
  }

  if (cleanText(body.website, 200)) return json({ success: false, error: "Unable to start this application." }, 400);
  const name = cleanText(body.name, 120);
  const linkedin = cleanText(body.linkedin, 500);
  const work = cleanText(body.work, 500);
  const locale: CareerLocale = body.locale === "ar" ? "ar" : "en";
  const turnstileToken = cleanText(body.turnstileToken, 2_048);

  if (name.length < 2) return json({ success: false, error: "A full name is required." }, 400);
  if (!isLinkedInUrl(linkedin)) return json({ success: false, error: "A valid LinkedIn profile is required." }, 400);
  if (work && !parseWebUrl(work)) return json({ success: false, error: "The work link is invalid." }, 400);

  try {
    const bindings = await getCareerBindings();
    const humanVerified = await verifyTurnstile(request, turnstileToken, bindings.TURNSTILE_SECRET_KEY);
    if (!humanVerified) return json({ success: false, error: "Please complete the human check." }, 400);

    const ipHash = await requestIpHash(request, bindings.IP_HASH_SALT ?? "onebonsai-careers");
    const recent = await bindings.DB.prepare(
      "SELECT COUNT(*) AS count FROM career_applications WHERE ip_hash = ? AND created_at >= datetime('now', '-1 hour')",
    ).bind(ipHash).first<{ count: number }>();
    if ((recent?.count ?? 0) >= 10) return json({ success: false, error: "Too many attempts. Please try again later." }, 429);

    const id = crypto.randomUUID();
    const assignment = createQuestionAssignment();
    await bindings.DB.prepare(
      `INSERT INTO career_applications
        (id, name, linkedin, work_url, locale, assignment_json, previous_question_ids_json, ip_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      id,
      name,
      linkedin,
      work || null,
      locale,
      JSON.stringify(assignment),
      JSON.stringify(assignment.map((item) => item.questionId)),
      ipHash,
    ).run();

    return json({ success: true, applicationId: id, questions: toPublicQuestions(assignment, locale) });
  } catch (error) {
    console.error("Career application start failed:", error instanceof Error ? error.message : "Unknown error");
    return json({ success: false, error: "The AI fluency check is temporarily unavailable." }, 503);
  }
}
