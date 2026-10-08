'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');

const scMenuDividerCss = ":host{display:block}.menu-divider{border-top:solid 1px var(--sc-panel-border-color);margin:var(--sc-spacing-x-small) 0}";
const ScMenuDividerStyle0 = scMenuDividerCss;

const ScMenuDivider = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return index.h("div", { key: 'c5af9da80192390e56cfabeb302323ce32a21102', part: "base", class: "menu-divider", role: "separator", "aria-hidden": "true" });
    }
};
ScMenuDivider.style = ScMenuDividerStyle0;

exports.sc_menu_divider = ScMenuDivider;

//# sourceMappingURL=sc-menu-divider.cjs.entry.js.map