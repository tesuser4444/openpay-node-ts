import * as urllib from 'urllib';
import * as _ from 'underscore';
import { escapeBrackets } from './url-utils';

// ── Types ──────────────────────────────────────────────────────────

type Callback<T = any> = (
  error: any,
  body: T | null,
  response: urllib.HttpClientResponse<any>
) => void;

interface BaseData {
  merchantId: string;
  privateKey: string;
  isSandbox: boolean;
  timeout: number;
  groupId?: string;
}

interface RequestSpec {
  apiUrl: string;
  requestData: {
    method: string;
    json?: any;
    data?: any;
  };
  callback: Callback;
}

// ── Main Class ────────────────────────────────────────────────────

class Openpay {
  static BASE_URL = 'https://api.openpay.mx';
  static API_VERSION = '/v1/';
  static SANDBOX_URL = 'https://sandbox-api.openpay.mx';
  static SANDBOX_API_VERSION = '/v1/';

  merchantId: string;
  privateKey: string;
  isSandbox: boolean;
  timeout: number;

  // API resources – assigned in define()
  groups!: Groups;
  merchant!: Merchant;
  charges!: Charges;
  payouts!: Payouts;
  fees!: Fees;
  plans!: Plans;
  cards!: Cards;
  customers!: Customers;
  webhooks!: Webhooks;
  tokens!: Tokens;
  checkouts!: Checkouts;
  pse!: Pse;
  stores!: Stores;

  // Methods
  setMerchantId: (merchantId: string) => void;
  setPrivateKey: (privateKey: string) => void;
  setProductionReady: (isProductionReady: boolean) => void;
  setTimeout: (timeout: number) => void;

  _reDefine: () => void;

  constructor(
    merchantId: string,
    privateKey: string,
    countryCode: string = 'mx',
    isProductionReady?: boolean
  ) {
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

    this.setMerchantId = function (merchantId: string) {
      this.merchantId = merchantId;
      this._reDefine();
    };

    this.setPrivateKey = function (privateKey: string) {
      this.privateKey = privateKey;
      this._reDefine();
    };

    this.setProductionReady = function (isProductionReady: boolean) {
      this.isSandbox = !isProductionReady;
      this._reDefine();
    };

    this.setTimeout = function (timeout: number) {
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

  define(baseData: BaseData): void {
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

  setBaseUrl(countryCode: string): void {
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

// ── Resource Classes ───────────────────────────────────────────────

class Merchant {
  private baseUrl: string;
  private baseData: BaseData;

  constructor(baseData: BaseData) {
    this.baseData = baseData;
    this.baseUrl = baseData.merchantId;
  }

  get(callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl,
        requestData: { method: 'GET' },
        callback: callback,
      })
    );
  }
}

class Charges {
  private baseUrl: string;
  private baseData: BaseData;

  constructor(baseData: BaseData) {
    this.baseData = baseData;
    this.baseUrl = baseData.merchantId + '/charges';
  }

  create(data: any, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl,
        requestData: { method: 'POST', json: data },
        callback: callback,
      })
    );
  }

  list(callback: Callback): void;
  list(data: any, callback: Callback): void;
  list(data: any, callback?: Callback): void {
    const query =
      data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
        ? stringifyParams(data)
        : '';
    const cb: Callback = _.isFunction(callback) ? callback! : _.isFunction(data) ? data : null;
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + query,
        requestData: { method: 'GET' },
        callback: cb,
      })
    );
  }

  get(transactionId: string, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + '/' + transactionId,
        requestData: { method: 'GET' },
        callback: callback,
      })
    );
  }

  capture(transactionId: string, data: any, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + '/' + transactionId + '/capture',
        requestData: { method: 'POST', json: data },
        callback: callback,
      })
    );
  }

  refund(transactionId: string, data: any, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + '/' + transactionId + '/refund',
        requestData: { method: 'POST', json: data },
        callback: callback,
      })
    );
  }
}

class Payouts {
  private baseUrl: string;
  private baseData: BaseData;

  constructor(baseData: BaseData) {
    this.baseData = baseData;
    this.baseUrl = baseData.merchantId + '/payouts';
  }

  create(data: any, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl,
        requestData: { method: 'POST', json: data },
        callback: callback,
      })
    );
  }

  list(callback: Callback): void;
  list(data: any, callback: Callback): void;
  list(data: any, callback?: Callback): void {
    const query =
      data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
        ? stringifyParams(data)
        : '';
    const cb: Callback = _.isFunction(callback) ? callback! : _.isFunction(data) ? data : null;
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + query,
        requestData: { method: 'GET' },
        callback: cb,
      })
    );
  }

  get(transactionId: string, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + '/' + transactionId,
        requestData: { method: 'GET' },
        callback: callback,
      })
    );
  }
}

class Fees {
  private baseUrl: string;
  private baseData: BaseData;

  constructor(baseData: BaseData) {
    this.baseData = baseData;
    this.baseUrl = baseData.merchantId + '/fees';
  }

  create(data: any, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl,
        requestData: { method: 'POST', json: data },
        callback: callback,
      })
    );
  }

  list(callback: Callback): void;
  list(data: any, callback: Callback): void;
  list(data: any, callback?: Callback): void {
    const query =
      data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
        ? stringifyParams(data)
        : '';
    const cb: Callback = _.isFunction(callback) ? callback! : _.isFunction(data) ? data : null;
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + query,
        requestData: { method: 'GET' },
        callback: cb,
      })
    );
  }
}

class Customers {
  private baseData: BaseData;
  private baseUrl: string;

  // Sub-resources
  charges: any;
  transfers: any;
  payouts: any;
  subscriptions: any;
  cards: any;
  bankaccounts: any;

  constructor(baseData: BaseData) {
    const self = this;
    this.baseData = baseData;
    this.baseUrl = baseData.merchantId + '/customers';

    this.create = function (data: any, callback: Callback): void {
      sendRequest(
        _.extend(baseData, {
          apiUrl: self.baseUrl,
          requestData: { method: 'POST', json: data },
          callback: callback,
        })
      );
    };

    this.list = function (data: any, callback?: Callback): void {
      const query =
        data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
          ? stringifyParams(data)
          : '';
      const cb: Callback = _.isFunction(callback) ? callback! : _.isFunction(data) ? data : null;
      sendRequest(
        _.extend(baseData, {
          apiUrl: self.baseUrl + query,
          requestData: { method: 'GET' },
          callback: cb,
        })
      );
    };

    this.get = function (customerId: string, callback: Callback): void {
      sendRequest(
        _.extend(baseData, {
          apiUrl: self.baseUrl + '/' + customerId,
          requestData: { method: 'GET' },
          callback: callback,
        })
      );
    };

    this.update = function (customerId: string, data: any, callback: Callback): void {
      sendRequest(
        _.extend(baseData, {
          apiUrl: self.baseUrl + '/' + customerId,
          requestData: { method: 'PUT', json: data },
          callback: callback,
        })
      );
    };

    this.delete = function (customerId: string, callback: Callback): void {
      sendRequest(
        _.extend(baseData, {
          apiUrl: self.baseUrl + '/' + customerId,
          requestData: { method: 'DELETE' },
          callback: callback,
        })
      );
    };

    this.charges = {
      baseUrl: baseData.merchantId + '/customers/',

      create: function (customerId: string, data: any, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/charges',
            requestData: { method: 'POST', json: data },
            callback: callback,
          })
        );
      },

      list: function (customerId: string, data: any, callback?: Callback): void {
        const query =
          data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
            ? stringifyParams(data)
            : '';
        const cb: Callback = _.isFunction(callback) ? callback! : _.isFunction(data) ? data : null;
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/charges' + query,
            requestData: { method: 'GET' },
            callback: cb,
          })
        );
      },

      get: function (customerId: string, transactionId: string, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/charges/' + transactionId,
            requestData: { method: 'GET' },
            callback: callback,
          })
        );
      },

      capture: function (
        customerId: string,
        transactionId: string,
        data: any,
        callback: Callback
      ): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/charges/' + transactionId + '/capture',
            requestData: { method: 'POST', json: data },
            callback: callback,
          })
        );
      },

      refund: function (
        customerId: string,
        transactionId: string,
        data: any,
        callback: Callback
      ): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/charges/' + transactionId + '/refund',
            requestData: { method: 'POST', json: data },
            callback: callback,
          })
        );
      },
    };

    this.transfers = {
      baseUrl: baseData.merchantId + '/customers/',

      create: function (customerId: string, data: any, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/transfers',
            requestData: { method: 'POST', json: data },
            callback: callback,
          })
        );
      },

      list: function (customerId: string, data: any, callback?: Callback): void {
        const query =
          data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
            ? stringifyParams(data)
            : '';
        const cb: Callback = _.isFunction(callback) ? callback! : _.isFunction(data) ? data : null;
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/transfers' + query,
            requestData: { method: 'GET' },
            callback: cb,
          })
        );
      },

      get: function (customerId: string, transactionId: string, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/transfers/' + transactionId,
            requestData: { method: 'GET' },
            callback: callback,
          })
        );
      },
    };

    this.payouts = {
      baseUrl: baseData.merchantId + '/customers/',

      create: function (customerId: string, data: any, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/payouts',
            requestData: { method: 'POST', json: data },
            callback: callback,
          })
        );
      },

      list: function (customerId: string, data: any, callback?: Callback): void {
        const query =
          data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
            ? stringifyParams(data)
            : '';
        const cb: Callback = _.isFunction(callback) ? callback! : _.isFunction(data) ? data : null;
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/payouts' + query,
            requestData: { method: 'GET' },
            callback: cb,
          })
        );
      },

      get: function (customerId: string, transactionId: string, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/payouts/' + transactionId,
            requestData: { method: 'GET' },
            callback: callback,
          })
        );
      },
    };

    this.subscriptions = {
      baseUrl: baseData.merchantId + '/customers/',

      create: function (customerId: string, data: any, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/subscriptions',
            requestData: { method: 'POST', json: data },
            callback: callback,
          })
        );
      },

      list: function (customerId: string, data: any, callback?: Callback): void {
        const query =
          data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
            ? stringifyParams(data)
            : '';
        const cb: Callback = _.isFunction(callback) ? callback! : _.isFunction(data) ? data : null;
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/subscriptions' + query,
            requestData: { method: 'GET' },
            callback: cb,
          })
        );
      },

      get: function (customerId: string, subscriptionId: string, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/subscriptions/' + subscriptionId,
            requestData: { method: 'GET' },
            callback: callback,
          })
        );
      },

      update: function (
        customerId: string,
        subscriptionId: string,
        data: any,
        callback: Callback
      ): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/subscriptions/' + subscriptionId,
            requestData: { method: 'PUT', json: data },
            callback: callback,
          })
        );
      },

      delete: function (customerId: string, subscriptionId: string, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/subscriptions/' + subscriptionId,
            requestData: { method: 'DELETE' },
            callback: callback,
          })
        );
      },
    };

    this.cards = {
      baseUrl: baseData.merchantId + '/customers/',

      create: function (customerId: string, data: any, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/cards',
            requestData: { method: 'POST', json: data },
            callback: callback,
          })
        );
      },

      list: function (customerId: string, data: any, callback?: Callback): void {
        const query =
          data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
            ? stringifyParams(data)
            : '';
        const cb: Callback = _.isFunction(callback) ? callback! : _.isFunction(data) ? data : null;
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/cards' + query,
            requestData: { method: 'GET' },
            callback: cb,
          })
        );
      },

      get: function (customerId: string, cardId: string, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/cards/' + cardId,
            requestData: { method: 'GET' },
            callback: callback,
          })
        );
      },

      delete: function (customerId: string, cardId: string, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/cards/' + cardId,
            requestData: { method: 'DELETE' },
            callback: callback,
          })
        );
      },
    };

    this.bankaccounts = {
      baseUrl: baseData.merchantId + '/customers/',

      create: function (customerId: string, data: any, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/bankaccounts',
            requestData: { method: 'POST', json: data },
            callback: callback,
          })
        );
      },

      get: function (customerId: string, bankAccountId: string, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/bankaccounts/' + bankAccountId,
            requestData: { method: 'GET' },
            callback: callback,
          })
        );
      },

      delete: function (customerId: string, bankAccountId: string, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/bankaccounts/' + bankAccountId,
            requestData: { method: 'DELETE' },
            callback: callback,
          })
        );
      },

      list: function (customerId: string, data: any, callback?: Callback): void {
        const query =
          data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
            ? stringifyParams(data)
            : '';
        const cb: Callback = _.isFunction(callback) ? callback! : _.isFunction(data) ? data : null;
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + customerId + '/bankaccounts' + query,
            requestData: { method: 'GET' },
            callback: cb,
          })
        );
      },
    };
  }

  // These are assigned in constructor via function expressions
  create!: (data: any, callback: Callback) => void;
  list!: (data: any, callback?: Callback) => void;
  get!: (customerId: string, callback: Callback) => void;
  update!: (customerId: string, data: any, callback: Callback) => void;
  delete!: (customerId: string, callback: Callback) => void;
}

class Cards {
  private baseUrl: string;
  private baseData: BaseData;

  constructor(baseData: BaseData) {
    this.baseData = baseData;
    this.baseUrl = baseData.merchantId + '/cards';
  }

  create(data: any, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl,
        requestData: { method: 'POST', json: data },
        callback: callback,
      })
    );
  }

  list(callback: Callback): void;
  list(data: any, callback: Callback): void;
  list(data: any, callback?: Callback): void {
    const query =
      data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
        ? stringifyParams(data)
        : '';
    const cb: Callback = _.isFunction(callback) ? callback! : _.isFunction(data) ? data : null;
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + query,
        requestData: { method: 'GET' },
        callback: cb,
      })
    );
  }

  get(cardId: string, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + '/' + cardId,
        requestData: { method: 'GET' },
        callback: callback,
      })
    );
  }

  delete(cardId: string, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + '/' + cardId,
        requestData: { method: 'DELETE' },
        callback: callback,
      })
    );
  }
}

class Plans {
  private baseUrl: string;
  private baseData: BaseData;

  constructor(baseData: BaseData) {
    this.baseData = baseData;
    this.baseUrl = baseData.merchantId + '/plans';
  }

  create(data: any, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl,
        requestData: { method: 'POST', json: data },
        callback: callback,
      })
    );
  }

  list(callback: Callback): void;
  list(data: any, callback: Callback): void;
  list(data: any, callback?: Callback): void {
    const query =
      data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
        ? stringifyParams(data)
        : '';
    const cb: Callback = _.isFunction(callback) ? callback! : _.isFunction(data) ? data : null;
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + query,
        requestData: { method: 'GET' },
        callback: cb,
      })
    );
  }

  get(planId: string, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + '/' + planId,
        requestData: { method: 'GET' },
        callback: callback,
      })
    );
  }

  update(planId: string, data: any, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + '/' + planId,
        requestData: { method: 'PUT', json: data },
        callback: callback,
      })
    );
  }

  delete(planId: string, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + '/' + planId,
        requestData: { method: 'DELETE' },
        callback: callback,
      })
    );
  }

  listSubscriptions(callback: Callback): void;
  listSubscriptions(planId: string, callback: Callback): void;
  listSubscriptions(planId: string, data: any, callback: Callback): void;
  listSubscriptions(planId: any, data?: any, callback?: Callback): void {
    // Handle overloaded signatures like the original
    let planIdResolved: string;
    let dataResolved: any;
    let cbResolved: Callback;

    if (_.isFunction(data)) {
      // Called as listSubscriptions(planId, callback)
      planIdResolved = planId;
      dataResolved = undefined;
      cbResolved = data;
    } else if (_.isFunction(callback)) {
      // Called as listSubscriptions(planId, data, callback)
      planIdResolved = planId;
      dataResolved = data;
      cbResolved = callback!;
    } else if (_.isFunction(planId)) {
      // Called as listSubscriptions(callback)
      planIdResolved = '';
      dataResolved = undefined;
      cbResolved = planId;
    } else {
      planIdResolved = planId;
      dataResolved = data;
      cbResolved = callback as Callback;
    }

    const query =
      dataResolved &&
      _.isObject(dataResolved) &&
      !_.isArray(dataResolved) &&
      !_.isFunction(dataResolved) &&
      !_.isEmpty(dataResolved)
        ? stringifyParams(dataResolved)
        : '';

    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + '/' + planIdResolved + '/subscriptions' + query,
        requestData: { method: 'GET' },
        callback: cbResolved,
      })
    );
  }
}

class Webhooks {
  private baseUrl: string;
  private baseData: BaseData;

  constructor(baseData: BaseData) {
    this.baseData = baseData;
    this.baseUrl = baseData.merchantId + '/webhooks';
  }

  create(data: any, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl,
        requestData: { method: 'POST', json: data },
        callback: callback,
      })
    );
  }

  verify(webhook_id: string, verification_code: string, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + '/' + webhook_id + '/verify' + '/' + verification_code,
        requestData: { method: 'POST', json: '{}' },
        callback: callback,
      })
    );
  }

  get(webhook_id: string, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + '/' + webhook_id,
        requestData: { method: 'GET' },
        callback: callback,
      })
    );
  }

  delete(webhook_id: string, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + '/' + webhook_id,
        requestData: { method: 'DELETE' },
        callback: callback,
      })
    );
  }

  list(callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl,
        requestData: { method: 'GET' },
        callback: callback,
      })
    );
  }
}

class Tokens {
  private baseUrl: string;
  private baseData: BaseData;

  constructor(baseData: BaseData) {
    this.baseData = baseData;
    this.baseUrl = baseData.merchantId + '/tokens';
  }

  create(data: any, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl,
        requestData: { method: 'POST', json: data },
        callback: callback,
      })
    );
  }

  get(token_id: string, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + '/' + token_id,
        requestData: { method: 'GET' },
        callback: callback,
      })
    );
  }

  list(callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl,
        requestData: { method: 'GET' },
        callback: callback,
      })
    );
  }
}

class Checkouts {
  private baseUrl: string;
  private baseData: BaseData;

  constructor(baseData: BaseData) {
    this.baseData = baseData;
    this.baseUrl = baseData.merchantId + '/checkouts';
  }

  create(data: any, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl,
        requestData: { method: 'POST', json: data },
        callback: callback,
      })
    );
  }

  get(checkout_id: string, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + '/' + checkout_id,
        requestData: { method: 'GET' },
        callback: callback,
      })
    );
  }

  list(callback: Callback): void;
  list(data: any, callback: Callback): void;
  list(data: any, callback?: Callback): void {
    const query =
      data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
        ? stringifyParams(data)
        : '';
    const cb: Callback = _.isFunction(callback) ? callback! : _.isFunction(data) ? data : null;
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + query,
        requestData: { method: 'GET' },
        callback: cb,
      })
    );
  }

  update(checkoutId: string, status: string, data: any, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + '/' + checkoutId + '?status=' + status,
        requestData: { method: 'PUT', json: data },
        callback: callback,
      })
    );
  }
}

class Stores {
  private baseUrl: string;
  private baseData: BaseData;

  constructor(baseData: BaseData) {
    this.baseData = baseData;
    this.baseUrl = 'stores';
  }

  list(callback: Callback): void;
  list(data: any, callback: Callback): void;
  list(data: any, callback?: Callback): void {
    const query =
      data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
        ? stringifyParams(data)
        : '';
    const cb: Callback = _.isFunction(callback) ? callback! : _.isFunction(data) ? data : null;
    sendStoreRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl + query,
        requestData: { method: 'GET' },
        callback: cb,
      })
    );
  }
}

class Pse {
  private baseUrl: string;
  private baseData: BaseData;

  constructor(baseData: BaseData) {
    this.baseData = baseData;
    this.baseUrl = baseData.merchantId + '/charges';
  }

  create(data: any, callback: Callback): void {
    sendRequest(
      _.extend(this.baseData, {
        apiUrl: this.baseUrl,
        requestData: { method: 'POST', json: data },
        callback: callback,
      })
    );
  }
}

class Groups {
  customers: any;
  charges: any;

  constructor(baseData: BaseData) {
    baseData.groupId = baseData.merchantId;
    const self = this;

    this.customers = {
      baseUrl: 'groups/' + baseData.merchantId + '/customers',

      create: function (data: any, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl,
            requestData: { method: 'POST', json: data },
            callback: callback,
          })
        );
      },

      list: function (data: any, callback?: Callback): void {
        const query =
          data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
            ? stringifyParams(data)
            : '';
        const cb: Callback = _.isFunction(callback) ? callback! : _.isFunction(data) ? data : null;
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + query,
            requestData: { method: 'GET' },
            callback: cb,
          })
        );
      },

      get: function (customerId: string, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + '/' + customerId,
            requestData: { method: 'GET' },
            callback: callback,
          })
        );
      },

      update: function (customerId: string, data: any, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + '/' + customerId,
            requestData: { method: 'PUT', json: data },
            callback: callback,
          })
        );
      },

      delete: function (customerId: string, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + '/' + customerId,
            requestData: { method: 'DELETE' },
            callback: callback,
          })
        );
      },

      cards: {
        baseUrl: 'groups/' + baseData.merchantId + '/customers/',

        create: function (customerId: string, data: any, callback: Callback): void {
          sendRequest(
            _.extend(baseData, {
              apiUrl: this.baseUrl + customerId + '/cards',
              requestData: { method: 'POST', json: data },
              callback: callback,
            })
          );
        },

        list: function (customerId: string, data: any, callback?: Callback): void {
          const query =
            data && _.isObject(data) && !_.isArray(data) && !_.isFunction(data) && !_.isEmpty(data)
              ? stringifyParams(data)
              : '';
          const cb: Callback = _.isFunction(callback)
            ? callback!
            : _.isFunction(data)
            ? data
            : null;
          sendRequest(
            _.extend(baseData, {
              apiUrl: this.baseUrl + customerId + '/cards' + query,
              requestData: { method: 'GET' },
              callback: cb,
            })
          );
        },

        get: function (customerId: string, cardId: string, callback: Callback): void {
          sendRequest(
            _.extend(baseData, {
              apiUrl: this.baseUrl + customerId + '/cards/' + cardId,
              requestData: { method: 'GET' },
              callback: callback,
            })
          );
        },

        delete: function (customerId: string, cardId: string, callback: Callback): void {
          sendRequest(
            _.extend(baseData, {
              apiUrl: this.baseUrl + customerId + '/cards/' + cardId,
              requestData: { method: 'DELETE' },
              callback: callback,
            })
          );
        },
      },

      charges: {
        baseUrl: 'groups/' + baseData.merchantId + '/merchants/',

        create: function (
          merchantId: string,
          customerId: string,
          data: any,
          callback: Callback
        ): void {
          sendRequest(
            _.extend(baseData, {
              apiUrl:
                this.baseUrl + merchantId + '/customers/' + customerId + '/charges',
              requestData: { method: 'POST', json: data },
              callback: callback,
            })
          );
        },

        capture: function (
          merchantId: string,
          customerId: string,
          transactionId: string,
          data: any,
          callback: Callback
        ): void {
          sendRequest(
            _.extend(baseData, {
              apiUrl:
                this.baseUrl +
                merchantId +
                '/customers/' +
                customerId +
                '/charges/' +
                transactionId +
                '/capture',
              requestData: { method: 'POST', json: data },
              callback: callback,
            })
          );
        },

        refund: function (
          merchantId: string,
          customerId: string,
          transactionId: string,
          data: any,
          callback: Callback
        ): void {
          sendRequest(
            _.extend(baseData, {
              apiUrl:
                this.baseUrl +
                merchantId +
                '/customers/' +
                customerId +
                '/charges/' +
                transactionId +
                '/refund',
              requestData: { method: 'POST', json: data },
              callback: callback,
            })
          );
        },
      },

      subscriptions: {
        baseUrl: 'groups/' + baseData.merchantId + '/merchants/',

        create: function (
          merchantId: string,
          customerId: string,
          data: any,
          callback: Callback
        ): void {
          sendRequest(
            _.extend(baseData, {
              apiUrl:
                this.baseUrl + merchantId + '/customers/' + customerId + '/subscriptions',
              requestData: { method: 'POST', json: data },
              callback: callback,
            })
          );
        },

        list: function (
          merchantId: string,
          customerId: string,
          data: any,
          callback?: Callback
        ): void {
          const query =
            data &&
            _.isObject(data) &&
            !_.isArray(data) &&
            !_.isFunction(data) &&
            !_.isEmpty(data)
              ? stringifyParams(data)
              : '';
          const cb: Callback = _.isFunction(callback)
            ? callback!
            : _.isFunction(data)
            ? data
            : null;
          sendRequest(
            _.extend(baseData, {
              apiUrl:
                this.baseUrl +
                merchantId +
                '/customers/' +
                customerId +
                '/subscriptions' +
                query,
              requestData: { method: 'GET' },
              callback: cb,
            })
          );
        },

        get: function (
          merchantId: string,
          customerId: string,
          subscriptionId: string,
          callback: Callback
        ): void {
          sendRequest(
            _.extend(baseData, {
              apiUrl:
                this.baseUrl +
                merchantId +
                '/customers/' +
                customerId +
                '/subscriptions/' +
                subscriptionId,
              requestData: { method: 'GET' },
              callback: callback,
            })
          );
        },

        update: function (
          merchantId: string,
          customerId: string,
          subscriptionId: string,
          data: any,
          callback: Callback
        ): void {
          sendRequest(
            _.extend(baseData, {
              apiUrl:
                this.baseUrl +
                merchantId +
                '/customers/' +
                customerId +
                '/subscriptions/' +
                subscriptionId,
              requestData: { method: 'PUT', json: data },
              callback: callback,
            })
          );
        },

        delete: function (
          merchantId: string,
          customerId: string,
          subscriptionId: string,
          callback: Callback
        ): void {
          sendRequest(
            _.extend(baseData, {
              apiUrl:
                this.baseUrl +
                merchantId +
                '/customers/' +
                customerId +
                '/subscriptions/' +
                subscriptionId,
              requestData: { method: 'DELETE' },
              callback: callback,
            })
          );
        },
      },
    };

    this.charges = {
      baseUrl: 'groups/' + baseData.merchantId + '/merchants/',

      create: function (merchantId: string, data: any, callback: Callback): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + merchantId + '/charges',
            requestData: { method: 'POST', json: data },
            callback: callback,
          })
        );
      },

      capture: function (
        merchantId: string,
        transactionId: string,
        data: any,
        callback: Callback
      ): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + merchantId + '/charges/' + transactionId + '/capture',
            requestData: { method: 'POST', json: data },
            callback: callback,
          })
        );
      },

      refund: function (
        merchantId: string,
        transactionId: string,
        data: any,
        callback: Callback
      ): void {
        sendRequest(
          _.extend(baseData, {
            apiUrl: this.baseUrl + merchantId + '/charges/' + transactionId + '/refund',
            requestData: { method: 'POST', json: data },
            callback: callback,
          })
        );
      },
    };
  }
}

// ── Utilities ──────────────────────────────────────────────────────

function stringifyParams(params: any): string {
  return (
    '?' +
    _.map(_.pairs(params), function (arr: string[]) {
      return arr.join('=');
    }).join('&')
  );
}

function sendRequest(data: any): void {
  const baseUrl = data.isSandbox
    ? Openpay.SANDBOX_URL + Openpay.SANDBOX_API_VERSION
    : Openpay.BASE_URL + Openpay.API_VERSION;
  const url = baseUrl + escapeBrackets(data.apiUrl);
  const options: urllib.RequestOptions = {
    auth: data.privateKey + ':',
    method: (data.requestData.method || 'GET') as urllib.HttpMethod,
    contentType: 'json',
    timeout: data.timeout,
    data: data.requestData.json,
    dataType: 'json',
  };

  urllib.request(url, options, function (err: any, body: any, res: any) {
    const resCode = res ? res.statusCode : null;
    const error = resCode && resCode != 200 && resCode != 201 && resCode != 204 ? body : null;
    data.callback(err ? err : error, err || error ? null : body, res);
  });
}

function sendStoreRequest(data: any): void {
  const baseUrl = data.isSandbox
    ? Openpay.SANDBOX_URL + '/'
    : Openpay.BASE_URL + '/';
  const url = baseUrl + escapeBrackets(data.apiUrl);
  const options: urllib.RequestOptions = {
    auth: data.privateKey + ':',
    method: (data.requestData.method || 'GET') as urllib.HttpMethod,
    contentType: 'json',
    timeout: data.timeout,
    data: data.requestData.json,
    dataType: 'json',
  };

  urllib.request(url, options, function (err: any, body: any, res: any) {
    const resCode = res ? res.statusCode : null;
    const error = resCode && resCode != 200 && resCode != 201 && resCode != 204 ? body : null;
    data.callback(err ? err : error, err || error ? null : body, res);
  });
}

export = Openpay;
