import { Product } from '../../../../types';
/**
 * Checkout-side picker for bundle component variants. Mirrors the PDP bundle
 * picker (the scope-aware `surecart/product-variant-pills` block) but writes the
 * selection straight into the bundle line item's `bundle_component_variants`.
 */
export declare class ScCheckoutProductBundleComponentVariants {
    el: HTMLScCheckoutProductBundleComponentVariantsElement;
    /** The bundle product (must include bundle_items.component_variants + component_variant_options). */
    product: Product;
    /**
     * Map of componentProductId -> { option_1, option_2, option_3 }.
     * Holds the customer's in-flight selection per variable bundle component.
     */
    selectedValues: Record<string, Record<string, string>>;
    /**
     * Map of componentProductId -> variantId.
     * Derived from selectedValues; what gets posted as
     * `bundle_component_variants` on the line item.
     */
    selectedVariants: Record<string, string>;
    private removeListener?;
    /** True while a persistSelection() PATCH is in flight (see onChange guard). */
    private updating;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    /**
     * Pick a sensible default per component — first in-stock variant when
     * the component has tracked stock, else the first variant. Matches the
     * server-side ProductPageBlock::findInitialBundleComponentVariant.
     */
    private seedFromProductDefaults;
    /**
     * When the checkout's bundle line item already has a saved selection,
     * use those ids instead of the local defaults.
     */
    private hydrateFromLineItem;
    /**
     * Bundle items that actually need a picker — components without variant
     * options are skipped (nothing to choose), matching the PDP block's gate.
     */
    private variableItems;
    /**
     * Normalize a bundle item into a product-shaped view whose variants/options
     * come from the shortcut associations (component_variants /
     * component_variant_options), keeping id/name/stock from component_product.
     * Lets the rest of the picker — and the shared sold-out/missing helpers —
     * read `.variants.data` / `.variant_options.data` unchanged.
     */
    private toComponentView;
    private variableComponents;
    private findInitialVariant;
    private variantToValues;
    /**
     * Whether an option value renders as disabled (missing combination or sold
     * out). Mirrors the PDP pill logic in `sc-product-pills-variant-option`.
     */
    private isOptionUnavailable;
    /** Update one option for a single component, then resolve the variant. */
    private setOption;
    private bundleLineItem;
    /**
     * Push the current selection map to the API. We only update the existing
     * bundle line item — the buy page seeds it on first load via
     * BuyPageController, so by the time the user clicks a pill it exists.
     */
    private persistSelection;
    /**
     * Render one row per variant option per variable bundle item — matches
     * the PDP bundle picker (`surecart/product-variant-pills` in bundle mode) so
     * the buy page reads identically.
     */
    private renderItemRows;
    render(): any;
}
