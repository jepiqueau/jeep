const xmlns = "http://www.w3.org/2000/svg";
export const createSVGElement = (eltype, parent) => {
    const svgEl = document.createElementNS(xmlns, eltype);
    if (parent)
        parent.appendChild(svgEl);
    return svgEl;
};
export const createText = (g, text, pos, options) => {
    let opt = getSVGOptions(options);
    let textEl = createSVGElement("text", g);
    textEl.setAttributeNS(null, "x", pos.x.toString());
    textEl.setAttributeNS(null, "y", pos.y.toString());
    textEl.textContent = text;
    elementSVGOptions(opt, textEl, 'text');
    return textEl;
};
export const updateText = (svg, id, anchor, pos) => {
    let textEl = svg.querySelector('#' + id);
    textEl.setAttributeNS(null, "x", pos.x.toString());
    textEl.setAttributeNS(null, "y", pos.y.toString());
    textEl.setAttributeNS(null, "text-anchor", anchor);
    return textEl;
};
export const createLine = (g, pos1, pos2, options) => {
    let opt = getSVGOptions(options);
    let lineEl = createSVGElement("line", g);
    lineEl.setAttributeNS(null, "x1", pos1.x.toString());
    lineEl.setAttributeNS(null, "y1", pos1.y.toString());
    lineEl.setAttributeNS(null, "x2", pos2.x.toString());
    lineEl.setAttributeNS(null, "y2", pos2.y.toString());
    elementSVGOptions(opt, lineEl);
    return lineEl;
};
export const updateLine = (svg, id, pos1, pos2) => {
    let lineEl = svg.querySelector('#' + id);
    lineEl.setAttributeNS(null, "x1", pos1.x.toString());
    lineEl.setAttributeNS(null, "y1", pos1.y.toString());
    lineEl.setAttributeNS(null, "x2", pos2.x.toString());
    lineEl.setAttributeNS(null, "y2", pos2.y.toString());
    return lineEl;
};
export const createRect = (g, rect, options) => {
    let opt = getSVGOptions(options);
    let rectEl = createSVGElement("rect", g);
    rectEl.setAttributeNS(null, "x", rect.left.toString());
    rectEl.setAttributeNS(null, "y", rect.top.toString());
    rectEl.setAttributeNS(null, "width", rect.width.toString());
    rectEl.setAttributeNS(null, "height", rect.height.toString());
    elementSVGOptions(opt, rectEl);
    return rectEl;
};
export const updateRect = (svg, id, rect) => {
    let rectEl = svg.querySelector('#' + id);
    rectEl.setAttributeNS(null, "x", rect.left.toString());
    rectEl.setAttributeNS(null, "y", rect.top.toString());
    rectEl.setAttributeNS(null, "width", rect.width.toString());
    rectEl.setAttributeNS(null, "height", rect.height.toString());
    return rectEl;
};
export const createPolyline = (g, points, options) => {
    let opt = getSVGOptions(options);
    let plineEl = createSVGElement('polyline', g);
    plineEl.setAttributeNS(null, "points", points);
    elementSVGOptions(opt, plineEl);
    return plineEl;
};
export const updatePolyline = (svg, id, points) => {
    let plineEl = svg.querySelector('#' + id);
    plineEl.setAttributeNS(null, "points", points);
    return plineEl;
};
export const createMarker = (defs, d, opt) => {
    let g = createSVGElement('g', defs);
    g.setAttribute("id", opt.id);
    g.setAttribute('viewbox', opt.viewbox);
    let path = createSVGElement('path', g);
    path.setAttribute('d', d);
};
export const createAnimation = (el, anim) => {
    let animEl = createSVGElement('animate', el);
    animEl.setAttributeNS(null, "attributeName", anim.attributeName);
    animEl.setAttributeNS(null, "from", anim.from);
    animEl.setAttributeNS(null, "to", anim.to);
    animEl.setAttributeNS(null, "dur", anim.dur);
    animEl.setAttributeNS(null, "fill", anim.fill);
    return animEl;
};
export const createLineLabel = async (svg, label, pt, color, options) => {
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
export const createLabel = (svg, id, label, lbPos, color, opt) => {
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
export const createLegendLines = (gEl, names, colors, thicknesses, data, winWidth, ypos, optLg) => {
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
export const measureLegend = (svg, winWidth, names, colors, thicknesses, optLg) => {
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
export const measureLegendItem = (svg, label, opt) => {
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
export const createLegendItem = (g, pos1, pos2, optLine, label, pos3, optText) => {
    createLine(g, pos1, pos2, optLine);
    createText(g, label, pos3, optText);
};
export const measureText = async (svg, label, opt, mockFunc) => {
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
export const getBoundingClientRect = (el, delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let rectBB;
            rectBB = el.getBoundingClientRect();
            resolve(rectBB);
        }, delay);
    });
};
export const getSVGOptions = (options) => {
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
export const elementSVGOptions = (opt, el, elType) => {
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
export const textScale = (text, window, padding) => {
    if (text < window - 2 * padding)
        return 1;
    return Number(((window - 2 * padding) / text).toFixed(4));
};
export const axisNiceNumber = (x, round, min) => {
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
export const axisGetNumber = (x, interval, round, min) => {
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
export const axisMaxArrayAttribute = (arr, attr) => {
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
export const axisMinArrayAttribute = (arr, attr) => {
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
export const axisMaxArrayLabel = (arr, attr) => {
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
export const maxLegend = (arr) => {
    let max = null;
    for (let i = 0; i < arr.length; i++) {
        if (!max || arr[i].length > max.length) {
            max = arr[i];
        }
    }
    return max;
};
export const axisRange = (arr, axis, interval, zero) => {
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
export const axisConvertY = (cRect, aLength, s) => {
    return cRect.top + (aLength.top - s) * (cRect.height) / aLength.length;
};
export const axisConvertX = (cRect, aLength, s) => {
    return cRect.left + (s - aLength.bottom) * (cRect.width) / aLength.length;
};
export const removeChilds = (el) => {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
};
export const getNearest = (values, pt) => {
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
export const scalarDistance = (val, pt) => {
    return Math.sqrt((val.x - pt.x) * (val.x - pt.x) + (val.y - pt.y) * (val.y - pt.y));
};
export const getTotalLength = (arr) => {
    let length = 0;
    for (let i = 1; i < arr.length; i++) {
        length += scalarDistance(arr[i], arr[i - 1]);
    }
    return length;
};
