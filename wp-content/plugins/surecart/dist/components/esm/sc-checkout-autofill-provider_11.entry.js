import { r as registerInstance, h, H as Host, c as createEvent, a as getElement } from './index-25e5af33.js';
import { o as onChange$1, s as state$1, u as updateFormState } from './mutations-54fc7af1.js';
import { l as lockCheckout, b as unLockCheckout, c as clearCheckout } from './mutations-acb88b38.js';
import { o as onChange, s as state } from './store-ea636731.js';
import { c as createOrUpdateCheckout, d as updateCheckout, e as expand, f as finalizeCheckout, g as fetchCheckout, h as createCheckout } from './index-396e50a3.js';
import { g as getCurrentCustomer, h as hasAddressData, i as isAddressEmpty } from './index-d602bc13.js';
import { a as isIpCountryCapturable, g as getGeoPermissionDefaults } from './geo-permission-b221a71a.js';
import { c as currentFormState, a as formLoading, f as formBusy } from './getters-3801a0c9.js';
import { d as getPerBundleQuantity } from './index-17aac936.js';
import './watchers-c2958e52.js';
import { s as state$2, f as getAvailableProcessor } from './getters-476a5a84.js';
import { s as state$3 } from './watchers-c7bbc6b2.js';
import { s as shippingAddressRequired, f as fullShippingAddressRequired, p as phoneRequired } from './getters-ed04d1c9.js';
import { v, c as checkoutMachine, s as state$4 } from './store-fd165874.js';
import './fetch-cdff67be.js';
import { a as apiFetch } from './index-824c562b.js';
import { s as speak } from './index-c5a96d53.js';
import { c as createErrorNotice, r as removeNotice, a as createInfoNotice } from './mutations-7458343f.js';
import { a as addQueryArgs, g as getQueryArgs } from './add-query-args-0e2a8393.js';
import { p as parseFormData } from './form-data-76641f16.js';
import { r as removeQueryArgs, g as getQueryArg } from './remove-query-args-938c53ea.js';
import './index-18f5a1bc.js';
import './utils-2fd36c2c.js';
import './google-e9085e27.js';
import './currency-eb33deae.js';
import './price-39d60d32.js';
import './util-dfbf863e.js';
import './address-b8e2e4c8.js';

const ScCheckoutAutofillProvider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    componentWillLoad() {
        this.maybeApplyProfile();
        this.removeUserListener = onChange('loggedIn', loggedIn => {
            if (!loggedIn) {
                // A later login on the same checkout should re-apply.
                this.appliedForCheckoutId = undefined;
                return;
            }
            this.maybeApplyProfile();
        });
        this.removeCheckoutListener = onChange$1('checkout', () => this.maybeApplyProfile());
    }
    disconnectedCallback() {
        var _a, _b;
        (_a = this.removeUserListener) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = this.removeCheckoutListener) === null || _b === void 0 ? void 0 : _b.call(this);
    }
    async maybeApplyProfile() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!state.loggedIn)
            return;
        const checkoutId = (_a = state$1.checkout) === null || _a === void 0 ? void 0 : _a.id;
        if (!checkoutId)
            return;
        if (this.appliedForCheckoutId === checkoutId)
            return;
        this.appliedForCheckoutId = checkoutId;
        try {
            const customer = await getCurrentCustomer(state$1.mode);
            const patch = {};
            // The shipping/billing fields on Customer are typed as `string | Address`; here they
            // are expanded into Address objects via the `expand` param, so this cast is safe.
            const shippingAddress = customer === null || customer === void 0 ? void 0 : customer.shipping_address;
            const billingAddress = customer === null || customer === void 0 ? void 0 : customer.billing_address;
            if (hasAddressData(shippingAddress) && isAddressEmpty((_b = state$1.checkout) === null || _b === void 0 ? void 0 : _b.shipping_address)) {
                patch.shipping_address = shippingAddress;
            }
            if (hasAddressData(billingAddress) && isAddressEmpty((_c = state$1.checkout) === null || _c === void 0 ? void 0 : _c.billing_address)) {
                patch.billing_address = billingAddress;
            }
            if ((customer === null || customer === void 0 ? void 0 : customer.first_name) && !((_d = state$1.checkout) === null || _d === void 0 ? void 0 : _d.first_name)) {
                patch.first_name = customer.first_name;
            }
            if ((customer === null || customer === void 0 ? void 0 : customer.last_name) && !((_e = state$1.checkout) === null || _e === void 0 ? void 0 : _e.last_name)) {
                patch.last_name = customer.last_name;
            }
            if ((customer === null || customer === void 0 ? void 0 : customer.phone) && !((_f = state$1.checkout) === null || _f === void 0 ? void 0 : _f.phone)) {
                patch.phone = customer.phone;
            }
            // Respect the customer's saved billing-matches-shipping preference so the checkout
            // toggle reflects their profile instead of the checkout default.
            if (typeof (customer === null || customer === void 0 ? void 0 : customer.billing_matches_shipping) === 'boolean' && ((_g = state$1.checkout) === null || _g === void 0 ? void 0 : _g.billing_matches_shipping) !== customer.billing_matches_shipping) {
                patch.billing_matches_shipping = customer.billing_matches_shipping;
            }
            // Nothing to apply — skip the lock entirely.
            if (!Object.keys(patch).length)
                return;
            lockCheckout('customer-profile-autofill');
            try {
                state$1.checkout = (await createOrUpdateCheckout({ id: (_h = state$1.checkout) === null || _h === void 0 ? void 0 : _h.id, data: patch }));
            }
            finally {
                unLockCheckout('customer-profile-autofill');
            }
        }
        catch (e) {
            // Convenience feature — don't block checkout; clear the flag so a later trigger can retry.
            this.appliedForCheckoutId = undefined;
            console.error(e);
        }
    }
    render() {
        return (h(Host, { key: 'ffebf9993c96bcbf74e208923c7c06d3294c708f' }, h("slot", { key: 'bf23b4641caaab47d68f7e9a0881ced32882b662' })));
    }
};

/**
 * Get the customer's coordinates via the browser Geolocation API.
 * The browser prompts for permission if not already granted; resolves
 * null when denied, unsupported, or the lookup fails — never throws.
 */
const getGeoCoordinates = async () => {
    try {
        if (!(navigator === null || navigator === void 0 ? void 0 : navigator.geolocation)) {
            return null;
        }
        return await new Promise(resolve => {
            navigator.geolocation.getCurrentPosition(({ coords }) => resolve({ latitude: coords.latitude, longitude: coords.longitude }), () => resolve(null), { maximumAge: 15 * 60 * 1000, timeout: 10000 });
        });
    }
    catch {
        return null;
    }
};

const scCheckoutGeoPermissionCss = ":host{display:block}.geo-permission{--body-spacing:var(--sc-spacing-x-large);--width:460px}.geo-permission__content{line-height:1.5}.geo-permission__content p{margin:0 0 var(--sc-spacing-small)}.geo-permission__content p:first-child{margin-top:0}.geo-permission__content p:last-child{margin-bottom:0}";
const ScCheckoutGeoPermissionStyle0 = scCheckoutGeoPermissionCss;

/** localStorage key that remembers the customer's decision so we honor it on future visits. */
const DECISION_KEY = 'sc_geo_capture_decision';
const ScCheckoutGeoPermission = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.open = false;
    }
    /**
     * Whether the checkout is ready to be asked about: it has items to price, and the
     * IP-resolved country is one the merchant captures for. Both arrive async — the
     * persisted checkout may predate the `ip_geo_address` expansion — so callers wait
     * for the first checkout that passes rather than judging one snapshot.
     */
    isReady() {
        var _a, _b, _c;
        return !!((_c = (_b = (_a = state$1.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.pagination) === null || _c === void 0 ? void 0 : _c.count) && isIpCountryCapturable(state$1.checkout, state$1.geoAddressCapturableCountries);
    }
    /** Whether the customer dismissed our explainer ("Not now") on a previous visit. */
    wasDismissed() {
        try {
            return window.localStorage.getItem(DECISION_KEY) === 'declined';
        }
        catch {
            return false;
        }
    }
    /** Remember a dismissal so we don't re-show the explainer on every visit. */
    rememberDismissed() {
        try {
            window.localStorage.setItem(DECISION_KEY, 'declined');
        }
        catch {
            // Storage unavailable (private mode etc.) — the dismissal simply isn't remembered.
        }
    }
    /**
     * The browser's current geolocation permission, or null if the Permissions API is
     * unavailable (e.g. older Safari). Lets us avoid showing an explainer whose Allow
     * button can't actually trigger a prompt.
     */
    async getPermissionState() {
        var _a, _b;
        try {
            const status = await ((_a = navigator.permissions) === null || _a === void 0 ? void 0 : _a.query({ name: 'geolocation' }));
            return (_b = status === null || status === void 0 ? void 0 : status.state) !== null && _b !== void 0 ? _b : null;
        }
        catch {
            return null;
        }
    }
    async componentDidLoad() {
        // Nothing to do unless the merchant enabled capture and the browser can actually geolocate.
        if (!state$1.captureGeoAddressEnabled)
            return;
        if (!(window === null || window === void 0 ? void 0 : window.isSecureContext) || !(navigator === null || navigator === void 0 ? void 0 : navigator.geolocation))
            return;
        // Don't request location for an empty cart (nothing to price yet, and a full-screen
        // prompt before adding items feels premature) or for buyers outside the merchant's
        // target countries. If the checkout isn't ready, wait for the first change that is.
        if (this.isReady()) {
            this.maybePromptForLocation();
            return;
        }
        this.removeCheckoutListener = onChange$1('checkout', () => {
            var _a;
            if (!this.isReady())
                return;
            (_a = this.removeCheckoutListener) === null || _a === void 0 ? void 0 : _a.call(this);
            this.removeCheckoutListener = undefined;
            this.maybePromptForLocation();
        });
    }
    disconnectedCallback() {
        var _a;
        (_a = this.removeCheckoutListener) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    /** Decide, based on the browser permission, whether to capture silently, explain, or do nothing. */
    async maybePromptForLocation() {
        const permission = await this.getPermissionState();
        // Already granted at the browser level: capture silently — no need to ask again.
        if (permission === 'granted') {
            this.capture();
            return;
        }
        // Blocked at the browser level: JS can't re-prompt, so don't show an Allow button we can't fulfill.
        // Checkout continues normally with no capture; the customer can re-enable in their browser settings.
        if (permission === 'denied')
            return;
        // State is 'prompt' (or unknown): respect a prior "Not now", otherwise explain before prompting.
        if (this.wasDismissed())
            return;
        this.open = true;
    }
    /** Capture coordinates into the checkout store. They ride along on the next update/finalize. */
    async capture() {
        if (state$1.geoCoordinates)
            return;
        state$1.geoCoordinates = await getGeoCoordinates();
    }
    /** Customer opted in — close and fire the native browser prompt. */
    onAllow() {
        this.open = false;
        this.capture();
    }
    /** Customer dismissed — remember it and close. Checkout continues with no capture. */
    onDecline() {
        this.rememberDismissed();
        this.open = false;
    }
    render() {
        const { geoCapture } = state$1;
        // Shared defaults (see getGeoPermissionDefaults) so merchant fields can stay empty and
        // the admin placeholders and this dialog never drift apart.
        const defaults = getGeoPermissionDefaults();
        const title = (geoCapture === null || geoCapture === void 0 ? void 0 : geoCapture.title) || defaults.title;
        const content = (geoCapture === null || geoCapture === void 0 ? void 0 : geoCapture.content) || defaults.content;
        const allowLabel = (geoCapture === null || geoCapture === void 0 ? void 0 : geoCapture.allowLabel) || defaults.allowLabel;
        const declineLabel = (geoCapture === null || geoCapture === void 0 ? void 0 : geoCapture.declineLabel) || defaults.declineLabel;
        return (h(Host, { key: '0d45b5dae4c9360b480c4974804e795e248ba7c2' }, h("sc-dialog", { key: 'df1fe4f09f3277b6c130273eeb0583c1c1ea87d8', open: this.open, noHeader: true, onScRequestClose: () => this.onDecline(), class: "geo-permission" }, h("sc-dashboard-module", { key: 'a9f984d81450c9590294b79ca2c3f8d21eccb2f9', style: { '--sc-dashboard-module-spacing': '1em' } }, h("sc-flex", { key: 'bd04904dcaf49bded24d7e595ce98270a20de720', slot: "heading", "align-items": "center", "justify-content": "flex-start" }, h("sc-icon", { key: 'cacf91cca40dfc1f717dcdb3a573016907322546', name: "map-pin", style: { color: 'var(--sc-color-primary-500)' } }), title), h("div", { key: 'c083947e2f61f38862b44f5e90ce08d781d63acd', slot: "description", class: "geo-permission__content", innerHTML: content })), h("sc-button", { key: '5d11154a47ee136a0bc199fcb7bfb1bfc55ec3a6', slot: "footer", type: "text", onClick: () => this.onDecline() }, declineLabel), h("sc-button", { key: '9d95e4fc5ea72a989edee552cea41457e7b55b07', slot: "footer", type: "primary", onClick: () => this.onAllow() }, allowLabel, h("sc-icon", { key: 'af6f9f5ad7cea70659b0cd4ca0422e2775283359', name: "map-pin", slot: "suffix" })))));
    }
};
ScCheckoutGeoPermission.style = ScCheckoutGeoPermissionStyle0;

/**
 * Reconstruct a bundle's `bundle_component_variants` map from its component
 * line items (componentProductId -> variantId).
 *
 * The platform treats `bundle_component_variants` on the parent as write-only:
 * it's accepted on create/update but reads back empty, so the live selection
 * has to be derived from each component line item's chosen variant. Any update
 * that re-posts the map (e.g. a stock swap) must rebuild the *full* map this way
 * — seeding from the empty parent field drops the other components and trips the
 * platform's "selection required" validation.
 */
const getBundleComponentVariants = (parentId, lineItems = []) => {
    const map = {};
    (lineItems || []).forEach(item => {
        var _a, _b, _c;
        if ((item === null || item === void 0 ? void 0 : item.bundle_line_item) !== parentId)
            return;
        const productId = (_b = (_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.id;
        const variantId = (_c = item === null || item === void 0 ? void 0 : item.variant) === null || _c === void 0 ? void 0 : _c.id;
        if (productId && variantId)
            map[productId] = variantId;
    });
    return map;
};
/** Available stock for a line item (variant takes precedence over product). */
const getAvailableStock = (lineItem) => {
    var _a, _b, _c;
    const product = (_a = lineItem === null || lineItem === void 0 ? void 0 : lineItem.price) === null || _a === void 0 ? void 0 : _a.product;
    const stock = ((_b = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant) === null || _b === void 0 ? void 0 : _b.id) ? (_c = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant) === null || _c === void 0 ? void 0 : _c.available_stock : product === null || product === void 0 ? void 0 : product.available_stock;
    return Math.max(Number(stock) || 0, 0);
};
/** Out-of-stock line items (standalone items and bundle components). */
const getOutOfStockLineItems = (lineItems = []) => (lineItems || []).filter(lineItem => (lineItem === null || lineItem === void 0 ? void 0 : lineItem.purchasable_status) === 'out_of_stock' && getAvailableStock(lineItem) < lineItem.quantity);
/**
 * A bundle is atomic, so a short component caps the bundle, not the component:
 * floor(stock / perBundleQty), smallest cap across components. Returns a map of
 * bundle parent id -> reduced quantity.
 *
 * `swappedProductsByParent` lists component products being swapped to an in-stock
 * variant — those are skipped so they don't cap a bundle they no longer limit.
 */
const getBundleQuantityReductions = (lineItems = [], swappedProductsByParent = new Map()) => {
    const reductions = new Map();
    getOutOfStockLineItems(lineItems).forEach(component => {
        var _a, _b, _c, _d;
        if (!component.component_line_item || !component.bundle_line_item)
            return;
        const parent = (lineItems || []).find(li => li.id === component.bundle_line_item);
        if (!(parent === null || parent === void 0 ? void 0 : parent.id))
            return;
        // Skip a component that's being swapped — its old stock no longer caps the bundle.
        const productId = (_b = (_a = component.price) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.id;
        if (productId && ((_c = swappedProductsByParent.get(parent.id)) === null || _c === void 0 ? void 0 : _c.has(productId)))
            return;
        const perBundle = getPerBundleQuantity(component, parent.quantity);
        const maxBundles = Math.floor(getAvailableStock(component) / perBundle);
        const current = (_d = reductions.get(parent.id)) !== null && _d !== void 0 ? _d : parent.quantity;
        reductions.set(parent.id, Math.max(Math.min(current, maxBundles), 0));
    });
    return reductions;
};
/**
 * Payload to fix a stock alert. Posts parents only (components derive from the
 * parent): bundles drop to their reduced quantity, standalone items to available
 * stock. A swapped component is excluded from its bundle's cap, so any *other*
 * short component still reduces the bundle correctly.
 */
const buildStockAdjustedLineItems = (lineItems = [], bundleVariantOverrides = new Map()) => {
    // Component products being swapped, keyed by bundle parent.
    const swappedProductsByParent = new Map(Array.from(bundleVariantOverrides, ([parentId, map]) => [parentId, new Set(Object.keys(map))]));
    const reductions = getBundleQuantityReductions(lineItems, swappedProductsByParent);
    const standalone = new Map();
    getOutOfStockLineItems(lineItems).forEach(lineItem => {
        if (lineItem.component_line_item || !lineItem.id)
            return;
        standalone.set(lineItem.id, getAvailableStock(lineItem));
    });
    return (lineItems || [])
        .filter(lineItem => !lineItem.component_line_item)
        .map(lineItem => {
        var _a, _b, _c, _d;
        const id = lineItem.id;
        const hasSwap = !!id && bundleVariantOverrides.has(id);
        let quantity = lineItem.quantity;
        if (id && reductions.has(id))
            quantity = (_a = reductions.get(id)) !== null && _a !== void 0 ? _a : quantity;
        else if (id && standalone.has(id))
            quantity = (_b = standalone.get(id)) !== null && _b !== void 0 ? _b : quantity;
        return {
            id,
            price_id: (_c = lineItem.price) === null || _c === void 0 ? void 0 : _c.id,
            quantity,
            ...(((_d = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant) === null || _d === void 0 ? void 0 : _d.id) ? { variant: lineItem.variant.id } : {}),
            ...(id && hasSwap ? { bundle_component_variants: bundleVariantOverrides.get(id) } : {}),
        };
    });
};
/**
 * Rows for the stock alert dialog. Bundle components roll up into a single
 * parent row (the bundle quantity is what changes); standalone items show
 * themselves.
 */
const buildStockAlertRows = (lineItems = []) => {
    const reductions = getBundleQuantityReductions(lineItems);
    const seenParents = new Set();
    const rows = [];
    getOutOfStockLineItems(lineItems).forEach(lineItem => {
        var _a, _b, _c;
        if (lineItem.component_line_item && lineItem.bundle_line_item) {
            const parent = (lineItems || []).find(li => li.id === lineItem.bundle_line_item);
            if (!(parent === null || parent === void 0 ? void 0 : parent.id) || seenParents.has(parent.id))
                return;
            seenParents.add(parent.id);
            const product = (_a = parent.price) === null || _a === void 0 ? void 0 : _a.product;
            rows.push({
                name: product === null || product === void 0 ? void 0 : product.name,
                variant: parent === null || parent === void 0 ? void 0 : parent.variant_display_options,
                image: parent === null || parent === void 0 ? void 0 : parent.image,
                from: parent.quantity,
                to: Math.max((_b = reductions.get(parent.id)) !== null && _b !== void 0 ? _b : parent.quantity, 0),
            });
            return;
        }
        const product = (_c = lineItem.price) === null || _c === void 0 ? void 0 : _c.product;
        rows.push({
            name: product === null || product === void 0 ? void 0 : product.name,
            variant: lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant_display_options,
            image: lineItem === null || lineItem === void 0 ? void 0 : lineItem.image,
            from: lineItem.quantity,
            to: getAvailableStock(lineItem),
        });
    });
    return rows;
};

const scCheckoutStockAlertCss = ":host{display:block}sc-table{height:auto}h4{display:block;margin:0;font-weight:var(--sc-font-weight-bold);font-size:var(--sc-font-size-medium)}.stock-alert{--body-spacing:var(--sc-spacing-x-large);--width:500px}.stock-alert__image{width:50px;height:50px;object-fit:cover;margin-right:10px;display:block}.stock-alert__product-info{display:flex;flex-direction:column;gap:var(--sc-spacing-xx-small)}.stock-alert__variant{color:var(--sc-color-gray-500);font-size:var(--sc-font-size-small)}.stock-alert__quantity{color:var(--sc-color-gray-500);font-weight:var(--sc-font-weight-bold);display:flex;align-items:center;justify-content:flex-end;gap:var(--sc-spacing-xx-small)}";
const ScCheckoutStockAlertStyle0 = scCheckoutStockAlertCss;

const ScCheckoutStockAlert = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.scUpdateLineItem = createEvent(this, "scUpdateLineItem", 7);
        this.stockErrors = [];
        this.busy = undefined;
        this.error = undefined;
    }
    /** Current checkout line items. */
    get lineItems() {
        var _a, _b;
        return ((_b = (_a = state$1.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) || [];
    }
    /**
     * Update the checkout to the max available stock.
     *
     * Bundle shortages reduce the whole bundle quantity (a bundle is atomic). A
     * bundle that can't make even one unit (reduced to 0) is first rescued by
     * swapping a gone variant to an in-stock sibling when one exists; otherwise
     * the unfulfillable bundle is dropped from the cart, matching the "→ 0" the
     * dialog already shows.
     */
    async onSubmit() {
        let attemptedBundleSwap = false;
        try {
            this.busy = true;
            this.error = null;
            const items = this.lineItems;
            const reductions = getBundleQuantityReductions(items);
            // Only bundles reduced to 0 need rescuing — try swapping the gone
            // variant to an in-stock sibling so we don't drop a recoverable bundle.
            // If no swap exists the bundle stays at 0 and is removed below.
            const parentOverrides = new Map();
            getOutOfStockLineItems(items).forEach(oos => {
                var _a, _b, _c;
                if (!oos.component_line_item || !oos.bundle_line_item)
                    return;
                const parent = items.find(li => li.id === oos.bundle_line_item);
                if (!(parent === null || parent === void 0 ? void 0 : parent.id) || ((_a = reductions.get(parent.id)) !== null && _a !== void 0 ? _a : 0) >= 1)
                    return;
                const product = (_b = oos.price) === null || _b === void 0 ? void 0 : _b.product;
                if (!(product === null || product === void 0 ? void 0 : product.id))
                    return;
                const swap = (((_c = product === null || product === void 0 ? void 0 : product.variants) === null || _c === void 0 ? void 0 : _c.data) || []).find(v => { var _a, _b; return v.id !== ((_a = oos.variant) === null || _a === void 0 ? void 0 : _a.id) && ((_b = v.available_stock) !== null && _b !== void 0 ? _b : 0) > 0; });
                if (!(swap === null || swap === void 0 ? void 0 : swap.id))
                    return;
                // Rebuild the full selection from the component line items (the parent
                // field reads back empty), then swap the gone variant — posting only the
                // swapped component would fail the platform's per-component requirement.
                const map = parentOverrides.get(parent.id) || getBundleComponentVariants(parent.id, items);
                map[product.id] = swap.id;
                parentOverrides.set(parent.id, map);
            });
            attemptedBundleSwap = parentOverrides.size > 0;
            // Bundles still capped at 0 (no in-stock swap) fall to quantity 0 and are
            // filtered out here — the unfulfillable bundle is simply removed.
            const lineItems = buildStockAdjustedLineItems(items, parentOverrides).filter(lineItem => !!lineItem.quantity);
            state$1.checkout = (await updateCheckout({
                id: state$1.checkout.id,
                data: { line_items: lineItems },
            }));
        }
        catch (error) {
            // A rejected bundle swap surfaces as a generic 500 — show an actionable
            // message so the shopper can remove the item or pick another bundle.
            if (attemptedBundleSwap) {
                this.error = wp.i18n.__('We could not automatically update an out-of-stock bundle item. Please remove it or choose a different bundle.', 'surecart');
            }
            else {
                // Build the message defensively — `additionalErrors?.length && ...`
                // used to evaluate to the literal `0` when there were no additional
                // errors, which then got stringified into the displayed error.
                const additionalErrors = ((error === null || error === void 0 ? void 0 : error.additional_errors) || []).map(e => e === null || e === void 0 ? void 0 : e.message).filter(Boolean);
                const parts = [(error === null || error === void 0 ? void 0 : error.message) || wp.i18n.__('Something went wrong.', 'surecart')];
                if (additionalErrors.length)
                    parts.push(additionalErrors.join('. '));
                this.error = parts.join(' ');
            }
        }
        finally {
            this.busy = false;
        }
    }
    render() {
        const stockErrors = buildStockAlertRows(this.lineItems);
        // we have at least one fully out-of-stock item.
        const hasOutOfStockItems = stockErrors === null || stockErrors === void 0 ? void 0 : stockErrors.some(item => (item === null || item === void 0 ? void 0 : item.to) < 1);
        return (h(Host, { key: 'acbef859b372585f275753310f0a0522d627b9ec' }, h("sc-dialog", { key: '41f51f533d77c8f96c3c265aaaadee5ed2a80c90', open: !!stockErrors.length && currentFormState() === 'draft', noHeader: true, onScRequestClose: e => e.preventDefault(), class: "stock-alert" }, h("sc-dashboard-module", { key: '00ee738effe3092df20007eaed0e3ac0c4b1863b', class: "subscription-cancel", error: this.error, style: { '--sc-dashboard-module-spacing': '1em' } }, h("sc-flex", { key: '54cc0304e2e6f8ce0476a05edbf1ba5222bb35a1', slot: "heading", "align-items": "center", "justify-content": "flex-start" }, h("sc-icon", { key: 'c58a11c951145aca4d0421fdc24643325b1daada', name: "alert-circle", style: { color: 'var(--sc-color-primary-500' } }), hasOutOfStockItems ? wp.i18n.__('Out of Stock', 'surecart') : wp.i18n.__('Quantity Update', 'surecart')), h("span", { key: '9d3a9107639d100d4d815564af2714214058c190', slot: "description" }, hasOutOfStockItems
            ? wp.i18n.__('Some items are no longer available. Your cart will be updated.', 'surecart')
            : wp.i18n.__('Available quantities for these items have changed. Your cart will be updated.', 'surecart')), h("sc-card", { key: 'a01d877d96b63f948d5ae969fa414851e36127c2', "no-padding": true }, h("sc-table", { key: '3b432e96899754d2bd44c298a3b30bb1e8f95d5e' }, h("sc-table-cell", { key: '687fa517eef975afa99dbd9ca4b820bd8228e1ad', slot: "head" }, wp.i18n.__('Description', 'surecart')), h("sc-table-cell", { key: '2a7f0e9bb3152acbccd57ba55e07b0eec2b3cef8', slot: "head", style: { width: '100px', textAlign: 'right' } }, wp.i18n.__('Quantity', 'surecart')), stockErrors.map((item, index) => {
            const isLastChild = index === stockErrors.length - 1;
            return (h("sc-table-row", { style: {
                    '--columns': '2',
                    ...(isLastChild ? { border: 'none' } : {}),
                } }, h("sc-table-cell", null, h("sc-flex", { justifyContent: "flex-start", alignItems: "center" }, (item === null || item === void 0 ? void 0 : item.image) && h("img", { ...item.image, class: "stock-alert__image" }), h("div", { class: "stock-alert__product-info" }, h("h4", null, item.name), (item === null || item === void 0 ? void 0 : item.variant) && h("span", { class: "stock-alert__variant" }, item.variant)))), h("sc-table-cell", { style: { width: '100px', textAlign: 'right' } }, h("span", { class: "stock-alert__quantity" }, h("span", null, item === null || item === void 0 ? void 0 : item.from), " ", h("sc-icon", { name: "arrow-right" }), " ", h("span", null, Math.max(item === null || item === void 0 ? void 0 : item.to, 0))))));
        })))), h("sc-button", { key: 'b2fc3f985615956ba887dd9243c5b4693652cd03', slot: "footer", type: "primary", loading: this.busy, onClick: () => this.onSubmit() }, wp.i18n.__('Continue', 'surecart'), h("sc-icon", { key: '4a8e198f3ad2374764abc70a96516b832aeda135', name: "arrow-right", slot: "suffix" })), this.busy && h("sc-block-ui", { key: '67747c60ab6ff8e5838d8d4c30543205cbc55248', spinner: true }))));
    }
};
ScCheckoutStockAlert.style = ScCheckoutStockAlertStyle0;

const checkoutTestCompleteCss = ".confirm__icon{margin-bottom:var(--sc-spacing-medium);display:flex;justify-content:center}.confirm__icon-container{background:var(--sc-color-primary-500);width:55px;height:55px;border-radius:999999px;display:flex;align-items:center;justify-content:center;font-size:26px;line-height:1;color:white}sc-dialog::part(overlay){backdrop-filter:blur(4px)}";
const ScCheckoutTestCompleteStyle0 = checkoutTestCompleteCss;

const ScCheckoutTestComplete = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.scOrderPaid = createEvent(this, "scOrderPaid", 7);
        this.scSetState = createEvent(this, "scSetState", 7);
        this.showSuccessModal = false;
        this.manualPaymentMethod = undefined;
        this.checkoutStatus = undefined;
        this.successUrl = undefined;
    }
    /**
     * Watch for paid checkout machine state.
     * This is triggered by Stripe, Paypal or Paystack when payment succeeds.
     */
    handleConfirmOrderEvent() {
        if (this.checkoutStatus === 'test_mode_restricted') {
            this.confirmOrder();
        }
    }
    /** Confirm the order. */
    async confirmOrder() {
        var _a;
        this.manualPaymentMethod = (_a = (state$2.manualPaymentMethods || [])) === null || _a === void 0 ? void 0 : _a.find(p => p.id === state$3.id);
        this.showSuccessModal = true;
        clearCheckout();
    }
    handleSuccessModal() {
        if (this.showSuccessModal) {
            setTimeout(() => {
                var _a;
                (_a = this.continueButton) === null || _a === void 0 ? void 0 : _a.focus();
            }, 50);
        }
    }
    render() {
        var _a, _b, _c, _d, _e;
        return (h(Host, { key: '8880988be24c475421d2b54c9dfd945684766746' }, h("slot", { key: '0301cb11f3a0e1d10d60df81dc880ffc77693aaa' }), h("sc-dialog", { key: 'a96eb1959b206b58dc1ada90b707963e779e62f4', open: !!this.showSuccessModal, style: { '--body-spacing': 'var(--sc-spacing-xxx-large)', '--width': '400px' }, noHeader: true, onScRequestClose: e => e.preventDefault() }, h("div", { key: '496ecd0823810af00622b5a37748b9c2c9837b5f', class: "confirm__icon" }, h("div", { key: '9677f7f47900bf129659b27a00eb90e06368a36f', class: "confirm__icon-container" }, h("sc-icon", { key: '167e6fbc7a880b4092aadf657c3a780ac8136cda', name: "check" }))), h("sc-dashboard-module", { key: 'ff63fb9cc9c26176ff347c9809cab0c186ecbdf1', heading: wp.i18n.__('Test checkout successful!', 'surecart'), style: { '--sc-dashboard-module-spacing': 'var(--sc-spacing-x-large)', 'textAlign': 'center' } }, h("span", { key: '02716802dc259ae7505ab69a817e3a6da55129c9', slot: "description" }, wp.i18n.__('This is a simulated test checkout, and no orders were processed. To perform a test order, please contact your store administrator. ', 'surecart')), !!((_a = this.manualPaymentMethod) === null || _a === void 0 ? void 0 : _a.name) && !!((_b = this.manualPaymentMethod) === null || _b === void 0 ? void 0 : _b.instructions) && (h("sc-alert", { key: 'fe6f7c7134aa4a30fb9eeb04451b418018e05c13', type: "info", open: true, style: { 'text-align': 'left' } }, h("span", { key: 'c3ccaecdf4d8a9407ef333691d631c83a713b23a', slot: "title" }, (_c = this.manualPaymentMethod) === null || _c === void 0 ? void 0 : _c.name), h("div", { key: '4881bc45861b75cd49989239a6ea074e8418f5a6', innerHTML: (_d = this.manualPaymentMethod) === null || _d === void 0 ? void 0 : _d.instructions }))), h("sc-button", { key: 'b27f7d8f4844d5c6fc05efc5915232fd2c3cf079', href: (_e = window === null || window === void 0 ? void 0 : window.scData) === null || _e === void 0 ? void 0 : _e.home_url, size: "large", type: "primary", ref: el => (this.continueButton = el) }, wp.i18n.__('Go to Homepage', 'surecart'), h("sc-icon", { key: 'c1ba21e3fec1994dd1d27c0207138e58428c0113', name: "arrow-right", slot: "suffix" }))))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "checkoutStatus": ["handleConfirmOrderEvent"],
        "showSuccessModal": ["handleSuccessModal"]
    }; }
};
ScCheckoutTestComplete.style = ScCheckoutTestCompleteStyle0;

const ScCheckoutUnsavedChangesWarning = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.state = undefined;
    }
    /**
     * Add event listener for beforeunload.
     */
    componentDidLoad() {
        window.addEventListener('beforeunload', e => this.warnIfUnsavedChanges(e), { capture: true });
    }
    /**
     * Warn if status is updaing, finalizing, paying or confirming.
     */
    warnIfUnsavedChanges(e) {
        if (['updating', 'finalizing', 'confirming'].includes(this.state)) {
            console.log({ e });
            e.preventDefault();
            e.returnValue = wp.i18n.__('Your payment is processing. Exiting this page could cause an error in your order. Please do not navigate away from this page.', 'surecart');
            return e.returnValue;
        }
    }
};

const ScFormComponentsValidator = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Whether *we* escalated the phone to required (vs. the merchant's own config), so we can undo it. */
        this.phoneRequiredByShipping = false;
        this.disabled = undefined;
        this.taxProtocol = undefined;
        this.hasAddress = undefined;
        this.hasTaxIDField = undefined;
        this.hasBumpsField = undefined;
        this.hasTaxLine = undefined;
        this.hasBumpLine = undefined;
        this.hasShippingChoices = undefined;
        this.hasShippingAmount = undefined;
        this.hasInvoiceDetails = undefined;
        this.hasInvoiceMemo = undefined;
        this.hasTrialLineItem = undefined;
        this.hasCustomerPhone = undefined;
    }
    handleOrderChange() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        // bail if we don't have address invalid error or disabled.
        if (this.disabled)
            return;
        // make sure to add the address field if it's not there.
        if (shippingAddressRequired()) {
            this.addAddressField();
        }
        // require the phone when the checkout needs a shipping label.
        this.handlePhoneRequiredForShipping();
        // add order bumps.
        if ((_c = (_b = (_a = state$1.checkout) === null || _a === void 0 ? void 0 : _a.recommended_bumps) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.length) {
            this.addBumps();
        }
        if (!!((_d = state$1.checkout) === null || _d === void 0 ? void 0 : _d.tax_amount)) {
            this.addTaxLine();
        }
        // add shipping choices.
        if (((_e = state$1.checkout) === null || _e === void 0 ? void 0 : _e.shipping_enabled) && ((_f = state$1.checkout) === null || _f === void 0 ? void 0 : _f.selected_shipping_choice_required)) {
            this.addShippingChoices();
        }
        if (!!((_g = state$1.checkout) === null || _g === void 0 ? void 0 : _g.shipping_amount)) {
            this.addShippingAmount();
        }
        // automatically add invoice details if we have an invoice.
        if (!!((_h = state$1.checkout) === null || _h === void 0 ? void 0 : _h.invoice)) {
            this.addInvoiceDetails();
            this.addInvoiceMemo();
        }
        // automatically add trial line item if we have a trial amount.
        if (!!((_j = state$1.checkout) === null || _j === void 0 ? void 0 : _j.trial_amount)) {
            this.addTrialLineItem();
        }
    }
    handleHasAddressChange() {
        if (!this.hasAddress)
            return;
        this.handleShippingAddressRequired();
    }
    componentWillLoad() {
        var _a, _b;
        this.hasAddress = !!this.el.querySelector('sc-order-shipping-address');
        this.hasTaxIDField = !!this.el.querySelector('sc-order-tax-id-input');
        this.hasBumpsField = !!this.el.querySelector('sc-order-bumps');
        this.hasTaxLine = !!this.el.querySelector('sc-line-item-tax');
        this.hasShippingChoices = !!this.el.querySelector('sc-shipping-choices');
        this.hasShippingAmount = !!this.el.querySelector('sc-line-item-shipping');
        this.hasInvoiceDetails = !!this.el.querySelector('sc-invoice-details');
        this.hasInvoiceMemo = !!this.el.querySelector('sc-invoice-memo');
        this.hasTrialLineItem = !!this.el.querySelector('sc-line-item-trial');
        this.hasCustomerPhone = !!this.el.querySelector('sc-customer-phone');
        // if eu vat is required, add the tax id field.
        if (((_a = this.taxProtocol) === null || _a === void 0 ? void 0 : _a.tax_enabled) && ((_b = this.taxProtocol) === null || _b === void 0 ? void 0 : _b.eu_vat_required)) {
            this.addTaxIDField();
        }
        // if razorpay is available, add the customer phone field.
        if (getAvailableProcessor('razorpay')) {
            this.addCustomerPhone();
        }
        this.handleOrderChange();
        this.removeCheckoutListener = onChange$1('checkout', () => this.handleOrderChange());
        this.removePaymentRequiresShippingListener = onChange$1('paymentMethodRequiresShipping', () => this.handleOrderChange());
    }
    disconnectedCallback() {
        this.removeCheckoutListener();
        this.removePaymentRequiresShippingListener();
    }
    handleShippingAddressRequired() {
        var _a;
        if (!((_a = state$1.checkout) === null || _a === void 0 ? void 0 : _a.shipping_address_required))
            return;
        // get the address
        const address = this.el.querySelector('sc-order-shipping-address');
        if (!address)
            return;
        // require the address.
        address.required = true;
        // if we have a customer name field, require that.
        const customerName = this.el.querySelector('sc-customer-name');
        if (!!customerName) {
            customerName.required = true;
            return;
        }
        // if we have a customer first name field, require that.
        const customerFirstName = this.el.querySelector('sc-customer-firstname');
        const customerLastName = this.el.querySelector('sc-customer-lastname');
        // if we have a customer first name field, require that.
        if (!!customerFirstName) {
            customerFirstName.required = true;
            // if we have a customer last name field, require that.
            if (!!customerLastName) {
                customerLastName.required = true;
            }
            return; // we're done here.
        }
        // require the name and show the name input.
        address.requireName = true;
        address.showName = true;
    }
    addAddressField() {
        if (this.hasAddress) {
            return;
        }
        const payment = this.el.querySelector('sc-payment');
        const shippingAddress = document.createElement('sc-order-shipping-address');
        payment.parentNode.insertBefore(shippingAddress, payment);
        if (fullShippingAddressRequired()) {
            const billingAddress = document.createElement('sc-order-billing-address');
            billingAddress.label = wp.i18n.__('Billing Address', 'surecart');
            payment.parentNode.insertBefore(billingAddress, payment);
        }
        else {
            shippingAddress.label = wp.i18n.__('Address', 'surecart');
        }
        this.hasAddress = true;
    }
    addTaxIDField() {
        if (this.hasTaxIDField)
            return;
        const payment = this.el.querySelector('sc-payment');
        const taxInput = document.createElement('sc-order-tax-id-input');
        payment.parentNode.insertBefore(taxInput, payment);
        this.hasTaxIDField = true;
    }
    handlePhoneRequiredForShipping() {
        const existing = this.el.querySelector('sc-customer-phone');
        // The platform sets this when the checkout will be fulfilled via a label
        // provider that requires a recipient phone.
        const needed = phoneRequired();
        if (!needed) {
            // undo only our own escalation — if the merchant already placed a required phone block, we don't touch it.
            if (this.phoneRequiredByShipping && existing) {
                existing.required = false;
                this.phoneRequiredByShipping = false;
            }
            return;
        }
        // if the merchant already placed the optional phone block, escalate it.
        if (existing) {
            if (!existing.required) {
                existing.required = true;
                this.phoneRequiredByShipping = true;
            }
            return;
        }
        // otherwise add a required phone field.
        this.addCustomerPhone();
        this.phoneRequiredByShipping = true;
    }
    addCustomerPhone() {
        if (this.hasCustomerPhone)
            return;
        const payment = this.el.querySelector('sc-payment');
        if (!payment)
            return;
        const customerPhone = document.createElement('sc-customer-phone');
        customerPhone.label = wp.i18n.__('Phone', 'surecart');
        customerPhone.required = true;
        payment.parentNode.insertBefore(customerPhone, payment);
        this.hasCustomerPhone = true;
    }
    addBumps() {
        if (this.hasBumpsField)
            return;
        const attachReferenceElement = this.el.querySelector('sc-order-billing-address') || this.el.querySelector('sc-payment');
        const bumps = document.createElement('sc-order-bumps');
        attachReferenceElement === null || attachReferenceElement === void 0 ? void 0 : attachReferenceElement.parentNode.insertBefore(bumps, attachReferenceElement.nextSibling);
        this.hasBumpsField = true;
    }
    addTaxLine() {
        var _a;
        if (this.hasTaxLine)
            return;
        const total = this.el.querySelector('sc-line-item-total[total=total]');
        const tax = document.createElement('sc-line-item-tax');
        if (!total)
            return;
        if (((_a = total === null || total === void 0 ? void 0 : total.previousElementSibling) === null || _a === void 0 ? void 0 : _a.tagName) === 'SC-DIVIDER') {
            total.parentNode.insertBefore(tax, total.previousElementSibling);
        }
        else {
            total.parentNode.insertBefore(tax, total);
        }
        this.hasTaxLine = true;
    }
    addShippingChoices() {
        if (this.hasShippingChoices)
            return;
        const payment = this.el.querySelector('sc-payment');
        const shippingChoices = document.createElement('sc-shipping-choices');
        payment.parentNode.insertBefore(shippingChoices, payment);
        this.hasShippingChoices = true;
    }
    addShippingAmount() {
        var _a;
        if (this.hasShippingAmount)
            return;
        let insertBeforeElement = this.el.querySelector('sc-line-item-tax');
        const total = this.el.querySelector('sc-line-item-total[total=total]');
        if (!total)
            return;
        if (!insertBeforeElement) {
            insertBeforeElement = ((_a = total === null || total === void 0 ? void 0 : total.previousElementSibling) === null || _a === void 0 ? void 0 : _a.tagName) === 'SC-DIVIDER' ? total.previousElementSibling : total;
        }
        const shippingAmount = document.createElement('sc-line-item-shipping');
        insertBeforeElement.parentNode.insertBefore(shippingAmount, insertBeforeElement);
        this.hasShippingAmount = true;
    }
    addInvoiceDetails() {
        if (this.hasInvoiceDetails)
            return;
        let lineItems = this.el.querySelector('sc-line-items');
        const invoiceDetails = document.createElement('sc-invoice-details');
        lineItems.parentNode.insertBefore(invoiceDetails, lineItems);
        // Add sc-line-item-invoice-number inside sc-invoice-details.
        const invoiceNumber = document.createElement('sc-line-item-invoice-number');
        invoiceDetails.appendChild(invoiceNumber);
        // Add sc-line-item-invoice-due-date inside sc-invoice-details.
        const invoiceDueDate = document.createElement('sc-line-item-invoice-due-date');
        invoiceDetails.appendChild(invoiceDueDate);
        // Add invoice sc-line-item-invoice-receipt-download inside sc-invoice-details.
        const invoiceReceiptDownload = document.createElement('sc-line-item-invoice-receipt-download');
        invoiceDetails.appendChild(invoiceReceiptDownload);
        // Add sc-divider inside sc-invoice-details.
        const divider = document.createElement('sc-divider');
        invoiceDetails.appendChild(divider);
        this.hasInvoiceDetails = true;
    }
    addInvoiceMemo() {
        if (this.hasInvoiceMemo)
            return;
        const orderSummary = this.el.querySelector('sc-order-summary');
        const invoiceDetails = document.createElement('sc-invoice-details');
        // Add sc-divider inside sc-invoice-details.
        orderSummary.parentNode.insertBefore(invoiceDetails, orderSummary.nextSibling);
        // Add sc-invoice-memo inside sc-invoice-details.
        const invoiceMemo = document.createElement('sc-invoice-memo');
        invoiceDetails.appendChild(invoiceMemo);
        this.hasInvoiceMemo = true;
    }
    addTrialLineItem() {
        if (this.hasTrialLineItem)
            return;
        const subtotal = this.el.querySelector('sc-line-item-total[total=subtotal]');
        const trialItem = document.createElement('sc-line-item-trial');
        if (!subtotal)
            return;
        // Insert the trial item before the coupon form.
        subtotal.parentNode.insertBefore(trialItem, subtotal.nextSibling);
        this.hasTrialLineItem = true;
    }
    render() {
        return h("slot", { key: '41960ea6ba0bc03430797a8ffe6db9d7b32b2d24' });
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "hasAddress": ["handleHasAddressChange"]
    }; }
};

const ScFormErrorProvider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    componentWillLoad() {
        this.maybeAddErrorsComponent();
    }
    maybeAddErrorsComponent() {
        var _a, _b;
        if (!!this.el.querySelector('sc-checkout-form-errors'))
            return;
        const errorsComponent = document.createElement('sc-checkout-form-errors');
        (_b = (_a = this.el.querySelector('sc-form')) === null || _a === void 0 ? void 0 : _a.prepend) === null || _b === void 0 ? void 0 : _b.call(_a, errorsComponent);
    }
    render() {
        return h("slot", { key: '1f35e949cd65cb4be249a43d238257923c26227d' });
    }
    get el() { return getElement(this); }
};

const ScFormStateProvider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.scSetCheckoutFormState = createEvent(this, "scSetCheckoutFormState", 7);
        /** Holds our state machine service */
        this._stateService = v(checkoutMachine);
        this.checkoutState = checkoutMachine.initialState;
    }
    /** Set the state. */
    setState(name) {
        const { send } = this._stateService;
        updateFormState(name);
        return send(name);
    }
    /** Watch for checkout state changes and emit to listeners. */
    handleCheckoutStateChange(state) {
        this.scSetCheckoutFormState.emit(state.value);
    }
    /** Init the state service. */
    componentWillLoad() {
        // Start state machine.
        this._stateService.subscribe(state => (this.checkoutState = state));
        this._stateService.start();
    }
    /** Remove state machine on disconnect. */
    disconnectedCallback() {
        this._stateService.stop();
    }
    /** Allow children to set the form state. */
    handleSetStateEvent(e) {
        this.setState(e.detail);
    }
    /** Update the state when the order is paid. */
    async handlePaid() {
        this.setState('PAID');
    }
    render() {
        // handle expired.
        if (this.checkoutState.value === 'expired') {
            return (h("sc-block-ui", null, h("div", null, wp.i18n.__('Please refresh the page.', 'surecart'))));
        }
        return h("slot", null);
    }
    static get watchers() { return {
        "checkoutState": ["handleCheckoutStateChange"]
    }; }
};

const scLoginProviderCss = ":host{display:block}";
const ScLoginProviderStyle0 = scLoginProviderCss;

const ScLoginProvider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.scSetLoggedIn = createEvent(this, "scSetLoggedIn", 7);
        this.scSetCustomer = createEvent(this, "scSetCustomer", 7);
        this.loggedIn = undefined;
        this.order = undefined;
        this.notice = undefined;
        this.open = undefined;
        this.loading = undefined;
        this.error = undefined;
    }
    /** Listen for open event. */
    handleLoginPrompt() {
        this.open = true;
    }
    /** Focus on first input. */
    handleLoginDialogChange(val) {
        if (val) {
            setTimeout(() => {
                this.loginForm.querySelector('sc-input').triggerFocus();
            }, 100);
        }
    }
    handleLoggedInChange(val, prev) {
        if (prev === false && val) {
            this.notice = true;
        }
    }
    handleOrderChange(val, prev) {
        if ((val === null || val === void 0 ? void 0 : val.updated_at) !== (prev === null || prev === void 0 ? void 0 : prev.updated_at)) {
            this.notice = false;
        }
    }
    /** Handle form submit. */
    async handleFormSubmit(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.error = null;
        const { login, password } = await e.target.getFormJson();
        try {
            this.loading = true;
            const { name, email } = (await apiFetch({
                method: 'POST',
                path: 'surecart/v1/login',
                data: {
                    login,
                    password,
                },
            }));
            this.scSetLoggedIn.emit(true);
            this.scSetCustomer.emit({ name, email });
            this.open = false;
        }
        catch (e) {
            console.error(e);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.loading = false;
        }
    }
    render() {
        return (h(Host, { key: '02f6ec244cf0293783ab8396e8f9c99445171a6d' }, h("slot", { key: 'f11822dc451dd1d0d9a99b559e31573870f72522' }), !this.loggedIn && (h("sc-dialog", { key: 'a56f8afd71381494a0278557f11332cec69bdc0e', label: wp.i18n.__('Login to your account', 'surecart'), open: this.open, onScRequestClose: () => (this.open = false) }, h("sc-form", { key: '1759621f060fe1d8e20b08f24ba231ea440347d8', ref: el => (this.loginForm = el), onScFormSubmit: e => {
                e.preventDefault();
                e.stopImmediatePropagation();
            }, onScSubmit: e => this.handleFormSubmit(e) }, !!this.error && (h("sc-alert", { key: 'bdd0432ed04c16ccd60268dfd414293890d46dca', type: "danger", open: !!this.error }, this.error)), h("sc-input", { key: 'f9168c69378aeaf17f8b6c57c2cc52024de56e6e', label: wp.i18n.__('Email or Username', 'surecart'), type: "text", name: "login", required: true, autofocus: this.open }), h("sc-input", { key: '780036e78c69d74518a4ca04a8734896ef98a19a', label: wp.i18n.__('Password', 'surecart'), type: "password", name: "password", required: true }), h("sc-button", { key: 'c50335604faeefd5d56e16c8d26d6353f0b9adde', type: "primary", full: true, loading: this.loading, submit: true }, wp.i18n.__('Login', 'surecart')))))));
    }
    static get watchers() { return {
        "open": ["handleLoginDialogChange"],
        "loggedIn": ["handleLoggedInChange"],
        "order": ["handleOrderChange"]
    }; }
};
ScLoginProvider.style = ScLoginProviderStyle0;

const scOrderConfirmProviderCss = ".confirm__icon{margin-bottom:var(--sc-spacing-medium);display:flex;justify-content:center}.confirm__icon-container{background:var(--sc-color-primary-500);width:55px;height:55px;border-radius:999999px;display:flex;align-items:center;justify-content:center;font-size:26px;line-height:1;color:white}sc-dialog::part(overlay){backdrop-filter:blur(4px)}";
const ScOrderConfirmProviderStyle0 = scOrderConfirmProviderCss;

const ScOrderConfirmProvider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.scOrderPaid = createEvent(this, "scOrderPaid", 7);
        this.scSetState = createEvent(this, "scSetState", 7);
        this.showSuccessModal = false;
        this.manualPaymentMethod = undefined;
        this.checkoutStatus = undefined;
        this.successUrl = undefined;
    }
    /**
     * Watch for paid checkout machine state.
     * This is triggered by Stripe, Paypal or Paystack when payment succeeds.
     */
    handleConfirmOrderEvent() {
        if (this.checkoutStatus === 'confirming') {
            this.confirmOrder();
        }
        else if (this.checkoutStatus === 'confirmed') {
            speak(wp.i18n.__('Order has been confirmed. Please select continue to go to the next step.', 'surecart'));
        }
    }
    /** Confirm the order. */
    async confirmOrder() {
        var _a, _b, _c, _d;
        try {
            state$1.checkout = (await apiFetch({
                method: 'PATCH',
                path: addQueryArgs(`surecart/v1/checkouts/${(_a = state$1 === null || state$1 === void 0 ? void 0 : state$1.checkout) === null || _a === void 0 ? void 0 : _a.id}/confirm`, { expand }),
            }));
            this.scSetState.emit('CONFIRMED');
        }
        catch (e) {
            console.error(e);
            createErrorNotice(e);
        }
        finally {
            this.manualPaymentMethod = ((_b = state$1.checkout) === null || _b === void 0 ? void 0 : _b.manual_payment_method) || null;
            const checkout = state$1.checkout;
            const formId = state$1.formId;
            // If there is an initial upsell redirect to it.
            if (!!((_c = checkout === null || checkout === void 0 ? void 0 : checkout.current_upsell) === null || _c === void 0 ? void 0 : _c.permalink)) {
                setTimeout(() => {
                    var _a;
                    return window.location.assign(addQueryArgs((_a = checkout === null || checkout === void 0 ? void 0 : checkout.current_upsell) === null || _a === void 0 ? void 0 : _a.permalink, {
                        sc_checkout_id: checkout === null || checkout === void 0 ? void 0 : checkout.id,
                        sc_form_id: formId,
                    }));
                }, 50);
                clearCheckout();
                return;
            }
            // get success url.
            const successUrl = ((_d = checkout === null || checkout === void 0 ? void 0 : checkout.metadata) === null || _d === void 0 ? void 0 : _d.success_url) || this.successUrl;
            if (successUrl) {
                // set state to redirecting.
                this.scSetState.emit('REDIRECT');
                const redirectUrl = addQueryArgs(successUrl, { sc_order: checkout === null || checkout === void 0 ? void 0 : checkout.id });
                setTimeout(() => window.location.assign(redirectUrl), 50);
            }
            else {
                this.showSuccessModal = true;
            }
            clearCheckout();
        }
    }
    getSuccessUrl() {
        var _a, _b, _c, _d, _e;
        const url = ((_b = (_a = state$1.checkout) === null || _a === void 0 ? void 0 : _a.metadata) === null || _b === void 0 ? void 0 : _b.success_url) || this.successUrl;
        return url ? addQueryArgs(url, { sc_order: (_c = state$1.checkout) === null || _c === void 0 ? void 0 : _c.id }) : (_e = (_d = window === null || window === void 0 ? void 0 : window.scData) === null || _d === void 0 ? void 0 : _d.pages) === null || _e === void 0 ? void 0 : _e.dashboard;
    }
    handleSuccessModal() {
        if (this.showSuccessModal) {
            setTimeout(() => {
                var _a;
                (_a = this.continueButton) === null || _a === void 0 ? void 0 : _a.focus();
            }, 50);
        }
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return (h(Host, { key: 'd994308466aeee5553b205934d4942f0367c4ca8' }, h("slot", { key: 'c3c95b9bea914988eeb4b067e4f48b1b94ba722a' }), h("sc-dialog", { key: '28fc222a76aca3e16b8bea444059979b6d2ca39e', open: !!this.showSuccessModal, style: { '--body-spacing': 'var(--sc-spacing-xxx-large)', '--width': '400px' }, noHeader: true, onScRequestClose: e => e.preventDefault() }, h("div", { key: 'b668fb5bb4effcfe2ef096915ebdf7ef813351a0', class: "confirm__icon" }, h("div", { key: '3c51cd3be9ca89170b6115ffd7a1fcb8f791702d', class: "confirm__icon-container" }, h("sc-icon", { key: '6c43b0eceedec6ec315f3d7f3603b9012b6e1d83', name: "check" }))), h("sc-dashboard-module", { key: '2979427b1de30dbb2f33c8b863e39f103f09bc8d', heading: ((_b = (_a = state$4 === null || state$4 === void 0 ? void 0 : state$4.text) === null || _a === void 0 ? void 0 : _a.success) === null || _b === void 0 ? void 0 : _b.title) || wp.i18n.__('Thanks for your order!', 'surecart'), style: { '--sc-dashboard-module-spacing': 'var(--sc-spacing-x-large)', 'textAlign': 'center' } }, h("span", { key: '168bf1c1f41863638ef94698490086962e6b2025', slot: "description" }, ((_d = (_c = state$4 === null || state$4 === void 0 ? void 0 : state$4.text) === null || _c === void 0 ? void 0 : _c.success) === null || _d === void 0 ? void 0 : _d.description) || wp.i18n.__('Your payment was successful. A receipt is on its way to your inbox.', 'surecart')), !!((_e = this.manualPaymentMethod) === null || _e === void 0 ? void 0 : _e.name) && !!((_f = this.manualPaymentMethod) === null || _f === void 0 ? void 0 : _f.instructions) && (h("sc-alert", { key: '5d09a59ebc2effeda803142a05fc795d215931a8', type: "info", open: true, style: { 'text-align': 'left' } }, h("span", { key: 'f990d30cc684cdfa179f6a1b1281348f09cc94d6', slot: "title" }, (_g = this.manualPaymentMethod) === null || _g === void 0 ? void 0 : _g.name), h("div", { key: '7c89903831e052fbd427aa9916236b27d2bc9b7a', innerHTML: (_h = this.manualPaymentMethod) === null || _h === void 0 ? void 0 : _h.instructions }))), h("sc-button", { key: 'e066dbdc86032bd54c4509ef51ef0ebad54487c8', href: this.getSuccessUrl(), size: "large", type: "primary", ref: el => (this.continueButton = el) }, ((_k = (_j = state$4 === null || state$4 === void 0 ? void 0 : state$4.text) === null || _j === void 0 ? void 0 : _j.success) === null || _k === void 0 ? void 0 : _k.button) || wp.i18n.__('Continue', 'surecart'), h("sc-icon", { key: '87b506059ba9b7ca2133508de2a4f55dca3087dc', name: "arrow-right", slot: "suffix" }))))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "checkoutStatus": ["handleConfirmOrderEvent"],
        "showSuccessModal": ["handleSuccessModal"]
    }; }
};
ScOrderConfirmProvider.style = ScOrderConfirmProviderStyle0;

const ScSessionProvider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.scUpdateOrderState = createEvent(this, "scUpdateOrderState", 7);
        this.scUpdateDraftState = createEvent(this, "scUpdateDraftState", 7);
        this.scPaid = createEvent(this, "scPaid", 7);
        this.scSetState = createEvent(this, "scSetState", 7);
        /** Disposers for the geolocation re-price subscriptions. */
        this.removeGeoListeners = [];
        this.prices = [];
        this.persist = true;
    }
    handlePricesChange() {
        let line_items = this.addInitialPrices() || [];
        // line_items = this.addPriceChoices(line_items);
        if (!(line_items === null || line_items === void 0 ? void 0 : line_items.length)) {
            return;
        }
        return this.loadUpdate({ line_items });
    }
    /**
     * Finalize the order.
     *
     * @returns {Promise<Order>}
     */
    async finalize() {
        return await this.handleFormSubmit();
    }
    async getFormData() {
        let data = {};
        const form = this.el.querySelector('sc-form');
        if (form) {
            const json = await form.getFormJson();
            data = parseFormData(json);
        }
        return data;
    }
    /**
     * Handles the form submission.
     * @param e
     */
    async handleFormSubmit() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        removeNotice();
        updateFormState('FINALIZE');
        if (((_a = state$1 === null || state$1 === void 0 ? void 0 : state$1.checkout) === null || _a === void 0 ? void 0 : _a.payment_method_required) && (state$3 === null || state$3 === void 0 ? void 0 : state$3.id) === 'stripe' && state$2.config.stripe.paymentElement) {
            // not initialized.
            if (!((_b = state$2 === null || state$2 === void 0 ? void 0 : state$2.instances) === null || _b === void 0 ? void 0 : _b.stripeElements)) {
                updateFormState('REJECT');
                this.handleErrorResponse({ message: 'Stripe Elements not found.', code: 'stripe_elements_not_found' });
                return new Error('Stripe Elements not found.');
            }
            // submit the elements.
            const { error } = await ((_c = state$2 === null || state$2 === void 0 ? void 0 : state$2.instances) === null || _c === void 0 ? void 0 : _c.stripeElements.submit());
            if (error) {
                console.error({ error });
                updateFormState('REJECT');
                createErrorNotice(error);
                return;
            }
        }
        // Get current form state.
        let data = await this.getFormData();
        if (((_d = window === null || window === void 0 ? void 0 : window.scData) === null || _d === void 0 ? void 0 : _d.recaptcha_site_key) && (window === null || window === void 0 ? void 0 : window.grecaptcha)) {
            try {
                data['grecaptcha'] = await window.grecaptcha.execute(window.scData.recaptcha_site_key, { action: 'surecart_checkout_submit' });
            }
            catch (e) {
                console.error(e);
                updateFormState('REJECT');
                this.handleErrorResponse(e);
                return new Error(e === null || e === void 0 ? void 0 : e.message);
            }
        }
        // first lets make sure the session is updated before we process it.
        try {
            await this.update(data);
        }
        catch (e) {
            console.error(e);
            updateFormState('REJECT');
            this.handleErrorResponse(e);
        }
        // first validate server-side and get key
        try {
            state$1.checkout = await finalizeCheckout({
                id: (_e = state$1 === null || state$1 === void 0 ? void 0 : state$1.checkout) === null || _e === void 0 ? void 0 : _e.id,
                query: {
                    ...((state$3 === null || state$3 === void 0 ? void 0 : state$3.method) ? { payment_method_type: state$3 === null || state$3 === void 0 ? void 0 : state$3.method } : {}),
                    return_url: addQueryArgs(window.location.href, {
                        ...(((_f = state$1 === null || state$1 === void 0 ? void 0 : state$1.checkout) === null || _f === void 0 ? void 0 : _f.id) ? { checkout_id: (_g = state$1 === null || state$1 === void 0 ? void 0 : state$1.checkout) === null || _g === void 0 ? void 0 : _g.id } : {}),
                        is_surecart_payment_redirect: true,
                    }),
                },
                data,
                processor: {
                    id: state$3.id,
                    manual: state$3.manual,
                },
            });
            if ((_l = (_k = (_j = (_h = state$1.checkout) === null || _h === void 0 ? void 0 : _h.payment_intent) === null || _j === void 0 ? void 0 : _j.processor_data) === null || _k === void 0 ? void 0 : _k.mollie) === null || _l === void 0 ? void 0 : _l.checkout_url) {
                updateFormState('PAYING');
                return setTimeout(() => { var _a, _b, _c, _d; return window.location.assign((_d = (_c = (_b = (_a = state$1.checkout) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.processor_data) === null || _c === void 0 ? void 0 : _c.mollie) === null || _d === void 0 ? void 0 : _d.checkout_url); }, 50);
            }
            // the checkout is paid.
            if (['paid', 'processing'].includes((_m = state$1.checkout) === null || _m === void 0 ? void 0 : _m.status)) {
                this.scPaid.emit();
            }
            setTimeout(() => {
                updateFormState('PAYING');
            }, 50);
            return state$1.checkout;
        }
        catch (e) {
            console.error(e);
            this.handleErrorResponse(e);
            return new Error(e === null || e === void 0 ? void 0 : e.message);
        }
    }
    /**
     * Handle paid event and update the
     */
    async handlePaid() {
        updateFormState('PAID');
    }
    async handleAbandonedCartUpdate(e) {
        const abandoned_checkout_enabled = e.detail;
        this.loadUpdate({
            abandoned_checkout_enabled,
        });
    }
    /** Find or create session on load. */
    componentDidLoad() {
        this.findOrCreateOrder();
        this.watchGeoCoordinates();
    }
    disconnectedCallback() {
        this.removeGeoListeners.forEach(dispose => dispose());
    }
    /**
     * Re-price the checkout when the browser resolves the shopper's location.
     *
     * Watches both the coordinates and the checkout so bailing is always safe — a
     * later change re-runs the check. It converges because the platform echoes the
     * coordinates back onto the checkout, which quiets the mismatch guard.
     */
    watchGeoCoordinates() {
        if (!state$1.captureGeoAddressEnabled)
            return;
        this.removeGeoListeners = [onChange$1('geoCoordinates', () => this.maybeRepriceForGeo()), onChange$1('checkout', () => this.maybeRepriceForGeo())];
    }
    /** Patch the checkout if the platform hasn't seen the resolved coordinates yet. */
    maybeRepriceForGeo() {
        var _a;
        const coordinates = state$1.geoCoordinates;
        if (!coordinates || !((_a = state$1.checkout) === null || _a === void 0 ? void 0 : _a.id))
            return;
        if (state$1.checkout.latitude === coordinates.latitude && state$1.checkout.longitude === coordinates.longitude)
            return;
        if (formLoading() || formBusy())
            return; // the in-flight request carries them via withDefaultData.
        // An empty patch is enough: withDefaultData attaches the coordinates and the platform re-prices.
        this.loadUpdate({});
    }
    /** Find or create an order */
    async findOrCreateOrder() {
        var _a;
        // get URL params.
        const { redirect_status, checkout_id, line_items, coupon, is_surecart_payment_redirect } = getQueryArgs(window.location.href);
        // remove params we don't want.
        window.history.replaceState({}, document.title, removeQueryArgs(window.location.href, 'redirect_status', 'coupon', 'line_items', 'confirm_checkout_id', 'checkout_id', 'no_cart', 'is_surecart_payment_redirect'));
        // handle abandoned checkout.
        if (!!is_surecart_payment_redirect && !!checkout_id) {
            updateFormState('FINALIZE');
            updateFormState('PAYING');
            return this.handleCheckoutIdFromUrl(checkout_id, coupon, {
                refresh_status: true,
            });
        }
        // handle redirect status.
        if (!!redirect_status) {
            return this.handleRedirectStatus(redirect_status, checkout_id);
        }
        // handle abandoned checkout.
        if (!!checkout_id) {
            return this.handleCheckoutIdFromUrl(checkout_id, coupon);
        }
        // handle initial line items.
        if (!!line_items) {
            return this.handleInitialLineItems(line_items, coupon);
        }
        // we have an existing saved checkout id in the session, and we are persisting.
        const id = (_a = state$1 === null || state$1 === void 0 ? void 0 : state$1.checkout) === null || _a === void 0 ? void 0 : _a.id;
        if (id && this.persist) {
            return this.handleExistingCheckout(id, coupon);
        }
        return this.handleNewCheckout(coupon);
    }
    /** Handle payment instrument redirect status */
    async handleRedirectStatus(status, id) {
        var _a, _b;
        console.info('Handling payment redirect.');
        // status failed.
        if (status === 'failed') {
            createErrorNotice(wp.i18n.__('Payment unsuccessful. Please try again.', 'surecart'));
            return;
        }
        // get the
        if (!id) {
            createErrorNotice(wp.i18n.__('Could not find checkout. Please contact us before attempting to purchase again.', 'surecart'));
            return;
        }
        // success, refetch the checkout
        try {
            updateFormState('FINALIZE');
            state$1.checkout = (await fetchCheckout({
                id,
                query: {
                    refresh_status: true,
                },
            }));
            // TODO: should we even check this?
            if (((_a = state$1.checkout) === null || _a === void 0 ? void 0 : _a.status) && ['paid', 'processing'].includes((_b = state$1.checkout) === null || _b === void 0 ? void 0 : _b.status)) {
                setTimeout(() => {
                    updateFormState('PAID');
                    this.scPaid.emit();
                }, 100);
            }
        }
        catch (e) {
            this.handleErrorResponse(e);
        }
    }
    /** Handle abandoned checkout from URL */
    async handleCheckoutIdFromUrl(id, promotion_code = '', query = {}) {
        var _a;
        console.info('Handling existing checkout from url.', promotion_code, id);
        // if coupon code, load the checkout with the code.
        if (promotion_code) {
            return this.loadUpdate({
                id,
                discount: { promotion_code },
                refresh_line_items: true,
                ...query,
            });
        }
        try {
            updateFormState('FETCH');
            state$1.checkout = (await fetchCheckout({
                id,
                query: {
                    refresh_line_items: true,
                    ...query,
                },
            }));
            updateFormState('RESOLVE');
        }
        catch (e) {
            this.handleErrorResponse(e);
        }
        // handle status.
        switch ((_a = state$1.checkout) === null || _a === void 0 ? void 0 : _a.status) {
            case 'paid':
            case 'processing':
                return setTimeout(() => {
                    updateFormState('FINALIZE');
                    updateFormState('PAID');
                    this.scPaid.emit();
                }, 100);
            case 'payment_failed':
                createErrorNotice({
                    message: wp.i18n.__('Payment unsuccessful.', 'surecart'),
                });
                updateFormState('REJECT');
                return;
            case 'payment_intent_canceled':
                updateFormState('REJECT');
                return;
            case 'canceled':
                clearCheckout();
                createErrorNotice({
                    message: wp.i18n.__('Payment canceled. Please try again.', 'surecart'),
                });
                updateFormState('REJECT');
                return;
        }
    }
    /** Handle line items (and maybe ) */
    async handleInitialLineItems(line_items, promotion_code) {
        console.info('Handling initial line items.');
        // TODO: move this to central store.
        const address = this.el.querySelector('sc-order-shipping-address');
        return this.loadUpdate({
            line_items,
            refresh_line_items: true,
            ...(promotion_code ? { discount: { promotion_code } } : {}),
            ...((address === null || address === void 0 ? void 0 : address.defaultCountry)
                ? {
                    shipping_address: {
                        country: address === null || address === void 0 ? void 0 : address.defaultCountry,
                    },
                }
                : {}),
        });
    }
    /** Handle a brand new checkout. */
    async handleNewCheckout(promotion_code) {
        var _a, _b, _c;
        // get existing form data from defaults (default country selection, etc).
        const data = this.getFormData();
        let line_items = state$1.initialLineItems || [];
        const address = this.el.querySelector('sc-order-shipping-address');
        try {
            updateFormState('FETCH');
            state$1.checkout = (await createCheckout({
                data: {
                    ...data,
                    ...(promotion_code ? { discount: { promotion_code } } : {}),
                    ...((address === null || address === void 0 ? void 0 : address.defaultCountry)
                        ? {
                            shipping_address: {
                                country: address === null || address === void 0 ? void 0 : address.defaultCountry,
                            },
                        }
                        : {}),
                    line_items,
                    ...(((_a = state$1.taxProtocol) === null || _a === void 0 ? void 0 : _a.eu_vat_required) ? { tax_identifier: { number_type: 'eu_vat' } } : {}),
                },
            }));
            updateFormState('RESOLVE');
        }
        catch (e) {
            console.error(e);
            this.handleErrorResponse(e);
            // Handle any invalid coupon set on checkout URL.
            if (((_c = (_b = e === null || e === void 0 ? void 0 : e.additional_errors) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.code) === 'checkout.discount.coupon.blank') {
                await this.handleNewCheckout(false);
                createErrorNotice(e);
            }
        }
    }
    /** Handle existing checkout */
    async handleExistingCheckout(id, promotion_code) {
        var _a, _b, _c;
        if (!id)
            return this.handleNewCheckout(promotion_code);
        console.info('Handling existing checkout.');
        try {
            updateFormState('FETCH');
            state$1.checkout = (await createOrUpdateCheckout({
                id,
                data: {
                    ...(promotion_code ? { discount: { promotion_code } } : {}),
                    ...(((_a = state$1.taxProtocol) === null || _a === void 0 ? void 0 : _a.eu_vat_required) ? { tax_identifier: { number_type: 'eu_vat' } } : {}),
                    refresh_line_items: true,
                },
            }));
            updateFormState('RESOLVE');
        }
        catch (e) {
            console.error(e);
            this.handleErrorResponse(e);
            // Handle any invalid coupon set on checkout URL.
            if (((_c = (_b = e === null || e === void 0 ? void 0 : e.additional_errors) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.code) === 'checkout.discount.coupon.blank') {
                await this.handleExistingCheckout(id, false);
                createErrorNotice(e);
            }
        }
    }
    /** Handle the error response. */
    async handleErrorResponse(e) {
        var _a, _b, _c, _d, _e, _f;
        // reinitalize if order not found.
        if (['checkout.not_found'].includes(e === null || e === void 0 ? void 0 : e.code)) {
            clearCheckout();
            return this.handleNewCheckout(false);
        }
        if (['test_mode_restricted'].includes(e === null || e === void 0 ? void 0 : e.code)) {
            updateFormState('TEST_MODE_RESTRICTED');
            return;
        }
        const hasPriceVersionChangeError = ((e === null || e === void 0 ? void 0 : e.additional_errors) || []).some(error => {
            var _a, _b;
            const purchasableStatuses = ((_b = (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.purchasable_statuses) || [];
            return ['price_old_version', 'variant_old_version'].some(status => purchasableStatuses.includes(status));
        });
        if (hasPriceVersionChangeError) {
            await this.loadUpdate({
                id: (_a = state$1 === null || state$1 === void 0 ? void 0 : state$1.checkout) === null || _a === void 0 ? void 0 : _a.id,
                refresh_line_items: true,
                status: 'draft',
            });
            createInfoNotice(((_c = (_b = e === null || e === void 0 ? void 0 : e.additional_errors) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.message) ||
                wp.i18n.__('Some products in your order were outdated and have been updated. Please review your order summary before proceeding to payment.', 'surecart'));
            updateFormState('REJECT');
            return;
        }
        // If got Product out of stock error, then fetch the checkout again.
        if (((_e = (_d = e === null || e === void 0 ? void 0 : e.additional_errors) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.code) === 'checkout.product.out_of_stock') {
            this.fetch();
            updateFormState('REJECT');
            return;
        }
        if (['order.invalid_status_transition'].includes(e === null || e === void 0 ? void 0 : e.code)) {
            await this.loadUpdate({
                id: (_f = state$1 === null || state$1 === void 0 ? void 0 : state$1.checkout) === null || _f === void 0 ? void 0 : _f.id,
                status: 'draft',
            });
            this.handleFormSubmit();
            return;
        }
        // expired
        if ((e === null || e === void 0 ? void 0 : e.code) === 'rest_cookie_invalid_nonce') {
            updateFormState('EXPIRE');
            return;
        }
        // paid
        if ((e === null || e === void 0 ? void 0 : e.code) === 'readonly') {
            clearCheckout();
            window.location.assign(removeQueryArgs(window.location.href, 'order'));
            return;
        }
        createErrorNotice(e);
        updateFormState('REJECT');
    }
    /** Looks through children and finds items needed for initial session. */
    async initialize(args = {}) {
        let line_items = state$1.initialLineItems || [];
        return this.loadUpdate({ ...((line_items === null || line_items === void 0 ? void 0 : line_items.length) ? { line_items } : {}), ...args });
    }
    /** Add prices that are passed into the component. */
    addInitialPrices() {
        var _a;
        if (!((_a = this === null || this === void 0 ? void 0 : this.prices) === null || _a === void 0 ? void 0 : _a.length))
            return [];
        // check for id
        if (this.prices.some(p => !(p === null || p === void 0 ? void 0 : p.id))) {
            return;
        }
        // add prices that are passed into this component.
        return this.prices.map(price => {
            return {
                price_id: price.id,
                quantity: price.quantity,
                variant: price.variant,
            };
        });
    }
    // /** Add default prices that may be selected in form. */
    // addPriceChoices(line_items = []) {
    //   // const elements = this.el.querySelectorAll('[price-id]') as any;
    //   // elements.forEach(el => {
    //   //   // handle price choices.
    //   //   if (el.checked) {
    //   //     line_items.push({
    //   //       quantity: el.quantity || 1,
    //   //       price_id: el.priceId,
    //   //       ...(el.defaultAmount ? { ad_hoc_amount: el.defaultAmount } : {}),
    //   //     });
    //   //   }
    //   //   // handle donation default amount.
    //   //   if (el.defaultAmount) {
    //   //     line_items.push({
    //   //       quantity: el.quantity || 1,
    //   //       price_id: el.priceId,
    //   //       ad_hoc_amount: el.defaultAmount,
    //   //     });
    //   //   }
    //   // });
    //   // return line_items;
    // }
    getSessionId() {
        var _a, _b;
        // check url first.
        const checkoutId = getQueryArg(window.location.href, 'checkout_id');
        if (!!checkoutId) {
            return checkoutId;
        }
        // check existing order.
        if ((_a = state$1 === null || state$1 === void 0 ? void 0 : state$1.checkout) === null || _a === void 0 ? void 0 : _a.id) {
            return (_b = state$1 === null || state$1 === void 0 ? void 0 : state$1.checkout) === null || _b === void 0 ? void 0 : _b.id;
        }
        // we don't have and order id.
        return null;
    }
    async fetchCheckout(id, { query = {}, data = {} } = {}) {
        try {
            updateFormState('FETCH');
            const checkout = (await createOrUpdateCheckout({
                id,
                query,
                data,
            }));
            updateFormState('RESOLVE');
            return checkout;
        }
        catch (e) {
            this.handleErrorResponse(e);
        }
    }
    /** Fetch a session. */
    async fetch(query = {}) {
        try {
            updateFormState('FETCH');
            state$1.checkout = (await fetchCheckout({
                id: this.getSessionId(),
                query,
            }));
            updateFormState('RESOLVE');
        }
        catch (e) {
            this.handleErrorResponse(e);
        }
    }
    /** Update a session */
    async update(data = {}, query = {}) {
        try {
            state$1.checkout = (await createOrUpdateCheckout({
                id: (data === null || data === void 0 ? void 0 : data.id) ? data.id : this.getSessionId(),
                data,
                query,
            }));
        }
        catch (e) {
            // reinitalize if order not found.
            if (['checkout.not_found'].includes(e === null || e === void 0 ? void 0 : e.code)) {
                clearCheckout();
                return this.initialize();
            }
            console.error(e);
            throw e;
        }
    }
    /** Updates a session with loading status changes. */
    async loadUpdate(data = {}) {
        try {
            updateFormState('FETCH');
            await this.update(data);
            updateFormState('RESOLVE');
        }
        catch (e) {
            this.handleErrorResponse(e);
        }
    }
    render() {
        return (h("sc-line-items-provider", { key: '2390c7744f8a1848a01bc15ede9c549c92b573e8', order: state$1 === null || state$1 === void 0 ? void 0 : state$1.checkout, onScUpdateLineItems: e => this.loadUpdate({ line_items: e.detail }) }, h("slot", { key: 'c95c4a4e20edf2807c812ca71cf403c8ae4173e3' })));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "prices": ["handlePricesChange"]
    }; }
};

export { ScCheckoutAutofillProvider as sc_checkout_autofill_provider, ScCheckoutGeoPermission as sc_checkout_geo_permission, ScCheckoutStockAlert as sc_checkout_stock_alert, ScCheckoutTestComplete as sc_checkout_test_complete, ScCheckoutUnsavedChangesWarning as sc_checkout_unsaved_changes_warning, ScFormComponentsValidator as sc_form_components_validator, ScFormErrorProvider as sc_form_error_provider, ScFormStateProvider as sc_form_state_provider, ScLoginProvider as sc_login_provider, ScOrderConfirmProvider as sc_order_confirm_provider, ScSessionProvider as sc_session_provider };

//# sourceMappingURL=sc-checkout-autofill-provider_11.entry.js.map