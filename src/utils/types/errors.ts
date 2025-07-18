export interface ApiError {
    type?: ErrorType;
    message: string;
    details?: unknown;
}

export enum GeneralErrorType {
    TYPE_ERROR = "Type error.",
    ENV_UNSET = "An environment variable was not properly set.",
    PARAMS_ERROR = "Query params were set incorrectly.",
    SERVER_ERROR = "Something went wrong on the server.",
    FORBIDDEN = "Not allowed to access resource.",
}

export enum EntryErrorType {
    ENTRY_DOES_NOT_EXIST = "Entry does not exist in db.",
}

export type ErrorType = GeneralErrorType | EntryErrorType;
