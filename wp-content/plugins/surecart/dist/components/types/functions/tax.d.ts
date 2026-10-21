import { Checkout, TaxZones } from '../types';
export interface TaxLine {
    label: string | null;
    rate: number;
    amount: number;
    display_amount: string;
    taxable_display_amount?: string;
}
/**
 * Tax rows to render for a checkout. Prefers the per-rate breakdown so stacked
 * taxes (e.g. GST + PST) get one row each; falls back to the aggregate scalars
 * for platform responses that predate `tax_breakdown`.
 */
export declare const getTaxLines: (checkout: Checkout) => TaxLine[];
/** Rate detail for a tax row, matching the platform receipt: "(5% on $739.00)". */
export declare const formatTaxLineDetail: (line: TaxLine) => string;
export declare const zones: TaxZones;
export declare const getType: (key: any) => "ca_gst" | "au_abn" | "gb_vat" | "eu_vat";
export declare const formatTaxDisplay: (taxLabel: any, estimated?: boolean) => string;
