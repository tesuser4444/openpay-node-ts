import { BaseResource } from '../base-resource';
import type { HttpClient } from '../http-client';
import type { Callback, OpenpayConfig, QueryParams } from '../types';

// ── Customer Sub-Resources ─────────────────────────────────────────

class CustomerCards extends BaseResource {
  constructor(config: OpenpayConfig, httpClient: HttpClient) {
    super(config, httpClient, `${config.merchantId}/customers`);
  }

  create(customerId: string, data: unknown, callback: Callback): void {
    this.request('POST', this.url(`${customerId}/cards`), data, callback);
  }

  list(customerId: string, callback: Callback): void;
  list(customerId: string, data: QueryParams, callback: Callback): void;
  list(customerId: string, dataOrCb: QueryParams | Callback, cb?: Callback): void {
    const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
    this.request('GET', this.urlWithQuery(`${customerId}/cards`, query), undefined, resolvedCb!);
  }

  get(customerId: string, cardId: string, callback: Callback): void {
    this.request('GET', this.url(`${customerId}/cards/${cardId}`), undefined, callback);
  }

  delete(customerId: string, cardId: string, callback: Callback): void {
    this.request('DELETE', this.url(`${customerId}/cards/${cardId}`), undefined, callback);
  }
}

class CustomerCharges extends BaseResource {
  constructor(config: OpenpayConfig, httpClient: HttpClient) {
    super(config, httpClient, `${config.merchantId}/customers`);
  }

  create(customerId: string, data: unknown, callback: Callback): void {
    this.request('POST', this.url(`${customerId}/charges`), data, callback);
  }

  list(customerId: string, callback: Callback): void;
  list(customerId: string, data: QueryParams, callback: Callback): void;
  list(customerId: string, dataOrCb: QueryParams | Callback, cb?: Callback): void {
    const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
    this.request('GET', this.urlWithQuery(`${customerId}/charges`, query), undefined, resolvedCb!);
  }

  get(customerId: string, transactionId: string, callback: Callback): void {
    this.request('GET', this.url(`${customerId}/charges/${transactionId}`), undefined, callback);
  }

  capture(customerId: string, transactionId: string, data: unknown, callback: Callback): void {
    this.request('POST', this.url(`${customerId}/charges/${transactionId}/capture`), data, callback);
  }

  refund(customerId: string, transactionId: string, data: unknown, callback: Callback): void {
    this.request('POST', this.url(`${customerId}/charges/${transactionId}/refund`), data, callback);
  }
}

class CustomerTransfers extends BaseResource {
  constructor(config: OpenpayConfig, httpClient: HttpClient) {
    super(config, httpClient, `${config.merchantId}/customers`);
  }

  create(customerId: string, data: unknown, callback: Callback): void {
    this.request('POST', this.url(`${customerId}/transfers`), data, callback);
  }

  list(customerId: string, callback: Callback): void;
  list(customerId: string, data: QueryParams, callback: Callback): void;
  list(customerId: string, dataOrCb: QueryParams | Callback, cb?: Callback): void {
    const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
    this.request('GET', this.urlWithQuery(`${customerId}/transfers`, query), undefined, resolvedCb!);
  }

  get(customerId: string, transactionId: string, callback: Callback): void {
    this.request('GET', this.url(`${customerId}/transfers/${transactionId}`), undefined, callback);
  }
}

class CustomerPayouts extends BaseResource {
  constructor(config: OpenpayConfig, httpClient: HttpClient) {
    super(config, httpClient, `${config.merchantId}/customers`);
  }

  create(customerId: string, data: unknown, callback: Callback): void {
    this.request('POST', this.url(`${customerId}/payouts`), data, callback);
  }

  list(customerId: string, callback: Callback): void;
  list(customerId: string, data: QueryParams, callback: Callback): void;
  list(customerId: string, dataOrCb: QueryParams | Callback, cb?: Callback): void {
    const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
    this.request('GET', this.urlWithQuery(`${customerId}/payouts`, query), undefined, resolvedCb!);
  }

  get(customerId: string, transactionId: string, callback: Callback): void {
    this.request('GET', this.url(`${customerId}/payouts/${transactionId}`), undefined, callback);
  }
}

class CustomerSubscriptions extends BaseResource {
  constructor(config: OpenpayConfig, httpClient: HttpClient) {
    super(config, httpClient, `${config.merchantId}/customers`);
  }

  create(customerId: string, data: unknown, callback: Callback): void {
    this.request('POST', this.url(`${customerId}/subscriptions`), data, callback);
  }

  list(customerId: string, callback: Callback): void;
  list(customerId: string, data: QueryParams, callback: Callback): void;
  list(customerId: string, dataOrCb: QueryParams | Callback, cb?: Callback): void {
    const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
    this.request('GET', this.urlWithQuery(`${customerId}/subscriptions`, query), undefined, resolvedCb!);
  }

  get(customerId: string, subscriptionId: string, callback: Callback): void {
    this.request('GET', this.url(`${customerId}/subscriptions/${subscriptionId}`), undefined, callback);
  }

  update(customerId: string, subscriptionId: string, data: unknown, callback: Callback): void {
    this.request('PUT', this.url(`${customerId}/subscriptions/${subscriptionId}`), data, callback);
  }

  delete(customerId: string, subscriptionId: string, callback: Callback): void {
    this.request('DELETE', this.url(`${customerId}/subscriptions/${subscriptionId}`), undefined, callback);
  }
}

class CustomerBankAccounts extends BaseResource {
  constructor(config: OpenpayConfig, httpClient: HttpClient) {
    super(config, httpClient, `${config.merchantId}/customers`);
  }

  create(customerId: string, data: unknown, callback: Callback): void {
    this.request('POST', this.url(`${customerId}/bankaccounts`), data, callback);
  }

  get(customerId: string, bankAccountId: string, callback: Callback): void {
    this.request('GET', this.url(`${customerId}/bankaccounts/${bankAccountId}`), undefined, callback);
  }

  delete(customerId: string, bankAccountId: string, callback: Callback): void {
    this.request('DELETE', this.url(`${customerId}/bankaccounts/${bankAccountId}`), undefined, callback);
  }

  list(customerId: string, callback: Callback): void;
  list(customerId: string, data: QueryParams, callback: Callback): void;
  list(customerId: string, dataOrCb: QueryParams | Callback, cb?: Callback): void {
    const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
    this.request('GET', this.urlWithQuery(`${customerId}/bankaccounts`, query), undefined, resolvedCb!);
  }
}

// ── Main Customers Resource ────────────────────────────────────────

export class CustomersResource extends BaseResource {
  public readonly cards: CustomerCards;
  public readonly charges: CustomerCharges;
  public readonly transfers: CustomerTransfers;
  public readonly payouts: CustomerPayouts;
  public readonly subscriptions: CustomerSubscriptions;
  public readonly bankaccounts: CustomerBankAccounts;

  constructor(config: OpenpayConfig, httpClient: HttpClient) {
    super(config, httpClient, `${config.merchantId}/customers`);

    // Compose sub-resources (each shares the same config & http client)
    this.cards = new CustomerCards(config, httpClient);
    this.charges = new CustomerCharges(config, httpClient);
    this.transfers = new CustomerTransfers(config, httpClient);
    this.payouts = new CustomerPayouts(config, httpClient);
    this.subscriptions = new CustomerSubscriptions(config, httpClient);
    this.bankaccounts = new CustomerBankAccounts(config, httpClient);
  }

  create(data: unknown, callback: Callback): void {
    this.request('POST', this.url(), data, callback);
  }

  list(callback: Callback): void;
  list(data: QueryParams, callback: Callback): void;
  list(dataOrCb: QueryParams | Callback, cb?: Callback): void {
    const { query, cb: resolvedCb } = this.resolveListParams(dataOrCb, cb);
    this.request('GET', this.url() + query, undefined, resolvedCb!);
  }

  get(customerId: string, callback: Callback): void {
    this.request('GET', this.url(customerId), undefined, callback);
  }

  update(customerId: string, data: unknown, callback: Callback): void {
    this.request('PUT', this.url(customerId), data, callback);
  }

  delete(customerId: string, callback: Callback): void {
    this.request('DELETE', this.url(customerId), undefined, callback);
  }
}
