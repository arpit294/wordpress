import { r as registerInstance, h, a as getElement, H as Host } from './index-25e5af33.js';
import { i as isInRange } from './util-dfbf863e.js';
import { s as state, c as getInRangeAmounts, u as updateDonationState } from './watchers-557716d9.js';
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
import './mutations-acb88b38.js';
import './mutations-7458343f.js';
import './index-396e50a3.js';
import './fetch-cdff67be.js';
import './index-824c562b.js';

const scProductDonationAmountChoiceCss = "";
const ScProductDonationAmountChoiceStyle0 = scProductDonationAmountChoiceCss;

const ScProductDonationAmountChoice = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.productId = undefined;
        this.value = undefined;
        this.label = undefined;
    }
    state() {
        return state[this.productId];
    }
    render() {
        var _a;
        const amounts = getInRangeAmounts(this.productId);
        const order = amounts.indexOf(this.value);
        if (!isInRange(this.value, this.state().selectedPrice) || order < 0)
            return h(Host, { style: { display: 'none' } });
        return (h("sc-choice-container", { "show-control": "false", checked: this.state().ad_hoc_amount === this.value, onScChange: () => updateDonationState(this.productId, { ad_hoc_amount: this.value, custom_amount: null }), "aria-label": wp.i18n.sprintf(wp.i18n.__('%d of %d', 'surecart'), order + 1, amounts.length), role: "button" }, this.label ? (this.label) : (h("sc-format-number", { type: "currency", currency: (_a = this.state().selectedPrice) === null || _a === void 0 ? void 0 : _a.currency, value: this.value, "minimum-fraction-digits": "0" }))));
    }
    get el() { return getElement(this); }
};
ScProductDonationAmountChoice.style = ScProductDonationAmountChoiceStyle0;

export { ScProductDonationAmountChoice as sc_product_donation_amount_choice };

//# sourceMappingURL=sc-product-donation-amount-choice.entry.js.map