"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_testing_library_1 = require("react-native-testing-library");
const falsyFC_component_1 = require("./falsyFC.component");
const styles = { color: 'red' };
it('should render nothing', () => {
    const component = (0, react_native_testing_library_1.render)(<falsyFC_component_1.FalsyFC />);
    expect(component.toJSON()).toEqual(null);
});
it('should render provided function component', () => {
    const component = (0, react_native_testing_library_1.render)(<falsyFC_component_1.FalsyFC style={styles} component={props => (<react_native_1.Text {...props}>
          I love Babel
        </react_native_1.Text>)}/>);
    const textComponent = component.getByText('I love Babel');
    expect(textComponent).toBeTruthy();
    expect(textComponent.props.style).toEqual(styles);
});
it('should render provided function component with hooks', () => {
    const HookComponent = (props) => {
        const [state] = react_1.default.useState(1);
        return (<react_native_1.Text {...props}>
        {`I love Babel ${state}`}
      </react_native_1.Text>);
    };
    const component = (0, react_native_testing_library_1.render)(<falsyFC_component_1.FalsyFC style={styles} component={props => <HookComponent {...props}/>}/>);
    const textComponent = component.getByText('I love Babel 1');
    expect(textComponent).toBeTruthy();
});
it('should render fallback component', () => {
    const component = (0, react_native_testing_library_1.render)(<falsyFC_component_1.FalsyFC component={null} fallback={(<react_native_1.Text>
          I love Babel
        </react_native_1.Text>)}/>);
    const textComponent = component.getByText('I love Babel');
    expect(textComponent).toBeTruthy();
});
it('should be able to render components with hooks', () => {
    const ComponentWithHooks = () => {
        const [text, setText] = react_1.default.useState('');
        react_1.default.useEffect(() => {
            setText('I love Babel');
        }, []);
        return (<react_native_1.Text>
        {text}
      </react_native_1.Text>);
    };
    const component = (0, react_native_testing_library_1.render)(<falsyFC_component_1.FalsyFC component={ComponentWithHooks}/>);
    const textComponent = component.getByText('I love Babel');
    expect(textComponent).toBeTruthy();
});
it('should be able to render valid element', () => {
    const ComponentWithHooks = (props) => {
        return (<react_native_1.Text {...props}>
        I love Babel
      </react_native_1.Text>);
    };
    const component = (0, react_native_testing_library_1.render)(<falsyFC_component_1.FalsyFC style={styles} component={<ComponentWithHooks />}/>);
    const textComponent = component.getByText('I love Babel');
    expect(textComponent).toBeTruthy();
    expect(textComponent.props.style).toEqual(styles);
});
//# sourceMappingURL=falsyFC.spec.js.map