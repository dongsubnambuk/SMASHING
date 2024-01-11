/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Animated } from 'react-native';
import { Animation, AnimationConfig } from '../animation/animation';
interface AnimationStyle {
    rotateFirstHalf: Animated.AnimatedInterpolation<string>;
    rotateSecondHalf: Animated.AnimatedInterpolation<string>;
}
type TimingAnimationConfig = Omit<Animated.TimingAnimationConfig, 'toValue'>;
export type CircularProgressBarAnimationConfig = AnimationConfig & TimingAnimationConfig;
export declare class CircularProgressBarAnimation extends Animation<CircularProgressBarAnimationConfig, AnimationStyle> {
    private toValue;
    private readonly animationValue;
    constructor(config?: Partial<CircularProgressBarAnimationConfig>);
    protected get animation(): Animated.CompositeAnimation;
    startDeterminate(toValue: number, callback?: Animated.EndCallback): void;
    stop(): void;
    toProps(): AnimationStyle;
    private createRotateFirstHalfInterpolation;
    private createRotateSecondHalfInterpolation;
}
export {};
