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
exports.ChevronLeft = void 0;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const react_native_svg_1 = require("react-native-svg");
class ChevronLeft extends react_1.default.Component {
    render() {
        return (<react_native_svg_1.Svg {...this.props} viewBox='0 0 24 24'>
        <react_native_svg_1.G>
          <react_native_svg_1.G>
            <react_native_svg_1.Rect width='24' height='24' transform='rotate(90 12 12)' opacity='0'/>
            <react_native_svg_1.Path d='M13.36 17a1 1 0 0 1-.72-.31l-3.86-4a1 1 0 0 1 0-1.4l4-4a1 1 0 1 1 1.42 1.42L10.9 12l3.18 3.3a1 1 0 0
               1 0 1.41 1 1 0 0 1-.72.29z'/>
          </react_native_svg_1.G>
        </react_native_svg_1.G>
      </react_native_svg_1.Svg>);
    }
}
exports.ChevronLeft = ChevronLeft;
//# sourceMappingURL=chevronLeft.component.js.map