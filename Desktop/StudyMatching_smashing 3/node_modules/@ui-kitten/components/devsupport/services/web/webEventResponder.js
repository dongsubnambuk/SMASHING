"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebEventResponder = exports.WebEventResponderInstance = void 0;
class WebEventResponderInstance {
    eventHandlers;
    constructor(props) {
        this.eventHandlers = props;
    }
}
exports.WebEventResponderInstance = WebEventResponderInstance;
class WebEventResponderStatic {
    static create(config) {
        return new WebEventResponderInstance({
            onMouseEnter: () => {
                config.onMouseEnter?.();
            },
            onMouseLeave: () => {
                config.onMouseLeave?.();
            },
            onFocus: () => {
                config.onFocus?.();
            },
            onBlur: () => {
                config.onBlur?.();
            },
        });
    }
}
exports.WebEventResponder = WebEventResponderStatic;
//# sourceMappingURL=webEventResponder.js.map