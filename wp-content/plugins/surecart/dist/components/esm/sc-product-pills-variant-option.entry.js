import { r as registerInstance, h, F as Fragment } from './index-25e5af33.js';
import { s as state, e as isOptionSoldOut, h as isOptionMissing, b as setProduct } from './watchers-43c9573f.js';
import './index-18f5a1bc.js';
import './google-5e2052e8.js';
import './currency-eb33deae.js';
import './google-e9085e27.js';
import './utils-2fd36c2c.js';
import './util-dfbf863e.js';
import './index-c5a96d53.js';

const scProductPillsVariantOptionCss = ".sc-product-pills-variant-option__wrapper{display:flex;flex-wrap:wrap;gap:var(--sc-spacing-x-small)}";
const ScProductPillsVariantOptionStyle0 = scProductPillsVariantOptionCss;

const ScProductPillsVariantOption = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.label = undefined;
        this.optionNumber = 1;
        this.productId = undefined;
    }
    render() {
        return (h("sc-form-control", { key: '2c21c288660383566bc002f81323e156411879b5', label: this.label }, h("span", { key: 'd7b163a9263543a77f37bffe1386351b7a4dce0c', slot: "label" }, this.label), h("div", { key: 'cd2abe12d57998cd2ca815021780acd4d1bb58bc', class: "sc-product-pills-variant-option__wrapper" }, (state[this.productId].variant_options[this.optionNumber - 1].values || []).map(value => {
            const isUnavailable = isOptionSoldOut(this.productId, this.optionNumber, value) || isOptionMissing(this.productId, this.optionNumber, value);
            return (h("sc-pill-option", { isUnavailable: isUnavailable, isSelected: state[this.productId].variantValues[`option_${this.optionNumber}`] === value, onClick: () => setProduct(this.productId, {
                    variantValues: {
                        ...state[this.productId].variantValues,
                        [`option_${this.optionNumber}`]: value,
                    },
                }) }, h("span", { "aria-hidden": "true" }, value), h("sc-visually-hidden", null, wp.i18n.sprintf(wp.i18n.__('Select %s: %s.', 'surecart'), this.label, value), isUnavailable && h(Fragment, null, " ", wp.i18n.__('(option unavailable)', 'surecart')), state[this.productId].variantValues[`option_${this.optionNumber}`] === value && h(Fragment, null, " ", wp.i18n.__('This option is currently selected.', 'surecart')))));
        }))));
    }
};
ScProductPillsVariantOption.style = ScProductPillsVariantOptionStyle0;

export { ScProductPillsVariantOption as sc_product_pills_variant_option };

//# sourceMappingURL=sc-product-pills-variant-option.entry.js.map