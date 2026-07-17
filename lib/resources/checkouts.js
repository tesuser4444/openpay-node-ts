"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutsResource = void 0;
const base_resource_1 = require("../base-resource");
class CheckoutsResource extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `${config.merchantId}/checkouts`);
    }
    create(data, callback) {
        this.request('POST', this.url(), data, callback);
    }
    get(checkoutId, callback) {
        this.request('GET', this.url(checkoutId), undefined, callback);
    }
    list(dataOrCb, cb) {
        const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
        this.request('GET', this.url() + query, undefined, resolvedCb);
    }
    update(checkoutId, status, data, callback) {
        this.request('PUT', this.url(`${checkoutId}?status=${status}`), data, callback);
    }
}
exports.CheckoutsResource = CheckoutsResource;
//# sourceMappingURL=checkouts.js.map