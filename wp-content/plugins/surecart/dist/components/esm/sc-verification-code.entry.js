import { r as registerInstance, h, F as Fragment, a as getElement } from './index-25e5af33.js';

const scVerificationCodeCss = "sc-verification-code{--focus-ring:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary);display:block}sc-verification-code .sc-verification-code{display:flex;align-items:center;gap:var(--sc-spacing-small);margin-top:var(--sc-spacing-medium);margin-bottom:var(--sc-spacing-medium)}sc-verification-code .sc-verification-code input{flex:1;min-width:0;height:var(--sc-input-height, 48px);max-width:64px;box-sizing:border-box;font-family:var(--sc-input-font-family);font-weight:var(--sc-input-font-weight);letter-spacing:var(--sc-input-letter-spacing);background-color:var(--sc-input-background-color);border:1px solid var(--sc-input-border-color, var(--sc-input-border));border-radius:var(--sc-input-border-radius-medium);box-shadow:var(--sc-input-box-shadow);font-size:var(--sc-input-font-size-large);transition:var(--sc-input-transition, var(--sc-transition-medium)) color, var(--sc-input-transition, var(--sc-transition-medium)) border, var(--sc-input-transition, var(--sc-transition-medium)) box-shadow;cursor:text;text-align:center}sc-verification-code .sc-verification-code input:-webkit-autofill,sc-verification-code .sc-verification-code input:-webkit-autofill:hover,sc-verification-code .sc-verification-code input:-webkit-autofill:focus,sc-verification-code .sc-verification-code input:-webkit-autofill:active{box-shadow:0 0 0 var(--sc-input-height-large) var(--sc-input-background-color-hover) inset !important;-webkit-text-fill-color:var(--sc-input-color)}sc-verification-code .sc-verification-code input::placeholder{color:var(--sc-input-placeholder-color);user-select:none}sc-verification-code .sc-verification-code input:focus{outline:none;background-color:var(--sc-input-background-color-focus);border-color:var(--sc-input-border-color-focus);box-shadow:var(--focus-ring);color:var(--sc-input-color-focus);z-index:8}sc-verification-code .sc-verification-code .sc-verification-code__separator{color:var(--sc-input-help-text-color);font-size:var(--sc-font-size-large);user-select:none;display:flex;align-items:center}sc-verification-code .sc-verification-code .visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}";
const ScVerificationCodeStyle0 = scVerificationCodeCss;

const ScVerificationCode = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.filledAllInputs = () => {
            return this.codes.join('').trim().length === this.total;
        };
        this.total = 6;
        this.codes = Array(this.total).fill('');
        this.loading = false;
        this.onChange = undefined;
    }
    handleKeyDown(e, index) {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            e.preventDefault();
            this.getElementByIndex(index).value = '';
            this.codes = [...this.codes.slice(0, index), '', ...this.codes.slice(index + 1)];
            if (index > 0) {
                this.focusInput(index - 1);
            }
        }
    }
    handleInput(e, index) {
        const target = e.target;
        let value = target.value;
        // If value is greater than 1, then put all of the characters to the input one by one (e.g. paste).
        if (value.length > 1) {
            const newCodes = [...this.codes];
            for (let i = 0; i < this.total - index && i < value.length; i++) {
                const input = this.getElementByIndex(index + i);
                // No need to work with focus, we'll add that manually later.
                input.blur();
                input.value = value[i];
                newCodes[index + i] = value[i];
            }
            this.codes = newCodes;
            // Update the index to the last character to be able to continue typing.
            index = index + value.length - 1;
            // Finally update the value to the last character.
            value = value[value.length - 1];
        }
        if (index < this.codes.length) {
            this.codes = [...this.codes.slice(0, index), value, ...this.codes.slice(index + 1)];
        }
        if (index < this.codes.length - 1 && value.length > 0) {
            this.focusInput(index + 1);
        }
        // If it's the last input, unfocus it.
        if (index === this.codes.length - 1 && value.length > 0) {
            this.getElementByIndex(index).blur();
        }
        // Submit the code when all inputs are filled.
        if (this.filledAllInputs()) {
            this.handleCodeChange();
        }
    }
    handleCodeChange() {
        const verificationCode = (this.codes.join('') || '').trim();
        if (verificationCode.length === this.total) {
            this.onChange(verificationCode);
        }
    }
    focusInput(index) {
        const input = this.getElementByIndex(index);
        if (input) {
            input.focus();
            input.select();
        }
    }
    /** Focus the first code input. */
    async triggerFocus() {
        this.focusInput(0);
    }
    getElementByIndex(index) {
        return this.el.querySelector(`#code-input-${index}`);
    }
    handleFocus(e) {
        const target = e.target;
        target.select();
    }
    reset() {
        var _a;
        this.codes = Array(this.total).fill('');
        (_a = this.getElementByIndex(0)) === null || _a === void 0 ? void 0 : _a.focus();
    }
    render() {
        return (h("div", { key: 'ca2eab0d957c63920020252f3780885e2ab610a7', class: "sc-verification-code" }, Array.from({ length: this.total }).map((_, index) => (h(Fragment, null, index === Math.floor(this.total / 2) && (h("span", { class: "sc-verification-code__separator", "aria-hidden": "true" }, "\u2014")), h("input", { key: index, id: `code-input-${index}`, value: !!this.codes[index] ? this.codes[index] : '', onInput: e => this.handleInput(e, index), onKeyDown: e => this.handleKeyDown(e, index), onFocus: e => this.handleFocus(e), autocomplete: "one-time-code", inputmode: "numeric", pattern: "[0-9]*", autofocus: index === 0, required: true, "aria-label": wp.i18n.__(`Verification code ${index + 1} of ${this.total}`, 'surecart') })))), h("button", { key: '0b5284fc3c39e92fb26e33e0c643df87fb79bc63', type: "submit", class: "visually-hidden", onClick: () => this.onChange(this.codes.join('')) }, wp.i18n.__('Submit', 'surecart'))));
    }
    get el() { return getElement(this); }
};
ScVerificationCode.style = ScVerificationCodeStyle0;

export { ScVerificationCode as sc_verification_code };

//# sourceMappingURL=sc-verification-code.entry.js.map