"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_testing_library_1 = require("react-native-testing-library");
const styleProvider_component_1 = require("./styleProvider.component");
const styled_1 = require("./styled");
const styleConsumer_service_1 = require("./styleConsumer.service");
const style_service_1 = require("./style.service");
const theme = {
    defaultColor: '#000000',
    disabledColor: '#646464',
    activeColor: '#3366FF',
    refValue: '$defaultColor',
    doubleRefValue: '$refValue',
};
const computedMapping = {
    Test: {
        meta: {
            scope: 'all',
            parameters: {
                width: {
                    type: 'number',
                },
                height: {
                    type: 'number',
                },
                backgroundColor: {
                    type: 'string',
                },
            },
            appearances: {
                default: {
                    default: true,
                },
            },
            variantGroups: {},
            states: {
                disabled: {
                    default: false,
                    priority: 0,
                    scope: 'all',
                },
                active: {
                    default: false,
                    priority: 1,
                    scope: 'all',
                },
            },
        },
        styles: {
            'default': {
                width: 4,
                height: 4,
                backgroundColor: 'defaultColor',
            },
            'default.disabled': {
                width: 4,
                height: 4,
                backgroundColor: 'disabledColor',
            },
            'default.active': {
                width: 4,
                height: 4,
                backgroundColor: 'activeColor',
            },
        },
    },
};
describe('@style: consumer service methods check', () => {
    const service = new styleConsumer_service_1.StyleConsumerService('Test', computedMapping);
    it('should create valid default props', () => {
        const value = service.createDefaultProps();
        expect(value).toEqual({
            appearance: 'default',
        });
    });
    it('should create valid style prop', () => {
        const props = service.createDefaultProps();
        const style = service.createStyleProp(props, computedMapping, theme, []);
        expect(style).toEqual({
            width: 4,
            height: 4,
            backgroundColor: theme.defaultColor,
        });
    });
});
describe('@style-service: service method checks', () => {
    it('should apply theme on mapping', () => {
        const mapping = {
            prop1: 'defaultColor',
            prop2: 'refValue',
            prop3: 'doubleRefValue',
        };
        const value = style_service_1.StyleService.createThemedEntry(mapping, theme);
        expect(value).toEqual({
            prop1: theme.defaultColor,
            prop2: theme.defaultColor,
            prop3: theme.defaultColor,
        });
    });
});
describe('@style: ui component checks', () => {
    const styleConsumerTestId = '@style/consumer';
    const styleTouchableTestId = '@style/touchable';
    let Test = class Test extends react_1.default.Component {
        static someStaticValueToCopy = 'Test';
        render() {
            return (<react_native_1.View {...this.props} testID={styleConsumerTestId}/>);
        }
    };
    Test = __decorate([
        (0, styled_1.styled)('Test')
    ], Test);
    const Provider = ({ children }) => {
        return (<styleProvider_component_1.StyleProvider styles={computedMapping} theme={theme}>
        {children}
      </styleProvider_component_1.StyleProvider>);
    };
    it('styled component should not re-renderer because of parent render', async () => {
        const rerenderButtonText = 'Rerender parent';
        const getRenderCountText = (elementType, count) => {
            return `${elementType}: render for ${count} ${count === 1 ? 'time' : 'times'}`;
        };
        // eslint-disable-next-line react/no-multi-comp
        let ChildStyledComponent = class ChildStyledComponent extends react_1.default.Component {
            renderCount = 0;
            render() {
                this.renderCount++;
                return (<react_native_1.Text>
            {getRenderCountText('Child', this.renderCount)}
          </react_native_1.Text>);
            }
        };
        ChildStyledComponent = __decorate([
            (0, styled_1.styled)('Test')
        ], ChildStyledComponent);
        const ParentComponent = () => {
            const [renderCount, setRenderCount] = react_1.default.useState(1);
            return (<react_native_1.View>
          <react_native_1.TouchableOpacity onPress={() => setRenderCount(renderCount + 1)}>
            <react_native_1.Text>
              {rerenderButtonText}
            </react_native_1.Text>
          </react_native_1.TouchableOpacity>
          <react_native_1.Text>
            {getRenderCountText('Parent', renderCount)}
          </react_native_1.Text>
          <ChildStyledComponent />
        </react_native_1.View>);
        };
        const renderedComponent = (0, react_native_testing_library_1.render)(<ParentComponent />, { wrapper: Provider });
        react_native_testing_library_1.fireEvent.press(renderedComponent.getByText(rerenderButtonText));
        react_native_testing_library_1.fireEvent.press(renderedComponent.getByText(rerenderButtonText));
        expect(renderedComponent.queryByText(getRenderCountText('Parent', 3))).toBeTruthy();
        expect(renderedComponent.queryByText(getRenderCountText('Child', 1))).toBeTruthy();
    });
    it('static methods are copied over', async () => {
        expect(Test.someStaticValueToCopy).not.toBeFalsy();
    });
    it('receives custom props', async () => {
        const component = (0, react_native_testing_library_1.render)(<styleProvider_component_1.StyleProvider styles={computedMapping} theme={theme}>
        <Test />
      </styleProvider_component_1.StyleProvider>);
        const styledComponent = component.getByTestId(styleConsumerTestId);
        expect(styledComponent.props.appearance).not.toBeFalsy();
        expect(styledComponent.props.eva.theme).not.toBeFalsy();
        expect(styledComponent.props.eva.style).not.toBeFalsy();
        expect(styledComponent.props.eva.dispatch).not.toBeFalsy();
    });
    it('default appearance styled properly', async () => {
        const component = (0, react_native_testing_library_1.render)(<styleProvider_component_1.StyleProvider styles={computedMapping} theme={theme}>
        <Test />
      </styleProvider_component_1.StyleProvider>);
        const withStateProp = (0, react_native_testing_library_1.render)(<styleProvider_component_1.StyleProvider styles={computedMapping} theme={theme}>
        <Test disabled={true}/>
      </styleProvider_component_1.StyleProvider>);
        const styledComponent = component.getByTestId(styleConsumerTestId);
        const withStateComponent = withStateProp.getByTestId(styleConsumerTestId);
        expect(styledComponent.props.eva.style).toEqual({
            width: 4,
            height: 4,
            backgroundColor: theme.defaultColor,
        });
        expect(withStateComponent.props.eva.style).toEqual({
            width: 4,
            height: 4,
            backgroundColor: theme.disabledColor,
        });
    });
    it('dispatch action works properly', async () => {
        const component = (0, react_native_testing_library_1.render)(<styleProvider_component_1.StyleProvider styles={computedMapping} theme={theme}>
        <Test />
      </styleProvider_component_1.StyleProvider>);
        const styledComponent = component.getByTestId(styleConsumerTestId);
        styledComponent.props.eva.dispatch([style_service_1.Interaction.ACTIVE]);
        const styledComponentChanged = await (0, react_native_testing_library_1.waitForElement)(() => {
            return component.getByTestId(styleConsumerTestId);
        });
        expect(styledComponentChanged.props.eva.style).toEqual({
            width: 4,
            height: 4,
            backgroundColor: theme.activeColor,
        });
    });
    it('provides correct styles on theme change', async () => {
        const ThemeChangingProvider = (props) => {
            const [currentTheme, setCurrentTheme] = react_1.default.useState(props.theme);
            return (<styleProvider_component_1.StyleProvider styles={props.styles} theme={currentTheme}>
          <react_native_1.TouchableOpacity testID={styleTouchableTestId} onPress={() => setCurrentTheme(props.themeInverse)}>
            {props.children}
          </react_native_1.TouchableOpacity>
        </styleProvider_component_1.StyleProvider>);
        };
        const component = (0, react_native_testing_library_1.render)(<ThemeChangingProvider styles={computedMapping} theme={theme} themeInverse={{
                ...theme,
                defaultColor: '#ffffff',
            }}>
        <Test />
      </ThemeChangingProvider>);
        const touchableComponent = component.getByTestId(styleTouchableTestId);
        react_native_testing_library_1.fireEvent.press(touchableComponent);
        const styledComponentChanged = await (0, react_native_testing_library_1.waitForElement)(() => {
            return component.getByTestId(styleConsumerTestId);
        });
        expect(styledComponentChanged.props.eva.style).toEqual({
            ...computedMapping.Test.styles.default,
            backgroundColor: '#ffffff',
        });
    });
});
describe('@useStyleSheet: rendering performance check', () => {
    const styleTouchableTestId = '@style/touchable';
    const ThemeChangingProvider = (props) => {
        return (<styleProvider_component_1.StyleProvider styles={props.styles} theme={theme}>
        <react_native_1.TouchableOpacity testID={styleTouchableTestId} onPress={props.onPress}>
          <react_native_1.Text style={{ color: theme.defaultColor }}>
            {`${props.value}`}
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </styleProvider_component_1.StyleProvider>);
    };
    it('useStyleSheet should not be called with every render', async () => {
        const stylesFuncMock = jest.fn();
        const Component = () => {
            const [state, setState] = react_1.default.useState(0);
            const styles = (0, style_service_1.useStyleSheet)({});
            react_1.default.useEffect(() => {
                stylesFuncMock();
            }, [styles]);
            return (<ThemeChangingProvider styles={computedMapping} theme={theme} onPress={() => setState(state + 1)} value={theme.defaultColor}/>);
        };
        const component = (0, react_native_testing_library_1.render)(<Component />);
        react_native_testing_library_1.fireEvent.press(component.getByTestId(styleTouchableTestId));
        expect(stylesFuncMock).toBeCalledTimes(1);
    });
    it('useStyleSheet should not be called with every render when memoized', async () => {
        const stylesFuncMock = jest.fn();
        const Component = () => {
            const [state, setState] = react_1.default.useState(0);
            const styles = (0, style_service_1.useStyleSheet)({});
            const memoizeValue = react_1.default.useMemo(() => {
                stylesFuncMock();
                return theme;
            }, [styles]);
            const changeState = react_1.default.useCallback(() => {
                setState(state + 1);
            }, [state, memoizeValue]);
            return (<ThemeChangingProvider styles={computedMapping} theme={theme} onPress={changeState} value={theme.defaultColor}/>);
        };
        const component = (0, react_native_testing_library_1.render)(<Component />);
        expect(stylesFuncMock).toBeCalledTimes(1);
        react_native_testing_library_1.fireEvent.press(component.getByTestId(styleTouchableTestId));
        expect(stylesFuncMock).toBeCalledTimes(1);
    });
});
//# sourceMappingURL=style.spec.js.map