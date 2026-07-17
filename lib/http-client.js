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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreHttpClient = exports.UrllibHttpClient = void 0;
const urllib = __importStar(require("urllib"));
const errors_1 = require("./errors");
const url_utils_1 = require("./url-utils");
// ── Urllib-based Implementation ────────────────────────────────────
class UrllibHttpClient {
    request(method, url, body, config, callback) {
        const baseUrl = config.isSandbox
            ? UrllibHttpClient.SANDBOX_URL + UrllibHttpClient.API_VERSION
            : UrllibHttpClient.BASE_URL + UrllibHttpClient.API_VERSION;
        const fullUrl = baseUrl + (0, url_utils_1.escapeBrackets)(url);
        const options = {
            auth: config.privateKey + ':',
            method,
            contentType: 'json',
            timeout: config.timeout,
            data: body,
            dataType: 'json',
        };
        urllib.request(fullUrl, options, (err, respBody, res) => {
            if (err) {
                callback(new errors_1.NetworkError(err), null, null);
                return;
            }
            const resCode = res?.statusCode ?? 0;
            const isSuccess = resCode === 200 || resCode === 201 || resCode === 204;
            if (isSuccess) {
                callback(null, respBody, { statusCode: resCode, headers: res?.headers ?? {} });
            }
            else {
                const openpayErr = new errors_1.OpenpayError(`HTTP ${resCode}`, resCode, respBody);
                callback(openpayErr, null, { statusCode: resCode, headers: res?.headers ?? {} });
            }
        });
    }
    static BASE_URL = 'https://api.openpay.mx';
    static API_VERSION = '/v1/';
    static SANDBOX_URL = 'https://sandbox-api.openpay.mx';
}
exports.UrllibHttpClient = UrllibHttpClient;
// ── Store HTTP Client (uses different base URL format) ─────────────
class StoreHttpClient {
    request(method, url, body, config, callback) {
        const baseUrl = config.isSandbox
            ? UrllibHttpClient.SANDBOX_URL + '/'
            : UrllibHttpClient.BASE_URL + '/';
        const fullUrl = baseUrl + (0, url_utils_1.escapeBrackets)(url);
        const options = {
            auth: config.privateKey + ':',
            method,
            contentType: 'json',
            timeout: config.timeout,
            data: body,
            dataType: 'json',
        };
        urllib.request(fullUrl, options, (err, respBody, res) => {
            if (err) {
                callback(new errors_1.NetworkError(err), null, null);
                return;
            }
            const resCode = res?.statusCode ?? 0;
            const isSuccess = resCode === 200 || resCode === 201 || resCode === 204;
            if (isSuccess) {
                callback(null, respBody, { statusCode: resCode, headers: res?.headers ?? {} });
            }
            else {
                const openpayErr = new errors_1.OpenpayError(`HTTP ${resCode}`, resCode, respBody);
                callback(openpayErr, null, { statusCode: resCode, headers: res?.headers ?? {} });
            }
        });
    }
}
exports.StoreHttpClient = StoreHttpClient;
//# sourceMappingURL=http-client.js.map