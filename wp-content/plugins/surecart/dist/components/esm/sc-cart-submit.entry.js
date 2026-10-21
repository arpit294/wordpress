import { r as registerInstance, h, H as Host } from './index-25e5af33.js';
import { f as formBusy } from './getters-3801a0c9.js';
import './store-fd165874.js';
import './index-18f5a1bc.js';
import './utils-2fd36c2c.js';

const scCartSubmitCss = "sc-cart-submit{position:relative;width:100%}sc-cart-submit a.wp-block-button__link{position:relative;text-decoration:none;width:100%;display:block;box-sizing:border-box;text-align:center}sc-cart-submit sc-spinner::part(base){--indicator-color:currentColor;--spinner-size:12px;position:absolute;top:calc(50% - var(--spinner-size) + var(--spinner-size) / 4);left:calc(50% - var(--spinner-size) + var(--spinner-size) / 4)}sc-cart-submit [data-text],sc-cart-submit [data-loader]{transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}sc-cart-submit [data-loader]{opacity:0;visibility:hidden}sc-cart-submit.is-disabled{pointer-events:none}sc-cart-submit.is-busy [data-text]{opacity:0;visibility:hidden}sc-cart-submit.is-busy [data-loader]{opacity:1;visibility:visible}";
const ScCartSubmitStyle0 = scCartSubmitCss;

const ScCartSubmit = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.busy = undefined;
    }
    render() {
        return (h(Host, { key: 'affd83b8029488b9c6e0b7bef95ed68342e41644', class: { 'is-busy': formBusy() || this.busy, 'is-disabled': formBusy() || this.busy }, onClick: () => {
                this.busy = true;
                return true;
            } }, h("slot", { key: 'fa74d83d564f24ba76bb3efbbe940e09df8d16d3' })));
    }
};
ScCartSubmit.style = ScCartSubmitStyle0;

export { ScCartSubmit as sc_cart_submit };

//# sourceMappingURL=sc-cart-submit.entry.js.map