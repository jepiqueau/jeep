import { Point } from './geom-maths';
import { CubicBezier, /*BoundingBox,*/ CubicBezierSplitCurves } from '../global/interfaces/svggeom';
export declare const isALetter: (charVal: any) => Boolean;
export declare const maxSegmentPath: (cBPaths: CubicBezier[]) => any;
export declare const isRegularShape: (shape: CubicBezier) => boolean;
export declare const splitCubicBezier: (cB: Point[], z: number) => CubicBezierSplitCurves;
export declare const getCubicBezierFromPoints: (points: Point[]) => string;
export declare const initCurvePoints: (P1: Point, P2: Point, P3: Point, P4: Point) => Point[];
export declare const getPointsFromCBPath: (cB: CubicBezier) => Point[];
export declare const permuteCubicBezier: (points: Point[], startIndex: number) => string;
export declare const permutePoints: (points: Point[], index: number) => any[];
export declare const cubicBezierAverageLength: (P1: Point, P2: Point, P3: Point, P4: Point) => number;
export declare const alignSegmentPath: (cB: CubicBezier, ratio: number) => {
    points: Point[];
    segLength: number[];
};
export declare const addSegmentToPath: (points: Point[], segLength: number[], nSegment: number) => {
    points: Point[];
    segLength: number[];
};
export declare const alignPathSegmentWithMax: (cB: CubicBezier, nSegment: number) => Promise<CubicBezier>;
export declare const alignPathSegments: (cBPaths: CubicBezier[], nSegment?: number) => Promise<CubicBezier[]>;
export declare const cubicBezierfromPath: (path: string, startIndex?: number) => Promise<CubicBezier>;
export declare const lineToCubicBezier: (cBezier: CubicBezier, oPath: string[], letter: boolean) => Promise<CubicBezier>;
export declare const quadraticToCubicBezier: (cBezier: CubicBezier, oPath: string[], letter: boolean) => Promise<CubicBezier>;
export declare const cubicToCubicBezier: (cBezier: CubicBezier, oPath: string[], letter: boolean) => Promise<CubicBezier>;
