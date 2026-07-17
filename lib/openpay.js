"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
const urllib = __importStar(require("urllib"));
const _ = __importStar(require("underscore"));
const url_utils_1 = require("./url-utils");
// ── Main Class ────────────────────────────────────────────────────
class Openpay {
    constructor(merchantId, privateKey, countryCode = 'mx', isProductionReady) {
        this.merchantId = merchantId;
        this.privateKey = privateKey;
        this.isSandbox = isProductionReady ? false : true;
        this.timeout = 90000;
        this.define({
            isSandbox: this.isSandbox,
            privateKey: this.privateKey,
            merchantId: this.merchantId,
            timeout: this.timeout,
        });
        this.setBaseUrl(countryCode);
        this.setMerchantId = function (merchantId) {
            this.merchantId = merchantId;
            this._reDefine();
        };
        this.setPrivateKey = function (privateKey) {
            this.privateKey = privateKey;
            this._reDefine();
        };
        this.setProductionReady = function (isProductionReady) {
            this.isSandbox = !isProductionReady;
            this._reDefine();
        };
        this.setTimeout = function (timeout) {
            this.timeout = timeout;
            this._reDefine();
        };
        this._reDefine = function () {
            this.define({
                isSandbox: this.isSandbox,
                privateKey: this.privateKey,
                merchantId: this.merchantId,
                timeout: this.timeout,
            });
        };
    }
    define(baseData) {
        this.groups = new Groups(baseData);
        this.merchant = new Merchant(baseData);
        this.charges = new Charges(baseData);
        this.payouts = new Payouts(baseData);
        this.fees = new Fees(baseData);
        this.plans = new Plans(baseData);
        this.cards = new Cards(baseData);
        this.customers = new Customers(baseData);
        this.webhooks = new Webhooks(baseData);
        this.tokens = new Tokens(baseData);
        this.checkouts = new Checkouts(baseData);
        this.pse = new Pse(baseData);
        this.stores = new Stores(baseData);
    }
    setBaseUrl(countryCode) {
        console.log('setting base url from country');
        switch (countryCode) {
            case 'pe':
                console.log('Country Peru');
                Openpay.BASE_URL = 'https://api.openpay.pe';
                Openpay.SANDBOX_URL = 'https://sandbox-api.openpay.pe';
                break;
            case 'co':
                console.log('Country Colombia');
                Openpay.BASE_URL = 'https://api.openpay.co';
                Openpay.SANDBOX_URL = 'https://sandbox-api.openpay.co';
                break;
            case 'mx':
                console.log('Country Mexico');
                console.log('Default value');
                break;
            default:
                console.error('Error country code, setting mx default.');
        }
    }
}
Openpay.BASE_URL = 'https://api.openpay.mx';
Openpay.API_VERSION = '/v1/';
Openpay.SANDBOX_URL = 'https://sandbox-api.openpay.mx';
Openpay.SANDBOX_API_VERSION = '/v1/';
// ── Resource Classes ───────────────────────────────────────────────
class Merchant {
    constructor(baseData) {
        this.baseData = baseData;
        this.baseUrl = baseData.merchantId;
    }
    get(callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl,
            requestData: { method: 'GET' },
            callback: callback,
        }));
    }
}
class Charges {
    constructor(baseData) {
        this.baseData = baseData;
        this.baseUrl = baseData.merchantId + '/charges';
    }
    create(data, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl,
            requestData: { method: 'POST', json: data },
            callback: callback,
        }));
    }
    list(data, callback) {
        const query = data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
            ? stringifyParams(data)
            : '';
        const cb = _.isFunction(callback) ? callback : _.isFunction(data) ? data : null;
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + query,
            requestData: { method: 'GET' },
            callback: cb,
        }));
    }
    get(transactionId, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + '/' + transactionId,
            requestData: { method: 'GET' },
            callback: callback,
        }));
    }
    capture(transactionId, data, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + '/' + transactionId + '/capture',
            requestData: { method: 'POST', json: data },
            callback: callback,
        }));
    }
    refund(transactionId, data, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + '/' + transactionId + '/refund',
            requestData: { method: 'POST', json: data },
            callback: callback,
        }));
    }
}
class Payouts {
    constructor(baseData) {
        this.baseData = baseData;
        this.baseUrl = baseData.merchantId + '/payouts';
    }
    create(data, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl,
            requestData: { method: 'POST', json: data },
            callback: callback,
        }));
    }
    list(data, callback) {
        const query = data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
            ? stringifyParams(data)
            : '';
        const cb = _.isFunction(callback) ? callback : _.isFunction(data) ? data : null;
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + query,
            requestData: { method: 'GET' },
            callback: cb,
        }));
    }
    get(transactionId, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + '/' + transactionId,
            requestData: { method: 'GET' },
            callback: callback,
        }));
    }
}
class Fees {
    constructor(baseData) {
        this.baseData = baseData;
        this.baseUrl = baseData.merchantId + '/fees';
    }
    create(data, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl,
            requestData: { method: 'POST', json: data },
            callback: callback,
        }));
    }
    list(data, callback) {
        const query = data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
            ? stringifyParams(data)
            : '';
        const cb = _.isFunction(callback) ? callback : _.isFunction(data) ? data : null;
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + query,
            requestData: { method: 'GET' },
            callback: cb,
        }));
    }
}
class Customers {
    constructor(baseData) {
        const self = this;
        this.baseData = baseData;
        this.baseUrl = baseData.merchantId + '/customers';
        this.create = function (data, callback) {
            sendRequest(_.extend(baseData, {
                apiUrl: self.baseUrl,
                requestData: { method: 'POST', json: data },
                callback: callback,
            }));
        };
        this.list = function (data, callback) {
            const query = data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
                ? stringifyParams(data)
                : '';
            const cb = _.isFunction(callback) ? callback : _.isFunction(data) ? data : null;
            sendRequest(_.extend(baseData, {
                apiUrl: self.baseUrl + query,
                requestData: { method: 'GET' },
                callback: cb,
            }));
        };
        this.get = function (customerId, callback) {
            sendRequest(_.extend(baseData, {
                apiUrl: self.baseUrl + '/' + customerId,
                requestData: { method: 'GET' },
                callback: callback,
            }));
        };
        this.update = function (customerId, data, callback) {
            sendRequest(_.extend(baseData, {
                apiUrl: self.baseUrl + '/' + customerId,
                requestData: { method: 'PUT', json: data },
                callback: callback,
            }));
        };
        this.delete = function (customerId, callback) {
            sendRequest(_.extend(baseData, {
                apiUrl: self.baseUrl + '/' + customerId,
                requestData: { method: 'DELETE' },
                callback: callback,
            }));
        };
        this.charges = {
            baseUrl: baseData.merchantId + '/customers/',
            create: function (customerId, data, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/charges',
                    requestData: { method: 'POST', json: data },
                    callback: callback,
                }));
            },
            list: function (customerId, data, callback) {
                const query = data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
                    ? stringifyParams(data)
                    : '';
                const cb = _.isFunction(callback) ? callback : _.isFunction(data) ? data : null;
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/charges' + query,
                    requestData: { method: 'GET' },
                    callback: cb,
                }));
            },
            get: function (customerId, transactionId, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/charges/' + transactionId,
                    requestData: { method: 'GET' },
                    callback: callback,
                }));
            },
            capture: function (customerId, transactionId, data, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/charges/' + transactionId + '/capture',
                    requestData: { method: 'POST', json: data },
                    callback: callback,
                }));
            },
            refund: function (customerId, transactionId, data, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/charges/' + transactionId + '/refund',
                    requestData: { method: 'POST', json: data },
                    callback: callback,
                }));
            },
        };
        this.transfers = {
            baseUrl: baseData.merchantId + '/customers/',
            create: function (customerId, data, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/transfers',
                    requestData: { method: 'POST', json: data },
                    callback: callback,
                }));
            },
            list: function (customerId, data, callback) {
                const query = data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
                    ? stringifyParams(data)
                    : '';
                const cb = _.isFunction(callback) ? callback : _.isFunction(data) ? data : null;
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/transfers' + query,
                    requestData: { method: 'GET' },
                    callback: cb,
                }));
            },
            get: function (customerId, transactionId, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/transfers/' + transactionId,
                    requestData: { method: 'GET' },
                    callback: callback,
                }));
            },
        };
        this.payouts = {
            baseUrl: baseData.merchantId + '/customers/',
            create: function (customerId, data, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/payouts',
                    requestData: { method: 'POST', json: data },
                    callback: callback,
                }));
            },
            list: function (customerId, data, callback) {
                const query = data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
                    ? stringifyParams(data)
                    : '';
                const cb = _.isFunction(callback) ? callback : _.isFunction(data) ? data : null;
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/payouts' + query,
                    requestData: { method: 'GET' },
                    callback: cb,
                }));
            },
            get: function (customerId, transactionId, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/payouts/' + transactionId,
                    requestData: { method: 'GET' },
                    callback: callback,
                }));
            },
        };
        this.subscriptions = {
            baseUrl: baseData.merchantId + '/customers/',
            create: function (customerId, data, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/subscriptions',
                    requestData: { method: 'POST', json: data },
                    callback: callback,
                }));
            },
            list: function (customerId, data, callback) {
                const query = data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
                    ? stringifyParams(data)
                    : '';
                const cb = _.isFunction(callback) ? callback : _.isFunction(data) ? data : null;
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/subscriptions' + query,
                    requestData: { method: 'GET' },
                    callback: cb,
                }));
            },
            get: function (customerId, subscriptionId, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/subscriptions/' + subscriptionId,
                    requestData: { method: 'GET' },
                    callback: callback,
                }));
            },
            update: function (customerId, subscriptionId, data, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/subscriptions/' + subscriptionId,
                    requestData: { method: 'PUT', json: data },
                    callback: callback,
                }));
            },
            delete: function (customerId, subscriptionId, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/subscriptions/' + subscriptionId,
                    requestData: { method: 'DELETE' },
                    callback: callback,
                }));
            },
        };
        this.cards = {
            baseUrl: baseData.merchantId + '/customers/',
            create: function (customerId, data, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/cards',
                    requestData: { method: 'POST', json: data },
                    callback: callback,
                }));
            },
            list: function (customerId, data, callback) {
                const query = data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
                    ? stringifyParams(data)
                    : '';
                const cb = _.isFunction(callback) ? callback : _.isFunction(data) ? data : null;
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/cards' + query,
                    requestData: { method: 'GET' },
                    callback: cb,
                }));
            },
            get: function (customerId, cardId, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/cards/' + cardId,
                    requestData: { method: 'GET' },
                    callback: callback,
                }));
            },
            delete: function (customerId, cardId, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/cards/' + cardId,
                    requestData: { method: 'DELETE' },
                    callback: callback,
                }));
            },
        };
        this.bankaccounts = {
            baseUrl: baseData.merchantId + '/customers/',
            create: function (customerId, data, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/bankaccounts',
                    requestData: { method: 'POST', json: data },
                    callback: callback,
                }));
            },
            get: function (customerId, bankAccountId, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/bankaccounts/' + bankAccountId,
                    requestData: { method: 'GET' },
                    callback: callback,
                }));
            },
            delete: function (customerId, bankAccountId, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/bankaccounts/' + bankAccountId,
                    requestData: { method: 'DELETE' },
                    callback: callback,
                }));
            },
            list: function (customerId, data, callback) {
                const query = data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
                    ? stringifyParams(data)
                    : '';
                const cb = _.isFunction(callback) ? callback : _.isFunction(data) ? data : null;
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + customerId + '/bankaccounts' + query,
                    requestData: { method: 'GET' },
                    callback: cb,
                }));
            },
        };
    }
}
class Cards {
    constructor(baseData) {
        this.baseData = baseData;
        this.baseUrl = baseData.merchantId + '/cards';
    }
    create(data, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl,
            requestData: { method: 'POST', json: data },
            callback: callback,
        }));
    }
    list(data, callback) {
        const query = data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
            ? stringifyParams(data)
            : '';
        const cb = _.isFunction(callback) ? callback : _.isFunction(data) ? data : null;
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + query,
            requestData: { method: 'GET' },
            callback: cb,
        }));
    }
    get(cardId, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + '/' + cardId,
            requestData: { method: 'GET' },
            callback: callback,
        }));
    }
    delete(cardId, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + '/' + cardId,
            requestData: { method: 'DELETE' },
            callback: callback,
        }));
    }
}
class Plans {
    constructor(baseData) {
        this.baseData = baseData;
        this.baseUrl = baseData.merchantId + '/plans';
    }
    create(data, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl,
            requestData: { method: 'POST', json: data },
            callback: callback,
        }));
    }
    list(data, callback) {
        const query = data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
            ? stringifyParams(data)
            : '';
        const cb = _.isFunction(callback) ? callback : _.isFunction(data) ? data : null;
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + query,
            requestData: { method: 'GET' },
            callback: cb,
        }));
    }
    get(planId, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + '/' + planId,
            requestData: { method: 'GET' },
            callback: callback,
        }));
    }
    update(planId, data, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + '/' + planId,
            requestData: { method: 'PUT', json: data },
            callback: callback,
        }));
    }
    delete(planId, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + '/' + planId,
            requestData: { method: 'DELETE' },
            callback: callback,
        }));
    }
    listSubscriptions(planId, data, callback) {
        // Handle overloaded signatures like the original
        let planIdResolved;
        let dataResolved;
        let cbResolved;
        if (_.isFunction(data)) {
            // Called as listSubscriptions(planId, callback)
            planIdResolved = planId;
            dataResolved = undefined;
            cbResolved = data;
        }
        else if (_.isFunction(callback)) {
            // Called as listSubscriptions(planId, data, callback)
            planIdResolved = planId;
            dataResolved = data;
            cbResolved = callback;
        }
        else if (_.isFunction(planId)) {
            // Called as listSubscriptions(callback)
            planIdResolved = '';
            dataResolved = undefined;
            cbResolved = planId;
        }
        else {
            planIdResolved = planId;
            dataResolved = data;
            cbResolved = callback;
        }
        const query = dataResolved &&
            _.isObject(dataResolved) &&
            !_.isArray(dataResolved) &&
            !_.isFunction(dataResolved) &&
            !_.isEmpty(dataResolved)
            ? stringifyParams(dataResolved)
            : '';
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + '/' + planIdResolved + '/subscriptions' + query,
            requestData: { method: 'GET' },
            callback: cbResolved,
        }));
    }
}
class Webhooks {
    constructor(baseData) {
        this.baseData = baseData;
        this.baseUrl = baseData.merchantId + '/webhooks';
    }
    create(data, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl,
            requestData: { method: 'POST', json: data },
            callback: callback,
        }));
    }
    verify(webhook_id, verification_code, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + '/' + webhook_id + '/verify' + '/' + verification_code,
            requestData: { method: 'POST', json: '{}' },
            callback: callback,
        }));
    }
    get(webhook_id, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + '/' + webhook_id,
            requestData: { method: 'GET' },
            callback: callback,
        }));
    }
    delete(webhook_id, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + '/' + webhook_id,
            requestData: { method: 'DELETE' },
            callback: callback,
        }));
    }
    list(callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl,
            requestData: { method: 'GET' },
            callback: callback,
        }));
    }
}
class Tokens {
    constructor(baseData) {
        this.baseData = baseData;
        this.baseUrl = baseData.merchantId + '/tokens';
    }
    create(data, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl,
            requestData: { method: 'POST', json: data },
            callback: callback,
        }));
    }
    get(token_id, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + '/' + token_id,
            requestData: { method: 'GET' },
            callback: callback,
        }));
    }
    list(callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl,
            requestData: { method: 'GET' },
            callback: callback,
        }));
    }
}
class Checkouts {
    constructor(baseData) {
        this.baseData = baseData;
        this.baseUrl = baseData.merchantId + '/checkouts';
    }
    create(data, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl,
            requestData: { method: 'POST', json: data },
            callback: callback,
        }));
    }
    get(checkout_id, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + '/' + checkout_id,
            requestData: { method: 'GET' },
            callback: callback,
        }));
    }
    list(data, callback) {
        const query = data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
            ? stringifyParams(data)
            : '';
        const cb = _.isFunction(callback) ? callback : _.isFunction(data) ? data : null;
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + query,
            requestData: { method: 'GET' },
            callback: cb,
        }));
    }
    update(checkoutId, status, data, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + '/' + checkoutId + '?status=' + status,
            requestData: { method: 'PUT', json: data },
            callback: callback,
        }));
    }
}
class Stores {
    constructor(baseData) {
        this.baseData = baseData;
        this.baseUrl = 'stores';
    }
    list(data, callback) {
        const query = data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
            ? stringifyParams(data)
            : '';
        const cb = _.isFunction(callback) ? callback : _.isFunction(data) ? data : null;
        sendStoreRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl + query,
            requestData: { method: 'GET' },
            callback: cb,
        }));
    }
}
class Pse {
    constructor(baseData) {
        this.baseData = baseData;
        this.baseUrl = baseData.merchantId + '/charges';
    }
    create(data, callback) {
        sendRequest(_.extend(this.baseData, {
            apiUrl: this.baseUrl,
            requestData: { method: 'POST', json: data },
            callback: callback,
        }));
    }
}
class Groups {
    constructor(baseData) {
        baseData.groupId = baseData.merchantId;
        const self = this;
        this.customers = {
            baseUrl: 'groups/' + baseData.merchantId + '/customers',
            create: function (data, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl,
                    requestData: { method: 'POST', json: data },
                    callback: callback,
                }));
            },
            list: function (data, callback) {
                const query = data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
                    ? stringifyParams(data)
                    : '';
                const cb = _.isFunction(callback) ? callback : _.isFunction(data) ? data : null;
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + query,
                    requestData: { method: 'GET' },
                    callback: cb,
                }));
            },
            get: function (customerId, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + '/' + customerId,
                    requestData: { method: 'GET' },
                    callback: callback,
                }));
            },
            update: function (customerId, data, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + '/' + customerId,
                    requestData: { method: 'PUT', json: data },
                    callback: callback,
                }));
            },
            delete: function (customerId, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + '/' + customerId,
                    requestData: { method: 'DELETE' },
                    callback: callback,
                }));
            },
            cards: {
                baseUrl: 'groups/' + baseData.merchantId + '/customers/',
                create: function (customerId, data, callback) {
                    sendRequest(_.extend(baseData, {
                        apiUrl: this.baseUrl + customerId + '/cards',
                        requestData: { method: 'POST', json: data },
                        callback: callback,
                    }));
                },
                list: function (customerId, data, callback) {
                    const query = data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
                        ? stringifyParams(data)
                        : '';
                    const cb = _.isFunction(callback)
                        ? callback
                        : _.isFunction(data)
                            ? data
                            : null;
                    sendRequest(_.extend(baseData, {
                        apiUrl: this.baseUrl + customerId + '/cards' + query,
                        requestData: { method: 'GET' },
                        callback: cb,
                    }));
                },
                get: function (customerId, cardId, callback) {
                    sendRequest(_.extend(baseData, {
                        apiUrl: this.baseUrl + customerId + '/cards/' + cardId,
                        requestData: { method: 'GET' },
                        callback: callback,
                    }));
                },
                delete: function (customerId, cardId, callback) {
                    sendRequest(_.extend(baseData, {
                        apiUrl: this.baseUrl + customerId + '/cards/' + cardId,
                        requestData: { method: 'DELETE' },
                        callback: callback,
                    }));
                },
            },
            charges: {
                baseUrl: 'groups/' + baseData.merchantId + '/merchants/',
                create: function (merchantId, customerId, data, callback) {
                    sendRequest(_.extend(baseData, {
                        apiUrl: this.baseUrl + merchantId + '/customers/' + customerId + '/charges',
                        requestData: { method: 'POST', json: data },
                        callback: callback,
                    }));
                },
                capture: function (merchantId, customerId, transactionId, data, callback) {
                    sendRequest(_.extend(baseData, {
                        apiUrl: this.baseUrl +
                            merchantId +
                            '/customers/' +
                            customerId +
                            '/charges/' +
                            transactionId +
                            '/capture',
                        requestData: { method: 'POST', json: data },
                        callback: callback,
                    }));
                },
                refund: function (merchantId, customerId, transactionId, data, callback) {
                    sendRequest(_.extend(baseData, {
                        apiUrl: this.baseUrl +
                            merchantId +
                            '/customers/' +
                            customerId +
                            '/charges/' +
                            transactionId +
                            '/refund',
                        requestData: { method: 'POST', json: data },
                        callback: callback,
                    }));
                },
            },
            subscriptions: {
                baseUrl: 'groups/' + baseData.merchantId + '/merchants/',
                create: function (merchantId, customerId, data, callback) {
                    sendRequest(_.extend(baseData, {
                        apiUrl: this.baseUrl + merchantId + '/customers/' + customerId + '/subscriptions',
                        requestData: { method: 'POST', json: data },
                        callback: callback,
                    }));
                },
                list: function (merchantId, customerId, data, callback) {
                    const query = data &&
                        _.isObject(data) &&
                        !_.isArray(data) &&
                        !_.isFunction(data) &&
                        !_.isEmpty(data)
                        ? stringifyParams(data)
                        : '';
                    const cb = _.isFunction(callback)
                        ? callback
                        : _.isFunction(data)
                            ? data
                            : null;
                    sendRequest(_.extend(baseData, {
                        apiUrl: this.baseUrl +
                            merchantId +
                            '/customers/' +
                            customerId +
                            '/subscriptions' +
                            query,
                        requestData: { method: 'GET' },
                        callback: cb,
                    }));
                },
                get: function (merchantId, customerId, subscriptionId, callback) {
                    sendRequest(_.extend(baseData, {
                        apiUrl: this.baseUrl +
                            merchantId +
                            '/customers/' +
                            customerId +
                            '/subscriptions/' +
                            subscriptionId,
                        requestData: { method: 'GET' },
                        callback: callback,
                    }));
                },
                update: function (merchantId, customerId, subscriptionId, data, callback) {
                    sendRequest(_.extend(baseData, {
                        apiUrl: this.baseUrl +
                            merchantId +
                            '/customers/' +
                            customerId +
                            '/subscriptions/' +
                            subscriptionId,
                        requestData: { method: 'PUT', json: data },
                        callback: callback,
                    }));
                },
                delete: function (merchantId, customerId, subscriptionId, callback) {
                    sendRequest(_.extend(baseData, {
                        apiUrl: this.baseUrl +
                            merchantId +
                            '/customers/' +
                            customerId +
                            '/subscriptions/' +
                            subscriptionId,
                        requestData: { method: 'DELETE' },
                        callback: callback,
                    }));
                },
            },
        };
        this.charges = {
            baseUrl: 'groups/' + baseData.merchantId + '/merchants/',
            create: function (merchantId, data, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + merchantId + '/charges',
                    requestData: { method: 'POST', json: data },
                    callback: callback,
                }));
            },
            capture: function (merchantId, transactionId, data, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + merchantId + '/charges/' + transactionId + '/capture',
                    requestData: { method: 'POST', json: data },
                    callback: callback,
                }));
            },
            refund: function (merchantId, transactionId, data, callback) {
                sendRequest(_.extend(baseData, {
                    apiUrl: this.baseUrl + merchantId + '/charges/' + transactionId + '/refund',
                    requestData: { method: 'POST', json: data },
                    callback: callback,
                }));
            },
        };
    }
}
// ── Utilities ──────────────────────────────────────────────────────
function stringifyParams(params) {
    return ('?' +
        _.map(_.pairs(params), function (arr) {
            return arr.join('=');
        }).join('&'));
}
function sendRequest(data) {
    const baseUrl = data.isSandbox
        ? Openpay.SANDBOX_URL + Openpay.SANDBOX_API_VERSION
        : Openpay.BASE_URL + Openpay.API_VERSION;
    const url = baseUrl + (0, url_utils_1.escapeBrackets)(data.apiUrl);
    const options = {
        auth: data.privateKey + ':',
        method: (data.requestData.method || 'GET'),
        contentType: 'json',
        timeout: data.timeout,
        data: data.requestData.json,
        dataType: 'json',
    };
    urllib.request(url, options, function (err, body, res) {
        const resCode = res ? res.statusCode : null;
        const error = resCode && resCode != 200 && resCode != 201 && resCode != 204 ? body : null;
        data.callback(err ? err : error, err || error ? null : body, res);
    });
}
function sendStoreRequest(data) {
    const baseUrl = data.isSandbox
        ? Openpay.SANDBOX_URL + '/'
        : Openpay.BASE_URL + '/';
    const url = baseUrl + (0, url_utils_1.escapeBrackets)(data.apiUrl);
    const options = {
        auth: data.privateKey + ':',
        method: (data.requestData.method || 'GET'),
        contentType: 'json',
        timeout: data.timeout,
        data: data.requestData.json,
        dataType: 'json',
    };
    urllib.request(url, options, function (err, body, res) {
        const resCode = res ? res.statusCode : null;
        const error = resCode && resCode != 200 && resCode != 201 && resCode != 204 ? body : null;
        data.callback(err ? err : error, err || error ? null : body, res);
    });
}
module.exports = Openpay;
//# sourceMappingURL=openpay.js.map