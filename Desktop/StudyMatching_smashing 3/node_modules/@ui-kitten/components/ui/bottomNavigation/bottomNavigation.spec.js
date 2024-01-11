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
const bottomNavigation_component_1 = require("./bottomNavigation.component");
const bottomNavigationTab_component_1 = require("./bottomNavigationTab.component");
const tabIndicator_component_1 = require("../shared/tabIndicator.component");
describe('@bottom-navigation-tab: component checks', () => {
    const TestBottomNavigationTab = (props) => (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
      <bottomNavigationTab_component_1.BottomNavigationTab {...props}/>
    </theme_1.ApplicationProvider>);
    it('should render component passed to icon prop', () => {
        const Icon = (props) => (<react_native_1.Image {...props} source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>);
        const component = (0, react_native_testing_library_1.render)(<TestBottomNavigationTab icon={Icon}/>);
        const image = component.queryByType(react_native_1.Image);
        expect(image).toBeTruthy();
        expect(image.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
    });
    it('should render text passed to title prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestBottomNavigationTab title='I love Babel'/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render component passed to title prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestBottomNavigationTab title={props => (<react_native_1.Text {...props}>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render title from prop passed as pure JSX element', () => {
        const component = (0, react_native_testing_library_1.render)(<TestBottomNavigationTab title={(<react_native_1.Text>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render icon from prop passed as pure JSX element', () => {
        const component = (0, react_native_testing_library_1.render)(<TestBottomNavigationTab icon={(<react_native_1.Text>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should call onMouseEnter', () => {
        const onMouseEnter = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestBottomNavigationTab onMouseEnter={onMouseEnter}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'mouseEnter');
        expect(onMouseEnter).toBeCalled();
    });
    it('should call onMouseLeave', () => {
        const onMouseLeave = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestBottomNavigationTab onMouseLeave={onMouseLeave}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'mouseLeave');
        expect(onMouseLeave).toBeCalled();
    });
});
describe('@bottom-navigation: component checks', () => {
    const TestBottomNavigation = (props) => {
        const [selectedIndex, setSelectedIndex] = react_1.default.useState(props.selectedIndex);
        const onSelect = (index) => {
            setSelectedIndex(index);
            props.onSelect?.(index);
        };
        return (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
        <bottomNavigation_component_1.BottomNavigation {...props} selectedIndex={selectedIndex} onSelect={onSelect}>
          <bottomNavigationTab_component_1.BottomNavigationTab title='Tab 0'/>
          <bottomNavigationTab_component_1.BottomNavigationTab title='Tab 1'/>
        </bottomNavigation_component_1.BottomNavigation>
      </theme_1.ApplicationProvider>);
    };
    it('should render 2 tabs passed to children', () => {
        const component = (0, react_native_testing_library_1.render)(<TestBottomNavigation />);
        expect(component.queryAllByType(bottomNavigationTab_component_1.BottomNavigationTab).length).toEqual(2);
    });
    it('should set tab selected by passing selectedIndex prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestBottomNavigation selectedIndex={1}/>);
        expect(component.queryAllByType(bottomNavigationTab_component_1.BottomNavigationTab)[1].props.selected).toEqual(true);
    });
    it('should not render tab indicator', () => {
        const component = (0, react_native_testing_library_1.render)(<TestBottomNavigation appearance='noIndicator'/>);
        expect(component.queryByType(tabIndicator_component_1.TabIndicator)).toEqual(null);
    });
    it('should render tab indicator correctly', () => {
        const styles = { width: 99, backgroundColor: 'red' };
        const component = (0, react_native_testing_library_1.render)(<TestBottomNavigation indicatorStyle={styles}/>);
        const el = component.queryByTestId('indicator body');
        const style = react_native_1.StyleSheet.flatten(el.props.style);
        expect(style.width).toEqual(99);
        expect(style.backgroundColor).toEqual('red');
    });
    it('should set tab selected by pressing it', () => {
        const component = (0, react_native_testing_library_1.render)(<TestBottomNavigation selectedIndex={1}/>);
        react_native_testing_library_1.fireEvent.press(component.queryAllByType(react_native_1.TouchableOpacity)[0]);
        expect(component.queryAllByType(bottomNavigationTab_component_1.BottomNavigationTab)[0].props.selected).toEqual(true);
    });
    it('should request selecting', () => {
        const onSelect = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestBottomNavigation onSelect={onSelect}/>);
        react_native_testing_library_1.fireEvent.press(component.queryAllByType(react_native_1.TouchableOpacity)[1]);
        expect(onSelect).toHaveBeenCalledWith(1);
    });
});
//# sourceMappingURL=bottomNavigation.spec.js.map