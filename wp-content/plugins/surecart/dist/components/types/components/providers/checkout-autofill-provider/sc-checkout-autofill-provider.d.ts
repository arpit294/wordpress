export declare class ScCheckoutAutofillProvider {
    private appliedForCheckoutId?;
    private removeUserListener?;
    private removeCheckoutListener?;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    maybeApplyProfile(): Promise<void>;
    render(): any;
}
