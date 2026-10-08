import type { Components, JSX } from "../types/components";

interface ScPopover extends Components.ScPopover, HTMLElement {}
export const ScPopover: {
    prototype: ScPopover;
    new (): ScPopover;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
