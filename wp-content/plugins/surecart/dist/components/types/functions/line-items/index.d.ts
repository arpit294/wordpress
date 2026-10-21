import { Bump, BundleComponentRow, BundleItem, Checkout, ChoiceType, LineItem, LineItemData, lineItems, Price, PriceChoice, Product, RecursivePartial } from '../../types';
/**
 * A bundle component's line item `quantity` is the total across the whole
 * purchase (per-bundle count × bundle quantity). Divide it back out by the
 * parent quantity to get the per-bundle count the bundle actually defines.
 */
export declare const getPerBundleQuantity: (component: LineItem, parentQuantity?: number) => number;
/**
 * Build display rows from bundle component line items.
 *
 * By default every component is shown (variant items render `Name - Variant`,
 * plain items render just `Name`). Pass `showAll = false` for variants-only
 * mode, which lists only the components that have a variant selection.
 */
export declare const getBundleComponentRowsFromLineItems: (components?: LineItem[], parentQuantity?: number, showAll?: boolean, separator?: string) => BundleComponentRow[];
/**
 * Build a list of display rows from BundleItems attached to a Product
 * (subscription detail panel — no LineItems exist for components there,
 * only the bundle definition).
 */
export declare const getBundleComponentRowsFromBundleItems: (items?: BundleItem[]) => BundleComponentRow[];
/**
 * Group line items into bundle parents (with components nested) and regulars.
 */
export declare const groupBundleLineItems: (items?: LineItem[]) => {
    regular: LineItem[];
    bundleParents: LineItem[];
    componentsByParent: Record<string, LineItem[]>;
};
export declare const getEnabledPriceChoices: (choices: Array<PriceChoice>) => Array<PriceChoice>;
export declare const convertPriceChoiceToLineItemData: (choice: PriceChoice) => LineItemData;
export declare const convertLineItemsToLineItemData: (lineItems: RecursivePartial<lineItems>) => Array<{
    price_id: string;
    quantity: number;
    variant_id?: string;
}>;
export declare const addLineItem: (lineItems: RecursivePartial<lineItems>, data: {
    price_id: string;
    quantity: number;
}) => {
    price_id: string;
    quantity: number;
    variant_id?: string;
}[];
/**
 * Calculates the initial line items for the session.
 */
export declare const calculateInitialLineItems: (choices: Array<PriceChoice>, choiceType: ChoiceType) => LineItemData[];
/**
 * Get the initial choice line items.
 */
export declare const getInitialChoiceLineItems: (choices: Array<PriceChoice>, choiceType: ChoiceType) => LineItemData[];
/**
 * Get price ids from line items
 * @param order
 * @returns
 */
export declare const getLineItemPriceIds: (line_items: RecursivePartial<lineItems>) => string[];
export declare const getLineItemBumpIds: (line_items: RecursivePartial<lineItems>) => string[];
export declare const getLineItemPrices: (line_items: RecursivePartial<lineItems>) => RecursivePartial<Price>[];
export declare const getLineItemByPriceId: (line_items: RecursivePartial<lineItems>, priceId: string) => RecursivePartial<LineItem>;
/**
 * Is this product in the checkout session?
 */
export declare const isProductInOrder: (product: RecursivePartial<Product>, order: Checkout) => boolean;
/**
 * Is the price in a checkout session
 */
export declare const isPriceInOrder: (price: RecursivePartial<Price>, order: Checkout) => boolean;
/**
 * Is the price in a checkout session
 */
export declare const isBumpInOrder: (bump: RecursivePartial<Bump>, order: Checkout) => boolean;
/**
 * Attempt to get the session id
 *
 * @param formId The form id.
 * @param order The order
 * @param refresh Should we refresh?
 *
 * @returns string
 */
export declare const getSessionId: (formId: any, order: any, refresh?: boolean) => any;
/** Check if the order has a subscription */
export declare const hasSubscription: (order: Checkout) => boolean;
export declare const hasTrial: (order: Checkout) => number;
/** Check if the order has a payment plan. */
export declare const hasPaymentPlan: (order: Checkout) => boolean;
