import type { CountryCode } from './types';
import { MerchantResource } from './resources/merchant';
import { ChargesResource } from './resources/charges';
import { PayoutsResource } from './resources/payouts';
import { FeesResource } from './resources/fees';
import { PlansResource } from './resources/plans';
import { CardsResource } from './resources/cards';
import { CustomersResource } from './resources/customers';
import { WebhooksResource } from './resources/webhooks';
import { TokensResource } from './resources/tokens';
import { CheckoutsResource } from './resources/checkouts';
import { StoresResource } from './resources/stores';
import { PseResource } from './resources/pse';
import { GroupsResource } from './resources/groups';
/**
 * Openpay API client.
 *
 * Usage (callback style, backward-compatible):
 * ```js
 * const openpay = new Openpay('merchantId', 'sk_xxx', 'mx', false);
 * openpay.charges.create({ amount: 100, ... }, (err, body, res) => { ... });
 * ```
 */
declare class Openpay {
    static BASE_URL: string;
    static API_VERSION: string;
    static SANDBOX_URL: string;
    static SANDBOX_API_VERSION: string;
    private config;
    private apiHttpClient;
    private storeHttpClient;
    merchant: MerchantResource;
    charges: ChargesResource;
    payouts: PayoutsResource;
    fees: FeesResource;
    plans: PlansResource;
    cards: CardsResource;
    customers: CustomersResource;
    webhooks: WebhooksResource;
    tokens: TokensResource;
    checkouts: CheckoutsResource;
    stores: StoresResource;
    pse: PseResource;
    groups: GroupsResource;
    constructor(merchantId: string, privateKey: string, countryCode?: CountryCode, isProductionReady?: boolean);
    /** Change the merchant ID and rebuild resources. */
    setMerchantId(merchantId: string): void;
    /** Change the private key and rebuild resources. */
    setPrivateKey(privateKey: string): void;
    /** Toggle sandbox/production mode and rebuild resources. */
    setProductionReady(isProductionReady: boolean): void;
    /** Change the HTTP request timeout and rebuild resources. */
    setTimeout(timeout: number): void;
    /** Per-country base URL configuration. */
    setBaseUrl(countryCode: CountryCode): void;
    /** Rebuild all resources after a config change. */
    private rebuildResources;
}
export = Openpay;
//# sourceMappingURL=openpay.d.ts.map