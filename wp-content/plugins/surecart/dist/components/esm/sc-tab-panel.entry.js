import { r as registerInstance, h, H as Host, a as getElement } from './index-25e5af33.js';

const scTabPanelCss = ":host{--padding:0;--spacing:var(--sc-spacing-large);display:block}::slotted(*~*){margin-top:var(--spacing)}.tab-panel{border:solid 1px transparent;padding:var(--padding);font-family:var(--sc-font-sans);font-size:var(--sc-font-size-medium)}";
const ScTabPanelStyle0 = scTabPanelCss;

let id = 0;
const ScTabPanel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.componentId = `tab-panel-${++id}`;
        this.name = '';
        this.active = false;
    }
    render() {
        // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
        this.el.id = this.el.id || this.componentId;
        return (h(Host, { key: '24e95356187f2b7c43a5628f2a6db16e1e5ece2b', style: { display: this.active ? 'block' : 'none' } }, h("div", { key: '58ae68bcdf7d4572381dda786d292e5a6e6fad84', part: "base", class: "tab-panel", role: "tabpanel", "aria-hidden": this.active ? 'false' : 'true' }, h("slot", { key: 'ba098cccbce941d0f3309da498014027a3ca97ad' }))));
    }
    get el() { return getElement(this); }
};
ScTabPanel.style = ScTabPanelStyle0;

export { ScTabPanel as sc_tab_panel };

//# sourceMappingURL=sc-tab-panel.entry.js.map