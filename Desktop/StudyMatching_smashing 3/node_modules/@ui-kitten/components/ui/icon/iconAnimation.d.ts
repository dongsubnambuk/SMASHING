/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ViewStyle } from 'react-native';
import { Animation, AnimationConfig } from '../animation';
export type IconAnimation = Animation<AnimationConfig, ViewStyle>;
export interface IconAnimationRegistry {
    zoom: IconAnimation;
    pulse: IconAnimation;
    shake: IconAnimation;
}
export declare function getIconAnimation(animation?: keyof IconAnimationRegistry | null, config?: AnimationConfig): IconAnimation | null;
