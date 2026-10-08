import { r as registerInstance, h, H as Host } from './index-25e5af33.js';
import { g as getProcessorByType } from './getters-476a5a84.js';
import { f as formBusy } from './getters-3801a0c9.js';
import './util-dfbf863e.js';
import './index-18f5a1bc.js';
import './utils-2fd36c2c.js';
import './mutations-54fc7af1.js';
import './remove-query-args-938c53ea.js';
import './add-query-args-0e2a8393.js';
import './index-c5a96d53.js';
import './google-e9085e27.js';
import './currency-eb33deae.js';
import './store-fd165874.js';
import './price-39d60d32.js';
import './watchers-c7bbc6b2.js';

const scExpressPaymentCss = "sc-express-payment{display:block}";
const ScExpressPaymentStyle0 = scExpressPaymentCss;

const ScExpressPayment = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.processor = undefined;
        this.dividerText = undefined;
        this.debug = undefined;
        this.hasPaymentOptions = undefined;
    }
    onPaymentRequestLoaded() {
        this.hasPaymentOptions = true;
    }
    renderStripePaymentRequest() {
        const { processor_data } = getProcessorByType('stripe') || {};
        return h("sc-stripe-payment-request", { debug: this.debug, stripeAccountId: processor_data === null || processor_data === void 0 ? void 0 : processor_data.account_id, publishableKey: processor_data === null || processor_data === void 0 ? void 0 : processor_data.publishable_key });
    }
    render() {
        return (h(Host, { key: '6908614bce697360d66e04ecd8ef42f7158b265d', class: { 'is-empty': !this.hasPaymentOptions && !this.debug } }, this.renderStripePaymentRequest(), (this.hasPaymentOptions || this.debug) && h("sc-divider", { key: 'f9b0bc2de48e292d0c3d1182710487be459d04f4', style: { '--spacing': 'calc(var(--sc-form-row-spacing)/2)' } }, this.dividerText), !!formBusy() && h("sc-block-ui", { key: '6a86cffc1c0375372cb5bf0d4918f330c0632e49' })));
    }
};
ScExpressPayment.style = ScExpressPaymentStyle0;

export { ScExpressPayment as sc_express_payment };

//# sourceMappingURL=sc-express-payment.entry.js.map