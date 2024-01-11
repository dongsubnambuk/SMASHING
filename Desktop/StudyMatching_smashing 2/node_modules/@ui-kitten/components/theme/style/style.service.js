"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleService = exports.useStyleSheet = exports.State = exports.Interaction = void 0;
const react_1 = require("react");
const theme_service_1 = require("../theme/theme.service");
/**
 * User interactions that can be handled by Eva.
 */
var Interaction;
(function (Interaction) {
    Interaction["HOVER"] = "hover";
    Interaction["ACTIVE"] = "active";
    Interaction["FOCUSED"] = "focused";
    Interaction["INDETERMINATE"] = "indeterminate";
    Interaction["VISIBLE"] = "visible";
})(Interaction = exports.Interaction || (exports.Interaction = {}));
/**
 * Component states that can be handled by Eva.
 */
var State;
(function (State) {
    State["CHECKED"] = "checked";
    State["SELECTED"] = "selected";
    State["DISABLED"] = "disabled";
})(State = exports.State || (exports.State = {}));
/**
 * Takes a theme provided by ApplicationProvider or ThemeProvider and applies it to style.
 * Consider not using this function when not using Eva theme variables.
 *
 * @overview-example UseStyleSheetSimpleUsage
 */
const useStyleSheet = (styles) => {
    const theme = (0, theme_service_1.useTheme)();
    return (0, react_1.useMemo)(() => {
        return StyleService.createThemed(styles, theme);
    }, [theme]);
};
exports.useStyleSheet = useStyleSheet;
/**
 * Service for creating styles that fit current theme.
 * Unlike StyleSheet class exported from React Native package, it allows using Eva theme variables.
 */
class StyleService {
    /**
     * Unlike `StyleSheet.create` from RN package,
     * this does nothing with `styles` validation because of inability to process Eva theme variables
     * and returns styles as it is just to support the syntax we used to.
     *
     * However, this may be useful to have this function
     * because future RN versions may allow pre-processing.
     * @see {StyleSheet.setStyleAttributePreprocessor}
     *
     * Notice it is better to use `StyleSheet.create` from RN package since it does style registering.
     * You don't need to use this function if custom variables are not used.
     *
     * When using Eva theme variables, `useStyleSheet` should be called.
     *
     * @example
     * ```
     * const Component = () => {
     *   const styles = useStyleSheet(themedStyles);
     *   return (
     *     <View style={styles.container} />
     *   );
     * };
     *
     * const themedStyles = StyleService.create({
     *   container: { backgroundColor: 'color-primary-default' },
     * });
     * ```
     */
    static create = (styles) => {
        return styles;
    };
    /**
     * @returns stylesheet mapped to theme
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static createThemed = (styles, theme) => {
        return Object.keys(styles).reduce((acc, key) => {
            return { ...acc, [key]: StyleService.createThemedEntry(styles[key], theme) };
        }, {});
    };
    /**
     * @returns a style mapped to theme
     */
    static createThemedEntry = (style, theme) => {
        return Object.keys(style).reduce((acc, key) => {
            const value = style[key];
            return { ...acc, [key]: theme_service_1.ThemeService.getValue(value, theme, value) };
        }, {});
    };
}
exports.StyleService = StyleService;
//# sourceMappingURL=style.service.js.map