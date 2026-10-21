import { LineItem } from '../../../../types';
/**
 * @part base - The component base
 * @part line-item - The line item
 * @part product-line-item - The product line item
 * @part line-item__image - The line item image
 * @part line-item__text - The line item text
 * @part line-item__title - The line item title
 * @part line-item__suffix - The line item suffix
 * @part line-item__description - The line item description (variant, price name, SKU)
 * @part line-item__trial-fees - The line item trial and fees
 * @part line-item__price - The line item price
 * @part line-item__price-amount - The line item price amount
 * @part line-item__price-description - The line item price description
 * @part line-item__price-scratch - The line item price scratch
 * @part line-item__static-quantity - The line item static quantity
 * @part line-item__remove-icon - The line item remove icon
 * @part line-item__quantity - The line item quantity
 * @part line-item__quantity-minus - The line item quantity minus
 * @part line-item__quantity-minus-icon - The line item quantity minus icon
 * @part line-item__quantity-plus - The line item quantity plus
 * @part line-item__quantity-plus-icon - The line item quantity plus icon
 * @part line-item__quantity-input - The line item quantity input
 * @part line-item__details - The collapsible details region (bundle components)
 * @part line-item__details-component - A single bundle component row
 * @part line-item__details-variant - The variant options within a bundle component row
 * @part line-item__details-toggle - The details expand/collapse toggle button
 * @part line-item__note - The line item note
 */
export declare class ScLineItems {
    /**
     * Is the line item editable?
     */
    editable: boolean;
    /**
     * Is the line item removable?
     */
    removable: boolean;
    /**
     * Show every bundle component (default), or only those with a selected
     * variant when set to `false`.
     */
    showAllBundleItems: boolean;
    /** Separator between a bundle component's name and its variant options. */
    separator: string;
    /**
     * Is the line item editable?
     */
    isEditable(item: LineItem): boolean;
    render(): any;
}
