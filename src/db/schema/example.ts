import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const exampleSchema = sqliteTable(
  "example",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    passwordHash: text("password_hash"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch('now'))`),
  },
  (table) => {
    return [index("idx_example_id").on(table.id)];
  },
);

export const exampleSelectSchema = createSelectSchema(exampleSchema);
export const exampleInsertSchema = createInsertSchema(exampleSchema);

export type ExampleInsertType = z.infer<typeof exampleInsertSchema>;