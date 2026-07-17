"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsResource = void 0;
const base_resource_1 = require("../base-resource");
// ── Group Sub-Resources ────────────────────────────────────────────
class GroupCustomerCards extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `groups/${config.merchantId}/customers`);
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
class GroupCustomerCharges extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `groups/${config.merchantId}/merchants`);
    }
    create(merchantId, customerId, data, callback) {
        this.request('POST', this.url(`${merchantId}/customers/${customerId}/charges`), data, callback);
    }
    capture(merchantId, customerId, transactionId, data, callback) {
        this.request('POST', this.url(`${merchantId}/customers/${customerId}/charges/${transactionId}/capture`), data, callback);
    }
    refund(merchantId, customerId, transactionId, data, callback) {
        this.request('POST', this.url(`${merchantId}/customers/${customerId}/charges/${transactionId}/refund`), data, callback);
    }
}
class GroupCustomerSubscriptions extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `groups/${config.merchantId}/merchants`);
    }
    create(merchantId, customerId, data, callback) {
        this.request('POST', this.url(`${merchantId}/customers/${customerId}/subscriptions`), data, callback);
    }
    list(merchantId, customerId, dataOrCb, cb) {
        const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
        this.request('GET', this.urlWithQuery(`${merchantId}/customers/${customerId}/subscriptions`, query), undefined, resolvedCb);
    }
    get(merchantId, customerId, subscriptionId, callback) {
        this.request('GET', this.url(`${merchantId}/customers/${customerId}/subscriptions/${subscriptionId}`), undefined, callback);
    }
    update(merchantId, customerId, subscriptionId, data, callback) {
        this.request('PUT', this.url(`${merchantId}/customers/${customerId}/subscriptions/${subscriptionId}`), data, callback);
    }
    delete(merchantId, customerId, subscriptionId, callback) {
        this.request('DELETE', this.url(`${merchantId}/customers/${customerId}/subscriptions/${subscriptionId}`), undefined, callback);
    }
}
// ── Group Customers ─────────────────────────────────────────────────
class GroupCustomers extends base_resource_1.BaseResource {
    cards;
    charges;
    subscriptions;
    constructor(config, httpClient) {
        super(config, httpClient, `groups/${config.merchantId}/customers`);
        this.cards = new GroupCustomerCards(config, httpClient);
        this.charges = new GroupCustomerCharges(config, httpClient);
        this.subscriptions = new GroupCustomerSubscriptions(config, httpClient);
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
// ── Group Charges ───────────────────────────────────────────────────
class GroupCharges extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `groups/${config.merchantId}/merchants`);
    }
    create(merchantId, data, callback) {
        this.request('POST', this.url(`${merchantId}/charges`), data, callback);
    }
    capture(merchantId, transactionId, data, callback) {
        this.request('POST', this.url(`${merchantId}/charges/${transactionId}/capture`), data, callback);
    }
    refund(merchantId, transactionId, data, callback) {
        this.request('POST', this.url(`${merchantId}/charges/${transactionId}/refund`), data, callback);
    }
}
// ── Main Groups Resource ────────────────────────────────────────────
class GroupsResource extends base_resource_1.BaseResource {
    customers;
    charges;
    constructor(config, httpClient) {
        super(config, httpClient, `groups/${config.merchantId}`);
        this.customers = new GroupCustomers(config, httpClient);
        this.charges = new GroupCharges(config, httpClient);
    }
}
exports.GroupsResource = GroupsResource;
//# sourceMappingURL=groups.js.map