"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const react_1 = __importDefault(require("react"));
const devsupport_1 = require("../../devsupport");
class MenuService {
    createDescriptorForElement = (element, index) => {
        const groupIndices = react_1.default.Children.map(element.props.children, ((child, row) => {
            return new devsupport_1.IndexPath(row, index);
        }));
        return { groupIndices, index: new devsupport_1.IndexPath(index) };
    };
    createDescriptorForNestedElement = (groupDescriptor, index) => {
        return {
            index: new devsupport_1.IndexPath(index, groupDescriptor.index.row),
            groupIndices: null,
        };
    };
}
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map