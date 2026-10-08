'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');

const scInvoiceStatusBadgeCss = ":host{display:inline-block;vertical-align:middle}";
const ScInvoiceStatusBadgeStyle0 = scInvoiceStatusBadgeCss;

const ScInvoiceStatusBadge = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.status = undefined;
        this.size = 'medium';
        this.pill = false;
        this.clearable = false;
    }
    getType() {
        switch (this.status) {
            case 'paid':
                return 'success';
            case 'open':
                return 'info';
            case 'draft':
                return 'default';
        }
    }
    getText() {
        switch (this.status) {
            case 'paid':
                return wp.i18n.__('Paid', 'surecart');
            case 'open':
                return wp.i18n.__('Open', 'surecart');
            case 'draft':
                return wp.i18n.__('Draft', 'surecart');
            default:
                return this.status;
        }
    }
    render() {
        return (index.h("sc-tag", { key: 'cf567f71c8ec468c7279f1d0b615830b7bb792a4', type: this.getType(), pill: this.pill }, this.getText()));
    }
};
ScInvoiceStatusBadge.style = ScInvoiceStatusBadgeStyle0;

exports.sc_invoice_status_badge = ScInvoiceStatusBadge;

//# sourceMappingURL=sc-invoice-status-badge.cjs.entry.js.map