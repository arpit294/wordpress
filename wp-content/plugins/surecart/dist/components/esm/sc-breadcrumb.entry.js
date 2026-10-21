import { r as registerInstance, h, a as getElement } from './index-25e5af33.js';

const scBreadcrumbCss = ":host{display:inline-flex}.breadcrumb-item{display:inline-flex;align-items:center;font-family:var(--sc-font-sans);font-size:var(--sc-font-size-small);font-weight:var(--sc-font-weight-semibold);color:var(--sc-breadcrumb-color, var(--sc-color-gray-600));line-height:var(--sc-line-height-normal);white-space:nowrap}.breadcrumb-item__label{display:inline-block;font-family:inherit;font-size:inherit;font-weight:inherit;line-height:inherit;text-decoration:none;color:inherit;background:none;border:none;border-radius:var(--sc-border-radius-medium);padding:0;margin:0;cursor:pointer;transition:color var(--sc-transition-fast) ease}:host(:not(:last-of-type)) .breadcrumb-item__label{color:var(--sc-breadcrumb-item-label-color, var(--sc-color-gray-900))}:host(:not(:last-of-type)) .breadcrumb-item__label:hover{color:var(--sc-breadcrumb-item-label-hover-color, var(--sc-color-primary-500))}:host(:not(:last-of-type)) .breadcrumb-item__label:active{color:var(--sc-breadcrumb-item-label-active-color, var(--sc-color-gray-900))}.breadcrumb-item__label:focus{box-shadow:var(--sc-focus-ring)}.breadcrumb-item__prefix,.breadcrumb-item__suffix{display:none;flex:0 0 auto;display:flex;align-items:center}.breadcrumb-item--has-prefix .breadcrumb-item__prefix{display:inline-flex;margin-right:var(--sc-spacing-x-small)}.breadcrumb-item--has-suffix .breadcrumb-item__suffix{display:inline-flex;margin-left:var(--sc-spacing-x-small)}:host(:last-of-type) .breadcrumb-item__separator{display:none}.breadcrumb-item__separator{display:inline-flex;align-items:center;margin:0 var(--sc-spacing-x-small);user-select:none}";
const ScBreadcrumbStyle0 = scBreadcrumbCss;

const ScBreadcrumb = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.href = undefined;
        this.target = undefined;
        this.rel = 'noreferrer noopener';
        this.hasPrefix = undefined;
        this.hasSuffix = undefined;
    }
    handleSlotChange() {
        this.hasPrefix = !!this.el.querySelector('[slot="prefix"]');
        this.hasSuffix = !!this.el.querySelector('[slot="suffix"]');
    }
    render() {
        const Tag = this.href ? 'a' : 'div';
        return (h("div", { key: '7e35ecbc546aa8e1c06d47179c39592b6e0a9d6f', part: "base", class: {
                'breadcrumb-item': true,
                'breadcrumb-item--has-prefix': this.hasPrefix,
                'breadcrumb-item--has-suffix': this.hasSuffix,
            } }, h("span", { key: 'f2a57f47e76c6ee95f54ef68213f74c48f69e3f5', part: "prefix", class: "breadcrumb-item__prefix" }, h("slot", { key: 'ee35d51ef3f1f7d66a23069f0599a1c9341756d2', name: "prefix" })), h(Tag, { key: 'a26c0e8063203ca7843abe56d918248ba86734d2', part: "label", class: "breadcrumb-item__label breadcrumb-item__label--link", href: this.href, target: this.target, rel: this.rel }, h("slot", { key: '3f0d0d69f539480ef3982fda373a45c80c55be21' })), h("span", { key: '5e94145a45aca4fac435b3def82920513d14a4a8', part: "suffix", class: "breadcrumb-item__suffix" }, h("slot", { key: 'a8f4c8c80a1099c434aa9d86e163ac7786fb8fa1', name: "suffix", onSlotchange: () => this.handleSlotChange() })), h("span", { key: '694f9760ad9d5a0f4cea30799700151f9e4207ec', part: "separator", class: "breadcrumb-item__separator", "aria-hidden": "true" }, h("slot", { key: 'ee31aa07be708fc79cec6e560cad576a686ae46d', name: "separator", onSlotchange: () => this.handleSlotChange() }, h("sc-icon", { key: 'd3fdeb1a37d34cbdd20a14aa89957181f2da3eb6', name: "chevron-right" })))));
    }
    get el() { return getElement(this); }
};
ScBreadcrumb.style = ScBreadcrumbStyle0;

export { ScBreadcrumb as sc_breadcrumb };

//# sourceMappingURL=sc-breadcrumb.entry.js.map