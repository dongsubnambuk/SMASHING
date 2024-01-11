import { ReactElement } from 'react';
export type ChildrenProp<Element extends ReactElement = ReactElement> = Element | Element[];
export type ChildrenWithProps<Props> = ChildrenProp<ReactElement<Props>>;
export type LiteralUnion<T extends U, U = string> = T | (U & {});
export type EvaStatus = LiteralUnion<'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'>;
export type EvaSize = LiteralUnion<'tiny' | 'small' | 'medium' | 'large' | 'giant'>;
export type EvaInputSize = LiteralUnion<'small' | 'medium' | 'large'>;
export declare class IndexPath {
    readonly row: number;
    readonly section?: number;
    constructor(row: number, section?: number);
    get groupIndex(): IndexPath;
    toString(): string;
    equals: (other: IndexPath) => boolean;
}
export type Overwrite<T extends object, U extends object, I = Diff<T, U> & Intersection<U, T>> = Pick<I, keyof I>;
export type Intersection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>;
export type SetDifference<A, B> = A extends B ? never : A;
export type Diff<T extends object, U extends object> = Pick<T, SetDifference<keyof T, keyof U>>;
