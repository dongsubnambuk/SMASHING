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
const tooltip_component_1 = require("./tooltip.component");
/*
 * Mock UIManager since Tooltip relies on native measurements
 */
jest.mock('react-native', () => {
    const ActualReactNative = jest.requireActual('react-native');
    ActualReactNative.UIManager.measureInWindow = (node, callback) => {
        callback(0, 0, 42, 42);
    };
    return ActualReactNative;
});
describe('@tooltip: component checks', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
    const TestTooltip = react_1.default.forwardRef((props, ref) => {
        const [visible, setVisible] = react_1.default.useState(props.visible || false);
        const toggleTooltip = () => {
            setVisible(!visible);
        };
        return (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
        <tooltip_component_1.Tooltip ref={ref} visible={visible} anchor={() => (<react_native_1.Button testID='@tooltip/toggle-button' title='' onPress={toggleTooltip}/>)} {...props}>
          {props.children}
        </tooltip_component_1.Tooltip>
      </theme_1.ApplicationProvider>);
    });
    TestTooltip.displayName = 'TestTooltip';
    /*
     * In this test:
     * [0] for `anchor` component
     * [1] for modal backdrop
     */
    const touchables = {
        findToggleButton: (api) => api.queryByTestId('@tooltip/toggle-button'),
        findBackdropTouchable: (api) => api.queryAllByType(react_native_1.TouchableOpacity)[1],
    };
    it('should render function element passed to `anchor` prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestTooltip />);
        expect(touchables.findToggleButton(component)).toBeTruthy();
    });
    it('should not render content when not visible', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestTooltip visible={false}>
        I love Babel
      </TestTooltip>);
        const text = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByText('I love Babel'));
        expect(text).toBeFalsy();
    });
    it('should render content when becomes visible', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestTooltip>
        I love Babel
      </TestTooltip>);
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        const text = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByText('I love Babel'));
        expect(text).toBeTruthy();
    });
    it('should render content as component when becomes visible', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestTooltip>
        {props => (<react_native_1.Text {...props}>
            I love Babel
          </react_native_1.Text>)}
      </TestTooltip>);
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        const text = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByText('I love Babel'));
        expect(text).toBeTruthy();
    });
    it('should render content as pure JSX component when becomes visible', async () => {
        const childrenComponent = (<react_native_1.View>
        <react_native_1.Text>
          I love Babel
        </react_native_1.Text>
      </react_native_1.View>);
        const component = (0, react_native_testing_library_1.render)(<TestTooltip>
        {childrenComponent}
      </TestTooltip>);
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        const text = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByText('I love Babel'));
        expect(text).toBeTruthy();
    });
    it('should render component passed to accessoryLeft prop when visible', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestTooltip accessoryLeft={props => (<react_native_1.View {...props} testID='@tooltip/accessory-left'/>)}>
        I love Babel
      </TestTooltip>);
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        const accessoryLeft = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByTestId('@tooltip/accessory-left'));
        expect(accessoryLeft).toBeTruthy();
    });
    it('should render component passed to accessoryRight prop when visible', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestTooltip accessoryRight={props => (<react_native_1.View {...props} testID='@tooltip/accessory-right'/>)}>
        I love Babel
      </TestTooltip>);
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        const accessoryRight = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByTestId('@tooltip/accessory-right'));
        expect(accessoryRight).toBeTruthy();
    });
    it('should call onBackdropPress', async () => {
        const onBackdropPress = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestTooltip onBackdropPress={onBackdropPress}/>);
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        await (0, react_native_testing_library_1.waitForElement)(() => {
            react_native_testing_library_1.fireEvent.press(touchables.findBackdropTouchable(component));
        });
        expect(onBackdropPress).toBeCalled();
    });
    it('should style backdrop with backdropStyle prop', async () => {
        const styles = { backgroundColor: 'red' };
        const component = (0, react_native_testing_library_1.render)(<TestTooltip backdropStyle={styles}/>);
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        const backdrop = await (0, react_native_testing_library_1.waitForElement)(() => touchables.findBackdropTouchable(component));
        expect(react_native_1.StyleSheet.flatten(backdrop.props.style).backgroundColor).toEqual('red');
    });
});
//# sourceMappingURL=tooltip.spec.js.map