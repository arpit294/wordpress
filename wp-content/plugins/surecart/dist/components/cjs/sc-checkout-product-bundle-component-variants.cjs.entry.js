'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const mutations = require('./mutations-4133422f.js');
const getters = require('./getters-1ff518bc.js');
const util = require('./util-a15c420c.js');
const index$1 = require('./index-c5bd66ae.js');
const mutations$1 = require('./mutations-d5d6ddf1.js');
const utils = require('./utils-f5ea3c23.js');
require('./index-c3de642f.js');
require('./remove-query-args-b57e8cd3.js');
require('./add-query-args-49dcb630.js');
require('./index-fb76df07.js');
require('./google-8dbad1a6.js');
require('./currency-b438c76d.js');
require('./store-29627d6b.js');
require('./price-9dddd853.js');
require('./store-5cd165ea.js');
require('./address-7404695f.js');
require('./fetch-5e8dc1d5.js');
require('./index-7ced8198.js');

const scCheckoutProductBundleComponentVariantsCss = "sc-checkout-product-bundle-component-variants{display:block}.sc-bundle-items{display:flex;flex-direction:column;gap:var(--sc-form-row-spacing, var(--sc-spacing-medium, 1rem));width:100%}.sc-bundle-item__row{display:flex;flex-direction:column;gap:var(--sc-input-label-margin, var(--sc-spacing-xx-small, 0.25rem))}.sc-bundle-item__row-header{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px;line-height:1.35}.sc-bundle-item__product-name,.sc-bundle-item__variant-name{display:inline;font-weight:var(--sc-input-label-font-weight, var(--sc-font-weight-normal, 400));font-size:var(--sc-font-size-medium, 1rem);color:var(--sc-input-label-color, var(--sc-color-gray-600, #4b5563))}.sc-bundle-item__variant-name{white-space:nowrap}.sc-bundle-item__qty{color:var(--sc-input-label-color, var(--sc-color-gray-600, #4b5563));font-size:var(--sc-font-size-small, 0.875rem);font-weight:var(--sc-font-weight-medium, 500);white-space:nowrap}.sc-bundle-item__pills{display:flex;flex-wrap:wrap;gap:var(--sc-spacing-x-small, 0.5rem)}";
const ScCheckoutProductBundleComponentVariantsStyle0 = scCheckoutProductBundleComponentVariantsCss;

const ScCheckoutProductBundleComponentVariants = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /** True while a persistSelection() PATCH is in flight (see onChange guard). */
        this.updating = false;
        this.product = undefined;
        this.selectedValues = {};
        this.selectedVariants = {};
    }
    componentWillLoad() {
        this.seedFromProductDefaults();
        // Once the checkout exists, prefer the variants already on the bundle
        // line item — keeps the picker in sync with the seeded server state.
        this.removeListener = mutations.onChange('checkout', () => {
            // While our own PATCH is in flight the store still holds the pre-PATCH
            // selection; hydrating from it would clobber the user's fresh pick.
            if (this.updating)
                return;
            const lineItem = this.bundleLineItem();
            if (lineItem === null || lineItem === void 0 ? void 0 : lineItem.bundle_component_variants) {
                this.hydrateFromLineItem(lineItem.bundle_component_variants);
            }
        });
    }
    disconnectedCallback() {
        var _a;
        (_a = this.removeListener) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    /**
     * Pick a sensible default per component — first in-stock variant when
     * the component has tracked stock, else the first variant. Matches the
     * server-side ProductPageBlock::findInitialBundleComponentVariant.
     */
    seedFromProductDefaults() {
        const variableComponents = this.variableComponents();
        if (!variableComponents.length)
            return;
        const values = {};
        const variants = {};
        variableComponents.forEach(component => {
            const variant = this.findInitialVariant(component);
            if (!variant)
                return;
            values[component.id] = this.variantToValues(variant);
            variants[component.id] = variant.id;
        });
        this.selectedValues = values;
        this.selectedVariants = variants;
    }
    /**
     * When the checkout's bundle line item already has a saved selection,
     * use those ids instead of the local defaults.
     */
    hydrateFromLineItem(map) {
        const variants = {};
        const values = {};
        this.variableComponents().forEach(component => {
            var _a;
            const variantId = map[component.id];
            const variant = (((_a = component.variants) === null || _a === void 0 ? void 0 : _a.data) || []).find((v) => v.id === variantId);
            if (!variant)
                return;
            variants[component.id] = variant.id;
            values[component.id] = this.variantToValues(variant);
        });
        if (Object.keys(variants).length) {
            this.selectedVariants = { ...this.selectedVariants, ...variants };
            this.selectedValues = { ...this.selectedValues, ...values };
        }
    }
    /**
     * Bundle items that actually need a picker — components without variant
     * options are skipped (nothing to choose), matching the PDP block's gate.
     */
    variableItems() {
        var _a, _b;
        const items = (((_b = (_a = this.product) === null || _a === void 0 ? void 0 : _a.bundle_items) === null || _b === void 0 ? void 0 : _b.data) || []);
        return items
            .map(item => ({ item, component: this.toComponentView(item) }))
            .filter((entry) => { var _a, _b, _c, _d; return !!((_a = entry.component) === null || _a === void 0 ? void 0 : _a.id) && !!((_d = (_c = (_b = entry.component) === null || _b === void 0 ? void 0 : _b.variant_options) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.length); });
    }
    /**
     * Normalize a bundle item into a product-shaped view whose variants/options
     * come from the shortcut associations (component_variants /
     * component_variant_options), keeping id/name/stock from component_product.
     * Lets the rest of the picker — and the shared sold-out/missing helpers —
     * read `.variants.data` / `.variant_options.data` unchanged.
     */
    toComponentView(item) {
        var _a, _b;
        const product = item === null || item === void 0 ? void 0 : item.component_product;
        if (!(product === null || product === void 0 ? void 0 : product.id))
            return null;
        return {
            ...product,
            variants: (_a = item === null || item === void 0 ? void 0 : item.component_variants) !== null && _a !== void 0 ? _a : { data: [] },
            variant_options: (_b = item === null || item === void 0 ? void 0 : item.component_variant_options) !== null && _b !== void 0 ? _b : { data: [] },
        };
    }
    variableComponents() {
        return this.variableItems().map(({ component }) => component);
    }
    findInitialVariant(component) {
        var _a;
        const variants = ((_a = component === null || component === void 0 ? void 0 : component.variants) === null || _a === void 0 ? void 0 : _a.data) || [];
        if (!variants.length)
            return null;
        const hasUnlimitedStock = !!(component === null || component === void 0 ? void 0 : component.has_unlimited_stock);
        if (hasUnlimitedStock)
            return variants[0];
        // `archived` isn't on the Variant type; stock-based check is sufficient
        // since archived variants surface with 0 available_stock anyway.
        const inStock = variants.find(v => { var _a; return ((_a = v.available_stock) !== null && _a !== void 0 ? _a : 0) > 0; });
        return inStock || variants[0];
    }
    variantToValues(variant) {
        const values = {};
        ['option_1', 'option_2', 'option_3'].forEach(key => {
            const value = variant === null || variant === void 0 ? void 0 : variant[key];
            if (value !== null && value !== undefined && value !== '') {
                values[key] = value;
            }
        });
        return values;
    }
    /**
     * Whether an option value renders as disabled (missing combination or sold
     * out). Mirrors the PDP pill logic in `sc-product-pills-variant-option`.
     */
    isOptionUnavailable(component, optionIndex, value) {
        const componentValues = this.selectedValues[component.id] || {};
        const optionNumber = optionIndex + 1;
        return utils.isProductVariantOptionSoldOut(optionNumber, value, componentValues, component) || utils.isProductVariantOptionMissing(optionNumber, value, componentValues, component);
    }
    /** Update one option for a single component, then resolve the variant. */
    setOption(component, optionIndex, value) {
        var _a;
        // Don't let an unavailable pill commit a selection — visual disabled
        // alone isn't enough since sc-pill-option only sets aria-disabled.
        if (this.isOptionUnavailable(component, optionIndex, value))
            return;
        const optionKey = `option_${optionIndex + 1}`;
        const next = {
            ...(this.selectedValues[component.id] || {}),
            [optionKey]: value,
        };
        this.selectedValues = { ...this.selectedValues, [component.id]: next };
        const variant = util.getVariantFromValues({
            variants: ((_a = component === null || component === void 0 ? void 0 : component.variants) === null || _a === void 0 ? void 0 : _a.data) || [],
            values: next,
        });
        if (!(variant === null || variant === void 0 ? void 0 : variant.id)) {
            if (this.selectedVariants[component.id]) {
                const updatedVariants = { ...this.selectedVariants };
                delete updatedVariants[component.id];
                this.selectedVariants = updatedVariants;
            }
            return;
        }
        if (this.selectedVariants[component.id] === variant.id)
            return;
        this.selectedVariants = { ...this.selectedVariants, [component.id]: variant.id };
        this.persistSelection();
    }
    bundleLineItem() {
        var _a;
        return getters.getLineItemByProductId((_a = this.product) === null || _a === void 0 ? void 0 : _a.id);
    }
    /**
     * Push the current selection map to the API. We only update the existing
     * bundle line item — the buy page seeds it on first load via
     * BuyPageController, so by the time the user clicks a pill it exists.
     */
    async persistSelection() {
        const lineItem = this.bundleLineItem();
        if (!(lineItem === null || lineItem === void 0 ? void 0 : lineItem.id))
            return;
        // Nothing to send if the selection is identical to what's stored.
        const current = lineItem.bundle_component_variants || {};
        const next = this.selectedVariants;
        const same = Object.keys(next).length === Object.keys(current).length && Object.entries(next).every(([k, v]) => current[k] === v);
        if (same)
            return;
        try {
            this.updating = true;
            mutations.updateFormState('FETCH');
            mutations.state.checkout = await index$1.updateLineItem({
                id: lineItem.id,
                data: { bundle_component_variants: next },
            });
            mutations.updateFormState('RESOLVE');
        }
        catch (e) {
            console.error(e);
            mutations$1.createErrorNotice(e);
            mutations.updateFormState('REJECT');
        }
        finally {
            this.updating = false;
        }
    }
    /**
     * Render one row per variant option per variable bundle item — matches
     * the PDP bundle picker (`surecart/product-variant-pills` in bundle mode) so
     * the buy page reads identically.
     */
    renderItemRows({ item, component }) {
        var _a;
        const options = ((_a = component === null || component === void 0 ? void 0 : component.variant_options) === null || _a === void 0 ? void 0 : _a.data) || [];
        const selected = this.selectedValues[component.id] || {};
        const componentName = (component === null || component === void 0 ? void 0 : component.name) || '';
        const quantity = Math.max(1, Number(item === null || item === void 0 ? void 0 : item.quantity) || 1);
        const showQuantity = quantity > 1;
        return options.map(({ name, values }, index$1) => {
            const optionKey = `option_${index$1 + 1}`;
            return (index.h("div", { class: "sc-bundle-item__row", key: `${component.id}-${optionKey}` }, index.h("div", { class: "sc-bundle-item__row-header" }, index.h("span", { class: "sc-bundle-item__product-name" }, componentName), index.h("span", { class: "sc-bundle-item__variant-name" }, " \u2013 ", name), showQuantity && index.h("span", { class: "sc-bundle-item__qty" }, "\u00D7 ", quantity)), index.h("div", { class: "sc-bundle-item__pills" }, (values || []).map(value => {
                const isSelected = selected[optionKey] === value;
                const isUnavailable = this.isOptionUnavailable(component, index$1, value);
                return (index.h("sc-pill-option", { isSelected: isSelected, isUnavailable: isUnavailable, onClick: () => this.setOption(component, index$1, value) }, index.h("span", { "aria-hidden": "true" }, value), index.h("sc-visually-hidden", null, wp.i18n.sprintf(wp.i18n.__('Select %1$s: %2$s for %3$s', 'surecart'), name, value, componentName), isUnavailable && index.h("span", null, " ", wp.i18n.__('(option unavailable)', 'surecart')))));
            }))));
        });
    }
    render() {
        var _a;
        if (!((_a = this.product) === null || _a === void 0 ? void 0 : _a.bundle))
            return null;
        const items = this.variableItems();
        if (!items.length)
            return null;
        return index.h("div", { class: "sc-bundle-items" }, items.map(entry => this.renderItemRows(entry)));
    }
    get el() { return index.getElement(this); }
};
ScCheckoutProductBundleComponentVariants.style = ScCheckoutProductBundleComponentVariantsStyle0;

exports.sc_checkout_product_bundle_component_variants = ScCheckoutProductBundleComponentVariants;

//# sourceMappingURL=sc-checkout-product-bundle-component-variants.cjs.entry.js.map