import { z } from "zod/v4";

export enum VoteType {
    UP = "up",
    DOWN = "down",
}

export const votePostOptsSchema = z.object({
    entryId: z.number(),
    type: z.enum(VoteType),
});

export type VotePostOpts = z.infer<typeof votePostOptsSchema>;
