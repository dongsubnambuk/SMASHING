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
exports.ProgressBar = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const components_1 = require("@ui-kitten/components");
const animation_1 = require("./animation");
/**
 * Displays the length of a process.
 *
 * @extends React.Component
 *
 * @property {boolean} animating - Whether component is animating.
 * Default is *true*.
 *
 * @property {number} progress - Current state of a process.
 * Can be from 0 to 1.
 *
 * @property {string} size - Size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Defaults to *small*.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *primary*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {Partial<ProgressBarAnimationConfig>} animationConfig - Animation configuration.
 * Optional. Can define duration, easing function and etc.
 *
 * @overview-example ProgressBarSimpleUsage
 * Default ProgressBar animating is `true`.
 *
 * @overview-example ProgressBarTheming
 * Styling of ProgressBar is possible with [configuring a custom theme](guides/branding).
 *
 */
let ProgressBar = class ProgressBar extends react_1.default.PureComponent {
    static defaultProps = {
        animating: true,
        progress: 0,
    };
    state = {
        trackWidth: 0,
    };
    animation;
    constructor(props) {
        super(props);
        this.animation = new animation_1.ProgressBarAnimation(props.animationConfig);
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
    onLayout = (event) => {
        this.props.onLayout?.(event);
        const trackWidth = event.nativeEvent.layout.width;
        this.setState({ trackWidth });
        this.animation.setBarWidth(trackWidth);
    };
    getComponentStyle = (source) => {
        const { height, borderRadius, trackColor, indicatorColor, } = source;
        return {
            track: {
                height,
                borderRadius,
                backgroundColor: trackColor,
            },
            indicator: {
                height,
                borderRadius,
                backgroundColor: indicatorColor,
            },
        };
    };
    renderIndicator = (style, progress, animating) => {
        const indicatorStyles = [style];
        if (animating) {
            const animationStyles = this.animation.toProps();
            indicatorStyles.push(animationStyles);
        }
        else {
            const validProgress = this.clamp(progress);
            const width = `${validProgress * 100}%`;
            indicatorStyles.push({ width });
        }
        return (<react_native_1.Animated.View style={indicatorStyles}/>);
    };
    render() {
        const { eva, style, progress, animating, ...viewProps } = this.props;
        const combinedStyles = react_native_1.StyleSheet.flatten([eva.style, this.props.style]);
        const evaStyle = this.getComponentStyle(combinedStyles);
        return (<react_native_1.View {...viewProps} style={[evaStyle.track, styles.noOverflow, style]} onLayout={this.onLayout}>
        {this.renderIndicator(evaStyle.indicator, progress, animating)}
      </react_native_1.View>);
    }
};
ProgressBar = __decorate([
    (0, components_1.styled)('ProgressBar')
], ProgressBar);
exports.ProgressBar = ProgressBar;
const styles = react_native_1.StyleSheet.create({
    noOverflow: {
        overflow: 'hidden',
    },
});
//# sourceMappingURL=progressBar.component.js.map