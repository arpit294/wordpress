import { r as registerInstance, h, a as getElement, H as Host } from './index-25e5af33.js';
import { s as state } from './watchers-557716d9.js';
import './index-18f5a1bc.js';
import './utils-2fd36c2c.js';
import './getters-ed04d1c9.js';
import './mutations-54fc7af1.js';
import './remove-query-args-938c53ea.js';
import './add-query-args-0e2a8393.js';
import './index-c5a96d53.js';
import './google-e9085e27.js';
import './currency-eb33deae.js';
import './store-fd165874.js';
import './price-39d60d32.js';
import './store-ea636731.js';
import './address-b8e2e4c8.js';
import './util-dfbf863e.js';
import './mutations-acb88b38.js';
import './mutations-7458343f.js';
import './index-396e50a3.js';
import './fetch-cdff67be.js';
import './index-824c562b.js';

const scProductDonationChoicesCss = ":host{display:block}.sc-product-donation-choices{display:grid;gap:2em;position:relative;--columns:4}.sc-product-donation-choices__form{display:grid;gap:var(--sc-spacing-small)}.sc-donation-recurring-choices{display:grid;gap:var(--sc-spacing-small);position:relative;--columns:2}";
const ScProductDonationChoicesStyle0 = scProductDonationChoicesCss;

const ScProductDonationChoice = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.productId = undefined;
        this.label = undefined;
        this.recurring = undefined;
    }
    state() {
        return state[this.productId];
    }
    updateState(data) {
        state[this.productId] = {
            ...state[this.productId],
            ...data,
        };
    }
    render() {
        var _a, _b, _c, _d;
        const prices = (((_c = (_b = (_a = this.state()) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.prices) === null || _c === void 0 ? void 0 : _c.data) || [])
            .filter(price => (this.recurring ? (price === null || price === void 0 ? void 0 : price.recurring_interval) && (price === null || price === void 0 ? void 0 : price.ad_hoc) : !(price === null || price === void 0 ? void 0 : price.recurring_interval) && (price === null || price === void 0 ? void 0 : price.ad_hoc)))
            .filter(price => !(price === null || price === void 0 ? void 0 : price.archived));
        // no prices, or less than 2 prices, we have no choices.
        if (!(prices === null || prices === void 0 ? void 0 : prices.length)) {
            return h(Host, { style: { display: 'none' } });
        }
        // return price choice container.
        return (h("sc-recurring-price-choice-container", { prices: prices.sort((a, b) => (a === null || a === void 0 ? void 0 : a.position) - (b === null || b === void 0 ? void 0 : b.position)), product: (_d = this.state()) === null || _d === void 0 ? void 0 : _d.product, selectedPrice: this.state().selectedPrice, showDetails: false, showAmount: false, onScChange: e => {
                var _a, _b;
                const selectedPrice = (((_b = (_a = this.state().product) === null || _a === void 0 ? void 0 : _a.prices) === null || _b === void 0 ? void 0 : _b.data) || []).find(({ id }) => id == e.detail);
                this.updateState({ selectedPrice });
            }, "aria-label": this.recurring
                ? wp.i18n.__('If you want to make your donation recurring then Press Tab once & select the recurring interval from the dropdown. ', 'surecart')
                : wp.i18n.__('If you want to make your donation once then Press Enter. ', 'surecart'), style: { '--sc-recurring-price-choice-white-space': 'wrap', '--sc-recurring-price-choice-text-align': 'left' } }, h("slot", null, this.label)));
    }
    get el() { return getElement(this); }
};
ScProductDonationChoice.style = ScProductDonationChoicesStyle0;

export { ScProductDonationChoice as sc_product_donation_choices };

//# sourceMappingURL=sc-product-donation-choices.entry.js.map