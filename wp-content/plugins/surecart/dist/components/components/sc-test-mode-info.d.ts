import type { Components, JSX } from "../types/components";

interface ScTestModeInfo extends Components.ScTestModeInfo, HTMLElement {}
export const ScTestModeInfo: {
    prototype: ScTestModeInfo;
    new (): ScTestModeInfo;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
