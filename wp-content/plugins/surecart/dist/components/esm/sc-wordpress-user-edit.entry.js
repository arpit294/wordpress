import { r as registerInstance, h } from './index-25e5af33.js';
import './fetch-cdff67be.js';
import { a as apiFetch } from './index-824c562b.js';
import './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';

const scWordpressUserEditCss = ":host{display:block;position:relative}.customer-details{display:grid;gap:0.75em}";
const ScWordpressUserEditStyle0 = scWordpressUserEditCss;

const ScWordPressUserEdit = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.heading = undefined;
        this.successUrl = undefined;
        this.user = undefined;
        this.loading = undefined;
        this.error = undefined;
    }
    renderEmpty() {
        return h("slot", { name: "empty" }, wp.i18n.__('User not found.', 'surecart'));
    }
    async handleSubmit(e) {
        this.loading = true;
        try {
            const { email, first_name, last_name, name } = await e.target.getFormJson();
            await apiFetch({
                path: `wp/v2/users/me`,
                method: 'PATCH',
                data: {
                    first_name,
                    last_name,
                    email,
                    name,
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
        var _a, _b, _c, _d;
        return (h("sc-dashboard-module", { key: '6e5b06fcf5bfce35a9e21de6dbc48b88fb9e1808', class: "account-details", error: this.error }, h("span", { key: 'fd5a46b5ecc2713dc9240477ec9e4de95d380e2f', slot: "heading" }, this.heading || wp.i18n.__('Account Details', 'surecart'), " "), h("sc-card", { key: '8806408cc64f3e3ddc794423b1374b4c33f9d25b' }, h("sc-form", { key: '0c09cd61f355bb76742d3f9dc9a5e1f0b65d45e5', onScFormSubmit: e => this.handleSubmit(e) }, h("sc-input", { key: '8c07911142f66b015a1534ce6836111b6e85379d', label: wp.i18n.__('Account Email', 'surecart'), name: "email", value: (_a = this.user) === null || _a === void 0 ? void 0 : _a.email, required: true }), h("sc-columns", { key: 'a2830c3561f2e4f115af3b3e785be56202654d7c', style: { '--sc-column-spacing': 'var(--sc-spacing-medium)' } }, h("sc-column", { key: '652117c5c6eb5d0ff8ece2ebb380a9b9fb7e825f' }, h("sc-input", { key: '0e4dbb97a9db9e779f32d51e691f54de886b6bfe', label: wp.i18n.__('First Name', 'surecart'), name: "first_name", value: (_b = this.user) === null || _b === void 0 ? void 0 : _b.first_name })), h("sc-column", { key: '8d7f8010ed0fbee12107b6899a26e012e4b22076' }, h("sc-input", { key: '980f15cb48144a186f2321bd660d937dfe9cc602', label: wp.i18n.__('Last Name', 'surecart'), name: "last_name", value: (_c = this.user) === null || _c === void 0 ? void 0 : _c.last_name }))), h("sc-input", { key: 'a2197a2cec709dd1bb5ab12b61ace8b16e45108f', label: wp.i18n.__('Display Name', 'surecart'), name: "name", value: (_d = this.user) === null || _d === void 0 ? void 0 : _d.display_name }), h("div", { key: 'd8df5a6efb40b059660610062b9214c66d999f03' }, h("sc-button", { key: 'e27309c7896dc67d54f56b3a135217e4c947dc47', type: "primary", full: true, submit: true }, wp.i18n.__('Save', 'surecart'))))), this.loading && h("sc-block-ui", { key: 'db276ffd2d473dab5d9bacb108218a4d575b13b4', spinner: true })));
    }
};
ScWordPressUserEdit.style = ScWordpressUserEditStyle0;

export { ScWordPressUserEdit as sc_wordpress_user_edit };

//# sourceMappingURL=sc-wordpress-user-edit.entry.js.map