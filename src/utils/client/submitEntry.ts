import type { EntryPostOpts } from "@/utils/types/api";
import type {
    EntriesChangeResponse,
    ErrorResponse,
} from "@/utils/types/responses";

export const submitEntry = async (data: EntryPostOpts) => {
    const req = new Request("/api/entries", {
        method: "POST",
        body: JSON.stringify(data),
    });

    return (await (await fetch(req)).json()) as
        | EntriesChangeResponse
        | ErrorResponse;
};
