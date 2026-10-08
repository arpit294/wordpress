import { r as registerInstance, h, H as Host, a as getElement } from './index-25e5af33.js';
import { g as getProductBuyLink, s as submitCartForm, a as getTopLevelError, b as getAdditionalErrorMessages } from './error-ac351427.js';
import { s as state, b as setProduct, o as onChange, i as isProductOutOfStock, c as isSelectedVariantMissing } from './watchers-43c9573f.js';
import './mutations-54fc7af1.js';
import './index-18f5a1bc.js';
import './utils-2fd36c2c.js';
import './remove-query-args-938c53ea.js';
import './add-query-args-0e2a8393.js';
import './index-c5a96d53.js';
import './google-e9085e27.js';
import './currency-eb33deae.js';
import './store-fd165874.js';
import './price-39d60d32.js';
import './mutations-acb88b38.js';
import './mutations-7458343f.js';
import './index-396e50a3.js';
import './fetch-cdff67be.js';
import './index-824c562b.js';
import './google-5e2052e8.js';
import './util-dfbf863e.js';

const scProductBuyButtonCss = "sc-product-buy-button{position:relative}sc-product-buy-button a.wp-block-button__link{position:relative;text-decoration:none}sc-product-buy-button .sc-block-button--sold-out,sc-product-buy-button .sc-block-button--unavailable{display:none !important}sc-product-buy-button.is-unavailable a{display:none !important}sc-product-buy-button.is-unavailable .sc-block-button--unavailable{display:initial !important}sc-product-buy-button.is-sold-out a{display:none !important}sc-product-buy-button.is-sold-out .sc-block-button--sold-out{display:initial !important}sc-product-buy-button sc-spinner::part(base){--indicator-color:currentColor;--spinner-size:12px;position:absolute;top:calc(50% - var(--spinner-size) + var(--spinner-size) / 4);left:calc(50% - var(--spinner-size) + var(--spinner-size) / 4)}sc-product-buy-button [data-text],sc-product-buy-button [data-loader]{transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}sc-product-buy-button [data-loader]{opacity:0;visibility:hidden}sc-product-buy-button.is-disabled{pointer-events:none}sc-product-buy-button.is-busy [data-text]{opacity:0;visibility:hidden}sc-product-buy-button.is-busy [data-loader]{opacity:1;visibility:visible}sc-product-buy-button sc-alert{margin-bottom:var(--sc-spacing-medium)}sc-product-buy-button.is-out-of-stock [data-text]{opacity:0.6}";
const ScProductBuyButtonStyle0 = scProductBuyButtonCss;

const ScProductBuyButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.addToCart = undefined;
        this.productId = undefined;
        this.formId = undefined;
        this.mode = 'live';
        this.checkoutLink = undefined;
        this.error = undefined;
    }
    async handleCartClick(e) {
        var _a, _b, _c, _d, _e;
        e.preventDefault();
        console.log(e);
        // already busy, do nothing.
        if ((_a = state[this.productId]) === null || _a === void 0 ? void 0 : _a.busy)
            return;
        // ad hoc price, use the dialog.
        if ((_c = (_b = state[this.productId]) === null || _b === void 0 ? void 0 : _b.selectedPrice) === null || _c === void 0 ? void 0 : _c.ad_hoc) {
            setProduct(this.productId, { dialog: this.addToCart ? 'ad_hoc_cart' : 'ad_hoc_buy' });
            return;
        }
        // if add to cart is undefined/false navigate to buy url
        if (!this.addToCart) {
            const checkoutUrl = (_e = (_d = window === null || window === void 0 ? void 0 : window.scData) === null || _d === void 0 ? void 0 : _d.pages) === null || _e === void 0 ? void 0 : _e.checkout;
            if (!checkoutUrl)
                return;
            return window.location.assign(getProductBuyLink(this.productId, checkoutUrl, { no_cart: !this.addToCart }));
        }
        // submit the cart form.
        try {
            await submitCartForm(this.productId);
        }
        catch (e) {
            console.error(e);
            this.error = e;
        }
    }
    componentDidLoad() {
        this.link = this.el.querySelector('a');
        this.updateProductLink();
        onChange(this.productId, () => this.updateProductLink());
    }
    updateProductLink() {
        var _a, _b;
        const checkoutUrl = (_b = (_a = window === null || window === void 0 ? void 0 : window.scData) === null || _a === void 0 ? void 0 : _a.pages) === null || _b === void 0 ? void 0 : _b.checkout;
        if (!checkoutUrl || !this.link)
            return;
        this.link.href = getProductBuyLink(this.productId, checkoutUrl, !this.addToCart ? { no_cart: true } : {});
    }
    render() {
        var _a, _b;
        return (h(Host, { key: '2d67b2e0adfe6e7261253cc5288aa819ab3e9ff1', class: {
                'is-busy': ((_a = state[this.productId]) === null || _a === void 0 ? void 0 : _a.busy) && !!this.addToCart,
                'is-disabled': (_b = state[this.productId]) === null || _b === void 0 ? void 0 : _b.disabled,
                'is-sold-out': isProductOutOfStock(this.productId) && !isSelectedVariantMissing(this.productId),
                'is-unavailable': isSelectedVariantMissing(this.productId),
            }, onClick: e => this.handleCartClick(e) }, !!this.error && (h("sc-alert", { key: '4fad773b0627b23d13c22c6ab634f04f764000c1', onClick: event => {
                event.stopPropagation();
            }, type: "danger", scrollOnOpen: true, open: !!this.error, closable: false }, !!getTopLevelError(this.error) && h("span", { key: 'cd24aa6c412173b0ed7a7712680d43e63698c209', slot: "title", innerHTML: getTopLevelError(this.error) }), (getAdditionalErrorMessages(this.error) || []).map((message, index) => (h("div", { innerHTML: message, key: index }))))), h("slot", { key: '9d7bedd086b3f6a2331c952991a86685736684b7' })));
    }
    get el() { return getElement(this); }
};
ScProductBuyButton.style = ScProductBuyButtonStyle0;

export { ScProductBuyButton as sc_product_buy_button };

//# sourceMappingURL=sc-product-buy-button.entry.js.map