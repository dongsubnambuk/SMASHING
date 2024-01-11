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
exports.CheckMark = void 0;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const react_native_svg_1 = require("react-native-svg");
class CheckMark extends react_1.default.Component {
    render() {
        return (<react_native_svg_1.Svg {...this.props} viewBox='0 0 24 24'>
        <react_native_svg_1.G>
          <react_native_svg_1.G>
            <react_native_svg_1.Rect width='24' height='24' opacity='0'/>
            <react_native_svg_1.Path d='M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39 8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14
               10a1 1 0 0 1-.73.33z'/>
          </react_native_svg_1.G>
        </react_native_svg_1.G>
      </react_native_svg_1.Svg>);
    }
}
exports.CheckMark = CheckMark;
//# sourceMappingURL=checkmark.component.js.map