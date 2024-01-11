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
exports.ChevronRight = void 0;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const react_native_svg_1 = require("react-native-svg");
class ChevronRight extends react_1.default.Component {
    render() {
        return (<react_native_svg_1.Svg {...this.props} viewBox='0 0 24 24'>
        <react_native_svg_1.G>
          <react_native_svg_1.G>
            <react_native_svg_1.Rect width='24' height='24' transform='rotate(-90 12 12)' opacity='0'/>
            <react_native_svg_1.Path d='M10.5 17a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42L13.1 12 9.92 8.69a1 1 0 0 1 0-1.41 1 1 0 0 1 1.42
               0l3.86 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-.7.32z'/>
          </react_native_svg_1.G>
        </react_native_svg_1.G>
      </react_native_svg_1.Svg>);
    }
}
exports.ChevronRight = ChevronRight;
//# sourceMappingURL=chevronRight.component.js.map