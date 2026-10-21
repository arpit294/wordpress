'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const mutations = require('./mutations-4133422f.js');
const pageAlign = require('./page-align-5a2ab493.js');
const getters = require('./getters-ade46b86.js');
const index$1 = require('./index-c5bd66ae.js');
const index$2 = require('./index-fb76df07.js');
require('./index-c3de642f.js');
require('./utils-f5ea3c23.js');
require('./remove-query-args-b57e8cd3.js');
require('./add-query-args-49dcb630.js');
require('./google-8dbad1a6.js');
require('./currency-b438c76d.js');
require('./store-29627d6b.js');
require('./price-9dddd853.js');
require('./fetch-5e8dc1d5.js');
require('./index-7ced8198.js');

const scOrderCouponFormCss = ":host{display:block}.coupon-form{position:relative}.form{opacity:0;visibility:hidden;height:0;transition:opacity var(--sc-transition-fast) ease-in-out}.coupon-form--is-open .form{opacity:1;visibility:visible;height:auto;margin-top:var(--sc-spacing-small);display:grid;gap:var(--sc-spacing-small)}.coupon-form--is-open .trigger{color:var(--sc-input-label-color)}.coupon-form--is-open .trigger:hover{text-decoration:none}.trigger{cursor:pointer;font-size:var(--sc-font-size-small);color:var(--sc-color-gray-500);user-select:none}.trigger:hover{text-decoration:underline}.order-coupon-form--is-rtl .trigger,.order-coupon-form--is-rtl .trigger:hover{text-align:right}";
const ScOrderCouponFormStyle0 = scOrderCouponFormCss;

const ScOrderCouponForm = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
            mutations.updateFormState('FETCH');
            mutations.state.checkout = (await index$1.createOrUpdateCheckout({
                id: mutations.state.checkout.id,
                data: {
                    discount: {
                        ...(promotion_code ? { promotion_code } : {}),
                    },
                },
            }));
            if (promotion_code) {
                index$2.speak(
                // translators: %1$s is the coupon code, %2$s is the discount amount, %3$s is the order total
                wp.i18n.sprintf(wp.i18n.__('Coupon code %1$s applied, discount is %2$s and now order total is %3$s', 'surecart'), promotion_code, (_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.discounts_display_amount, (_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.total_display_amount), 'assertive');
            }
            mutations.updateFormState('RESOLVE');
            await ((_c = this.couponForm) === null || _c === void 0 ? void 0 : _c.triggerFocus());
        }
        catch (error) {
            console.error(error);
            this.error = ((_e = (_d = error === null || error === void 0 ? void 0 : error.additional_errors) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.message) || (error === null || error === void 0 ? void 0 : error.message) || wp.i18n.__('Something went wrong', 'surecart');
            mutations.updateFormState('REJECT');
        }
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // Do any line items have a recurring price?
        const hasRecurring = (_c = (_b = (_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.some(item => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.recurring_interval; });
        return (index.h("sc-coupon-form", { key: '5a865ce9c95d84f59d9eae97c9b5631108d56161', ref: el => (this.couponForm = el), label: this.label || wp.i18n.__('Add Coupon Code', 'surecart'), collapsed: this.collapsed, placeholder: this.placeholder, loading: getters.formBusy() && !((_f = (_e = (_d = mutations.state.checkout) === null || _d === void 0 ? void 0 : _d.line_items) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.length), busy: getters.formBusy(), discount: (_g = mutations.state.checkout) === null || _g === void 0 ? void 0 : _g.discount, "discounts-display-amount": (_h = mutations.state.checkout) === null || _h === void 0 ? void 0 : _h.discounts_display_amount, currency: (_j = mutations.state.checkout) === null || _j === void 0 ? void 0 : _j.currency, "discount-amount": (_k = mutations.state.checkout) === null || _k === void 0 ? void 0 : _k.discount_amount, class: {
                'order-coupon-form--is-rtl': pageAlign.isRtl(),
            }, "button-text": this.buttonText || wp.i18n.__('Apply', 'surecart'), "show-interval": hasRecurring, onScApplyCoupon: e => this.handleCouponApply(e), error: this.error }));
    }
};
ScOrderCouponForm.style = ScOrderCouponFormStyle0;

exports.sc_order_coupon_form = ScOrderCouponForm;

//# sourceMappingURL=sc-order-coupon-form.cjs.entry.js.map