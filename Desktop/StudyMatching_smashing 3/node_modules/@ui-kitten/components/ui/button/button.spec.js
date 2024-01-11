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
const button_component_1 = require("./button.component");
describe('@button: component checks', () => {
    const TestButton = (props) => (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
      <button_component_1.Button {...props}/>
    </theme_1.ApplicationProvider>);
    it('should render text passed to children', () => {
        const component = (0, react_native_testing_library_1.render)(<TestButton>
I love Babel
      </TestButton>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render component passed to children', () => {
        const component = (0, react_native_testing_library_1.render)(<TestButton>
        {props => (<react_native_1.Text {...props}>
            I love Babel
          </react_native_1.Text>)}
      </TestButton>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render components passed to accessoryLeft or accessoryRight props', () => {
        const AccessoryLeft = (props) => (<react_native_1.Image {...props} source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>);
        const AccessoryRight = (props) => (<react_native_1.Image {...props} source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' }}/>);
        const component = (0, react_native_testing_library_1.render)(<TestButton accessoryLeft={AccessoryLeft} accessoryRight={AccessoryRight}/>);
        const [accessoryLeft, accessoryRight] = component.queryAllByType(react_native_1.Image);
        expect(accessoryLeft).toBeTruthy();
        expect(accessoryRight).toBeTruthy();
        expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
        expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
    });
    it('should render accessory from prop as pure JSX element', () => {
        const accessoryLeft = (<react_native_1.Text>
        Left accessory
      </react_native_1.Text>);
        const accessoryRight = (<react_native_1.Text>
        Right accessory
      </react_native_1.Text>);
        const component = (0, react_native_testing_library_1.render)(<TestButton accessoryLeft={accessoryLeft} accessoryRight={accessoryRight}/>);
        expect(component.queryByText('Left accessory')).toBeTruthy();
        expect(component.queryByText('Right accessory')).toBeTruthy();
    });
    it('should render children from prop as pure JSX element', () => {
        const children = (<react_native_1.View>
        <react_native_1.Text>
          Children component
        </react_native_1.Text>
      </react_native_1.View>);
        const component = (0, react_native_testing_library_1.render)(<TestButton>
        {children}
      </TestButton>);
        expect(component.queryByText('Children component')).toBeTruthy();
    });
    it('should call onPress', () => {
        const onPress = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestButton onPress={onPress}/>);
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onPress).toBeCalled();
    });
    it('should call onPressIn', () => {
        const onPressIn = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestButton onPressIn={onPressIn}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'pressIn');
        expect(onPressIn).toBeCalled();
    });
    it('should call onPressOut', () => {
        const onPressOut = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestButton onPressOut={onPressOut}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'pressOut');
        expect(onPressOut).toBeCalled();
    });
    it('should call onMouseEnter', () => {
        const onMouseEnter = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestButton onMouseEnter={onMouseEnter}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'mouseEnter');
        expect(onMouseEnter).toBeCalled();
    });
    it('should call onMouseLeave', () => {
        const onMouseLeave = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestButton onMouseLeave={onMouseLeave}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'mouseLeave');
        expect(onMouseLeave).toBeCalled();
    });
    it('should call onFocus', () => {
        const onFocus = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestButton onFocus={onFocus}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'focus');
        expect(onFocus).toBeCalled();
    });
    it('should call onBlur', () => {
        const onBlur = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestButton onBlur={onBlur}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'blur');
        expect(onBlur).toBeCalled();
    });
});
//# sourceMappingURL=button.spec.js.map