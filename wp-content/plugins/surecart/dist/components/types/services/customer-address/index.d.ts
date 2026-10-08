import { Address, Customer } from '../../types';
/** Fetch the current user's customer record. Resolves to `null` when no customer is linked. */
export declare const getCurrentCustomer: (mode?: 'live' | 'test') => Promise<Customer>;
/** True when the address has no meaningful content fields set (country ignored — see above). */
export declare const isAddressEmpty: (address: Partial<Address> | null | undefined) => boolean;
/** True when the value carries any saved address data, including a country-only address. API returns `[]` for "none" — treat as empty. */
export declare const hasAddressData: (value: Partial<Address> | [] | null | undefined) => value is Partial<Address>;
