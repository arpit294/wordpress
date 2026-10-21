'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const watchers = require('./watchers-4feb1197.js');
require('./index-c3de642f.js');
require('./utils-f5ea3c23.js');
require('./getters-1ff518bc.js');
require('./mutations-4133422f.js');
require('./remove-query-args-b57e8cd3.js');
require('./add-query-args-49dcb630.js');
require('./index-fb76df07.js');
require('./google-8dbad1a6.js');
require('./currency-b438c76d.js');
require('./store-29627d6b.js');
require('./price-9dddd853.js');
require('./store-5cd165ea.js');
require('./address-7404695f.js');
require('./util-a15c420c.js');
require('./mutations-fdb67675.js');
require('./mutations-d5d6ddf1.js');
require('./index-c5bd66ae.js');
require('./fetch-5e8dc1d5.js');
require('./index-7ced8198.js');

const scProductDonationCustomAmountCss = "sc-product-donation-custom-amount sc-price-input sc-button{margin-right:-10px !important}.sc-product-donation-custom-amount sc-button{opacity:0;visibility:hidden;transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}.sc-product-donation-custom-amount--has-value sc-button{opacity:1;visibility:visible}";
const ScProductDonationCustomAmountStyle0 = scProductDonationCustomAmountCss;

const ScProductDonationCustomAmount = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.productId = undefined;
        this.value = undefined;
    }
    state() {
        return watchers.state[this.productId];
    }
    updateState(data) {
        watchers.state[this.productId] = {
            ...watchers.state[this.productId],
            ...data,
        };
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const checked = !!((_a = this.state()) === null || _a === void 0 ? void 0 : _a.custom_amount);
        return (index.h(index.Host, { key: 'f6ce9a8c0b43400fa53e57f5e3a975c11d49233d', class: { 'sc-product-donation-custom-amount': true, 'sc-product-donation-custom-amount--has-value': !!this.value } }, index.h("sc-choice-container", { key: 'cafe2dbba54c89a4ab854b96cc72b10669b8d034', value: `${(_b = this.state()) === null || _b === void 0 ? void 0 : _b.custom_amount}`, "show-control": "false", checked: checked, onClick: () => this.priceInput.triggerFocus(), onKeyDown: () => {
                this.priceInput.triggerFocus();
            }, role: "button" }, index.h("sc-visually-hidden", { key: 'c6a84385a0cb8ff96130c6a2e2a47b8bbbdd230e' }, wp.i18n.__('Enter a custom amount.', 'surecart')), index.h("sc-price-input", { key: '68605ab18cbcd23a97b5ace531326b9e40b9d94c', ref: el => (this.priceInput = el), currencyCode: ((_d = (_c = this.state()) === null || _c === void 0 ? void 0 : _c.selectedPrice) === null || _d === void 0 ? void 0 : _d.currency) || ((_e = window === null || window === void 0 ? void 0 : window.scData) === null || _e === void 0 ? void 0 : _e.currency) || 'usd', showCode: false, showLabel: false, value: `${((_f = this.state()) === null || _f === void 0 ? void 0 : _f.custom_amount) || ''}`, onScChange: e => this.updateState({
                ad_hoc_amount: null,
                custom_amount: e.target.value,
            }), min: (_h = (_g = this.state()) === null || _g === void 0 ? void 0 : _g.selectedPrice) === null || _h === void 0 ? void 0 : _h.ad_hoc_min_amount, max: (_k = (_j = this.state()) === null || _j === void 0 ? void 0 : _j.selectedPrice) === null || _k === void 0 ? void 0 : _k.ad_hoc_max_amount, style: { '--sc-input-border-color-focus': 'var(--sc-input-border-color-hover)', '--sc-focus-ring-color-primary': 'transparent' } }))));
    }
    get el() { return index.getElement(this); }
};
ScProductDonationCustomAmount.style = ScProductDonationCustomAmountStyle0;

exports.sc_product_donation_custom_amount = ScProductDonationCustomAmount;

//# sourceMappingURL=sc-product-donation-custom-amount.cjs.entry.js.map