'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');

const scSpacingCss = ":host{display:block}::slotted(*:not(:last-child)){margin-bottom:var(--spacing)}";
const ScSpacingStyle0 = scSpacingCss;

const ScSpacing = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h(index.Host, { key: 'b693249736d7a7d30ec2b85efff946a46959989a' }, index.h("slot", { key: '4d4ad541da7920c065c94d2e144cc7cab5d16988' })));
    }
};
ScSpacing.style = ScSpacingStyle0;

exports.sc_spacing = ScSpacing;

//# sourceMappingURL=sc-spacing.cjs.entry.js.map