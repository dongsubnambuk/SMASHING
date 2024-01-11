"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("../../service");
class MappingProcessor {
    process(params) {
        return Object.keys(params).reduce((acc, component) => {
            return [
                ...acc,
                ...this.getComponentMappingMeta(params, component),
            ];
        }, []);
    }
    getComponentMappingMeta(mapping, component) {
        const componentMapping = mapping[component];
        // variants and states possible configurations are the same across all appearances, so we can evaluate them once
        const variants = this.getComponentVariants(mapping, component);
        const states = this.getComponentStates(mapping, component);
        return Object.keys(componentMapping.appearances).map((appearance) => {
            return {
                name: component,
                appearance,
                variants,
                states,
            };
        });
    }
    getComponentVariants(mapping, component) {
        const needsAllCases = service_1.needsAllVariantCases(mapping, component);
        const variants = service_1.getComponentVariants(mapping, component);
        return this.concatComponentVariants(variants, [], needsAllCases);
    }
    getComponentStates(mapping, component) {
        const states = service_1.getComponentStates(mapping, component);
        return this.concatComponentStates([...states]);
    }
    concatComponentVariants(variants, result, needsAllCases) {
        if (variants.length === 0) {
            return result;
        }
        if (needsAllCases) {
            // this is the case when there is no default path for variant groups,
            // e.i. not all variant groups values has default values
            // all possible combinations will be evaluated
            const concat = variants.reduce((acc, current) => {
                return [...acc, ...this.concatVariantGroups(acc, current)];
            }, variants.shift());
            return this.concatComponentVariants(variants, [...result, ...concat], needsAllCases);
        }
        // by default, we will evaluate only required variant groups combinations
        return variants.reduce((acc, current) => {
            if (acc.length === 0) {
                return current;
            }
            return acc.reduce((res, c) => {
                return [...res, ...current.map(x => c.concat(service_1.SEPARATOR_MAPPING_ENTRY, x))];
            }, []);
        }, []);
    }
    concatVariantGroups(lhs, rhs) {
        return lhs.reduce((acc, lhsValue) => {
            const concat = rhs.map(rhsValue => {
                return lhsValue.concat(service_1.SEPARATOR_MAPPING_ENTRY, rhsValue);
            });
            return [...acc, ...concat];
        }, []);
    }
    concatComponentStates(states, result = []) {
        if (states.length === 0) {
            return result;
        }
        const concat = states.reduce((acc, current) => {
            const next = acc.map(value => value.concat(service_1.SEPARATOR_MAPPING_ENTRY, current));
            return [...acc, ...next];
        }, [states.shift()]);
        return this.concatComponentStates(states, [...result, ...concat]);
    }
}
exports.MappingProcessor = MappingProcessor;
//# sourceMappingURL=mappingProcessor.js.map