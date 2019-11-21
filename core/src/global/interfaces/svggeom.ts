import { MPoint } from '../../utils/geom-maths';
export interface CubicBezier {
    index: number;
    cBz: string;
    oriCBz: string;
    lPoint: MPoint;
    cType: string;
    cLength: Array<number>;
    tLength: number;
    startIndex: number;
}

export interface CubicBezierSplitCurves {
    C1: Array<MPoint>;
    C2: Array<MPoint>;
}
export interface BoundingBox {
    minBox:MPoint;
    maxBox:MPoint;
}
