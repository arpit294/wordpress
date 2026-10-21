export declare const VERIFIED = "verified";
export declare const VERIFYING = "verifying";
export declare const CODE_SENT = "code_sent";
export declare const UNVERIFIED = "unverified";
export declare const CODE_EXPIRED = "code_expired";
interface Store {
    loggedIn: boolean;
    email: string;
    name: string;
    avatarUrl: string;
    verificationStatus: 'code_sent' | 'verifying' | 'verified' | 'unverified' | 'code_expired' | null;
    /** Absolute client-side timestamp (ms) when the next code resend is allowed. Anchors the cooldown across reload, tab switch, and "Change". */
    resendAvailableAt: number | null;
}
declare const state: Store, onChange: import("@stencil/store/dist/types").OnChangeHandler<Store>, dispose: () => void;
export declare const resetUser: () => void;
export default state;
export { state, onChange, dispose };
