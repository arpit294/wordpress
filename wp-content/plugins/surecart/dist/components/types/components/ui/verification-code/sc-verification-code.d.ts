export declare class ScVerificationCode {
    el: HTMLScVerificationCodeElement;
    /** Total number of inputs */
    total: number;
    /** The verification codes */
    codes: string[];
    /** Whether the component is in a loading/verifying state */
    loading: boolean;
    /** On change verification code */
    onChange: (value: string) => void;
    handleKeyDown(e: KeyboardEvent, index: number): void;
    handleInput(e: InputEvent, index: number): void;
    handleCodeChange(): void;
    focusInput(index: number): void;
    /** Focus the first code input. */
    triggerFocus(): Promise<void>;
    getElementByIndex(index: number): HTMLInputElement | null;
    handleFocus(e: FocusEvent): void;
    reset(): void;
    filledAllInputs: () => boolean;
    render(): any;
}
