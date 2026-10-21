import { r as registerInstance, h, H as Host } from './index-25e5af33.js';
import { s as state } from './watchers-43c9573f.js';
import './index-18f5a1bc.js';
import './google-5e2052e8.js';
import './currency-eb33deae.js';
import './google-e9085e27.js';
import './utils-2fd36c2c.js';
import './util-dfbf863e.js';
import './index-c5a96d53.js';

const scProductTextCss = ":host{display:block}p{margin-block-start:0;margin-block-end:1em}";
const ScProductTextStyle0 = scProductTextCss;

const ScProductText = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.text = 'name';
        this.productId = undefined;
    }
    render() {
        var _a;
        const product = (_a = state[this.productId]) === null || _a === void 0 ? void 0 : _a.product;
        if (product === null || product === void 0 ? void 0 : product[this.text]) {
            return h("span", { style: { whiteSpace: 'pre-line' }, innerHTML: product[this.text] });
        }
        return (h(Host, null, h("slot", null)));
    }
};
ScProductText.style = ScProductTextStyle0;

export { ScProductText as sc_product_text };

//# sourceMappingURL=sc-product-text.entry.js.map