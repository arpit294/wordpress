import { Checkout } from '../../../../types';
import { TaxLine } from '../../../../functions/tax';
export declare class ScLineItemTax {
    order: Checkout;
    loading: boolean;
    renderLabel(line: TaxLine, showDetail: boolean): any;
    render(): any;
}
