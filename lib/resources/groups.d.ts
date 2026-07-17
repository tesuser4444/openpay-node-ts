import { BaseResource } from '../base-resource';
import type { HttpClient } from '../http-client';
import type { Callback, OpenpayConfig, QueryParams } from '../types';
declare class GroupCustomerCards extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(customerId: string, data: unknown, callback: Callback): void;
    list(customerId: string, callback: Callback): void;
    list(customerId: string, data: QueryParams, callback: Callback): void;
    get(customerId: string, cardId: string, callback: Callback): void;
    delete(customerId: string, cardId: string, callback: Callback): void;
}
declare class GroupCustomerCharges extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(merchantId: string, customerId: string, data: unknown, callback: Callback): void;
    capture(merchantId: string, customerId: string, transactionId: string, data: unknown, callback: Callback): void;
    refund(merchantId: string, customerId: string, transactionId: string, data: unknown, callback: Callback): void;
}
declare class GroupCustomerSubscriptions extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(merchantId: string, customerId: string, data: unknown, callback: Callback): void;
    list(merchantId: string, customerId: string, callback: Callback): void;
    list(merchantId: string, customerId: string, data: QueryParams, callback: Callback): void;
    get(merchantId: string, customerId: string, subscriptionId: string, callback: Callback): void;
    update(merchantId: string, customerId: string, subscriptionId: string, data: unknown, callback: Callback): void;
    delete(merchantId: string, customerId: string, subscriptionId: string, callback: Callback): void;
}
declare class GroupCustomers extends BaseResource {
    readonly cards: GroupCustomerCards;
    readonly charges: GroupCustomerCharges;
    readonly subscriptions: GroupCustomerSubscriptions;
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(data: unknown, callback: Callback): void;
    list(callback: Callback): void;
    list(data: QueryParams, callback: Callback): void;
    get(customerId: string, callback: Callback): void;
    update(customerId: string, data: unknown, callback: Callback): void;
    delete(customerId: string, callback: Callback): void;
}
declare class GroupCharges extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(merchantId: string, data: unknown, callback: Callback): void;
    capture(merchantId: string, transactionId: string, data: unknown, callback: Callback): void;
    refund(merchantId: string, transactionId: string, data: unknown, callback: Callback): void;
}
export declare class GroupsResource extends BaseResource {
    readonly customers: GroupCustomers;
    readonly charges: GroupCharges;
    constructor(config: OpenpayConfig, httpClient: HttpClient);
}
export {};
//# sourceMappingURL=groups.d.ts.map