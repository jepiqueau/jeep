import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './core-fa39fbc1.js';

const JeepColorpicker = class {
    constructor(hostRef) {
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
    parseColorProp(newValue) {
        this.innerColor = newValue ? newValue : "#ff0000";
    }
    parseOpacityProp(newValue) {
        this.innerOpacity = newValue ? newValue : "1";
    }
    parseButtonsProp(newValue) {
        let butts;
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
        let val = butts.slice();
        val.shift();
        this._cpickerButtons = `[${val[0]},${val[1]}]`;
        this.innerButtons = butts;
    }
    parseHideButtonsProp(newValue) {
        this.innerHideButtons = newValue ? newValue : false;
    }
    parseHideHeaderProp(newValue) {
        this.innerHideHeader = newValue ? newValue : false;
    }
    parseHideOpacityProp(newValue) {
        this.innerHideOpacity = newValue ? newValue : false;
        this.innerOpacity = this.innerHideOpacity ? "1" : this.innerOpacity;
    }
    //*******************************
    //* Listen to Event Definitions *
    //*******************************
    openColorPickerHandler() {
        if (this.show) {
            this.openCpicker.emit();
        }
    }
    closeColorPickerHandler(event) {
        if (this.show) {
            this._color = event.detail.color;
            this.close(this._color, event.detail.button);
        }
    }
    instantColorPickerHandler(event) {
        this._color = event.detail;
        this.getColor.emit(event.detail);
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
     * Method open the cpicker component
     */
    async open() {
        this.show = true;
    }
    /**
     * Method close the cpicker component
     */
    async close(color, button) {
        this.show = false;
        this.closeCpicker.emit({ color: color, button: button });
    }
    //*******************************
    //* Component Lifecycle Methods *
    //*******************************
    async componentWillLoad() {
        await this.init();
    }
    //******************************
    //* Private Method Definitions *
    //******************************
    async _init() {
        this.parseColorProp(this.color ? this.color : "#ff0000");
        this.parseOpacityProp(this.opacity ? this.opacity : "1");
        this.parseButtonsProp(this.buttons ? this.buttons : '[Color Picker,Okay,Cancel]');
        this.parseHideButtonsProp(this.hidebuttons ? this.hidebuttons : false);
        this.parseHideHeaderProp(this.hideheader ? this.hideheader : false);
        this.parseHideOpacityProp(this.hideopacity ? this.hideopacity : false);
        return;
    }
    async _handleClick() {
        await this.open();
    }
    //*************************
    //* Rendering JSX Element *
    //*************************
    render() {
        let cpicker;
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
                h("button", { class: "colorpicker-button", onClick: () => this._handleClick() }, this.innerButtons[0]))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "color": ["parseColorProp"],
        "opacity": ["parseOpacityProp"],
        "buttons": ["parseButtonsProp"],
        "hidebuttons": ["parseHideButtonsProp"],
        "hideheader": ["parseHideHeaderProp"],
        "hideopacity": ["parseHideOpacityProp"]
    }; }
    static get style() { return ":host{--colorpicker-top:var(--gcolorpicker-top,10vh);--colorpicker-left:var(--gcolorpicker-left,10vw);--colorpicker-width:var(--gcolorpicker-width,70vmin);--colorpicker-height:var(--gcolorpicker-height,50vmin);--colorpicker-background-color:var(--gcolorpicker-background-color,#242424);--colorpicker-button-font-size:var(--gcolorpicker-button-font-size,12px);--colorpicker-button-margin-top:var(--gcolorpicker-button-margin-top,10px);--colorpicker-button-margin-left:var(--gcolorpicker-button-margin-left,10px);--colorpicker-button-border:var(--gcolorpicker-button-border,2px solid);--colorpicker-button-border-color:var(--gcolorpicker-button-border-color,#000);--colorpicker-button-border-radius:var(--gcolorpicker-button-border-radius,5px 5px);--colorpicker-button-color:var(--gcolorpicker-button-color,#000);--colorpicker-button-background-color:var(--gcolorpicker-button-background-color,#fff)}.colorpicker-button{border:var(--colorpicker-button-border);border-color:var(--colorpicker-button-border-color);border-radius:var(--colorpicker-button-border-radius);color:var(--colorpicker-button-color);background-color:var(--colorpicker-button-background-color);cursor:hand;cursor:pointer;font-size:var(--colorpicker-button-font-size);margin-top:var(--colorpicker-button-margin-top);margin-left:var(--colorpicker-button-margin-left)}jeep-cpicker{--cpicker-top:var(--colorpicker-top);--cpicker-left:var(--colorpicker-left);--cpicker-width:var(--colorpicker-width);--cpicker-height:var(--colorpicker-height);--cpicker-background-color:var(--colorpicker-background-color)}"; }
};

export { JeepColorpicker as jeep_colorpicker };
