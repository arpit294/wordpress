import { r as registerInstance, h } from './index-25e5af33.js';
import { i as intervalString } from './price-39d60d32.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import './currency-eb33deae.js';

const scSubscriptionAdHocConfirmCss = ":host{display:block}";
const ScSubscriptionAdHocConfirmStyle0 = scSubscriptionAdHocConfirmCss;

const ScSubscriptionAdHocConfirm = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.heading = undefined;
        this.price = undefined;
        this.currencyCode = undefined;
        this.busy = false;
    }
    async handleSubmit(e) {
        const { ad_hoc_amount } = await e.target.getFormJson();
        this.busy = true;
        return window.location.assign(addQueryArgs(window.location.href, {
            action: 'confirm',
            ad_hoc_amount,
        }));
    }
    render() {
        return (h("sc-dashboard-module", { key: 'c91541886d66ddeb53a23f0dcf19ed2118ee56ac', heading: this.heading || wp.i18n.__('Enter An Amount', 'surecart'), class: "subscription-switch" }, h("sc-card", { key: '85ab84b8f2e6ea262a9eae375a47e18b6b2aa201' }, h("sc-form", { key: '749b49cd84a6ff8b6782f2e7f05df2bd20bd63f9', onScSubmit: e => this.handleSubmit(e) }, h("sc-price-input", { key: 'c4e7d7038c1d1ba5c20806d2578f591188d77957', label: "Amount", name: "ad_hoc_amount", currencyCode: this.currencyCode, autofocus: true, required: true }, h("span", { key: 'ba9de40eefaad5db6a55af8009cae12feb2d1583', slot: "suffix", style: { opacity: '0.75' } }, intervalString(this.price))), h("sc-button", { key: '7b7ad7fd472b8c6da4768ef7cfdd0c9300be271b', type: "primary", full: true, submit: true, loading: this.busy }, wp.i18n.__('Next', 'surecart'), " ", h("sc-icon", { key: '42e168926d1c569914d4a355c0cf0c79d8c76f89', name: "arrow-right", slot: "suffix" })))), this.busy && h("sc-block-ui", { key: 'c5046a131b1a1cdf285690a211d744d8b0eae872', style: { zIndex: '9' } })));
    }
};
ScSubscriptionAdHocConfirm.style = ScSubscriptionAdHocConfirmStyle0;

export { ScSubscriptionAdHocConfirm as sc_subscription_ad_hoc_confirm };

//# sourceMappingURL=sc-subscription-ad-hoc-confirm.entry.js.map