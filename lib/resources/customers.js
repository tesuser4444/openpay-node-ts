"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersResource = void 0;
const base_resource_1 = require("../base-resource");
// ── Customer Sub-Resources ─────────────────────────────────────────
class CustomerCards extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `${config.merchantId}/customers`);
    }
    create(customerId, data, callback) {
        this.request('POST', this.url(`${customerId}/cards`), data, callback);
    }
    list(customerId, dataOrCb, cb) {
        const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
        this.request('GET', this.urlWithQuery(`${customerId}/cards`, query), undefined, resolvedCb);
    }
    get(customerId, cardId, callback) {
        this.request('GET', this.url(`${customerId}/cards/${cardId}`), undefined, callback);
    }
    delete(customerId, cardId, callback) {
        this.request('DELETE', this.url(`${customerId}/cards/${cardId}`), undefined, callback);
    }
}
class CustomerCharges extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `${config.merchantId}/customers`);
    }
    create(customerId, data, callback) {
        this.request('POST', this.url(`${customerId}/charges`), data, callback);
    }
    list(customerId, dataOrCb, cb) {
        const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
        this.request('GET', this.urlWithQuery(`${customerId}/charges`, query), undefined, resolvedCb);
    }
    get(customerId, transactionId, callback) {
        this.request('GET', this.url(`${customerId}/charges/${transactionId}`), undefined, callback);
    }
    capture(customerId, transactionId, data, callback) {
        this.request('POST', this.url(`${customerId}/charges/${transactionId}/capture`), data, callback);
    }
    refund(customerId, transactionId, data, callback) {
        this.request('POST', this.url(`${customerId}/charges/${transactionId}/refund`), data, callback);
    }
}
class CustomerTransfers extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `${config.merchantId}/customers`);
    }
    create(customerId, data, callback) {
        this.request('POST', this.url(`${customerId}/transfers`), data, callback);
    }
    list(customerId, dataOrCb, cb) {
        const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
        this.request('GET', this.urlWithQuery(`${customerId}/transfers`, query), undefined, resolvedCb);
    }
    get(customerId, transactionId, callback) {
        this.request('GET', this.url(`${customerId}/transfers/${transactionId}`), undefined, callback);
    }
}
class CustomerPayouts extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `${config.merchantId}/customers`);
    }
    create(customerId, data, callback) {
        this.request('POST', this.url(`${customerId}/payouts`), data, callback);
    }
    list(customerId, dataOrCb, cb) {
        const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
        this.request('GET', this.urlWithQuery(`${customerId}/payouts`, query), undefined, resolvedCb);
    }
    get(customerId, transactionId, callback) {
        this.request('GET', this.url(`${customerId}/payouts/${transactionId}`), undefined, callback);
    }
}
class CustomerSubscriptions extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `${config.merchantId}/customers`);
    }
    create(customerId, data, callback) {
        this.request('POST', this.url(`${customerId}/subscriptions`), data, callback);
    }
    list(customerId, dataOrCb, cb) {
        const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
        this.request('GET', this.urlWithQuery(`${customerId}/subscriptions`, query), undefined, resolvedCb);
    }
    get(customerId, subscriptionId, callback) {
        this.request('GET', this.url(`${customerId}/subscriptions/${subscriptionId}`), undefined, callback);
    }
    update(customerId, subscriptionId, data, callback) {
        this.request('PUT', this.url(`${customerId}/subscriptions/${subscriptionId}`), data, callback);
    }
    delete(customerId, subscriptionId, callback) {
        this.request('DELETE', this.url(`${customerId}/subscriptions/${subscriptionId}`), undefined, callback);
    }
}
class CustomerBankAccounts extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `${config.merchantId}/customers`);
    }
    create(customerId, data, callback) {
        this.request('POST', this.url(`${customerId}/bankaccounts`), data, callback);
    }
    get(customerId, bankAccountId, callback) {
        this.request('GET', this.url(`${customerId}/bankaccounts/${bankAccountId}`), undefined, callback);
    }
    delete(customerId, bankAccountId, callback) {
        this.request('DELETE', this.url(`${customerId}/bankaccounts/${bankAccountId}`), undefined, callback);
    }
    list(customerId, dataOrCb, cb) {
        const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
        this.request('GET', this.urlWithQuery(`${customerId}/bankaccounts`, query), undefined, resolvedCb);
    }
}
// ── Main Customers Resource ────────────────────────────────────────
class CustomersResource extends base_resource_1.BaseResource {
    cards;
    charges;
    transfers;
    payouts;
    subscriptions;
    bankaccounts;
    constructor(config, httpClient) {
        super(config, httpClient, `${config.merchantId}/customers`);
        // Compose sub-resources (each shares the same config & http client)
        this.cards = new CustomerCards(config, httpClient);
        this.charges = new CustomerCharges(config, httpClient);
        this.transfers = new CustomerTransfers(config, httpClient);
        this.payouts = new CustomerPayouts(config, httpClient);
        this.subscriptions = new CustomerSubscriptions(config, httpClient);
        this.bankaccounts = new CustomerBankAccounts(config, httpClient);
    }
    create(data, callback) {
        this.request('POST', this.url(), data, callback);
    }
    list(dataOrCb, cb) {
        const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
        this.request('GET', this.url() + query, undefined, resolvedCb);
    }
    get(customerId, callback) {
        this.request('GET', this.url(customerId), undefined, callback);
    }
    update(customerId, data, callback) {
        this.request('PUT', this.url(customerId), data, callback);
    }
    delete(customerId, callback) {
        this.request('DELETE', this.url(customerId), undefined, callback);
    }
}
exports.CustomersResource = CustomersResource;
//# sourceMappingURL=customers.js.map