import { ImageAttributes, LineItem, LineItemData } from '../types';
export interface StockAlertRow {
    name?: string;
    variant?: string;
    image?: ImageAttributes;
    from: number;
    to: number;
}
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
export declare const getBundleComponentVariants: (parentId: string, lineItems?: LineItem[]) => Record<string, string>;
/** Available stock for a line item (variant takes precedence over product). */
export declare const getAvailableStock: (lineItem: LineItem) => number;
/** Out-of-stock line items (standalone items and bundle components). */
export declare const getOutOfStockLineItems: (lineItems?: LineItem[]) => LineItem[];
/**
 * A bundle is atomic, so a short component caps the bundle, not the component:
 * floor(stock / perBundleQty), smallest cap across components. Returns a map of
 * bundle parent id -> reduced quantity.
 *
 * `swappedProductsByParent` lists component products being swapped to an in-stock
 * variant — those are skipped so they don't cap a bundle they no longer limit.
 */
export declare const getBundleQuantityReductions: (lineItems?: LineItem[], swappedProductsByParent?: Map<string, Set<string>>) => Map<string, number>;
/**
 * Payload to fix a stock alert. Posts parents only (components derive from the
 * parent): bundles drop to their reduced quantity, standalone items to available
 * stock. A swapped component is excluded from its bundle's cap, so any *other*
 * short component still reduces the bundle correctly.
 */
export declare const buildStockAdjustedLineItems: (lineItems?: LineItem[], bundleVariantOverrides?: Map<string, Record<string, string>>) => LineItemData[];
/**
 * Rows for the stock alert dialog. Bundle components roll up into a single
 * parent row (the bundle quantity is what changes); standalone items show
 * themselves.
 */
export declare const buildStockAlertRows: (lineItems?: LineItem[]) => StockAlertRow[];
