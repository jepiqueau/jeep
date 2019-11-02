import { h, Host } from "@stencil/core";
export class JeepColorpicker {
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
        return (h(Host, null,
            h("div", { class: "colorpicker-container" }, this.show
                ?
                    cpicker
                :
                    h("button", { class: "colorpicker-button", onClick: () => this._handleClick() }, this.innerButtons[0]))));
    }
    static get is() { return "jeep-colorpicker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["jeep-colorpicker.css"]
    }; }
    static get styleUrls() { return {
        "$": ["jeep-colorpicker.css"]
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
            "defaultValue": "\"1\""
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
        "show": {}
    }; }
    static get events() { return [{
            "method": "getColor",
            "name": "jeepColorpickerGetColor",
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
                        "path": "../../global/interfaces//color"
                    }
                }
            }
        }, {
            "method": "openCpicker",
            "name": "jeepColorpickerOpen",
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
            "method": "closeCpicker",
            "name": "jeepColorpickerClose",
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
                        "path": "../../global/interfaces/jeep-colorpicker"
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
        "open": {
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
                "text": "Method open the cpicker component",
                "tags": []
            }
        },
        "close": {
            "complexType": {
                "signature": "(color: Color, button: number) => Promise<void>",
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
                    },
                    "Color": {
                        "location": "import",
                        "path": "../../global/interfaces//color"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Method close the cpicker component",
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
            "name": "jeepCpickerOpen",
            "method": "openColorPickerHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "jeepCpickerClose",
            "method": "closeColorPickerHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "jeepCpickerInstantColor",
            "method": "instantColorPickerHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
