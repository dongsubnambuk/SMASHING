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
exports.CalendarPickerCell = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const devsupport_1 = require("../../../../devsupport");
const theme_1 = require("../../../../theme");
let CalendarPickerCell = class CalendarPickerCell extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.shouldComponentUpdate) {
            return nextProps.shouldComponentUpdate(this.props, nextProps);
        }
        return true;
    }
    onPress = () => {
        this.props.onSelect?.(this.props.date);
    };
    getContainerBorderRadius = (borderRadius) => {
        const { firstRangeItem, lastRangeItem } = this.props;
        const borderStyle = {
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
        };
        if (firstRangeItem) {
            borderStyle.borderBottomLeftRadius = borderRadius;
            borderStyle.borderTopLeftRadius = borderRadius;
        }
        if (lastRangeItem) {
            borderStyle.borderBottomRightRadius = borderRadius;
            borderStyle.borderTopRightRadius = borderRadius;
        }
        return borderStyle;
    };
    getComponentStyle = (source) => {
        const { contentBorderWidth, contentBorderRadius, contentBorderColor, contentBackgroundColor, contentTextFontSize, contentTextFontWeight, contentTextColor, contentTextFontFamily, borderRadius, ...containerParameters } = source;
        return {
            container: {
                ...containerParameters,
                ...this.getContainerBorderRadius(borderRadius),
            },
            contentContainer: {
                borderWidth: contentBorderWidth,
                borderRadius: contentBorderRadius,
                borderColor: contentBorderColor,
                backgroundColor: contentBackgroundColor,
            },
            contentText: {
                fontSize: contentTextFontSize,
                fontWeight: contentTextFontWeight,
                color: contentTextColor,
                fontFamily: contentTextFontFamily,
            },
        };
    };
    renderContentElement = (source, evaStyle) => {
        return source?.(this.props.date, {
            container: evaStyle.contentContainer,
            text: evaStyle.contentText,
        });
    };
    render() {
        const { eva, style, date, bounding, children, ...touchableProps } = this.props;
        const evaStyle = this.getComponentStyle(eva.style);
        return (<devsupport_1.TouchableWithoutFeedback {...touchableProps} style={[evaStyle.container, styles.container, style]} onPress={this.onPress}>
        {this.renderContentElement(children, evaStyle)}
      </devsupport_1.TouchableWithoutFeedback>);
    }
};
CalendarPickerCell = __decorate([
    (0, theme_1.styled)('CalendarCell')
], CalendarPickerCell);
exports.CalendarPickerCell = CalendarPickerCell;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
});
//# sourceMappingURL=calendarPickerCell.component.js.map