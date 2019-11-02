import { BoundingBox } from '../global/interfaces/svggeom';
export declare class Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    toString(): string;
    toFixed(n: number): string;
    fromString(ptstr: string): boolean;
    clone(): Point;
    multNumber(a: number): Point;
    multPoint(coeff: Point): Point;
    multMatrix(a: Array<Array<number>>): Point;
    addPoint(pt: Point): Point;
    substractPoint(pt: Point): Point;
    middlePoint(pt: Point): Point;
    distance(pt: Point): Point;
    dotProduct(ptEnd: Point, pt: Point): number;
    isPointOnLine(ptEnd: Point, pt: Point): boolean;
    scalarDistance(pt: Point): number;
    atDistancePoint(pt: Point, distance: number): Point;
}
export declare class CubicBezierCurve {
    P1: Point;
    P2: Point;
    P3: Point;
    P4: Point;
    constructor(p1?: Point, p2?: Point, p3?: Point, p4?: Point);
    onCurvePointAtTpos(t: number): Point;
    getSegmentBox(pt0: Point, pt1: Point, pt2: Point, pt3: Point): {
        bBox: BoundingBox;
        bPoints: Array<Point>;
        bTValues: Array<number>;
    };
}
export declare class Matrix {
    matrix: Array<Array<number>> | Array<number>;
    private _size;
    constructor(size?: Array<number> | number);
    size: Array<number> | number;
    zeros(): void;
    identity(): void;
    clone(): Matrix;
    circularPermuteRow(opt: any): void;
    flipRow(): void;
    multiply(bMat: Matrix): Matrix;
    multiplyByVectorPoints(vPoints: Array<Point>): Array<Point>;
}
