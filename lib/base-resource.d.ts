import type { Callback, HttpMethod, OpenpayConfig, QueryParams } from './types';
import type { HttpClient } from './http-client';
/**
 * Abstract base for every Openpay API resource.
 *
 * Provides:
 * - `request()` helper for HTTP calls
 * - `list()` overload helper (data-or-callback resolution)
 * - Promise + callback support methods
 */
export declare abstract class BaseResource {
    protected readonly config: OpenpayConfig;
    protected readonly httpClient: HttpClient;
    protected readonly baseUrl: string;
    constructor(config: OpenpayConfig, httpClient: HttpClient, baseUrl: string);
    /** Issue an HTTP request to the API. */
    protected request(method: HttpMethod, path: string, body: unknown | undefined, callback: Callback): void;
    /**
     * Resolves the common `list(data, callback)` / `list(callback)` overload.
     *
     * Returns:
     * - `query`  — URL query string (with `?` prefix, or `''`)
     * - `cb`     — the resolved callback
     */
    protected resolveListParams(dataOrCb: QueryParams | Callback | undefined, cb?: Callback): {
        query: string;
        cb: Callback | undefined;
    };
    /** Build a sub-path under this resource's base URL. */
    protected url(segment?: string): string;
    /** Build a URL with a query string appended. */
    protected urlWithQuery(segment: string, query: string): string;
}
//# sourceMappingURL=base-resource.d.ts.map