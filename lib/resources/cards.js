"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsResource = void 0;
const base_resource_1 = require("../base-resource");
class CardsResource extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `${config.merchantId}/cards`);
    }
    create(data, callback) {
        this.request('POST', this.url(), data, callback);
    }
    list(dataOrCb, cb) {
        const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
        this.request('GET', this.url() + query, undefined, resolvedCb);
    }
    get(cardId, callback) {
        this.request('GET', this.url(cardId), undefined, callback);
    }
    delete(cardId, callback) {
        this.request('DELETE', this.url(cardId), undefined, callback);
    }
}
exports.CardsResource = CardsResource;
//# sourceMappingURL=cards.js.map