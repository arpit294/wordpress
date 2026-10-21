import { Checkout } from '../types';
/**
 * Whether a country code is within a capturable list — case-insensitively, since codes
 * arrive from different sources (order protocol setting vs. IP lookup). Empty list means
 * everywhere; a missing/unknown code fails closed.
 */
export declare const isCountryCapturable: (country: string | null | undefined, countries?: string[]) => boolean;
/** Whether the checkout's IP-resolved country passes isCountryCapturable(). */
export declare const isIpCountryCapturable: (checkout: Checkout | null, countries?: string[]) => boolean;
/**
 * Default copy for the checkout location permission modal — the single source
 * shared by the dialog (sc-checkout-geo-permission) and the admin placeholders.
 *
 * Keep it accurate and neutral: the location IS stored on the order, and a rule
 * may surcharge as well as discount — so no "never stored" or "fairer" framing.
 */
export declare const getGeoPermissionDefaults: () => {
    title: string;
    content: string;
    allowLabel: string;
    declineLabel: string;
};
