'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');

const scBreadcrumbsCss = ":host{display:block}.breadcrumb{display:flex;align-items:center;flex-wrap:wrap}";
const ScBreadcrumbsStyle0 = scBreadcrumbsCss;

const ScBreadcrumbs = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.label = 'Breadcrumb';
    }
    // Generates a clone of the separator element to use for each breadcrumb item
    getSeparator() {
        const slotted = this.el.shadowRoot.querySelector('slot[name=separator]');
        const separator = slotted.assignedElements({ flatten: true })[0];
        // Clone it, remove ids, and slot it
        const clone = separator.cloneNode(true);
        [clone, ...clone.querySelectorAll('[id]')].forEach(el => el.removeAttribute('id'));
        clone.slot = 'separator';
        return clone;
    }
    handleSlotChange() {
        const slotted = this.el.shadowRoot.querySelector('.breadcrumb slot');
        const items = slotted.assignedElements().filter(node => {
            return node.nodeName === 'CE-BREADCRUMB';
        });
        items.forEach((item, index) => {
            // Append separators to each item if they don't already have one
            const separator = item.querySelector('[slot="separator"]');
            if (separator === null) {
                item.append(this.getSeparator());
            }
            // The last breadcrumb item is the "current page"
            if (index === items.length - 1) {
                item.setAttribute('aria-current', 'page');
            }
            else {
                item.removeAttribute('aria-current');
            }
        });
    }
    render() {
        return (index.h(index.Fragment, { key: 'eda85593b63a46c844ae7bd77e23ebc5585ff85a' }, index.h("nav", { key: '986f87cb946944d7201527faf48071543dad0005', part: "base", class: "breadcrumb", "aria-label": this.label }, index.h("slot", { key: 'a4a8ad8c90887097ee7a62ad10de7e3bdc213bd8', onSlotchange: () => this.handleSlotChange() })), index.h("div", { key: '4dc72b1f4979d78f243f5059df96724d3cdeaef4', part: "separator", hidden: true, "aria-hidden": "true" }, index.h("slot", { key: '1f1cd362a04b7d51438f9dce45a4127a839f9429', name: "separator" }, index.h("sc-icon", { key: '550996461bb78c842c026f0869e96b1b803a352a', name: "chevron-right" })))));
    }
    get el() { return index.getElement(this); }
};
ScBreadcrumbs.style = ScBreadcrumbsStyle0;

exports.sc_breadcrumbs = ScBreadcrumbs;

//# sourceMappingURL=sc-breadcrumbs.cjs.entry.js.map