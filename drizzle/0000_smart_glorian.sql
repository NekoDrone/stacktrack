CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'inactive' NOT NULL,
	`votes` integer NOT NULL,
	`is_priority` integer NOT NULL,
	`updated_at` integer DEFAULT (unixepoch('now')) NOT NULL,
	`created_at` integer DEFAULT (unixepoch('now')) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_example_id` ON `projects` (`id`);