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
const drawer_component_1 = require("./drawer.component");
const drawerItem_component_1 = require("./drawerItem.component");
describe('@drawer-item: component checks', () => {
    const TestDrawerItem = (props) => (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
      <drawerItem_component_1.DrawerItem {...props}/>
    </theme_1.ApplicationProvider>);
    it('should render text passed to title prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestDrawerItem title='I love Babel'/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render function component passed to title prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestDrawerItem title={props => (<react_native_1.Text {...props}>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render pure JSX component passed to title prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestDrawerItem title={(<react_native_1.Text>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render function components passed to accessoryLeft or accessoryRight props', () => {
        const AccessoryLeft = (props) => (<react_native_1.Image {...props} source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>);
        const AccessoryRight = (props) => (<react_native_1.Image {...props} source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' }}/>);
        const component = (0, react_native_testing_library_1.render)(<TestDrawerItem accessoryLeft={AccessoryLeft} accessoryRight={AccessoryRight}/>);
        const [accessoryLeft, accessoryRight] = component.queryAllByType(react_native_1.Image);
        expect(accessoryLeft).toBeTruthy();
        expect(accessoryRight).toBeTruthy();
        expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
        expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
    });
    it('should render pure JSX components passed to accessoryLeft or accessoryRight props', () => {
        const AccessoryLeft = (<react_native_1.Image source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>);
        const AccessoryRight = (<react_native_1.Image source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' }}/>);
        const component = (0, react_native_testing_library_1.render)(<TestDrawerItem accessoryLeft={AccessoryLeft} accessoryRight={AccessoryRight}/>);
        const [accessoryLeft, accessoryRight] = component.queryAllByType(react_native_1.Image);
        expect(accessoryLeft).toBeTruthy();
        expect(accessoryRight).toBeTruthy();
        expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
        expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
    });
    it('should call onPress', () => {
        const onPress = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestDrawerItem onPress={onPress}/>);
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onPress).toHaveBeenCalled();
    });
});
describe('@drawer: component checks', () => {
    const TestDrawer = (props) => (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
      <drawer_component_1.Drawer {...props}>
        <drawerItem_component_1.DrawerItem />
        <drawerItem_component_1.DrawerItem />
      </drawer_component_1.Drawer>
    </theme_1.ApplicationProvider>);
    it('should render 2 drawer items passed to children', () => {
        const component = (0, react_native_testing_library_1.render)(<TestDrawer />);
        const items = component.queryAllByType(drawerItem_component_1.DrawerItem);
        expect(items.length).toEqual(2);
    });
    it('should render function component passed to header prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestDrawer header={() => (<react_native_1.Text>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render pure JSX component passed to header prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestDrawer header={(<react_native_1.Text>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render function component passed to footer prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestDrawer footer={() => (<react_native_1.Text>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render pure JSX component passed to footer prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestDrawer footer={(<react_native_1.Text>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
});
//# sourceMappingURL=drawer.spec.js.map