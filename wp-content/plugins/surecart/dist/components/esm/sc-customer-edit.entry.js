import { r as registerInstance, h } from './index-25e5af33.js';
import './fetch-cdff67be.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import { a as apiFetch } from './index-824c562b.js';
import './remove-query-args-938c53ea.js';

const scCustomerEditCss = ":host{display:block;position:relative}.customer-edit{display:grid;gap:0.75em}";
const ScCustomerEditStyle0 = scCustomerEditCss;

const ScCustomerEdit = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.heading = undefined;
        this.customer = undefined;
        this.successUrl = undefined;
        this.loading = undefined;
        this.error = undefined;
    }
    async handleSubmit(e) {
        var _a, _b;
        this.loading = true;
        try {
            const { email, first_name, last_name, phone, billing_matches_shipping, shipping_name, shipping_city, 'tax_identifier.number_type': tax_identifier_number_type, 'tax_identifier.number': tax_identifier_number, shipping_country, shipping_line_1, shipping_line_2, shipping_postal_code, shipping_state, billing_name, billing_city, billing_country, billing_line_1, billing_line_2, billing_postal_code, billing_state, } = await e.target.getFormJson();
            this.customer.billing_address = {
                name: billing_name,
                city: billing_city,
                country: billing_country,
                line_1: billing_line_1,
                line_2: billing_line_2,
                postal_code: billing_postal_code,
                state: billing_state,
            };
            this.customer.shipping_address = {
                name: shipping_name,
                city: shipping_city,
                country: shipping_country,
                line_1: shipping_line_1,
                line_2: shipping_line_2,
                postal_code: shipping_postal_code,
                state: shipping_state,
            };
            await apiFetch({
                path: addQueryArgs(`surecart/v1/customers/${(_a = this.customer) === null || _a === void 0 ? void 0 : _a.id}`, { expand: ['tax_identifier'] }),
                method: 'PATCH',
                data: {
                    email,
                    first_name,
                    last_name,
                    phone,
                    billing_matches_shipping: billing_matches_shipping === true || billing_matches_shipping === 'on',
                    shipping_address: this.customer.shipping_address,
                    billing_address: this.customer.billing_address,
                    ...(tax_identifier_number && tax_identifier_number_type
                        ? {
                            tax_identifier: {
                                number: tax_identifier_number,
                                number_type: tax_identifier_number_type,
                            },
                        }
                        : {}),
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
            this.error = ((_b = e === null || e === void 0 ? void 0 : e.additional_errors) === null || _b === void 0 ? void 0 : _b.length) ? e.additional_errors.map(err => err.message).join(', ') : (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
            this.loading = false;
        }
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return (h("sc-dashboard-module", { key: 'c6bacca8172b883b3800cf92c5cd8fce86e66d77', class: "customer-edit", error: this.error }, h("span", { key: 'cfc1a002ad355a44475dcff3a01200f325f7f0b3', slot: "heading" }, this.heading || wp.i18n.__('Update Billing Details', 'surecart'), ' ', !((_a = this === null || this === void 0 ? void 0 : this.customer) === null || _a === void 0 ? void 0 : _a.live_mode) && (h("sc-tag", { key: 'a7118847773164fe43cd509e3be963f0d801c91d', type: "warning", size: "small" }, wp.i18n.__('Test', 'surecart')))), h("sc-card", { key: '60467b097cd3ba6b49d76f46e880f19651823646' }, h("sc-form", { key: '3b4c6d8948507c87ddc154b8975da893b42528f0', onScFormSubmit: e => this.handleSubmit(e) }, h("sc-columns", { key: 'e13f2dd5df747cc44ffe03f8d5222723fdfe1372', style: { '--sc-column-spacing': 'var(--sc-spacing-medium)' } }, h("sc-column", { key: 'b658fa8b300d2e288e134d2769da8a0510cdf485' }, h("sc-input", { key: '9a2a39d867eb07af6cb99aa0da9946785509f717', label: wp.i18n.__('First Name', 'surecart'), name: "first_name", value: (_b = this.customer) === null || _b === void 0 ? void 0 : _b.first_name })), h("sc-column", { key: '8f17a1db14009cdfebbf63649c256f91783ff7c5' }, h("sc-input", { key: 'bc2813abe345d81fd2d37fbc7af055f235b6949b', label: wp.i18n.__('Last Name', 'surecart'), name: "last_name", value: (_c = this.customer) === null || _c === void 0 ? void 0 : _c.last_name }))), h("sc-column", { key: '305b9803cd0dca593b20267c19c4225459cede00' }, h("sc-phone-input", { key: '841805f0d87f50ec654512d56fe120b505df9773', label: wp.i18n.__('Phone', 'surecart'), name: "phone", value: (_d = this.customer) === null || _d === void 0 ? void 0 : _d.phone })), h("sc-flex", { key: '9de2215a362a06551abedf8c5ea75b2c8840b6b5', style: { '--sc-flex-column-gap': 'var(--sc-spacing-medium)' }, flexDirection: "column" }, h("div", { key: '230dd857396a90dc6f4e54f284592e51e3589c84' }, h("sc-address", { key: '59c9058827229e63d7897e62eb8d68c2ed89a060', label: wp.i18n.__('Shipping Address', 'surecart'), showName: true, address: {
                ...(_e = this.customer) === null || _e === void 0 ? void 0 : _e.shipping_address,
            }, showLine2: true, required: false, names: {
                name: 'shipping_name',
                country: 'shipping_country',
                line_1: 'shipping_line_1',
                line_2: 'shipping_line_2',
                city: 'shipping_city',
                postal_code: 'shipping_postal_code',
                state: 'shipping_state',
            } })), h("div", { key: '366417b518efd8fbbe2a19132421c32301c39584' }, h("sc-checkbox", { key: '84f7d476997e7e8b31b280e2a6436d4e6c97a0b0', name: "billing_matches_shipping", checked: (_f = this.customer) === null || _f === void 0 ? void 0 : _f.billing_matches_shipping, onScChange: e => {
                this.customer = {
                    ...this.customer,
                    billing_matches_shipping: e.target.checked,
                };
            }, value: "on" }, wp.i18n.__('Billing address is same as shipping', 'surecart'))), h("div", { key: '28ce209691b41c21012b03e387d5dd4b5c067056', style: { display: ((_g = this.customer) === null || _g === void 0 ? void 0 : _g.billing_matches_shipping) ? 'none' : 'block' } }, h("sc-address", { key: '99da27a9c1d85ae8d3f9f35e77219cde8f94e189', label: wp.i18n.__('Billing Address', 'surecart'), showName: true, address: {
                ...(_h = this.customer) === null || _h === void 0 ? void 0 : _h.billing_address,
            }, showLine2: true, names: {
                name: 'billing_name',
                country: 'billing_country',
                line_1: 'billing_line_1',
                line_2: 'billing_line_2',
                city: 'billing_city',
                postal_code: 'billing_postal_code',
                state: 'billing_state',
            }, required: true })), h("sc-tax-id-input", { key: 'f98e34d4cefeda0ee44b4425c5994b78028b0e89', show: true, number: (_k = (_j = this.customer) === null || _j === void 0 ? void 0 : _j.tax_identifier) === null || _k === void 0 ? void 0 : _k.number, type: (_m = (_l = this.customer) === null || _l === void 0 ? void 0 : _l.tax_identifier) === null || _m === void 0 ? void 0 : _m.number_type })), h("div", { key: '5815e3f32fd75741c329ac5dc6d368c0af6bebd3' }, h("sc-button", { key: '39d33de10fe27ea699b830a14e687b01ce6f0b2f', type: "primary", full: true, submit: true }, wp.i18n.__('Save', 'surecart'))))), this.loading && h("sc-block-ui", { key: '9365017ae760a00735a81450d99ce4e7ff35f383', spinner: true })));
    }
};
ScCustomerEdit.style = ScCustomerEditStyle0;

export { ScCustomerEdit as sc_customer_edit };

//# sourceMappingURL=sc-customer-edit.entry.js.map