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
exports.CalendarHeader = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const devsupport_1 = require("../../../devsupport");
const button_component_1 = require("../../button/button.component");
const text_component_1 = require("../../text/text.component");
const chevronDown_component_1 = require("../../shared/chevronDown.component");
const chevronLeft_component_1 = require("../../shared/chevronLeft.component");
const chevronRight_component_1 = require("../../shared/chevronRight.component");
const type_1 = require("@ui-kitten/components/ui/calendar/type");
class CalendarHeader extends react_1.default.Component {
    renderTitleIcon = () => {
        const { tintColor, ...svgStyle } = this.props.iconStyle;
        const rotation = this.props.viewModeId === type_1.CalendarViewModes.DATE.id ? 0 : 180;
        return (<chevronDown_component_1.ChevronDown style={[styles.headerButtonIcon, svgStyle]} rotation={rotation} fill={tintColor}/>);
    };
    renderLeftIcon = () => {
        const { tintColor, ...svgStyle } = this.props.iconStyle;
        const IconComponent = devsupport_1.RTLService.select(chevronLeft_component_1.ChevronLeft, chevronRight_component_1.ChevronRight);
        return (<IconComponent style={[styles.lateralIcon, svgStyle]} fill={tintColor}/>);
    };
    renderRightIcon = () => {
        const { tintColor, ...svgStyle } = this.props.iconStyle;
        const IconComponent = devsupport_1.RTLService.select(chevronRight_component_1.ChevronRight, chevronLeft_component_1.ChevronLeft);
        return (<IconComponent style={[styles.lateralIcon, svgStyle]} fill={tintColor}/>);
    };
    renderLeftArrow = () => {
        const LeftArrowComponent = this.props.arrowLeftComponent;
        if (LeftArrowComponent) {
            return <LeftArrowComponent onPress={this.props.onNavigationLeftPress}/>;
        }
        return (<button_component_1.Button appearance='ghost' accessoryRight={this.renderLeftIcon} onPress={this.props.onNavigationLeftPress}/>);
    };
    renderRightArrow = () => {
        const RightArrowComponent = this.props.arrowRightComponent;
        if (RightArrowComponent) {
            return <RightArrowComponent onPress={this.props.onNavigationRightPress}/>;
        }
        return (<button_component_1.Button appearance='ghost' accessoryRight={this.renderRightIcon} onPress={this.props.onNavigationRightPress}/>);
    };
    renderLateralNavigationControls = () => {
        return (<react_native_1.View style={styles.subContainer}>
        {this.renderLeftArrow()}
        {this.renderRightArrow()}
      </react_native_1.View>);
    };
    renderTitleElement = (props) => {
        return (<text_component_1.Text {...props} style={[props.style, styles.headerButtonText, this.props.titleStyle]}>
        {this.props.title}
      </text_component_1.Text>);
    };
    render() {
        const { style, titleStyle, onTitlePress, title, lateralNavigationAllowed, viewModeId, ...viewProps } = this.props;
        return (<react_native_1.View {...viewProps} style={[styles.container, style]}>
        <button_component_1.Button appearance='ghost' accessoryRight={this.renderTitleIcon} onPress={onTitlePress}>
          {(props) => this.renderTitleElement(props)}
        </button_component_1.Button>
        {lateralNavigationAllowed && this.renderLateralNavigationControls()}
      </react_native_1.View>);
    }
}
exports.CalendarHeader = CalendarHeader;
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerButtonText: {
        marginHorizontal: 0,
    },
    headerButtonIcon: {
        marginHorizontal: 0,
    },
    lateralIcon: {
        marginHorizontal: 0,
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
//# sourceMappingURL=calendarHeader.component.js.map