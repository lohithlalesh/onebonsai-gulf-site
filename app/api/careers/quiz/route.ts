import {
  createOpaqueToken,
  getCareerBindings,
  isoAfter,
  json,
  MAX_ATTEMPTS,
  parseAssignment,
  parseJsonRequest,
  sha256,
  type CareerApplicationRow,
} from "../_shared";
import { careerQuestionsById, createQuestionAssignment, toPublicQuestions } from "../question-bank";

type SubmittedAnswer = { questionId: string; choiceId: string };

function parseAnswers(value: unknown): SubmittedAnswer[] | null {
  if (!Array.isArray(value) || value.length !== 3) return null;
  const answers = value.map((answer) => {
    if (!answer || typeof answer !== "object" || Array.isArray(answer)) return null;
    const record = answer as Record<string, unknown>;
    return typeof record.questionId === "string" && typeof record.choiceId === "string"
      ? { questionId: record.questionId, choiceId: record.choiceId }
      : null;
  });
  return answers.every(Boolean) ? (answers as SubmittedAnswer[]) : null;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await parseJsonRequest(request);
  } catch (error) {
    return json({ success: false, error: error instanceof Error ? error.message : "Invalid request." }, 400);
  }

  const applicationId = typeof body.applicationId === "string" ? body.applicationId : "";
  const answers = parseAnswers(body.answers);
  if (!applicationId || !answers) return json({ success: false, error: "Answer all three questions." }, 400);

  try {
    const bindings = await getCareerBindings();
    const application = await bindings.DB.prepare(
      `SELECT id, name, linkedin, work_url, locale, status, assignment_json, previous_question_ids_json,
              attempt_count, best_score, upload_token_hash, upload_token_expires_at, resume_key
       FROM career_applications WHERE id = ?`,
    ).bind(applicationId).first<CareerApplicationRow>();
    if (!application) return json({ success: false, error: "Application not found." }, 404);
    if (application.resume_key) return json({ success: false, error: "This application is already complete." }, 409);
    if (application.attempt_count >= MAX_ATTEMPTS) return json({ success: false, error: "The fluency check is already complete." }, 409);

    const assignment = parseAssignment(application.assignment_json);
    const assignedIds = new Set(assignment.map((item) => item.questionId));
    if (new Set(answers.map((answer) => answer.questionId)).size !== 3 || answers.some((answer) => !assignedIds.has(answer.questionId))) {
      return json({ success: false, error: "These answers do not match your question set." }, 400);
    }

    let score = 0;
    const attempt = application.attempt_count + 1;
    const answerStatements = answers.map((answer) => {
      const question = careerQuestionsById.get(answer.questionId);
      const isCorrect = question?.correctChoiceId === answer.choiceId;
      if (isCorrect) score += 1;
      return bindings.DB.prepare(
        `INSERT INTO career_quiz_answers
          (id, application_id, attempt, question_id, selected_choice_id, is_correct)
         VALUES (?, ?, ?, ?, ?, ?)`,
      ).bind(crypto.randomUUID(), applicationId, attempt, answer.questionId, answer.choiceId, isCorrect ? 1 : 0);
    });

    const bestScore = Math.max(application.best_score, score);
    const passed = score === 3;
    const retryAllowed = !passed && attempt < MAX_ATTEMPTS;

    if (retryAllowed) {
      const previousIds = JSON.parse(application.previous_question_ids_json) as string[];
      const nextAssignment = createQuestionAssignment(previousIds);
      await bindings.DB.batch([
        ...answerStatements,
        bindings.DB.prepare(
          `UPDATE career_applications
           SET assignment_json = ?, previous_question_ids_json = ?, attempt_count = ?, best_score = ?, updated_at = CURRENT_TIMESTAMP
           WHERE id = ?`,
        ).bind(
          JSON.stringify(nextAssignment),
          JSON.stringify([...previousIds, ...nextAssignment.map((item) => item.questionId)]),
          attempt,
          bestScore,
          applicationId,
        ),
      ]);
      return json({
        success: true,
        passed: false,
        score,
        retryAllowed: true,
        questions: toPublicQuestions(nextAssignment, application.locale),
      });
    }

    const uploadToken = createOpaqueToken();
    const uploadTokenHash = await sha256(uploadToken);
    const uploadTokenExpiresAt = isoAfter(30);
    await bindings.DB.batch([
      ...answerStatements,
      bindings.DB.prepare(
        `UPDATE career_applications
         SET status = ?, attempt_count = ?, best_score = ?, upload_token_hash = ?, upload_token_expires_at = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
      ).bind(passed ? "quiz_passed" : "quiz_complete", attempt, bestScore, uploadTokenHash, uploadTokenExpiresAt, applicationId),
    ]);

    return json({ success: true, passed, score, retryAllowed: false, uploadToken, uploadTokenExpiresAt });
  } catch (error) {
    console.error("Career quiz submission failed:", error instanceof Error ? error.message : "Unknown error");
    return json({ success: false, error: "We could not score the check. Please try again." }, 503);
  }
}
