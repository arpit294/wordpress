'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const watchers = require('./watchers-24b78a31.js');
require('./index-c3de642f.js');
require('./google-15c85d5e.js');
require('./currency-b438c76d.js');
require('./google-8dbad1a6.js');
require('./utils-f5ea3c23.js');
require('./util-a15c420c.js');
require('./index-fb76df07.js');

const scProductPillsVariantOptionCss = ".sc-product-pills-variant-option__wrapper{display:flex;flex-wrap:wrap;gap:var(--sc-spacing-x-small)}";
const ScProductPillsVariantOptionStyle0 = scProductPillsVariantOptionCss;

const ScProductPillsVariantOption = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.label = undefined;
        this.optionNumber = 1;
        this.productId = undefined;
    }
    render() {
        return (index.h("sc-form-control", { key: '2c21c288660383566bc002f81323e156411879b5', label: this.label }, index.h("span", { key: 'd7b163a9263543a77f37bffe1386351b7a4dce0c', slot: "label" }, this.label), index.h("div", { key: 'cd2abe12d57998cd2ca815021780acd4d1bb58bc', class: "sc-product-pills-variant-option__wrapper" }, (watchers.state[this.productId].variant_options[this.optionNumber - 1].values || []).map(value => {
            const isUnavailable = watchers.isOptionSoldOut(this.productId, this.optionNumber, value) || watchers.isOptionMissing(this.productId, this.optionNumber, value);
            return (index.h("sc-pill-option", { isUnavailable: isUnavailable, isSelected: watchers.state[this.productId].variantValues[`option_${this.optionNumber}`] === value, onClick: () => watchers.setProduct(this.productId, {
                    variantValues: {
                        ...watchers.state[this.productId].variantValues,
                        [`option_${this.optionNumber}`]: value,
                    },
                }) }, index.h("span", { "aria-hidden": "true" }, value), index.h("sc-visually-hidden", null, wp.i18n.sprintf(wp.i18n.__('Select %s: %s.', 'surecart'), this.label, value), isUnavailable && index.h(index.Fragment, null, " ", wp.i18n.__('(option unavailable)', 'surecart')), watchers.state[this.productId].variantValues[`option_${this.optionNumber}`] === value && index.h(index.Fragment, null, " ", wp.i18n.__('This option is currently selected.', 'surecart')))));
        }))));
    }
};
ScProductPillsVariantOption.style = ScProductPillsVariantOptionStyle0;

exports.sc_product_pills_variant_option = ScProductPillsVariantOption;

//# sourceMappingURL=sc-product-pills-variant-option.cjs.entry.js.map