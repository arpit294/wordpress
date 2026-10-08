import { Price, ProductState } from "../../types";
/**
 * Available product prices
 *
 * @param {string} productId - Product ID
 *
 * @returns {Price[]} - Returns an array of prices that are not archived
 */
export declare const availablePrices: (productId: string) => Price[];
/**
 * Get Product
 */
export declare const getProduct: (productId?: string) => ProductState;
/**
 * Check if stock needs to be checked for the current product or selected variant.
 * Uses the pre-resolved has_unlimited_stock field supplied by the server.
 *
 * @returns {boolean} - Returns stock needs to be checked or not
 */
export declare const isStockNeedsToBeChecked: (productId: string) => boolean;
/**
 * Check if this option is out of stock base on the selected variant.
 */
export declare const isOptionSoldOut: (productId: string, optionNumber: number, option: string) => boolean;
/**
 * Check if this option is out of stock base on the selected variant.
 */
export declare const isOptionMissing: (productId: string, optionNumber: number, option: string) => boolean;
/**
 * Is product out of stock.
 *
 * @returns {boolean} - Returns true if product is out of stock
 */
export declare const isProductOutOfStock: (productId: string) => boolean;
/**
 * Is the selected variant missing.
 */
export declare const isSelectedVariantMissing: (productId: string) => boolean;
/**
 * Get product default state
 *
 * @returns {ProductState} - Returns the product state
 */
export declare const getDefaultState: () => {
    [key: string]: ProductState;
};
export declare const availableSubscriptionPrices: (productId: string) => Price[];
export declare const availableNonSubscriptionPrices: (productId: string) => Price[];
