'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
require('./fetch-5e8dc1d5.js');
const lazy = require('./lazy-2b509fa7.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
const index$1 = require('./index-7ced8198.js');
require('./remove-query-args-b57e8cd3.js');

const scDashboardCustomerDetailsCss = ":host{display:block;position:relative}.customer-details{display:grid;gap:0.75em}";
const ScDashboardCustomerDetailsStyle0 = scDashboardCustomerDetailsCss;

const ScDashboardCustomerDetails = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.customerId = undefined;
        this.heading = undefined;
        this.customer = undefined;
        this.loading = undefined;
        this.error = undefined;
    }
    componentWillLoad() {
        lazy.onFirstVisible(this.el, () => {
            this.fetch();
        });
    }
    async fetch() {
        if ('' === this.customerId) {
            return;
        }
        try {
            this.loading = true;
            this.customer = (await await index$1.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/customers/${this.customerId}`, {
                    expand: ['shipping_address', 'billing_address', 'tax_identifier'],
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
    render() {
        return (index.h("sc-customer-details", { key: '5594bae3670c20dfebf8908c5bbb7f054c1e4f95', exportparts: "base, heading, heading-text, heading-title, heading-description, error__base, error__icon, error__text, error__title, error__message, test-tag__base, test-tag__content, button__base, button__label, button__prefix", customer: this.customer, loading: this.loading, error: this.error, heading: this.heading, "edit-link": addQueryArgs.addQueryArgs(window.location.href, {
                action: 'edit',
                model: 'customer',
                id: this.customerId,
            }) }));
    }
    get el() { return index.getElement(this); }
};
ScDashboardCustomerDetails.style = ScDashboardCustomerDetailsStyle0;

exports.sc_dashboard_customer_details = ScDashboardCustomerDetails;

//# sourceMappingURL=sc-dashboard-customer-details.cjs.entry.js.map