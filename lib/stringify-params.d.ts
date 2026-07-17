import type { QueryParams } from './types';
/**
 * Converts a plain object to a query string with `?` prefix.
 * Returns an empty string when params is undefined, null, or empty.
 */
export declare function stringifyParams(params: QueryParams | undefined | null): string;
/**
 * Detect whether a value is a plain, non-array, non-null object
 * with at least one key — used by list-method overload resolution.
 */
export declare function isPlainObjectWithKeys(value: unknown): value is Record<string, unknown>;
//# sourceMappingURL=stringify-params.d.ts.map