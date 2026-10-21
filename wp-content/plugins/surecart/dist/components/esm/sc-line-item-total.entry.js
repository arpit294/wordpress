import { r as registerInstance, h, F as Fragment } from './index-25e5af33.js';
import { f as formBusy } from './getters-3801a0c9.js';
import { s as state } from './mutations-54fc7af1.js';
import './store-fd165874.js';
import './index-18f5a1bc.js';
import './utils-2fd36c2c.js';
import './remove-query-args-938c53ea.js';
import './add-query-args-0e2a8393.js';
import './index-c5a96d53.js';
import './google-e9085e27.js';
import './currency-eb33deae.js';
import './price-39d60d32.js';

const scLineItemTotalCss = ":host{display:block}sc-line-item{text-align:left}.line-item-total__group sc-line-item{margin:4px 0px !important}.scratch-price{text-decoration:line-through;color:var(--sc-color-gray-500);font-size:var(--sc-font-size-small);margin-right:var(--sc-spacing-xx-small)}sc-line-item::part(base){grid-template-columns:max-content auto auto}.total-price{white-space:nowrap}.currency-label{color:var(--sc-color-gray-500);font-size:var(--sc-font-size-xx-small);margin-right:var(--sc-spacing-xx-small);vertical-align:middle}sc-divider{margin:16px 0 !important}.conversion-description{color:var(--sc-color-gray-500);font-size:var(--sc-font-size-small);margin-right:var(--sc-spacing-xx-small)}.total-payments-tooltip::part(base){display:flex;align-items:center;gap:0.25em}";
const ScLineItemTotalStyle0 = scLineItemTotalCss;

const ScLineItemTotal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
            return (h("span", { slot: "title" }, h("slot", { name: "first-payment-total-description" }, wp.i18n.__('Subtotal', 'surecart'))));
        }
        return (h("span", { slot: "title" }, h("slot", { name: "title" })));
    }
    renderCheckoutFees(checkout) {
        var _a, _b, _c, _d;
        if (!((_b = (_a = checkout === null || checkout === void 0 ? void 0 : checkout.checkout_fees) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length)) {
            return null;
        }
        return (h(Fragment, null, (_d = (_c = checkout === null || checkout === void 0 ? void 0 : checkout.checkout_fees) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.map(fee => (h("sc-line-item", { key: fee.id }, h("span", { slot: "description" }, fee.description), h("span", { slot: "price" }, fee.display_amount))))));
    }
    renderLineItemDescription(checkout) {
        if (this.total === 'subtotal' && this.hasInstallmentPlan(checkout)) {
            return (h("span", { slot: "description" }, h("slot", { name: "first-payment-subtotal-description" }, wp.i18n.__('Initial Payment', 'surecart'))));
        }
        return (h("span", { slot: "description" }, h("slot", { name: "description" })));
    }
    // Determine if the currency should be displayed to avoid duplication in the amount display.
    getCurrencyToDisplay() {
        var _a, _b, _c, _d;
        const checkout = this.checkout || (state === null || state === void 0 ? void 0 : state.checkout);
        return ((_b = (_a = checkout === null || checkout === void 0 ? void 0 : checkout.amount_due_default_currency_display_amount) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes((_c = checkout === null || checkout === void 0 ? void 0 : checkout.currency) === null || _c === void 0 ? void 0 : _c.toLowerCase())) ? '' : (_d = checkout === null || checkout === void 0 ? void 0 : checkout.currency) === null || _d === void 0 ? void 0 : _d.toUpperCase();
    }
    renderConversion() {
        var _a;
        if (this.total !== 'total') {
            return null;
        }
        const checkout = this.checkout || (state === null || state === void 0 ? void 0 : state.checkout);
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
        return (h(Fragment, null, h("sc-divider", null), h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, h("span", { slot: "title" }, h("slot", { name: "charge-amount-description" }, wp.i18n.__('Payment Total', 'surecart'))), h("span", { slot: "price" }, this.getCurrencyToDisplay() && h("span", { class: "currency-label" }, this.getCurrencyToDisplay()), checkout === null || checkout === void 0 ? void 0 :
            checkout.amount_due_default_currency_display_amount)), h("sc-line-item", null, h("span", { slot: "description", class: "conversion-description" }, wp.i18n.sprintf(wp.i18n.__('Your payment will be processed in %s.', 'surecart'), (_a = checkout === null || checkout === void 0 ? void 0 : checkout.currency) === null || _a === void 0 ? void 0 : _a.toUpperCase())))));
    }
    render() {
        var _a;
        const checkout = this.checkout || (state === null || state === void 0 ? void 0 : state.checkout);
        // loading state
        if (formBusy() && !(checkout === null || checkout === void 0 ? void 0 : checkout[(_a = this === null || this === void 0 ? void 0 : this.order_key) === null || _a === void 0 ? void 0 : _a[this === null || this === void 0 ? void 0 : this.total]])) {
            return (h("sc-line-item", null, h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), h("sc-skeleton", { slot: "price", style: { 'width': '70px', 'display': 'inline-block', 'height': this.size === 'large' ? '40px' : '', '--border-radius': '6px' } })));
        }
        if (!(checkout === null || checkout === void 0 ? void 0 : checkout.currency))
            return;
        // if the total amount is different than the amount due.
        if (this.total === 'total' && (checkout === null || checkout === void 0 ? void 0 : checkout.total_amount) !== (checkout === null || checkout === void 0 ? void 0 : checkout.amount_due)) {
            return (h("div", { class: "line-item-total__group" }, h("sc-line-item", null, h("span", { slot: "description" }, this.hasInstallmentPlan(checkout) ? (this.renderLineItemTitle(checkout)) : (h(Fragment, null, h("slot", { name: "title" }), h("slot", { name: "description" })))), h("span", { slot: "price" }, h("sc-total", { total: this.total, checkout: checkout }))), !!checkout.trial_amount && (h("sc-line-item", null, h("span", { slot: "description" }, h("slot", { name: "free-trial-description" }, wp.i18n.__('Trial', 'surecart'))), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.trial_display_amount))), h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, this.hasSubscription(checkout) ? (h("span", { slot: "title" }, h("slot", { name: "subscription-title" }, wp.i18n.__('Total Due Today', 'surecart')))) : (h("span", { slot: "title" }, h("slot", { name: "due-amount-description" }, wp.i18n.__('Amount Due', 'surecart')))), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.amount_due_display_amount)), this.renderConversion()));
        }
        return (h(Fragment, null, this.total === 'subtotal' && this.hasInstallmentPlan(checkout) && (h("sc-line-item", { style: this.size === 'large' ? { '--price-size': 'var(--sc-font-size-x-large)' } : {} }, h("span", { slot: "description" }, !!(checkout === null || checkout === void 0 ? void 0 : checkout.discount_amount) ? (h("sc-tooltip", { class: "total-payments-tooltip", type: "text", text: wp.i18n.__('This is the total of all installment payments at full price, before any discounts are applied.', 'surecart'), width: "275px" }, h("slot", { name: "total-payments-description" }, wp.i18n.__('Total Installments', 'surecart')), " ", wp.i18n.__('(before discounts)', 'surecart'), h("sc-icon", { name: "info", "aria-hidden": "true" }), h("sc-visually-hidden", null, wp.i18n.__('This is the total of all installment payments at full price, before any discounts are applied.', 'surecart')))) : (h("slot", { name: "total-payments-description" }, wp.i18n.__('Total Installments', 'surecart')))), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.full_display_amount))), h("sc-line-item", { style: this.size === 'large' ? { '--price-size': 'var(--sc-font-size-x-large)' } : {} }, this.renderLineItemTitle(checkout), this.renderLineItemDescription(checkout), h("span", { slot: "price" }, !!(checkout === null || checkout === void 0 ? void 0 : checkout.total_savings_amount) && this.total === 'total' && h("span", { class: "scratch-price" }, checkout === null || checkout === void 0 ? void 0 : checkout.total_scratch_display_amount), h("sc-total", { class: "total-price", total: this.total, checkout: checkout }))), this.renderConversion(), this.total === 'subtotal' && this.renderCheckoutFees(checkout)));
    }
};
ScLineItemTotal.style = ScLineItemTotalStyle0;

export { ScLineItemTotal as sc_line_item_total };

//# sourceMappingURL=sc-line-item-total.entry.js.map