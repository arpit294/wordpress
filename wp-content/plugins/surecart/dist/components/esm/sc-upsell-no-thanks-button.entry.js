import { r as registerInstance, h, H as Host } from './index-25e5af33.js';
import { d as decline } from './mutations-8f16b816.js';
import './fetch-cdff67be.js';
import './index-824c562b.js';
import './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';
import './store-3e08528c.js';
import './utils-2fd36c2c.js';
import './index-18f5a1bc.js';
import './watchers-43c9573f.js';
import './google-5e2052e8.js';
import './currency-eb33deae.js';
import './google-e9085e27.js';
import './util-dfbf863e.js';
import './index-c5a96d53.js';
import './mutations-7458343f.js';

const scUpsellNoThanksButtonCss = "sc-upsell-no-thanks-button{display:block}sc-upsell-no-thanks-button p{margin-block-start:0;margin-block-end:1em}sc-upsell-no-thanks-button .wp-block-button__link{position:relative;text-decoration:none}";
const ScUpsellNoThanksButtonStyle0 = scUpsellNoThanksButtonCss;

const ScUpsellNoThanksButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, { key: 'cd92614f698e9631156bfc5492b493bfb3f8bde2', onClick: () => decline() }, h("slot", { key: '8ba64fcc7e40fd09752e31dc99dd76fee7b173c8' })));
    }
};
ScUpsellNoThanksButton.style = ScUpsellNoThanksButtonStyle0;

export { ScUpsellNoThanksButton as sc_upsell_no_thanks_button };

//# sourceMappingURL=sc-upsell-no-thanks-button.entry.js.map