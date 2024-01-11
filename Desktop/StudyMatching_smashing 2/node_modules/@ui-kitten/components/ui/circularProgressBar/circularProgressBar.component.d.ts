/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import React from 'react';
import { TextStyle, ViewProps } from 'react-native';
import { EvaSize, LiteralUnion, Overwrite, EvaStatus, RenderProp } from '@ui-kitten/components/devsupport';
import { IconProps, StyledComponentProps } from '@ui-kitten/components';
import { CircularProgressBarAnimationConfig } from './animation';
type CircularProgressBarStyledProps = Overwrite<StyledComponentProps, {
    appearance?: LiteralUnion<'default'>;
}>;
interface IconStyle {
    width: number;
    height: number;
    tintColor: string;
}
export interface CircularProgressBarProps extends ViewProps, CircularProgressBarStyledProps {
    progress?: number;
    animating?: boolean;
    renderIcon?: RenderProp<Partial<IconProps>>;
    size?: EvaSize;
    status?: EvaStatus;
    textStyle?: TextStyle;
    iconStyle?: IconStyle;
    animationConfig?: Partial<CircularProgressBarAnimationConfig>;
}
export type CircularProgressBarElement = React.ReactElement<CircularProgressBarProps>;
/**
 * Displays the length of a process.
 *
 * @extends React.Component
 *
 * @property {number} progress - Current progress value of the process.
 * Can be from 0 to 1.

 * @property {boolean} animating - Whether component is animating.
 * Default is *true*.
 *
 * @property {string} size - Size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Defaults to *medium*.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *primary*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {ReactElement | (IconProps) => ReactElement} renderIcon - Function component
 * to render inside circular progress bar.
 * Expected to return an Icon.
 *
 * @property {Partial<CircularProgressBarAnimationConfig>} animationConfig - Animation configuration.
 * Optional. Can define duration, easing function and etc.
 *
 * @overview-example CircularProgressBarSimpleUsage
 * Default CircularProgressBar status is `primary`, size is `medium` and animating is `true`.
 *
 * @overview-example CircularProgressBarSizes
 * To resize CircularProgressBar, a `size` property may be used.
 *
 * @overview-example CircularProgressBarStates
 * To show the specific status of the process, a `status` property may be used.
 *
 * @overview-example CircularProgressBarTheming
 * Styling of CircularProgressBar is possible with [configuring a custom theme](guides/branding).
 *
 */
export declare class CircularProgressBar extends React.PureComponent<CircularProgressBarProps> {
    static defaultProps: Partial<CircularProgressBarProps>;
    private animation;
    constructor(props: CircularProgressBarProps);
    private get containerSize();
    componentDidMount(): void;
    componentDidUpdate(prevProps: CircularProgressBarProps): void;
    componentWillUnmount(): void;
    private startAnimation;
    private stopAnimation;
    private clamp;
    private getComponentStyle;
    private renderHalfCircle;
    private renderHalf;
    private renderCircularProgress;
    private renderText;
    private renderIcon;
    private renderAccessory;
    render(): React.ReactElement<ViewProps>;
}
export {};
