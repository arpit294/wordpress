'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const index$3 = require('./index-fb76df07.js');
const index$2 = require('./index-7ced8198.js');
const index$1 = require('./index-c5bd66ae.js');
const util = require('./util-a15c420c.js');
const verification = require('./verification-19455819.js');
const store = require('./store-5cd165ea.js');
const mutations = require('./mutations-4133422f.js');
require('./add-query-args-49dcb630.js');
require('./remove-query-args-b57e8cd3.js');
require('./fetch-5e8dc1d5.js');
require('./index-c3de642f.js');
require('./utils-f5ea3c23.js');
require('./google-8dbad1a6.js');
require('./currency-b438c76d.js');
require('./store-29627d6b.js');
require('./price-9dddd853.js');

const scCustomerEmailCss = ":host{display:block;position:relative}a{color:var(--sc-color-primary-500)}.email-preview{display:flex;align-items:center;justify-content:space-between;position:relative;width:100%;box-sizing:border-box;font-family:var(--sc-input-font-family);font-weight:var(--sc-input-font-weight);letter-spacing:var(--sc-input-letter-spacing);background-color:var(--sc-input-background-color);border:solid 1px var(--sc-input-border-color, var(--sc-input-border));vertical-align:middle;box-shadow:var(--sc-input-box-shadow);transition:var(--sc-input-transition, var(--sc-transition-medium)) color, var(--sc-input-transition, var(--sc-transition-medium)) border, var(--sc-input-transition, var(--sc-transition-medium)) box-shadow;border-radius:var(--sc-input-border-radius-medium);padding:var(--sc-input-spacing-small);font-size:var(--sc-font-size-small)}.email-preview sc-avatar{--sc-avatar-size:38px}.email-preview__info{display:flex;align-items:center;gap:1em}.email-preview__text{line-height:var(--sc-line-height-dense)}.email-preview__text :last-child:not(:first-child){color:var(--sc-input-help-text-color)}.email-preview__name{font-weight:var(--sc-font-weight-bold)}a.customer-email__login-link{color:var(--sc-customer-login-link-color, var(--sc-input-placeholder-color));text-decoration:none;font-size:var(--sc-font-size-small)}.tracking-confirmation-message{font-size:var(--sc-font-size-xx-small)}.tracking-confirmation-message span{opacity:0.75}.account-loader{line-height:0}";
const ScCustomerEmailStyle0 = scCustomerEmailCss;

const ScCustomerEmail = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scChange = index.createEvent(this, "scChange", 7);
        this.scClear = index.createEvent(this, "scClear", 7);
        this.scInput = index.createEvent(this, "scInput", 7);
        this.scFocus = index.createEvent(this, "scFocus", 7);
        this.scBlur = index.createEvent(this, "scBlur", 7);
        this.scUpdateOrderState = index.createEvent(this, "scUpdateOrderState", 7);
        this.scUpdateAbandonedCart = index.createEvent(this, "scUpdateAbandonedCart", 7);
        this.scLoginPrompt = index.createEvent(this, "scLoginPrompt", 7);
        this.trackingConfirmationMessage = undefined;
        this.size = 'medium';
        this.value = util.getValueFromUrl('email');
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
            mutations.state.checkout = (await index$1.createOrUpdateCheckout({ id: mutations.state.checkout.id, data: { email: this.input.value } }));
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
        if (store.state.loggedIn)
            return;
        // Opt-out merchant setting: skip proactive code-send when disabled.
        if (!mutations.state.showLoginPrompt)
            return;
        // Check if a valid email using regex, if not return.
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
            return;
        }
        try {
            this.busy = true;
            this.error = '';
            this.loginMode = 'code';
            const response = await index$2.apiFetch({
                method: 'POST',
                path: 'surecart/v1/verification_codes',
                data: {
                    login: this.value,
                    checkout_mode: mutations.state.mode,
                },
            });
            store.state.email = this.value;
            store.state.verificationStatus = store.CODE_SENT;
            // Anchor the resend cooldown to the platform's window (may be a resumed
            // one when no fresh email was sent), so reload/tab switch stay accurate.
            // Falls back to the default window if the platform omits the value.
            store.state.resendAvailableAt = verification.resendAnchorFrom(response === null || response === void 0 ? void 0 : response.resend_available_in);
            // An in-window request resumes the existing code — don't announce a new email.
            if ((response === null || response === void 0 ? void 0 : response.email_sent) === false) {
                index$3.speak(wp.i18n.__('A verification code was already sent to your email. Please check your email.', 'surecart'), 'assertive');
            }
            else {
                index$3.speak(wp.i18n.__('Verification code is sent to your email. Please check your email.', 'surecart'), 'assertive');
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
        if (store.state.loggedIn)
            return true;
        return (_b = (_a = this.input) === null || _a === void 0 ? void 0 : _a.reportValidity) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    /** Sync customer email with session if it's updated by other means */
    handleSessionChange() {
        var _a, _b, _c, _d, _e, _f;
        // we already have a value and we are not yet logged in.
        if (this.value && !store.state.loggedIn)
            return;
        // we are logged in already.
        if (store.state.loggedIn) {
            // get email from user state fist.
            this.value = store.state.email || ((_b = (_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b.email) || ((_c = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.email);
            return;
        }
        const fromUrl = util.getValueFromUrl('email');
        if (!store.state.loggedIn && !!fromUrl) {
            this.value = fromUrl;
            return;
        }
        this.value = ((_d = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _d === void 0 ? void 0 : _d.email) || ((_f = (_e = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _e === void 0 ? void 0 : _e.customer) === null || _f === void 0 ? void 0 : _f.email);
        if (!!this.value && !store.state.loggedIn) {
            store.state.email = this.value;
        }
    }
    /** Listen to checkout. */
    componentWillLoad() {
        this.handleSessionChange();
        this.removeCheckoutListener = mutations.onChange('checkout', () => this.handleSessionChange());
        this.removeUserListener = store.onChange('email', val => {
            this.value = val;
        });
    }
    handleCodeSendError(error) {
        var _a;
        // 429: silently switch to password mode. Header + input is enough context — no red error.
        if (util.isRateLimited(error)) {
            store.state.email = ((_a = this.input) === null || _a === void 0 ? void 0 : _a.value) || '';
            store.state.verificationStatus = store.UNVERIFIED;
            this.loginMode = 'password';
            return;
        }
        const blockedSeconds = verification.getBlockedDuplicateSeconds(error);
        ((error === null || error === void 0 ? void 0 : error.additional_errors) || []).forEach((e) => {
            var _a;
            if ((e === null || e === void 0 ? void 0 : e.code) === 'verification_code.email.blocked_duplicate') {
                store.state.email = ((_a = this.input) === null || _a === void 0 ? void 0 : _a.value) || '';
                store.state.verificationStatus = store.CODE_SENT;
                // Resume the countdown from the platform's reported backoff window
                // (default window if the platform didn't include seconds).
                store.state.resendAvailableAt = verification.resendAnchorFrom(blockedSeconds);
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
            mutations.state.checkout = (await index$1.createOrUpdateCheckout({ id: mutations.state.checkout.id, data: { email: '' } }));
            const response = (await index$2.apiFetch({
                method: 'POST',
                path: 'surecart/v1/logout',
            }));
            // @ts-ignore - nonceMiddleware is set in fetch.ts but not in @wordpress/api-fetch types.
            if ((response === null || response === void 0 ? void 0 : response.nonce) && index$2.apiFetch.nonceMiddleware) {
                // @ts-ignore
                index$2.apiFetch.nonceMiddleware.nonce = response.nonce;
            }
            store.resetUser();
            index$3.speak(wp.i18n.__('Logged out successfully.', 'surecart'), 'assertive');
        }
        catch (e) {
            console.error(e);
        }
        finally {
            this.logoutBusy = false;
        }
    }
    renderLoggedIn() {
        return (index.h("div", { class: "email-preview" }, index.h("div", { class: "email-preview__info" }, index.h("sc-avatar", { image: store.state.avatarUrl, initials: ((store.state === null || store.state === void 0 ? void 0 : store.state.name) || (store.state === null || store.state === void 0 ? void 0 : store.state.email)).charAt(0) }), index.h("div", { class: "email-preview__text" }, index.h("div", { class: "email-preview__name" }, store.state.name), index.h("div", { class: "email-preview__email" }, store.state.email))), index.h("sc-dropdown", { placement: "bottom-end" }, index.h("sc-button", { type: "text", slot: "trigger", loading: this.logoutBusy }, index.h("sc-icon", { name: "chevron-down", "aria-label": wp.i18n.__('Account options', 'surecart') })), index.h("sc-menu", null, index.h("sc-menu-item", { onClick: () => this.logout() }, index.h("sc-icon", { slot: "prefix", name: "log-out" }), wp.i18n.__('Logout', 'surecart'))))));
    }
    renderOptIn() {
        if (!this.trackingConfirmationMessage)
            return null;
        if (mutations.state.abandonedCheckoutEnabled !== false) {
            return (index.h("div", { class: "tracking-confirmation-message" }, index.h("span", null, this.trackingConfirmationMessage), ' ', index.h("a", { href: "#", onClick: e => {
                    e.preventDefault();
                    this.scUpdateAbandonedCart.emit(false);
                } }, wp.i18n.__('No Thanks', 'surecart'))));
        }
        return (index.h("div", { class: "tracking-confirmation-message" }, index.h("span", null, " ", wp.i18n.__("You won't receive further emails from us.", 'surecart'))));
    }
    render() {
        var _a;
        if (store.state.loggedIn) {
            return this.renderLoggedIn();
        }
        if (store.state.verificationStatus === store.CODE_SENT ||
            store.state.verificationStatus === store.VERIFYING ||
            store.state.verificationStatus === store.UNVERIFIED ||
            store.state.verificationStatus === store.CODE_EXPIRED) {
            return index.h("sc-customer-login", { initialMode: this.loginMode, codeError: this.error });
        }
        return (index.h(index.Fragment, null, index.h("sc-input", { exportparts: "base, input, form-control, label, help-text, prefix, suffix", type: "email", name: "email", ref: el => (this.input = el), value: this.value, help: this.help, label: this.label, autocomplete: 'email', placeholder: this.placeholder, disabled: this.disabled || (!!store.state.loggedIn && !!((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) && !this.invalid), readonly: this.readonly, required: true, invalid: this.invalid, autofocus: this.autofocus, hasFocus: this.hasFocus, onScChange: () => this.handleChange(), onScInput: () => {
                this.scInput.emit();
            }, onScFocus: () => this.scFocus.emit(), onScBlur: () => this.scBlur.emit() }, this.busy && index.h("sc-spinner", { slot: "suffix", class: "account-loader" })), this.renderOptIn()));
    }
    static get watchers() { return {
        "value": ["handleValueChange"]
    }; }
};
ScCustomerEmail.style = ScCustomerEmailStyle0;

exports.sc_customer_email = ScCustomerEmail;

//# sourceMappingURL=sc-customer-email.cjs.entry.js.map