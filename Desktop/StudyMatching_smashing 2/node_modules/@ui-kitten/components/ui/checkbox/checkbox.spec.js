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
const checkbox_component_1 = require("./checkbox.component");
describe('@checkbox component checks', () => {
    const TestCheckBox = (props) => (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
      <checkbox_component_1.CheckBox {...props}/>
    </theme_1.ApplicationProvider>);
    it('should request checking', () => {
        const onCheckedChange = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestCheckBox checked={false} onChange={onCheckedChange}/>);
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onCheckedChange).toBeCalledWith(true, false);
    });
    it('should request unchecking', () => {
        const onCheckedChange = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestCheckBox checked={true} onChange={onCheckedChange}/>);
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onCheckedChange).toBeCalledWith(false, false);
    });
    it('should request clearing indeterminate and checking', () => {
        const onCheckedChange = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestCheckBox checked={false} indeterminate={true} onChange={onCheckedChange}/>);
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onCheckedChange).toBeCalledWith(true, false);
    });
    it('should request clearing indeterminate and unchecking', () => {
        const onCheckedChange = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestCheckBox checked={true} indeterminate={true} onChange={onCheckedChange}/>);
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onCheckedChange).toBeCalledWith(false, false);
    });
    it('should render text', () => {
        const component = (0, react_native_testing_library_1.render)(<TestCheckBox>
        I love Babel
      </TestCheckBox>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render text as component', () => {
        const component = (0, react_native_testing_library_1.render)(<TestCheckBox>
        {props => (<react_native_1.Text {...props}>
            I love Babel
          </react_native_1.Text>)}
      </TestCheckBox>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render ReactElement passed to prop', () => {
        const renderComponent = (<react_native_1.Text>
        I love Babel
      </react_native_1.Text>);
        const component = (0, react_native_testing_library_1.render)(<TestCheckBox>
        {renderComponent}
      </TestCheckBox>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should call onPressIn', () => {
        const onPressIn = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestCheckBox onPressIn={onPressIn}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'pressIn');
        expect(onPressIn).toBeCalled();
    });
    it('should call onPressOut', () => {
        const onPressOut = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestCheckBox onPressOut={onPressOut}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'pressOut');
        expect(onPressOut).toBeCalled();
    });
    it('should call onMouseEnter', () => {
        const onMouseEnter = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestCheckBox onMouseEnter={onMouseEnter}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'mouseEnter');
        expect(onMouseEnter).toBeCalled();
    });
    it('should call onMouseLeave', () => {
        const onMouseLeave = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestCheckBox onMouseLeave={onMouseLeave}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'mouseLeave');
        expect(onMouseLeave).toBeCalled();
    });
    it('should call onFocus', () => {
        const onFocus = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestCheckBox onFocus={onFocus}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'focus');
        expect(onFocus).toBeCalled();
    });
    it('should call onBlur', () => {
        const onBlur = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestCheckBox onBlur={onBlur}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'blur');
        expect(onBlur).toBeCalled();
    });
});
//# sourceMappingURL=checkbox.spec.js.map