"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_testing_library_1 = require("react-native-testing-library");
const themeProvider_component_1 = require("./themeProvider.component");
const withStyles_1 = require("./withStyles");
const theme_service_1 = require("./theme.service");
const styleProvider_component_1 = require("../style/styleProvider.component");
const eva_1 = require("@eva-design/eva");
const theme = {
    defaultColor: '#000000',
    disabledColor: '#646464',
    activeColor: '#3366FF',
    refValue: '$defaultColor',
    doubleRefValue: '$refValue',
};
describe('@theme: service checks', () => {
    it('finds theme value properly', async () => {
        const themeValue = theme_service_1.ThemeService.getValue('defaultColor', theme);
        const undefinedValue = theme_service_1.ThemeService.getValue('undefined', theme);
        expect(themeValue).toEqual(theme.defaultColor);
        expect(undefinedValue).toBeFalsy();
    });
    it('finds referencing theme value properly', async () => {
        const themeValue = theme_service_1.ThemeService.getValue('refValue', theme);
        expect(themeValue).toEqual(theme.defaultColor);
    });
    it('finds multiple referencing theme value properly', async () => {
        const themeValue = theme_service_1.ThemeService.getValue('doubleRefValue', theme);
        expect(themeValue).toEqual(theme.defaultColor);
    });
});
describe('@theme: ui component checks', () => {
    const themeConsumerTestId = '@theme/consumer';
    const themeChangeTouchableTestId = '@theme/btnChangeTheme';
    const Sample = (props) => (<react_native_1.View {...props} testID={themeConsumerTestId}/>);
    const ThemeChangingComponent = (props) => {
        const [currentTheme, setCurrentTheme] = react_1.default.useState(props.theme);
        const ThemedComponent = (0, withStyles_1.withStyles)(Sample);
        return (<>
        <themeProvider_component_1.ThemeProvider theme={currentTheme}>
          <ThemedComponent />
        </themeProvider_component_1.ThemeProvider>
        <react_native_1.TouchableOpacity testID={themeChangeTouchableTestId} onPress={() => setCurrentTheme(props.themeInverse)}/>
      </>);
    };
    it('withStyles component should not re-renderer because of parent render', async () => {
        const rerenderButtonText = 'Rerender parent';
        const getRenderCountText = (elementType, count) => {
            return `${elementType}: render for ${count} ${count === 1 ? 'time' : 'times'}`;
        };
        const ChildComponent = react_1.default.memo(() => {
            const counter = (0, react_1.useRef)(0);
            counter.current++;
            return (<react_native_1.Text>
          {getRenderCountText('Child', counter.current)}
        </react_native_1.Text>);
        });
        ChildComponent.displayName = 'ChildComponent';
        const ChildComponentWithStyles = (0, withStyles_1.withStyles)(ChildComponent);
        const ParentComponent = () => {
            const [renderCount, setRenderCount] = (0, react_1.useState)(1);
            return (<react_native_1.View>
          <react_native_1.TouchableOpacity onPress={() => setRenderCount(renderCount + 1)}>
            <react_native_1.Text>
              {rerenderButtonText}
            </react_native_1.Text>
          </react_native_1.TouchableOpacity>
          <react_native_1.Text>
            {getRenderCountText('Parent', renderCount)}
          </react_native_1.Text>
          <ChildComponentWithStyles />
        </react_native_1.View>);
        };
        const renderedComponent = (0, react_native_testing_library_1.render)(<themeProvider_component_1.ThemeProvider theme={theme}>
        <ParentComponent />
      </themeProvider_component_1.ThemeProvider>);
        react_native_testing_library_1.fireEvent.press(renderedComponent.getByText(rerenderButtonText));
        expect(renderedComponent.queryByText(getRenderCountText('Parent', 2))).toBeTruthy();
        expect(renderedComponent.queryByText(getRenderCountText('Child', 1))).toBeTruthy();
    });
    it('static methods are copied over', () => {
        // @ts-ignore: test-case
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        Sample.staticMethod = function () {
        };
        const ThemedComponent = (0, withStyles_1.withStyles)(Sample);
        // @ts-ignore: test-case
        expect(ThemedComponent.staticMethod).not.toBeFalsy();
    });
    it('receives compiled theme', () => {
        const ThemedComponent = (0, withStyles_1.withStyles)(Sample);
        const component = (0, react_native_testing_library_1.render)(<themeProvider_component_1.ThemeProvider theme={theme}>
        <ThemedComponent />
      </themeProvider_component_1.ThemeProvider>);
        const themedComponent = component.getByTestId(themeConsumerTestId);
        expect(themedComponent.props.eva.theme).toEqual({
            defaultColor: '#000000',
            disabledColor: '#646464',
            activeColor: '#3366FF',
            refValue: '#000000',
            doubleRefValue: '#000000',
        });
    });
    it('receives custom theme', () => {
        const ThemedComponent = (0, withStyles_1.withStyles)(Sample);
        const component = (0, react_native_testing_library_1.render)(<themeProvider_component_1.ThemeProvider theme={{
                ...theme,
                defaultColor: '#ffffff',
            }}>
        <ThemedComponent />
      </themeProvider_component_1.ThemeProvider>);
        const themedComponent = component.getByTestId(themeConsumerTestId);
        expect(themedComponent.props.eva.theme).toEqual({
            defaultColor: '#ffffff',
            disabledColor: '#646464',
            activeColor: '#3366FF',
            refValue: '#ffffff',
            doubleRefValue: '#ffffff',
        });
    });
    it('receives style prop', () => {
        const ThemedComponent = (0, withStyles_1.withStyles)(Sample, contextTheme => ({
            container: { backgroundColor: contextTheme.defaultColor },
        }));
        const component = (0, react_native_testing_library_1.render)(<themeProvider_component_1.ThemeProvider theme={theme}>
        <ThemedComponent />
      </themeProvider_component_1.ThemeProvider>);
        const themedComponent = component.getByTestId(themeConsumerTestId);
        expect(themedComponent.props.eva.style).toEqual({
            container: { backgroundColor: '#000000' },
        });
    });
    it('receives new theme when it is changed', async () => {
        const component = (0, react_native_testing_library_1.render)(<ThemeChangingComponent theme={theme} themeInverse={{
                ...theme,
                defaultColor: '#ffffff',
            }}/>);
        const touchableComponent = component.getByTestId(themeChangeTouchableTestId);
        react_native_testing_library_1.fireEvent.press(touchableComponent);
        const themedComponent = await (0, react_native_testing_library_1.waitForElement)(() => {
            return component.getByTestId(themeConsumerTestId);
        });
        expect(themedComponent.props.eva.theme.defaultColor).toEqual('#ffffff');
    });
});
describe('@useTheme: rendering performance check', () => {
    const styleTouchableTestId = '@style/touchable';
    const themes = {
        light: {
            defaultColor: 'white',
        },
        dark: {
            defaultColor: 'black',
        },
    };
    const ThemeChangingProvider = (props) => {
        return (<styleProvider_component_1.StyleProvider styles={props.styles} theme={props.theme}>
        <react_native_1.TouchableOpacity testID={styleTouchableTestId} onPress={props.onPress}>
          <react_native_1.Text style={{ color: theme.defaultColor }}>
            {`${props.value}`}
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </styleProvider_component_1.StyleProvider>);
    };
    it('changing theme should force new render', async () => {
        const themeFuncMock = jest.fn();
        const ChildComponent = (props) => {
            react_1.default.useEffect(() => {
                themeFuncMock();
            });
            return <ThemeChangingProvider {...props}/>;
        };
        const Component = () => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const [theme, setTheme] = react_1.default.useState(themes.dark);
            const changeTheme = () => {
                setTheme(theme.defaultColor === 'white' ? themes.dark : themes.light);
            };
            return (<ChildComponent styles={eva_1.mapping} theme={theme} onPress={changeTheme} value={theme.defaultColor}/>);
        };
        const component = (0, react_native_testing_library_1.render)(<Component />);
        expect(themeFuncMock).toBeCalledTimes(1);
        react_native_testing_library_1.fireEvent.press(component.getByTestId(styleTouchableTestId));
        expect(themeFuncMock).toBeCalledTimes(2);
    });
    it('not changing theme value state should not force component to render', async () => {
        const themeFuncMock = jest.fn();
        const ChildComponent = (props) => {
            react_1.default.useEffect(() => {
                themeFuncMock();
            });
            return <ThemeChangingProvider {...props}/>;
        };
        const Component = () => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const [theme, setTheme] = react_1.default.useState(themes.dark);
            const changeTheme = () => {
                setTheme(themes.dark);
            };
            return (<ChildComponent styles={eva_1.mapping} theme={theme} onPress={changeTheme} value={theme.defaultColor}/>);
        };
        const component = (0, react_native_testing_library_1.render)(<Component />);
        expect(themeFuncMock).toBeCalledTimes(1);
        react_native_testing_library_1.fireEvent.press(component.getByTestId(styleTouchableTestId));
        expect(themeFuncMock).toBeCalledTimes(1);
    });
});
//# sourceMappingURL=theme.spec.js.map