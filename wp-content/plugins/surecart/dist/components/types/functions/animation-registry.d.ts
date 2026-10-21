interface ElementAnimation {
    keyframes: Keyframe[];
    rtlKeyframes?: Keyframe[];
    options?: KeyframeAnimationOptions;
}
interface GetAnimationOptions {
    dir?: 'ltr' | 'rtl';
}
export declare function setDefaultAnimation(animationName: string, animation: ElementAnimation | null): void;
export declare function setAnimation(el: Element, animationName: string, animation: ElementAnimation | null): void;
export declare function getAnimation(el: Element, animationName: string, options?: GetAnimationOptions): ElementAnimation;
export {};
