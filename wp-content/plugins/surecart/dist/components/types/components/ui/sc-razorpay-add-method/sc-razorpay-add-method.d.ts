import { PaymentIntent } from "../../../types";
export declare class ScRazorpayAddMethod {
    liveMode: boolean;
    customerId: string;
    successUrl: string;
    currency: string;
    loading: boolean;
    loaded: boolean;
    error: string;
    paymentIntent: PaymentIntent;
    private razorpayInstance;
    private confirming;
    handlePaymentIntentCreate(): Promise<void>;
    createPaymentIntent(): Promise<void>;
    render(): any;
}
