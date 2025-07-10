import type { ApiError } from "@/utils/types/errors";
import type { ProjectSelect } from "@/db/schema/projects";

interface ApiResponse {
    status: StatusType;
    data?: ResponseData;
    error?: ApiError;
}

export interface SuccessResponse extends ApiResponse {
    status: StatusType.SUCCESS;
    data?: ResponseData;
}

export interface ErrorResponse extends ApiResponse {
    status: StatusType.ERROR;
    error: ApiError;
}

export enum StatusType {
    SUCCESS = "success",
    ERROR = "error",
}

export type ResponseData = EntryResponse | EntriesResponse;

export interface EntryResponse {
    entry: ProjectSelect;
}

export interface EntriesResponse {
    entries: ProjectSelect[];
}
