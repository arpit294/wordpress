import { r as registerInstance, h } from './index-25e5af33.js';
import { u as updateFormState, s as state } from './mutations-54fc7af1.js';
import { i as isRtl } from './page-align-0cdacf32.js';
import { f as formBusy } from './getters-3801a0c9.js';
import { c as createOrUpdateCheckout } from './index-396e50a3.js';
import { s as speak } from './index-c5a96d53.js';
import './index-18f5a1bc.js';
import './utils-2fd36c2c.js';
import './remove-query-args-938c53ea.js';
import './add-query-args-0e2a8393.js';
import './google-e9085e27.js';
import './currency-eb33deae.js';
import './store-fd165874.js';
import './price-39d60d32.js';
import './fetch-cdff67be.js';
import './index-824c562b.js';

const scOrderCouponFormCss = ":host{display:block}.coupon-form{position:relative}.form{opacity:0;visibility:hidden;height:0;transition:opacity var(--sc-transition-fast) ease-in-out}.coupon-form--is-open .form{opacity:1;visibility:visible;height:auto;margin-top:var(--sc-spacing-small);display:grid;gap:var(--sc-spacing-small)}.coupon-form--is-open .trigger{color:var(--sc-input-label-color)}.coupon-form--is-open .trigger:hover{text-decoration:none}.trigger{cursor:pointer;font-size:var(--sc-font-size-small);color:var(--sc-color-gray-500);user-select:none}.trigger:hover{text-decoration:underline}.order-coupon-form--is-rtl .trigger,.order-coupon-form--is-rtl .trigger:hover{text-align:right}";
const ScOrderCouponFormStyle0 = scOrderCouponFormCss;

const ScOrderCouponForm = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.label = undefined;
        this.loading = undefined;
        this.collapsed = undefined;
        this.placeholder = undefined;
        this.buttonText = undefined;
        this.open = undefined;
        this.value = undefined;
        this.error = undefined;
    }
    async handleCouponApply(e) {
        var _a, _b, _c, _d, _e;
        const promotion_code = (e === null || e === void 0 ? void 0 : e.detail) || null;
        try {
            this.error = null;
            updateFormState('FETCH');
            state.checkout = (await createOrUpdateCheckout({
                id: state.checkout.id,
                data: {
                    discount: {
                        ...(promotion_code ? { promotion_code } : {}),
                    },
                },
            }));
            if (promotion_code) {
                speak(
                // translators: %1$s is the coupon code, %2$s is the discount amount, %3$s is the order total
                wp.i18n.sprintf(wp.i18n.__('Coupon code %1$s applied, discount is %2$s and now order total is %3$s', 'surecart'), promotion_code, (_a = state.checkout) === null || _a === void 0 ? void 0 : _a.discounts_display_amount, (_b = state.checkout) === null || _b === void 0 ? void 0 : _b.total_display_amount), 'assertive');
            }
            updateFormState('RESOLVE');
            await ((_c = this.couponForm) === null || _c === void 0 ? void 0 : _c.triggerFocus());
        }
        catch (error) {
            console.error(error);
            this.error = ((_e = (_d = error === null || error === void 0 ? void 0 : error.additional_errors) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.message) || (error === null || error === void 0 ? void 0 : error.message) || wp.i18n.__('Something went wrong', 'surecart');
            updateFormState('REJECT');
        }
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // Do any line items have a recurring price?
        const hasRecurring = (_c = (_b = (_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.some(item => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.recurring_interval; });
        return (h("sc-coupon-form", { key: '5a865ce9c95d84f59d9eae97c9b5631108d56161', ref: el => (this.couponForm = el), label: this.label || wp.i18n.__('Add Coupon Code', 'surecart'), collapsed: this.collapsed, placeholder: this.placeholder, loading: formBusy() && !((_f = (_e = (_d = state.checkout) === null || _d === void 0 ? void 0 : _d.line_items) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.length), busy: formBusy(), discount: (_g = state.checkout) === null || _g === void 0 ? void 0 : _g.discount, "discounts-display-amount": (_h = state.checkout) === null || _h === void 0 ? void 0 : _h.discounts_display_amount, currency: (_j = state.checkout) === null || _j === void 0 ? void 0 : _j.currency, "discount-amount": (_k = state.checkout) === null || _k === void 0 ? void 0 : _k.discount_amount, class: {
                'order-coupon-form--is-rtl': isRtl(),
            }, "button-text": this.buttonText || wp.i18n.__('Apply', 'surecart'), "show-interval": hasRecurring, onScApplyCoupon: e => this.handleCouponApply(e), error: this.error }));
    }
};
ScOrderCouponForm.style = ScOrderCouponFormStyle0;

export { ScOrderCouponForm as sc_order_coupon_form };

//# sourceMappingURL=sc-order-coupon-form.entry.js.map