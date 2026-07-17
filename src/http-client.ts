import * as http from 'http';
import * as urllib from 'urllib';
import type { HttpMethod, OpenpayConfig, Callback } from './types';
import { OpenpayError, NetworkError } from './errors';
import { escapeBrackets } from './url-utils';

// ── HTTP Client Interface (DIP: resources depend on this, not on urllib) ─

export interface HttpClient {
  request(
    method: HttpMethod,
    url: string,
    body: unknown | undefined,
    config: OpenpayConfig,
    callback: Callback,
  ): void;
}

// ── Urllib-based Implementation ────────────────────────────────────

export class UrllibHttpClient implements HttpClient {
  request(
    method: HttpMethod,
    url: string,
    body: unknown | undefined,
    config: OpenpayConfig,
    callback: Callback,
  ): void {
    const baseUrl = config.isSandbox
      ? UrllibHttpClient.SANDBOX_URL + UrllibHttpClient.API_VERSION
      : UrllibHttpClient.BASE_URL + UrllibHttpClient.API_VERSION;

    const fullUrl = baseUrl + escapeBrackets(url);

    const options: urllib.RequestOptions = {
      auth: config.privateKey + ':',
      method,
      contentType: 'json',
      timeout: config.timeout,
      data: body,
      dataType: 'json',
    };

    urllib.request(fullUrl, options, (err: Error | null, respBody: unknown, res: http.IncomingMessage) => {
      if (err) {
        callback(new NetworkError(err), null, null);
        return;
      }

      const resCode: number = res?.statusCode ?? 0;
      const isSuccess = resCode === 200 || resCode === 201 || resCode === 204;

      if (isSuccess) {
        callback(null, respBody, { statusCode: resCode, headers: res?.headers ?? {} });
      } else {
        const openpayErr = new OpenpayError(
          `HTTP ${resCode}`,
          resCode,
          respBody,
        );
        callback(openpayErr, null, { statusCode: resCode, headers: res?.headers ?? {} });
      }
    });
  }

  static BASE_URL = 'https://api.openpay.mx';
  static API_VERSION = '/v1/';
  static SANDBOX_URL = 'https://sandbox-api.openpay.mx';
}

// ── Store HTTP Client (uses different base URL format) ─────────────

export class StoreHttpClient implements HttpClient {
  request(
    method: HttpMethod,
    url: string,
    body: unknown | undefined,
    config: OpenpayConfig,
    callback: Callback,
  ): void {
    const baseUrl = config.isSandbox
      ? UrllibHttpClient.SANDBOX_URL + '/'
      : UrllibHttpClient.BASE_URL + '/';

    const fullUrl = baseUrl + escapeBrackets(url);

    const options: urllib.RequestOptions = {
      auth: config.privateKey + ':',
      method,
      contentType: 'json',
      timeout: config.timeout,
      data: body,
      dataType: 'json',
    };

    urllib.request(fullUrl, options, (err: Error | null, respBody: unknown, res: http.IncomingMessage) => {
      if (err) {
        callback(new NetworkError(err), null, null);
        return;
      }

      const resCode: number = res?.statusCode ?? 0;
      const isSuccess = resCode === 200 || resCode === 201 || resCode === 204;

      if (isSuccess) {
        callback(null, respBody, { statusCode: resCode, headers: res?.headers ?? {} });
      } else {
        const openpayErr = new OpenpayError(
          `HTTP ${resCode}`,
          resCode,
          respBody,
        );
        callback(openpayErr, null, { statusCode: resCode, headers: res?.headers ?? {} });
      }
    });
  }
}
