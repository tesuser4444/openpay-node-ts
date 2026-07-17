"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutsResource = void 0;
const base_resource_1 = require("../base-resource");
class PayoutsResource extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `${config.merchantId}/payouts`);
    }
    create(data, callback) {
        this.request('POST', this.url(), data, callback);
    }
    list(dataOrCb, cb) {
        const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
        this.request('GET', this.url() + query, undefined, resolvedCb);
    }
    get(transactionId, callback) {
        this.request('GET', this.url(transactionId), undefined, callback);
    }
}
exports.PayoutsResource = PayoutsResource;
//# sourceMappingURL=payouts.js.map