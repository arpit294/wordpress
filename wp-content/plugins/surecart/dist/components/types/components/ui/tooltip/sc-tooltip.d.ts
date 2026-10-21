/**
 * @part base - The elements base wrapper.
 * @part text - The tooltip text.
 */
export declare class ScTooltip {
    el: HTMLScTooltipElement;
    private tooltip;
    /** Open or not */
    open: boolean;
    /** Tooltip fixed width */
    width: string;
    /** Tooltip text */
    text: string;
    /** Freeze open or closed. */
    freeze: boolean;
    /** The tooltip's padding. */
    padding: number;
    /**
     * The tooltip's type.
     *
     * - `info` (default) — current SureCart blue/info style with a colored arrow.
     * - `primary`/`success`/`warning`/`danger` — accent-colored variants.
     * - `text` — legacy passthrough used by long-form tooltips.
     * - `dark` — flat black background with white text, matching the
     *   WordPress admin button tooltip ("View options"-style). No colored
     *   accent, no arrow, no padding flourish — just the WP look.
     */
    type: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text' | 'dark';
    /** The tooltip's placement relative to the trigger. */
    placement: 'top' | 'bottom' | 'left' | 'right';
    top: number;
    left: number;
    componentDidRender(): void;
    handleWindowScroll(): void;
    handleBlur(): void;
    handleClick(): void;
    handleFocus(): void;
    handleMouseOver(): void;
    handleMouseOut(): void;
    render(): any;
}
