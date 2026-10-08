import { r as registerInstance, h, H as Host } from './index-25e5af33.js';
import { a as apiFetch } from './index-824c562b.js';
import { s as speak } from './index-c5a96d53.js';
import { s as state, V as VERIFYING, b as VERIFIED, a as CODE_EXPIRED, U as UNVERIFIED, r as resetUser } from './store-ea636731.js';
import { s as state$1 } from './mutations-54fc7af1.js';
import { b as isRateLimited } from './util-dfbf863e.js';
import { r as resendAnchorFrom, g as getBlockedDuplicateSeconds, s as secondsUntil, R as RESEND_COOLDOWN_SECONDS } from './verification-00df9439.js';
import './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';
import './index-18f5a1bc.js';
import './utils-2fd36c2c.js';
import './google-e9085e27.js';
import './currency-eb33deae.js';
import './store-fd165874.js';
import './price-39d60d32.js';

const scAvatarCss = ":host{display:inline-block;--sc-avatar-size:3rem}.avatar{display:inline-flex;align-items:center;justify-content:center;position:relative;width:var(--sc-avatar-size);height:var(--sc-avatar-size);background-color:var(--sc-color-gray-400);font-family:var(--sc-font-sans);font-size:calc(var(--sc-avatar-size) * 0.5);font-weight:var(--sc-font-weight-normal);color:var(--sc-color-white);user-select:none;vertical-align:middle}.avatar--circle,.avatar--circle .avatar__image{border-radius:var(--sc-border-radius-circle)}.avatar--rounded,.avatar--rounded .avatar__image{border-radius:var(--sc-border-radius-medium)}.avatar--square{border-radius:0}.avatar__icon{display:flex;align-items:center;justify-content:center;position:absolute;top:0;left:0;width:100%;height:100%}.avatar__initials{line-height:1;text-transform:uppercase}.avatar__image{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;overflow:hidden}";
const ScAvatarStyle0 = scAvatarCss;

const ScAvatar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h("div", { key: 'da737fda47d527e7ce56312e652d33f61aa3610e', part: "base", class: {
                'avatar': true,
                'avatar--circle': this.shape === 'circle',
                'avatar--rounded': this.shape === 'rounded',
                'avatar--square': this.shape === 'square',
            }, role: "img", "aria-label": this.label }, this.initials ? (h("div", { part: "initials", class: "avatar__initials" }, this.initials)) : (h("div", { part: "icon", class: "avatar__icon", "aria-hidden": "true" }, h("slot", { name: "icon" }, h("sl-icon", { name: "person-fill", library: "system" })))), this.image && !this.hasError && h("img", { key: '8c4a6a63796d5bf64de09ac67210da1227977d57', part: "image", class: "avatar__image", src: this.image, loading: this.loading, alt: "", onError: () => (this.hasError = true) })));
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
        registerInstance(this, hostRef);
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
        if (!state.email || !code) {
            return;
        }
        try {
            this.error = '';
            state.verificationStatus = VERIFYING;
            this.busy = true;
            speak(wp.i18n.__('Verifying code...', 'surecart'), 'assertive');
            const user = (await apiFetch({
                method: 'POST',
                path: 'surecart/v1/verification_codes/verify',
                data: {
                    login: state.email,
                    code: code,
                },
            }));
            state.verificationStatus = VERIFIED;
            if (!(user === null || user === void 0 ? void 0 : user.verified)) {
                throw { message: wp.i18n.__('Verification code is not valid. Please try again.', 'surecart') };
            }
            // Update the nonce after login to prevent rest_cookie_invalid_nonce errors.
            // @ts-ignore - nonceMiddleware is set in fetch.ts but not in @wordpress/api-fetch types.
            if ((user === null || user === void 0 ? void 0 : user.nonce) && apiFetch.nonceMiddleware) {
                // @ts-ignore
                apiFetch.nonceMiddleware.nonce = user.nonce;
            }
            // Update userState and make the user as logged in user.
            state.loggedIn = true;
            state.name = (user === null || user === void 0 ? void 0 : user.name) || [(_a = user === null || user === void 0 ? void 0 : user.customer) === null || _a === void 0 ? void 0 : _a.first_name, (_b = user === null || user === void 0 ? void 0 : user.customer) === null || _b === void 0 ? void 0 : _b.last_name].filter(Boolean).join(' ') || '';
            state.avatarUrl = (user === null || user === void 0 ? void 0 : user.avatar_url) || '';
            speak(wp.i18n.__('Verification is successful. Please continue your purchase.', 'surecart'), 'assertive');
        }
        catch (e) {
            // If cooldown has elapsed, treat as expired code.
            if (this.resendCooldown <= 0) {
                state.verificationStatus = CODE_EXPIRED;
                this.error = '';
                speak(wp.i18n.__('Code expired. Please send a new code.', 'surecart'), 'assertive');
            }
            else if (isRateLimited(e)) {
                this.error = wp.i18n.__('Please wait a moment and try again.', 'surecart');
                state.verificationStatus = UNVERIFIED;
                speak(this.error, 'assertive');
            }
            else {
                if (e.code === 'not_found') {
                    this.error = wp.i18n.__('Incorrect code. Please try again.', 'surecart');
                }
                else {
                    this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Incorrect code. Please try again.', 'surecart');
                }
                state.verificationStatus = UNVERIFIED;
                speak(this.error, 'assertive');
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
            speak(wp.i18n.__('Sending code...', 'surecart'), 'assertive');
            const response = await apiFetch({
                method: 'POST',
                path: 'surecart/v1/verification_codes',
                data: {
                    login: state.email,
                    checkout_mode: state$1.mode,
                },
            });
            // An in-window request resumes the existing code — don't announce a new email.
            speak((response === null || response === void 0 ? void 0 : response.email_sent) === false ? wp.i18n.__('A code was already sent to your email.', 'surecart') : wp.i18n.__('Code sent', 'surecart'), 'assertive');
            state.verificationStatus = UNVERIFIED;
            // Always anchor a fresh window (falls back to default if platform omits it).
            state.resendAvailableAt = resendAnchorFrom(response === null || response === void 0 ? void 0 : response.resend_available_in);
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
        if (isRateLimited(error)) {
            this.mode = 'password';
            this.codeUnavailable = true;
            this.error = wp.i18n.__('Please sign in with your password to continue.', 'surecart');
            this.startCooldown();
            return;
        }
        const blockedSeconds = getBlockedDuplicateSeconds(error);
        ((error === null || error === void 0 ? void 0 : error.additional_errors) || []).forEach((e) => {
            if ((e === null || e === void 0 ? void 0 : e.code) === 'verification_code.email.blocked_duplicate') {
                this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('A code was recently sent to you. Please wait before requesting another.', 'surecart');
                // Resume from the platform's reported backoff window (default if absent).
                state.resendAvailableAt = resendAnchorFrom(blockedSeconds);
                this.startCooldown();
            }
        });
    }
    /** Seconds left in the cooldown, always derived from the (decaying) anchor timestamp. */
    remainingCooldown() {
        return secondsUntil(state.resendAvailableAt);
    }
    startCooldown() {
        clearInterval(this.cooldownInterval);
        // Guarantee a concrete anchor so the countdown always decays to 0 and the
        // resend link returns — never a stuck constant.
        if (state.resendAvailableAt == null) {
            state.resendAvailableAt = resendAnchorFrom(RESEND_COOLDOWN_SECONDS);
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
                speak(wp.i18n.__('You can resend the code now.', 'surecart'), 'assertive');
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
            const { name, email, avatar_url, nonce } = (await apiFetch({
                method: 'POST',
                path: 'surecart/v1/login',
                data: {
                    login: state.email,
                    password: this.password,
                },
            }));
            // Update the nonce after login to prevent rest_cookie_invalid_nonce errors.
            // @ts-ignore - nonceMiddleware is set in fetch.ts but not in @wordpress/api-fetch types.
            if (nonce && apiFetch.nonceMiddleware) {
                // @ts-ignore
                apiFetch.nonceMiddleware.nonce = nonce;
            }
            state.loggedIn = true;
            state.verificationStatus = VERIFIED;
            state.name = name;
            state.email = email;
            state.avatarUrl = avatar_url || '';
        }
        catch (e) {
            this.error = isRateLimited(e) ? wp.i18n.__('Please wait a moment and try again.', 'surecart') : (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Login failed. Please try again.', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    renderSentInfo() {
        // Don't claim a code was sent if we 429'd before it left.
        const headline = this.codeUnavailable ? wp.i18n.__('Signing in as', 'surecart') : wp.i18n.__('Code sent to', 'surecart');
        const iconName = this.codeUnavailable ? 'user' : 'mail';
        return (h("div", { class: "customer-code__sent-info" }, h("sc-icon", { name: iconName, class: "customer-code__mail-icon", "aria-hidden": "true" }), h("span", null, headline, " ", h("strong", { class: "customer-code__sent-email" }, state.email)), h("a", { href: "#", class: "customer-code__change-link", onClick: e => {
                e.preventDefault();
                resetUser();
            } }, wp.i18n.__('Change', 'surecart'))));
    }
    renderCodeFooter() {
        const isExpired = state.verificationStatus === CODE_EXPIRED;
        return (h("div", { class: "customer-code__footer" }, h("div", { class: "customer-code__footer-left" }, !isExpired && this.resendCooldown > 0 && (h("span", { class: "customer-code__resend-timer" }, wp.i18n.__('Resend code in', 'surecart'), " ", this.formatCooldown())), !isExpired && this.resendCooldown <= 0 && (h("a", { href: "#", class: "customer-code__resend-link", onClick: e => {
                e.preventDefault();
                this.resendCode();
            } }, this.codeResending ? wp.i18n.__('Sending...', 'surecart') : wp.i18n.__('Resend Code', 'surecart')))), h("div", { class: "customer-code__footer-right" }, h("a", { href: "#", class: "customer-code__mode-link", onClick: e => {
                e.preventDefault();
                this.error = '';
                this.mode = 'password';
            } }, h("sc-icon", { name: "lock", "aria-hidden": "true" }), wp.i18n.__('Use Password', 'surecart')))));
    }
    renderPasswordView() {
        return (h("div", { class: "customer-password" }, this.renderSentInfo(), h("sc-flex", { alignItems: "center" }, h("sc-input", { ref: el => (this.passwordInput = el), type: "password", style: { flex: '1' }, placeholder: wp.i18n.__('Password', 'surecart'), required: true, disabled: this.busy, onScInput: (e) => (this.password = e.target.value), onKeyDown: (e) => {
                if (e.key === 'Enter') {
                    this.loginByPassword(e);
                }
            } }), h("sc-button", { size: "medium", type: "primary", loading: this.busy, onClick: (e) => this.loginByPassword(e) }, h("sc-icon", { slot: "prefix", name: "lock" }), "\u00A0", wp.i18n.__('Login', 'surecart'))), !!(this.error || this.codeError) && h("p", { class: "customer-password__error", role: "alert", innerHTML: this.error || this.codeError }), !this.codeUnavailable && (h("div", { class: "customer-code__footer" }, h("div", { class: "customer-code__footer-left" }), h("div", { class: "customer-code__footer-right" }, h("a", { href: "#", class: "customer-code__mode-link", onClick: e => {
                e.preventDefault();
                this.error = '';
                this.mode = 'code';
            } }, h("sc-icon", { name: "key", "aria-hidden": "true" }), wp.i18n.__('Use Login Code', 'surecart')))))));
    }
    renderCodeView() {
        const isExpired = state.verificationStatus === CODE_EXPIRED;
        const isVerifying = state.verificationStatus === VERIFYING;
        return (h("div", { class: "customer-code" }, this.renderSentInfo(), h("div", null, h("sc-verification-code", { ref: el => (this.verificationCode = el), total: 6, loading: this.busy, onChange: ((value) => this.verifyCode(value)) })), isVerifying && (h("div", { class: "customer-code__verifying" }, h("sc-spinner", null), h("span", null, wp.i18n.__('Verifying...', 'surecart')))), isExpired && (h("p", { class: "customer-code__expired", role: "alert" }, wp.i18n.__('Code expired.', 'surecart'), ' ', h("a", { href: "#", onClick: e => {
                e.preventDefault();
                this.resendCode();
            } }, wp.i18n.__('Send new code', 'surecart')))), !isExpired && (!!this.error || !!this.codeError) && h("p", { class: "customer-code__error", role: "alert", innerHTML: this.error || this.codeError }), this.renderCodeFooter()));
    }
    render() {
        return (h(Host, { key: '6060769aa096e03774f0b4dea7a81082cf5adeaf' }, h("div", { key: '348c822b81d84c15b5dcba5cf080e1cd3047901a', class: "customer-login" }, this.mode === 'code' ? this.renderCodeView() : this.renderPasswordView())));
    }
    static get watchers() { return {
        "mode": ["handleModeChange"]
    }; }
};
ScCustomerLogin.style = ScCustomerLoginStyle0;

export { ScAvatar as sc_avatar, ScCustomerLogin as sc_customer_login };

//# sourceMappingURL=sc-avatar_2.entry.js.map