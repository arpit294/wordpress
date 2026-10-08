/**
 * Internal dependencies.
 */
import { Address, GoogleMapAddressComponents } from "../types";
/**
 * Build the street line (line_1) for a place.
 *
 * Prefer Google's `postalAddress.addressLines` — already in the country's envelope order
 * ("Musterstraße 110" in DE, "110 Main St" in US). Rebuilding from street_number + route
 * forces US order onto every country, so that path is only a fallback.
 *
 * Named buildings (common in the UK, e.g. "3 Cambridge House") have no
 * street_number/route — the address lives in subpremise + premise instead.
 */
export declare function getStreetAddress(addressComponents: Array<GoogleMapAddressComponents> | null, addressLines?: Array<string>): string;
/**
 * Transforms the place address components into an address object.
 */
export declare function transformPlaceDetails(addressComponents: Array<GoogleMapAddressComponents>, regions: Array<{
    value: string;
    label: string;
}>): Address;
/**
 * Get the user's country code based on Google Geolocation and GeoCode APIs.
 * Caches the result in sessionStorage to avoid repeat API calls.
 */
export declare function getCurrentUserCountryCode(): Promise<any>;
