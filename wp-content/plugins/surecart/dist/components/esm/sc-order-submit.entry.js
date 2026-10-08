import { r as registerInstance, h, F as Fragment } from './index-25e5af33.js';
import { a as checkoutIsLocked } from './getters-ed04d1c9.js';
import { a as availableProcessors } from './getters-476a5a84.js';
import { s as state$1 } from './watchers-c7bbc6b2.js';
import { s as state } from './mutations-54fc7af1.js';
import { o as openWormhole } from './consumer-f1775a76.js';
import { f as formBusy } from './getters-3801a0c9.js';
import './store-ea636731.js';
import './index-18f5a1bc.js';
import './utils-2fd36c2c.js';
import './address-b8e2e4c8.js';
import './add-query-args-0e2a8393.js';
import './util-dfbf863e.js';
import './remove-query-args-938c53ea.js';
import './index-c5a96d53.js';
import './google-e9085e27.js';
import './currency-eb33deae.js';
import './store-fd165874.js';
import './price-39d60d32.js';

const getProcessorData = (processors = [], type, mode) => {
    var _a;
    return ((_a = (processors || []).find(processor => (processor === null || processor === void 0 ? void 0 : processor.processor_type) === type && (processor === null || processor === void 0 ? void 0 : processor.live_mode) === !!(mode === 'live'))) === null || _a === void 0 ? void 0 : _a.processor_data) || {};
};

const scOrderSubmitCss = "sc-order-submit{display:block;width:auto;display:grid;gap:var(--sc-form-row-spacing)}.sc-secure-notice{display:flex;justify-content:center}";
const ScOrderSubmitStyle0 = scOrderSubmitCss;

const ScOrderSubmit = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.loading = undefined;
        this.paying = undefined;
        this.type = 'primary';
        this.size = 'medium';
        this.full = true;
        this.icon = undefined;
        this.showTotal = undefined;
        this.processors = undefined;
        this.order = undefined;
        this.currencyCode = 'usd';
        this.processor = undefined;
        this.secureNoticeText = undefined;
        this.secureNotice = true;
        this.backgroundColor = '';
        this.textColor = '';
    }
    cannotShipToLocation() {
        var _a, _b;
        return ((_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.selected_shipping_choice_required) && !((_b = state.checkout) === null || _b === void 0 ? void 0 : _b.selected_shipping_choice);
    }
    renderPayPalButton(buttons) {
        const { client_id, account_id, merchant_initiated_enabled } = getProcessorData(availableProcessors(), 'paypal', state.mode);
        if (!client_id && !account_id)
            return null;
        return (h("sc-paypal-buttons", { buttons: buttons, busy: formBusy() || checkoutIsLocked(), mode: state.mode, order: state.checkout, merchantInitiated: merchant_initiated_enabled, "currency-code": state.currencyCode, "client-id": client_id, "merchant-id": account_id, label: "checkout", color: "blue" }));
    }
    render() {
        var _a;
        if (this.cannotShipToLocation() || checkoutIsLocked('OUT_OF_STOCK')) {
            return (h("sc-button", { type: this.type, size: this.size, full: this.full, loading: this.loading || this.paying, disabled: true, style: {
                    '--sc-color-primary-text': this.textColor,
                    '--sc-color-primary-500': this.backgroundColor,
                } }, !!this.icon && h("sc-icon", { name: this.icon, slot: "prefix", "aria-hidden": "true" }), h("slot", null, wp.i18n.__('Purchase', 'surecart')), this.showTotal && (h("span", null, '\u00A0', h("sc-total", null))), h("sc-visually-hidden", null, " ", wp.i18n.__('Press enter to purchase', 'surecart'))));
        }
        const paymentRequired = (_a = state.checkout) === null || _a === void 0 ? void 0 : _a.payment_method_required;
        return (h(Fragment, null, paymentRequired && state$1.id === 'paypal' && this.renderPayPalButton(state$1.method === 'card' ? ['card'] : ['paypal']), h("sc-button", { hidden: ['paypal', 'paypal-card'].includes(state$1.id) && paymentRequired, submit: true, type: this.type, size: this.size, full: this.full, loading: this.loading || this.paying, disabled: this.loading || this.paying || formBusy() || checkoutIsLocked() || this.cannotShipToLocation(), style: {
                '--sc-color-primary-text': this.textColor,
                '--sc-color-primary-500': this.backgroundColor,
            } }, !!this.icon && h("sc-icon", { name: this.icon, slot: "prefix", "aria-hidden": "true" }), h("slot", null, wp.i18n.__('Purchase', 'surecart')), this.showTotal && (h("span", null, '\u00A0', h("sc-total", null))), h("sc-visually-hidden", null, " ", wp.i18n.__('Press enter to purchase', 'surecart'))), this.secureNotice && location.protocol === 'https:' && (h("div", { class: "sc-secure-notice" }, h("sc-secure-notice", null, this.secureNoticeText || wp.i18n.__('This is a secure, encrypted payment.', 'surecart'))))));
    }
};
openWormhole(ScOrderSubmit, ['loading', 'paying', 'processors', 'processor', 'currencyCode', 'order'], false);
ScOrderSubmit.style = ScOrderSubmitStyle0;

export { ScOrderSubmit as sc_order_submit };

//# sourceMappingURL=sc-order-submit.entry.js.map