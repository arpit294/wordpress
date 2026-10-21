import { r as registerInstance, h } from './index-25e5af33.js';

const scDividerCss = ":host{display:block;min-height:1px}.divider{position:relative;padding:var(--spacing) 0}.line__container{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center}.line{width:100%;border-top:1px solid var(--sc-divider-border-top-color, var(--sc-color-gray-200))}.text__container{position:relative;display:flex;justify-content:center;font-size:var(--sc-font-size-small)}.text{padding:0 var(--sc-spacing-small);background:var(--sc-divider-text-background-color, var(--sc-color-white));color:var(--sc-color-gray-500)}";
const ScDividerStyle0 = scDividerCss;

const ScDivider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", { key: '1a8ccb0c1c28b51a71bb024ffe5b85988a51f207', class: "divider", part: "base" }, h("div", { key: 'c04cabb9c4118f22c8adaba868326338a2a27728', class: "line__container", "aria-hidden": "true", part: "line-container" }, h("div", { key: 'cf0227b9e7aee17a9a1fb3ff1bad2f8035df5ad5', class: "line", part: "line" })), h("div", { key: 'acc441ce49bf61d1f995023dedfc6fafa65e6e29', class: "text__container", part: "text-container" }, h("span", { key: '0bc2596180fede0de11a46cb2ecee5a8b5df6f09', class: "text", part: "text" }, h("slot", { key: 'c8db6cdedd81053041e66caa2f1d7abc5d333e16' })))));
    }
};
ScDivider.style = ScDividerStyle0;

export { ScDivider as sc_divider };

//# sourceMappingURL=sc-divider.entry.js.map