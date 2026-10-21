'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
const price = require('./price-9dddd853.js');
require('./currency-b438c76d.js');

const ScFormatInterval = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.value = 0;
        this.interval = '';
        this.every = '/';
        this.fallback = '';
    }
    render() {
        return price.translateInterval(this.value, this.interval, ` ${this.every}`, this.fallback);
    }
};

exports.sc_format_interval = ScFormatInterval;

//# sourceMappingURL=sc-format-interval.cjs.entry.js.map