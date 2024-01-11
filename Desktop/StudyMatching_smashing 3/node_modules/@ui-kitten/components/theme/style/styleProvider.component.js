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
exports.StyleProvider = void 0;
const react_1 = __importDefault(require("react"));
const mappingProvider_component_1 = require("../mapping/mappingProvider.component");
const themeProvider_component_1 = require("../theme/themeProvider.component");
class StyleProvider extends react_1.default.PureComponent {
    render() {
        const { styles, theme, children } = this.props;
        return (<mappingProvider_component_1.MappingProvider styles={styles}>
        <themeProvider_component_1.ThemeProvider theme={theme}>
          {children}
        </themeProvider_component_1.ThemeProvider>
      </mappingProvider_component_1.MappingProvider>);
    }
}
exports.StyleProvider = StyleProvider;
//# sourceMappingURL=styleProvider.component.js.map