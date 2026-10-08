import { r as registerInstance, h, H as Host } from './index-25e5af33.js';
import { g as getAdditionalErrorMessages } from './getters-1049a6f8.js';
import { s as state, r as removeNotice } from './mutations-7458343f.js';
import { c as currentFormState } from './getters-3801a0c9.js';
import { o as onChange } from './store-fd165874.js';
import './index-c5a96d53.js';
import './index-18f5a1bc.js';
import './utils-2fd36c2c.js';

const scCheckoutFormErrorsCss = ":host{display:block}ul{margin:6px 0px;padding:0px;list-style:none}";
const ScCheckoutFormErrorsStyle0 = scCheckoutFormErrorsCss;

const ScCheckoutFormErrors = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.removeStateListener = () => { };
    }
    /**
     * Get the alert type.
     * @returns string
     */
    getAlertType() {
        switch (state === null || state === void 0 ? void 0 : state.type) {
            case 'error':
                return 'danger';
            case 'default':
                return 'primary';
            default:
                return state === null || state === void 0 ? void 0 : state.type;
        }
    }
    componentWillLoad() {
        // remove notice if finalizing or updating.
        this.removeStateListener = onChange('formState', () => {
            if (['finalizing', 'updating'].includes(currentFormState())) {
                removeNotice();
            }
        });
    }
    disconnectedCallback() {
        this.removeStateListener();
    }
    getTopLevelError() {
        var _a;
        // checkout invalid is not friendly.
        if ((state === null || state === void 0 ? void 0 : state.code) === 'checkout.invalid' && ((_a = getAdditionalErrorMessages()) === null || _a === void 0 ? void 0 : _a.length)) {
            return '';
        }
        return state === null || state === void 0 ? void 0 : state.message;
    }
    render() {
        // don't show component if no error message or is finalizing or updating.
        if (!(state === null || state === void 0 ? void 0 : state.message) || ['finalizing', 'updating'].includes(currentFormState())) {
            return h(Host, { style: { display: 'none' } });
        }
        return (h(Host, null, h("sc-alert", { type: this.getAlertType(), scrollOnOpen: true, open: !!(state === null || state === void 0 ? void 0 : state.message), closable: !!(state === null || state === void 0 ? void 0 : state.dismissible) }, !!this.getTopLevelError() && h("span", { slot: "title", innerHTML: this.getTopLevelError() }), (getAdditionalErrorMessages() || []).map((message, index) => (h("div", { innerHTML: message, key: index })))), h("slot", null)));
    }
};
ScCheckoutFormErrors.style = ScCheckoutFormErrorsStyle0;

export { ScCheckoutFormErrors as sc_checkout_form_errors };

//# sourceMappingURL=sc-checkout-form-errors.entry.js.map