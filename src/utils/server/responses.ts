import type {
    ErrorResponse,
    ResponseData,
    SuccessResponse,
} from "@/utils/types/responses";
import { StatusType } from "@/utils/types/responses";

/**
 * Helper function to properly wrap a successful API response.
 * @param data - Any `ResponseData` object.
 */
export const newSuccessResponse = (data?: ResponseData) => {
    const response: SuccessResponse = {
        data,
        status: StatusType.SUCCESS,
    };
    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
};

/**
 * Helper function to properly wrap an errorful API response.
 * @param httpCode - HTTP Status code. Should be one of the error codes (400-500+)
 * @param errorObj - Any `ErrorResponse` object.
 */
export const newErrorResponse = (httpCode: number, errorObj: ErrorResponse) => {
    return new Response(JSON.stringify(errorObj), {
        status: httpCode,
        headers: {
            "Content-Type": "application/json",
        },
    });
};
