'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');

const scCardCss = ":host{display:block;--overflow:visible}.card{font-family:var(--sc-font-sans);overflow:var(--overflow);display:block}.card:not(.card--borderless){padding:var(--sc-card-padding, var(--sc-spacing-large));background:var(--sc-card-background-color, var(--sc-color-white));border:1px solid var(--sc-card-border-color, var(--sc-color-gray-300));border-radius:var(--sc-card-border-radius, var(--sc-input-border-radius-medium));box-shadow:var(--sc-shadow-small)}.card:not(.card--borderless).card--no-padding{padding:0}.title--divider{display:none}.card--has-title-slot .card--title{font-weight:var(--sc-font-weight-bold);line-height:var(--sc-line-height-dense)}.card--has-title-slot .title--divider{display:block}::slotted(*){margin-bottom:var(--sc-form-row-spacing)}::slotted(*:first-child){margin-top:0}::slotted(*:last-child){margin-bottom:0 !important}";
const ScCardStyle0 = scCardCss;

const ScCard = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.noDivider = undefined;
        this.borderless = undefined;
        this.noPadding = undefined;
        this.href = undefined;
        this.loading = undefined;
        this.hasTitleSlot = undefined;
    }
    componentWillLoad() {
        this.handleSlotChange();
    }
    handleSlotChange() {
        this.hasTitleSlot = !!this.el.querySelector('[slot="title"]');
    }
    render() {
        const Tag = this.href ? 'a' : 'div';
        return (index.h(Tag, { key: '694fcbfed1c8ca4389b73fb437961e2be11c378d', part: "base", class: {
                'card': true,
                'card--borderless': this.borderless,
                'card--no-padding': this.noPadding,
            } }, index.h("slot", { key: 'edf2ea7ab0ac50760c9f38367a25f26eaf866f98' })));
    }
    get el() { return index.getElement(this); }
};
ScCard.style = ScCardStyle0;

const scDashboardModuleCss = ":host{display:block;position:relative}.dashboard-module{display:grid;gap:var(--sc-dashboard-module-spacing, 1em)}.dashboard-module>*,.dashboard-module ::slotted(*){min-width:0}.heading{font-family:var(--sc-font-sans);display:flex;flex-wrap:wrap;gap:1em;align-items:center;justify-content:space-between}.heading__text{display:grid;flex:1;gap:calc(var(--sc-dashboard-module-spacing, 1em) / 2)}@media screen and (min-width: 720px){.heading{gap:2em}}.heading__title{font-size:var(--sc-dashbaord-module-heading-size, var(--sc-font-size-x-large));font-weight:var(--sc-dashbaord-module-heading-weight, var(--sc-font-weight-bold));line-height:var(--sc-dashbaord-module-heading-line-height, var(--sc-line-height-dense));white-space:nowrap}.heading__description{font-size:var(--sc-font-size-normal);line-height:var(--sc-line-height-dense);opacity:0.85}";
const ScDashboardModuleStyle0 = scDashboardModuleCss;

const ScDashboardModule = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.heading = undefined;
        this.error = undefined;
        this.loading = undefined;
    }
    render() {
        return (index.h("div", { key: '191a9115d48b66f0bcecac2fcfdf1edf3f3a0424', class: "dashboard-module", part: "base" }, !!this.error && (index.h("sc-alert", { key: '1917b38d9eb8752ed1bc951885aab0219ed8e1c9', exportparts: "base:error__base, icon:error__icon, text:error__text, title:error__title, message:error__message", open: !!this.error, type: "danger" }, index.h("span", { key: '335b02d4e1e8c4293c8818f12af2795e43128b09', slot: "title" }, wp.i18n.__('Error', 'surecart')), this.error)), index.h("div", { key: 'b2cb4c68c0ee989ecfbad569791f860c6bdf05b1', class: "heading", part: "heading" }, index.h("div", { key: '73e5f34ae58880ad8a682ac48f28ca1622d0189e', class: "heading__text", part: "heading-text" }, index.h("div", { key: '14fd15f70b5cd3232a9dea8942a193c3cd9db629', class: "heading__title", part: "heading-title" }, index.h("slot", { key: '1dbada23ed6ec65fd3f0ecbf70bca4f9d9acefcd', name: "heading", "aria-label": this.heading }, this.heading)), index.h("div", { key: 'd48edb02fb6ea8aa7cbd10e922fa48e29423c76a', class: "heading__description", part: "heading-description" }, index.h("slot", { key: '46ede1566859d0a4ce79f0dc1681b20b5358bec6', name: "description" }))), index.h("slot", { key: '094afc2e434d4677b4322a9a97168da3594824d8', name: "end" })), index.h("slot", { key: '33f45dc94f92764c571b9106a43d2ac44dfb2720' })));
    }
};
ScDashboardModule.style = ScDashboardModuleStyle0;

exports.sc_card = ScCard;
exports.sc_dashboard_module = ScDashboardModule;

//# sourceMappingURL=sc-card_2.cjs.entry.js.map