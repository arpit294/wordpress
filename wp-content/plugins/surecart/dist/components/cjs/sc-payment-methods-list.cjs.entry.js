'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
require('./fetch-5e8dc1d5.js');
const lazy = require('./lazy-2b509fa7.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
const index$1 = require('./index-7ced8198.js');
require('./remove-query-args-b57e8cd3.js');

const scPaymentMethodsListCss = ":host{display:block;position:relative}.payment-methods-list{display:grid;gap:0.5em}.payment-methods-list sc-heading a{text-decoration:none;font-weight:var(--sc-font-weight-semibold);display:inline-flex;align-items:center;gap:0.25em;color:var(--sc-color-primary-500)}.payment-id{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}";
const ScPaymentMethodsListStyle0 = scPaymentMethodsListCss;

const ScPaymentMethodsList = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.query = undefined;
        this.heading = undefined;
        this.isCustomer = undefined;
        this.canDetachDefaultPaymentMethod = false;
        this.paymentMethods = [];
        this.loading = undefined;
        this.busy = undefined;
        this.error = undefined;
        this.hasTitleSlot = undefined;
        this.editPaymentMethod = false;
        this.deletePaymentMethod = false;
        this.cascadeDefaultPaymentMethod = false;
    }
    /** Only fetch if visible */
    componentWillLoad() {
        lazy.onFirstVisible(this.el, () => this.getPaymentMethods());
        this.handleSlotChange();
    }
    handleSlotChange() {
        this.hasTitleSlot = !!this.el.querySelector('[slot="title"]');
    }
    /**
     * Delete the payment method.
     */
    async deleteMethod() {
        var _a;
        if (!this.deletePaymentMethod)
            return;
        try {
            this.busy = true;
            (await index$1.apiFetch({
                path: `surecart/v1/payment_methods/${(_a = this.deletePaymentMethod) === null || _a === void 0 ? void 0 : _a.id}/detach`,
                method: 'PATCH',
            }));
            // remove from view.
            this.paymentMethods = this.paymentMethods.filter(m => { var _a; return m.id !== ((_a = this.deletePaymentMethod) === null || _a === void 0 ? void 0 : _a.id); });
            this.deletePaymentMethod = false;
        }
        catch (e) {
            alert((e === null || e === void 0 ? void 0 : e.messsage) || wp.i18n.__('Something went wrong', 'surecart'));
        }
        finally {
            this.busy = false;
        }
    }
    /**
     * Set the default payment method.
     */
    async setDefault() {
        var _a, _b, _c;
        if (!this.editPaymentMethod)
            return;
        try {
            this.error = '';
            this.busy = true;
            (await index$1.apiFetch({
                path: `surecart/v1/customers/${(_b = (_a = this.editPaymentMethod) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b.id}`,
                method: 'PATCH',
                data: {
                    default_payment_method: (_c = this.editPaymentMethod) === null || _c === void 0 ? void 0 : _c.id,
                    cascade_default_payment_method: this.cascadeDefaultPaymentMethod,
                },
            }));
            this.editPaymentMethod = false;
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
        try {
            this.busy = true;
            this.paymentMethods = (await index$1.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/payment_methods/`, {
                    expand: ['card', 'customer', 'billing_agreement', 'paypal_account', 'payment_instrument', 'bank_account'],
                    ...this.query,
                }),
            }));
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    /** Get all paymentMethods */
    async getPaymentMethods() {
        if (!this.isCustomer) {
            return;
        }
        try {
            this.loading = true;
            this.paymentMethods = (await index$1.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/payment_methods/`, {
                    expand: ['card', 'customer', 'billing_agreement', 'paypal_account', 'payment_instrument', 'bank_account'],
                    ...this.query,
                    per_page: 100,
                }),
            }));
        }
        catch (e) {
            console.error(this.error);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.loading = false;
        }
    }
    renderLoading() {
        return (index.h("sc-card", { noPadding: true }, index.h("sc-stacked-list", null, index.h("sc-stacked-list-row", { style: { '--columns': '4' }, "mobile-size": 500 }, [...Array(4)].map(() => (index.h("sc-skeleton", { style: { width: '100px', display: 'inline-block' } })))))));
    }
    renderEmpty() {
        return (index.h("div", null, index.h("sc-divider", { style: { '--spacing': '0' } }), index.h("slot", { name: "empty" }, index.h("sc-empty", { icon: "credit-card" }, wp.i18n.__("You don't have any saved payment methods.", 'surecart')))));
    }
    renderPaymentMethodActions(paymentMethod) {
        const { id, customer } = paymentMethod;
        // If this is a string, don't show the actions.
        if (typeof customer === 'string')
            return;
        // If this is the default payment method and it cannot be detached, don't show the actions.
        if (customer.default_payment_method === id && !this.canDetachDefaultPaymentMethod)
            return;
        return (index.h("sc-dropdown", { placement: "bottom-end", slot: "suffix" }, index.h("sc-icon", { role: "button", tabIndex: 0, name: "more-horizontal", slot: "trigger" }), index.h("sc-menu", null, customer.default_payment_method !== id && index.h("sc-menu-item", { onClick: () => (this.editPaymentMethod = paymentMethod) }, wp.i18n.__('Make Default', 'surecart')), index.h("sc-menu-item", { onClick: () => (this.deletePaymentMethod = paymentMethod) }, wp.i18n.__('Delete', 'surecart')))));
    }
    renderList() {
        return this.paymentMethods.map(paymentMethod => {
            const { id, card, customer, live_mode, billing_agreement, paypal_account } = paymentMethod;
            return (index.h("sc-stacked-list-row", { style: { '--columns': billing_agreement ? '2' : '3' } }, index.h("sc-payment-method", { paymentMethod: paymentMethod }), index.h("div", { class: "payment-id" }, !!(card === null || card === void 0 ? void 0 : card.exp_month) && (index.h("span", null, wp.i18n.__('Exp.', 'surecart'), card === null || card === void 0 ? void 0 :
                card.exp_month, "/", card === null || card === void 0 ? void 0 :
                card.exp_year)), !!paypal_account && (paypal_account === null || paypal_account === void 0 ? void 0 : paypal_account.email)), index.h("sc-flex", { "justify-content": "flex-start", "align-items": "center", style: { '--spacing': '0.5em', 'marginLeft': 'auto' } }, typeof customer !== 'string' && (customer === null || customer === void 0 ? void 0 : customer.default_payment_method) === id && index.h("sc-tag", { type: "info" }, wp.i18n.__('Default', 'surecart')), !live_mode && index.h("sc-tag", { type: "warning" }, wp.i18n.__('Test', 'surecart'))), this.renderPaymentMethodActions(paymentMethod)));
        });
    }
    renderContent() {
        var _a;
        if (!this.isCustomer) {
            return this.renderEmpty();
        }
        if (this.loading) {
            return this.renderLoading();
        }
        if (((_a = this.paymentMethods) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            return this.renderEmpty();
        }
        return (index.h("sc-card", { "no-padding": true }, index.h("sc-stacked-list", null, this.renderList())));
    }
    handleEditPaymentMethodChange() {
        // reset when payment method edit changes
        this.cascadeDefaultPaymentMethod = false;
    }
    render() {
        return (index.h("sc-dashboard-module", { key: 'afcfe7ed21b6d02cd2086cce551342a75a5317a4', class: "payment-methods-list", error: this.error }, index.h("span", { key: 'df392f85cc567bfe38dfb115ca3270198ea9d614', slot: "heading" }, index.h("slot", { key: '613f874b159b2bb2dbbc755dfca9b62cc4b25ef7', name: "heading" }, this.heading || wp.i18n.__('Payment Methods', 'surecart'))), this.isCustomer && (index.h("sc-flex", { key: 'd3be7b5691f09885850324beac789b98b3b81004', slot: "end" }, index.h("sc-button", { key: '906d282fafbcacadda7e915d0606f4bc48ab20e7', type: "link", href: addQueryArgs.addQueryArgs(window.location.href, {
                action: 'index',
                model: 'charge',
            }) }, index.h("sc-icon", { key: '0dd9f4f2d4fcd35ae1f6b40f4aa07b5d4950474a', name: "clock", slot: "prefix" }), wp.i18n.__('Payment History', 'surecart')), index.h("sc-button", { key: 'fbb304759bbc0b6ebf9ddbd937dd47aeca9af8ae', type: "link", href: addQueryArgs.addQueryArgs(window.location.href, {
                action: 'create',
                model: 'payment_method',
            }) }, index.h("sc-icon", { key: 'd70ea9a3494f12dfb6282a256ff6b16df4f28684', name: "plus", slot: "prefix" }), wp.i18n.__('Add', 'surecart')))), this.renderContent(), index.h("sc-dialog", { key: '15d1a09c78e6f9eaad4b61b4e95ce90648bb8230', open: !!this.editPaymentMethod, label: wp.i18n.__('Update Default Payment Method', 'surecart'), onScRequestClose: () => (this.editPaymentMethod = false) }, index.h("sc-alert", { key: '211ad9490610f4739e72415963788bfa53ca8b23', type: "danger", open: !!this.error }, this.error), index.h("sc-flex", { key: '62ed18d93739e285713427d62985b87f62876b45', flexDirection: "column", style: { '--sc-flex-column-gap': 'var(--sc-spacing-small)' } }, index.h("sc-alert", { key: '6d7262ef879e30ec6004a6d96e940caa1905298c', type: "info", open: true }, wp.i18n.__('A default payment method will be used as a fallback in case other payment methods get removed from a subscription.', 'surecart')), index.h("sc-switch", { key: 'c2e088cf8f67d7ce6876ef58ee8d398a9c86aeba', checked: this.cascadeDefaultPaymentMethod, onScChange: e => (this.cascadeDefaultPaymentMethod = e.target.checked) }, wp.i18n.__('Update All Subscriptions', 'surecart'), index.h("span", { key: '955fc37f424cdcf360e82d3676392a49f52a450f', slot: "description" }, wp.i18n.__('Update all existing subscriptions to use this payment method', 'surecart')))), index.h("div", { key: 'ba86915a2d91f6ec97aaa7a24d70d450172e883f', slot: "footer" }, index.h("sc-button", { key: 'eafa92f141fb4eb1c7cb92717bdb254c73611078', type: "text", onClick: () => (this.editPaymentMethod = false) }, wp.i18n.__('Cancel', 'surecart')), index.h("sc-button", { key: '23d1af157410adf4468acdde30cb7005d9a35d92', type: "primary", onClick: () => this.setDefault() }, wp.i18n.__('Make Default', 'surecart'))), this.busy && index.h("sc-block-ui", { key: '24d920957bfd8b1afcf4f91ff9b50db7988556da', spinner: true })), index.h("sc-dialog", { key: 'd5ce45412dbac9cd78990121d796a0ddbf8e8bd3', open: !!this.deletePaymentMethod, label: wp.i18n.__('Delete Payment Method', 'surecart'), onScRequestClose: () => (this.deletePaymentMethod = false) }, index.h("sc-alert", { key: 'a3e9d2faafdf8eee37df612c50800bb400757ca2', type: "danger", open: !!this.error }, this.error), index.h("sc-text", { key: 'cbebe906a37d94cf6a047893872e162c98a8bd28' }, wp.i18n.__('Are you sure you want to remove this payment method?', 'surecart')), index.h("div", { key: '798312f271b09830adb6f3fbf5ff4014f111b3d2', slot: "footer" }, index.h("sc-button", { key: 'b8bb30b2a7d69397fbea38572a8d421b1badd1f5', type: "text", onClick: () => (this.deletePaymentMethod = false) }, wp.i18n.__('Cancel', 'surecart')), index.h("sc-button", { key: '0391dc8a06342476f0da4ce150e3c9211c269252', type: "primary", onClick: () => this.deleteMethod() }, wp.i18n.__('Delete', 'surecart'))), this.busy && index.h("sc-block-ui", { key: '5c55bb6bd8f6febc165ff7a4c61760d85806ee0d', spinner: true })), this.busy && index.h("sc-block-ui", { key: '414d99ff7762847f220ed1c9e449f819a250e4fe', spinner: true })));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "editPaymentMethod": ["handleEditPaymentMethodChange"]
    }; }
};
ScPaymentMethodsList.style = ScPaymentMethodsListStyle0;

exports.sc_payment_methods_list = ScPaymentMethodsList;

//# sourceMappingURL=sc-payment-methods-list.cjs.entry.js.map