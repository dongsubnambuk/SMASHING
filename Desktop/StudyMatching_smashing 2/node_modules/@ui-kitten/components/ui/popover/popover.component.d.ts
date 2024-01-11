/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import React from 'react';
import { Frame, Point, RenderFCProp } from '../../devsupport';
import { ModalProps, RNModalProps } from '../modal/modal.component';
import { PopoverViewProps } from './popoverView.component';
import { PopoverPlacement } from './type';
type PopoverModalProps = Omit<ModalProps, ' children'>;
export interface PopoverProps extends PopoverViewProps, PopoverModalProps, RNModalProps {
    children?: React.ReactElement;
    placement?: PopoverPlacement | string;
    anchor: RenderFCProp<any>;
    fullWidth?: boolean;
}
export type PopoverElement = React.ReactElement<PopoverProps>;
interface State {
    childFrame: Frame;
    forceMeasure: boolean;
    actualPlacement: PopoverPlacement;
    contentPosition: Point;
}
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
export declare class Popover extends React.Component<PopoverProps, State> {
    static defaultProps: Partial<PopoverProps>;
    state: State;
    private placementService;
    private get preferredPlacement();
    private get contentFlexPosition();
    componentDidUpdate(): void;
    static getDerivedStateFromProps(props: any, state: any): State;
    private onChildMeasure;
    private onContentMeasure;
    private findPlacementOptions;
    private renderContentElement;
    private renderPopoverElement;
    private renderMeasuringPopoverElement;
    render(): React.ReactElement;
}
export {};
