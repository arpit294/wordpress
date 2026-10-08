import { r as registerInstance, h, F as Fragment, H as Host } from './index-25e5af33.js';
import { i as intervalString } from './price-39d60d32.js';
import { j as availablePrices, s as state, b as setProduct } from './watchers-43c9573f.js';
import './currency-eb33deae.js';
import './index-18f5a1bc.js';
import './google-5e2052e8.js';
import './google-e9085e27.js';
import './utils-2fd36c2c.js';
import './util-dfbf863e.js';
import './index-c5a96d53.js';

const scProductPriceChoicesCss = ":host{display:block;text-align:left;position:relative;z-index:1}";
const ScProductPriceChoicesStyle0 = scProductPriceChoicesCss;

const ScProductPriceChoices = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.label = undefined;
        this.showPrice = undefined;
        this.productId = undefined;
    }
    renderPrice(price) {
        return (h(Fragment, null, h("sc-format-number", { type: "currency", value: price.amount, currency: price.currency }), h("span", { slot: "per" }, intervalString(price, {
            labels: {
                interval: wp.i18n.__('Every', 'surecart'),
                period: wp.i18n.__('for', 'surecart'),
                once: wp.i18n.__('Once', 'surecart'),
            },
            showOnce: true,
        }))));
    }
    render() {
        const prices = availablePrices(this.productId);
        if ((prices === null || prices === void 0 ? void 0 : prices.length) < 2)
            return h(Host, { style: { display: 'none' } });
        return (h("sc-choices", { label: this.label, required: true, style: { '--sc-input-required-indicator': ' ' } }, (prices || []).map(price => {
            var _a, _b, _c, _d;
            return (h("sc-price-choice-container", { label: (price === null || price === void 0 ? void 0 : price.name) || ((_b = (_a = state[this.productId]) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.name), showPrice: !!this.showPrice, price: price, checked: ((_d = (_c = state[this.productId]) === null || _c === void 0 ? void 0 : _c.selectedPrice) === null || _d === void 0 ? void 0 : _d.id) === (price === null || price === void 0 ? void 0 : price.id), onScChange: e => {
                    if (e.target.checked) {
                        setProduct(this.productId, { selectedPrice: price });
                    }
                } }));
        })));
    }
};
ScProductPriceChoices.style = ScProductPriceChoicesStyle0;

export { ScProductPriceChoices as sc_product_price_choices };

//# sourceMappingURL=sc-product-price-choices.entry.js.map