"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularProgressBar = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const devsupport_1 = require("@ui-kitten/components/devsupport");
const components_1 = require("@ui-kitten/components");
const animation_1 = require("./animation");
/**
 * Displays the length of a process.
 *
 * @extends React.Component
 *
 * @property {number} progress - Current progress value of the process.
 * Can be from 0 to 1.

 * @property {boolean} animating - Whether component is animating.
 * Default is *true*.
 *
 * @property {string} size - Size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Defaults to *medium*.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *primary*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {ReactElement | (IconProps) => ReactElement} renderIcon - Function component
 * to render inside circular progress bar.
 * Expected to return an Icon.
 *
 * @property {Partial<CircularProgressBarAnimationConfig>} animationConfig - Animation configuration.
 * Optional. Can define duration, easing function and etc.
 *
 * @overview-example CircularProgressBarSimpleUsage
 * Default CircularProgressBar status is `primary`, size is `medium` and animating is `true`.
 *
 * @overview-example CircularProgressBarSizes
 * To resize CircularProgressBar, a `size` property may be used.
 *
 * @overview-example CircularProgressBarStates
 * To show the specific status of the process, a `status` property may be used.
 *
 * @overview-example CircularProgressBarTheming
 * Styling of CircularProgressBar is possible with [configuring a custom theme](guides/branding).
 *
 */
let CircularProgressBar = class CircularProgressBar extends react_1.default.PureComponent {
    static defaultProps = {
        animating: true,
        progress: 0,
    };
    animation;
    constructor(props) {
        super(props);
        this.animation = new animation_1.CircularProgressBarAnimation(props.animationConfig);
    }
    get containerSize() {
        const { width, height } = react_native_1.StyleSheet.flatten([this.props.eva.style, this.props.style]);
        // @ts-ignore: width and height are restricted to be a number
        return new devsupport_1.Size(width, height);
    }
    componentDidMount() {
        if (this.props.animating) {
            this.startAnimation();
        }
    }
    componentDidUpdate(prevProps) {
        const progressChanged = this.props.progress !== prevProps.progress;
        const animatingChanged = this.props.animating !== prevProps.animating;
        if (progressChanged && this.props.animating) {
            this.startAnimation();
        }
        if (animatingChanged && !this.props.animating) {
            this.stopAnimation();
        }
    }
    componentWillUnmount() {
        this.animation.release();
    }
    startAnimation = () => {
        const validProgress = this.clamp(this.props.progress);
        this.animation.startDeterminate(validProgress);
    };
    stopAnimation = () => {
        this.animation.stop();
    };
    clamp = (progress) => {
        return progress > 1 ? 1 : (progress < 0 ? 0 : progress);
    };
    getComponentStyle = (source) => {
        const { trackWidth, // width of track/indicator
        trackColor, indicatorColor, iconWidth, // accessory icon
        textFontFamily, textFontSize, textFontWeight, } = source;
        const { width, height } = this.containerSize;
        const radius = width / 2;
        const elementWidth = trackWidth > radius ? radius : trackWidth;
        return {
            radius,
            track: {
                width: elementWidth,
                color: trackColor,
            },
            indicator: {
                width: elementWidth,
                color: indicatorColor,
            },
            container: {
                width,
                height,
                borderRadius: radius,
            },
            icon: {
                width: iconWidth,
                height: iconWidth,
                tintColor: indicatorColor,
            },
            text: {
                fontFamily: textFontFamily,
                fontSize: textFontSize,
                fontWeight: textFontWeight,
            },
        };
    };
    renderHalfCircle = (radius, style) => {
        const { width, color } = style;
        const containerSizeStyle = {
            width: radius * 2,
            height: radius,
        };
        return (<react_native_1.View style={[styles.circle, containerSizeStyle]}>
        <react_native_1.View style={{
                borderWidth: width,
                borderColor: color,
                width: radius * 2,
                height: radius * 2,
                borderRadius: radius,
            }}/>
      </react_native_1.View>);
    };
    renderHalf = (evaStyle, viewStyle, rotate, opacity) => {
        const { radius, indicator } = evaStyle;
        const opacityProp = opacity || opacity === 0 ? { opacity } : undefined;
        return (<react_native_1.View style={viewStyle}>
        <react_native_1.View style={{ width: radius * 2, height: radius }}/>
        <react_native_1.Animated.View style={{
                ...styles.absoluteFill,
                ...opacityProp,
                transform: [
                    { translateY: radius / 2 },
                    { rotate },
                    { translateY: -1 * radius / 2 },
                    { perspective: 1000 },
                ],
            }}>
          {this.renderHalfCircle(radius, indicator)}
        </react_native_1.Animated.View>
      </react_native_1.View>);
    };
    renderCircularProgress = (progress, animating, evaStyle) => {
        let firstHalfRotate;
        let secondHalfRotate;
        if (animating) {
            const { rotateFirstHalf, rotateSecondHalf } = this.animation.toProps();
            firstHalfRotate = rotateFirstHalf;
            secondHalfRotate = rotateSecondHalf;
        }
        else {
            firstHalfRotate = `${Math.min(progress, 0.5) * 360 - 180}deg`;
            secondHalfRotate = `${Math.max(0.5, progress) * 360}deg`;
        }
        const trackStyle = {
            ...react_native_1.StyleSheet.absoluteFillObject,
            borderWidth: evaStyle.track.width,
            borderColor: evaStyle.track.color,
            borderRadius: evaStyle.radius,
        };
        return (<react_native_1.View style={[styles.absoluteFill, styles.center, styles.rotate90]}>
        <react_native_1.View style={trackStyle}/>
        {this.renderHalf(evaStyle, styles.zIndex, firstHalfRotate)}
        {this.renderHalf(evaStyle, styles.rotate180, secondHalfRotate)}
      </react_native_1.View>);
    };
    renderText = (progress, style) => {
        const label = `${Math.round(progress * 100)}%`;
        const { status, textStyle } = this.props;
        return (<components_1.Text style={[style, textStyle]} status={status}>
        {label}
      </components_1.Text>);
    };
    renderIcon = (state, style) => {
        return (<devsupport_1.FalsyFC component={this.props.renderIcon} style={[style, this.props.iconStyle]}/>);
    };
    renderAccessory = (progress, status, evaStyle) => {
        const showIcon = this.props.renderIcon;
        return (<react_native_1.View style={[styles.absoluteFill, styles.center]}>
        {showIcon ? this.renderIcon(status, evaStyle.icon) : this.renderText(progress, evaStyle.text)}
      </react_native_1.View>);
    };
    render() {
        const { eva, style, progress, animating, status, size, textStyle, ...viewProps } = this.props;
        const validProgress = this.clamp(progress);
        const evaStyle = this.getComponentStyle(eva.style);
        return (<react_native_1.View {...viewProps} style={[evaStyle.container, style]}>
        {this.renderCircularProgress(validProgress, animating, evaStyle)}
        {this.renderAccessory(validProgress, status, evaStyle)}
      </react_native_1.View>);
    }
};
CircularProgressBar = __decorate([
    (0, components_1.styled)('CircularProgressBar')
], CircularProgressBar);
exports.CircularProgressBar = CircularProgressBar;
const styles = react_native_1.StyleSheet.create({
    absoluteFill: {
        ...react_native_1.StyleSheet.absoluteFillObject,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    zIndex: {
        zIndex: 1,
        overflow: 'hidden',
    },
    rotate90: {
        transform: [
            { rotate: '90deg' },
        ],
    },
    rotate180: {
        transform: [
            { rotate: '180deg' },
        ],
        overflow: 'hidden',
    },
    circle: {
        overflow: 'hidden',
    },
});
//# sourceMappingURL=circularProgressBar.component.js.map