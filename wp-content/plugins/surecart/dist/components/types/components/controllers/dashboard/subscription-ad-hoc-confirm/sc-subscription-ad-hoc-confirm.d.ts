import { Price } from '../../../../types';
export declare class ScSubscriptionAdHocConfirm {
    heading: string;
    price: Price;
    currencyCode: string;
    busy: boolean;
    handleSubmit(e: any): Promise<void>;
    render(): any;
}
