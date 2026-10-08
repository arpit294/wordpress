'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const index$1 = require('./index-f3933112.js');
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

const scPriceChoicesCss = "sc-price-choices{display:block;position:relative}sc-block-ui{z-index:9}";
const ScPriceChoicesStyle0 = scPriceChoicesCss;

const ScPriceChoices = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scRemoveLineItem = index.createEvent(this, "scRemoveLineItem", 7);
        this.scUpdateLineItem = index.createEvent(this, "scUpdateLineItem", 7);
        this.label = undefined;
        this.columns = 1;
        this.required = true;
    }
    handleChange() {
        this.el.querySelectorAll('sc-price-choice').forEach(priceChoice => {
            var _a;
            const choice = priceChoice.querySelector('sc-choice') || priceChoice.querySelector('sc-choice-container');
            if (!(choice === null || choice === void 0 ? void 0 : choice.checked)) {
                this.scRemoveLineItem.emit({ price_id: priceChoice.priceId, quantity: priceChoice.quantity });
            }
            else {
                const lineItem = index$1.getLineItemByPriceId((_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.line_items, choice.value);
                this.scUpdateLineItem.emit({ price_id: priceChoice.priceId, quantity: (lineItem === null || lineItem === void 0 ? void 0 : lineItem.quantity) || (priceChoice === null || priceChoice === void 0 ? void 0 : priceChoice.quantity) || 1 });
            }
        });
    }
    render() {
        return (index.h(index.Fragment, { key: 'b65424f830bc457766c271c2d5f750a251d240f8' }, index.h("sc-choices", { key: 'c96b7d664e7f4ec0406c22877ee92ca703aa666c', label: this.label, required: this.required, class: "loaded price-selector", style: { '--columns': this.columns.toString() } }, index.h("slot", { key: 'be78f12134a06e330ca71fddd247749e5396b94a' }))));
    }
    get el() { return index.getElement(this); }
};
ScPriceChoices.style = ScPriceChoicesStyle0;

exports.sc_price_choices = ScPriceChoices;

//# sourceMappingURL=sc-price-choices.cjs.entry.js.map