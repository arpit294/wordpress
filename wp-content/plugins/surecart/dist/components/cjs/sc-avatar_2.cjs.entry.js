'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const index$2 = require('./index-7ced8198.js');
const index$1 = require('./index-fb76df07.js');
const store = require('./store-5cd165ea.js');
const mutations = require('./mutations-4133422f.js');
const util = require('./util-a15c420c.js');
const verification = require('./verification-19455819.js');
require('./add-query-args-49dcb630.js');
require('./remove-query-args-b57e8cd3.js');
require('./index-c3de642f.js');
require('./utils-f5ea3c23.js');
require('./google-8dbad1a6.js');
require('./currency-b438c76d.js');
require('./store-29627d6b.js');
require('./price-9dddd853.js');

const scAvatarCss = ":host{display:inline-block;--sc-avatar-size:3rem}.avatar{display:inline-flex;align-items:center;justify-content:center;position:relative;width:var(--sc-avatar-size);height:var(--sc-avatar-size);background-color:var(--sc-color-gray-400);font-family:var(--sc-font-sans);font-size:calc(var(--sc-avatar-size) * 0.5);font-weight:var(--sc-font-weight-normal);color:var(--sc-color-white);user-select:none;vertical-align:middle}.avatar--circle,.avatar--circle .avatar__image{border-radius:var(--sc-border-radius-circle)}.avatar--rounded,.avatar--rounded .avatar__image{border-radius:var(--sc-border-radius-medium)}.avatar--square{border-radius:0}.avatar__icon{display:flex;align-items:center;justify-content:center;position:absolute;top:0;left:0;width:100%;height:100%}.avatar__initials{line-height:1;text-transform:uppercase}.avatar__image{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;overflow:hidden}";
const ScAvatarStyle0 = scAvatarCss;

const ScAvatar = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.hasError = false;
        this.image = '';
        this.label = '';
        this.initials = '';
        this.loading = 'eager';
        this.shape = 'circle';
    }
    handleImageChange() {
        // Reset the error when a new image is provided
        this.hasError = false;
    }
    render() {
        return (index.h("div", { key: 'da737fda47d527e7ce56312e652d33f61aa3610e', part: "base", class: {
                'avatar': true,
                'avatar--circle': this.shape === 'circle',
                'avatar--rounded': this.shape === 'rounded',
                'avatar--square': this.shape === 'square',
            }, role: "img", "aria-label": this.label }, this.initials ? (index.h("div", { part: "initials", class: "avatar__initials" }, this.initials)) : (index.h("div", { part: "icon", class: "avatar__icon", "aria-hidden": "true" }, index.h("slot", { name: "icon" }, index.h("sl-icon", { name: "person-fill", library: "system" })))), this.image && !this.hasError && index.h("img", { key: '8c4a6a63796d5bf64de09ac67210da1227977d57', part: "image", class: "avatar__image", src: this.image, loading: this.loading, alt: "", onError: () => (this.hasError = true) })));
    }
    static get watchers() { return {
        "image": ["handleImageChange"]
    }; }
};
ScAvatar.style = ScAvatarStyle0;

const scCustomerLoginCss = ":host{display:flex;flex-direction:column;gap:1em}.customer-login{box-sizing:border-box;font-family:var(--sc-input-font-family);font-weight:var(--sc-input-font-weight);letter-spacing:var(--sc-input-letter-spacing);background-color:var(--sc-input-background-color);border:solid 1px var(--sc-input-border-color, var(--sc-input-border));vertical-align:middle;box-shadow:var(--sc-input-box-shadow);transition:var(--sc-input-transition, var(--sc-transition-medium)) color, var(--sc-input-transition, var(--sc-transition-medium)) border, var(--sc-input-transition, var(--sc-transition-medium)) box-shadow;border-radius:var(--sc-input-border-radius-medium);font-size:var(--sc-font-size-small);animation:open 0.5s ease-in-out}.customer-login a{color:var(--sc-color-primary-500)}.customer-code{padding:var(--sc-input-spacing-medium)}.customer-code__sent-info{display:flex;align-items:center;gap:var(--sc-spacing-small);font-size:var(--sc-font-size-small);color:var(--sc-input-help-text-color);margin-bottom:var(--sc-spacing-x-small)}.customer-code__mail-icon{font-size:1em;flex-shrink:0}.customer-code__sent-email{font-weight:var(--sc-font-weight-semibold);color:var(--sc-input-label-color)}.customer-code__change-link{margin-left:auto;white-space:nowrap;text-decoration:none;cursor:pointer;font-size:var(--sc-font-size-small)}.customer-code__change-link:hover{text-decoration:underline}.customer-code__error{color:var(--sc-color-danger-500, red);font-size:var(--sc-font-size-x-small);margin:0}.customer-code__verifying{display:flex;align-items:center;gap:var(--sc-spacing-small);color:var(--sc-input-help-text-color);font-size:var(--sc-font-size-small);margin-bottom:var(--sc-spacing-small)}.customer-code__expired{color:var(--sc-color-danger-500, red);font-size:var(--sc-font-size-x-small);margin:0 0 var(--sc-spacing-small) 0}.customer-code__expired a{color:var(--sc-color-primary-500);text-decoration:none;cursor:pointer}.customer-code__expired a:hover{text-decoration:underline}.customer-code__footer{display:flex;justify-content:space-between;align-items:center;margin-top:var(--sc-spacing-small)}.customer-code__footer-left{display:flex;align-items:center}.customer-code__footer-right{display:flex;align-items:center}.customer-code__resend-timer{color:var(--sc-input-help-text-color);font-size:var(--sc-font-size-x-small)}.customer-code__resend-link{font-size:var(--sc-font-size-x-small);text-decoration:none;cursor:pointer}.customer-code__resend-link:hover{text-decoration:underline}.customer-code__mode-link{display:flex;align-items:center;gap:var(--sc-spacing-xx-small);font-size:var(--sc-font-size-x-small);text-decoration:none;cursor:pointer}.customer-code__mode-link:hover{text-decoration:underline}.customer-password{padding:var(--sc-input-spacing-medium)}.customer-password__error{color:var(--sc-color-danger-500, red);font-size:var(--sc-font-size-x-small);margin:var(--sc-spacing-small) 0 0 0}";
const ScCustomerLoginStyle0 = scCustomerLoginCss;

const ScCustomerLogin = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /** Interval timer reference for cleanup */
        this.cooldownInterval = null;
        /** Focus the active view's field after the next render (set when the mode switches). */
        this.focusAfterRender = false;
        this.mode = 'code';
        this.busy = false;
        this.codeResending = false;
        this.resendCooldown = 60;
        this.error = '';
        this.codeError = '';
        this.initialMode = 'code';
        this.password = '';
        this.codeUnavailable = false;
    }
    formatCooldown() {
        const minutes = Math.floor(this.resendCooldown / 60);
        const seconds = this.resendCooldown % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    async verifyCode(code) {
        var _a, _b;
        // If not valid email and code, then return.
        if (!store.state.email || !code) {
            return;
        }
        try {
            this.error = '';
            store.state.verificationStatus = store.VERIFYING;
            this.busy = true;
            index$1.speak(wp.i18n.__('Verifying code...', 'surecart'), 'assertive');
            const user = (await index$2.apiFetch({
                method: 'POST',
                path: 'surecart/v1/verification_codes/verify',
                data: {
                    login: store.state.email,
                    code: code,
                },
            }));
            store.state.verificationStatus = store.VERIFIED;
            if (!(user === null || user === void 0 ? void 0 : user.verified)) {
                throw { message: wp.i18n.__('Verification code is not valid. Please try again.', 'surecart') };
            }
            // Update the nonce after login to prevent rest_cookie_invalid_nonce errors.
            // @ts-ignore - nonceMiddleware is set in fetch.ts but not in @wordpress/api-fetch types.
            if ((user === null || user === void 0 ? void 0 : user.nonce) && index$2.apiFetch.nonceMiddleware) {
                // @ts-ignore
                index$2.apiFetch.nonceMiddleware.nonce = user.nonce;
            }
            // Update userState and make the user as logged in user.
            store.state.loggedIn = true;
            store.state.name = (user === null || user === void 0 ? void 0 : user.name) || [(_a = user === null || user === void 0 ? void 0 : user.customer) === null || _a === void 0 ? void 0 : _a.first_name, (_b = user === null || user === void 0 ? void 0 : user.customer) === null || _b === void 0 ? void 0 : _b.last_name].filter(Boolean).join(' ') || '';
            store.state.avatarUrl = (user === null || user === void 0 ? void 0 : user.avatar_url) || '';
            index$1.speak(wp.i18n.__('Verification is successful. Please continue your purchase.', 'surecart'), 'assertive');
        }
        catch (e) {
            // If cooldown has elapsed, treat as expired code.
            if (this.resendCooldown <= 0) {
                store.state.verificationStatus = store.CODE_EXPIRED;
                this.error = '';
                index$1.speak(wp.i18n.__('Code expired. Please send a new code.', 'surecart'), 'assertive');
            }
            else if (util.isRateLimited(e)) {
                this.error = wp.i18n.__('Please wait a moment and try again.', 'surecart');
                store.state.verificationStatus = store.UNVERIFIED;
                index$1.speak(this.error, 'assertive');
            }
            else {
                if (e.code === 'not_found') {
                    this.error = wp.i18n.__('Incorrect code. Please try again.', 'surecart');
                }
                else {
                    this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Incorrect code. Please try again.', 'surecart');
                }
                store.state.verificationStatus = store.UNVERIFIED;
                index$1.speak(this.error, 'assertive');
            }
        }
        finally {
            this.busy = false;
        }
    }
    async resendCode() {
        try {
            this.error = '';
            this.codeResending = true;
            index$1.speak(wp.i18n.__('Sending code...', 'surecart'), 'assertive');
            const response = await index$2.apiFetch({
                method: 'POST',
                path: 'surecart/v1/verification_codes',
                data: {
                    login: store.state.email,
                    checkout_mode: mutations.state.mode,
                },
            });
            // An in-window request resumes the existing code — don't announce a new email.
            index$1.speak((response === null || response === void 0 ? void 0 : response.email_sent) === false ? wp.i18n.__('A code was already sent to your email.', 'surecart') : wp.i18n.__('Code sent', 'surecart'), 'assertive');
            store.state.verificationStatus = store.UNVERIFIED;
            // Always anchor a fresh window (falls back to default if platform omits it).
            store.state.resendAvailableAt = verification.resendAnchorFrom(response === null || response === void 0 ? void 0 : response.resend_available_in);
            this.startCooldown();
        }
        catch (e) {
            console.error(e);
            this.handleCodeSendError(e);
        }
        finally {
            this.codeResending = false;
        }
    }
    handleCodeSendError(error) {
        // 429: switch to password (different endpoint, no limit conflict).
        if (util.isRateLimited(error)) {
            this.mode = 'password';
            this.codeUnavailable = true;
            this.error = wp.i18n.__('Please sign in with your password to continue.', 'surecart');
            this.startCooldown();
            return;
        }
        const blockedSeconds = verification.getBlockedDuplicateSeconds(error);
        ((error === null || error === void 0 ? void 0 : error.additional_errors) || []).forEach((e) => {
            if ((e === null || e === void 0 ? void 0 : e.code) === 'verification_code.email.blocked_duplicate') {
                this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('A code was recently sent to you. Please wait before requesting another.', 'surecart');
                // Resume from the platform's reported backoff window (default if absent).
                store.state.resendAvailableAt = verification.resendAnchorFrom(blockedSeconds);
                this.startCooldown();
            }
        });
    }
    /** Seconds left in the cooldown, always derived from the (decaying) anchor timestamp. */
    remainingCooldown() {
        return verification.secondsUntil(store.state.resendAvailableAt);
    }
    startCooldown() {
        clearInterval(this.cooldownInterval);
        // Guarantee a concrete anchor so the countdown always decays to 0 and the
        // resend link returns — never a stuck constant.
        if (store.state.resendAvailableAt == null) {
            store.state.resendAvailableAt = verification.resendAnchorFrom(verification.RESEND_COOLDOWN_SECONDS);
        }
        this.resendCooldown = this.remainingCooldown();
        if (this.resendCooldown <= 0)
            return;
        // Recompute from the anchor each tick so the timer stays correct even if the
        // tab was backgrounded (throttled intervals) or the page was reloaded.
        this.cooldownInterval = setInterval(() => {
            this.resendCooldown = this.remainingCooldown();
            if (this.resendCooldown <= 0) {
                clearInterval(this.cooldownInterval);
                this.cooldownInterval = null;
                index$1.speak(wp.i18n.__('You can resend the code now.', 'surecart'), 'assertive');
            }
        }, 1000);
    }
    componentWillLoad() {
        this.mode = this.initialMode;
        // initialMode='password' means the parent already 429'd on code-send.
        this.codeUnavailable = this.initialMode === 'password';
        this.startCooldown();
    }
    /** When the user switches views, focus that view's first field after it renders. */
    handleModeChange() {
        this.focusAfterRender = true;
    }
    componentDidRender() {
        var _a, _b, _c, _d;
        if (!this.focusAfterRender)
            return;
        this.focusAfterRender = false;
        // Wait for the freshly rendered child to be ready, then focus it.
        if (this.mode === 'password') {
            (_b = (_a = this.passwordInput) === null || _a === void 0 ? void 0 : _a.componentOnReady) === null || _b === void 0 ? void 0 : _b.call(_a).then(() => { var _a; return (_a = this.passwordInput) === null || _a === void 0 ? void 0 : _a.triggerFocus(); });
        }
        else {
            (_d = (_c = this.verificationCode) === null || _c === void 0 ? void 0 : _c.componentOnReady) === null || _d === void 0 ? void 0 : _d.call(_c).then(() => { var _a; return (_a = this.verificationCode) === null || _a === void 0 ? void 0 : _a.triggerFocus(); });
        }
    }
    disconnectedCallback() {
        clearInterval(this.cooldownInterval);
    }
    async loginByPassword(e) {
        e.preventDefault();
        try {
            this.error = '';
            this.busy = true;
            const { name, email, avatar_url, nonce } = (await index$2.apiFetch({
                method: 'POST',
                path: 'surecart/v1/login',
                data: {
                    login: store.state.email,
                    password: this.password,
                },
            }));
            // Update the nonce after login to prevent rest_cookie_invalid_nonce errors.
            // @ts-ignore - nonceMiddleware is set in fetch.ts but not in @wordpress/api-fetch types.
            if (nonce && index$2.apiFetch.nonceMiddleware) {
                // @ts-ignore
                index$2.apiFetch.nonceMiddleware.nonce = nonce;
            }
            store.state.loggedIn = true;
            store.state.verificationStatus = store.VERIFIED;
            store.state.name = name;
            store.state.email = email;
            store.state.avatarUrl = avatar_url || '';
        }
        catch (e) {
            this.error = util.isRateLimited(e) ? wp.i18n.__('Please wait a moment and try again.', 'surecart') : (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Login failed. Please try again.', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    renderSentInfo() {
        // Don't claim a code was sent if we 429'd before it left.
        const headline = this.codeUnavailable ? wp.i18n.__('Signing in as', 'surecart') : wp.i18n.__('Code sent to', 'surecart');
        const iconName = this.codeUnavailable ? 'user' : 'mail';
        return (index.h("div", { class: "customer-code__sent-info" }, index.h("sc-icon", { name: iconName, class: "customer-code__mail-icon", "aria-hidden": "true" }), index.h("span", null, headline, " ", index.h("strong", { class: "customer-code__sent-email" }, store.state.email)), index.h("a", { href: "#", class: "customer-code__change-link", onClick: e => {
                e.preventDefault();
                store.resetUser();
            } }, wp.i18n.__('Change', 'surecart'))));
    }
    renderCodeFooter() {
        const isExpired = store.state.verificationStatus === store.CODE_EXPIRED;
        return (index.h("div", { class: "customer-code__footer" }, index.h("div", { class: "customer-code__footer-left" }, !isExpired && this.resendCooldown > 0 && (index.h("span", { class: "customer-code__resend-timer" }, wp.i18n.__('Resend code in', 'surecart'), " ", this.formatCooldown())), !isExpired && this.resendCooldown <= 0 && (index.h("a", { href: "#", class: "customer-code__resend-link", onClick: e => {
                e.preventDefault();
                this.resendCode();
            } }, this.codeResending ? wp.i18n.__('Sending...', 'surecart') : wp.i18n.__('Resend Code', 'surecart')))), index.h("div", { class: "customer-code__footer-right" }, index.h("a", { href: "#", class: "customer-code__mode-link", onClick: e => {
                e.preventDefault();
                this.error = '';
                this.mode = 'password';
            } }, index.h("sc-icon", { name: "lock", "aria-hidden": "true" }), wp.i18n.__('Use Password', 'surecart')))));
    }
    renderPasswordView() {
        return (index.h("div", { class: "customer-password" }, this.renderSentInfo(), index.h("sc-flex", { alignItems: "center" }, index.h("sc-input", { ref: el => (this.passwordInput = el), type: "password", style: { flex: '1' }, placeholder: wp.i18n.__('Password', 'surecart'), required: true, disabled: this.busy, onScInput: (e) => (this.password = e.target.value), onKeyDown: (e) => {
                if (e.key === 'Enter') {
                    this.loginByPassword(e);
                }
            } }), index.h("sc-button", { size: "medium", type: "primary", loading: this.busy, onClick: (e) => this.loginByPassword(e) }, index.h("sc-icon", { slot: "prefix", name: "lock" }), "\u00A0", wp.i18n.__('Login', 'surecart'))), !!(this.error || this.codeError) && index.h("p", { class: "customer-password__error", role: "alert", innerHTML: this.error || this.codeError }), !this.codeUnavailable && (index.h("div", { class: "customer-code__footer" }, index.h("div", { class: "customer-code__footer-left" }), index.h("div", { class: "customer-code__footer-right" }, index.h("a", { href: "#", class: "customer-code__mode-link", onClick: e => {
                e.preventDefault();
                this.error = '';
                this.mode = 'code';
            } }, index.h("sc-icon", { name: "key", "aria-hidden": "true" }), wp.i18n.__('Use Login Code', 'surecart')))))));
    }
    renderCodeView() {
        const isExpired = store.state.verificationStatus === store.CODE_EXPIRED;
        const isVerifying = store.state.verificationStatus === store.VERIFYING;
        return (index.h("div", { class: "customer-code" }, this.renderSentInfo(), index.h("div", null, index.h("sc-verification-code", { ref: el => (this.verificationCode = el), total: 6, loading: this.busy, onChange: ((value) => this.verifyCode(value)) })), isVerifying && (index.h("div", { class: "customer-code__verifying" }, index.h("sc-spinner", null), index.h("span", null, wp.i18n.__('Verifying...', 'surecart')))), isExpired && (index.h("p", { class: "customer-code__expired", role: "alert" }, wp.i18n.__('Code expired.', 'surecart'), ' ', index.h("a", { href: "#", onClick: e => {
                e.preventDefault();
                this.resendCode();
            } }, wp.i18n.__('Send new code', 'surecart')))), !isExpired && (!!this.error || !!this.codeError) && index.h("p", { class: "customer-code__error", role: "alert", innerHTML: this.error || this.codeError }), this.renderCodeFooter()));
    }
    render() {
        return (index.h(index.Host, { key: '6060769aa096e03774f0b4dea7a81082cf5adeaf' }, index.h("div", { key: '348c822b81d84c15b5dcba5cf080e1cd3047901a', class: "customer-login" }, this.mode === 'code' ? this.renderCodeView() : this.renderPasswordView())));
    }
    static get watchers() { return {
        "mode": ["handleModeChange"]
    }; }
};
ScCustomerLogin.style = ScCustomerLoginStyle0;

exports.sc_avatar = ScAvatar;
exports.sc_customer_login = ScCustomerLogin;

//# sourceMappingURL=sc-avatar_2.cjs.entry.js.map