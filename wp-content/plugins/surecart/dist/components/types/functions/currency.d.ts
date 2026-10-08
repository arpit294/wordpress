export declare const zeroDecimalCurrencies: string[];
export declare const maybeConvertAmount: (amount: number, currency: string) => number;
export declare const isZeroDecimal: (currency: string) => boolean;
/**
 * Get the decimal separator for a locale (e.g. "." for en-US, "," for de-DE).
 *
 * Note some locales use non-Latin marks (e.g. "٫" for fa/ar-EG); callers that
 * feed the price input should normalize to "." or "," (see {@link formatLocaleNumber}).
 *
 * @param {string} [locale] BCP 47 locale tag. Omit to use the runtime default.
 * @return {string} The locale's decimal separator, falling back to ".".
 */
export declare const getDecimalSeparator: (locale?: string) => string;
/**
 * The locale to read and write price separators with.
 *
 * Site locale before browser locale: which mark groups thousands is a property
 * of the shop, not of who is visiting it, so a German shop must read "1.500" as
 * 1500 for a shopper on a US-English browser too.
 *
 * `scData` carries the site locale but is enqueued only `whenRendered` for a
 * handful of legacy Stencil blocks (see AssetsService::enqueueComponents), so a
 * next-gen product page can have none — hence the `lang` fallback, which
 * WordPress renders from the site locale on every page.
 *
 * @return {string|undefined} BCP 47 locale tag, or undefined to use the runtime default.
 */
export declare const getInputLocale: () => string | undefined;
/**
 * Parse a user-typed amount, accepting ".", "," or "٫" as the decimal mark
 * and Latin, Arabic-Indic, or Persian digits.
 *
 * Structurally invalid input returns NaN rather than being coerced — stripping
 * an unrecognized character can silently merge digits into a wrong amount
 * (e.g. "9٫90" read as 990, a 100x overcharge). A bare trailing separator
 * ("9,") reads as the integer, since this runs on every keystroke.
 *
 * "9,90" -> 9.9 · "٩٫٩٠" -> 9.9 · "1,000" -> 1000 · "1.234,56" -> 1234.56 · "1.2.3" -> NaN
 *
 * @param {string} value The raw input value.
 * @param {string} [locale] BCP 47 locale tag, used only to settle "1.500". Omit for the runtime default.
 * @return {number} The parsed amount, or NaN when invalid.
 */
export declare const parseLocaleFloat: (value: string, locale?: string) => number;
/**
 * HTML `pattern` for price inputs — a coarse first filter, not the authority.
 *
 * It must accept everything {@link parseLocaleFloat} accepts (contract-tested in
 * currency.spec.ts); a narrower pattern would block values the parser reads
 * correctly. It is deliberately wider: the parser rejects "1.500" in a dot
 * locale, which one locale-blind attribute cannot express, so callers surface
 * the parser's NaN themselves rather than relying on this.
 * Needs the browser's u/v pattern flag for \p{Sc}; sc-input drops it when it
 * cannot compile, leaving the parser as the sole guard.
 */
export declare const PRICE_INPUT_PATTERN = "[\\s\\p{Sc}]*([\\d\u0660-\u0669\u06F0-\u06F9]+([.,\u066B][\\d\u0660-\u0669\u06F0-\u06F9]{0,2})?|[.,\u066B][\\d\u0660-\u0669\u06F0-\u06F9]{1,2}|[\\d\u0660-\u0669\u06F0-\u06F9]{1,3}([.,\u066C'\\s][\\d\u0660-\u0669\u06F0-\u06F9]{3})+([.,\u066B][\\d\u0660-\u0669\u06F0-\u06F9]{0,2})?)[\\s\\p{Sc}]*";
/**
 * {@link PRICE_INPUT_PATTERN}, or undefined where the browser cannot compile it.
 *
 * For raw `<input>` consumers that have no sc-input wrapper to guard them. An
 * uncompilable `pattern` makes the browser skip validation for the whole field,
 * so a required/min check would silently stop applying too.
 *
 * @return {string|undefined} The pattern, or undefined when it cannot compile.
 */
export declare const getValidPricePattern: () => string | undefined;
/**
 * Format a numeric amount for a price input (no grouping).
 *
 * Only ever emits "." or "," — the separators {@link parseLocaleFloat} and the
 * input pattern understand. A comma locale gets ",", everything else gets ".",
 * so non-Latin marks like "٫" (fa, ar-EG) can't be shown and then fail to parse.
 *
 * @param {number} value  The amount in display units.
 * @param {string} [locale] BCP 47 locale tag. Omit to use the runtime default.
 * @return {string} The formatted number, or "" when the value is NaN.
 */
export declare const formatLocaleNumber: (value: number, locale?: string) => string;
