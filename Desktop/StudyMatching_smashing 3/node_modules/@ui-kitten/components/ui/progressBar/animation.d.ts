/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Animated, ViewStyle } from 'react-native';
import { Animation, AnimationConfig } from '../animation/animation';
type ProgressBarAnimationStyle = Animated.AnimatedProps<ViewStyle>;
type TimingAnimationConfig = Omit<Animated.TimingAnimationConfig, 'toValue'>;
export type ProgressBarAnimationConfig = AnimationConfig & TimingAnimationConfig;
export declare class ProgressBarAnimation extends Animation<ProgressBarAnimationConfig, ProgressBarAnimationStyle> {
    private toValue;
    private barWidth;
    private readonly animationValue;
    constructor(config?: Partial<ProgressBarAnimationConfig>);
    setBarWidth(value: number): void;
    protected get animation(): Animated.CompositeAnimation;
    startDeterminate(toValue: number, callback?: Animated.EndCallback): void;
    stop(): void;
    toProps(): ProgressBarAnimationStyle;
    private createTranslateXInterpolation;
}
export {};
