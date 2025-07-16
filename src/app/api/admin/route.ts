import { newErrorResponse, newSuccessResponse } from "@/utils/server/responses";
import { GeneralErrorType } from "@/utils/types/errors";
import { StatusType } from "@/utils/types/responses";

export const GET = (req: Request) => {
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

    const queryParams = new URL(req.url).searchParams;
    const adminToken = queryParams.get("token");
    if (!adminToken || adminToken != adminKey) {
        return newSuccessResponse({
            isAdmin: false,
        });
    }
    return newSuccessResponse({
        isAdmin: true,
    });
};
