"use strict";
// ── Custom Error Classes ───────────────────────────────────────────
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutError = exports.NetworkError = exports.OpenpayError = void 0;
class OpenpayError extends Error {
    statusCode;
    body;
    category;
    description;
    requestId;
    constructor(message, statusCode, body, cause) {
        super(message, { cause });
        this.name = 'OpenpayError';
        this.statusCode = statusCode;
        // Extract details from the Openpay error body if possible
        if (body !== null && typeof body === 'object') {
            const b = body;
            this.body = body;
            const cat = b['category'];
            const desc = b['description'];
            const reqId = b['request_id'];
            if (typeof cat === 'string')
                this.category = cat;
            if (typeof desc === 'string')
                this.description = desc;
            if (typeof reqId === 'string')
                this.requestId = reqId;
        }
        else {
            this.body = body;
        }
    }
    /** Whether this is a client error (4xx). */
    get isClientError() {
        return this.statusCode >= 400 && this.statusCode < 500;
    }
    /** Whether this is a server error (5xx). */
    get isServerError() {
        return this.statusCode >= 500;
    }
}
exports.OpenpayError = OpenpayError;
class NetworkError extends OpenpayError {
    constructor(cause) {
        super(`Network error: ${cause.message}`, 0, null, cause);
        this.name = 'NetworkError';
    }
}
exports.NetworkError = NetworkError;
class TimeoutError extends OpenpayError {
    constructor(timeoutMs) {
        super(`Request timed out after ${timeoutMs}ms`, 408, null);
        this.name = 'TimeoutError';
    }
}
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=errors.js.map