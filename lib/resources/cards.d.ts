import { BaseResource } from '../base-resource';
import type { HttpClient } from '../http-client';
import type { Callback, OpenpayConfig, QueryParams } from '../types';
export declare class CardsResource extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(data: unknown, callback: Callback): void;
    list(callback: Callback): void;
    list(data: QueryParams, callback: Callback): void;
    get(cardId: string, callback: Callback): void;
    delete(cardId: string, callback: Callback): void;
}
//# sourceMappingURL=cards.d.ts.map