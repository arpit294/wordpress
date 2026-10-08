'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
require('./fetch-5e8dc1d5.js');
const universe = require('./universe-1db52218.js');
const removeQueryArgs = require('./remove-query-args-b57e8cd3.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
const index$1 = require('./index-7ced8198.js');

const scOrderConfirmationCss = ":host{display:block;max-width:800px;margin:auto}::slotted(*:not(:last-child)),sc-form form>*:not(:last-child){margin-bottom:var(--sc-form-row-spacing-large)}.order-confirmation__content{color:var(--sc-order-confirmation-color, var(--sc-color-gray-500))}.order-confirmation__content.hidden{display:none}::part(line-items){display:grid;gap:0.5em}";
const ScOrderConfirmationStyle0 = scOrderConfirmationCss;

const ScOrderConfirmation = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.order = undefined;
        this.loading = false;
        this.error = undefined;
    }
    componentWillLoad() {
        // @ts-ignore
        universe.Universe.create(this, this.state());
        // get teh session
        this.getSession();
    }
    /** Get session id from url. */
    getSessionId() {
        var _a;
        if ((_a = this.order) === null || _a === void 0 ? void 0 : _a.id)
            return this.order.id;
        return removeQueryArgs.getQueryArg(window.location.href, 'sc_order');
    }
    /** Update a session */
    async getSession() {
        var _a;
        if (!this.getSessionId())
            return;
        if ((_a = this.order) === null || _a === void 0 ? void 0 : _a.id)
            return;
        try {
            this.loading = true;
            this.order = (await await index$1.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/checkouts/${this.getSessionId()}`, {
                    expand: [
                        'checkout_fees',
                        'shipping_fees',
                        'line_items',
                        'line_item.price',
                        'line_item.fees',
                        'price.product',
                        'customer',
                        'customer.shipping_address',
                        'payment_intent',
                        'discount',
                        'manual_payment_method',
                        'discount.promotion',
                        'billing_address',
                        'shipping_address',
                    ],
                    refresh_status: true,
                    currency_conversion: false,
                }),
            }));
        }
        catch (e) {
            if (e === null || e === void 0 ? void 0 : e.message) {
                this.error = e.message;
            }
            else {
                this.error = wp.i18n.__('Something went wrong', 'surecart');
            }
        }
        finally {
            this.loading = false;
        }
    }
    state() {
        var _a, _b;
        const manualPaymentMethod = (_a = this.order) === null || _a === void 0 ? void 0 : _a.manual_payment_method;
        return {
            processor: 'stripe',
            loading: this.loading,
            orderId: this.getSessionId(),
            order: this.order,
            customer: (_b = this.order) === null || _b === void 0 ? void 0 : _b.customer,
            manualPaymentTitle: manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name,
            manualPaymentInstructions: manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions,
        };
    }
    renderOnHold() {
        var _a, _b, _c;
        if (((_a = this.order) === null || _a === void 0 ? void 0 : _a.status) !== 'processing')
            return null;
        if (((_c = (_b = this === null || this === void 0 ? void 0 : this.order) === null || _b === void 0 ? void 0 : _b.payment_intent) === null || _c === void 0 ? void 0 : _c.processor_type) === 'paypal') {
            return (index.h("sc-alert", { type: "warning", open: true }, wp.i18n.__('Paypal is taking a closer look at this payment. It’s required for some payments and normally takes up to 3 business days.', 'surecart')));
        }
    }
    renderManualInstructions() {
        var _a;
        const paymentMethod = (_a = this.order) === null || _a === void 0 ? void 0 : _a.manual_payment_method;
        if (!(paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.instructions))
            return;
        return (index.h("sc-alert", { type: "info", open: true }, index.h("span", { slot: "title" }, paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.name), index.h("div", { innerHTML: paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.instructions })));
    }
    render() {
        var _a, _b;
        return (index.h(universe.Universe.Provider, { key: '2b577e8efc31a9535053cac06e3648a2514cdcc9', state: this.state() }, index.h("div", { key: '11e07dbf8476b61b39dadbea3a27064ae8afe942', class: { 'order-confirmation': true } }, index.h("div", { key: '969371dcbd212edcc8b0900ba03cf23de8c90a33', class: {
                'order-confirmation__content': true,
                'hidden': !((_a = this.order) === null || _a === void 0 ? void 0 : _a.id) && !this.loading,
            } }, index.h("sc-order-confirm-components-validator", { key: 'a66e1c4b4bfa54c33a2456cbbc21e7149b5e8439', checkout: this.order }, index.h("slot", { key: '1c7f445218de8f8c22a7c768ab12b7edbb2e20e4' }))), !((_b = this.order) === null || _b === void 0 ? void 0 : _b.id) && !this.loading && (index.h("sc-heading", { key: '26d652e296c663962892fa8607a6f96802620600' }, wp.i18n.__('Order not found.', 'surecart'), index.h("span", { key: 'e0b6f05c980f208600c48e027387c9a6b46f186e', slot: "description" }, wp.i18n.__('This order could not be found. Please try again.', 'surecart')))))));
    }
};
ScOrderConfirmation.style = ScOrderConfirmationStyle0;

exports.sc_order_confirmation = ScOrderConfirmation;

//# sourceMappingURL=sc-order-confirmation.cjs.entry.js.map