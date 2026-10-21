import { r as registerInstance, h, H as Host, a as getElement } from './index-25e5af33.js';
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

const scProductDonationCustomAmountCss = "sc-product-donation-custom-amount sc-price-input sc-button{margin-right:-10px !important}.sc-product-donation-custom-amount sc-button{opacity:0;visibility:hidden;transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}.sc-product-donation-custom-amount--has-value sc-button{opacity:1;visibility:visible}";
const ScProductDonationCustomAmountStyle0 = scProductDonationCustomAmountCss;

const ScProductDonationCustomAmount = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.productId = undefined;
        this.value = undefined;
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const checked = !!((_a = this.state()) === null || _a === void 0 ? void 0 : _a.custom_amount);
        return (h(Host, { key: 'f6ce9a8c0b43400fa53e57f5e3a975c11d49233d', class: { 'sc-product-donation-custom-amount': true, 'sc-product-donation-custom-amount--has-value': !!this.value } }, h("sc-choice-container", { key: 'cafe2dbba54c89a4ab854b96cc72b10669b8d034', value: `${(_b = this.state()) === null || _b === void 0 ? void 0 : _b.custom_amount}`, "show-control": "false", checked: checked, onClick: () => this.priceInput.triggerFocus(), onKeyDown: () => {
                this.priceInput.triggerFocus();
            }, role: "button" }, h("sc-visually-hidden", { key: 'c6a84385a0cb8ff96130c6a2e2a47b8bbbdd230e' }, wp.i18n.__('Enter a custom amount.', 'surecart')), h("sc-price-input", { key: '68605ab18cbcd23a97b5ace531326b9e40b9d94c', ref: el => (this.priceInput = el), currencyCode: ((_d = (_c = this.state()) === null || _c === void 0 ? void 0 : _c.selectedPrice) === null || _d === void 0 ? void 0 : _d.currency) || ((_e = window === null || window === void 0 ? void 0 : window.scData) === null || _e === void 0 ? void 0 : _e.currency) || 'usd', showCode: false, showLabel: false, value: `${((_f = this.state()) === null || _f === void 0 ? void 0 : _f.custom_amount) || ''}`, onScChange: e => this.updateState({
                ad_hoc_amount: null,
                custom_amount: e.target.value,
            }), min: (_h = (_g = this.state()) === null || _g === void 0 ? void 0 : _g.selectedPrice) === null || _h === void 0 ? void 0 : _h.ad_hoc_min_amount, max: (_k = (_j = this.state()) === null || _j === void 0 ? void 0 : _j.selectedPrice) === null || _k === void 0 ? void 0 : _k.ad_hoc_max_amount, style: { '--sc-input-border-color-focus': 'var(--sc-input-border-color-hover)', '--sc-focus-ring-color-primary': 'transparent' } }))));
    }
    get el() { return getElement(this); }
};
ScProductDonationCustomAmount.style = ScProductDonationCustomAmountStyle0;

export { ScProductDonationCustomAmount as sc_product_donation_custom_amount };

//# sourceMappingURL=sc-product-donation-custom-amount.entry.js.map