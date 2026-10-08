import { r as registerInstance, h, H as Host } from './index-25e5af33.js';
import { o as openWormhole } from './consumer-f1775a76.js';

const scOrderManualInstructionsCss = ":host{display:block}";
const ScOrderManualInstructionsStyle0 = scOrderManualInstructionsCss;

const ScOrderManualInstructions = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.manualPaymentTitle = undefined;
        this.manualPaymentInstructions = undefined;
    }
    render() {
        if (!this.manualPaymentInstructions || !this.manualPaymentTitle) {
            return h(Host, { style: { display: 'none' } });
        }
        return (h("sc-alert", { type: "info", open: true }, h("span", { slot: "title" }, this.manualPaymentTitle), h("div", { innerHTML: this.manualPaymentInstructions })));
    }
};
openWormhole(ScOrderManualInstructions, ['manualPaymentTitle', 'manualPaymentInstructions'], false);
ScOrderManualInstructions.style = ScOrderManualInstructionsStyle0;

export { ScOrderManualInstructions as sc_order_manual_instructions };

//# sourceMappingURL=sc-order-manual-instructions.entry.js.map