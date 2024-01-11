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
const rangeDatepicker_component_1 = require("./rangeDatepicker.component");
const rangeCalendar_component_1 = require("../calendar/rangeCalendar.component");
const type_1 = require("../calendar/type");
jest.mock('react-native', () => {
    const ActualReactNative = jest.requireActual('react-native');
    ActualReactNative.UIManager.measureInWindow = (node, callback) => {
        callback(0, 0, 42, 42);
    };
    return ActualReactNative;
});
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
describe('@range-datepicker: component checks', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
    const TestRangeDatepicker = react_1.default.forwardRef((props, ref) => {
        const [range, setRange] = react_1.default.useState(props.range || {});
        const onSelect = (nextRange) => {
            setRange(nextRange);
            props.onSelect?.(nextRange);
        };
        return (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
        <rangeDatepicker_component_1.RangeDatepicker ref={ref} {...props} range={range} onSelect={onSelect}/>
      </theme_1.ApplicationProvider>);
    });
    TestRangeDatepicker.displayName = 'TestRangeDatepicker';
    /*
     * In this test:
     * [0] for input touchable
     * [1] for backdrop
     * ...rest for calendar touchable components
     */
    const touchables = {
        findInputTouchable: (api) => api.queryAllByType(react_native_1.TouchableOpacity)[0],
        findBackdropTouchable: (api) => api.queryAllByType(react_native_1.TouchableOpacity)[1],
    };
    it('should not render range calendar when not focused', () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker />);
        expect(component.queryByType(rangeCalendar_component_1.RangeCalendar)).toBeFalsy();
    });
    it('should render range calendar when becomes focused', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker />);
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const calendar = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByType(rangeCalendar_component_1.RangeCalendar));
        expect(calendar).toBeTruthy();
    });
    it('should render label as string', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker label='I love Babel'/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render label as component', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker label={props => (<react_native_1.Text {...props}>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render label as pure JSX component', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker label={(<react_native_1.Text>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render caption as string', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker caption='I love Babel'/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render caption as component', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker caption={props => (<react_native_1.Text {...props}>
          I love Babel
        </react_native_1.Text>)}/>);
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render caption', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker caption={props => (<react_native_1.View {...props} testID='caption icon'/>)}/>);
        expect(component.queryByTestId('caption icon')).toBeTruthy();
    });
    it('should render caption as pure JSX component', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker caption={<react_native_1.View testID='caption icon'/>}/>);
        expect(component.queryByTestId('caption icon')).toBeTruthy();
    });
    it('should render component passed to accessoryLeft prop', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker accessoryLeft={props => (<react_native_1.View {...props} testID='accessory left'/>)}/>);
        expect(component.queryByTestId('accessory left')).toBeTruthy();
    });
    it('should render pure JSX component passed to accessoryLeft prop', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker accessoryLeft={<react_native_1.View testID='accessory left'/>}/>);
        expect(component.queryByTestId('accessory left')).toBeTruthy();
    });
    it('should render component passed to accessoryRight prop', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker accessoryRight={props => (<react_native_1.View {...props} testID='accessory right'/>)}/>);
        expect(component.queryByTestId('accessory right')).toBeTruthy();
    });
    it('should render pure JSX component passed to accessoryRight prop', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker accessoryRight={<react_native_1.View testID='accessory right'/>}/>);
        expect(component.queryByTestId('accessory right')).toBeTruthy();
    });
    it('should call onSelect only with start date', async () => {
        const onSelect = jest.fn((range) => {
            expect(range).toEqual({
                startDate: new Date(today.getFullYear(), today.getMonth(), 7),
                endDate: null,
            });
        });
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker onSelect={onSelect}/>);
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const dateTouchable = await (0, react_native_testing_library_1.waitForElement)(() => component.queryAllByText('7')[0]);
        react_native_testing_library_1.fireEvent.press(dateTouchable);
    });
    it('should call onSelect with start and end dates if start date passed to props', async () => {
        const onSelect = jest.fn((range) => {
            expect(range).toEqual({
                startDate: new Date(today.getFullYear(), today.getMonth(), 7),
                endDate: new Date(today.getFullYear(), today.getMonth(), 8),
            });
        });
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker range={{ startDate: new Date(today.getFullYear(), today.getMonth(), 7) }} onSelect={onSelect}/>);
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const dateTouchable = await (0, react_native_testing_library_1.waitForElement)(() => component.queryAllByText('8')[0]);
        react_native_testing_library_1.fireEvent.press(dateTouchable);
    });
    it('should call onSelect only with start date if start and end dates passed to props', async () => {
        const onSelect = jest.fn((range) => {
            expect(range).toEqual({
                startDate: new Date(today.getFullYear(), today.getMonth(), 7),
                endDate: null,
            });
        });
        const initialRange = {
            startDate: new Date(today.getFullYear(), today.getMonth(), 7),
            endDate: new Date(today.getFullYear(), today.getMonth(), 8),
        };
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker range={initialRange} onSelect={onSelect}/>);
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const dateTouchable = await (0, react_native_testing_library_1.waitForElement)(() => component.queryAllByText('7')[0]);
        react_native_testing_library_1.fireEvent.press(dateTouchable);
    });
    it('should render element provided with renderDay prop', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker renderDay={() => <react_native_1.View testID='@range-datepicker/cell'/>}/>);
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const cells = await (0, react_native_testing_library_1.waitForElement)(() => component.queryAllByTestId('@range-datepicker/cell'));
        expect(cells.length).not.toEqual(0);
    });
    it('should render element provided with renderMonth prop', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker startView={type_1.CalendarViewModes.MONTH} renderMonth={() => <react_native_1.View testID='@range-datepicker/cell'/>}/>);
        react_native_testing_library_1.fireEvent.press(component.queryAllByType(react_native_1.TouchableOpacity)[0]);
        const cells = await (0, react_native_testing_library_1.waitForElement)(() => component.queryAllByTestId('@range-datepicker/cell'));
        expect(cells.length).not.toEqual(0);
    });
    it('should render element provided with renderYear prop', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker startView={type_1.CalendarViewModes.YEAR} renderYear={() => <react_native_1.View testID='@range-datepicker/cell'/>}/>);
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const cells = await (0, react_native_testing_library_1.waitForElement)(() => component.queryAllByTestId('@range-datepicker/cell'));
        expect(cells.length).not.toEqual(0);
    });
    it('should hide calendar when backdrop pressed', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker />);
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const backdrop = await (0, react_native_testing_library_1.waitForElement)(() => touchables.findBackdropTouchable(component));
        react_native_testing_library_1.fireEvent.press(backdrop);
        const calendar = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByType(rangeCalendar_component_1.RangeCalendar));
        expect(calendar).toBeFalsy();
    });
    it('should call onFocus when calendar becomes visible', async () => {
        const onFocus = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker onFocus={onFocus}/>);
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        await (0, react_native_testing_library_1.waitForElement)(() => null);
        expect(onFocus).toBeCalled();
    });
    it('should call onBlur when calendar becomes invisible', async () => {
        const onBlur = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker onBlur={onBlur}/>);
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const backdrop = await (0, react_native_testing_library_1.waitForElement)(() => touchables.findBackdropTouchable(component));
        react_native_testing_library_1.fireEvent.press(backdrop);
        expect(onBlur).toBeCalled();
    });
    it('should show calendar by calling `focus` with ref', async () => {
        const componentRef = react_1.default.createRef();
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker ref={componentRef}/>);
        componentRef.current.focus();
        const calendar = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByType(rangeCalendar_component_1.RangeCalendar));
        expect(calendar).toBeTruthy();
    });
    it('should hide calendar by calling `blur` with ref', async () => {
        const componentRef = react_1.default.createRef();
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker ref={componentRef}/>);
        componentRef.current.focus();
        await (0, react_native_testing_library_1.waitForElement)(() => null);
        componentRef.current.blur();
        const calendar = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByType(rangeCalendar_component_1.RangeCalendar));
        expect(calendar).toBeFalsy();
    });
    it('should return false if calendar not visible by calling `isFocused` with ref', async () => {
        const componentRef = react_1.default.createRef();
        (0, react_native_testing_library_1.render)(<TestRangeDatepicker ref={componentRef}/>);
        expect(componentRef.current.isFocused()).toEqual(false);
    });
    it('should return true if calendar visible by calling `isFocused` with ref', async () => {
        const componentRef = react_1.default.createRef();
        (0, react_native_testing_library_1.render)(<TestRangeDatepicker ref={componentRef}/>);
        componentRef.current.focus();
        await (0, react_native_testing_library_1.waitForElement)(() => null);
        expect(componentRef.current.isFocused()).toEqual(true);
    });
    it('should call onSelect with empty object when calling `clear` with ref', async () => {
        const componentRef = react_1.default.createRef();
        const onSelect = jest.fn();
        (0, react_native_testing_library_1.render)(<TestRangeDatepicker ref={componentRef} onSelect={onSelect}/>);
        componentRef.current.clear();
        await (0, react_native_testing_library_1.waitForElement)(() => null);
        expect(onSelect).toBeCalledWith({});
    });
    it('should call onPress', async () => {
        const onPress = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker onPress={onPress}/>);
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        expect(onPress).toBeCalled();
    });
    it('should call onPressIn', async () => {
        const onPressIn = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker onPressIn={onPressIn}/>);
        (0, react_native_testing_library_1.fireEvent)(touchables.findInputTouchable(component), 'pressIn');
        expect(onPressIn).toBeCalled();
    });
    it('should call onPressOut', async () => {
        const onPressOut = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker onPressOut={onPressOut}/>);
        (0, react_native_testing_library_1.fireEvent)(touchables.findInputTouchable(component), 'pressOut');
        expect(onPressOut).toBeCalled();
    });
    it('should show startDate of the selected range on load provided by range prop', () => {
        const date = new Date(2021, 2, 1);
        const componentRef = react_1.default.createRef();
        (0, react_native_testing_library_1.render)(<TestRangeDatepicker ref={componentRef} range={{
                startDate: date,
                endDate: new Date(2021, 3, 1),
            }}/>);
        componentRef.current.focus();
        // @ts-ignore: private calendarRef
        const calendarState = componentRef.current.calendarRef.current.state;
        expect(calendarState.visibleDate.getFullYear()).toEqual(date.getFullYear());
        expect(calendarState.visibleDate.getMonth()).toEqual(date.getMonth());
    });
    it('should show the specific date on load provided by initialVisibleDate prop', () => {
        const initialDate = new Date(2021, 2, 1);
        const componentRef = react_1.default.createRef();
        (0, react_native_testing_library_1.render)(<TestRangeDatepicker ref={componentRef} initialVisibleDate={initialDate}/>);
        componentRef.current.focus();
        // @ts-ignore: private calendarRef
        const visibleDate = componentRef.current.calendarRef.current.state.visibleDate;
        expect(visibleDate.getFullYear()).toEqual(initialDate.getFullYear());
        expect(visibleDate.getMonth()).toEqual(initialDate.getMonth());
    });
    it('should scroll to current month when scrollToToday called', () => {
        const componentRef = react_1.default.createRef();
        (0, react_native_testing_library_1.render)(<TestRangeDatepicker ref={componentRef} initialVisibleDate={new Date(2021, 2, 1)}/>);
        componentRef.current.focus();
        componentRef.current.scrollToToday();
        // @ts-ignore: private calendarRef
        const visibleDate = componentRef.current.calendarRef.current.state.visibleDate;
        expect(visibleDate.getFullYear()).toEqual(today.getFullYear());
        expect(visibleDate.getMonth()).toEqual(today.getMonth());
    });
    it('should scroll to the specific date when scrollToDate called', () => {
        const dateToScroll = new Date(2020, 1, 1);
        const componentRef = react_1.default.createRef();
        (0, react_native_testing_library_1.render)(<TestRangeDatepicker ref={componentRef} initialVisibleDate={new Date(2021, 2, 1)}/>);
        componentRef.current.focus();
        componentRef.current.scrollToDate(dateToScroll);
        // @ts-ignore: private calendarRef
        const visibleDate = componentRef.current.calendarRef.current.state.visibleDate;
        expect(visibleDate.getFullYear()).toEqual(dateToScroll.getFullYear());
        expect(visibleDate.getMonth()).toEqual(dateToScroll.getMonth());
    });
    it('should render custom left arrow', () => {
        const componentRef = react_1.default.createRef();
        const onVisibleDateChange = jest.fn();
        const renderArrow = (props) => {
            return (<react_native_1.TouchableOpacity testID="@arrow/left" onPress={props.onPress}>
          <react_native_1.Text>
            LEFT
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>);
        };
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker ref={componentRef} renderArrowLeft={renderArrow} onVisibleDateChange={onVisibleDateChange}/>);
        componentRef.current?.focus();
        const leftArrow = component.queryByTestId('@arrow/left');
        react_native_testing_library_1.fireEvent.press(leftArrow);
        expect(onVisibleDateChange).toBeCalled();
    });
    it('should render custom right arrow', () => {
        const componentRef = react_1.default.createRef();
        const onVisibleDateChange = jest.fn();
        const renderArrow = (props) => {
            return (<react_native_1.TouchableOpacity testID="@arrow/right" onPress={props.onPress}>
          <react_native_1.Text>
            RIGHT
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>);
        };
        const component = (0, react_native_testing_library_1.render)(<TestRangeDatepicker ref={componentRef} renderArrowRight={renderArrow} onVisibleDateChange={onVisibleDateChange}/>);
        componentRef.current?.focus();
        const leftArrow = component.queryByTestId('@arrow/right');
        react_native_testing_library_1.fireEvent.press(leftArrow);
        expect(onVisibleDateChange).toBeCalled();
    });
});
//# sourceMappingURL=rangeDatepicker.spec.js.map