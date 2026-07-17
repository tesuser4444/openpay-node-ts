"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResource = void 0;
const stringify_params_1 = require("./stringify-params");
/**
 * Abstract base for every Openpay API resource.
 *
 * Provides:
 * - `request()` helper for HTTP calls
 * - `list()` overload helper (data-or-callback resolution)
 * - Promise + callback support methods
 */
class BaseResource {
    config;
    httpClient;
    baseUrl;
    constructor(config, httpClient, baseUrl) {
        this.config = config;
        this.httpClient = httpClient;
        this.baseUrl = baseUrl;
    }
    /** Issue an HTTP request to the API. */
    request(method, path, body, callback) {
        this.httpClient.request(method, path, body, this.config, callback);
    }
    /**
     * Resolves the common `list(data, callback)` / `list(callback)` overload.
     *
     * Returns:
     * - `query`  — URL query string (with `?` prefix, or `''`)
     * - `cb`     — the resolved callback
     */
    resolveListParams(dataOrCb, cb) {
        if (typeof dataOrCb === 'function') {
            return { query: '', cb: dataOrCb };
        }
        if (typeof cb === 'function') {
            const q = (0, stringify_params_1.isPlainObjectWithKeys)(dataOrCb) ? (0, stringify_params_1.stringifyParams)(dataOrCb) : '';
            return { query: q, cb };
        }
        return { query: '', cb: undefined };
    }
    /** Build a sub-path under this resource's base URL. */
    url(segment = '') {
        return segment ? `${this.baseUrl}/${segment}` : this.baseUrl;
    }
    /** Build a URL with a query string appended. */
    urlWithQuery(segment, query) {
        return query ? `${this.baseUrl}/${segment}${query}` : `${this.baseUrl}/${segment}`;
    }
}
exports.BaseResource = BaseResource;
//# sourceMappingURL=base-resource.js.map