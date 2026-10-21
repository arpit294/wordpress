'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const mutations = require('./mutations-4133422f.js');
require('./index-c3de642f.js');
require('./utils-f5ea3c23.js');
require('./remove-query-args-b57e8cd3.js');
require('./add-query-args-49dcb630.js');
require('./index-fb76df07.js');
require('./google-8dbad1a6.js');
require('./currency-b438c76d.js');
require('./store-29627d6b.js');
require('./price-9dddd853.js');

const scCartLoaderCss = ":host{position:absolute;z-index:var(--sc-cart-z-index, 999999);font-family:var(--sc-font-sans)}";
const ScCartLoaderStyle0 = scCartLoaderCss;

const ScCartLoader = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.template = undefined;
    }
    render() {
        var _a;
        // check for forms.
        if (document.querySelector('sc-checkout')) {
            return;
        }
        // clear the order if it's already paid.
        if (((_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.status) === 'paid') {
            mutations.state.checkout = null;
            return null;
        }
        // return the loader.
        return index.h("div", { innerHTML: this.template || '' });
    }
};
ScCartLoader.style = ScCartLoaderStyle0;

exports.sc_cart_loader = ScCartLoader;

//# sourceMappingURL=sc-cart-loader.cjs.entry.js.map