import { r as registerInstance, c as createEvent, h, F as Fragment, a as getElement } from './index-25e5af33.js';
import { b as getLineItemByPriceId } from './index-17aac936.js';
import { s as state } from './mutations-54fc7af1.js';
import './index-18f5a1bc.js';
import './utils-2fd36c2c.js';
import './remove-query-args-938c53ea.js';
import './add-query-args-0e2a8393.js';
import './index-c5a96d53.js';
import './google-e9085e27.js';
import './currency-eb33deae.js';
import './store-fd165874.js';
import './price-39d60d32.js';

const scPriceChoicesCss = "sc-price-choices{display:block;position:relative}sc-block-ui{z-index:9}";
const ScPriceChoicesStyle0 = scPriceChoicesCss;

const ScPriceChoices = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.scRemoveLineItem = createEvent(this, "scRemoveLineItem", 7);
        this.scUpdateLineItem = createEvent(this, "scUpdateLineItem", 7);
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
                const lineItem = getLineItemByPriceId((_a = state.checkout) === null || _a === void 0 ? void 0 : _a.line_items, choice.value);
                this.scUpdateLineItem.emit({ price_id: priceChoice.priceId, quantity: (lineItem === null || lineItem === void 0 ? void 0 : lineItem.quantity) || (priceChoice === null || priceChoice === void 0 ? void 0 : priceChoice.quantity) || 1 });
            }
        });
    }
    render() {
        return (h(Fragment, { key: 'b65424f830bc457766c271c2d5f750a251d240f8' }, h("sc-choices", { key: 'c96b7d664e7f4ec0406c22877ee92ca703aa666c', label: this.label, required: this.required, class: "loaded price-selector", style: { '--columns': this.columns.toString() } }, h("slot", { key: 'be78f12134a06e330ca71fddd247749e5396b94a' }))));
    }
    get el() { return getElement(this); }
};
ScPriceChoices.style = ScPriceChoicesStyle0;

export { ScPriceChoices as sc_price_choices };

//# sourceMappingURL=sc-price-choices.entry.js.map