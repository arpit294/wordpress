/**
 * Internal dependencies.
 */
import { Checkout, LineItem, Product, Upsell } from "../../types";
export type UpsellAcceptedDetail = {
    checkout: Checkout;
    line_item: LineItem;
    upsell: Upsell;
    product: Product;
};
declare global {
    interface WindowEventMap {
        scUpsellAccepted: CustomEvent<UpsellAcceptedDetail>;
    }
}
/**
 * Upsell accepted event.
 *
 * The upsell charge happens outside the checkout store, so the checkout
 * completion events never fire for it — this is the only client-side
 * signal that an upsell was purchased.
 */
export declare const dispatchUpsellAccepted: (checkout: Checkout, lineItem: LineItem) => void;
