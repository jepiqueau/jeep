'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-0c8b2391.js');
const common = require('./common-dae654dd.js');

// Color utility functions
const initSelectedColor = (currentColor, currentOpacity) => {
    let color = {};
    color.hex = hextoHEX(currentColor, currentOpacity);
    color.rgb = hextoRGB(currentColor, currentOpacity);
    color.hsb = hextoHSB(currentColor, currentOpacity);
    color.hsl = hextoHSL(currentColor, currentOpacity);
    color.opacity = Number(parseFloat(currentOpacity).toFixed(3));
    return color;
};
const hextoHEX = (hex, opacity) => {
    let opa = parseFloat(opacity) <= 1 ? parseFloat(opacity) : 1;
    let ret = {};
    ret.hex = hex;
    let n = Math.round(opa * 255);
    let b = n.toString(16);
    b = b.length === 1 ? `0${b}` : b;
    ret.hexa = hex + b;
    return ret;
};
const hextoRGB = (hex, opacity) => {
    let opa = parseFloat(opacity) <= 1 ? parseFloat(opacity) : 1;
    let hex1 = hex.replace(/#/, "");
    let ret = {};
    let bigint = parseInt(hex1, 16);
    ret.r = (bigint >> 16) & 255;
    ret.g = (bigint >> 8) & 255;
    ret.b = bigint & 255;
    ret.rgb = "RGB(" + ret.r + "," + ret.g + "," + ret.b + ")";
    ret.rgba = "RGBA(" + ret.r + "," + ret.g + "," + ret.b + "," + opa.toFixed(3) + ")";
    return ret;
};
const hextoHSB = (hex, opacity) => {
    let opa = parseFloat(opacity) <= 1 ? parseFloat(opacity) : 1;
    let ret = {};
    const rgb = hextoRGB(hex, opa.toString());
    const min = Math.min(rgb.r, rgb.g, rgb.b);
    const max = Math.max(rgb.r, rgb.g, rgb.b);
    const d = max - min;
    const s = max == 0 ? 0 : d / max;
    const b = max / 255;
    let h;
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
const hextoHSL = (hex, opacity) => {
    let opa = parseFloat(opacity) <= 1 ? parseFloat(opacity) : 1;
    const rgb = hextoRGB(hex, opa.toString());
    let ret = RGBtoHSL(rgb);
    return ret;
};
const RGBtoHSL = (rgb) => {
    const opa = opacityfromRGB(rgb);
    let ret = {};
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    let h = (max + min) / 2;
    let s = h;
    let l = h;
    if (max == min) {
        h = s = 0; //achromatic
    }
    else {
        const d = max - min;
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
const HSBtoRGB = (hsb) => {
    let ret = {};
    const opa = opacityfromHSB(hsb);
    const h = hsb.h / 360;
    const i = Math.floor(h * 6);
    const values = (() => {
        const [s, b] = [hsb.s, hsb.b].map(val => Number(val) / 100);
        const f = h * 6 - i;
        const p = b * (1 - s);
        const q = b * (1 - f * s);
        const t = b * (1 - (1 - f) * s);
        return {
            0: [b, t, p],
            1: [q, b, p],
            2: [p, b, t],
            3: [p, q, b],
            4: [t, p, b],
            5: [b, p, q]
        };
    })();
    const [r, g, b] = values[i % 6].map(val => Math.round(val * 255));
    ret.r = r;
    ret.g = g;
    ret.b = b;
    ret.rgb = "RGB(" + ret.r + "," + ret.g + "," + ret.b + ")";
    ret.rgba = "RGBA(" + ret.r + "," + ret.g + "," + ret.b + "," + opa.toFixed(3) + ")";
    return ret;
};
const RGBtoHEX = (rgb) => {
    let val = rgb.rgba.split('(')[1].slice(0, -1).split(',');
    let hex = "#";
    val.forEach((item, index) => {
        if (index === 3) {
            let a = (Math.round(parseFloat(item) * 255)).toString(16);
            if (a.length < 2)
                a = `0${a}`;
            hex += a;
        }
        else {
            let a = (parseFloat(item)).toString(16);
            if (a.length < 2)
                a = `0${a}`;
            hex += a;
        }
    });
    let ret = {};
    ret.hex = hex.slice(0, -2);
    ret.hexa = hex;
    return ret;
};
const HSBtoHEX = (hsb) => {
    let rgb = HSBtoRGB(hsb);
    return RGBtoHEX(rgb);
};
const HSLtoHEX = (hsl) => {
    let rgb = HSLtoRGB(hsl);
    return RGBtoHEX(rgb);
};
const HSLtoRGB = (hsl) => {
    let ret = {};
    const opa = opacityfromHSL(hsl);
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;
    if (s === 0) {
        ret.r = ret.g = ret.b = l; // achromatic
    }
    else {
        const hue2rgb = (p, q, t) => {
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
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        ret.r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
        ret.g = Math.round(hue2rgb(p, q, h) * 255);
        ret.b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
    }
    ret.rgb = "RGB(" + ret.r + "," + ret.g + "," + ret.b + ")";
    ret.rgba = "RGBA(" + ret.r + "," + ret.g + "," + ret.b + "," + opa.toFixed(3) + ")";
    return ret;
};
const HcolortoHEX = (hsb) => {
    // clone hsb
    let ret = Object.assign({}, hsb);
    let opa = opacityfromHSB(ret);
    ret.s = 100;
    ret.b = 100;
    ret.hsb = "HSB(" + ret.h.toFixed(0) + "," + ret.s.toFixed(0) + "%," + ret.b.toFixed(0) + "%)";
    ret.hsba = "HSBA(" + ret.h.toFixed(0) + "," + ret.s.toFixed(0) + "%," + ret.b.toFixed(0) + "%," + opa.toFixed(3) + ")";
    return HSBtoHEX(ret);
};
const opacityfromRGB = (rgb) => {
    return parseFloat(rgb.rgba.split(',')[3].slice(0, -1));
};
const opacityfromHEX = (hex) => {
    return parseInt(hex.hexa.slice(hex.hexa.length - 2, hex.hexa.length), 16) / 255;
};
const opacityfromHSB = (hsb) => {
    return parseFloat(hsb.hsba.split(',')[3].slice(0, -1));
};
const opacityfromHSL = (hsl) => {
    return parseFloat(hsl.hsla.split(',')[3].slice(0, -1));
};
const fillColor = (value) => {
    let color = {};
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

const JeepCpicker = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
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
        this.onOpen = core.createEvent(this, "jeepCpickerOpen", 7);
        this.onClose = core.createEvent(this, "jeepCpickerClose", 7);
        this.onInstantColor = core.createEvent(this, "jeepCpickerInstantColor", 7);
    }
    //*****************************
    //* Watch on Property Changes *
    //*****************************
    async parseColorProp(newValue) {
        this.innerColor = newValue ? newValue : "#ff0000";
        this._stateProperties.hsb = hextoHSB(this.innerColor, this.innerOpacity ? this.innerOpacity.toFixed(3) : "1.000");
        if (this._stateProperties.init)
            await this._setSelected(this.innerColor, this.innerOpacity ? this.innerOpacity : 1);
    }
    async parseOpacityProp(newValue) {
        this.innerOpacity = newValue && !this.innerHideOpacity ? Number(newValue) : 1;
        this._stateProperties.hsb = hextoHSB(this.innerColor ? this.innerColor : '#ff0000', this.innerOpacity.toFixed(3));
        if (this._stateProperties.init)
            await this._setSelected(this.innerColor ? this.innerColor : '#ff0000', this.innerOpacity);
    }
    async parseButtonsProp(newValue) {
        if (this.innerHideButtons) {
            this.innerButtons = [];
        }
        else {
            this.innerButtons = newValue ? newValue.substr(1).slice(0, -1).split(',') : ["Okay", "Cancel"];
        }
        if (this._stateProperties.init)
            await this._setSelected(this.innerColor, this.innerOpacity);
    }
    async parseHideButtonsProp(newValue) {
        this.innerHideButtons = newValue ? newValue : false;
        if (this._stateProperties.init)
            await this._setSelected(this.innerColor, this.innerOpacity);
    }
    async parseHideHeaderProp(newValue) {
        this.innerHideHeader = newValue ? newValue : false;
        if (this._stateProperties.init)
            await this._setSelected(this.innerColor, this.innerOpacity);
    }
    async parseHideOpacityProp(newValue) {
        this.innerHideOpacity = newValue ? newValue : false;
        if (this._stateProperties.init)
            await this._setSelected(this.innerColor, this.innerOpacity);
    }
    //*******************************
    //* Listen to Event Definitions *
    //*******************************
    async handleWindowResize() {
        await this._windowResize();
    }
    //**********************
    //* Method Definitions *
    //**********************
    /**
     * Method initialize
     */
    async init() {
        return await this._init();
    }
    /**
     * Method get StateProperties
     */
    async getStateProperties() {
        return this._stateProperties;
    }
    /**
     * Method get local wrapper css variables
     */
    async getWrapperCssVariables() {
        return this._wrapCss;
    }
    /**
     * Method get the vertical position for the hue slider handler
     */
    async calcH(y, height) {
        return Promise.resolve(this._calcH(y, height));
    }
    /**
     * Method get the horizontal position for the saturation slider handler
     */
    async calcS(x, width) {
        return Promise.resolve(this._calcS(x, width));
    }
    /**
     * Method get the vertical position for the brightness slider handler
     */
    async calcB(y, height) {
        return Promise.resolve(this._calcB(y, height));
    }
    /**
     * Method get the vertical position for the opacity slider handler
     */
    async calcO(y, height) {
        return Promise.resolve(this._calcO(y, height));
    }
    //*******************************
    //* Component Lifecycle Methods *
    //*******************************
    async componentWillLoad() {
        await this.init();
    }
    async componentDidLoad() {
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
        await this._setBoundingBoxes();
        this.onOpen.emit();
    }
    async componentDidUpdate() {
        if (this._resize) {
            await this._setBoundingBoxes();
            this._resize = false;
        }
    }
    //******************************
    //* Private Method Definitions *
    //******************************
    async _init() {
        this.parseColorProp(this.color ? this.color : "#ff0000");
        this.parseHideOpacityProp(this.hideopacity ? this.hideopacity : false);
        this.parseOpacityProp(this.opacity ? this.opacity : "1");
        this.parseHideButtonsProp(this.hidebuttons ? this.hidebuttons : false);
        this.parseButtonsProp(this.buttons ? this.buttons : '[Okay,Cancel]');
        this.parseHideHeaderProp(this.hideheader ? this.hideheader : false);
        this.innerOpacity = this.innerHideOpacity ? 1 : this.innerOpacity;
        this._bboxes = {};
        this._oriColor = initSelectedColor(this.innerColor ? this.innerColor : '#ff0000', this.innerOpacity ? this.innerOpacity.toFixed(3) : "1");
        await this._setCssVariable();
        await this._setSelected(this.innerColor ? this.innerColor : '#ff0000', this.innerOpacity ? this.innerOpacity : 1);
        return;
    }
    async _setCssVariable() {
        this._wrapCss.backColor = common.cssVar(this.el, '--cpicker-background-color');
        this._wrapCss.backColor = this._wrapCss.backColor ? this._wrapCss.backColor : common.cssVar(this.el, '--cpicker-background-color', '#242424');
        this._wrapCss.top = common.cssVar(this.el, '--cpicker-top').replace(/  +/g, ' ');
        this._wrapCss.top = this._wrapCss.top ? this._wrapCss.top : common.cssVar(this.el, '--cpicker-top', '10vh');
        this._wrapCss.left = common.cssVar(this.el, '--cpicker-left').replace(/  +/g, ' ');
        this._wrapCss.left = this._wrapCss.left ? this._wrapCss.left : common.cssVar(this.el, '--cpicker-left', '10vw');
        this._wrapCss.width = common.cssVar(this.el, '--cpicker-width').replace(/  +/g, ' ');
        this._wrapCss.width = this._wrapCss.width ? this._wrapCss.width : common.cssVar(this.el, '--cpicker-width', '70vmin');
        this._wrapCss.height = common.cssVar(this.el, '--cpicker-height').replace(/  +/g, ' ');
        this._wrapCss.height = this._wrapCss.height ? this._wrapCss.height : common.cssVar(this.el, '--cpicker-height', '50vmin');
    }
    async _setSelected(color, opacity) {
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
        this._stateProperties.wrapperTop = await common.getValueFromCss(this._wrapCss.top, "y");
        this._stateProperties.wrapperLeft = await common.getValueFromCss(this._wrapCss.left, "x");
        this._stateProperties.wrapperWidth = await common.getValueFromCss(this._wrapCss.width, "x");
        this._stateProperties.wrapperHeight = await common.getValueFromCss(this._wrapCss.height, "y");
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
        this._stateProperties.fill.color = `url(${window.location.href}#colorSliderGradient)`;
        this._stateProperties.fill.brightness = `url(${window.location.href}#cpickerBrightness)`;
        this._stateProperties.fill.hue = `url(${window.location.href}#cpickerHue)`;
        this._stateProperties.fill.opacity = `url(${window.location.href}#opacitySliderGradient)`;
        this._stateProperties.fill.transparency = `url(${window.location.href}#pattern-transparency)`;
    }
    async _setBoundingBoxes() {
        this._bboxes.wrapper = this._wrapperEl.getBoundingClientRect();
        this._bboxes.headline = this._headlineEl ? this._headlineEl.getBoundingClientRect() : null;
        this._bboxes.color = this._pickEl.getBoundingClientRect();
        this._bboxes.hue = this._pickHueEl.getBoundingClientRect();
        this._bboxes.opacity = this._pickOpaEl ? this._pickOpaEl.getBoundingClientRect() : null;
        this._bboxes.ok = this._okEl ? this._okEl.getBoundingClientRect() : null;
        this._bboxes.cancel = this._cancelEl ? this._cancelEl.getBoundingClientRect() : null;
    }
    async _windowResize() {
        this._resize = true;
        this._onElement = null;
        await this._setSelected(this._stateProperties.color.hex.hex, Number(this._stateProperties.opacity));
        this.toggleDisplay = !this.toggleDisplay;
        return;
    }
    _setTextColor(hsb, t) {
        // define the color of the header text, the buttons text
        // and the slider handlers 
        // as a function of the hsb selected color and the background color
        let type = t ? t : 'col';
        let opa = opacityfromHSB(hsb);
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
    }
    async _toggleTextType() {
        // allow to toggle the Color Text in the Header with touchstart or mouse events
        // toggle HEX to RGB to HSL to HSB to HEX
        let idx = this._textType.indexOf(this._stateProperties.textType);
        idx++;
        if (idx > 3)
            idx = 0;
        this._stateProperties.textType = this._textType[idx];
        this._stateProperties.colorHeadline = this._stateProperties.color[this._stateProperties.textType][this._stateProperties.textType + 'a'];
        this.toggleDisplay = !this.toggleDisplay;
        return;
    }
    _okColorPickerHandler() {
        this.onClose.emit({ color: this._stateProperties.color, button: 1 });
        return;
    }
    _cancelColorPickerHandler() {
        this.onClose.emit({ color: this._oriColor, button: 2 });
        return;
    }
    async _pickColor(pt) {
        if (pt.x <= this._bboxes.color.right && pt.x >= this._bboxes.color.left &&
            pt.y <= this._bboxes.color.bottom && pt.y >= this._bboxes.color.top) {
            const pos = this._getPickCoordinates(this._bboxes.color, pt);
            return await this._updateStateProperties(this._stateProperties.hsb.h, await this.calcS(pos.x, pos.width), await this.calcB(pos.y, pos.height), opacityfromHSB(this._stateProperties.hsb));
        }
    }
    async _pickHue(pt) {
        if (pt.x <= this._bboxes.hue.right && pt.x >= this._bboxes.hue.left &&
            pt.y <= this._bboxes.hue.bottom && pt.y >= this._bboxes.hue.top) {
            const pos = this._getPickCoordinates(this._bboxes.hue, pt);
            return await this._updateStateProperties(await this.calcH(pos.y, pos.height), this._stateProperties.hsb.s, this._stateProperties.hsb.b, opacityfromHSB(this._stateProperties.hsb));
        }
    }
    async _pickOpacity(pt) {
        // Calculate the opacity from the touch/mouse event
        if (pt.x <= this._bboxes.opacity.right && pt.x >= this._bboxes.opacity.left &&
            pt.y <= this._bboxes.opacity.bottom && pt.y >= this._bboxes.opacity.top) {
            const pos = this._getPickCoordinates(this._bboxes.opacity, pt);
            return await this._updateStateProperties(this._stateProperties.hsb.h, this._stateProperties.hsb.s, this._stateProperties.hsb.b, await this.calcO(pos.y, pos.height));
        }
    }
    _getPickCoordinates(rect, pt) {
        // return the event coordinates transformed in the target object coordinate system
        let rect1 = {};
        rect1.x = pt.x - rect.x;
        rect1.y = pt.y - rect.y;
        rect1.width = rect.width;
        rect1.height = rect.height;
        return rect1;
    }
    async _updateStateProperties(h, s, b, opa) {
        // Update the State variables to generate a new rendering of the component
        let color = {};
        color.s = Number(s.toFixed(0));
        color.b = Number(b.toFixed(0));
        color.h = Number(h.toFixed(0));
        color.hsb = "HSB(" + color.h.toFixed(0) + "," + color.s.toFixed(0) + "%," + color.b.toFixed(0) + "%)";
        color.hsba = "HSBA(" + color.h.toFixed(0) + "," + color.s.toFixed(0) + "%," + color.b.toFixed(0) + "%," + opa.toFixed(3) + ")";
        this._stateProperties.hsb = color;
        await this._setSelected(fillColor(color).hex.hex, opa);
        this.toggleDisplay = !this.toggleDisplay;
        return;
    }
    _calcH(y, height) {
        // return the vertical position for the hue slider handler
        let ret;
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
    }
    _calcS(x, width) {
        // return the horizontal position for the saturation slider handler
        let ret;
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
    }
    _calcB(y, height) {
        // return the vertical position for the brightness slider handler
        let ret;
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
    }
    _calcO(y, height) {
        // return the vertical position for the opacity slider handler
        let ret;
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
    }
    async _selectAction(elem, pt) {
        switch (elem) {
            case "cpickerSelColor":
            case "cpickerText": {
                if (!this._mouseStart)
                    await this._toggleTextType();
                break;
            }
            case "cpickerGradientB": {
                await this._pickColor(pt);
                this.onInstantColor.emit(this._stateProperties.color);
                break;
            }
            case "cpickerSliderHueColor":
            case "cpickerColSliderHandler": {
                await this._pickHue(pt);
                this.onInstantColor.emit(this._stateProperties.color);
                break;
            }
            case "cpickerSliderOpacity":
            case "cpickerOpaSliderHandler": {
                await this._pickOpacity(pt);
                this.onInstantColor.emit(this._stateProperties.color);
                break;
            }
            case "cpickerOkay":
            case "cpickerOkayText": {
                this._okColorPickerHandler();
                break;
            }
            case "cpickerCancel":
            case "cpickerCancelText": {
                this._cancelColorPickerHandler();
                break;
            }
            default:
        }
        return;
    }
    _getOnElement(pt) {
        let id;
        const hueHandler = this._pickHueSliderHandleEl.getBoundingClientRect();
        const opaHandler = this._pickOpaSliderHandleEl ? this._pickOpaSliderHandleEl.getBoundingClientRect() : null;
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
    }
    _movePoint(id, pt) {
        // If there's a timer, cancel it
        if (this._timeout) {
            window.cancelAnimationFrame(this._timeout);
        }
        // Setup the new requestAnimationFrame()
        this._timeout = window.requestAnimationFrame(async () => {
            // Run our window resize functions
            await this._selectAction(id, pt);
        });
    }
    //************************
    //* Mouse / Touch Events *
    //************************
    async _handleMouseDown(ev) {
        ev.preventDefault();
        const pt = { x: ev.pageX, y: ev.pageY };
        this._onElement = this._getOnElement(pt);
        if (this._onElement != null) {
            await this._selectAction(this._onElement, pt);
            this._mouseStart = true;
        }
        return;
    }
    async _handleMouseMove(ev) {
        ev.preventDefault();
        if (this._mouseStart) {
            const pt = { x: ev.pageX, y: ev.pageY };
            if (this._onElement != null &&
                (this._onElement === 'cpickerGradientB' || this._onElement === 'cpickerSliderHueColor' || this._onElement === 'cpickerSliderOpacity')) {
                this._movePoint(this._onElement, pt);
            }
        }
        return;
    }
    async _handleMouseEnd(ev) {
        ev.preventDefault();
        if (this._mouseStart) {
            if (this.hidebuttons && this._onElement === 'cpicker-wrapper')
                this._okColorPickerHandler();
            this._mouseStart = false;
            this._onElement = null;
        }
        return;
    }
    async _handleTouchStart(ev) {
        ev.preventDefault();
        const pt = { x: ev.touches[0].pageX, y: ev.touches[0].pageY };
        this._onElement = this._getOnElement(pt);
        if (this._onElement != null) {
            await this._selectAction(this._onElement, pt);
        }
        return;
    }
    async _handleTouchMove(ev) {
        ev.preventDefault();
        const pt = { x: ev.touches[0].pageX, y: ev.touches[0].pageY };
        if (this._onElement != null &&
            (this._onElement === 'cpickerGradientB' || this._onElement === 'cpickerSliderHueColor' || this._onElement === 'cpickerSliderOpacity')) {
            this._movePoint(this._onElement, pt);
        }
        return;
    }
    async _handleTouchEnd(ev) {
        ev.preventDefault();
        if (this.hidebuttons && this._onElement === 'cpicker-wrapper')
            this._okColorPickerHandler();
        this._onElement = null;
        return;
    }
    //*************************
    //* Rendering JSX Element *
    //*************************
    render() {
        // required as css viewport does'nt work on safari
        const styleWrapper = {
            top: `${this._stateProperties.wrapperTop}px`,
            left: `${this._stateProperties.wrapperLeft}px`,
            width: `${this._stateProperties.wrapperWidth}px`,
            height: `${this._stateProperties.wrapperHeight}px`
        };
        //
        return (core.h(core.Host, null, core.h("div", { class: "cpicker-container" }, core.h("div", { class: "cpicker-wrapper", style: styleWrapper, onMouseDown: (event) => this._handleMouseDown(event), onMouseMove: (event) => this._handleMouseMove(event), onMouseUp: (event) => this._handleMouseEnd(event), onTouchStart: (event) => this._handleTouchStart(event), onTouchMove: (event) => this._handleTouchMove(event), onTouchEnd: (event) => this._handleTouchEnd(event) }, core.h("svg", { width: "100%", height: "100%" }, core.h("defs", null, core.h("pattern", { id: "pattern-transparency", x: "0", y: "0", width: (2.4 * this._stateProperties.vmin).toString(), height: (2.4 * this._stateProperties.vmin).toString(), patternUnits: "userSpaceOnUse" }, core.h("rect", { class: "pattern-cube", x: "0", width: (1.2 * this._stateProperties.vmin).toString(), height: (1.2 * this._stateProperties.vmin).toString(), y: "0" }), core.h("rect", { class: "pattern-cube", x: (1.2 * this._stateProperties.vmin).toString(), width: (1.2 * this._stateProperties.vmin).toString(), height: (1.2 * this._stateProperties.vmin).toString(), y: (1.2 * this._stateProperties.vmin).toString() })), core.h("linearGradient", { id: "cpickerHue" }, core.h("stop", { offset: "0", "stop-color": "#ffffff", "stop-opacity": "1" }), core.h("stop", { offset: "1", "stop-color": "#ffffff", "stop-opacity": "0" })), core.h("linearGradient", { id: "cpickerBrightness", x2: "0", y2: "1" }, core.h("stop", { offset: "0", "stop-color": "#000000", "stop-opacity": "0" }), core.h("stop", { offset: "1", "stop-color": "#000000", "stop-opacity": "1" })), core.h("linearGradient", { id: "colorSliderGradient", x2: "0", y2: "1" }, core.h("stop", { offset: "0", "stop-color": "hsl(0,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.06", "stop-color": "hsl(20,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.11", "stop-color": "hsl(40,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.17", "stop-color": "hsl(60,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.22", "stop-color": "hsl(80,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.28", "stop-color": "hsl(100,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.33", "stop-color": "hsl(120,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.39", "stop-color": "hsl(140,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.44", "stop-color": "hsl(160,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.50", "stop-color": "hsl(180,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.56", "stop-color": "hsl(200,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.61", "stop-color": "hsl(220,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.67", "stop-color": "hsl(240,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.72", "stop-color": "hsl(260,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.78", "stop-color": "hsl(280,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.83", "stop-color": "hsl(300,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.89", "stop-color": "hsl(320,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "0.94", "stop-color": "hsl(340,100%,50%", "stop-opacity": "1" }), core.h("stop", { offset: "1.00", "stop-color": "hsl(360,100%,50%", "stop-opacity": "1" })), core.h("linearGradient", { id: "opacitySliderGradient", x2: "0", y2: "1" }, core.h("stop", { offset: "0", "stop-color": this._stateProperties.color.hex.hex, "stop-opacity": "1" }), core.h("stop", { offset: "1", "stop-color": this._stateProperties.color.hex.hex, "stop-opacity": "0" }))), core.h("rect", { id: "cpickerBackground", width: "100%", height: "100%" }), !this.hideheader
            ?
                core.h("g", { id: "cpickerHeader" }, core.h("rect", { id: "cpickerWhite", x: "0", y: "0", width: this._stateProperties.header.width.toFixed(3), height: this._stateProperties.header.height.toFixed(3) }), core.h("rect", { id: "cpickerTransparency", x: "0", y: "0", width: this._stateProperties.header.width.toFixed(3), height: this._stateProperties.header.height.toFixed(3), fill: this._stateProperties.fill.transparency }), core.h("rect", { id: "cpickerSelColor", x: "0", y: "0", width: this._stateProperties.header.width.toFixed(3), height: this._stateProperties.header.height.toFixed(3), fill: this._stateProperties.color.hex.hex, "fill-opacity": this._stateProperties.opacity }), core.h("rect", { id: "cpickerHueColor", x: this._stateProperties.header.width.toFixed(3), y: "0", width: this._stateProperties.header.width1.toFixed(3), height: this._stateProperties.header.height.toFixed(3), fill: this._stateProperties.hue }), core.h("text", { id: "cpickerText", "text-anchor": "middle", x: this._stateProperties.header.xtext.toFixed(3), y: "8.5%", "font-family": "Verdana", "font-size": (2.6 * this._stateProperties.vmin).toFixed(3), "font-weight": "bold", fill: this._stateProperties.colorText }, this._stateProperties.colorHeadline))
            : null, core.h("g", { id: "cpickerSBColor" }, core.h("rect", { id: "cpickerPickColor", x: "3%", y: this._stateProperties.colorArea.y.toFixed(3), width: this._stateProperties.colorArea.widthSB.toFixed(3), height: this._stateProperties.colorArea.height.toFixed(3), fill: this._stateProperties.hue }), core.h("rect", { id: "cpickerGradientS", x: "3%", y: this._stateProperties.colorArea.y.toFixed(3), width: this._stateProperties.colorArea.widthSB.toFixed(3), height: this._stateProperties.colorArea.height.toFixed(3), rx: "2", ry: "2", fill: this._stateProperties.fill.hue }), core.h("rect", { id: "cpickerGradientB", x: "3%", y: this._stateProperties.colorArea.y.toFixed(3), width: this._stateProperties.colorArea.widthSB.toFixed(3), height: this._stateProperties.colorArea.height.toFixed(3), rx: "2", ry: "2", fill: this._stateProperties.fill.brightness }), core.h("circle", { id: "cpickerHandler", r: "1.5%", cx: this._stateProperties.pickerHandler.x.toFixed(3), cy: this._stateProperties.pickerHandler.y.toFixed(3), fill: "none", stroke: this._stateProperties.colorText, "stroke-width": "2" })), !this.hideopacity
            ? core.h("g", { id: "cpickerOpacity" }, core.h("rect", { id: "cpickerSliderWhite", x: "72%", y: this._stateProperties.colorArea.y.toFixed(3), width: "11%", height: this._stateProperties.colorArea.height.toFixed(3) }), core.h("rect", { id: "cpickerTransparencySlider", x: "72%", y: this._stateProperties.colorArea.y.toFixed(3), width: "11%", height: this._stateProperties.colorArea.height.toFixed(3), fill: this._stateProperties.fill.transparency }), core.h("rect", { id: "cpickerSliderOpacity", x: "72%", y: this._stateProperties.colorArea.y.toFixed(3), width: "11%", height: this._stateProperties.colorArea.height.toFixed(3), fill: this._stateProperties.fill.opacity }), core.h("rect", { id: "cpickerOpaSliderHandler", x: "71.8%", y: this._stateProperties.opaHandlerY.toFixed(3), width: "11.4%", height: "1.2%", fill: "none", stroke: this._stateProperties.colorHandle, "stroke-width": "2" }))
            : null, core.h("g", { id: "cpickerHueColor" }, core.h("rect", { id: "cpickerSliderHueColor", x: "86%", y: this._stateProperties.colorArea.y.toFixed(3), width: "11%", height: this._stateProperties.colorArea.height.toFixed(3), fill: this._stateProperties.fill.color }), core.h("rect", { id: "cpickerColSliderHandler", x: "85.8%", y: this._stateProperties.hueHandlerY.toFixed(3), width: "11.4%", height: "1.2%", fill: "none", stroke: this._stateProperties.colorHandle, "stroke-width": "2" })), !this.hidebuttons
            ? core.h("g", { id: "cpickerFooter" }, core.h("rect", { id: "cpickerOkay", x: this._stateProperties.buttonArea.x.toFixed(3), y: "85%", width: this._stateProperties.buttonArea.width.toFixed(3), height: this._stateProperties.buttonArea.height.toFixed(3), fill: "none", stroke: this._stateProperties.colorHandle, "stroke-width": "2" }), core.h("rect", { id: "cpickerCancel", x: "53%", y: "85%", width: this._stateProperties.buttonArea.width.toFixed(3), height: this._stateProperties.buttonArea.height.toFixed(3), fill: "none", stroke: this._stateProperties.colorHandle, "stroke-width": "2" }), core.h("text", { id: "cpickerOkayText", "text-anchor": "middle", x: this._stateProperties.buttonArea.xText1.toFixed(3), y: "93%", "font-family": "Verdana", "font-size": (3.5 * this._stateProperties.vmin).toFixed(3), fill: this._stateProperties.buttonArea.colorText1 }, this.innerButtons[0]), core.h("text", { id: "cpickerCancelText", "text-anchor": "middle", x: this._stateProperties.buttonArea.xText2.toFixed(3), y: "93%", "font-family": "Verdana", "font-size": (3.5 * this._stateProperties.vmin).toFixed(3), fill: this._stateProperties.buttonArea.colorText2 }, this.innerButtons[1]))
            : null)))));
    }
    get el() { return core.getElement(this); }
    static get watchers() { return {
        "color": ["parseColorProp"],
        "opacity": ["parseOpacityProp"],
        "buttons": ["parseButtonsProp"],
        "hidebuttons": ["parseHideButtonsProp"],
        "hideheader": ["parseHideHeaderProp"],
        "hideopacity": ["parseHideOpacityProp"]
    }; }
    static get style() { return ":host{--cpicker-top:10vh;--cpicker-left:10vw;--cpicker-width:70vmin;--cpicker-height:50vmin;--cpicker-background-color:#242424}.cpicker-container{position:absolute;top:0;bottom:0;right:0;left:0;overflow:hidden}.cpicker-wrapper{margin:0;padding:0;position:relative;z-index:1000}#cpickerBackground{fill:var(--cpicker-background-color)}#cpickerSliderWhite,#cpickerWhite{fill:#ddd;fill-opacity:.4}.pattern-cube{fill:#022460;fill-opacity:.4}"; }
};

exports.jeep_cpicker = JeepCpicker;
