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
const tab_component_1 = require("./tab.component");
const tabBar_component_1 = require("./tabBar.component");
const tabView_component_1 = require("./tabView.component");
describe('@tab: component checks', () => {
    const TestTab = (props) => (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
      <tab_component_1.Tab {...props}/>
    </theme_1.ApplicationProvider>);
    it('should render function image component passed to icon prop', () => {
        const Icon = (props) => (<react_native_1.Image {...props} source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>);
        const component = (0, react_native_testing_library_1.render)(<TestTab icon={Icon}/>);
        const image = component.queryByType(react_native_1.Image);
        expect(image).toBeTruthy();
        expect(image.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
    });
    it('should render JSX image component passed to icon prop', () => {
        const Icon = (<react_native_1.Image source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>);
        const component = (0, react_native_testing_library_1.render)(<TestTab icon={Icon}/>);
        const image = component.queryByType(react_native_1.Image);
        expect(image).toBeTruthy();
        expect(image.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
    });
    it('should render string passed to title prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTab title='I love Babel'/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render function component passed to title prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTab title={props => (<react_native_1.Text {...props}>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render pure JSX component passed to title prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTab title={(<react_native_1.Text>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
});
describe('@tab-bar: component checks', () => {
    const TestTabBar = (props) => {
        const [selectedIndex, setSelectedIndex] = react_1.default.useState(props.selectedIndex);
        return (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
        <tabBar_component_1.TabBar testID='@tab-bar' selectedIndex={selectedIndex} onSelect={setSelectedIndex} {...props}>
          <tab_component_1.Tab title='Tab 0'/>
          <tab_component_1.Tab title='Tab 1'/>
        </tabBar_component_1.TabBar>
      </theme_1.ApplicationProvider>);
    };
    const touchables = {
        findTabTouchable: (api, index) => api.queryAllByType(react_native_1.TouchableOpacity)[index],
    };
    it('should render 2 tabs passed to children', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTabBar />);
        expect(component.queryAllByType(tab_component_1.Tab).length).toEqual(2);
    });
    it('should set tab selected by passing selectedIndex prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTabBar selectedIndex={1}/>);
        expect(component.queryAllByType(tab_component_1.Tab)[1].props.selected).toEqual(true);
    });
    it('should set tab selected by pressing it', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTabBar />);
        react_native_testing_library_1.fireEvent.press(touchables.findTabTouchable(component, 1));
        expect(component.queryAllByType(tab_component_1.Tab)[1].props.selected).toEqual(true);
    });
    it('should render tab indicator correctly', () => {
        const styles = { width: 99, backgroundColor: 'red' };
        const component = (0, react_native_testing_library_1.render)(<TestTabBar indicatorStyle={styles}/>);
        const el = component.queryByTestId('indicator body');
        const style = react_native_1.StyleSheet.flatten(el.props.style);
        expect(style.width).toEqual(99);
        expect(style.backgroundColor).toEqual('red');
    });
});
describe('@tab-view: component checks', () => {
    const TestTabView = (props) => (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
      <tabView_component_1.TabView {...props}>
        <tab_component_1.Tab>
          <react_native_1.Text>
            Tab 0
          </react_native_1.Text>
        </tab_component_1.Tab>
        <tab_component_1.Tab>
          <react_native_1.Text>
            Tab 1
          </react_native_1.Text>
        </tab_component_1.Tab>
      </tabView_component_1.TabView>
    </theme_1.ApplicationProvider>);
    it('should render 2 tabs passed to children', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTabView />);
        expect(component.queryAllByType(tab_component_1.Tab).length).toEqual(2);
    });
    it('should render 2 content elements passed to tab children', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTabView />);
        expect(component.queryByText('Tab 0')).toBeTruthy();
        expect(component.queryByText('Tab 1')).toBeTruthy();
    });
    it('should not render content elements if disabled by shouldLoadComponent prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTabView shouldLoadComponent={index => index !== 1}/>);
        expect(component.queryByText('Tab 0')).toBeTruthy();
        expect(component.queryByText('Tab 1')).toBeFalsy();
    });
    it('should render tab indicator correctly', () => {
        const styles = { width: 99, backgroundColor: 'red' };
        const component = (0, react_native_testing_library_1.render)(<TestTabView indicatorStyle={styles}/>);
        const el = component.queryByTestId('indicator body');
        const style = react_native_1.StyleSheet.flatten(el.props.style);
        expect(style.width).toEqual(99);
        expect(style.backgroundColor).toEqual('red');
    });
});
//# sourceMappingURL=tab.spec.js.map