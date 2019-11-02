var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './core-fa39fbc1.js';
var JeepColorpicker = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        //************************
        //* Property Definitions *
        //************************
        /**
         * The preselected color
         */
        this.color = "#ff0000";
        /**
         * The preselected opacity
         */
        this.opacity = "1";
        /**
         * Validation buttons hidden
         */
        this.hidebuttons = false;
        /**
         * Header hidden
         */
        this.hideheader = false;
        /**
         * Opacity Slider hidden
         */
        this.hideopacity = false;
        this.show = false;
        this._color = null;
        this.getColor = createEvent(this, "jeepColorpickerGetColor", 7);
        this.openCpicker = createEvent(this, "jeepColorpickerOpen", 7);
        this.closeCpicker = createEvent(this, "jeepColorpickerClose", 7);
    }
    //*****************************
    //* Watch on Property Changes *
    //*****************************
    class_1.prototype.parseColorProp = function (newValue) {
        this.innerColor = newValue ? newValue : "#ff0000";
    };
    class_1.prototype.parseOpacityProp = function (newValue) {
        this.innerOpacity = newValue ? newValue : "1";
    };
    class_1.prototype.parseButtonsProp = function (newValue) {
        var butts;
        butts = newValue ? newValue.substr(1).slice(0, -1).split(',') : ["Color Picker", "Okay", "Cancel"];
        if (butts.length > 1) {
            butts = butts.length > 2
                ? butts
                : [butts[0], butts[1], "Cancel"];
        }
        else {
            butts = butts[0].length > 0
                ? butts = [butts[0], "Okay", "Cancel"]
                : butts = ["Color Picker", "Okay", "Cancel"];
        }
        var val = butts.slice();
        val.shift();
        this._cpickerButtons = "[" + val[0] + "," + val[1] + "]";
        this.innerButtons = butts;
    };
    class_1.prototype.parseHideButtonsProp = function (newValue) {
        this.innerHideButtons = newValue ? newValue : false;
    };
    class_1.prototype.parseHideHeaderProp = function (newValue) {
        this.innerHideHeader = newValue ? newValue : false;
    };
    class_1.prototype.parseHideOpacityProp = function (newValue) {
        this.innerHideOpacity = newValue ? newValue : false;
        this.innerOpacity = this.innerHideOpacity ? "1" : this.innerOpacity;
    };
    //*******************************
    //* Listen to Event Definitions *
    //*******************************
    class_1.prototype.openColorPickerHandler = function () {
        if (this.show) {
            this.openCpicker.emit();
        }
    };
    class_1.prototype.closeColorPickerHandler = function (event) {
        if (this.show) {
            this._color = event.detail.color;
            this.close(this._color, event.detail.button);
        }
    };
    class_1.prototype.instantColorPickerHandler = function (event) {
        this._color = event.detail;
        this.getColor.emit(event.detail);
    };
    //**********************
    //* Method Definitions *
    //**********************
    /**
     * Method initialize
     */
    class_1.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._init()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Method open the cpicker component
     */
    class_1.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.show = true;
                return [2 /*return*/];
            });
        });
    };
    /**
     * Method close the cpicker component
     */
    class_1.prototype.close = function (color, button) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.show = false;
                this.closeCpicker.emit({ color: color, button: button });
                return [2 /*return*/];
            });
        });
    };
    //*******************************
    //* Component Lifecycle Methods *
    //*******************************
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //******************************
    //* Private Method Definitions *
    //******************************
    class_1.prototype._init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.parseColorProp(this.color ? this.color : "#ff0000");
                this.parseOpacityProp(this.opacity ? this.opacity : "1");
                this.parseButtonsProp(this.buttons ? this.buttons : '[Color Picker,Okay,Cancel]');
                this.parseHideButtonsProp(this.hidebuttons ? this.hidebuttons : false);
                this.parseHideHeaderProp(this.hideheader ? this.hideheader : false);
                this.parseHideOpacityProp(this.hideopacity ? this.hideopacity : false);
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype._handleClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.open()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //*************************
    //* Rendering JSX Element *
    //*************************
    class_1.prototype.render = function () {
        var _this = this;
        var cpicker;
        if (this.show) {
            cpicker = this.innerHideButtons
                ?
                    h("jeep-cpicker", { color: this.innerColor, opacity: this.innerOpacity, hidebuttons: this.innerHideButtons, hideheader: this.innerHideHeader, hideopacity: this.innerHideOpacity })
                :
                    h("jeep-cpicker", { color: this.innerColor, opacity: this.innerOpacity, buttons: this._cpickerButtons, hideheader: this.innerHideHeader, hideopacity: this.innerHideOpacity });
        }
        return (h(Host, null, h("div", { class: "colorpicker-container" }, this.show
            ?
                cpicker
            :
                h("button", { class: "colorpicker-button", onClick: function () { return _this._handleClick(); } }, this.innerButtons[0]))));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "color": ["parseColorProp"],
                "opacity": ["parseOpacityProp"],
                "buttons": ["parseButtonsProp"],
                "hidebuttons": ["parseHideButtonsProp"],
                "hideheader": ["parseHideHeaderProp"],
                "hideopacity": ["parseHideOpacityProp"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ":host{--colorpicker-top:var(--gcolorpicker-top,10vh);--colorpicker-left:var(--gcolorpicker-left,10vw);--colorpicker-width:var(--gcolorpicker-width,70vmin);--colorpicker-height:var(--gcolorpicker-height,50vmin);--colorpicker-background-color:var(--gcolorpicker-background-color,#242424);--colorpicker-button-font-size:var(--gcolorpicker-button-font-size,12px);--colorpicker-button-margin-top:var(--gcolorpicker-button-margin-top,10px);--colorpicker-button-margin-left:var(--gcolorpicker-button-margin-left,10px);--colorpicker-button-border:var(--gcolorpicker-button-border,2px solid);--colorpicker-button-border-color:var(--gcolorpicker-button-border-color,#000);--colorpicker-button-border-radius:var(--gcolorpicker-button-border-radius,5px 5px);--colorpicker-button-color:var(--gcolorpicker-button-color,#000);--colorpicker-button-background-color:var(--gcolorpicker-button-background-color,#fff)}.colorpicker-button{border:var(--colorpicker-button-border);border-color:var(--colorpicker-button-border-color);border-radius:var(--colorpicker-button-border-radius);color:var(--colorpicker-button-color);background-color:var(--colorpicker-button-background-color);cursor:hand;cursor:pointer;font-size:var(--colorpicker-button-font-size);margin-top:var(--colorpicker-button-margin-top);margin-left:var(--colorpicker-button-margin-left)}jeep-cpicker{--cpicker-top:var(--colorpicker-top);--cpicker-left:var(--colorpicker-left);--cpicker-width:var(--colorpicker-width);--cpicker-height:var(--colorpicker-height);--cpicker-background-color:var(--colorpicker-background-color)}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { JeepColorpicker as jeep_colorpicker };
