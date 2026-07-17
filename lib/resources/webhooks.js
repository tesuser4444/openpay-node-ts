"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksResource = void 0;
const base_resource_1 = require("../base-resource");
class WebhooksResource extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `${config.merchantId}/webhooks`);
    }
    create(data, callback) {
        this.request('POST', this.url(), data, callback);
    }
    verify(webhookId, verificationCode, callback) {
        this.request('POST', this.url(`${webhookId}/verify/${verificationCode}`), '{}', callback);
    }
    get(webhookId, callback) {
        this.request('GET', this.url(webhookId), undefined, callback);
    }
    delete(webhookId, callback) {
        this.request('DELETE', this.url(webhookId), undefined, callback);
    }
    list(callback) {
        this.request('GET', this.url(), undefined, callback);
    }
}
exports.WebhooksResource = WebhooksResource;
//# sourceMappingURL=webhooks.js.map