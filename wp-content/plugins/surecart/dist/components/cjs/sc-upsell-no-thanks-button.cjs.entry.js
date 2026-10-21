'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const mutations = require('./mutations-8b2b6c99.js');
require('./fetch-5e8dc1d5.js');
require('./index-7ced8198.js');
require('./add-query-args-49dcb630.js');
require('./remove-query-args-b57e8cd3.js');
require('./store-3ddee299.js');
require('./utils-f5ea3c23.js');
require('./index-c3de642f.js');
require('./watchers-24b78a31.js');
require('./google-15c85d5e.js');
require('./currency-b438c76d.js');
require('./google-8dbad1a6.js');
require('./util-a15c420c.js');
require('./index-fb76df07.js');
require('./mutations-d5d6ddf1.js');

const scUpsellNoThanksButtonCss = "sc-upsell-no-thanks-button{display:block}sc-upsell-no-thanks-button p{margin-block-start:0;margin-block-end:1em}sc-upsell-no-thanks-button .wp-block-button__link{position:relative;text-decoration:none}";
const ScUpsellNoThanksButtonStyle0 = scUpsellNoThanksButtonCss;

const ScUpsellNoThanksButton = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h(index.Host, { key: 'cd92614f698e9631156bfc5492b493bfb3f8bde2', onClick: () => mutations.decline() }, index.h("slot", { key: '8ba64fcc7e40fd09752e31dc99dd76fee7b173c8' })));
    }
};
ScUpsellNoThanksButton.style = ScUpsellNoThanksButtonStyle0;

exports.sc_upsell_no_thanks_button = ScUpsellNoThanksButton;

//# sourceMappingURL=sc-upsell-no-thanks-button.cjs.entry.js.map