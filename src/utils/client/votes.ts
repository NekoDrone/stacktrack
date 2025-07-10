import type { VotePostOpts } from "@/utils/types/api";
import { VoteType } from "@/utils/types/api";

export const submitUpvote = async (entryId: number) => {
    const body: VotePostOpts = {
        entryId,
        type: VoteType.UP,
    };
    const req = new Request("/api/vote", {
        method: "POST",
        body: JSON.stringify(body),
    });

    const res = await fetch(req);
    if (res.ok) {
        return { success: true, error: null };
    } else {
        return { success: false, error: res.body };
    }
};

export const submitDownvote = async (entryId: number) => {
    const body: VotePostOpts = {
        entryId,
        type: VoteType.DOWN,
    };
    const req = new Request("/api/vote", {
        method: "POST",
        body: JSON.stringify(body),
    });

    const res = await fetch(req);
    if (res.ok) {
        return { success: true, error: null };
    } else {
        return { success: false, error: res.body };
    }
};
