import { r as registerInstance } from './index-25e5af33.js';
import { t as translateInterval } from './price-39d60d32.js';
import './currency-eb33deae.js';

const ScFormatInterval = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.value = 0;
        this.interval = '';
        this.every = '/';
        this.fallback = '';
    }
    render() {
        return translateInterval(this.value, this.interval, ` ${this.every}`, this.fallback);
    }
};

export { ScFormatInterval as sc_format_interval };

//# sourceMappingURL=sc-format-interval.entry.js.map