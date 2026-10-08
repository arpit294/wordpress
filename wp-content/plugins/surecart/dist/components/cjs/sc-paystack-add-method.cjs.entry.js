'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const inline = require('./inline-aa15f113.js');
require('./fetch-5e8dc1d5.js');
const index$1 = require('./index-7ced8198.js');
require('./add-query-args-49dcb630.js');
require('./remove-query-args-b57e8cd3.js');

const scPaystackAddMethodCss = ":host{display:block}";
const ScPaystackAddMethodStyle0 = scPaystackAddMethodCss;

const ScPaystackAddMethod = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.liveMode = true;
        this.customerId = undefined;
        this.successUrl = undefined;
        this.currency = undefined;
        this.loading = undefined;
        this.loaded = undefined;
        this.error = undefined;
        this.paymentIntent = undefined;
    }
    async handlePaymentIntentCreate() {
        var _a, _b;
        const { public_key, access_code } = ((_b = (_a = this.paymentIntent) === null || _a === void 0 ? void 0 : _a.processor_data) === null || _b === void 0 ? void 0 : _b.paystack) || {};
        // we need this data.
        if (!public_key || !access_code)
            return;
        const paystack = new inline.se();
        await paystack.newTransaction({
            key: public_key,
            accessCode: access_code, // We'll use accessCode which will handle product, price on our server.
            onSuccess: async (transaction) => {
                if ((transaction === null || transaction === void 0 ? void 0 : transaction.status) !== 'success') {
                    throw { message: wp.i18n.sprintf(wp.i18n.__('Paystack transaction could not be finished. Status: %s', 'surecart'), transaction === null || transaction === void 0 ? void 0 : transaction.status) };
                }
                window.location.assign(this.successUrl);
            },
            onClose: err => {
                console.error(err);
                alert((err === null || err === void 0 ? void 0 : err.message) || wp.i18n.__('The payment did not process. Please try again.', 'surecart'));
            },
        });
    }
    async createPaymentIntent() {
        var _a, _b;
        try {
            this.loading = true;
            this.error = '';
            this.paymentIntent = await index$1.apiFetch({
                method: 'POST',
                path: 'surecart/v1/payment_intents',
                data: {
                    processor_type: 'paystack',
                    reusable: true,
                    live_mode: this.liveMode,
                    customer_id: this.customerId,
                    currency: this.currency,
                    refresh_status: true,
                },
            });
        }
        catch (e) {
            this.error = ((_b = (_a = e === null || e === void 0 ? void 0 : e.additional_errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.loading = false;
        }
    }
    render() {
        return (index.h(index.Host, { key: 'ad91be25f6d708dab2a1a80c4335208bd52194c4' }, this.error && (index.h("sc-alert", { key: 'f6b45350154a95c5c2d25e7a5a245e0c403d94b1', open: !!this.error, type: "danger" }, index.h("span", { key: '2f68778719e935a73a1bf511c2ae079387f366b5', slot: "title" }, wp.i18n.__('Error', 'surecart')), this.error)), index.h("div", { key: '2f398746979f660ee7f5b5c37e78a302c72a157d', class: "sc-paystack-button-container" }, index.h("sc-alert", { key: '7c7972ce7c4a2b6956a3e5ac0ddff5b9ee094c7f', open: true, type: "warning" }, wp.i18n.__('In order to add a new card, we will need to make a small transaction to authenticate it. This is for authentication purposes and will be immediately refunded.', 'surecart'), index.h("div", { key: '4d952a0b0f698f55338d73bdc6e9856986660185' }, index.h("sc-button", { key: '097d887213eb6c28de148fdd2c541ced090403f3', loading: this.loading, type: "primary", onClick: () => this.createPaymentIntent(), style: { marginTop: 'var(--sc-spacing-medium)' } }, wp.i18n.__('Add New Card', 'surecart')))))));
    }
    static get watchers() { return {
        "paymentIntent": ["handlePaymentIntentCreate"]
    }; }
};
ScPaystackAddMethod.style = ScPaystackAddMethodStyle0;

exports.sc_paystack_add_method = ScPaystackAddMethod;

//# sourceMappingURL=sc-paystack-add-method.cjs.entry.js.map