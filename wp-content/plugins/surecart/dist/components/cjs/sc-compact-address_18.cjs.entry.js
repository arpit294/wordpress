'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const address = require('./address-7404695f.js');
const formData = require('./form-data-0da9940f.js');
const googleMaps = require('./google-maps-f2f4405c.js');
const mutations = require('./mutations-4133422f.js');
const getters = require('./getters-ade46b86.js');
const store = require('./store-29627d6b.js');
const consumer = require('./consumer-b58230e6.js');
const tax = require('./tax-1568db23.js');
const mutations$1 = require('./mutations-fdb67675.js');
const index$2 = require('./index-c5bd66ae.js');
const index$1 = require('./index-a4a4f390.js');
const index$3 = require('./index-fb76df07.js');
const price = require('./price-9dddd853.js');
const getters$1 = require('./getters-1ff518bc.js');
const mutations$2 = require('./mutations-d5d6ddf1.js');
const pageAlign = require('./page-align-5a2ab493.js');
require('./add-query-args-49dcb630.js');
require('./index-c3de642f.js');
require('./utils-f5ea3c23.js');
require('./remove-query-args-b57e8cd3.js');
require('./google-8dbad1a6.js');
require('./currency-b438c76d.js');
require('./fetch-5e8dc1d5.js');
require('./index-7ced8198.js');
require('./store-5cd165ea.js');

const scCompactAddressCss = ":host{display:block}.sc-address{display:block;position:relative}.sc-address [hidden]{display:none}.sc-address--loading{min-height:70px}.sc-address--loading sc-skeleton{display:block;margin-bottom:1em}.sc-address__control{display:block}.sc-address__control>*{margin-bottom:-1px}.sc-address__columns{display:flex;flex-direction:row;align-items:center;flex-wrap:wrap;justify-content:space-between}.sc-address__columns>*{flex:1;width:50%;margin-left:-1px}.sc-address__columns>*:first-child{margin-left:0}";
const ScCompactAddressStyle0 = scCompactAddressCss;

const ScCompactAddress = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scChangeAddress = index.createEvent(this, "scChangeAddress", 7);
        this.scInputAddress = index.createEvent(this, "scInputAddress", 7);
        this.address = {
            country: null,
            city: null,
            line_1: null,
            line_2: null,
            postal_code: null,
            state: null,
        };
        this.names = {
            country: 'shipping_country',
            city: 'shipping_city',
            line_1: 'shipping_line_1',
            line_2: 'shipping_line_2',
            postal_code: 'shipping_postal_code',
            state: 'shipping_state',
        };
        this.placeholders = {
            country: '',
            postal_code: '',
            state: '',
        };
        this.label = wp.i18n.__('Country or region', 'surecart');
        this.required = undefined;
        this.loading = undefined;
        this.countryChoices = undefined;
        this.regions = undefined;
        this.showState = undefined;
        this.showPostal = undefined;
        this.postalCodeRegex = undefined;
    }
    /** When the state changes, we want to update city and postal fields. */
    handleAddressChange() {
        var _a;
        if (!((_a = this.address) === null || _a === void 0 ? void 0 : _a.country))
            return;
        this.setRegions();
        this.showState = ['US', 'CA'].includes(this.address.country);
        this.showPostal = ['US'].includes(this.address.country);
        this.scChangeAddress.emit(this.address);
        this.scInputAddress.emit(this.address);
    }
    updateAddress(address) {
        this.address = { ...this.address, ...address };
    }
    handleAddressInput(address) {
        this.scInputAddress.emit({ ...this.address, ...address });
    }
    clearAddress() {
        var _a;
        this.address = {
            name: (_a = this.address) === null || _a === void 0 ? void 0 : _a.name,
            country: null,
            line_1: null,
            line_2: null,
            city: null,
            postal_code: null,
            state: null,
        };
    }
    /** Set the regions based on the country. */
    async setRegions() {
        var _a, _b;
        const countryDetails = await address.getCountryDetails((_a = this.address) === null || _a === void 0 ? void 0 : _a.country);
        this.regions =
            ((_b = countryDetails === null || countryDetails === void 0 ? void 0 : countryDetails.states) === null || _b === void 0 ? void 0 : _b.map(state => ({
                value: state === null || state === void 0 ? void 0 : state.code,
                label: state === null || state === void 0 ? void 0 : state.name,
            }))) || [];
        this.placeholders = countryDetails === null || countryDetails === void 0 ? void 0 : countryDetails.address_labels;
        this.postalCodeRegex = (countryDetails === null || countryDetails === void 0 ? void 0 : countryDetails.postal_code_regex) || undefined;
    }
    componentWillLoad() {
        var _a, _b;
        this.initCountryChoices();
        this.handleAddressChange();
        const country = (_b = (_a = this.countryChoices) === null || _a === void 0 ? void 0 : _a.find(country => country.value === this.address.country)) === null || _b === void 0 ? void 0 : _b.value;
        if (country) {
            this.updateAddress({ country });
        }
        this.fetchUserCountry();
    }
    async fetchUserCountry() {
        var _a;
        if ((_a = this.address) === null || _a === void 0 ? void 0 : _a.country) {
            return;
        }
        const countryCode = await googleMaps.getCurrentUserCountryCode();
        if (countryCode) {
            this.updateAddress({ country: countryCode });
        }
    }
    async initCountryChoices() {
        this.countryChoices = await address.countryChoices();
    }
    async reportValidity() {
        return formData.reportChildrenValidity(this.el);
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        return (index.h("div", { key: 'e415024123844c53507a6ab6a4613e353c421fcd', class: "sc-address", part: "base" }, index.h("sc-form-control", { key: '99ed96d4475a2468685180f3b630c2530f1b157b', exportparts: "label, help-text, form-control", label: this.label, class: "sc-address__control", part: "control", required: this.required }, index.h("sc-select", { key: '47c73e933708d46cebf9e78a6d87f75acdf311cc', exportparts: "base:select__base, input, form-control, label, help-text, trigger, panel, caret, search__base, search__input, search__form-control, menu__base, spinner__base, empty", value: (_a = this.address) === null || _a === void 0 ? void 0 : _a.country, onScChange: (e) => {
                this.clearAddress();
                this.updateAddress({ country: e.target.value || null });
            }, choices: this.countryChoices, autocomplete: 'country-name', placeholder: ((_b = this.placeholders) === null || _b === void 0 ? void 0 : _b.country) || wp.i18n.__('Select Your Country', 'surecart'), name: this.names.country, search: true, unselect: false, "squared-bottom": this.showState || this.showPostal, required: this.required }), index.h("div", { key: '753cabeb3b002e53b50ce51c457771e19b1006d2', class: "sc-address__columns" }, this.showState && (index.h("sc-select", { key: 'd3ca8d36940412027db84467a204ba95e3e958ea', exportparts: "base:select__base, input, form-control, label, help-text, trigger, panel, caret, search__base, search__input, search__form-control, menu__base, spinner__base, empty", placeholder: (_c = this.placeholders) === null || _c === void 0 ? void 0 : _c.state, name: this.names.state, autocomplete: 'address-level1', value: (_d = this === null || this === void 0 ? void 0 : this.address) === null || _d === void 0 ? void 0 : _d.state, onScChange: (e) => this.updateAddress({ state: e.target.value || null }), choices: this.regions, required: this.required, search: true, "squared-top": true, unselect: false, "squared-right": this.showPostal })), this.showPostal && (index.h("sc-input", { key: 'f05012b425d549accbcfc9ed2c79a6d069667119', exportparts: "base:input__base, input, form-control, label, help-text", placeholder: ((_e = this.placeholders) === null || _e === void 0 ? void 0 : _e.postal_code) || wp.i18n.__('Postal Code/Zip', 'surecart'), name: this.names.postal_code, onScChange: (e) => this.updateAddress({ postal_code: e.target.value || null }), onScInput: (e) => this.handleAddressInput({ postal_code: e.target.value || null }), autocomplete: 'postal-code', required: this.required, value: (_f = this === null || this === void 0 ? void 0 : this.address) === null || _f === void 0 ? void 0 : _f.postal_code, "squared-top": true, maxlength: ((_g = this.address) === null || _g === void 0 ? void 0 : _g.country) === 'US' ? 5 : undefined, pattern: this.postalCodeRegex, customValidity: this.postalCodeRegex ? wp.i18n.__('Please enter a valid postal code', 'surecart') : undefined, "squared-left": this.showState })))), this.loading && index.h("sc-block-ui", { key: '49d2fdbf8a57df4209a8ae6c37f1f6eeea27c00d', exportparts: "base:block-ui, content:block-ui__content" })));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "address": ["handleAddressChange"]
    }; }
};
ScCompactAddress.style = ScCompactAddressStyle0;

const scCustomerPhoneCss = ":host{display:block}";
const ScCustomerPhoneStyle0 = scCustomerPhoneCss;

const ScCustomerPhone = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scChange = index.createEvent(this, "scChange", 7);
        this.scClear = index.createEvent(this, "scClear", 7);
        this.scInput = index.createEvent(this, "scInput", 7);
        this.scFocus = index.createEvent(this, "scFocus", 7);
        this.scBlur = index.createEvent(this, "scBlur", 7);
        this.size = 'medium';
        this.value = '';
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
        this.error = undefined;
    }
    async handleChange() {
        this.value = this.input.value;
        this.scChange.emit();
    }
    async reportValidity() {
        var _a, _b;
        return (_b = (_a = this.input) === null || _a === void 0 ? void 0 : _a.reportValidity) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    componentWillLoad() {
        this.handleCheckoutChange();
        this.removeChangeListener = mutations.onChange('checkout', () => this.handleCheckoutChange());
    }
    disconnectedCallback() {
        this.removeChangeListener();
    }
    handleCheckoutChange() {
        var _a, _b, _c, _d, _e, _f;
        // we only want to do this  if we don't have a value.
        if (this === null || this === void 0 ? void 0 : this.value)
            return;
        // if the checkout has a phone, use that.
        if ((_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.phone) {
            this.value = (_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.phone;
            return;
        }
        // if the customer has a phone, use that.
        if ((_d = (_c = mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.customer) === null || _d === void 0 ? void 0 : _d.phone) {
            this.value = (_f = (_e = mutations.state.checkout) === null || _e === void 0 ? void 0 : _e.customer) === null || _f === void 0 ? void 0 : _f.phone;
            return;
        }
    }
    render() {
        return (index.h("sc-phone-input", { key: '89ec8776e62c3ad08e763115f06b5bbe6a87d246', name: "phone", ref: el => (this.input = el), value: this.value, label: this.label, help: this.help, autocomplete: "phone", placeholder: this.placeholder, readonly: this.readonly, required: this.required, invalid: this.invalid, autofocus: this.autofocus, hasFocus: this.hasFocus, onScChange: () => this.handleChange(), onScInput: () => this.scInput.emit(), onScFocus: () => this.scFocus.emit(), onScBlur: () => this.scBlur.emit() }));
    }
};
ScCustomerPhone.style = ScCustomerPhoneStyle0;

const scInvoiceDetailsCss = ":host{display:block}::slotted(*){margin:4px 0 !important}::slotted(sc-divider){margin:16px 0 !important}";
const ScInvoiceDetailsStyle0 = scInvoiceDetailsCss;

const ScInvoiceDetails = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        var _a;
        return (index.h(index.Host, { key: 'b1774fcf95a7780ac4479d44d0814431b07724ef', style: { ...(!((_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.invoice) ? { display: 'none' } : {}) } }, index.h("div", { key: '081242c9b4e67bef899ede149b49cf2fd119f608', class: "invoice-details" }, index.h("slot", { key: '8c2fb522cc464a1a8ebca35686e769e21017bdcb' }))));
    }
};
ScInvoiceDetails.style = ScInvoiceDetailsStyle0;

const scInvoiceMemoCss = ":host{display:block}.invoice-memo{font-size:var(--sc-font-size-small);line-height:var(--sc-line-height-dense);color:var(--sc-input-label-color);display:grid;gap:5px}.invoice-memo__content{text-align:left;color:var(--sc-input-help-text-color)}";
const ScInvoiceMemoStyle0 = scInvoiceMemoCss;

const ScLineItemInvoiceMemo = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.text = undefined;
    }
    render() {
        var _a;
        const checkout = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout;
        const memo = ((_a = checkout === null || checkout === void 0 ? void 0 : checkout.invoice) === null || _a === void 0 ? void 0 : _a.memo) || null;
        // Stop if checkout has no invoice number.
        if (!memo) {
            return null;
        }
        // loading state
        if (getters.formBusy() && !(checkout === null || checkout === void 0 ? void 0 : checkout.invoice)) {
            return (index.h("div", null, index.h("sc-skeleton", { style: { width: '100px' } }), index.h("sc-skeleton", { style: { width: '200px' } })));
        }
        return (index.h("div", { class: "invoice-memo" }, index.h("div", { class: "invoice-memo__title" }, this.text || wp.i18n.__('Memo', 'surecart')), index.h("div", { class: "invoice-memo__content" }, memo)));
    }
};
ScLineItemInvoiceMemo.style = ScInvoiceMemoStyle0;

const scLineItemInvoiceDueDateCss = ":host{display:block}sc-line-item{text-align:left;line-height:var(--sc-line-height-dense);color:var(--sc-input-label-color)}";
const ScLineItemInvoiceDueDateStyle0 = scLineItemInvoiceDueDateCss;

const ScLineItemInvoiceDueDate = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        var _a;
        const checkout = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout;
        const dueDate = ((_a = checkout === null || checkout === void 0 ? void 0 : checkout.invoice) === null || _a === void 0 ? void 0 : _a.due_date_date) || null;
        // Stop if checkout has no invoice due date.
        if (!dueDate) {
            return null;
        }
        // loading state
        if (getters.formBusy() && !(checkout === null || checkout === void 0 ? void 0 : checkout.invoice)) {
            return (index.h("sc-line-item", null, index.h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), index.h("sc-skeleton", { slot: "price", style: { 'width': '50px', 'display': 'inline-block', '--border-radius': '6px' } })));
        }
        return (index.h("sc-line-item", null, index.h("span", { slot: "description" }, index.h("slot", { name: "title" }, wp.i18n.__('Due Date', 'surecart'))), index.h("span", { slot: "price-description" }, dueDate)));
    }
};
ScLineItemInvoiceDueDate.style = ScLineItemInvoiceDueDateStyle0;

const scLineItemInvoiceNumberCss = ":host{display:block}sc-line-item{text-align:left;line-height:var(--sc-line-height-dense);color:var(--sc-input-label-color)}";
const ScLineItemInvoiceNumberStyle0 = scLineItemInvoiceNumberCss;

const ScLineItemInvoiceNumber = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        var _a;
        const checkout = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout;
        const invoiceNumber = ((_a = checkout === null || checkout === void 0 ? void 0 : checkout.invoice) === null || _a === void 0 ? void 0 : _a.order_number) || null;
        // Stop if checkout has no invoice number.
        if (!invoiceNumber) {
            return null;
        }
        // loading state
        if (getters.formBusy() && !(checkout === null || checkout === void 0 ? void 0 : checkout.invoice)) {
            return (index.h("sc-line-item", null, index.h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), index.h("sc-skeleton", { slot: "price", style: { 'width': '50px', 'display': 'inline-block', '--border-radius': '6px' } })));
        }
        return (index.h("sc-line-item", null, index.h("span", { slot: "description" }, index.h("slot", { name: "title" }, wp.i18n.__('Invoice Number', 'surecart'))), index.h("span", { slot: "price-description" }, "#", invoiceNumber)));
    }
};
ScLineItemInvoiceNumber.style = ScLineItemInvoiceNumberStyle0;

const scLineItemInvoiceReceiptDownloadCss = ":host{display:block}sc-line-item{text-align:left;line-height:var(--sc-line-height-dense);color:var(--sc-input-label-color)}.sc-invoice-download-link{display:inline-flex;gap:var(--sc-spacing-x-small);text-decoration:none;color:inherit}";
const ScLineItemInvoiceReceiptDownloadStyle0 = scLineItemInvoiceReceiptDownloadCss;

const ScLineItemInvoiceReceiptDownload = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.checkout = undefined;
    }
    render() {
        var _a;
        const checkout = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout;
        const receiptDownloadLink = ((_a = checkout === null || checkout === void 0 ? void 0 : checkout.invoice) === null || _a === void 0 ? void 0 : _a.id) ? checkout === null || checkout === void 0 ? void 0 : checkout.pdf_url : null;
        // Stop if checkout has no receipt download link.
        if (!receiptDownloadLink) {
            return null;
        }
        // loading state
        if (getters.formBusy() && !(checkout === null || checkout === void 0 ? void 0 : checkout.invoice)) {
            return (index.h("sc-line-item", null, index.h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), index.h("sc-skeleton", { slot: "price", style: { 'width': '50px', 'display': 'inline-block', '--border-radius': '6px' } })));
        }
        return (index.h("sc-line-item", null, index.h("span", { slot: "description" }, index.h("slot", { name: "title" }, wp.i18n.__('Receipt', 'surecart'))), index.h("span", { slot: "price-description" }, index.h("a", { class: "sc-invoice-download-link", href: receiptDownloadLink, target: "_blank", rel: "noopener noreferrer" }, index.h("sc-icon", { name: "download" }), wp.i18n.__('Download', 'surecart')))));
    }
};
ScLineItemInvoiceReceiptDownload.style = ScLineItemInvoiceReceiptDownloadStyle0;

const scLineItemShippingCss = ":host{display:block}";
const ScLineItemShippingStyle0 = scLineItemShippingCss;

const ScLineItemShipping = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.label = undefined;
    }
    renderShippingFees(checkout) {
        var _a, _b, _c, _d;
        if (!((_b = (_a = checkout === null || checkout === void 0 ? void 0 : checkout.shipping_fees) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length)) {
            return null;
        }
        return (index.h(index.Fragment, null, (_d = (_c = checkout === null || checkout === void 0 ? void 0 : checkout.shipping_fees) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.map(fee => (index.h("sc-line-item", { key: fee.id }, index.h("span", { slot: "description" }, fee.description), index.h("span", { slot: "price" }, fee.display_amount))))));
    }
    render() {
        const { checkout } = mutations.state;
        // don't show if no shipping amount if no choice selected
        if (!(checkout === null || checkout === void 0 ? void 0 : checkout.selected_shipping_choice)) {
            return index.h(index.Host, { style: { display: 'none' } });
        }
        if (store.state.formState.value === 'loading') {
            return (index.h("sc-line-item", null, index.h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), index.h("sc-skeleton", { slot: "price", style: { 'width': '70px', 'display': 'inline-block', '--border-radius': '6px' } })));
        }
        return (index.h(index.Fragment, null, index.h("sc-line-item", null, index.h("span", { slot: "description" }, this.label || wp.i18n.__('Shipping', 'surecart')), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.shipping_display_amount)), this.renderShippingFees(checkout)));
    }
};
ScLineItemShipping.style = ScLineItemShippingStyle0;

const scLineItemTaxCss = ":host{display:grid;gap:var(--sc-line-item-tax-gap, var(--sc-form-row-spacing, 0.75em))}";
const ScLineItemTaxStyle0 = scLineItemTaxCss;

const ScLineItemTax = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.order = undefined;
        this.loading = undefined;
    }
    renderLabel(line, showDetail) {
        var _a;
        let label = wp.i18n.sprintf(wp.i18n.__('Estimated %s', 'surecart'), line.label || '');
        if (((_a = this === null || this === void 0 ? void 0 : this.order) === null || _a === void 0 ? void 0 : _a.tax_status) === 'calculated') {
            label = line.label || '';
        }
        return (index.h(index.Fragment, null, `${wp.i18n.__('Tax', 'surecart')} ${label}`, showDetail && ` ${tax.formatTaxLineDetail(line)}`));
    }
    render() {
        var _a;
        const lines = tax.getTaxLines(this.order);
        // hide if tax is 0
        if (!lines.length) {
            return null;
        }
        // tax_behavior is set on the account's tax protocol, so a checkout is
        // either fully inclusive or fully exclusive — never mixed.
        const included = !!((_a = this.order) === null || _a === void 0 ? void 0 : _a.tax_inclusive_amount);
        // Rate/base detail only earns its space when there is more than one row to tell apart.
        const showDetail = lines.length > 1;
        return (index.h(index.Fragment, null, lines.map(line => (index.h("sc-line-item", { key: `${line.label}-${line.rate}` }, index.h("span", { slot: "description" }, this.renderLabel(line, showDetail)), included ? (index.h("span", { slot: "price-description" }, '(', line.display_amount, " ", wp.i18n.__('included', 'surecart'), ')')) : (index.h("span", { slot: "price" }, line.display_amount)))))));
    }
};
consumer.openWormhole(ScLineItemTax, ['order', 'loading'], false);
ScLineItemTax.style = ScLineItemTaxStyle0;

const scLineItemTrialCss = ":host{display:block}";
const ScLineItemTrialStyle0 = scLineItemTrialCss;

const ScLineItemTrial = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.label = undefined;
    }
    render() {
        var _a, _b;
        if (!((_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.trial_amount)) {
            return index.h(index.Host, { style: { display: 'none' } });
        }
        return (index.h("sc-line-item", null, index.h("span", { slot: "description" }, this.label || wp.i18n.__('Trial', 'surecart')), index.h("span", { slot: "price-description" }, (_b = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.trial_display_amount)));
    }
};
ScLineItemTrial.style = ScLineItemTrialStyle0;

const scOrderBillingAddressCss = ":host{display:block}.order-billing-address__toggle{margin-bottom:var(--sc-form-row-spacing, var(--sc-spacing-medium))}";
const ScOrderBillingAddressStyle0 = scOrderBillingAddressCss;

const ScOrderBillingAddress = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.label = undefined;
        this.showName = undefined;
        this.namePlaceholder = wp.i18n.__('Name or Company Name', 'surecart');
        this.defaultCountry = undefined;
        this.toggleLabel = wp.i18n.__('Billing address is same as shipping', 'surecart');
        this.address = {
            country: null,
            city: null,
            line_1: null,
            line_2: null,
            postal_code: null,
            state: null,
        };
    }
    async reportValidity() {
        var _a, _b;
        if (!this.input)
            return true;
        return (_b = (_a = this.input) === null || _a === void 0 ? void 0 : _a.reportValidity) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    prefillAddress() {
        var _a;
        // Autofill is handled by sc-checkout-autofill-provider which patches checkoutState.checkout with any logged-in customer profile data.
        if (index$1.isAddressEmpty(this.address)) {
            this.address = { ...this.address, ...(_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.billing_address };
        }
    }
    componentWillLoad() {
        var _a;
        if (this.defaultCountry && !((_a = this.address) === null || _a === void 0 ? void 0 : _a.country)) {
            this.address.country = this.defaultCountry;
        }
        this.prefillAddress();
        mutations.onChange('checkout', () => this.prefillAddress());
    }
    async updateAddressState(address) {
        var _a, _b;
        if (JSON.stringify(address) === JSON.stringify(this.address))
            return; // no change, don't update.
        this.address = address;
        try {
            mutations$1.lockCheckout('billing-address');
            mutations.state.checkout = (await index$2.createOrUpdateCheckout({
                id: (_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.id,
                data: {
                    billing_matches_shipping: (_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.billing_matches_shipping,
                    billing_address: this.address,
                },
            }));
        }
        catch (e) {
            console.error(e);
        }
        finally {
            mutations$1.unLockCheckout('billing-address');
        }
    }
    async onToggleBillingMatchesShipping(e) {
        mutations.state.checkout = {
            ...mutations.state.checkout,
            billing_matches_shipping: e.target.checked,
        };
    }
    shippingAddressFieldExists() {
        return !!document.querySelector('sc-order-shipping-address');
    }
    render() {
        var _a, _b;
        return (index.h(index.Fragment, { key: '37f6b15d134af61a483bc6a070303d7632c07648' }, this.shippingAddressFieldExists() && (index.h("sc-checkbox", { key: 'bfbd4337f387d66cedcaa51ede1119a98b55ced4', class: "order-billing-address__toggle", onScChange: e => this.onToggleBillingMatchesShipping(e), checked: (_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.billing_matches_shipping }, this.toggleLabel)), (!this.shippingAddressFieldExists() || !((_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.billing_matches_shipping)) && (index.h("sc-address", { key: 'de24a6ed5a31f1f3289548b947518a5b49fc6dd6', exportparts: "label, help-text, form-control, input__base, select__base, columns, search__base, menu__base", ref: el => {
                this.input = el;
            }, label: this.label || wp.i18n.__('Billing Address', 'surecart'), names: {
                name: 'billing_name',
                country: 'billing_country',
                city: 'billing_city',
                line_1: 'billing_line_1',
                line_2: 'billing_line_2',
                postal_code: 'billing_postal_code',
                state: 'billing_state',
            }, required: true, loading: getters.formLoading(), address: this.address, "show-name": this.showName, onScChangeAddress: e => this.updateAddressState(e.detail) }))));
    }
};
ScOrderBillingAddress.style = ScOrderBillingAddressStyle0;

const scOrderBumpCss = ":host {\n  display: block;\n}\n\n:host([data-design=modern]) sc-choice::part(base) {\n  padding: 0;\n  overflow: hidden;\n  border-radius: var(--sc-order-bump-border-radius, 12px);\n  border-color: var(--sc-order-bump-border-color, #e0e0e0) !important;\n  box-shadow: none !important;\n  outline: none !important;\n  cursor: default;\n}\n\n:host([data-design=modern]) sc-choice::part(content) {\n  cursor: default;\n}\n\n:host([data-design=modern]) .bump {\n  display: flex;\n  align-items: center;\n  gap: var(--sc-order-bump-gap, 1em);\n  padding: var(--sc-order-bump-padding, 0.75em 1em 0.75em 0.75em);\n}\n:host([data-design=modern]) .bump__text {\n  display: grid;\n  gap: 5px;\n  flex: 1;\n  min-width: 0;\n}\n:host([data-design=modern]) .bump__title {\n  font-size: var(--sc-order-bump-title-size, 15px);\n  font-weight: 600;\n  line-height: 1.3;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-break: break-word;\n}\n:host([data-design=modern]) .bump__cta {\n  font-size: var(--sc-order-bump-cta-size, 12px);\n  font-weight: 600;\n  line-height: 1.3;\n  display: var(--sc-order-bump-cta-display, -webkit-box);\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-break: break-word;\n}\n:host([data-design=modern]) .bump__tag {\n  display: var(--sc-order-bump-tag-display, inline-block);\n  background: var(--sc-color-primary-500);\n  color: var(--sc-color-white);\n  border-radius: 999px;\n  padding: var(--sc-spacing-x-small);\n  font-size: var(--sc-font-size-x-small);\n}\n:host([data-design=modern]) .bump__description {\n  display: var(--sc-order-bump-description-display, block);\n  font-size: var(--sc-order-bump-description-size, 13px);\n  color: var(--sc-order-bump-description-color, #6b7280);\n  opacity: 0.8;\n  line-height: 1.3;\n  font-weight: normal;\n}\n:host([data-design=modern]) .bump__description p {\n  margin: 0;\n}\n:host([data-design=modern]) .bump__image {\n  width: var(--sc-order-bump-image-size, 72px);\n  height: var(--sc-order-bump-image-size, 72px);\n  flex: 0 0 var(--sc-order-bump-image-size, 72px);\n  object-fit: cover;\n  border-radius: var(--sc-order-bump-image-radius, 8px);\n  border: 1px solid var(--sc-color-gray-200);\n  display: var(--sc-order-bump-image-display, block);\n}\n:host([data-design=modern]) .bump__price--has-discount {\n  display: flex;\n  align-items: baseline;\n  gap: 4px;\n}\n:host([data-design=modern]) .bump__price--has-discount .bump__original-price {\n  text-decoration: line-through;\n  color: var(--sc-color-gray-500);\n  font-size: var(--sc-order-bump-price-size, 14px);\n  font-weight: normal;\n}\n:host([data-design=modern]) .bump__price .bump__new-price {\n  font-size: var(--sc-order-bump-price-size, 14px);\n  font-weight: 500;\n  color: var(--sc-color-gray-700);\n}\n:host([data-design=modern]) .bump__price .bump__interval {\n  color: var(--sc-color-gray-500);\n}\n:host([data-design=modern]) .bump__button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: var(--sc-order-bump-button-radius, 74.6%);\n  border: 1px solid var(--sc-order-bump-button-border-color, #d1d5db);\n  background-color: transparent;\n  color: var(--sc-color-gray-500);\n  flex-shrink: 0;\n  line-height: 1;\n  font-size: var(--sc-order-bump-button-size, 18px);\n  padding: 0.5em;\n  cursor: pointer;\n  transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease;\n}\n:host([data-design=modern]) .bump__button sc-icon {\n  font-size: 1em;\n}\n:host([data-design=modern]) .bump__button--checked {\n  background-color: var(--sc-color-primary-500);\n  border-color: var(--sc-color-primary-500);\n  color: var(--sc-color-white, #fff);\n}\n:host([data-design=modern]) .bump__button--loading {\n  border-color: var(--sc-color-primary-500);\n}\n:host([data-design=modern]) .bump__button--loading sc-spinner {\n  --spinner-size: 1em;\n  --indicator-color: var(--sc-color-gray-500);\n}\n:host([data-design=modern]) .bump__amount {\n  display: var(--sc-order-bump-amount-display, flex);\n  align-items: center;\n  gap: 4px;\n  flex-wrap: wrap;\n}\n\n:host([data-design=classic]) .bump {\n  display: grid;\n  gap: 1em;\n}\n:host([data-design=classic]) .bump__text {\n  display: grid;\n  gap: 0.25em;\n}\n:host([data-design=classic]) .bump__tag {\n  background: var(--sc-color-primary-500);\n  color: var(--sc-color-white);\n  border-radius: var(--sc-input-border-radius-medium);\n  padding: var(--sc-spacing-x-small);\n  font-size: var(--sc-font-size-x-small);\n}\n:host([data-design=classic]) .bump__product {\n  display: flex;\n  align-items: center;\n  gap: var(--sc-choice-padding, 1.3em 1.1em);\n  line-height: var(--sc-line-height-dense);\n}\n:host([data-design=classic]) .bump__product--wrapper {\n  container-type: inline-size;\n}\n@container (max-width: 325px) {\n  :host([data-design=classic]) .bump__product {\n    flex-direction: column;\n    align-items: start;\n  }\n}\n:host([data-design=classic]) .bump__title {\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-break: break-word;\n}\n:host([data-design=classic]) .bump__product-title {\n  font-weight: var(--sc-font-weight-semibold);\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-break: break-word;\n}\n:host([data-design=classic]) .bump__product-description {\n  color: var(--sc-input-label-color);\n}\n:host([data-design=classic]) .bump__image {\n  width: var(--sc-product-line-item-image-size, 4em);\n  height: var(--sc-product-line-item-image-size, 4em);\n  flex: 0 0 var(--sc-product-line-item-image-size, 4em);\n  object-fit: cover;\n  border-radius: 4px;\n  border: 1px solid var(--sc-color-gray-200);\n  display: block;\n  box-shadow: var(--sc-input-box-shadow);\n}\n:host([data-design=classic]) .bump__price--has-discount {\n  display: flex;\n  align-items: baseline;\n  gap: var(--sc-spacing-x-small);\n}\n:host([data-design=classic]) .bump__price--has-discount .bump__original-price {\n  text-decoration: line-through;\n  color: var(--sc-color-gray-500);\n  font-size: var(--sc-font-size-small);\n}\n:host([data-design=classic]) .bump__price .bump__new-price {\n  font-size: var(--sc-font-size-large);\n  color: var(--sc-color-gray-700);\n}\n:host([data-design=classic]) .bump__price .bump__interval {\n  color: var(--sc-color-gray-500);\n}\n:host([data-design=classic]) .bump__amount {\n  display: flex;\n  align-items: center;\n  gap: var(--sc-spacing-x-small);\n  flex-wrap: wrap;\n  margin-top: var(--sc-spacing-xx-small);\n}";
const ScOrderBumpStyle0 = scOrderBumpCss;

const ScOrderBump = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /** Cached design mode */
        this.isModern = true;
        this.bump = undefined;
        this.showControl = undefined;
        this.loading = false;
    }
    /** The bump line item */
    lineItem() {
        var _a, _b, _c;
        return (_c = (_b = (_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.find(item => { var _a; return (item === null || item === void 0 ? void 0 : item.bump) === ((_a = this.bump) === null || _a === void 0 ? void 0 : _a.id); });
    }
    /** Update the line item. */
    async updateLineItem() {
        var _a, _b, _c;
        if (this.loading)
            return;
        const price = ((_a = this.bump.price) === null || _a === void 0 ? void 0 : _a.id) || ((_b = this.bump) === null || _b === void 0 ? void 0 : _b.price);
        const lineItem = this.lineItem();
        this.loading = true;
        try {
            if (lineItem) {
                await mutations$1.removeCheckoutLineItem(lineItem.id);
                index$3.speak(wp.i18n.__('Order bump Removed.', 'surecart'));
            }
            else {
                await mutations$1.addCheckoutLineItem({
                    bump: (_c = this.bump) === null || _c === void 0 ? void 0 : _c.id,
                    price,
                    quantity: 1,
                });
                index$3.speak(wp.i18n.__('Order bump applied.', 'surecart'));
            }
        }
        catch (e) {
            console.error('[sc-order-bump] updateLineItem failed:', e);
            index$3.speak(wp.i18n.__('Something went wrong. Please try again.', 'surecart'));
        }
        finally {
            this.loading = false;
        }
    }
    componentWillLoad() {
        var _a;
        this.isModern = !!((_a = window.scData) === null || _a === void 0 ? void 0 : _a.modern_order_bump);
        this.el.setAttribute('data-design', this.isModern ? 'modern' : 'classic');
    }
    componentDidLoad() {
        var _a;
        mutations$1.trackOrderBump((_a = this.bump) === null || _a === void 0 ? void 0 : _a.id);
    }
    renderInterval() {
        var _a;
        const interval = price.intervalString((_a = this.bump) === null || _a === void 0 ? void 0 : _a.price, { labels: { interval: '/', period: wp.i18n.__('for', 'surecart') } });
        if (!interval.trim().length)
            return null;
        return index.h("span", { class: "bump__interval" }, interval);
    }
    renderDiscount() {
        var _a, _b, _c, _d, _e;
        if (!!((_a = this.bump) === null || _a === void 0 ? void 0 : _a.amount_off)) {
            return (index.h("div", { class: "bump__tag", part: "tag", "aria-label": 
                /** translators: %1$s: amount off, %2$s: currency */
                wp.i18n.sprintf(wp.i18n.__('You save %1$s%2$s.', 'surecart'), (_b = this.bump) === null || _b === void 0 ? void 0 : _b.amount_off, ((_c = this.bump) === null || _c === void 0 ? void 0 : _c.price).currency) }, index.h("span", { "aria-hidden": "true" }, wp.i18n._x('Save', 'Save money', 'surecart'), " ", (_d = this.bump) === null || _d === void 0 ? void 0 :
                _d.amount_off_display_amount)));
        }
        if (!!((_e = this.bump) === null || _e === void 0 ? void 0 : _e.percent_off)) {
            const percent = `${this.bump.percent_off}%`;
            return (index.h("div", { class: "bump__tag", part: "tag", "aria-label": 
                /** translators: %s is the discount percentage (e.g. "10%"). */
                wp.i18n.sprintf(wp.i18n.__('You save %s.', 'surecart'), percent) }, index.h("span", { "aria-hidden": "true" }, wp.i18n.sprintf(
            /** translators: %s is the discount percentage (e.g. "10%"). */
            wp.i18n._x('Save %s', 'Save money', 'surecart'), percent))));
        }
    }
    /** Modern price (no slot) */
    renderModernPrice() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return (index.h("div", { class: { 'bump__price': true, 'bump__price--has-discount': !!((_a = this.bump) === null || _a === void 0 ? void 0 : _a.percent_off) || !!((_b = this.bump) === null || _b === void 0 ? void 0 : _b.amount_off) }, part: "price" }, !!(((_c = this.bump) === null || _c === void 0 ? void 0 : _c.percent_off) || ((_d = this.bump) === null || _d === void 0 ? void 0 : _d.amount_off)) && (index.h("span", { "aria-label": 
            /** translators: %s: old price */
            wp.i18n.sprintf(wp.i18n.__('Originally priced at %s.', 'surecart'), (_e = this.bump) === null || _e === void 0 ? void 0 : _e.subtotal_display_amount), class: "bump__original-price" }, (_f = this.bump) === null || _f === void 0 ? void 0 : _f.subtotal_display_amount)), index.h("span", null, index.h("span", { "aria-hidden": "true" }, ((_g = this.bump) === null || _g === void 0 ? void 0 : _g.total_amount) === 0 && wp.i18n.__('Free', 'surecart'), ((_h = this.bump) === null || _h === void 0 ? void 0 : _h.total_amount) > 0 && index.h("span", { class: "bump__new-price" }, (_j = this.bump) === null || _j === void 0 ? void 0 : _j.total_display_amount), this.renderInterval()))));
    }
    /** Classic price (with slot="description") */
    renderClassicPrice() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return (index.h("div", { slot: "description", class: { 'bump__price': true, 'bump__price--has-discount': !!((_a = this.bump) === null || _a === void 0 ? void 0 : _a.percent_off) || !!((_b = this.bump) === null || _b === void 0 ? void 0 : _b.amount_off) }, part: "price" }, !!(((_c = this.bump) === null || _c === void 0 ? void 0 : _c.percent_off) || ((_d = this.bump) === null || _d === void 0 ? void 0 : _d.amount_off)) && (index.h("span", { "aria-label": 
            /** translators: %s: old price */
            wp.i18n.sprintf(wp.i18n.__('Originally priced at %s.', 'surecart'), (_e = this.bump) === null || _e === void 0 ? void 0 : _e.subtotal_display_amount), class: "bump__original-price" }, (_f = this.bump) === null || _f === void 0 ? void 0 : _f.subtotal_display_amount)), index.h("span", null, index.h("span", { "aria-hidden": "true" }, ((_g = this.bump) === null || _g === void 0 ? void 0 : _g.total_amount) === 0 && wp.i18n.__('Free', 'surecart'), ((_h = this.bump) === null || _h === void 0 ? void 0 : _h.total_amount) > 0 && index.h("span", { class: "bump__new-price" }, (_j = this.bump) === null || _j === void 0 ? void 0 : _j.total_display_amount), this.renderInterval()))));
    }
    /** Modern design: rounded button, inline image, no checkbox */
    renderModern() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const product = (_b = (_a = this.bump) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.product;
        const lineItem = this.lineItem();
        return (index.h("sc-choice", { value: (_c = this.bump) === null || _c === void 0 ? void 0 : _c.id, type: "checkbox", showControl: false, checked: !!lineItem, exportparts: "base:choice__base, content:choice__content" }, index.h("div", { part: "base-content", class: "bump", onClick: e => e.stopPropagation(), onKeyDown: e => {
                if (e.key === 'Enter' || e.key === ' ')
                    e.stopPropagation();
            } }, !!((_d = product === null || product === void 0 ? void 0 : product.line_item_image) === null || _d === void 0 ? void 0 : _d.src) && index.h("img", { ...product === null || product === void 0 ? void 0 : product.line_item_image, class: "bump__image", part: "image" }), index.h("div", { class: "bump__text", part: "text" }, index.h("div", { class: "bump__title", part: "title", "aria-label": wp.i18n.sprintf(
            /* translators: %s: order bump name */
            wp.i18n.__('Product: %s.', 'surecart'), ((_e = this.bump) === null || _e === void 0 ? void 0 : _e.name) || (product === null || product === void 0 ? void 0 : product.name)) }, index.h("span", { "aria-hidden": "true" }, ((_f = this.bump) === null || _f === void 0 ? void 0 : _f.name) || (product === null || product === void 0 ? void 0 : product.name))), !!((_h = (_g = this.bump) === null || _g === void 0 ? void 0 : _g.metadata) === null || _h === void 0 ? void 0 : _h.cta) && (index.h("div", { class: "bump__cta", part: "cta" }, index.h("span", null, (_k = (_j = this.bump) === null || _j === void 0 ? void 0 : _j.metadata) === null || _k === void 0 ? void 0 : _k.cta))), index.h("div", { class: "bump__amount", part: "amount" }, this.renderModernPrice(), this.renderDiscount()), !!((_m = (_l = this.bump) === null || _l === void 0 ? void 0 : _l.metadata) === null || _m === void 0 ? void 0 : _m.description) && (index.h("div", { class: "bump__description", part: "description", "aria-label": wp.i18n.sprintf(
            /* translators: %s: Product description */
            wp.i18n.__('Product description: %s.', 'surecart'), (_o = this.bump) === null || _o === void 0 ? void 0 : _o.rendered_description) }, index.h("span", { "aria-hidden": "true", innerHTML: (_p = this.bump) === null || _p === void 0 ? void 0 : _p.rendered_description })))), index.h("button", { type: "button", class: {
                'bump__button': true,
                'bump__button--checked': !!lineItem,
                'bump__button--loading': this.loading,
            }, part: "button", onClick: () => this.updateLineItem(), "aria-label": lineItem ? wp.i18n.__('Remove from order', 'surecart') : wp.i18n.__('Add to order', 'surecart'), "aria-pressed": !!lineItem, "aria-busy": this.loading }, this.loading ? index.h("sc-spinner", null) : index.h("sc-icon", { name: lineItem ? 'check' : 'plus' })))));
    }
    /** Classic design: checkbox control, footer with divider + image + description */
    renderClassic() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        const product = (_b = (_a = this.bump) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.product;
        return (index.h("sc-choice", { value: (_c = this.bump) === null || _c === void 0 ? void 0 : _c.id, type: "checkbox", showControl: this.showControl, checked: !!this.lineItem(), disabled: this.loading, onClick: e => {
                e.preventDefault();
                e.stopImmediatePropagation();
                this.updateLineItem();
            }, onKeyDown: e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    this.updateLineItem();
                }
            }, exportparts: "base, control, checked-icon, title" }, index.h("div", { part: "base-content", class: "bump" }, index.h("div", { class: "bump__text" }, index.h("div", { class: "bump__title", "aria-label": wp.i18n.sprintf(
            /* translators: %s: order bump name */
            wp.i18n.__('Product: %s.', 'surecart'), ((_e = (_d = this.bump) === null || _d === void 0 ? void 0 : _d.metadata) === null || _e === void 0 ? void 0 : _e.cta) || ((_f = this.bump) === null || _f === void 0 ? void 0 : _f.name) || (product === null || product === void 0 ? void 0 : product.name)) }, index.h("span", { "aria-hidden": "true" }, ((_h = (_g = this.bump) === null || _g === void 0 ? void 0 : _g.metadata) === null || _h === void 0 ? void 0 : _h.cta) || ((_j = this.bump) === null || _j === void 0 ? void 0 : _j.name) || (product === null || product === void 0 ? void 0 : product.name))), index.h("div", { class: "bump__amount" }, this.renderClassicPrice(), this.renderDiscount()))), ((_l = (_k = this.bump) === null || _k === void 0 ? void 0 : _k.metadata) === null || _l === void 0 ? void 0 : _l.description) && (index.h("div", { slot: "footer", class: "bump__product--wrapper" }, index.h("sc-divider", { style: { '--spacing': 'var(--sc-spacing-medium)' } }), index.h("div", { class: "bump__product" }, !!((_m = product === null || product === void 0 ? void 0 : product.line_item_image) === null || _m === void 0 ? void 0 : _m.src) && index.h("img", { ...product === null || product === void 0 ? void 0 : product.line_item_image, class: "bump__image" }), index.h("div", { class: "bump__product-text" }, !!((_p = (_o = this.bump) === null || _o === void 0 ? void 0 : _o.metadata) === null || _p === void 0 ? void 0 : _p.cta) && (index.h("div", { class: "bump__product-title", "aria-hidden": "true" }, this.bump.name || (product === null || product === void 0 ? void 0 : product.name))), !!((_r = (_q = this.bump) === null || _q === void 0 ? void 0 : _q.metadata) === null || _r === void 0 ? void 0 : _r.description) && (index.h("div", { class: "bump__product-description", "aria-label": wp.i18n.sprintf(
            /* translators: %s: Product description */
            wp.i18n.__('Product description: %s.', 'surecart'), (_s = this.bump) === null || _s === void 0 ? void 0 : _s.rendered_description) }, index.h("span", { "aria-hidden": "true", innerHTML: (_t = this.bump) === null || _t === void 0 ? void 0 : _t.rendered_description })))))))));
    }
    render() {
        return this.isModern ? this.renderModern() : this.renderClassic();
    }
    get el() { return index.getElement(this); }
};
ScOrderBump.style = ScOrderBumpStyle0;

const scOrderBumpsCss = ":host{display:block}.bumps__list{display:grid;gap:10px}";
const ScOrderBumpsStyle0 = scOrderBumpsCss;

const ScOrderBumps = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.label = undefined;
        this.help = undefined;
        this.showControl = undefined;
        this.hideAddedItems = undefined;
    }
    /** Check if a bump is already added as a line item. */
    isBumpAdded(bumpId) {
        var _a, _b;
        return (((_b = (_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) || []).some(item => (item === null || item === void 0 ? void 0 : item.bump) === bumpId);
    }
    render() {
        var _a, _b;
        const bumps = (((_b = (_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.recommended_bumps) === null || _b === void 0 ? void 0 : _b.data) || []).filter(bump => {
            var _a, _b, _c, _d;
            // exclude variants for now.
            if (((_d = (_c = (_b = (_a = bump === null || bump === void 0 ? void 0 : bump.price) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.variants) === null || _c === void 0 ? void 0 : _c.pagination) === null || _d === void 0 ? void 0 : _d.count) !== 0) {
                return false;
            }
            // optionally exclude bumps already added to the checkout.
            if (this.hideAddedItems && this.isBumpAdded(bump === null || bump === void 0 ? void 0 : bump.id)) {
                return false;
            }
            return true;
        });
        if (!(bumps === null || bumps === void 0 ? void 0 : bumps.length)) {
            return null;
        }
        return (index.h("sc-form-control", { label: this.label || wp.i18n.__('Recommended', 'surecart'), help: this.help }, index.h("div", { class: "bumps__list", "aria-label": wp.i18n.__('Order bump summary', 'surecart') }, bumps.map(bump => (index.h("sc-order-bump", { key: bump === null || bump === void 0 ? void 0 : bump.id, bump: bump, showControl: this.showControl, exportparts: "choice__base, choice__content, base-content, image, text, title, cta, amount, price, tag, description, button, base, control, checked-icon" }))))));
    }
};
ScOrderBumps.style = ScOrderBumpsStyle0;

const scOrderShippingAddressCss = ":host{display:block}.sc-order-shipping__loading{display:flex;flex-direction:column;gap:0.5em}";
const ScOrderShippingAddressStyle0 = scOrderShippingAddressCss;

const ScOrderShippingAddress = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /** Names for the address */
        this.names = {
            name: 'shipping_name',
            country: 'shipping_country',
            city: 'shipping_city',
            line_1: 'shipping_line_1',
            line_2: 'shipping_line_2',
            postal_code: 'shipping_postal_code',
            state: 'shipping_state',
        };
        this.label = undefined;
        this.required = false;
        this.full = undefined;
        this.showName = undefined;
        this.defaultCountry = undefined;
        this.showLine2 = undefined;
        this.requireName = false;
        this.address = {
            country: null,
            city: null,
            line_1: null,
            line_2: null,
            postal_code: null,
            state: null,
        };
    }
    async updateAddressState(address) {
        var _a;
        if (JSON.stringify(address) === JSON.stringify(this.address))
            return; // no change, don't update.
        this.address = address;
        try {
            mutations$1.lockCheckout('shipping-address');
            mutations.state.checkout = (await index$2.createOrUpdateCheckout({
                id: (_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.id,
                data: {
                    shipping_address: this.address,
                },
            }));
        }
        catch (e) {
            console.error(e);
        }
        finally {
            mutations$1.unLockCheckout('shipping-address');
        }
    }
    async reportValidity() {
        var _a, _b;
        if (!this.input)
            return true;
        return (_b = (_a = this.input) === null || _a === void 0 ? void 0 : _a.reportValidity) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    prefillAddress() {
        var _a;
        // Autofill is handled by sc-checkout-autofill-provider which patches checkoutState.checkout with any logged-in customer profile data.
        if (index$1.isAddressEmpty(this.address)) {
            this.address = { ...this.address, ...(_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.shipping_address };
        }
    }
    componentWillLoad() {
        var _a;
        if (this.defaultCountry && !((_a = this.address) === null || _a === void 0 ? void 0 : _a.country)) {
            this.address.country = this.defaultCountry;
        }
        this.prefillAddress();
        mutations.onChange('checkout', () => this.prefillAddress());
    }
    render() {
        // use full if checkout requires it, it's set, or we're showing/requiring name field.
        if (getters$1.fullShippingAddressRequired() || this.full || this.requireName || this.showName) {
            return (index.h("sc-address", { exportparts: "label, help-text, form-control, input__base, select__base, columns, search__base, menu__base", ref: el => (this.input = el), label: this.label || wp.i18n.__('Shipping Address', 'surecart'), names: this.names, required: this.required || getters$1.shippingAddressRequired(), loading: getters.formLoading(), address: this.address, "show-name": this.showName, "require-name": this.requireName, "show-line-2": this.showLine2, onScChangeAddress: e => this.updateAddressState(e.detail) }));
        }
        return (index.h("sc-compact-address", { ref: el => (this.input = el), required: this.required || getters$1.shippingAddressRequired(), loading: getters.formLoading(), address: this.address, names: this.names, label: this.label, onScChangeAddress: e => this.updateAddressState(e.detail) }));
    }
};
ScOrderShippingAddress.style = ScOrderShippingAddressStyle0;

const scOrderTaxIdInputCss = ":host{display:block}";
const ScOrderTaxIdInputStyle0 = scOrderTaxIdInputCss;

const ScOrderTaxIdInput = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.show = false;
        this.otherLabel = undefined;
        this.caGstLabel = undefined;
        this.auAbnLabel = undefined;
        this.gbVatLabel = undefined;
        this.euVatLabel = undefined;
        this.helpText = undefined;
        this.taxIdTypes = undefined;
        this.required = false;
        this.taxIdTypesData = [];
    }
    handleTaxIdTypesChange() {
        this.taxIdTypesData = typeof this.taxIdTypes === 'string' ? JSON.parse(this.taxIdTypes) : this.taxIdTypes;
    }
    async reportValidity() {
        return this.input.reportValidity();
    }
    getStatus() {
        var _a, _b, _c, _d, _e;
        if (((_b = (_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.tax_identifier) === null || _b === void 0 ? void 0 : _b.number_type) !== 'eu_vat') {
            return 'unknown';
        }
        if (((_c = mutations.state.taxProtocol) === null || _c === void 0 ? void 0 : _c.eu_vat_unverified_behavior) === 'apply_reverse_charge') {
            return 'unknown';
        }
        return ((_e = (_d = mutations.state.checkout) === null || _d === void 0 ? void 0 : _d.tax_identifier) === null || _e === void 0 ? void 0 : _e.eu_vat_verified) ? 'valid' : 'invalid';
    }
    async updateOrder(tax_identifier) {
        try {
            mutations.updateFormState('FETCH');
            mutations.state.checkout = (await index$2.createOrUpdateCheckout({
                id: mutations.state.checkout.id,
                data: { tax_identifier },
            }));
            mutations.updateFormState('RESOLVE');
        }
        catch (e) {
            console.error(e);
            mutations$2.createErrorNotice(e);
            mutations.updateFormState('REJECT');
        }
    }
    componentWillLoad() {
        this.handleTaxIdTypesChange();
    }
    isRequired() {
        var _a, _b, _c, _d;
        // If the block has explicitly set required, use that value.
        if (this.required) {
            return true;
        }
        // Only apply EU VAT requirement if eu_vat is one of the allowed tax types.
        // If taxIdTypesData is empty, all types are allowed.
        const isEuVatAllowed = !((_a = this.taxIdTypesData) === null || _a === void 0 ? void 0 : _a.length) || this.taxIdTypesData.includes('eu_vat');
        // Fall back to EU VAT protocol requirement only if EU VAT is an allowed type.
        return isEuVatAllowed && ((_b = mutations.state.taxProtocol) === null || _b === void 0 ? void 0 : _b.eu_vat_required) && ((_d = (_c = mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.tax_identifier) === null || _d === void 0 ? void 0 : _d.number_type) === 'eu_vat';
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        return (index.h("sc-tax-id-input", { key: '9e3b5eafbcf54e305f9e191ce5a52d4627a0c3b8', ref: el => (this.input = el), show: this.show, number: (_b = (_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.tax_identifier) === null || _b === void 0 ? void 0 : _b.number, type: ((_d = (_c = mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.tax_identifier) === null || _d === void 0 ? void 0 : _d.number_type) || ((_e = this.taxIdTypesData) === null || _e === void 0 ? void 0 : _e[0]) || 'eu_vat', country: (_g = (_f = mutations.state.checkout) === null || _f === void 0 ? void 0 : _f.shipping_address) === null || _g === void 0 ? void 0 : _g.country, status: this.getStatus(), loading: getters.formBusy(), onScChange: e => {
                e.stopImmediatePropagation();
                this.updateOrder(e.detail);
            }, otherLabel: this.otherLabel, caGstLabel: this.caGstLabel, auAbnLabel: this.auAbnLabel, gbVatLabel: this.gbVatLabel, euVatLabel: this.euVatLabel, help: this.helpText, taxIdTypes: this.taxIdTypesData, required: this.isRequired() }));
    }
    static get watchers() { return {
        "taxIdTypes": ["handleTaxIdTypesChange"]
    }; }
};
ScOrderTaxIdInput.style = ScOrderTaxIdInputStyle0;

const scRadioCss = ":host{display:inline-block}::slotted([slot=description]){display:block;color:var(--sc-radio-description-color, var(--sc-input-help-text-color, var(--sc-color-gray-500)));line-height:var(--sc-line-height-dense);margin:0.5em 0 0;font-size:var(--sc-font-size-small)}.radio{display:inline-flex;align-items:flex-start;font-family:var(--sc-input-font-family);font-size:var(--sc-input-font-size-medium);font-weight:var(--sc-input-font-weight);color:var(--sc-input-color);vertical-align:middle;gap:var(--sc-spacing-xx-small)}.radio:not(.radio--editing){cursor:pointer}.radio__icon{display:inline-flex;width:var(--sc-radio-size);height:var(--sc-radio-size)}.radio__icon svg{width:100%;height:100%}.radio__control{flex:0 0 auto;position:relative;display:inline-flex;align-items:center;justify-content:center;width:var(--sc-radio-size);height:var(--sc-radio-size);border:solid var(--sc-input-border-width) var(--sc-input-border-color);border-radius:50%;background-color:var(--sc-input-background-color);color:transparent;transition:var(--sc-input-transition, var(--sc-transition-medium)) border-color, var(--sc-input-transition, var(--sc-transition-medium)) opacity, var(--sc-input-transition, var(--sc-transition-medium)) background-color, var(--sc-input-transition, var(--sc-transition-medium)) color, var(--sc-input-transition, var(--sc-transition-medium)) box-shadow}.radio__control input[type=radio]{position:absolute;opacity:0;padding:0;margin:0;pointer-events:none}.radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover{border-color:var(--sc-input-border-color-hover);background-color:var(--sc-input-background-color-hover)}.radio.radio--focused:not(.radio--checked):not(.radio--disabled) .radio__control{border-color:var(--sc-input-border-color-focus);background-color:var(--sc-input-background-color-focus);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary)}.radio--checked .radio__control{color:var(--var-sc-checked-radio-background-color, var(--sc-input-background-color));border-color:var(--sc-color-primary-500);background-color:var(--sc-color-primary-500)}.radio.radio--checked:not(.radio--disabled) .radio__control:hover{opacity:0.8}.radio.radio--checked:not(.radio--disabled).radio--focused .radio__control{border-color:var(--var-sc-checked-radio-border-color, var(--sc-input-background-color));background-color:var(--sc-color-primary-500);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary)}.radio--disabled{opacity:0.5;cursor:not-allowed}.radio:not(.radio--checked) svg circle{opacity:0}.radio__label{line-height:var(--sc-radio-size);margin-left:0.5em;user-select:none}";
const ScRadioStyle0 = scRadioCss;

let id = 0;
const ScRadio = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scBlur = index.createEvent(this, "scBlur", 7);
        this.scChange = index.createEvent(this, "scChange", 7);
        this.scFocus = index.createEvent(this, "scFocus", 7);
        this.inputId = `radio-${++id}`;
        this.labelId = `radio-label-${id}`;
        this.hasFocus = false;
        this.name = undefined;
        this.value = undefined;
        this.disabled = false;
        this.checked = false;
        this.required = false;
        this.invalid = false;
        this.edit = undefined;
    }
    /** Simulates a click on the radio. */
    async ceClick() {
        this.input.click();
    }
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    async reportValidity() {
        this.invalid = !this.input.checkValidity();
        return this.input.reportValidity();
    }
    handleCheckedChange() {
        if (!this.input)
            return;
        if (this.checked) {
            this.getSiblingRadios().map(radio => (radio.checked = false));
        }
        this.input.checked = this.checked;
        this.scChange.emit();
    }
    handleClick() {
        this.checked = true;
    }
    handleBlur() {
        this.hasFocus = false;
        this.scBlur.emit();
    }
    handleFocus() {
        this.hasFocus = true;
        this.scFocus.emit();
    }
    /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
    setCustomValidity(message) {
        this.input.setCustomValidity(message);
        this.invalid = !this.input.checkValidity();
    }
    getAllRadios() {
        const radioGroup = this.el.closest('sc-radio-group');
        // Radios must be part of a radio group
        if (!radioGroup) {
            return [];
        }
        return [...radioGroup.querySelectorAll('sc-radio')];
    }
    getSiblingRadios() {
        return this.getAllRadios().filter(radio => radio !== this.el);
    }
    handleKeyDown(event) {
        if (this.edit)
            return true;
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            const radios = this.getAllRadios().filter(radio => !radio.disabled);
            const incr = ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
            let index = radios.indexOf(this.el) + incr;
            if (index < 0)
                index = radios.length - 1;
            if (index > radios.length - 1)
                index = 0;
            this.getAllRadios().map(radio => (radio.checked = false));
            radios[index].focus();
            radios[index].checked = true;
            event.preventDefault();
        }
    }
    // Prevent clicks on the label from briefly blurring the input
    handleMouseDown(event) {
        if (this.edit)
            return true;
        event.preventDefault();
        this.input.focus();
    }
    componentDidLoad() {
        this.formController = new formData.FormSubmitController(this.el, {
            value: (control) => (control.checked ? control.value : undefined),
        }).addFormData();
    }
    disconnectedCallback() {
        var _a;
        (_a = this.formController) === null || _a === void 0 ? void 0 : _a.removeFormData();
    }
    render() {
        const Tag = this.edit ? 'div' : 'label';
        return (index.h(Tag, { key: '00caba920cd089427e495120ba70c0a62e469813', part: "base", class: {
                'radio': true,
                'radio--checked': this.checked,
                'radio--disabled': this.disabled,
                'radio--focused': this.hasFocus,
                'radio--editing': this.edit,
            }, htmlFor: this.inputId, onKeyDown: e => this.handleKeyDown(e), onMouseDown: e => this.handleMouseDown(e) }, index.h("span", { key: '054e9275cbbe6bce0a94212d9522689757f19135', part: "control", class: "radio__control" }, index.h("span", { key: '6ac77710897c5b7cfd2d5dfc9d45e8c4d6623505', part: "checked-icon", class: "radio__icon" }, index.h("svg", { key: '47a187f075abdabf78f203b5256471f8526497a5', viewBox: "0 0 16 16" }, index.h("g", { key: '49f7491b59cd6de1a128139edcfac1be77e6cd68', stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, index.h("g", { key: 'b43a06e747969f7142dd5f31081d9849d0b0fe4c', fill: "currentColor" }, index.h("circle", { key: '91ea172fdbd967689ccbbca0efadfe37ad1b1cb3', cx: "8", cy: "8", r: "3.42857143" }))))), index.h("input", { key: 'e467041ee0398d1431d0cf97f12bc5329118083e', id: this.inputId, ref: el => (this.input = el), type: "radio", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, required: this.required, "aria-checked": this.checked ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : 'false', "aria-labelledby": this.labelId, onClick: () => this.handleClick(), onBlur: () => this.handleBlur(), onFocus: () => this.handleFocus() })), index.h("span", { key: '341241d41fd9feca69d2d9a42a79a36b56e6b70c', part: "label", id: this.labelId, class: "radio__label" }, index.h("slot", { key: '3e2dfa2f8e0089f2b2fbb08e5824d622e99ef7ac' }), index.h("slot", { key: 'f4b862acf1e10d2b73f33e064d4700137cc7b72e', name: "description" }))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "checked": ["handleCheckedChange"]
    }; }
};
ScRadio.style = ScRadioStyle0;

const scRadioGroupCss = ":host{display:block}.radio-group{border:none;padding:0;margin:0;min-width:0}.radio-group .radio-group__label{display:inline-block;padding:0;color:var(--sc-input-label-color);font-weight:var(--sc-input-label-font-weight);text-transform:var(--sc-input-label-text-transform, none);letter-spacing:var(--sc-input-label-letter-spacing, 0);margin-bottom:var(--sc-input-label-margin)}.radio-group__hidden-input{position:absolute;opacity:0;padding:0px;margin:0px;pointer-events:none}.radio-group--is-required .radio-group__label:after{content:\" *\";color:var(--sc-color-danger-500)}::slotted(sc-radio:not(:last-of-type)){display:block;margin-bottom:var(--sc-spacing-x-small)}.radio-group--is-rtl.radio-group,.radio-group--is-rtl.radio-group .radio-group__label{text-align:right}";
const ScRadioGroupStyle0 = scRadioGroupCss;

const ScRadioGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scChange = index.createEvent(this, "scChange", 7);
        this.label = '';
        this.invalid = undefined;
        this.value = '';
        this.required = undefined;
    }
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    async reportValidity() {
        this.invalid = !this.input.checkValidity();
        return this.input.reportValidity();
    }
    handleRadioClick(event) {
        if (event.target.tagName !== 'SC-RADIO')
            return;
        event.stopImmediatePropagation();
        const target = event.target;
        if (target.disabled) {
            return;
        }
        if (target.checked) {
            this.value = target.value;
            this.scChange.emit(target.value);
        }
    }
    componentDidLoad() {
        const choices = [...this.el.querySelectorAll('sc-radio')];
        choices.forEach(choice => {
            if (choice.checked) {
                this.value = choice.value;
            }
        });
    }
    render() {
        return (index.h("fieldset", { key: 'd8f2dd01e738822b523e7dc141d00eda92389967', part: "base", class: {
                'radio-group': true,
                'radio-group--invalid': this.invalid,
                'radio-group--is-required': this.required,
                'radio-group--is-rtl': pageAlign.isRtl(),
            }, "aria-invalid": this.invalid, role: "radiogroup" }, index.h("legend", { key: 'bda5b72f99aa38df359bf237eb00c0a9f6641eaa', part: "label", class: "radio-group__label" }, index.h("slot", { key: '4064d537f21d50d925ee01d7e5298e055e8915ef', name: "label" }, this.label)), index.h("input", { key: 'f0dc0574dd46ab61ebfae9394566526d4edd232c', type: "text", class: "radio-group__hidden-input", ref: el => (this.input = el), required: this.required, value: this.value, tabindex: "-1" }), index.h("div", { key: '33f19b1d86fed93069cde9636c9702269e84801d', part: "items", class: "radio-group__items" }, index.h("slot", { key: 'd1bb8ba651470514d049ef94e3cb9065c38a4bdd' }))));
    }
    get el() { return index.getElement(this); }
};
ScRadioGroup.style = ScRadioGroupStyle0;

const scShippingChoicesCss = ":host{display:block}.shipping-choice{width:100%;padding:var(--sc-spacing-medium);margin:0;box-sizing:border-box;border-bottom:var(--sc-input-border, 1px solid var(--sc-color-gray-300));background-color:var(--sc-shipping-choice-background-color, var(--sc-input-background-color))}.shipping-choice__empty{background:var(--sc-alert-background-color, var(--sc-color-gray-100));opacity:0.75;padding:var(--sc-spacing-large);border-radius:var(--sc-input-border-radius-medium);line-height:var(--sc-line-height-dense);font-size:var(--sc-font-size-small);border:solid 1px var(--sc-input-border-color, var(--sc-input-border))}.shipping-choice:last-child{border-bottom-width:0}.shipping-choice__text{display:flex;flex-direction:column;gap:var(--sc-spacing-xx-small)}.shipping-choice__price{color:var(--sc-input-label-color);font-weight:var(--sc-price-choice-price-font-weight, var(--sc-font-weight-normal));white-space:nowrap;display:var(--sc-shipping-choice-price-display, inherit)}.shipping-choice__name{display:inline-block;color:var(--sc-price-choice-name-color, var(--sc-input-label-color));font-size:var(--sc-price-choice-name-size, var(--sc-input-label-font-size-medium));font-weight:var(--sc-price-choice-name-font-weight, var(--sc-font-weight-bold));text-transform:var(--sc-price-choice-text-transform, var(--sc-input-label-text-transform, none));line-height:var(--sc-shipping-name-line-height, 1)}.shipping-choice__description{color:var(--sc-input-label-color);font-weight:var(--sc-price-choice-price-font-weight, var(--sc-font-weight-normal));line-height:var(--sc-shipping-description-line-height, 1.2)}sc-radio-group::part(items){border:var(--sc-input-border, 1px solid var(--sc-color-gray-300));border-radius:var(--sc-shipping-choice-border-radius, var(--sc-input-border-radius-medium));box-shadow:var(--sc-shipping-box-shadow, var(--sc-input-box-shadow));overflow:hidden;position:relative}sc-radio::part(base){width:100%}sc-radio::part(label){width:100%;display:flex;justify-content:space-between;gap:var(--sc-spacing-small)}sc-radio-group::slotted(sc-radio:not(:last-of-type)){margin-bottom:0}";
const ScShippingChoicesStyle0 = scShippingChoicesCss;

const ScShippingChoices = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.label = undefined;
        this.showDescription = true;
        this.shippingChoices = undefined;
    }
    /** Maybe update the order. */
    async updateCheckout(selectedShippingChoiceId) {
        if (!selectedShippingChoiceId)
            return;
        try {
            mutations$1.lockCheckout('selected_shipping_choice');
            mutations.state.checkout = (await index$2.createOrUpdateCheckout({
                id: mutations.state.checkout.id,
                data: {
                    selected_shipping_choice_id: selectedShippingChoiceId,
                },
            }));
            index$3.speak(wp.i18n.__('Shipping choice updated.', 'surecart'), 'assertive');
            const { total_amount, currency } = mutations.state.checkout;
            /** translators: %1$s: formatted amount */
            index$3.speak(wp.i18n.sprintf(wp.i18n.__('Your order total has changed to: %1$s.', 'surecart'), price.getFormattedPrice({ amount: total_amount, currency })), 'assertive');
        }
        catch (e) {
            console.error(e);
            mutations$2.createErrorNotice(e);
        }
        finally {
            mutations$1.unLockCheckout('selected_shipping_choice');
        }
    }
    render() {
        var _a, _b, _c, _d, _e;
        const choices = this.shippingChoices || ((_b = (_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.shipping_choices) === null || _b === void 0 ? void 0 : _b.data);
        // When not using prop override, apply checkout state guards.
        if (!this.shippingChoices) {
            // shipping choice is not required.
            if (!((_c = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.selected_shipping_choice_required)) {
                return index.h(index.Host, { style: { display: 'none' } });
            }
            // no shipping choices but no country either
            if (!(choices === null || choices === void 0 ? void 0 : choices.length) && !((_e = (_d = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _d === void 0 ? void 0 : _d.shipping_address) === null || _e === void 0 ? void 0 : _e.country)) {
                return (index.h("sc-form-control", { label: this.label || wp.i18n.__('Shipping', 'surecart') }, index.h("div", { class: "shipping-choice__empty" }, wp.i18n.__('To check available shipping choices, please provide your shipping country in the address section.', 'surecart'))));
            }
            // no shipping choices yet.
            if (!(choices === null || choices === void 0 ? void 0 : choices.length)) {
                return (index.h("sc-form-control", { part: "empty", label: this.label || wp.i18n.__('Shipping', 'surecart') }, index.h("div", { class: "shipping-choice__empty" }, wp.i18n.__('Sorry, we are not able to ship to your address.', 'surecart'))));
            }
        }
        return (index.h(index.Host, null, index.h("sc-radio-group", { part: "base", label: this.label || wp.i18n.__('Shipping', 'surecart'), class: "shipping-choices", onScChange: e => this.updateCheckout(e.detail) }, (choices || []).map(({ id, display_amount, shipping_method }) => {
            var _a;
            return (index.h("sc-radio", { key: id, checked: ((_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.selected_shipping_choice) === id, exportparts: "base:radio__base,label:radio__label,control:radio__control,checked-icon:radio__checked-icon", class: "shipping-choice", value: id }, index.h("div", { class: "shipping-choice__text" }, index.h("div", { class: "shipping-choice__name" }, (shipping_method === null || shipping_method === void 0 ? void 0 : shipping_method.name) || wp.i18n.__('Standard Shipping', 'surecart')), this.showDescription && !!(shipping_method === null || shipping_method === void 0 ? void 0 : shipping_method.description) && (index.h("div", { class: "shipping-choice__description" }, shipping_method === null || shipping_method === void 0 ? void 0 : shipping_method.description))), index.h("div", { class: "shipping-choice__price" }, !!display_amount ? display_amount : wp.i18n.__('Free', 'surecart'))));
        })), getters$1.checkoutIsLocked('selected_shipping_choice') && index.h("sc-block-ui", null)));
    }
};
ScShippingChoices.style = ScShippingChoicesStyle0;

exports.sc_compact_address = ScCompactAddress;
exports.sc_customer_phone = ScCustomerPhone;
exports.sc_invoice_details = ScInvoiceDetails;
exports.sc_invoice_memo = ScLineItemInvoiceMemo;
exports.sc_line_item_invoice_due_date = ScLineItemInvoiceDueDate;
exports.sc_line_item_invoice_number = ScLineItemInvoiceNumber;
exports.sc_line_item_invoice_receipt_download = ScLineItemInvoiceReceiptDownload;
exports.sc_line_item_shipping = ScLineItemShipping;
exports.sc_line_item_tax = ScLineItemTax;
exports.sc_line_item_trial = ScLineItemTrial;
exports.sc_order_billing_address = ScOrderBillingAddress;
exports.sc_order_bump = ScOrderBump;
exports.sc_order_bumps = ScOrderBumps;
exports.sc_order_shipping_address = ScOrderShippingAddress;
exports.sc_order_tax_id_input = ScOrderTaxIdInput;
exports.sc_radio = ScRadio;
exports.sc_radio_group = ScRadioGroup;
exports.sc_shipping_choices = ScShippingChoices;

//# sourceMappingURL=sc-compact-address_18.cjs.entry.js.map