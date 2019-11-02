import { Point, Rect } from '../global/interfaces/geom';
import { Legend, NearestPoint, AxisLength, DataPoint, DataSet, SVGOptions, Anim } from '../global/interfaces/jeep-linechart';
const xmlns:string = "http://www.w3.org/2000/svg";

export const createSVGElement = (eltype:string,parent?:HTMLElement | SVGElement | Element): Element => {
    const svgEl:Element = document.createElementNS (xmlns, eltype);
    if(parent) parent.appendChild(svgEl);
    return svgEl;
}
export const createText = (g: Element,text:string, pos:Point,options?:any): Element => {
    let opt: SVGOptions = getSVGOptions(options);
    let textEl:Element = createSVGElement ("text",g);
    textEl.setAttributeNS (null, "x", pos.x.toString());
    textEl.setAttributeNS (null, "y", pos.y.toString());
    textEl.textContent = text;
    elementSVGOptions(opt,textEl,'text');
    return textEl;
} 
export const updateText = (svg:Element,id:string,anchor:string, pos:Point): Element => {
    let textEl:Element = svg.querySelector('#'+id);
    textEl.setAttributeNS (null, "x", pos.x.toString());
    textEl.setAttributeNS (null, "y", pos.y.toString());
    textEl.setAttributeNS (null, "text-anchor", anchor);
    return textEl;
} 
export const createLine = (g: Element,pos1:Point, pos2:Point,options?:any): Element => {
    let opt: SVGOptions = getSVGOptions(options);
    let lineEl:Element = createSVGElement ("line",g);
    lineEl.setAttributeNS (null, "x1", pos1.x.toString());
    lineEl.setAttributeNS (null, "y1", pos1.y.toString());
    lineEl.setAttributeNS (null, "x2", pos2.x.toString());
    lineEl.setAttributeNS (null, "y2", pos2.y.toString());
    elementSVGOptions(opt,lineEl);
    return lineEl;
}
export const updateLine = (svg:Element,id:string,pos1:Point, pos2:Point): Element => {
    let lineEl:Element = svg.querySelector('#'+id);
    lineEl.setAttributeNS (null, "x1", pos1.x.toString());
    lineEl.setAttributeNS (null, "y1", pos1.y.toString());
    lineEl.setAttributeNS (null, "x2", pos2.x.toString());
    lineEl.setAttributeNS (null, "y2", pos2.y.toString());
    return lineEl;
}
export const createRect = (g: Element,rect:Rect,options?:any): Element => {
    let opt: SVGOptions = getSVGOptions(options);
    let rectEl:Element = createSVGElement ("rect",g);
    rectEl.setAttributeNS (null, "x", rect.left.toString());
    rectEl.setAttributeNS (null, "y", rect.top.toString());
    rectEl.setAttributeNS (null, "width", rect.width.toString());
    rectEl.setAttributeNS (null, "height", rect.height.toString());
    elementSVGOptions(opt,rectEl);
    return rectEl;
}
export const updateRect = (svg:Element,id:string,rect:Rect): Element => {
    let rectEl:Element = svg.querySelector('#'+id);
    rectEl.setAttributeNS (null, "x", rect.left.toString());
    rectEl.setAttributeNS (null, "y", rect.top.toString());
    rectEl.setAttributeNS (null, "width", rect.width.toString());
    rectEl.setAttributeNS (null, "height", rect.height.toString());
    return rectEl;
}
export const createPolyline = (g:Element,points:string,options?:any): Element => {
    let opt: SVGOptions = getSVGOptions(options);
    let plineEl:Element = createSVGElement('polyline',g);
    plineEl.setAttributeNS (null, "points", points);
    elementSVGOptions(opt,plineEl);
    return plineEl;
}
export const updatePolyline = (svg:Element,id:string,points:string): Element => {
    let plineEl:Element = svg.querySelector('#'+id);
    plineEl.setAttributeNS (null, "points", points);
    return plineEl;
}
export const createMarker = (defs:Element,d:string,opt:SVGOptions): void => {
    let g: Element = createSVGElement('g',defs);
    g.setAttribute ("id", opt.id);
    g.setAttribute ('viewbox',opt.viewbox);
    let path: Element = createSVGElement('path',g);
    path.setAttribute ('d',d);   
}
export const createAnimation = (el:Element,anim:Anim): Element => {
    let animEl:Element = createSVGElement('animate',el);
    animEl.setAttributeNS (null, "attributeName", anim.attributeName);
    animEl.setAttributeNS (null, "from", anim.from);
    animEl.setAttributeNS (null, "to", anim.to);
    animEl.setAttributeNS (null, "dur", anim.dur);
    animEl.setAttributeNS (null, "fill", anim.fill);
    return animEl;
}
export const createLineLabel = async (svg:Element,label:string,pt:NearestPoint,color:string,
    options:SVGOptions): Promise<void> => {
    let opt: SVGOptions = getSVGOptions(options);
    //measure the label text size  
    let textBB: ClientRect = await measureText(svg,label,opt);
    //define the label position 
    let lbPos: Rect = {} as Rect; 
    lbPos.width = textBB.width + 10;
    lbPos.height = textBB.height + 10;
    lbPos.left = pt.point.x - lbPos.width - 10 > 0 ? Math.floor(pt.point.x - lbPos.width - 10): Math.floor(pt.point.x + 10);
    lbPos.top = Math.floor(pt.point.y - lbPos.height - 10);
    let id:string = "linechart-label-value";
    // create the label
    createLabel(svg,id,label,lbPos,color,opt)

}
export const createLabel = (svg:Element,id:string,label:string,lbPos:Rect,color:string,opt:SVGOptions): void => {
    // create a group
    let gEl: Element = createSVGElement('g',svg);               
    gEl.setAttributeNS(null,'id',id);
    let rectEl: Element = createSVGElement('rect',gEl);
    rectEl.setAttributeNS(null,'x',lbPos.left.toString());
    rectEl.setAttributeNS(null,'y',lbPos.top.toString());
    rectEl.setAttributeNS(null,'width',lbPos.width.toString());
    rectEl.setAttributeNS(null,'height',lbPos.height.toString());
    rectEl.setAttributeNS(null,'stroke',color);
    rectEl.setAttributeNS(null,'fill','#ffffff');
    rectEl.setAttributeNS(null,'fill-opacity','0.85');
    let textEl:Element = createSVGElement('text',gEl);
    //define xtext
    let xtext: number = lbPos.left + lbPos.width / 2; 
    let ytext: number = lbPos.top + 3 * lbPos.height / 4;
    textEl.setAttributeNS(null,'x',xtext.toString());
    textEl.setAttributeNS(null,'y',ytext.toString());
    elementSVGOptions(opt,textEl,'text');
    textEl.textContent = label;  

}
export const createLegendLines = (gEl:Element,names:Array<string>,colors:Array<string>,
    thicknesses:Array<number>,data:Legend,winWidth:number,ypos:number,optLg:SVGOptions): void => {
    let itemsPlaced: number = 0;
    let pos1: Point;
    let pos2 :Point;
    let pos3: Point;
    let optLine: SVGOptions;
    let yLine: number = ypos;
    for(let i:number = 0; i < data.nLines; i++) {
        for(let j:number = 0; j < data.nItems;j++) {
            if (j===0) {
                pos1 = {x: winWidth/ 2 - data.lineLength/2, y: yLine};
            } else {
                pos1 = {x: pos1.x + data.bBoxItem.width + 20, y: pos1.y};
            }
            pos2 = {x: pos1.x + 15,y: pos1.y};
            pos3 = {x: pos1.x + 20,y: pos1.y};
            optLine = {stroke: colors[itemsPlaced],strokeWidth:thicknesses[itemsPlaced].toString()};
            createLegendItem(gEl,pos1,pos2,optLine,names[itemsPlaced],pos3,optLg);            
            itemsPlaced += 1;
            if(itemsPlaced >= names.length) break;
        }
        yLine += data.bBoxItem.height + 2;
    }
}
export const measureLegend = (svg:Element,winWidth:number,names:Array<string>,
            colors:Array<string>,thicknesses:Array<number>,optLg:SVGOptions): Legend => {
    // look for  the max length names
    let name:string = maxLegend(names);
    let dLegend: Legend = {} as Legend;
    // measure legend item
    dLegend.bBoxItem = measureLegendItem(svg,name,optLg);
    // calculate number of legend items per legend line
    dLegend.nItems = Math.floor((winWidth - 20)/(dLegend.bBoxItem.width + 20));
    if(dLegend.nItems > names.length) dLegend.nItems = names.length;
    // calculate legend lines length
    dLegend.lineLength = dLegend.nItems * (dLegend.bBoxItem.width + 20);
    // calculate number of legend lines
    dLegend.nLines = Math.ceil(names.length / dLegend.nItems);
    // create legend lines
    let ypos:number = 10;
    let gEl: Element = createSVGElement('g',svg); 
    createLegendLines(gEl,names,colors,thicknesses,dLegend,winWidth,ypos,optLg);
    // calculate the legend lines BoundingClientRect
    dLegend.bBox = gEl.getBoundingClientRect();;
    // remove the legend lines   
    svg.removeChild(gEl);
    return dLegend;
}
export const measureLegendItem = (svg:Element,label:string,opt:SVGOptions): ClientRect => {
    let optLine: SVGOptions = {
        stroke : '#000000'
    } 
    let pos1: Point = {x:0,y:0};             
    let pos2: Point = {x:15,y:0}; 
    let pos3: Point ={x:20,y:0};            
    let gEl: Element = createSVGElement('g',svg); 
    createLegendItem(gEl,pos1,pos2,optLine,label,pos3,opt);
    let bb: ClientRect = gEl.getBoundingClientRect();
    svg.removeChild(gEl);
    return bb;
}
export const createLegendItem = (g:Element,pos1:Point,pos2:Point,optLine:SVGOptions,
                                 label:string,pos3:Point,optText:SVGOptions): void => {
    createLine(g,pos1,pos2,optLine);
    createText(g,label,pos3,optText);
                                
}
export const measureText = async (svg:Element,label:string,opt:SVGOptions,mockFunc?:any): Promise<ClientRect> => {
    //measure the label text size
    const getBCR =  mockFunc ? mockFunc : getBoundingClientRect; 
    let textEl: Element = createSVGElement('text',svg);
    textEl.setAttributeNS(null,'x',"0");
    textEl.setAttributeNS(null,'y',"0");
    elementSVGOptions(opt,textEl,'text');
    textEl.textContent = label;
    let bb: ClientRect = await getBCR(textEl);
    svg.removeChild(textEl);
    return bb;
}
export const getBoundingClientRect = (el:Element,delay:number): Promise<ClientRect> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let rectBB:ClientRect;
            rectBB = el.getBoundingClientRect();
            resolve(rectBB);
        },delay);    
    });
}
export const getSVGOptions = (options?:SVGOptions): SVGOptions => {
    let anchor:Array<string> = ["start","middle","end"];
    let linejoin:Array<string> = ["miter","round","bevel"];
    let linecap:Array<string> = ["butt","round","square"];
    let ret: SVGOptions = {};
    let opt: SVGOptions = options ? options : {};
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
}
export const elementSVGOptions = (opt:SVGOptions,el:Element,elType?:string) => {
    let type:string = elType ? elType : null;
    if(opt.id !== null ) el.setAttributeNS (null, "id", opt.id);
    if(type === 'text') el.setAttributeNS (null, "font-family", opt.fontFamily);
    if(type === 'text') el.setAttributeNS (null, "font-size", opt.fontSize);
    if(type === 'text' && opt.anchor !== null ) el.setAttributeNS (null, "text-anchor", opt.anchor);
    if(opt.fill !== null ) el.setAttributeNS (null, "fill", opt.fill);
    if(opt.fillOpacity !== null ) el.setAttributeNS (null, "fill-opacity", opt.fillOpacity);
    if(opt.stroke !== null ) el.setAttributeNS (null, "stroke", opt.stroke);
    if(opt.strokeWidth !== null ) el.setAttributeNS (null, "stroke-width", opt.strokeWidth);
    if(opt.strokeOpacity !== null ) el.setAttributeNS (null, "stroke-opacity", opt.strokeOpacity);
    if(opt.strokeLinejoin !== null ) el.setAttributeNS (null, "stroke-linejoin", opt.strokeLinejoin);
    if(opt.strokeLinecap !== null ) el.setAttributeNS (null, "stroke-linecap", opt.strokeLinecap);
    if(opt.strokeMiterlimit !== null ) el.setAttributeNS (null, "stroke-miterlimit", opt.strokeMiterlimit);
    if(opt.strokeDasharray !== null ) el.setAttributeNS (null, "stroke-dasharray", opt.strokeDasharray);
    if(opt.strokeDashoffset !== null ) el.setAttributeNS (null, "stroke-dashoffset", opt.strokeDashoffset);
}
export const textScale = (text:number,window:number, padding:number): number => {
    if(text < window-2*padding) return 1;
    return  Number(((window-2*padding)/text).toFixed(4));
}
export const axisNiceNumber = (x:number, round:boolean, min:boolean) : number => {    
    let exp: number = Math.floor(Math.log(x) / Math.LN10);
    let f: number = x / Math.pow(10, exp);
    let nf: number;
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
        else nf = 10;
        if(min) nf -= 1;
    }
    return Number((nf * Math.pow(10, exp)).toFixed(20));
}
export const axisGetNumber = (x:number,interval:number,round:boolean,min:boolean): number => {
    if (interval === 0 ) return axisNiceNumber(x,round,min);
    if (round) {
        return interval;
    } else {
        if(min) {
            return interval * Math.floor(x / interval);
        } else {
            return interval * (Math.floor(x / interval) + 1);
        }
    }
}
export const axisMaxArrayAttribute = (arr:Array<DataSet>,attr:string): DataPoint => {
    let max: DataPoint;
    if(arr[0].dataPoints[0][attr] != null) {
        for (let i: number =0 ; i<arr.length ; i++) {
            for (let j: number =0 ; j<arr[i].dataPoints.length ; j++) {        
                if (!max || parseInt(arr[i].dataPoints[j][attr]) > parseInt(max[attr]))
                max = arr[i].dataPoints[j];
            }
        }
        return max;
    } else {
        return null;
    }
}
export const axisMinArrayAttribute = (arr:Array<DataSet>,attr:string): DataPoint => {
    let min: DataPoint;
    if(arr[0].dataPoints[0][attr] != null) {
        for (let i: number =0 ; i<arr.length ; i++) {
            for (let j: number =0 ; j<arr[i].dataPoints.length ; j++) {        
                if (!min || parseInt(arr[i].dataPoints[j][attr]) < parseInt(min[attr]))
                min = arr[i].dataPoints[j];
            }
        }
        return min;  
    } else {
        return null;
    }
}
export const axisMaxArrayLabel = (arr:Array<DataSet>,attr:string): DataPoint => {
    let max: DataPoint = null;
    if(arr[0].dataPoints[0][attr] != null) {
        for (let i: number =0 ; i<arr.length ; i++) {
            for (let j: number =0 ; j<arr[i].dataPoints.length ; j++) {        
                if (!max || arr[i].dataPoints[j][attr].length > max[attr].length)
                max = arr[i].dataPoints[j];
            }
        }
        return max; 
    } else {
        return null;
    }
}
export const maxLegend = (arr:Array<string>): string =>{
    let max: string = null;
    for (let i: number =0 ; i<arr.length ; i++) {
        if(!max || arr[i].length > max.length) {
            max = arr[i];
        }
    }    
    return max;
}
export const axisRange = (arr:Array<DataSet>, axis:string,interval:number, zero?:boolean): AxisLength => {
    let lenAxis:AxisLength = {} as AxisLength;
    if(axis === "label" && arr[0].dataPoints[0].label) {
        lenAxis.label = axisMaxArrayLabel(arr,"label").label;
        lenAxis.type = 'string';
        if(interval != 0) lenAxis.interval = interval;
    } else if (axis === "x" && typeof arr[0].dataPoints[0].x === 'string') {
        lenAxis.label = axisMaxArrayLabel(arr,"x").x;
        lenAxis.type = 'string';
        if(interval != 0) lenAxis.interval = interval;
    } else if ((axis === "x" && typeof arr[0].dataPoints[0].x === 'number') || axis ==="y") {
        let maxAxis: number;
        let minAxis: number;
        lenAxis.type = 'number';    
        if(axis === "y"){
            maxAxis = axisMaxArrayAttribute(arr,axis).y;
            minAxis = axisMinArrayAttribute(arr,axis).y;    
        }
        if(axis === "x"){
            maxAxis = axisMaxArrayAttribute(arr,axis).x;
            minAxis = axisMinArrayAttribute(arr,axis).x; 
        }
        if( maxAxis > 0 && minAxis >=0) {
            lenAxis.top = axisGetNumber(maxAxis,interval,false,false);
            if(zero) {
                lenAxis.bottom = 0;
                lenAxis.interval = axisGetNumber(maxAxis,interval,true,false);
            } else {
                lenAxis.bottom = axisGetNumber(minAxis,interval,false,true);;                
                lenAxis.interval = axisGetNumber(maxAxis-minAxis,interval,true,false);
            }
            lenAxis.length = lenAxis.top - lenAxis.bottom;
        }
        if( maxAxis > 0 && minAxis <0) {
            lenAxis.top = axisGetNumber(maxAxis,interval,false,false);
            lenAxis.interval = axisGetNumber(maxAxis,interval,true,false);
            lenAxis.bottom = - Math.ceil(-minAxis/lenAxis.interval) * lenAxis.interval;
            lenAxis.length = lenAxis.top - lenAxis.bottom;
        }
        if( maxAxis <= 0 ) {
            if(zero) {
                lenAxis.top = 0;
                lenAxis.interval = -axisGetNumber(-minAxis,interval,true,false);
            } else {
                lenAxis.top = -axisGetNumber(-maxAxis,interval,false,true);               
                lenAxis.interval = -axisGetNumber(-(minAxis-maxAxis),interval,true,false);
            }
            lenAxis.bottom = -axisGetNumber(-minAxis,interval,false,false);
            lenAxis.length = lenAxis.top - lenAxis.bottom;
        }
    }
    return lenAxis;
}
export const axisConvertY = (cRect: Rect,aLength: AxisLength, s:number): number => {
    return cRect.top + (aLength.top - s) * (cRect.height) / aLength.length;
}
export const axisConvertX = (cRect: Rect,aLength: AxisLength, s:number): number => {
    return cRect.left + (s- aLength.bottom) * (cRect.width) / aLength.length;
}
export const removeChilds = (el:Element): void  => {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}
export const getNearest = (values:Array<Array<Point>>,pt:Point): NearestPoint => {
    let value:NearestPoint = null;
    let min: number = 1.0e20;
    for (let l:number =0;l<values.length;l++){
        for (let i:number =0;i<values[l].length;i++){
            let dist:number = scalarDistance(values[l][i],pt);
            if (dist < min) {
                value = {line:l,index:i,point:values[l][i]};
                min = dist;
            }
        } 
    }
    return value;
}
export const scalarDistance = (val:Point,pt:Point): number =>{
    return Math.sqrt((val.x - pt.x)*(val.x - pt.x) + (val.y - pt.y)*(val.y - pt.y));
}
export const getTotalLength = (arr:Array<Point>): number => {
    let length: number = 0;
    for(let i:number = 1; i < arr.length; i++) {
        length += scalarDistance(arr[i],arr[i-1]);    
    }
    return length;
}
         



          

