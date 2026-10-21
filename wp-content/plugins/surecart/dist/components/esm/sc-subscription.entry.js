import { r as registerInstance, h, F as Fragment, a as getElement } from './index-25e5af33.js';
import './fetch-cdff67be.js';
import { o as onFirstVisible } from './lazy-deb42890.js';
import { p as productNameWithPrice } from './price-39d60d32.js';
import { i as isPauseScheduled } from './subscription-1422e6c1.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import { a as apiFetch } from './index-824c562b.js';
import './remove-query-args-938c53ea.js';
import './currency-eb33deae.js';

const scSubscriptionCss = ":host{display:block}.subscription{display:grid;gap:0.5em}.subscription a{text-decoration:none;font-weight:var(--sc-font-weight-semibold);display:inline-flex;align-items:center;gap:0.25em;color:var(--sc-color-primary-500)}.subscription a.cancel{color:var(--sc-color-danger-500)}@media screen and (max-width: 720px){.subscription__action-buttons{--sc-flex-column-gap:var(--sc-spacing-xxx-small)}.subscription__action-buttons::part(base){flex-direction:column}.subscription__action-buttons sc-button::part(base){width:auto;height:2em}}";
const ScSubscriptionStyle0 = scSubscriptionCss;

const ScSubscription = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        onFirstVisible(this.el, () => {
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
            this.subscription = (await apiFetch({
                path: addQueryArgs(`surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/`, {
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
            this.subscription = (await apiFetch({
                path: addQueryArgs(`surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/renew`, {
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
            this.subscription = (await await apiFetch({
                path: addQueryArgs(`surecart/v1/subscriptions/${this.subscriptionId || ((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id)}`, {
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
            return productNameWithPrice(subscription === null || subscription === void 0 ? void 0 : subscription.price);
        }
        return wp.i18n.__('Subscription', 'surecart');
    }
    renderEmpty() {
        return h("slot", { name: "empty" }, wp.i18n.__('This subscription does not exist.', 'surecart'));
    }
    renderLoading() {
        return (h("sc-stacked-list-row", { style: { '--columns': '2' }, "mobile-size": 0 }, h("div", { style: { padding: '0.5em' } }, h("sc-skeleton", { style: { width: '30%', marginBottom: '0.75em' } }), h("sc-skeleton", { style: { width: '20%', marginBottom: '0.75em' } }), h("sc-skeleton", { style: { width: '40%' } }))));
    }
    renderContent() {
        if (this.loading) {
            return this.renderLoading();
        }
        if (!this.subscription) {
            return this.renderEmpty();
        }
        return (h(Fragment, null, h("sc-subscription-next-payment", { subscription: this.subscription, updatePaymentMethodUrl: this.updatePaymentMethodUrl }, h("sc-subscription-details", { subscription: this.subscription }))));
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const paymentMethodExists = ((_a = this === null || this === void 0 ? void 0 : this.subscription) === null || _a === void 0 ? void 0 : _a.payment_method) || ((_b = this === null || this === void 0 ? void 0 : this.subscription) === null || _b === void 0 ? void 0 : _b.manual_payment);
        return (h("sc-dashboard-module", { key: 'ff792f94c9623ac3c9dc65a293cc0c80d80b6b61', heading: this.heading || wp.i18n.__('Current Plan', 'surecart'), class: "subscription", error: this.error }, !!this.subscription && ((_c = this === null || this === void 0 ? void 0 : this.subscription) === null || _c === void 0 ? void 0 : _c.can_modify) && (h("sc-flex", { key: '379a47feb29666e6091b60e7f2c5be80fcdf80da', slot: "end", class: "subscription__action-buttons" }, this.updatePaymentMethodUrl && paymentMethodExists && (h("sc-button", { key: 'e27801d8d32d9c47d12744a849225344a025522a', type: "link", href: this.updatePaymentMethodUrl }, h("sc-icon", { key: '0ea676a261613456344203863d47d60fc1d8d9a8', name: "credit-card", slot: "prefix" }), wp.i18n.__('Update Payment Method', 'surecart'))), !paymentMethodExists && (h("sc-button", { key: 'aa2006d492d2463be9678973299267ef9e9be3d6', type: "link", href: addQueryArgs(window.location.href, {
                action: 'create',
                model: 'payment_method',
                id: this === null || this === void 0 ? void 0 : this.subscription.id,
                ...(((_d = this === null || this === void 0 ? void 0 : this.subscription) === null || _d === void 0 ? void 0 : _d.live_mode) === false ? { live_mode: false } : {}),
            }) }, h("sc-icon", { key: 'd74e67b5331703252cd927e4f68aba02c445fa13', name: "credit-card", slot: "prefix" }), wp.i18n.__('Add Payment Method', 'surecart'))), !!Object.keys(((_e = this.subscription) === null || _e === void 0 ? void 0 : _e.pending_update) || {}).length && (h("sc-button", { key: '73b6e252baaeea7de2b210ca6f8f0cd91c671767', type: "link", onClick: () => this.cancelPendingUpdate() }, h("sc-icon", { key: '3887b3f8cbccaef122022684faa5feaac1162fa2', name: "x-octagon", slot: "prefix" }), wp.i18n.__('Cancel Scheduled Update', 'surecart'))), ((_f = this === null || this === void 0 ? void 0 : this.subscription) === null || _f === void 0 ? void 0 : _f.cancel_at_period_end) ? (h("sc-button", { type: "link", onClick: () => this.renewSubscription() }, h("sc-icon", { name: "repeat", slot: "prefix" }), isPauseScheduled(this.subscription) ? wp.i18n.__("Don't Pause", 'surecart') : wp.i18n.__('Restore Plan', 'surecart'))) : (((_g = this.subscription) === null || _g === void 0 ? void 0 : _g.status) !== 'canceled' &&
            ((_h = this.subscription) === null || _h === void 0 ? void 0 : _h.current_period_end_at) &&
            this.showCancel && (h("sc-button", { type: "link", onClick: () => (this.cancelModal = true) }, h("sc-icon", { name: "x", slot: "prefix" }), wp.i18n.__('Cancel Plan', 'surecart')))), ((_j = this.subscription) === null || _j === void 0 ? void 0 : _j.status) === 'canceled' && (h("sc-button", { key: 'e73aa9a993fb0909d51a6020075832381bee61d4', type: "link", ...(!!((_k = this.subscription) === null || _k === void 0 ? void 0 : _k.payment_method) || (this === null || this === void 0 ? void 0 : this.subscription.manual_payment)
                ? {
                    onClick: () => (this.resubscribeModal = true),
                }
                : {
                    href: this === null || this === void 0 ? void 0 : this.updatePaymentMethodUrl,
                }) }, h("sc-icon", { key: 'ec63ef4d0d5d87de567f8244da33c1b7d2ac6232', name: "repeat", slot: "prefix" }), wp.i18n.__('Resubscribe', 'surecart'))))), h("sc-card", { key: 'b2499d3ed23f77eb47586fe05f2ab2588d9f793f', style: { '--overflow': 'hidden' }, noPadding: true }, this.renderContent()), this.busy && h("sc-block-ui", { key: '237d5f5e00c4903a3a27f7f79eb750ec23e83b85', spinner: true }), h("sc-cancel-dialog", { key: '46538b48ac57f3940a35f5d40aa9051642914240', subscription: this.subscription, protocol: this.protocol, open: this.cancelModal, onScRequestClose: () => (this.cancelModal = false), onScRefresh: () => this.getSubscription() }, h("slot", { key: '8cb01629eebb39aedb233aac1ca34ba0f236e742', name: "cancel-popup-content", slot: "cancel-popup-content" })), h("sc-subscription-reactivate", { key: '93ccc6ed1d2dd7d09d33b398c519b34656fd197b', subscription: this.subscription, open: this.resubscribeModal, onScRequestClose: () => (this.resubscribeModal = false), onScRefresh: () => this.getSubscription() })));
    }
    get el() { return getElement(this); }
};
ScSubscription.style = ScSubscriptionStyle0;

export { ScSubscription as sc_subscription };

//# sourceMappingURL=sc-subscription.entry.js.map