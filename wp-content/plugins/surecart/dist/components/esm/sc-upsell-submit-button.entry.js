import { r as registerInstance, h, H as Host, a as getElement } from './index-25e5af33.js';
import './facebook-5e5a33d2.js';
import { s as state } from './store-3e08528c.js';
import { s as state$1 } from './mutations-7458343f.js';
import { i as isProductOutOfStock, c as isSelectedVariantMissing } from './watchers-43c9573f.js';
import { a as accept } from './mutations-8f16b816.js';
import { a as isBusy } from './getters-30f4a3d4.js';
import './add-query-args-0e2a8393.js';
import './google-e9085e27.js';
import './currency-eb33deae.js';
import './utils-2fd36c2c.js';
import './index-18f5a1bc.js';
import './index-c5a96d53.js';
import './google-5e2052e8.js';
import './util-dfbf863e.js';
import './fetch-cdff67be.js';
import './index-824c562b.js';
import './remove-query-args-938c53ea.js';

const scUpsellSubmitButtonCss = "sc-upsell-submit-button{position:relative;display:block}sc-upsell-submit-button .wp-block-button__link{position:relative;text-decoration:none}sc-upsell-submit-button .wp-block-button__link span sc-icon{padding-right:var(--sc-spacing-small)}sc-upsell-submit-button .wp-block-button__link [data-text],sc-upsell-submit-button .wp-block-button__link sc-spinner{display:flex;align-items:center;justify-content:center}sc-upsell-submit-button .sc-block-button--sold-out,sc-upsell-submit-button .sc-block-button--unavailable{display:none !important}sc-upsell-submit-button.is-unavailable .sc-block-button__link{display:none !important}sc-upsell-submit-button.is-unavailable .sc-block-button--unavailable{display:initial !important}sc-upsell-submit-button.is-sold-out .sc-block-button__link{display:none !important}sc-upsell-submit-button.is-sold-out .sc-block-button--sold-out{display:initial !important}sc-upsell-submit-button sc-spinner::part(base){--indicator-color:currentColor;--spinner-size:12px;position:absolute;top:calc(50% - var(--spinner-size) + var(--spinner-size) / 4);left:calc(50% - var(--spinner-size) + var(--spinner-size) / 4)}sc-upsell-submit-button [data-text],sc-upsell-submit-button [data-loader]{transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}sc-upsell-submit-button [data-loader]{opacity:0;visibility:hidden}sc-upsell-submit-button.is-disabled{pointer-events:none}sc-upsell-submit-button.is-busy [data-text]{opacity:0;visibility:hidden}sc-upsell-submit-button.is-busy [data-loader]{opacity:1;visibility:visible}sc-upsell-submit-button.is-out-of-stock [data-text]{opacity:0.6}";
const ScUpsellSubmitButtonStyle0 = scUpsellSubmitButtonCss;

const ScUpsellSubmitButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    getUpsellProductId() {
        var _a;
        return ((_a = state.product) === null || _a === void 0 ? void 0 : _a.id) || '';
    }
    async handleAddToOrderClick(e) {
        e.preventDefault();
        accept();
    }
    render() {
        return (h(Host, { key: '57b26a13b7d5b12977c822b17f4fa2a551f4c9dc', class: {
                'is-busy': isBusy(),
                'is-disabled': state.disabled,
                // TODO: change this to out of stock error message.
                'is-sold-out': (isProductOutOfStock(this.getUpsellProductId()) && !isSelectedVariantMissing(this.getUpsellProductId())) || (state$1 === null || state$1 === void 0 ? void 0 : state$1.code) === 'out_of_stock',
                'is-unavailable': isSelectedVariantMissing(this.getUpsellProductId()) || (state$1 === null || state$1 === void 0 ? void 0 : state$1.code) === 'expired',
            }, onClick: e => this.handleAddToOrderClick(e) }, h("slot", { key: 'df7271f63e986bf45b09dc40447751a235a1bf86' })));
    }
    get el() { return getElement(this); }
};
ScUpsellSubmitButton.style = ScUpsellSubmitButtonStyle0;

export { ScUpsellSubmitButton as sc_upsell_submit_button };

//# sourceMappingURL=sc-upsell-submit-button.entry.js.map