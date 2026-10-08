/**
 * Internal dependencies.
 */
import { RazorpayConstructor } from '../types';
/**
 * Razorpay Checkout JS SDK URL.
 */
export declare const RAZORPAY_CHECKOUT_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";
/**
 * UI metadata for Razorpay `payment_method_types` ids — Razorpay's API returns only the id,
 * so this is the source of truth for icons/labels shown in checkout and on dashboard rows.
 * Keep keys in sync with GET /processors/:id/payment_method_types.
 */
export declare const RAZORPAY_METHOD_META: Record<string, {
    icon: string;
    label: () => string;
}>;
/** Localized label for a Razorpay method id. Returns `undefined` for unknown ids. */
export declare const getRazorpayMethodLabel: (type?: string | null) => string | undefined;
/** `sc-icon` name for a Razorpay method id. Falls back to the branded razorpay icon. */
export declare const getRazorpayMethodIcon: (type?: string | null) => string;
/**
 * Load Razorpay SDK script.
 * Uses singleton pattern to avoid loading the script multiple times.
 *
 * @returns Promise that resolves to the Razorpay constructor.
 */
export declare const loadRazorpay: () => Promise<RazorpayConstructor>;
