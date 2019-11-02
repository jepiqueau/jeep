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
import { e as cssVar, f as getValueFromCss } from './common-b6b7dc41.js';
// Color utility functions
var initSelectedColor = function (currentColor, currentOpacity) {
    var color = {};
    color.hex = hextoHEX(currentColor, currentOpacity);
    color.rgb = hextoRGB(currentColor, currentOpacity);
    color.hsb = hextoHSB(currentColor, currentOpacity);
    color.hsl = hextoHSL(currentColor, currentOpacity);
    color.opacity = Number(parseFloat(currentOpacity).toFixed(3));
    return color;
};
var hextoHEX = function (hex, opacity) {
    var opa = parseFloat(opacity) <= 1 ? parseFloat(opacity) : 1;
    var ret = {};
    ret.hex = hex;
    var n = Math.round(opa * 255);
    var b = n.toString(16);
    b = b.length === 1 ? "0" + b : b;
    ret.hexa = hex + b;
    return ret;
};
var hextoRGB = function (hex, opacity) {
    var opa = parseFloat(opacity) <= 1 ? parseFloat(opacity) : 1;
    var hex1 = hex.replace(/#/, "");
    var ret = {};
    var bigint = parseInt(hex1, 16);
    ret.r = (bigint >> 16) & 255;
    ret.g = (bigint >> 8) & 255;
    ret.b = bigint & 255;
    ret.rgb = "RGB(" + ret.r + "," + ret.g + "," + ret.b + ")";
    ret.rgba = "RGBA(" + ret.r + "," + ret.g + "," + ret.b + "," + opa.toFixed(3) + ")";
    return ret;
};
var hextoHSB = function (hex, opacity) {
    var opa = parseFloat(opacity) <= 1 ? parseFloat(opacity) : 1;
    var ret = {};
    var rgb = hextoRGB(hex, opa.toString());
    var min = Math.min(rgb.r, rgb.g, rgb.b);
    var max = Math.max(rgb.r, rgb.g, rgb.b);
    var d = max - min;
    var s = max == 0 ? 0 : d / max;
    var b = max / 255;
    var h;
    switch (max) {
        case min:
            h = 0;
            break;
        case rgb.r:
            h = (rgb.g - rgb.b) + d * (rgb.g < rgb.b ? 6 : 0);
            h /= 6 * d;
            break;
        case rgb.g:
            h = (rgb.b - rgb.r) + d * 2;
            h /= 6 * d;
            break;
        case rgb.b:
            h = (rgb.r - rgb.g) + d * 4;
            h /= 6 * d;
            break;
    }
    ret.h = parseFloat((h * 360).toFixed(3));
    ret.s = parseFloat((s * 100).toFixed(3));
    ret.b = parseFloat((b * 100).toFixed(3));
    ret.hsb = "HSB(" + ret.h.toFixed(0) + "," + ret.s.toFixed(0) + "%," + ret.b.toFixed(0) + "%)";
    ret.hsba = "HSBA(" + ret.h.toFixed(0) + "," + ret.s.toFixed(0) + "%," + ret.b.toFixed(0) + "%," + opa.toFixed(3) + ")";
    return ret;
};
var hextoHSL = function (hex, opacity) {
    var opa = parseFloat(opacity) <= 1 ? parseFloat(opacity) : 1;
    var rgb = hextoRGB(hex, opa.toString());
    var ret = RGBtoHSL(rgb);
    return ret;
};
var RGBtoHSL = function (rgb) {
    var opa = opacityfromRGB(rgb);
    var ret = {};
    var r = rgb.r / 255;
    var g = rgb.g / 255;
    var b = rgb.b / 255;
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var h = (max + min) / 2;
    var s = h;
    var l = h;
    if (max == min) {
        h = s = 0; //achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    ret.h = parseFloat((h * 360).toFixed(3));
    ret.s = parseFloat((s * 100).toFixed(3));
    ret.l = parseFloat((l * 100).toFixed(3));
    ret.hsl = "HSL(" + ret.h.toFixed(0) + "," + ret.s.toFixed(0) + "%," + ret.l.toFixed(0) + "%)";
    ret.hsla = "HSLA(" + ret.h.toFixed(0) + "," + ret.s.toFixed(0) + "%," + ret.l.toFixed(0) + "%," + opa.toFixed(3) + ")";
    return ret;
};
var HSBtoRGB = function (hsb) {
    var ret = {};
    var opa = opacityfromHSB(hsb);
    var h = hsb.h / 360;
    var i = Math.floor(h * 6);
    var values = (function () {
        var _a = [hsb.s, hsb.b].map(function (val) { return Number(val) / 100; }), s = _a[0], b = _a[1];
        var f = h * 6 - i;
        var p = b * (1 - s);
        var q = b * (1 - f * s);
        var t = b * (1 - (1 - f) * s);
        return {
            0: [b, t, p],
            1: [q, b, p],
            2: [p, b, t],
            3: [p, q, b],
            4: [t, p, b],
            5: [b, p, q]
        };
    })();
    var _a = values[i % 6].map(function (val) { return Math.round(val * 255); }), r = _a[0], g = _a[1], b = _a[2];
    ret.r = r;
    ret.g = g;
    ret.b = b;
    ret.rgb = "RGB(" + ret.r + "," + ret.g + "," + ret.b + ")";
    ret.rgba = "RGBA(" + ret.r + "," + ret.g + "," + ret.b + "," + opa.toFixed(3) + ")";
    return ret;
};
var RGBtoHEX = function (rgb) {
    var val = rgb.rgba.split('(')[1].slice(0, -1).split(',');
    var hex = "#";
    val.forEach(function (item, index) {
        if (index === 3) {
            var a = (Math.round(parseFloat(item) * 255)).toString(16);
            if (a.length < 2)
                a = "0" + a;
            hex += a;
        }
        else {
            var a = (parseFloat(item)).toString(16);
            if (a.length < 2)
                a = "0" + a;
            hex += a;
        }
    });
    var ret = {};
    ret.hex = hex.slice(0, -2);
    ret.hexa = hex;
    return ret;
};
var HSBtoHEX = function (hsb) {
    var rgb = HSBtoRGB(hsb);
    return RGBtoHEX(rgb);
};
var HSLtoHEX = function (hsl) {
    var rgb = HSLtoRGB(hsl);
    return RGBtoHEX(rgb);
};
var HSLtoRGB = function (hsl) {
    var ret = {};
    var opa = opacityfromHSL(hsl);
    var h = hsl.h / 360;
    var s = hsl.s / 100;
    var l = hsl.l / 100;
    if (s === 0) {
        ret.r = ret.g = ret.b = l; // achromatic
    }
    else {
        var hue2rgb = function (p, q, t) {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        ret.r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
        ret.g = Math.round(hue2rgb(p, q, h) * 255);
        ret.b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
    }
    ret.rgb = "RGB(" + ret.r + "," + ret.g + "," + ret.b + ")";
    ret.rgba = "RGBA(" + ret.r + "," + ret.g + "," + ret.b + "," + opa.toFixed(3) + ")";
    return ret;
};
var HcolortoHEX = function (hsb) {
    // clone hsb
    var ret = Object.assign({}, hsb);
    var opa = opacityfromHSB(ret);
    ret.s = 100;
    ret.b = 100;
    ret.hsb = "HSB(" + ret.h.toFixed(0) + "," + ret.s.toFixed(0) + "%," + ret.b.toFixed(0) + "%)";
    ret.hsba = "HSBA(" + ret.h.toFixed(0) + "," + ret.s.toFixed(0) + "%," + ret.b.toFixed(0) + "%," + opa.toFixed(3) + ")";
    return HSBtoHEX(ret);
};
var opacityfromRGB = function (rgb) {
    return parseFloat(rgb.rgba.split(',')[3].slice(0, -1));
};
var opacityfromHEX = function (hex) {
    return parseInt(hex.hexa.slice(hex.hexa.length - 2, hex.hexa.length), 16) / 255;
};
var opacityfromHSB = function (hsb) {
    return parseFloat(hsb.hsba.split(',')[3].slice(0, -1));
};
var opacityfromHSL = function (hsl) {
    return parseFloat(hsl.hsla.split(',')[3].slice(0, -1));
};
var fillColor = function (value) {
    var color = {};
    color.hex = {};
    color.rgb = {};
    color.hsb = {};
    color.hsl = {};
    if (value['hex']) {
        color.hex.hex = value['hex'];
        color.hex.hexa = value['hexa'];
        color.opacity = opacityfromHEX(color.hex);
        color.rgb = hextoRGB(color.hex.hex, color.opacity.toString());
        color.hsb = hextoHSB(color.hex.hex, color.opacity.toString());
        color.hsl = hextoHSL(color.hex.hex, color.opacity.toString());
    }
    if (value['rgb']) {
        color.rgb.r = value['r'];
        color.rgb.g = value['g'];
        color.rgb.b = value['b'];
        color.rgb.rgb = value['rgb'];
        color.rgb.rgba = value['rgba'];
        color.opacity = opacityfromRGB(color.rgb);
        color.hex = RGBtoHEX(color.rgb);
        color.hsb = hextoHSB(color.hex.hex, color.opacity.toString());
        color.hsl = RGBtoHSL(color.rgb);
    }
    if (value['hsb']) {
        color.hsb.h = value['h'];
        color.hsb.s = value['s'];
        color.hsb.b = value['b'];
        color.hsb.hsb = value['hsb'];
        color.hsb.hsba = value['hsba'];
        color.opacity = opacityfromHSB(color.hsb);
        color.hex = HSBtoHEX(color.hsb);
        color.rgb = HSBtoRGB(color.hsb);
        color.hsl = RGBtoHSL(color.rgb);
    }
    if (value['hsl']) {
        color.hsl.h = value['h'];
        color.hsl.s = value['s'];
        color.hsl.l = value['l'];
        color.hsl.hsl = value['hsl'];
        color.hsl.hsla = value['hsla'];
        color.opacity = opacityfromHSL(color.hsl);
        color.hex = HSLtoHEX(color.hsl);
        color.rgb = HSLtoRGB(color.hsl);
        color.hsb = hextoHSB(color.hex.hex, color.opacity.toString());
    }
    return color;
};
var JeepCpicker = /** @class */ (function () {
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
        this.opacity = "1.000";
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
        this.toggleDisplay = false;
        //*********************************
        //* Internal Variable Definitions *
        //*********************************
        this._stateProperties = { init: false };
        this._textType = ['hex', 'rgb', 'hsl', 'hsb'];
        this._wrapCss = {};
        this._wrapperSize = { width: 0, height: 0 };
        this._mouseStart = false;
        this._resize = false;
        this._onElement = null;
        this.onOpen = createEvent(this, "jeepCpickerOpen", 7);
        this.onClose = createEvent(this, "jeepCpickerClose", 7);
        this.onInstantColor = createEvent(this, "jeepCpickerInstantColor", 7);
    }
    //*****************************
    //* Watch on Property Changes *
    //*****************************
    class_1.prototype.parseColorProp = function (newValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.innerColor = newValue ? newValue : "#ff0000";
                        this._stateProperties.hsb = hextoHSB(this.innerColor, this.innerOpacity ? this.innerOpacity.toFixed(3) : "1.000");
                        if (!this._stateProperties.init) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._setSelected(this.innerColor, this.innerOpacity ? this.innerOpacity : 1)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.parseOpacityProp = function (newValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.innerOpacity = newValue && !this.innerHideOpacity ? Number(newValue) : 1;
                        this._stateProperties.hsb = hextoHSB(this.innerColor ? this.innerColor : '#ff0000', this.innerOpacity.toFixed(3));
                        if (!this._stateProperties.init) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._setSelected(this.innerColor ? this.innerColor : '#ff0000', this.innerOpacity)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.parseButtonsProp = function (newValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.innerHideButtons) {
                            this.innerButtons = [];
                        }
                        else {
                            this.innerButtons = newValue ? newValue.substr(1).slice(0, -1).split(',') : ["Okay", "Cancel"];
                        }
                        if (!this._stateProperties.init) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._setSelected(this.innerColor, this.innerOpacity)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.parseHideButtonsProp = function (newValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.innerHideButtons = newValue ? newValue : false;
                        if (!this._stateProperties.init) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._setSelected(this.innerColor, this.innerOpacity)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.parseHideHeaderProp = function (newValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.innerHideHeader = newValue ? newValue : false;
                        if (!this._stateProperties.init) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._setSelected(this.innerColor, this.innerOpacity)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.parseHideOpacityProp = function (newValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.innerHideOpacity = newValue ? newValue : false;
                        if (!this._stateProperties.init) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._setSelected(this.innerColor, this.innerOpacity)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    //*******************************
    //* Listen to Event Definitions *
    //*******************************
    class_1.prototype.handleWindowResize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._windowResize()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
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
     * Method get StateProperties
     */
    class_1.prototype.getStateProperties = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._stateProperties];
            });
        });
    };
    /**
     * Method get local wrapper css variables
     */
    class_1.prototype.getWrapperCssVariables = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._wrapCss];
            });
        });
    };
    /**
     * Method get the vertical position for the hue slider handler
     */
    class_1.prototype.calcH = function (y, height) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(this._calcH(y, height))];
            });
        });
    };
    /**
     * Method get the horizontal position for the saturation slider handler
     */
    class_1.prototype.calcS = function (x, width) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(this._calcS(x, width))];
            });
        });
    };
    /**
     * Method get the vertical position for the brightness slider handler
     */
    class_1.prototype.calcB = function (y, height) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(this._calcB(y, height))];
            });
        });
    };
    /**
     * Method get the vertical position for the opacity slider handler
     */
    class_1.prototype.calcO = function (y, height) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(this._calcO(y, height))];
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
    class_1.prototype.componentDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._wrapperEl = this.el.shadowRoot.querySelector('.cpicker-wrapper');
                        this._circleEl = this.el.shadowRoot.querySelector('#cpickerHandler');
                        this._pickEl = this.el.shadowRoot.querySelector('#cpickerGradientB');
                        this._pickHueEl = this.el.shadowRoot.querySelector('#cpickerSliderHueColor');
                        this._pickHueSliderHandleEl = this.el.shadowRoot.querySelector('#cpickerColSliderHandler');
                        this._pickOpaEl = this.el.shadowRoot.querySelector('#cpickerSliderOpacity');
                        this._pickOpaSliderHandleEl = this.el.shadowRoot.querySelector('#cpickerOpaSliderHandler');
                        this._okEl = this.el.shadowRoot.querySelector('#cpickerOkay');
                        this._cancelEl = this.el.shadowRoot.querySelector('#cpickerCancel');
                        this._headlineEl = this.el.shadowRoot.querySelector('#cpickerSelColor');
                        return [4 /*yield*/, this._setBoundingBoxes()];
                    case 1:
                        _a.sent();
                        this.onOpen.emit();
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.componentDidUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._resize) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._setBoundingBoxes()];
                    case 1:
                        _a.sent();
                        this._resize = false;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
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
                switch (_a.label) {
                    case 0:
                        this.parseColorProp(this.color ? this.color : "#ff0000");
                        this.parseHideOpacityProp(this.hideopacity ? this.hideopacity : false);
                        this.parseOpacityProp(this.opacity ? this.opacity : "1");
                        this.parseHideButtonsProp(this.hidebuttons ? this.hidebuttons : false);
                        this.parseButtonsProp(this.buttons ? this.buttons : '[Okay,Cancel]');
                        this.parseHideHeaderProp(this.hideheader ? this.hideheader : false);
                        this.innerOpacity = this.innerHideOpacity ? 1 : this.innerOpacity;
                        this._bboxes = {};
                        this._oriColor = initSelectedColor(this.innerColor ? this.innerColor : '#ff0000', this.innerOpacity ? this.innerOpacity.toFixed(3) : "1");
                        return [4 /*yield*/, this._setCssVariable()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._setSelected(this.innerColor ? this.innerColor : '#ff0000', this.innerOpacity ? this.innerOpacity : 1)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype._setCssVariable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._wrapCss.backColor = cssVar(this.el, '--cpicker-background-color');
                this._wrapCss.backColor = this._wrapCss.backColor ? this._wrapCss.backColor : cssVar(this.el, '--cpicker-background-color', '#242424');
                this._wrapCss.top = cssVar(this.el, '--cpicker-top').replace(/  +/g, ' ');
                this._wrapCss.top = this._wrapCss.top ? this._wrapCss.top : cssVar(this.el, '--cpicker-top', '10vh');
                this._wrapCss.left = cssVar(this.el, '--cpicker-left').replace(/  +/g, ' ');
                this._wrapCss.left = this._wrapCss.left ? this._wrapCss.left : cssVar(this.el, '--cpicker-left', '10vw');
                this._wrapCss.width = cssVar(this.el, '--cpicker-width').replace(/  +/g, ' ');
                this._wrapCss.width = this._wrapCss.width ? this._wrapCss.width : cssVar(this.el, '--cpicker-width', '70vmin');
                this._wrapCss.height = cssVar(this.el, '--cpicker-height').replace(/  +/g, ' ');
                this._wrapCss.height = this._wrapCss.height ? this._wrapCss.height : cssVar(this.el, '--cpicker-height', '50vmin');
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype._setSelected = function (color, opacity) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!this._stateProperties.init) {
                            this._stateProperties.init = true;
                            this._stateProperties.textType = 'hex';
                            this._stateProperties.hsb = hextoHSB(color, opacity.toFixed(3));
                        }
                        this._stateProperties.window = {};
                        this._stateProperties.window.width = window.innerWidth;
                        this._stateProperties.window.height = window.innerHeight;
                        this._stateProperties.vmin = Math.min(window.innerWidth, window.innerHeight) / 100;
                        this._stateProperties.opacity = opacity.toFixed(3);
                        this._stateProperties.color = fillColor(this._stateProperties.hsb);
                        this._stateProperties.colorHeadline = this._stateProperties.color[this._stateProperties.textType][this._stateProperties.textType + 'a'];
                        this._stateProperties.hue = (HcolortoHEX(this._stateProperties.hsb)).hex;
                        this._stateProperties.colorText = this._setTextColor(this._stateProperties.color.hsb);
                        this._stateProperties.colorHandle = this._setTextColor(hextoHSB(this._wrapCss.backColor), 'back');
                        // required as css viewport does'nt work on safari
                        _a = this._stateProperties;
                        return [4 /*yield*/, getValueFromCss(this._wrapCss.top, "y")];
                    case 1:
                        // required as css viewport does'nt work on safari
                        _a.wrapperTop = _e.sent();
                        _b = this._stateProperties;
                        return [4 /*yield*/, getValueFromCss(this._wrapCss.left, "x")];
                    case 2:
                        _b.wrapperLeft = _e.sent();
                        _c = this._stateProperties;
                        return [4 /*yield*/, getValueFromCss(this._wrapCss.width, "x")];
                    case 3:
                        _c.wrapperWidth = _e.sent();
                        _d = this._stateProperties;
                        return [4 /*yield*/, getValueFromCss(this._wrapCss.height, "y")];
                    case 4:
                        _d.wrapperHeight = _e.sent();
                        this._stateProperties.header = {};
                        this._stateProperties.colorArea = {};
                        this._stateProperties.buttonArea = {};
                        this._stateProperties.fill = {};
                        this._stateProperties.header.xtext = !this.hideopacity ? 0.345 * this._stateProperties.wrapperWidth : 0.40 * this._stateProperties.wrapperWidth;
                        this._stateProperties.header.height = !this.hideheader ? 0.12 * this._stateProperties.wrapperHeight : 0;
                        this._stateProperties.header.width = !this.hideopacity ? 0.69 * this._stateProperties.wrapperWidth : 0.83 * this._stateProperties.wrapperWidth;
                        this._stateProperties.header.width1 = !this.hideopacity ? 0.31 * this._stateProperties.wrapperWidth : 0.17 * this._stateProperties.wrapperWidth;
                        this._stateProperties.colorArea.y = !this.hideheader ? 0.15 * this._stateProperties.wrapperHeight : 0.03 * this._stateProperties.wrapperHeight;
                        this._stateProperties.colorArea.widthSB = !this.hideopacity ? 0.66 * this._stateProperties.wrapperWidth : 0.80 * this._stateProperties.wrapperWidth;
                        this._stateProperties.colorArea.widthOpa = !this.hideopacity ? 0.11 * this._stateProperties.wrapperWidth : 0;
                        this._stateProperties.colorArea.widthHue = 0.11 * this._stateProperties.wrapperWidth;
                        this._stateProperties.colorArea.height = !this.hideheader && !this.hidebuttons
                            ? 0.66 * this._stateProperties.wrapperHeight
                            : !this.hideheader && this.hidebuttons
                                ? 0.78 * this._stateProperties.wrapperHeight
                                : this.hideheader && !this.hidebuttons
                                    ? 0.78 * this._stateProperties.wrapperHeight
                                    : 0.90 * this._stateProperties.wrapperHeight;
                        this._stateProperties.buttonArea.height = !this.hidebuttons ? 0.11 * this._stateProperties.wrapperHeight : 0;
                        this._stateProperties.buttonArea.x = !this.hidebuttons ? this.innerButtons[0].length === 1 && this.innerButtons[1].length === 1 ? .39 * this._stateProperties.wrapperWidth : .17 * this._stateProperties.wrapperWidth : 0;
                        this._stateProperties.buttonArea.width = !this.hidebuttons ? this.innerButtons[0].length === 1 && this.innerButtons[1].length === 1 ? .08 * this._stateProperties.wrapperWidth : .30 * this._stateProperties.wrapperWidth : 0;
                        this._stateProperties.buttonArea.xText1 = !this.hidebuttons ? this.innerButtons[0].length === 1 && this.innerButtons[1].length === 1 ? .43 * this._stateProperties.wrapperWidth : .32 * this._stateProperties.wrapperWidth : 0;
                        this._stateProperties.buttonArea.xText2 = !this.hidebuttons ? this.innerButtons[0].length === 1 && this.innerButtons[1].length === 1 ? .57 * this._stateProperties.wrapperWidth : .68 * this._stateProperties.wrapperWidth : 0;
                        this._stateProperties.buttonArea.colorText1 = !this.hidebuttons ? this.innerButtons[0].length === 1 && this.innerButtons[1].length === 1 ? '#00ff00' : this._stateProperties.colorHandle : this._stateProperties.colorHandle;
                        this._stateProperties.buttonArea.colorText2 = !this.hidebuttons ? this.innerButtons[0].length === 1 && this.innerButtons[1].length === 1 ? '#ff0000' : this._stateProperties.colorHandle : this._stateProperties.colorHandle;
                        this._stateProperties.opaHandlerY = this._stateProperties.colorArea.y + (1.0 - opacity) * this._stateProperties.colorArea.height - 0.006 * this._stateProperties.wrapperHeight;
                        this._stateProperties.hueHandlerY = this._stateProperties.colorArea.y + this._stateProperties.color.hsb.h / 360 * this._stateProperties.colorArea.height - 0.006 * this._stateProperties.wrapperHeight;
                        this._stateProperties.pickerHandler = {};
                        this._stateProperties.pickerHandler.x = 0.03 * this._stateProperties.wrapperWidth + this._stateProperties.color.hsb.s / 100 * this._stateProperties.colorArea.widthSB;
                        this._stateProperties.pickerHandler.y = this._stateProperties.colorArea.y + (1 - (this._stateProperties.color.hsb.b / 100)) * this._stateProperties.colorArea.height;
                        this._stateProperties.fill.color = "url(" + window.location.href + "#colorSliderGradient)";
                        this._stateProperties.fill.brightness = "url(" + window.location.href + "#cpickerBrightness)";
                        this._stateProperties.fill.hue = "url(" + window.location.href + "#cpickerHue)";
                        this._stateProperties.fill.opacity = "url(" + window.location.href + "#opacitySliderGradient)";
                        this._stateProperties.fill.transparency = "url(" + window.location.href + "#pattern-transparency)";
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype._setBoundingBoxes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._bboxes.wrapper = this._wrapperEl.getBoundingClientRect();
                this._bboxes.headline = this._headlineEl ? this._headlineEl.getBoundingClientRect() : null;
                this._bboxes.color = this._pickEl.getBoundingClientRect();
                this._bboxes.hue = this._pickHueEl.getBoundingClientRect();
                this._bboxes.opacity = this._pickOpaEl ? this._pickOpaEl.getBoundingClientRect() : null;
                this._bboxes.ok = this._okEl ? this._okEl.getBoundingClientRect() : null;
                this._bboxes.cancel = this._cancelEl ? this._cancelEl.getBoundingClientRect() : null;
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype._windowResize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._resize = true;
                        this._onElement = null;
                        return [4 /*yield*/, this._setSelected(this._stateProperties.color.hex.hex, Number(this._stateProperties.opacity))];
                    case 1:
                        _a.sent();
                        this.toggleDisplay = !this.toggleDisplay;
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype._setTextColor = function (hsb, t) {
        // define the color of the header text, the buttons text
        // and the slider handlers 
        // as a function of the hsb selected color and the background color
        var type = t ? t : 'col';
        var opa = opacityfromHSB(hsb);
        if (type == 'col' && opa < 0.40)
            return '#ffffff';
        if (hsb.h < 300 && hsb.h > 195) {
            if (hsb.s < 60 && hsb.b > 50)
                return '#000000';
            return '#ffffff';
        }
        if (hsb.h < 195 && hsb.h > 40) {
            if (hsb.b < 50)
                return '#ffffff';
            return '#000000';
        }
        if (hsb.b < 50)
            return '#ffffff';
        if (hsb.s > 60)
            return '#ffffff';
        return '#000000';
    };
    class_1.prototype._toggleTextType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var idx;
            return __generator(this, function (_a) {
                idx = this._textType.indexOf(this._stateProperties.textType);
                idx++;
                if (idx > 3)
                    idx = 0;
                this._stateProperties.textType = this._textType[idx];
                this._stateProperties.colorHeadline = this._stateProperties.color[this._stateProperties.textType][this._stateProperties.textType + 'a'];
                this.toggleDisplay = !this.toggleDisplay;
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype._okColorPickerHandler = function () {
        this.onClose.emit({ color: this._stateProperties.color, button: 1 });
        return;
    };
    class_1.prototype._cancelColorPickerHandler = function () {
        this.onClose.emit({ color: this._oriColor, button: 2 });
        return;
    };
    class_1.prototype._pickColor = function (pt) {
        return __awaiter(this, void 0, void 0, function () {
            var pos, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(pt.x <= this._bboxes.color.right && pt.x >= this._bboxes.color.left &&
                            pt.y <= this._bboxes.color.bottom && pt.y >= this._bboxes.color.top)) return [3 /*break*/, 4];
                        pos = this._getPickCoordinates(this._bboxes.color, pt);
                        _a = this._updateStateProperties;
                        _b = [this._stateProperties.hsb.h];
                        return [4 /*yield*/, this.calcS(pos.x, pos.width)];
                    case 1:
                        _b = _b.concat([_c.sent()]);
                        return [4 /*yield*/, this.calcB(pos.y, pos.height)];
                    case 2: return [4 /*yield*/, _a.apply(this, _b.concat([_c.sent(), opacityfromHSB(this._stateProperties.hsb)]))];
                    case 3: return [2 /*return*/, _c.sent()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype._pickHue = function (pt) {
        return __awaiter(this, void 0, void 0, function () {
            var pos, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(pt.x <= this._bboxes.hue.right && pt.x >= this._bboxes.hue.left &&
                            pt.y <= this._bboxes.hue.bottom && pt.y >= this._bboxes.hue.top)) return [3 /*break*/, 3];
                        pos = this._getPickCoordinates(this._bboxes.hue, pt);
                        _a = this._updateStateProperties;
                        return [4 /*yield*/, this.calcH(pos.y, pos.height)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent(), this._stateProperties.hsb.s, this._stateProperties.hsb.b, opacityfromHSB(this._stateProperties.hsb)])];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype._pickOpacity = function (pt) {
        return __awaiter(this, void 0, void 0, function () {
            var pos, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(pt.x <= this._bboxes.opacity.right && pt.x >= this._bboxes.opacity.left &&
                            pt.y <= this._bboxes.opacity.bottom && pt.y >= this._bboxes.opacity.top)) return [3 /*break*/, 3];
                        pos = this._getPickCoordinates(this._bboxes.opacity, pt);
                        _a = this._updateStateProperties;
                        _b = [this._stateProperties.hsb.h, this._stateProperties.hsb.s, this._stateProperties.hsb.b];
                        return [4 /*yield*/, this.calcO(pos.y, pos.height)];
                    case 1: return [4 /*yield*/, _a.apply(this, _b.concat([_c.sent()]))];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype._getPickCoordinates = function (rect, pt) {
        // return the event coordinates transformed in the target object coordinate system
        var rect1 = {};
        rect1.x = pt.x - rect.x;
        rect1.y = pt.y - rect.y;
        rect1.width = rect.width;
        rect1.height = rect.height;
        return rect1;
    };
    class_1.prototype._updateStateProperties = function (h, s, b, opa) {
        return __awaiter(this, void 0, void 0, function () {
            var color;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        color = {};
                        color.s = Number(s.toFixed(0));
                        color.b = Number(b.toFixed(0));
                        color.h = Number(h.toFixed(0));
                        color.hsb = "HSB(" + color.h.toFixed(0) + "," + color.s.toFixed(0) + "%," + color.b.toFixed(0) + "%)";
                        color.hsba = "HSBA(" + color.h.toFixed(0) + "," + color.s.toFixed(0) + "%," + color.b.toFixed(0) + "%," + opa.toFixed(3) + ")";
                        this._stateProperties.hsb = color;
                        return [4 /*yield*/, this._setSelected(fillColor(color).hex.hex, opa)];
                    case 1:
                        _a.sent();
                        this.toggleDisplay = !this.toggleDisplay;
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype._calcH = function (y, height) {
        // return the vertical position for the hue slider handler
        var ret;
        if (y < 0.01 * height) {
            ret = 0;
        }
        else if (y > 0.99 * height) {
            ret = 1;
        }
        else {
            ret = y / height;
        }
        return ret * 360;
    };
    class_1.prototype._calcS = function (x, width) {
        // return the horizontal position for the saturation slider handler
        var ret;
        if (x < 0.01 * width) {
            ret = 0;
        }
        else if (x > 0.99 * width) {
            ret = 100;
        }
        else {
            ret = x / width * 100;
        }
        return ret;
    };
    class_1.prototype._calcB = function (y, height) {
        // return the vertical position for the brightness slider handler
        var ret;
        if (y < 0.01 * height) {
            ret = 100;
        }
        else if (y > 0.99 * height) {
            ret = 0;
        }
        else {
            ret = (1 - (y / height)) * 100;
        }
        return ret;
    };
    class_1.prototype._calcO = function (y, height) {
        // return the vertical position for the opacity slider handler
        var ret;
        if (y < 0.01 * height) {
            ret = 1;
        }
        else if (y > 0.99 * height) {
            ret = 0;
        }
        else {
            ret = 1 - y / height;
        }
        return ret;
    };
    class_1.prototype._selectAction = function (elem, pt) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = elem;
                        switch (_a) {
                            case "cpickerSelColor": return [3 /*break*/, 1];
                            case "cpickerText": return [3 /*break*/, 1];
                            case "cpickerGradientB": return [3 /*break*/, 4];
                            case "cpickerSliderHueColor": return [3 /*break*/, 6];
                            case "cpickerColSliderHandler": return [3 /*break*/, 6];
                            case "cpickerSliderOpacity": return [3 /*break*/, 8];
                            case "cpickerOpaSliderHandler": return [3 /*break*/, 8];
                            case "cpickerOkay": return [3 /*break*/, 10];
                            case "cpickerOkayText": return [3 /*break*/, 10];
                            case "cpickerCancel": return [3 /*break*/, 11];
                            case "cpickerCancelText": return [3 /*break*/, 11];
                        }
                        return [3 /*break*/, 12];
                    case 1:
                        if (!!this._mouseStart) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._toggleTextType()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [3 /*break*/, 12];
                    case 4: return [4 /*yield*/, this._pickColor(pt)];
                    case 5:
                        _b.sent();
                        this.onInstantColor.emit(this._stateProperties.color);
                        return [3 /*break*/, 12];
                    case 6: return [4 /*yield*/, this._pickHue(pt)];
                    case 7:
                        _b.sent();
                        this.onInstantColor.emit(this._stateProperties.color);
                        return [3 /*break*/, 12];
                    case 8: return [4 /*yield*/, this._pickOpacity(pt)];
                    case 9:
                        _b.sent();
                        this.onInstantColor.emit(this._stateProperties.color);
                        return [3 /*break*/, 12];
                    case 10:
                        {
                            this._okColorPickerHandler();
                            return [3 /*break*/, 12];
                        }
                        _b.label = 11;
                    case 11:
                        {
                            this._cancelColorPickerHandler();
                            return [3 /*break*/, 12];
                        }
                        _b.label = 12;
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype._getOnElement = function (pt) {
        var id;
        var hueHandler = this._pickHueSliderHandleEl.getBoundingClientRect();
        var opaHandler = this._pickOpaSliderHandleEl ? this._pickOpaSliderHandleEl.getBoundingClientRect() : null;
        if (pt.x <= this._bboxes.color.right && pt.x >= this._bboxes.color.left &&
            pt.y <= this._bboxes.color.bottom && pt.y >= this._bboxes.color.top) {
            id = 'cpickerGradientB';
        }
        else if (pt.x <= this._bboxes.hue.right && pt.x >= this._bboxes.hue.left &&
            pt.y <= this._bboxes.hue.bottom && pt.y >= this._bboxes.hue.top) {
            id = 'cpickerSliderHueColor';
        }
        else if (!this.hideopacity && (pt.x <= this._bboxes.opacity.right && pt.x >= this._bboxes.opacity.left &&
            pt.y <= this._bboxes.opacity.bottom && pt.y >= this._bboxes.opacity.top)) {
            id = 'cpickerSliderOpacity';
        }
        else if (!this.hidebuttons && (pt.x <= this._bboxes.ok.right && pt.x >= this._bboxes.ok.left &&
            pt.y <= this._bboxes.ok.bottom && pt.y >= this._bboxes.ok.top)) {
            id = 'cpickerOkay';
        }
        else if (!this.hidebuttons && (pt.x <= this._bboxes.cancel.right && pt.x >= this._bboxes.cancel.left &&
            pt.y <= this._bboxes.cancel.bottom && pt.y >= this._bboxes.cancel.top)) {
            id = 'cpickerCancel';
        }
        else if (!this.hideheader && (pt.x <= this._bboxes.headline.right && pt.x >= this._bboxes.headline.left &&
            pt.y <= this._bboxes.headline.bottom && pt.y >= this._bboxes.headline.top)) {
            id = 'cpickerSelColor';
        }
        else if (!this.hideopacity && (pt.x <= opaHandler.right && pt.x >= opaHandler.left &&
            pt.y <= opaHandler.bottom && pt.y >= opaHandler.top)) {
            id = 'cpickerOpaSliderHandler';
        }
        else if (pt.x <= hueHandler.right && pt.x >= hueHandler.left &&
            pt.y <= hueHandler.bottom && pt.y >= hueHandler.top) {
            id = 'cpickerColSliderHandler';
        }
        else if (this.hidebuttons) {
            id = 'cpicker-wrapper';
        }
        else {
            id = null;
        }
        return id;
    };
    class_1.prototype._movePoint = function (id, pt) {
        var _this = this;
        // If there's a timer, cancel it
        if (this._timeout) {
            window.cancelAnimationFrame(this._timeout);
        }
        // Setup the new requestAnimationFrame()
        this._timeout = window.requestAnimationFrame(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Run our window resize functions
                    return [4 /*yield*/, this._selectAction(id, pt)];
                    case 1:
                        // Run our window resize functions
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    //************************
    //* Mouse / Touch Events *
    //************************
    class_1.prototype._handleMouseDown = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var pt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ev.preventDefault();
                        pt = { x: ev.pageX, y: ev.pageY };
                        this._onElement = this._getOnElement(pt);
                        if (!(this._onElement != null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._selectAction(this._onElement, pt)];
                    case 1:
                        _a.sent();
                        this._mouseStart = true;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype._handleMouseMove = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var pt;
            return __generator(this, function (_a) {
                ev.preventDefault();
                if (this._mouseStart) {
                    pt = { x: ev.pageX, y: ev.pageY };
                    if (this._onElement != null &&
                        (this._onElement === 'cpickerGradientB' || this._onElement === 'cpickerSliderHueColor' || this._onElement === 'cpickerSliderOpacity')) {
                        this._movePoint(this._onElement, pt);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype._handleMouseEnd = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                ev.preventDefault();
                if (this._mouseStart) {
                    if (this.hidebuttons && this._onElement === 'cpicker-wrapper')
                        this._okColorPickerHandler();
                    this._mouseStart = false;
                    this._onElement = null;
                }
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype._handleTouchStart = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var pt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ev.preventDefault();
                        pt = { x: ev.touches[0].pageX, y: ev.touches[0].pageY };
                        this._onElement = this._getOnElement(pt);
                        if (!(this._onElement != null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._selectAction(this._onElement, pt)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype._handleTouchMove = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var pt;
            return __generator(this, function (_a) {
                ev.preventDefault();
                pt = { x: ev.touches[0].pageX, y: ev.touches[0].pageY };
                if (this._onElement != null &&
                    (this._onElement === 'cpickerGradientB' || this._onElement === 'cpickerSliderHueColor' || this._onElement === 'cpickerSliderOpacity')) {
                    this._movePoint(this._onElement, pt);
                }
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype._handleTouchEnd = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                ev.preventDefault();
                if (this.hidebuttons && this._onElement === 'cpicker-wrapper')
                    this._okColorPickerHandler();
                this._onElement = null;
                return [2 /*return*/];
            });
        });
    };
    //*************************
    //* Rendering JSX Element *
    //*************************
    class_1.prototype.render = function () {
        var _this = this;
        // required as css viewport does'nt work on safari
        var styleWrapper = {
            top: this._stateProperties.wrapperTop + "px",
            left: this._stateProperties.wrapperLeft + "px",
            width: this._stateProperties.wrapperWidth + "px",
            height: this._stateProperties.wrapperHeight + "px"
        };
        //
        return (h(Host, null, h("div", { class: "cpicker-container" }, h("div", { class: "cpicker-wrapper", style: styleWrapper, onMouseDown: function (event) { return _this._handleMouseDown(event); }, onMouseMove: function (event) { return _this._handleMouseMove(event); }, onMouseUp: function (event) { return _this._handleMouseEnd(event); }, onTouchStart: function (event) { return _this._handleTouchStart(event); }, onTouchMove: function (event) { return _this._handleTouchMove(event); }, onTouchEnd: function (event) { return _this._handleTouchEnd(event); } }, h("svg", { width: "100%", height: "100%" }, h("defs", null, h("pattern", { id: "pattern-transparency", x: "0", y: "0", width: (2.4 * this._stateProperties.vmin).toString(), height: (2.4 * this._stateProperties.vmin).toString(), patternUnits: "userSpaceOnUse" }, h("rect", { class: "pattern-cube", x: "0", width: (1.2 * this._stateProperties.vmin).toString(), height: (1.2 * this._stateProperties.vmin).toString(), y: "0" }), h("rect", { class: "pattern-cube", x: (1.2 * this._stateProperties.vmin).toString(), width: (1.2 * this._stateProperties.vmin).toString(), height: (1.2 * this._stateProperties.vmin).toString(), y: (1.2 * this._stateProperties.vmin).toString() })), h("linearGradient", { id: "cpickerHue" }, h("stop", { offset: "0", "stop-color": "#ffffff", "stop-opacity": "1" }), h("stop", { offset: "1", "stop-color": "#ffffff", "stop-opacity": "0" })), h("linearGradient", { id: "cpickerBrightness", x2: "0", y2: "1" }, h("stop", { offset: "0", "stop-color": "#000000", "stop-opacity": "0" }), h("stop", { offset: "1", "stop-color": "#000000", "stop-opacity": "1" })), h("linearGradient", { id: "colorSliderGradient", x2: "0", y2: "1" }, h("stop", { offset: "0", "stop-color": "hsl(0,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.06", "stop-color": "hsl(20,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.11", "stop-color": "hsl(40,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.17", "stop-color": "hsl(60,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.22", "stop-color": "hsl(80,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.28", "stop-color": "hsl(100,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.33", "stop-color": "hsl(120,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.39", "stop-color": "hsl(140,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.44", "stop-color": "hsl(160,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.50", "stop-color": "hsl(180,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.56", "stop-color": "hsl(200,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.61", "stop-color": "hsl(220,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.67", "stop-color": "hsl(240,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.72", "stop-color": "hsl(260,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.78", "stop-color": "hsl(280,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.83", "stop-color": "hsl(300,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.89", "stop-color": "hsl(320,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "0.94", "stop-color": "hsl(340,100%,50%", "stop-opacity": "1" }), h("stop", { offset: "1.00", "stop-color": "hsl(360,100%,50%", "stop-opacity": "1" })), h("linearGradient", { id: "opacitySliderGradient", x2: "0", y2: "1" }, h("stop", { offset: "0", "stop-color": this._stateProperties.color.hex.hex, "stop-opacity": "1" }), h("stop", { offset: "1", "stop-color": this._stateProperties.color.hex.hex, "stop-opacity": "0" }))), h("rect", { id: "cpickerBackground", width: "100%", height: "100%" }), !this.hideheader
            ?
                h("g", { id: "cpickerHeader" }, h("rect", { id: "cpickerWhite", x: "0", y: "0", width: this._stateProperties.header.width.toFixed(3), height: this._stateProperties.header.height.toFixed(3) }), h("rect", { id: "cpickerTransparency", x: "0", y: "0", width: this._stateProperties.header.width.toFixed(3), height: this._stateProperties.header.height.toFixed(3), fill: this._stateProperties.fill.transparency }), h("rect", { id: "cpickerSelColor", x: "0", y: "0", width: this._stateProperties.header.width.toFixed(3), height: this._stateProperties.header.height.toFixed(3), fill: this._stateProperties.color.hex.hex, "fill-opacity": this._stateProperties.opacity }), h("rect", { id: "cpickerHueColor", x: this._stateProperties.header.width.toFixed(3), y: "0", width: this._stateProperties.header.width1.toFixed(3), height: this._stateProperties.header.height.toFixed(3), fill: this._stateProperties.hue }), h("text", { id: "cpickerText", "text-anchor": "middle", x: this._stateProperties.header.xtext.toFixed(3), y: "8.5%", "font-family": "Verdana", "font-size": (2.6 * this._stateProperties.vmin).toFixed(3), "font-weight": "bold", fill: this._stateProperties.colorText }, this._stateProperties.colorHeadline))
            : null, h("g", { id: "cpickerSBColor" }, h("rect", { id: "cpickerPickColor", x: "3%", y: this._stateProperties.colorArea.y.toFixed(3), width: this._stateProperties.colorArea.widthSB.toFixed(3), height: this._stateProperties.colorArea.height.toFixed(3), fill: this._stateProperties.hue }), h("rect", { id: "cpickerGradientS", x: "3%", y: this._stateProperties.colorArea.y.toFixed(3), width: this._stateProperties.colorArea.widthSB.toFixed(3), height: this._stateProperties.colorArea.height.toFixed(3), rx: "2", ry: "2", fill: this._stateProperties.fill.hue }), h("rect", { id: "cpickerGradientB", x: "3%", y: this._stateProperties.colorArea.y.toFixed(3), width: this._stateProperties.colorArea.widthSB.toFixed(3), height: this._stateProperties.colorArea.height.toFixed(3), rx: "2", ry: "2", fill: this._stateProperties.fill.brightness }), h("circle", { id: "cpickerHandler", r: "1.5%", cx: this._stateProperties.pickerHandler.x.toFixed(3), cy: this._stateProperties.pickerHandler.y.toFixed(3), fill: "none", stroke: this._stateProperties.colorText, "stroke-width": "2" })), !this.hideopacity
            ? h("g", { id: "cpickerOpacity" }, h("rect", { id: "cpickerSliderWhite", x: "72%", y: this._stateProperties.colorArea.y.toFixed(3), width: "11%", height: this._stateProperties.colorArea.height.toFixed(3) }), h("rect", { id: "cpickerTransparencySlider", x: "72%", y: this._stateProperties.colorArea.y.toFixed(3), width: "11%", height: this._stateProperties.colorArea.height.toFixed(3), fill: this._stateProperties.fill.transparency }), h("rect", { id: "cpickerSliderOpacity", x: "72%", y: this._stateProperties.colorArea.y.toFixed(3), width: "11%", height: this._stateProperties.colorArea.height.toFixed(3), fill: this._stateProperties.fill.opacity }), h("rect", { id: "cpickerOpaSliderHandler", x: "71.8%", y: this._stateProperties.opaHandlerY.toFixed(3), width: "11.4%", height: "1.2%", fill: "none", stroke: this._stateProperties.colorHandle, "stroke-width": "2" }))
            : null, h("g", { id: "cpickerHueColor" }, h("rect", { id: "cpickerSliderHueColor", x: "86%", y: this._stateProperties.colorArea.y.toFixed(3), width: "11%", height: this._stateProperties.colorArea.height.toFixed(3), fill: this._stateProperties.fill.color }), h("rect", { id: "cpickerColSliderHandler", x: "85.8%", y: this._stateProperties.hueHandlerY.toFixed(3), width: "11.4%", height: "1.2%", fill: "none", stroke: this._stateProperties.colorHandle, "stroke-width": "2" })), !this.hidebuttons
            ? h("g", { id: "cpickerFooter" }, h("rect", { id: "cpickerOkay", x: this._stateProperties.buttonArea.x.toFixed(3), y: "85%", width: this._stateProperties.buttonArea.width.toFixed(3), height: this._stateProperties.buttonArea.height.toFixed(3), fill: "none", stroke: this._stateProperties.colorHandle, "stroke-width": "2" }), h("rect", { id: "cpickerCancel", x: "53%", y: "85%", width: this._stateProperties.buttonArea.width.toFixed(3), height: this._stateProperties.buttonArea.height.toFixed(3), fill: "none", stroke: this._stateProperties.colorHandle, "stroke-width": "2" }), h("text", { id: "cpickerOkayText", "text-anchor": "middle", x: this._stateProperties.buttonArea.xText1.toFixed(3), y: "93%", "font-family": "Verdana", "font-size": (3.5 * this._stateProperties.vmin).toFixed(3), fill: this._stateProperties.buttonArea.colorText1 }, this.innerButtons[0]), h("text", { id: "cpickerCancelText", "text-anchor": "middle", x: this._stateProperties.buttonArea.xText2.toFixed(3), y: "93%", "font-family": "Verdana", "font-size": (3.5 * this._stateProperties.vmin).toFixed(3), fill: this._stateProperties.buttonArea.colorText2 }, this.innerButtons[1]))
            : null)))));
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
        get: function () { return ":host{--cpicker-top:10vh;--cpicker-left:10vw;--cpicker-width:70vmin;--cpicker-height:50vmin;--cpicker-background-color:#242424}.cpicker-container{position:absolute;top:0;bottom:0;right:0;left:0;overflow:hidden}.cpicker-wrapper{margin:0;padding:0;position:relative;z-index:1000}#cpickerBackground{fill:var(--cpicker-background-color)}#cpickerSliderWhite,#cpickerWhite{fill:#ddd;fill-opacity:.4}.pattern-cube{fill:#022460;fill-opacity:.4}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { JeepCpicker as jeep_cpicker };
