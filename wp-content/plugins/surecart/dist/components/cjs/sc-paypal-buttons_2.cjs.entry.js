'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const functions = require('./functions-033a6a55.js');
require('./fetch-5e8dc1d5.js');
const index$1 = require('./index-c5bd66ae.js');
const mutations = require('./mutations-d5d6ddf1.js');
const index$2 = require('./index-7ced8198.js');
require('./add-query-args-49dcb630.js');
require('./remove-query-args-b57e8cd3.js');
require('./mutations-4133422f.js');
require('./index-c3de642f.js');
require('./utils-f5ea3c23.js');
require('./index-fb76df07.js');
require('./google-8dbad1a6.js');
require('./currency-b438c76d.js');
require('./store-29627d6b.js');
require('./price-9dddd853.js');

const paypalButtonsCss = ":host{display:block}.paypal-buttons{position:relative;line-height:0;text-align:center}.paypal-buttons:not(.paypal-buttons--busy):after{content:\" \";border-bottom:1px solid var(--sc-input-border-color);width:100%;height:0;top:50%;left:0;right:0;position:absolute}";
const ScPaypalButtonsStyle0 = paypalButtonsCss;

const ScPaypalButtons = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scSetState = index.createEvent(this, "scSetState", 7);
        this.scPaid = index.createEvent(this, "scPaid", 7);
        /** Monotonic id so only the latest bootstrap renders. */
        this.bootstrapId = 0;
        this.clientId = undefined;
        this.busy = false;
        this.merchantId = undefined;
        this.merchantInitiated = undefined;
        this.mode = undefined;
        this.order = undefined;
        this.buttons = ['paypal', 'card'];
        this.label = 'paypal';
        this.color = 'gold';
        this.loaded = false;
    }
    handleOrderChange(val, prev) {
        // Only these two feed the SDK bootstrap; everything else is read at click time.
        // Keying on updated_at tore down a working button on every checkout PATCH.
        if ((val === null || val === void 0 ? void 0 : val.currency) === (prev === null || prev === void 0 ? void 0 : prev.currency) && Boolean(val === null || val === void 0 ? void 0 : val.reusable_payment_method_required) === Boolean(prev === null || prev === void 0 ? void 0 : prev.reusable_payment_method_required)) {
            return;
        }
        this.loadScript();
    }
    handleButtonsChange(val, prev) {
        // The parent passes a fresh array literal every render.
        if ((val === null || val === void 0 ? void 0 : val.join()) === (prev === null || prev === void 0 ? void 0 : prev.join()))
            return;
        this.loadScript();
    }
    /** Load the script */
    async loadScript() {
        var _a, _b, _c;
        if (!this.clientId || !this.merchantId)
            return;
        const bootstrapId = ++this.bootstrapId;
        this.loaded = false;
        try {
            const paypal = await functions.loadScript(functions.getScriptLoadParams({
                clientId: this.clientId,
                merchantId: this.merchantId,
                merchantInitiated: this.merchantInitiated,
                reusable: (_a = this.order) === null || _a === void 0 ? void 0 : _a.reusable_payment_method_required,
                currency: (_b = this.order) === null || _b === void 0 ? void 0 : _b.currency,
                locale: (_c = window.scData) === null || _c === void 0 ? void 0 : _c.locale,
            }));
            // A newer bootstrap started while the SDK was loading.
            if (bootstrapId !== this.bootstrapId)
                return;
            if (this.cardContainer) {
                this.cardContainer.innerHTML = '';
            }
            if (this.paypalContainer) {
                this.paypalContainer.innerHTML = '';
            }
            this.renderButtons(paypal);
        }
        catch (err) {
            console.error('failed to load the PayPal JS SDK script', err);
        }
    }
    /** Load the script on component load. */
    componentDidLoad() {
        this.loadScript();
    }
    /** Render the buttons. */
    renderButtons(paypal) {
        const createFunc = this.order.reusable_payment_method_required ? 'createBillingAgreement' : 'createOrder';
        const config = {
            /**
             * Validate the form, client-side when the button is clicked.
             */
            onClick: async (_, actions) => {
                const form = this.el.closest('sc-checkout');
                const isValid = await form.validate();
                return isValid ? actions.resolve() : actions.reject();
            },
            onInit: () => {
                this.loaded = true;
            },
            onCancel: () => {
                this.scSetState.emit('REJECT');
            },
            /**
             * The transaction has been approved.
             * We can capture it.
             */
            onApprove: async () => {
                var _a, _b, _c, _d;
                try {
                    this.order = (await index$1.fetchCheckout({ id: (_a = this.order) === null || _a === void 0 ? void 0 : _a.id }));
                }
                catch (e) {
                    console.error(e);
                    mutations.createErrorNotice({ code: 'could_not_capture', message: wp.i18n.__('The payment did not process. Please try again.', 'surecart') });
                    this.scSetState.emit('REJECT');
                }
                try {
                    this.scSetState.emit('PAYING');
                    const intent = (await index$2.apiFetch({
                        method: 'PATCH',
                        path: `surecart/v1/payment_intents/${((_c = (_b = this.order) === null || _b === void 0 ? void 0 : _b.payment_intent) === null || _c === void 0 ? void 0 : _c.id) || ((_d = this.order) === null || _d === void 0 ? void 0 : _d.payment_intent)}/capture`,
                    }));
                    if (['succeeded', 'processing'].includes(intent === null || intent === void 0 ? void 0 : intent.status)) {
                        this.scSetState.emit('PAID');
                        this.scPaid.emit();
                    }
                    else {
                        mutations.createErrorNotice({ code: 'could_not_capture', message: wp.i18n.__('Payment processing failed. Kindly attempt the transaction once more.', 'surecart') });
                        this.scSetState.emit('REJECT');
                    }
                }
                catch (err) {
                    console.error(err);
                    mutations.createErrorNotice({ code: 'could_not_capture', message: wp.i18n.__('Payment processing failed. Kindly attempt the transaction once more.', 'surecart') });
                    this.scSetState.emit('REJECT');
                }
            },
            /**
             * Transaction errored.
             * @param err
             */
            onError: err => {
                console.error(err);
                mutations.createErrorNotice(err);
                this.scSetState.emit('REJECT');
            },
        };
        config[createFunc] = async () => {
            return new Promise(async (resolve, reject) => {
                var _a, _b;
                // get the checkout component.
                const checkout = this.el.closest('sc-checkout');
                // submit and get the finalized order
                const order = (await checkout.submit());
                // an error occurred. reject with the error.
                if (order instanceof Error) {
                    return reject(order);
                }
                // assume there was a validation issue here.
                // that is handled by our fetch function.
                if ((order === null || order === void 0 ? void 0 : order.status) !== 'finalized') {
                    return reject(new Error('Something went wrong. Please try again.'));
                }
                // resolve the payment intent id.
                if ((_a = order === null || order === void 0 ? void 0 : order.payment_intent) === null || _a === void 0 ? void 0 : _a.external_intent_id) {
                    return resolve((_b = order === null || order === void 0 ? void 0 : order.payment_intent) === null || _b === void 0 ? void 0 : _b.external_intent_id);
                }
                // we don't have the correct payment intent for some reason.
                mutations.createErrorNotice({ code: 'missing_payment_intent', message: wp.i18n.__('Something went wrong. Please contact us for payment.', 'surecart') });
                return reject();
            });
        };
        // Only boot the funding sources we show; each is a separate iframe bootstrap.
        if (paypal.FUNDING.PAYPAL && this.buttons.includes('paypal')) {
            const paypalButton = paypal.Buttons({
                fundingSource: paypal.FUNDING.PAYPAL,
                style: {
                    label: this.label,
                    color: this.color,
                },
                ...config,
            });
            if (paypalButton.isEligible()) {
                paypalButton.render(this.paypalContainer).catch(err => console.error('failed to render the PayPal button', err));
            }
        }
        if (paypal.FUNDING.CARD && this.buttons.includes('card')) {
            const cardButton = paypal.Buttons({
                fundingSource: paypal.FUNDING.CARD,
                style: {
                    color: 'black',
                },
                ...config,
            });
            if (cardButton.isEligible()) {
                cardButton.render(this.cardContainer).catch(err => console.error('failed to render the PayPal card button', err));
            }
        }
    }
    render() {
        return (index.h("div", { key: 'b3157e1b376976219e2aaf806ddae33b4773de97', part: `base ${this.busy || (!this.loaded && 'base--busy')}`, class: { 'paypal-buttons': true, 'paypal-buttons--busy': this.busy || !this.loaded } }, (!this.loaded || this.busy) && index.h("sc-skeleton", { key: '6718cdeb1aa36f1db25db8f4c15875ed27f1e02e', style: { 'height': '55px', '--border-radius': '4px', 'cursor': 'wait' } }), index.h("div", { key: '1140d5203820e1581d473fb3c6f8bc076ea1f577', class: "sc-paypal-button-container", hidden: !this.loaded || this.busy }, index.h("div", { key: '383046c87558c40bfb517ddcd1b0d2942f40512d', part: "paypal-card-button", hidden: !this.buttons.includes('card'), class: "sc-paypal-card-button", ref: el => (this.cardContainer = el) }), index.h("div", { key: '61aec56d76b14b60093dc5213431f6fe320c7ba6', part: "paypal-button", hidden: !this.buttons.includes('paypal'), class: "sc-paypal-button", ref: el => (this.paypalContainer = el) }))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "order": ["handleOrderChange"],
        "buttons": ["handleButtonsChange"]
    }; }
};
ScPaypalButtons.style = ScPaypalButtonsStyle0;

const scSecureNoticeCss = ":host{display:block;--sc-secure-notice-icon-color:var(--sc-color-gray-300);--sc-secure-notice-font-size:var(--sc-font-size-small);--sc-secure-notice-color:var(--sc-color-gray-500)}.notice{color:var(--sc-secure-notice-color);font-size:var(--sc-secure-notice-font-size);display:flex;align-items:center;gap:5px}.notice__text{flex:1;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap}.notice__icon{color:var(--sc-secure-notice-icon-color);margin-right:5px}";
const ScSecureNoticeStyle0 = scSecureNoticeCss;

const ScSecureNotice = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h("div", { key: '0a7415001dd7d32c03073ecd0a16e20207552b10', class: "notice", part: "base" }, index.h("svg", { key: '61ca5defd459c5552a026c3e1c0954bc26fa48b7', class: "notice__icon", part: "icon", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 512 512", fill: "currentColor" }, index.h("path", { key: 'd439c6c8775e6b32b3cdf0679da68d8928c171e9', d: "M368,192H352V112a96,96,0,1,0-192,0v80H144a64.07,64.07,0,0,0-64,64V432a64.07,64.07,0,0,0,64,64H368a64.07,64.07,0,0,0,64-64V256A64.07,64.07,0,0,0,368,192Zm-48,0H192V112a64,64,0,1,1,128,0Z" })), index.h("span", { key: 'f0684909fed6fade6c615ce30389545c928369fd', class: "notice__text", part: "text" }, index.h("slot", { key: '0171cdf6ae159dcc6afc7a5db85fd3d6e524a2d1', name: "prefix" }), index.h("slot", { key: '64baf61e6cf6c15da9495a9a9dd6b7168bc0b33a' }), index.h("slot", { key: '41629d1d4df88dfbc254ef53b3f905eff0745077', name: "suffix" }))));
    }
};
ScSecureNotice.style = ScSecureNoticeStyle0;

exports.sc_paypal_buttons = ScPaypalButtons;
exports.sc_secure_notice = ScSecureNotice;

//# sourceMappingURL=sc-paypal-buttons_2.cjs.entry.js.map