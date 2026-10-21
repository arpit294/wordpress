import { r as registerInstance, c as createEvent, h } from './index-25e5af33.js';
import { s as state$1 } from './store-ea636731.js';
import { s as state, o as onChange } from './mutations-54fc7af1.js';
import { a as getValueFromUrl } from './util-dfbf863e.js';
import { c as createOrUpdateCheckout } from './index-396e50a3.js';
import './index-18f5a1bc.js';
import './utils-2fd36c2c.js';
import './remove-query-args-938c53ea.js';
import './add-query-args-0e2a8393.js';
import './index-c5a96d53.js';
import './google-e9085e27.js';
import './currency-eb33deae.js';
import './store-fd165874.js';
import './price-39d60d32.js';
import './fetch-cdff67be.js';
import './index-824c562b.js';

const scCustomerLastnameCss = ":host{display:block}";
const ScCustomerLastnameStyle0 = scCustomerLastnameCss;

const ScCustomerLastname = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.scInput = createEvent(this, "scInput", 7);
        this.scFocus = createEvent(this, "scFocus", 7);
        this.scBlur = createEvent(this, "scBlur", 7);
        this.loggedIn = undefined;
        this.size = 'medium';
        this.value = null;
        this.pill = false;
        this.label = undefined;
        this.showLabel = true;
        this.help = '';
        this.placeholder = undefined;
        this.disabled = false;
        this.readonly = false;
        this.required = false;
        this.invalid = false;
        this.autofocus = undefined;
        this.hasFocus = undefined;
    }
    /** Don't allow a blank space as an input here. */
    async reportValidity() {
        return this.input.reportValidity();
    }
    /** Silently update the checkout when the input changes. */
    async handleChange() {
        this.value = this.input.value;
        try {
            state.checkout = (await createOrUpdateCheckout({ id: state.checkout.id, data: { last_name: this.input.value } }));
        }
        catch (error) {
            console.error(error);
        }
    }
    /** Sync customer last name with session if it's updated by other means */
    handleSessionChange() {
        var _a, _b, _c, _d, _e, _f;
        // we already have a value.
        if (this.value)
            return;
        const fromUrl = getValueFromUrl('last_name');
        if (!state$1.loggedIn && !!fromUrl) {
            this.value = fromUrl;
            return;
        }
        if (state$1.loggedIn) {
            this.value = ((_b = (_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b.last_name) || ((_c = state === null || state === void 0 ? void 0 : state.checkout) === null || _c === void 0 ? void 0 : _c.last_name);
        }
        else {
            this.value = ((_d = state === null || state === void 0 ? void 0 : state.checkout) === null || _d === void 0 ? void 0 : _d.last_name) || ((_f = (_e = state === null || state === void 0 ? void 0 : state.checkout) === null || _e === void 0 ? void 0 : _e.customer) === null || _f === void 0 ? void 0 : _f.last_name);
        }
    }
    /** Listen to checkout. */
    componentWillLoad() {
        this.handleSessionChange();
        this.removeCheckoutListener = onChange('checkout', () => this.handleSessionChange());
    }
    /** Remove listener. */
    disconnectedCallback() {
        this.removeCheckoutListener();
    }
    render() {
        return (h("sc-input", { key: '628cc2e6b67fcc6a8ad2419abc967358e7381e82', type: "text", name: "last_name", ref: el => (this.input = el), value: this.value, label: this.label, help: this.help, autocomplete: "last_name", placeholder: this.placeholder, readonly: this.readonly, required: this.required, invalid: this.invalid, autofocus: this.autofocus, hasFocus: this.hasFocus, onScChange: () => this.handleChange(), onScInput: () => this.scInput.emit(), onScFocus: () => this.scFocus.emit(), onScBlur: () => this.scBlur.emit(), ...(this.disabled && { disabled: true }) }));
    }
};
ScCustomerLastname.style = ScCustomerLastnameStyle0;

export { ScCustomerLastname as sc_customer_lastname };

//# sourceMappingURL=sc-customer-lastname.entry.js.map