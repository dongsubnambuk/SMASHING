"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopoverPlacements = exports.PlacementOptions = exports.Offsets = void 0;
const react_native_1 = require("react-native");
const devsupport_1 = require("../../devsupport");
class Offsets {
    static MARGIN = new class {
        rawValue = 'margin';
        apply(frame, value) {
            return new devsupport_1.Frame(value, value, value, value);
        }
    };
    static MARGIN_HORIZONTAL = new class {
        rawValue = 'marginHorizontal';
        apply(frame, value) {
            return new devsupport_1.Frame(value, frame.origin.y, value, frame.size.height);
        }
    };
    static MARGIN_VERTICAL = new class {
        rawValue = 'marginVertical';
        apply(frame, value) {
            return new devsupport_1.Frame(frame.origin.x, value, frame.size.width, value);
        }
    };
    static MARGIN_LEFT = new class {
        rawValue = 'marginLeft';
        apply(frame, value) {
            return new devsupport_1.Frame(value, frame.origin.y, frame.size.width, frame.size.height);
        }
    };
    static MARGIN_TOP = new class {
        rawValue = 'marginTop';
        apply(frame, value) {
            return new devsupport_1.Frame(frame.origin.x, value, frame.size.width, frame.size.height);
        }
    };
    static MARGIN_RIGHT = new class {
        rawValue = 'marginRight';
        apply(frame, value) {
            return new devsupport_1.Frame(frame.origin.x, frame.origin.y, value, frame.size.height);
        }
    };
    static MARGIN_BOTTOM = new class {
        rawValue = 'marginBottom';
        apply(frame, value) {
            return new devsupport_1.Frame(frame.origin.x, frame.origin.y, frame.size.width, value);
        }
    };
    static find(source) {
        const offsetKeys = [
            Offsets.MARGIN.rawValue,
            Offsets.MARGIN_HORIZONTAL.rawValue,
            Offsets.MARGIN_VERTICAL.rawValue,
            Offsets.MARGIN_LEFT.rawValue,
            Offsets.MARGIN_TOP.rawValue,
            Offsets.MARGIN_RIGHT.rawValue,
            Offsets.MARGIN_BOTTOM.rawValue,
        ];
        const flatStyle = react_native_1.StyleSheet.flatten(source) || {};
        return Object.keys(flatStyle)
            .filter((key) => offsetKeys.includes(key))
            .reduce((acc, key) => {
            const value = flatStyle[key];
            const offsetValue = Offsets.parse(key);
            return offsetValue ? offsetValue.apply(acc, value) : acc;
        }, devsupport_1.Frame.zero());
    }
    static parse(value, fallback) {
        return Offsets.typeOf(value) ? value : Offsets.parseString(value, fallback);
    }
    static parseString(rawValue, fallback) {
        switch (rawValue) {
            case Offsets.MARGIN.rawValue:
                return Offsets.MARGIN;
            case Offsets.MARGIN_HORIZONTAL.rawValue:
                return Offsets.MARGIN_HORIZONTAL;
            case Offsets.MARGIN_VERTICAL.rawValue:
                return Offsets.MARGIN_VERTICAL;
            case Offsets.MARGIN_LEFT.rawValue:
                return Offsets.MARGIN_LEFT;
            case Offsets.MARGIN_TOP.rawValue:
                return Offsets.MARGIN_TOP;
            case Offsets.MARGIN_RIGHT.rawValue:
                return Offsets.MARGIN_RIGHT;
            case Offsets.MARGIN_BOTTOM.rawValue:
                return Offsets.MARGIN_BOTTOM;
            default:
                return fallback;
        }
    }
    static typeOf(value) {
        const { rawValue } = value;
        return rawValue !== undefined;
    }
}
exports.Offsets = Offsets;
class PlacementOptions {
    source;
    other;
    bounds;
    offsets;
    constructor(source = devsupport_1.Frame.zero(), other = devsupport_1.Frame.zero(), bounds = devsupport_1.Frame.zero(), offsets = devsupport_1.Frame.zero()) {
        this.source = source;
        this.other = other;
        this.bounds = bounds;
        this.offsets = offsets;
    }
}
exports.PlacementOptions = PlacementOptions;
class PopoverPlacements {
    static RIGHT_START = new class {
        rawValue = 'right start';
        frame(options) {
            const { origin, size } = this.parent().frame(options);
            return new devsupport_1.Frame(origin.x, Math.round(origin.y - (options.other.size.height - size.height) / 2 + options.offsets.origin.y), size.width, size.height);
        }
        flex() {
            return {
                direction: 'row',
                alignment: 'flex-start',
            };
        }
        parent() {
            return PopoverPlacements.RIGHT;
        }
        reverse() {
            return PopoverPlacements.LEFT_START;
        }
        family() {
            return this.parent().family();
        }
        fits(frame, other) {
            return this.parent().fits(frame, other);
        }
    };
    static LEFT_START = new class {
        rawValue = 'left start';
        frame(options) {
            const { origin, size } = this.parent().frame(options);
            return new devsupport_1.Frame(origin.x, Math.round(origin.y - (options.other.size.height - size.height) / 2 + options.offsets.origin.y), size.width, size.height);
        }
        flex() {
            return {
                direction: 'row-reverse',
                alignment: 'flex-start',
            };
        }
        parent() {
            return PopoverPlacements.LEFT;
        }
        reverse() {
            return PopoverPlacements.RIGHT_START;
        }
        family() {
            return this.parent().family();
        }
        fits(frame, other) {
            return this.parent().fits(frame, other);
        }
    };
    static RIGHT_END = new class {
        rawValue = 'right end';
        frame(options) {
            const { origin, size } = this.parent().frame(options);
            return new devsupport_1.Frame(origin.x, Math.round(origin.y + (options.other.size.height - size.height) / 2 - options.offsets.size.height), size.width, size.height);
        }
        flex() {
            return {
                direction: 'row',
                alignment: 'flex-end',
            };
        }
        parent() {
            return PopoverPlacements.RIGHT;
        }
        reverse() {
            return PopoverPlacements.LEFT_END;
        }
        family() {
            return this.parent().family();
        }
        fits(frame, other) {
            return this.parent().fits(frame, other);
        }
    };
    static LEFT_END = new class {
        rawValue = 'left end';
        frame(options) {
            const { origin, size } = this.parent().frame(options);
            return new devsupport_1.Frame(origin.x, Math.round(origin.y + (options.other.size.height - size.height) / 2 - options.offsets.size.height), size.width, size.height);
        }
        flex() {
            return {
                direction: 'row-reverse',
                alignment: 'flex-end',
            };
        }
        parent() {
            return PopoverPlacements.LEFT;
        }
        reverse() {
            return PopoverPlacements.RIGHT_END;
        }
        family() {
            return this.parent().family();
        }
        fits(frame, other) {
            return this.parent().fits(frame, other);
        }
    };
    static RIGHT = new class {
        rawValue = 'right';
        frame(options) {
            const { origin, size } = options.source.rightOf(options.other).centerVerticalOf(options.other);
            const x = devsupport_1.RTLService.select(origin.x - options.offsets.size.width, options.bounds.size.width - size.width - (origin.x - options.offsets.size.width));
            return new devsupport_1.Frame(x, origin.y, size.width, size.height);
        }
        flex() {
            return {
                direction: 'row',
                alignment: 'center',
            };
        }
        parent() {
            return this;
        }
        reverse() {
            return PopoverPlacements.LEFT;
        }
        family() {
            return [
                PopoverPlacements.RIGHT,
                PopoverPlacements.RIGHT_START,
                PopoverPlacements.RIGHT_END,
            ];
        }
        fits(frame, other) {
            return fitsEnd(frame, other) && fitsTop(frame, other) && fitsBottom(frame, other);
        }
    };
    static LEFT = new class {
        rawValue = 'left';
        frame(options) {
            const { origin, size } = options.source.leftOf(options.other).centerVerticalOf(options.other);
            const x = devsupport_1.RTLService.select(origin.x + options.offsets.origin.x, options.bounds.size.width - size.width - (origin.x + options.offsets.size.width));
            return new devsupport_1.Frame(x, origin.y, size.width, size.height);
        }
        flex() {
            return {
                direction: 'row-reverse',
                alignment: 'center',
            };
        }
        parent() {
            return this;
        }
        reverse() {
            return PopoverPlacements.RIGHT;
        }
        family() {
            return [
                PopoverPlacements.LEFT,
                PopoverPlacements.LEFT_START,
                PopoverPlacements.LEFT_END,
            ];
        }
        fits(frame, other) {
            return fitsStart(frame, other) && fitsTop(frame, other) && fitsBottom(frame, other);
        }
    };
    static BOTTOM_START = new class {
        rawValue = 'bottom start';
        frame(options) {
            const { origin, size } = this.parent().frame(options);
            return new devsupport_1.Frame(Math.round(origin.x - (options.other.size.width - size.width) / 2 + options.offsets.origin.x), origin.y, size.width, size.height);
        }
        flex() {
            return {
                direction: 'column',
                alignment: 'flex-start',
            };
        }
        parent() {
            return PopoverPlacements.BOTTOM;
        }
        reverse() {
            return PopoverPlacements.TOP_START;
        }
        family() {
            return this.parent().family();
        }
        fits(frame, other) {
            return this.parent().fits(frame, other);
        }
    };
    static TOP_START = new class {
        rawValue = 'top start';
        frame(options) {
            const { origin, size } = this.parent().frame(options);
            return new devsupport_1.Frame(Math.round(origin.x - (options.other.size.width - size.width) / 2 + options.offsets.origin.x), origin.y, size.width, size.height);
        }
        flex() {
            return {
                direction: 'column-reverse',
                alignment: 'flex-start',
            };
        }
        parent() {
            return PopoverPlacements.TOP;
        }
        reverse() {
            return PopoverPlacements.BOTTOM_START;
        }
        family() {
            return this.parent().family();
        }
        fits(frame, other) {
            return this.parent().fits(frame, other);
        }
    };
    static BOTTOM_END = new class {
        rawValue = 'bottom end';
        frame(options) {
            const { origin, size } = this.parent().frame(options);
            return new devsupport_1.Frame(Math.round(origin.x + (options.other.size.width - size.width) / 2 - options.offsets.size.width), origin.y, size.width, size.height);
        }
        flex() {
            return {
                direction: 'column',
                alignment: 'flex-end',
            };
        }
        parent() {
            return PopoverPlacements.BOTTOM;
        }
        reverse() {
            return PopoverPlacements.TOP_END;
        }
        family() {
            return this.parent().family();
        }
        fits(frame, other) {
            return this.parent().fits(frame, other);
        }
    };
    static TOP_END = new class {
        rawValue = 'top end';
        frame(options) {
            const { origin, size } = this.parent().frame(options);
            return new devsupport_1.Frame(Math.round(origin.x + (options.other.size.width - size.width) / 2 - options.offsets.size.width), origin.y, size.width, size.height);
        }
        flex() {
            return {
                direction: 'column-reverse',
                alignment: 'flex-end',
            };
        }
        parent() {
            return PopoverPlacements.TOP;
        }
        reverse() {
            return PopoverPlacements.BOTTOM_END;
        }
        family() {
            return this.parent().family();
        }
        fits(frame, other) {
            return this.parent().fits(frame, other);
        }
    };
    static INNER = new class {
        rawValue = 'inner';
        frame(options) {
            const { origin, size } = options.source.centerVerticalOf(options.other).centerHorizontalOf(options.other);
            const x = devsupport_1.RTLService.select(origin.x, options.bounds.size.width - (origin.x + size.width));
            return new devsupport_1.Frame(x, origin.y - options.offsets.size.height, size.width, size.height);
        }
        flex() {
            return {
                direction: 'column',
                alignment: 'center',
            };
        }
        parent() {
            return this;
        }
        reverse() {
            return PopoverPlacements.INNER;
        }
        family() {
            return [
                PopoverPlacements.INNER_TOP,
                PopoverPlacements.INNER_BOTTOM,
                PopoverPlacements.INNER,
            ];
        }
        fits(frame, other) {
            return fitsBottom(frame, other) && fitsLeft(frame, other) && fitsRight(frame, other);
        }
    };
    static INNER_TOP = new class {
        rawValue = 'inner top';
        frame(options) {
            const { origin, size } = options.source.topIn(options.other).centerHorizontalOf(options.other);
            const x = devsupport_1.RTLService.select(origin.x, options.bounds.size.width - (origin.x + size.width));
            return new devsupport_1.Frame(x, origin.y - options.offsets.size.height, size.width, size.height);
        }
        flex() {
            return {
                direction: 'column',
                alignment: 'center',
            };
        }
        parent() {
            return PopoverPlacements.INNER;
        }
        reverse() {
            return PopoverPlacements.INNER_BOTTOM;
        }
        family() {
            return this.parent().family();
        }
        fits(frame, other) {
            return this.parent().fits(frame, other);
        }
    };
    static INNER_BOTTOM = new class {
        rawValue = 'inner bottom';
        frame(options) {
            const { origin, size } = options.source.bottomIn(options.other).centerHorizontalOf(options.other);
            const x = devsupport_1.RTLService.select(origin.x, options.bounds.size.width - (origin.x + size.width));
            return new devsupport_1.Frame(x, origin.y - options.offsets.size.height, size.width, size.height);
        }
        flex() {
            return {
                direction: 'column-reverse',
                alignment: 'center',
            };
        }
        parent() {
            return PopoverPlacements.INNER;
        }
        reverse() {
            return PopoverPlacements.INNER_TOP;
        }
        family() {
            return this.parent().family();
        }
        fits(frame, other) {
            return this.parent().fits(frame, other);
        }
    };
    static TOP = new class {
        rawValue = 'top';
        frame(options) {
            const { origin, size } = options.source.topOf(options.other).centerHorizontalOf(options.other);
            const x = devsupport_1.RTLService.select(origin.x, options.bounds.size.width - (origin.x + size.width));
            return new devsupport_1.Frame(x, origin.y + options.offsets.origin.y, size.width, size.height);
        }
        flex() {
            return {
                direction: 'column-reverse',
                alignment: 'center',
            };
        }
        parent() {
            return this;
        }
        reverse() {
            return PopoverPlacements.BOTTOM;
        }
        family() {
            return [
                PopoverPlacements.TOP,
                PopoverPlacements.TOP_START,
                PopoverPlacements.TOP_END,
            ];
        }
        fits(frame, other) {
            return fitsTop(frame, other) && fitsLeft(frame, other) && fitsRight(frame, other);
        }
    };
    static BOTTOM = new class {
        rawValue = 'bottom';
        frame(options) {
            const { origin, size } = options.source.bottomOf(options.other).centerHorizontalOf(options.other);
            const x = devsupport_1.RTLService.select(origin.x, options.bounds.size.width - (origin.x + size.width));
            return new devsupport_1.Frame(x, origin.y - options.offsets.size.height, size.width, size.height);
        }
        flex() {
            return {
                direction: 'column',
                alignment: 'center',
            };
        }
        parent() {
            return this;
        }
        family() {
            return [
                PopoverPlacements.BOTTOM,
                PopoverPlacements.BOTTOM_START,
                PopoverPlacements.BOTTOM_END,
            ];
        }
        reverse() {
            return PopoverPlacements.TOP;
        }
        fits(frame, other) {
            return fitsBottom(frame, other) && fitsLeft(frame, other) && fitsRight(frame, other);
        }
    };
    static parse(value, fallback) {
        return PopoverPlacements.typeOf(value) ? value : PopoverPlacements.parseString(value, fallback);
    }
    static parseString(rawValue, fallback) {
        switch (rawValue) {
            case PopoverPlacements.LEFT.rawValue:
                return PopoverPlacements.LEFT;
            case PopoverPlacements.TOP.rawValue:
                return PopoverPlacements.TOP;
            case PopoverPlacements.RIGHT.rawValue:
                return PopoverPlacements.RIGHT;
            case PopoverPlacements.BOTTOM.rawValue:
                return PopoverPlacements.BOTTOM;
            case PopoverPlacements.LEFT_START.rawValue:
                return PopoverPlacements.LEFT_START;
            case PopoverPlacements.LEFT_END.rawValue:
                return PopoverPlacements.LEFT_END;
            case PopoverPlacements.TOP_START.rawValue:
                return PopoverPlacements.TOP_START;
            case PopoverPlacements.TOP_END.rawValue:
                return PopoverPlacements.TOP_END;
            case PopoverPlacements.RIGHT_START.rawValue:
                return PopoverPlacements.RIGHT_START;
            case PopoverPlacements.RIGHT_END.rawValue:
                return PopoverPlacements.RIGHT_END;
            case PopoverPlacements.BOTTOM_START.rawValue:
                return PopoverPlacements.BOTTOM_START;
            case PopoverPlacements.BOTTOM_END.rawValue:
                return PopoverPlacements.BOTTOM_END;
            case PopoverPlacements.INNER.rawValue:
                return PopoverPlacements.INNER;
            case PopoverPlacements.INNER_TOP.rawValue:
                return PopoverPlacements.INNER_TOP;
            case PopoverPlacements.INNER_BOTTOM.rawValue:
                return PopoverPlacements.INNER_BOTTOM;
            default:
                return fallback;
        }
    }
    static typeOf(value) {
        const { rawValue } = value;
        return rawValue !== undefined;
    }
}
exports.PopoverPlacements = PopoverPlacements;
const fitsStart = (frame, other) => {
    return devsupport_1.RTLService.select(fitsLeft, fitsRight)(frame, other);
};
const fitsEnd = (frame, other) => {
    return devsupport_1.RTLService.select(fitsRight, fitsLeft)(frame, other);
};
const fitsLeft = (frame, other) => {
    return frame.origin.x >= other.origin.x;
};
const fitsRight = (frame, other) => {
    return frame.origin.x + frame.size.width <= other.size.width;
};
const fitsTop = (frame, other) => {
    return frame.origin.y >= other.origin.y;
};
const fitsBottom = (frame, other) => {
    return frame.origin.y + frame.size.height <= other.size.height;
};
//# sourceMappingURL=type.js.map