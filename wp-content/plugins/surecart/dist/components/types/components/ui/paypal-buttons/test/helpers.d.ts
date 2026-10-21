/// <reference types="jest" />
/** Flush pending microtasks/timers so un-awaited bootstraps settle. */
export declare const flush: () => Promise<unknown>;
/** A fake PayPal SDK whose buttons expose their config. */
export declare const makePaypal: () => {
    FUNDING: {
        PAYPAL: string;
        CARD: string;
    };
    Buttons: jest.Mock<any, [config: any]>;
    buttons: any[];
};
