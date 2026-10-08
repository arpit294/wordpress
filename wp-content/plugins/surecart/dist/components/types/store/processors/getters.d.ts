import { Processor } from '../../types';
/**
 * Processors that use the method-types endpoint and expose a method selector.
 */
export declare const METHOD_AWARE_PROCESSORS: readonly ["mollie", "razorpay"];
/**
 * Type guard for method-aware processors.
 */
export declare const isMethodAwareProcessor: (id?: string | null) => id is "mollie" | "razorpay";
/**
 * Gets a sorted array of available processors based on
 * checkout mode, recurring requirements, and if mollie is enabled.
 */
export declare const availableProcessors: () => any;
/**
 * Gets the processor by type
 *
 * @param {string} type The processor type.
 *
 * @returns {Object | null} The processor data.
 */
export declare const getProcessorByType: (type: string) => any;
/**
 * Gets an available processor type.
 */
export declare const getAvailableProcessor: (type: string) => any;
/**
 * True if the processor supports the shop's current currency.
 */
export declare const processorSupportsCurrentCurrency: (processor?: Processor | null) => processor is Processor;
/**
 * Check if there is any available credit card processor except the given processor type.
 */
export declare const hasOtherAvailableCreditCardProcessor: (type: string) => any;
/**
 * Get a sorted array of manual payment methods
 * based on recurring requirements.
 */
export declare const availableManualPaymentMethods: () => any;
/**
 * Get a sorted array of payment method types for the currently selected method-aware processor
 * (e.g. mollie, razorpay).
 */
export declare const availableMethodTypes: () => any;
/**
 * Get a combined available processor choices (processors + manual payment methods)
 */
export declare const availableProcessorChoices: () => any[];
/**
 * Do we have multiple processors.
 */
export declare const hasMultipleProcessorChoices: () => boolean;
/**
 * Get a combined available payment methods (method types + manual payment methods)
 */
export declare const availableMethodChoices: () => any[];
/**
 * Do we have multiple payment methods.
 */
export declare const hasMultipleMethodChoices: () => boolean;
