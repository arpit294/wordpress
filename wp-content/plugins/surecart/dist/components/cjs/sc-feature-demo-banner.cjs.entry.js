'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');

const scFeatureDemoBannerCss = ".sc-banner{background-color:var(--sc-color-brand-primary);color:white;display:flex;align-items:center;justify-content:center}.sc-banner>p{font-size:14px;line-height:1;margin:var(--sc-spacing-small)}.sc-banner>p a{color:inherit;font-weight:600;margin-left:10px;display:inline-flex;align-items:center;gap:8px;text-decoration:none;border-bottom:1px solid;padding-bottom:2px}";
const ScFeatureDemoBannerStyle0 = scFeatureDemoBannerCss;

const ScFeatureDemoBanner = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.url = 'https://app.surecart.com/plans';
        this.buttonText = wp.i18n.__('Upgrade Your Plan', 'surecart');
    }
    render() {
        return (index.h("div", { key: 'c575395b860c0bda213ab911d3f19ea488eada42', class: { 'sc-banner': true } }, index.h("p", { key: '63d6148a3443cc4feefed0931997f816d42e0a8e' }, index.h("slot", { key: '156d650018a41c23f19776ad138e1ddd5aec5fdd' }, wp.i18n.__('This is a feature demo. In order to use it, you must upgrade your plan.', 'surecart')), index.h("a", { key: '8689b9313f74a5acee9013b4d10746a4f00908fd', href: this.url, target: "_blank" }, index.h("slot", { key: '2b0c5275c4ef7b81c0291fe1afd64ab5c4b680e4', name: "link" }, this.buttonText, " ", index.h("sc-icon", { key: '715c74b7932ebbe155e944cca8b4aa5be98a778e', name: "arrow-right" }))))));
    }
};
ScFeatureDemoBanner.style = ScFeatureDemoBannerStyle0;

exports.sc_feature_demo_banner = ScFeatureDemoBanner;

//# sourceMappingURL=sc-feature-demo-banner.cjs.entry.js.map