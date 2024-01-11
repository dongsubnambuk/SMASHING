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
const calendar_component_1 = require("./calendar.component");
const type_1 = require("./type");
const moment_1 = require("@ui-kitten/moment");
const text_component_1 = require("../text/text.component");
describe('@calendar: component checks', () => {
    /*
     * Get rid of useNativeDriver warnings
     */
    beforeAll(() => {
        jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const TestCalendar = react_1.default.forwardRef((props, ref) => {
        const [date, setDate] = react_1.default.useState(props.date);
        const onSelect = (nextDate) => {
            setDate(date);
            props.onSelect?.(nextDate);
        };
        return (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
        <calendar_component_1.Calendar ref={ref} {...props} date={date} onSelect={onSelect}/>
      </theme_1.ApplicationProvider>);
    });
    TestCalendar.displayName = 'TestCalendar';
    it('should request date change on day select', () => {
        const onSelect = jest.fn((date) => {
            expect(date).toEqual(new Date(now.getFullYear(), now.getMonth(), 7));
        });
        const component = (0, react_native_testing_library_1.render)(<TestCalendar onSelect={onSelect}/>);
        react_native_testing_library_1.fireEvent.press(component.queryByText('7'));
    });
    it('should request date change on month select', async () => {
        const onSelect = jest.fn((date) => {
            expect(date).toEqual(new Date(now.getFullYear(), 6, 7));
        });
        const component = (0, react_native_testing_library_1.render)(<TestCalendar startView={type_1.CalendarViewModes.MONTH} onSelect={onSelect}/>);
        react_native_testing_library_1.fireEvent.press(component.queryByText('Jul'));
        const dayCell = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByText('7'));
        react_native_testing_library_1.fireEvent.press(dayCell);
    });
    it('should request date change on year select', async () => {
        const onSelect = jest.fn((date) => {
            expect(date).toEqual(new Date(now.getFullYear() + 1, 6, 7));
        });
        const component = (0, react_native_testing_library_1.render)(<TestCalendar startView={type_1.CalendarViewModes.YEAR} onSelect={onSelect}/>);
        react_native_testing_library_1.fireEvent.press(component.queryByText(`${now.getFullYear() + 1}`));
        const monthCell = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByText('Jul'));
        react_native_testing_library_1.fireEvent.press(monthCell);
        const dayCell = await (0, react_native_testing_library_1.waitForElement)(() => component.queryByText('7'));
        react_native_testing_library_1.fireEvent.press(dayCell);
    });
    it('should be rendered with view passed to startView prop', () => {
        const componentRef = react_1.default.createRef();
        (0, react_native_testing_library_1.render)(<TestCalendar ref={componentRef} startView={type_1.CalendarViewModes.YEAR}/>);
        expect(componentRef.current.state.viewMode).toEqual(type_1.CalendarViewModes.YEAR);
    });
    it('should change month to next when navigation button pressed', () => {
        const componentRef = react_1.default.createRef();
        const component = (0, react_native_testing_library_1.render)(<TestCalendar ref={componentRef}/>);
        const initialDate = componentRef.current.state.visibleDate;
        const navigationNextButton = component.queryAllByType(react_native_1.TouchableOpacity)[2];
        react_native_testing_library_1.fireEvent.press(navigationNextButton);
        const nextMonth = new Date(initialDate.getFullYear(), initialDate.getMonth() + 1, initialDate.getDate());
        expect(componentRef.current.state.visibleDate).toEqual(nextMonth);
    });
    it('should change month to previous when navigation button pressed', () => {
        const componentRef = react_1.default.createRef();
        const component = (0, react_native_testing_library_1.render)(<TestCalendar ref={componentRef}/>);
        const initialDate = componentRef.current.state.visibleDate;
        const navigationPrevButton = component.queryAllByType(react_native_1.TouchableOpacity)[1];
        react_native_testing_library_1.fireEvent.press(navigationPrevButton);
        const previousMonth = new Date(initialDate.getFullYear(), initialDate.getMonth() - 1, initialDate.getDate());
        expect(componentRef.current.state.visibleDate).toEqual(previousMonth);
    });
    it('should change year to next when navigation button pressed', () => {
        const componentRef = react_1.default.createRef();
        const component = (0, react_native_testing_library_1.render)(<TestCalendar ref={componentRef} startView={type_1.CalendarViewModes.YEAR}/>);
        const initialDate = componentRef.current.state.visibleDate;
        const navigationPrevButton = component.queryAllByType(react_native_1.TouchableOpacity)[2];
        react_native_testing_library_1.fireEvent.press(navigationPrevButton);
        const nextYear = new Date(initialDate.getFullYear() + 12, initialDate.getMonth(), initialDate.getDate());
        expect(componentRef.current.state.visibleDate).toEqual(initialDate);
        expect(componentRef.current.state.pickerDate).toEqual(nextYear);
    });
    it('should change year to previous when navigation button pressed', () => {
        const componentRef = react_1.default.createRef();
        const component = (0, react_native_testing_library_1.render)(<TestCalendar ref={componentRef} startView={type_1.CalendarViewModes.YEAR}/>);
        const initialDate = componentRef.current.state.visibleDate;
        const navigationPrevButton = component.queryAllByType(react_native_1.TouchableOpacity)[1];
        react_native_testing_library_1.fireEvent.press(navigationPrevButton);
        const nextYear = new Date(initialDate.getFullYear() - 12, initialDate.getMonth(), initialDate.getDate());
        expect(componentRef.current.state.visibleDate).toEqual(initialDate);
        expect(componentRef.current.state.pickerDate).toEqual(nextYear);
    });
    it('should show the selected date on load provided by date prop', () => {
        const date = new Date(2021, 2, 1);
        const componentRef = react_1.default.createRef();
        (0, react_native_testing_library_1.render)(<TestCalendar ref={componentRef} date={date}/>);
        const visibleDate = componentRef.current.state.visibleDate;
        expect(visibleDate.getFullYear()).toEqual(date.getFullYear());
        expect(visibleDate.getMonth()).toEqual(date.getMonth());
    });
    it('should show the specific date on load provided by initialVisibleDate prop', () => {
        const initialDate = new Date(2021, 2, 1);
        const componentRef = react_1.default.createRef();
        (0, react_native_testing_library_1.render)(<TestCalendar ref={componentRef} date={new Date()} initialVisibleDate={initialDate}/>);
        const visibleDate = componentRef.current.state.visibleDate;
        expect(visibleDate.getFullYear()).toEqual(initialDate.getFullYear());
        expect(visibleDate.getMonth()).toEqual(initialDate.getMonth());
    });
    it('should scroll to current month when scrollToToday called', () => {
        const componentRef = react_1.default.createRef();
        (0, react_native_testing_library_1.render)(<TestCalendar ref={componentRef} date={new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())}/>);
        componentRef.current.scrollToToday();
        expect(componentRef.current.state.visibleDate.getMonth()).toEqual(today.getMonth());
    });
    it('should scroll to the specific date when scrollToDate called', () => {
        const dateToScroll = new Date(2021, 2, 1);
        const componentRef = react_1.default.createRef();
        (0, react_native_testing_library_1.render)(<TestCalendar ref={componentRef} date={new Date()}/>);
        componentRef.current.scrollToDate(dateToScroll);
        const visibleDate = componentRef.current.state.visibleDate;
        expect(visibleDate.getFullYear()).toEqual(dateToScroll.getFullYear());
        expect(visibleDate.getMonth()).toEqual(dateToScroll.getMonth());
    });
    it('should render element provided with renderDay prop', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestCalendar renderDay={() => <react_native_1.View testID='@calendar/cell'/>}/>);
        const cells = component.queryAllByTestId('@calendar/cell');
        expect(cells.length).not.toEqual(0);
    });
    it('should render element provided with renderMonth prop', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestCalendar startView={type_1.CalendarViewModes.MONTH} renderMonth={() => <react_native_1.View testID='@calendar/cell'/>}/>);
        const cells = component.queryAllByTestId('@calendar/cell');
        expect(cells.length).not.toEqual(0);
    });
    it('should render element provided with renderYear prop', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestCalendar startView={type_1.CalendarViewModes.YEAR} renderYear={() => <react_native_1.View testID='@calendar/cell'/>}/>);
        const cells = component.queryAllByTestId('@calendar/cell');
        expect(cells.length).not.toEqual(0);
    });
    it('should render element provided with renderFooter prop', async () => {
        const component = (0, react_native_testing_library_1.render)(<TestCalendar startView={type_1.CalendarViewModes.YEAR} renderFooter={() => <react_native_1.View testID='@calendar/footer'/>}/>);
        expect(component.queryByTestId('@calendar/footer')).toBeTruthy();
    });
    it('should work with Moment', async () => {
        const dateService = new moment_1.MomentDateService();
        const onSelect = jest.fn((moment) => {
            expect(moment.toDate).toBeTruthy();
        });
        const component = (0, react_native_testing_library_1.render)(<TestCalendar dateService={dateService} onSelect={onSelect}/>);
        react_native_testing_library_1.fireEvent.press(component.getByText('7'));
    });
    it('should call onMonthChange function', async () => {
        const onVisibleDateChange = jest.fn();
        const component = (0, react_native_testing_library_1.render)(<TestCalendar onVisibleDateChange={onVisibleDateChange}/>);
        const navigationPrevButton = component.queryAllByType(react_native_1.TouchableOpacity)[1];
        const navigationNextButton = component.queryAllByType(react_native_1.TouchableOpacity)[2];
        react_native_testing_library_1.fireEvent.press(navigationPrevButton);
        expect(onVisibleDateChange).toBeCalledTimes(1);
        react_native_testing_library_1.fireEvent.press(navigationNextButton);
        expect(onVisibleDateChange).toBeCalledTimes(2);
    });
    it('should render custom left arrow', () => {
        const onVisibleDateChange = jest.fn();
        const renderArrow = (props) => {
            return (<react_native_1.TouchableOpacity testID='@arrow/left' onPress={props.onPress}>
          <text_component_1.Text>
            LEFT
          </text_component_1.Text>
        </react_native_1.TouchableOpacity>);
        };
        const component = (0, react_native_testing_library_1.render)(<TestCalendar renderArrowLeft={renderArrow} onVisibleDateChange={onVisibleDateChange}/>);
        const leftArrow = component.queryByTestId('@arrow/left');
        react_native_testing_library_1.fireEvent.press(leftArrow);
        expect(onVisibleDateChange).toBeCalled();
    });
    it('should render custom right arrow', () => {
        const onVisibleDateChange = jest.fn();
        const renderArrow = (props) => {
            return (<react_native_1.TouchableOpacity testID='@arrow/right' onPress={props.onPress}>
          <text_component_1.Text>
            RIGHT
          </text_component_1.Text>
        </react_native_1.TouchableOpacity>);
        };
        const component = (0, react_native_testing_library_1.render)(<TestCalendar renderArrowRight={renderArrow} onVisibleDateChange={onVisibleDateChange}/>);
        const leftArrow = component.queryByTestId('@arrow/right');
        react_native_testing_library_1.fireEvent.press(leftArrow);
        expect(onVisibleDateChange).toBeCalled();
    });
});
//# sourceMappingURL=calendar.spec.js.map