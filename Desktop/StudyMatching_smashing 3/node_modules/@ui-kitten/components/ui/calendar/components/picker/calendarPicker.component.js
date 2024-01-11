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
exports.CalendarPicker = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const calendarPickerRow_component_1 = require("./calendarPickerRow.component");
const calendarPickerCell_component_1 = require("./calendarPickerCell.component");
const type_1 = require("../../type");
class CalendarPicker extends react_1.default.Component {
    renderCellElement = (item, index) => {
        const firstRangeItem = !!(item.range & type_1.RangeRole.start);
        const lastRangeItem = !!(item.range & type_1.RangeRole.end);
        return (<calendarPickerCell_component_1.CalendarPickerCell key={index} date={item} selected={this.props.isItemSelected(item)} disabled={this.props.isItemDisabled(item)} bounding={item.bounding} today={this.props.isItemToday(item)} range={!!item.range} firstRangeItem={firstRangeItem} lastRangeItem={lastRangeItem} onSelect={this.props.onSelect} shouldComponentUpdate={this.props.shouldItemUpdate}>
        {this.props.children}
      </calendarPickerCell_component_1.CalendarPickerCell>);
    };
    renderRowElement = (item, index) => {
        return (<calendarPickerRow_component_1.CalendarPickerRow key={index} style={this.props.rowStyle} data={item}>
        {this.renderCellElement}
      </calendarPickerRow_component_1.CalendarPickerRow>);
    };
    render() {
        const { data, children, ...viewProps } = this.props;
        return (<react_native_1.View {...viewProps}>
        {data.map(this.renderRowElement)}
      </react_native_1.View>);
    }
}
exports.CalendarPicker = CalendarPicker;
//# sourceMappingURL=calendarPicker.component.js.map