/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import React from 'react';
import { ViewProps } from 'react-native';
import { EvaSize, EvaStatus, LiteralUnion, Overwrite } from '@ui-kitten/components/devsupport';
import { StyledComponentProps } from '@ui-kitten/components';
import { ProgressBarAnimationConfig } from './animation';
type ProgressBarStyledProps = Overwrite<StyledComponentProps, {
    appearance?: LiteralUnion<'default'>;
}>;
export interface ProgressBarProps extends ViewProps, ProgressBarStyledProps {
    progress?: number;
    animating?: boolean;
    animationConfig?: Partial<ProgressBarAnimationConfig>;
    status?: EvaStatus;
    size?: EvaSize;
}
export type ProgressBarElement = React.ReactElement<ProgressBarProps>;
interface State {
    trackWidth: number;
}
/**
 * Displays the length of a process.
 *
 * @extends React.Component
 *
 * @property {boolean} animating - Whether component is animating.
 * Default is *true*.
 *
 * @property {number} progress - Current state of a process.
 * Can be from 0 to 1.
 *
 * @property {string} size - Size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Defaults to *small*.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *primary*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {Partial<ProgressBarAnimationConfig>} animationConfig - Animation configuration.
 * Optional. Can define duration, easing function and etc.
 *
 * @overview-example ProgressBarSimpleUsage
 * Default ProgressBar animating is `true`.
 *
 * @overview-example ProgressBarTheming
 * Styling of ProgressBar is possible with [configuring a custom theme](guides/branding).
 *
 */
export declare class ProgressBar extends React.PureComponent<ProgressBarProps> {
    static defaultProps: Partial<ProgressBarProps>;
    state: State;
    private animation;
    constructor(props: ProgressBarProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: ProgressBarProps): void;
    componentWillUnmount(): void;
    private startAnimation;
    private stopAnimation;
    private clamp;
    private onLayout;
    private getComponentStyle;
    private renderIndicator;
    render(): React.ReactElement<ViewProps>;
}
export {};
