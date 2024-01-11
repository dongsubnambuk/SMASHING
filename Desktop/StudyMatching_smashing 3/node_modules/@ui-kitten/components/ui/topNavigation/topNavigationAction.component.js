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
exports.TopNavigationAction = void 0;
const react_1 = __importDefault(require("react"));
const devsupport_1 = require("../../devsupport");
const theme_1 = require("../../theme");
/**
 * A single action within the TopNavigation.
 * Actions should be rendered within TopNavigation by providing them through `accessory` props
 * to provide a usable component.
 *
 * @extends React.Component
 *
 * @property {ReactElement | (ImageProps) => ReactElement} icon - Function component
 * to render within the action.
 * Expected to return an Image.
 *
 * @property {string} appearance - Appearance of the component.
 * Can be `default` and `control`.
 * Use *control* appearance when needed to display within a contrast container.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example TopNavigationActionSimpleUsage
 */
let TopNavigationAction = class TopNavigationAction extends react_1.default.Component {
    onBlur = (event) => {
        this.props.eva.dispatch([]);
        this.props.onBlur?.(event);
    };
    onMouseEnter = (event) => {
        this.props.eva.dispatch([theme_1.Interaction.HOVER]);
        this.props.onMouseEnter?.(event);
    };
    onMouseLeave = (event) => {
        this.props.eva.dispatch([]);
        this.props.onMouseLeave?.(event);
    };
    onFocus = (event) => {
        this.props.eva.dispatch([theme_1.Interaction.FOCUSED]);
        this.props.onFocus?.(event);
    };
    onPressIn = (event) => {
        this.props.eva.dispatch([theme_1.Interaction.ACTIVE]);
        this.props.onPressIn?.(event);
    };
    onPressOut = (event) => {
        this.props.eva.dispatch([]);
        this.props.onPressOut?.(event);
    };
    getComponentStyle = (source) => {
        const { iconTintColor, iconWidth, iconHeight, iconMarginHorizontal, } = source;
        return {
            container: {
                marginHorizontal: iconMarginHorizontal,
            },
            icon: {
                width: iconWidth,
                height: iconHeight,
                tintColor: iconTintColor,
            },
        };
    };
    render() {
        const { eva, style, icon, ...touchableProps } = this.props;
        const evaStyle = this.getComponentStyle(eva.style);
        return (<devsupport_1.TouchableWeb {...touchableProps} style={[evaStyle.container, style]} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onFocus={this.onFocus} onBlur={this.onBlur} onPressIn={this.onPressIn} onPressOut={this.onPressOut}>
        <devsupport_1.FalsyFC style={evaStyle.icon} component={icon}/>
      </devsupport_1.TouchableWeb>);
    }
};
TopNavigationAction = __decorate([
    (0, theme_1.styled)('TopNavigationAction')
], TopNavigationAction);
exports.TopNavigationAction = TopNavigationAction;
//# sourceMappingURL=topNavigationAction.component.js.map