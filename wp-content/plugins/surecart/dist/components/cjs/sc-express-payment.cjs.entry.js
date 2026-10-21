'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const getters = require('./getters-d8754292.js');
const getters$1 = require('./getters-ade46b86.js');
require('./util-a15c420c.js');
require('./index-c3de642f.js');
require('./utils-f5ea3c23.js');
require('./mutations-4133422f.js');
require('./remove-query-args-b57e8cd3.js');
require('./add-query-args-49dcb630.js');
require('./index-fb76df07.js');
require('./google-8dbad1a6.js');
require('./currency-b438c76d.js');
require('./store-29627d6b.js');
require('./price-9dddd853.js');
require('./watchers-517825ae.js');

const scExpressPaymentCss = "sc-express-payment{display:block}";
const ScExpressPaymentStyle0 = scExpressPaymentCss;

const ScExpressPayment = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.processor = undefined;
        this.dividerText = undefined;
        this.debug = undefined;
        this.hasPaymentOptions = undefined;
    }
    onPaymentRequestLoaded() {
        this.hasPaymentOptions = true;
    }
    renderStripePaymentRequest() {
        const { processor_data } = getters.getProcessorByType('stripe') || {};
        return index.h("sc-stripe-payment-request", { debug: this.debug, stripeAccountId: processor_data === null || processor_data === void 0 ? void 0 : processor_data.account_id, publishableKey: processor_data === null || processor_data === void 0 ? void 0 : processor_data.publishable_key });
    }
    render() {
        return (index.h(index.Host, { key: '6908614bce697360d66e04ecd8ef42f7158b265d', class: { 'is-empty': !this.hasPaymentOptions && !this.debug } }, this.renderStripePaymentRequest(), (this.hasPaymentOptions || this.debug) && index.h("sc-divider", { key: 'f9b0bc2de48e292d0c3d1182710487be459d04f4', style: { '--spacing': 'calc(var(--sc-form-row-spacing)/2)' } }, this.dividerText), !!getters$1.formBusy() && index.h("sc-block-ui", { key: '6a86cffc1c0375372cb5bf0d4918f330c0632e49' })));
    }
};
ScExpressPayment.style = ScExpressPaymentStyle0;

exports.sc_express_payment = ScExpressPayment;

//# sourceMappingURL=sc-express-payment.cjs.entry.js.map