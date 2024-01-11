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
const autocomplete_component_1 = require("./autocomplete.component");
const autocompleteItem_component_1 = require("./autocompleteItem.component");
const devsupport_1 = require("../../devsupport");
/*
 * Mock UIManager since Autocomplete relies on native measurements
 */
jest.mock('react-native', () => {
    const ActualReactNative = jest.requireActual('react-native');
    ActualReactNative.UIManager.measureInWindow = (node, callback) => {
        callback(0, 0, 42, 42);
    };
    return ActualReactNative;
});
describe('@autocomplete-item: component checks', () => {
    const TestAutocompleteItem = (props) => (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
      <autocompleteItem_component_1.AutocompleteItem {...props}/>
    </theme_1.ApplicationProvider>);
    it('should render text passed to title prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestAutocompleteItem title='I love Babel'/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render component passed to title prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestAutocompleteItem title={props => (<react_native_1.Text {...props}>
I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render text passed to description prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestAutocompleteItem description='I love Babel'/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render component passed to description prop', () => {
        const component = (0, react_native_testing_library_1.render)(<TestAutocompleteItem description={props => (<react_native_1.Text {...props}>
I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render components passed to accessoryLeft or accessoryRight props', () => {
        const AccessoryLeft = (props) => (<react_native_1.Image {...props} source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>);
        const AccessoryRight = (props) => (<react_native_1.Image {...props} source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' }}/>);
        const component = (0, react_native_testing_library_1.render)(<TestAutocompleteItem accessoryLeft={AccessoryLeft} accessoryRight={AccessoryRight}/>);
        const [accessoryLeft, accessoryRight] = component.queryAllByType(react_native_1.Image);
        expect(accessoryLeft).toBeTruthy();
        expect(accessoryRight).toBeTruthy();
        expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
        expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
    });
    it('should call onPress', () => {
        const onPress = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestAutocompleteItem onPress={onPress}/>);
        react_native_testing_library_1.fireEvent.press(component.queryByType(react_native_1.TouchableOpacity));
        expect(onPress).toHaveBeenCalled();
    });
    it('should call onPressIn', () => {
        const onPressIn = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestAutocompleteItem onPressIn={onPressIn}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'pressIn');
        expect(onPressIn).toBeCalled();
    });
    it('should call onPressOut', () => {
        const onPressOut = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestAutocompleteItem onPressOut={onPressOut}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TouchableOpacity), 'pressOut');
        expect(onPressOut).toBeCalled();
    });
});
describe('@autocomplete: component checks', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
    const movies = [
        { title: 'Option 1' },
        { title: 'Option 2' },
    ];
    const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());
    const TestAutocomplete = react_1.default.forwardRef((props, ref) => {
        const [value, setValue] = react_1.default.useState(props.value);
        const [data, setData] = react_1.default.useState(movies);
        const onSelect = (index) => {
            setValue(movies[index].title);
            props.onSelect?.(index);
        };
        const onChangeText = (query) => {
            setValue(query);
            setData(movies.filter(item => filter(item, query)));
            props.onChangeText?.(query);
        };
        const renderOption = (item, index) => (<autocompleteItem_component_1.AutocompleteItem key={index} title={item.title}/>);
        return (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
        <autocomplete_component_1.Autocomplete ref={ref} {...props} value={value} onSelect={onSelect} onChangeText={onChangeText}>
          {data.map(renderOption)}
        </autocomplete_component_1.Autocomplete>
      </theme_1.ApplicationProvider>);
    });
    TestAutocomplete.displayName = 'TestAutocomplete';
    it('should render TextInput', () => {
        const component = (0, react_native_testing_library_1.render)(<TestAutocomplete />);
        expect(component.queryByType(react_native_1.TextInput)).toBeTruthy();
    });
    it('should render placeholder', () => {
        const component = (0, react_native_testing_library_1.render)(<TestAutocomplete placeholder='I love Babel'/>);
        expect(component.queryByPlaceholder('I love Babel')).toBeTruthy();
    });
    it('should not render options when not focused', () => {
        const component = (0, react_native_testing_library_1.render)(<TestAutocomplete />);
        expect(component.queryByText('Option 1')).toBeFalsy();
        expect(component.queryByText('Option 2')).toBeFalsy();
    });
    it('should render options when becomes focused', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestAutocomplete />);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TextInput), 'focus');
        const firstOption = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByText('Option 1'));
        const secondOption = component.queryByText('Option 2');
        expect(firstOption).toBeTruthy();
        expect(secondOption).toBeTruthy();
    });
    it('should request text change', async () => {
        const onChangeText = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestAutocomplete onChangeText={onChangeText}/>);
        react_native_testing_library_1.fireEvent.changeText(component.queryByType(react_native_1.TextInput), 'I love Babel');
        expect(onChangeText).toBeCalledWith('I love Babel');
    });
    it('should update options list on text change', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestAutocomplete />);
        (0, react_native_testing_library_1.fireEvent)(component.queryByTestId('@autocomplete/input-anchor'), 'focus');
        await (0, react_native_testing_library_1.waitForElement)(() => null);
        react_native_testing_library_1.fireEvent.changeText(component.queryByTestId('@autocomplete/input'), '2');
        const firstOption = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByText('Option 1'));
        const secondOption = component.queryByText('Option 2');
        expect(firstOption).toBeFalsy();
        expect(secondOption).toBeTruthy();
    });
    it('should call onSelect when option is pressed', async () => {
        const onSelect = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestAutocomplete onSelect={onSelect}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByTestId('@autocomplete/input-anchor'), 'focus');
        await (0, react_native_testing_library_1.waitForElement)(() => null);
        react_native_testing_library_1.fireEvent.press(component.queryAllByType(devsupport_1.TouchableWithoutFeedback)[3]);
        expect(onSelect).toBeCalledWith(1);
    });
    it('should hide options when backdrop is pressed', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestAutocomplete />);
        (0, react_native_testing_library_1.fireEvent)(component.queryByTestId('@autocomplete/input-anchor'), 'focus');
        await (0, react_native_testing_library_1.waitForElement)(() => {
            react_native_testing_library_1.fireEvent.press(component.queryByTestId('@backdrop'));
        });
        const firstOption = await (0, react_native_testing_library_1.waitForElement)(() => component.queryAllByType(devsupport_1.TouchableWithoutFeedback)[2]);
        const secondOption = component.queryByText('Option 2');
        expect(firstOption).toBeFalsy();
        expect(secondOption).toBeFalsy();
    });
    it('should call onFocus', async () => {
        const onFocus = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestAutocomplete onFocus={onFocus}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TextInput), 'focus');
        expect(onFocus).toBeCalled();
    });
    it('should call onBlur', async () => {
        const onBlur = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestAutocomplete onBlur={onBlur}/>);
        (0, react_native_testing_library_1.fireEvent)(component.queryByType(react_native_1.TextInput), 'blur');
        expect(onBlur).toBeCalled();
    });
    it('should be able to call focus with ref', async () => {
        const componentRef = react_1.default.createRef();
        (0, react_native_testing_library_1.render)(<TestAutocomplete ref={componentRef}/>);
        expect(componentRef.current.focus).toBeTruthy();
        componentRef.current.focus();
    });
    it('should be able to call blur with ref', async () => {
        const componentRef = react_1.default.createRef();
        (0, react_native_testing_library_1.render)(<TestAutocomplete ref={componentRef}/>);
        expect(componentRef.current.blur).toBeTruthy();
        componentRef.current.blur();
    });
    it('should be able to call isFocused with ref', () => {
        const componentRef = react_1.default.createRef();
        (0, react_native_testing_library_1.render)(<TestAutocomplete ref={componentRef}/>);
        expect(componentRef.current.isFocused).toBeTruthy();
        componentRef.current.isFocused();
    });
    it('should be able to call clear with ref', () => {
        const componentRef = react_1.default.createRef();
        (0, react_native_testing_library_1.render)(<TestAutocomplete ref={componentRef}/>);
        expect(componentRef.current.clear).toBeTruthy();
        componentRef.current.clear();
    });
});
//# sourceMappingURL=autocomplete.spec.js.map