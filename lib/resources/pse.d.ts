import { BaseResource } from '../base-resource';
import type { HttpClient } from '../http-client';
import type { Callback, OpenpayConfig } from '../types';
export declare class PseResource extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    /** Create a PSE charge (Colombia). */
    create(data: unknown, callback: Callback): void;
}
//# sourceMappingURL=pse.d.ts.map