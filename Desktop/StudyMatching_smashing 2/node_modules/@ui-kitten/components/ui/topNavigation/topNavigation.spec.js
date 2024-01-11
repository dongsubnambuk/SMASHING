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
const topNavigation_component_1 = require("./topNavigation.component");
const topNavigationAction_component_1 = require("./topNavigationAction.component");
describe('@top-navigation-action: component checks', () => {
    const TestTopNavigationAction = (props) => (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
      <topNavigationAction_component_1.TopNavigationAction {...props}/>
    </theme_1.ApplicationProvider>);
    it('should render function image component passed to icon prop', () => {
        const Icon = (props) => (<react_native_1.Image {...props} source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>);
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigationAction icon={Icon}/>);
        const image = component.queryByType(react_native_1.Image);
        expect(image).toBeTruthy();
        expect(image.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
    });
    it('should render JSX image component passed to icon prop', () => {
        const Icon = (<react_native_1.Image source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>);
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigationAction icon={Icon}/>);
        const image = component.queryByType(react_native_1.Image);
        expect(image).toBeTruthy();
        expect(image.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
    });
    it('should call onPress', () => {
        const onPress = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigationAction onPress={onPress}/>);
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onPress).toBeCalled();
    });
    it('should call onPressIn', () => {
        const onPressIn = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigationAction onPressIn={onPressIn}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'pressIn');
        expect(onPressIn).toBeCalled();
    });
    it('should call onPressOut', () => {
        const onPressOut = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigationAction onPressOut={onPressOut}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'pressOut');
        expect(onPressOut).toBeCalled();
    });
    it('should call onMouseEnter', () => {
        const onMouseEnter = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigationAction onMouseEnter={onMouseEnter}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'mouseEnter');
        expect(onMouseEnter).toBeCalled();
    });
    it('should call onMouseLeave', () => {
        const onMouseLeave = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigationAction onMouseLeave={onMouseLeave}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'mouseLeave');
        expect(onMouseLeave).toBeCalled();
    });
    it('should call onFocus', () => {
        const onFocus = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigationAction onFocus={onFocus}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'focus');
        expect(onFocus).toBeCalled();
    });
    it('should call onBlur', () => {
        const onBlur = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigationAction onBlur={onBlur}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'blur');
        expect(onBlur).toBeCalled();
    });
});
describe('@top-navigation: component checks', () => {
    const TestTopNavigation = (props) => (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
      <topNavigation_component_1.TopNavigation {...props}/>
    </theme_1.ApplicationProvider>);
    it('should render text passed to title prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigation title='I love Babel'/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render function component passed to title prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigation title={props => (<react_native_1.Text {...props}>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render JSX component passed to title prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigation title={(<react_native_1.Text>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render text passed to subtitle prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigation subtitle='I love Babel'/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render function component passed to subtitle prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigation subtitle={props => (<react_native_1.Text {...props}>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render JSX component passed to subtitle prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigation subtitle={(<react_native_1.Text>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render function component passed to accessoryLeft prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigation subtitle={props => (<react_native_1.Text {...props}>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render JSX component passed to accessoryLeft prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigation subtitle={(<react_native_1.Text>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render component passed to accessoryRight prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigation subtitle={props => (<react_native_1.Text {...props}>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render JSX component passed to accessoryRight prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTopNavigation subtitle={(<react_native_1.Text>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
});
//# sourceMappingURL=topNavigation.spec.js.map