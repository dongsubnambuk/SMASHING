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
const viewPager_component_1 = require("./viewPager.component");
describe('@view-pager: component checks', () => {
    const getComponentProps = (component) => {
        return component._fiber.pendingProps;
    };
    const TestViewPager = (props) => (<viewPager_component_1.ViewPager {...props}/>);
    it('should render two tabs', () => {
        const component = (0, react_native_testing_library_1.render)(<TestViewPager>
        <react_native_1.Text>
          Tab 0
        </react_native_1.Text>
        <react_native_1.Text>
          Tab 1
        </react_native_1.Text>
      </TestViewPager>);
        expect(component.queryByText('Tab 0')).toBeTruthy();
        expect(component.queryByText('Tab 1')).toBeTruthy();
    });
    it('should call shouldLoadComponent for each child', () => {
        const shouldLoadComponent = jest.fn();
        (0, react_native_testing_library_1.render)(<TestViewPager shouldLoadComponent={shouldLoadComponent}>
        <react_native_1.Text>
          Tab 0
        </react_native_1.Text>
        <react_native_1.Text>
          Tab 1
        </react_native_1.Text>
      </TestViewPager>);
        expect(shouldLoadComponent).toBeCalledTimes(2);
    });
    it('should not render child if disabled by shouldLoadComponent', () => {
        const component = (0, react_native_testing_library_1.render)(<TestViewPager shouldLoadComponent={index => index !== 1}>
        <react_native_1.Text>
          Tab 0
        </react_native_1.Text>
        <react_native_1.Text>
          Tab 1
        </react_native_1.Text>
      </TestViewPager>);
        expect(component.queryByText('Tab 0')).toBeTruthy();
        expect(component.queryByText('Tab 1')).toBeFalsy();
    });
    it('should disable swipe gesture when swipeEnabled is false', () => {
        const component = (0, react_native_testing_library_1.render)(<TestViewPager swipeEnabled={false}>
        <react_native_1.Text>
          Tab 0
        </react_native_1.Text>
        <react_native_1.Text>
          Tab 1
        </react_native_1.Text>
      </TestViewPager>);
        const viewPager = component.UNSAFE_queryByType(viewPager_component_1.ViewPager);
        expect(getComponentProps(viewPager).onStartShouldSetResponder).toBeFalsy();
        expect(getComponentProps(viewPager).onMoveShouldSetResponder).toBeFalsy();
        expect(getComponentProps(viewPager).onMoveShouldSetResponderCapture).toBeFalsy();
        expect(getComponentProps(viewPager).onResponderGrant).toBeFalsy();
        expect(getComponentProps(viewPager).onResponderReject).toBeFalsy();
        expect(getComponentProps(viewPager).onResponderRelease).toBeFalsy();
        expect(getComponentProps(viewPager).onResponderStart).toBeFalsy();
        expect(getComponentProps(viewPager).onResponderMove).toBeFalsy();
        expect(getComponentProps(viewPager).onResponderEnd).toBeFalsy();
        expect(getComponentProps(viewPager).onResponderTerminate).toBeFalsy();
        expect(getComponentProps(viewPager).onResponderTerminationRequest).toBeFalsy();
    });
});
//# sourceMappingURL=viewPager.spec.js.map