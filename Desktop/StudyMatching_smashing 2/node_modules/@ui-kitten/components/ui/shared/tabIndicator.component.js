"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabIndicator = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const devsupport_1 = require("../../devsupport");
class TabIndicator extends react_1.default.Component {
    static defaultProps = {
        selectedPosition: 0,
    };
    indicatorWidth = 0;
    contentOffset = new react_native_1.Animated.Value(0);
    componentDidUpdate() {
        const { selectedPosition: index } = this.props;
        this.scrollToIndex({
            index,
            animated: true,
        });
    }
    /**
     * scrolls indicator to passed index
     *
     * @param params (object) - {
     *  index: number,
     *  animated: boolean | undefined
     * }
     */
    scrollToIndex(params) {
        const { index, ...rest } = params;
        const offset = this.indicatorWidth * index;
        this.scrollToOffset({ offset, ...rest });
    }
    /**
     * scrolls indicator to passed offset
     *
     * @param params (object) - {
     *  offset: number,
     *  animated: boolean | undefined
     * }
     */
    scrollToOffset(params) {
        this.createOffsetAnimation(params).start();
    }
    createOffsetAnimation = (params) => {
        return react_native_1.Animated.timing(this.contentOffset, {
            toValue: devsupport_1.RTLService.select(params.offset, -params.offset),
            duration: 200,
            easing: react_native_1.Easing.linear,
            useNativeDriver: react_native_1.Platform.OS !== 'web',
        });
    };
    onLayout = (event) => {
        this.indicatorWidth = event.nativeEvent.layout.width;
        this.scrollToOffset({
            offset: this.indicatorWidth * this.props.selectedPosition,
            animated: false,
        });
    };
    getComponentStyle = () => {
        const widthPercent = 100 / this.props.positions;
        return {
            width: `${widthPercent}%`,
            // @ts-ignore: RN has no types for `Animated` styles
            transform: [{ translateX: this.contentOffset }],
        };
    };
    renderIndicatorLine = (style) => {
        const styles = [{ width: '100%', alignSelf: 'center' }, react_native_1.StyleSheet.flatten(style)];
        return (<react_native_1.View testID="indicator body" style={styles}/>);
    };
    render() {
        const { style, ...viewProps } = this.props;
        const evaStyle = this.getComponentStyle();
        const indicatorLine = this.renderIndicatorLine(style);
        return (<react_native_1.Animated.View {...viewProps} style={evaStyle} onLayout={this.onLayout}>
        {indicatorLine}
      </react_native_1.Animated.View>);
    }
}
exports.TabIndicator = TabIndicator;
//# sourceMappingURL=tabIndicator.component.js.map