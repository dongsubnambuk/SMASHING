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
const radioGroup_component_1 = require("./radioGroup.component");
const radio_component_1 = require("../radio/radio.component");
describe('@radio-group: component checks', () => {
    const TestRadioGroup = (props) => {
        const [selectedIndex, setSelectedIndex] = react_1.default.useState(props.selectedIndex);
        const onCheckedChange = (index) => {
            setSelectedIndex(index);
            props.onChange?.(index);
        };
        return (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
        <radioGroup_component_1.RadioGroup selectedIndex={selectedIndex} onChange={onCheckedChange}>
          <radio_component_1.Radio>
            Option 1
          </radio_component_1.Radio>
          <radio_component_1.Radio>
            Option 2
          </radio_component_1.Radio>
        </radioGroup_component_1.RadioGroup>
      </theme_1.ApplicationProvider>);
    };
    it('should have 2 radios', () => {
        const component = (0, react_native_testing_library_1.render)(<TestRadioGroup />);
        expect(component.queryAllByType(radio_component_1.Radio).length).toEqual(2);
    });
    it('should set radio selected by passing selectedIndex prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestRadioGroup selectedIndex={1}/>);
        expect(component.queryAllByType(radio_component_1.Radio)[1].props.checked).toEqual(true);
    });
    it('should set radio selected by pressing it', () => {
        const component = (0, react_native_testing_library_1.render)(<TestRadioGroup selectedIndex={1}/>);
        react_native_testing_library_1.fireEvent.press(component.queryAllByType(react_native_1.TouchableOpacity)[0]);
        expect(component.queryAllByType(radio_component_1.Radio)[0].props.checked).toEqual(true);
    });
    it('should request selecting', () => {
        const onChange = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestRadioGroup onChange={onChange}/>);
        react_native_testing_library_1.fireEvent.press(component.queryAllByType(react_native_1.TouchableOpacity)[1]);
        expect(onChange).toHaveBeenCalledWith(1);
    });
});
//# sourceMappingURL=radioGroup.spec.js.map