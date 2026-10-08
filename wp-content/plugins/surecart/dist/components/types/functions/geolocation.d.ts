import { GeoCoordinates } from '../types';
/**
 * Get the customer's coordinates via the browser Geolocation API.
 * The browser prompts for permission if not already granted; resolves
 * null when denied, unsupported, or the lookup fails — never throws.
 */
export declare const getGeoCoordinates: () => Promise<GeoCoordinates | null>;
