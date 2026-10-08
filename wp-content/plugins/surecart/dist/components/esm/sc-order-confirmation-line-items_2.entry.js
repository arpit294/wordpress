import { r as registerInstance, h, F as Fragment } from './index-25e5af33.js';
import { o as openWormhole } from './consumer-f1775a76.js';
import { a as groupBundleLineItems } from './index-17aac936.js';
import { a as getHumanDiscount } from './price-39d60d32.js';
import { g as getTaxLines, f as formatTaxDisplay, a as formatTaxLineDetail } from './tax-0d5a82ff.js';
import './currency-eb33deae.js';

const scOrderConfirmationLineItemsCss = ":host{display:block}.line-items{display:grid;gap:var(--sc-spacing-small)}.line-item{display:grid;gap:var(--sc-spacing-small)}.fee__description{opacity:0.75}";
const ScOrderConfirmationLineItemsStyle0 = scOrderConfirmationLineItemsCss;

const ScOrderConfirmationLineItems = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.order = undefined;
        this.loading = undefined;
    }
    render() {
        var _a, _b;
        if (!!this.loading) {
            return (h("sc-line-item", null, h("sc-skeleton", { style: { 'width': '50px', 'height': '50px', '--border-radius': '0' }, slot: "image" }), h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), h("sc-skeleton", { slot: "description", style: { width: '60px', display: 'inline-block' } }), h("sc-skeleton", { style: { width: '120px', display: 'inline-block' }, slot: "price" }), h("sc-skeleton", { style: { width: '60px', display: 'inline-block' }, slot: "price-description" })));
        }
        const items = (((_b = (_a = this.order) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) || []);
        const { regular, bundleParents, componentsByParent } = groupBundleLineItems(items);
        const orderedItems = [...bundleParents, ...regular];
        return (h("div", { class: { 'confirmation-summary': true } }, h("div", { class: "line-items", part: "line-items" }, orderedItems.map(item => {
            var _a, _b, _c, _d, _e, _f;
            const product = (_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.product;
            const isBundle = !!(product === null || product === void 0 ? void 0 : product.bundle);
            return (h("div", { class: "line-item", key: item.id }, h("sc-product-line-item", { image: product === null || product === void 0 ? void 0 : product.line_item_image, name: product === null || product === void 0 ? void 0 : product.name, price: (_b = item === null || item === void 0 ? void 0 : item.price) === null || _b === void 0 ? void 0 : _b.name, variant: item === null || item === void 0 ? void 0 : item.variant_display_options, editable: false, removable: false, quantity: item.quantity, fees: (_c = item === null || item === void 0 ? void 0 : item.fees) === null || _c === void 0 ? void 0 : _c.data, note: item === null || item === void 0 ? void 0 : item.display_note, amount: item.ad_hoc_display_amount ? item.ad_hoc_display_amount : item.subtotal_display_amount, scratch: !item.ad_hoc_display_amount && (item === null || item === void 0 ? void 0 : item.scratch_display_amount), trial: (_d = item === null || item === void 0 ? void 0 : item.price) === null || _d === void 0 ? void 0 : _d.trial_text, interval: `${(_e = item === null || item === void 0 ? void 0 : item.price) === null || _e === void 0 ? void 0 : _e.short_interval_text} ${(_f = item === null || item === void 0 ? void 0 : item.price) === null || _f === void 0 ? void 0 : _f.short_interval_count_text}`, purchasableStatus: item === null || item === void 0 ? void 0 : item.purchasable_status_display, sku: item === null || item === void 0 ? void 0 : item.sku, bundleComponents: isBundle ? componentsByParent[item.id] || [] : [] })));
        }))));
    }
};
openWormhole(ScOrderConfirmationLineItems, ['order', 'busy', 'loading', 'empty'], false);
ScOrderConfirmationLineItems.style = ScOrderConfirmationLineItemsStyle0;

const scOrderConfirmationTotalsCss = ":host{display:block}";
const ScOrderConfirmationTotalsStyle0 = scOrderConfirmationTotalsCss;

const ScOrderConfirmationTotals = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.order = undefined;
    }
    renderDiscountLine() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        if (!((_c = (_b = (_a = this.order) === null || _a === void 0 ? void 0 : _a.discount) === null || _b === void 0 ? void 0 : _b.promotion) === null || _c === void 0 ? void 0 : _c.code)) {
            return null;
        }
        let humanDiscount = '';
        if ((_e = (_d = this.order) === null || _d === void 0 ? void 0 : _d.discount) === null || _e === void 0 ? void 0 : _e.coupon) {
            humanDiscount = getHumanDiscount((_g = (_f = this.order) === null || _f === void 0 ? void 0 : _f.discount) === null || _g === void 0 ? void 0 : _g.coupon);
        }
        return (h("sc-line-item", { style: { marginTop: 'var(--sc-spacing-small)' } }, h("span", { slot: "description" }, wp.i18n.__('Discount', 'surecart'), h("br", null), ((_k = (_j = (_h = this.order) === null || _h === void 0 ? void 0 : _h.discount) === null || _j === void 0 ? void 0 : _j.promotion) === null || _k === void 0 ? void 0 : _k.code) && (h("sc-tag", { type: "success", size: "small" }, (_o = (_m = (_l = this.order) === null || _l === void 0 ? void 0 : _l.discount) === null || _m === void 0 ? void 0 : _m.promotion) === null || _o === void 0 ? void 0 : _o.code))), humanDiscount && (h("span", { class: "coupon-human-discount", slot: "price-description" }, "(", humanDiscount, ")")), h("span", { slot: "price" }, (_p = this.order) === null || _p === void 0 ? void 0 : _p.discounts_display_amount)));
    }
    renderCheckoutFees(checkout) {
        var _a, _b, _c, _d;
        if (!((_b = (_a = checkout === null || checkout === void 0 ? void 0 : checkout.checkout_fees) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length)) {
            return null;
        }
        return (h(Fragment, null, (_d = (_c = checkout === null || checkout === void 0 ? void 0 : checkout.checkout_fees) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.map(fee => (h("sc-line-item", { key: fee === null || fee === void 0 ? void 0 : fee.id }, h("span", { slot: "description" }, fee === null || fee === void 0 ? void 0 : fee.description), h("span", { slot: "price" }, fee === null || fee === void 0 ? void 0 : fee.display_amount))))));
    }
    renderShippingFees(checkout) {
        var _a, _b, _c, _d;
        if (!((_b = (_a = checkout === null || checkout === void 0 ? void 0 : checkout.shipping_fees) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length)) {
            return null;
        }
        return (h(Fragment, null, (_d = (_c = checkout === null || checkout === void 0 ? void 0 : checkout.shipping_fees) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.map(fee => (h("sc-line-item", { key: fee === null || fee === void 0 ? void 0 : fee.id }, h("span", { slot: "description" }, fee === null || fee === void 0 ? void 0 : fee.description), h("span", { slot: "price" }, fee === null || fee === void 0 ? void 0 : fee.display_amount))))));
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12;
        const shippingMethod = (_b = (_a = this.order) === null || _a === void 0 ? void 0 : _a.selected_shipping_choice) === null || _b === void 0 ? void 0 : _b.shipping_method;
        const shippingMethodName = shippingMethod === null || shippingMethod === void 0 ? void 0 : shippingMethod.name;
        return (h("div", { key: 'dce3f8ba5952f62c71d6ec8264ed8f58992c3b07', class: { 'line-item-totals': true } }, ((_c = this.order) === null || _c === void 0 ? void 0 : _c.subtotal_amount) !== ((_d = this.order) === null || _d === void 0 ? void 0 : _d.total_amount) && (h(Fragment, { key: '108b2f5fdd72a2cd0a2bd463ff76ff50d0a154d7' }, h("sc-line-item", { key: '25b7871c85defc673d040779e9a43a0fb4baf45d' }, h("span", { key: '89848e5f33b4b871b634123730415e6e56b09490', slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), h("span", { key: '7e7eab0d24bd99309e1e15c6e9822a9884621b16', slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, (_e = this.order) === null || _e === void 0 ? void 0 : _e.subtotal_display_amount)), this.renderCheckoutFees(this.order))), !!((_f = this.order) === null || _f === void 0 ? void 0 : _f.trial_amount) && (h("sc-line-item", { key: 'af2898d627bbd32b332494b184481965535beb5c' }, h("span", { key: '6261827c08fcca2173ed8fa884828636a9cca56c', slot: "description" }, wp.i18n.__('Trial', 'surecart')), h("span", { key: '6f214844ecc0a884f59c6e4e94fce73f796b0a7f', slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, (_g = this.order) === null || _g === void 0 ? void 0 : _g.trial_display_amount))), !!((_h = this.order) === null || _h === void 0 ? void 0 : _h.discounts) && (h("sc-line-item", { key: 'f3c90b0256059934e824226dcb8e14327e8c3fdb' }, h("span", { key: '620cdff0b910c2f0569d3b23708682573adb18fd', slot: "description" }, wp.i18n.__('Discounts', 'surecart')), h("span", { key: 'c12772bd9a022a7f8087efc92646fb0f5a0e30d9', slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, (_j = this.order) === null || _j === void 0 ? void 0 : _j.discounts_display))), !!((_m = (_l = (_k = this.order) === null || _k === void 0 ? void 0 : _k.discount) === null || _l === void 0 ? void 0 : _l.promotion) === null || _m === void 0 ? void 0 : _m.code) && (h("sc-line-item", { key: '5af33cb186e084b078484845ff217d5d79588231' }, h("span", { key: 'c9e893393d0e2839ca342c3d24a5122b9c511b46', slot: "description" }, wp.i18n.__('Discount', 'surecart'), h("br", { key: '7da7b5f9dd37b4cc05841c578158e35272772b2e' }), h("sc-tag", { key: '6ca31593dac5a43da6d34153a81c1e727c082125', type: "success" }, wp.i18n.__('Coupon:', 'surecart'), " ", (_q = (_p = (_o = this.order) === null || _o === void 0 ? void 0 : _o.discount) === null || _p === void 0 ? void 0 : _p.promotion) === null || _q === void 0 ? void 0 :
            _q.code)), h("span", { key: 'fb10e80cd262e2fb45213ba7a97c6b919add5281', slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, (_r = this.order) === null || _r === void 0 ? void 0 : _r.discounts_display_amount))), !!((_s = this.order) === null || _s === void 0 ? void 0 : _s.shipping_amount) && (h(Fragment, { key: 'd5945919111681404489446f0b033f3991cfccbd' }, h("sc-line-item", { key: '7f9cccf1abb9b441d28b1d96181cd2c664507960' }, h("span", { key: '713a505511ed3aff3190565062cf6bacf557bb0f', slot: "description" }, `${wp.i18n.__('Shipping', 'surecart')} ${shippingMethodName ? `(${shippingMethodName})` : ''}`), h("span", { key: '3d348e7acccf3457cfddd422b13af34b575e5870', slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, (_t = this.order) === null || _t === void 0 ? void 0 : _t.shipping_display_amount)), this.renderShippingFees(this.order))), getTaxLines(this.order).map(line => {
            var _a, _b;
            return (h("sc-line-item", { key: `${line.label}-${line.rate}` }, h("span", { slot: "description" }, `${formatTaxDisplay(line.label, ((_a = this.order) === null || _a === void 0 ? void 0 : _a.tax_status) === 'estimated')} ${formatTaxLineDetail(line)}`), h("span", { slot: "price" }, line.display_amount), !!((_b = this.order) === null || _b === void 0 ? void 0 : _b.tax_inclusive_amount) && h("span", { slot: "price-description" }, `(${wp.i18n.__('included', 'surecart')})`)));
        }), h("sc-divider", { key: '659ffff0a385b9fc3dad319c37a6faa43d3299ad', style: { '--spacing': 'var(--sc-spacing-x-small)' } }), h("sc-line-item", { key: '083550b49fe626394b6298673c5f9fd201fabc6c', style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, h("span", { key: '33cab95a42fba3373c39f676f495bb1d5b022ac8', slot: "title" }, wp.i18n.__('Total', 'surecart')), h("span", { key: '9b8187f0048995f1ceeb7210b8f90cfefc15f993', slot: "price" }, (_u = this.order) === null || _u === void 0 ? void 0 : _u.total_display_amount), h("span", { key: 'f6c6160e5e41a19b5d96fb335434f393fe410dd9', slot: "currency" }, (_v = this.order) === null || _v === void 0 ? void 0 : _v.currency)), !!((_w = this.order) === null || _w === void 0 ? void 0 : _w.proration_amount) && (h("sc-line-item", { key: '6ba4c5a573ca5045de014e22b3bfb8a57309abdb' }, h("span", { key: '381f13cdf93e7589bb9df8c4daacbd9a684c9c1f', slot: "description" }, wp.i18n.__('Proration', 'surecart')), h("span", { key: '8a228e4dadda166457569229086aa985d4113f90', slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, (_x = this.order) === null || _x === void 0 ? void 0 : _x.proration_display_amount))), !!((_y = this.order) === null || _y === void 0 ? void 0 : _y.applied_balance_amount) && (h("sc-line-item", { key: 'bc6b13c059141bd623df89cedb9f54c65f7bbed5' }, h("span", { key: '37d748c1f174550a8f19c00ebf59d32a42f953f8', slot: "description" }, wp.i18n.__('Applied Balance', 'surecart')), h("span", { key: '1741ea563febd7e5a342fbfeccb96abb44adbc52', style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            }, slot: "price" }, (_z = this.order) === null || _z === void 0 ? void 0 : _z.applied_balance_display_amount))), !!((_0 = this.order) === null || _0 === void 0 ? void 0 : _0.credited_balance_amount) && (h("sc-line-item", { key: '3de23973c218e28afda01ce98e3c614093e0e29c' }, h("span", { key: '5fff0f495c6af7339ff6051f50f0f901201d45eb', slot: "description" }, wp.i18n.__('Credited Balance', 'surecart')), h("span", { key: '3596e8a2dcaa9106782a4c336b08571c26302e55', slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, (_1 = this.order) === null || _1 === void 0 ? void 0 : _1.credited_balance_display_amount))), ((_2 = this.order) === null || _2 === void 0 ? void 0 : _2.amount_due) !== ((_3 = this.order) === null || _3 === void 0 ? void 0 : _3.total_amount) && (h("sc-line-item", { key: '9dd6d13b78bdd92c23f8bb55d7c427f0e753fb59', style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, h("span", { key: 'f8034720754feb4ccf8b981690093c309527bd9b', slot: "title" }, wp.i18n.__('Amount Due', 'surecart')), h("span", { key: '03d7ea8db0fbfd25085d17b628d5756bcd7deae5', slot: "price" }, (_4 = this.order) === null || _4 === void 0 ? void 0 : _4.amount_due_display_amount), h("span", { key: '724db8e9c9e2b5ed5543f6e70ff4df1b5e26f004', slot: "currency" }, (_5 = this.order) === null || _5 === void 0 ? void 0 : _5.currency))), h("sc-divider", { key: 'e08c7f6cde1bae8b03b54aa25738fb340361aaca', style: { '--spacing': 'var(--sc-spacing-x-small)' } }), !!((_6 = this.order) === null || _6 === void 0 ? void 0 : _6.paid_amount) && (h("sc-line-item", { key: '8fe72c8f8c93bacc3c725ab0aee9b0fdb8620418', style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, h("span", { key: 'e51b30bb87f52ce832914d528ea9bc89f15d42fb', slot: "title" }, wp.i18n.__('Paid', 'surecart')), h("span", { key: '36609c86eb644f18c602f74e828720863e91d272', slot: "price" }, (_7 = this.order) === null || _7 === void 0 ? void 0 : _7.paid_display_amount), h("span", { key: '49572b47d52f47cfad9047554b2ccafea891a2a4', slot: "currency" }, (_8 = this.order) === null || _8 === void 0 ? void 0 : _8.currency))), !!((_9 = this.order) === null || _9 === void 0 ? void 0 : _9.refunded_amount) && (h(Fragment, { key: '46473ebd5209700dfe1a806859082d9e8faf3edc' }, h("sc-line-item", { key: 'c68786e738176c34b63e18824e10693850d68497', style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, h("span", { key: '4b778092b4bf9180c26b31a5676a69227da1275c', slot: "description" }, wp.i18n.__('Refunded', 'surecart')), h("span", { key: 'ebf7c14b609ef92f5830d7d7988cd376e2b5598e', slot: "price" }, (_10 = this.order) === null || _10 === void 0 ? void 0 : _10.refunded_display_amount)), h("sc-line-item", { key: '4a0796a2421f63a5baf2c64fac0c6e3be58e8ea0', style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, h("span", { key: '02356ff77900ed170b3c56bc7be8c84a510cbc38', slot: "title" }, wp.i18n.__('Net Payment', 'surecart')), h("span", { key: 'c197dff8bf358c599fd9504a0f6c4786632679fd', slot: "price" }, (_11 = this.order) === null || _11 === void 0 ? void 0 : _11.net_paid_display_amount)))), ((_12 = this.order) === null || _12 === void 0 ? void 0 : _12.tax_reverse_charged_amount) > 0 && (h("sc-line-item", { key: '4e20861c60ddd7652a2ec6adb3f4a834a50beda8' }, h("span", { key: '32e6370d48514654afb99a20b561da7ffc0ee6d7', slot: "description" }, wp.i18n.__('*Tax to be paid on reverse charge basis', 'surecart'))))));
    }
};
openWormhole(ScOrderConfirmationTotals, ['order', 'busy', 'loading', 'empty'], false);
ScOrderConfirmationTotals.style = ScOrderConfirmationTotalsStyle0;

export { ScOrderConfirmationLineItems as sc_order_confirmation_line_items, ScOrderConfirmationTotals as sc_order_confirmation_totals };

//# sourceMappingURL=sc-order-confirmation-line-items_2.entry.js.map