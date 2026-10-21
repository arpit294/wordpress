'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const getters = require('./getters-e8c6cb31.js');
require('./store-3ddee299.js');
require('./utils-f5ea3c23.js');
require('./index-c3de642f.js');

const scUpsellCountdownTimerCss = ":host{display:flex;justify-content:var(--sc-upsell-countdown-timer-justify-content, center);align-items:var(--sc-upsell-countdown-timer-align-items, center);text-align:var(--sc-upsell-countdown-timer-text-align, center);flex-wrap:wrap;gap:var(--sc-upsell-countdown-timer-gap, 0.5em);line-height:1;padding:var(--sc-upsell-countdown-timer-padding, var(--sc-spacing-medium));border-radius:var(--sc-upsell-countdown-timer-border-radius, var(--sc-border-radius-pill));background-color:var(--sc-upsell-countdown-timer-background-color, rgb(226, 249, 235));color:var(--sc-upsell-countdown-timer-color, rgb(71, 91, 80))}";
const ScUpsellCountdownTimerStyle0 = scUpsellCountdownTimerCss;

const ScUpsellCountdownTimer = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.timeRemaining = Infinity;
        this.formattedTime = undefined;
        this.showIcon = true;
    }
    componentDidLoad() {
        this.updateCountdown();
    }
    updateCountdown() {
        this.formattedTime = getters.getFormattedRemainingTime();
        setInterval(() => {
            this.formattedTime = getters.getFormattedRemainingTime();
        }, 1000);
    }
    render() {
        return (index.h(index.Host, { key: '1057dc697ffe1c66201f1d5c0638b86ba724e750', role: "timer", class: {
                'sc-upsell-countdown-timer': true,
            } }, this.showIcon && index.h("sc-icon", { key: '4e98eafcf79ed3f28f740a48701ef887a1436bca', name: "clock" }), index.h("span", { key: '48ff5444151dfd4df339ef391e680f3f86620719' }, index.h("slot", { key: '7c744c229899b530de18d6d9adfb86ef8cc541bf', name: "offer-expire-text" }), " ", index.h("strong", { key: '88d149f89a1aba1110503b87b6de28441495f617' }, this.formattedTime))));
    }
};
ScUpsellCountdownTimer.style = ScUpsellCountdownTimerStyle0;

exports.sc_upsell_countdown_timer = ScUpsellCountdownTimer;

//# sourceMappingURL=sc-upsell-countdown-timer.cjs.entry.js.map