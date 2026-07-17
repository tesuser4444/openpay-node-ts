"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeBrackets = escapeBrackets;
function escapeBrackets(url) {
    url = url.replace(new RegExp('\\[', 'g'), encodeURI('['));
    url = url.replace(new RegExp('\\]', 'g'), encodeURI(']'));
    console.log('3:', url);
    return url;
}
//# sourceMappingURL=url-utils.js.map