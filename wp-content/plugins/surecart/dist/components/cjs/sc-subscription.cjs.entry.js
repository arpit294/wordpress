'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
require('./fetch-5e8dc1d5.js');
const lazy = require('./lazy-2b509fa7.js');
const price = require('./price-9dddd853.js');
const subscription = require('./subscription-331e5091.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
const index$1 = require('./index-7ced8198.js');
require('./remove-query-args-b57e8cd3.js');
require('./currency-b438c76d.js');

const scSubscriptionCss = ":host{display:block}.subscription{display:grid;gap:0.5em}.subscription a{text-decoration:none;font-weight:var(--sc-font-weight-semibold);display:inline-flex;align-items:center;gap:0.25em;color:var(--sc-color-primary-500)}.subscription a.cancel{color:var(--sc-color-danger-500)}@media screen and (max-width: 720px){.subscription__action-buttons{--sc-flex-column-gap:var(--sc-spacing-xxx-small)}.subscription__action-buttons::part(base){flex-direction:column}.subscription__action-buttons sc-button::part(base){width:auto;height:2em}}";
const ScSubscriptionStyle0 = scSubscriptionCss;

const ScSubscription = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.subscriptionId = undefined;
        this.showCancel = undefined;
        this.heading = undefined;
        this.query = undefined;
        this.protocol = undefined;
        this.subscription = undefined;
        this.updatePaymentMethodUrl = undefined;
        this.loading = undefined;
        this.cancelModal = undefined;
        this.resubscribeModal = undefined;
        this.busy = undefined;
        this.error = undefined;
    }
    componentWillLoad() {
        lazy.onFirstVisible(this.el, () => {
            if (!this.subscription) {
                this.getSubscription();
            }
        });
    }
    async cancelPendingUpdate() {
        var _a;
        const r = confirm(wp.i18n.__('Are you sure you want to cancel the pending update to your plan?', 'surecart'));
        if (!r)
            return;
        try {
            this.busy = true;
            this.subscription = (await index$1.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/`, {
                    expand: ['price', 'price.product', 'product.bundle_items', 'bundle_item.component_product', 'current_period', 'period.checkout', 'purchase', 'purchase.license', 'license.activations', 'discount', 'discount.coupon'],
                }),
                method: 'PATCH',
                data: {
                    purge_pending_update: true,
                },
            }));
        }
        catch (e) {
            if (e === null || e === void 0 ? void 0 : e.message) {
                this.error = e.message;
            }
            else {
                this.error = wp.i18n.__('Something went wrong', 'surecart');
            }
            console.error(this.error);
        }
        finally {
            this.busy = false;
        }
    }
    async renewSubscription() {
        var _a;
        try {
            this.error = '';
            this.busy = true;
            this.subscription = (await index$1.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/renew`, {
                    expand: [
                        'price',
                        'price.product',
                        'product.bundle_items',
                        'bundle_item.component_product',
                        'current_period',
                        'period.checkout',
                        'purchase',
                        'purchase.license',
                        'license.activations',
                        'discount',
                        'discount.coupon',
                    ],
                }),
                method: 'PATCH',
            }));
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    /** Get all subscriptions */
    async getSubscription() {
        var _a;
        try {
            this.loading = true;
            this.subscription = (await await index$1.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/subscriptions/${this.subscriptionId || ((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id)}`, {
                    expand: [
                        'price',
                        'price.product',
                        'product.bundle_items',
                        'bundle_item.component_product',
                        'current_period',
                    ],
                    ...(this.query || {}),
                }),
            }));
        }
        catch (e) {
            if (e === null || e === void 0 ? void 0 : e.message) {
                this.error = e.message;
            }
            else {
                this.error = wp.i18n.__('Something went wrong', 'surecart');
            }
            console.error(this.error);
        }
        finally {
            this.loading = false;
        }
    }
    renderName(subscription) {
        var _a;
        if (typeof ((_a = subscription === null || subscription === void 0 ? void 0 : subscription.price) === null || _a === void 0 ? void 0 : _a.product) !== 'string') {
            return price.productNameWithPrice(subscription === null || subscription === void 0 ? void 0 : subscription.price);
        }
        return wp.i18n.__('Subscription', 'surecart');
    }
    renderEmpty() {
        return index.h("slot", { name: "empty" }, wp.i18n.__('This subscription does not exist.', 'surecart'));
    }
    renderLoading() {
        return (index.h("sc-stacked-list-row", { style: { '--columns': '2' }, "mobile-size": 0 }, index.h("div", { style: { padding: '0.5em' } }, index.h("sc-skeleton", { style: { width: '30%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '20%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '40%' } }))));
    }
    renderContent() {
        if (this.loading) {
            return this.renderLoading();
        }
        if (!this.subscription) {
            return this.renderEmpty();
        }
        return (index.h(index.Fragment, null, index.h("sc-subscription-next-payment", { subscription: this.subscription, updatePaymentMethodUrl: this.updatePaymentMethodUrl }, index.h("sc-subscription-details", { subscription: this.subscription }))));
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const paymentMethodExists = ((_a = this === null || this === void 0 ? void 0 : this.subscription) === null || _a === void 0 ? void 0 : _a.payment_method) || ((_b = this === null || this === void 0 ? void 0 : this.subscription) === null || _b === void 0 ? void 0 : _b.manual_payment);
        return (index.h("sc-dashboard-module", { key: 'ff792f94c9623ac3c9dc65a293cc0c80d80b6b61', heading: this.heading || wp.i18n.__('Current Plan', 'surecart'), class: "subscription", error: this.error }, !!this.subscription && ((_c = this === null || this === void 0 ? void 0 : this.subscription) === null || _c === void 0 ? void 0 : _c.can_modify) && (index.h("sc-flex", { key: '379a47feb29666e6091b60e7f2c5be80fcdf80da', slot: "end", class: "subscription__action-buttons" }, this.updatePaymentMethodUrl && paymentMethodExists && (index.h("sc-button", { key: 'e27801d8d32d9c47d12744a849225344a025522a', type: "link", href: this.updatePaymentMethodUrl }, index.h("sc-icon", { key: '0ea676a261613456344203863d47d60fc1d8d9a8', name: "credit-card", slot: "prefix" }), wp.i18n.__('Update Payment Method', 'surecart'))), !paymentMethodExists && (index.h("sc-button", { key: 'aa2006d492d2463be9678973299267ef9e9be3d6', type: "link", href: addQueryArgs.addQueryArgs(window.location.href, {
                action: 'create',
                model: 'payment_method',
                id: this === null || this === void 0 ? void 0 : this.subscription.id,
                ...(((_d = this === null || this === void 0 ? void 0 : this.subscription) === null || _d === void 0 ? void 0 : _d.live_mode) === false ? { live_mode: false } : {}),
            }) }, index.h("sc-icon", { key: 'd74e67b5331703252cd927e4f68aba02c445fa13', name: "credit-card", slot: "prefix" }), wp.i18n.__('Add Payment Method', 'surecart'))), !!Object.keys(((_e = this.subscription) === null || _e === void 0 ? void 0 : _e.pending_update) || {}).length && (index.h("sc-button", { key: '73b6e252baaeea7de2b210ca6f8f0cd91c671767', type: "link", onClick: () => this.cancelPendingUpdate() }, index.h("sc-icon", { key: '3887b3f8cbccaef122022684faa5feaac1162fa2', name: "x-octagon", slot: "prefix" }), wp.i18n.__('Cancel Scheduled Update', 'surecart'))), ((_f = this === null || this === void 0 ? void 0 : this.subscription) === null || _f === void 0 ? void 0 : _f.cancel_at_period_end) ? (index.h("sc-button", { type: "link", onClick: () => this.renewSubscription() }, index.h("sc-icon", { name: "repeat", slot: "prefix" }), subscription.isPauseScheduled(this.subscription) ? wp.i18n.__("Don't Pause", 'surecart') : wp.i18n.__('Restore Plan', 'surecart'))) : (((_g = this.subscription) === null || _g === void 0 ? void 0 : _g.status) !== 'canceled' &&
            ((_h = this.subscription) === null || _h === void 0 ? void 0 : _h.current_period_end_at) &&
            this.showCancel && (index.h("sc-button", { type: "link", onClick: () => (this.cancelModal = true) }, index.h("sc-icon", { name: "x", slot: "prefix" }), wp.i18n.__('Cancel Plan', 'surecart')))), ((_j = this.subscription) === null || _j === void 0 ? void 0 : _j.status) === 'canceled' && (index.h("sc-button", { key: 'e73aa9a993fb0909d51a6020075832381bee61d4', type: "link", ...(!!((_k = this.subscription) === null || _k === void 0 ? void 0 : _k.payment_method) || (this === null || this === void 0 ? void 0 : this.subscription.manual_payment)
                ? {
                    onClick: () => (this.resubscribeModal = true),
                }
                : {
                    href: this === null || this === void 0 ? void 0 : this.updatePaymentMethodUrl,
                }) }, index.h("sc-icon", { key: 'ec63ef4d0d5d87de567f8244da33c1b7d2ac6232', name: "repeat", slot: "prefix" }), wp.i18n.__('Resubscribe', 'surecart'))))), index.h("sc-card", { key: 'b2499d3ed23f77eb47586fe05f2ab2588d9f793f', style: { '--overflow': 'hidden' }, noPadding: true }, this.renderContent()), this.busy && index.h("sc-block-ui", { key: '237d5f5e00c4903a3a27f7f79eb750ec23e83b85', spinner: true }), index.h("sc-cancel-dialog", { key: '46538b48ac57f3940a35f5d40aa9051642914240', subscription: this.subscription, protocol: this.protocol, open: this.cancelModal, onScRequestClose: () => (this.cancelModal = false), onScRefresh: () => this.getSubscription() }, index.h("slot", { key: '8cb01629eebb39aedb233aac1ca34ba0f236e742', name: "cancel-popup-content", slot: "cancel-popup-content" })), index.h("sc-subscription-reactivate", { key: '93ccc6ed1d2dd7d09d33b398c519b34656fd197b', subscription: this.subscription, open: this.resubscribeModal, onScRequestClose: () => (this.resubscribeModal = false), onScRefresh: () => this.getSubscription() })));
    }
    get el() { return index.getElement(this); }
};
ScSubscription.style = ScSubscriptionStyle0;

exports.sc_subscription = ScSubscription;

//# sourceMappingURL=sc-subscription.cjs.entry.js.map