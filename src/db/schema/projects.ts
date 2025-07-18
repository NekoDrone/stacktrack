import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { ProjectStatus } from "@/utils/types/client";

export const projectsTable = sqliteTable(
    "projects",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        slug: text("slug").notNull(),
        name: text("name").notNull(),
        description: text("description"),
        status: text("status").notNull().default(ProjectStatus.INACTIVE),
        votes: integer("votes").notNull(),
        isPriority: integer("is_priority", { mode: "boolean" }).notNull(),
        updatedAt: integer("updated_at", { mode: "timestamp" })
            .notNull()
            .default(sql`(unixepoch('now'))`),
        createdAt: integer("created_at", { mode: "timestamp" })
            .notNull()
            .default(sql`(unixepoch('now'))`),
    },
    (table) => {
        return [index("idx_example_id").on(table.id)];
    },
);

export const projectsSelectSchema = z.object({
    ...createSelectSchema(projectsTable).shape,
    status: z.enum(ProjectStatus),
});

export const projectsSelectSchemaArray = z.array(projectsSelectSchema);

export const projectsInsertSchema = z.object({
    ...createInsertSchema(projectsTable).shape,
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    status: z.enum(ProjectStatus),
});

export type ProjectSelect = z.infer<typeof projectsSelectSchema>;

export type ProjectInsert = z.infer<typeof projectsInsertSchema>;
