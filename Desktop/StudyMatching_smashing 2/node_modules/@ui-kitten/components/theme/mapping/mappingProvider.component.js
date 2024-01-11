"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappingProvider = void 0;
const react_1 = __importDefault(require("react"));
const mappingContext_1 = require("./mappingContext");
class MappingProvider extends react_1.default.PureComponent {
    render() {
        const { styles, children } = this.props;
        return (<mappingContext_1.MappingContext.Provider value={styles}>
        {children}
      </mappingContext_1.MappingContext.Provider>);
    }
}
exports.MappingProvider = MappingProvider;
//# sourceMappingURL=mappingProvider.component.js.map