type ExpiredApplication = { id: string; resume_key: string | null };

export async function pruneExpiredCareerApplications(env: { DB: D1Database; RESUMES?: R2Bucket }) {
  const result = await env.DB.prepare(
    "SELECT id, resume_key FROM career_applications WHERE created_at < datetime('now', '-90 days') LIMIT 100",
  ).all<ExpiredApplication>() as unknown as { results?: ExpiredApplication[] };
  const expired = result.results ?? [];

  for (const application of expired) {
    if (application.resume_key && !application.resume_key.startsWith("d1:") && env.RESUMES) {
      await env.RESUMES.delete(application.resume_key);
    }
    await env.DB.batch([
      env.DB.prepare("DELETE FROM career_resume_chunks WHERE application_id = ?").bind(application.id),
      env.DB.prepare("DELETE FROM career_quiz_answers WHERE application_id = ?").bind(application.id),
      env.DB.prepare("DELETE FROM career_applications WHERE id = ?").bind(application.id),
    ]);
  }
}
