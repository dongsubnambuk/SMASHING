import React from 'react';
import { IndexPath } from '../../devsupport';
export interface MenuItemDescriptor {
    index: IndexPath;
    groupIndices?: IndexPath[];
}
export declare class MenuService {
    createDescriptorForElement: (element: React.ReactElement, index: number) => MenuItemDescriptor;
    createDescriptorForNestedElement: (groupDescriptor: MenuItemDescriptor, index: number) => MenuItemDescriptor;
}
