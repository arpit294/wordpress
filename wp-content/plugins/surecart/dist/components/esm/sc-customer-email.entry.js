import { r as registerInstance, c as createEvent, h, F as Fragment } from './index-25e5af33.js';
import { s as speak } from './index-c5a96d53.js';
import { a as apiFetch } from './index-824c562b.js';
import { c as createOrUpdateCheckout } from './index-396e50a3.js';
import { a as getValueFromUrl, b as isRateLimited } from './util-dfbf863e.js';
import { r as resendAnchorFrom, g as getBlockedDuplicateSeconds } from './verification-00df9439.js';
import { s as state$1, C as CODE_SENT, o as onChange$1, U as UNVERIFIED, r as resetUser, V as VERIFYING, a as CODE_EXPIRED } from './store-ea636731.js';
import { s as state, o as onChange } from './mutations-54fc7af1.js';
import './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';
import './fetch-cdff67be.js';
import './index-18f5a1bc.js';
import './utils-2fd36c2c.js';
import './google-e9085e27.js';
import './currency-eb33deae.js';
import './store-fd165874.js';
import './price-39d60d32.js';

const scCustomerEmailCss = ":host{display:block;position:relative}a{color:var(--sc-color-primary-500)}.email-preview{display:flex;align-items:center;justify-content:space-between;position:relative;width:100%;box-sizing:border-box;font-family:var(--sc-input-font-family);font-weight:var(--sc-input-font-weight);letter-spacing:var(--sc-input-letter-spacing);background-color:var(--sc-input-background-color);border:solid 1px var(--sc-input-border-color, var(--sc-input-border));vertical-align:middle;box-shadow:var(--sc-input-box-shadow);transition:var(--sc-input-transition, var(--sc-transition-medium)) color, var(--sc-input-transition, var(--sc-transition-medium)) border, var(--sc-input-transition, var(--sc-transition-medium)) box-shadow;border-radius:var(--sc-input-border-radius-medium);padding:var(--sc-input-spacing-small);font-size:var(--sc-font-size-small)}.email-preview sc-avatar{--sc-avatar-size:38px}.email-preview__info{display:flex;align-items:center;gap:1em}.email-preview__text{line-height:var(--sc-line-height-dense)}.email-preview__text :last-child:not(:first-child){color:var(--sc-input-help-text-color)}.email-preview__name{font-weight:var(--sc-font-weight-bold)}a.customer-email__login-link{color:var(--sc-customer-login-link-color, var(--sc-input-placeholder-color));text-decoration:none;font-size:var(--sc-font-size-small)}.tracking-confirmation-message{font-size:var(--sc-font-size-xx-small)}.tracking-confirmation-message span{opacity:0.75}.account-loader{line-height:0}";
const ScCustomerEmailStyle0 = scCustomerEmailCss;

const ScCustomerEmail = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.scChange = createEvent(this, "scChange", 7);
        this.scClear = createEvent(this, "scClear", 7);
        this.scInput = createEvent(this, "scInput", 7);
        this.scFocus = createEvent(this, "scFocus", 7);
        this.scBlur = createEvent(this, "scBlur", 7);
        this.scUpdateOrderState = createEvent(this, "scUpdateOrderState", 7);
        this.scUpdateAbandonedCart = createEvent(this, "scUpdateAbandonedCart", 7);
        this.scLoginPrompt = createEvent(this, "scLoginPrompt", 7);
        this.trackingConfirmationMessage = undefined;
        this.size = 'medium';
        this.value = getValueFromUrl('email');
        this.pill = false;
        this.label = undefined;
        this.showLabel = true;
        this.help = '';
        this.placeholder = undefined;
        this.disabled = false;
        this.readonly = false;
        this.required = false;
        this.invalid = false;
        this.autofocus = undefined;
        this.hasFocus = undefined;
        this.busy = undefined;
        this.logoutBusy = false;
        this.error = '';
        this.loginMode = 'code';
    }
    async handleChange() {
        this.value = this.input.value;
        this.scChange.emit();
        try {
            state.checkout = (await createOrUpdateCheckout({ id: state.checkout.id, data: { email: this.input.value } }));
        }
        catch (error) {
            console.log(error);
        }
        finally {
            this.busy = false;
        }
    }
    handleValueChange() {
        if (this.loginCodeDebounce) {
            clearTimeout(this.loginCodeDebounce);
        }
        this.loginCodeDebounce = window.setTimeout(() => {
            this.createLoginCode();
            this.loginCodeDebounce = null;
        }, 800);
    }
    async createLoginCode() {
        if (!this.value)
            return;
        if (state$1.loggedIn)
            return;
        // Opt-out merchant setting: skip proactive code-send when disabled.
        if (!state.showLoginPrompt)
            return;
        // Check if a valid email using regex, if not return.
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
            return;
        }
        try {
            this.busy = true;
            this.error = '';
            this.loginMode = 'code';
            const response = await apiFetch({
                method: 'POST',
                path: 'surecart/v1/verification_codes',
                data: {
                    login: this.value,
                    checkout_mode: state.mode,
                },
            });
            state$1.email = this.value;
            state$1.verificationStatus = CODE_SENT;
            // Anchor the resend cooldown to the platform's window (may be a resumed
            // one when no fresh email was sent), so reload/tab switch stay accurate.
            // Falls back to the default window if the platform omits the value.
            state$1.resendAvailableAt = resendAnchorFrom(response === null || response === void 0 ? void 0 : response.resend_available_in);
            // An in-window request resumes the existing code — don't announce a new email.
            if ((response === null || response === void 0 ? void 0 : response.email_sent) === false) {
                speak(wp.i18n.__('A verification code was already sent to your email. Please check your email.', 'surecart'), 'assertive');
            }
            else {
                speak(wp.i18n.__('Verification code is sent to your email. Please check your email.', 'surecart'), 'assertive');
            }
        }
        catch (e) {
            this.handleCodeSendError(e);
        }
        finally {
            this.busy = false;
        }
    }
    async reportValidity() {
        var _a, _b;
        // if user is logged in, no need to validate.
        if (state$1.loggedIn)
            return true;
        return (_b = (_a = this.input) === null || _a === void 0 ? void 0 : _a.reportValidity) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    /** Sync customer email with session if it's updated by other means */
    handleSessionChange() {
        var _a, _b, _c, _d, _e, _f;
        // we already have a value and we are not yet logged in.
        if (this.value && !state$1.loggedIn)
            return;
        // we are logged in already.
        if (state$1.loggedIn) {
            // get email from user state fist.
            this.value = state$1.email || ((_b = (_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b.email) || ((_c = state === null || state === void 0 ? void 0 : state.checkout) === null || _c === void 0 ? void 0 : _c.email);
            return;
        }
        const fromUrl = getValueFromUrl('email');
        if (!state$1.loggedIn && !!fromUrl) {
            this.value = fromUrl;
            return;
        }
        this.value = ((_d = state === null || state === void 0 ? void 0 : state.checkout) === null || _d === void 0 ? void 0 : _d.email) || ((_f = (_e = state === null || state === void 0 ? void 0 : state.checkout) === null || _e === void 0 ? void 0 : _e.customer) === null || _f === void 0 ? void 0 : _f.email);
        if (!!this.value && !state$1.loggedIn) {
            state$1.email = this.value;
        }
    }
    /** Listen to checkout. */
    componentWillLoad() {
        this.handleSessionChange();
        this.removeCheckoutListener = onChange('checkout', () => this.handleSessionChange());
        this.removeUserListener = onChange$1('email', val => {
            this.value = val;
        });
    }
    handleCodeSendError(error) {
        var _a;
        // 429: silently switch to password mode. Header + input is enough context — no red error.
        if (isRateLimited(error)) {
            state$1.email = ((_a = this.input) === null || _a === void 0 ? void 0 : _a.value) || '';
            state$1.verificationStatus = UNVERIFIED;
            this.loginMode = 'password';
            return;
        }
        const blockedSeconds = getBlockedDuplicateSeconds(error);
        ((error === null || error === void 0 ? void 0 : error.additional_errors) || []).forEach((e) => {
            var _a;
            if ((e === null || e === void 0 ? void 0 : e.code) === 'verification_code.email.blocked_duplicate') {
                state$1.email = ((_a = this.input) === null || _a === void 0 ? void 0 : _a.value) || '';
                state$1.verificationStatus = CODE_SENT;
                // Resume the countdown from the platform's reported backoff window
                // (default window if the platform didn't include seconds).
                state$1.resendAvailableAt = resendAnchorFrom(blockedSeconds);
            }
            else {
                this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Verification code is not valid. Please try again.', 'surecart');
            }
        });
    }
    /** Remove listener. */
    disconnectedCallback() {
        this.removeCheckoutListener();
        this.removeUserListener();
    }
    async logout() {
        try {
            this.logoutBusy = true;
            state.checkout = (await createOrUpdateCheckout({ id: state.checkout.id, data: { email: '' } }));
            const response = (await apiFetch({
                method: 'POST',
                path: 'surecart/v1/logout',
            }));
            // @ts-ignore - nonceMiddleware is set in fetch.ts but not in @wordpress/api-fetch types.
            if ((response === null || response === void 0 ? void 0 : response.nonce) && apiFetch.nonceMiddleware) {
                // @ts-ignore
                apiFetch.nonceMiddleware.nonce = response.nonce;
            }
            resetUser();
            speak(wp.i18n.__('Logged out successfully.', 'surecart'), 'assertive');
        }
        catch (e) {
            console.error(e);
        }
        finally {
            this.logoutBusy = false;
        }
    }
    renderLoggedIn() {
        return (h("div", { class: "email-preview" }, h("div", { class: "email-preview__info" }, h("sc-avatar", { image: state$1.avatarUrl, initials: ((state$1 === null || state$1 === void 0 ? void 0 : state$1.name) || (state$1 === null || state$1 === void 0 ? void 0 : state$1.email)).charAt(0) }), h("div", { class: "email-preview__text" }, h("div", { class: "email-preview__name" }, state$1.name), h("div", { class: "email-preview__email" }, state$1.email))), h("sc-dropdown", { placement: "bottom-end" }, h("sc-button", { type: "text", slot: "trigger", loading: this.logoutBusy }, h("sc-icon", { name: "chevron-down", "aria-label": wp.i18n.__('Account options', 'surecart') })), h("sc-menu", null, h("sc-menu-item", { onClick: () => this.logout() }, h("sc-icon", { slot: "prefix", name: "log-out" }), wp.i18n.__('Logout', 'surecart'))))));
    }
    renderOptIn() {
        if (!this.trackingConfirmationMessage)
            return null;
        if (state.abandonedCheckoutEnabled !== false) {
            return (h("div", { class: "tracking-confirmation-message" }, h("span", null, this.trackingConfirmationMessage), ' ', h("a", { href: "#", onClick: e => {
                    e.preventDefault();
                    this.scUpdateAbandonedCart.emit(false);
                } }, wp.i18n.__('No Thanks', 'surecart'))));
        }
        return (h("div", { class: "tracking-confirmation-message" }, h("span", null, " ", wp.i18n.__("You won't receive further emails from us.", 'surecart'))));
    }
    render() {
        var _a;
        if (state$1.loggedIn) {
            return this.renderLoggedIn();
        }
        if (state$1.verificationStatus === CODE_SENT ||
            state$1.verificationStatus === VERIFYING ||
            state$1.verificationStatus === UNVERIFIED ||
            state$1.verificationStatus === CODE_EXPIRED) {
            return h("sc-customer-login", { initialMode: this.loginMode, codeError: this.error });
        }
        return (h(Fragment, null, h("sc-input", { exportparts: "base, input, form-control, label, help-text, prefix, suffix", type: "email", name: "email", ref: el => (this.input = el), value: this.value, help: this.help, label: this.label, autocomplete: 'email', placeholder: this.placeholder, disabled: this.disabled || (!!state$1.loggedIn && !!((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) && !this.invalid), readonly: this.readonly, required: true, invalid: this.invalid, autofocus: this.autofocus, hasFocus: this.hasFocus, onScChange: () => this.handleChange(), onScInput: () => {
                this.scInput.emit();
            }, onScFocus: () => this.scFocus.emit(), onScBlur: () => this.scBlur.emit() }, this.busy && h("sc-spinner", { slot: "suffix", class: "account-loader" })), this.renderOptIn()));
    }
    static get watchers() { return {
        "value": ["handleValueChange"]
    }; }
};
ScCustomerEmail.style = ScCustomerEmailStyle0;

export { ScCustomerEmail as sc_customer_email };

//# sourceMappingURL=sc-customer-email.entry.js.map