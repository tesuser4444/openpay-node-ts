"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantResource = void 0;
const base_resource_1 = require("../base-resource");
class MerchantResource extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, config.merchantId);
    }
    /**
     * Get merchant information.
     */
    get(callback) {
        this.request('GET', this.url(), undefined, callback);
    }
}
exports.MerchantResource = MerchantResource;
//# sourceMappingURL=merchant.js.map