'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const pageAlign = require('./page-align-5a2ab493.js');
const library = require('./library-08bc52a5.js');
const index$1 = require('./index-f3933112.js');
const index$2 = require('./index-fb76df07.js');

const scButtonCss = ":host{display:inline-block;width:auto;cursor:pointer;--primary-color:var(--sc-color-primary-text);--primary-background:var(--sc-color-primary-500)}:host([full]){display:block}::slotted(*){pointer-events:none}.button{box-sizing:border-box;z-index:10;display:inline-flex;align-items:stretch;justify-content:center;width:100%;border-style:solid;border-width:var(--sc-input-border-width);font-family:var(--sc-input-font-family);font-weight:var(--sc-font-weight-semibold);text-decoration:none;user-select:none;white-space:nowrap;vertical-align:middle;padding:0;transition:var(--sc-input-transition, var(--sc-transition-medium)) background-color, var(--sc-input-transition, var(--sc-transition-medium)) color, var(--sc-input-transition, var(--sc-transition-medium)) border, var(--sc-input-transition, var(--sc-transition-medium)) box-shadow, var(--sc-input-transition, var(--sc-transition-medium)) opacity;cursor:inherit}.button::-moz-focus-inner{border:0}.button:focus{outline:none}.button:focus-visible{box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary)}.button.button--disabled{cursor:not-allowed}.button.button--disabled *{pointer-events:none}.button.button--disabled .button__label,.button.button--disabled .button__suffix,.button.button--disabled .button__prefix{opacity:0.5}.button ::slotted(.sc--icon){pointer-events:none}.button__prefix,.button__suffix{flex:0 0 auto;display:flex;align-items:center}.button__label{display:flex;align-items:center}.button__label ::slotted(sc-icon){vertical-align:-2px}.button:not(.button--text):not(.button--link){box-shadow:var(--sc-shadow-small)}.button.button--standard.button--default{background-color:var(--sc-button-default-background-color, var(--sc-color-white));border-color:var(--sc-button-default-border-color, var(--sc-color-gray-300));color:var(--sc-button-default-color, var(--sc-color-gray-600))}.button.button--standard.button--default:hover:not(.button--disabled){background-color:var(--sc-button-default-hover-background-color, var(--sc-color-white));border-color:var(--sc-button-default-focus-border-color, var(--primary-background));color:var(--primary-background)}.button.button--standard.button--default:focus:not(.button--disabled){background-color:var(--sc-button-default-focus-background-color, var(--sc-color-white));border-color:var(--sc-button-default-focus-border-color, var(--sc-color-white));color:var(--primary-background);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary)}.button.button--standard.button--default:active:not(.button--disabled){background-color:var(--sc-button-default-active-background-color, var(--sc-color-white));border-color:var(--sc-button-default-active-border-color, var(--sc-color-white));color:var(--primary-background)}.button.button--standard.button--primary{background-color:var(--primary-background);border-color:var(--primary-background);color:var(--primary-color)}.button.button--standard.button--primary:hover:not(.button--disabled){opacity:0.8}.button.button--standard.button--primary:focus:not(.button--disabled){opacity:0.8;color:var(--primary-color);border-color:var(--sc-color-white);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary)}.button.button--standard.button--primary:active:not(.button--disabled){background-color:var(--primary-background);border-color:var(--sc-color-white);color:var(--primary-color)}.button.button--standard.button--success{background-color:var(--sc-color-success-500);border-color:var(--sc-color-success-500);color:var(--sc-color-success-text)}.button.button--standard.button--success:hover:not(.button--disabled){background-color:var(--sc-color-success-400);border-color:var(--sc-color-success-400);color:var(--sc-color-success-text)}.button.button--standard.button--success:focus:not(.button--disabled){background-color:var(--sc-color-success-400);border-color:var(--sc-color-success-400);color:var(--sc-color-success-text);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-success)}.button.button--standard.button--success:active:not(.button--disabled){background-color:var(--sc-color-success-500);border-color:var(--sc-color-success-500);color:var(--sc-color-success-text)}.button.button--standard.button--info{background-color:var(--sc-color-info-500);border-color:var(--sc-color-info-500);color:var(--sc-color-info-text)}.button.button--standard.button--info:hover:not(.button--disabled){background-color:var(--sc-color-info-400);border-color:var(--sc-color-info-400);color:var(--sc-color-info-text)}.button.button--standard.button--info:focus:not(.button--disabled){background-color:var(--sc-color-info-400);border-color:var(--sc-color-info-400);color:var(--sc-color-info-text);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-info)}.button.button--standard.button--info:active:not(.button--disabled){background-color:var(--sc-color-info-500);border-color:var(--sc-color-info-500);color:var(--sc-color-info-text)}.button.button--standard.button--warning{background-color:var(--sc-color-warning-500);border-color:var(--sc-color-warning-500);color:var(--sc-color-warning-text)}.button.button--standard.button--warning:hover:not(.button--disabled){background-color:var(--sc-color-warning-400);border-color:var(--sc-color-warning-400);color:var(--sc-color-warning-text)}.button.button--standard.button--warning:focus:not(.button--disabled){background-color:var(--sc-color-warning-400);border-color:var(--sc-color-warning-400);color:var(--sc-color-warning-text);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-warning)}.button.button--standard.button--warning:active:not(.button--disabled){background-color:var(--sc-color-warning-500);border-color:var(--sc-color-warning-500);color:var(--sc-color-warning-text)}.button.button--standard.button--danger{background-color:var(--sc-color-danger-500);border-color:var(--sc-color-danger-500);color:var(--sc-color-danger-text)}.button.button--standard.button--danger:hover:not(.button--disabled){background-color:var(--sc-color-danger-400);border-color:var(--sc-color-danger-400);color:var(--sc-color-danger-text)}.button.button--standard.button--danger:focus:not(.button--disabled){background-color:var(--sc-color-danger-400);border-color:var(--sc-color-danger-400);color:var(--sc-color-danger-text);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-danger)}.button.button--standard.button--danger:active:not(.button--disabled){background-color:var(--sc-color-danger-500);border-color:var(--sc-color-danger-500);color:var(--sc-color-danger-text)}.button--outline{background:none;border:solid 1px}.button--outline.button--default{border-color:var(--sc-color-gray-300);color:var(--sc-color-gray-700)}.button--outline.button--default:hover:not(.button--disabled){border-color:var(--primary-background);background-color:var(--primary-background);color:var(--sc-color-white)}.button--outline.button--default:focus:not(.button--disabled){border-color:var(--primary-background);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--primary-background)/var(--sc-focus-ring-alpha)}.button--outline.button--default:active:not(.button--disabled){opacity:0.8;color:var(--sc-color-white)}.button--outline.button--primary{border-color:var(--primary-background);color:var(--primary-background)}.button--outline.button--primary:hover:not(.button--disabled){background-color:var(--primary-background);opacity:0.8;color:var(--sc-color-white)}.button--outline.button--primary:focus:not(.button--disabled){border-color:var(--primary-background);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--primary-background)/var(--sc-focus-ring-alpha)}.button--outline.button--primary:active:not(.button--disabled){border-color:var(--primary-background);background-color:var(--primary-background);opacity:0.9;color:var(--sc-color-white)}.button--outline.button--success{border-color:var(--sc-color-success-500);color:var(--sc-color-success-500)}.button--outline.button--success:hover:not(.button--disabled){background-color:var(--sc-color-success-500);color:var(--sc-color-white)}.button--outline.button--success:focus:not(.button--disabled){border-color:var(--sc-color-success-500);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-color-success-500)/var(--sc-focus-ring-alpha)}.button--outline.button--success:active:not(.button--disabled){border-color:var(--sc-color-success-700);background-color:var(--sc-color-success-700);color:var(--sc-color-white)}.button--outline.button--info{border-color:var(--sc-color-gray-500);color:var(--sc-color-gray-500)}.button--outline.button--info:hover:not(.button--disabled){background-color:var(--sc-color-gray-500);color:var(--sc-color-white)}.button--outline.button--info:focus:not(.button--disabled){border-color:var(--sc-color-gray-500);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-color-gray-500)/var(--sc-focus-ring-alpha)}.button--outline.button--info:active:not(.button--disabled){border-color:var(--sc-color-gray-700);background-color:var(--sc-color-gray-700);color:var(--sc-color-white)}.button--outline.button--warning{border-color:var(--sc-color-warning-500);color:var(--sc-color-warning-500)}.button--outline.button--warning:hover:not(.button--disabled){background-color:var(--sc-color-warning-500);color:var(--sc-color-white)}.button--outline.button--warning:focus:not(.button--disabled){border-color:var(--sc-color-warning-500);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-color-warning-500)/var(--sc-focus-ring-alpha)}.button--outline.button--warning:active:not(.button--disabled){border-color:var(--sc-color-warning-700);background-color:var(--sc-color-warning-700);color:var(--sc-color-white)}.button--outline.button--danger{border-color:var(--sc-color-danger-500);color:var(--sc-color-danger-500)}.button--outline.button--danger:hover:not(.button--disabled){background-color:var(--sc-color-danger-500);color:var(--sc-color-white)}.button--outline.button--danger:focus:not(.button--disabled){border-color:var(--sc-color-danger-500);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-color-danger-500)/var(--sc-focus-ring-alpha)}.button--outline.button--danger:active:not(.button--disabled){border-color:var(--sc-color-danger-700);background-color:var(--sc-color-danger-700);color:var(--sc-color-white)}.button--text{background-color:transparent;border-color:transparent;color:inherit}.button--text:hover:not(.button--disabled){background-color:transparent;border-color:transparent;color:var(--sc-color-gray-600)}.button--text:focus:not(.button--disabled){background-color:transparent;border-color:transparent;box-shadow:0}.button--text:active:not(.button--disabled){background-color:transparent;border-color:transparent;box-shadow:0}.button--text.button--caret.button--has-label{padding-right:var(--sc-spacing-xx-small)}.button--text.button--caret.button--has-label .button__label{padding:0 var(--sc-spacing-xx-small) !important}.button--link{background-color:transparent;border-color:transparent;box-shadow:none;color:var(--sc-button-link-color, var(--primary-background));transition:opacity var(--sc-input-transition, var(--sc-transition-medium)) ease;text-decoration:var(--sc-button-link-text-decoration, none)}.button--link.button--has-label.button--small .button__label,.button--link.button--has-label.button--medium .button__label,.button--link.button--has-label.button--large .button__label{padding:0}.button--link:hover:not(.button--disabled){background-color:transparent;border-color:transparent;opacity:0.75}.button--link:focus:not(.button--disabled){background-color:transparent;border-color:transparent}.button--link:active:not(.button--disabled){background-color:transparent;border-color:transparent}.button--link.button--has-prefix:not(.button--text).button--small,.button--link.button--has-prefix:not(.button--text).button--medium,.button--link.button--has-prefix:not(.button--text).button--large{padding-left:0}.button--link.button--has-prefix:not(.button--text).button--small .button__label,.button--link.button--has-prefix:not(.button--text).button--medium .button__label,.button--link.button--has-prefix:not(.button--text).button--large .button__label{padding-left:var(--sc-spacing-xx-small)}.button--link.button--has-suffix:not(.button--text).button--small,.button--link.button--has-suffix:not(.button--text).button--medium,.button--link.button--has-suffix:not(.button--text).button--large{padding-right:0}.button--link.button--has-suffix:not(.button--text).button--small .button__label,.button--link.button--has-suffix:not(.button--text).button--medium .button__label,.button--link.button--has-suffix:not(.button--text).button--large .button__label{padding-right:var(--sc-spacing-xx-small)}.button--small{font-size:var(--sc-button-font-size-small);height:var(--sc-input-height-small);line-height:calc(var(--sc-input-height-small) - var(--sc-input-border-width) * 2);border-radius:var(--button-border-radius, var(--sc-input-border-radius-small))}.button--medium{font-size:var(--sc-button-font-size-medium);height:var(--sc-input-height-medium);line-height:calc(var(--sc-input-height-medium) - var(--sc-input-border-width) * 2);border-radius:var(--button-border-radius, var(--sc-input-border-radius-medium))}.button--large{font-size:var(--sc-button-font-size-large);height:var(--sc-input-height-large);line-height:calc(var(--sc-input-height-large) - var(--sc-input-border-width) * 2);border-radius:var(--button-border-radius, var(--sc-input-border-radius-large))}.button--full{display:block}.button--pill.button--small{border-radius:var(--sc-input-height-small)}.button--pill.button--medium{border-radius:var(--sc-input-height-medium)}.button--pill.button--large{border-radius:var(--sc-input-height-large)}.button--circle{padding-left:0;padding-right:0}.button--circle.button--small{width:var(--sc-input-height-small);border-radius:50%}.button--circle.button--medium{width:var(--sc-input-height-medium);border-radius:50%}.button--circle.button--large{width:var(--sc-input-height-large);border-radius:50%}.button--circle .button__prefix,.button--circle .button__suffix,.button--circle .button__caret{display:none}.button--caret .button__suffix{display:none}.button--caret .button__caret{display:flex;align-items:center}.button--caret .button__caret svg{width:1em;height:1em}.button--busy{position:relative;cursor:wait}.button--busy .button__prefix,.button--busy .button__label,.button--busy .button__suffix,.button--busy .button__caret{visibility:hidden}.button--busy *{pointer-events:none}.button--loading{position:relative;cursor:wait}.button--loading .button__prefix,.button--loading .button__label,.button--loading .button__suffix,.button--loading .button__caret{visibility:hidden}sc-spinner::part(base){--indicator-color:currentColor;--spinner-size:12px;position:absolute;top:calc(50% - var(--spinner-size) + var(--spinner-size) / 4);left:calc(50% - var(--spinner-size) + var(--spinner-size) / 4)}.button ::slotted(sc-badge){position:absolute;top:0;right:0;transform:translateY(-50%) translateX(50%);pointer-events:none}.button--has-label.button--small .button__label{padding:0 var(--sc-spacing-small)}.button--has-label.button--medium .button__label{padding:0 var(--sc-spacing-medium)}.button--has-label.button--large .button__label{padding:0 var(--sc-spacing-large)}.button--has-prefix:not(.button--text).button--small{padding-left:var(--sc-spacing-x-small)}.button--has-prefix:not(.button--text).button--small .button__label{padding-left:var(--sc-spacing-x-small)}.button--has-prefix:not(.button--text).button--medium{padding-left:var(--sc-spacing-small)}.button--has-prefix:not(.button--text).button--medium .button__label{padding-left:var(--sc-spacing-small)}.button--has-prefix:not(.button--text).button--large{padding-left:var(--sc-spacing-small)}.button--has-prefix:not(.button--text).button--large .button__label{padding-left:var(--sc-spacing-small)}.button--has-suffix.button--small,.button--caret.button--small{padding-right:var(--sc-spacing-x-small)}.button--has-suffix.button--small .button__label,.button--caret.button--small .button__label{padding-right:var(--sc-spacing-x-small)}.button--has-suffix.button--medium,.button--caret.button--medium{padding-right:var(--sc-spacing-small)}.button--has-suffix.button--medium .button__label,.button--caret.button--medium .button__label{padding-right:var(--sc-spacing-small)}.button--has-suffix.button--large,.button--caret.button--large{padding-right:var(--sc-spacing-small)}.button--has-suffix.button--large .button__label,.button--caret.button--large .button__label{padding-right:var(--sc-spacing-small)}:host(.sc-button-group__button--first) .button{border-top-right-radius:0;border-bottom-right-radius:0}:host(.sc-button-group__button--inner) .button{border-radius:0}:host(.sc-button-group__button--last) .button{border-top-left-radius:0;border-bottom-left-radius:0}:host(.sc-button-group__button:not(.sc-button-group__button--first)){margin-left:calc(-1 * var(--sc-input-border-width))}:host(.sc-button-group__button:not(.sc-button-group__button--focus,.sc-button-group__button--first,[type=default]):not(:hover,:active,:focus)) .button:after{content:\"\";position:absolute;top:0;left:0;bottom:0;border-left:solid 1px rgba(255, 255, 255, 0.2666666667);mix-blend-mode:lighten}:host(.sc-button-group__button--hover){z-index:1}:host(.sc-button-group__button--focus){z-index:2}@keyframes busy-animation{0%{background-position:200px 0}}.button--is-rtl.button--has-prefix.button--small,.button--is-rtl.button--has-prefix.button--medium,.button--is-rtl.button--has-prefix.button--large{padding-left:0}.button--is-rtl.button--has-prefix.button--small .button__label,.button--is-rtl.button--has-prefix.button--medium .button__label,.button--is-rtl.button--has-prefix.button--large .button__label{padding-left:0;padding-right:var(--sc-spacing-xx-small)}.button--is-rtl.button--has-suffix.button--small,.button--is-rtl.button--has-suffix.button--medium,.button--is-rtl.button--has-suffix.button--large{padding-right:0}.button--is-rtl.button--has-suffix.button--small .button__label,.button--is-rtl.button--has-suffix.button--medium .button__label,.button--is-rtl.button--has-suffix.button--large .button__label{padding-right:0;padding-left:var(--sc-spacing-xx-small)}";
const ScButtonStyle0 = scButtonCss;

const ScButton = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scBlur = index.createEvent(this, "scBlur", 7);
        this.scFocus = index.createEvent(this, "scFocus", 7);
        this.hasFocus = false;
        this.hasLabel = false;
        this.hasPrefix = false;
        this.hasSuffix = false;
        this.type = 'default';
        this.size = 'medium';
        this.caret = false;
        this.full = false;
        this.disabled = false;
        this.loading = false;
        this.outline = false;
        this.busy = false;
        this.pill = false;
        this.circle = false;
        this.submit = false;
        this.name = undefined;
        this.value = undefined;
        this.href = undefined;
        this.target = undefined;
        this.download = undefined;
        this.autofocus = undefined;
    }
    componentWillLoad() {
        this.handleSlotChange();
    }
    /** Simulates a click on the button. */
    click() {
        this.button.click();
    }
    /** Sets focus on the button. */
    focus(options) {
        this.button.focus(options);
    }
    /** Removes focus from the button. */
    blur() {
        this.button.blur();
    }
    handleSlotChange() {
        this.hasLabel = !!this.button.children;
        this.hasPrefix = !!this.button.querySelector('[slot="prefix"]');
        this.hasSuffix = !!this.button.querySelector('[slot="suffix"]');
    }
    handleBlur() {
        this.hasFocus = false;
        this.scBlur.emit();
    }
    handleFocus() {
        this.hasFocus = true;
        this.scFocus.emit();
    }
    handleClick(event) {
        if (this.disabled || this.loading || this.busy) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (this.submit) {
            this.submitForm();
        }
    }
    submitForm() {
        var _a, _b;
        const form = ((_b = (_a = this.button.closest('sc-form')) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('form')) || this.button.closest('form');
        // Calling form.submit() seems to bypass the submit event and constraint validation. Instead, we can inject a
        // native submit button into the form, click it, then remove it to simulate a standard form submission.
        const button = document.createElement('button');
        if (form) {
            button.type = 'submit';
            button.style.position = 'absolute';
            button.style.width = '0';
            button.style.height = '0';
            button.style.clip = 'rect(0 0 0 0)';
            button.style.clipPath = 'inset(50%)';
            button.style.overflow = 'hidden';
            button.style.whiteSpace = 'nowrap';
            form.append(button);
            button.click();
            button.remove();
        }
    }
    render() {
        const Tag = this.href ? 'a' : 'button';
        const interior = (index.h(index.Fragment, { key: '5b762ef47b6b3bbf29d1f984b844aad90beeac42' }, index.h("span", { key: '0cb7ae4799035b09b8a99442c15c4916ab35ec7f', part: "prefix", class: "button__prefix" }, index.h("slot", { key: '0bce29b8cc0e080d12fa220f6ad0dc013f48ef84', onSlotchange: () => this.handleSlotChange(), name: "prefix" })), index.h("span", { key: '6a0e818e77794c4d932de2fbcbead450b365e564', part: "label", class: "button__label" }, index.h("slot", { key: '4db77e4ed55d5319adc55bf42b8f16e726a17891', onSlotchange: () => this.handleSlotChange() })), index.h("span", { key: 'add9890593144a987e3842b10f8396da92dcea39', part: "suffix", class: "button__suffix" }, index.h("slot", { key: '71d7cdd464ab23c14098a060c54ad9a28dc381fe', onSlotchange: () => this.handleSlotChange(), name: "suffix" })), this.caret ? (index.h("span", { part: "caret", class: "button__caret" }, index.h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("polyline", { points: "6 9 12 15 18 9" })))) : (''), this.loading || this.busy ? index.h("sc-spinner", { exportparts: "base:spinner" }) : ''));
        return (index.h(Tag, { key: '70828cdee0eadef6b684e4737269becd8a37428f', part: "base", class: {
                'button': true,
                [`button--${this.type}`]: !!this.type,
                [`button--${this.size}`]: true,
                'button--caret': this.caret,
                'button--circle': this.circle,
                'button--disabled': this.disabled,
                'button--focused': this.hasFocus,
                'button--loading': this.loading,
                'button--busy': this.busy,
                'button--pill': this.pill,
                'button--standard': !this.outline,
                'button--outline': this.outline,
                'button--has-label': this.hasLabel,
                'button--has-prefix': this.hasPrefix,
                'button--has-suffix': this.hasSuffix,
                'button--is-rtl': pageAlign.isRtl(),
            }, href: this.href, target: this.target, download: this.download, autoFocus: this.autofocus, rel: this.target ? 'noreferrer noopener' : undefined, role: "button", "aria-disabled": this.disabled ? 'true' : 'false', "aria-busy": this.busy || this.loading ? 'true' : 'false', tabindex: this.disabled ? '-1' : '0', disabled: this.disabled || this.busy, type: this.submit ? 'submit' : 'button', name: this.name, value: this.value, onBlur: () => this.handleBlur(), onFocus: () => this.handleFocus(), onClick: e => this.handleClick(e) }, interior));
    }
    get button() { return index.getElement(this); }
};
ScButton.style = ScButtonStyle0;

const iconFiles = new Map();
const requestIcon = (url) => {
    if (iconFiles.has(url)) {
        return iconFiles.get(url);
    }
    else {
        const request = fetch(url).then(async (response) => {
            if (response.ok) {
                const div = document.createElement('div');
                div.innerHTML = await response.text();
                const svg = div.firstElementChild;
                return {
                    ok: response.ok,
                    status: response.status,
                    svg: svg && svg.tagName.toLowerCase() === 'svg' ? svg.outerHTML : '',
                };
            }
            else {
                return {
                    ok: response.ok,
                    status: response.status,
                    svg: null,
                };
            }
        });
        iconFiles.set(url, request);
        return request;
    }
};

const scIconCss = ":host{--width:1em;--height:1em;display:inline-block;width:var(--width);height:var(--height);contain:strict;box-sizing:content-box !important}.icon,svg{display:block;height:100%;width:100%;stroke-width:var(--sc-icon-stroke-width, 2px)}";
const ScIconStyle0 = scIconCss;

/**
 * The icon's label used for accessibility.
 */
const LABEL_MAPPINGS = {
    'chevron-down': wp.i18n.__('Open', 'surecart'),
    'chevron-up': wp.i18n.__('Close', 'surecart'),
    'chevron-right': wp.i18n.__('Next', 'surecart'),
    'chevron-left': wp.i18n.__('Previous', 'surecart'),
    'arrow-right': wp.i18n.__('Next', 'surecart'),
    'arrow-left': wp.i18n.__('Previous', 'surecart'),
    'arrow-down': wp.i18n.__('Down', 'surecart'),
    'arrow-up': wp.i18n.__('Up', 'surecart'),
    'alert-circle': wp.i18n.__('Alert', 'surecart'),
};
const parser = new DOMParser();
const ScIcon = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scLoad = index.createEvent(this, "scLoad", 7);
        this.svg = '';
        this.name = undefined;
        this.src = undefined;
        this.label = undefined;
        this.library = 'default';
        this.mutate = true;
    }
    /** @internal Fetches the icon and redraws it. Used to handle library registrations. */
    redraw() {
        this.setIcon();
    }
    componentWillLoad() {
        // Get redrawn if our library is registered after we mount.
        library.watchIcon(this);
        this.setIcon();
    }
    disconnectedCallback() {
        library.unwatchIcon(this);
    }
    getLabel() {
        let label = '';
        if (this.label) {
            label = (LABEL_MAPPINGS === null || LABEL_MAPPINGS === void 0 ? void 0 : LABEL_MAPPINGS[this.label]) || this.label;
        }
        else if (this.name) {
            label = ((LABEL_MAPPINGS === null || LABEL_MAPPINGS === void 0 ? void 0 : LABEL_MAPPINGS[this.name]) || this.name).replace(/-/g, ' ');
        }
        else if (this.src) {
            label = this.src.replace(/.*\//, '').replace(/-/g, ' ').replace(/\.svg/i, '');
        }
        return label;
    }
    async setIcon() {
        const library$1 = library.getIconLibrary(this.library);
        const url = this.getUrl();
        if (url) {
            try {
                const file = await requestIcon(url);
                if (url !== this.getUrl()) {
                    // If the url has changed while fetching the icon, ignore this request
                    return;
                }
                else if (file.ok) {
                    const doc = parser.parseFromString(file.svg, 'text/html');
                    const svgEl = doc.body.querySelector('svg');
                    if (svgEl) {
                        if (library$1 && library$1.mutator && this.mutate) {
                            library$1.mutator(svgEl);
                        }
                        this.svg = svgEl.outerHTML;
                        // add part attribute to the svg element.
                        this.svg = this.svg.replace('<svg', '<svg part="svg" ');
                        this.scLoad.emit();
                    }
                    else {
                        this.svg = '';
                        console.error({ status: file === null || file === void 0 ? void 0 : file.status });
                    }
                }
                else {
                    this.svg = '';
                    console.error({ status: file === null || file === void 0 ? void 0 : file.status });
                }
            }
            catch {
                console.error({ status: -1 });
            }
        }
        else if (this.svg) {
            // If we can't resolve a URL and an icon was previously set, remove it
            this.svg = '';
        }
    }
    getUrl() {
        const library$1 = library.getIconLibrary(this.library);
        if (this.name && library$1) {
            return library$1.resolver(this.name);
        }
        else {
            return this.src;
        }
    }
    render() {
        return index.h("div", { key: 'a06a0dce3ba7bc5d10cd0eac3c045fbcfd571727', part: "base", class: "icon", role: "img", "aria-label": this.getLabel(), innerHTML: this.svg });
    }
    static get assetsDirs() { return ["icon-assets"]; }
    static get watchers() { return {
        "name": ["setIcon"],
        "src": ["setIcon"],
        "library": ["setIcon"]
    }; }
};
ScIcon.style = ScIconStyle0;

const scProductLineItemCss = ":host {\n  display: block;\n  font-family: var(--sc-font-sans);\n  overflow-wrap: anywhere;\n}\n\n.item {\n  box-sizing: border-box;\n  margin: 0px;\n  min-width: 0px;\n  display: flex;\n  gap: var(--sc-spacing-large);\n  justify-content: space-between;\n  align-items: stretch;\n  width: 100%;\n  border-bottom: none;\n  container-type: inline-size;\n}\n.item__text-container {\n  box-sizing: border-box;\n  margin: 0px;\n  min-width: 0px;\n  display: flex;\n  flex-direction: column;\n  gap: var(--sc-product-line-item-line-gap, 6px);\n  justify-content: space-between;\n  align-items: stretch;\n  width: 100%;\n  border-bottom: none;\n}\n.item__row {\n  display: flex;\n  gap: 18px;\n  justify-content: space-between;\n  align-items: stretch;\n  width: 100%;\n}\n.item__row.stick-bottom {\n  margin-top: auto;\n}\n.item__scratch-price {\n  text-decoration: line-through;\n  font-size: var(--sc-font-size-small);\n  line-height: 1;\n  color: var(--sc-input-help-text-color);\n  white-space: nowrap;\n}\n.item__remove-container {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n  line-height: 1;\n  cursor: pointer;\n  color: var(--sc-input-help-text-color);\n  font-size: var(--sc-input-help-text-font-size-medium);\n}\n.item__add-review sc-button {\n  --sc-input-border-radius-small: var(--sc-input-border-radius-medium);\n}\n.item--has-review {\n  border-bottom: solid 1px var(--sc-input-border-color, var(--sc-input-border));\n  padding-top: var(--sc-spacing-small);\n  padding-bottom: var(--sc-spacing-large);\n}\n:host(:first-of-type) .item--has-review {\n  padding-top: 0;\n}\n\n.item__text {\n  box-sizing: border-box;\n  margin: 0px;\n  min-width: 0px;\n  display: flex;\n  gap: 6px;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: flex-start;\n  flex: 1 1 0%;\n}\n\n.item__text-details {\n  display: grid;\n  gap: var(--sc-product-line-item-line-gap, 6px);\n}\n\n.item__title {\n  box-sizing: border-box;\n  min-width: 0px;\n  margin: 0;\n  color: var(--sc-line-item-title-color, var(--sc-input-label-color));\n  font-size: var(--sc-font-size-medium);\n  font-weight: var(--sc-font-weight-semibold);\n  line-height: 1;\n  cursor: pointer;\n  display: -webkit-box;\n  display: -moz-box;\n  -webkit-box-orient: vertical;\n  -moz-box-orient: vertical;\n  -webkit-line-clamp: 3;\n  -moz-box-lines: 3;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.item__suffix {\n  flex: 1;\n  box-sizing: border-box;\n  margin: 0px;\n  min-width: 0px;\n  display: flex;\n  flex-direction: column;\n  -webkit-box-pack: start;\n  justify-content: space-between;\n  align-items: flex-end;\n  min-width: 100px;\n  margin-left: auto;\n  align-self: center;\n}\n\n.product-line-item__removable .item__suffix {\n  align-self: flex-start;\n}\n\n.product-line-item__editable .item__suffix {\n  align-self: flex-start;\n}\n\n.product-line-item__purchasable-status {\n  font-size: var(--sc-font-size-x-small);\n  color: var(--sc-input-error-text-color);\n}\n\n.item__price {\n  text-align: right;\n  max-width: 100%;\n  display: grid;\n  gap: var(--sc-product-line-item-line-gap, 6px);\n}\n\n.item__description {\n  color: var(--sc-price-label-color, var(--sc-input-help-text-color));\n  font-size: var(--sc-price-label-font-size, var(--sc-input-help-text-font-size-medium));\n  line-height: 1;\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: column;\n  gap: var(--sc-product-line-item-line-gap, 6px);\n  text-wrap: pretty;\n}\n.item__description:last-child {\n  align-items: flex-end;\n  text-align: right;\n}\n\n.item__image-placeholder {\n  width: var(--sc-product-line-item-image-size, 65px);\n  height: var(--sc-product-line-item-image-size, 65px);\n  background-color: var(--sc-input-border-color, var(--sc-input-border));\n  border-radius: 4px;\n  flex: 0 0 var(--sc-product-line-item-image-size, 65px);\n}\n\n.item__image,\n.attachment-thumbnail {\n  width: var(--sc-product-line-item-image-size, 65px);\n  height: var(--sc-product-line-item-image-size, 65px);\n  object-fit: cover;\n  border-radius: 4px;\n  border: solid 1px var(--sc-input-border-color, var(--sc-input-border));\n  display: block;\n  box-shadow: var(--sc-input-box-shadow);\n  align-self: flex-start;\n}\n\n@container (max-width: 380px) {\n  .item__image,\n  .item__image-placeholder {\n    display: var(--sc-product-line-item-mobile-image-display, none);\n  }\n}\n.product__description {\n  display: flex;\n  gap: 0.5em;\n  align-items: center;\n}\n\n.price {\n  font-size: var(--sc-font-size-medium);\n  font-weight: var(--sc-font-weight-semibold);\n  color: var(--sc-input-label-color);\n  line-height: 1;\n  white-space: nowrap;\n  display: flex;\n  gap: 4px;\n  align-items: baseline;\n}\n\n.price__description {\n  font-size: var(--sc-font-size-small);\n  line-height: 1;\n  color: var(--sc-input-help-text-color);\n  text-align: right;\n  white-space: nowrap;\n}\n\n.item--is-rtl.price {\n  text-align: right;\n}\n.item--is-rtl .item__price {\n  text-align: left;\n}\n\n.base {\n  display: grid;\n  gap: var(--sc-spacing-x-small);\n}\n\n.fee__description {\n  color: var(--sc-input-help-text-color);\n}\n\nsc-quantity-select::part(base) {\n  box-shadow: none;\n  background-color: transparent;\n}\n\nsc-quantity-select::part(base):not(:focus-within) {\n  border-color: transparent;\n}\n\nsc-quantity-select::part(input),\nsc-quantity-select::part(plus),\nsc-quantity-select::part(minus) {\n  background-color: transparent;\n}\n\n.line-item-details {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  align-self: flex-start;\n  gap: 0.25em;\n  margin-top: var(--sc-spacing-xx-small);\n  color: var(--sc-input-label-color);\n  font-size: var(--sc-font-size-small);\n  line-height: 1.4;\n  background: transparent;\n  outline: none;\n}\n.line-item-details:hover, .line-item-details:focus, .line-item-details:focus-visible {\n  background: transparent;\n}\n.line-item-details--clickable {\n  cursor: pointer;\n}\n.line-item-details__content {\n  flex: 0 1 auto;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.line-item-details:not(.line-item-details--is-expanded) .line-item-details__content {\n  max-height: calc(var(--sc-line-item-details-collapse-lines, 2) * 1.4em + (var(--sc-line-item-details-collapse-lines, 2) - 1) * 2px);\n  max-height: calc(var(--sc-line-item-details-collapse-lines, 2) * 1lh + (var(--sc-line-item-details-collapse-lines, 2) - 1) * 2px);\n  overflow: hidden;\n}\n.line-item-details--is-expanded .line-item-details__content {\n  max-height: none;\n  overflow: visible;\n}\n.line-item-details__row:empty {\n  display: none;\n}\n.line-item-details__qty {\n  margin-inline-end: 0.35em;\n}\n.line-item-details__variant {\n  margin-inline-start: 0.35em;\n  color: var(--sc-color-gray-500, var(--sc-input-help-text-color));\n}\n.line-item-details__note {\n  color: var(--sc-color-gray-500, var(--sc-input-help-text-color));\n  word-wrap: break-word;\n  white-space: normal;\n  max-width: 100%;\n}\n.line-item-details__toggle {\n  background: transparent;\n  border: 0;\n  padding: 0;\n  align-self: flex-start;\n  display: inline-flex;\n  align-items: center;\n  color: var(--sc-color-gray-500, var(--sc-input-help-text-color));\n  cursor: pointer;\n  border-radius: var(--sc-border-radius-small);\n  transition: color 0.2s ease;\n  appearance: none;\n  -webkit-appearance: none;\n  box-shadow: none;\n}\n.line-item-details__toggle:hover, .line-item-details__toggle:focus, .line-item-details__toggle:active {\n  background: transparent;\n  box-shadow: none;\n  color: var(--sc-color-gray-700, var(--sc-input-label-color));\n}\n.line-item-details__toggle:focus {\n  outline: none;\n}\n.line-item-details__toggle:focus-visible {\n  outline: 2px solid var(--sc-color-primary-500);\n  outline-offset: 2px;\n}\n.line-item-details__toggle-label {\n  font-size: 14px;\n  line-height: 20px;\n}\n.line-item-details__toggle-icon {\n  transition: transform 0.2s ease;\n  will-change: transform;\n}\n.line-item-details--is-expanded .line-item-details__toggle-icon {\n  transform: rotate(180deg);\n}\n\n.item__title-count {\n  margin-inline-start: 0.25em;\n}\n\n.visually-hidden {\n  position: absolute !important;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}";
const ScProductLineItemStyle0 = scProductLineItemCss;

/** Number of detail rows shown before the region collapses (matches the cart block default). */
const COLLAPSE_AFTER = 2;
const ScProductLineItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scUpdateQuantity = index.createEvent(this, "scUpdateQuantity", 3);
        this.scRemove = index.createEvent(this, "scRemove", 3);
        this.image = undefined;
        this.name = undefined;
        this.amount = undefined;
        this.scratch = undefined;
        this.displayAmount = undefined;
        this.scratchDisplayAmount = undefined;
        this.fees = undefined;
        this.price = undefined;
        this.variant = '';
        this.quantity = undefined;
        this.interval = undefined;
        this.trial = undefined;
        this.removable = undefined;
        this.editable = true;
        this.max = undefined;
        this.sku = '';
        this.purchasableStatus = undefined;
        this.note = undefined;
        this.reviewButtonLink = '';
        this.bundleComponents = [];
        this.showAllBundleItems = true;
        this.separator = '·';
        this.detailsExpanded = false;
    }
    toggleDetails() {
        this.detailsExpanded = !this.detailsExpanded;
    }
    /**
     * Bundle items render in a single collapsible region. Collapsed, only the
     * first `COLLAPSE_AFTER` rows show; bundle components render one row each, so
     * the hidden count is exact ("+N more").
     */
    renderDetails() {
        const sep = (this.separator || '·').trim() || '·';
        const rows = index$1.getBundleComponentRowsFromLineItems(this.bundleComponents, this.quantity, this.showAllBundleItems, sep);
        if (!rows.length)
            return null;
        const bundleHidden = rows.length > COLLAPSE_AFTER ? rows.length - COLLAPSE_AFTER : 0;
        // Row count is authoritative for bundles (avoids a wrapped row falsely
        // triggering a toggle).
        const collapsible = this.detailsExpanded || bundleHidden > 0;
        const toggleLabel = this.detailsExpanded
            ? wp.i18n.__('Show less', 'surecart')
            : bundleHidden > 0
                ? wp.i18n.sprintf(/* translators: %d: number of hidden bundle items */ wp.i18n.__('+%d more', 'surecart'), bundleHidden)
                : wp.i18n.__('Show more', 'surecart');
        return (index.h("div", { class: {
                'line-item-details': true,
                'line-item-details--clickable': collapsible,
                'line-item-details--is-expanded': this.detailsExpanded,
            }, part: "details", onClick: () => collapsible && this.toggleDetails() }, index.h("div", { class: "line-item-details__content" }, rows.map(row => (index.h("div", { class: "line-item-details__row", part: "details__component", key: row.id }, row.qty > 1 && index.h("span", { class: "line-item-details__qty" }, row.qty, " \u00D7"), index.h("span", { class: "line-item-details__name" }, row.name), !!row.variants && (index.h("span", { class: "line-item-details__variant", part: "details__variant" }, sep, " ", row.variants)))))), collapsible && (index.h("button", { class: "line-item-details__toggle", type: "button", part: "details__toggle", "aria-expanded": this.detailsExpanded ? 'true' : 'false', onClick: e => {
                e.stopPropagation();
                this.toggleDetails();
            } }, index.h("span", { class: "line-item-details__toggle-label" }, toggleLabel), index.h("sc-icon", { class: "line-item-details__toggle-icon", name: "chevron-down", "aria-hidden": "true", style: { width: '16px', height: '16px' } })))));
    }
    render() {
        var _a, _b, _c, _d;
        const isImageFallback = ((_a = this.image) === null || _a === void 0 ? void 0 : _a.type) === 'fallback';
        // Number of products a bundle contains — shown as "(N)" next to the name.
        const bundleCount = ((_b = this.bundleComponents) === null || _b === void 0 ? void 0 : _b.length) || 0;
        const hasDescriptionDetails = !!this.variant || !!this.price || !!this.sku || !!this.purchasableStatus;
        const hasTrialFeesDetails = !!this.trial || (this.fees || []).some(fee => (fee === null || fee === void 0 ? void 0 : fee.display_amount) || (fee === null || fee === void 0 ? void 0 : fee.description));
        const hasMetaRow = hasDescriptionDetails || hasTrialFeesDetails;
        return (index.h("div", { key: 'a65243624d09fe862aef581d466acb55ef5efacf', class: "base", part: "base" }, index.h("div", { key: 'b39ebb59fd72c32e5abcbfc13dbeb714a512d310', part: "product-line-item", class: {
                'item': true,
                'item--has-image': !!((_c = this.image) === null || _c === void 0 ? void 0 : _c.src),
                'item--has-review': !!this.reviewButtonLink,
                'item--is-rtl': pageAlign.isRtl(),
                'product-line-item__editable': this.editable,
                'product-line-item__removable': this.removable,
            } }, !!((_d = this.image) === null || _d === void 0 ? void 0 : _d.src) ? (index.h("img", { ...this.image, part: isImageFallback ? 'placeholder__image' : 'image', class: isImageFallback ? 'item__image-placeholder' : 'item__image' })) : (index.h("div", { class: "item__image-placeholder", part: "placeholder__image" })), index.h("div", { key: 'c1a5b43cb13c7e22b210fb5c8e72e5705c18283b', class: "item__text-container" }, index.h("div", { key: '440283d3c69e3c00bc9e621ff4399deaaf138ce0', class: "item__row" }, index.h("div", { key: '4e20db7f1f0de0e2ad3ac83419e1e9992e81865c', class: "item__title", part: "title" }, index.h("slot", { key: '721f42c7974f00d69bcbf6ab352c5ebc4dbfda2a', name: "title" }, this.name), bundleCount > 0 && (index.h("span", { key: '2bf0aa90806baaf96a7e431d6c8cc89bfca115cb', class: "item__title-count", "aria-hidden": "true" }, "(", bundleCount, ")")), bundleCount > 0 && index.h("span", { key: 'a9fb018c35c59c84fc9d384ad55421c393cdcedf', class: "visually-hidden" }, wp.i18n.sprintf(wp.i18n._n('Includes %d item', 'Includes %d items', bundleCount, 'surecart'), bundleCount))), index.h("div", { key: 'fac8267658fa3d0f2404bac5dbe14a42a889bdde', class: "price", part: "price__amount" }, !!this.scratch && this.scratch !== this.amount && index.h("span", { key: '30fee66123ba2ffe78f046a35e01d511893e41f8', class: "item__scratch-price" }, this.scratch), this.amount, index.h("div", { key: '17866b2a1726e37a7702c07c6c70b421a840e2ba', class: "price__description", part: "price__description" }, this.interval))), hasMetaRow && (index.h("div", { key: '1a5a28ecb84b53cd146b1631cd774b2606617ec0', class: "item__row" }, index.h("div", { key: 'a45f43c4242ecad028573dd69f14e95c11459b49', class: "item__description", part: "description" }, this.variant && index.h("div", { key: 'd34b96ce945bda782bc67bd857227461f6e0edc3' }, this.variant), this.price && index.h("div", { key: 'd147a44d161794dc2c4723690cdf54d92463b0ab' }, this.price), this.sku && (index.h("div", { key: '116052ba46585c5a2ed0d0b189ede3a7e4660f10' }, wp.i18n.__('SKU:', 'surecart'), " ", this.sku)), !!this.purchasableStatus && index.h("div", { key: '0c5798a695fc8c297a90497180bb6463d9054a73' }, this.purchasableStatus)), index.h("div", { key: 'e761b5eae754a84b62d46e161ebc8bba21c78e62', class: "item__description", part: "trial-fees" }, !!this.trial && index.h("div", { key: '3ef832b402eaeee604e588718cc1d554d2d8cd03' }, this.trial), (this.fees || []).map(fee => {
            return (index.h("div", null, fee === null || fee === void 0 ? void 0 :
                fee.display_amount, " ", fee === null || fee === void 0 ? void 0 :
                fee.description));
        })))), this.renderDetails(), !!this.note && (index.h("div", { key: '74f3ebf46c45173b3ed33f0689c4d720bbbdac1e', class: "item__description" }, index.h("sc-product-line-item-note", { key: '9c858d99e522afbd364b9f176c34a405bc24edd2', note: this.note, exportparts: "base:note" }))), index.h("div", { key: '9a98f1f2421b864457939b2ff627e4c4feef9db9', class: "item__row stick-bottom" }, this.editable ? (index.h("sc-quantity-select", { max: this.max || Infinity, exportparts: "base:quantity, minus:quantity__minus, minus-icon:quantity__minus-icon, plus:quantity__plus, plus-icon:quantity__plus-icon, input:quantity__input", clickEl: this.el, quantity: this.quantity, size: "small", onScChange: e => e.detail && this.scUpdateQuantity.emit(e.detail), "aria-label": 
            /** translators: %1$s: product name, %2$s: product price name */
            wp.i18n.sprintf(wp.i18n.__('Change Quantity - %1$s %2$s', 'surecart'), this.name, this.price), productName: this.name })) : (index.h("span", { class: "item__description", part: "static-quantity" }, wp.i18n.__('Qty:', 'surecart'), " ", this.quantity)), !!this.reviewButtonLink && (index.h("div", { key: 'd9f180f5d6869fca26e5036be5072c080eb8aeb8', class: "item__add-review" }, index.h("sc-button", { key: '08911a2bf2c75444ae38e4595f87a30ac96b7374', size: "small", href: this.reviewButtonLink, target: "_blank" }, wp.i18n.__('Review Product', 'surecart')))), !!this.removable && (index.h("div", { key: '126bdc92f322099dc34840f9aa2fe1fdf7e3e018', class: "item__remove-container", onClick: () => this.scRemove.emit(), onKeyDown: e => {
                if (e.key === 'Enter') {
                    this.scRemove.emit();
                }
            }, "aria-label": wp.i18n.sprintf(wp.i18n.__('Remove Item - %1$s %2$s', 'surecart'), this.name, this.amount), tabIndex: 0 }, index.h("sc-icon", { key: '5a9f27dfce9141293ee549e955573c20c5a80b64', exportparts: "base:remove-icon__base", class: "item__remove", name: "x" }), index.h("span", { key: '243a2f23230cf535c60b243ea4b8e5a9ff87cc74', class: "item__remove-text" }, wp.i18n.__('Remove', 'surecart')))))))));
    }
    get el() { return index.getElement(this); }
};
ScProductLineItem.style = ScProductLineItemStyle0;

const scProductLineItemNoteCss = ":host{display:block;min-width:0}.line-item-note{display:flex;align-items:flex-start;gap:0.25em;min-height:1.5em}.line-item-note--clickable{cursor:pointer}.line-item-note__text{line-height:1.4;flex:1;display:-webkit-box;-webkit-box-orient:vertical;line-clamp:1;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;overflow-wrap:anywhere;transition:all 0.2s}.line-item-note--is-expanded .line-item-note__text{display:block;line-clamp:unset;-webkit-line-clamp:unset;overflow:visible;text-overflow:unset}.line-item-note__toggle{background:none;border:none;color:var(--sc-color-gray-500);cursor:pointer;padding:0;align-self:flex-start;transition:opacity 0.2s ease;border-radius:var(--sc-border-radius-small)}.line-item-note__toggle:hover{opacity:0.8}.line-item-note__toggle:focus-visible{outline:2px solid var(--sc-color-primary-500);outline-offset:2px}.line-item-note__toggle:focus{outline:2px solid var(--sc-color-primary-500);outline-offset:2px}";
const ScProductLineItemNoteStyle0 = scProductLineItemNoteCss;

const ScProductLineItemNote = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.note = undefined;
        this.expanded = false;
        this.isOverflowing = false;
    }
    componentDidLoad() {
        this.setupObservers();
        this.checkOverflow();
    }
    disconnectedCallback() {
        this.cleanupObservers();
    }
    setupObservers() {
        if (!this.noteEl)
            return;
        // ResizeObserver for container size changes
        if (typeof ResizeObserver !== 'undefined') {
            this.resizeObserver = new ResizeObserver(() => {
                this.checkOverflow();
            });
            this.resizeObserver.observe(this.noteEl);
        }
        // MutationObserver for content changes
        if (typeof MutationObserver !== 'undefined') {
            this.mutationObserver = new MutationObserver(() => {
                this.checkOverflow();
            });
            this.mutationObserver.observe(this.noteEl, {
                characterData: true,
                subtree: true,
                childList: true,
            });
        }
    }
    cleanupObservers() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = undefined;
        }
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
            this.mutationObserver = undefined;
        }
    }
    checkOverflow() {
        if (!this.noteEl)
            return;
        this.isOverflowing = this.noteEl.scrollHeight > this.noteEl.clientHeight;
    }
    toggle() {
        this.expanded = !this.expanded;
    }
    render() {
        if (!this.note)
            return null;
        return (index.h("div", { class: "base", part: "base" }, index.h("div", { class: {
                'line-item-note': true,
                'line-item-note--is-expanded': this.expanded,
                'line-item-note--clickable': this.isOverflowing || this.expanded,
            }, tabIndex: this.isOverflowing || this.expanded ? 0 : undefined, onClick: () => (this.isOverflowing || this.expanded) && this.toggle() }, index.h("div", { ref: el => (this.noteEl = el), class: "line-item-note__text" }, this.note), (this.isOverflowing || this.expanded) && (index.h("button", { class: "line-item-note__toggle", type: "button", onClick: e => {
                e.stopPropagation();
                this.toggle();
            }, title: this.expanded ? wp.i18n.__('Collapse note', 'surecart') : wp.i18n.__('Expand note', 'surecart') }, index.h("slot", { name: "icon" }, index.h("sc-icon", { name: this.expanded ? 'chevron-up' : 'chevron-down', style: { width: '16px', height: '16px' } })))))));
    }
    get el() { return index.getElement(this); }
};
ScProductLineItemNote.style = ScProductLineItemNoteStyle0;

const scQuantitySelectCss = ":host{--focus-ring:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary);--border-radius:var(--sc-quantity-border-radius, var(--sc-input-border-radius-small));display:inline-block}.input__control{text-align:center;line-height:1;border:none;flex:1;max-width:var(--sc-quantity-input-max-width, 35px);background-color:var(--sc-input-control-background-color, var(--sc-color-white));color:var(--sc-input-control-color, var(--sc-color-black));-moz-appearance:textfield}.input__control::-webkit-outer-spin-button,.input__control::-webkit-inner-spin-button{-webkit-appearance:none}.input__control::-webkit-search-decoration,.input__control::-webkit-search-cancel-button,.input__control::-webkit-search-results-button,.input__control::-webkit-search-results-decoration{-webkit-appearance:none}.input__control:-webkit-autofill,.input__control:-webkit-autofill:hover,.input__control:-webkit-autofill:focus,.input__control:-webkit-autofill:active{box-shadow:0 0 0 var(--sc-input-height-large) var(--sc-input-background-color-hover) inset !important;-webkit-text-fill-color:var(--sc-input-color)}.input__control::placeholder{color:var(--sc-input-placeholder-color);user-select:none}.input__control:focus{outline:none}.quantity--trigger{cursor:pointer;white-space:nowrap}.quantity{position:relative;display:inline-block;width:var(--sc-quantity-select-width, 100px);height:var(--sc-quantity-control-height, var(--sc-input-height-small));display:flex;align-items:stretch;font-family:var(--sc-input-font-family);font-weight:var(--sc-input-font-weight);letter-spacing:var(--sc-input-letter-spacing);background-color:var(--sc-input-background-color);border:var(--sc-input-border);border-radius:var(--border-radius);vertical-align:middle;box-shadow:var(--sc-input-box-shadow);transition:var(--sc-input-transition, var(--sc-transition-medium)) color, var(--sc-input-transition, var(--sc-transition-medium)) border, var(--sc-input-transition, var(--sc-transition-medium)) box-shadow}.quantity:hover:not(.quantity--disabled){background-color:var(--sc-input-background-color-hover);border-color:var(--sc-input-border-color-hover)}.quantity:hover:not(.quantity--disabled) .quantity__control{color:var(--sc-input-color-hover)}.quantity.quantity--focused:not(.quantity--disabled){background-color:var(--sc-input-background-color-focus);border-color:var(--sc-input-border-color-focus);box-shadow:var(--focus-ring)}.quantity.quantity--focused:not(.quantity--disabled) .quantity__control{color:var(--sc-input-color-focus)}.quantity.quantity--disabled{background-color:var(--sc-input-background-color-disabled);border-color:var(--sc-input-border-color-disabled);opacity:0.5;cursor:not-allowed}.quantity.quantity--disabled .input__control{color:var(--sc-input-color-disabled)}.quantity.quantity--disabled .input__control::placeholder{color:var(--sc-input-placeholder-color-disabled)}.button__decrease,.button__increase{display:inline-block;text-align:center;vertical-align:middle;line-height:0;height:auto;top:1px;bottom:1px;width:32px;background:var(--sc-input-background-color);color:var(--sc-input-help-text-color);cursor:pointer;font-size:13px;user-select:none;border-width:0;padding:0}.button__decrease:hover:not(.button--disabled) .quantity__control,.button__increase:hover:not(.button--disabled) .quantity__control{color:var(--sc-input-color-hover)}.button__decrease.button--disabled,.button__increase.button--disabled{background-color:var(--sc-input-background-color-disabled);border-color:var(--sc-input-border-color-disabled);opacity:0.5;cursor:not-allowed}.quantity--small{width:var(--sc-quantity-select-width-small, 76px);height:var(--sc-quantity-control-height-small, 26px)}.quantity--small .button__decrease,.quantity--small .button__increase{width:24px;border:none}.quantity--small .input__control{max-width:24px}.button__decrease{left:1px;border-radius:var(--border-radius) 0 0 var(--border-radius);border-right:var(--sc-input-border)}.button__increase{right:1px;border-radius:0 var(--border-radius) var(--border-radius) 0;border-left:var(--sc-input-border)}.quantity--is-rtl .button__decrease{right:1px;border-left:var(--sc-input-border);border-right:0}.quantity--is-rtl .button__increase{left:1px;border-right:var(--sc-input-border);border-left:0}";
const ScQuantitySelectStyle0 = scQuantitySelectCss;

const ScQuantitySelect = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scChange = index.createEvent(this, "scChange", 7);
        this.scInput = index.createEvent(this, "scInput", 7);
        this.scFocus = index.createEvent(this, "scFocus", 7);
        this.scBlur = index.createEvent(this, "scBlur", 7);
        this.clickEl = undefined;
        this.disabled = undefined;
        this.max = Infinity;
        this.min = 1;
        this.quantity = 0;
        this.productName = 'Product';
        this.size = 'medium';
        this.hasFocus = undefined;
    }
    decrease() {
        if (this.disabled)
            return;
        this.quantity = Math.max(this.quantity - 1, this.min);
        // translators: %1$s is the product name
        index$2.speak(wp.i18n.sprintf(wp.i18n.__('Decreased %1$s quantity by one', 'surecart'), this.productName), 'assertive');
        this.scChange.emit(this.quantity);
        this.scInput.emit(this.quantity);
    }
    increase() {
        if (this.disabled)
            return;
        this.quantity = Math.min(this.quantity + 1, this.max);
        // translators: %1$s is the product name
        index$2.speak(wp.i18n.sprintf(wp.i18n.__('Increased %1$s quantity by one', 'surecart'), this.productName), 'assertive');
        this.scChange.emit(this.quantity);
        this.scInput.emit(this.quantity);
    }
    handleBlur() {
        this.hasFocus = false;
        this.scBlur.emit();
    }
    handleFocus() {
        this.hasFocus = true;
        this.scFocus.emit();
    }
    handleChange() {
        this.quantity = parseInt(this.input.value) > this.max ? this.max : parseInt(this.input.value);
        // translators: %1$s is the product name, %2$s is the quantity
        index$2.speak(wp.i18n.sprintf(wp.i18n.__('Quantity of %1$s changed to %2$s', 'surecart'), this.productName, this.quantity), 'assertive');
        this.scChange.emit(this.quantity);
    }
    handleInput() {
        this.quantity = parseInt(this.input.value);
        this.scInput.emit(this.quantity);
    }
    render() {
        return (index.h("div", { key: '19b66b6f96b00ea845304b6fefd30386b1118eca', part: "base", class: {
                'quantity': true,
                // States
                'quantity--focused': this.hasFocus,
                'quantity--disabled': this.disabled,
                'quantity--is-rtl': pageAlign.isRtl(),
                'quantity--small': this.size === 'small',
            } }, index.h("button", { key: '620fb5c3e1e2fa235268f21129f9d91d5e9fd150', part: "minus", "aria-label": 
            /** translators: %1$s: product name */
            wp.i18n.sprintf(wp.i18n.__('Decrease %1$s quantity by one', 'surecart'), this.productName), "aria-disabled": this.disabled || (this.quantity <= this.min && this.min > 1), class: { 'button__decrease': true, 'button--disabled': this.quantity <= this.min && this.min > 1 }, onClick: () => this.quantity > this.min && this.decrease(), disabled: this.disabled || (this.quantity <= this.min && this.min > 1) }, index.h("sc-icon", { key: '5d6853c4f2404650fe51bd49d2b8f308c42daa30', name: "minus", exportparts: "base:minus__icon" })), index.h("input", { key: '069395602cddc53407a67dc9878714740fb63028', part: "input", class: "input__control", ref: el => (this.input = el), step: "1", type: "number", max: this.max, min: this.min, value: this.quantity, disabled: this.disabled, autocomplete: "off", role: "spinbutton", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": this.quantity, "aria-disabled": this.disabled, onChange: () => this.handleChange(), onInput: () => this.handleInput(), onFocus: () => this.handleFocus(), onBlur: () => this.handleBlur(), "aria-label": 
            /** translators: %1$s: product name */
            wp.i18n.sprintf(wp.i18n.__('Quantity input for %1$s product', 'surecart'), this.productName) }), index.h("button", { key: 'f751adf2e7dfe00bda8e407dc9a481fadcf95a1e', part: "plus", "aria-label": 
            /** translators: %1$s: product name */
            wp.i18n.sprintf(wp.i18n.__('Increase %1$s quantity by one', 'surecart'), this.productName), class: { 'button__increase': true, 'button--disabled': this.quantity >= this.max }, onClick: () => this.quantity < this.max && this.increase(), "aria-disabled": this.disabled || this.quantity >= this.max, disabled: this.disabled || this.quantity >= this.max }, index.h("sc-icon", { key: '3b561eb47a58b85e02732d838c057cc0bb2acfa4', name: "plus", exportparts: "base:plus__icon" }))));
    }
    get el() { return index.getElement(this); }
};
ScQuantitySelect.style = ScQuantitySelectStyle0;

const scSpinnerCss = ":host{--track-color:#0d131e20;--indicator-color:var(--sc-color-primary-500);--stroke-width:2px;--spinner-size:1em;display:inline-block}.spinner{display:inline-block;width:var(--spinner-size);height:var(--spinner-size);border-radius:50%;border:solid var(--stroke-width) var(--track-color);border-top-color:var(--indicator-color);border-right-color:var(--indicator-color);animation:1s linear infinite spin}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";
const ScSpinnerStyle0 = scSpinnerCss;

const ScSpinner = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return index.h("span", { key: '64d808a3cb66beaf93e597d81636cbd516b8559b', part: "base", class: "spinner", "aria-busy": "true", "aria-live": "polite" });
    }
};
ScSpinner.style = ScSpinnerStyle0;

exports.sc_button = ScButton;
exports.sc_icon = ScIcon;
exports.sc_product_line_item = ScProductLineItem;
exports.sc_product_line_item_note = ScProductLineItemNote;
exports.sc_quantity_select = ScQuantitySelect;
exports.sc_spinner = ScSpinner;

//# sourceMappingURL=sc-button_6.cjs.entry.js.map