'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');

const scTableCss = ":host{display:table;width:100%;height:100%;border-spacing:0;border-collapse:collapse;table-layout:fixed;font-family:var(--sc-font-sans);border-radius:var(--border-radius, var(--sc-border-radius-small))}:host([shadowed]){box-shadow:var(--sc-shadow-medium)}::slotted([slot=head]){border-bottom:1px solid var(--sc-table-border-bottom-color, var(--sc-color-gray-200))}";
const ScTableStyle0 = scTableCss;

const ScTable = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h(index.Host, { key: '8c8d474fe457a9b54563b93231b4d2a9fc0374fc' }, index.h("slot", { key: 'c50af208bd2dba896be90d247a516e970bcce02b', name: "head" }), index.h("slot", { key: '99f846066db519c1226ca52ec221db1177f3bf07' }), index.h("slot", { key: '5faade419aa49b9eec99078f47de95e51d51c0b6', name: "footer" })));
    }
};
ScTable.style = ScTableStyle0;

const scTableCellCss = ":host{display:table-cell;font-size:var(--sc-font-size-medium);padding:var(--sc-table-cell-spacing, var(--sc-spacing-small)) var(--sc-table-cell-spacing, var(--sc-spacing-large)) !important;vertical-align:var(--sc-table-cell-vertical-align, middle)}:host([slot=head]){background:var(--sc-table-cell-background-color, var(--sc-color-gray-50));font-size:var(--sc-font-size-small);padding:var(--sc-table-cell-spacing, var(--sc-spacing-small));color:var(--sc-color-gray-500)}:host(:last-child){text-align:right}sc-table-cell{display:table-cell;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";
const ScTableCellStyle0 = scTableCellCss;

const ScTableScll = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h(index.Host, { key: '63dcb74ef0e35bbcc8182a018faf6f22e88e691d' }, index.h("slot", { key: '45cd2a5feeb6133c96437ce6c8a732b74b9d3d91' })));
    }
};
ScTableScll.style = ScTableCellStyle0;

const scTableRowCss = ":host{display:table-row;border:1px solid var(--sc-table-row-border-bottom-color, var(--sc-color-gray-200))}:host([href]){cursor:pointer}:host([href]:hover){background:var(--sc-color-gray-50)}";
const ScTableRowStyle0 = scTableRowCss;

const ScTableRow = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.href = undefined;
    }
    render() {
        return (index.h(index.Host, { key: '60d58853645d49a127105912dfe264716bf4b9d6' }, index.h("slot", { key: '1ee07a992a72bf25c45a50ae5fdb886688ee733e' })));
    }
};
ScTableRow.style = ScTableRowStyle0;

exports.sc_table = ScTable;
exports.sc_table_cell = ScTableScll;
exports.sc_table_row = ScTableRow;

//# sourceMappingURL=sc-table_3.cjs.entry.js.map