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
exports.Modal = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const devsupport_1 = require("../../devsupport");
const theme_1 = require("../../theme");
const backdrop_component_1 = require("@ui-kitten/components/theme/backdrop/backdrop.component");
/**
 * A wrapper that presents content above an enclosing view.
 *
 * @extends React.Component
 *
 * @property {ReactNode} children - Component to render within the modal.
 *
 * @property {boolean} visible - Whether component is visible.
 * Defaults to false.
 *
 * @property {boolean} shouldUseContainer - Whether children should be wrapped into absolute positioned container.
 * Defaults to true.
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
 * @property {() => void} onBackdropPress - Called when the modal is visible and the view below it was touched.
 * Useful when needed to close the modal on outside touches.
 *
 * @property {(event: NativeSyntheticEvent<any>) => void} onShow -
 * Allows passing a function that will be called once the modal has been shown.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Style of backdrop.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example ModalSimpleUsage
 * Modals accept content views as child elements and are displayed in the screen center.
 * To display a modal, a `visible` property should be used.
 *
 * @overview-example ModalWithBackdrop
 * To configure underlying view, `backdropStyle` and `onBackdropPress` properties may be used.
 */
class Modal extends react_1.default.PureComponent {
    static defaultProps = {
        shouldUseContainer: true,
    };
    state = {
        contentFrame: devsupport_1.Frame.zero(),
        forceMeasure: false,
        contentPosition: devsupport_1.Point.outscreen(),
    };
    get contentFlexPosition() {
        const derivedStyle = react_native_1.StyleSheet.flatten(this.props.style || {});
        const { x: centerX, y: centerY } = this.state.contentPosition;
        return { left: derivedStyle.left || centerX, top: derivedStyle.top || centerY };
    }
    componentDidUpdate() {
        if (this.props.visible && !this.state.forceMeasure) {
            this.setState({ forceMeasure: true });
            return;
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (!props.visible) {
            return {
                ...state,
                contentPosition: devsupport_1.Point.outscreen(),
            };
        }
        return null;
    }
    onContentMeasure = (contentFrame) => {
        const displayFrame = contentFrame.centerOf(devsupport_1.Frame.window());
        this.setState({ contentPosition: displayFrame.origin });
    };
    renderContentElement = () => {
        return (<react_native_1.View {...this.props} style={[this.props.style, styles.modalView, this.contentFlexPosition]}/>);
    };
    renderMeasuringContentElement = () => {
        return (<devsupport_1.MeasureElement shouldUseTopInsets={theme_1.ModalService.getShouldUseTopInsets} onMeasure={this.onContentMeasure}>
        {this.renderContentElement()}
      </devsupport_1.MeasureElement>);
    };
    render() {
        return this.props.visible && (<react_native_1.Modal transparent={true} visible={this.props.visible} supportedOrientations={this.props.supportedOrientations} statusBarTranslucent={theme_1.ModalService.getShouldUseTopInsets} animationType={this.props.animationType} hardwareAccelerated={this.props.hardwareAccelerated} onRequestClose={this.props.onBackdropPress} onShow={this.props.onShow} onDismiss={this.props.onBackdropPress}>
        <backdrop_component_1.Backdrop visible={this.props.visible} backdropStyle={this.props.backdropStyle} onBackdropPress={this.props.onBackdropPress}>
          {this.props.shouldUseContainer ? this.renderMeasuringContentElement() : this.props.children}
        </backdrop_component_1.Backdrop>
      </react_native_1.Modal>);
    }
}
exports.Modal = Modal;
const styles = react_native_1.StyleSheet.create({
    modalView: {
        position: 'absolute',
    },
});
//# sourceMappingURL=modal.component.js.map