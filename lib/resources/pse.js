"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PseResource = void 0;
const base_resource_1 = require("../base-resource");
class PseResource extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `${config.merchantId}/charges`);
    }
    /** Create a PSE charge (Colombia). */
    create(data, callback) {
        this.request('POST', this.url(), data, callback);
    }
}
exports.PseResource = PseResource;
//# sourceMappingURL=pse.js.map