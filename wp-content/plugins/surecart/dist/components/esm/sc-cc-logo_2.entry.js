import { r as registerInstance, h, a as getElement } from './index-25e5af33.js';

const scCcLogoCss = ":host{display:inline-block}.cc-logo{border-radius:var(--sc-cc-border-radius, 4px);line-height:0;overflow:hidden}";
const ScCcLogoStyle0 = scCcLogoCss;

const ScCcLogo = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.brand = undefined;
    }
    renderLogo() {
        if (['visa', 'mastercard', 'amex', 'discover', 'diners', 'jcb', 'unionpay'].includes(this.brand)) {
            return h("sc-icon", { name: this.brand, style: { '--height': '0.63em' } });
        }
        return h("sc-icon", { name: "creditcard", style: { '--height': '0.63em' } });
    }
    render() {
        return (h("div", { key: '867db50c1457caf5245593023de5fdb64b9f335e', class: "cc-logo", part: "base" }, this.renderLogo()));
    }
};
ScCcLogo.style = ScCcLogoStyle0;

const scTooltipCss = ".tooltip{position:relative}.tooltip--has-width .tooltip-text{white-space:normal;min-width:var(--sc-tooltip-width);max-width:var(--sc-tooltip-width)}.tooltip-text{position:fixed;background:var(--sc-color-gray-900);border-radius:var(--sc-border-radius-small);padding:var(--sc-spacing-small);font-family:var(--sc-input-font-family);font-size:var(--sc-input-font-size-small);white-space:nowrap;line-height:1.2;color:var(--sc-color-white);z-index:99999}.tooltip-text:after{content:\"\";position:absolute;height:0;width:0;border:7px solid transparent}.tooltip--top .tooltip-text:after{top:calc(100% - 1px);left:50%;transform:translateX(-50%);border-top-color:var(--sc-color-gray-900)}.tooltip--bottom .tooltip-text:after{bottom:calc(100% - 1px);left:50%;transform:translateX(-50%);border-bottom-color:var(--sc-color-gray-900)}.tooltip--left .tooltip-text:after{left:calc(100% - 1px);top:50%;transform:translateY(-50%);border-left-color:var(--sc-color-gray-900)}.tooltip--right .tooltip-text:after{right:calc(100% - 1px);top:50%;transform:translateY(-50%);border-right-color:var(--sc-color-gray-900)}.tooltip--primary .tooltip-text{background:var(--sc-color-primary-500)}.tooltip--primary.tooltip--top .tooltip-text:after{border-top-color:var(--sc-color-primary-500)}.tooltip--primary.tooltip--bottom .tooltip-text:after{border-bottom-color:var(--sc-color-primary-500)}.tooltip--primary.tooltip--left .tooltip-text:after{border-left-color:var(--sc-color-primary-500)}.tooltip--primary.tooltip--right .tooltip-text:after{border-right-color:var(--sc-color-primary-500)}.tooltip--success .tooltip-text{background:var(--sc-color-success-500)}.tooltip--success.tooltip--top .tooltip-text:after{border-top-color:var(--sc-color-success-500)}.tooltip--success.tooltip--bottom .tooltip-text:after{border-bottom-color:var(--sc-color-success-500)}.tooltip--success.tooltip--left .tooltip-text:after{border-left-color:var(--sc-color-success-500)}.tooltip--success.tooltip--right .tooltip-text:after{border-right-color:var(--sc-color-success-500)}.tooltip--info .tooltip-text{background:var(--sc-color-info-500)}.tooltip--info.tooltip--top .tooltip-text:after{border-top-color:var(--sc-color-info-500)}.tooltip--info.tooltip--bottom .tooltip-text:after{border-bottom-color:var(--sc-color-info-500)}.tooltip--info.tooltip--left .tooltip-text:after{border-left-color:var(--sc-color-info-500)}.tooltip--info.tooltip--right .tooltip-text:after{border-right-color:var(--sc-color-info-500)}.tooltip--warning .tooltip-text{background:var(--sc-color-warning-500)}.tooltip--warning.tooltip--top .tooltip-text:after{border-top-color:var(--sc-color-warning-500)}.tooltip--warning.tooltip--bottom .tooltip-text:after{border-bottom-color:var(--sc-color-warning-500)}.tooltip--warning.tooltip--left .tooltip-text:after{border-left-color:var(--sc-color-warning-500)}.tooltip--warning.tooltip--right .tooltip-text:after{border-right-color:var(--sc-color-warning-500)}.tooltip--danger .tooltip-text{background:var(--sc-color-danger-500)}.tooltip--danger.tooltip--top .tooltip-text:after{border-top-color:var(--sc-color-danger-500)}.tooltip--danger.tooltip--bottom .tooltip-text:after{border-bottom-color:var(--sc-color-danger-500)}.tooltip--danger.tooltip--left .tooltip-text:after{border-left-color:var(--sc-color-danger-500)}.tooltip--danger.tooltip--right .tooltip-text:after{border-right-color:var(--sc-color-danger-500)}.tooltip--dark .tooltip-text{background:#1e1e1e;color:#ffffff;padding:4px 8px;font-size:12px;border-radius:2px;box-shadow:0 0 0 1px rgba(0, 0, 0, 0.06)}.tooltip--dark .tooltip-text:after{display:none}";
const ScTooltipStyle0 = scTooltipCss;

const ScTooltip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.open = undefined;
        this.width = undefined;
        this.text = undefined;
        this.freeze = undefined;
        this.padding = 5;
        this.type = 'info';
        this.placement = 'top';
        this.top = -10000;
        this.left = -10000;
    }
    // Reposition after render, once the bubble ref exists — a post-watch
    // setTimeout raced the first render and could leave the bubble parked.
    componentDidRender() {
        this.handleWindowScroll();
    }
    handleWindowScroll() {
        if (!this.open)
            return;
        if (!this.tooltip)
            return;
        const tooltipRect = this.tooltip.getBoundingClientRect();
        const triggerRect = this.el.getBoundingClientRect();
        let top;
        let left;
        if (this.placement === 'bottom') {
            top = triggerRect.bottom + this.padding;
            left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        }
        else if (this.placement === 'left') {
            top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
            left = triggerRect.left - tooltipRect.width - this.padding;
        }
        else if (this.placement === 'right') {
            top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
            left = triggerRect.right + this.padding;
        }
        else {
            // 'top' — original behavior, preserved as the default.
            top = triggerRect.top - (tooltipRect.height + this.padding);
            left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2 + this.padding;
        }
        // clientWidth, not innerWidth: the bubble must not sit under the scrollbar.
        // Overflowing top/bottom bubbles align to the trigger's edge — pinning
        // them to the viewport edge reads as clipped.
        const edgeMargin = 8;
        const maxLeft = document.documentElement.clientWidth - tooltipRect.width - edgeMargin;
        if (this.placement === 'top' || this.placement === 'bottom') {
            if (left > maxLeft) {
                left = triggerRect.right - tooltipRect.width;
            }
            else if (left < edgeMargin) {
                left = triggerRect.left;
            }
        }
        this.top = top;
        this.left = Math.min(Math.max(left, edgeMargin), Math.max(maxLeft, edgeMargin));
    }
    handleBlur() {
        if (this.freeze)
            return;
        this.open = false;
    }
    handleClick() {
        if (this.freeze)
            return;
        this.open = true;
    }
    handleFocus() {
        if (this.freeze)
            return;
        this.open = true;
    }
    handleMouseOver() {
        if (this.freeze)
            return;
        this.open = true;
    }
    handleMouseOut() {
        if (this.freeze)
            return;
        this.open = false;
    }
    render() {
        if (!this.text) {
            return h("slot", null);
        }
        return (h("span", { part: "base", class: {
                'tooltip': true,
                // Types
                'tooltip--primary': this.type === 'primary',
                'tooltip--success': this.type === 'success',
                'tooltip--info': this.type === 'info',
                'tooltip--warning': this.type === 'warning',
                'tooltip--danger': this.type === 'danger',
                'tooltip--dark': this.type === 'dark',
                'tooltip--top': this.placement === 'top',
                'tooltip--bottom': this.placement === 'bottom',
                'tooltip--left': this.placement === 'left',
                'tooltip--right': this.placement === 'right',
                'tooltip--has-width': !!this.width,
            }, onClick: () => this.handleClick(), onBlur: () => this.handleBlur(), onFocus: () => this.handleFocus(), onMouseOver: () => this.handleMouseOver(), onMouseOut: () => this.handleMouseOut() }, h("slot", null), !!this.open && (h("div", { part: "text", ref: el => (this.tooltip = el), class: "tooltip-text", style: {
                top: `${this.top}px`,
                left: `${this.left}px`,
                ...(this.width ? { '--sc-tooltip-width': this.width } : {}),
            } }, this.text))));
    }
    get el() { return getElement(this); }
};
ScTooltip.style = ScTooltipStyle0;

export { ScCcLogo as sc_cc_logo, ScTooltip as sc_tooltip };

//# sourceMappingURL=sc-cc-logo_2.entry.js.map