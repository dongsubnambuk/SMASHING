"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularProgressBarAnimation = void 0;
const react_native_1 = require("react-native");
const animation_1 = require("../animation/animation");
const DEFAULT_CONFIG = {
    duration: 500,
    easing: react_native_1.Easing.linear,
    cycles: 1,
    useNativeDriver: react_native_1.Platform.OS !== 'web',
};
class CircularProgressBarAnimation extends animation_1.Animation {
    toValue;
    animationValue;
    constructor(config) {
        super({ ...DEFAULT_CONFIG, ...config });
        this.animationValue = new react_native_1.Animated.Value(0);
    }
    get animation() {
        return react_native_1.Animated.timing(this.animationValue, {
            ...this.config,
            toValue: this.toValue,
        });
    }
    startDeterminate(toValue, callback) {
        this.toValue = toValue;
        super.start(callback);
    }
    stop() {
        super.stop();
    }
    toProps() {
        return {
            rotateFirstHalf: this.createRotateFirstHalfInterpolation(),
            rotateSecondHalf: this.createRotateSecondHalfInterpolation(),
        };
    }
    createRotateFirstHalfInterpolation = () => {
        return this.animationValue.interpolate({
            inputRange: [0, 0.5],
            outputRange: ['180deg', '360deg'],
            extrapolate: 'clamp',
        });
    };
    createRotateSecondHalfInterpolation = () => {
        return this.animationValue.interpolate({
            inputRange: [0.5, 1],
            outputRange: ['180deg', '360deg'],
            extrapolate: 'clamp',
        });
    };
}
exports.CircularProgressBarAnimation = CircularProgressBarAnimation;
//# sourceMappingURL=animation.js.map