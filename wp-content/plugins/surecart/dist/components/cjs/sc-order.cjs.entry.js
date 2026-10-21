'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
require('./fetch-5e8dc1d5.js');
const lazy = require('./lazy-2b509fa7.js');
const tax = require('./tax-1568db23.js');
const index$2 = require('./index-f3933112.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
const index$1 = require('./index-7ced8198.js');
require('./remove-query-args-b57e8cd3.js');

const scOrderCss = ":host{display:block}.order__row{padding:var(--sc-spacing-large);display:grid;gap:var(--sc-spacing-small)}";
const ScOrderStyle0 = scOrderCss;

const ScOrder = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.orderId = undefined;
        this.customerIds = undefined;
        this.heading = undefined;
        this.order = undefined;
        this.purchases = undefined;
        this.loading = undefined;
        this.busy = undefined;
        this.error = undefined;
    }
    /** Only fetch if visible */
    componentDidLoad() {
        lazy.onFirstVisible(this.el, () => {
            this.fetchOrder();
            this.fetchDownloads();
        });
    }
    async fetchOrder() {
        try {
            this.loading = true;
            await this.getOrder();
        }
        catch (e) {
            console.error(this.error);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.loading = false;
        }
    }
    async fetchDownloads() {
        try {
            this.busy = true;
            this.purchases = (await index$1.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/purchases`, {
                    expand: ['product', 'product.downloads', 'download.media'],
                    order_ids: [this.orderId],
                    customer_ids: this.customerIds,
                    downloadable: true,
                    revoked: false,
                }),
            }));
        }
        catch (e) {
            console.error(this.error);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    /** Get order */
    async getOrder() {
        this.order = (await index$1.apiFetch({
            path: addQueryArgs.addQueryArgs(`surecart/v1/orders/${this.orderId}`, {
                expand: [
                    'checkout',
                    'checkout.checkout_fees',
                    'checkout.shipping_fees',
                    'checkout.line_items',
                    'line_item.price',
                    'line_item.fees',
                    'line_item.variant',
                    'line_item.component_line_items',
                    'variant.image',
                    'price.product',
                    'checkout.manual_payment_method',
                    'checkout.payment_method',
                    'checkout.selected_shipping_choice',
                    'shipping_choice.shipping_method',
                    'payment_method.card',
                    'payment_method.payment_instrument',
                    'payment_method.paypal_account',
                    'payment_method.bank_account',
                    'checkout.discount',
                    'discount.promotion',
                    'checkout.charge',
                ],
            }),
        }));
    }
    renderLoading() {
        return (index.h("sc-flex", { flexDirection: "column", style: { gap: '1em' } }, index.h("sc-skeleton", { style: { width: '20%', display: 'inline-block' } }), index.h("sc-skeleton", { style: { width: '60%', display: 'inline-block' } }), index.h("sc-skeleton", { style: { width: '40%', display: 'inline-block' } })));
    }
    renderCheckoutFees(checkout) {
        var _a, _b, _c, _d;
        if (!((_b = (_a = checkout === null || checkout === void 0 ? void 0 : checkout.checkout_fees) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length)) {
            return null;
        }
        return (index.h(index.Fragment, null, (_d = (_c = checkout === null || checkout === void 0 ? void 0 : checkout.checkout_fees) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.map(fee => (index.h("sc-line-item", { key: fee.id }, index.h("span", { slot: "description" }, fee.description), index.h("span", { slot: "price" }, fee.display_amount))))));
    }
    renderShippingFees(checkout) {
        var _a, _b, _c, _d;
        if (!((_b = (_a = checkout === null || checkout === void 0 ? void 0 : checkout.shipping_fees) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length)) {
            return null;
        }
        return (index.h(index.Fragment, null, (_d = (_c = checkout === null || checkout === void 0 ? void 0 : checkout.shipping_fees) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.map(fee => (index.h("sc-line-item", { key: fee.id }, index.h("span", { slot: "description" }, fee.description), index.h("span", { slot: "price" }, fee.display_amount))))));
    }
    renderEmpty() {
        return index.h("sc-empty", { icon: "shopping-bag" }, wp.i18n.__('Order not found.', 'surecart'));
    }
    renderContent() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this.loading) {
            return this.renderLoading();
        }
        if (!((_a = this.order) === null || _a === void 0 ? void 0 : _a.id)) {
            return this.renderEmpty();
        }
        const checkout = (_b = this.order) === null || _b === void 0 ? void 0 : _b.checkout;
        const shippingMethod = (_c = checkout === null || checkout === void 0 ? void 0 : checkout.selected_shipping_choice) === null || _c === void 0 ? void 0 : _c.shipping_method;
        const shippingMethodName = shippingMethod === null || shippingMethod === void 0 ? void 0 : shippingMethod.name;
        const items = (((_d = checkout === null || checkout === void 0 ? void 0 : checkout.line_items) === null || _d === void 0 ? void 0 : _d.data) || []);
        const { regular, bundleParents, componentsByParent } = index$2.groupBundleLineItems(items);
        const orderedItems = [...bundleParents, ...regular];
        return (index.h(index.Fragment, null, orderedItems.map(item => {
            var _a, _b, _c, _d, _e, _f;
            const product = (_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.product;
            const isBundle = !!(product === null || product === void 0 ? void 0 : product.bundle);
            return (index.h("sc-product-line-item", { key: item.id, image: item === null || item === void 0 ? void 0 : item.image, name: product === null || product === void 0 ? void 0 : product.name, price: (_b = item === null || item === void 0 ? void 0 : item.price) === null || _b === void 0 ? void 0 : _b.name, variant: item === null || item === void 0 ? void 0 : item.variant_display_options, editable: false, removable: false, quantity: item.quantity, note: item === null || item === void 0 ? void 0 : item.display_note, amount: item.subtotal_display_amount, trial: (_c = item === null || item === void 0 ? void 0 : item.price) === null || _c === void 0 ? void 0 : _c.trial_text, interval: `${(_d = item === null || item === void 0 ? void 0 : item.price) === null || _d === void 0 ? void 0 : _d.short_interval_text} ${(_e = item === null || item === void 0 ? void 0 : item.price) === null || _e === void 0 ? void 0 : _e.short_interval_count_text}`, scratch: item === null || item === void 0 ? void 0 : item.scratch_display_amount, purchasableStatus: item === null || item === void 0 ? void 0 : item.purchasable_status_display, fees: (_f = item === null || item === void 0 ? void 0 : item.fees) === null || _f === void 0 ? void 0 : _f.data, reviewButtonLink: (product === null || product === void 0 ? void 0 : product.review_url) || '', bundleComponents: isBundle ? componentsByParent[item.id] || [] : [] }));
        }), (checkout === null || checkout === void 0 ? void 0 : checkout.subtotal_amount) !== (checkout === null || checkout === void 0 ? void 0 : checkout.total_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), index.h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.subtotal_display_amount))), this.renderCheckoutFees(checkout), !!(checkout === null || checkout === void 0 ? void 0 : checkout.trial_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Trial', 'surecart')), index.h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.trial_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.discounts) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Discounts', 'surecart')), index.h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.discounts_display))), !!((_f = (_e = checkout === null || checkout === void 0 ? void 0 : checkout.discount) === null || _e === void 0 ? void 0 : _e.promotion) === null || _f === void 0 ? void 0 : _f.code) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Discount', 'surecart'), index.h("br", null), index.h("sc-tag", { type: "success" }, wp.i18n.__('Coupon:', 'surecart'), " ", (_h = (_g = checkout === null || checkout === void 0 ? void 0 : checkout.discount) === null || _g === void 0 ? void 0 : _g.promotion) === null || _h === void 0 ? void 0 :
            _h.code)), index.h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.discounts_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.shipping_amount) && (index.h(index.Fragment, null, index.h("sc-line-item", null, index.h("span", { slot: "description" }, `${wp.i18n.__('Shipping', 'surecart')} ${shippingMethodName ? `(${shippingMethodName})` : ''}`), index.h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.shipping_display_amount)), this.renderShippingFees(checkout))), tax.getTaxLines(checkout).map(line => (index.h("sc-line-item", { key: `${line.label}-${line.rate}` }, index.h("span", { slot: "description" }, `${tax.formatTaxDisplay(line.label, (checkout === null || checkout === void 0 ? void 0 : checkout.tax_status) === 'estimated')} ${tax.formatTaxLineDetail(line)}`), index.h("span", { slot: "price" }, line.display_amount), !!(checkout === null || checkout === void 0 ? void 0 : checkout.tax_inclusive_amount) && index.h("span", { slot: "price-description" }, `(${wp.i18n.__('included', 'surecart')})`)))), index.h("sc-divider", { style: { '--spacing': 'var(--sc-spacing-x-small)' } }), index.h("sc-line-item", { style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, index.h("span", { slot: "title" }, wp.i18n.__('Total', 'surecart')), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.total_display_amount), index.h("span", { slot: "currency" }, checkout === null || checkout === void 0 ? void 0 : checkout.currency)), !!(checkout === null || checkout === void 0 ? void 0 : checkout.proration_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Proration', 'surecart')), index.h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.proration_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.applied_balance_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Applied Balance', 'surecart')), index.h("span", { style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            }, slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.applied_balance_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.credited_balance_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Credited Balance', 'surecart')), index.h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.credited_balance_display_amount))), (checkout === null || checkout === void 0 ? void 0 : checkout.amount_due) !== (checkout === null || checkout === void 0 ? void 0 : checkout.total_amount) && (index.h("sc-line-item", { style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, index.h("span", { slot: "title" }, wp.i18n.__('Amount Due', 'surecart')), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.amount_due_display_amount), index.h("span", { slot: "currency" }, checkout === null || checkout === void 0 ? void 0 : checkout.currency))), index.h("sc-divider", { style: { '--spacing': 'var(--sc-spacing-x-small)' } }), !!(checkout === null || checkout === void 0 ? void 0 : checkout.paid_amount) && (index.h("sc-line-item", { style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, index.h("span", { slot: "title" }, wp.i18n.__('Paid', 'surecart')), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.paid_display_amount), index.h("span", { slot: "currency" }, checkout === null || checkout === void 0 ? void 0 : checkout.currency))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.refunded_amount) && (index.h(index.Fragment, null, index.h("sc-line-item", { style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, index.h("span", { slot: "description" }, wp.i18n.__('Refunded', 'surecart')), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.refunded_display_amount)), index.h("sc-line-item", { style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, index.h("span", { slot: "title" }, wp.i18n.__('Net Payment', 'surecart')), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.net_paid_display_amount)))), (checkout === null || checkout === void 0 ? void 0 : checkout.tax_reverse_charged_amount) > 0 && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('*Tax to be paid on reverse charge basis', 'surecart'))))));
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        const checkout = (_a = this === null || this === void 0 ? void 0 : this.order) === null || _a === void 0 ? void 0 : _a.checkout;
        const manualPaymentMethod = checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment_method;
        return (index.h("sc-spacing", { key: '37bf33246032dff2d4a0c2bfee75eb6082e316cc', style: { '--spacing': 'var(--sc-spacing-large)' } }, index.h("sc-dashboard-module", { key: 'f1deadb57e329989221ef6782acbc8c92576acda', error: this.error }, index.h("span", { key: '3d0b77068ea4904c6e7ec96819e5cfcb55abd60f', slot: "heading" }, this.loading ? index.h("sc-skeleton", { style: { width: '120px' } }) : `#${(_b = this === null || this === void 0 ? void 0 : this.order) === null || _b === void 0 ? void 0 : _b.number}`), !this.loading && !(checkout === null || checkout === void 0 ? void 0 : checkout.live_mode) && (index.h("sc-tag", { key: '29adb07821a34f23e390482fe5e6cda4e6852a09', type: "warning", slot: "end" }, wp.i18n.__('Test Mode', 'surecart'))), !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name) && !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions) && (index.h("sc-order-manual-instructions", { key: '93ee6dd4c2227516af35053217b8009e7a157fb5', manualPaymentTitle: manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name, manualPaymentInstructions: manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions })), index.h("sc-card", { key: 'ecd793c71d425b39e82fc76f5c41d52eccc62f51', "no-padding": !this.loading }, this.loading ? (this.renderLoading()) : (index.h(index.Fragment, null, index.h("sc-stacked-list", null, index.h("sc-stacked-list-row", { style: { '--columns': '2' } }, index.h("div", null, wp.i18n.__('Order Status', 'surecart')), index.h("sc-order-status-badge", { status: (_c = this === null || this === void 0 ? void 0 : this.order) === null || _c === void 0 ? void 0 : _c.status })), index.h("sc-stacked-list-row", { style: { '--columns': '2' } }, index.h("div", null, wp.i18n.__('Date', 'surecart')), index.h("span", null, (_d = this.order) === null || _d === void 0 ? void 0 : _d.created_at_date)), index.h("sc-stacked-list-row", { style: { '--columns': '2' } }, index.h("div", null, wp.i18n.__('Payment Method', 'surecart')), index.h("sc-payment-method", { paymentMethod: checkout === null || checkout === void 0 ? void 0 : checkout.payment_method })), index.h("div", { class: "order__row" }, this.renderContent())))))), ((_e = this.order) === null || _e === void 0 ? void 0 : _e.statement_url) && (index.h("sc-button", { key: 'c507b98f2f28ffaca850a364fa397e8a7ca5317d', type: "primary", href: addQueryArgs.addQueryArgs((_f = this.order) === null || _f === void 0 ? void 0 : _f.statement_url, { receipt: true }), target: "_blank" }, index.h("sc-icon", { key: 'd25352bd9171674dd690b96f3155506cd9e0563d', name: "inbox", slot: "prefix" }), wp.i18n.__('Download Receipt', 'surecart'))), !!((_g = this.purchases) === null || _g === void 0 ? void 0 : _g.length) && index.h("sc-purchase-downloads-list", { key: '981b8e00aa51da78bda0ffc91154f5166478c030', heading: wp.i18n.__('Downloads', 'surecart'), purchases: this.purchases })));
    }
    get el() { return index.getElement(this); }
};
ScOrder.style = ScOrderStyle0;

exports.sc_order = ScOrder;

//# sourceMappingURL=sc-order.cjs.entry.js.map