import { BaseResource } from '../base-resource';
import type { HttpClient } from '../http-client';
import type { Callback, OpenpayConfig } from '../types';
export declare class MerchantResource extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    /**
     * Get merchant information.
     */
    get(callback: Callback): void;
}
//# sourceMappingURL=merchant.d.ts.map