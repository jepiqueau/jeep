import { r as registerInstance, h, H as Host, d as getElement } from './core-9cd05fb9.js';
import { d as debounce, g as getCssPropertyFromString, a as getDim, c as convertCSSNumber, b as convertCSSBoolean } from './common-95557d02.js';

const windowSize = (window) => {
    return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
    };
};

const xmlns = "http://www.w3.org/2000/svg";
const createSVGElement = (eltype, parent) => {
    const svgEl = document.createElementNS(xmlns, eltype);
    if (parent)
        parent.appendChild(svgEl);
    return svgEl;
};
const createText = (g, text, pos, options) => {
    let opt = getSVGOptions(options);
    let textEl = createSVGElement("text", g);
    textEl.setAttributeNS(null, "x", pos.x.toString());
    textEl.setAttributeNS(null, "y", pos.y.toString());
    textEl.textContent = text;
    elementSVGOptions(opt, textEl, 'text');
    return textEl;
};
const updateText = (svg, id, anchor, pos) => {
    let textEl = svg.querySelector('#' + id);
    textEl.setAttributeNS(null, "x", pos.x.toString());
    textEl.setAttributeNS(null, "y", pos.y.toString());
    textEl.setAttributeNS(null, "text-anchor", anchor);
    return textEl;
};
const createLine = (g, pos1, pos2, options) => {
    let opt = getSVGOptions(options);
    let lineEl = createSVGElement("line", g);
    lineEl.setAttributeNS(null, "x1", pos1.x.toString());
    lineEl.setAttributeNS(null, "y1", pos1.y.toString());
    lineEl.setAttributeNS(null, "x2", pos2.x.toString());
    lineEl.setAttributeNS(null, "y2", pos2.y.toString());
    elementSVGOptions(opt, lineEl);
    return lineEl;
};
const updateLine = (svg, id, pos1, pos2) => {
    let lineEl = svg.querySelector('#' + id);
    lineEl.setAttributeNS(null, "x1", pos1.x.toString());
    lineEl.setAttributeNS(null, "y1", pos1.y.toString());
    lineEl.setAttributeNS(null, "x2", pos2.x.toString());
    lineEl.setAttributeNS(null, "y2", pos2.y.toString());
    return lineEl;
};
const createRect = (g, rect, options) => {
    let opt = getSVGOptions(options);
    let rectEl = createSVGElement("rect", g);
    rectEl.setAttributeNS(null, "x", rect.left.toString());
    rectEl.setAttributeNS(null, "y", rect.top.toString());
    rectEl.setAttributeNS(null, "width", rect.width.toString());
    rectEl.setAttributeNS(null, "height", rect.height.toString());
    elementSVGOptions(opt, rectEl);
    return rectEl;
};
const updateRect = (svg, id, rect) => {
    let rectEl = svg.querySelector('#' + id);
    rectEl.setAttributeNS(null, "x", rect.left.toString());
    rectEl.setAttributeNS(null, "y", rect.top.toString());
    rectEl.setAttributeNS(null, "width", rect.width.toString());
    rectEl.setAttributeNS(null, "height", rect.height.toString());
    return rectEl;
};
const createPolyline = (g, points, options) => {
    let opt = getSVGOptions(options);
    let plineEl = createSVGElement('polyline', g);
    plineEl.setAttributeNS(null, "points", points);
    elementSVGOptions(opt, plineEl);
    return plineEl;
};
const updatePolyline = (svg, id, points) => {
    let plineEl = svg.querySelector('#' + id);
    plineEl.setAttributeNS(null, "points", points);
    return plineEl;
};
const createMarker = (defs, d, opt) => {
    let g = createSVGElement('g', defs);
    g.setAttribute("id", opt.id);
    g.setAttribute('viewbox', opt.viewbox);
    let path = createSVGElement('path', g);
    path.setAttribute('d', d);
};
const createAnimation = (el, anim) => {
    let animEl = createSVGElement('animate', el);
    animEl.setAttributeNS(null, "attributeName", anim.attributeName);
    animEl.setAttributeNS(null, "from", anim.from);
    animEl.setAttributeNS(null, "to", anim.to);
    animEl.setAttributeNS(null, "dur", anim.dur);
    animEl.setAttributeNS(null, "fill", anim.fill);
    return animEl;
};
const createLineLabel = async (svg, label, pt, color, options) => {
    let opt = getSVGOptions(options);
    //measure the label text size  
    let textBB = await measureText(svg, label, opt);
    //define the label position 
    let lbPos = {};
    lbPos.width = textBB.width + 10;
    lbPos.height = textBB.height + 10;
    lbPos.left = pt.point.x - lbPos.width - 10 > 0 ? Math.floor(pt.point.x - lbPos.width - 10) : Math.floor(pt.point.x + 10);
    lbPos.top = Math.floor(pt.point.y - lbPos.height - 10);
    let id = "linechart-label-value";
    // create the label
    createLabel(svg, id, label, lbPos, color, opt);
};
const createLabel = (svg, id, label, lbPos, color, opt) => {
    // create a group
    let gEl = createSVGElement('g', svg);
    gEl.setAttributeNS(null, 'id', id);
    let rectEl = createSVGElement('rect', gEl);
    rectEl.setAttributeNS(null, 'x', lbPos.left.toString());
    rectEl.setAttributeNS(null, 'y', lbPos.top.toString());
    rectEl.setAttributeNS(null, 'width', lbPos.width.toString());
    rectEl.setAttributeNS(null, 'height', lbPos.height.toString());
    rectEl.setAttributeNS(null, 'stroke', color);
    rectEl.setAttributeNS(null, 'fill', '#ffffff');
    rectEl.setAttributeNS(null, 'fill-opacity', '0.85');
    let textEl = createSVGElement('text', gEl);
    //define xtext
    let xtext = lbPos.left + lbPos.width / 2;
    let ytext = lbPos.top + 3 * lbPos.height / 4;
    textEl.setAttributeNS(null, 'x', xtext.toString());
    textEl.setAttributeNS(null, 'y', ytext.toString());
    elementSVGOptions(opt, textEl, 'text');
    textEl.textContent = label;
};
const createLegendLines = (gEl, names, colors, thicknesses, data, winWidth, ypos, optLg) => {
    let itemsPlaced = 0;
    let pos1;
    let pos2;
    let pos3;
    let optLine;
    let yLine = ypos;
    for (let i = 0; i < data.nLines; i++) {
        for (let j = 0; j < data.nItems; j++) {
            if (j === 0) {
                pos1 = { x: winWidth / 2 - data.lineLength / 2, y: yLine };
            }
            else {
                pos1 = { x: pos1.x + data.bBoxItem.width + 20, y: pos1.y };
            }
            pos2 = { x: pos1.x + 15, y: pos1.y };
            pos3 = { x: pos1.x + 20, y: pos1.y };
            optLine = { stroke: colors[itemsPlaced], strokeWidth: thicknesses[itemsPlaced].toString() };
            createLegendItem(gEl, pos1, pos2, optLine, names[itemsPlaced], pos3, optLg);
            itemsPlaced += 1;
            if (itemsPlaced >= names.length)
                break;
        }
        yLine += data.bBoxItem.height + 2;
    }
};
const measureLegend = (svg, winWidth, names, colors, thicknesses, optLg) => {
    // look for  the max length names
    let name = maxLegend(names);
    let dLegend = {};
    // measure legend item
    dLegend.bBoxItem = measureLegendItem(svg, name, optLg);
    // calculate number of legend items per legend line
    dLegend.nItems = Math.floor((winWidth - 20) / (dLegend.bBoxItem.width + 20));
    if (dLegend.nItems > names.length)
        dLegend.nItems = names.length;
    // calculate legend lines length
    dLegend.lineLength = dLegend.nItems * (dLegend.bBoxItem.width + 20);
    // calculate number of legend lines
    dLegend.nLines = Math.ceil(names.length / dLegend.nItems);
    // create legend lines
    let ypos = 10;
    let gEl = createSVGElement('g', svg);
    createLegendLines(gEl, names, colors, thicknesses, dLegend, winWidth, ypos, optLg);
    // calculate the legend lines BoundingClientRect
    dLegend.bBox = gEl.getBoundingClientRect();
    ;
    // remove the legend lines   
    svg.removeChild(gEl);
    return dLegend;
};
const measureLegendItem = (svg, label, opt) => {
    let optLine = {
        stroke: '#000000'
    };
    let pos1 = { x: 0, y: 0 };
    let pos2 = { x: 15, y: 0 };
    let pos3 = { x: 20, y: 0 };
    let gEl = createSVGElement('g', svg);
    createLegendItem(gEl, pos1, pos2, optLine, label, pos3, opt);
    let bb = gEl.getBoundingClientRect();
    svg.removeChild(gEl);
    return bb;
};
const createLegendItem = (g, pos1, pos2, optLine, label, pos3, optText) => {
    createLine(g, pos1, pos2, optLine);
    createText(g, label, pos3, optText);
};
const measureText = async (svg, label, opt, mockFunc) => {
    //measure the label text size
    const getBCR = mockFunc ? mockFunc : getBoundingClientRect;
    let textEl = createSVGElement('text', svg);
    textEl.setAttributeNS(null, 'x', "0");
    textEl.setAttributeNS(null, 'y', "0");
    elementSVGOptions(opt, textEl, 'text');
    textEl.textContent = label;
    let bb = await getBCR(textEl);
    svg.removeChild(textEl);
    return bb;
};
const getBoundingClientRect = (el, delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let rectBB;
            rectBB = el.getBoundingClientRect();
            resolve(rectBB);
        }, delay);
    });
};
const getSVGOptions = (options) => {
    let anchor = ["start", "middle", "end"];
    let linejoin = ["miter", "round", "bevel"];
    let linecap = ["butt", "round", "square"];
    let ret = {};
    let opt = options ? options : {};
    ret.id = opt.id ? opt.id : null;
    ret.fontFamily = opt.fontFamily ? opt.fontFamily : "Verdana";
    ret.fontSize = opt.fontSize ? opt.fontSize : "10px";
    ret.fill = opt.fill ? opt.fill : null;
    ret.fillOpacity = opt.fillOpacity ? opt.fillOpacity : null;
    ret.anchor = anchor.indexOf(opt.anchor) > -1 ? opt.anchor : null;
    ret.stroke = opt.stroke ? opt.stroke : null;
    ret.strokeWidth = opt.strokeWidth ? opt.strokeWidth : null;
    ret.strokeOpacity = opt.strokeOpacity ? opt.strokeOpacity : null;
    ret.strokeLinejoin = linejoin.indexOf(opt.strokeLinejoin) > -1 ? opt.strokeLinejoin : null;
    ret.strokeLinecap = linecap.indexOf(opt.strokeLinecap) > -1 ? opt.strokeLinecap : null;
    ret.strokeMiterlimit = opt.strokeMiterlimit ? opt.strokeMiterlimit : null;
    ret.strokeDasharray = opt.strokeDasharray ? opt.strokeDasharray : null;
    ret.strokeDashoffset = opt.strokeDashoffset ? opt.strokeDashoffset : null;
    return ret;
};
const elementSVGOptions = (opt, el, elType) => {
    let type = elType ? elType : null;
    if (opt.id !== null)
        el.setAttributeNS(null, "id", opt.id);
    if (type === 'text')
        el.setAttributeNS(null, "font-family", opt.fontFamily);
    if (type === 'text')
        el.setAttributeNS(null, "font-size", opt.fontSize);
    if (type === 'text' && opt.anchor !== null)
        el.setAttributeNS(null, "text-anchor", opt.anchor);
    if (opt.fill !== null)
        el.setAttributeNS(null, "fill", opt.fill);
    if (opt.fillOpacity !== null)
        el.setAttributeNS(null, "fill-opacity", opt.fillOpacity);
    if (opt.stroke !== null)
        el.setAttributeNS(null, "stroke", opt.stroke);
    if (opt.strokeWidth !== null)
        el.setAttributeNS(null, "stroke-width", opt.strokeWidth);
    if (opt.strokeOpacity !== null)
        el.setAttributeNS(null, "stroke-opacity", opt.strokeOpacity);
    if (opt.strokeLinejoin !== null)
        el.setAttributeNS(null, "stroke-linejoin", opt.strokeLinejoin);
    if (opt.strokeLinecap !== null)
        el.setAttributeNS(null, "stroke-linecap", opt.strokeLinecap);
    if (opt.strokeMiterlimit !== null)
        el.setAttributeNS(null, "stroke-miterlimit", opt.strokeMiterlimit);
    if (opt.strokeDasharray !== null)
        el.setAttributeNS(null, "stroke-dasharray", opt.strokeDasharray);
    if (opt.strokeDashoffset !== null)
        el.setAttributeNS(null, "stroke-dashoffset", opt.strokeDashoffset);
};
const textScale = (text, window, padding) => {
    if (text < window - 2 * padding)
        return 1;
    return Number(((window - 2 * padding) / text).toFixed(4));
};
const axisNiceNumber = (x, round, min) => {
    let exp = Math.floor(Math.log(x) / Math.LN10);
    let f = x / Math.pow(10, exp);
    let nf;
    if (round) {
        if (f < 2)
            nf = 0.5;
        else if (f < 5)
            nf = 1;
        else
            nf = 2;
    }
    else {
        if (f < 1.5)
            nf = 1.5;
        else if (f < 2)
            nf = 2;
        else if (f < 3)
            nf = 3;
        else if (f < 4)
            nf = 4;
        else if (f < 5)
            nf = 5;
        else if (f < 6)
            nf = 6;
        else if (f < 7)
            nf = 7;
        else
            nf = 10;
        if (min)
            nf -= 1;
    }
    return Number((nf * Math.pow(10, exp)).toFixed(20));
};
const axisGetNumber = (x, interval, round, min) => {
    if (interval === 0)
        return axisNiceNumber(x, round, min);
    if (round) {
        return interval;
    }
    else {
        if (min) {
            return interval * Math.floor(x / interval);
        }
        else {
            return interval * (Math.floor(x / interval) + 1);
        }
    }
};
const axisMaxArrayAttribute = (arr, attr) => {
    let max;
    if (arr[0].dataPoints[0][attr] != null) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].dataPoints.length; j++) {
                if (!max || parseInt(arr[i].dataPoints[j][attr]) > parseInt(max[attr]))
                    max = arr[i].dataPoints[j];
            }
        }
        return max;
    }
    else {
        return null;
    }
};
const axisMinArrayAttribute = (arr, attr) => {
    let min;
    if (arr[0].dataPoints[0][attr] != null) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].dataPoints.length; j++) {
                if (!min || parseInt(arr[i].dataPoints[j][attr]) < parseInt(min[attr]))
                    min = arr[i].dataPoints[j];
            }
        }
        return min;
    }
    else {
        return null;
    }
};
const axisMaxArrayLabel = (arr, attr) => {
    let max = null;
    if (arr[0].dataPoints[0][attr] != null) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].dataPoints.length; j++) {
                if (!max || arr[i].dataPoints[j][attr].length > max[attr].length)
                    max = arr[i].dataPoints[j];
            }
        }
        return max;
    }
    else {
        return null;
    }
};
const maxLegend = (arr) => {
    let max = null;
    for (let i = 0; i < arr.length; i++) {
        if (!max || arr[i].length > max.length) {
            max = arr[i];
        }
    }
    return max;
};
const axisRange = (arr, axis, interval, zero) => {
    let lenAxis = {};
    if (axis === "label" && arr[0].dataPoints[0].label) {
        lenAxis.label = axisMaxArrayLabel(arr, "label").label;
        lenAxis.type = 'string';
        if (interval != 0)
            lenAxis.interval = interval;
    }
    else if (axis === "x" && typeof arr[0].dataPoints[0].x === 'string') {
        lenAxis.label = axisMaxArrayLabel(arr, "x").x;
        lenAxis.type = 'string';
        if (interval != 0)
            lenAxis.interval = interval;
    }
    else if ((axis === "x" && typeof arr[0].dataPoints[0].x === 'number') || axis === "y") {
        let maxAxis;
        let minAxis;
        lenAxis.type = 'number';
        if (axis === "y") {
            maxAxis = axisMaxArrayAttribute(arr, axis).y;
            minAxis = axisMinArrayAttribute(arr, axis).y;
        }
        if (axis === "x") {
            maxAxis = axisMaxArrayAttribute(arr, axis).x;
            minAxis = axisMinArrayAttribute(arr, axis).x;
        }
        if (maxAxis > 0 && minAxis >= 0) {
            lenAxis.top = axisGetNumber(maxAxis, interval, false, false);
            if (zero) {
                lenAxis.bottom = 0;
                lenAxis.interval = axisGetNumber(maxAxis, interval, true, false);
            }
            else {
                lenAxis.bottom = axisGetNumber(minAxis, interval, false, true);
                ;
                lenAxis.interval = axisGetNumber(maxAxis - minAxis, interval, true, false);
            }
            lenAxis.length = lenAxis.top - lenAxis.bottom;
        }
        if (maxAxis > 0 && minAxis < 0) {
            lenAxis.top = axisGetNumber(maxAxis, interval, false, false);
            lenAxis.interval = axisGetNumber(maxAxis, interval, true, false);
            lenAxis.bottom = -Math.ceil(-minAxis / lenAxis.interval) * lenAxis.interval;
            lenAxis.length = lenAxis.top - lenAxis.bottom;
        }
        if (maxAxis <= 0) {
            if (zero) {
                lenAxis.top = 0;
                lenAxis.interval = -axisGetNumber(-minAxis, interval, true, false);
            }
            else {
                lenAxis.top = -axisGetNumber(-maxAxis, interval, false, true);
                lenAxis.interval = -axisGetNumber(-(minAxis - maxAxis), interval, true, false);
            }
            lenAxis.bottom = -axisGetNumber(-minAxis, interval, false, false);
            lenAxis.length = lenAxis.top - lenAxis.bottom;
        }
    }
    return lenAxis;
};
const axisConvertY = (cRect, aLength, s) => {
    return cRect.top + (aLength.top - s) * (cRect.height) / aLength.length;
};
const axisConvertX = (cRect, aLength, s) => {
    return cRect.left + (s - aLength.bottom) * (cRect.width) / aLength.length;
};
const removeChilds = (el) => {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
};
const getNearest = (values, pt) => {
    let value = null;
    let min = 1.0e20;
    for (let l = 0; l < values.length; l++) {
        for (let i = 0; i < values[l].length; i++) {
            let dist = scalarDistance(values[l][i], pt);
            if (dist < min) {
                value = { line: l, index: i, point: values[l][i] };
                min = dist;
            }
        }
    }
    return value;
};
const scalarDistance = (val, pt) => {
    return Math.sqrt((val.x - pt.x) * (val.x - pt.x) + (val.y - pt.y) * (val.y - pt.y));
};
const getTotalLength = (arr) => {
    let length = 0;
    for (let i = 1; i < arr.length; i++) {
        length += scalarDistance(arr[i], arr[i - 1]);
    }
    return length;
};

const JeepLinechart = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.toggle = false;
        this._update = false;
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
    parseXTitleProp(newValue) {
        this.innerXTitle = newValue ? newValue : null;
    }
    parseYTitleProp(newValue) {
        this.innerYTitle = newValue ? newValue : null;
    }
    parseDataProp(newValue) {
        const data = newValue ? newValue : null;
        let dataSets = [];
        let status = { status: 200 };
        if (data != null) {
            let inpData = JSON.parse(data);
            let objData = [];
            if (inpData instanceof Array) {
                objData = inpData;
            }
            else {
                objData.push(inpData);
            }
            this._axisType = [];
            this._legendNames = [];
            this._legendColors = [];
            this._legendThicknesses = [];
            if (objData.length >= 1 && Object.keys(objData[0]).length >= 1) {
                for (let i = 0; i < objData.length; i++) {
                    if (objData[i].dataPoints) {
                        let dataSet = {};
                        dataSet.color = objData[i].color ? objData[i].color : "#000000";
                        dataSet.name = objData[i].name ? objData[i].name : null;
                        dataSet.lineThickness = objData[i].lineThickness ? objData[i].lineThickness : 1;
                        dataSet.markerType = objData[i].markerType ? objData[i].markerType : "none";
                        dataSet.markerColor = objData[i].markerColor ? objData[i].markerColor : dataSet.color;
                        dataSet.markerSize = objData[i].markerSize ? objData[i].markerSize : 10;
                        dataSet.dataPoints = objData[i].dataPoints;
                        this._legendThicknesses.push(dataSet.lineThickness);
                        this._legendColors.push(dataSet.color);
                        if (dataSet.name !== null)
                            this._legendNames.push(dataSet.name);
                        if (!dataSet.dataPoints[0].x) {
                            dataSets = null;
                            status = { status: 400, message: "Error: no x data in dataset: " + i + " of data property" };
                        }
                        else if (!dataSet.dataPoints[0].y) {
                            dataSets = null;
                            status = { status: 400, message: "Error: no y data in dataset: " + i + " of data property" };
                        }
                        else {
                            if (i === 0) {
                                if (dataSet.dataPoints[0].x)
                                    this._axisType.push("x");
                                if (dataSet.dataPoints[0].y)
                                    this._axisType.push("y");
                            }
                            dataSets.push(dataSet);
                        }
                    }
                    else {
                        dataSets = null;
                        status = { status: 400, message: "Error: no dataPoints object in dataset: " + i + " of data property" };
                    }
                }
                if (status.status === 200 && dataSets && dataSets.length > 1 && dataSets.length !== this._legendNames.length) {
                    dataSets = null;
                    status = { status: 400, message: "Error: name attribute missing in some datasets" };
                }
            }
            else {
                dataSets = null;
                status = { status: 400, message: "Error: no data provided" };
            }
        }
        else {
            dataSets = null;
            status = { status: 400, message: "Error: no data property" };
        }
        this.status = status;
        this.innerData = this.status.status === 200 ? [...dataSets] : null;
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
        return Promise.resolve(this._init());
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
    async _init() {
        // init some variables
        this.document = this.window.document;
        this.root = this.document.documentElement;
        this.window.addEventListener('resize', debounce(this, this._windowResize, 100, false), false);
        this._selMarker = [];
        this._axisType = [];
        this._legendRect = {};
        this._update = false;
        this._dataColor = false;
        this._yaxis = {};
        this._xaxis = {};
        this._legendRect = {};
        let filteredAxisX = [];
        filteredAxisX = this._axisType.filter(element => element === "label");
        this._label = false;
        if (filteredAxisX[0] === "label") {
            this._label = true;
        }
        this._showTarget = 0;
        this._mouseStart = false;
        this._xmlns = "http://www.w3.org/2000/svg";
        this._xlink = 'http://www.w3.org/1999/xlink';
        // reading properties
        this.parseTitleProp(this.ctitle ? this.ctitle : null);
        this.parseSubTitleProp(this.subtitle ? this.subtitle : null);
        this.parseXTitleProp(this.xtitle ? this.xtitle : null);
        this.parseYTitleProp(this.ytitle ? this.ytitle : null);
        this.parseAnimationProp(this.animation ? this.animation : false);
        this.parseBorderProp(this.cborder ? this.cborder : false);
        this.parseStyleProp(this.cstyle ? this.cstyle : null);
        this.parseDelayProp(this.delay ? this.delay : "100");
        // reading global css properties
        this._prop.topPlot = this._prop.topPlot ? this._prop.topPlot : this._setPropertyValue('--chart-top', this.window.getComputedStyle(this.root).getPropertyValue('--chart-top'));
        this._prop.leftPlot = this._prop.leftPlot ? this._prop.leftPlot : this._setPropertyValue('--chart-left', this.window.getComputedStyle(this.root).getPropertyValue('--chart-left'));
        this._prop.widthPlot = this._prop.widthPlot ? this._prop.widthPlot : this._setPropertyValue('--chart-width', this.window.getComputedStyle(this.root).getPropertyValue('--chart-width'));
        this._prop.heightPlot = this._prop.heightPlot ? this._prop.heightPlot : this._setPropertyValue('--chart-height', this.window.getComputedStyle(this.root).getPropertyValue('--chart-height'));
        this._prop.bgColor = this._prop.bgColor ? this._prop.bgColor : this._setPropertyValue('--chart-background-color', this.window.getComputedStyle(this.root).getPropertyValue('--chart-background-color'));
        this._prop.tiColor = this._setPropertyValue('--chart-title-color', this.window.getComputedStyle(this.root).getPropertyValue('--chart-title-color'));
        this._prop.stColor = this._setPropertyValue('--chart-subtitle-color', this.window.getComputedStyle(this.root).getPropertyValue('--chart-subtitle-color'));
        this._prop.ftFamily = this._setPropertyValue('--chart-font-family', this.window.getComputedStyle(this.root).getPropertyValue('--chart-font-family'));
        this._prop.ftTiSize = this._setPropertyValue('--chart-title-font-size', this.window.getComputedStyle(this.root).getPropertyValue('--chart-title-font-size'));
        this._prop.ftSTSize = this._setPropertyValue('--chart-subtitle-font-size', this.window.getComputedStyle(this.root).getPropertyValue('--chart-subtitle-font-size'));
        this._prop.axColor = this._setPropertyValue('--chart-axis-color', this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-color'));
        this._prop.lnColor = this._setPropertyValue('--chart-line-color', this.window.getComputedStyle(this.root).getPropertyValue('--chart-line-color'));
        this._prop.atColor = this._setPropertyValue('--chart-axis-title-color', this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-title-color'));
        this._prop.lbColor = this._setPropertyValue('--chart-label-color', this.window.getComputedStyle(this.root).getPropertyValue('--chart-label-color'));
        this._prop.ftLbSize = this._setPropertyValue('--chart-label-font-size', this.window.getComputedStyle(this.root).getPropertyValue('--chart-label-font-size'));
        this._prop.ftATSize = this._setPropertyValue('--chart-axis-title-font-size', this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-title-font-size'));
        this._prop.ftSTSize = this._setPropertyValue('--chart-subtitle-font-size', this.window.getComputedStyle(this.root).getPropertyValue('--chart-subtitle-font-size'));
        this._prop.tickX = this._setPropertyValue('--chart-tick-x-length', this.window.getComputedStyle(this.root).getPropertyValue('--chart-tick-x-length'));
        this._prop.tickY = this._setPropertyValue('--chart-tick-y-length', this.window.getComputedStyle(this.root).getPropertyValue('--chart-tick-y-length'));
        this._prop.gridX = this._setPropertyValue('--chart-grid-x', this.window.getComputedStyle(this.root).getPropertyValue('--chart-grid-x'));
        this._prop.xInterval = this._setPropertyValue('--chart-axis-x-interval', this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-x-interval'));
        this._prop.yInterval = this._setPropertyValue('--chart-axis-y-interval', this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-y-interval'));
        this._prop.xZero = this._setPropertyValue('--chart-axis-x-zero', this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-x-zero'));
        this._prop.yZero = this._setPropertyValue('--chart-axis-y-zero', this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-y-zero'));
        this._prop.animDuration = this._setPropertyValue('--chart-animation-duration', this.window.getComputedStyle(this.root).getPropertyValue('--chart-animation-duration'));
        this._prop.legendTop = this._setPropertyValue('--chart-legend-top', this.window.getComputedStyle(this.root).getPropertyValue('--chart-legend-top'));
        this._prop.ftLgSize = this._setPropertyValue('--chart-legend-font-size', this.window.getComputedStyle(this.root).getPropertyValue('--chart-legend-font-size'));
        this._prop.bdColor = this._setPropertyValue('--chart-border-color', this.window.getComputedStyle(this.root).getPropertyValue('--chart-border-color'));
        this._prop.bdWidth = this._setPropertyValue('--chart-border-width', this.window.getComputedStyle(this.root).getPropertyValue('--chart-border-width'));
        // reading instance css properties if any
        if (this.innerStyle != null) {
            const propInstance = getCssPropertyFromString(this.innerStyle);
            if (propInstance != null) {
                this._prop.leftPlot = propInstance.left ? propInstance.left : this._prop.leftPlot;
                this._prop.topPlot = propInstance.top ? propInstance.top : this._prop.topPlot;
                this._prop.widthPlot = propInstance.width ? propInstance.width : this._prop.widthPlot;
                this._prop.heightPlot = propInstance.height ? propInstance.height : this._prop.heightPlot;
                this._prop.bgColor = propInstance.backgroundcolor ? propInstance.backgroundcolor : this._prop.bgColor;
            }
        }
        // reading data          
        this.parseDataProp(this.data ? this.data : null);
        // get window size and set the container size
        this._wSize = await this.getWindowSize();
        this._setContainerSize();
    }
    _setContainerSize() {
        this.w_width = getDim(this._prop.widthPlot, this._wSize.width, "0");
        this.w_height = getDim(this._prop.heightPlot, this._wSize.height, "0");
        this.el.style.setProperty('--top', this._prop.topPlot);
        this.el.style.setProperty('--left', this._prop.leftPlot);
        this.el.style.setProperty('--width', `${this.w_width}px`);
        this.el.style.setProperty('--height', `${this.w_height}px`);
        this.el.style.setProperty('--backgroundcolor', `${this._prop.bgColor}`);
        this._titleRect = null;
        this._chartRect = { top: 0, left: 0, width: this.w_width, height: this.w_height };
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
        else if (name.slice(-4) === 'zero') {
            return value ? value : "true";
        }
        else if (name.slice(-10) === 'legend-top') {
            return value ? value : "false";
        }
        else if (name.slice(-8) === 'duration') {
            return value ? value : "1s";
        }
        else {
            return value ? value : "0";
        }
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
    /* ---- Deal with Chart SVG Elements  */
    _createMarkers() {
        let defs = createSVGElement('defs', this.svg);
        let opt = {};
        opt.id = "marker-circle";
        opt.viewbox = "0 0 10 10";
        // markerType Circle size 10x10
        let d = "M0,5 A5,5 0 1,1 10,5 A5,5 0 0,1 0,5 Z";
        createMarker(defs, d, opt);
        // markerType Square size 10x10
        opt.id = "marker-square";
        d = "M0,0 L10,0 L10,10 L0,10 Z";
        createMarker(defs, d, opt);
        // markerType Triangle size 10x10
        opt.id = "marker-triangle";
        d = "M5,0 L10,10 L0,10 Z";
        createMarker(defs, d, opt);
        // markerType Cross size 10x10
        opt.id = "marker-cross";
        d = "M0,2 L2,0 L5,3 L8,0 L10,2 L7,5 L10,8 L8,10 L5,7 L2,10 L0,8 L3,5 Z";
        createMarker(defs, d, opt);
        // markerType Plus size 10x10
        opt.id = "marker-plus";
        d = "M0,4 L4,4 L4,0 L6,0 L6,4 L10,4 L10,6 L6,6 L6,10 L4,10 L4,6 L0,6 Z";
        createMarker(defs, d, opt);
    }
    _createTitle() {
        if (this.innerTitle != null) {
            let g;
            let textEl;
            if (!this._update) {
                g = createSVGElement('g', this.svg);
                ;
                g.setAttributeNS(null, "id", "linechart-title");
            }
            else {
                g = this.svg.querySelector("#linechart-title");
                g.removeAttributeNS(null, 'transform');
            }
            let opt = {
                id: "linechart-title-text",
                fontFamily: this._prop.ftFamily,
                fontSize: this._prop.ftTiSize,
                fill: this._prop.tiColor,
                anchor: "middle"
            };
            // x centered y padding 10px
            let pos = { x: Math.round(this.w_width / 2), y: convertCSSNumber(this._prop.ftTiSize) + 10 };
            if (!this._update) {
                textEl = createText(g, this.innerTitle, pos, opt);
            }
            else {
                textEl = updateText(this.svg, opt.id, opt.anchor, pos);
            }
            if (this.innerSubTitle != null) {
                const bb = textEl.getBoundingClientRect();
                opt.id = "linechart-subtitle-text";
                opt.fontSize = this._prop.ftSTSize;
                opt.fill = this._prop.stColor;
                let y = Math.ceil(bb.bottom - this.borderBB.top) + 5;
                pos = { x: Math.round(this.w_width / 2), y: y + 10 };
                if (!this._update) {
                    createText(g, this.innerSubTitle, pos, opt);
                }
                else {
                    updateText(this.svg, opt.id, opt.anchor, pos);
                }
            }
            const sbb = g.getBoundingClientRect();
            let scale = textScale(sbb.width, this.w_width, 10);
            let transf = 'translate(' + Math.round(10 - sbb.left * scale) + ',0) ' + 'scale(' + scale + ',' + scale + ')';
            if (scale != 1)
                g.setAttributeNS(null, "transform", transf);
            const sbbt = g.getBoundingClientRect();
            this._titleRect = { left: sbbt.left - this.borderBB.left, top: sbbt.top - this.borderBB.top, width: sbbt.width, height: sbbt.height };
        }
    }
    _createAxis() {
        let tickXL = convertCSSNumber(this._prop.tickX);
        let tickYL = convertCSSNumber(this._prop.tickY);
        let intervalX = parseFloat(this._prop.xInterval);
        let intervalY = parseFloat(this._prop.yInterval);
        let g;
        if (!this._update) {
            g = createSVGElement('g', this.svg);
            ;
            g.setAttributeNS(this._xmlns, "id", "linechart-axes");
        }
        else {
            g = this.svg.querySelector("#linechart-axes");
        }
        this._initChartRect();
        if (this.innerData.length > 1)
            this._createLegend();
        let gTY = this._createTitleY();
        let gTX = this._createTitleX();
        // find the axes range
        this._lenY = axisRange(this.innerData, "y", intervalY, convertCSSBoolean(this._prop.yZero));
        if (this._label) {
            this._lenX = axisRange(this.innerData, "label", intervalX);
        }
        else {
            this._lenX = axisRange(this.innerData, "x", intervalX, convertCSSBoolean(this._prop.xZero));
        }
        // calculate the label sizes
        let labelYSize = this._labelSize(this._lenY, 0);
        this._x_axy = 3 + labelYSize.width + 2 + tickYL;
        this._nXlines = this.innerData[0].dataPoints.length;
        if (this._lenX.interval && this._lenX.type === 'number') {
            this._nXlines = Math.abs(Math.floor(this._lenX.length / this._lenX.interval)) + 1;
        }
        let xLength = this._chartRect.width - this._x_axy;
        this._xInterval = Math.floor(xLength / this._nXlines);
        if (this._lenX.interval && this._lenX.type === 'number') {
            this._xInterval = xLength / (this._nXlines - 1);
        }
        let lbldist = this._xInterval;
        if (this._lenX.interval && this._lenX.type === 'string') {
            this._nXlines = Math.abs(Math.floor(this.innerData[0].dataPoints.length / this._lenX.interval));
            lbldist = xLength / (this._nXlines);
        }
        this._labelRotate = false;
        let labelXSize = this._labelSize(this._lenX, 0);
        if (labelXSize.width > lbldist - 10) {
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
            id: "linechart-yaxis",
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
            id: "linechart-ylabel0",
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
            opt.id = "linechart-yLine" + s.toString();
            opt.stroke = this._prop.lnColor;
            if (i === this._nYlines - 1) {
                opt.id = "linechart-xaxis";
                opt.stroke = this._prop.axColor;
            }
            optLabel.id = "linechart-ylabel" + s.toString();
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
                opt.id = "linechart-ytick" + s.toString();
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
        let xAxisEl = this.svg.querySelector("#linechart-xaxis");
        let y = parseFloat(xAxisEl.getAttribute("y1"));
        let x = Math.floor(this._xInterval / 2);
        if (this._lenX.interval && this._lenX.type === 'number')
            x = 0;
        optLabel = {
            id: "linechart-xlabel",
            stroke: this._prop.lbColor,
            strokeWidth: "1",
            fontFamily: this._prop.ftFamily,
            fontSize: this._prop.ftLbSize,
            anchor: "middle"
        };
        yft = Math.floor(convertCSSNumber(this._prop.ftLbSize));
        for (let i = 0; i < this._nXlines; i++) {
            let s = this._lenX.bottom + i * Math.abs(this._lenX.interval);
            let posx1 = { x: this._yaxis.left + x, y: y };
            // GridX Line
            if (convertCSSBoolean(this._prop.gridX)) {
                opt.id = "linechart-xLine" + i.toString();
                if (this._lenX.interval && this._lenX.type === 'number') {
                    opt.id = "linechart-xLine" + s.toString();
                }
                if (this._lenX.interval && this._lenX.type === 'string') {
                    opt.id = "linechart-xLine" + (i * this._lenX.interval).toString();
                }
                opt.stroke = this._prop.lnColor;
                let posx2 = { x: this._yaxis.left + x, y: this._yaxis.top };
                if (!this._lenX.interval || i >= 1 || this._lenX.type != 'number') {
                    if (!this._update) {
                        createLine(g, posx1, posx2, opt);
                    }
                    else {
                        updateLine(this.svg, opt.id, posx1, posx2);
                    }
                }
            }
            // tick
            if (tickXL > 0) {
                let postk = { x: this._yaxis.left + x, y: y + tickXL };
                opt.id = "linechart-xtick" + i.toString();
                if (this._lenX.interval && this._lenX.type === 'number') {
                    opt.id = "linechart-xtick" + s.toString();
                }
                if (this._lenX.interval && this._lenX.type === 'string') {
                    opt.id = "linechart-xtick" + (i * this._lenX.interval).toString();
                }
                if (!this._update) {
                    createLine(g, posx1, postk, opt);
                }
                else {
                    updateLine(this.svg, opt.id, posx1, postk);
                }
            }
            // label
            let labx;
            if (this._lenX.type === 'string') {
                let x_inter = typeof this._lenX.interval != "undefined" ? this._lenX.interval : 1;
                labx = this.innerData[0].dataPoints[i * x_inter].x;
            }
            else {
                labx = s.toString();
            }
            optLabel.id = "linechart-xlabel" + labx;
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
            if (this._lenX.interval && this._lenX.type === 'string') {
                x += this._xInterval * this._lenX.interval;
            }
            else {
                x += this._xInterval;
            }
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
    _initChartRect() {
        this._chartRect.top = 20; //20px below
        if (this._titleRect != null)
            this._chartRect.top += Math.round(this._titleRect.height);
        this._chartRect.left = 0;
        this._chartRect.width = this.w_width - this._chartRect.left - 20; // 20px right
        this._chartRect.height = this.w_height - this._chartRect.top; // 20px bottom
    }
    _createLegend() {
        let g;
        let rect = {};
        let optLg = {
            fontFamily: this._prop.ftFamily,
            fontSize: this._prop.ftLgSize,
            anchor: 'start',
        };
        let dLegend = measureLegend(this.svg, this.w_width, this._legendNames, this._legendColors, this._legendThicknesses, optLg);
        rect.left = dLegend.bBox.left;
        rect.width = dLegend.bBox.width;
        if (convertCSSBoolean(this._prop.legendTop)) {
            rect.top = this._chartRect.top + 15;
            this._chartRect.top += Math.ceil(dLegend.bBox.height) + 15;
        }
        else {
            rect.top = Math.floor(this._chartRect.top + this._chartRect.height - dLegend.bBox.height);
        }
        rect.height = dLegend.bBox.height;
        this._chartRect.height -= Math.floor(dLegend.bBox.height) + 10;
        if (!this._update) {
            g = createSVGElement('g', this.svg);
            ;
            g.setAttributeNS(null, "id", "linechart-legend");
            createLegendLines(g, this._legendNames, this._legendColors, this._legendThicknesses, dLegend, this.w_width, rect.top, optLg);
        }
        else {
            g = this.svg.querySelector("#linechart-legend");
            removeChilds(g);
            createLegendLines(g, this._legendNames, this._legendColors, this._legendThicknesses, dLegend, this.w_width, rect.top, optLg);
        }
    }
    _createTitleY() {
        let g;
        let opt = {
            id: "linechart-ytitle-text",
            fontFamily: this._prop.ftFamily,
            fontSize: this._prop.ftATSize,
            fill: this._prop.atColor,
            anchor: "middle"
        };
        if (this.innerYTitle != null) {
            let textEl;
            if (!this._update) {
                g = createSVGElement('g', this.svg);
                ;
                g.setAttributeNS(null, "id", "linechart-ytitle");
            }
            else {
                g = this.svg.querySelector("#linechart-ytitle");
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
            id: "linechart-xtitle-text",
            fontFamily: this._prop.ftFamily,
            fontSize: this._prop.ftATSize,
            fill: this._prop.atColor,
            anchor: "middle"
        };
        if (this.innerXTitle != null) {
            let g;
            if (!this._update) {
                g = createSVGElement('g', this.svg);
                ;
                g.setAttributeNS(null, "id", "linechart-xtitle");
            }
            else {
                g = this.svg.querySelector("#linechart-xtitle");
            }
            let y = this._chartRect.top + this._chartRect.height - 15;
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
    _createLine() {
        let g;
        this._Points = [];
        if (!this._update) {
            g = createSVGElement('g', this.svg);
            g.setAttributeNS(null, "id", "linechart-data");
        }
        else {
            g = this.svg.querySelector("#linechart-data");
        }
        for (let l = 0; l < this.innerData.length; l++) {
            let viewPt = [];
            let opt = {};
            opt.stroke = this.innerData[l].color;
            opt.strokeWidth = this.innerData[l].lineThickness.toString();
            opt.fill = 'none';
            opt.id = "linechart-data-" + l.toString();
            let points;
            let plEl;
            this._xaxis.left = this._yaxis.left;
            this._xaxis.width = this._chartRect.left + this._chartRect.width - this._xaxis.left;
            let x = Math.floor(this._xInterval / 2);
            for (let i = 0; i < this.innerData[l].dataPoints.length; i++) {
                opt.stroke = this.innerData[l].dataPoints[i].color ? this.innerData[l].dataPoints[i].color : this.innerData[l].color;
                let pt = {};
                pt.y = axisConvertY(this._yaxis, this._lenY, this.innerData[l].dataPoints[i].y);
                if (this._lenX.interval && this._lenX.type === 'number') {
                    pt.x = axisConvertX(this._xaxis, this._lenX, this.innerData[l].dataPoints[i].x);
                }
                else {
                    pt.x = this._xaxis.left + x;
                }
                viewPt.push(pt);
                let scale = this.innerData[l].markerSize / 10;
                this._placeMarker("marker-" + this.innerData[l].markerType, g, pt, l, i, scale, this.innerData[l].markerColor);
                if (i === 0) {
                    points = pt.x.toString() + ',' + pt.y.toString();
                }
                else {
                    points += ' ' + pt.x.toString() + ',' + pt.y.toString();
                }
                x += this._xInterval;
            }
            opt.strokeLinejoin = 'round';
            opt.strokeLinecap = 'round';
            opt.strokeMiterlimit = '10';
            let length = getTotalLength(viewPt);
            if (!this._update) {
                plEl = createPolyline(g, points, opt);
            }
            else {
                plEl = updatePolyline(this.svg, opt.id, points);
            }
            if (this.innerAnimation) {
                plEl.setAttributeNS(null, "stroke-dasharray", length.toString() + ',' + length.toString());
                plEl.setAttributeNS(null, "stroke-dashoffset", length.toString());
                this._setAnimation(plEl, length.toString(), this._prop.animDuration);
            }
            this._Points.push(viewPt);
        }
    }
    _setAnimation(el, length, duration) {
        let animOpt = {};
        animOpt.attributeName = "stroke-dashoffset";
        animOpt.from = length;
        animOpt.to = "0";
        animOpt.dur = duration;
        animOpt.fill = "freeze";
        createAnimation(el, animOpt);
    }
    _placeMarker(id, g, pt, line, index, scale, color) {
        let use;
        let symb;
        if (!this._update) {
            symb = createSVGElement('g', g);
            use = createSVGElement('use', symb);
        }
        else {
            symb = g.querySelector("#" + id + '-g-' + line.toString() + '-' + index.toString());
            use = symb.querySelector("#" + id + '-' + line.toString() + '-' + index.toString());
        }
        symb.setAttributeNS(null, 'id', id + '-g-' + line.toString() + '-' + index.toString());
        symb.setAttribute('style', 'fill:' + color);
        use.setAttributeNS(this._xlink, "xlink:href", "#" + id);
        use.setAttributeNS(null, 'id', id + '-' + line.toString() + '-' + index.toString());
        use.setAttributeNS(null, 'x', (pt.x - 5).toString());
        use.setAttributeNS(null, 'y', (pt.y - 5).toString());
        use.setAttributeNS(null, 'width', "10");
        use.setAttributeNS(null, 'height', "10");
        this._scaleMarker(use, scale, pt);
    }
    _scaleMarker(use, scale, pt) {
        let s = 1 - scale;
        let trans = {};
        trans.x = s * pt.x;
        trans.y = s * pt.y;
        let transform = "translate(" + trans.x.toString() + "," + trans.y.toString() + ") scale(" + scale + ")";
        use.setAttributeNS(null, 'transform', transform);
    }
    _highlightMarker(marker, unhigh) {
        let transform = marker.getAttributeNS(null, 'transform');
        let pt = {};
        pt.x = parseFloat(marker.getAttributeNS(null, 'x')) + 5; // symbol 10px-10px
        pt.y = parseFloat(marker.getAttributeNS(null, 'y')) + 5;
        let curScale = 1.0;
        if (transform != null) {
            curScale = parseFloat(transform.split("scale(")[1].slice(0, -1));
        }
        if (unhigh) {
            this._scaleMarker(marker, curScale / 1.5, pt);
        }
        else {
            this._scaleMarker(marker, curScale * 1.5, pt);
        }
    }
    _waitRemoveLabel() {
        if (this._mouseStart) {
            setTimeout(() => {
                this._removeLabel(this.svg);
                this._mouseStart = false;
                this._showTarget = 0;
            }, 1200);
        }
    }
    _removeLabel(svg) {
        // remove label
        let gElems = svg.querySelectorAll("#linechart-label-value");
        if (gElems.length > 0) {
            for (let i = 0; i < gElems.length; i++) {
                removeChilds(gElems[i]);
                svg.removeChild(gElems[i]);
            }
        }
        // unhighlight marker
        if (this._selMarker.length > 0) {
            for (let i = 0; i < this._selMarker.length; i++) {
                let marker = this.svg.querySelector(this._selMarker[i]);
                this._highlightMarker(marker, true);
            }
        }
        this._selMarker = [];
    }
    /* ---- Deal with handling event  */
    _handleTouchDown(evt) {
        evt.preventDefault();
        this._mouseStart = true;
        let pt = { x: evt.touches[0].pageX, y: evt.touches[0].pageY };
        this._handleEventTarget(evt, pt);
    }
    _handleMouseDown(evt) {
        evt.preventDefault();
        this._mouseStart = true;
        let pt = { x: evt.pageX, y: evt.pageY };
        this._handleEventTarget(evt, pt);
    }
    _handleTouchUp(evt) {
        evt.preventDefault();
        this._waitRemoveLabel();
    }
    _handleMouseUp(evt) {
        evt.preventDefault();
        this._waitRemoveLabel();
    }
    _handleEventTarget(evt, pt) {
        this._showTarget = evt.target;
        // if a label exists remove it
        pt.x -= this.borderBB.left;
        pt.y -= this.borderBB.top;
        this._removeLabel(this.svg);
        let nearestPoint = getNearest(this._Points, pt);
        let data = this.innerData[nearestPoint.line].dataPoints[nearestPoint.index];
        let mName = "#marker-" + this.innerData[nearestPoint.line].markerType + '-';
        mName += nearestPoint.line.toString() + '-' + nearestPoint.index.toString();
        this._selMarker.push(mName);
        let marker = this.svg.querySelector(mName);
        this._highlightMarker(marker, false);
        let label;
        if (typeof data.x === 'number')
            label = data.x.toString();
        if (typeof data.x === 'string')
            label = data.x;
        label = label + " : " + data.y.toString();
        let ft = 1.2 * parseFloat(this._prop.ftLbSize.split('px')[0]);
        let opt = {
            fontFamily: this._prop.ftFamily,
            fontSize: ft.toString() + 'px',
            fill: this._prop.lbColor,
            anchor: "middle"
        };
        let color = this.innerData[nearestPoint.line].color;
        createLineLabel(this.svg, label, nearestPoint, color, opt);
    }
    /* ---- Deal with rendering  */
    async _renderChart() {
        this.container = this._element.querySelector('#div-linechart-container');
        this.chart = this._element.querySelector('#div-linechart-chart');
        this.svg = this._element.querySelector('#svg-linechart');
        this.borderEl = this.svg.querySelector('#svg-border-rect');
        this.borderBB = await getBoundingClientRect(this.borderEl, this.innerDelay);
        if (this.borderBB.top != 0 || this.borderBB.left != 0 || this.borderBB.width != 0 || this.borderBB.height != 0) {
            this.container.addEventListener('touchstart', this._handleTouchDown.bind(this), false);
            this.container.addEventListener('touchend', this._handleTouchUp.bind(this), false);
            this.container.addEventListener('mousedown', this._handleMouseDown.bind(this), false);
            this.container.addEventListener('mouseup', this._handleMouseUp.bind(this), false);
            if (this.innerBorder) {
                this.borderEl.classList.remove('hidden');
            }
            this._createMarkers();
            if (this.innerTitle != null && this.innerTitle.length > 0)
                this._createTitle();
            this._createAxis();
            this._createLine();
        }
    }
    //*************************
    //* Rendering JSX Element *
    //*************************
    render() {
        if (this.status.status === 200) {
            let viewBox = `0 0 ${this.w_width.toString()} ${this.w_height.toString()}`;
            return (h(Host, null, h("div", { id: "div-linechart-container" }, h("div", { id: "div-linechart-chart" }, h("svg", { id: "svg-linechart", width: this.w_width.toString(), height: this.w_height.toString(), viewBox: viewBox }, h("rect", { id: "svg-border-rect", class: "border-rect hidden", x: "0", y: "0", width: this.w_width.toString(), height: this.w_height.toString(), stroke: this._prop.bdColor, "stroke-width": this._prop.bdWidth, fill: "none", "fill-opacity": "0" }))))));
        }
        else {
            return (h("div", { id: "div-error-message" }, h("p", { id: "p-error-message" }, this.status.message)));
        }
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "ctitle": ["parseTitleProp"],
        "subtitle": ["parseSubTitleProp"],
        "xtitle": ["parseXTitleProp"],
        "ytitle": ["parseYTitleProp"],
        "data": ["parseDataProp"],
        "cstyle": ["parseStyleProp"],
        "animation": ["parseAnimationProp"],
        "cborder": ["parseBorderProp"],
        "delay": ["parseDelayProp"]
    }; }
    static get style() { return ":host {\n    --height:200px;\n    --width:300px;\n    --top:30px;\n    --left:10px;\n    --backgroundcolor: rgb(255, 255, 255);\n}\n#div-linechart-container {\n    position:relative;\n    left:0px;\n    top:0px;\n    width:100%;\n    height:calc(var(--height) + var(--top));\n    z-index: 1;\n\n}\n#div-linechart-chart {\n    position:relative;\n    left:var(--left);\n    top:var(--top);\n    width:var(--width);\n    height:var(--height);\n    background-color:var(--backgroundcolor);\n    z-index: 1;\n}\n.hidden {\n    visibility: hidden;\n}\n#div-error-message{\n    background-color:#f89393;\n    position: absolute;\n    top: 0;\n    left: 0;\n    margin: 0 auto;\n    width: 100%;\n    height:60px;\n    line-height:60px;\n    text-align:left;\n    padding-left:10px;\n    font-size:15px;\n    font-family:Verdana;\n}\n#p-error-message {\n    display:inline-block;\n    vertical-align:middle;\n    line-height:normal;        \n}"; }
};
;

export { JeepLinechart as jeep_linechart };
