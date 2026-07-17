import { BaseResource } from '../base-resource';
import type { HttpClient } from '../http-client';
import type { Callback, OpenpayConfig, QueryParams } from '../types';
export declare class PlansResource extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(data: unknown, callback: Callback): void;
    list(callback: Callback): void;
    list(data: QueryParams, callback: Callback): void;
    get(planId: string, callback: Callback): void;
    update(planId: string, data: unknown, callback: Callback): void;
    delete(planId: string, callback: Callback): void;
    /** List subscriptions under a plan. */
    listSubscriptions(callback: Callback): void;
    listSubscriptions(planId: string, callback: Callback): void;
    listSubscriptions(planId: string, data: QueryParams, callback: Callback): void;
}
//# sourceMappingURL=plans.d.ts.map