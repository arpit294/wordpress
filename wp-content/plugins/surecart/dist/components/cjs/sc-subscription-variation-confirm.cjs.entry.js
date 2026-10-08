'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const util = require('./util-a15c420c.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');

const scSubscriptionVariationConfirmCss = ":host{display:block}.sc-product-variation-choice-wrap{display:flex;flex-direction:column;gap:var(--sc-variation-gap, 12px)}";
const ScSubscriptionVariationConfirmStyle0 = scSubscriptionVariationConfirmCss;

const ScSubscriptionVariationConfirm = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.heading = undefined;
        this.product = undefined;
        this.price = undefined;
        this.subscription = undefined;
        this.busy = false;
        this.variantValues = [];
        // Bind the submit function to the component instance
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillLoad() {
        var _a;
        this.variantValues = (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.variant_options;
    }
    async handleSubmit() {
        var _a, _b, _c, _d;
        this.busy = true;
        const selectedVariant = util.getVariantFromValues({ variants: (_b = (_a = this.product) === null || _a === void 0 ? void 0 : _a.variants) === null || _b === void 0 ? void 0 : _b.data, values: this.variantValues });
        // confirm ad_hoc amount.
        if ((_c = this.price) === null || _c === void 0 ? void 0 : _c.ad_hoc) {
            return window.location.assign(addQueryArgs.addQueryArgs(window.location.href, {
                action: 'confirm_amount',
                price_id: (_d = this.price) === null || _d === void 0 ? void 0 : _d.id,
                variant: selectedVariant === null || selectedVariant === void 0 ? void 0 : selectedVariant.id,
            }));
        }
        return window.location.assign(addQueryArgs.addQueryArgs(window.location.href, {
            action: 'confirm',
            variant: selectedVariant === null || selectedVariant === void 0 ? void 0 : selectedVariant.id,
        }));
    }
    buttonText() {
        var _a, _b, _c, _d;
        if ((_a = this.price) === null || _a === void 0 ? void 0 : _a.ad_hoc) {
            if (((_b = this.price) === null || _b === void 0 ? void 0 : _b.id) === ((_d = (_c = this.subscription) === null || _c === void 0 ? void 0 : _c.price) === null || _d === void 0 ? void 0 : _d.id)) {
                return wp.i18n.__('Update Amount', 'surecart');
            }
            return wp.i18n.__('Choose Amount', 'surecart');
        }
        return wp.i18n.__('Next', 'surecart');
    }
    render() {
        var _a, _b;
        return (index.h("sc-dashboard-module", { key: '3a7348a9e1329a66218e2d9c92b1c5a980f7dc17', heading: this.heading || wp.i18n.__('Enter An Amount', 'surecart'), class: "subscription-switch" }, index.h("sc-card", { key: '7229bcea7aebeb238a186a074126a3819c44f6a3' }, index.h("sc-form", { key: 'f1e7048e2afcbe43fc073192014f450073c96b66', onScSubmit: this.handleSubmit }, index.h("div", { key: '831048c72f672fa09e97df8b85f72abf7f88e982', class: "sc-product-variation-choice-wrap" }, (((_b = (_a = this.product) === null || _a === void 0 ? void 0 : _a.variant_options) === null || _b === void 0 ? void 0 : _b.data) || []).map(({ name, values, id }, index$1) => {
            var _a, _b;
            return (index.h("sc-select", { exportparts: "base:select__base, input, form-control, label, help-text, trigger, panel, caret, menu__base, spinner__base, empty", part: "name__input", value: ((_b = (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.variant_options) === null || _b === void 0 ? void 0 : _b[index$1]) || '', onScChange: (e) => {
                    this.variantValues[index$1] = e.detail.value;
                }, label: name, choices: values === null || values === void 0 ? void 0 : values.map(label => ({
                    label,
                    value: label,
                })), unselect: false, key: id }));
        })), index.h("sc-button", { key: 'f590dc418eaabcec0424796b4eff6274037decc3', type: "primary", full: true, submit: true, loading: this.busy }, this.buttonText(), " ", index.h("sc-icon", { key: '4e9c229aff638fa7b7cb3f44ac2d8b4a6dbf969a', name: "arrow-right", slot: "suffix" })))), this.busy && index.h("sc-block-ui", { key: '730c9f899c43a551dc81b27d9c6c2afccc3cfe3a', style: { zIndex: '9' } })));
    }
};
ScSubscriptionVariationConfirm.style = ScSubscriptionVariationConfirmStyle0;

exports.sc_subscription_variation_confirm = ScSubscriptionVariationConfirm;

//# sourceMappingURL=sc-subscription-variation-confirm.cjs.entry.js.map