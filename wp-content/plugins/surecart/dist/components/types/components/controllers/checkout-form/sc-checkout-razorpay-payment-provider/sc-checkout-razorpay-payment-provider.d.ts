export declare class ScCheckoutRazorpayPaymentProvider {
    /** Razorpay processor id. Required for the recurring `payment_method_types` fetch. */
    processorId: string;
    private unlistenToFormState?;
    private unlistenToCheckout?;
    private razorpayInstance;
    private confirming;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    /** Fetch enabled `payment_method_types` for recurring checkouts. No-op otherwise. */
    fetchMethods(): Promise<void>;
    confirm(): Promise<void>;
}
