import * as urllib from 'urllib';
type Callback<T = any> = (error: any, body: T | null, response: urllib.HttpClientResponse<any>) => void;
interface BaseData {
    merchantId: string;
    privateKey: string;
    isSandbox: boolean;
    timeout: number;
    groupId?: string;
}
declare class Openpay {
    static BASE_URL: string;
    static API_VERSION: string;
    static SANDBOX_URL: string;
    static SANDBOX_API_VERSION: string;
    merchantId: string;
    privateKey: string;
    isSandbox: boolean;
    timeout: number;
    groups: Groups;
    merchant: Merchant;
    charges: Charges;
    payouts: Payouts;
    fees: Fees;
    plans: Plans;
    cards: Cards;
    customers: Customers;
    webhooks: Webhooks;
    tokens: Tokens;
    checkouts: Checkouts;
    pse: Pse;
    stores: Stores;
    setMerchantId: (merchantId: string) => void;
    setPrivateKey: (privateKey: string) => void;
    setProductionReady: (isProductionReady: boolean) => void;
    setTimeout: (timeout: number) => void;
    _reDefine: () => void;
    constructor(merchantId: string, privateKey: string, countryCode?: string, isProductionReady?: boolean);
    define(baseData: BaseData): void;
    setBaseUrl(countryCode: string): void;
}
declare class Merchant {
    private baseUrl;
    private baseData;
    constructor(baseData: BaseData);
    get(callback: Callback): void;
}
declare class Charges {
    private baseUrl;
    private baseData;
    constructor(baseData: BaseData);
    create(data: any, callback: Callback): void;
    list(callback: Callback): void;
    list(data: any, callback: Callback): void;
    get(transactionId: string, callback: Callback): void;
    capture(transactionId: string, data: any, callback: Callback): void;
    refund(transactionId: string, data: any, callback: Callback): void;
}
declare class Payouts {
    private baseUrl;
    private baseData;
    constructor(baseData: BaseData);
    create(data: any, callback: Callback): void;
    list(callback: Callback): void;
    list(data: any, callback: Callback): void;
    get(transactionId: string, callback: Callback): void;
}
declare class Fees {
    private baseUrl;
    private baseData;
    constructor(baseData: BaseData);
    create(data: any, callback: Callback): void;
    list(callback: Callback): void;
    list(data: any, callback: Callback): void;
}
declare class Customers {
    private baseData;
    private baseUrl;
    charges: any;
    transfers: any;
    payouts: any;
    subscriptions: any;
    cards: any;
    bankaccounts: any;
    constructor(baseData: BaseData);
    create: (data: any, callback: Callback) => void;
    list: (data: any, callback?: Callback) => void;
    get: (customerId: string, callback: Callback) => void;
    update: (customerId: string, data: any, callback: Callback) => void;
    delete: (customerId: string, callback: Callback) => void;
}
declare class Cards {
    private baseUrl;
    private baseData;
    constructor(baseData: BaseData);
    create(data: any, callback: Callback): void;
    list(callback: Callback): void;
    list(data: any, callback: Callback): void;
    get(cardId: string, callback: Callback): void;
    delete(cardId: string, callback: Callback): void;
}
declare class Plans {
    private baseUrl;
    private baseData;
    constructor(baseData: BaseData);
    create(data: any, callback: Callback): void;
    list(callback: Callback): void;
    list(data: any, callback: Callback): void;
    get(planId: string, callback: Callback): void;
    update(planId: string, data: any, callback: Callback): void;
    delete(planId: string, callback: Callback): void;
    listSubscriptions(callback: Callback): void;
    listSubscriptions(planId: string, callback: Callback): void;
    listSubscriptions(planId: string, data: any, callback: Callback): void;
}
declare class Webhooks {
    private baseUrl;
    private baseData;
    constructor(baseData: BaseData);
    create(data: any, callback: Callback): void;
    verify(webhook_id: string, verification_code: string, callback: Callback): void;
    get(webhook_id: string, callback: Callback): void;
    delete(webhook_id: string, callback: Callback): void;
    list(callback: Callback): void;
}
declare class Tokens {
    private baseUrl;
    private baseData;
    constructor(baseData: BaseData);
    create(data: any, callback: Callback): void;
    get(token_id: string, callback: Callback): void;
    list(callback: Callback): void;
}
declare class Checkouts {
    private baseUrl;
    private baseData;
    constructor(baseData: BaseData);
    create(data: any, callback: Callback): void;
    get(checkout_id: string, callback: Callback): void;
    list(callback: Callback): void;
    list(data: any, callback: Callback): void;
    update(checkoutId: string, status: string, data: any, callback: Callback): void;
}
declare class Stores {
    private baseUrl;
    private baseData;
    constructor(baseData: BaseData);
    list(callback: Callback): void;
    list(data: any, callback: Callback): void;
}
declare class Pse {
    private baseUrl;
    private baseData;
    constructor(baseData: BaseData);
    create(data: any, callback: Callback): void;
}
declare class Groups {
    customers: any;
    charges: any;
    constructor(baseData: BaseData);
}
export = Openpay;
//# sourceMappingURL=openpay.d.ts.map