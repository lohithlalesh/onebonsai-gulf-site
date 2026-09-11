import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const careerApplications = sqliteTable(
  "career_applications",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    linkedin: text("linkedin").notNull(),
    workUrl: text("work_url"),
    locale: text("locale").notNull(),
    status: text("status").notNull().default("quiz_pending"),
    assignmentJson: text("assignment_json").notNull(),
    previousQuestionIdsJson: text("previous_question_ids_json").notNull().default("[]"),
    attemptCount: integer("attempt_count").notNull().default(0),
    bestScore: integer("best_score").notNull().default(0),
    ipHash: text("ip_hash").notNull(),
    uploadTokenHash: text("upload_token_hash"),
    uploadTokenExpiresAt: text("upload_token_expires_at"),
    resumeKey: text("resume_key"),
    resumeName: text("resume_name"),
    resumeSize: integer("resume_size"),
    resumeUploadedAt: text("resume_uploaded_at"),
    downloadTokenHash: text("download_token_hash"),
    downloadTokenExpiresAt: text("download_token_expires_at"),
    consentAt: text("consent_at"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("idx_career_applications_ip_created").on(table.ipHash, table.createdAt),
    index("idx_career_applications_status_created").on(table.status, table.createdAt),
    index("idx_career_applications_download_token").on(table.downloadTokenHash),
  ],
);

export const careerQuizAnswers = sqliteTable(
  "career_quiz_answers",
  {
    id: text("id").primaryKey(),
    applicationId: text("application_id").notNull(),
    attempt: integer("attempt").notNull(),
    questionId: text("question_id").notNull(),
    selectedChoiceId: text("selected_choice_id").notNull(),
    isCorrect: integer("is_correct", { mode: "boolean" }).notNull(),
    answeredAt: text("answered_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("idx_career_quiz_answers_application").on(table.applicationId, table.attempt)],
);

export const careerResumeChunks = sqliteTable(
  "career_resume_chunks",
  {
    id: text("id").primaryKey(),
    applicationId: text("application_id").notNull(),
    chunkIndex: integer("chunk_index").notNull(),
    data: text("data").notNull(),
  },
  (table) => [index("idx_career_resume_chunks_application").on(table.applicationId, table.chunkIndex)],
);
