import { r as registerInstance, h, a as getElement } from './index-25e5af33.js';
import { i as isRtl } from './page-align-0cdacf32.js';

const scLineItemCss = ":host{display:block;--mobile-size:380px;--price-size:var(--sc-font-size-medium);--line-item-grid-template-columns:auto 1fr 1fr;line-height:var(--sc-line-height-dense)}.item{display:grid;align-items:center;grid-template-columns:var(--line-item-grid-template-columns)}@media screen and (min-width: var(--mobile-size)){.item{flex-wrap:no-wrap}}.item__title{color:var(--sc-line-item-title-color)}.item__price{color:var(--sc-input-label-color)}.item__title,.item__price{font-size:var(--sc-font-size-medium);font-weight:var(--sc-font-weight-semibold)}.item__description,.item__price-description{font-size:var(--sc-font-size-small);line-height:var(--sc-line-height-dense);color:var(--sc-input-label-color)}::slotted([slot=price-description]){margin-top:var(--sc-line-item-text-margin, 5px);color:var(--sc-input-label-color);text-decoration:none}.item__end{flex:1;display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;align-self:flex-end;width:100%;margin-top:20px}@media screen and (min-width: 280px){.item__end{width:auto;text-align:right;margin-left:20px;margin-top:0}.item--is-rtl .item__end{margin-left:0;margin-right:20px}.item__price-text{text-align:right;display:flex;flex-direction:column;align-items:flex-end}}.item__price-currency{font-size:var(--sc-font-size-small);color:var(--sc-input-label-color);text-transform:var(--sc-currency-transform, uppercase);margin-right:8px}.item__text{flex:1}.item__price-description{display:-webkit-box}::slotted([slot=image]){margin-right:20px;width:50px;height:50px;object-fit:cover;border-radius:4px;border:1px solid var(--sc-color-gray-200);display:block;box-shadow:var(--sc-input-box-shadow)}::slotted([slot=price-description]){display:inline-block;width:100%;line-height:1}.item__price-layout{font-size:var(--sc-font-size-x-large);font-weight:var(--sc-font-weight-semibold);display:flex;align-items:center}.item__price{font-size:var(--price-size)}.item_currency{font-weight:var(--sc-font-weight-normal);font-size:var(--sc-font-size-xx-small);color:var(--sc-input-label-color);margin-right:var(--sc-spacing-small);text-transform:var(--sc-currency-text-transform, uppercase)}.item--is-rtl.item__description,.item--is-rtl.item__price-description{text-align:right}.item--is-rtl .item__text{text-align:right}@media screen and (min-width: 280px){.item--is-rtl .item__end{width:auto;text-align:left;margin-left:0;margin-top:0}.item--is-rtl .item__price-text{text-align:left}}";
const ScLineItemStyle0 = scLineItemCss;

const ScLineItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.price = undefined;
        this.currency = undefined;
        this.hasImageSlot = undefined;
        this.hasTitleSlot = undefined;
        this.hasDescriptionSlot = undefined;
        this.hasPriceSlot = undefined;
        this.hasPriceDescriptionSlot = undefined;
        this.hasCurrencySlot = undefined;
    }
    componentWillLoad() {
        this.hasImageSlot = !!this.hostElement.querySelector('[slot="image"]');
        this.hasTitleSlot = !!this.hostElement.querySelector('[slot="title"]');
        this.hasDescriptionSlot = !!this.hostElement.querySelector('[slot="description"]');
        this.hasPriceSlot = !!this.hostElement.querySelector('[slot="price"]');
        this.hasPriceDescriptionSlot = !!this.hostElement.querySelector('[slot="price-description"]');
        this.hasCurrencySlot = !!this.hostElement.querySelector('[slot="currency"]');
    }
    render() {
        return (h("div", { key: '417411783d0286439b33efd3c99b3e7351ca3c1e', part: "base", class: {
                'item': true,
                'item--has-image': this.hasImageSlot,
                'item--has-title': this.hasTitleSlot,
                'item--has-description': this.hasDescriptionSlot,
                'item--has-price': this.hasPriceSlot,
                'item--has-price-description': this.hasPriceDescriptionSlot,
                'item--has-price-currency': this.hasCurrencySlot,
                'item--is-rtl': isRtl(),
            } }, h("div", { key: 'ede26472d9f6a03cbecf0155f292e618fb9ddb5f', class: "item__image", part: "image" }, h("slot", { key: '4f39689d49d986b71c3c20b9e74b6e6b5b38432e', name: "image" })), h("div", { key: 'acebb7af95cc5e8ddf216386a0da1f7caf33ade1', class: "item__text", part: "text" }, h("div", { key: '34f639c83e860c7cf86041e4f25fdafbc4f13ab0', class: "item__title", part: "title" }, h("slot", { key: '2c7178ed5d00bc95e217fd9bfe98a8f5a2ba9f7a', name: "title" })), h("div", { key: '754651208358e23591dae7ddfe1e853f8a50d185', class: "item__description", part: "description" }, h("slot", { key: 'cdb9e873fe1cae19add25efd0adeabcc583cb9cf', name: "description" }))), h("div", { key: 'af4f8a788bbbf9719c648cf636264f5bf85e09a6', class: "item__end", part: "price" }, h("div", { key: '795d1dcc5b741d0c75b079357a30f26482f3b469', class: "item__price-currency", part: "currency" }, h("slot", { key: 'ec8e421fba78c315abc0271f4bf8f1e1f0f5a27a', name: "currency" })), h("div", { key: '1192e720d216ffa38bc650919a18a61b73b64a9a', class: "item__price-text", part: "price-text" }, h("div", { key: '0eeeae5339c13fdafdda2f70c6777d86b5d036c8', class: "item__price", part: "price" }, h("slot", { key: 'ffcdb304b08e3200eaa1f7cc65a9bbcd5a6cdb9b', name: "price" })), h("div", { key: 'f416ab92c9c6ac22bf2cf624d0c82957f2623a19', class: "item__price-description", part: "price-description" }, h("slot", { key: '79f82ba94452147595010f295e49419a3ede0fcb', name: "price-description" }))))));
    }
    get hostElement() { return getElement(this); }
};
ScLineItem.style = ScLineItemStyle0;

export { ScLineItem as sc_line_item };

//# sourceMappingURL=sc-line-item.entry.js.map