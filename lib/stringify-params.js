"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyParams = stringifyParams;
exports.isPlainObjectWithKeys = isPlainObjectWithKeys;
/**
 * Converts a plain object to a query string with `?` prefix.
 * Returns an empty string when params is undefined, null, or empty.
 */
function stringifyParams(params) {
    if (params == null || typeof params !== 'object' || Array.isArray(params)) {
        return '';
    }
    const entries = Object.entries(params);
    if (entries.length === 0) {
        return '';
    }
    const parts = entries.map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`);
    return '?' + parts.join('&');
}
/**
 * Detect whether a value is a plain, non-array, non-null object
 * with at least one key — used by list-method overload resolution.
 */
function isPlainObjectWithKeys(value) {
    return (typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        Object.keys(value).length > 0);
}
//# sourceMappingURL=stringify-params.js.map