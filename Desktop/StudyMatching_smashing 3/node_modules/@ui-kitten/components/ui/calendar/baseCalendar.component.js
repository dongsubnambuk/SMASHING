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
exports.BaseCalendarComponent = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const divider_component_1 = require("../divider/divider.component");
const calendarHeader_component_1 = require("./components/calendarHeader.component");
const calendarMonthHeader_component_1 = require("./components/calendarMonthHeader.component");
const calendarPicker_component_1 = require("./components/picker/calendarPicker.component");
const calendarDateContent_component_1 = require("./components/calendarDateContent.component");
const type_1 = require("./type");
const type_2 = require("./i18n/type");
const nativeDate_service_1 = require("./service/nativeDate.service");
const calendarData_service_1 = require("./service/calendarData.service");
const PICKER_ROWS = 4;
const PICKER_COLUMNS = 3;
const VIEWS_IN_PICKER = PICKER_ROWS * PICKER_COLUMNS;
class BaseCalendarComponent extends react_1.default.Component {
    static defaultProps = {
        dateService: new nativeDate_service_1.NativeDateService(),
        boundingMonth: true,
        startView: type_1.CalendarViewModes.DATE,
    };
    state = {
        viewMode: this.props.startView,
        visibleDate: this.dateService.getMonthStart(this.initialVisibleDate()),
        pickerDate: this.dateService.getMonthStart(this.initialVisibleDate()),
    };
    dataService = new calendarData_service_1.CalendarDataService(this.dateService);
    get dateService() {
        return this.props.dateService;
    }
    get min() {
        return this.props.min || this.dateService.getYearStart(this.dateService.today());
    }
    get max() {
        return this.props.max || this.dateService.getYearEnd(this.dateService.today());
    }
    scrollToToday = () => {
        this.setState({
            viewMode: type_1.CalendarViewModes.DATE,
            visibleDate: this.dateService.today(),
            pickerDate: this.dateService.today(),
        });
    };
    scrollToDate = (date) => {
        if (date) {
            this.setState({
                viewMode: type_1.CalendarViewModes.DATE,
                visibleDate: date,
                pickerDate: date,
            });
        }
    };
    getCalendarStyle = (source) => {
        return {
            container: {
                width: source.width,
                paddingVertical: source.paddingVertical,
                borderColor: source.borderColor,
                borderWidth: source.borderWidth,
                borderRadius: source.borderRadius,
            },
            headerContainer: {
                paddingHorizontal: source.headerPaddingHorizontal,
                paddingVertical: source.headerPaddingVertical,
            },
            title: {
                fontSize: source.titleFontSize,
                fontWeight: source.titleFontWeight,
                color: source.titleColor,
                fontFamily: source.titleFontFamily,
            },
            icon: {
                width: source.iconWidth,
                height: source.iconHeight,
                tintColor: source.iconTintColor,
            },
            divider: {
                marginVertical: source.dividerMarginVertical,
            },
            daysHeaderContainer: {
                marginHorizontal: source.rowMarginHorizontal,
            },
            row: {
                minHeight: source.rowMinHeight,
                marginHorizontal: source.rowMarginHorizontal,
            },
        };
    };
    isDayDisabled = ({ date }) => {
        const minDayStart = this.dateService.createDate(this.dateService.getYear(this.min), this.dateService.getMonth(this.min), this.dateService.getDate(this.min));
        const maxDayStart = this.dateService.createDate(this.dateService.getYear(this.max), this.dateService.getMonth(this.max), this.dateService.getDate(this.max));
        const fitsFilter = this.props.filter && !this.props.filter(date) || false;
        return !this.dateService.isBetweenIncludingSafe(date, minDayStart, maxDayStart) || fitsFilter;
    };
    isDayToday = ({ date }) => {
        return this.dateService.isSameDaySafe(date, this.dateService.today());
    };
    initialVisibleDate() {
        return this.props.initialVisibleDate || this.selectedDate() || this.dateService.today();
    }
    onDaySelect = ({ date }) => {
        this.onDateSelect(date);
    };
    onMonthSelect = ({ date }) => {
        const { pickerDate, viewMode } = this.state;
        const nextVisibleDate = this.dateService.createDate(this.dateService.getYear(pickerDate), this.dateService.getMonth(date), this.dateService.getDate(pickerDate));
        this.setState({
            viewMode: viewMode.pickNext(),
            visibleDate: nextVisibleDate,
            pickerDate: nextVisibleDate,
        }, () => {
            this.props.onVisibleDateChange?.(this.state.visibleDate, this.state.viewMode.id);
        });
    };
    onYearSelect = ({ date }) => {
        const { pickerDate, viewMode } = this.state;
        const nextVisibleDate = this.dateService.createDate(this.dateService.getYear(date), this.dateService.getMonth(pickerDate), this.dateService.getDate(pickerDate));
        this.setState({
            viewMode: viewMode.pickNext(),
            pickerDate: nextVisibleDate,
        });
    };
    onPickerNavigationPress = () => {
        const { viewMode, visibleDate } = this.state;
        this.setState({
            viewMode: viewMode.navigationNext(),
            pickerDate: visibleDate,
        });
    };
    onHeaderNavigationLeftPress = () => {
        const nextDate = this.createViewModeVisibleDate(-1);
        if (this.state.viewMode.id === type_1.CalendarViewModes.DATE.id) {
            this.setState({ visibleDate: nextDate }, () => {
                this.props.onVisibleDateChange?.(this.state.visibleDate, this.state.viewMode.id);
            });
        }
        else {
            this.setState({ pickerDate: nextDate });
        }
    };
    onHeaderNavigationRightPress = () => {
        const nextDate = this.createViewModeVisibleDate(1);
        if (this.state.viewMode.id === type_1.CalendarViewModes.DATE.id) {
            this.setState({ visibleDate: nextDate }, () => {
                this.props.onVisibleDateChange?.(this.state.visibleDate, this.state.viewMode.id);
            });
        }
        else {
            this.setState({ pickerDate: nextDate });
        }
    };
    getWeekdayStyle = (source) => {
        return {
            fontSize: source.weekdayTextFontSize,
            fontWeight: source.weekdayTextFontWeight,
            color: source.weekdayTextColor,
            fontFamily: source.weekdayTextFontFamily,
        };
    };
    isDaySelected = ({ date }) => {
        return this.isDateSelected(date);
    };
    isMonthSelected = ({ date }) => {
        return this.dateService.isSameMonthSafe(date, this.selectedDate());
    };
    isYearSelected = ({ date }) => {
        return this.dateService.isSameYearSafe(date, this.selectedDate());
    };
    isMonthDisabled = ({ date }) => {
        const minMonthStart = this.dateService.getMonthStart(this.min);
        const maxMonthStart = this.dateService.getMonthStart(this.max);
        return !this.dateService.isBetweenIncludingSafe(date, minMonthStart, maxMonthStart);
    };
    isYearDisabled = ({ date }) => {
        const minYearStart = this.dateService.getYearStart(this.min);
        const maxYearStart = this.dateService.getYearEnd(this.max);
        return !this.dateService.isBetweenIncludingSafe(date, minYearStart, maxYearStart);
    };
    isMonthToday = (date) => {
        return this.dateService.isSameMonthSafe(date.date, this.dateService.today());
    };
    isYearToday = ({ date }) => {
        return this.dateService.isSameYearSafe(date, this.dateService.today());
    };
    isHeaderNavigationAllowed = () => {
        return this.state.viewMode.id !== type_1.CalendarViewModes.MONTH.id;
    };
    createViewModeVisibleDate = (page) => {
        switch (this.state.viewMode.id) {
            case type_1.CalendarViewModes.DATE.id: {
                return this.dateService.addMonth(this.state.visibleDate, page);
            }
            case type_1.CalendarViewModes.MONTH.id: {
                return this.dateService.addYear(this.state.pickerDate, page);
            }
            case type_1.CalendarViewModes.YEAR.id: {
                return this.dateService.addYear(this.state.pickerDate, VIEWS_IN_PICKER * page);
            }
            default: return;
        }
    };
    createViewModeHeaderTitle = (visibleDate, pickerDate, viewMode) => {
        switch (viewMode.id) {
            case type_1.CalendarViewModes.DATE.id: {
                const month = this.props.dateService.getMonthName(visibleDate, type_2.TranslationWidth.LONG);
                const year = this.props.dateService.getYear(visibleDate);
                return `${month} ${year}`;
            }
            case type_1.CalendarViewModes.MONTH.id: {
                return `${this.dateService.getYear(pickerDate)}`;
            }
            case type_1.CalendarViewModes.YEAR.id: {
                const minDateFormat = this.dateService.getYear(pickerDate);
                const maxDateFormat = minDateFormat + VIEWS_IN_PICKER - 1;
                return `${minDateFormat} - ${maxDateFormat}`;
            }
            default: return;
        }
    };
    renderDayIfNeeded = (item, style) => {
        const shouldRender = !item.bounding || this.props.boundingMonth;
        if (shouldRender) {
            const renderSelector = this.props.renderDay || this.renderDayElement;
            return renderSelector(item, style);
        }
        return null;
    };
    renderWeekdayElement = (weekday, index) => {
        return (<calendarDateContent_component_1.CalendarDateContent key={index} textStyle={this.getWeekdayStyle(this.props.eva.style)}>
        {weekday}
      </calendarDateContent_component_1.CalendarDateContent>);
    };
    renderDayElement = ({ date }, evaStyle) => {
        return (<calendarDateContent_component_1.CalendarDateContent style={evaStyle.container} textStyle={evaStyle.text}>
        {this.dateService.getDate(date)}
      </calendarDateContent_component_1.CalendarDateContent>);
    };
    renderMonthElement = ({ date }, evaStyle) => {
        return (<calendarDateContent_component_1.CalendarDateContent style={evaStyle.container} textStyle={evaStyle.text}>
        {this.dateService.getMonthName(date, type_2.TranslationWidth.SHORT)}
      </calendarDateContent_component_1.CalendarDateContent>);
    };
    renderYearElement = ({ date }, evaStyle) => {
        return (<calendarDateContent_component_1.CalendarDateContent style={evaStyle.container} textStyle={evaStyle.text}>
        {this.dateService.getYear(date)}
      </calendarDateContent_component_1.CalendarDateContent>);
    };
    renderDayPickerElement = (date, evaStyle) => {
        return (<>
        <calendarMonthHeader_component_1.CalendarMonthHeader style={evaStyle.daysHeaderContainer} data={this.dateService.getDayOfWeekNames()}>
          {this.renderWeekdayElement}
        </calendarMonthHeader_component_1.CalendarMonthHeader>
        <divider_component_1.Divider style={evaStyle.divider}/>
        <calendarPicker_component_1.CalendarPicker rowStyle={evaStyle.row} data={this.createDates(date)} onSelect={this.onDaySelect} isItemSelected={this.isDaySelected} isItemDisabled={this.isDayDisabled} isItemToday={this.isDayToday} shouldItemUpdate={this.shouldUpdateDate}>
          {this.renderDayIfNeeded}
        </calendarPicker_component_1.CalendarPicker>
      </>);
    };
    renderMonthPickerElement = (date, evaStyle) => {
        return (<calendarPicker_component_1.CalendarPicker rowStyle={evaStyle.row} data={this.dataService.createMonthPickerData(date, PICKER_ROWS, PICKER_COLUMNS)} onSelect={this.onMonthSelect} isItemSelected={this.isMonthSelected} isItemDisabled={this.isMonthDisabled} isItemToday={this.isMonthToday}>
        {this.props.renderMonth || this.renderMonthElement}
      </calendarPicker_component_1.CalendarPicker>);
    };
    renderYearPickerElement = (date, style) => {
        return (<calendarPicker_component_1.CalendarPicker rowStyle={style.row} data={this.dataService.createYearPickerData(date, PICKER_ROWS, PICKER_COLUMNS)} onSelect={this.onYearSelect} isItemSelected={this.isYearSelected} isItemDisabled={this.isYearDisabled} isItemToday={this.isYearToday}>
        {this.props.renderYear || this.renderYearElement}
      </calendarPicker_component_1.CalendarPicker>);
    };
    renderPickerElement = (style) => {
        switch (this.state.viewMode.id) {
            case type_1.CalendarViewModes.DATE.id:
                return this.renderDayPickerElement(this.state.visibleDate, style);
            case type_1.CalendarViewModes.MONTH.id:
                return this.renderMonthPickerElement(this.state.pickerDate, style);
            case type_1.CalendarViewModes.YEAR.id:
                return this.renderYearPickerElement(this.state.pickerDate, style);
            default: return;
        }
    };
    renderFooterElement = () => {
        if (this.props.renderFooter) {
            return this.props.renderFooter();
        }
        return null;
    };
    renderHeaderElement = (evaStyle) => {
        const titleSelector = this.props.title || this.createViewModeHeaderTitle;
        return (<calendarHeader_component_1.CalendarHeader viewModeId={this.state.viewMode.id} style={evaStyle.headerContainer} title={titleSelector(this.state.visibleDate, this.state.pickerDate, this.state.viewMode)} titleStyle={evaStyle.title} iconStyle={evaStyle.icon} lateralNavigationAllowed={this.isHeaderNavigationAllowed()} onTitlePress={this.onPickerNavigationPress} onNavigationLeftPress={this.onHeaderNavigationLeftPress} onNavigationRightPress={this.onHeaderNavigationRightPress} arrowLeftComponent={this.props.renderArrowLeft} arrowRightComponent={this.props.renderArrowRight}/>);
    };
    render() {
        const { eva, style, ...viewProps } = this.props;
        const evaStyle = this.getCalendarStyle(eva.style);
        return (<react_native_1.View {...viewProps} style={[evaStyle.container, style]}>
        {this.renderHeaderElement(evaStyle)}
        {this.renderPickerElement(evaStyle)}
        {this.renderFooterElement()}
      </react_native_1.View>);
    }
}
exports.BaseCalendarComponent = BaseCalendarComponent;
//# sourceMappingURL=baseCalendar.component.js.map