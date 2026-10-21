'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
require('./facebook-3c183c7a.js');
const store = require('./store-3ddee299.js');
const getters = require('./getters-e8c6cb31.js');
const mutations = require('./mutations-8b2b6c99.js');
require('./watchers-24b78a31.js');
require('./index-c3de642f.js');
require('./google-15c85d5e.js');
require('./currency-b438c76d.js');
require('./google-8dbad1a6.js');
require('./utils-f5ea3c23.js');
require('./util-a15c420c.js');
require('./index-fb76df07.js');
require('./add-query-args-49dcb630.js');
require('./fetch-5e8dc1d5.js');
require('./index-7ced8198.js');
require('./remove-query-args-b57e8cd3.js');
require('./mutations-d5d6ddf1.js');

const scUpsellCss = ":host{display:block}.confirm__icon{margin-bottom:var(--sc-spacing-medium);display:flex;justify-content:center}.confirm__icon-container{background:var(--sc-color-primary-500);width:55px;height:55px;border-radius:999999px;display:flex;align-items:center;justify-content:center;font-size:26px;line-height:1;color:white}";
const ScUpsellStyle0 = scUpsellCss;

const ScUpsell = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    componentWillLoad() {
        mutations.trackOffer();
        mutations.preview();
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const manualPaymentMethod = (_a = store.state.checkout) === null || _a === void 0 ? void 0 : _a.manual_payment_method;
        return (index.h(index.Host, { key: '94850f142a6abe24da441084b70ddf5e922899c4' }, index.h("slot", { key: 'a5db2774b5dbe5e04d0145df7b6c64081a864eb3' }), getters.isBusy() && index.h("sc-block-ui", { key: '06a21d8b2225bb77a1ae5784c1a1248f8c5b44e4', style: { 'z-index': '30', '--sc-block-ui-position': 'fixed' } }), index.h("sc-dialog", { key: '0bc03d2cc5352db1829ffd3bf4245c41069f93a6', open: store.state.loading === 'complete', style: { '--body-spacing': 'var(--sc-spacing-xxx-large)' }, noHeader: true, onScRequestClose: e => e.preventDefault() }, index.h("div", { key: 'b8f26b649b26521f33d5b575dd63bec4b60dce40', class: "confirm__icon" }, index.h("div", { key: '47988c9aaee4f7e850f52a95f011a13acb896f14', class: "confirm__icon-container" }, index.h("sc-icon", { key: '4f641e1e15926fbde017c090f026be81da52f2bc', name: "check" }))), index.h("sc-dashboard-module", { key: '93de9a0874558fc543250234c9cf3e45ae9aa51e', heading: ((_c = (_b = store.state === null || store.state === void 0 ? void 0 : store.state.text) === null || _b === void 0 ? void 0 : _b.success) === null || _c === void 0 ? void 0 : _c.title) || wp.i18n.__('Thank you!', 'surecart'), style: { '--sc-dashboard-module-spacing': 'var(--sc-spacing-x-large)', 'textAlign': 'center' } }, index.h("span", { key: 'e3d24f6747e86ea074c194650e3ba273f095846b', slot: "description" }, ((_e = (_d = store.state === null || store.state === void 0 ? void 0 : store.state.text) === null || _d === void 0 ? void 0 : _d.success) === null || _e === void 0 ? void 0 : _e.description) || wp.i18n.__('Your purchase was successful. A receipt is on its way to your inbox.', 'surecart')), !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name) && !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions) && (index.h("sc-alert", { key: '07b61f088d80eef8f091e1e459bdcda5f8d7cc28', type: "info", open: true, style: { 'text-align': 'left' } }, index.h("span", { key: '281dafaeb13f93d8ff031201268aa37798bad99b', slot: "title" }, manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name), index.h("div", { key: '3a21d262dd35e7664caf0cba4ab711f3018cd999', innerHTML: manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions }))), index.h("sc-button", { key: 'f661a28d6d4197cc78f8a4556fa792874bf6a42a', href: (_g = (_f = window === null || window === void 0 ? void 0 : window.scData) === null || _f === void 0 ? void 0 : _f.pages) === null || _g === void 0 ? void 0 : _g.dashboard, size: "large", type: "primary", autofocus: true }, ((_j = (_h = store.state === null || store.state === void 0 ? void 0 : store.state.text) === null || _h === void 0 ? void 0 : _h.success) === null || _j === void 0 ? void 0 : _j.button) || wp.i18n.__('Continue', 'surecart'), index.h("sc-icon", { key: 'b02baccde44ad4326126b01828d186a5d4f58f06', name: "arrow-right", slot: "suffix" }))))));
    }
};
ScUpsell.style = ScUpsellStyle0;

exports.sc_upsell = ScUpsell;

//# sourceMappingURL=sc-upsell.cjs.entry.js.map