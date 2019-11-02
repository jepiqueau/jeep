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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, h, H as Host, g as getElement } from './core-fa39fbc1.js';
import { d as debounce, g as getCssPropertyFromString, a as getDim, c as convertCSSNumber, b as convertCSSBoolean } from './common-b6b7dc41.js';
var windowSize = function (window) {
    return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
    };
};
var xmlns = "http://www.w3.org/2000/svg";
var createSVGElement = function (eltype, parent) {
    var svgEl = document.createElementNS(xmlns, eltype);
    if (parent)
        parent.appendChild(svgEl);
    return svgEl;
};
var createText = function (g, text, pos, options) {
    var opt = getSVGOptions(options);
    var textEl = createSVGElement("text", g);
    textEl.setAttributeNS(null, "x", pos.x.toString());
    textEl.setAttributeNS(null, "y", pos.y.toString());
    textEl.textContent = text;
    elementSVGOptions(opt, textEl, 'text');
    return textEl;
};
var updateText = function (svg, id, anchor, pos) {
    var textEl = svg.querySelector('#' + id);
    textEl.setAttributeNS(null, "x", pos.x.toString());
    textEl.setAttributeNS(null, "y", pos.y.toString());
    textEl.setAttributeNS(null, "text-anchor", anchor);
    return textEl;
};
var createLine = function (g, pos1, pos2, options) {
    var opt = getSVGOptions(options);
    var lineEl = createSVGElement("line", g);
    lineEl.setAttributeNS(null, "x1", pos1.x.toString());
    lineEl.setAttributeNS(null, "y1", pos1.y.toString());
    lineEl.setAttributeNS(null, "x2", pos2.x.toString());
    lineEl.setAttributeNS(null, "y2", pos2.y.toString());
    elementSVGOptions(opt, lineEl);
    return lineEl;
};
var updateLine = function (svg, id, pos1, pos2) {
    var lineEl = svg.querySelector('#' + id);
    lineEl.setAttributeNS(null, "x1", pos1.x.toString());
    lineEl.setAttributeNS(null, "y1", pos1.y.toString());
    lineEl.setAttributeNS(null, "x2", pos2.x.toString());
    lineEl.setAttributeNS(null, "y2", pos2.y.toString());
    return lineEl;
};
var createPolyline = function (g, points, options) {
    var opt = getSVGOptions(options);
    var plineEl = createSVGElement('polyline', g);
    plineEl.setAttributeNS(null, "points", points);
    elementSVGOptions(opt, plineEl);
    return plineEl;
};
var updatePolyline = function (svg, id, points) {
    var plineEl = svg.querySelector('#' + id);
    plineEl.setAttributeNS(null, "points", points);
    return plineEl;
};
var createMarker = function (defs, d, opt) {
    var g = createSVGElement('g', defs);
    g.setAttribute("id", opt.id);
    g.setAttribute('viewbox', opt.viewbox);
    var path = createSVGElement('path', g);
    path.setAttribute('d', d);
};
var createAnimation = function (el, anim) {
    var animEl = createSVGElement('animate', el);
    animEl.setAttributeNS(null, "attributeName", anim.attributeName);
    animEl.setAttributeNS(null, "from", anim.from);
    animEl.setAttributeNS(null, "to", anim.to);
    animEl.setAttributeNS(null, "dur", anim.dur);
    animEl.setAttributeNS(null, "fill", anim.fill);
    return animEl;
};
var createLineLabel = function (svg, label, pt, color, options) { return __awaiter(void 0, void 0, void 0, function () {
    var opt, textBB, lbPos, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                opt = getSVGOptions(options);
                return [4 /*yield*/, measureText(svg, label, opt)];
            case 1:
                textBB = _a.sent();
                lbPos = {};
                lbPos.width = textBB.width + 10;
                lbPos.height = textBB.height + 10;
                lbPos.left = pt.point.x - lbPos.width - 10 > 0 ? Math.floor(pt.point.x - lbPos.width - 10) : Math.floor(pt.point.x + 10);
                lbPos.top = Math.floor(pt.point.y - lbPos.height - 10);
                id = "linechart-label-value";
                // create the label
                createLabel(svg, id, label, lbPos, color, opt);
                return [2 /*return*/];
        }
    });
}); };
var createLabel = function (svg, id, label, lbPos, color, opt) {
    // create a group
    var gEl = createSVGElement('g', svg);
    gEl.setAttributeNS(null, 'id', id);
    var rectEl = createSVGElement('rect', gEl);
    rectEl.setAttributeNS(null, 'x', lbPos.left.toString());
    rectEl.setAttributeNS(null, 'y', lbPos.top.toString());
    rectEl.setAttributeNS(null, 'width', lbPos.width.toString());
    rectEl.setAttributeNS(null, 'height', lbPos.height.toString());
    rectEl.setAttributeNS(null, 'stroke', color);
    rectEl.setAttributeNS(null, 'fill', '#ffffff');
    rectEl.setAttributeNS(null, 'fill-opacity', '0.85');
    var textEl = createSVGElement('text', gEl);
    //define xtext
    var xtext = lbPos.left + lbPos.width / 2;
    var ytext = lbPos.top + 3 * lbPos.height / 4;
    textEl.setAttributeNS(null, 'x', xtext.toString());
    textEl.setAttributeNS(null, 'y', ytext.toString());
    elementSVGOptions(opt, textEl, 'text');
    textEl.textContent = label;
};
var createLegendLines = function (gEl, names, colors, thicknesses, data, winWidth, ypos, optLg) {
    var itemsPlaced = 0;
    var pos1;
    var pos2;
    var pos3;
    var optLine;
    var yLine = ypos;
    for (var i = 0; i < data.nLines; i++) {
        for (var j = 0; j < data.nItems; j++) {
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
var measureLegend = function (svg, winWidth, names, colors, thicknesses, optLg) {
    // look for  the max length names
    var name = maxLegend(names);
    var dLegend = {};
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
    var ypos = 10;
    var gEl = createSVGElement('g', svg);
    createLegendLines(gEl, names, colors, thicknesses, dLegend, winWidth, ypos, optLg);
    // calculate the legend lines BoundingClientRect
    dLegend.bBox = gEl.getBoundingClientRect();
    // remove the legend lines   
    svg.removeChild(gEl);
    return dLegend;
};
var measureLegendItem = function (svg, label, opt) {
    var optLine = {
        stroke: '#000000'
    };
    var pos1 = { x: 0, y: 0 };
    var pos2 = { x: 15, y: 0 };
    var pos3 = { x: 20, y: 0 };
    var gEl = createSVGElement('g', svg);
    createLegendItem(gEl, pos1, pos2, optLine, label, pos3, opt);
    var bb = gEl.getBoundingClientRect();
    svg.removeChild(gEl);
    return bb;
};
var createLegendItem = function (g, pos1, pos2, optLine, label, pos3, optText) {
    createLine(g, pos1, pos2, optLine);
    createText(g, label, pos3, optText);
};
var measureText = function (svg, label, opt, mockFunc) { return __awaiter(void 0, void 0, void 0, function () {
    var getBCR, textEl, bb;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                getBCR = mockFunc ? mockFunc : getBoundingClientRect;
                textEl = createSVGElement('text', svg);
                textEl.setAttributeNS(null, 'x', "0");
                textEl.setAttributeNS(null, 'y', "0");
                elementSVGOptions(opt, textEl, 'text');
                textEl.textContent = label;
                return [4 /*yield*/, getBCR(textEl)];
            case 1:
                bb = _a.sent();
                svg.removeChild(textEl);
                return [2 /*return*/, bb];
        }
    });
}); };
var getBoundingClientRect = function (el, delay) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            var rectBB;
            rectBB = el.getBoundingClientRect();
            resolve(rectBB);
        }, delay);
    });
};
var getSVGOptions = function (options) {
    var anchor = ["start", "middle", "end"];
    var linejoin = ["miter", "round", "bevel"];
    var linecap = ["butt", "round", "square"];
    var ret = {};
    var opt = options ? options : {};
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
var elementSVGOptions = function (opt, el, elType) {
    var type = elType ? elType : null;
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
var textScale = function (text, window, padding) {
    if (text < window - 2 * padding)
        return 1;
    return Number(((window - 2 * padding) / text).toFixed(4));
};
var axisNiceNumber = function (x, round, min) {
    var exp = Math.floor(Math.log(x) / Math.LN10);
    var f = x / Math.pow(10, exp);
    var nf;
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
var axisGetNumber = function (x, interval, round, min) {
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
var axisMaxArrayAttribute = function (arr, attr) {
    var max;
    if (arr[0].dataPoints[0][attr] != null) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].dataPoints.length; j++) {
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
var axisMinArrayAttribute = function (arr, attr) {
    var min;
    if (arr[0].dataPoints[0][attr] != null) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].dataPoints.length; j++) {
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
var axisMaxArrayLabel = function (arr, attr) {
    var max = null;
    if (arr[0].dataPoints[0][attr] != null) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].dataPoints.length; j++) {
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
var maxLegend = function (arr) {
    var max = null;
    for (var i = 0; i < arr.length; i++) {
        if (!max || arr[i].length > max.length) {
            max = arr[i];
        }
    }
    return max;
};
var axisRange = function (arr, axis, interval, zero) {
    var lenAxis = {};
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
        var maxAxis = void 0;
        var minAxis = void 0;
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
var axisConvertY = function (cRect, aLength, s) {
    return cRect.top + (aLength.top - s) * (cRect.height) / aLength.length;
};
var axisConvertX = function (cRect, aLength, s) {
    return cRect.left + (s - aLength.bottom) * (cRect.width) / aLength.length;
};
var removeChilds = function (el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
};
var getNearest = function (values, pt) {
    var value = null;
    var min = 1.0e20;
    for (var l = 0; l < values.length; l++) {
        for (var i = 0; i < values[l].length; i++) {
            var dist = scalarDistance(values[l][i], pt);
            if (dist < min) {
                value = { line: l, index: i, point: values[l][i] };
                min = dist;
            }
        }
    }
    return value;
};
var scalarDistance = function (val, pt) {
    return Math.sqrt((val.x - pt.x) * (val.x - pt.x) + (val.y - pt.y) * (val.y - pt.y));
};
var getTotalLength = function (arr) {
    var length = 0;
    for (var i = 1; i < arr.length; i++) {
        length += scalarDistance(arr[i], arr[i - 1]);
    }
    return length;
};
var JeepLinechart = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.toggle = false;
        this._update = false;
    }
    //*****************************
    //* Watch on Property Changes *
    //*****************************
    class_1.prototype.parseTitleProp = function (newValue) {
        this.innerTitle = newValue ? newValue : null;
    };
    class_1.prototype.parseSubTitleProp = function (newValue) {
        this.innerSubTitle = newValue ? newValue : null;
    };
    class_1.prototype.parseXTitleProp = function (newValue) {
        this.innerXTitle = newValue ? newValue : null;
    };
    class_1.prototype.parseYTitleProp = function (newValue) {
        this.innerYTitle = newValue ? newValue : null;
    };
    class_1.prototype.parseDataProp = function (newValue) {
        var data = newValue ? newValue : null;
        var dataSets = [];
        var status = { status: 200 };
        if (data != null) {
            var inpData = JSON.parse(data);
            var objData = [];
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
                for (var i = 0; i < objData.length; i++) {
                    if (objData[i].dataPoints) {
                        var dataSet = {};
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
        this.innerData = this.status.status === 200 ? __spreadArrays(dataSets) : null;
    };
    class_1.prototype.parseStyleProp = function (newValue) {
        this.innerStyle = newValue ? newValue : null;
    };
    class_1.prototype.parseAnimationProp = function (newValue) {
        this.innerAnimation = newValue ? newValue : false;
    };
    class_1.prototype.parseBorderProp = function (newValue) {
        this.innerBorder = newValue ? newValue : false;
    };
    class_1.prototype.parseDelayProp = function (newValue) {
        this.innerDelay = newValue ? parseFloat(newValue) : 100;
    };
    //**********************
    //* Method Definitions *
    //**********************
    class_1.prototype.init = function () {
        return Promise.resolve(this._init());
    };
    class_1.prototype.getStatus = function () {
        return Promise.resolve(this.status);
    };
    class_1.prototype.renderChart = function () {
        return Promise.resolve(this._renderChart());
    };
    class_1.prototype.getWindowSize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, windowSize(this.window)];
            });
        });
    };
    class_1.prototype.getCssProperties = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._prop];
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
                    case 0:
                        this.window = window;
                        this._prop = {};
                        return [4 /*yield*/, this._init()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.componentDidLoad = function () {
        this._element = this.el.shadowRoot;
        if (this.status.status === 200) {
            this._renderChart();
        }
    };
    //******************************
    //* Private Method Definitions *
    //******************************
    class_1.prototype._init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var filteredAxisX, propInstance, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
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
                        filteredAxisX = [];
                        filteredAxisX = this._axisType.filter(function (element) { return element === "label"; });
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
                            propInstance = getCssPropertyFromString(this.innerStyle);
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
                        _a = this;
                        return [4 /*yield*/, this.getWindowSize()];
                    case 1:
                        // get window size and set the container size
                        _a._wSize = _b.sent();
                        this._setContainerSize();
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype._setContainerSize = function () {
        this.w_width = getDim(this._prop.widthPlot, this._wSize.width, "0");
        this.w_height = getDim(this._prop.heightPlot, this._wSize.height, "0");
        this.el.style.setProperty('--top', this._prop.topPlot);
        this.el.style.setProperty('--left', this._prop.leftPlot);
        this.el.style.setProperty('--width', this.w_width + "px");
        this.el.style.setProperty('--height', this.w_height + "px");
        this.el.style.setProperty('--backgroundcolor', "" + this._prop.bgColor);
        this._titleRect = null;
        this._chartRect = { top: 0, left: 0, width: this.w_width, height: this.w_height };
    };
    class_1.prototype._setPropertyValue = function (name, value) {
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
    };
    class_1.prototype._windowResize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.getWindowSize()];
                    case 1:
                        _a._wSize = _b.sent();
                        this._setContainerSize();
                        this._update = true;
                        if (this.status && this.status.status === 200) {
                            this._renderChart();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /* ---- Deal with Chart SVG Elements  */
    class_1.prototype._createMarkers = function () {
        var defs = createSVGElement('defs', this.svg);
        var opt = {};
        opt.id = "marker-circle";
        opt.viewbox = "0 0 10 10";
        // markerType Circle size 10x10
        var d = "M0,5 A5,5 0 1,1 10,5 A5,5 0 0,1 0,5 Z";
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
    };
    class_1.prototype._createTitle = function () {
        if (this.innerTitle != null) {
            var g = void 0;
            var textEl = void 0;
            if (!this._update) {
                g = createSVGElement('g', this.svg);
                g.setAttributeNS(null, "id", "linechart-title");
            }
            else {
                g = this.svg.querySelector("#linechart-title");
                g.removeAttributeNS(null, 'transform');
            }
            var opt = {
                id: "linechart-title-text",
                fontFamily: this._prop.ftFamily,
                fontSize: this._prop.ftTiSize,
                fill: this._prop.tiColor,
                anchor: "middle"
            };
            // x centered y padding 10px
            var pos = { x: Math.round(this.w_width / 2), y: convertCSSNumber(this._prop.ftTiSize) + 10 };
            if (!this._update) {
                textEl = createText(g, this.innerTitle, pos, opt);
            }
            else {
                textEl = updateText(this.svg, opt.id, opt.anchor, pos);
            }
            if (this.innerSubTitle != null) {
                var bb = textEl.getBoundingClientRect();
                opt.id = "linechart-subtitle-text";
                opt.fontSize = this._prop.ftSTSize;
                opt.fill = this._prop.stColor;
                var y = Math.ceil(bb.bottom - this.borderBB.top) + 5;
                pos = { x: Math.round(this.w_width / 2), y: y + 10 };
                if (!this._update) {
                    createText(g, this.innerSubTitle, pos, opt);
                }
                else {
                    updateText(this.svg, opt.id, opt.anchor, pos);
                }
            }
            var sbb = g.getBoundingClientRect();
            var scale = textScale(sbb.width, this.w_width, 10);
            var transf = 'translate(' + Math.round(10 - sbb.left * scale) + ',0) ' + 'scale(' + scale + ',' + scale + ')';
            if (scale != 1)
                g.setAttributeNS(null, "transform", transf);
            var sbbt = g.getBoundingClientRect();
            this._titleRect = { left: sbbt.left - this.borderBB.left, top: sbbt.top - this.borderBB.top, width: sbbt.width, height: sbbt.height };
        }
    };
    class_1.prototype._createAxis = function () {
        var tickXL = convertCSSNumber(this._prop.tickX);
        var tickYL = convertCSSNumber(this._prop.tickY);
        var intervalX = parseFloat(this._prop.xInterval);
        var intervalY = parseFloat(this._prop.yInterval);
        var g;
        if (!this._update) {
            g = createSVGElement('g', this.svg);
            g.setAttributeNS(this._xmlns, "id", "linechart-axes");
        }
        else {
            g = this.svg.querySelector("#linechart-axes");
        }
        this._initChartRect();
        if (this.innerData.length > 1)
            this._createLegend();
        var gTY = this._createTitleY();
        var gTX = this._createTitleX();
        // find the axes range
        this._lenY = axisRange(this.innerData, "y", intervalY, convertCSSBoolean(this._prop.yZero));
        if (this._label) {
            this._lenX = axisRange(this.innerData, "label", intervalX);
        }
        else {
            this._lenX = axisRange(this.innerData, "x", intervalX, convertCSSBoolean(this._prop.xZero));
        }
        // calculate the label sizes
        var labelYSize = this._labelSize(this._lenY, 0);
        this._x_axy = 3 + labelYSize.width + 2 + tickYL;
        this._nXlines = this.innerData[0].dataPoints.length;
        if (this._lenX.interval && this._lenX.type === 'number') {
            this._nXlines = Math.abs(Math.floor(this._lenX.length / this._lenX.interval)) + 1;
        }
        var xLength = this._chartRect.width - this._x_axy;
        this._xInterval = Math.floor(xLength / this._nXlines);
        if (this._lenX.interval && this._lenX.type === 'number') {
            this._xInterval = xLength / (this._nXlines - 1);
        }
        var lbldist = this._xInterval;
        if (this._lenX.interval && this._lenX.type === 'string') {
            this._nXlines = Math.abs(Math.floor(this.innerData[0].dataPoints.length / this._lenX.interval));
            lbldist = xLength / (this._nXlines);
        }
        this._labelRotate = false;
        var labelXSize = this._labelSize(this._lenX, 0);
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
        var opt = {
            id: "linechart-yaxis",
            stroke: this._prop.axColor,
            strokeWidth: "1"
        };
        var posy1 = { x: this._yaxis.left, y: this._yaxis.top };
        var posy2 = { x: this._yaxis.left + this._yaxis.width, y: this._yaxis.top + this._yaxis.height };
        if (!this._update) {
            createLine(g, posy1, posy2, opt);
        }
        else {
            updateLine(this.svg, opt.id, posy1, posy2);
        }
        // center the y Axis Title
        if (gTY != null) {
            var transf = 'translate(0,0)';
            gTY.setAttributeNS(null, "transform", transf);
            var titleBB = gTY.getBoundingClientRect();
            var trans = -Math.round(titleBB.top - this.borderBB.top + titleBB.height / 2 - (this._yaxis.top + this._yaxis.height / 2));
            transf = 'translate(0,' + trans + ')';
            gTY.setAttributeNS(null, "transform", transf);
        }
        var optLabel = {
            id: "linechart-ylabel0",
            stroke: this._prop.lbColor,
            strokeWidth: "1",
            fontFamily: this._prop.ftFamily,
            fontSize: this._prop.ftLbSize,
            anchor: "end"
        };
        var yft = Math.floor(parseFloat(this._prop.ftLbSize.split('px')[0]) / 2) - 2; // correction 2px 
        // Y grid lines
        this._nYlines = Math.abs(Math.floor(this._lenY.length / this._lenY.interval)) + 1;
        for (var i = 0; i < this._nYlines; i++) {
            var s = this._lenY.top - i * Math.abs(this._lenY.interval);
            opt.id = "linechart-yLine" + s.toString();
            opt.stroke = this._prop.lnColor;
            if (i === this._nYlines - 1) {
                opt.id = "linechart-xaxis";
                opt.stroke = this._prop.axColor;
            }
            optLabel.id = "linechart-ylabel" + s.toString();
            var y_1 = axisConvertY(this._yaxis, this._lenY, s);
            var posxl1 = { x: this._yaxis.left, y: y_1 };
            var posxl2 = { x: this._chartRect.left + this._chartRect.width, y: y_1 };
            if (!this._update) {
                createLine(g, posxl1, posxl2, opt);
            }
            else {
                updateLine(this.svg, opt.id, posxl1, posxl2);
            }
            // tick
            if (tickYL > 0) {
                var postk = { x: this._yaxis.left - tickYL, y: y_1 };
                opt.id = "linechart-ytick" + s.toString();
                if (!this._update) {
                    createLine(g, posxl1, postk, opt);
                }
                else {
                    updateLine(this.svg, opt.id, posxl1, postk);
                }
            }
            // label
            var pos = { x: this._yaxis.left - tickYL - 2, y: y_1 + yft };
            if (!this._update) {
                createText(g, s.toString(), pos, optLabel);
            }
            else {
                updateText(this.svg, optLabel.id, optLabel.anchor, pos);
            }
        }
        // X Grid Lines
        var xAxisEl = this.svg.querySelector("#linechart-xaxis");
        var y = parseFloat(xAxisEl.getAttribute("y1"));
        var x = Math.floor(this._xInterval / 2);
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
        for (var i = 0; i < this._nXlines; i++) {
            var s = this._lenX.bottom + i * Math.abs(this._lenX.interval);
            var posx1 = { x: this._yaxis.left + x, y: y };
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
                var posx2 = { x: this._yaxis.left + x, y: this._yaxis.top };
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
                var postk = { x: this._yaxis.left + x, y: y + tickXL };
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
            var labx = void 0;
            if (this._lenX.type === 'string') {
                var x_inter = typeof this._lenX.interval != "undefined" ? this._lenX.interval : 1;
                labx = this.innerData[0].dataPoints[i * x_inter].x;
            }
            else {
                labx = s.toString();
            }
            optLabel.id = "linechart-xlabel" + labx;
            var labelEl = void 0;
            var pos = void 0;
            var transr = null;
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
            var transf = 'translate(0,0)';
            gTX.setAttributeNS(null, "transform", transf);
            var axisBB = xAxisEl.getBoundingClientRect();
            var titleBB = gTX.getBoundingClientRect();
            var trans = -Math.round(titleBB.left + titleBB.width / 2 - (axisBB.left + axisBB.width / 2));
            if (Math.abs(trans) > 0) {
                var transf_1 = 'translate(' + trans + ',0)';
                gTX.setAttributeNS(null, "transform", transf_1);
            }
        }
    };
    class_1.prototype._labelSize = function (lenA, rot) {
        var opt = {
            fontFamily: this._prop.ftFamily,
            fontSize: this._prop.ftLbSize,
            fill: this._prop.lbColor,
            anchor: "start"
        };
        var max;
        if (lenA.label) {
            max = lenA.label;
        }
        else {
            max = lenA.top.toString();
            var min = lenA.bottom.toString();
            if (min.length > max.length)
                max = min;
        }
        var y = 0;
        var x = 0;
        var pos = { x: x, y: y };
        var textEl = createText(this.svg, max, pos, opt);
        if (rot != 0) {
            var transf = 'rotate(' + rot + ',0,0)';
            textEl.setAttributeNS(null, "transform", transf);
        }
        var bb = textEl.getBoundingClientRect();
        this.svg.removeChild(textEl);
        return { width: Math.ceil(bb.width), height: Math.ceil(bb.height) };
    };
    class_1.prototype._initChartRect = function () {
        this._chartRect.top = 20; //20px below
        if (this._titleRect != null)
            this._chartRect.top += Math.round(this._titleRect.height);
        this._chartRect.left = 0;
        this._chartRect.width = this.w_width - this._chartRect.left - 20; // 20px right
        this._chartRect.height = this.w_height - this._chartRect.top; // 20px bottom
    };
    class_1.prototype._createLegend = function () {
        var g;
        var rect = {};
        var optLg = {
            fontFamily: this._prop.ftFamily,
            fontSize: this._prop.ftLgSize,
            anchor: 'start',
        };
        var dLegend = measureLegend(this.svg, this.w_width, this._legendNames, this._legendColors, this._legendThicknesses, optLg);
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
            g.setAttributeNS(null, "id", "linechart-legend");
            createLegendLines(g, this._legendNames, this._legendColors, this._legendThicknesses, dLegend, this.w_width, rect.top, optLg);
        }
        else {
            g = this.svg.querySelector("#linechart-legend");
            removeChilds(g);
            createLegendLines(g, this._legendNames, this._legendColors, this._legendThicknesses, dLegend, this.w_width, rect.top, optLg);
        }
    };
    class_1.prototype._createTitleY = function () {
        var g;
        var opt = {
            id: "linechart-ytitle-text",
            fontFamily: this._prop.ftFamily,
            fontSize: this._prop.ftATSize,
            fill: this._prop.atColor,
            anchor: "middle"
        };
        if (this.innerYTitle != null) {
            var textEl = void 0;
            if (!this._update) {
                g = createSVGElement('g', this.svg);
                g.setAttributeNS(null, "id", "linechart-ytitle");
            }
            else {
                g = this.svg.querySelector("#linechart-ytitle");
            }
            var y = this._chartRect.top + Math.round(this._chartRect.height / 2);
            var x = 5 + parseFloat(this._prop.ftATSize.split('px')[0]);
            var pos = { x: x, y: y };
            if (!this._update) {
                textEl = createText(g, this.innerYTitle, pos, opt);
            }
            else {
                textEl = updateText(this.svg, opt.id, opt.anchor, pos);
            }
            var transf = 'rotate(-90 ' + pos.x.toString() + ' ' + pos.y.toString() + ')';
            textEl.setAttributeNS(null, "transform", transf);
            var bb = g.getBoundingClientRect();
            this._chartRect.left = Math.ceil(bb.right - this.borderBB.left);
            this._chartRect.width -= Math.ceil(bb.right - this.borderBB.left);
            return g;
        }
        else {
            return null;
        }
    };
    class_1.prototype._createTitleX = function () {
        var opt = {
            id: "linechart-xtitle-text",
            fontFamily: this._prop.ftFamily,
            fontSize: this._prop.ftATSize,
            fill: this._prop.atColor,
            anchor: "middle"
        };
        if (this.innerXTitle != null) {
            var g = void 0;
            if (!this._update) {
                g = createSVGElement('g', this.svg);
                g.setAttributeNS(null, "id", "linechart-xtitle");
            }
            else {
                g = this.svg.querySelector("#linechart-xtitle");
            }
            var y = this._chartRect.top + this._chartRect.height - 15;
            var x = Math.round(this._chartRect.left + this._chartRect.width / 2);
            var pos = { x: x, y: y };
            if (!this._update) {
                createText(g, this.innerXTitle, pos, opt);
            }
            else {
                updateText(this.svg, opt.id, opt.anchor, pos);
            }
            var bb = g.getBoundingClientRect();
            this._chartRect.height -= Math.floor(bb.height);
            return g;
        }
        else {
            return null;
        }
    };
    class_1.prototype._createLine = function () {
        var g;
        this._Points = [];
        if (!this._update) {
            g = createSVGElement('g', this.svg);
            g.setAttributeNS(null, "id", "linechart-data");
        }
        else {
            g = this.svg.querySelector("#linechart-data");
        }
        for (var l = 0; l < this.innerData.length; l++) {
            var viewPt = [];
            var opt = {};
            opt.stroke = this.innerData[l].color;
            opt.strokeWidth = this.innerData[l].lineThickness.toString();
            opt.fill = 'none';
            opt.id = "linechart-data-" + l.toString();
            var points = void 0;
            var plEl = void 0;
            this._xaxis.left = this._yaxis.left;
            this._xaxis.width = this._chartRect.left + this._chartRect.width - this._xaxis.left;
            var x = Math.floor(this._xInterval / 2);
            for (var i = 0; i < this.innerData[l].dataPoints.length; i++) {
                opt.stroke = this.innerData[l].dataPoints[i].color ? this.innerData[l].dataPoints[i].color : this.innerData[l].color;
                var pt = {};
                pt.y = axisConvertY(this._yaxis, this._lenY, this.innerData[l].dataPoints[i].y);
                if (this._lenX.interval && this._lenX.type === 'number') {
                    pt.x = axisConvertX(this._xaxis, this._lenX, this.innerData[l].dataPoints[i].x);
                }
                else {
                    pt.x = this._xaxis.left + x;
                }
                viewPt.push(pt);
                var scale = this.innerData[l].markerSize / 10;
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
            var length = getTotalLength(viewPt);
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
    };
    class_1.prototype._setAnimation = function (el, length, duration) {
        var animOpt = {};
        animOpt.attributeName = "stroke-dashoffset";
        animOpt.from = length;
        animOpt.to = "0";
        animOpt.dur = duration;
        animOpt.fill = "freeze";
        createAnimation(el, animOpt);
    };
    class_1.prototype._placeMarker = function (id, g, pt, line, index, scale, color) {
        var use;
        var symb;
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
    };
    class_1.prototype._scaleMarker = function (use, scale, pt) {
        var s = 1 - scale;
        var trans = {};
        trans.x = s * pt.x;
        trans.y = s * pt.y;
        var transform = "translate(" + trans.x.toString() + "," + trans.y.toString() + ") scale(" + scale + ")";
        use.setAttributeNS(null, 'transform', transform);
    };
    class_1.prototype._highlightMarker = function (marker, unhigh) {
        var transform = marker.getAttributeNS(null, 'transform');
        var pt = {};
        pt.x = parseFloat(marker.getAttributeNS(null, 'x')) + 5; // symbol 10px-10px
        pt.y = parseFloat(marker.getAttributeNS(null, 'y')) + 5;
        var curScale = 1.0;
        if (transform != null) {
            curScale = parseFloat(transform.split("scale(")[1].slice(0, -1));
        }
        if (unhigh) {
            this._scaleMarker(marker, curScale / 1.5, pt);
        }
        else {
            this._scaleMarker(marker, curScale * 1.5, pt);
        }
    };
    class_1.prototype._waitRemoveLabel = function () {
        var _this = this;
        if (this._mouseStart) {
            setTimeout(function () {
                _this._removeLabel(_this.svg);
                _this._mouseStart = false;
                _this._showTarget = 0;
            }, 1200);
        }
    };
    class_1.prototype._removeLabel = function (svg) {
        // remove label
        var gElems = svg.querySelectorAll("#linechart-label-value");
        if (gElems.length > 0) {
            for (var i = 0; i < gElems.length; i++) {
                removeChilds(gElems[i]);
                svg.removeChild(gElems[i]);
            }
        }
        // unhighlight marker
        if (this._selMarker.length > 0) {
            for (var i = 0; i < this._selMarker.length; i++) {
                var marker = this.svg.querySelector(this._selMarker[i]);
                this._highlightMarker(marker, true);
            }
        }
        this._selMarker = [];
    };
    /* ---- Deal with handling event  */
    class_1.prototype._handleTouchDown = function (evt) {
        evt.preventDefault();
        this._mouseStart = true;
        var pt = { x: evt.touches[0].pageX, y: evt.touches[0].pageY };
        this._handleEventTarget(evt, pt);
    };
    class_1.prototype._handleMouseDown = function (evt) {
        evt.preventDefault();
        this._mouseStart = true;
        var pt = { x: evt.pageX, y: evt.pageY };
        this._handleEventTarget(evt, pt);
    };
    class_1.prototype._handleTouchUp = function (evt) {
        evt.preventDefault();
        this._waitRemoveLabel();
    };
    class_1.prototype._handleMouseUp = function (evt) {
        evt.preventDefault();
        this._waitRemoveLabel();
    };
    class_1.prototype._handleEventTarget = function (evt, pt) {
        this._showTarget = evt.target;
        // if a label exists remove it
        pt.x -= this.borderBB.left;
        pt.y -= this.borderBB.top;
        this._removeLabel(this.svg);
        var nearestPoint = getNearest(this._Points, pt);
        var data = this.innerData[nearestPoint.line].dataPoints[nearestPoint.index];
        var mName = "#marker-" + this.innerData[nearestPoint.line].markerType + '-';
        mName += nearestPoint.line.toString() + '-' + nearestPoint.index.toString();
        this._selMarker.push(mName);
        var marker = this.svg.querySelector(mName);
        this._highlightMarker(marker, false);
        var label;
        if (typeof data.x === 'number')
            label = data.x.toString();
        if (typeof data.x === 'string')
            label = data.x;
        label = label + " : " + data.y.toString();
        var ft = 1.2 * parseFloat(this._prop.ftLbSize.split('px')[0]);
        var opt = {
            fontFamily: this._prop.ftFamily,
            fontSize: ft.toString() + 'px',
            fill: this._prop.lbColor,
            anchor: "middle"
        };
        var color = this.innerData[nearestPoint.line].color;
        createLineLabel(this.svg, label, nearestPoint, color, opt);
    };
    /* ---- Deal with rendering  */
    class_1.prototype._renderChart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.container = this._element.querySelector('#div-linechart-container');
                        this.chart = this._element.querySelector('#div-linechart-chart');
                        this.svg = this._element.querySelector('#svg-linechart');
                        this.borderEl = this.svg.querySelector('#svg-border-rect');
                        _a = this;
                        return [4 /*yield*/, getBoundingClientRect(this.borderEl, this.innerDelay)];
                    case 1:
                        _a.borderBB = _b.sent();
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
                        return [2 /*return*/];
                }
            });
        });
    };
    //*************************
    //* Rendering JSX Element *
    //*************************
    class_1.prototype.render = function () {
        if (this.status.status === 200) {
            var viewBox = "0 0 " + this.w_width.toString() + " " + this.w_height.toString();
            return (h(Host, null, h("div", { id: "div-linechart-container" }, h("div", { id: "div-linechart-chart" }, h("svg", { id: "svg-linechart", width: this.w_width.toString(), height: this.w_height.toString(), viewBox: viewBox }, h("rect", { id: "svg-border-rect", class: "border-rect hidden", x: "0", y: "0", width: this.w_width.toString(), height: this.w_height.toString(), stroke: this._prop.bdColor, "stroke-width": this._prop.bdWidth, fill: "none", "fill-opacity": "0" }))))));
        }
        else {
            return (h("div", { id: "div-error-message" }, h("p", { id: "p-error-message" }, this.status.message)));
        }
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "ctitle": ["parseTitleProp"],
                "subtitle": ["parseSubTitleProp"],
                "xtitle": ["parseXTitleProp"],
                "ytitle": ["parseYTitleProp"],
                "data": ["parseDataProp"],
                "cstyle": ["parseStyleProp"],
                "animation": ["parseAnimationProp"],
                "cborder": ["parseBorderProp"],
                "delay": ["parseDelayProp"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ":host{--height:200px;--width:300px;--top:30px;--left:10px;--backgroundcolor:#fff}#div-linechart-container{position:relative;left:0;top:0;width:100%;height:calc(var(--height) + var(--top));z-index:1}#div-linechart-chart{position:relative;left:var(--left);top:var(--top);width:var(--width);height:var(--height);background-color:var(--backgroundcolor);z-index:1}.hidden{visibility:hidden}#div-error-message{background-color:#f89393;position:absolute;top:0;left:0;margin:0 auto;width:100%;height:60px;line-height:60px;text-align:left;padding-left:10px;font-size:15px;font-family:Verdana}#p-error-message{display:inline-block;vertical-align:middle;line-height:normal}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { JeepLinechart as jeep_linechart };
