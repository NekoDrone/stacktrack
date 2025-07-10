import { votePostOptsSchema, VoteType } from "@/utils/types/api";
import { newErrorResponse, newSuccessResponse } from "@/utils/server/responses";
import { StatusType } from "@/utils/types/responses";
import { GeneralErrorType } from "@/utils/types/errors";
import db from "@/db";
import { projectsTable } from "@/db/schema/projects";
import { eq } from "drizzle-orm";

export const POST = async (req: Request) => {
    const { success, data, error } = votePostOptsSchema.safeParse(
        await req.json(),
    );

    if (!success) {
        return newErrorResponse(400, {
            status: StatusType.ERROR,
            error: {
                message:
                    "Invalid POST body received. Please ensure you conform to the expected type for the route.",
                type: GeneralErrorType.TYPE_ERROR,
                details: error,
            },
        });
    }

    const { entryId, type } = data;

    const entryFromDb = (
        await db
            .select()
            .from(projectsTable)
            .where(eq(projectsTable.id, entryId))
            .limit(1)
    )[0];

    if (type == VoteType.UP) {
        const { rowsAffected } = await db
            .update(projectsTable)
            .set({ votes: entryFromDb.votes + 1 })
            .where(eq(projectsTable.id, entryFromDb.id));

        if (rowsAffected == 0) {
            return newErrorResponse(500, {
                status: StatusType.ERROR,
                error: {
                    message:
                        "Could retrieve entry but affected 0 rows on update. This shouldn't ever happen??",
                    type: GeneralErrorType.SERVER_ERROR,
                    details: error,
                },
            });
        }

        return newSuccessResponse();
    }
    const { rowsAffected } = await db
        .update(projectsTable)
        .set({ votes: entryFromDb.votes - 1 })
        .where(eq(projectsTable.id, entryFromDb.id));

    if (rowsAffected == 0) {
        return newErrorResponse(500, {
            status: StatusType.ERROR,
            error: {
                message:
                    "Could retrieve entry but affected 0 rows on update. This shouldn't ever happen??",
                type: GeneralErrorType.SERVER_ERROR,
                details: error,
            },
        });
    }
    return newSuccessResponse();
};
