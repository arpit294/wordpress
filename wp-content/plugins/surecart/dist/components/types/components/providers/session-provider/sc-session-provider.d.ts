/// <reference types="node" />
import { EventEmitter } from '../../../stencil-public-runtime';
import { Checkout, FormStateSetter, PriceChoice } from '../../../types';
export declare class ScSessionProvider {
    /** Element */
    el: HTMLElement;
    /** An array of prices to pre-fill in the form. */
    prices: Array<PriceChoice>;
    /** Should we persist the session. */
    persist: boolean;
    /** Disposers for the geolocation re-price subscriptions. */
    private removeGeoListeners;
    /** Update line items event */
    scUpdateOrderState: EventEmitter<Checkout>;
    /** Update line items event */
    scUpdateDraftState: EventEmitter<Checkout>;
    scPaid: EventEmitter<void>;
    /** Set the state */
    scSetState: EventEmitter<FormStateSetter>;
    handlePricesChange(): Promise<void>;
    /**
     * Finalize the order.
     *
     * @returns {Promise<Order>}
     */
    finalize(): Promise<Checkout | NodeJS.Timeout | Error>;
    getFormData(): Promise<{}>;
    /**
     * Handles the form submission.
     * @param e
     */
    handleFormSubmit(): Promise<Checkout | NodeJS.Timeout | Error>;
    /**
     * Handle paid event and update the
     */
    handlePaid(): Promise<void>;
    handleAbandonedCartUpdate(e: any): Promise<void>;
    /** Find or create session on load. */
    componentDidLoad(): void;
    disconnectedCallback(): void;
    /**
     * Re-price the checkout when the browser resolves the shopper's location.
     *
     * Watches both the coordinates and the checkout so bailing is always safe — a
     * later change re-runs the check. It converges because the platform echoes the
     * coordinates back onto the checkout, which quiets the mismatch guard.
     */
    private watchGeoCoordinates;
    /** Patch the checkout if the platform hasn't seen the resolved coordinates yet. */
    private maybeRepriceForGeo;
    /** Find or create an order */
    findOrCreateOrder(): Promise<void | NodeJS.Timeout>;
    /** Handle payment instrument redirect status */
    handleRedirectStatus(status: any, id: any): Promise<void>;
    /** Handle abandoned checkout from URL */
    handleCheckoutIdFromUrl(id: any, promotion_code?: string, query?: {}): Promise<void | NodeJS.Timeout>;
    /** Handle line items (and maybe ) */
    handleInitialLineItems(line_items: any, promotion_code: any): Promise<void>;
    /** Handle a brand new checkout. */
    handleNewCheckout(promotion_code: any): Promise<void>;
    /** Handle existing checkout */
    handleExistingCheckout(id: any, promotion_code: any): Promise<void>;
    /** Handle the error response. */
    handleErrorResponse(e: any): Promise<void>;
    /** Looks through children and finds items needed for initial session. */
    initialize(args?: {}): Promise<void>;
    /** Add prices that are passed into the component. */
    addInitialPrices(): {
        price_id: string;
        quantity: number;
        variant: string;
    }[];
    getSessionId(): import("@wordpress/url/build-types/get-query-arg").QueryArgParsed;
    fetchCheckout(id: any, { query, data }?: {
        query?: {};
        data?: {};
    }): Promise<Checkout>;
    /** Fetch a session. */
    fetch(query?: {}): Promise<void>;
    /** Update a session */
    update(data?: any, query?: {}): Promise<void>;
    /** Updates a session with loading status changes. */
    loadUpdate(data?: {}): Promise<void>;
    render(): any;
}
