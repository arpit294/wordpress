import { Checkout } from '../../../../types';
export declare class ScCart {
    el: HTMLScCartElement;
    /** Is this open or closed? */
    open: boolean;
    /** The form id to use for the cart. */
    formId: string;
    /** The header for the popout. */
    header: string;
    checkoutLink: string;
    /** The template for the cart to inject when opened. */
    cartTemplate: string;
    /** Are we in test or live mode. */
    mode: 'test' | 'live';
    /** The checkout url for the button. */
    checkoutUrl: string;
    /** Should we force show the cart, even if there's a form on the page? */
    alwaysShow: boolean;
    /** Whether the floating button should be visible */
    floatingIconEnabled: boolean;
    /** The current UI state. */
    uiState: 'loading' | 'busy' | 'navigating' | 'idle';
    handleOpenChange(): void;
    order(): any;
    setCheckout(data: any): void;
    /**
     * Search for the sc-checkout component on a page to make sure
     * we don't show the cart on a checkout page.
     */
    pageHasForm(): boolean;
    /** Count the number of items in the cart. */
    getItemsCount(): number;
    handleSetState(e: any): void;
    handleCloseCart(): void;
    /** Fetch the order */
    fetchOrder(): Promise<void>;
    componentWillLoad(): void;
    state(): {
        uiState: "idle" | "loading" | "busy" | "navigating";
        checkoutLink: string;
        loading: boolean;
        busy: boolean;
        navigating: boolean;
        empty: boolean;
        order: Checkout;
        lineItems: import("../../../../types").LineItem[];
        tax_status: import("../../../../types").TaxStatus;
        customerShippingAddress: string | import("../../../../types").Address;
        shippingAddress: string | import("../../../../types").Address;
        taxStatus: import("../../../../types").TaxStatus;
        formId: string;
    };
    render(): any;
}
