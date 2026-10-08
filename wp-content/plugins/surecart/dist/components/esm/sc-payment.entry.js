import { r as registerInstance, h, F as Fragment, H as Host, a as getElement } from './index-25e5af33.js';
import { s as state$1 } from './mutations-54fc7af1.js';
import './watchers-c2958e52.js';
import { s as state, h as hasOtherAvailableCreditCardProcessor, p as processorSupportsCurrentCurrency, c as availableMethodTypes, d as hasMultipleProcessorChoices, e as hasMultipleMethodChoices, f as getAvailableProcessor, a as availableProcessors, b as availableManualPaymentMethods } from './getters-476a5a84.js';
import { s as state$2 } from './watchers-c7bbc6b2.js';
import { M as ManualPaymentMethods, a as MockProcessor } from './MockProcessor-5c5e066a.js';
import { g as getRazorpayMethodLabel, a as getRazorpayMethodIcon } from './razorpay-4c4a3d31.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import './index-18f5a1bc.js';
import './utils-2fd36c2c.js';
import './remove-query-args-938c53ea.js';
import './index-c5a96d53.js';
import './google-e9085e27.js';
import './currency-eb33deae.js';
import './store-fd165874.js';
import './price-39d60d32.js';
import './util-dfbf863e.js';

const scPaymentCss = ":host{display:flex !important;flex-direction:column;gap:var(--sc-input-label-margin);position:relative;font-family:var(--sc-font-sans)}.sc-payment-toggle-summary{line-height:1;display:flex;align-items:center;gap:0.5em;font-weight:var(--sc-font-weight-semibold)}.sc-payment-label{display:flex;justify-content:space-between}.sc-payment-instructions{color:var(--sc-color-gray-600);font-size:var(--sc-font-size-small);line-height:var(--sc-line-height-dense)}.sc-payment__stripe-card-element{display:flex !important;flex-direction:column;gap:var(--sc-input-label-margin);position:relative}";
const ScPaymentStyle0 = scPaymentCss;

const ScPayment = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.stripePaymentElement = undefined;
        this.disabledProcessorTypes = undefined;
        this.secureNotice = undefined;
        this.label = undefined;
        this.hideTestModeBadge = undefined;
    }
    componentWillLoad() {
        state.disabled = {
            ...state.disabled,
            processors: this.disabledProcessorTypes,
        };
    }
    renderStripe(processor) {
        const title = hasOtherAvailableCreditCardProcessor('stripe') ? wp.i18n.__('Credit Card (Stripe)', 'surecart') : wp.i18n.__('Credit Card', 'surecart');
        return (h("sc-payment-method-choice", { key: processor === null || processor === void 0 ? void 0 : processor.id, "processor-id": "stripe", card: this.stripePaymentElement }, h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, h("sc-icon", { name: "credit-card", style: { fontSize: '24px' }, "aria-hidden": "true" }), h("span", null, title)), h("div", { class: "sc-payment__stripe-card-element" }, h("slot", { name: "stripe" }))));
    }
    renderPayPal(processor) {
        return (h(Fragment, null, h("sc-payment-method-choice", { key: processor === null || processor === void 0 ? void 0 : processor.id, "processor-id": "paypal" }, h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, h("sc-icon", { name: "paypal", style: { width: '80px', fontSize: '24px' }, "aria-hidden": "true" }), h("sc-visually-hidden", null, wp.i18n.__('PayPal', 'surecart'))), h("sc-card", null, h("sc-payment-selected", { label: wp.i18n.__('PayPal selected for check out.', 'surecart') }, h("sc-icon", { slot: "icon", name: "paypal", style: { width: '80px' }, "aria-hidden": "true" }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart')))), !hasOtherAvailableCreditCardProcessor('paypal') && (h("sc-payment-method-choice", { key: processor === null || processor === void 0 ? void 0 : processor.id, "processor-id": "paypal", "method-id": "card" }, h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, h("sc-icon", { name: "credit-card", style: { fontSize: '24px' }, "aria-hidden": "true" }), h("span", null, wp.i18n.__('Credit Card', 'surecart'))), h("sc-card", null, h("sc-payment-selected", { label: wp.i18n.__('Credit Card selected for check out.', 'surecart') }, h("sc-icon", { name: "credit-card", slot: "icon", style: { fontSize: '24px' }, "aria-hidden": "true" }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart')))))));
    }
    renderMock(processor) {
        return h(MockProcessor, { processor: processor });
    }
    renderPaystack(processor) {
        const title = hasOtherAvailableCreditCardProcessor('paystack') ? wp.i18n.__('Credit Card (Paystack)', 'surecart') : wp.i18n.__('Credit Card', 'surecart');
        if (!processorSupportsCurrentCurrency(processor))
            return;
        return (h("sc-payment-method-choice", { key: processor === null || processor === void 0 ? void 0 : processor.id, "processor-id": "paystack" }, h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, h("sc-icon", { name: "credit-card", style: { fontSize: '24px' }, "aria-hidden": "true" }), h("span", null, title)), h("sc-card", null, h("sc-payment-selected", { label: wp.i18n.__('Credit Card selected for check out.', 'surecart') }, h("sc-icon", { slot: "icon", name: "credit-card", "aria-hidden": "true" }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart'))), h("sc-checkout-paystack-payment-provider", null)));
    }
    /** Combined Razorpay — Razorpay's modal fans out all enabled methods itself. */
    renderRazorpayCombined(processor) {
        return (h("sc-payment-method-choice", { key: processor === null || processor === void 0 ? void 0 : processor.id, "processor-id": "razorpay" }, h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, h("sc-icon", { name: "razorpay", style: { fontSize: '24px' }, "aria-hidden": "true" }), h("span", null, wp.i18n.__('Cards, Netbanking, Wallet & UPI', 'surecart'))), h("sc-card", null, h("sc-payment-selected", { label: wp.i18n.__('Cards, Netbanking, Wallet & UPI selected for check out.', 'surecart') }, h("sc-icon", { slot: "icon", name: "razorpay", "aria-hidden": "true" }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart')))));
    }
    /** Per-method Razorpay tile. Rendered as a sibling so `sc-payment-method-choice` can wire it into `sc-toggles`. */
    renderRazorpayMethodChoice(method) {
        var _a;
        const label = (_a = getRazorpayMethodLabel(method.id)) !== null && _a !== void 0 ? _a : method.id;
        const icon = getRazorpayMethodIcon(method.id);
        return (h("sc-payment-method-choice", { key: `razorpay-${method.id}`, "processor-id": "razorpay", "method-id": method.id }, h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, h("sc-icon", { name: icon, style: { fontSize: '24px' }, "aria-hidden": "true" }), h("span", null, label)), h("sc-card", null, h("sc-payment-selected", { label: wp.i18n.sprintf(wp.i18n.__('%s selected for check out.', 'surecart'), label) }, h("sc-icon", { slot: "icon", name: icon, "aria-hidden": "true" }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart')))));
    }
    renderRazorpay(processor) {
        var _a;
        if (!processorSupportsCurrentCurrency(processor))
            return;
        // Split into per-method tiles on recurring checkouts — Razorpay's recurring API requires
        // an explicit `payment_method_type`, while the one-time modal fans all methods out itself.
        const methods = availableMethodTypes() || [];
        if (((_a = state$1.checkout) === null || _a === void 0 ? void 0 : _a.reusable_payment_method_required) && methods.length > 0) {
            return methods.map(method => this.renderRazorpayMethodChoice(method));
        }
        return this.renderRazorpayCombined(processor);
    }
    render() {
        var _a, _b, _c, _d, _e, _f;
        // payment is not required for this order.
        if (((_a = state$1.checkout) === null || _a === void 0 ? void 0 : _a.payment_method_required) === false) {
            return null;
        }
        // `sc-toggles` wrapper when >1 choice will render (processors, paypal's card fallback, or per-method tiles).
        const Tag = hasMultipleProcessorChoices() || hasMultipleMethodChoices() || (state$2 === null || state$2 === void 0 ? void 0 : state$2.id) === 'paypal' ? 'sc-toggles' : 'div';
        const mollie = getAvailableProcessor('mollie');
        const razorpay = getAvailableProcessor('razorpay');
        return (h(Host, null, processorSupportsCurrentCurrency(razorpay) && h("sc-checkout-razorpay-payment-provider", { "processor-id": razorpay.id }), h("sc-form-control", { label: this.label, exportparts: "label, help-text, form-control" }, h("div", { class: "sc-payment-label", slot: "label" }, h("div", null, this.label), h("slot", { name: "label-end" })), (mollie === null || mollie === void 0 ? void 0 : mollie.id) ? (h("sc-checkout-mollie-payment", { "processor-id": mollie === null || mollie === void 0 ? void 0 : mollie.id })) : (h(Tag, { collapsible: false, theme: "container" }, !((_b = availableProcessors()) === null || _b === void 0 ? void 0 : _b.length) && !((_c = availableManualPaymentMethods()) === null || _c === void 0 ? void 0 : _c.length) && (h("sc-alert", { type: "info", open: true }, ((_e = (_d = window === null || window === void 0 ? void 0 : window.scData) === null || _d === void 0 ? void 0 : _d.user_permissions) === null || _e === void 0 ? void 0 : _e.manage_sc_shop_settings) ? (h(Fragment, null, wp.i18n.__('You do not have any processors enabled for this mode and cart. ', 'surecart'), h("a", { href: addQueryArgs(`${(_f = window === null || window === void 0 ? void 0 : window.scData) === null || _f === void 0 ? void 0 : _f.admin_url}admin.php`, {
                page: 'sc-settings',
                tab: 'processors',
            }), style: { color: 'var(--sc-color-gray-700)' } }, wp.i18n.__('Please configure your processors', 'surecart')), ".")) : (wp.i18n.__('Please contact us for payment.', 'surecart')))), (availableProcessors() || []).map(processor => {
            switch (processor === null || processor === void 0 ? void 0 : processor.processor_type) {
                case 'stripe':
                    return this.renderStripe(processor);
                case 'paypal':
                    return this.renderPayPal(processor);
                case 'paystack':
                    return this.renderPaystack(processor);
                case 'razorpay':
                    return this.renderRazorpay(processor);
                case 'mock':
                    return this.renderMock(processor);
            }
        }), h(ManualPaymentMethods, { methods: availableManualPaymentMethods() }))))));
    }
    get el() { return getElement(this); }
};
ScPayment.style = ScPaymentStyle0;

export { ScPayment as sc_payment };

//# sourceMappingURL=sc-payment.entry.js.map