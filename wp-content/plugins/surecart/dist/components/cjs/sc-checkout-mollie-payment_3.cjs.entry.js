'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const watchers = require('./watchers-517825ae.js');
require('./watchers-3a87bc45.js');
const getters = require('./getters-d8754292.js');
const mutations = require('./mutations-4133422f.js');
const getters$1 = require('./getters-1ff518bc.js');
const mutations$1 = require('./mutations-fdb67675.js');
require('./fetch-5e8dc1d5.js');
const MockProcessor = require('./MockProcessor-ad11752f.js');
const mutations$2 = require('./mutations-d5d6ddf1.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
const index$1 = require('./index-7ced8198.js');
const inline = require('./inline-aa15f113.js');
const store = require('./store-29627d6b.js');
const getters$2 = require('./getters-ade46b86.js');
const razorpay = require('./razorpay-88fe8897.js');
require('./index-c3de642f.js');
require('./util-a15c420c.js');
require('./utils-f5ea3c23.js');
require('./remove-query-args-b57e8cd3.js');
require('./index-fb76df07.js');
require('./google-8dbad1a6.js');
require('./currency-b438c76d.js');
require('./price-9dddd853.js');
require('./store-5cd165ea.js');
require('./address-7404695f.js');
require('./index-c5bd66ae.js');

const listenTo = (prop, propKey, callback) => mutations.on('set', (key, newValue, oldValue) => {
    // ignore non-keys
    if (key !== prop)
        return;
    // handle an array, if one has changed, run callback.
    if (Array.isArray(propKey)) {
        if (propKey.some(key => JSON.stringify(newValue === null || newValue === void 0 ? void 0 : newValue[key]) !== JSON.stringify(oldValue === null || oldValue === void 0 ? void 0 : oldValue[key]))) {
            return callback(newValue, oldValue);
        }
    }
    // handle string.
    if (typeof propKey === 'string') {
        if (JSON.stringify(newValue === null || newValue === void 0 ? void 0 : newValue[propKey]) === JSON.stringify(oldValue === null || oldValue === void 0 ? void 0 : oldValue[propKey]))
            return;
        return callback(newValue === null || newValue === void 0 ? void 0 : newValue[propKey], oldValue === null || oldValue === void 0 ? void 0 : oldValue[propKey]);
    }
});

const scCheckoutMolliePaymentCss = ":host{display:block}";
const ScCheckoutMolliePaymentStyle0 = scCheckoutMolliePaymentCss;

const ScCheckoutMolliePayment = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.processorId = undefined;
        this.method = undefined;
        this.error = undefined;
        this.methods = undefined;
    }
    componentWillLoad() {
        watchers.state.id = 'mollie';
        this.fetchMethods();
        listenTo('checkout', ['total_amount', 'subtotal_amount', 'currency', 'reusabled_payment_method_required', 'shipping_address'], () => this.fetchMethods());
    }
    async fetchMethods() {
        var _a;
        const checkout = mutations.state.checkout;
        if (!(checkout === null || checkout === void 0 ? void 0 : checkout.currency))
            return; // wait until we have a currency.
        try {
            mutations$1.lockCheckout('methods');
            const response = (await index$1.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/processors/${this.processorId}/payment_method_types`, {
                    amount: checkout === null || checkout === void 0 ? void 0 : checkout.total_amount,
                    country: ((_a = checkout === null || checkout === void 0 ? void 0 : checkout.shipping_address) === null || _a === void 0 ? void 0 : _a.country) || 'us',
                    currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency,
                    ...((checkout === null || checkout === void 0 ? void 0 : checkout.reusable_payment_method_required) ? { reusable: checkout === null || checkout === void 0 ? void 0 : checkout.reusable_payment_method_required } : {}),
                    per_page: 100,
                }),
            }));
            getters.state.methods = (response === null || response === void 0 ? void 0 : response.data) || [];
        }
        catch (e) {
            mutations$2.createErrorNotice(e);
            console.error(e);
        }
        finally {
            mutations$1.unLockCheckout('methods');
        }
    }
    renderLoading() {
        return (index.h("sc-card", null, index.h("sc-skeleton", { style: { width: '50%', marginBottom: '0.5em' } }), index.h("sc-skeleton", { style: { width: '30%', marginBottom: '0.5em' } }), index.h("sc-skeleton", { style: { width: '60%', marginBottom: '0.5em' } })));
    }
    render() {
        var _a, _b, _c;
        if (getters$1.checkoutIsLocked('methods') && !((_a = getters.availableMethodTypes()) === null || _a === void 0 ? void 0 : _a.length)) {
            return this.renderLoading();
        }
        if (!((_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.currency)) {
            return this.renderLoading();
        }
        if (!((_c = getters.availableMethodTypes()) === null || _c === void 0 ? void 0 : _c.length)) {
            return (index.h("sc-alert", { type: "warning", open: true }, wp.i18n.__('No available payment methods', 'surecart'), ' '));
        }
        const Tag = getters.hasMultipleMethodChoices() ? 'sc-toggles' : 'div';
        return (index.h(index.Fragment, null, index.h(Tag, { collapsible: false, theme: "container" }, (getters.availableMethodTypes() || []).map(method => (index.h("sc-payment-method-choice", { "processor-id": "mollie", "method-id": method === null || method === void 0 ? void 0 : method.id, key: method === null || method === void 0 ? void 0 : method.id }, index.h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, !!(method === null || method === void 0 ? void 0 : method.image) && index.h("img", { src: method === null || method === void 0 ? void 0 : method.image, "aria-hidden": "true" }), index.h("span", null, method === null || method === void 0 ? void 0 : method.description)), index.h("sc-card", null, index.h("sc-payment-selected", { label: wp.i18n.sprintf(wp.i18n.__('%s selected for check out.', 'surecart'), method === null || method === void 0 ? void 0 : method.description) }, !!(method === null || method === void 0 ? void 0 : method.image) && index.h("img", { slot: "icon", src: method === null || method === void 0 ? void 0 : method.image, style: { width: '32px' } }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart')))))), index.h(MockProcessor.MockProcessor, { processor: getters.getAvailableProcessor('mock') }), index.h(MockProcessor.ManualPaymentMethods, { methods: getters.availableManualPaymentMethods() })), !!getters$1.checkoutIsLocked('methods') && index.h("sc-block-ui", { class: "busy-block-ui", "z-index": 9, style: { '--sc-block-ui-opacity': '0.4' } })));
    }
};
ScCheckoutMolliePayment.style = ScCheckoutMolliePaymentStyle0;

const ScCheckoutPaystackPaymentProvider = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    componentWillLoad() {
        // we need to listen to the form state and pay when the form state enters the paying state.
        this.unlistenToFormState = store.onChange('formState', () => {
            // are we paying?
            if ('paying' === getters$2.currentFormState()) {
                this.confirm();
            }
        });
    }
    disconnectedCallback() {
        this.unlistenToFormState();
    }
    async confirm() {
        var _a, _b, _c, _d;
        // this processor is not selected.
        if ((watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.id) !== 'paystack')
            return;
        // Must be a paystack session
        if (!((_b = (_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.processor_data.paystack))
            return;
        // Prevent if already paid.
        if (((_c = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.status) === 'paid')
            return;
        try {
            // must have a public key and access code.
            const { public_key, access_code } = (_d = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _d === void 0 ? void 0 : _d.payment_intent.processor_data.paystack;
            if (!public_key || !access_code) {
                mutations$2.createErrorNotice({ message: wp.i18n.sprintf(wp.i18n.__('Payment gateway configuration incomplete. Please ensure Paystack is properly configured for transactions.', 'surecart')) });
                return;
            }
            const paystack = new inline.se();
            await paystack.newTransaction({
                key: public_key,
                accessCode: access_code, // We'll use accessCode which will handle product, price on our server.
                onSuccess: async (transaction) => {
                    if ((transaction === null || transaction === void 0 ? void 0 : transaction.status) !== 'success') {
                        throw { message: wp.i18n.sprintf(wp.i18n.__('Paystack transaction could not be finished. Status: %s', 'surecart'), transaction === null || transaction === void 0 ? void 0 : transaction.status) };
                    }
                    return mutations.updateFormState('PAID');
                },
                onClose: () => mutations.updateFormState('REJECT'),
            });
        }
        catch (err) {
            mutations$2.createErrorNotice(err);
            console.error(err);
            mutations.updateFormState('REJECT');
        }
    }
};

const ScCheckoutRazorpayPaymentProvider = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.razorpayInstance = null;
        this.confirming = false;
        this.processorId = undefined;
    }
    componentWillLoad() {
        // Preload Razorpay script.
        razorpay.loadRazorpay()
            .then(instance => (this.razorpayInstance = instance))
            .catch(err => mutations$2.createErrorNotice({ message: err.message }));
        // we need to listen to the form state and pay when the form state enters the paying state.
        this.unlistenToFormState = store.onChange('formState', () => {
            // are we paying?
            if ('paying' === getters$2.currentFormState()) {
                this.confirm();
            }
        });
        // Keep the recurring payment_method_types in sync with the checkout.
        this.fetchMethods();
        this.unlistenToCheckout = listenTo('checkout', ['currency', 'reusable_payment_method_required'], () => this.fetchMethods());
    }
    disconnectedCallback() {
        var _a, _b;
        // Guarded — Stencil can disconnect before componentWillLoad fires on mid-render reparenting.
        (_a = this.unlistenToFormState) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = this.unlistenToCheckout) === null || _b === void 0 ? void 0 : _b.call(this);
        // Release shared state so a later mollie / non-recurring flow starts clean.
        getters.state.methods = [];
    }
    /** Fetch enabled `payment_method_types` for recurring checkouts. No-op otherwise. */
    async fetchMethods() {
        const checkout = mutations.state.checkout;
        if (!this.processorId || !(checkout === null || checkout === void 0 ? void 0 : checkout.currency))
            return;
        // One-time — Razorpay handles method selection in its modal. Clear any stale recurring methods.
        if (!(checkout === null || checkout === void 0 ? void 0 : checkout.reusable_payment_method_required)) {
            if (getters.state.methods.length)
                getters.state.methods = [];
            return;
        }
        try {
            mutations$1.lockCheckout('methods');
            const response = (await index$1.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/processors/${this.processorId}/payment_method_types`, {
                    currency: checkout.currency,
                    reusable: true,
                    per_page: 100,
                }),
            }));
            getters.state.methods = (response === null || response === void 0 ? void 0 : response.data) || [];
        }
        catch (e) {
            mutations$2.createErrorNotice(e);
            console.error(e);
        }
        finally {
            mutations$1.unLockCheckout('methods');
        }
    }
    async confirm() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        // this processor is not selected.
        if ((watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.id) !== 'razorpay')
            return;
        // Must be a razorpay session
        if (!((_c = (_b = (_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.processor_data) === null || _c === void 0 ? void 0 : _c.razorpay))
            return;
        // Prevent if already paid.
        if (((_d = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _d === void 0 ? void 0 : _d.status) === 'paid')
            return;
        // Prevent multiple simultaneous payment attempts
        if (this.confirming)
            return;
        this.confirming = true;
        try {
            // must have a public_key and external_intent_id.
            const { external_intent_id, processor_data, reusable } = ((_e = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _e === void 0 ? void 0 : _e.payment_intent) || {};
            const { public_key, customer_id } = (processor_data === null || processor_data === void 0 ? void 0 : processor_data.razorpay) || {};
            if (!external_intent_id || !public_key) {
                mutations$2.createErrorNotice({ message: wp.i18n.sprintf(wp.i18n.__('Payment gateway configuration incomplete. Please ensure Razorpay is properly configured for transactions.', 'surecart')) });
                return;
            }
            // Wait for script to load if not loaded yet.
            if (!this.razorpayInstance) {
                this.razorpayInstance = await razorpay.loadRazorpay();
            }
            const customer = (_f = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _f === void 0 ? void 0 : _f.customer;
            const prefill = customer
                ? {
                    ...(customer.name && { name: customer.name }),
                    ...(customer.email && { email: customer.email }),
                    ...(customer.phone && { contact: customer.phone }),
                }
                : undefined;
            /*
             * Razorpay options.
             * @see https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/#123-checkout-options
             */
            let options = {
                key: public_key,
                order_id: external_intent_id,
                prefill,
                customer_id,
                recurring: reusable,
                handler: (response) => {
                    if (response === null || response === void 0 ? void 0 : response.razorpay_payment_id) {
                        return mutations.updateFormState('PAID');
                    }
                    else {
                        mutations$2.createErrorNotice({ message: wp.i18n.__('Payment verification failed. Please contact support.', 'surecart') });
                        mutations.updateFormState('REJECT');
                    }
                },
                modal: {
                    ondismiss: () => {
                        mutations.updateFormState('REJECT');
                    },
                },
            };
            if ((_h = (_g = window === null || window === void 0 ? void 0 : window.wp) === null || _g === void 0 ? void 0 : _g.hooks) === null || _h === void 0 ? void 0 : _h.applyFilters) {
                options = window.wp.hooks.applyFilters('surecart_razorpay_checkout_options', options);
            }
            const razorpay$1 = new this.razorpayInstance(options);
            razorpay$1.on('payment.failed', response => {
                var _a;
                mutations$2.createErrorNotice({
                    message: ((_a = response === null || response === void 0 ? void 0 : response.error) === null || _a === void 0 ? void 0 : _a.description) || wp.i18n.__('Payment failed. Please try again.', 'surecart'),
                });
                mutations.updateFormState('REJECT');
                console.error('payment.failed', response);
            });
            razorpay$1.open();
        }
        catch (err) {
            mutations$2.createErrorNotice(err);
            console.error(err);
            mutations.updateFormState('REJECT');
        }
        finally {
            this.confirming = false;
        }
    }
};

exports.sc_checkout_mollie_payment = ScCheckoutMolliePayment;
exports.sc_checkout_paystack_payment_provider = ScCheckoutPaystackPaymentProvider;
exports.sc_checkout_razorpay_payment_provider = ScCheckoutRazorpayPaymentProvider;

//# sourceMappingURL=sc-checkout-mollie-payment_3.cjs.entry.js.map