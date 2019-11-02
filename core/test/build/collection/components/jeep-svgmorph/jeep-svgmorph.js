import { h } from "@stencil/core";
import { cubicBezierfromPath, alignPathSegments } from '../../utils/svgelements';
export class JeepSvgmorph {
    constructor() {
        //************************
        //* Property Definitions *
        //************************
        /**
         * The preselected duration
         */
        this.duration = "2000ms";
        /**
         * The preselected calculation mode
         */
        this.calcmode = "linear";
        this._alignPathList = [];
        this._cBList = [];
        this._valuesPath = "";
        this._valuesFill = "";
        this._isUniqueColor = false;
    }
    //*****************************
    //* Watch on Property Changes *
    //*****************************
    parseDurationProp(newValue) {
        this.innerDuration = newValue ? newValue : "2000ms";
    }
    parseRepeatcountProp(newValue) {
        this.innerRepeatcount = newValue ? newValue : null;
    }
    parsePathindexProp(newValue) {
        this.innerPathindex = newValue ? this._removeCarriageReturn(newValue).split(';').map(Number) : null;
    }
    parseNsegmentProp(newValue) {
        this.innerNsegment = newValue ? Number(newValue) : null;
    }
    parseKeytimesProp(newValue) {
        this.innerKeytimes = newValue ? this._removeCarriageReturn(newValue) : null;
    }
    parseCalcmodeProp(newValue) {
        this.innerCalcmode = newValue ? newValue : "linear";
    }
    parseKeysplinesProp(newValue) {
        this.innerKeysplines = newValue ? this._removeCarriageReturn(newValue) : null;
    }
    parseFillProp(newValue) {
        this.innerFill = newValue ? newValue : null;
    }
    //*********************
    //* Event Definitions *
    //*********************
    //*******************************
    //* Listen to Event Definitions *
    //*******************************
    //**********************
    //* Method Definitions *
    //**********************
    /**
     * Method initialize
     */
    async init() {
        return await this._init();
    }
    async getStateProperties() {
        const stateProperties = {};
        stateProperties.duration = this.innerDuration;
        stateProperties.repeatCount = this.innerRepeatcount;
        stateProperties.pathIndex = this.innerPathindex;
        stateProperties.nSegment = this.innerNsegment;
        stateProperties.keyTimes = this.innerKeytimes;
        stateProperties.calcMode = this.innerCalcmode;
        stateProperties.keySplines = this.innerKeysplines;
        stateProperties.fill = this.innerFill;
        return stateProperties;
    }
    async getPath() {
        return this._getPath();
    }
    async getPathList() {
        return this._pathList;
    }
    async getFillColor() {
        return this._fillColor;
    }
    renderSVGFirstPath() {
        return this._renderSVGFirstPath();
    }
    async getAlignedPaths(calc) {
        if (calc)
            await this._alignPaths();
        return this._alignPathList;
    }
    //*******************************
    //* Component Lifecycle Methods *
    //*******************************
    async componentWillLoad() {
        await this.init();
    }
    async componentDidLoad() {
        this._element = this.el.shadowRoot;
        if (this.isSVG) {
            await this._renderSVGFirstPath();
        }
    }
    //******************************
    //* Private Method Definitions *
    //******************************
    async _init() {
        this.parseDurationProp(this.duration ? this.duration : "2000ms");
        this.parsePathindexProp(this.pathindex ? this.pathindex : null);
        this.parseNsegmentProp(this.nsegment ? this.nsegment : null);
        this.parseRepeatcountProp(this.repeatcount ? this.repeatcount : null);
        this.parseFillProp(this.fill ? this.fill : null);
        this.parseKeytimesProp(this.keytimes ? this.keytimes : null);
        this.parseCalcmodeProp(this.calcmode ? this.calcmode : 'linear');
        this.parseKeysplinesProp(this.keysplines ? this.keysplines : null);
        if (this.innerFill != null) {
            this._uniqueColor = this.innerFill;
            this._isUniqueColor = true;
        }
        await this.getPath();
        return;
    }
    _removeCarriageReturn(s) {
        let a = s.split(/\r?\n|\r/g);
        let c = s;
        if (a.length > 1) {
            c = '';
            for (let j = 0; j < a.length; j++) {
                c = c.concat(' ' + a[j].trim());
            }
        }
        return c;
    }
    _setSVGAttributes() {
        if (this._svgOptions.width)
            this._svg.setAttribute('width', this._svgOptions.width);
        if (this._svgOptions.height)
            this._svg.setAttribute('height', this._svgOptions.height);
        if (this._svgOptions.viewBox)
            this._svg.setAttribute('viewBox', this._svgOptions.viewBox);
        if (this._svgOptions.xmlns)
            this._svg.setAttribute('xmlns', this._svgOptions.xmlns);
    }
    _drawFirstPath() {
        this._path = this._svg.querySelector("#initPath");
        this._path.setAttribute('d', this._pathList[0]);
        if (this._fillColor.length > 0)
            this._path.setAttribute('fill', this._fillColor[0]);
    }
    async _getPath() {
        const svg = this.el.querySelector('svg');
        this.isSVG = false;
        if (svg !== null) {
            this._svgOptions = {};
            this._pathList = [];
            this._fillColor = [];
            let width = svg.getAttribute('width');
            let height = svg.getAttribute('height');
            let viewBox = svg.getAttribute('viewBox');
            let xmlns = svg.getAttribute('xmlns');
            this._svgOptions.width = width ? width : false;
            this._svgOptions.height = height ? height : false;
            this._svgOptions.viewBox = viewBox ? viewBox : false;
            this._svgOptions.xmlns = xmlns ? xmlns : false;
            if (svg.childElementCount > 0) {
                for (let i = 0; i < svg.childElementCount; i++) {
                    let d = svg.children[i].getAttribute('d');
                    let a = d.split(/\r?\n|\r/g);
                    if (a.length > 1) {
                        let c = '';
                        for (let j = 0; j < a.length; j++) {
                            c = c.concat(' ' + a[j].trim());
                        }
                        this._pathList = [...this._pathList, c.trim()];
                    }
                    else {
                        this._pathList = [...this._pathList, d];
                    }
                    const color = svg.children[i].getAttribute('fill');
                    if (color != null && !this._isUniqueColor) {
                        this._fillColor = [...this._fillColor, color];
                    }
                }
            }
            const ncolor = await this.getOccurrence(this._fillColor, this._fillColor[0]);
            if (ncolor === this._fillColor.length) {
                this._isUniqueColor = true;
                this._uniqueColor = this._fillColor[0];
            }
            this.el.removeChild(svg);
            let kTimes = this.innerKeytimes != null ? this.innerKeytimes.split(';').length : 0;
            let kSplines = this.innerKeysplines != null ? this.innerKeysplines.split(';').length : 0;
            let b = this.innerCalcmode === 'spline' && kSplines != kTimes - 1 ? false : true;
            let c = kTimes === 0 || kTimes === this._pathList.length ? true : false;
            if (b && c)
                this.isSVG = true;
        }
    }
    async _alignPaths() {
        // align paths
        let startIndex;
        for (let i = 0; i < this._pathList.length; i++) {
            startIndex = this.innerPathindex != null && this.innerPathindex[i] ? this.innerPathindex[i] : 0;
            const cbp = await cubicBezierfromPath(this._pathList[i], startIndex);
            this._cBList = [...this._cBList, cbp];
        }
        this._alignPathList = await alignPathSegments(this._cBList, this.innerNsegment);
        return;
    }
    _setAnimation() {
        // path animation set values
        let animPath = this._path.querySelector('#animPath');
        this._valuesPath = "";
        for (let i = 0; i < this._alignPathList.length; i++) {
            if (this._alignPathList[i].cBz != null)
                this._valuesPath = this._valuesPath.concat(this._alignPathList[i].cBz + ';');
        }
        animPath.setAttribute("attributeName", "d");
        animPath.setAttribute("values", this._valuesPath);
        animPath.setAttribute("dur", this.innerDuration);
        animPath.setAttribute("xlink:href", "#initPath");
        if (this.innerFill != null)
            animPath.setAttribute("fill", this.innerFill);
        if (this.innerRepeatcount != null)
            animPath.setAttribute("repeatCount", this.innerRepeatcount);
        if (this.innerKeytimes != null)
            animPath.setAttribute("keyTimes", this.innerKeytimes);
        animPath.setAttribute("calcMode", this.innerCalcmode);
        if (this.innerKeysplines != null)
            animPath.setAttribute("keySplines", this.innerKeysplines);
        if (this._fillColor.length > 1 && !this._isUniqueColor) {
            let animFill = this._path.querySelector('#animFill');
            ;
            // fill animation set values
            this._valuesFill = "";
            for (let i = 0; i < this._fillColor.length; i++) {
                if (this._alignPathList[i].cBz != null)
                    this._valuesFill = this._valuesFill.concat(this._fillColor[i] + ';');
            }
            animFill.setAttribute("attributeName", "fill");
            animFill.setAttribute("values", this._valuesFill);
            animFill.setAttribute("dur", this.innerDuration);
            animFill.setAttribute("xlink:href", "#initPath");
            if (this.innerFill != null)
                animFill.setAttribute("fill", this.innerFill);
            if (this.innerRepeatcount != null)
                animFill.setAttribute("repeatCount", this.innerRepeatcount);
            if (this.innerKeytimes != null)
                animPath.setAttribute("keyTimes", this.innerKeytimes);
            animPath.setAttribute("calcMode", this.innerCalcmode);
            if (this.innerKeysplines != null)
                animPath.setAttribute("keySplines", this.innerKeysplines);
        }
        return;
    }
    async getOccurrence(array, value) {
        return array.filter((v) => (v === value)).length;
    }
    async _renderSVGFirstPath() {
        this._container = this._element.querySelector('#morph-container');
        this._svg = this._container.querySelector('#morph-svg');
        this._setSVGAttributes();
        if (this._pathList && this._pathList[0]) {
            this._drawFirstPath();
            await this._alignPaths();
            this._setAnimation();
        }
        return Promise.resolve();
    }
    //*************************
    //* Rendering JSX Element *
    //*************************
    render() {
        if (this.isSVG) {
            return (h("div", { id: "morph-container" },
                h("div", { id: "morph-svg-container" },
                    h("svg", { id: "morph-svg", width: "500", height: "500", viewBox: "0 0 500 500", xmlns: "http://www.w3.org/2000/svg" },
                        h("path", { id: "initPath" },
                            h("animate", { id: "animPath", begin: "initPath.click" }),
                            this._fillColor.length > 1 && !this._uniqueColor
                                ? h("animate", { id: "animFill", begin: "animPath.begin" })
                                : null)))));
        }
        else {
            return (h("div", { id: "fake-container" }));
        }
    }
    static get is() { return "jeep-svgmorph"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["jeep-svgmorph.css"]
    }; }
    static get styleUrls() { return {
        "$": ["jeep-svgmorph.css"]
    }; }
    static get properties() { return {
        "duration": {
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
                "text": "The preselected duration"
            },
            "attribute": "duration",
            "reflect": true,
            "defaultValue": "\"2000ms\""
        },
        "repeatcount": {
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
                "text": "The preselected repeat count"
            },
            "attribute": "repeatcount",
            "reflect": true
        },
        "pathindex": {
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
                "text": "The preselected path index"
            },
            "attribute": "pathindex",
            "reflect": true
        },
        "nsegment": {
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
                "text": "The preselected number of segments"
            },
            "attribute": "nsegment",
            "reflect": true
        },
        "keytimes": {
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
                "text": "The preselected key times"
            },
            "attribute": "keytimes",
            "reflect": true
        },
        "calcmode": {
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
                "text": "The preselected calculation mode"
            },
            "attribute": "calcmode",
            "reflect": true,
            "defaultValue": "\"linear\""
        },
        "keysplines": {
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
                "text": "The preselected key splines"
            },
            "attribute": "keysplines",
            "reflect": true
        },
        "fill": {
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
                "text": "The preselected fill color"
            },
            "attribute": "fill",
            "reflect": true
        }
    }; }
    static get states() { return {
        "isSVG": {},
        "innerDuration": {},
        "innerRepeatcount": {},
        "innerPathindex": {},
        "innerNsegment": {},
        "innerKeytimes": {},
        "innerCalcmode": {},
        "innerKeysplines": {},
        "innerFill": {}
    }; }
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
                        "path": "../../global/interfaces/jeep-svgmorph"
                    }
                },
                "return": "Promise<StateProperties>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "getPath": {
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
                "text": "",
                "tags": []
            }
        },
        "getPathList": {
            "complexType": {
                "signature": "() => Promise<string[]>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "Array": {
                        "location": "global"
                    }
                },
                "return": "Promise<string[]>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "getFillColor": {
            "complexType": {
                "signature": "() => Promise<string[]>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "Array": {
                        "location": "global"
                    }
                },
                "return": "Promise<string[]>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "renderSVGFirstPath": {
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
                "text": "",
                "tags": []
            }
        },
        "getAlignedPaths": {
            "complexType": {
                "signature": "(calc: boolean) => Promise<CubicBezier[]>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "CubicBezier": {
                        "location": "import",
                        "path": "../../global/interfaces/svggeom"
                    },
                    "Array": {
                        "location": "global"
                    }
                },
                "return": "Promise<CubicBezier[]>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "duration",
            "methodName": "parseDurationProp"
        }, {
            "propName": "repeatcount",
            "methodName": "parseRepeatcountProp"
        }, {
            "propName": "pathindex",
            "methodName": "parsePathindexProp"
        }, {
            "propName": "nsegment",
            "methodName": "parseNsegmentProp"
        }, {
            "propName": "keytimes",
            "methodName": "parseKeytimesProp"
        }, {
            "propName": "calcmode",
            "methodName": "parseCalcmodeProp"
        }, {
            "propName": "keysplines",
            "methodName": "parseKeysplinesProp"
        }, {
            "propName": "fill",
            "methodName": "parseFillProp"
        }]; }
}
