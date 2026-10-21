import { EventEmitter } from '../../../stencil-public-runtime';
import { Fee, ImageAttributes, LineItem } from '../../../types';
/**
 * @part base - The component base
 * @part product-line-item - The product line item
 * @part image - The product image
 * @part text - The product text
 * @part title - The product title
 * @part suffix - The product suffix
 * @part price - The product price
 * @part price__amount - The product price amount
 * @part price__description - The product price description
 * @part price__scratch - The product price scratch
 * @part static-quantity - The product static quantity
 * @part remove-icon__base - The product remove icon
 * @part quantity - The product quantity
 * @part quantity__minus - The product quantity minus
 * @part quantity__minus-icon - The product quantity minus icon
 * @part quantity__plus - The product quantity plus
 * @part quantity__plus-icon - The product quantity plus icon
 * @part quantity__input - The product quantity input
 * @part line-item__price-description - The line item price description
 * @part details - The collapsible details region (bundle components + note)
 * @part details__toggle - The details expand/collapse toggle button
 * @part details__component - A single bundle component row
 * @part details__variant - The variant options within a bundle component row
 * @part note - The line item note
 */
export declare class ScProductLineItem {
    el: HTMLScProductLineItemElement;
    /** Image attributes. */
    image: ImageAttributes;
    /** Product name */
    name: string;
    /** Product monetary amount */
    amount: string;
    /** The line item scratch amount */
    scratch: string;
    /** Product display amount */
    displayAmount: string;
    /** Product scratch display amount */
    scratchDisplayAmount: string;
    /** Product line item fees. */
    fees: Fee[];
    /** Price name */
    price?: string;
    /** Product variant label */
    variant: string;
    /** Quantity */
    quantity: number;
    /** Recurring interval (i.e. monthly, once, etc.) */
    interval: string;
    /** Trial text */
    trial: string;
    /** Is the line item removable */
    removable: boolean;
    /** Can we select the quantity */
    editable: boolean;
    /** The max allowed. */
    max: number;
    /** The SKU. */
    sku: string;
    /** The purchasable status display */
    purchasableStatus: string;
    /** The line item note */
    note: string;
    /** The review button link. If set, a review button will be shown linking to this URL. */
    reviewButtonLink: string;
    /**
     * Bundle component line items, rendered as a read-only nested list under
     * the main row when this line item is a bundle parent.
     */
    bundleComponents: LineItem[];
    /**
     * Show every bundle component (default), or only those with a selected
     * variant when set to `false`.
     */
    showAllBundleItems: boolean;
    /** Separator between a bundle component's name and its variant options. */
    separator: string;
    /** Emitted when the quantity changes. */
    scUpdateQuantity: EventEmitter<number>;
    /** Emitted when the quantity changes. */
    scRemove: EventEmitter<void>;
    /** Collapse the bundle-items details region to the first two lines by default (matches the cart block). */
    detailsExpanded: boolean;
    toggleDetails(): void;
    /**
     * Bundle items render in a single collapsible region. Collapsed, only the
     * first `COLLAPSE_AFTER` rows show; bundle components render one row each, so
     * the hidden count is exact ("+N more").
     */
    renderDetails(): any;
    render(): any;
}
