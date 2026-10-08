import { r as registerInstance, h, a as getElement } from './index-25e5af33.js';
import './fetch-cdff67be.js';
import { o as onFirstVisible } from './lazy-deb42890.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import { a as apiFetch } from './index-824c562b.js';
import './remove-query-args-938c53ea.js';

const scOrdersListCss = ":host{display:block}.orders-list{display:grid;gap:0.75em}.orders-list__status{display:flex;align-items:center;gap:var(--sc-spacing-x-small)}.orders-list__heading{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between}.orders-list__title{font-size:var(--sc-font-size-x-large);font-weight:var(--sc-font-weight-bold);line-height:var(--sc-line-height-dense)}.orders-list a{text-decoration:none;font-weight:var(--sc-font-weight-semibold);display:inline-flex;align-items:center;gap:0.25em;color:var(--sc-color-primary-500)}.order__row{color:var(--sc-color-gray-800);text-decoration:none;display:grid;align-items:center;justify-content:space-between;gap:0;grid-template-columns:1fr 1fr 1fr auto;margin:0;padding:var(--sc-spacing-small) var(--sc-spacing-large)}.order__row:not(:last-child){border-bottom:1px solid var(--sc-color-gray-200)}.order__row:hover{background:var(--sc-color-gray-50)}.order__date{font-weight:var(--sc-font-weight-semibold)}";
const ScOrdersListStyle0 = scOrdersListCss;

const ScOrdersList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.query = {
            page: 1,
            per_page: 10,
        };
        this.allLink = undefined;
        this.heading = undefined;
        this.isCustomer = undefined;
        this.orders = [];
        this.loading = undefined;
        this.busy = undefined;
        this.error = undefined;
        this.pagination = {
            total: 0,
            total_pages: 0,
        };
    }
    /** Only fetch if visible */
    componentWillLoad() {
        onFirstVisible(this.el, () => {
            this.initialFetch();
        });
    }
    async initialFetch() {
        try {
            this.loading = true;
            await this.getOrders();
        }
        catch (e) {
            console.error(this.error);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.loading = false;
        }
    }
    async fetchOrders() {
        try {
            this.busy = true;
            await this.getOrders();
        }
        catch (e) {
            console.error(this.error);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    /** Get all orders */
    async getOrders() {
        if (!this.isCustomer) {
            return;
        }
        const response = (await await apiFetch({
            path: addQueryArgs(`surecart/v1/orders/`, {
                expand: ['checkout', 'checkout.line_items', 'checkout.charge'],
                ...this.query,
            }),
            parse: false,
        }));
        this.pagination = {
            total: parseInt(response.headers.get('X-WP-Total')),
            total_pages: parseInt(response.headers.get('X-WP-TotalPages')),
        };
        this.orders = (await response.json());
        return this.orders;
    }
    nextPage() {
        this.query.page = this.query.page + 1;
        this.fetchOrders();
    }
    prevPage() {
        this.query.page = this.query.page - 1;
        this.fetchOrders();
    }
    renderStatusBadge(order) {
        const { status, checkout } = order;
        const { charge } = checkout;
        if (charge && typeof charge === 'object') {
            if (charge === null || charge === void 0 ? void 0 : charge.fully_refunded) {
                return h("sc-tag", { type: "danger" }, wp.i18n.__('Refunded', 'surecart'));
            }
            if (charge === null || charge === void 0 ? void 0 : charge.refunded_amount) {
                return h("sc-tag", { type: "info" }, wp.i18n.__('Partially Refunded', 'surecart'));
            }
        }
        return h("sc-order-status-badge", { status: status });
    }
    renderLoading() {
        return (h("sc-card", { noPadding: true }, h("sc-stacked-list", null, h("sc-stacked-list-row", { style: { '--columns': '4' }, "mobile-size": 500 }, [...Array(4)].map(() => (h("sc-skeleton", { style: { width: '100px', display: 'inline-block' } })))))));
    }
    renderEmpty() {
        return (h("div", null, h("sc-divider", { style: { '--spacing': '0' } }), h("slot", { name: "empty" }, h("sc-empty", { icon: "shopping-bag" }, wp.i18n.__("You don't have any orders.", 'surecart')))));
    }
    renderList() {
        return this.orders.map(order => {
            const { checkout, created_at_date, id } = order;
            if (!checkout)
                return null;
            const { amount_due_display_amount, charge, delivered_items_count } = checkout;
            const itemsCount = delivered_items_count || 0;
            return (h("sc-stacked-list-row", { href: addQueryArgs(window.location.href, {
                    action: 'show',
                    model: 'order',
                    id,
                }), style: { '--columns': '4' }, "mobile-size": 500 }, h("div", { class: "order__date" }, typeof charge !== 'string' && ((charge === null || charge === void 0 ? void 0 : charge.created_at_date) || created_at_date)), h("div", null, h("sc-text", { truncate: true, style: {
                    '--color': 'var(--sc-color-gray-500)',
                } }, wp.i18n.sprintf(wp.i18n._n('%s item', '%s items', itemsCount, 'surecart'), itemsCount))), h("div", { class: "orders-list__status" }, this.renderStatusBadge(order), h("sc-order-shipment-badge", { context: "customer", status: order === null || order === void 0 ? void 0 : order.shipment_status })), h("div", null, amount_due_display_amount)));
        });
    }
    renderContent() {
        var _a;
        if (this.loading) {
            return this.renderLoading();
        }
        if (((_a = this.orders) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            return this.renderEmpty();
        }
        return (h("sc-card", { "no-padding": true }, h("sc-stacked-list", null, this.renderList())));
    }
    render() {
        var _a, _b;
        return (h("sc-dashboard-module", { key: 'c22c8e0e00e478d7a4f680ea7becfeedc2e24ba8', class: "orders-list", error: this.error }, h("span", { key: 'fb09e97de4e1e83574e02553bf614358e4321a09', slot: "heading" }, h("slot", { key: '168eac0428faed3ec7d6cbd95a11157e38b0fd61', name: "heading" }, this.heading || wp.i18n.__('Order History', 'surecart'))), !!this.allLink && !!((_a = this.orders) === null || _a === void 0 ? void 0 : _a.length) && (h("sc-button", { key: 'fece36049f307d4e6cad86d662c77533817b5852', type: "link", href: this.allLink, slot: "end", "aria-label": wp.i18n.sprintf(wp.i18n.__('View all %s', 'surecart'), this.heading || wp.i18n.__('Order History', 'surecart')) }, wp.i18n.__('View all', 'surecart'), h("sc-icon", { key: '50a401ec67e93863743fe0cfcc0e772e8bca388d', "aria-hidden": "true", name: "chevron-right", slot: "suffix" }))), this.renderContent(), !this.allLink && (h("sc-pagination", { key: 'e61c5a568b8332f2d7584325fbe7db7fb9d9e6ef', page: this.query.page, perPage: this.query.per_page, total: this.pagination.total, totalPages: this.pagination.total_pages, totalShowing: (_b = this === null || this === void 0 ? void 0 : this.orders) === null || _b === void 0 ? void 0 : _b.length, onScNextPage: () => this.nextPage(), onScPrevPage: () => this.prevPage() })), this.busy && h("sc-block-ui", { key: '504a5bb4716a15090755ac17c16c7bc7ef0c3ecf' })));
    }
    get el() { return getElement(this); }
};
ScOrdersList.style = ScOrdersListStyle0;

export { ScOrdersList as sc_orders_list };

//# sourceMappingURL=sc-orders-list.entry.js.map