/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import React from 'react';
import { ImageStyle, StyleProp, TextStyle, ViewProps } from 'react-native';
import { CalendarViewModeId } from '@ui-kitten/components/ui/calendar/type';
interface IconStyle extends ImageStyle {
    tintColor?: string;
}
export interface CalendarHeaderProps extends ViewProps {
    viewModeId: CalendarViewModeId;
    title: string;
    titleStyle?: StyleProp<TextStyle>;
    iconStyle?: IconStyle;
    lateralNavigationAllowed: boolean;
    onTitlePress?: () => void;
    onNavigationLeftPress?: () => void;
    onNavigationRightPress?: () => void;
    arrowLeftComponent?: React.ComponentType<{
        onPress: () => void;
    }> | null;
    arrowRightComponent?: React.ComponentType<{
        onPress: () => void;
    }> | null;
}
export type CalendarHeaderElement = React.ReactElement<CalendarHeaderProps>;
export declare class CalendarHeader extends React.Component<CalendarHeaderProps> {
    private renderTitleIcon;
    private renderLeftIcon;
    private renderRightIcon;
    private renderLeftArrow;
    private renderRightArrow;
    private renderLateralNavigationControls;
    private renderTitleElement;
    render(): React.ReactElement<ViewProps>;
}
export {};
