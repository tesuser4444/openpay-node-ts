import { BaseResource } from '../base-resource';
import type { HttpClient } from '../http-client';
import type { Callback, OpenpayConfig } from '../types';
export declare class TokensResource extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(data: unknown, callback: Callback): void;
    get(tokenId: string, callback: Callback): void;
    list(callback: Callback): void;
}
//# sourceMappingURL=tokens.d.ts.map