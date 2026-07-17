import { BaseResource } from '../base-resource';
import type { HttpClient } from '../http-client';
import type { Callback, OpenpayConfig, QueryParams } from '../types';
export declare class FeesResource extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(data: unknown, callback: Callback): void;
    list(callback: Callback): void;
    list(data: QueryParams, callback: Callback): void;
}
//# sourceMappingURL=fees.d.ts.map