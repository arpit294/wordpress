import { Checkout } from '../../../../types';
export declare class ScOrderConfirmationTotals {
    order: Checkout;
    renderDiscountLine(): any;
    renderCheckoutFees(checkout: Checkout): any;
    renderShippingFees(checkout: Checkout): any;
    render(): any;
}
