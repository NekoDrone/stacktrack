import { newErrorResponse, newSuccessResponse } from "@/utils/server/responses";
import { StatusType } from "@/utils/types/responses";
import { EntryErrorType, GeneralErrorType } from "@/utils/types/errors";
import type { NextRequest } from "next/server";
import db from "@/db";
import { projectsTable } from "@/db/schema/projects";
import { eq } from "drizzle-orm";

export const DELETE = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) => {
    const adminKey = process.env.ADMIN_KEY;

    if (!adminKey) {
        return newErrorResponse(500, {
            status: StatusType.ERROR,
            error: {
                type: GeneralErrorType.ENV_UNSET,
                message: "Did not set ADMIN_KEY environment variable.",
            },
        });
    }
    const { searchParams } = new URL(req.url);

    const adminToken = searchParams.get("token");

    if (adminToken != adminKey) {
        return newErrorResponse(403, {
            status: StatusType.ERROR,
            error: {
                type: GeneralErrorType.FORBIDDEN,
                message: "Incorrect admin token provided.",
            },
        });
    }

    const { id: idString } = await params;

    const id = parseInt(idString);

    const deleteResponse = await db
        .delete(projectsTable)
        .where(eq(projectsTable.id, id))
        .limit(1);

    const { rowsAffected } = deleteResponse;

    if (rowsAffected == 0) {
        return newErrorResponse(404, {
            status: StatusType.ERROR,
            error: {
                type: EntryErrorType.ENTRY_DOES_NOT_EXIST,
                message:
                    "0 rows affected when attempting to delete record from DB. Entry was likely not found.",
            },
        });
    }

    return newSuccessResponse({
        rowsAffected,
    });
};
