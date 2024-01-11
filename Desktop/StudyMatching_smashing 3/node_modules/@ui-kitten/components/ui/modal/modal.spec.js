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
const modal_component_1 = require("./modal.component");
describe('@modal: component checks', () => {
    const TestModal = (props) => {
        const [visible, setVisible] = react_1.default.useState(props.visible || false);
        const [text, setText] = react_1.default.useState('I love Babel');
        const toggleVisible = () => {
            setVisible(!visible);
        };
        const changeText = () => {
            setText('I love Jest');
        };
        return (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
        <>
          <modal_component_1.Modal {...props} visible={visible}>
            <react_native_1.Text>
              {text}
            </react_native_1.Text>
            <react_native_1.Button testID='@modal/change-text-button' title='' onPress={changeText}/>
          </modal_component_1.Modal>
          <react_native_1.Button testID='@modal/toggle-button' title='' onPress={toggleVisible}/>
        </>
      </theme_1.ApplicationProvider>);
    };
    /*
     * In this test:
     * [0] for @modal/toggle-button,
     * [1] for backdrop
     * [2] for @modal/change-text-button
     */
    const touchables = {
        findToggleButton: (api) => api.queryByTestId('@modal/toggle-button'),
        findBackdropTouchable: (api) => api.queryByTestId('@backdrop'),
        findChangeTextButton: (api) => api.queryByTestId('@modal/change-text-button'),
    };
    it('should render nothing when invisible', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestModal />);
        expect(component.queryByText('I love Babel')).toBeFalsy();
    });
    it('should render element passed to children when becomes visible', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestModal />);
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        const text = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByText('I love Babel'));
        expect(text).toBeTruthy();
    });
    it('should render nothing when becomes invisible', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestModal />);
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        await (0, react_native_testing_library_1.waitForElement)(() => {
            react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        });
        const text = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByText('I love Babel'));
        expect(text).toBeFalsy();
    });
    it('should be able to interact with content element passed to children', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestModal />);
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        await (0, react_native_testing_library_1.waitForElement)(() => {
            react_native_testing_library_1.fireEvent.press(touchables.findChangeTextButton(component));
        });
        const text = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByText('I love Jest'));
        expect(text).toBeTruthy();
    });
    it('should call onBackdropPress', async () => {
        const onBackdropPress = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestModal onBackdropPress={onBackdropPress}/>);
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        await (0, react_native_testing_library_1.waitForElement)(() => {
            react_native_testing_library_1.fireEvent.press(touchables.findBackdropTouchable(component));
        });
        expect(onBackdropPress).toBeCalled();
    });
    it('should style backdrop with backdropStyle prop', async () => {
        const styles = { backgroundColor: 'red' };
        const component = (0, react_native_testing_library_1.render)(<TestModal backdropStyle={styles}/>);
        react_native_testing_library_1.fireEvent.press(touchables.findToggleButton(component));
        const backdrop = await (0, react_native_testing_library_1.waitForElement)(() => touchables.findBackdropTouchable(component));
        expect(react_native_1.StyleSheet.flatten(backdrop.props.style).backgroundColor).toEqual('red');
    });
});
//# sourceMappingURL=modal.spec.js.map