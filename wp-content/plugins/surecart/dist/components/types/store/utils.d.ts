import { Product } from '../types';
export declare const getSerializedState: () => any;
/**
 * Once-only id guard backed by localStorage, for one-time analytics events.
 * Keeps only the most recent 20 ids; falls back to unguarded behavior when
 * localStorage is unavailable (e.g. Safari private mode).
 */
export declare const createIdGuard: (storageKey: string) => {
    has: (id: string) => boolean;
    add: (id: string) => void;
};
/**
 * Is this variant option sold out.
 */
export declare const isProductVariantOptionSoldOut: (optionNumber: any, option: any, variantValues: any, product: Product) => boolean;
/**
 * Is this variant option missing/unavailable?
 */
export declare const isProductVariantOptionMissing: (optionNumber: number, option: string, variantValues: any, product: Product) => boolean;
