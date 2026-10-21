export declare class ScCustomerLogin {
    /** The mode of the login */
    mode: 'code' | 'password';
    /** Is the component busy */
    busy: boolean;
    /** Is code resending */
    codeResending: boolean;
    /** Seconds remaining in the resend cooldown */
    resendCooldown: number;
    /** Interval timer reference for cleanup */
    private cooldownInterval;
    /** Password input ref (password view). */
    private passwordInput?;
    /** Verification code ref (code view). */
    private verificationCode?;
    /** Focus the active view's field after the next render (set when the mode switches). */
    private focusAfterRender;
    /** Error */
    error: string;
    /** Code Error coming from the parent */
    codeError: string;
    /** Lets the parent open in password mode (used on 429 fallback). */
    initialMode: 'code' | 'password';
    /** Login Password */
    password: string;
    /** Set after a 429 — hides the code toggle to prevent a retry loop. */
    codeUnavailable: boolean;
    formatCooldown(): string;
    verifyCode(code: string): Promise<void>;
    resendCode(): Promise<void>;
    handleCodeSendError(error: any): void;
    /** Seconds left in the cooldown, always derived from the (decaying) anchor timestamp. */
    private remainingCooldown;
    startCooldown(): void;
    componentWillLoad(): void;
    /** When the user switches views, focus that view's first field after it renders. */
    handleModeChange(): void;
    componentDidRender(): void;
    disconnectedCallback(): void;
    loginByPassword(e: any): Promise<void>;
    renderSentInfo(): any;
    renderCodeFooter(): any;
    renderPasswordView(): any;
    renderCodeView(): any;
    render(): any;
}
