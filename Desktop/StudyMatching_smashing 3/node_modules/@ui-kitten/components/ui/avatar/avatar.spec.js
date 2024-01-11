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
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_testing_library_1 = require("react-native-testing-library");
const eva_1 = require("@eva-design/eva");
const theme_1 = require("../../theme");
const avatar_component_1 = require("./avatar.component");
describe('@avatar: component checks', () => {
    const TestAvatar = (props) => (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
      <avatar_component_1.Avatar source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }} {...props}/>
    </theme_1.ApplicationProvider>);
    it('should render image', () => {
        const component = (0, react_native_testing_library_1.render)(<TestAvatar />);
        const avatar = component.queryByType(react_native_1.Image);
        expect(avatar).toBeTruthy();
        expect(avatar.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
    });
    it('should be round', () => {
        const component = (0, react_native_testing_library_1.render)(<TestAvatar shape='round'/>);
        const avatar = component.queryByType(react_native_1.Image);
        const { borderRadius, height } = react_native_1.StyleSheet.flatten(avatar.props.style);
        expect(borderRadius).toEqual(height / 2);
    });
    it('should be rounded', () => {
        const component = (0, react_native_testing_library_1.render)(<TestAvatar shape='rounded'/>);
        const avatar = component.queryByType(react_native_1.Image);
        const { borderRadius, height } = react_native_1.StyleSheet.flatten(avatar.props.style);
        expect(borderRadius).toBeLessThan(height);
    });
    it('should be square', () => {
        const component = (0, react_native_testing_library_1.render)(<TestAvatar shape='square'/>);
        const avatar = component.queryByType(react_native_1.Image);
        const { borderRadius } = react_native_1.StyleSheet.flatten(avatar.props.style);
        expect(borderRadius).toEqual(0);
    });
});
//# sourceMappingURL=avatar.spec.js.map