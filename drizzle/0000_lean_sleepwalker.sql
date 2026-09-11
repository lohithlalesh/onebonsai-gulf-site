CREATE TABLE `career_applications` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`linkedin` text NOT NULL,
	`work_url` text,
	`locale` text NOT NULL,
	`status` text DEFAULT 'quiz_pending' NOT NULL,
	`assignment_json` text NOT NULL,
	`previous_question_ids_json` text DEFAULT '[]' NOT NULL,
	`attempt_count` integer DEFAULT 0 NOT NULL,
	`best_score` integer DEFAULT 0 NOT NULL,
	`ip_hash` text NOT NULL,
	`upload_token_hash` text,
	`upload_token_expires_at` text,
	`resume_key` text,
	`resume_name` text,
	`resume_size` integer,
	`resume_uploaded_at` text,
	`download_token_hash` text,
	`download_token_expires_at` text,
	`consent_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_career_applications_ip_created` ON `career_applications` (`ip_hash`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_career_applications_status_created` ON `career_applications` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_career_applications_download_token` ON `career_applications` (`download_token_hash`);--> statement-breakpoint
CREATE TABLE `career_quiz_answers` (
	`id` text PRIMARY KEY NOT NULL,
	`application_id` text NOT NULL,
	`attempt` integer NOT NULL,
	`question_id` text NOT NULL,
	`selected_choice_id` text NOT NULL,
	`is_correct` integer NOT NULL,
	`answered_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_career_quiz_answers_application` ON `career_quiz_answers` (`application_id`,`attempt`);