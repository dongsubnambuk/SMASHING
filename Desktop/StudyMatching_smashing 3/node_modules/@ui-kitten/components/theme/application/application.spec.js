"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_testing_library_1 = require("react-native-testing-library");
const eva = __importStar(require("@eva-design/eva"));
const applicationProvider_component_1 = require("./applicationProvider.component");
it('should be able to provide styles to all `styled` components in the library', () => {
    const component = (0, react_native_testing_library_1.render)(<applicationProvider_component_1.ApplicationProvider mapping={eva.mapping} theme={eva.light}/>);
    const { instance } = component.getByType(applicationProvider_component_1.ApplicationProvider);
    const styleKeys = Object.keys(instance.state.styles);
    expect(styleKeys).toContain('Avatar');
    expect(styleKeys).toContain('BottomNavigation');
    expect(styleKeys).toContain('BottomNavigationTab');
    expect(styleKeys).toContain('Button');
    expect(styleKeys).toContain('ButtonGroup');
    expect(styleKeys).toContain('Card');
    expect(styleKeys).toContain('Calendar');
    expect(styleKeys).toContain('CheckBox');
    expect(styleKeys).toContain('Divider');
    expect(styleKeys).toContain('Drawer');
    expect(styleKeys).toContain('Input');
    expect(styleKeys).toContain('Layout');
    expect(styleKeys).toContain('List');
    expect(styleKeys).toContain('ListItem');
    expect(styleKeys).toContain('Menu');
    expect(styleKeys).toContain('OverflowMenu');
    expect(styleKeys).toContain('Select');
    expect(styleKeys).toContain('Spinner');
    expect(styleKeys).toContain('Tab');
    expect(styleKeys).toContain('TabBar');
    expect(styleKeys).toContain('Text');
    expect(styleKeys).toContain('Toggle');
    expect(styleKeys).toContain('Tooltip');
    expect(styleKeys).toContain('TopNavigation');
    expect(styleKeys).toContain('TopNavigationAction');
});
//# sourceMappingURL=application.spec.js.map