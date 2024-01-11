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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlexViewCrossStyleProps = exports.FlexStyleProps = exports.TextStyleProps = exports.PropsService = exports.RTLService = exports.WebEventResponderInstance = exports.WebEventResponder = exports.Frame = exports.Size = exports.Point = exports.MeasureElement = exports.TouchableWeb = exports.TouchableWithoutFeedback = exports.FalsyText = exports.FalsyFC = void 0;
var falsyFC_component_1 = require("./components/falsyFC/falsyFC.component");
Object.defineProperty(exports, "FalsyFC", { enumerable: true, get: function () { return falsyFC_component_1.FalsyFC; } });
var falsyText_component_1 = require("./components/falsyText/falsyText.component");
Object.defineProperty(exports, "FalsyText", { enumerable: true, get: function () { return falsyText_component_1.FalsyText; } });
var touchableWithoutFeedback_component_1 = require("./components/touchableWithoutFeedback.component");
Object.defineProperty(exports, "TouchableWithoutFeedback", { enumerable: true, get: function () { return touchableWithoutFeedback_component_1.TouchableWithoutFeedback; } });
var touchableWeb_component_1 = require("./components/touchableWeb.component");
Object.defineProperty(exports, "TouchableWeb", { enumerable: true, get: function () { return touchableWeb_component_1.TouchableWeb; } });
var measure_component_1 = require("./components/measure/measure.component");
Object.defineProperty(exports, "MeasureElement", { enumerable: true, get: function () { return measure_component_1.MeasureElement; } });
var type_1 = require("./components/measure/type");
Object.defineProperty(exports, "Point", { enumerable: true, get: function () { return type_1.Point; } });
Object.defineProperty(exports, "Size", { enumerable: true, get: function () { return type_1.Size; } });
Object.defineProperty(exports, "Frame", { enumerable: true, get: function () { return type_1.Frame; } });
var webEventResponder_1 = require("./services/web/webEventResponder");
Object.defineProperty(exports, "WebEventResponder", { enumerable: true, get: function () { return webEventResponder_1.WebEventResponder; } });
Object.defineProperty(exports, "WebEventResponderInstance", { enumerable: true, get: function () { return webEventResponder_1.WebEventResponderInstance; } });
var rtl_service_1 = require("./services/rtl/rtl.service");
Object.defineProperty(exports, "RTLService", { enumerable: true, get: function () { return rtl_service_1.RTLService; } });
var props_service_1 = require("./services/props/props.service");
Object.defineProperty(exports, "PropsService", { enumerable: true, get: function () { return props_service_1.PropsService; } });
Object.defineProperty(exports, "TextStyleProps", { enumerable: true, get: function () { return props_service_1.TextStyleProps; } });
Object.defineProperty(exports, "FlexStyleProps", { enumerable: true, get: function () { return props_service_1.FlexStyleProps; } });
Object.defineProperty(exports, "FlexViewCrossStyleProps", { enumerable: true, get: function () { return props_service_1.FlexViewCrossStyleProps; } });
__exportStar(require("./typings"), exports);
//# sourceMappingURL=index.js.map