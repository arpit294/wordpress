import { FulfillmentStatus } from '../../../types';
export declare class ScFulfillmentShippingStatusBadge {
    /** The tag's statux type. */
    status: FulfillmentStatus;
    /** Where the badge is shown. 'customer' applies friendlier wording for some statuses. */
    context: 'admin' | 'customer';
    /** The tag's size. */
    size: 'small' | 'medium' | 'large';
    /** Draws a pill-style tag with rounded edges. */
    pill: boolean;
    /** Makes the tag clearable. */
    clearable: boolean;
    /** Resolve the visible label, applying customer-friendly overrides in the customer context. */
    getLabel(): string;
    /** Resolve the tag type, applying customer-friendly overrides in the customer context. */
    getType(): 'default' | 'info' | 'success' | 'warning' | 'danger';
    render(): any;
}
