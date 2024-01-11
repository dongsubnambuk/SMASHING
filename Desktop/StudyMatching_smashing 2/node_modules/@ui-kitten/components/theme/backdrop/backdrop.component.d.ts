/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import React from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
type ChildElement = React.ReactElement;
type ChildrenProp = ChildElement | ChildElement[] | React.ReactNode;
export interface BackdropPresentingConfig {
    backdropStyle?: StyleProp<ViewStyle>;
    onBackdropPress?: () => void;
}
export interface BackdropProps extends ViewProps, BackdropPresentingConfig {
    visible: boolean;
    children: ChildrenProp;
    backdropStyle: StyleProp<ViewStyle>;
    onBackdropPress: () => void;
}
export declare class Backdrop extends React.Component<BackdropProps> {
    static defaultProps: Partial<BackdropProps>;
    private renderChildElement;
    private renderComponentChildren;
    private renderComponent;
    render(): React.ReactElement<ViewProps> | undefined;
}
export {};
