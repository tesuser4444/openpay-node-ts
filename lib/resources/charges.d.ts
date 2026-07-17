import { BaseResource } from '../base-resource';
import type { HttpClient } from '../http-client';
import type { Callback, OpenpayConfig, QueryParams } from '../types';
export declare class ChargesResource extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    /** Create a new charge. */
    create(data: unknown, callback: Callback): void;
    /** List charges with optional filters. */
    list(callback: Callback): void;
    list(data: QueryParams, callback: Callback): void;
    /** Get a charge by transaction ID. */
    get(transactionId: string, callback: Callback): void;
    /** Capture a previously uncaptured charge. */
    capture(transactionId: string, data: unknown, callback: Callback): void;
    /** Refund a charge. */
    refund(transactionId: string, data: unknown, callback: Callback): void;
}
//# sourceMappingURL=charges.d.ts.map