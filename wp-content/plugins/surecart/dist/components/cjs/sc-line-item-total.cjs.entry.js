'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const getters = require('./getters-ade46b86.js');
const mutations = require('./mutations-4133422f.js');
require('./store-29627d6b.js');
require('./index-c3de642f.js');
require('./utils-f5ea3c23.js');
require('./remove-query-args-b57e8cd3.js');
require('./add-query-args-49dcb630.js');
require('./index-fb76df07.js');
require('./google-8dbad1a6.js');
require('./currency-b438c76d.js');
require('./price-9dddd853.js');

const scLineItemTotalCss = ":host{display:block}sc-line-item{text-align:left}.line-item-total__group sc-line-item{margin:4px 0px !important}.scratch-price{text-decoration:line-through;color:var(--sc-color-gray-500);font-size:var(--sc-font-size-small);margin-right:var(--sc-spacing-xx-small)}sc-line-item::part(base){grid-template-columns:max-content auto auto}.total-price{white-space:nowrap}.currency-label{color:var(--sc-color-gray-500);font-size:var(--sc-font-size-xx-small);margin-right:var(--sc-spacing-xx-small);vertical-align:middle}sc-divider{margin:16px 0 !important}.conversion-description{color:var(--sc-color-gray-500);font-size:var(--sc-font-size-small);margin-right:var(--sc-spacing-xx-small)}.total-payments-tooltip::part(base){display:flex;align-items:center;gap:0.25em}";
const ScLineItemTotalStyle0 = scLineItemTotalCss;

const ScLineItemTotal = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.order_key = {
            total: 'total_amount',
            subtotal: 'subtotal_amount',
            amount_due: 'amount_due',
        };
        this.total = 'total';
        this.size = undefined;
        this.checkout = undefined;
    }
    hasInstallmentPlan(checkout) {
        return (checkout === null || checkout === void 0 ? void 0 : checkout.full_amount) !== (checkout === null || checkout === void 0 ? void 0 : checkout.subtotal_amount);
    }
    hasSubscription(checkout) {
        var _a;
        return (((_a = checkout === null || checkout === void 0 ? void 0 : checkout.line_items) === null || _a === void 0 ? void 0 : _a.data) || []).some(lineItem => { var _a, _b, _c; return ((_a = lineItem === null || lineItem === void 0 ? void 0 : lineItem.price) === null || _a === void 0 ? void 0 : _a.recurring_interval) === 'month' && !!((_b = lineItem === null || lineItem === void 0 ? void 0 : lineItem.price) === null || _b === void 0 ? void 0 : _b.recurring_interval) && !((_c = lineItem === null || lineItem === void 0 ? void 0 : lineItem.price) === null || _c === void 0 ? void 0 : _c.recurring_period_count); });
    }
    renderLineItemTitle(checkout) {
        if (this.total === 'total' && this.hasInstallmentPlan(checkout)) {
            return (index.h("span", { slot: "title" }, index.h("slot", { name: "first-payment-total-description" }, wp.i18n.__('Subtotal', 'surecart'))));
        }
        return (index.h("span", { slot: "title" }, index.h("slot", { name: "title" })));
    }
    renderCheckoutFees(checkout) {
        var _a, _b, _c, _d;
        if (!((_b = (_a = checkout === null || checkout === void 0 ? void 0 : checkout.checkout_fees) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length)) {
            return null;
        }
        return (index.h(index.Fragment, null, (_d = (_c = checkout === null || checkout === void 0 ? void 0 : checkout.checkout_fees) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.map(fee => (index.h("sc-line-item", { key: fee.id }, index.h("span", { slot: "description" }, fee.description), index.h("span", { slot: "price" }, fee.display_amount))))));
    }
    renderLineItemDescription(checkout) {
        if (this.total === 'subtotal' && this.hasInstallmentPlan(checkout)) {
            return (index.h("span", { slot: "description" }, index.h("slot", { name: "first-payment-subtotal-description" }, wp.i18n.__('Initial Payment', 'surecart'))));
        }
        return (index.h("span", { slot: "description" }, index.h("slot", { name: "description" })));
    }
    // Determine if the currency should be displayed to avoid duplication in the amount display.
    getCurrencyToDisplay() {
        var _a, _b, _c, _d;
        const checkout = this.checkout || (mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout);
        return ((_b = (_a = checkout === null || checkout === void 0 ? void 0 : checkout.amount_due_default_currency_display_amount) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes((_c = checkout === null || checkout === void 0 ? void 0 : checkout.currency) === null || _c === void 0 ? void 0 : _c.toLowerCase())) ? '' : (_d = checkout === null || checkout === void 0 ? void 0 : checkout.currency) === null || _d === void 0 ? void 0 : _d.toUpperCase();
    }
    renderConversion() {
        var _a;
        if (this.total !== 'total') {
            return null;
        }
        const checkout = this.checkout || (mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout);
        if (!(checkout === null || checkout === void 0 ? void 0 : checkout.show_converted_total)) {
            return null;
        }
        // the currency is the same as the current currency.
        if ((checkout === null || checkout === void 0 ? void 0 : checkout.currency) === (checkout === null || checkout === void 0 ? void 0 : checkout.current_currency)) {
            return null;
        }
        // there is no amount due.
        if (!(checkout === null || checkout === void 0 ? void 0 : checkout.amount_due)) {
            return null;
        }
        return (index.h(index.Fragment, null, index.h("sc-divider", null), index.h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, index.h("span", { slot: "title" }, index.h("slot", { name: "charge-amount-description" }, wp.i18n.__('Payment Total', 'surecart'))), index.h("span", { slot: "price" }, this.getCurrencyToDisplay() && index.h("span", { class: "currency-label" }, this.getCurrencyToDisplay()), checkout === null || checkout === void 0 ? void 0 :
            checkout.amount_due_default_currency_display_amount)), index.h("sc-line-item", null, index.h("span", { slot: "description", class: "conversion-description" }, wp.i18n.sprintf(wp.i18n.__('Your payment will be processed in %s.', 'surecart'), (_a = checkout === null || checkout === void 0 ? void 0 : checkout.currency) === null || _a === void 0 ? void 0 : _a.toUpperCase())))));
    }
    render() {
        var _a;
        const checkout = this.checkout || (mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout);
        // loading state
        if (getters.formBusy() && !(checkout === null || checkout === void 0 ? void 0 : checkout[(_a = this === null || this === void 0 ? void 0 : this.order_key) === null || _a === void 0 ? void 0 : _a[this === null || this === void 0 ? void 0 : this.total]])) {
            return (index.h("sc-line-item", null, index.h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), index.h("sc-skeleton", { slot: "price", style: { 'width': '70px', 'display': 'inline-block', 'height': this.size === 'large' ? '40px' : '', '--border-radius': '6px' } })));
        }
        if (!(checkout === null || checkout === void 0 ? void 0 : checkout.currency))
            return;
        // if the total amount is different than the amount due.
        if (this.total === 'total' && (checkout === null || checkout === void 0 ? void 0 : checkout.total_amount) !== (checkout === null || checkout === void 0 ? void 0 : checkout.amount_due)) {
            return (index.h("div", { class: "line-item-total__group" }, index.h("sc-line-item", null, index.h("span", { slot: "description" }, this.hasInstallmentPlan(checkout) ? (this.renderLineItemTitle(checkout)) : (index.h(index.Fragment, null, index.h("slot", { name: "title" }), index.h("slot", { name: "description" })))), index.h("span", { slot: "price" }, index.h("sc-total", { total: this.total, checkout: checkout }))), !!checkout.trial_amount && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, index.h("slot", { name: "free-trial-description" }, wp.i18n.__('Trial', 'surecart'))), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.trial_display_amount))), index.h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, this.hasSubscription(checkout) ? (index.h("span", { slot: "title" }, index.h("slot", { name: "subscription-title" }, wp.i18n.__('Total Due Today', 'surecart')))) : (index.h("span", { slot: "title" }, index.h("slot", { name: "due-amount-description" }, wp.i18n.__('Amount Due', 'surecart')))), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.amount_due_display_amount)), this.renderConversion()));
        }
        return (index.h(index.Fragment, null, this.total === 'subtotal' && this.hasInstallmentPlan(checkout) && (index.h("sc-line-item", { style: this.size === 'large' ? { '--price-size': 'var(--sc-font-size-x-large)' } : {} }, index.h("span", { slot: "description" }, !!(checkout === null || checkout === void 0 ? void 0 : checkout.discount_amount) ? (index.h("sc-tooltip", { class: "total-payments-tooltip", type: "text", text: wp.i18n.__('This is the total of all installment payments at full price, before any discounts are applied.', 'surecart'), width: "275px" }, index.h("slot", { name: "total-payments-description" }, wp.i18n.__('Total Installments', 'surecart')), " ", wp.i18n.__('(before discounts)', 'surecart'), index.h("sc-icon", { name: "info", "aria-hidden": "true" }), index.h("sc-visually-hidden", null, wp.i18n.__('This is the total of all installment payments at full price, before any discounts are applied.', 'surecart')))) : (index.h("slot", { name: "total-payments-description" }, wp.i18n.__('Total Installments', 'surecart')))), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.full_display_amount))), index.h("sc-line-item", { style: this.size === 'large' ? { '--price-size': 'var(--sc-font-size-x-large)' } : {} }, this.renderLineItemTitle(checkout), this.renderLineItemDescription(checkout), index.h("span", { slot: "price" }, !!(checkout === null || checkout === void 0 ? void 0 : checkout.total_savings_amount) && this.total === 'total' && index.h("span", { class: "scratch-price" }, checkout === null || checkout === void 0 ? void 0 : checkout.total_scratch_display_amount), index.h("sc-total", { class: "total-price", total: this.total, checkout: checkout }))), this.renderConversion(), this.total === 'subtotal' && this.renderCheckoutFees(checkout)));
    }
};
ScLineItemTotal.style = ScLineItemTotalStyle0;

exports.sc_line_item_total = ScLineItemTotal;

//# sourceMappingURL=sc-line-item-total.cjs.entry.js.map