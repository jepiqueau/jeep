import { Color, HSB } from "./color";
import { Point } from "./geom";
export interface StateProperties {
    init: boolean;
    color?: Color;
    colorHeadline?: string;
    typeHeadline?: string;
    opacity?: string;
    hue?: string;
    hsb?: HSB;
    colorText?: string;
    colorHandle?: string;
    textType?: string;
    hueHandlerY?: number;
    opaHandlerY?: number;
    pickerHandler?: Point;
    vmin?: number;
    wrapperTop?: number;
    wrapperLeft?: number;
    wrapperWidth?: number;
    wrapperHeight?: number;
    header?: {
        width?: number;
        width1?: number;
        height?: number;
        xtext?: number;
    };
    colorArea?: {
        y?: number;
        height?: number;
        widthSB?: number;
        widthOpa?: number;
        widthHue?: number;
    };
    buttonArea?: {
        height?: number;
        x?: number;
        width?: number;
        xText1?: number;
        xText2?: number;
        colorText1?: string;
        colorText2?: string;
    };
    window?: {
        width?: number;
        height?: number;
    };
    fill?: {
        color?: string;
        brightness?: string;
        hue?: string;
        opacity?: string;
        transparency?: string;
    };
}
export interface BoundingBoxes {
    wrapper: ClientRect;
    color: ClientRect;
    opacity: ClientRect;
    hue: ClientRect;
    ok: ClientRect;
    cancel: ClientRect;
    headline: ClientRect;
}
export interface CloseData {
    color?: Color;
    button?: number;
}
