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
exports.Tab = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const devsupport_1 = require("../../devsupport");
const theme_1 = require("../../theme");
/**
 * A single tab within the TabView or TabBar.
 * Tabs should be rendered within TabView or TabBar to provide a usable component.
 *
 * @extends React.Component
 *
 * @property {ReactElement} children - A component displayed below the tab.
 *
 * @property {ReactElement | ReactText | (TextProps) => ReactElement} title - String, number or a function component
 * to render within the tab.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} icon - Function component
 * to render within the tab.
 * Expected to return an Image.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example TabSimpleUsage
 */
let Tab = class Tab extends react_1.default.Component {
    static defaultProps = {
        selected: false,
    };
    onMouseEnter = (event) => {
        this.props.eva.dispatch([theme_1.Interaction.HOVER]);
        this.props.onMouseEnter?.(event);
    };
    onMouseLeave = (event) => {
        this.props.eva.dispatch([]);
        this.props.onMouseLeave?.(event);
    };
    onPress = () => {
        this.props.onSelect?.(!this.props.selected);
    };
    getComponentStyle = (source) => {
        const { textMarginVertical, textFontFamily, textFontSize, textFontWeight, textColor, iconWidth, iconHeight, iconMarginVertical, iconTintColor, ...containerParameters } = source;
        return {
            container: containerParameters,
            icon: {
                width: iconWidth,
                height: iconHeight,
                marginVertical: iconMarginVertical,
                tintColor: iconTintColor,
            },
            title: {
                marginVertical: textMarginVertical,
                fontFamily: textFontFamily,
                fontSize: textFontSize,
                fontWeight: textFontWeight,
                color: textColor,
            },
        };
    };
    render() {
        const { eva, style, title, icon, ...touchableProps } = this.props;
        const evaStyle = this.getComponentStyle(eva.style);
        return (<devsupport_1.TouchableWeb {...touchableProps} style={[evaStyle.container, styles.container, style]} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onPress={this.onPress}>
        <devsupport_1.FalsyFC style={evaStyle.icon} component={icon}/>
        <devsupport_1.FalsyText style={evaStyle.title} component={title}/>
      </devsupport_1.TouchableWeb>);
    }
};
Tab = __decorate([
    (0, theme_1.styled)('Tab')
], Tab);
exports.Tab = Tab;
const styles = react_native_1.StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
//# sourceMappingURL=tab.component.js.map