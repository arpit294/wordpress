import { OrderShipmentStatus } from '../../../types';
export declare class ScOrderShipmentBadge {
    /** The tag's statux type. */
    status: OrderShipmentStatus;
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
    render(): any;
}
