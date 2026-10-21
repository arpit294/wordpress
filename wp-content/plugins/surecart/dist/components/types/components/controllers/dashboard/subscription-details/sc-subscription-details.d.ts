import { BundleItem, Price, Subscription } from '../../../../types';
export declare class ScSubscriptionDetails {
    subscription: Subscription;
    pendingPrice: Price;
    hideRenewalText: boolean;
    activationsModal: boolean;
    loading: boolean;
    hasPendingUpdate: boolean;
    bundleExpanded: boolean;
    renderName(): string;
    handleSubscriptionChange(): Promise<void>;
    componentWillLoad(): void;
    fetchPrice(price_id: string): Promise<Price>;
    renderRenewalText(): any;
    getActivations(): import("../../../../types").Activation[];
    renderActivations(): any;
    /**
     * Bundle items attached to the subscription's product (if it is a bundle).
     * Bundle is a Product attribute post-refactor — read it via price.product.
     */
    getBundleItems(): BundleItem[];
    renderBundleComponents(): any;
    showWarning(): boolean;
    render(): any;
}
