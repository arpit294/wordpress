import { Address, AddressSuggestion } from "../../../../types";
/**
 * Highlights the matching parts of a text based on a query.
 */
export declare function highlightMatch(text: string, query: string): string;
/**
 * Create a Places API session token. Groups autocomplete keystrokes and the final
 * Place Details call into one billing session. Falls back for insecure contexts
 * where crypto.randomUUID is unavailable.
 */
export declare const createSessionToken: () => string;
/**
 * Fetches address predictions from the Google Places Autocomplete API.
 *
 * Autocomplete (not Text Search) is required here — Text Search matches businesses
 * and POIs, so partial addresses returned shops instead of street addresses.
 */
export declare function fetchAddressSuggestions(input: string, country: string | null, sessionToken: string, signal?: AbortSignal): Promise<Array<AddressSuggestion>>;
/**
 * Returns a full replacement address — preserves recipient name only, does not merge with the
 * previous address. Merging would leak stale line_2/city/postal_code when the new place omits them.
 */
export declare function buildReplacementAddressFromPlace(place: AddressSuggestion, regions: Array<{
    value: string;
    label: string;
}>, previousName: string | null | undefined): Partial<Address>;
/**
 * Fetches place details from the Google Places API and transforms them into an address.
 *
 * Passing the autocomplete session token here closes the billing session — the token
 * is invalid afterwards, so the caller must discard it.
 */
export declare function fetchPlaceDetails(suggestion: AddressSuggestion, address: Partial<Address>, regions: Array<{
    value: string;
    label: string;
}>, sessionToken?: string): Promise<{
    updatedAddress: Partial<Address>;
    updatedRegions: Array<{
        value: string;
        label: string;
    }>;
}>;
