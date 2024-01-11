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
exports.withStyles = void 0;
const react_1 = __importDefault(require("react"));
const hoist_non_react_statics_1 = __importDefault(require("hoist-non-react-statics"));
const themeContext_1 = require("./themeContext");
/**
 * High Order Function for creating styles mapped to current theme
 * Returns component class which can be used as themed component.
 *
 * @param Component - Type: {ComponentType}. Component to be themed.
 *
 * @param createStyles - Type: {(ThemeType) => NamedStyles}. Function used to create styles mapped on theme.
 *
 * @overview-example WithStylesSimpleUsage
 *
 * @overview-example WithStylesEvaProp
 * A withStyles function injects `eva` property into props of wrapped component, where
 * theme - a current theme,
 * styles - a styles object provided by a function used as a second argument of withStyles.
 * ```
 * interface EvaProp {
 *   theme: ThemeType;
 *   style: StyleType;
 * }
 * ```
 */
const withStyles = (Component, createStyles) => {
    class Wrapper extends react_1.default.PureComponent {
        withThemedProps = (props, theme) => {
            const style = createStyles?.(theme);
            return {
                ...props,
                eva: {
                    theme,
                    style,
                },
            };
        };
        renderWrappedElement = (theme) => {
            const { forwardedRef, ...restProps } = this.props;
            const props = this.withThemedProps(restProps, theme);
            return (<Component {...props} ref={forwardedRef}/>);
        };
        render() {
            return (<themeContext_1.ThemeContext.Consumer>
          {this.renderWrappedElement}
        </themeContext_1.ThemeContext.Consumer>);
        }
    }
    const WrappingElement = (props, ref) => {
        return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Wrapper {...props} forwardedRef={ref}/>);
    };
    const ThemedComponent = react_1.default.forwardRef(WrappingElement);
    ThemedComponent.displayName = Component.displayName || Component.name;
    (0, hoist_non_react_statics_1.default)(ThemedComponent, Component);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return ThemedComponent;
};
exports.withStyles = withStyles;
//# sourceMappingURL=withStyles.js.map