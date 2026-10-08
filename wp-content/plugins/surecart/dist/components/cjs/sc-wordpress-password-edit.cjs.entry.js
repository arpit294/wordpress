'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
require('./fetch-5e8dc1d5.js');
const index$1 = require('./index-7ced8198.js');
require('./add-query-args-49dcb630.js');
require('./remove-query-args-b57e8cd3.js');

const scWordpressPasswordEditCss = ":host{display:block;position:relative}";
const ScWordpressPasswordEditStyle0 = scWordpressPasswordEditCss;

const ScWordPressPasswordEdit = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.heading = undefined;
        this.successUrl = undefined;
        this.user = undefined;
        this.loading = undefined;
        this.error = undefined;
        this.enableValidation = true;
    }
    renderEmpty() {
        return index.h("slot", { name: "empty" }, wp.i18n.__('User not found.', 'surecart'));
    }
    validatePassword(password) {
        const regex = new RegExp('^(?=.*?[#?!@$%^&*-]).{6,}$');
        if (regex.test(password))
            return true;
        return false;
    }
    async handleSubmit(e) {
        this.loading = true;
        this.error = '';
        try {
            const { password } = await e.target.getFormJson();
            await index$1.apiFetch({
                path: `wp/v2/users/me`,
                method: 'PATCH',
                data: {
                    password,
                    meta: {
                        default_password_nag: false,
                    },
                },
            });
            if (this.successUrl) {
                window.location.assign(this.successUrl);
            }
            else {
                this.loading = false;
            }
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
            this.loading = false;
        }
    }
    render() {
        return (index.h("sc-dashboard-module", { key: 'c881acc344b4580369ba730cd0ce08269f39ae42', class: "customer-details", error: this.error }, index.h("span", { key: '9843ecaa9afae907fe336d734a6b69f6a5a911f4', slot: "heading" }, this.heading || wp.i18n.__('Update Password', 'surecart'), " "), index.h("slot", { key: '50f5ab5a275616414e3107222b1093991afd43f2', name: "end", slot: "end" }), index.h("sc-card", { key: 'b9d74aadbd5187c564cbd7d9b7b1af47607e17ac' }, index.h("sc-form", { key: 'a660942234c40734b46343908db26f887bd504cd', onScFormSubmit: e => this.handleSubmit(e) }, index.h("sc-password", { key: 'fc93d4c16fcc72ddaa167e277e3aebaafccaef72', enableValidation: this.enableValidation, label: wp.i18n.__('New Password', 'surecart'), name: "password", confirmation: true, required: true }), index.h("div", { key: '65451b39c0b092a542360fbee71ab656b52be3b4' }, index.h("sc-button", { key: '15f30b49d7472f02151c648dc6fbdeb61b539f49', type: "primary", full: true, submit: true }, wp.i18n.__('Update Password', 'surecart'))))), this.loading && index.h("sc-block-ui", { key: 'c2e3ea4322517a321a055e72db06ff75f4bcf8cf', spinner: true })));
    }
};
ScWordPressPasswordEdit.style = ScWordpressPasswordEditStyle0;

exports.sc_wordpress_password_edit = ScWordPressPasswordEdit;

//# sourceMappingURL=sc-wordpress-password-edit.cjs.entry.js.map