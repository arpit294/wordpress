'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
require('./facebook-3c183c7a.js');
const store = require('./store-3ddee299.js');
const mutations$1 = require('./mutations-d5d6ddf1.js');
const watchers = require('./watchers-24b78a31.js');
const mutations = require('./mutations-8b2b6c99.js');
const getters = require('./getters-e8c6cb31.js');
require('./add-query-args-49dcb630.js');
require('./google-8dbad1a6.js');
require('./currency-b438c76d.js');
require('./utils-f5ea3c23.js');
require('./index-c3de642f.js');
require('./index-fb76df07.js');
require('./google-15c85d5e.js');
require('./util-a15c420c.js');
require('./fetch-5e8dc1d5.js');
require('./index-7ced8198.js');
require('./remove-query-args-b57e8cd3.js');

const scUpsellSubmitButtonCss = "sc-upsell-submit-button{position:relative;display:block}sc-upsell-submit-button .wp-block-button__link{position:relative;text-decoration:none}sc-upsell-submit-button .wp-block-button__link span sc-icon{padding-right:var(--sc-spacing-small)}sc-upsell-submit-button .wp-block-button__link [data-text],sc-upsell-submit-button .wp-block-button__link sc-spinner{display:flex;align-items:center;justify-content:center}sc-upsell-submit-button .sc-block-button--sold-out,sc-upsell-submit-button .sc-block-button--unavailable{display:none !important}sc-upsell-submit-button.is-unavailable .sc-block-button__link{display:none !important}sc-upsell-submit-button.is-unavailable .sc-block-button--unavailable{display:initial !important}sc-upsell-submit-button.is-sold-out .sc-block-button__link{display:none !important}sc-upsell-submit-button.is-sold-out .sc-block-button--sold-out{display:initial !important}sc-upsell-submit-button sc-spinner::part(base){--indicator-color:currentColor;--spinner-size:12px;position:absolute;top:calc(50% - var(--spinner-size) + var(--spinner-size) / 4);left:calc(50% - var(--spinner-size) + var(--spinner-size) / 4)}sc-upsell-submit-button [data-text],sc-upsell-submit-button [data-loader]{transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}sc-upsell-submit-button [data-loader]{opacity:0;visibility:hidden}sc-upsell-submit-button.is-disabled{pointer-events:none}sc-upsell-submit-button.is-busy [data-text]{opacity:0;visibility:hidden}sc-upsell-submit-button.is-busy [data-loader]{opacity:1;visibility:visible}sc-upsell-submit-button.is-out-of-stock [data-text]{opacity:0.6}";
const ScUpsellSubmitButtonStyle0 = scUpsellSubmitButtonCss;

const ScUpsellSubmitButton = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    getUpsellProductId() {
        var _a;
        return ((_a = store.state.product) === null || _a === void 0 ? void 0 : _a.id) || '';
    }
    async handleAddToOrderClick(e) {
        e.preventDefault();
        mutations.accept();
    }
    render() {
        return (index.h(index.Host, { key: '57b26a13b7d5b12977c822b17f4fa2a551f4c9dc', class: {
                'is-busy': getters.isBusy(),
                'is-disabled': store.state.disabled,
                // TODO: change this to out of stock error message.
                'is-sold-out': (watchers.isProductOutOfStock(this.getUpsellProductId()) && !watchers.isSelectedVariantMissing(this.getUpsellProductId())) || (mutations$1.state === null || mutations$1.state === void 0 ? void 0 : mutations$1.state.code) === 'out_of_stock',
                'is-unavailable': watchers.isSelectedVariantMissing(this.getUpsellProductId()) || (mutations$1.state === null || mutations$1.state === void 0 ? void 0 : mutations$1.state.code) === 'expired',
            }, onClick: e => this.handleAddToOrderClick(e) }, index.h("slot", { key: 'df7271f63e986bf45b09dc40447751a235a1bf86' })));
    }
    get el() { return index.getElement(this); }
};
ScUpsellSubmitButton.style = ScUpsellSubmitButtonStyle0;

exports.sc_upsell_submit_button = ScUpsellSubmitButton;

//# sourceMappingURL=sc-upsell-submit-button.cjs.entry.js.map