"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargesResource = void 0;
const base_resource_1 = require("../base-resource");
class ChargesResource extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `${config.merchantId}/charges`);
    }
    /** Create a new charge. */
    create(data, callback) {
        this.request('POST', this.url(), data, callback);
    }
    list(dataOrCb, cb) {
        const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
        this.request('GET', this.url() + query, undefined, resolvedCb);
    }
    /** Get a charge by transaction ID. */
    get(transactionId, callback) {
        this.request('GET', this.url(transactionId), undefined, callback);
    }
    /** Capture a previously uncaptured charge. */
    capture(transactionId, data, callback) {
        this.request('POST', this.url(`${transactionId}/capture`), data, callback);
    }
    /** Refund a charge. */
    refund(transactionId, data, callback) {
        this.request('POST', this.url(`${transactionId}/refund`), data, callback);
    }
}
exports.ChargesResource = ChargesResource;
//# sourceMappingURL=charges.js.map