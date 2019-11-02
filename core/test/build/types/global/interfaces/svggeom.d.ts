import { Point } from '../../utils/geom-maths';
export interface CubicBezier {
    index: number;
    cBz: string;
    oriCBz: string;
    lPoint: Point;
    cType: string;
    cLength: Array<number>;
    tLength: number;
    startIndex: number;
}
export interface CubicBezierSplitCurves {
    C1: Array<Point>;
    C2: Array<Point>;
}
export interface BoundingBox {
    minBox: Point;
    maxBox: Point;
}
