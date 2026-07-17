"use strict";
const http_client_1 = require("./http-client");
const merchant_1 = require("./resources/merchant");
const charges_1 = require("./resources/charges");
const payouts_1 = require("./resources/payouts");
const fees_1 = require("./resources/fees");
const plans_1 = require("./resources/plans");
const cards_1 = require("./resources/cards");
const customers_1 = require("./resources/customers");
const webhooks_1 = require("./resources/webhooks");
const tokens_1 = require("./resources/tokens");
const checkouts_1 = require("./resources/checkouts");
const stores_1 = require("./resources/stores");
const pse_1 = require("./resources/pse");
const groups_1 = require("./resources/groups");
/**
 * Openpay API client.
 *
 * Usage (callback style, backward-compatible):
 * ```js
 * const openpay = new Openpay('merchantId', 'sk_xxx', 'mx', false);
 * openpay.charges.create({ amount: 100, ... }, (err, body, res) => { ... });
 * ```
 */
class Openpay {
    // ── Static Base URLs (per-country, mutable for backward compat) ──
    static BASE_URL = 'https://api.openpay.mx';
    static API_VERSION = '/v1/';
    static SANDBOX_URL = 'https://sandbox-api.openpay.mx';
    static SANDBOX_API_VERSION = '/v1/';
    // ── Instance State ───────────────────────────────────────────────
    config;
    apiHttpClient;
    storeHttpClient;
    // ── Resources (public API surface) ───────────────────────────────
    merchant;
    charges;
    payouts;
    fees;
    plans;
    cards;
    customers;
    webhooks;
    tokens;
    checkouts;
    stores;
    pse;
    groups;
    // ── Constructor ──────────────────────────────────────────────────
    constructor(merchantId, privateKey, countryCode = 'mx', isProductionReady) {
        const isSandbox = !isProductionReady;
        this.config = {
            merchantId,
            privateKey,
            isSandbox,
            timeout: 90_000,
        };
        // Create HTTP clients (DIP: resources depend on these abstractions)
        this.apiHttpClient = new http_client_1.UrllibHttpClient();
        this.storeHttpClient = new http_client_1.StoreHttpClient();
        // Set base URLs per country
        this.setBaseUrl(countryCode);
        // Instantiate resources & inject dependencies
        this.merchant = new merchant_1.MerchantResource(this.config, this.apiHttpClient);
        this.charges = new charges_1.ChargesResource(this.config, this.apiHttpClient);
        this.payouts = new payouts_1.PayoutsResource(this.config, this.apiHttpClient);
        this.fees = new fees_1.FeesResource(this.config, this.apiHttpClient);
        this.plans = new plans_1.PlansResource(this.config, this.apiHttpClient);
        this.cards = new cards_1.CardsResource(this.config, this.apiHttpClient);
        this.customers = new customers_1.CustomersResource(this.config, this.apiHttpClient);
        this.webhooks = new webhooks_1.WebhooksResource(this.config, this.apiHttpClient);
        this.tokens = new tokens_1.TokensResource(this.config, this.apiHttpClient);
        this.checkouts = new checkouts_1.CheckoutsResource(this.config, this.apiHttpClient);
        this.pse = new pse_1.PseResource(this.config, this.apiHttpClient);
        this.groups = new groups_1.GroupsResource(this.config, this.apiHttpClient);
        // Stores uses its own HTTP client (different base URL format)
        this.stores = new stores_1.StoresResource(this.config, this.storeHttpClient);
    }
    // ── Configuration Setters ────────────────────────────────────────
    /** Change the merchant ID and rebuild resources. */
    setMerchantId(merchantId) {
        this.config = { ...this.config, merchantId };
        this.rebuildResources();
    }
    /** Change the private key and rebuild resources. */
    setPrivateKey(privateKey) {
        this.config = { ...this.config, privateKey };
        this.rebuildResources();
    }
    /** Toggle sandbox/production mode and rebuild resources. */
    setProductionReady(isProductionReady) {
        this.config = { ...this.config, isSandbox: !isProductionReady };
        this.rebuildResources();
    }
    /** Change the HTTP request timeout and rebuild resources. */
    setTimeout(timeout) {
        this.config = { ...this.config, timeout };
        this.rebuildResources();
    }
    /** Per-country base URL configuration. */
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
    // ── Helpers ──────────────────────────────────────────────────────
    /** Rebuild all resources after a config change. */
    rebuildResources() {
        // Re-assign resource properties (same pattern as original's _reDefine)
        this.merchant = new merchant_1.MerchantResource(this.config, this.apiHttpClient);
        this.charges = new charges_1.ChargesResource(this.config, this.apiHttpClient);
        this.payouts = new payouts_1.PayoutsResource(this.config, this.apiHttpClient);
        this.fees = new fees_1.FeesResource(this.config, this.apiHttpClient);
        this.plans = new plans_1.PlansResource(this.config, this.apiHttpClient);
        this.cards = new cards_1.CardsResource(this.config, this.apiHttpClient);
        this.customers = new customers_1.CustomersResource(this.config, this.apiHttpClient);
        this.webhooks = new webhooks_1.WebhooksResource(this.config, this.apiHttpClient);
        this.tokens = new tokens_1.TokensResource(this.config, this.apiHttpClient);
        this.checkouts = new checkouts_1.CheckoutsResource(this.config, this.apiHttpClient);
        this.pse = new pse_1.PseResource(this.config, this.apiHttpClient);
        this.groups = new groups_1.GroupsResource(this.config, this.apiHttpClient);
        this.stores = new stores_1.StoresResource(this.config, this.storeHttpClient);
    }
}
module.exports = Openpay;
//# sourceMappingURL=openpay.js.map