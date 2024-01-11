/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import React from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { StyledComponentProps } from '../../theme';
import { FlexPlacement } from './type';
type AnimatedViewStyle = ViewStyle;
export interface PopoverViewProps extends ViewProps, StyledComponentProps {
    contentContainerStyle?: StyleProp<AnimatedViewStyle>;
    layoutDirection?: FlexPlacement;
    indicator?: (props: ViewProps) => React.ReactElement;
}
export type PopoverViewElement = React.ReactElement<PopoverViewProps>;
export declare class PopoverView extends React.Component<PopoverViewProps> {
    private getComponentStyle;
    private getDirectionStyle;
    render(): React.ReactElement<ViewProps>;
}
export {};
