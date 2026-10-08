import type { Components, JSX } from "../types/components";

interface ScVerificationCode extends Components.ScVerificationCode, HTMLElement {}
export const ScVerificationCode: {
    prototype: ScVerificationCode;
    new (): ScVerificationCode;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
