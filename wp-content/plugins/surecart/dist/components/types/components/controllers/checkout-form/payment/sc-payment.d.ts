import { PaymentMethodType, Processor } from '../../../../types';
/**
 * @part base - The elements base wrapper.
 * @part form-control - The form control wrapper.
 * @part label - The input label.
 * @part help-text - Help text that describes how to use the input.
 * @part test-badge__base - Test badge base.
 * @part test-badge__content - Test badge content.
 */
export declare class ScPayment {
    /** This element. */
    el: HTMLScPaymentElement;
    stripePaymentElement: boolean;
    /** Disabled processor types */
    disabledProcessorTypes: string[];
    secureNotice: string;
    /** The input's label. */
    label: string;
    /** Hide the test mode badge */
    hideTestModeBadge: boolean;
    componentWillLoad(): void;
    renderStripe(processor: any): any;
    renderPayPal(processor: any): any;
    renderMock(processor: Processor): any;
    renderPaystack(processor: Processor): any;
    /** Combined Razorpay — Razorpay's modal fans out all enabled methods itself. */
    renderRazorpayCombined(processor: Processor): any;
    /** Per-method Razorpay tile. Rendered as a sibling so `sc-payment-method-choice` can wire it into `sc-toggles`. */
    renderRazorpayMethodChoice(method: PaymentMethodType): any;
    renderRazorpay(processor: Processor): any;
    render(): any;
}
