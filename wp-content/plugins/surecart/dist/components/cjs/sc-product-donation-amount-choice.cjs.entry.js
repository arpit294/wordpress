'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const util = require('./util-a15c420c.js');
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
require('./mutations-fdb67675.js');
require('./mutations-d5d6ddf1.js');
require('./index-c5bd66ae.js');
require('./fetch-5e8dc1d5.js');
require('./index-7ced8198.js');

const scProductDonationAmountChoiceCss = "";
const ScProductDonationAmountChoiceStyle0 = scProductDonationAmountChoiceCss;

const ScProductDonationAmountChoice = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.productId = undefined;
        this.value = undefined;
        this.label = undefined;
    }
    state() {
        return watchers.state[this.productId];
    }
    render() {
        var _a;
        const amounts = watchers.getInRangeAmounts(this.productId);
        const order = amounts.indexOf(this.value);
        if (!util.isInRange(this.value, this.state().selectedPrice) || order < 0)
            return index.h(index.Host, { style: { display: 'none' } });
        return (index.h("sc-choice-container", { "show-control": "false", checked: this.state().ad_hoc_amount === this.value, onScChange: () => watchers.updateDonationState(this.productId, { ad_hoc_amount: this.value, custom_amount: null }), "aria-label": wp.i18n.sprintf(wp.i18n.__('%d of %d', 'surecart'), order + 1, amounts.length), role: "button" }, this.label ? (this.label) : (index.h("sc-format-number", { type: "currency", currency: (_a = this.state().selectedPrice) === null || _a === void 0 ? void 0 : _a.currency, value: this.value, "minimum-fraction-digits": "0" }))));
    }
    get el() { return index.getElement(this); }
};
ScProductDonationAmountChoice.style = ScProductDonationAmountChoiceStyle0;

exports.sc_product_donation_amount_choice = ScProductDonationAmountChoice;

//# sourceMappingURL=sc-product-donation-amount-choice.cjs.entry.js.map