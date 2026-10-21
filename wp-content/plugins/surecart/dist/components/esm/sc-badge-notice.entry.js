import { r as registerInstance, h } from './index-25e5af33.js';

const scBadgeNoticeCss = ":host{display:block}.notice{background:var(--sc-badge-notice-background-color, var(--sc-color-white));color:var(--sc-badge-notice-text-color, var(--sc-color-gray-950));border:solid 1px var(--sc-badge-notice-border-color, var(--sc-color-white));border-radius:var(--sc-border-radius-small);padding:var(--sc-spacing-small);font-size:var(--sc-font-size-x-small);display:flex;gap:0.5em;line-height:1}.notice--warning{background:var(--sc-color-warning-50);color:var(--sc-color-warning-700)}";
const ScBadgeNoticeStyle0 = scBadgeNoticeCss;

const ScBadgeNotice = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.type = 'primary';
        this.label = undefined;
        this.size = 'small';
    }
    render() {
        return (h("div", { key: 'e8e7fe8eb8cb8235aaebcfd8c06a7dabc48d0491', class: {
                'notice': true,
                'notice--is-small': this.size === 'small',
                'notice--is-medium': this.size === 'medium',
                'notice--is-large': this.size === 'large',
                'notice--primary': this.type === 'primary',
                'notice--success': this.type === 'success',
                'notice--warning': this.type === 'warning',
                'notice--danger': this.type === 'danger',
                'notice--default': this.type === 'default',
            } }, h("sc-tag", { key: '9e237bc0a6ee2b98c09f7d69e1cc4e2597dcf763', size: this.size, type: this.type }, this.label), h("slot", { key: '5732bdd059345251d58fcf99b6119f3c4bfff33e' })));
    }
};
ScBadgeNotice.style = ScBadgeNoticeStyle0;

export { ScBadgeNotice as sc_badge_notice };

//# sourceMappingURL=sc-badge-notice.entry.js.map