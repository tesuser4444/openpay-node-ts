"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensResource = void 0;
const base_resource_1 = require("../base-resource");
class TokensResource extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `${config.merchantId}/tokens`);
    }
    create(data, callback) {
        this.request('POST', this.url(), data, callback);
    }
    get(tokenId, callback) {
        this.request('GET', this.url(tokenId), undefined, callback);
    }
    list(callback) {
        this.request('GET', this.url(), undefined, callback);
    }
}
exports.TokensResource = TokensResource;
//# sourceMappingURL=tokens.js.map