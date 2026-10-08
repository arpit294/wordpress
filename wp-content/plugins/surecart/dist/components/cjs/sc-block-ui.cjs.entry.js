'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');

const scBlockUiCss = ":host{display:block;position:var(--sc-block-ui-position, absolute);top:-5px;left:-5px;right:-5px;bottom:-5px;overflow:hidden;display:flex;align-items:center;justify-content:center}:host>*{z-index:1}:host:after{content:\"\";position:var(--sc-block-ui-position, absolute);top:0;left:0;right:0;bottom:0;cursor:var(--sc-block-ui-cursor, wait);background:var(--sc-block-ui-background-color, var(--sc-color-white));opacity:var(--sc-block-ui-opacity, 0.15)}:host.transparent:after{background:transparent}.overlay__content{font-size:var(--sc-font-size-large);font-weight:var(--sc-font-weight-semibold);display:grid;gap:0.5em;text-align:center}";
const ScBlockUiStyle0 = scBlockUiCss;

const ScBlockUi = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.zIndex = 1;
        this.transparent = undefined;
        this.spinner = undefined;
    }
    render() {
        return (index.h("div", { key: 'c4d3c484d28607f990b0c0fb4d777fc99a0c1b42', part: "base", class: { overlay: true, transparent: this.transparent }, style: { 'z-index': this.zIndex.toString() } }, index.h("div", { key: '40ed68918d30c654123ec892b34358aa6d3b3ea9', class: "overlay__content", part: "content" }, index.h("slot", { key: '18a1bbb7f3fceb4ebf84a70df68a1b7075dac9db', name: "spinner" }, !this.transparent && this.spinner && index.h("sc-spinner", { key: 'eae4b8b804bfcbf47f223280033e51c8b6c6e2c0' })), index.h("slot", { key: '1a76935f6a4f1c5622bfe8ea6463877809b5b687' }))));
    }
};
ScBlockUi.style = ScBlockUiStyle0;

exports.sc_block_ui = ScBlockUi;

//# sourceMappingURL=sc-block-ui.cjs.entry.js.map