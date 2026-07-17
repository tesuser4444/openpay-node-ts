"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeBrackets = escapeBrackets;
/**
 * Escapes square brackets in URLs so they're safe for Openpay's API
 * (which uses bracket notation in query params, e.g. creation[gte]).
 */
function escapeBrackets(url) {
    let result = url.replace(/\[/g, encodeURI('['));
    result = result.replace(/\]/g, encodeURI(']'));
    return result;
}
//# sourceMappingURL=url-utils.js.map