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
exports.Popover = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const devsupport_1 = require("../../devsupport");
const theme_1 = require("../../theme");
const modal_component_1 = require("../modal/modal.component");
const popoverView_component_1 = require("./popoverView.component");
const placement_service_1 = require("./placement.service");
const type_1 = require("./type");
/**
 * Displays a content positioned relative to another view.
 *
 * @extends React.Component
 *
 * @property {boolean} visible - Whether content component is visible.
 * Defaults to false.
 * The property is more specific that the show/hide methods, so do not use them at the same time.
 *
 * @property {() => ReactElement} anchor - A component relative to which content component will be shown.
 *
 * @property {ReactElement} children - A component displayed within the popover.
 *
 * @property {() => void} onBackdropPress - Called when popover is visible and the underlying view was touched.
 * Useful when needed to close the modal on outside touches.
 *
 * @property {boolean} fullWidth - Whether a content component should take the width of `anchor`.
 *
 * @property {string | PopoverPlacement} placement - Position of the content component relative to the `anchor`.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start`, `bottom end`, `inner`, `inner top` or `inner bottom`.
 * Defaults to *bottom*.
 *
 * @property {boolean} hardwareAccelerated - Controls whether to force hardware acceleration for the underlying window.
 * Defaults to false.
 *
 * @property {'none' | 'slide' | 'fade'} animationType - Controls how the modal animates.
 * Defaults to 'none'.
 *
 * @property {Array<'portrait' | 'portrait-upside-down' | 'landscape' | 'landscape-left' | 'landscape-right'>}
 * supportedOrientations -
 * allows the modal to be rotated to any of the specified orientations.
 * On iOS, the modal is still restricted by what's specified
 * in your app's Info.plist's UISupportedInterfaceOrientations field
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Style of backdrop.
 *
 * @property {(event: NativeSyntheticEvent<any>) => void} onShow -
 * Allows passing a function that will be called once the modal has been shown.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example PopoverSimpleUsage
 * Popover accepts it's content as child element and is displayed relative to `anchor` view.
 *
 * @overview-example PopoverPlacement
 * By default, it is displayed to the bottom of `anchor` view, but it is configurable with `placement` property.
 *
 * @overview-example PopoverFullWidth
 * Popover may take the full width of the anchor view by configuring `fullWidth` property.
 *
 * @overview-example PopoverStyledBackdrop
 * To style the underlying view, `backdropStyle` property may be used.
 */
class Popover extends react_1.default.Component {
    static defaultProps = {
        placement: type_1.PopoverPlacements.BOTTOM,
    };
    state = {
        childFrame: devsupport_1.Frame.zero(),
        forceMeasure: false,
        actualPlacement: this.preferredPlacement,
        contentPosition: devsupport_1.Point.zero(),
    };
    placementService = new placement_service_1.PopoverPlacementService();
    get preferredPlacement() {
        return type_1.PopoverPlacements.parse(this.props.placement);
    }
    get contentFlexPosition() {
        const { x: left, y: top } = this.state.contentPosition;
        return { left, top };
    }
    componentDidUpdate() {
        if (this.props.visible && !this.state.forceMeasure) {
            this.setState({ forceMeasure: true });
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (!props.visible && !devsupport_1.Point.outscreen().equals(state.contentPosition)) {
            return {
                ...state,
                contentPosition: devsupport_1.Point.outscreen(),
            };
        }
        return null;
    }
    onChildMeasure = (childFrame) => {
        if (!childFrame.equals(this.state.childFrame)) {
            this.setState({ childFrame });
        }
    };
    onContentMeasure = (anchorFrame) => {
        const placementOptions = this.findPlacementOptions(anchorFrame, this.state.childFrame);
        const actualPlacement = this.placementService.find(this.preferredPlacement, placementOptions);
        const displayFrame = actualPlacement.frame(placementOptions);
        const contentPosition = displayFrame.origin;
        if (!contentPosition.equals(this.state.contentPosition) ||
            actualPlacement.rawValue !== this.state.actualPlacement.rawValue) {
            this.setState({
                actualPlacement,
                contentPosition,
            });
        }
    };
    findPlacementOptions = (contentFrame, childFrame) => {
        const width = this.props.fullWidth ? childFrame.size.width : contentFrame.size.width;
        const frame = new devsupport_1.Frame(contentFrame.origin.x, contentFrame.origin.y, width, contentFrame.size.height);
        return new type_1.PlacementOptions(frame, childFrame, devsupport_1.Frame.window(), devsupport_1.Frame.zero());
    };
    renderContentElement = () => {
        const contentElement = this.props.children;
        const fullWidthStyle = { width: this.state.childFrame.size.width };
        return react_1.default.cloneElement(contentElement, {
            style: [this.props.fullWidth && fullWidthStyle, contentElement.props.style],
        });
    };
    renderPopoverElement = () => {
        return (<popoverView_component_1.PopoverView {...this.props} contentContainerStyle={[this.props.contentContainerStyle, styles.popoverView, this.contentFlexPosition]} layoutDirection={type_1.PopoverPlacements.parse(this.state.actualPlacement).flex()}>
        {this.renderContentElement()}
      </popoverView_component_1.PopoverView>);
    };
    renderMeasuringPopoverElement = () => {
        return (<devsupport_1.MeasureElement onMeasure={this.onContentMeasure}>
        {this.renderPopoverElement()}
      </devsupport_1.MeasureElement>);
    };
    render() {
        return (<react_native_1.View>
        <devsupport_1.MeasureElement force={this.state.forceMeasure} shouldUseTopInsets={theme_1.ModalService.getShouldUseTopInsets} onMeasure={this.onChildMeasure}>
          {this.props.anchor()}
        </devsupport_1.MeasureElement>
        <modal_component_1.Modal visible={this.props.visible} shouldUseContainer={false} backdropStyle={this.props.backdropStyle} animationType={this.props.animationType} hardwareAccelerated={this.props.hardwareAccelerated} supportedOrientations={this.props.supportedOrientations} onShow={this.props.onShow} onBackdropPress={this.props.onBackdropPress}>
          {this.renderMeasuringPopoverElement()}
        </modal_component_1.Modal>
      </react_native_1.View>);
    }
}
exports.Popover = Popover;
const styles = react_native_1.StyleSheet.create({
    popoverView: {
        position: 'absolute',
    },
});
//# sourceMappingURL=popover.component.js.map