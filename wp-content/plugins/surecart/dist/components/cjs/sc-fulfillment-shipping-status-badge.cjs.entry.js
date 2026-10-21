'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');

const scFulfillmentShippingStatusBadgeCss = ":host{display:inline-block;vertical-align:middle}";
const ScFulfillmentShippingStatusBadgeStyle0 = scFulfillmentShippingStatusBadgeCss;

const status = {
    unshipped: wp.i18n.__('Not Shipped', 'surecart'),
    shipped: wp.i18n.__('Shipped', 'surecart'),
    delivered: wp.i18n.__('Delivered', 'surecart'),
    label_purchased: wp.i18n.__('Label Purchased', 'surecart'),
    in_transit: wp.i18n.__('In Transit', 'surecart'),
    returned: wp.i18n.__('Returned', 'surecart'),
    failed: wp.i18n.__('Failed', 'surecart'),
    voided: wp.i18n.__('Label Voided', 'surecart'),
};
// Customer-facing overrides for statuses whose default (merchant) wording is too technical.
const customerStatus = {
    label_purchased: wp.i18n.__('Preparing to Ship', 'surecart'),
    // A voided label just means shipping is being rearranged — items are still with the merchant.
    voided: wp.i18n.__('Preparing to Ship', 'surecart'),
    // "Failed" alone is too ambiguous for a customer.
    failed: wp.i18n.__('Delivery Failed', 'surecart'),
};
const type = {
    unshipped: 'default',
    shipped: 'info',
    delivered: 'success',
    label_purchased: 'info',
    in_transit: 'warning',
    returned: 'danger',
    failed: 'danger',
    voided: 'danger',
};
// Customer-facing type overrides — a voided label is not alarming to a customer.
const customerType = {
    voided: 'info',
};
const ScFulfillmentShippingStatusBadge = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.status = undefined;
        this.context = 'admin';
        this.size = 'medium';
        this.pill = false;
        this.clearable = false;
    }
    /** Resolve the visible label, applying customer-friendly overrides in the customer context. */
    getLabel() {
        if (this.context === 'customer' && customerStatus[this.status]) {
            return customerStatus[this.status];
        }
        return status[this.status] || this.status;
    }
    /** Resolve the tag type, applying customer-friendly overrides in the customer context. */
    getType() {
        if (this.context === 'customer' && customerType[this.status]) {
            return customerType[this.status];
        }
        return type === null || type === void 0 ? void 0 : type[this === null || this === void 0 ? void 0 : this.status];
    }
    render() {
        // don't render if not shippable.
        if (this.status === 'unshippable') {
            return index.h(index.Host, { style: { display: 'none' } });
        }
        return (index.h("sc-tag", { type: this.getType(), pill: this.pill }, this.getLabel()));
    }
};
ScFulfillmentShippingStatusBadge.style = ScFulfillmentShippingStatusBadgeStyle0;

exports.sc_fulfillment_shipping_status_badge = ScFulfillmentShippingStatusBadge;

//# sourceMappingURL=sc-fulfillment-shipping-status-badge.cjs.entry.js.map