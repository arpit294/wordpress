import { Fulfillment } from "../../../../types";
export declare class ScFulfillments {
    el: HTMLScFulfillmentsElement;
    orderId: string;
    heading: string;
    /** Show the "Order Received" notice for shippable orders with no fulfillments yet. */
    showPreShipmentNotice: boolean;
    /** Holds fulfillments. */
    fulfillments: Fulfillment[];
    /** Order is shippable and paid/processing but nothing has been fulfilled yet. */
    awaitingFulfillment: boolean;
    /** Loading state */
    loading: boolean;
    busy: boolean;
    /** Error message */
    error: string;
    componentDidLoad(): void;
    fetch(): Promise<void>;
    /** A paid/processing order with a shippable item and no fulfillments gets an "Order Received" notice. Fails silent — worst case we hide the notice, not the page. */
    checkAwaitingFulfillment(): Promise<void>;
    renderLoading(): any;
    renderOrderReceived(): any;
    render(): any;
}
