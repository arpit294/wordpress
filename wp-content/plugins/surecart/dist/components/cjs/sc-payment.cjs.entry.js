'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const mutations = require('./mutations-4133422f.js');
require('./watchers-3a87bc45.js');
const getters = require('./getters-d8754292.js');
const watchers = require('./watchers-517825ae.js');
const MockProcessor = require('./MockProcessor-ad11752f.js');
const razorpay = require('./razorpay-88fe8897.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
require('./index-c3de642f.js');
require('./utils-f5ea3c23.js');
require('./remove-query-args-b57e8cd3.js');
require('./index-fb76df07.js');
require('./google-8dbad1a6.js');
require('./currency-b438c76d.js');
require('./store-29627d6b.js');
require('./price-9dddd853.js');
require('./util-a15c420c.js');

const scPaymentCss = ":host{display:flex !important;flex-direction:column;gap:var(--sc-input-label-margin);position:relative;font-family:var(--sc-font-sans)}.sc-payment-toggle-summary{line-height:1;display:flex;align-items:center;gap:0.5em;font-weight:var(--sc-font-weight-semibold)}.sc-payment-label{display:flex;justify-content:space-between}.sc-payment-instructions{color:var(--sc-color-gray-600);font-size:var(--sc-font-size-small);line-height:var(--sc-line-height-dense)}.sc-payment__stripe-card-element{display:flex !important;flex-direction:column;gap:var(--sc-input-label-margin);position:relative}";
const ScPaymentStyle0 = scPaymentCss;

const ScPayment = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.stripePaymentElement = undefined;
        this.disabledProcessorTypes = undefined;
        this.secureNotice = undefined;
        this.label = undefined;
        this.hideTestModeBadge = undefined;
    }
    componentWillLoad() {
        getters.state.disabled = {
            ...getters.state.disabled,
            processors: this.disabledProcessorTypes,
        };
    }
    renderStripe(processor) {
        const title = getters.hasOtherAvailableCreditCardProcessor('stripe') ? wp.i18n.__('Credit Card (Stripe)', 'surecart') : wp.i18n.__('Credit Card', 'surecart');
        return (index.h("sc-payment-method-choice", { key: processor === null || processor === void 0 ? void 0 : processor.id, "processor-id": "stripe", card: this.stripePaymentElement }, index.h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, index.h("sc-icon", { name: "credit-card", style: { fontSize: '24px' }, "aria-hidden": "true" }), index.h("span", null, title)), index.h("div", { class: "sc-payment__stripe-card-element" }, index.h("slot", { name: "stripe" }))));
    }
    renderPayPal(processor) {
        return (index.h(index.Fragment, null, index.h("sc-payment-method-choice", { key: processor === null || processor === void 0 ? void 0 : processor.id, "processor-id": "paypal" }, index.h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, index.h("sc-icon", { name: "paypal", style: { width: '80px', fontSize: '24px' }, "aria-hidden": "true" }), index.h("sc-visually-hidden", null, wp.i18n.__('PayPal', 'surecart'))), index.h("sc-card", null, index.h("sc-payment-selected", { label: wp.i18n.__('PayPal selected for check out.', 'surecart') }, index.h("sc-icon", { slot: "icon", name: "paypal", style: { width: '80px' }, "aria-hidden": "true" }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart')))), !getters.hasOtherAvailableCreditCardProcessor('paypal') && (index.h("sc-payment-method-choice", { key: processor === null || processor === void 0 ? void 0 : processor.id, "processor-id": "paypal", "method-id": "card" }, index.h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, index.h("sc-icon", { name: "credit-card", style: { fontSize: '24px' }, "aria-hidden": "true" }), index.h("span", null, wp.i18n.__('Credit Card', 'surecart'))), index.h("sc-card", null, index.h("sc-payment-selected", { label: wp.i18n.__('Credit Card selected for check out.', 'surecart') }, index.h("sc-icon", { name: "credit-card", slot: "icon", style: { fontSize: '24px' }, "aria-hidden": "true" }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart')))))));
    }
    renderMock(processor) {
        return index.h(MockProcessor.MockProcessor, { processor: processor });
    }
    renderPaystack(processor) {
        const title = getters.hasOtherAvailableCreditCardProcessor('paystack') ? wp.i18n.__('Credit Card (Paystack)', 'surecart') : wp.i18n.__('Credit Card', 'surecart');
        if (!getters.processorSupportsCurrentCurrency(processor))
            return;
        return (index.h("sc-payment-method-choice", { key: processor === null || processor === void 0 ? void 0 : processor.id, "processor-id": "paystack" }, index.h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, index.h("sc-icon", { name: "credit-card", style: { fontSize: '24px' }, "aria-hidden": "true" }), index.h("span", null, title)), index.h("sc-card", null, index.h("sc-payment-selected", { label: wp.i18n.__('Credit Card selected for check out.', 'surecart') }, index.h("sc-icon", { slot: "icon", name: "credit-card", "aria-hidden": "true" }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart'))), index.h("sc-checkout-paystack-payment-provider", null)));
    }
    /** Combined Razorpay — Razorpay's modal fans out all enabled methods itself. */
    renderRazorpayCombined(processor) {
        return (index.h("sc-payment-method-choice", { key: processor === null || processor === void 0 ? void 0 : processor.id, "processor-id": "razorpay" }, index.h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, index.h("sc-icon", { name: "razorpay", style: { fontSize: '24px' }, "aria-hidden": "true" }), index.h("span", null, wp.i18n.__('Cards, Netbanking, Wallet & UPI', 'surecart'))), index.h("sc-card", null, index.h("sc-payment-selected", { label: wp.i18n.__('Cards, Netbanking, Wallet & UPI selected for check out.', 'surecart') }, index.h("sc-icon", { slot: "icon", name: "razorpay", "aria-hidden": "true" }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart')))));
    }
    /** Per-method Razorpay tile. Rendered as a sibling so `sc-payment-method-choice` can wire it into `sc-toggles`. */
    renderRazorpayMethodChoice(method) {
        var _a;
        const label = (_a = razorpay.getRazorpayMethodLabel(method.id)) !== null && _a !== void 0 ? _a : method.id;
        const icon = razorpay.getRazorpayMethodIcon(method.id);
        return (index.h("sc-payment-method-choice", { key: `razorpay-${method.id}`, "processor-id": "razorpay", "method-id": method.id }, index.h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, index.h("sc-icon", { name: icon, style: { fontSize: '24px' }, "aria-hidden": "true" }), index.h("span", null, label)), index.h("sc-card", null, index.h("sc-payment-selected", { label: wp.i18n.sprintf(wp.i18n.__('%s selected for check out.', 'surecart'), label) }, index.h("sc-icon", { slot: "icon", name: icon, "aria-hidden": "true" }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart')))));
    }
    renderRazorpay(processor) {
        var _a;
        if (!getters.processorSupportsCurrentCurrency(processor))
            return;
        // Split into per-method tiles on recurring checkouts — Razorpay's recurring API requires
        // an explicit `payment_method_type`, while the one-time modal fans all methods out itself.
        const methods = getters.availableMethodTypes() || [];
        if (((_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.reusable_payment_method_required) && methods.length > 0) {
            return methods.map(method => this.renderRazorpayMethodChoice(method));
        }
        return this.renderRazorpayCombined(processor);
    }
    render() {
        var _a, _b, _c, _d, _e, _f;
        // payment is not required for this order.
        if (((_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_method_required) === false) {
            return null;
        }
        // `sc-toggles` wrapper when >1 choice will render (processors, paypal's card fallback, or per-method tiles).
        const Tag = getters.hasMultipleProcessorChoices() || getters.hasMultipleMethodChoices() || (watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.id) === 'paypal' ? 'sc-toggles' : 'div';
        const mollie = getters.getAvailableProcessor('mollie');
        const razorpay = getters.getAvailableProcessor('razorpay');
        return (index.h(index.Host, null, getters.processorSupportsCurrentCurrency(razorpay) && index.h("sc-checkout-razorpay-payment-provider", { "processor-id": razorpay.id }), index.h("sc-form-control", { label: this.label, exportparts: "label, help-text, form-control" }, index.h("div", { class: "sc-payment-label", slot: "label" }, index.h("div", null, this.label), index.h("slot", { name: "label-end" })), (mollie === null || mollie === void 0 ? void 0 : mollie.id) ? (index.h("sc-checkout-mollie-payment", { "processor-id": mollie === null || mollie === void 0 ? void 0 : mollie.id })) : (index.h(Tag, { collapsible: false, theme: "container" }, !((_b = getters.availableProcessors()) === null || _b === void 0 ? void 0 : _b.length) && !((_c = getters.availableManualPaymentMethods()) === null || _c === void 0 ? void 0 : _c.length) && (index.h("sc-alert", { type: "info", open: true }, ((_e = (_d = window === null || window === void 0 ? void 0 : window.scData) === null || _d === void 0 ? void 0 : _d.user_permissions) === null || _e === void 0 ? void 0 : _e.manage_sc_shop_settings) ? (index.h(index.Fragment, null, wp.i18n.__('You do not have any processors enabled for this mode and cart. ', 'surecart'), index.h("a", { href: addQueryArgs.addQueryArgs(`${(_f = window === null || window === void 0 ? void 0 : window.scData) === null || _f === void 0 ? void 0 : _f.admin_url}admin.php`, {
                page: 'sc-settings',
                tab: 'processors',
            }), style: { color: 'var(--sc-color-gray-700)' } }, wp.i18n.__('Please configure your processors', 'surecart')), ".")) : (wp.i18n.__('Please contact us for payment.', 'surecart')))), (getters.availableProcessors() || []).map(processor => {
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
        }), index.h(MockProcessor.ManualPaymentMethods, { methods: getters.availableManualPaymentMethods() }))))));
    }
    get el() { return index.getElement(this); }
};
ScPayment.style = ScPaymentStyle0;

exports.sc_payment = ScPayment;

//# sourceMappingURL=sc-payment.cjs.entry.js.map