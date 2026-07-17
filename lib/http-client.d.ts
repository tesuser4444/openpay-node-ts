import type { HttpMethod, OpenpayConfig, Callback } from './types';
export interface HttpClient {
    request(method: HttpMethod, url: string, body: unknown | undefined, config: OpenpayConfig, callback: Callback): void;
}
export declare class UrllibHttpClient implements HttpClient {
    request(method: HttpMethod, url: string, body: unknown | undefined, config: OpenpayConfig, callback: Callback): void;
    static BASE_URL: string;
    static API_VERSION: string;
    static SANDBOX_URL: string;
}
export declare class StoreHttpClient implements HttpClient {
    request(method: HttpMethod, url: string, body: unknown | undefined, config: OpenpayConfig, callback: Callback): void;
}
//# sourceMappingURL=http-client.d.ts.map