import { r as registerInstance, h, H as Host } from './index-25e5af33.js';
import { b as getFormattedRemainingTime } from './getters-30f4a3d4.js';
import './store-3e08528c.js';
import './utils-2fd36c2c.js';
import './index-18f5a1bc.js';

const scUpsellCountdownTimerCss = ":host{display:flex;justify-content:var(--sc-upsell-countdown-timer-justify-content, center);align-items:var(--sc-upsell-countdown-timer-align-items, center);text-align:var(--sc-upsell-countdown-timer-text-align, center);flex-wrap:wrap;gap:var(--sc-upsell-countdown-timer-gap, 0.5em);line-height:1;padding:var(--sc-upsell-countdown-timer-padding, var(--sc-spacing-medium));border-radius:var(--sc-upsell-countdown-timer-border-radius, var(--sc-border-radius-pill));background-color:var(--sc-upsell-countdown-timer-background-color, rgb(226, 249, 235));color:var(--sc-upsell-countdown-timer-color, rgb(71, 91, 80))}";
const ScUpsellCountdownTimerStyle0 = scUpsellCountdownTimerCss;

const ScUpsellCountdownTimer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.timeRemaining = Infinity;
        this.formattedTime = undefined;
        this.showIcon = true;
    }
    componentDidLoad() {
        this.updateCountdown();
    }
    updateCountdown() {
        this.formattedTime = getFormattedRemainingTime();
        setInterval(() => {
            this.formattedTime = getFormattedRemainingTime();
        }, 1000);
    }
    render() {
        return (h(Host, { key: '1057dc697ffe1c66201f1d5c0638b86ba724e750', role: "timer", class: {
                'sc-upsell-countdown-timer': true,
            } }, this.showIcon && h("sc-icon", { key: '4e98eafcf79ed3f28f740a48701ef887a1436bca', name: "clock" }), h("span", { key: '48ff5444151dfd4df339ef391e680f3f86620719' }, h("slot", { key: '7c744c229899b530de18d6d9adfb86ef8cc541bf', name: "offer-expire-text" }), " ", h("strong", { key: '88d149f89a1aba1110503b87b6de28441495f617' }, this.formattedTime))));
    }
};
ScUpsellCountdownTimer.style = ScUpsellCountdownTimerStyle0;

export { ScUpsellCountdownTimer as sc_upsell_countdown_timer };

//# sourceMappingURL=sc-upsell-countdown-timer.entry.js.map