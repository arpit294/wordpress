'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const price = require('./price-9dddd853.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
require('./currency-b438c76d.js');

const scSubscriptionAdHocConfirmCss = ":host{display:block}";
const ScSubscriptionAdHocConfirmStyle0 = scSubscriptionAdHocConfirmCss;

const ScSubscriptionAdHocConfirm = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.heading = undefined;
        this.price = undefined;
        this.currencyCode = undefined;
        this.busy = false;
    }
    async handleSubmit(e) {
        const { ad_hoc_amount } = await e.target.getFormJson();
        this.busy = true;
        return window.location.assign(addQueryArgs.addQueryArgs(window.location.href, {
            action: 'confirm',
            ad_hoc_amount,
        }));
    }
    render() {
        return (index.h("sc-dashboard-module", { key: 'c91541886d66ddeb53a23f0dcf19ed2118ee56ac', heading: this.heading || wp.i18n.__('Enter An Amount', 'surecart'), class: "subscription-switch" }, index.h("sc-card", { key: '85ab84b8f2e6ea262a9eae375a47e18b6b2aa201' }, index.h("sc-form", { key: '749b49cd84a6ff8b6782f2e7f05df2bd20bd63f9', onScSubmit: e => this.handleSubmit(e) }, index.h("sc-price-input", { key: 'c4e7d7038c1d1ba5c20806d2578f591188d77957', label: "Amount", name: "ad_hoc_amount", currencyCode: this.currencyCode, autofocus: true, required: true }, index.h("span", { key: 'ba9de40eefaad5db6a55af8009cae12feb2d1583', slot: "suffix", style: { opacity: '0.75' } }, price.intervalString(this.price))), index.h("sc-button", { key: '7b7ad7fd472b8c6da4768ef7cfdd0c9300be271b', type: "primary", full: true, submit: true, loading: this.busy }, wp.i18n.__('Next', 'surecart'), " ", index.h("sc-icon", { key: '42e168926d1c569914d4a355c0cf0c79d8c76f89', name: "arrow-right", slot: "suffix" })))), this.busy && index.h("sc-block-ui", { key: 'c5046a131b1a1cdf285690a211d744d8b0eae872', style: { zIndex: '9' } })));
    }
};
ScSubscriptionAdHocConfirm.style = ScSubscriptionAdHocConfirmStyle0;

exports.sc_subscription_ad_hoc_confirm = ScSubscriptionAdHocConfirm;

//# sourceMappingURL=sc-subscription-ad-hoc-confirm.cjs.entry.js.map