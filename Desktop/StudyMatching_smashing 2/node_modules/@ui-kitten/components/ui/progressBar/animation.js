"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBarAnimation = void 0;
const react_native_1 = require("react-native");
const animation_1 = require("../animation/animation");
const DEFAULT_CONFIG = {
    duration: 500,
    easing: react_native_1.Easing.linear,
    cycles: 1,
    useNativeDriver: react_native_1.Platform.OS !== 'web',
};
class ProgressBarAnimation extends animation_1.Animation {
    toValue;
    barWidth = 0;
    animationValue;
    constructor(config) {
        super({ ...DEFAULT_CONFIG, ...config });
        this.animationValue = new react_native_1.Animated.Value(0);
    }
    setBarWidth(value) {
        this.barWidth = value;
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
            transform: [
                { translateX: this.createTranslateXInterpolation() },
            ],
        };
    }
    createTranslateXInterpolation = () => {
        return this.animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-this.barWidth, 0],
        });
    };
}
exports.ProgressBarAnimation = ProgressBarAnimation;
//# sourceMappingURL=animation.js.map