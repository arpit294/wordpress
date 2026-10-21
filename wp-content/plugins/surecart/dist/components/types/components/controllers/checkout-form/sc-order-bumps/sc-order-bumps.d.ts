export declare class ScOrderBumps {
    label: string;
    help: string;
    /** Should we show the controls (classic design) */
    showControl: boolean;
    /** Hide bumps that have already been added to the checkout. */
    hideAddedItems: boolean;
    /** Check if a bump is already added as a line item. */
    isBumpAdded(bumpId: string): boolean;
    render(): any;
}
