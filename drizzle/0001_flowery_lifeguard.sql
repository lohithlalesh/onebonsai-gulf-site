CREATE TABLE `career_resume_chunks` (
	`id` text PRIMARY KEY NOT NULL,
	`application_id` text NOT NULL,
	`chunk_index` integer NOT NULL,
	`data` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_career_resume_chunks_application` ON `career_resume_chunks` (`application_id`,`chunk_index`);