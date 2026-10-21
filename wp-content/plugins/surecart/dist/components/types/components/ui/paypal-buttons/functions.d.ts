export declare const getScriptLoadParams: ({ clientId, reusable, merchantId, currency, merchantInitiated, locale }: {
    clientId: any;
    reusable: any;
    merchantId: any;
    currency?: string;
    merchantInitiated: any;
    locale?: string;
}) => {
    commit: boolean;
    intent: string;
    vault: boolean;
    currency: string;
    locale?: string;
    'merchant-id'?: any;
    'client-id': any;
};
