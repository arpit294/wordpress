'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');

const scTestModeInfoCss = "sc-test-mode-info .sc-test-mode-info-content ol{padding-left:1em;margin:0;font-size:12px}sc-test-mode-info .sc-test-mode-info-content ol img{width:320px;margin-top:12px}sc-test-mode-info .sc-test-mode-info-content ul{padding-left:1em}sc-test-mode-info .sc-test-mode-info-footer{display:flex;justify-content:space-between}sc-test-mode-info .sc-test-mode-info-footer sc-button>sc-icon{margin-left:4px}sc-test-mode-info .sc-test-mode-info-footer>span{font-size:var(--sc-button-font-size-small);align-content:center;opacity:0.75}sc-test-mode-info sc-popover{--panel-width:25em}#wpadminbar #wp-admin-bar-sc_change_checkout_mode>.ab-item:before{content:\"\\f186\"/\"\";top:2px}";
const ScTestModeInfoStyle0 = scTestModeInfoCss;

const ScTestModeInfo = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        var _a, _b;
        return (index.h("sc-popover", { key: 'ee435e9fa2fd9d4589dfd34185e8a0a95ebce390', skidding: 30 }, index.h("slot", { key: '67b53881457dffafa74c4a2f548affa06e670507', name: "trigger", slot: "trigger" }), index.h("span", { key: '0b702cb20d6904cee1acadbf6e9e92338e623f29', slot: "title" }, wp.i18n.__('How to switch from Test to Live mode', 'surecart')), index.h("div", { key: '2203a5ade84c678d5a663d68d4924eabbcc41f6c', class: "sc-test-mode-info-content", slot: "content" }, index.h("ol", { key: 'c157c5b0a3633e20cae9f8afa76549e396eae7bb' }, index.h("li", { key: '770622f87938b0e100c93b56e26fd2ed73eb1d1a' }, wp.i18n.__('From the Admin Bar', 'surecart'), index.h("ul", { key: '156c9ed6e8bc114ef75d3eb9d42fbd65cf7169a6' }, index.h("li", { key: 'd10d03934885da0bd3a27cc7a464ebcd81ddc92c' }, wp.i18n.__('Select any product & proceed to its checkout page.', 'surecart')), index.h("li", { key: '6ee936dbcda8fd42f88de502216fa5d8762587fe' }, wp.i18n.__('Access the dropdown menu & select the live mode.', 'surecart'))), index.h("img", { key: 'd8b1cedbcc8de328e447f872f2df8072a780380f', src: `${(_a = window === null || window === void 0 ? void 0 : window.scData) === null || _a === void 0 ? void 0 : _a.plugin_url}/images/change-from-adminbar.png`, alt: wp.i18n.__('Screenshot showing how to change mode from the admin bar', 'surecart') })), index.h("li", { key: 'a9242df68bf5aba41a2c274075aaac7d270bbd59' }, wp.i18n.__('From the Editor', 'surecart'), index.h("ul", { key: '59caacb779dbcd4e73ec2584cc38645929b7ead2' }, index.h("li", { key: 'f1f5db65326efd09e6c4a9227838684ef04e8611' }, wp.i18n.__('Navigate to the custom Forms section under SureCart.', 'surecart')), index.h("li", { key: 'bbd14c036ce12db9199c3ccb83db677e2ca40cde' }, wp.i18n.__('Select the checkout form.', 'surecart')), index.h("li", { key: '399a92789f00d9ad4b0b860485d944acb433d449' }, wp.i18n.__('Select "Live" from the dropdown. Hit Update!', 'surecart'))), index.h("img", { key: '3ef13b1722bf5eaa535ac5f02170bb8e60b28d48', src: `${(_b = window === null || window === void 0 ? void 0 : window.scData) === null || _b === void 0 ? void 0 : _b.plugin_url}/images/change-from-editor.png`, alt: wp.i18n.__('Screenshot showing how to change mode from the editor', 'surecart') })))), index.h("div", { key: 'bf5decd61d6bc773185e0e9dda3651d14988a301', class: "sc-test-mode-info-footer", slot: "footer" }, index.h("sc-button", { key: 'fffd4bcfca84e598362518c936544c1d6dc1ecca', size: "small", type: "link", target: "_blank", href: "https://surecart.com/docs/how-to-make-test-payments/" }, wp.i18n.__('Documentation ', 'surecart'), " ", index.h("sc-icon", { key: '6953c71f0ece39c956f0aa54cffe285143ae57b7', name: "external-link" })), index.h("sc-button", { key: 'bfafec7dff4dae7766c79e78ab14999519229827', size: "small", type: "link", target: "_blank", href: "https://surecart.com/contact-us/" }, wp.i18n.__('Open a ticket ', 'surecart'), " ", index.h("sc-icon", { key: 'ebc73a9f84c32591dd88053acf61c11a39b39134', name: "external-link" })))));
    }
};
ScTestModeInfo.style = ScTestModeInfoStyle0;

exports.sc_test_mode_info = ScTestModeInfo;

//# sourceMappingURL=sc-test-mode-info.cjs.entry.js.map