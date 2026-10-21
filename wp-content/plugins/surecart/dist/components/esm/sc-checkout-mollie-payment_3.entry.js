import { r as registerInstance, h, F as Fragment } from './index-25e5af33.js';
import { s as state } from './watchers-c7bbc6b2.js';
import './watchers-c2958e52.js';
import { s as state$1, c as availableMethodTypes, e as hasMultipleMethodChoices, f as getAvailableProcessor, b as availableManualPaymentMethods } from './getters-476a5a84.js';
import { e as on, s as state$2, u as updateFormState } from './mutations-54fc7af1.js';
import { a as checkoutIsLocked } from './getters-ed04d1c9.js';
import { l as lockCheckout, b as unLockCheckout } from './mutations-acb88b38.js';
import './fetch-cdff67be.js';
import { a as MockProcessor, M as ManualPaymentMethods } from './MockProcessor-5c5e066a.js';
import { c as createErrorNotice } from './mutations-7458343f.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import { a as apiFetch } from './index-824c562b.js';
import { s as se } from './inline-c012a0f9.js';
import { o as onChange } from './store-fd165874.js';
import { c as currentFormState } from './getters-3801a0c9.js';
import { l as loadRazorpay } from './razorpay-4c4a3d31.js';
import './index-18f5a1bc.js';
import './util-dfbf863e.js';
import './utils-2fd36c2c.js';
import './remove-query-args-938c53ea.js';
import './index-c5a96d53.js';
import './google-e9085e27.js';
import './currency-eb33deae.js';
import './price-39d60d32.js';
import './store-ea636731.js';
import './address-b8e2e4c8.js';
import './index-396e50a3.js';

const listenTo = (prop, propKey, callback) => on('set', (key, newValue, oldValue) => {
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
        registerInstance(this, hostRef);
        this.processorId = undefined;
        this.method = undefined;
        this.error = undefined;
        this.methods = undefined;
    }
    componentWillLoad() {
        state.id = 'mollie';
        this.fetchMethods();
        listenTo('checkout', ['total_amount', 'subtotal_amount', 'currency', 'reusabled_payment_method_required', 'shipping_address'], () => this.fetchMethods());
    }
    async fetchMethods() {
        var _a;
        const checkout = state$2.checkout;
        if (!(checkout === null || checkout === void 0 ? void 0 : checkout.currency))
            return; // wait until we have a currency.
        try {
            lockCheckout('methods');
            const response = (await apiFetch({
                path: addQueryArgs(`surecart/v1/processors/${this.processorId}/payment_method_types`, {
                    amount: checkout === null || checkout === void 0 ? void 0 : checkout.total_amount,
                    country: ((_a = checkout === null || checkout === void 0 ? void 0 : checkout.shipping_address) === null || _a === void 0 ? void 0 : _a.country) || 'us',
                    currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency,
                    ...((checkout === null || checkout === void 0 ? void 0 : checkout.reusable_payment_method_required) ? { reusable: checkout === null || checkout === void 0 ? void 0 : checkout.reusable_payment_method_required } : {}),
                    per_page: 100,
                }),
            }));
            state$1.methods = (response === null || response === void 0 ? void 0 : response.data) || [];
        }
        catch (e) {
            createErrorNotice(e);
            console.error(e);
        }
        finally {
            unLockCheckout('methods');
        }
    }
    renderLoading() {
        return (h("sc-card", null, h("sc-skeleton", { style: { width: '50%', marginBottom: '0.5em' } }), h("sc-skeleton", { style: { width: '30%', marginBottom: '0.5em' } }), h("sc-skeleton", { style: { width: '60%', marginBottom: '0.5em' } })));
    }
    render() {
        var _a, _b, _c;
        if (checkoutIsLocked('methods') && !((_a = availableMethodTypes()) === null || _a === void 0 ? void 0 : _a.length)) {
            return this.renderLoading();
        }
        if (!((_b = state$2.checkout) === null || _b === void 0 ? void 0 : _b.currency)) {
            return this.renderLoading();
        }
        if (!((_c = availableMethodTypes()) === null || _c === void 0 ? void 0 : _c.length)) {
            return (h("sc-alert", { type: "warning", open: true }, wp.i18n.__('No available payment methods', 'surecart'), ' '));
        }
        const Tag = hasMultipleMethodChoices() ? 'sc-toggles' : 'div';
        return (h(Fragment, null, h(Tag, { collapsible: false, theme: "container" }, (availableMethodTypes() || []).map(method => (h("sc-payment-method-choice", { "processor-id": "mollie", "method-id": method === null || method === void 0 ? void 0 : method.id, key: method === null || method === void 0 ? void 0 : method.id }, h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, !!(method === null || method === void 0 ? void 0 : method.image) && h("img", { src: method === null || method === void 0 ? void 0 : method.image, "aria-hidden": "true" }), h("span", null, method === null || method === void 0 ? void 0 : method.description)), h("sc-card", null, h("sc-payment-selected", { label: wp.i18n.sprintf(wp.i18n.__('%s selected for check out.', 'surecart'), method === null || method === void 0 ? void 0 : method.description) }, !!(method === null || method === void 0 ? void 0 : method.image) && h("img", { slot: "icon", src: method === null || method === void 0 ? void 0 : method.image, style: { width: '32px' } }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart')))))), h(MockProcessor, { processor: getAvailableProcessor('mock') }), h(ManualPaymentMethods, { methods: availableManualPaymentMethods() })), !!checkoutIsLocked('methods') && h("sc-block-ui", { class: "busy-block-ui", "z-index": 9, style: { '--sc-block-ui-opacity': '0.4' } })));
    }
};
ScCheckoutMolliePayment.style = ScCheckoutMolliePaymentStyle0;

const ScCheckoutPaystackPaymentProvider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    componentWillLoad() {
        // we need to listen to the form state and pay when the form state enters the paying state.
        this.unlistenToFormState = onChange('formState', () => {
            // are we paying?
            if ('paying' === currentFormState()) {
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
        if ((state === null || state === void 0 ? void 0 : state.id) !== 'paystack')
            return;
        // Must be a paystack session
        if (!((_b = (_a = state$2 === null || state$2 === void 0 ? void 0 : state$2.checkout) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.processor_data.paystack))
            return;
        // Prevent if already paid.
        if (((_c = state$2 === null || state$2 === void 0 ? void 0 : state$2.checkout) === null || _c === void 0 ? void 0 : _c.status) === 'paid')
            return;
        try {
            // must have a public key and access code.
            const { public_key, access_code } = (_d = state$2 === null || state$2 === void 0 ? void 0 : state$2.checkout) === null || _d === void 0 ? void 0 : _d.payment_intent.processor_data.paystack;
            if (!public_key || !access_code) {
                createErrorNotice({ message: wp.i18n.sprintf(wp.i18n.__('Payment gateway configuration incomplete. Please ensure Paystack is properly configured for transactions.', 'surecart')) });
                return;
            }
            const paystack = new se();
            await paystack.newTransaction({
                key: public_key,
                accessCode: access_code, // We'll use accessCode which will handle product, price on our server.
                onSuccess: async (transaction) => {
                    if ((transaction === null || transaction === void 0 ? void 0 : transaction.status) !== 'success') {
                        throw { message: wp.i18n.sprintf(wp.i18n.__('Paystack transaction could not be finished. Status: %s', 'surecart'), transaction === null || transaction === void 0 ? void 0 : transaction.status) };
                    }
                    return updateFormState('PAID');
                },
                onClose: () => updateFormState('REJECT'),
            });
        }
        catch (err) {
            createErrorNotice(err);
            console.error(err);
            updateFormState('REJECT');
        }
    }
};

const ScCheckoutRazorpayPaymentProvider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.razorpayInstance = null;
        this.confirming = false;
        this.processorId = undefined;
    }
    componentWillLoad() {
        // Preload Razorpay script.
        loadRazorpay()
            .then(instance => (this.razorpayInstance = instance))
            .catch(err => createErrorNotice({ message: err.message }));
        // we need to listen to the form state and pay when the form state enters the paying state.
        this.unlistenToFormState = onChange('formState', () => {
            // are we paying?
            if ('paying' === currentFormState()) {
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
        state$1.methods = [];
    }
    /** Fetch enabled `payment_method_types` for recurring checkouts. No-op otherwise. */
    async fetchMethods() {
        const checkout = state$2.checkout;
        if (!this.processorId || !(checkout === null || checkout === void 0 ? void 0 : checkout.currency))
            return;
        // One-time — Razorpay handles method selection in its modal. Clear any stale recurring methods.
        if (!(checkout === null || checkout === void 0 ? void 0 : checkout.reusable_payment_method_required)) {
            if (state$1.methods.length)
                state$1.methods = [];
            return;
        }
        try {
            lockCheckout('methods');
            const response = (await apiFetch({
                path: addQueryArgs(`surecart/v1/processors/${this.processorId}/payment_method_types`, {
                    currency: checkout.currency,
                    reusable: true,
                    per_page: 100,
                }),
            }));
            state$1.methods = (response === null || response === void 0 ? void 0 : response.data) || [];
        }
        catch (e) {
            createErrorNotice(e);
            console.error(e);
        }
        finally {
            unLockCheckout('methods');
        }
    }
    async confirm() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        // this processor is not selected.
        if ((state === null || state === void 0 ? void 0 : state.id) !== 'razorpay')
            return;
        // Must be a razorpay session
        if (!((_c = (_b = (_a = state$2 === null || state$2 === void 0 ? void 0 : state$2.checkout) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.processor_data) === null || _c === void 0 ? void 0 : _c.razorpay))
            return;
        // Prevent if already paid.
        if (((_d = state$2 === null || state$2 === void 0 ? void 0 : state$2.checkout) === null || _d === void 0 ? void 0 : _d.status) === 'paid')
            return;
        // Prevent multiple simultaneous payment attempts
        if (this.confirming)
            return;
        this.confirming = true;
        try {
            // must have a public_key and external_intent_id.
            const { external_intent_id, processor_data, reusable } = ((_e = state$2 === null || state$2 === void 0 ? void 0 : state$2.checkout) === null || _e === void 0 ? void 0 : _e.payment_intent) || {};
            const { public_key, customer_id } = (processor_data === null || processor_data === void 0 ? void 0 : processor_data.razorpay) || {};
            if (!external_intent_id || !public_key) {
                createErrorNotice({ message: wp.i18n.sprintf(wp.i18n.__('Payment gateway configuration incomplete. Please ensure Razorpay is properly configured for transactions.', 'surecart')) });
                return;
            }
            // Wait for script to load if not loaded yet.
            if (!this.razorpayInstance) {
                this.razorpayInstance = await loadRazorpay();
            }
            const customer = (_f = state$2 === null || state$2 === void 0 ? void 0 : state$2.checkout) === null || _f === void 0 ? void 0 : _f.customer;
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
                        return updateFormState('PAID');
                    }
                    else {
                        createErrorNotice({ message: wp.i18n.__('Payment verification failed. Please contact support.', 'surecart') });
                        updateFormState('REJECT');
                    }
                },
                modal: {
                    ondismiss: () => {
                        updateFormState('REJECT');
                    },
                },
            };
            if ((_h = (_g = window === null || window === void 0 ? void 0 : window.wp) === null || _g === void 0 ? void 0 : _g.hooks) === null || _h === void 0 ? void 0 : _h.applyFilters) {
                options = window.wp.hooks.applyFilters('surecart_razorpay_checkout_options', options);
            }
            const razorpay = new this.razorpayInstance(options);
            razorpay.on('payment.failed', response => {
                var _a;
                createErrorNotice({
                    message: ((_a = response === null || response === void 0 ? void 0 : response.error) === null || _a === void 0 ? void 0 : _a.description) || wp.i18n.__('Payment failed. Please try again.', 'surecart'),
                });
                updateFormState('REJECT');
                console.error('payment.failed', response);
            });
            razorpay.open();
        }
        catch (err) {
            createErrorNotice(err);
            console.error(err);
            updateFormState('REJECT');
        }
        finally {
            this.confirming = false;
        }
    }
};

export { ScCheckoutMolliePayment as sc_checkout_mollie_payment, ScCheckoutPaystackPaymentProvider as sc_checkout_paystack_payment_provider, ScCheckoutRazorpayPaymentProvider as sc_checkout_razorpay_payment_provider };

//# sourceMappingURL=sc-checkout-mollie-payment_3.entry.js.map