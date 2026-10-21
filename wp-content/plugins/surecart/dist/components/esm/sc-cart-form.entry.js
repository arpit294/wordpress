import { r as registerInstance, h } from './index-25e5af33.js';
import { c as convertLineItemsToLineItemData } from './index-17aac936.js';
import { c as createOrUpdateCheckout } from './index-396e50a3.js';
import { s as state, u as updateFormState, a as store } from './mutations-54fc7af1.js';
import './fetch-cdff67be.js';
import './index-824c562b.js';
import './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';
import './index-18f5a1bc.js';
import './utils-2fd36c2c.js';
import './index-c5a96d53.js';
import './google-e9085e27.js';
import './currency-eb33deae.js';
import './store-fd165874.js';
import './price-39d60d32.js';

const query = {
    expand: [
        'line_items',
        'line_item.price',
        'line_item.component_line_items',
        'price.product',
        'customer',
        'customer.shipping_address',
        'payment_intent',
        'discount',
        'discount.promotion',
        'discount.coupon',
        'shipping_address',
        'tax_identifier',
    ],
};
const ScCartForm = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.quantity = 1;
        this.priceId = undefined;
        this.variantId = undefined;
        this.mode = 'live';
        this.formId = undefined;
        this.busy = undefined;
        this.error = undefined;
    }
    /** Find a line item with this price. */
    getLineItem() {
        var _a, _b, _c;
        const lineItem = (((_b = (_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) || []).find(item => {
            var _a, _b, _c;
            if (this.variantId) {
                return ((_a = item.variant) === null || _a === void 0 ? void 0 : _a.id) === this.variantId && ((_b = item.price) === null || _b === void 0 ? void 0 : _b.id) === this.priceId;
            }
            return ((_c = item.price) === null || _c === void 0 ? void 0 : _c.id) === this.priceId;
        });
        if (!(lineItem === null || lineItem === void 0 ? void 0 : lineItem.id)) {
            return false;
        }
        return {
            id: lineItem === null || lineItem === void 0 ? void 0 : lineItem.id,
            price_id: (_c = lineItem === null || lineItem === void 0 ? void 0 : lineItem.price) === null || _c === void 0 ? void 0 : _c.id,
            quantity: lineItem === null || lineItem === void 0 ? void 0 : lineItem.quantity,
        };
    }
    /** Add the item to cart. */
    async addToCart() {
        const { price } = await this.form.getFormJson();
        try {
            updateFormState('FETCH');
            // if it's ad_hoc, update the amount. Otherwise increment the quantity.
            state.checkout = await this.addOrUpdateLineItem({
                ...(!!price ? { ad_hoc_amount: parseInt(price) || null } : {}),
                ...(!!this.variantId ? { variant_id: this.variantId || null } : {}),
            });
            updateFormState('RESOLVE');
            // store the checkout in localstorage and open the cart
            store.set('cart', { ...store.state.cart, ...{ open: true } });
        }
        catch (e) {
            updateFormState('REJECT');
            console.error(e);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
    }
    async addOrUpdateLineItem(data = {}) {
        var _a, _b;
        // get the current line item from the price id.
        let lineItem = this.getLineItem();
        // convert line items response to line items post.
        let existingData = convertLineItemsToLineItemData(((_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) || []);
        // Line item does not exist. Add it.
        return (await createOrUpdateCheckout({
            id: (_b = state === null || state === void 0 ? void 0 : state.checkout) === null || _b === void 0 ? void 0 : _b.id,
            data: {
                live_mode: this.mode === 'live',
                line_items: [
                    ...(existingData || []).map((item) => {
                        // if the price ids match (we have already a line item)
                        const priceOrVariantMatches = this.variantId ? item.price_id === this.priceId && item.variant_id === this.variantId : item.price_id === this.priceId;
                        if (priceOrVariantMatches) {
                            return {
                                ...item,
                                ...(!!(data === null || data === void 0 ? void 0 : data.ad_hoc_amount) ? { ad_hoc_amount: data === null || data === void 0 ? void 0 : data.ad_hoc_amount } : {}),
                                ...(!!(data === null || data === void 0 ? void 0 : data.variant_id) ? { variant_id: data === null || data === void 0 ? void 0 : data.variant_id } : {}),
                                quantity: !(item === null || item === void 0 ? void 0 : item.ad_hoc_amount) ? (item === null || item === void 0 ? void 0 : item.quantity) + 1 : 1, // only increase quantity if not ad_hoc.
                            };
                        }
                        // return item.
                        return item;
                    }),
                    // add a line item if one does not exist.
                    ...(!lineItem
                        ? [
                            {
                                price_id: this.priceId,
                                variant_id: this.variantId,
                                ...(!!(data === null || data === void 0 ? void 0 : data.ad_hoc_amount) ? { ad_hoc_amount: data === null || data === void 0 ? void 0 : data.ad_hoc_amount } : {}),
                                quantity: 1,
                            },
                        ]
                        : []),
                ],
            },
            query: {
                ...query,
                form_id: this.formId,
            },
        }));
    }
    render() {
        return (h("sc-form", { key: '9f4a2ccb6c9a35109838c5f3ea0157a141d6e850', ref: el => (this.form = el), onScSubmit: () => {
                this.addToCart();
            } }, this.error && (h("sc-alert", { key: 'e25386d06f59c3377a495f40c52006771217dbfb', open: !!this.error, type: "danger" }, h("span", { key: '32fdb72ef49a9a34abc0f9b12e0c3b0e2244d142', slot: "title" }, wp.i18n.__('Error', 'surecart')), this.error)), h("slot", { key: '3cbfd139b9e1acc74ad33c30cd1e536357cfe407' })));
    }
};
ScCartForm.style = "sc-cart-form { display: inline-block }";

export { ScCartForm as sc_cart_form };

//# sourceMappingURL=sc-cart-form.entry.js.map