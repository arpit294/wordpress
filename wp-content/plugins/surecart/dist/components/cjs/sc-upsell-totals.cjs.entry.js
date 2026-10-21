'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
require('./facebook-3c183c7a.js');
const store = require('./store-3ddee299.js');
require('./watchers-24b78a31.js');
require('./index-c3de642f.js');
require('./google-15c85d5e.js');
require('./currency-b438c76d.js');
require('./google-8dbad1a6.js');
require('./utils-f5ea3c23.js');
require('./util-a15c420c.js');
require('./index-fb76df07.js');
require('./getters-e8c6cb31.js');
require('./mutations-8b2b6c99.js');
require('./fetch-5e8dc1d5.js');
require('./index-7ced8198.js');
require('./add-query-args-49dcb630.js');
require('./remove-query-args-b57e8cd3.js');
require('./mutations-d5d6ddf1.js');

const scUpsellTotalsCss = ":host{display:block}sc-divider{margin:16px 0 !important}.conversion-description{color:var(--sc-color-gray-500);font-size:var(--sc-font-size-small);margin-right:var(--sc-spacing-xx-small)}";
const ScUpsellTotalsStyle0 = scUpsellTotalsCss;

const ScUpsellTotals = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    renderAmountDue() {
        var _a, _b;
        return store.state.amount_due > 0 ? (_a = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _a === void 0 ? void 0 : _a.total_display_amount : !!((_b = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _b === void 0 ? void 0 : _b.trial_amount) ? wp.i18n.__('Trial', 'surecart') : wp.i18n.__('Free', 'surecart');
    }
    // Determine if the currency should be displayed to avoid duplication in the amount display.
    getCurrencyToDisplay() {
        var _a, _b, _c, _d, _e, _f, _g;
        return ((_c = (_b = (_a = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _a === void 0 ? void 0 : _a.total_default_currency_display_amount) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === null || _c === void 0 ? void 0 : _c.includes((_e = (_d = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _d === void 0 ? void 0 : _d.currency) === null || _e === void 0 ? void 0 : _e.toLowerCase()))
            ? ''
            : (_g = (_f = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _f === void 0 ? void 0 : _f.currency) === null || _g === void 0 ? void 0 : _g.toUpperCase();
    }
    renderConversion() {
        var _a, _b, _c, _d, _e, _f;
        // need to check the checkout for a few things.
        const checkout = store.state === null || store.state === void 0 ? void 0 : store.state.checkout;
        if (!(checkout === null || checkout === void 0 ? void 0 : checkout.show_converted_total)) {
            return null;
        }
        // the currency is the same as the current currency.
        if ((checkout === null || checkout === void 0 ? void 0 : checkout.currency) === (checkout === null || checkout === void 0 ? void 0 : checkout.current_currency)) {
            return null;
        }
        // there is no amount due.
        if (!((_a = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _a === void 0 ? void 0 : _a.total_amount)) {
            return null;
        }
        return (index.h(index.Fragment, null, index.h("sc-divider", null), index.h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, index.h("span", { slot: "title" }, index.h("slot", { name: "charge-amount-description" }, wp.i18n.sprintf(wp.i18n.__('Payment Total', 'surecart'), (_c = (_b = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _b === void 0 ? void 0 : _b.currency) === null || _c === void 0 ? void 0 : _c.toUpperCase()))), index.h("span", { slot: "price" }, this.getCurrencyToDisplay() && index.h("span", { class: "currency-label" }, this.getCurrencyToDisplay()), (_d = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _d === void 0 ? void 0 :
            _d.total_default_currency_display_amount)), index.h("sc-line-item", null, index.h("span", { slot: "description", class: "conversion-description" }, wp.i18n.sprintf(wp.i18n.__('Your payment will be processed in %s.', 'surecart'), (_f = (_e = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _e === void 0 ? void 0 : _e.currency) === null || _f === void 0 ? void 0 : _f.toUpperCase())))));
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        return (index.h("sc-summary", { key: '5a91b02fe73c02b0353c97d738fcbc76cd99a1b9', "open-text": "Total", "closed-text": "Total", collapsible: true, collapsed: true }, !!((_a = store.state.line_item) === null || _a === void 0 ? void 0 : _a.id) && index.h("span", { key: '091680b4c23c9d67dede79ff5c907faa65c5deba', slot: "price" }, this.renderAmountDue()), index.h("sc-divider", { key: '331bb48669a97b3e1f3249881d002988d1cc301b' }), index.h("sc-line-item", { key: 'e0f3f9a16d77f761e4615277cf83d62cf886d32c' }, index.h("span", { key: '42c48d4fd9775dbb1c85e2b7277b303ec6b07c2a', slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), index.h("span", { key: '41a1a724ff0ac093be95c62849da28ead270bc10', slot: "price" }, (_b = store.state.line_item) === null || _b === void 0 ? void 0 : _b.subtotal_display_amount)), (((_d = (_c = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _c === void 0 ? void 0 : _c.fees) === null || _d === void 0 ? void 0 : _d.data) || [])
            .filter(fee => fee.fee_type === 'upsell') // only upsell fees.
            .map(fee => {
            return (index.h("sc-line-item", null, index.h("span", { slot: "description" }, fee.description, " ", `(${wp.i18n.__('one time', 'surecart')})`), index.h("span", { slot: "price" }, fee === null || fee === void 0 ? void 0 : fee.display_amount)));
        }), !!((_e = store.state.line_item) === null || _e === void 0 ? void 0 : _e.tax_amount) && (index.h("sc-line-item", { key: 'bf2f9435f24ae921ffdffd00223615f062533010' }, index.h("span", { key: 'b3690f910fe40ed9155a2e31bae787351d52dcfd', slot: "description" }, wp.i18n.__('Tax', 'surecart')), index.h("span", { key: '2c9f1d2af56360493c7a9f10676d58ff723b3579', slot: "price" }, (_f = store.state.line_item) === null || _f === void 0 ? void 0 : _f.tax_display_amount))), index.h("sc-divider", { key: '4bd9878a860f196571b2f5c20b6a05168eae4c1a' }), index.h("sc-line-item", { key: '589e030a484956fdd1b9f5f5a6bba279df462304', style: { '--price-size': 'var(--sc-font-size-x-large)' } }, index.h("span", { key: '1e0fb57215a27a38f7e50ad33e2257a482c6a013', slot: "title" }, wp.i18n.__('Total', 'surecart')), index.h("span", { key: '173c1aae418b80d9c6f0818a2e7856359028dd6d', slot: "price" }, (_g = store.state.line_item) === null || _g === void 0 ? void 0 : _g.total_display_amount)), this.renderConversion()));
    }
};
ScUpsellTotals.style = ScUpsellTotalsStyle0;

exports.sc_upsell_totals = ScUpsellTotals;

//# sourceMappingURL=sc-upsell-totals.cjs.entry.js.map