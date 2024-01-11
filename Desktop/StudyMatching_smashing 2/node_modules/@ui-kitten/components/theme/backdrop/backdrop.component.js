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
exports.Backdrop = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
class Backdrop extends react_1.default.Component {
    static defaultProps = {
        visible: false,
    };
    renderChildElement = (source) => {
        return react_1.default.cloneElement(source, {
            style: [source.props.style, this.props.style],
        });
    };
    renderComponentChildren = (source) => {
        return react_1.default.Children.map(source, this.renderChildElement);
    };
    renderComponent = () => {
        const componentChildren = this.renderComponentChildren(this.props.children);
        return (<react_native_1.View style={react_native_1.StyleSheet.absoluteFill}>
        <react_native_1.TouchableOpacity style={[react_native_1.StyleSheet.absoluteFill, this.props.backdropStyle]} activeOpacity={1.0} testID='@backdrop' onPress={this.props.onBackdropPress}/>
        {componentChildren}
      </react_native_1.View>);
    };
    render() {
        return this.props.visible && this.renderComponent();
    }
}
exports.Backdrop = Backdrop;
//# sourceMappingURL=backdrop.component.js.map