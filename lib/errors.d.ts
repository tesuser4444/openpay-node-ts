export declare class OpenpayError extends Error {
    readonly statusCode: number;
    readonly body: unknown;
    readonly category?: string | undefined;
    readonly description?: string | undefined;
    readonly requestId?: string | undefined;
    constructor(message: string, statusCode: number, body: unknown, cause?: Error);
    /** Whether this is a client error (4xx). */
    get isClientError(): boolean;
    /** Whether this is a server error (5xx). */
    get isServerError(): boolean;
}
export declare class NetworkError extends OpenpayError {
    constructor(cause: Error);
}
export declare class TimeoutError extends OpenpayError {
    constructor(timeoutMs: number);
}
//# sourceMappingURL=errors.d.ts.map