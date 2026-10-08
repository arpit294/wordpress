'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');

const scProvisionalBannerCss = ".sc-banner{background-color:var(--sc-color-brand-primary);color:white;display:flex;align-items:center;justify-content:center}.sc-banner>p{font-size:14px;line-height:1;margin:var(--sc-spacing-small)}.sc-banner>p a{color:inherit;font-weight:600;margin-left:10px;display:inline-flex;align-items:center;gap:8px;text-decoration:none;border-bottom:1px solid;padding-bottom:2px}";
const ScProvisionalBannerStyle0 = scProvisionalBannerCss;

const ScProvisionalBanner = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.claimUrl = '';
        this.expired = false;
    }
    render() {
        return (index.h("div", { key: '503a53298166848572fb806ba2daa97f288c3eed', class: { 'sc-banner': true } }, index.h("p", { key: '7523afd8a089aec9205a54c5046e7290453f5b93' }, this.expired
            ? wp.i18n.__('The setup window for your store has expired. Please contact support to complete your setup.', 'surecart')
            : wp.i18n.__('Complete your store setup to go live.', 'surecart'), !this.expired && (index.h("a", { key: '742bf9c3f659583e0ecd671f087961fcee045b21', href: this.claimUrl, target: "_blank", rel: "noopener noreferrer" }, wp.i18n.__('Complete Setup', 'surecart'), " ", index.h("sc-icon", { key: 'd5a90ea4ebbdad676e919a8e24503721b58929bc', name: "arrow-right" }))))));
    }
};
ScProvisionalBanner.style = ScProvisionalBannerStyle0;

exports.sc_provisional_banner = ScProvisionalBanner;

//# sourceMappingURL=sc-provisional-banner.cjs.entry.js.map