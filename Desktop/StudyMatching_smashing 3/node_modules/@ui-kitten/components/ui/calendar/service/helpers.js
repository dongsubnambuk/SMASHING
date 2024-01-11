"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = exports.batch = void 0;
const batch = (target, batchSize, offset = 0) => {
    return target.reduce((res, item, index) => {
        const chunkIndex = Math.floor((index + offset) / batchSize);
        if (!res[chunkIndex]) {
            res[chunkIndex] = [];
        }
        res[chunkIndex].push(item);
        return res;
    }, []);
};
exports.batch = batch;
/**
 * returns array with numbers from zero to bound.
 * */
const range = (bound, producer = i => i) => {
    const arr = [];
    for (let i = 0; i < bound; i++) {
        arr.push(producer(i));
    }
    return arr;
};
exports.range = range;
//# sourceMappingURL=helpers.js.map