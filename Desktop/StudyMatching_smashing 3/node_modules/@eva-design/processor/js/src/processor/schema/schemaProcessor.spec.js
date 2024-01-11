"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemaProcessor_1 = require("./schemaProcessor");
const schemaProcessor_spec_config_1 = require("./schemaProcessor.spec.config");
const processor = new schemaProcessor_1.SchemaProcessor();
const styles = processor.process(schemaProcessor_spec_config_1.schema);
describe('@processor: service checks', () => {
    it('* processes meta properly', () => {
        expect(styles).toMatchSnapshot();
    });
});
describe('@processor: e2e', () => {
    it('* generates all possible styles', () => {
        const estimatedCount = calculateThemeStyleCount(schemaProcessor_spec_config_1.schema);
        const generatedCount = Object.keys(styles).reduce((acc, component) => {
            const { styles: componentStyles } = styles[component];
            return acc + Object.keys(componentStyles).length;
        }, 0);
        expect(generatedCount).toEqual(estimatedCount);
    });
});
function calculateThemeStyleCount(mappingSchema) {
    return Object.keys(mappingSchema.components).reduce((acc, component) => {
        const componentMapping = mappingSchema.components[component];
        const componentStyleCount = calculateComponentStyleCount(componentMapping);
        return acc + componentStyleCount;
    }, 0);
}
function calculateComponentStyleCount(component) {
    const { states } = createComponentTestMeta(component);
    const hasDefaultAppearance = !!Object.values(component.meta.appearances).find(x => x.default);
    const hasDefaultState = !!Object.values(component.meta.states).find(x => x.default);
    const variantsCombinations = getCombinations(Object.entries(component.meta.variantGroups));
    const statesCombinations = Object.entries(component.meta.states).map(x => x[0]);
    statesCombinations.push(...statesCombinations.reduce((acc, v, i) => acc.concat(statesCombinations.slice(i + 1).map(w => v + '.' + w)), []));
    let result = [];
    if (!hasDefaultState) {
        result.push(...variantsCombinations);
    }
    statesCombinations.forEach(state => result.push(...variantsCombinations.map(x => `${x}.${state}`)));
    const temp = [...result];
    if (hasDefaultAppearance) {
        result = [];
    }
    Object.keys(component.meta.appearances).forEach(appearance => result.push(...temp.map(x => `${appearance}.${x}`)));
    return [...result.values()].length;
}
function getCombinations(entries) {
    const copy = [...entries];
    const result = new Set();
    entries.forEach((entry, index) => {
        const nextVariants = copy.slice(index + 1).map(x => x[1]);
        if (!Object.values(entry[1]).find(x => x.default)) {
            getVariantsRecursively('', nextVariants).forEach(x => result.add(x));
        }
        Object.keys(entry[1]).forEach((variant) => {
            getVariantsRecursively(variant, nextVariants).forEach(x => result.add(x));
        });
    });
    return [...result.values()];
}
function getVariantsRecursively(rootVariant, nextVariants) {
    if (!nextVariants.length) {
        return [];
    }
    const currentVariants = nextVariants[0];
    const newNextVariants = nextVariants.filter(x => x !== currentVariants);
    const localResult = new Set();
    if (rootVariant && !Object.values(currentVariants).find(x => !!x.default)) {
        localResult.add(`${rootVariant}`);
    }
    Object.entries(currentVariants).forEach((entry) => {
        if (rootVariant) {
            localResult.add(`${rootVariant}.${entry[0]}`);
        }
        else {
            localResult.add(`${entry[0]}`);
        }
    });
    [...localResult.values()].forEach(x => {
        const incrementalCombinations = getVariantsRecursively(x, newNextVariants);
        incrementalCombinations.forEach(combination => localResult.add(combination));
    });
    getVariantsRecursively(rootVariant, newNextVariants).forEach(x => localResult.add(x));
    return [...localResult.values()];
}
function createComponentTestMeta(component) {
    const { appearances, variantGroups, states } = component.meta;
    return {
        appearances: Object.keys(appearances),
        variants: Object.keys(variantGroups).map(group => Object.keys(variantGroups[group])),
        states: Object.keys(states),
    };
}
//# sourceMappingURL=schemaProcessor.spec.js.map