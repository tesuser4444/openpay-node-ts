"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresResource = void 0;
const base_resource_1 = require("../base-resource");
class StoresResource extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        // Stores uses a different base URL (no merchant prefix, no /v1/)
        super(config, httpClient, 'stores');
    }
    list(dataOrCb, cb) {
        const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
        // Stores uses the StoreHttpClient which has different BASE_URL logic
        this.httpClient.request('GET', this.url() + query, undefined, this.config, resolvedCb);
    }
}
exports.StoresResource = StoresResource;
//# sourceMappingURL=stores.js.map