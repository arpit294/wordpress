import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host } from './index-25e5af33.js';
import './fetch-cdff67be.js';
import { a as apiFetch } from './index-824c562b.js';
import { g as getTaxLines, f as formatTaxDisplay, a as formatTaxLineDetail } from './tax-0d5a82ff.js';
import { a as groupBundleLineItems } from './index-17aac936.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';

const scCancelDialogCss = ":host{display:block;font-size:var(--sc-font-size-medium)}.close__button{position:absolute;top:0;right:0;font-size:22px}";
const ScCancelDialogStyle0 = scCancelDialogCss;

const ScCancelDialog = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.scRequestClose = createEvent(this, "scRequestClose", 7);
        this.scRefresh = createEvent(this, "scRefresh", 7);
        this.open = undefined;
        this.protocol = undefined;
        this.subscription = undefined;
        this.reasons = undefined;
        this.reason = undefined;
        this.step = 'cancel';
        this.comment = undefined;
    }
    close() {
        this.reset();
        this.trackAttempt();
        this.scRequestClose.emit('close-button');
    }
    reset() {
        var _a;
        this.reason = null;
        this.step = ((_a = this.protocol) === null || _a === void 0 ? void 0 : _a.preservation_enabled) ? 'survey' : 'cancel';
    }
    async trackAttempt() {
        var _a, _b;
        if (!((_a = this.protocol) === null || _a === void 0 ? void 0 : _a.preservation_enabled))
            return;
        await apiFetch({
            method: 'PATCH',
            path: `surecart/v1/subscriptions/${(_b = this.subscription) === null || _b === void 0 ? void 0 : _b.id}/preserve`,
        });
    }
    componentWillLoad() {
        this.reset();
    }
    render() {
        return (h("sc-dialog", { key: '6f739eb67e29074b5f3b74579d5c158f65ffa0a6', style: {
                '--width': this.step === 'survey' ? '675px' : '500px',
                '--body-spacing': 'var(--sc-spacing-xxx-large)',
            }, noHeader: true, open: this.open, onScRequestClose: () => this.close() }, h("div", { key: '8d1c14f6d21fda584efcd9985c3a01cfbde1b53a', class: {
                cancel: true,
            } }, h("sc-button", { key: '7cefe48a690e6959f215e524cf4974002cd9bee1', class: "close__button", type: "text", circle: true, onClick: () => this.close() }, h("sc-icon", { key: 'bf63e00d561c0264342591a57e00525ab0183335', name: "x" })), this.step === 'cancel' && (h("sc-subscription-cancel", { key: '6b61cabbc906a95bfe9a7f69faaef32f11130fed', subscription: this.subscription, protocol: this.protocol, reason: this.reason, comment: this.comment, onScAbandon: () => this.close(), onScCancelled: () => {
                this.scRefresh.emit();
                this.reset();
                this.scRequestClose.emit('close-button');
            } }, h("slot", { key: '0c5188532cc3066e09082b5b5aea0d6807a80f2b', name: "cancel-popup-content", slot: "cancel-popup-content" }))), this.step === 'survey' && (h("sc-cancel-survey", { key: '14d85dfba9b4bb6e14c87ad68dd5732c3ad2a6a3', protocol: this.protocol, onScAbandon: () => this.close(), onScSubmitReason: e => {
                const { comment, reason } = e.detail;
                this.reason = reason;
                this.comment = comment;
                this.step = (reason === null || reason === void 0 ? void 0 : reason.coupon_enabled) ? 'discount' : 'cancel';
            } })), this.step === 'discount' && (h("sc-cancel-discount", { key: '4705633b478d8a55ce47306b0675143ce5f0c604', protocol: this.protocol, subscription: this.subscription, reason: this.reason, comment: this.comment, onScCancel: () => (this.step = 'cancel'), onScPreserved: () => {
                this.scRefresh.emit();
                this.reset();
                this.scRequestClose.emit('close-button');
            } })))));
    }
};
ScCancelDialog.style = ScCancelDialogStyle0;

const ScSubscriptionNextPayment = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.subscription = undefined;
        this.updatePaymentMethodUrl = undefined;
        this.period = undefined;
        this.loading = true;
        this.error = undefined;
        this.details = undefined;
    }
    componentWillLoad() {
        this.fetch();
    }
    handleSubscriptionChange() {
        this.fetch();
    }
    async fetch() {
        var _a, _b, _c;
        if (((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.cancel_at_period_end) && this.subscription.current_period_end_at) {
            this.loading = false;
            return;
        }
        if (((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.status) === 'canceled') {
            this.loading = false;
            return;
        }
        try {
            this.loading = true;
            this.period = (await apiFetch({
                method: 'PATCH',
                path: addQueryArgs(`surecart/v1/subscriptions/${(_c = this.subscription) === null || _c === void 0 ? void 0 : _c.id}/upcoming_period`, {
                    skip_product_group_validation: true,
                    expand: [
                        'period.checkout',
                        'checkout.line_items',
                        'checkout.checkout_fees',
                        'checkout.shipping_fees',
                        'checkout.payment_method',
                        'checkout.manual_payment_method',
                        'payment_method.card',
                        'payment_method.payment_instrument',
                        'payment_method.paypal_account',
                        'payment_method.bank_account',
                        'line_item.price',
                        'line_item.fees',
                        'line_item.component_line_items',
                        'price.product',
                        'period.subscription',
                    ],
                }),
                data: {
                    purge_pending_update: false,
                },
            }));
        }
        catch (e) {
            console.error(e);
            this.error = e;
        }
        finally {
            this.loading = false;
        }
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        if (this.loading) {
            return (h("sc-toggle", { borderless: true, disabled: true }, h("sc-flex", { slot: "summary", flexDirection: "column" }, h("sc-skeleton", { style: { width: '200px' } }), h("sc-skeleton", { style: { width: '400px' } }), h("sc-skeleton", { style: { width: '300px' } }))));
        }
        const checkout = (_a = this === null || this === void 0 ? void 0 : this.period) === null || _a === void 0 ? void 0 : _a.checkout;
        if (!checkout)
            return (h("div", { style: { padding: 'var(--sc-spacing-medium)' } }, h("sc-subscription-details", { slot: "summary", subscription: this.subscription })));
        const manualPaymentMethod = (checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment) ? checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment_method : null;
        const paymentMethodExists = (this === null || this === void 0 ? void 0 : this.subscription.payment_method) || (this === null || this === void 0 ? void 0 : this.subscription.manual_payment);
        const checkout_fees = (_b = checkout === null || checkout === void 0 ? void 0 : checkout.checkout_fees) === null || _b === void 0 ? void 0 : _b.data;
        const shipping_fees = (_c = checkout === null || checkout === void 0 ? void 0 : checkout.shipping_fees) === null || _c === void 0 ? void 0 : _c.data;
        return (h(Host, null, h("sc-toggle", { borderless: true, shady: true }, h("span", { slot: "summary" }, h("sc-subscription-details", { subscription: this.subscription }, h("div", { style: { fontSize: 'var(--sc-font-size-small)' } }, wp.i18n.__('Your next payment is', 'surecart'), " ", h("strong", null, checkout === null || checkout === void 0 ? void 0 : checkout.amount_due_display_amount), ' ', !!((_d = this.subscription) === null || _d === void 0 ? void 0 : _d.remaining_period_text) && `— ${(_e = this.subscription) === null || _e === void 0 ? void 0 : _e.remaining_period_text}`))), h("sc-card", { noPadding: true, borderless: true }, (() => {
            var _a;
            const items = (((_a = checkout === null || checkout === void 0 ? void 0 : checkout.line_items) === null || _a === void 0 ? void 0 : _a.data) || []);
            const { regular, bundleParents, componentsByParent } = groupBundleLineItems(items);
            const orderedItems = [...bundleParents, ...regular];
            return orderedItems.map(item => {
                var _a, _b, _c, _d, _e;
                const product = (_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.product;
                const isBundle = !!(product === null || product === void 0 ? void 0 : product.bundle);
                return (h("sc-product-line-item", { key: item.id, image: product === null || product === void 0 ? void 0 : product.line_item_image, name: product === null || product === void 0 ? void 0 : product.name, price: (_b = item === null || item === void 0 ? void 0 : item.price) === null || _b === void 0 ? void 0 : _b.name, variant: item === null || item === void 0 ? void 0 : item.variant_display_options, editable: false, removable: false, note: item === null || item === void 0 ? void 0 : item.display_note, scratchDisplayAmount: item === null || item === void 0 ? void 0 : item.scratch_display_amount, displayAmount: item === null || item === void 0 ? void 0 : item.subtotal_display_amount, quantity: item === null || item === void 0 ? void 0 : item.quantity, amount: item === null || item === void 0 ? void 0 : item.subtotal_display_amount, interval: `${(_c = item === null || item === void 0 ? void 0 : item.price) === null || _c === void 0 ? void 0 : _c.short_interval_text} ${(_d = item === null || item === void 0 ? void 0 : item.price) === null || _d === void 0 ? void 0 : _d.short_interval_count_text}`, purchasableStatus: item === null || item === void 0 ? void 0 : item.purchasable_status_display, fees: (_e = item === null || item === void 0 ? void 0 : item.fees) === null || _e === void 0 ? void 0 : _e.data, bundleComponents: isBundle ? componentsByParent[item.id] || [] : [] }));
            });
        })(), h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), h("span", { slot: "price-description" }, checkout === null || checkout === void 0 ? void 0 : checkout.subtotal_display_amount)), !!checkout.proration_amount && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Proration Credit', 'surecart')), h("span", { slot: "price-description" }, checkout === null || checkout === void 0 ? void 0 : checkout.proration_display_amount))), !!checkout.applied_balance_amount && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Applied Balance', 'surecart')), h("span", { slot: "price-description" }, checkout === null || checkout === void 0 ? void 0 : checkout.applied_balance_display_amount))), (checkout_fees === null || checkout_fees === void 0 ? void 0 : checkout_fees.length) > 0 && (h(Fragment, null, checkout_fees === null || checkout_fees === void 0 ? void 0 : checkout_fees.map(fee => (h("sc-line-item", null, h("span", { slot: "description" }, fee === null || fee === void 0 ? void 0 : fee.description), h("span", { slot: "price" }, fee === null || fee === void 0 ? void 0 : fee.display_amount)))))), !!checkout.trial_amount && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Trial', 'surecart')), h("span", { slot: "price-description" }, checkout === null || checkout === void 0 ? void 0 : checkout.trial_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.discount_amount) && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Discounts', 'surecart')), h("span", { slot: "price-description" }, checkout === null || checkout === void 0 ? void 0 : checkout.discounts_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.shipping_amount) && (h(Fragment, null, h("sc-line-item", { style: { marginTop: 'var(--sc-spacing-small)' } }, h("span", { slot: "description" }, wp.i18n.__('Shipping', 'surecart')), h("span", { slot: "price-description" }, checkout === null || checkout === void 0 ? void 0 : checkout.shipping_display_amount)), (shipping_fees === null || shipping_fees === void 0 ? void 0 : shipping_fees.length) > 0 && (h(Fragment, null, shipping_fees === null || shipping_fees === void 0 ? void 0 : shipping_fees.map(fee => (h("sc-line-item", null, h("span", { slot: "description" }, fee === null || fee === void 0 ? void 0 : fee.description), h("span", { slot: "price" }, fee === null || fee === void 0 ? void 0 : fee.display_amount)))))))), getTaxLines(checkout).map((line, _, lines) => (h("sc-line-item", { key: `${line.label}-${line.rate}` }, h("span", { slot: "description" }, lines.length > 1 ? `${formatTaxDisplay(line.label)} ${formatTaxLineDetail(line)}` : formatTaxDisplay(line.label)), h("span", { slot: "price-description" }, line.display_amount)))), h("sc-divider", { style: { '--spacing': '0' } }), ((_f = this === null || this === void 0 ? void 0 : this.subscription) === null || _f === void 0 ? void 0 : _f.can_modify) && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Payment', 'surecart')), paymentMethodExists && (h("a", { href: this.updatePaymentMethodUrl, slot: "price-description" }, h("sc-flex", { "justify-content": "flex-start", "align-items": "center", style: { '--spacing': '0.5em' } }, manualPaymentMethod ? h("sc-manual-payment-method", { paymentMethod: manualPaymentMethod }) : h("sc-payment-method", { paymentMethod: checkout === null || checkout === void 0 ? void 0 : checkout.payment_method }), h("sc-icon", { name: "edit-3" })))), !paymentMethodExists && (h("a", { href: addQueryArgs(window.location.href, {
                action: 'create',
                model: 'payment_method',
                id: this === null || this === void 0 ? void 0 : this.subscription.id,
                ...(((_g = this === null || this === void 0 ? void 0 : this.subscription) === null || _g === void 0 ? void 0 : _g.live_mode) === false ? { live_mode: false } : {}),
            }), slot: "price-description" }, wp.i18n.__('Add Payment Method', 'surecart'))))), h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, h("span", { slot: "title" }, wp.i18n.__('Total Due', 'surecart')), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.amount_due_display_amount), h("span", { slot: "currency" }, checkout.currency))))));
    }
    static get watchers() { return {
        "subscription": ["handleSubscriptionChange"]
    }; }
};

const ScSubscriptionReactivate = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.scRequestClose = createEvent(this, "scRequestClose", 7);
        this.scRefresh = createEvent(this, "scRefresh", 7);
        this.open = undefined;
        this.subscription = undefined;
        this.busy = undefined;
        this.error = undefined;
        this.upcomingPeriod = undefined;
        this.loading = false;
    }
    openChanged() {
        if (this.open) {
            this.fetchUpcoming();
        }
    }
    async fetchUpcoming() {
        var _a, _b;
        this.loading = true;
        try {
            this.upcomingPeriod = await apiFetch({
                method: 'PATCH',
                path: addQueryArgs(`surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/upcoming_period`, {
                    skip_product_group_validation: true,
                    expand: ['period.checkout'],
                }),
                data: {
                    purge_pending_update: false,
                },
            });
        }
        catch (e) {
            this.error = ((_b = e === null || e === void 0 ? void 0 : e.additional_errors) === null || _b === void 0 ? void 0 : _b.length) ? e.additional_errors.map(err => err.message).join(', ') : (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.loading = false;
        }
    }
    async reactivateSubscription() {
        var _a, _b;
        try {
            this.error = '';
            this.busy = true;
            await apiFetch({
                path: `surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/restore`,
                method: 'PATCH',
            });
            this.scRefresh.emit();
            this.scRequestClose.emit('close-button');
        }
        catch (e) {
            this.error = ((_b = e === null || e === void 0 ? void 0 : e.additional_errors) === null || _b === void 0 ? void 0 : _b.length) ? e.additional_errors.map(err => err.message).join(', ') : (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    renderLoading() {
        return (h("sc-flex", { flexDirection: "column", style: { gap: '1em' } }, h("sc-skeleton", { style: { width: '20%', display: 'inline-block' } }), h("sc-skeleton", { style: { width: '60%', display: 'inline-block' } }), h("sc-skeleton", { style: { width: '40%', display: 'inline-block' } })));
    }
    render() {
        var _a, _b, _c;
        return (h("sc-dialog", { key: '431822da74526a444a092079eb7eaf0e0d005dc5', noHeader: true, open: this.open, style: { '--width': '600px', '--body-spacing': 'var(--sc-spacing-xxx-large)' } }, h("sc-dashboard-module", { key: '7cad26f47e005edf97c479689b9b28dce0f929a7', loading: this.loading, heading: wp.i18n.__('Resubscribe', 'surecart'), class: "subscription-reactivate", error: this.error, style: { '--sc-dashboard-module-spacing': '1em' } }, this.loading ? (this.renderLoading()) : (h(Fragment, null, h("div", { slot: "description" }, h("sc-alert", { open: true, type: "warning", title: wp.i18n.__('Confirm Charge', 'surecart') }, wp.i18n.__('You will be charged', 'surecart'), " ", (_b = (_a = this.upcomingPeriod) === null || _a === void 0 ? void 0 : _a.checkout) === null || _b === void 0 ? void 0 :
            _b.amount_due_display_amount, ' ', wp.i18n.__('immediately for your subscription.', 'surecart')), h("sc-text", { style: {
                '--font-size': 'var(--sc-font-size-medium)',
                '--color': 'var(--sc-input-label-color)',
                '--line-height': 'var(--sc-line-height-dense)',
                'margin-top': 'var(--sc-spacing-medium)',
            } }, wp.i18n.__('Your subscription will be reactivated and will renew automatically on', 'surecart'), " ", h("strong", null, (_c = this.upcomingPeriod) === null || _c === void 0 ? void 0 : _c.end_at_date))), h("sc-flex", { justifyContent: "flex-start" }, h("sc-button", { type: "primary", loading: this.busy, disabled: this.busy, onClick: () => this.reactivateSubscription() }, wp.i18n.__('Yes, Reactivate', 'surecart')), h("sc-button", { disabled: this.busy, style: { color: 'var(--sc-color-gray-500)' }, type: "text", onClick: () => this.scRequestClose.emit() }, wp.i18n.__('No, Keep Inactive', 'surecart'))))), this.busy && h("sc-block-ui", { key: 'f7c6c05f838e58c07d170a9b16d32b8149cf47c6' }))));
    }
    static get watchers() { return {
        "open": ["openChanged"]
    }; }
};

export { ScCancelDialog as sc_cancel_dialog, ScSubscriptionNextPayment as sc_subscription_next_payment, ScSubscriptionReactivate as sc_subscription_reactivate };

//# sourceMappingURL=sc-cancel-dialog_3.entry.js.map