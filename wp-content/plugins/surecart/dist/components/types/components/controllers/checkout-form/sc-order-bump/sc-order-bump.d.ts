import { Bump } from '../../../../types';
export declare class ScOrderBump {
    el: HTMLElement;
    /** The bump */
    bump: Bump;
    /** Should we show the controls (classic design) */
    showControl: boolean;
    /** Loading state */
    loading: boolean;
    /** Cached design mode */
    private isModern;
    /** The bump line item */
    lineItem(): import("../../../../types").LineItem;
    /** Update the line item. */
    updateLineItem(): Promise<void>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    renderInterval(): any;
    renderDiscount(): any;
    /** Modern price (no slot) */
    renderModernPrice(): any;
    /** Classic price (with slot="description") */
    renderClassicPrice(): any;
    /** Modern design: rounded button, inline image, no checkbox */
    renderModern(): any;
    /** Classic design: checkbox control, footer with divider + image + description */
    renderClassic(): any;
    render(): any;
}
