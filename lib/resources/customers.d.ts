import { BaseResource } from '../base-resource';
import type { HttpClient } from '../http-client';
import type { Callback, OpenpayConfig, QueryParams } from '../types';
declare class CustomerCards extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(customerId: string, data: unknown, callback: Callback): void;
    list(customerId: string, callback: Callback): void;
    list(customerId: string, data: QueryParams, callback: Callback): void;
    get(customerId: string, cardId: string, callback: Callback): void;
    delete(customerId: string, cardId: string, callback: Callback): void;
}
declare class CustomerCharges extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(customerId: string, data: unknown, callback: Callback): void;
    list(customerId: string, callback: Callback): void;
    list(customerId: string, data: QueryParams, callback: Callback): void;
    get(customerId: string, transactionId: string, callback: Callback): void;
    capture(customerId: string, transactionId: string, data: unknown, callback: Callback): void;
    refund(customerId: string, transactionId: string, data: unknown, callback: Callback): void;
}
declare class CustomerTransfers extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(customerId: string, data: unknown, callback: Callback): void;
    list(customerId: string, callback: Callback): void;
    list(customerId: string, data: QueryParams, callback: Callback): void;
    get(customerId: string, transactionId: string, callback: Callback): void;
}
declare class CustomerPayouts extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(customerId: string, data: unknown, callback: Callback): void;
    list(customerId: string, callback: Callback): void;
    list(customerId: string, data: QueryParams, callback: Callback): void;
    get(customerId: string, transactionId: string, callback: Callback): void;
}
declare class CustomerSubscriptions extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(customerId: string, data: unknown, callback: Callback): void;
    list(customerId: string, callback: Callback): void;
    list(customerId: string, data: QueryParams, callback: Callback): void;
    get(customerId: string, subscriptionId: string, callback: Callback): void;
    update(customerId: string, subscriptionId: string, data: unknown, callback: Callback): void;
    delete(customerId: string, subscriptionId: string, callback: Callback): void;
}
declare class CustomerBankAccounts extends BaseResource {
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(customerId: string, data: unknown, callback: Callback): void;
    get(customerId: string, bankAccountId: string, callback: Callback): void;
    delete(customerId: string, bankAccountId: string, callback: Callback): void;
    list(customerId: string, callback: Callback): void;
    list(customerId: string, data: QueryParams, callback: Callback): void;
}
export declare class CustomersResource extends BaseResource {
    readonly cards: CustomerCards;
    readonly charges: CustomerCharges;
    readonly transfers: CustomerTransfers;
    readonly payouts: CustomerPayouts;
    readonly subscriptions: CustomerSubscriptions;
    readonly bankaccounts: CustomerBankAccounts;
    constructor(config: OpenpayConfig, httpClient: HttpClient);
    create(data: unknown, callback: Callback): void;
    list(callback: Callback): void;
    list(data: QueryParams, callback: Callback): void;
    get(customerId: string, callback: Callback): void;
    update(customerId: string, data: unknown, callback: Callback): void;
    delete(customerId: string, callback: Callback): void;
}
export {};
//# sourceMappingURL=customers.d.ts.map