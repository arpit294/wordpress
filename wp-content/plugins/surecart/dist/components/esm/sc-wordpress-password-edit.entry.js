import { r as registerInstance, h } from './index-25e5af33.js';
import './fetch-cdff67be.js';
import { a as apiFetch } from './index-824c562b.js';
import './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';

const scWordpressPasswordEditCss = ":host{display:block;position:relative}";
const ScWordpressPasswordEditStyle0 = scWordpressPasswordEditCss;

const ScWordPressPasswordEdit = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.heading = undefined;
        this.successUrl = undefined;
        this.user = undefined;
        this.loading = undefined;
        this.error = undefined;
        this.enableValidation = true;
    }
    renderEmpty() {
        return h("slot", { name: "empty" }, wp.i18n.__('User not found.', 'surecart'));
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
            await apiFetch({
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
        return (h("sc-dashboard-module", { key: 'c881acc344b4580369ba730cd0ce08269f39ae42', class: "customer-details", error: this.error }, h("span", { key: '9843ecaa9afae907fe336d734a6b69f6a5a911f4', slot: "heading" }, this.heading || wp.i18n.__('Update Password', 'surecart'), " "), h("slot", { key: '50f5ab5a275616414e3107222b1093991afd43f2', name: "end", slot: "end" }), h("sc-card", { key: 'b9d74aadbd5187c564cbd7d9b7b1af47607e17ac' }, h("sc-form", { key: 'a660942234c40734b46343908db26f887bd504cd', onScFormSubmit: e => this.handleSubmit(e) }, h("sc-password", { key: 'fc93d4c16fcc72ddaa167e277e3aebaafccaef72', enableValidation: this.enableValidation, label: wp.i18n.__('New Password', 'surecart'), name: "password", confirmation: true, required: true }), h("div", { key: '65451b39c0b092a542360fbee71ab656b52be3b4' }, h("sc-button", { key: '15f30b49d7472f02151c648dc6fbdeb61b539f49', type: "primary", full: true, submit: true }, wp.i18n.__('Update Password', 'surecart'))))), this.loading && h("sc-block-ui", { key: 'c2e3ea4322517a321a055e72db06ff75f4bcf8cf', spinner: true })));
    }
};
ScWordPressPasswordEdit.style = ScWordpressPasswordEditStyle0;

export { ScWordPressPasswordEdit as sc_wordpress_password_edit };

//# sourceMappingURL=sc-wordpress-password-edit.entry.js.map