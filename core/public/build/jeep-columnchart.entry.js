import { r as registerInstance, h, H as Host, d as getElement } from './core-7a7a831b.js';
import { w as windowSize, c as createSVGElement, a as createText, u as updateText, t as textScale, b as axisRange, d as createLine, e as updateLine, f as axisConvertY, g as createRect, h as updateRect, r as removeChilds, i as createAnimation, j as createColumnLabel } from './chart-svgelements-85a776ce.js';
import { d as debounce, a as getCssPropertyFromString, b as getDim, c as convertCSSNumber, e as convertCSSBoolean, g as getBoundingClientRect } from './common-9d7d4db4.js';
import { r as randomHexColor } from './color-converter-f1a462a8.js';

const JeepColumnchart = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    //*****************************
    //* Watch on Property Changes *
    //*****************************
    parseTitleProp(newValue) {
        this.innerTitle = newValue ? newValue : null;
    }
    parseSubTitleProp(newValue) {
        this.innerSubTitle = newValue ? newValue : null;
    }
    parseColorProp(newValue) {
        this.innerColor = newValue ? newValue : null;
    }
    parseXTitleProp(newValue) {
        this.innerXTitle = newValue ? newValue : null;
    }
    parseYTitleProp(newValue) {
        this.innerYTitle = newValue ? newValue : null;
    }
    parseDatapointsProp(newValue) {
        const data = newValue ? newValue : null;
        this._dataColor = false;
        let dataPoints;
        let status;
        if (data != null) {
            let objData = JSON.parse(data);
            if (objData.data) {
                if (objData.data.length > 0) {
                    dataPoints = objData.data;
                    if (dataPoints[0].color)
                        this._dataColor = true;
                    if (this.innerColor === null && !this._dataColor) {
                        let hueInter = Math.floor(360 / dataPoints.length);
                        for (let i = 0; i < dataPoints.length; i++) {
                            let hueStart = i * hueInter;
                            let hueEnd = hueStart + hueInter;
                            dataPoints[i].color = randomHexColor(hueStart, hueEnd);
                        }
                        this._dataColor = true;
                    }
                    if (dataPoints[0].label)
                        this.axisType.push("label");
                    if (dataPoints[0].x)
                        this.axisType.push("x");
                    if (dataPoints[0].y)
                        this.axisType.push("y");
                    status = { status: 200 };
                }
                else {
                    dataPoints = null;
                    status = { status: 400, message: "Error: data object empty in datapoints property" };
                }
            }
            else {
                dataPoints = null;
                status = { status: 400, message: "Error: no data object in datapoints property" };
            }
        }
        else {
            dataPoints = null;
            status = { status: 400, message: "Error: no datapoints property" };
        }
        this.status = status;
        this.innerDatapoints = this.status.status === 200 ? [...dataPoints] : null;
    }
    parseStyleProp(newValue) {
        this.innerStyle = newValue ? newValue : null;
    }
    parseAnimationProp(newValue) {
        this.innerAnimation = newValue ? newValue : false;
    }
    parseBorderProp(newValue) {
        this.innerBorder = newValue ? newValue : false;
    }
    parseDelayProp(newValue) {
        this.innerDelay = newValue ? parseFloat(newValue) : 100;
    }
    //**********************
    //* Method Definitions *
    //**********************
    init() {
        this._init();
        return Promise.resolve();
    }
    getStatus() {
        return Promise.resolve(this.status);
    }
    renderChart() {
        return Promise.resolve(this._renderChart());
    }
    async getWindowSize() {
        return windowSize(this.window);
    }
    async getCssProperties() {
        return this._prop;
    }
    //*******************************
    //* Component Lifecycle Methods *
    //*******************************
    async componentWillLoad() {
        this.window = window;
        this._prop = {};
        await this._init();
    }
    componentDidLoad() {
        this._element = this.el.shadowRoot;
        if (this.status.status === 200) {
            this._renderChart();
        }
    }
    //******************************
    //* Private Method Definitions *
    //******************************
    /* ---- Deal with initialization and windows methods  */
    async _init() {
        this.document = this.window.document;
        this.root = this.document.documentElement;
        this.axisType = [];
        this.parseTitleProp(this.ctitle ? this.ctitle : null);
        this.parseSubTitleProp(this.subtitle ? this.subtitle : null);
        this.parseXTitleProp(this.xtitle ? this.xtitle : null);
        this.parseYTitleProp(this.ytitle ? this.ytitle : null);
        this.parseColorProp(this.color ? this.color : null);
        this.parseAnimationProp(this.animation ? this.animation : false);
        this.parseBorderProp(this.cborder ? this.cborder : false);
        this.parseStyleProp(this.cstyle ? this.cstyle : null);
        this.parseDelayProp(this.delay ? this.delay : "100");
        this._wSize = await this.getWindowSize();
        this._update = false;
        this._dataColor = false;
        this.parseDatapointsProp(this.datapoints ? this.datapoints : null);
        this._yaxis = {};
        let filteredAxisX = [];
        filteredAxisX = this.axisType.filter(element => element === "label");
        this._label = false;
        if (filteredAxisX[0] === "label") {
            this._label = true;
        }
        this._showTarget = 0;
        this.mouseStart = false;
        this._xmlns = "http://www.w3.org/2000/svg";
        this.window.addEventListener('resize', debounce(this, this._windowResize, 100, false), false);
        // get the global css variables
        this._prop.bgColor = this._prop.bgColor ? this._prop.bgColor : this._setPropertyValue('--chart-background-color', this.window.getComputedStyle(this.root).getPropertyValue('--chart-background-color'));
        this._prop.topPlot = this._prop.topPlot ? this._prop.topPlot : this._setPropertyValue('--chart-top', this.window.getComputedStyle(this.root).getPropertyValue('--chart-top'));
        this._prop.leftPlot = this._prop.leftPlot ? this._prop.leftPlot : this._setPropertyValue('--chart-left', this.window.getComputedStyle(this.root).getPropertyValue('--chart-left'));
        this._prop.widthPlot = this._prop.widthPlot ? this._prop.widthPlot : this._setPropertyValue('--chart-width', this.window.getComputedStyle(this.root).getPropertyValue('--chart-width'));
        this._prop.heightPlot = this._prop.heightPlot ? this._prop.heightPlot : this._setPropertyValue('--chart-height', this.window.getComputedStyle(this.root).getPropertyValue('--chart-height'));
        this._prop.axColor = this._setPropertyValue('--chart-axis-color', this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-color'));
        this._prop.lnColor = this._setPropertyValue('--chart-line-color', this.window.getComputedStyle(this.root).getPropertyValue('--chart-line-color'));
        this._prop.tiColor = this._setPropertyValue('--chart-title-color', this.window.getComputedStyle(this.root).getPropertyValue('--chart-title-color'));
        this._prop.stColor = this._setPropertyValue('--chart-subtitle-color', this.window.getComputedStyle(this.root).getPropertyValue('--chart-subtitle-color'));
        this._prop.atColor = this._setPropertyValue('--chart-axis-title-color', this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-title-color'));
        this._prop.lbColor = this._setPropertyValue('--chart-label-color', this.window.getComputedStyle(this.root).getPropertyValue('--chart-label-color'));
        this._prop.ftFamily = this._setPropertyValue('--chart-font-family', this.window.getComputedStyle(this.root).getPropertyValue('--chart-font-family'));
        this._prop.ftTiSize = this._setPropertyValue('--chart-title-font-size', this.window.getComputedStyle(this.root).getPropertyValue('--chart-title-font-size'));
        this._prop.ftLbSize = this._setPropertyValue('--chart-label-font-size', this.window.getComputedStyle(this.root).getPropertyValue('--chart-label-font-size'));
        this._prop.ftATSize = this._setPropertyValue('--chart-axis-title-font-size', this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-title-font-size'));
        this._prop.ftSTSize = this._setPropertyValue('--chart-subtitle-font-size', this.window.getComputedStyle(this.root).getPropertyValue('--chart-subtitle-font-size'));
        this._prop.tickX = this._setPropertyValue('--chart-tick-x-length', this.window.getComputedStyle(this.root).getPropertyValue('--chart-tick-x-length'));
        this._prop.tickY = this._setPropertyValue('--chart-tick-y-length', this.window.getComputedStyle(this.root).getPropertyValue('--chart-tick-y-length'));
        this._prop.gridX = this._setPropertyValue('--chart-grid-x', this.window.getComputedStyle(this.root).getPropertyValue('--chart-grid-x'));
        this._prop.animDuration = this._setPropertyValue('--chart-animation-duration', this.window.getComputedStyle(this.root).getPropertyValue('--chart-animation-duration'));
        this._prop.bdColor = this._setPropertyValue('--chart-border-color', this.window.getComputedStyle(this.root).getPropertyValue('--chart-border-color'));
        this._prop.bdWidth = this._setPropertyValue('--chart-border-width', this.window.getComputedStyle(this.root).getPropertyValue('--chart-border-width'));
        // reading instance css properties if any
        if (this.innerStyle != null) {
            const propInstance = await getCssPropertyFromString(this.innerStyle);
            if (propInstance != null) {
                this._prop.leftPlot = propInstance.left ? propInstance.left : this._prop.leftPlot;
                this._prop.topPlot = propInstance.top ? propInstance.top : this._prop.topPlot;
                this._prop.widthPlot = propInstance.width ? propInstance.width : this._prop.widthPlot;
                this._prop.heightPlot = propInstance.height ? propInstance.height : this._prop.heightPlot;
                this._prop.bgColor = propInstance.backgroundcolor ? propInstance.backgroundcolor : this._prop.bgColor;
            }
        }
        // get the window size
        this._wSize = await this.getWindowSize();
        // set the div container size
        this._setContainerSize();
        return;
    }
    _setContainerSize() {
        this.w_width = getDim(this._prop.widthPlot, this._wSize.width, this._prop.leftPlot);
        this.w_height = getDim(this._prop.heightPlot, this._wSize.height, this._prop.topPlot);
        this.el.style.setProperty('--top', this._prop.topPlot);
        this.el.style.setProperty('--left', this._prop.leftPlot);
        this.el.style.setProperty('--width', `${this.w_width}px`);
        this.el.style.setProperty('--height', `${this.w_height}px`);
        this.el.style.setProperty('--backgroundcolor', `${this._prop.bgColor}`);
        this._titleRect = null;
        this._chartRect = { top: 0, left: 0, width: this.w_width, height: this.w_height };
    }
    async _windowResize() {
        this._wSize = await this.getWindowSize();
        this._setContainerSize();
        this._update = true;
        if (this.status && this.status.status === 200) {
            this._renderChart();
        }
        return;
    }
    _getDataPoint(data) {
        for (let i = 0; i < this.innerDatapoints.length; i++) {
            if (this._label) {
                if (this.innerDatapoints[i].label === data) {
                    return { index: i, datapoint: this.innerDatapoints[i] };
                }
            }
            else {
                if (this.innerDatapoints[i].x === parseFloat(data)) {
                    return { index: i, datapoint: this.innerDatapoints[i] };
                }
            }
            if (i === this.innerDatapoints.length - 1)
                return { index: -1, datapoint: null };
        }
    }
    _setPropertyValue(name, value) {
        if (name === '--chart-background-color') {
            return value ? value : "#ffffff";
        }
        else if (name.slice(-5) === 'color') {
            return value ? value : "#000000";
        }
        else if (name.slice(-12) === 'border-width') {
            return value ? value : "1";
        }
        else if (name.slice(-9) === 'font-size') {
            return value ? value : "10px";
        }
        else if (name.slice(-11) === 'font-family') {
            return value ? value : "Verdana";
        }
        else if (name.slice(-6).substring(0, 4) === 'grid') {
            return value ? value : "false";
        }
        else if (name.slice(-8) === 'duration') {
            return value ? value : "0.5s";
        }
        else {
            return value ? value : "0";
        }
    }
    /* ---- Deal with Chart SVG Elements  */
    _createTitle() {
        if (this.innerTitle != null) {
            let g;
            let textEl;
            if (!this._update) {
                g = createSVGElement("g", this.svg);
                g.setAttributeNS(null, "id", "columnchart-title");
            }
            else {
                g = this.svg.querySelector("#columnchart-title");
                g.removeAttributeNS(null, 'transform');
            }
            let opt = {
                id: "columnchart-title-text",
                fontFamily: this._prop.ftFamily,
                fontSize: this._prop.ftTiSize,
                fill: this._prop.tiColor,
                anchor: "middle"
            };
            let y = parseFloat(this._prop.ftTiSize.split('px')[0]);
            let pos = { x: Math.round(this.w_width / 2), y: y + 10 };
            if (!this._update) {
                textEl = createText(g, this.innerTitle, pos, opt);
            }
            else {
                textEl = updateText(this.svg, opt.id, opt.anchor, pos);
            }
            let bb;
            // display the subtitle if any
            if (this.innerSubTitle != null) {
                bb = textEl.getBoundingClientRect();
                opt.id = "columnchart-subtitle-text";
                opt.fontSize = this._prop.ftSTSize;
                opt.fill = this._prop.stColor;
                y = Math.ceil(bb.bottom - this.borderBB.top) + 5;
                pos = { x: Math.round(this.w_width / 2), y: y + 10 };
                if (!this._update) {
                    createText(g, this.innerSubTitle, pos, opt);
                }
                else {
                    updateText(this.svg, opt.id, opt.anchor, pos);
                }
            }
            bb = g.getBoundingClientRect();
            let scale = textScale(bb.width, this.w_width, 10);
            let transf = 'translate(' + Math.round(10 - bb.left * scale) + ',0) ' + 'scale(' + scale + ',' + scale + ')';
            if (scale != 1)
                g.setAttributeNS(null, "transform", transf);
            bb = g.getBoundingClientRect();
            this._titleRect = { left: bb.left - this.borderBB.left, top: bb.top - this.borderBB.top, width: bb.width, height: bb.height };
        }
    }
    _createTitleY() {
        let g;
        let opt = {
            id: "columnchart-ytitle-text",
            fontFamily: this._prop.ftFamily,
            fontSize: this._prop.ftATSize,
            fill: this._prop.atColor,
            anchor: "middle"
        };
        if (this.innerYTitle != null) {
            let textEl;
            if (!this._update) {
                g = createSVGElement("g", this.svg);
                g.setAttributeNS(null, "id", "columnchart-ytitle");
            }
            else {
                g = this.svg.querySelector("#columnchart-ytitle");
            }
            let y = this._chartRect.top + Math.round(this._chartRect.height / 2);
            let x = 5 + parseFloat(this._prop.ftATSize.split('px')[0]);
            let pos = { x: x, y: y };
            if (!this._update) {
                textEl = createText(g, this.innerYTitle, pos, opt);
            }
            else {
                textEl = updateText(this.svg, opt.id, opt.anchor, pos);
            }
            let transf = 'rotate(-90 ' + pos.x.toString() + ' ' + pos.y.toString() + ')';
            textEl.setAttributeNS(null, "transform", transf);
            let bb = g.getBoundingClientRect();
            this._chartRect.left = Math.ceil(bb.right - this.borderBB.left);
            this._chartRect.width -= Math.ceil(bb.right - this.borderBB.left);
            return g;
        }
        else {
            return null;
        }
    }
    _createTitleX() {
        let opt = {
            id: "columnchart-xtitle-text",
            fontFamily: this._prop.ftFamily,
            fontSize: this._prop.ftATSize,
            fill: this._prop.atColor,
            anchor: "middle"
        };
        if (this.innerXTitle != null) {
            let g;
            if (!this._update) {
                g = createSVGElement("g", this.svg);
                g.setAttributeNS(null, "id", "columnchart-xtitle");
            }
            else {
                g = this.svg.querySelector("#columnchart-xtitle");
            }
            let y = this._chartRect.top + this._chartRect.height - 10;
            let x = Math.round(this._chartRect.left + this._chartRect.width / 2);
            let pos = { x: x, y: y };
            if (!this._update) {
                createText(g, this.innerXTitle, pos, opt);
            }
            else {
                updateText(this.svg, opt.id, opt.anchor, pos);
            }
            let bb = g.getBoundingClientRect();
            this._chartRect.height -= Math.floor(bb.height);
            return g;
        }
        else {
            return null;
        }
    }
    _labelSize(lenA, rot) {
        let opt = {
            fontFamily: this._prop.ftFamily,
            fontSize: this._prop.ftLbSize,
            fill: this._prop.lbColor,
            anchor: "start"
        };
        let max;
        if (lenA.label) {
            max = lenA.label;
        }
        else {
            max = lenA.top.toString();
            let min = lenA.bottom.toString();
            if (min.length > max.length)
                max = min;
        }
        let y = 0;
        let x = 0;
        let pos = { x: x, y: y };
        let textEl = createText(this.svg, max, pos, opt);
        if (rot != 0) {
            let transf = 'rotate(' + rot + ',0,0)';
            textEl.setAttributeNS(null, "transform", transf);
        }
        let bb = textEl.getBoundingClientRect();
        this.svg.removeChild(textEl);
        return { width: Math.ceil(bb.width), height: Math.ceil(bb.height) };
    }
    _createAxis() {
        let tickXL = convertCSSNumber(this._prop.tickX);
        let tickYL = convertCSSNumber(this._prop.tickY);
        let g;
        if (!this._update) {
            g = createSVGElement("g", this.svg);
            g.setAttributeNS(this._xmlns, "id", "columnchart-axes");
        }
        else {
            g = this.svg.querySelector("#columnchart-axes");
        }
        this._initChartRect();
        let gTY = this._createTitleY();
        let gTX = this._createTitleX();
        // find the axes range
        const dataSet = { dataPoints: this.innerDatapoints };
        this._lenY = axisRange([dataSet], "y", 0, true);
        if (this._label) {
            this._lenX = axisRange([dataSet], "label");
        }
        else {
            this._lenX = axisRange([dataSet], "x");
        }
        // calculate the label sizes
        let labelYSize = this._labelSize(this._lenY, 0);
        this._x_axy = 3 + labelYSize.width + 2 + tickYL;
        this._nXlines = this.innerDatapoints.length;
        let xLength = this._chartRect.width - this._x_axy;
        this._xInterval = Math.floor(xLength / this._nXlines);
        this._labelRotate = false;
        let labelXSize = this._labelSize(this._lenX, 0);
        if (labelXSize.width > this._xInterval - 10) {
            labelXSize = this._labelSize(this._lenX, -80);
            this._labelRotate = true;
        }
        this._y_axy = 10 + labelXSize.height + 3 + tickXL;
        // Y axis
        this._yaxis = {};
        this._yaxis.left = this._chartRect.left + this._x_axy;
        this._yaxis.width = 0;
        this._yaxis.top = this._chartRect.top;
        this._yaxis.height = this._chartRect.height - this._y_axy;
        let opt = {
            id: "columnchart-yaxis",
            stroke: this._prop.axColor,
            strokeWidth: "1"
        };
        let posy1 = { x: this._yaxis.left, y: this._yaxis.top };
        let posy2 = { x: this._yaxis.left + this._yaxis.width, y: this._yaxis.top + this._yaxis.height };
        if (!this._update) {
            createLine(g, posy1, posy2, opt);
        }
        else {
            updateLine(this.svg, opt.id, posy1, posy2);
        }
        // center the y Axis Title
        if (gTY != null) {
            let transf = 'translate(0,0)';
            gTY.setAttributeNS(null, "transform", transf);
            let titleBB = gTY.getBoundingClientRect();
            let trans = -Math.round(titleBB.top - this.borderBB.top + titleBB.height / 2 - (this._yaxis.top + this._yaxis.height / 2));
            transf = 'translate(0,' + trans + ')';
            gTY.setAttributeNS(null, "transform", transf);
        }
        let optLabel = {
            id: "columnchart-ylabel0",
            stroke: this._prop.lbColor,
            strokeWidth: "1",
            fontFamily: this._prop.ftFamily,
            fontSize: this._prop.ftLbSize,
            anchor: "end"
        };
        let yft = Math.floor(parseFloat(this._prop.ftLbSize.split('px')[0]) / 2) - 2; // correction 2px 
        // Y grid lines
        this._nYlines = Math.abs(Math.floor(this._lenY.length / this._lenY.interval)) + 1;
        for (let i = 0; i < this._nYlines; i++) {
            let s = this._lenY.top - i * Math.abs(this._lenY.interval);
            opt.id = "columnchart-yLine" + s.toString();
            if (i === this._nYlines - 1)
                opt.id = "columnchart-xaxis";
            opt.stroke = this._prop.lnColor;
            optLabel.id = "columnchart-ylabel" + s.toString();
            let y = axisConvertY(this._yaxis, this._lenY, s);
            let posxl1 = { x: this._yaxis.left, y: y };
            let posxl2 = { x: this._chartRect.left + this._chartRect.width, y: y };
            if (!this._update) {
                createLine(g, posxl1, posxl2, opt);
            }
            else {
                updateLine(this.svg, opt.id, posxl1, posxl2);
            }
            // tick
            if (tickYL > 0) {
                let postk = { x: this._yaxis.left - tickYL, y: y };
                opt.id = "columnchart-ytick" + s.toString();
                if (!this._update) {
                    createLine(g, posxl1, postk, opt);
                }
                else {
                    updateLine(this.svg, opt.id, posxl1, postk);
                }
            }
            // label
            let pos = { x: this._yaxis.left - tickYL - 2, y: y + yft };
            if (!this._update) {
                createText(g, s.toString(), pos, optLabel);
            }
            else {
                updateText(this.svg, optLabel.id, optLabel.anchor, pos);
            }
        }
        // X Grid Lines
        let xAxisEl = this.svg.querySelector("#columnchart-xaxis");
        let y = parseFloat(xAxisEl.getAttribute("y1"));
        let x = Math.floor(this._xInterval / 2);
        optLabel = {
            id: "columnchart-xlabel",
            stroke: this._prop.lbColor,
            strokeWidth: "1",
            fontFamily: this._prop.ftFamily,
            fontSize: this._prop.ftLbSize,
            anchor: "middle"
        };
        yft = Math.floor(parseFloat(this._prop.ftLbSize.split('px')[0])); //  
        for (let i = 0; i < this._nXlines; i++) {
            let posx1 = { x: this._yaxis.left + x, y: y };
            // GridX Line
            if (convertCSSBoolean(this._prop.gridX)) {
                opt.id = "columnchart-xLine" + i.toString();
                let posx2 = { x: this._yaxis.left + x, y: this._yaxis.top };
                if (!this._update) {
                    createLine(g, posx1, posx2, opt);
                }
                else {
                    updateLine(this.svg, opt.id, posx1, posx2);
                }
            }
            // tick
            if (tickXL > 0) {
                let postk = { x: this._yaxis.left + x, y: y + tickXL };
                opt.id = "columnchart-xtick" + i.toString();
                if (!this._update) {
                    createLine(g, posx1, postk, opt);
                }
                else {
                    updateLine(this.svg, opt.id, posx1, postk);
                }
            }
            // label
            let labx;
            if (this._label) {
                labx = this.innerDatapoints[i].label;
            }
            else {
                labx = this.innerDatapoints[i].x.toString();
                ;
            }
            optLabel.id = "columnchart-xlabel" + labx;
            let labelEl;
            let pos;
            let transr = null;
            if (this._labelRotate) {
                optLabel.anchor = 'end';
                pos = { x: this._yaxis.left + x, y: y + tickXL + 3 };
                transr = 'rotate(-80,' + pos.x + ',' + pos.y + ')';
            }
            else {
                optLabel.anchor = 'middle';
                pos = { x: this._yaxis.left + x, y: y + tickXL + yft };
                transr = 'rotate(0,' + pos.x + ',' + pos.y + ')';
            }
            if (!this._update) {
                labelEl = createText(g, labx, pos, optLabel);
            }
            else {
                labelEl = updateText(this.svg, optLabel.id, optLabel.anchor, pos);
            }
            if (transr != null)
                labelEl.setAttributeNS(null, "transform", transr);
            x += this._xInterval;
        }
        if (gTX != null) {
            let transf = 'translate(0,0)';
            gTX.setAttributeNS(null, "transform", transf);
            let axisBB = xAxisEl.getBoundingClientRect();
            let titleBB = gTX.getBoundingClientRect();
            let trans = -Math.round(titleBB.left + titleBB.width / 2 - (axisBB.left + axisBB.width / 2));
            if (Math.abs(trans) > 0) {
                let transf = 'translate(' + trans + ',0)';
                gTX.setAttributeNS(null, "transform", transf);
            }
        }
    }
    _createColumn() {
        let g;
        if (!this._update) {
            g = createSVGElement("g", this.svg);
            g.setAttributeNS(null, "id", "columnchart-data");
        }
        else {
            g = this.svg.querySelector("#columnchart-data");
        }
        let opt = {
            id: "columnchart-data",
        };
        if (this.innerColor != null) {
            opt.fill = this.innerColor;
        }
        let xcol = Math.floor(this._xInterval / 2);
        let xw = Math.floor(xcol - 0.1 * xcol);
        let wcol = xw > 2 ? xw : 2;
        let colEl;
        let yzero = axisConvertY(this._yaxis, this._lenY, 0);
        for (let i = 0; i < this._nXlines; i++) {
            if (this._dataColor)
                opt.fill = this.innerDatapoints[i].color;
            let labx;
            if (this._label) {
                labx = this.innerDatapoints[i].label;
            }
            else {
                labx = this.innerDatapoints[i].x.toString();
                ;
            }
            opt.id = "columnchart-data-" + labx;
            let colReverse = false;
            let col = {};
            col.left = this._yaxis.left + xcol - wcol;
            col.width = 2 * wcol;
            let y = axisConvertY(this._yaxis, this._lenY, this.innerDatapoints[i].y);
            if (y > yzero) {
                col.top = yzero;
                col.height = y - yzero;
            }
            else {
                col.top = y;
                col.height = yzero - col.top;
                colReverse = true;
            }
            if (!this._update) {
                colEl = createRect(g, col, opt);
                colEl.addEventListener('touchstart', this._handleTouchDown.bind(this), false);
                colEl.addEventListener('touchend', this._handleTouchUp.bind(this), false);
                colEl.addEventListener('mousedown', this._handleMouseDown.bind(this), false);
                colEl.addEventListener('mouseup', this._handleMouseUp.bind(this), false);
                if (this.innerAnimation)
                    this._setAnimation(colEl, col, this._prop.animDuration, colReverse);
            }
            else {
                colEl = updateRect(this.svg, opt.id, col);
                if (this.innerAnimation) {
                    removeChilds(colEl);
                    this._setAnimation(colEl, col, this._prop.animDuration, colReverse);
                }
            }
            xcol += this._xInterval;
        }
    }
    _setAnimation(colEl, col, duration, reverse) {
        let animOpt = {};
        animOpt.attributeName = "height";
        animOpt.from = "0";
        animOpt.to = col.height.toString();
        animOpt.dur = duration;
        animOpt.fill = "freeze";
        createAnimation(colEl, animOpt);
        if (reverse) {
            animOpt.attributeName = "y";
            animOpt.from = (col.top + col.height).toString();
            animOpt.to = col.top.toString();
            createAnimation(colEl, animOpt);
        }
    }
    _initChartRect() {
        this._chartRect.top = 20; //20px below
        if (this._titleRect != null)
            this._chartRect.top += Math.round(this._titleRect.top + this._titleRect.height);
        this._chartRect.left = 0;
        this._chartRect.width = this.w_width - this._chartRect.left - 20; // 20px right
        this._chartRect.height = this.w_height - this._chartRect.top; // 20px bottom
    }
    _waitRemoveLabel() {
        if (this.mouseStart) {
            setTimeout(() => {
                this._removeLabel(this.svg);
                this.mouseStart = false;
                this._showTarget = 0;
            }, 1200);
        }
    }
    _removeLabel(svg) {
        let gElems = svg.querySelectorAll("#columnchart-label-value");
        for (let i = 0; i < gElems.length; i++) {
            removeChilds(gElems[i]);
            svg.removeChild(gElems[i]);
        }
    }
    /* ---- Deal with handling event  */
    _handleTouchDown(evt) {
        evt.preventDefault();
        this.mouseStart = true;
        let pt = { x: evt.touches[0].pageX, y: evt.touches[0].pageY };
        this._handleEventTarget(evt, pt);
    }
    _handleMouseDown(evt) {
        evt.preventDefault();
        this.mouseStart = true;
        let pt = { x: evt.pageX, y: evt.pageY };
        this._handleEventTarget(evt, pt);
    }
    _handleEventTarget(evt, pt) {
        this._showTarget = evt.target;
        pt.x -= this.borderBB.left;
        pt.y -= this.borderBB.top;
        let colbb = this._showTarget.getBoundingClientRect();
        let color = this._showTarget.getAttributeNS(null, 'fill');
        let id = this._showTarget.getAttributeNS(null, 'id');
        let label = id.split('-')[2];
        let data = this._getDataPoint(label);
        label = label + " : " + data.datapoint.y;
        let index = data.index;
        let ft = 1.2 * parseFloat(this._prop.ftLbSize.split('px')[0]);
        let opt = {
            fontFamily: this._prop.ftFamily,
            fontSize: ft.toString() + 'px',
            fill: this._prop.lbColor,
            anchor: "middle"
        };
        createColumnLabel(this.svg, colbb, label, index, color, pt, this.borderBB, opt);
    }
    _handleTouchUp(evt) {
        evt.preventDefault();
        this._waitRemoveLabel();
    }
    _handleMouseUp(evt) {
        evt.preventDefault();
        this._waitRemoveLabel();
    }
    /* ---- Deal with rendering  */
    async _renderChart() {
        this.container = this._element.querySelector("#div-columnchart-container");
        this.chart = this._element.querySelector('#div-columnchart-chart');
        this.svg = this._element.querySelector('#svg-columnchart');
        this.borderEl = this.svg.querySelector('#svg-border-rect');
        this.borderBB = await getBoundingClientRect(this.borderEl, this.innerDelay);
        if (this.borderBB.top != 0 || this.borderBB.left != 0 || this.borderBB.width != 0 || this.borderBB.height != 0) {
            if (this.innerBorder) {
                this.borderEl.classList.remove('hidden');
            }
            // draw the column chart
            if (this.innerTitle != null && this.innerTitle.length > 0)
                this._createTitle();
            this._createAxis();
            this._createColumn();
        }
    }
    render() {
        let toRender = [];
        if (this.status.status === 200) {
            let viewBox = `0 0 ${this.w_width.toString()} ${this.w_height.toString()}`;
            toRender = [...toRender,
                h("div", { id: "div-columnchart-container" }, h("div", { id: "div-columnchart-chart" }, h("svg", { id: "svg-columnchart", width: this.w_width.toString(), height: this.w_height.toString(), viewBox: viewBox }, h("rect", { id: "svg-border-rect", class: "border-rect hidden", x: "0", y: "0", width: this.w_width.toString(), height: this.w_height.toString(), stroke: this._prop.bdColor, "stroke-width": this._prop.bdWidth, fill: "none", "fill-opacity": "0" }))))
            ];
        }
        else {
            toRender = [...toRender,
                h("div", { id: "div-error-message" }, h("p", { id: "p-error-message" }, this.status.message))
            ];
        }
        return (h(Host, null, toRender));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "ctitle": ["parseTitleProp"],
        "subtitle": ["parseSubTitleProp"],
        "color": ["parseColorProp"],
        "xtitle": ["parseXTitleProp"],
        "ytitle": ["parseYTitleProp"],
        "datapoints": ["parseDatapointsProp"],
        "cstyle": ["parseStyleProp"],
        "animation": ["parseAnimationProp"],
        "cborder": ["parseBorderProp"],
        "delay": ["parseDelayProp"]
    }; }
    static get style() { return ":host {\n    --height:200px;\n    --width:300px;\n    --top:30px;\n    --left:10px;\n    --backgroundcolor: rgb(255, 255, 255);\n}\n#div-columnchart-container {\n    position:relative;\n    left:0px;\n    top:0px;\n    width:100%;\n    height:calc(var(--height) + var(--top));\n    z-index: 1;\n\n}\n#div-columnchart-chart {\n    position:relative;\n    left:var(--left);\n    top:var(--top);\n    width:var(--width);\n    height:var(--height);\n    background-color:var(--backgroundcolor);\n    z-index: 1;\n}\n.hidden {\n    visibility: hidden;\n}\n\n#div-error-message{\n    background-color:#f89393;\n    position: absolute;\n    top: 0;\n    left: 0;\n    margin: 0 auto;\n    width: 100%;\n    height:60px;\n    line-height:60px;\n    text-align:left;\n    padding-left:10px;\n    font-size:15px;\n    font-family:Verdana;\n}\n#p-error-message {\n    display:inline-block;\n    vertical-align:middle;\n    line-height:normal;        \n}"; }
};

export { JeepColumnchart as jeep_columnchart };
