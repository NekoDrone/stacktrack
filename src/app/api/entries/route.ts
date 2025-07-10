import db from "@/db";
import {
    projectsSelectSchema,
    projectsSelectSchemaArray,
    projectsTable,
} from "@/db/schema/projects";
import { eq } from "drizzle-orm";
import { newErrorResponse, newSuccessResponse } from "@/utils/server/responses";
import { StatusType } from "@/utils/types/responses";
import { EntryErrorType, GeneralErrorType } from "@/utils/types/errors";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
        const idNum = parseInt(id);

        if (isNaN(idNum)) {
            return newErrorResponse(400, {
                status: StatusType.ERROR,
                error: {
                    message:
                        "Query param 'id' was not set as a usable number. Did you set a non-numeric string?",
                    type: GeneralErrorType.PARAMS_ERROR,
                },
            });
        }

        const dbResults = await db
            .select()
            .from(projectsTable)
            .where(eq(projectsTable.id, parseInt(id)));

        if (dbResults.length == 0) {
            return newErrorResponse(404, {
                status: StatusType.ERROR,
                error: {
                    message: "Could not find specified ID in database.",
                    type: EntryErrorType.ENTRY_DOES_NOT_EXIST,
                },
            });
        }

        const {
            success,
            data: entry,
            error,
        } = projectsSelectSchema.safeParse(dbResults[0]);

        if (!success) {
            return newErrorResponse(500, {
                status: StatusType.ERROR,
                error: {
                    message:
                        "Something went wrong parsing the result from db. This is likely a mismatch between the Zod and Drizzle schemas",
                    type: GeneralErrorType.SERVER_ERROR,
                    details: error,
                },
            });
        }

        return newSuccessResponse({
            entry,
        });
    }

    const dbResults = await db.select().from(projectsTable);

    const {
        success,
        data: entries,
        error,
    } = projectsSelectSchemaArray.safeParse(dbResults);

    if (!success) {
        return newErrorResponse(500, {
            status: StatusType.ERROR,
            error: {
                message:
                    "Something went wrong parsing the result from db. This is likely a mismatch between the Zod and Drizzle schemas",
                type: GeneralErrorType.SERVER_ERROR,
                details: error,
            },
        });
    }

    return newSuccessResponse({ entries });
};
