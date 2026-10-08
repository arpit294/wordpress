import { EventEmitter } from '../../../stencil-public-runtime';
/**
 * @part base - The elements base wrapper.
 * @part trigger - The trigger.
 * @part panel - The panel.
 */
export declare class ScPopover {
    el: HTMLDivElement;
    private panel?;
    private trigger?;
    private positioner?;
    private positionerCleanup;
    private boundHandleOutsideClick;
    private boundHandleKeyDown;
    private boundHandleFocusOut;
    /** Is this disabled. */
    disabled: boolean;
    /** Indicates whether or not the popover is open. You can use this in lieu of the show/hide methods. */
    open?: boolean;
    /** The placement of the popover. */
    placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end';
    /** The distance in pixels from which to offset the panel away from its trigger. */
    distance: number;
    /** The distance in pixels from which to offset the panel along its trigger. */
    skidding: number;
    /**
     * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
     * `overflow: auto|scroll`.
     */
    hoist: boolean;
    /** Emitted when the popover opens. Calling `event.preventDefault()` will prevent it from being opened. */
    scShow: EventEmitter<void>;
    /** Emitted when the popover closes. Calling `event.preventDefault()` will prevent it from being closed. */
    scHide: EventEmitter<void>;
    isVisible: boolean;
    handleOpenChange(): void;
    handleOutsideClick(evt: MouseEvent): void;
    handleKeyDown(event: KeyboardEvent): void;
    handleTriggerKeyDown(event: KeyboardEvent): void;
    /**
     * Handles focus leaving the popover.
     * Closes the popover if focus moves outside of it.
     */
    handleFocusOut(event: FocusEvent): void;
    startPositioner(): void;
    updatePositioner(): void;
    stopPositioner(): void;
    show(): void;
    hide(): void;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    handleHide(): void;
    render(): any;
}
