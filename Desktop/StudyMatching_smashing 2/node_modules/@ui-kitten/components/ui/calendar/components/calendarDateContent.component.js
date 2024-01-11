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
exports.CalendarDateContent = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const text_component_1 = require("../../text/text.component");
class CalendarDateContent extends react_1.default.Component {
    render() {
        const { style, textStyle, children, ...viewProps } = this.props;
        return (<react_native_1.View {...viewProps} style={[styles.container, style]}>
        <text_component_1.Text style={textStyle}>
          {children}
        </text_component_1.Text>
      </react_native_1.View>);
    }
}
exports.CalendarDateContent = CalendarDateContent;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
//# sourceMappingURL=calendarDateContent.component.js.map