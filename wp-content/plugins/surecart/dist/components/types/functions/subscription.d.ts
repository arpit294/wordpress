import { Subscription } from '../types';
/**
 * A pause has no dedicated field — it is `cancel_at_period_end` plus a `restore_at`.
 * Without `restore_at` the exact same shape means a cancellation, so every place
 * that branches on `cancel_at_period_end` must check these two helpers first.
 */
/** The subscription will pause at the end of the current period, then restore. */
export declare const isPauseScheduled: (subscription?: Subscription) => boolean;
/** The subscription is currently paused and waiting on `restore_at` to resume. */
export declare const isPaused: (subscription?: Subscription) => boolean;
