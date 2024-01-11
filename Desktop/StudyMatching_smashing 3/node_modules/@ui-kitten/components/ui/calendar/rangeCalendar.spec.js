"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_testing_library_1 = require("react-native-testing-library");
const eva_1 = require("@eva-design/eva");
const theme_1 = require("../../theme");
const rangeCalendar_component_1 = require("./rangeCalendar.component");
const react_native_1 = require("react-native");
const text_component_1 = require("../text/text.component");
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
describe('@range-calendar: component checks', () => {
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
    const TestRangeCalendar = react_1.default.forwardRef((props, ref) => {
        const [range, setRange] = react_1.default.useState(props.range || {});
        const onSelect = (nextRange) => {
            setRange(nextRange);
            props.onSelect?.(nextRange);
        };
        return (<theme_1.ApplicationProvider mapping={eva_1.mapping} theme={eva_1.light}>
        <rangeCalendar_component_1.RangeCalendar ref={ref} {...props} range={range} onSelect={onSelect}/>
      </theme_1.ApplicationProvider>);
    });
    TestRangeCalendar.displayName = 'TestRangeCalendar';
    it('should call onSelect only with start date', () => {
        const onSelect = jest.fn((range) => {
            expect(range).toEqual({
                startDate: new Date(now.getFullYear(), now.getMonth(), 7),
                endDate: null,
            });
        });
        const component = (0, react_native_testing_library_1.render)(<TestRangeCalendar onSelect={onSelect}/>);
        react_native_testing_library_1.fireEvent.press(component.queryAllByText('7')[0]);
    });
    it('should call onSelect with start and end dates if start date passed to props', () => {
        const onSelect = jest.fn((range) => {
            expect(range).toEqual({
                startDate: new Date(now.getFullYear(), now.getMonth(), 7),
                endDate: new Date(now.getFullYear(), now.getMonth(), 8),
            });
        });
        const component = (0, react_native_testing_library_1.render)(<TestRangeCalendar range={{ startDate: new Date(now.getFullYear(), now.getMonth(), 7) }} onSelect={onSelect}/>);
        react_native_testing_library_1.fireEvent.press(component.queryAllByText('8')[0]);
    });
    it('should call onSelect only with start date if start and end dates passed to props', () => {
        const onSelect = jest.fn((range) => {
            expect(range).toEqual({
                startDate: new Date(now.getFullYear(), now.getMonth(), 7),
                endDate: null,
            });
        });
        const initialRange = {
            startDate: new Date(now.getFullYear(), now.getMonth(), 7),
            endDate: new Date(now.getFullYear(), now.getMonth(), 8),
        };
        const component = (0, react_native_testing_library_1.render)(<TestRangeCalendar range={initialRange} onSelect={onSelect}/>);
        react_native_testing_library_1.fireEvent.press(component.queryAllByText('7')[0]);
    });
    it('should show startDate of the selected range on load provided by range prop', () => {
        const date = new Date(2021, 2, 1);
        const componentRef = react_1.default.createRef();
        (0, react_native_testing_library_1.render)(<TestRangeCalendar ref={componentRef} range={{
                startDate: date,
                endDate: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 10),
            }}/>);
        const visibleDate = componentRef.current.state.visibleDate;
        expect(visibleDate.getFullYear()).toEqual(date.getFullYear());
        expect(visibleDate.getMonth()).toEqual(date.getMonth());
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
        const component = (0, react_native_testing_library_1.render)(<TestRangeCalendar renderArrowLeft={renderArrow} onVisibleDateChange={onVisibleDateChange}/>);
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
        const component = (0, react_native_testing_library_1.render)(<TestRangeCalendar renderArrowRight={renderArrow} onVisibleDateChange={onVisibleDateChange}/>);
        const leftArrow = component.queryByTestId('@arrow/right');
        react_native_testing_library_1.fireEvent.press(leftArrow);
        expect(onVisibleDateChange).toBeCalled();
    });
});
//# sourceMappingURL=rangeCalendar.spec.js.map