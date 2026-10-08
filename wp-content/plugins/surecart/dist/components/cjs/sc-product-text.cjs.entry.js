'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const watchers = require('./watchers-24b78a31.js');
require('./index-c3de642f.js');
require('./google-15c85d5e.js');
require('./currency-b438c76d.js');
require('./google-8dbad1a6.js');
require('./utils-f5ea3c23.js');
require('./util-a15c420c.js');
require('./index-fb76df07.js');

const scProductTextCss = ":host{display:block}p{margin-block-start:0;margin-block-end:1em}";
const ScProductTextStyle0 = scProductTextCss;

const ScProductText = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.text = 'name';
        this.productId = undefined;
    }
    render() {
        var _a;
        const product = (_a = watchers.state[this.productId]) === null || _a === void 0 ? void 0 : _a.product;
        if (product === null || product === void 0 ? void 0 : product[this.text]) {
            return index.h("span", { style: { whiteSpace: 'pre-line' }, innerHTML: product[this.text] });
        }
        return (index.h(index.Host, null, index.h("slot", null)));
    }
};
ScProductText.style = ScProductTextStyle0;

exports.sc_product_text = ScProductText;

//# sourceMappingURL=sc-product-text.cjs.entry.js.map