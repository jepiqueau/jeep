import { h, Host } from "@stencil/core";
import { hextoHSB, opacityfromHSB, initSelectedColor, fillColor, HcolortoHEX } from '../../../utils/color-converter';
import { getValueFromCss, cssVar } from '../../../utils/common';
export class JeepCpicker {
    constructor() {
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
        this._stateProperties.wrapperTop = await getValueFromCss(this._wrapCss.top, "y");
        this._stateProperties.wrapperLeft = await getValueFromCss(this._wrapCss.left, "x");
        this._stateProperties.wrapperWidth = await getValueFromCss(this._wrapCss.width, "x");
        this._stateProperties.wrapperHeight = await getValueFromCss(this._wrapCss.height, "y");
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
        return (h(Host, null,
            h("div", { class: "cpicker-container" },
                h("div", { class: "cpicker-wrapper", style: styleWrapper, onMouseDown: (event) => this._handleMouseDown(event), onMouseMove: (event) => this._handleMouseMove(event), onMouseUp: (event) => this._handleMouseEnd(event), onTouchStart: (event) => this._handleTouchStart(event), onTouchMove: (event) => this._handleTouchMove(event), onTouchEnd: (event) => this._handleTouchEnd(event) },
                    h("svg", { width: "100%", height: "100%" },
                        h("defs", null,
                            h("pattern", { id: "pattern-transparency", x: "0", y: "0", width: (2.4 * this._stateProperties.vmin).toString(), height: (2.4 * this._stateProperties.vmin).toString(), patternUnits: "userSpaceOnUse" },
                                h("rect", { class: "pattern-cube", x: "0", width: (1.2 * this._stateProperties.vmin).toString(), height: (1.2 * this._stateProperties.vmin).toString(), y: "0" }),
                                h("rect", { class: "pattern-cube", x: (1.2 * this._stateProperties.vmin).toString(), width: (1.2 * this._stateProperties.vmin).toString(), height: (1.2 * this._stateProperties.vmin).toString(), y: (1.2 * this._stateProperties.vmin).toString() })),
                            h("linearGradient", { id: "cpickerHue" },
                                h("stop", { offset: "0", "stop-color": "#ffffff", "stop-opacity": "1" }),
                                h("stop", { offset: "1", "stop-color": "#ffffff", "stop-opacity": "0" })),
                            h("linearGradient", { id: "cpickerBrightness", x2: "0", y2: "1" },
                                h("stop", { offset: "0", "stop-color": "#000000", "stop-opacity": "0" }),
                                h("stop", { offset: "1", "stop-color": "#000000", "stop-opacity": "1" })),
                            h("linearGradient", { id: "colorSliderGradient", x2: "0", y2: "1" },
                                h("stop", { offset: "0", "stop-color": "hsl(0,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.06", "stop-color": "hsl(20,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.11", "stop-color": "hsl(40,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.17", "stop-color": "hsl(60,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.22", "stop-color": "hsl(80,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.28", "stop-color": "hsl(100,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.33", "stop-color": "hsl(120,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.39", "stop-color": "hsl(140,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.44", "stop-color": "hsl(160,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.50", "stop-color": "hsl(180,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.56", "stop-color": "hsl(200,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.61", "stop-color": "hsl(220,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.67", "stop-color": "hsl(240,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.72", "stop-color": "hsl(260,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.78", "stop-color": "hsl(280,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.83", "stop-color": "hsl(300,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.89", "stop-color": "hsl(320,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "0.94", "stop-color": "hsl(340,100%,50%", "stop-opacity": "1" }),
                                h("stop", { offset: "1.00", "stop-color": "hsl(360,100%,50%", "stop-opacity": "1" })),
                            h("linearGradient", { id: "opacitySliderGradient", x2: "0", y2: "1" },
                                h("stop", { offset: "0", "stop-color": this._stateProperties.color.hex.hex, "stop-opacity": "1" }),
                                h("stop", { offset: "1", "stop-color": this._stateProperties.color.hex.hex, "stop-opacity": "0" }))),
                        h("rect", { id: "cpickerBackground", width: "100%", height: "100%" }),
                        !this.hideheader
                            ?
                                h("g", { id: "cpickerHeader" },
                                    h("rect", { id: "cpickerWhite", x: "0", y: "0", width: this._stateProperties.header.width.toFixed(3), height: this._stateProperties.header.height.toFixed(3) }),
                                    h("rect", { id: "cpickerTransparency", x: "0", y: "0", width: this._stateProperties.header.width.toFixed(3), height: this._stateProperties.header.height.toFixed(3), fill: this._stateProperties.fill.transparency }),
                                    h("rect", { id: "cpickerSelColor", x: "0", y: "0", width: this._stateProperties.header.width.toFixed(3), height: this._stateProperties.header.height.toFixed(3), fill: this._stateProperties.color.hex.hex, "fill-opacity": this._stateProperties.opacity }),
                                    h("rect", { id: "cpickerHueColor", x: this._stateProperties.header.width.toFixed(3), y: "0", width: this._stateProperties.header.width1.toFixed(3), height: this._stateProperties.header.height.toFixed(3), fill: this._stateProperties.hue }),
                                    h("text", { id: "cpickerText", "text-anchor": "middle", x: this._stateProperties.header.xtext.toFixed(3), y: "8.5%", "font-family": "Verdana", "font-size": (2.6 * this._stateProperties.vmin).toFixed(3), "font-weight": "bold", fill: this._stateProperties.colorText }, this._stateProperties.colorHeadline))
                            : null,
                        h("g", { id: "cpickerSBColor" },
                            h("rect", { id: "cpickerPickColor", x: "3%", y: this._stateProperties.colorArea.y.toFixed(3), width: this._stateProperties.colorArea.widthSB.toFixed(3), height: this._stateProperties.colorArea.height.toFixed(3), fill: this._stateProperties.hue }),
                            h("rect", { id: "cpickerGradientS", x: "3%", y: this._stateProperties.colorArea.y.toFixed(3), width: this._stateProperties.colorArea.widthSB.toFixed(3), height: this._stateProperties.colorArea.height.toFixed(3), rx: "2", ry: "2", fill: this._stateProperties.fill.hue }),
                            h("rect", { id: "cpickerGradientB", x: "3%", y: this._stateProperties.colorArea.y.toFixed(3), width: this._stateProperties.colorArea.widthSB.toFixed(3), height: this._stateProperties.colorArea.height.toFixed(3), rx: "2", ry: "2", fill: this._stateProperties.fill.brightness }),
                            h("circle", { id: "cpickerHandler", r: "1.5%", cx: this._stateProperties.pickerHandler.x.toFixed(3), cy: this._stateProperties.pickerHandler.y.toFixed(3), fill: "none", stroke: this._stateProperties.colorText, "stroke-width": "2" })),
                        !this.hideopacity
                            ? h("g", { id: "cpickerOpacity" },
                                h("rect", { id: "cpickerSliderWhite", x: "72%", y: this._stateProperties.colorArea.y.toFixed(3), width: "11%", height: this._stateProperties.colorArea.height.toFixed(3) }),
                                h("rect", { id: "cpickerTransparencySlider", x: "72%", y: this._stateProperties.colorArea.y.toFixed(3), width: "11%", height: this._stateProperties.colorArea.height.toFixed(3), fill: this._stateProperties.fill.transparency }),
                                h("rect", { id: "cpickerSliderOpacity", x: "72%", y: this._stateProperties.colorArea.y.toFixed(3), width: "11%", height: this._stateProperties.colorArea.height.toFixed(3), fill: this._stateProperties.fill.opacity }),
                                h("rect", { id: "cpickerOpaSliderHandler", x: "71.8%", y: this._stateProperties.opaHandlerY.toFixed(3), width: "11.4%", height: "1.2%", fill: "none", stroke: this._stateProperties.colorHandle, "stroke-width": "2" }))
                            : null,
                        h("g", { id: "cpickerHueColor" },
                            h("rect", { id: "cpickerSliderHueColor", x: "86%", y: this._stateProperties.colorArea.y.toFixed(3), width: "11%", height: this._stateProperties.colorArea.height.toFixed(3), fill: this._stateProperties.fill.color }),
                            h("rect", { id: "cpickerColSliderHandler", x: "85.8%", y: this._stateProperties.hueHandlerY.toFixed(3), width: "11.4%", height: "1.2%", fill: "none", stroke: this._stateProperties.colorHandle, "stroke-width": "2" })),
                        !this.hidebuttons
                            ? h("g", { id: "cpickerFooter" },
                                h("rect", { id: "cpickerOkay", x: this._stateProperties.buttonArea.x.toFixed(3), y: "85%", width: this._stateProperties.buttonArea.width.toFixed(3), height: this._stateProperties.buttonArea.height.toFixed(3), fill: "none", stroke: this._stateProperties.colorHandle, "stroke-width": "2" }),
                                h("rect", { id: "cpickerCancel", x: "53%", y: "85%", width: this._stateProperties.buttonArea.width.toFixed(3), height: this._stateProperties.buttonArea.height.toFixed(3), fill: "none", stroke: this._stateProperties.colorHandle, "stroke-width": "2" }),
                                h("text", { id: "cpickerOkayText", "text-anchor": "middle", x: this._stateProperties.buttonArea.xText1.toFixed(3), y: "93%", "font-family": "Verdana", "font-size": (3.5 * this._stateProperties.vmin).toFixed(3), fill: this._stateProperties.buttonArea.colorText1 }, this.innerButtons[0]),
                                h("text", { id: "cpickerCancelText", "text-anchor": "middle", x: this._stateProperties.buttonArea.xText2.toFixed(3), y: "93%", "font-family": "Verdana", "font-size": (3.5 * this._stateProperties.vmin).toFixed(3), fill: this._stateProperties.buttonArea.colorText2 }, this.innerButtons[1]))
                            : null)))));
    }
    static get is() { return "jeep-cpicker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["jeep-cpicker.css"]
    }; }
    static get styleUrls() { return {
        "$": ["jeep-cpicker.css"]
    }; }
    static get properties() { return {
        "color": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The preselected color"
            },
            "attribute": "color",
            "reflect": true,
            "defaultValue": "\"#ff0000\""
        },
        "opacity": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The preselected opacity"
            },
            "attribute": "opacity",
            "reflect": true,
            "defaultValue": "\"1.000\""
        },
        "buttons": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The buttons text"
            },
            "attribute": "buttons",
            "reflect": true
        },
        "hidebuttons": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Validation buttons hidden"
            },
            "attribute": "hidebuttons",
            "reflect": true,
            "defaultValue": "false"
        },
        "hideheader": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Header hidden"
            },
            "attribute": "hideheader",
            "reflect": true,
            "defaultValue": "false"
        },
        "hideopacity": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Opacity Slider hidden"
            },
            "attribute": "hideopacity",
            "reflect": true,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "innerColor": {},
        "innerOpacity": {},
        "innerButtons": {},
        "innerHideButtons": {},
        "innerHideHeader": {},
        "innerHideOpacity": {},
        "toggleDisplay": {}
    }; }
    static get events() { return [{
            "method": "onOpen",
            "name": "jeepCpickerOpen",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "onClose",
            "name": "jeepCpickerClose",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "CloseData",
                "resolved": "CloseData",
                "references": {
                    "CloseData": {
                        "location": "import",
                        "path": "../../../global/interfaces/jeep-colorpicker"
                    }
                }
            }
        }, {
            "method": "onInstantColor",
            "name": "jeepCpickerInstantColor",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "Color",
                "resolved": "Color",
                "references": {
                    "Color": {
                        "location": "import",
                        "path": "../../../global/interfaces/color"
                    }
                }
            }
        }]; }
    static get methods() { return {
        "init": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Method initialize",
                "tags": []
            }
        },
        "getStateProperties": {
            "complexType": {
                "signature": "() => Promise<StateProperties>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "StateProperties": {
                        "location": "import",
                        "path": "../../../global/interfaces/jeep-colorpicker"
                    }
                },
                "return": "Promise<StateProperties>"
            },
            "docs": {
                "text": "Method get StateProperties",
                "tags": []
            }
        },
        "getWrapperCssVariables": {
            "complexType": {
                "signature": "() => Promise<any>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<any>"
            },
            "docs": {
                "text": "Method get local wrapper css variables",
                "tags": []
            }
        },
        "calcH": {
            "complexType": {
                "signature": "(y: number, height: number) => Promise<number>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<number>"
            },
            "docs": {
                "text": "Method get the vertical position for the hue slider handler",
                "tags": []
            }
        },
        "calcS": {
            "complexType": {
                "signature": "(x: number, width: number) => Promise<number>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<number>"
            },
            "docs": {
                "text": "Method get the horizontal position for the saturation slider handler",
                "tags": []
            }
        },
        "calcB": {
            "complexType": {
                "signature": "(y: number, height: number) => Promise<number>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<number>"
            },
            "docs": {
                "text": "Method get the vertical position for the brightness slider handler",
                "tags": []
            }
        },
        "calcO": {
            "complexType": {
                "signature": "(y: number, height: number) => Promise<number>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<number>"
            },
            "docs": {
                "text": "Method get the vertical position for the opacity slider handler",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "color",
            "methodName": "parseColorProp"
        }, {
            "propName": "opacity",
            "methodName": "parseOpacityProp"
        }, {
            "propName": "buttons",
            "methodName": "parseButtonsProp"
        }, {
            "propName": "hidebuttons",
            "methodName": "parseHideButtonsProp"
        }, {
            "propName": "hideheader",
            "methodName": "parseHideHeaderProp"
        }, {
            "propName": "hideopacity",
            "methodName": "parseHideOpacityProp"
        }]; }
    static get listeners() { return [{
            "name": "resize",
            "method": "handleWindowResize",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
