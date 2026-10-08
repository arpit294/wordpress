import { r as registerInstance, h, H as Host } from './index-25e5af33.js';
import './facebook-5e5a33d2.js';
import { s as state } from './store-3e08528c.js';
import { a as isBusy } from './getters-30f4a3d4.js';
import { t as trackOffer, p as preview } from './mutations-8f16b816.js';
import './watchers-43c9573f.js';
import './index-18f5a1bc.js';
import './google-5e2052e8.js';
import './currency-eb33deae.js';
import './google-e9085e27.js';
import './utils-2fd36c2c.js';
import './util-dfbf863e.js';
import './index-c5a96d53.js';
import './add-query-args-0e2a8393.js';
import './fetch-cdff67be.js';
import './index-824c562b.js';
import './remove-query-args-938c53ea.js';
import './mutations-7458343f.js';

const scUpsellCss = ":host{display:block}.confirm__icon{margin-bottom:var(--sc-spacing-medium);display:flex;justify-content:center}.confirm__icon-container{background:var(--sc-color-primary-500);width:55px;height:55px;border-radius:999999px;display:flex;align-items:center;justify-content:center;font-size:26px;line-height:1;color:white}";
const ScUpsellStyle0 = scUpsellCss;

const ScUpsell = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    componentWillLoad() {
        trackOffer();
        preview();
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const manualPaymentMethod = (_a = state.checkout) === null || _a === void 0 ? void 0 : _a.manual_payment_method;
        return (h(Host, { key: '94850f142a6abe24da441084b70ddf5e922899c4' }, h("slot", { key: 'a5db2774b5dbe5e04d0145df7b6c64081a864eb3' }), isBusy() && h("sc-block-ui", { key: '06a21d8b2225bb77a1ae5784c1a1248f8c5b44e4', style: { 'z-index': '30', '--sc-block-ui-position': 'fixed' } }), h("sc-dialog", { key: '0bc03d2cc5352db1829ffd3bf4245c41069f93a6', open: state.loading === 'complete', style: { '--body-spacing': 'var(--sc-spacing-xxx-large)' }, noHeader: true, onScRequestClose: e => e.preventDefault() }, h("div", { key: 'b8f26b649b26521f33d5b575dd63bec4b60dce40', class: "confirm__icon" }, h("div", { key: '47988c9aaee4f7e850f52a95f011a13acb896f14', class: "confirm__icon-container" }, h("sc-icon", { key: '4f641e1e15926fbde017c090f026be81da52f2bc', name: "check" }))), h("sc-dashboard-module", { key: '93de9a0874558fc543250234c9cf3e45ae9aa51e', heading: ((_c = (_b = state === null || state === void 0 ? void 0 : state.text) === null || _b === void 0 ? void 0 : _b.success) === null || _c === void 0 ? void 0 : _c.title) || wp.i18n.__('Thank you!', 'surecart'), style: { '--sc-dashboard-module-spacing': 'var(--sc-spacing-x-large)', 'textAlign': 'center' } }, h("span", { key: 'e3d24f6747e86ea074c194650e3ba273f095846b', slot: "description" }, ((_e = (_d = state === null || state === void 0 ? void 0 : state.text) === null || _d === void 0 ? void 0 : _d.success) === null || _e === void 0 ? void 0 : _e.description) || wp.i18n.__('Your purchase was successful. A receipt is on its way to your inbox.', 'surecart')), !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name) && !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions) && (h("sc-alert", { key: '07b61f088d80eef8f091e1e459bdcda5f8d7cc28', type: "info", open: true, style: { 'text-align': 'left' } }, h("span", { key: '281dafaeb13f93d8ff031201268aa37798bad99b', slot: "title" }, manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name), h("div", { key: '3a21d262dd35e7664caf0cba4ab711f3018cd999', innerHTML: manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions }))), h("sc-button", { key: 'f661a28d6d4197cc78f8a4556fa792874bf6a42a', href: (_g = (_f = window === null || window === void 0 ? void 0 : window.scData) === null || _f === void 0 ? void 0 : _f.pages) === null || _g === void 0 ? void 0 : _g.dashboard, size: "large", type: "primary", autofocus: true }, ((_j = (_h = state === null || state === void 0 ? void 0 : state.text) === null || _h === void 0 ? void 0 : _h.success) === null || _j === void 0 ? void 0 : _j.button) || wp.i18n.__('Continue', 'surecart'), h("sc-icon", { key: 'b02baccde44ad4326126b01828d186a5d4f58f06', name: "arrow-right", slot: "suffix" }))))));
    }
};
ScUpsell.style = ScUpsellStyle0;

export { ScUpsell as sc_upsell };

//# sourceMappingURL=sc-upsell.entry.js.map