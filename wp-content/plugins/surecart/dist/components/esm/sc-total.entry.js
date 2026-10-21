import { r as registerInstance } from './index-25e5af33.js';
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

const scTotalCss = ":host{display:block}.total-amount{display:inline-block}";
const ScTotalStyle0 = scTotalCss;

const ORDER_KEYS = {
    total: 'total_display_amount',
    subtotal: 'subtotal_display_amount',
    amount_due: 'amount_due_display_amount',
};
const ScTotal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.order_key = {
            total: 'total_display_amount',
            subtotal: 'subtotal_display_amount',
            amount_due: 'amount_due_display_amount',
        };
        this.total = 'amount_due';
        this.checkout = undefined;
    }
    render() {
        var _a, _b;
        const checkoutData = this.checkout || (state === null || state === void 0 ? void 0 : state.checkout);
        if (!(checkoutData === null || checkoutData === void 0 ? void 0 : checkoutData.currency))
            return;
        if (!((_b = (_a = checkoutData === null || checkoutData === void 0 ? void 0 : checkoutData.line_items) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length))
            return;
        return (checkoutData === null || checkoutData === void 0 ? void 0 : checkoutData[ORDER_KEYS[this.total]]) || '';
    }
};
ScTotal.style = ScTotalStyle0;

export { ScTotal as sc_total };

//# sourceMappingURL=sc-total.entry.js.map