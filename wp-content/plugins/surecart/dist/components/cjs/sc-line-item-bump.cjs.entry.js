'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const mutations = require('./mutations-4133422f.js');
require('./index-c3de642f.js');
require('./utils-f5ea3c23.js');
require('./remove-query-args-b57e8cd3.js');
require('./add-query-args-49dcb630.js');
require('./index-fb76df07.js');
require('./google-8dbad1a6.js');
require('./currency-b438c76d.js');
require('./store-29627d6b.js');
require('./price-9dddd853.js');

const scLineItemBumpCss = ":host{display:block}";
const ScLineItemBumpStyle0 = scLineItemBumpCss;

const ScLineItemBump = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.label = undefined;
        this.loading = undefined;
    }
    render() {
        var _a, _b;
        if (!((_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.bump_amount)) {
            return index.h(index.Host, { style: { display: 'none' } });
        }
        return (index.h("sc-line-item", null, index.h("span", { slot: "description" }, this.label || wp.i18n.__('Bundle Discount', 'surecart')), index.h("span", { slot: "price" }, (_b = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.bump_display_amount)));
    }
};
ScLineItemBump.style = ScLineItemBumpStyle0;

exports.sc_line_item_bump = ScLineItemBump;

//# sourceMappingURL=sc-line-item-bump.cjs.entry.js.map