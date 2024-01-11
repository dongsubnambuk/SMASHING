"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectService = void 0;
const react_1 = __importDefault(require("react"));
const devsupport_1 = require("../../devsupport");
const SEPARATOR = ', ';
class SelectService {
    selectItem = (multiSelect, descriptor, selected) => {
        if (multiSelect) {
            return this.createMultiSelectIndices(descriptor, selected);
        }
        return descriptor.index;
    };
    toStringSelected = (selected) => {
        if (!Array.isArray(selected)) {
            return '';
        }
        const options = selected.map((index) => {
            return `Option ${index.toString()}`;
        });
        return options.join(SEPARATOR);
    };
    isSelected = (descriptor, selected) => {
        if (descriptor.multiSelect && this.isGroup(descriptor)) {
            return this.containsSomeFromGroup(descriptor.index, selected);
        }
        return this.contains(descriptor.index, selected);
    };
    isDisabled = (descriptor) => {
        return !descriptor.multiSelect && this.isGroup(descriptor);
    };
    createDescriptorForElement = (element, multiSelect, index) => {
        const groupIndices = react_1.default.Children.map(element.props.children, ((child, row) => {
            return new devsupport_1.IndexPath(row, index);
        }));
        return { multiSelect, groupIndices, index: new devsupport_1.IndexPath(index) };
    };
    createDescriptorForNestedElement = (element, descriptor, index) => {
        return {
            ...descriptor,
            index: new devsupport_1.IndexPath(index, descriptor.index.row),
            groupIndices: [],
        };
    };
    createMultiSelectIndices = (descriptor, selected) => {
        const isIndexSelected = this.isSelected(descriptor, selected);
        return !isIndexSelected ? this.addIndex(descriptor, selected) : this.removeIndex(descriptor, selected);
    };
    isGroup = (descriptor) => {
        return descriptor.groupIndices && descriptor.groupIndices.length > 0;
    };
    createGroupIndices = (descriptor) => {
        return this.isGroup(descriptor) ? descriptor.groupIndices : [descriptor.index];
    };
    addIndex = (descriptor, selected) => {
        return [...selected, ...this.createGroupIndices(descriptor)];
    };
    removeIndex = (descriptor, selected) => {
        const groupIndices = this.createGroupIndices(descriptor);
        return selected.filter((selectedIndex) => {
            return !this.contains(selectedIndex, groupIndices);
        });
    };
    contains = (index, selected) => {
        return selected.some((selectedIndex) => {
            return selectedIndex.equals(index);
        });
    };
    containsSomeFromGroup = (index, selected) => {
        return selected.some((selectedIndex) => {
            return selectedIndex.section === index.row;
        });
    };
}
exports.SelectService = SelectService;
//# sourceMappingURL=select.service.js.map