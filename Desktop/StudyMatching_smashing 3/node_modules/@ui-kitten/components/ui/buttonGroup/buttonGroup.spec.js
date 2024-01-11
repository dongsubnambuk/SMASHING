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
const react_native_testing_library_1 = require("react-native-testing-library");
const eva_1 = require("@eva-design/eva");
const theme_1 = require("../../theme");
const buttonGroup_component_1 = require("./buttonGroup.component");
const button_component_1 = require("../button/button.component");
describe('@button-group: component checks', () => {
    const TestButtonGroup = (props) => (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
      <buttonGroup_component_1.ButtonGroup {...props}>
        <button_component_1.Button />
        <button_component_1.Button />
      </buttonGroup_component_1.ButtonGroup>
    </theme_1.ApplicationProvider>);
    it('should render 2 buttons', () => {
        const component = (0, react_native_testing_library_1.render)(<TestButtonGroup />);
        expect(component.queryAllByType(button_component_1.Button).length).toEqual(2);
    });
    it('should render outline buttons', () => {
        const component = (0, react_native_testing_library_1.render)(<TestButtonGroup appearance='outline'/>);
        const buttons = component.getAllByType(button_component_1.Button);
        const buttonAppearance = buttons.reduce((current, child) => {
            return child.props.appearance;
        }, 'outline');
        expect(buttonAppearance).toEqual('outline');
    });
    it('should render ghost buttons', () => {
        const component = (0, react_native_testing_library_1.render)(<TestButtonGroup appearance='ghost'/>);
        const buttons = component.getAllByType(button_component_1.Button);
        const buttonAppearance = buttons.reduce((current, child) => {
            return child.props.appearance;
        }, 'ghost');
        expect(buttonAppearance).toEqual('ghost');
    });
    it('should render giant buttons', () => {
        const component = (0, react_native_testing_library_1.render)(<TestButtonGroup size='giant'/>);
        const buttons = component.getAllByType(button_component_1.Button);
        const buttonSize = buttons.reduce((current, child) => {
            return child.props.size;
        }, 'giant');
        expect(buttonSize).toEqual('giant');
    });
    it('should render success buttons', () => {
        const component = (0, react_native_testing_library_1.render)(<TestButtonGroup status='success'/>);
        const buttons = component.getAllByType(button_component_1.Button);
        const buttonStatus = buttons.reduce((current, child) => {
            return child.props.status;
        }, 'success');
        expect(buttonStatus).toEqual('success');
    });
});
//# sourceMappingURL=buttonGroup.spec.js.map