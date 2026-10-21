/// <reference types="lodash" />
/**
 * External dependencies.
 */
import { EventEmitter } from '../../../stencil-public-runtime';
/**
 * Internal dependencies.
 */
import { Address, AddressSuggestion } from '../../../types';
export declare class ScAddressSuggestions {
    el: HTMLScAddressSuggestionsElement;
    /** Reference to the inner sc-input so we can delegate validation to it — the browser's native constraint
     *  validation can't see this input since it isn't form-associated. */
    private input;
    private boundHandleKeyDown;
    private boundHandleOutsideClick;
    private abortController;
    /** Tracks whether the local value was set by user input / browser autofill and hasn't been synced to the address prop yet. */
    private hasUnsyncedLocalValue;
    /** Places API session token — spans all autocomplete keystrokes until a place is selected. */
    private sessionToken;
    address: Partial<Address>;
    names: Partial<Address>;
    /** The label for the address input */
    label: string;
    /** Props for the input element */
    inputProps: Record<string, unknown>;
    /** If the address input is disabled */
    disabled: boolean;
    /** If the address is required */
    required: boolean;
    /** Holds the address line 1 value */
    value: string;
    /** Holds the regions for a given country. */
    regions: Array<{
        value: string;
        label: string;
    }>;
    /** Address suggestions */
    addressSuggestions: Array<AddressSuggestion>;
    /** Whether the suggestions dropdown is visible. */
    showSuggestions: boolean;
    /** Loading state for suggestions */
    loading: boolean;
    /** Address changed — emitted to parent to update address state. */
    scChangeAddress: EventEmitter<Address>;
    /** Event to show address fields manually */
    scShowAddressFields: EventEmitter<void>;
    /** Event to hide address fields */
    scHideAddressFields: EventEmitter<void>;
    /** Focused index for keyboard navigation */
    focusedIndex: number;
    /** Delegates to the inner sc-input so this field participates in form validation
     *  (it was previously skipped entirely, allowing required addresses through empty). */
    reportValidity(): Promise<boolean>;
    /** Whether Google Maps autocomplete is active. */
    isGoogleMapsActive(): boolean;
    debouncedFetchAddressSuggestions: import("lodash").DebouncedFunc<(input: string) => Promise<void>>;
    handleValueChange(newValue: string): void;
    /** Close the suggestions list and cancel in-flight fetch. */
    private closeSuggestionsDropdown;
    handleAddressChange(): void;
    /** Emit an address update to the parent, merging changes with current address. */
    private emitAddressUpdate;
    /** Select a suggestion by place ID — used by both click and keyboard. */
    selectSuggestion(placeId: string): Promise<void>;
    handleInputChange(e: any): void;
    /** Sync the input value back to the parent address on change events (blur, browser autofill). */
    handleInputValueChange(e: any): void;
    handleKeyDown(event: KeyboardEvent): void;
    manualAddress(): void;
    handleOutsideClick(evt: any): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    /** Tell the parent whether to show or hide the collapsible address fields. */
    updateFieldVisibility(): void;
    getActiveDescendantId(): string | undefined;
    getSuggestionsStatusText(): string;
    isSuggestionsVisible(): boolean;
    renderAddressSuggestions(): any;
    render(): any;
}
