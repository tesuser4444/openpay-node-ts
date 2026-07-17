"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansResource = void 0;
const base_resource_1 = require("../base-resource");
class PlansResource extends base_resource_1.BaseResource {
    constructor(config, httpClient) {
        super(config, httpClient, `${config.merchantId}/plans`);
    }
    create(data, callback) {
        this.request('POST', this.url(), data, callback);
    }
    list(dataOrCb, cb) {
        const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
        this.request('GET', this.url() + query, undefined, resolvedCb);
    }
    get(planId, callback) {
        this.request('GET', this.url(planId), undefined, callback);
    }
    update(planId, data, callback) {
        this.request('PUT', this.url(planId), data, callback);
    }
    delete(planId, callback) {
        this.request('DELETE', this.url(planId), undefined, callback);
    }
    listSubscriptions(planIdOrCb, dataOrCb, cb) {
        let planId;
        let query = '';
        let resolvedCb;
        if (typeof planIdOrCb === 'function') {
            // listSubscriptions(callback)
            planId = '';
            resolvedCb = planIdOrCb;
        }
        else if (typeof dataOrCb === 'function') {
            // listSubscriptions(planId, callback)
            planId = planIdOrCb;
            resolvedCb = dataOrCb;
        }
        else if (typeof cb === 'function') {
            // listSubscriptions(planId, data, callback)
            planId = planIdOrCb;
            query = this.resolveListParams(dataOrCb, cb).query;
            resolvedCb = cb;
        }
        else {
            // listSubscriptions(planId, data)
            planId = planIdOrCb;
            resolvedCb = undefined;
        }
        const urlPath = planId
            ? `${this.url(planId)}/subscriptions${query}`
            : `${this.url()}${query}`;
        this.request('GET', urlPath, undefined, resolvedCb);
    }
}
exports.PlansResource = PlansResource;
//# sourceMappingURL=plans.js.map