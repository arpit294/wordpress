'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const address = require('./address-7404695f.js');
const tax = require('./tax-1568db23.js');
require('./add-query-args-49dcb630.js');

const scCustomerDetailsCss = "";
const ScCustomerDetailsStyle0 = scCustomerDetailsCss;

const ScCustomerDetails = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.heading = undefined;
        this.editLink = undefined;
        this.customer = undefined;
        this.loading = undefined;
        this.error = undefined;
        this.countryChoices = undefined;
    }
    componentWillLoad() {
        this.initCountryChoices();
    }
    async initCountryChoices() {
        this.countryChoices = await address.countryChoices();
    }
    renderContent() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this.loading) {
            return this.renderLoading();
        }
        if (!this.customer) {
            return this.renderEmpty();
        }
        return (index.h("sc-card", { "no-padding": true }, index.h("sc-stacked-list", null, !!((_a = this === null || this === void 0 ? void 0 : this.customer) === null || _a === void 0 ? void 0 : _a.name) && (index.h("sc-stacked-list-row", { style: { '--columns': '3' }, mobileSize: 480 }, index.h("div", null, index.h("strong", null, wp.i18n.__('Billing Name', 'surecart'))), index.h("div", null, (_b = this.customer) === null || _b === void 0 ? void 0 : _b.name), index.h("div", null))), !!((_c = this === null || this === void 0 ? void 0 : this.customer) === null || _c === void 0 ? void 0 : _c.email) && (index.h("sc-stacked-list-row", { style: { '--columns': '3' }, mobileSize: 480 }, index.h("div", null, index.h("strong", null, wp.i18n.__('Billing Email', 'surecart'))), index.h("div", null, (_d = this.customer) === null || _d === void 0 ? void 0 : _d.email), index.h("div", null))), !!Object.keys(((_e = this === null || this === void 0 ? void 0 : this.customer) === null || _e === void 0 ? void 0 : _e.shipping_address_display) || {}).length && this.renderAddress(wp.i18n.__('Shipping Address', 'surecart'), this.customer.shipping_address_display), !!Object.keys(((_f = this.customer) === null || _f === void 0 ? void 0 : _f.billing_address_display) || {}).length && this.renderAddress(wp.i18n.__('Billing Address', 'surecart'), this.customer.billing_address_display), !!((_g = this === null || this === void 0 ? void 0 : this.customer) === null || _g === void 0 ? void 0 : _g.phone) && (index.h("sc-stacked-list-row", { style: { '--columns': '3' }, mobileSize: 480 }, index.h("div", null, index.h("strong", null, wp.i18n.__('Phone', 'surecart'))), index.h("div", null, (_h = this.customer) === null || _h === void 0 ? void 0 : _h.phone), index.h("div", null))), (() => {
            var _a, _b, _c, _d;
            const { number_type, number } = ((_a = this.customer) === null || _a === void 0 ? void 0 : _a.tax_identifier) || {};
            if (!number || !number_type)
                return;
            const label = ((_b = tax.zones === null || tax.zones === void 0 ? void 0 : tax.zones[number_type]) === null || _b === void 0 ? void 0 : _b.label) || wp.i18n.__('Tax Id', 'surecart');
            const isInvalid = ((_d = (_c = this.customer) === null || _c === void 0 ? void 0 : _c.tax_identifier) === null || _d === void 0 ? void 0 : _d[`valid_${number_type}`]) === false;
            return (index.h("sc-stacked-list-row", { style: { '--columns': '3' }, mobileSize: 480 }, index.h("div", null, index.h("strong", null, label)), index.h("div", null, number, " ", isInvalid && index.h("sc-tag", { type: "warning" }, wp.i18n.__('Invalid', 'surecart'))), index.h("div", null)));
        })())));
    }
    renderAddress(label = 'Address', address) {
        return (index.h("sc-stacked-list-row", { style: { '--columns': '3' }, mobileSize: 480 }, index.h("div", null, index.h("strong", null, label)), index.h("div", { style: { whiteSpace: 'pre-line' } }, address), index.h("div", null)));
    }
    renderEmpty() {
        return (index.h("div", null, index.h("sc-divider", { style: { '--spacing': '0' } }), index.h("slot", { name: "empty" }, index.h("sc-empty", { icon: "user" }, wp.i18n.__("You don't have any billing information.", 'surecart')))));
    }
    renderLoading() {
        return (index.h("sc-card", { "no-padding": true }, index.h("sc-stacked-list", null, index.h("sc-stacked-list-row", { style: { '--columns': '2' }, "mobile-size": 0 }, index.h("div", { style: { padding: '0.5em' } }, index.h("sc-skeleton", { style: { width: '30%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '20%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '40%' } }))))));
    }
    render() {
        var _a, _b, _c;
        return (index.h("sc-dashboard-module", { key: '8cb1c562aeaa8a969342ad7a489100b1df235582', exportparts: "base, heading, heading-text, heading-title, heading-description", class: "customer-details", error: this.error }, index.h("span", { key: '1a9ed8fa6e4cb7bac07a2dd9f0216e04a241ae7e', slot: "heading" }, this.heading || wp.i18n.__('Billing Details', 'surecart'), ' ', !!((_a = this === null || this === void 0 ? void 0 : this.customer) === null || _a === void 0 ? void 0 : _a.id) && !((_b = this === null || this === void 0 ? void 0 : this.customer) === null || _b === void 0 ? void 0 : _b.live_mode) && (index.h("sc-tag", { key: '315ae19c86fd0ea29066cfc707fce37f8eff294d', exportparts: "base:test-tag__base, content:test-tag__content", type: "warning", size: "small" }, wp.i18n.__('Test', 'surecart')))), !!this.editLink && !!((_c = this.customer) === null || _c === void 0 ? void 0 : _c.id) && (index.h("sc-button", { key: 'b499ff273de2134577310545cd57219abf5c5b8c', exportparts: "base:button__base, label:button__label, prefix:button__prefix", type: "link", href: this.editLink, slot: "end" }, index.h("sc-icon", { key: '45db63ba0da64a14a9ba9bcdefaac8267eece333', name: "edit-3", slot: "prefix" }), wp.i18n.__('Update', 'surecart'))), this.renderContent()));
    }
    get el() { return index.getElement(this); }
};
ScCustomerDetails.style = ScCustomerDetailsStyle0;

exports.sc_customer_details = ScCustomerDetails;

//# sourceMappingURL=sc-customer-details.cjs.entry.js.map