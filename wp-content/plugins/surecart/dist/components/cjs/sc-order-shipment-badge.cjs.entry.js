'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');

const scOrderShipmentBadgeCss = ":host{display:inline-block;vertical-align:middle}";
const ScOrderShipmentBadgeStyle0 = scOrderShipmentBadgeCss;

const status = {
    unshipped: wp.i18n.__('Not Shipped', 'surecart'),
    shipped: wp.i18n.__('Shipped', 'surecart'),
    partially_shipped: wp.i18n.__('Partially Shipped', 'surecart'),
    delivered: wp.i18n.__('Delivered', 'surecart'),
    label_purchased: wp.i18n.__('Label Purchased', 'surecart'),
    in_transit: wp.i18n.__('In Transit', 'surecart'),
};
// Customer-facing overrides for statuses whose default (merchant) wording is too technical.
const customerStatus = {
    label_purchased: wp.i18n.__('Preparing to Ship', 'surecart'),
};
const type = {
    unshipped: 'default',
    shipped: 'info',
    partially_shipped: 'warning',
    delivered: 'success',
    label_purchased: 'info',
    in_transit: 'warning',
};
const ScOrderShipmentBadge = class {
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
    render() {
        // don't render if not shippable.
        if (this.status === 'unshippable') {
            return index.h(index.Host, { style: { display: 'none' } });
        }
        return (index.h("sc-tag", { type: type === null || type === void 0 ? void 0 : type[this === null || this === void 0 ? void 0 : this.status], pill: this.pill }, this.getLabel()));
    }
};
ScOrderShipmentBadge.style = ScOrderShipmentBadgeStyle0;

exports.sc_order_shipment_badge = ScOrderShipmentBadge;

//# sourceMappingURL=sc-order-shipment-badge.cjs.entry.js.map