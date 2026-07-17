"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeesResource = void 0;
const base_resource_1 = require("../base-resource");
class FeesResource extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `${config.merchantId}/fees`);
    }
    create(data, callback) {
        this.request('POST', this.url(), data, callback);
    }
    list(dataOrCb, cb) {
        const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
        this.request('GET', this.url() + query, undefined, resolvedCb);
    }
}
exports.FeesResource = FeesResource;
//# sourceMappingURL=fees.js.map