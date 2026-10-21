import { EventEmitter } from '../../../../../stencil-public-runtime';
import { LineItemData } from "../../../../../types";
/**
 * This component listens for stock requirements and displays a dialog to the user.
 */
export declare class ScCheckoutStockAlert {
    /** Stock errors */
    stockErrors: Array<any>;
    /** Toggle line item event */
    scUpdateLineItem: EventEmitter<LineItemData>;
    /** Is it busy */
    busy: boolean;
    /** Update stock error. */
    error: string;
    /** Current checkout line items. */
    get lineItems(): import("src/types").LineItem[];
    /**
     * Update the checkout to the max available stock.
     *
     * Bundle shortages reduce the whole bundle quantity (a bundle is atomic). A
     * bundle that can't make even one unit (reduced to 0) is first rescued by
     * swapping a gone variant to an in-stock sibling when one exists; otherwise
     * the unfulfillable bundle is dropped from the cart, matching the "→ 0" the
     * dialog already shows.
     */
    onSubmit(): Promise<void>;
    render(): any;
}
