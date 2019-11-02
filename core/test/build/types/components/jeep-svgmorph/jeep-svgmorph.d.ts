import { CubicBezier } from '../../global/interfaces/svggeom';
import { StateProperties } from '../../global/interfaces/jeep-svgmorph';
export declare class JeepSvgmorph {
    el: HTMLJeepSvgmorphElement;
    /**
     * The preselected duration
     */
    duration: string;
    /**
     * The preselected repeat count
     */
    repeatcount: string;
    /**
     * The preselected path index
     */
    pathindex: string;
    /**
     * The preselected number of segments
     */
    nsegment: string;
    /**
     * The preselected key times
     */
    keytimes: string;
    /**
     * The preselected calculation mode
     */
    calcmode: string;
    /**
     * The preselected key splines
     */
    keysplines: string;
    /**
     * The preselected fill color
     */
    fill: string;
    isSVG: boolean;
    innerDuration: string;
    innerRepeatcount: string;
    innerPathindex: Array<number>;
    innerNsegment: number;
    innerKeytimes: string;
    innerCalcmode: string;
    innerKeysplines: string;
    innerFill: string;
    parseDurationProp(newValue: string): void;
    parseRepeatcountProp(newValue: string): void;
    parsePathindexProp(newValue: string): void;
    parseNsegmentProp(newValue: string): void;
    parseKeytimesProp(newValue: string): void;
    parseCalcmodeProp(newValue: string): void;
    parseKeysplinesProp(newValue: string): void;
    parseFillProp(newValue: string): void;
    /**
     * Method initialize
     */
    init(): Promise<void>;
    getStateProperties(): Promise<StateProperties>;
    getPath(): Promise<void>;
    getPathList(): Promise<Array<string>>;
    getFillColor(): Promise<Array<string>>;
    renderSVGFirstPath(): Promise<void>;
    getAlignedPaths(calc: boolean): Promise<Array<CubicBezier>>;
    private _pathList;
    private _alignPathList;
    private _cBList;
    private _fillColor;
    private _element;
    private _svgOptions;
    private _svg;
    private _container;
    private _path;
    private _valuesPath;
    private _valuesFill;
    private _isUniqueColor;
    private _uniqueColor;
    componentWillLoad(): Promise<void>;
    componentDidLoad(): Promise<void>;
    private _init;
    private _removeCarriageReturn;
    private _setSVGAttributes;
    private _drawFirstPath;
    private _getPath;
    private _alignPaths;
    private _setAnimation;
    private getOccurrence;
    private _renderSVGFirstPath;
    render(): any;
}
