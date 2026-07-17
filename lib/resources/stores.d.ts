import { BaseResource } from '../base-resource';
import type { HttpClient } from '../http-client';
import type { Callback, OpenpayConfig, QueryParams } from '../types';
export declare class StoresResource extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    list(callback: Callback): void;
    list(data: QueryParams, callback: Callback): void;
}
//# sourceMappingURL=stores.d.ts.map