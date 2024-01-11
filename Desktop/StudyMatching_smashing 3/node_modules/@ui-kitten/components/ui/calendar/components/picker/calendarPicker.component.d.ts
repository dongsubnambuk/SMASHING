/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import React from 'react';
import { StyleProp, ViewProps } from 'react-native';
import { StyleType } from '../../../../theme';
import { CalendarPickerCellProps } from './calendarPickerCell.component';
import { CalendarDateInfo } from '../../type';
type ViewPropsWithoutChildren = Omit<ViewProps, 'children'>;
export interface CalendarPickerProps<D> extends ViewPropsWithoutChildren {
    data: CalendarDateInfo<D>[][];
    isItemSelected: (item: CalendarDateInfo<D>) => boolean;
    isItemDisabled: (item: CalendarDateInfo<D>) => boolean;
    isItemToday: (item: CalendarDateInfo<D>) => boolean;
    onSelect?: (item: CalendarDateInfo<D>) => void;
    children: (item: CalendarDateInfo<D>, style: StyleType) => React.ReactElement;
    shouldItemUpdate?: (props: CalendarPickerCellProps<D>, nextProps: CalendarPickerCellProps<D>) => boolean;
    rowStyle?: StyleProp<ViewProps>;
}
export type CalendarPickerElement<D> = React.ReactElement<CalendarPickerProps<D>>;
export declare class CalendarPicker<D> extends React.Component<CalendarPickerProps<D>> {
    private renderCellElement;
    private renderRowElement;
    render(): React.ReactElement<ViewProps>;
}
export {};
