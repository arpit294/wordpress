import { r as registerInstance, h, F as Fragment } from './index-25e5af33.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';

const scWordpressUserCss = ":host{display:block;position:relative}.customer-details{display:grid;gap:0.75em}";
const ScWordpressUserStyle0 = scWordpressUserCss;

const ScWordPressUser = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.heading = undefined;
        this.user = undefined;
    }
    renderContent() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!this.user) {
            return this.renderEmpty();
        }
        return (h(Fragment, null, !!((_a = this === null || this === void 0 ? void 0 : this.user) === null || _a === void 0 ? void 0 : _a.display_name) && (h("sc-stacked-list-row", { style: { '--columns': '3' }, mobileSize: 480 }, h("div", null, h("strong", null, wp.i18n.__('Display Name', 'surecart'))), h("div", null, (_b = this.user) === null || _b === void 0 ? void 0 : _b.display_name), h("div", null))), !!((_c = this === null || this === void 0 ? void 0 : this.user) === null || _c === void 0 ? void 0 : _c.email) && (h("sc-stacked-list-row", { style: { '--columns': '3' }, mobileSize: 480 }, h("div", null, h("strong", null, wp.i18n.__('Account Email', 'surecart'))), h("div", null, (_d = this.user) === null || _d === void 0 ? void 0 : _d.email), h("div", null))), !!((_e = this === null || this === void 0 ? void 0 : this.user) === null || _e === void 0 ? void 0 : _e.first_name) && (h("sc-stacked-list-row", { style: { '--columns': '3' }, mobileSize: 480 }, h("div", null, h("strong", null, wp.i18n.__('First Name', 'surecart'))), h("div", null, (_f = this.user) === null || _f === void 0 ? void 0 : _f.first_name), h("div", null))), !!((_g = this === null || this === void 0 ? void 0 : this.user) === null || _g === void 0 ? void 0 : _g.last_name) && (h("sc-stacked-list-row", { style: { '--columns': '3' }, mobileSize: 480 }, h("div", null, h("strong", null, wp.i18n.__('Last Name', 'surecart'))), h("div", null, (_h = this.user) === null || _h === void 0 ? void 0 : _h.last_name), h("div", null)))));
    }
    renderEmpty() {
        return h("slot", { name: "empty" }, wp.i18n.__('User not found.', 'surecart'));
    }
    render() {
        return (h("sc-dashboard-module", { key: 'b7ef2c81a275ee66f36d7499bcdb3bc6ace5dd07', class: "customer-details" }, h("span", { key: 'c6c89c0330fe66a1d80e8f8bb7bf6da98fd620e2', slot: "heading" }, this.heading || wp.i18n.__('Account Details', 'surecart'), " "), h("sc-button", { key: '4e7fb2eb1af53f56d33c9f695dc1b457acb68f94', type: "link", href: addQueryArgs(window.location.href, {
                action: 'edit',
                model: 'user',
            }), slot: "end" }, h("sc-icon", { key: '921a25580bbf97d287a93c3d26c0b1d1ac2f3751', name: "edit-3", slot: "prefix" }), wp.i18n.__('Update', 'surecart')), h("sc-card", { key: '18b6fa94b5695a9b7e513cfb0b4fc8f8656ce4c0', "no-padding": true }, h("sc-stacked-list", { key: '5a5bc7c182c914fb6d603e422f4d34c8538d5c1f' }, this.renderContent()))));
    }
};
ScWordPressUser.style = ScWordpressUserStyle0;

export { ScWordPressUser as sc_wordpress_user };

//# sourceMappingURL=sc-wordpress-user.entry.js.map