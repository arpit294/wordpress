import type { Components, JSX } from "../types/components";

interface ScReviewStars extends Components.ScReviewStars, HTMLElement {}
export const ScReviewStars: {
    prototype: ScReviewStars;
    new (): ScReviewStars;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
