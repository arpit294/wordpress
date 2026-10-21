import { r as registerInstance, h, F as Fragment, a as getElement } from './index-25e5af33.js';
import './fetch-cdff67be.js';
import { o as onFirstVisible } from './lazy-deb42890.js';
import { g as getTaxLines, f as formatTaxDisplay, a as formatTaxLineDetail } from './tax-0d5a82ff.js';
import { p as productNameWithPrice } from './price-39d60d32.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import { a as apiFetch } from './index-824c562b.js';
import './remove-query-args-938c53ea.js';
import './currency-eb33deae.js';

const scUpcomingInvoiceCss = ":host{display:block;position:relative}.upcoming-invoice{display:grid;gap:var(--sc-spacing-large)}.upcoming-invoice>*{display:grid;gap:var(--sc-spacing-medium)}.new-plan{display:grid;gap:0.25em;color:var(--sc-input-label-color)}.new-plan__heading{font-weight:var(--sc-font-weight-bold)}";
const ScUpcomingInvoiceStyle0 = scUpcomingInvoiceCss;

const ScUpcomingInvoice = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.heading = undefined;
        this.successUrl = undefined;
        this.subscriptionId = undefined;
        this.priceId = undefined;
        this.variantId = undefined;
        this.quantity = undefined;
        this.discount = undefined;
        this.payment_method = undefined;
        this.quantityUpdatesEnabled = true;
        this.adHocAmount = undefined;
        this.loading = undefined;
        this.busy = undefined;
        this.error = undefined;
        this.price = undefined;
        this.invoice = undefined;
        this.couponError = undefined;
    }
    componentWillLoad() {
        onFirstVisible(this.el, () => {
            this.fetchItems();
        });
    }
    isFutureInvoice() {
        return this.invoice.start_at >= new Date().getTime() / 1000;
    }
    async fetchItems() {
        var _a, _b;
        try {
            this.loading = true;
            await Promise.all([this.getInvoice(), this.getPrice()]);
        }
        catch (e) {
            console.error(e);
            this.error = ((_b = (_a = e === null || e === void 0 ? void 0 : e.additional_errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.loading = false;
        }
    }
    async getPrice() {
        if (!this.priceId)
            return;
        this.price = (await apiFetch({
            path: addQueryArgs(`surecart/v1/prices/${this.priceId}`, {
                expand: ['product'],
            }),
        }));
    }
    async getInvoice() {
        if (!this.subscriptionId)
            return;
        this.invoice = (await apiFetch({
            method: 'PATCH',
            path: addQueryArgs(`surecart/v1/subscriptions/${this.subscriptionId}/upcoming_period/`, {
                expand: [
                    'period.checkout',
                    'checkout.line_items',
                    'checkout.checkout_fees',
                    'checkout.shipping_fees',
                    'line_item.price',
                    'line_item.fees',
                    'price.product',
                    'checkout.payment_method',
                    'checkout.manual_payment_method',
                    'checkout.discount',
                    'discount.promotion',
                    'discount.coupon',
                    'payment_method.card',
                    'payment_method.payment_instrument',
                    'payment_method.paypal_account',
                    'payment_method.bank_account',
                ],
            }),
            data: {
                price: this.priceId,
                variant: this.variantId,
                quantity: this.quantity,
                ...(this.adHocAmount ? { ad_hoc_amount: this.adHocAmount } : {}),
                ...(this.discount ? { discount: this.discount } : {}),
            },
        }));
        return this.invoice;
    }
    async applyCoupon(e) {
        try {
            this.couponError = '';
            this.busy = true;
            this.discount = {
                promotion_code: e.detail,
            };
            await this.getInvoice();
        }
        catch (e) {
            this.couponError = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    async updateQuantity(e) {
        try {
            this.error = '';
            this.busy = true;
            this.quantity = e.detail;
            await this.getInvoice();
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    async onSubmit() {
        try {
            this.error = '';
            this.busy = true;
            await apiFetch({
                path: `surecart/v1/subscriptions/${this.subscriptionId}`,
                method: 'PATCH',
                data: {
                    price: this.priceId,
                    quantity: this.quantity,
                    variant: this.variantId,
                    ...(this.adHocAmount ? { ad_hoc_amount: this.adHocAmount } : {}),
                    ...(this.discount ? { discount: this.discount } : {}),
                },
            });
            if (this.successUrl) {
                window.location.assign(this.successUrl);
            }
            else {
                this.busy = false;
            }
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
            this.busy = false;
        }
    }
    renderName(price) {
        if (typeof (price === null || price === void 0 ? void 0 : price.product) !== 'string') {
            return productNameWithPrice(price);
        }
        return wp.i18n.__('Plan', 'surecart');
    }
    renderRenewalText() {
        var _a;
        if (this.isFutureInvoice()) {
            return (h("div", null, wp.i18n.__("You'll be switched to this plan", 'surecart'), ' ', h("strong", null, wp.i18n.__('at the end of your billing cycle on', 'surecart'), " ", (_a = this.invoice) === null || _a === void 0 ? void 0 :
                _a.start_at_date)));
        }
        return (h("div", null, wp.i18n.__("You'll be switched to this plan", 'surecart'), " ", h("strong", null, wp.i18n.__('immediately', 'surecart'))));
    }
    renderEmpty() {
        return h("slot", { name: "empty" }, wp.i18n.__('Something went wrong.', 'surecart'));
    }
    renderLoading() {
        return (h("div", null, h("sc-skeleton", { style: { width: '30%', marginBottom: '0.75em' } }), h("sc-skeleton", { style: { width: '20%', marginBottom: '0.75em' } }), h("sc-skeleton", { style: { width: '40%' } })));
    }
    renderContent() {
        var _a;
        if (this.loading) {
            return this.renderLoading();
        }
        if (!((_a = this.invoice) === null || _a === void 0 ? void 0 : _a.checkout)) {
            return this.renderEmpty();
        }
        const checkout = this.invoice.checkout;
        return (h("div", { class: "new-plan" }, h("div", { class: "new-plan__heading" }, this.renderName(this.price)), h("div", null, h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.subtotal_display_amount)), h("div", { style: { fontSize: 'var(--sc-font-size-small)' } }, this.renderRenewalText())));
    }
    renderSummary() {
        var _a, _b, _c, _d;
        if (this.loading) {
            return this.renderLoading();
        }
        if (!this.invoice) {
            return this.renderEmpty();
        }
        const checkout = (_a = this.invoice) === null || _a === void 0 ? void 0 : _a.checkout;
        const manualPaymentMethod = (checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment) ? checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment_method : null;
        const checkout_fees = (_b = checkout === null || checkout === void 0 ? void 0 : checkout.checkout_fees) === null || _b === void 0 ? void 0 : _b.data;
        const shipping_fees = (_c = checkout === null || checkout === void 0 ? void 0 : checkout.shipping_fees) === null || _c === void 0 ? void 0 : _c.data;
        return (h(Fragment, null, (_d = checkout === null || checkout === void 0 ? void 0 : checkout.line_items) === null || _d === void 0 ? void 0 :
            _d.data.map(item => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return (h("sc-product-line-item", { image: (_b = (_a = item.price) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.line_item_image, name: (_d = (_c = item.price) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.name, price: (_e = item === null || item === void 0 ? void 0 : item.price) === null || _e === void 0 ? void 0 : _e.name, variant: item === null || item === void 0 ? void 0 : item.variant_display_options, editable: this.quantityUpdatesEnabled, purchasableStatus: item === null || item === void 0 ? void 0 : item.purchasable_status_display, removable: false, note: item === null || item === void 0 ? void 0 : item.display_note, quantity: item === null || item === void 0 ? void 0 : item.quantity, amount: item === null || item === void 0 ? void 0 : item.subtotal_display_amount, interval: `${(_f = item === null || item === void 0 ? void 0 : item.price) === null || _f === void 0 ? void 0 : _f.short_interval_text} ${(_g = item === null || item === void 0 ? void 0 : item.price) === null || _g === void 0 ? void 0 : _g.short_interval_count_text}`, onScUpdateQuantity: e => this.updateQuantity(e), fees: (_h = item === null || item === void 0 ? void 0 : item.fees) === null || _h === void 0 ? void 0 : _h.data }));
            }), h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.subtotal_display_amount)), !!checkout.proration_amount && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Proration Credit', 'surecart')), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.proration_display_amount))), !!checkout.applied_balance_amount && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Applied Balance', 'surecart')), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.applied_balance_display_amount))), (checkout_fees === null || checkout_fees === void 0 ? void 0 : checkout_fees.length) > 0 && (h(Fragment, null, checkout_fees === null || checkout_fees === void 0 ? void 0 : checkout_fees.map(fee => (h("sc-line-item", null, h("span", { slot: "description" }, fee === null || fee === void 0 ? void 0 : fee.description), h("span", { slot: "price" }, fee === null || fee === void 0 ? void 0 : fee.display_amount)))))), !!checkout.trial_amount && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Trial', 'surecart')), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.trial_display_amount))), h("sc-coupon-form", { discount: checkout === null || checkout === void 0 ? void 0 : checkout.discount, discountsDisplayAmount: checkout === null || checkout === void 0 ? void 0 : checkout.discounts_display_amount, label: wp.i18n.__('Add Coupon Code', 'surecart'), onScApplyCoupon: e => this.applyCoupon(e), error: this.couponError, collapsed: true, buttonText: wp.i18n.__('Add Coupon Code', 'surecart') }), !!(checkout === null || checkout === void 0 ? void 0 : checkout.shipping_amount) && (h(Fragment, null, h("sc-line-item", { style: { marginTop: 'var(--sc-spacing-small)' } }, h("span", { slot: "description" }, wp.i18n.__('Shipping', 'surecart')), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.shipping_display_amount)), (shipping_fees === null || shipping_fees === void 0 ? void 0 : shipping_fees.length) > 0 && (h(Fragment, null, shipping_fees === null || shipping_fees === void 0 ? void 0 : shipping_fees.map(fee => (h("sc-line-item", null, h("span", { slot: "description" }, fee === null || fee === void 0 ? void 0 : fee.description), h("span", { slot: "price" }, fee === null || fee === void 0 ? void 0 : fee.display_amount)))))))), getTaxLines(checkout).map((line, _, lines) => (h("sc-line-item", { key: `${line.label}-${line.rate}` }, h("span", { slot: "description" }, lines.length > 1 ? `${formatTaxDisplay(line.label)} ${formatTaxLineDetail(line)}` : formatTaxDisplay(line.label)), h("span", { slot: "price" }, line.display_amount)))), h("sc-divider", { style: { '--spacing': '0' } }), h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Payment', 'surecart')), h("a", { href: addQueryArgs(window.location.href, {
                action: 'payment',
            }), slot: "price-description" }, h("sc-flex", { "justify-content": "flex-start", "align-items": "center", style: { '--spacing': '0.5em' } }, !!manualPaymentMethod && h("sc-manual-payment-method", { paymentMethod: manualPaymentMethod }), !manualPaymentMethod && h("sc-payment-method", { paymentMethod: checkout === null || checkout === void 0 ? void 0 : checkout.payment_method }), h("sc-icon", { name: "edit-3" })))), h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, h("span", { slot: "title" }, wp.i18n.__('Total Due', 'surecart')), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.amount_due_display_amount), h("span", { slot: "currency" }, checkout.currency))));
    }
    render() {
        return (h("div", { key: '994e4674f13c1102cce91e32debe17f10d5fff78', class: "upcoming-invoice" }, this.error && (h("sc-alert", { key: '10571e0391c553b9c0bd55c82a57a7c4d858def3', open: !!this.error, type: "danger" }, h("span", { key: '57496037546b0e64c79a89f3e6f015bbb63a976a', slot: "title" }, wp.i18n.__('Error', 'surecart')), this.error)), h(Fragment, { key: 'e0d516ceda369a6738395c9f804551a6d2bf0f2c' }, h("sc-dashboard-module", { key: 'e4eb56418146d529230ab63a66b2118ad085ad0f', heading: wp.i18n.__('New Plan', 'surecart'), class: "plan-preview", error: this.error }, h("sc-card", { key: 'cd1034d1569a2bcfd1cb1a939ccd307c153725de' }, this.renderContent())), h("sc-dashboard-module", { key: '00ee13ad64fd814671c8ad44bb969f152b3fb067', heading: wp.i18n.__('Summary', 'surecart'), class: "plan-summary" }, h("sc-form", { key: '1e5d9a4b02673369c644719a3fc5b9fa83f27549', onScFormSubmit: () => this.onSubmit() }, h("sc-card", { key: 'b05da08755e32811a645469b91e58c8db5f7c23b' }, this.renderSummary()), h("sc-button", { key: 'c9e09b546e82ec2e96cbf84c2aebcb3c61a741d0', type: "primary", full: true, submit: true, loading: this.loading || this.busy, disabled: this.loading || this.busy }, wp.i18n.__('Confirm', 'surecart')))), h("sc-text", { key: '15a37643b1139bc9e6e955c56f353829b3b82151', style: { '--text-align': 'center', '--font-size': 'var(--sc-font-size-small)', '--line-height': 'var(--sc-line-height-normal)' } }, h("slot", { key: '37bd18191d6ee96447ad079697e25aa6a2926b40', name: "terms" }))), this.busy && h("sc-block-ui", { key: '0dfe990352964dad214f73bbe1807438400a6ae4' })));
    }
    get el() { return getElement(this); }
};
ScUpcomingInvoice.style = ScUpcomingInvoiceStyle0;

export { ScUpcomingInvoice as sc_upcoming_invoice };

//# sourceMappingURL=sc-upcoming-invoice.entry.js.map