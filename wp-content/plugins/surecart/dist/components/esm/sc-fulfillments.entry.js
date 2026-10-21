import { r as registerInstance, h, a as getElement, H as Host } from './index-25e5af33.js';
import './fetch-cdff67be.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import { a as apiFetch } from './index-824c562b.js';
import './remove-query-args-938c53ea.js';

const scFulfillmentsCss = ".fulfillment{display:grid;gap:var(--sc-spacing-x-large)}.fulfillment__number{font-weight:bold}.fulfillment__header{display:flex;align-items:center;gap:var(--sc-spacing-medium)}sc-card{--sc-card-padding:var(--sc-spacing-x-large)}.trackings{display:flex;gap:0.75em;color:var(--sc-line-item-title-color, var(--sc-input-label-color))}.trackings__title{line-height:var(--sc-line-height-dense);font-weight:var(--sc-font-weight-bold)}.trackings sc-icon{opacity:0.5;font-size:22px}.line_items{display:grid;gap:var(--sc-spacing-large)}.line_item__info{display:flex;gap:var(--sc-spacing-medium);align-items:center}.line_item__image img{width:var(--sc-product-line-item-image-size, 4em);height:var(--sc-product-line-item-image-size, 4em);object-fit:cover;border-radius:4px;border:solid 1px var(--sc-input-border-color, var(--sc-input-border));display:block;box-shadow:var(--sc-input-box-shadow)}";
const ScFulfillmentsStyle0 = scFulfillmentsCss;

const ScFulfillments = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.orderId = undefined;
        this.heading = undefined;
        this.showPreShipmentNotice = true;
        this.fulfillments = undefined;
        this.awaitingFulfillment = false;
        this.loading = undefined;
        this.busy = undefined;
        this.error = undefined;
    }
    componentDidLoad() {
        this.fetch();
    }
    async fetch() {
        try {
            this.busy = true;
            const fulfillments = (await apiFetch({
                path: addQueryArgs(`surecart/v1/fulfillments`, {
                    // Expand only the top-level shipment for tracking — never rates/selected_rate/from_contact, which would leak label costs and the warehouse address to customers.
                    expand: ['trackings', 'shipments', 'fulfillment_items', 'fulfillment_item.line_item', 'line_item.price', 'price.product'],
                    order_ids: [this.orderId],
                    shipment_status: ['shipped', 'delivered', 'in_transit', 'label_purchased', 'unshipped', 'returned', 'failed'],
                }),
            }));
            // Voiding a label resets shipment_status to unshipped; the voided shipment is the marker a label existed. Keep those visible, hide never-labeled unshipped fulfillments.
            this.fulfillments = fulfillments.filter(fulfillment => { var _a; return (fulfillment === null || fulfillment === void 0 ? void 0 : fulfillment.shipment_status) !== 'unshipped' || (((_a = fulfillment === null || fulfillment === void 0 ? void 0 : fulfillment.shipments) === null || _a === void 0 ? void 0 : _a.data) || []).some(shipment => (shipment === null || shipment === void 0 ? void 0 : shipment.status) === 'voided'); });
            // Only pay for the order fetch when there's nothing to show.
            if (!this.fulfillments.length && this.showPreShipmentNotice) {
                await this.checkAwaitingFulfillment();
            }
        }
        catch (e) {
            console.error(this.error);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    /** A paid/processing order with a shippable item and no fulfillments gets an "Order Received" notice. Fails silent — worst case we hide the notice, not the page. */
    async checkAwaitingFulfillment() {
        var _a, _b;
        try {
            const order = (await apiFetch({
                path: addQueryArgs(`surecart/v1/orders/${this.orderId}`, {
                    expand: ['checkout', 'checkout.line_items', 'line_item.price', 'price.product'],
                }),
            }));
            const hasShippableItem = (((_b = (_a = order === null || order === void 0 ? void 0 : order.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) || []).some(item => { var _a, _b; return !!((_b = (_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.shipping_enabled); });
            this.awaitingFulfillment = hasShippableItem && ['paid', 'processing'].includes(order === null || order === void 0 ? void 0 : order.status);
        }
        catch (e) {
            console.error(e);
        }
    }
    renderLoading() {
        return (h("sc-flex", { flexDirection: "column", style: { gap: '1em' } }, h("sc-skeleton", { style: { width: '20%', display: 'inline-block' } }), h("sc-skeleton", { style: { width: '60%', display: 'inline-block' } }), h("sc-skeleton", { style: { width: '40%', display: 'inline-block' } })));
    }
    renderOrderReceived() {
        return (h("sc-spacing", { style: { '--spacing': 'var(--sc-spacing-large)' } }, h("sc-dashboard-module", null, h("span", { slot: "heading" }, this.heading || wp.i18n.__('Shipment', 'surecart')), h("sc-card", { noPadding: true }, h("sc-stacked-list", null, h("sc-stacked-list-row", null, h("div", { class: "fulfillment__header" }, h("sc-tag", { type: "info" }, wp.i18n.__('Order Received', 'surecart')), h("div", null, wp.i18n.__('Your item will ship soon.', 'surecart')))))))));
    }
    render() {
        var _a, _b;
        if (this.loading || !((_a = this.fulfillments) === null || _a === void 0 ? void 0 : _a.length)) {
            // awaitingFulfillment only flips after both fetches resolve, so nothing flashes mid-flight.
            if (this.awaitingFulfillment && this.showPreShipmentNotice)
                return this.renderOrderReceived();
            return h(Host, { style: { display: 'none' } });
        }
        return (h("sc-spacing", { style: { '--spacing': 'var(--sc-spacing-large)' } }, h("sc-dashboard-module", { error: this.error }, h("span", { slot: "heading" }, this.heading || wp.i18n._n('Shipment', 'Shipments', (_b = this.fulfillments) === null || _b === void 0 ? void 0 : _b.length, 'surecart')), this.fulfillments.map(fulfillment => {
            var _a, _b, _c;
            // A purchased label wins over a voided one it replaced — data[0] may still be the voided original.
            const shipments = ((_a = fulfillment === null || fulfillment === void 0 ? void 0 : fulfillment.shipments) === null || _a === void 0 ? void 0 : _a.data) || [];
            const shipment = shipments.find(s => (s === null || s === void 0 ? void 0 : s.status) === 'purchased') || shipments.find(s => (s === null || s === void 0 ? void 0 : s.status) !== 'voided') || shipments[0];
            // Shipment tracking wins; otherwise merchant-entered trackings still show even when a draft/voided shipment record exists.
            const hasShipmentTracking = (shipment === null || shipment === void 0 ? void 0 : shipment.status) === 'purchased' && !!(shipment === null || shipment === void 0 ? void 0 : shipment.tracking_number);
            const trackings = hasShipmentTracking ? [{ number: shipment.tracking_number, url: shipment.tracking_url }] : ((_b = fulfillment === null || fulfillment === void 0 ? void 0 : fulfillment.trackings) === null || _b === void 0 ? void 0 : _b.data) || [];
            return (h("sc-card", { noPadding: true }, h("sc-stacked-list", null, h("sc-stacked-list-row", null, h("div", { class: "fulfillment__header" }, h("sc-fulfillment-shipping-status-badge", { status: (shipment === null || shipment === void 0 ? void 0 : shipment.status) === 'voided' ? 'voided' : fulfillment.shipment_status, context: "customer" }), h("div", { class: "fulfillment__number" }, "#", fulfillment === null || fulfillment === void 0 ? void 0 :
                fulfillment.number))), !!trackings.length && (h("sc-stacked-list-row", null, h("div", { class: "trackings" }, h("sc-icon", { name: "truck" }), h("div", { class: "trackings__details" }, h("div", { class: "trackings__title" }, hasShipmentTracking && (shipment === null || shipment === void 0 ? void 0 : shipment.carrier)
                ? wp.i18n.sprintf(wp.i18n.__('Tracking number via %s', 'surecart'), shipment.carrier)
                : wp.i18n._n('Tracking number', 'Tracking numbers', trackings.length, 'surecart')), h("div", { class: "trackings__list" }, trackings.map(({ number, url }) => (h("a", { href: url, target: "_blank", rel: "noopener noreferrer" }, number)))))))), (((_c = fulfillment === null || fulfillment === void 0 ? void 0 : fulfillment.fulfillment_items) === null || _c === void 0 ? void 0 : _c.data) || []).map(({ id, line_item, quantity }) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                return (h("sc-stacked-list-row", { key: id, style: { '--columns': '2' } }, h("div", null, h("div", { class: "line_item__info" }, h("div", { class: "line_item__image" }, !!((_b = (_a = line_item === null || line_item === void 0 ? void 0 : line_item.price) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.line_item_image) && h("img", { ...(_d = (_c = line_item === null || line_item === void 0 ? void 0 : line_item.price) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.line_item_image })), h("div", { class: "line_item__text" }, h("div", null, (_f = (_e = line_item === null || line_item === void 0 ? void 0 : line_item.price) === null || _e === void 0 ? void 0 : _e.product) === null || _f === void 0 ? void 0 : _f.name), h("div", null, !!((_h = (_g = line_item === null || line_item === void 0 ? void 0 : line_item.price) === null || _g === void 0 ? void 0 : _g.product) === null || _h === void 0 ? void 0 : _h.weight) && (h("sc-format-number", { type: "unit", value: (_k = (_j = line_item === null || line_item === void 0 ? void 0 : line_item.price) === null || _j === void 0 ? void 0 : _j.product) === null || _k === void 0 ? void 0 : _k.weight, unit: (_m = (_l = line_item === null || line_item === void 0 ? void 0 : line_item.price) === null || _l === void 0 ? void 0 : _l.product) === null || _m === void 0 ? void 0 : _m.weight_unit })))))), h("span", null, wp.i18n.sprintf(wp.i18n.__('Qty: %d', 'surecart'), quantity || 0))));
            }))));
        }))));
    }
    get el() { return getElement(this); }
};
ScFulfillments.style = ScFulfillmentsStyle0;

export { ScFulfillments as sc_fulfillments };

//# sourceMappingURL=sc-fulfillments.entry.js.map