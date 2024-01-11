"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autocomplete = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const input_component_1 = require("../input/input.component");
const list_component_1 = require("../list/list.component");
const popover_component_1 = require("../popover/popover.component");
/**
 * Autocomplete is a normal text input enhanced by a panel of suggested options.
 *
 * @extends React.Component
 *
 * @method {() => void} focus - Focuses an input field and sets data list visible.
 *
 * @method {() => void} blur - Removes focus from input field and sets data list invisible.
 *
 * @method {() => boolean} isFocused - Returns true if the input field is currently focused.
 *
 * @method {() => void} clear - Removes all text from the input field.
 *
 * @property {ReactElement<AutocompleteItemProps> | ReactElement<AutocompleteItemProps>[]} children -
 * Options displayed within list.
 *
 * @property {(number) => void} onSelect - Called when option is pressed.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *basic*.
 * Useful for giving user a hint on the input validity.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {string} size - Size of the component.
 * Can be `small`, `medium` or `large`.
 * Defaults to *medium*.
 *
 * @property {ReactText | (TextProps) => ReactElement} label - String, number or a function component
 * to render to top of the input field.
 * If it is a function, expected to return a Text.
 *
 * @property {(ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the text.
 * Expected to return an Image.
 *
 * @property {(ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the text.
 * Expected to return an Image.
 *
 * @property {string | PopoverPlacement} placement - Position of the options list relative to the input field.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Defaults to *bottom*.
 *
 * @property {() => void} onFocus - Called when options list becomes visible.
 *
 * @property {() => void} onBlur - Called when options list becomes invisible.
 *
 * @property {InputProps} ...InputProps - Any props applied to Input component.
 *
 * @overview-example AutocompleteSimpleUsage
 * Autocomplete may contain options to be rendered within suggestions list.
 * Options should be provided by passing them to children.
 *
 * @overview-example AutocompleteAccessories
 * Autocomplete may contain accessories by passing `accessoryLeft` or `accessoryRight` props.
 * By default, we expect it to be images.
 *
 * @example AutocompleteHandleKeyboard
 * On mobile devices, options may be overlapped by keyboard.
 * It can be handled with `placement` property.
 *
 * @example AutocompleteAsync
 * For requesting a real-world data by typing, http requests may be sent with debounce.
 */
class Autocomplete extends react_1.default.Component {
    static defaultProps = {
        placement: 'inner top',
    };
    state = {
        listVisible: false,
    };
    inputRef = react_1.default.createRef();
    inputRefAnchor = react_1.default.createRef();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get data() {
        return react_1.default.Children.toArray(this.props.children || []);
    }
    focus = () => {
        this.inputRef.current?.focus();
    };
    blur = () => {
        this.inputRef.current?.blur();
    };
    isFocused = () => {
        return this.inputRef.current?.isFocused();
    };
    clear = () => {
        this.inputRef.current?.clear();
    };
    componentDidUpdate(prevProps) {
        const { listVisible } = this.state;
        const isChildCountChanged = this.data.length !== react_1.default.Children.count(prevProps.children);
        const shouldBecomeVisible = !listVisible && this.isFocused() && isChildCountChanged;
        shouldBecomeVisible && this.setState({ listVisible: shouldBecomeVisible });
    }
    onInputFocus = (event) => {
        this.setOptionsListVisible();
        this.props.onFocus?.(event);
    };
    onAnchorInputFocus = (event) => {
        this.inputRefAnchor.current?.blur();
        this.setOptionsListVisible();
        this.focus();
        this.props.onFocus?.(event);
    };
    onInputSubmitEditing = (e) => {
        this.setOptionsListInvisible();
        this.props.onSubmitEditing?.(e);
    };
    onBackdropPress = () => {
        this.blur();
        this.inputRefAnchor.current?.blur();
        this.setOptionsListInvisible();
    };
    onItemPress = (index) => {
        if (this.props.onSelect) {
            this.setOptionsListInvisible();
            this.props.onSelect(index);
        }
    };
    setOptionsListVisible = () => {
        const hasData = this.data.length > 0;
        hasData && this.setState({ listVisible: true });
    };
    setOptionsListInvisible = () => {
        this.setState({ listVisible: false });
    };
    renderItem = (info) => {
        return react_1.default.cloneElement(info.item, { onPress: () => this.onItemPress(info.index) });
    };
    renderAnchorInputElement = (props) => {
        return (<react_native_1.View>
        <input_component_1.Input {...props} ref={this.inputRefAnchor} testID='@autocomplete/input-anchor' showSoftInputOnFocus={false} onFocus={this.onAnchorInputFocus} onSubmitEditing={this.onInputSubmitEditing}/>
      </react_native_1.View>);
    };
    renderInputElement = (props) => {
        return (<react_native_1.View>
        <input_component_1.Input {...props} ref={this.inputRef} testID='@autocomplete/input' showSoftInputOnFocus={true} autoFocus={true} onFocus={this.onInputFocus} onSubmitEditing={this.onInputSubmitEditing}/>
      </react_native_1.View>);
    };
    render() {
        const { placement, children, testID, ...inputProps } = this.props;
        return (<popover_component_1.Popover style={styles.popover} placement={placement} testID={testID} visible={this.state.listVisible} fullWidth={true} anchor={() => this.renderAnchorInputElement(inputProps)} onBackdropPress={this.onBackdropPress}>
        <>
          {this.renderInputElement(inputProps)}
          <list_component_1.List style={styles.list} keyboardShouldPersistTaps='always' data={this.data} bounces={false} renderItem={this.renderItem}/>
        </>
      </popover_component_1.Popover>);
    }
}
exports.Autocomplete = Autocomplete;
const styles = react_native_1.StyleSheet.create({
    popover: {
        maxHeight: 192,
        overflow: 'hidden',
        borderWidth: 0,
    },
    list: {
        flexGrow: 0,
        overflow: 'hidden',
    },
});
//# sourceMappingURL=autocomplete.component.js.map