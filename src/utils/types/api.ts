import { z } from "zod/v4";
import { projectsInsertSchema } from "@/db/schema/projects";

export enum VoteType {
    UP = "up",
    DOWN = "down",
}

export const votePostOptsSchema = z.object({
    entryId: z.number(),
    type: z.enum(VoteType),
});

export type VotePostOpts = z.infer<typeof votePostOptsSchema>;

export const entryPostOptsSchema = z.object({
    entry: z.object({ ...projectsInsertSchema.shape }),
    adminToken: z.string(),
});
