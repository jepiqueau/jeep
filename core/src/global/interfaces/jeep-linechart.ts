import { Point } from './geom';
export interface Variables {
    bgColor?: string; 
    axColor?: string;
    lnColor?: string;
    tiColor?: string;
    stColor?: string;
    atColor?: string;
    lbColor?: string;
    topPlot?: string;
    leftPlot?: string;
    widthPlot?: string;
    heightPlot?: string;
    ftTiSize?:string;
    ftLbSize?:string;
    ftFamily?:string;
    ftATSize?: string;
    ftSTSize?: string;
    ftLgSize?: string;
    tickX?: string;
    tickY?: string;
    gridX?: string;
    gridY?: string;
    xInterval?: string;
    yInterval?: string;
    xZero?: string;
    yZero?: string;
    animDuration?: string;
    legendTop?: string;
    bdColor?:string;
    bdWidth?:string;
}
export interface Status {
    status:number;
    message?:string;
}
export interface Legend {
    nItems: number;
    nLines: number;
    lineLength : number;
    bBoxItem: ClientRect;
    bBox: ClientRect;
}
export interface NearestPoint {
    line: number,
    index: number;
    point: Point;
}
export interface Anim {
    attributeName: string;
    from: string;
    to: string;
    dur: string;
    fill:string;
}
export interface AxisLength {
    top?: number;
    bottom?: number;
    length?: number;
    interval?: number;
    label?: string;
    type?: string;
}
export interface DataPoint {
    y?: number;
    x?: any;
    label?: string;
    color?: string;
    markerType?: string;
    markerSize?: number;
    markerColor?: string;
}
export interface DataSet {
    color?: string;
    name?: string;
    markerType?: string;
    markerColor?: string;
    markerSize?: number;
    lineThickness?: number;
    dataPoints: Array<DataPoint>;
}
export interface SVGOptions {
    id?: string;
    fontFamily?: string;
    fontSize?: string;
    anchor?: string; // "start" "middle" "end"
    fill?: string;
    fillOpacity?: string;
    stroke?: string;
    strokeOpacity?: string;
    strokeWidth?: string;
    strokeLinejoin?: string; // "miter" "round" "bevel"
    strokeLinecap?: string; // "butt" "round" "square"
    strokeMiterlimit?: string;
    strokeDasharray?: string;
    strokeDashoffset?: string;
    viewbox?: string;
}
