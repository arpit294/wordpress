import { r as registerInstance, h } from './index-25e5af33.js';

const ScPaymentMethodDetails = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.paymentMethod = undefined;
        this.editHandler = undefined;
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return (h("sc-card", { key: '5fa4bdf161df8475df33d826cdf29392c8ea3670' }, h("sc-flex", { key: 'ff3ecc5c68791f3e5665f00e9798edf585d26cab', alignItems: "center", justifyContent: "flex-start", style: { gap: '0.5em' } }, h("sc-payment-method", { key: '8356c54e0eab39de2cdb8c7aaaa3c9112f03dcd1', paymentMethod: this.paymentMethod }), h("div", { key: '084790ca47afde569f74dd67c0052b6f1e34f26c' }, !!((_b = (_a = this.paymentMethod) === null || _a === void 0 ? void 0 : _a.card) === null || _b === void 0 ? void 0 : _b.exp_month) && (h("span", { key: '56c3f27108b8f4756681e39cb5e0848168c6f013' }, 
        // Translators: %d/%d is month and year of expiration.
        wp.i18n.sprintf(wp.i18n.__('Exp. %d/%d', 'surecart'), (_d = (_c = this.paymentMethod) === null || _c === void 0 ? void 0 : _c.card) === null || _d === void 0 ? void 0 : _d.exp_month, (_f = (_e = this.paymentMethod) === null || _e === void 0 ? void 0 : _e.card) === null || _f === void 0 ? void 0 : _f.exp_year))), !!((_h = (_g = this.paymentMethod) === null || _g === void 0 ? void 0 : _g.paypal_account) === null || _h === void 0 ? void 0 : _h.email) && ((_k = (_j = this.paymentMethod) === null || _j === void 0 ? void 0 : _j.paypal_account) === null || _k === void 0 ? void 0 : _k.email)), h("sc-button", { key: 'a5f3ce8d018fc35b9f0f69ba7e54a66d226ee08f', type: "text", circle: true, onClick: this.editHandler }, h("sc-icon", { key: 'c86b5bf9b9ec06e949d32d33c365ce3887831864', name: "edit-2" })))));
    }
};

export { ScPaymentMethodDetails as sc_payment_method_details };

//# sourceMappingURL=sc-payment-method-details.entry.js.map