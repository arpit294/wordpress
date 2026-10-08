'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');

const scTableHeadCss = ":host{display:table-header-group}::slotted(*){display:table-row}";
const ScTableHeadStyle0 = scTableHeadCss;

const ScTable = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h(index.Host, { key: 'f8966ff14b17f32703ec0cbba2a22a5298eb2b56' }, index.h("slot", { key: '17c637ba338c4b54e5513cef6c4c16cb6d0441a0' })));
    }
};
ScTable.style = ScTableHeadStyle0;

exports.sc_table_head = ScTable;

//# sourceMappingURL=sc-table-head.cjs.entry.js.map