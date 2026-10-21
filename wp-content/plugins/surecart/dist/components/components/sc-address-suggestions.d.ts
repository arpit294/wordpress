import type { Components, JSX } from "../types/components";

interface ScAddressSuggestions extends Components.ScAddressSuggestions, HTMLElement {}
export const ScAddressSuggestions: {
    prototype: ScAddressSuggestions;
    new (): ScAddressSuggestions;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
