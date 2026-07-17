import { BaseResource } from '../base-resource';
import type { HttpClient } from '../http-client';
import type { Callback, OpenpayConfig } from '../types';
export declare class WebhooksResource extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(data: unknown, callback: Callback): void;
    verify(webhookId: string, verificationCode: string, callback: Callback): void;
    get(webhookId: string, callback: Callback): void;
    delete(webhookId: string, callback: Callback): void;
    list(callback: Callback): void;
}
//# sourceMappingURL=webhooks.d.ts.map