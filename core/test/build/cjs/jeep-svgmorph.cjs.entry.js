'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-2a74ea97.js');

class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return this.x + ',' + this.y;
    }
    toFixed(n) {
        if (this.x % 1 === 0 && this.y % 1 === 0) {
            return this.x + ',' + this.y;
        }
        else {
            return this.x.toFixed(n) + ',' + this.y.toFixed(n);
        }
    }
    fromString(ptstr) {
        let arr = ptstr.split(',');
        let ret = false;
        if (arr.length === 2) {
            this.x = Number(arr[0]);
            this.y = Number(arr[1]);
            ret = true;
        }
        return ret;
    }
    clone() {
        let ret = new Point();
        ret.x = this.x;
        ret.y = this.y;
        return ret;
    }
    multNumber(a) {
        let ret = new Point();
        ret.x = this.x * a;
        ret.y = this.y * a;
        return ret;
    }
    multPoint(coeff) {
        let ret = new Point();
        ret.x = this.x * coeff.x;
        ret.y = this.y * coeff.y;
        return ret;
    }
    multMatrix(a) {
        let ret = new Point;
        ret.x = a[0][0] * this.x + a[0][1] * this.y;
        ret.y = a[1][0] * this.x + a[1][1] * this.y;
        return ret;
    }
    addPoint(pt) {
        let ret = new Point();
        ret.x = this.x + pt.x;
        ret.y = this.y + pt.y;
        return ret;
    }
    substractPoint(pt) {
        let ret = new Point();
        ret.x = this.x - pt.x;
        ret.y = this.y - pt.y;
        return ret;
    }
    middlePoint(pt) {
        let ret = new Point();
        ret.x = (this.x + pt.x) / 2.0;
        ret.y = (this.y + pt.y) / 2.0;
        return ret;
    }
    distance(pt) {
        let ret = new Point();
        ret.x = pt.x - this.x;
        ret.y = pt.y - this.y;
        return ret;
    }
    dotProduct(ptEnd, pt) {
        return (pt.x - this.x) * (ptEnd.x - this.x)
            + (pt.y - this.y) * (ptEnd.y - this.y);
    }
    isPointOnLine(ptEnd, pt) {
        let ret = false;
        let l = this.scalarDistance(ptEnd);
        let r = this.dotProduct(ptEnd, pt) / (l * l);
        let ptP = this.addPoint(ptEnd.substractPoint(this).multNumber(r));
        let s = ptP.scalarDistance(pt);
        if (Math.abs(s) < 0.0001)
            ret = true;
        return ret;
    }
    scalarDistance(pt) {
        return Math.sqrt((pt.x - this.x) * (pt.x - this.x) + (pt.y - this.y) * (pt.y - this.y));
    }
    atDistancePoint(pt, distance) {
        let distPt = this.distance(pt).multNumber(distance);
        return this.addPoint(distPt);
    }
}
class CubicBezierCurve {
    constructor(p1 = new Point(), p2 = new Point(), p3 = new Point(), p4 = new Point()) {
        this.P1 = p1;
        this.P2 = p2;
        this.P3 = p3;
        this.P4 = p4;
    }
    onCurvePointAtTpos(t) {
        let ret = new Point();
        if (t < 0)
            return null;
        if (t > 1)
            return null;
        ret = this.P1.multNumber(Math.pow(1.0 - t, 3))
            .addPoint(this.P2.multNumber(3 * t * Math.pow(1 - t, 2))
            .addPoint(this.P3.multNumber(3 * (1.0 - t) * Math.pow(t, 2))
            .addPoint(this.P4.multNumber(Math.pow(t, 3)))));
        return ret;
    }
    getSegmentBox(pt0, pt1, pt2, pt3) {
        let ret = {};
        ret.bBox = {};
        ret.bBox.minBox = new Point();
        ret.bBox.maxBox = new Point();
        ret.bPoints = [];
        ret.bTValues = [];
        let tvalues = new Array();
        let bounds = [new Array(), new Array()];
        let points = new Array();
        let a;
        let b;
        let c;
        let t;
        let t1;
        let t2;
        let b2ac;
        let sqrtb2ac;
        for (let i = 0; i < 2; i++) {
            if (i == 0) {
                b = 6 * pt0.x - 12 * pt1.x + 6 * pt2.x;
                a = -3 * pt0.x + 9 * pt1.x - 9 * pt2.x + 3 * pt3.x;
                c = 3 * pt1.x - 3 * pt0.x;
            }
            else {
                b = 6 * pt0.y - 12 * pt1.y + 6 * pt2.y;
                a = -3 * pt0.y + 9 * pt1.y - 9 * pt2.y + 3 * pt3.y;
                c = 3 * pt1.y - 3 * pt0.y;
            }
            if (Math.abs(a) < 1e-12) {
                if (Math.abs(b) < 1e-12) {
                    continue;
                }
                t = -c / b;
                if (0 < t && t < 1) {
                    tvalues.push(t);
                }
                continue;
            }
            b2ac = b * b - 4 * c * a;
            sqrtb2ac = Math.sqrt(b2ac);
            if (b2ac < 0) {
                continue;
            }
            t1 = (-b + sqrtb2ac) / (2 * a);
            if (0 < t1 && t1 < 1) {
                tvalues.push(t1);
            }
            t2 = (-b - sqrtb2ac) / (2 * a);
            if (0 < t2 && t2 < 1) {
                tvalues.push(t2);
            }
        }
        let x;
        let y;
        let j = tvalues.length;
        let jlen = j;
        let mt;
        while (j--) {
            t = tvalues[j];
            mt = 1 - t;
            x = (mt * mt * mt * pt0.x) + (3 * mt * mt * t * pt1.x) + (3 * mt * t * t * pt2.x) + (t * t * t * pt3.x);
            bounds[0][j] = x;
            y = (mt * mt * mt * pt0.y) + (3 * mt * mt * t * pt1.y) + (3 * mt * t * t * pt2.y) + (t * t * t * pt3.y);
            bounds[1][j] = y;
            let point = new Point();
            point.x = x;
            point.y = y;
            points[j] = point;
        }
        tvalues[jlen] = 0;
        tvalues[jlen + 1] = 1;
        points[jlen] = pt0;
        points[jlen + 1] = pt3;
        bounds[0][jlen] = pt0.x;
        bounds[1][jlen] = pt0.y;
        bounds[0][jlen + 1] = pt3.x;
        bounds[1][jlen + 1] = pt3.y;
        tvalues.length = bounds[0].length = bounds[1].length = points.length = jlen + 2;
        ret.bBox.minBox.x = Math.min.apply(null, bounds[0]);
        ret.bBox.minBox.y = Math.min.apply(null, bounds[1]);
        ret.bBox.maxBox.x = Math.max.apply(null, bounds[0]);
        ret.bBox.maxBox.y = Math.max.apply(null, bounds[1]);
        ret.bPoints = points;
        ret.bTValues = tvalues;
        return ret;
    }
}
class Matrix {
    constructor(size = null) {
        if (size != null) {
            this._size = size;
            this.zeros();
        }
    }
    set size(arr) {
        this._size = arr;
        this.zeros();
    }
    get size() {
        return this._size;
    }
    zeros() {
        let mat = [];
        let x;
        if (typeof this._size === "number")
            x = 1;
        if (this._size instanceof Array)
            x = this._size.length;
        switch (x) {
            case 1:
                let len = this._size instanceof Array ? this._size[0] : this._size;
                for (let i = 0; i < len; i++) {
                    mat = [...mat, 0];
                }
                break;
            case 2:
                for (let i = 0; i < this._size[0]; i++) {
                    let row = [];
                    for (let j = 0; j < this._size[1]; j++)
                        row = [...row, 0];
                    mat = [...mat, row];
                }
                break;
            default:
                mat = [];
        }
        this.matrix = mat;
    }
    identity() {
        let mat = [];
        let x;
        if (typeof this._size === "number")
            x = 1;
        if (this._size instanceof Array)
            x = this._size.length;
        switch (x) {
            case 1:
                let len = this._size instanceof Array ? this._size[0] : this._size;
                for (let i = 0; i < len; i++) {
                    if (i === 0) {
                        mat = [...mat, 1];
                    }
                    else {
                        mat = [...mat, 0];
                    }
                }
                break;
            case 2:
                for (let i = 0; i < this._size[0]; i++) {
                    let row = [];
                    for (let j = 0; j < this._size[1]; j++) {
                        if (i === j) {
                            row = [...row, 1];
                        }
                        else {
                            row = [...row, 0];
                        }
                    }
                    mat = [...mat, row];
                }
                break;
            default:
                mat = [];
        }
        this.matrix = mat;
    }
    clone() {
        let retMat = new Matrix(this._size);
        let mat = [];
        let x;
        if (typeof this._size === "number")
            x = 1;
        if (this._size instanceof Array)
            x = this._size.length;
        switch (x) {
            case 1:
                let len = this._size instanceof Array ? this._size[0] : this._size;
                for (let i = 0; i < len; i++) {
                    mat = [...mat, this.matrix[i]];
                }
                break;
            case 2:
                for (let i = 0; i < this._size[0]; i++) {
                    mat = [...mat, this.matrix[i]];
                }
                break;
            default:
                mat = [];
        }
        retMat.matrix = mat;
        return retMat;
    }
    circularPermuteRow(opt) {
        let index = opt.index ? opt.index : null;
        let rowIndex = opt.rowIndex ? opt.rowIndex : false;
        let mat = [];
        let x;
        if (typeof this._size === "number")
            x = 1;
        if (this._size instanceof Array)
            x = this._size.length;
        switch (x) {
            case 1:
                let len = this._size instanceof Array ? this._size[0] : this._size;
                for (let i = 0; i < len; i++) {
                    mat = [...mat, this.matrix[i]];
                }
                let times = index != null ? index : 0;
                while (times > 0) {
                    let t = mat.shift();
                    mat = [...mat, t];
                    times--;
                }
                break;
            case 2:
                for (let i = 0; i < this._size[0]; i++) {
                    mat = [...mat, this.matrix[i]];
                }
                for (let i = 0; i < this._size[0] - 1; i++) {
                    let times = rowIndex && this._size[0] === this._size[1] ? i + 1 : index != null ? index : 0;
                    while (times > 0) {
                        let t = mat[i].shift();
                        mat[i] = [...mat[i], t];
                        times--;
                    }
                }
                break;
            default:
                mat = [];
        }
        this.matrix = mat;
    }
    flipRow() {
        let mat = [];
        let len = this._size instanceof Array ? this._size[0] : this._size;
        for (let i = 0; i < len; i++) {
            mat = [...mat, this.matrix[i]];
        }
        this.matrix = mat.reverse();
    }
    multiply(bMat) {
        let row;
        let col;
        let tmp;
        let tmp1;
        if (typeof this._size === "number") {
            row = this._size;
            col = typeof bMat.size === "number" ? bMat.size : bMat.size[0] ? bMat.size[0] : null;
            tmp = !bMat.size[1] ? 1 : null;
        }
        else {
            row = this._size[0];
            tmp = this._size[1] ? this._size[1] : 1;
            col = bMat.size[1] ? bMat.size[1] : bMat.size[0] ? bMat.size[0] : bMat.size;
            tmp1 = !bMat.size[1] ? 1 : bMat.size[0];
            tmp = tmp1 === tmp ? tmp : null;
        }
        if (row === null || col === null || tmp === null)
            return null;
        let rMat = new Matrix([row, col]);
        rMat.zeros();
        if (tmp === 1) {
            let a = this.matrix;
            let b = bMat.matrix;
            for (let i = 0; i < row; i++) {
                for (let j = 0; j < col; j++) {
                    rMat.matrix[i][j] = rMat.matrix[i][j] + a[i] * b[j];
                }
            }
        }
        else {
            for (let i = 0; i < row; i++) {
                for (let j = 0; j < col; j++) {
                    for (let k = 0; k < tmp; k++) {
                        rMat.matrix[i][j] = rMat.matrix[i][j] + this.matrix[i][k] * bMat.matrix[k][j];
                    }
                }
            }
        }
        return rMat;
    }
    multiplyByVectorPoints(vPoints) {
        let nPoints = [];
        let mat = this.matrix;
        if (typeof this._size === "number") {
            if (this._size != vPoints.length)
                return null;
            nPoints[0] = new Point();
            for (let i = 0; i < this._size; i++) {
                nPoints[0] = nPoints[0].addPoint(vPoints[i].multNumber(mat[i]));
            }
        }
        else {
            let row = !this._size[1] ? 1 : this._size[0];
            let col = this._size[1] ? this._size[1] : this._size[0];
            if (col != vPoints.length)
                return null;
            for (let i = 0; i < row; i++) {
                nPoints[i] = new Point();
                for (let j = 0; j < col; j++) {
                    nPoints[i] = nPoints[i].addPoint(vPoints[j].multNumber(mat[i][j]));
                }
            }
        }
        return nPoints;
    }
}

const isALetter = (charVal) => {
    if (charVal.toUpperCase() != charVal.toLowerCase())
        return true;
    else
        return false;
};
const maxSegmentPath = (cBPaths) => {
    let idMax = 0;
    let segMax = cBPaths[0].cLength.length;
    for (let i = 1; i < cBPaths.length; i++) {
        if (cBPaths[i].cLength.length > segMax) {
            idMax = i;
            segMax = cBPaths[i].cLength.length;
        }
    }
    return { idx: idMax, segMax: segMax };
};
const isRegularShape = (shape) => {
    let ret = false;
    let sideLength = Math.max(...shape.cLength);
    if (Math.abs(sideLength * shape.cLength.length - shape.tLength) < 0.01)
        ret = true;
    return ret;
};
const splitCubicBezier = (cB, z) => {
    // check if cB are all on a line 
    let retCurves = {};
    let r1 = cB[0].isPointOnLine(cB[3], cB[1]);
    let r2 = cB[0].isPointOnLine(cB[3], cB[2]);
    if (r1 && r2) {
        retCurves.C1 = [];
        retCurves.C2 = [];
        retCurves.C1 = [...retCurves.C1, cB[0]];
        let ptEnd = cB[0].addPoint(cB[3].substractPoint(cB[0]).multNumber(z));
        let pt1 = cB[0].addPoint(ptEnd.substractPoint(cB[0]).multNumber(1.0 / 3.0));
        let pt2 = cB[0].addPoint(ptEnd.substractPoint(cB[0]).multNumber(2.0 / 3.0));
        retCurves.C1 = [...retCurves.C1, pt1];
        retCurves.C1 = [...retCurves.C1, pt2];
        retCurves.C1 = [...retCurves.C1, ptEnd];
        retCurves.C2 = [...retCurves.C2, ptEnd];
        pt1 = ptEnd.addPoint(cB[3].substractPoint(ptEnd).multNumber(1.0 / 3.0));
        pt2 = ptEnd.addPoint(cB[3].substractPoint(ptEnd).multNumber(2.0 / 3.0));
        retCurves.C2 = [...retCurves.C2, pt1];
        retCurves.C2 = [...retCurves.C2, pt2];
        retCurves.C2 = [...retCurves.C2, cB[3]];
    }
    else {
        let mat = new Matrix([4, 4]);
        mat.identity();
        let z1 = z - 1;
        mat.matrix[1][0] = -z1;
        mat.matrix[2][0] = z1 * z1;
        mat.matrix[3][0] = -z1 * z1 * z1;
        mat.matrix[1][1] = z;
        mat.matrix[2][1] = -2 * z1 * z;
        mat.matrix[3][1] = 3 * z1 * z1 * z;
        mat.matrix[2][2] = z * z;
        mat.matrix[3][2] = -3 * z1 * z * z;
        mat.matrix[3][3] = z * z * z;
        retCurves.C1 = mat.multiplyByVectorPoints(cB);
        // apply circular permutation and flip to the matrix
        mat.circularPermuteRow({ rowIndex: true });
        mat.flipRow();
        retCurves.C2 = mat.multiplyByVectorPoints(cB);
    }
    return retCurves;
};
const getCubicBezierFromPoints = (points) => {
    let d = "";
    for (let i = 0; i < points.length - 1; i += 3) {
        if (i === 0)
            d = d.concat('M ').concat(points[i].toFixed(2)).concat(' ');
        d = d.concat('C ').concat(points[i + 1].toFixed(2)).concat(' ');
        d = d.concat(points[i + 2].toFixed(2)).concat(' ');
        d = d.concat(points[i + 3].toFixed(2)).concat(' ');
    }
    d = d.trim();
    return d;
};
const initCurvePoints = (P1, P2, P3, P4) => {
    let pts = [];
    pts = [...pts, P1];
    pts = [...pts, P2];
    pts = [...pts, P3];
    pts = [...pts, P4];
    return pts;
};
const getPointsFromCBPath = (cB) => {
    const arr = cB.cBz.split('C');
    let points = [];
    for (let i = 0; i < arr.length; i++) {
        if (i === 0 && arr[i].charAt(0) === 'M')
            arr[i] = arr[i].slice(1);
        let ar = arr[i].trim().split(' ');
        if (ar.length > 0) {
            for (let j = 0; j < ar.length; j++) {
                let pt = new Point();
                let res = pt.fromString(ar[j]);
                if (res)
                    points = [...points, pt];
            }
        }
    }
    return points;
};
const permuteCubicBezier = (points, startIndex) => {
    let newPoints = [];
    newPoints = permutePoints(points, startIndex);
    let cBz = getCubicBezierFromPoints(newPoints);
    return cBz;
};
const permutePoints = (points, index) => {
    let pts = points;
    let t = [];
    if (index > 0) {
        //circular permutation
        for (let i = 0; i < index; i++) {
            // remove the first
            pts.splice(0, 1);
            // move the next two to the end
            for (let j = 0; j < 2; j++) {
                t = pts.shift();
                pts = [...pts, t];
            }
            // copy the first to the end
            t = pts[0];
            pts = [...pts, t];
        }
    }
    else {
        //reverse circular permutation
        for (let i = 0; i < Math.abs(index); i++) {
            // remove the last one
            pts.splice(-1);
            // move the last two to the top
            for (let j = 0; j < 2; j++) {
                pts.splice(0, 0, pts.splice(-1)[0]);
            }
            // copy the last one to top
            pts.splice(0, 0, pts[pts.length - 1]);
        }
    }
    return pts;
};
const cubicBezierAverageLength = (P1, P2, P3, P4) => {
    let lgthMin = P1.scalarDistance(P4);
    let lgthMax = P1.scalarDistance(P2) + P2.scalarDistance(P3) + P3.scalarDistance(P4);
    return (lgthMax + lgthMin) / 2;
};
const alignSegmentPath = (cB, ratio) => {
    let points = [];
    let segLength = [];
    let newPoints = [];
    points = getPointsFromCBPath(cB);
    if (ratio > 1.0) {
        // generate new points by splitting curves
        for (let i = 0; i < points.length - 1; i += 3) {
            let nbSplit = ratio;
            if (i === 0)
                newPoints = [...newPoints, points[i]];
            let tmpPt = initCurvePoints(points[i], points[i + 1], points[i + 2], points[i + 3]);
            while (nbSplit > 1) {
                let z = 1.0 / nbSplit;
                let pts = initCurvePoints(tmpPt[0], tmpPt[1], tmpPt[2], tmpPt[3]);
                let curves = splitCubicBezier(pts, z);
                newPoints = [...newPoints, curves.C1[1]];
                newPoints = [...newPoints, curves.C1[2]];
                newPoints = [...newPoints, curves.C1[3]];
                segLength = [...segLength, cubicBezierAverageLength(curves.C1[0], curves.C1[1], curves.C1[2], curves.C1[3])];
                nbSplit--;
                if (nbSplit === 1) {
                    newPoints = [...newPoints, curves.C2[1]];
                    newPoints = [...newPoints, curves.C2[2]];
                    newPoints = [...newPoints, curves.C2[3]];
                    segLength = [...segLength, cubicBezierAverageLength(curves.C2[0], curves.C2[1], curves.C2[2], curves.C2[3])];
                }
                else {
                    tmpPt = initCurvePoints(curves.C2[0], curves.C2[1], curves.C2[2], curves.C2[3]);
                }
            }
        }
        points = newPoints;
    }
    return { points: points, segLength: segLength };
};
const addSegmentToPath = (points, segLength, nSegment) => {
    let newPoints = points;
    let newSegLength = segLength;
    let lastPoint = newPoints.slice(-1)[0];
    for (let i = 0; i < nSegment; i++) {
        newPoints = [...newPoints, lastPoint];
        newPoints = [...newPoints, lastPoint];
        newPoints = [...newPoints, lastPoint];
        newSegLength = [...newSegLength, 0];
    }
    return { points: newPoints, segLength: newSegLength };
};
const alignPathSegmentWithMax = (cB, nSegment) => {
    let cBzNew = {};
    cBzNew.index = cB.index;
    cBzNew.startIndex = cB.startIndex;
    cBzNew.oriCBz = cB.oriCBz;
    cBzNew.tLength = cB.tLength;
    cBzNew.cLength = [];
    if (nSegment / cB.cLength.length < 1.0)
        return Promise.resolve(null);
    // find number of splits
    let nbSplit = Math.floor(nSegment / cB.cLength.length);
    // find number of adds
    let nbAdds = nSegment % cB.cLength.length;
    let res;
    if (nbSplit > 1) {
        // create splits
        res = alignSegmentPath(cB, nbSplit);
        // create adds
        if (nbAdds > 0)
            res = addSegmentToPath(res.points, res.segLength, nbAdds);
    }
    else {
        res = {};
        res.points = getPointsFromCBPath(cB);
        res.segLength = cB.cLength;
        // create adds
        if (nbAdds > 0)
            res = addSegmentToPath(res.points, res.segLength, nbAdds);
    }
    cBzNew.cLength = res.segLength;
    if (cB.startIndex != 0) {
        // circular permutation
        cBzNew.cBz = permuteCubicBezier(res.points, cB.startIndex);
    }
    else {
        cBzNew.cBz = getCubicBezierFromPoints(res.points);
    }
    return Promise.resolve(cBzNew);
};
const alignPathSegments = async (cBPaths, nSegment) => {
    let alignCBPaths = [];
    let pathMax = maxSegmentPath(cBPaths);
    let nSeg = nSegment && nSegment != null && nSegment > cBPaths[pathMax.idx].cLength.length ? nSegment : cBPaths[pathMax.idx].cLength.length;
    for (let i = 0; i < cBPaths.length; i++) {
        if (nSeg > cBPaths[i].cLength.length) {
            let newPath = await alignPathSegmentWithMax(cBPaths[i], nSeg);
            alignCBPaths = [...alignCBPaths, newPath];
        }
        else {
            if (cBPaths[i].startIndex != 0) {
                let points = getPointsFromCBPath(cBPaths[i]);
                let cBz = permuteCubicBezier(points, cBPaths[i].startIndex);
                cBPaths[i].cBz = cBz;
            }
            alignCBPaths = [...alignCBPaths, cBPaths[i]];
        }
    }
    return Promise.resolve(alignCBPaths);
};
const cubicBezierfromPath = async (path, startIndex) => {
    let cBezier = {};
    cBezier.index = 0;
    cBezier.startIndex = startIndex ? startIndex : 0;
    cBezier.cBz = "";
    cBezier.oriCBz = "";
    cBezier.cType = '';
    cBezier.lPoint = new Point();
    cBezier.cLength = [];
    cBezier.tLength = 0;
    if (path.length > 0 && isALetter(path.charAt(0)) && path.charAt(0).toUpperCase() === "M") {
        let oriPath = path.trim().replace(/([A-Za-z](?!$))/g, ' $1 ')
            .trim().replace(/([\-](?!$))/g, ' $1').split(/[ ,]+/);
        cBezier.index = 3;
        cBezier.lPoint.x = Number(oriPath[1]);
        cBezier.lPoint.y = Number(oriPath[2]);
        cBezier.cBz = cBezier.cBz.concat('M ');
        cBezier.cBz = cBezier.cBz.concat(cBezier.lPoint.toFixed(2) + " ");
        while (cBezier.index < oriPath.length) {
            let letter = false;
            if (isALetter(oriPath[cBezier.index].charAt(0))) {
                cBezier.cType = oriPath[cBezier.index].charAt(0);
                letter = true;
            }
            switch (cBezier.cType.toUpperCase()) {
                // Line case
                case "H":
                case "V":
                case "L":
                    cBezier = await lineToCubicBezier(cBezier, oriPath, letter);
                    break;
                case "Q":
                    //TODO add T & t
                    cBezier = await quadraticToCubicBezier(cBezier, oriPath, letter);
                    break;
                case "C":
                    //TODO add S & s
                    cBezier = await cubicToCubicBezier(cBezier, oriPath, letter);
                    break;
                // TODO for arc
                case "Z":
                    cBezier.cBz = cBezier.cBz.concat("Z");
                    break;
                default:
            }
        }
    }
    cBezier.cBz = cBezier.cBz.trim();
    cBezier.oriCBz = cBezier.cBz;
    return Promise.resolve(cBezier);
};
const lineToCubicBezier = (cBezier, oPath, letter) => {
    let cBz = cBezier;
    let tPoint = new Point();
    let nPoint = new Point();
    if (letter) {
        switch (cBz.cType.toUpperCase()) {
            case "H":
                tPoint.x = Number(oPath[cBz.index + 1]);
                tPoint.y = cBz.lPoint.y;
                cBz.index += 2;
                break;
            case "V":
                tPoint.y = Number(oPath[cBz.index + 1]);
                tPoint.x = cBz.lPoint.x;
                cBz.index += 2;
                break;
            case "L":
                tPoint.x = Number(oPath[cBz.index + 1]);
                tPoint.y = Number(oPath[cBz.index + 2]);
                cBz.index += 3;
                break;
            default:
        }
    }
    else {
        if (cBz.cType.toUpperCase() === "L") {
            tPoint.x = Number(oPath[cBz.index]);
            tPoint.y = Number(oPath[cBz.index + 1]);
            cBz.index += 2;
        }
    }
    if (cBz.cType === "l") {
        nPoint.x = cBz.lPoint.x + tPoint.x;
        nPoint.y = cBz.lPoint.y + tPoint.y;
    }
    else if (cBz.cType === "h") {
        nPoint.x = cBz.lPoint.x + tPoint.x;
        nPoint.y = cBz.lPoint.y;
    }
    else if (cBz.cType === "v") {
        nPoint.y = cBz.lPoint.y + tPoint.y;
        nPoint.x = cBz.lPoint.x;
    }
    else {
        nPoint = tPoint;
    }
    cBz.cBz = cBz.cBz.concat('C ');
    cBz.cBz = cBz.cBz.concat(cBz.lPoint.atDistancePoint(nPoint, 1.0 / 3.0).toFixed(2) + " ");
    cBz.cBz = cBz.cBz.concat(cBz.lPoint.atDistancePoint(nPoint, 2.0 / 3.0).toFixed(2) + " ");
    cBz.cBz = cBz.cBz.concat(nPoint.toFixed(2) + " ");
    let lgth = cBz.lPoint.scalarDistance(nPoint);
    cBz.cLength = [...cBz.cLength, lgth];
    cBz.tLength += lgth;
    cBz.lPoint = nPoint;
    return Promise.resolve(cBz);
};
const quadraticToCubicBezier = (cBezier, oPath, letter) => {
    let cBz = cBezier;
    let tP2 = new Point();
    let tP3 = new Point();
    let nP2 = new Point();
    let nP3 = new Point();
    if (letter) {
        tP2.x = Number(oPath[cBz.index + 1]);
        tP2.y = Number(oPath[cBz.index + 2]);
        tP3.x = Number(oPath[cBz.index + 3]);
        tP3.y = Number(oPath[cBz.index + 4]);
        cBz.index += 5;
    }
    else {
        tP2.x = Number(oPath[cBz.index]);
        tP2.y = Number(oPath[cBz.index + 1]);
        tP3.x = Number(oPath[cBz.index + 2]);
        tP3.y = Number(oPath[cBz.index + 3]);
        cBz.index += 4;
    }
    if (cBz.cType === "q") {
        nP2.x = cBz.lPoint.x + tP2.x;
        nP2.y = cBz.lPoint.y + tP2.y;
        nP3.x = cBz.lPoint.x + tP3.x;
        nP3.y = cBz.lPoint.y + tP3.y;
    }
    else {
        nP2 = tP2;
        nP3 = tP3;
    }
    cBz.cBz = cBz.cBz.concat('C ');
    const cP1 = cBz.lPoint.addPoint(nP2.substractPoint(cBz.lPoint).multNumber(2.0 / 3.0));
    cBz.cBz = cBz.cBz.concat(cP1.toFixed(2) + " ");
    const cP2 = nP3.addPoint(nP2.substractPoint(nP3).multNumber(2.0 / 3.0));
    cBz.cBz = cBz.cBz.concat(cP2.toFixed(2) + " ");
    cBz.cBz = cBz.cBz.concat(nP3.toFixed(2) + " ");
    // quick approximate length
    let lgthMin = cBz.lPoint.scalarDistance(nP3);
    let lgthMax = cBz.lPoint.scalarDistance(cP1) + cP1.scalarDistance(cP2) + cP2.scalarDistance(nP3);
    cBz.cLength = [...cBz.cLength, (lgthMax + lgthMin) / 2];
    cBz.tLength += (lgthMax + lgthMin) / 2;
    cBz.lPoint = nP3;
    return Promise.resolve(cBz);
};
const cubicToCubicBezier = (cBezier, oPath, letter) => {
    let cBz = cBezier;
    let tP2 = new Point();
    let tP3 = new Point();
    let tP4 = new Point();
    let nP2 = new Point();
    let nP3 = new Point();
    let nP4 = new Point();
    if (letter) {
        tP2.x = Number(oPath[cBz.index + 1]);
        tP2.y = Number(oPath[cBz.index + 2]);
        tP3.x = Number(oPath[cBz.index + 3]);
        tP3.y = Number(oPath[cBz.index + 4]);
        tP4.x = Number(oPath[cBz.index + 5]);
        tP4.y = Number(oPath[cBz.index + 6]);
        cBz.index += 7;
    }
    else {
        tP2.x = Number(oPath[cBz.index]);
        tP2.y = Number(oPath[cBz.index + 1]);
        tP3.x = Number(oPath[cBz.index + 2]);
        tP3.y = Number(oPath[cBz.index + 3]);
        tP4.x = Number(oPath[cBz.index + 4]);
        tP4.y = Number(oPath[cBz.index + 5]);
        cBz.index += 6;
    }
    if (cBz.cType === "c") {
        nP2.x = cBz.lPoint.x + tP2.x;
        nP2.y = cBz.lPoint.y + tP2.y;
        nP3.x = cBz.lPoint.x + tP3.x;
        nP3.y = cBz.lPoint.y + tP3.y;
        nP4.x = cBz.lPoint.x + tP4.x;
        nP4.y = cBz.lPoint.y + tP4.y;
    }
    else {
        nP2 = tP2;
        nP3 = tP3;
        nP4 = tP4;
    }
    cBz.cBz = cBz.cBz.concat('C ');
    cBz.cBz = cBz.cBz.concat(nP2.toFixed(2) + " ");
    cBz.cBz = cBz.cBz.concat(nP3.toFixed(2) + " ");
    cBz.cBz = cBz.cBz.concat(nP4.toFixed(2) + " ");
    // quick approximate length
    let len = cubicBezierAverageLength(cBz.lPoint, nP2, nP3, nP4);
    cBz.cLength = [...cBz.cLength, len];
    cBz.tLength += len;
    cBz.lPoint = nP4;
    return Promise.resolve(cBz);
};

const JeepSvgmorph = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        //************************
        //* Property Definitions *
        //************************
        /**
         * The preselected duration
         */
        this.duration = "2000ms";
        /**
         * The preselected calculation mode
         */
        this.calcmode = "linear";
        this._alignPathList = [];
        this._cBList = [];
        this._valuesPath = "";
        this._valuesFill = "";
        this._isUniqueColor = false;
    }
    //*****************************
    //* Watch on Property Changes *
    //*****************************
    parseDurationProp(newValue) {
        this.innerDuration = newValue ? newValue : "2000ms";
    }
    parseRepeatcountProp(newValue) {
        this.innerRepeatcount = newValue ? newValue : null;
    }
    parsePathindexProp(newValue) {
        this.innerPathindex = newValue ? this._removeCarriageReturn(newValue).split(';').map(Number) : null;
    }
    parseNsegmentProp(newValue) {
        this.innerNsegment = newValue ? Number(newValue) : null;
    }
    parseKeytimesProp(newValue) {
        this.innerKeytimes = newValue ? this._removeCarriageReturn(newValue) : null;
    }
    parseCalcmodeProp(newValue) {
        this.innerCalcmode = newValue ? newValue : "linear";
    }
    parseKeysplinesProp(newValue) {
        this.innerKeysplines = newValue ? this._removeCarriageReturn(newValue) : null;
    }
    parseFillProp(newValue) {
        this.innerFill = newValue ? newValue : null;
    }
    //*********************
    //* Event Definitions *
    //*********************
    //*******************************
    //* Listen to Event Definitions *
    //*******************************
    //**********************
    //* Method Definitions *
    //**********************
    /**
     * Method initialize
     */
    async init() {
        return await this._init();
    }
    async getStateProperties() {
        const stateProperties = {};
        stateProperties.duration = this.innerDuration;
        stateProperties.repeatCount = this.innerRepeatcount;
        stateProperties.pathIndex = this.innerPathindex;
        stateProperties.nSegment = this.innerNsegment;
        stateProperties.keyTimes = this.innerKeytimes;
        stateProperties.calcMode = this.innerCalcmode;
        stateProperties.keySplines = this.innerKeysplines;
        stateProperties.fill = this.innerFill;
        return stateProperties;
    }
    async getPath() {
        return this._getPath();
    }
    async getPathList() {
        return this._pathList;
    }
    async getFillColor() {
        return this._fillColor;
    }
    renderSVGFirstPath() {
        return this._renderSVGFirstPath();
    }
    async getAlignedPaths(calc) {
        if (calc)
            await this._alignPaths();
        return this._alignPathList;
    }
    //*******************************
    //* Component Lifecycle Methods *
    //*******************************
    async componentWillLoad() {
        await this.init();
    }
    async componentDidLoad() {
        this._element = this.el.shadowRoot;
        if (this.isSVG) {
            await this._renderSVGFirstPath();
        }
    }
    //******************************
    //* Private Method Definitions *
    //******************************
    async _init() {
        this.parseDurationProp(this.duration ? this.duration : "2000ms");
        this.parsePathindexProp(this.pathindex ? this.pathindex : null);
        this.parseNsegmentProp(this.nsegment ? this.nsegment : null);
        this.parseRepeatcountProp(this.repeatcount ? this.repeatcount : null);
        this.parseFillProp(this.fill ? this.fill : null);
        this.parseKeytimesProp(this.keytimes ? this.keytimes : null);
        this.parseCalcmodeProp(this.calcmode ? this.calcmode : 'linear');
        this.parseKeysplinesProp(this.keysplines ? this.keysplines : null);
        if (this.innerFill != null) {
            this._uniqueColor = this.innerFill;
            this._isUniqueColor = true;
        }
        await this.getPath();
        return;
    }
    _removeCarriageReturn(s) {
        let a = s.split(/\r?\n|\r/g);
        let c = s;
        if (a.length > 1) {
            c = '';
            for (let j = 0; j < a.length; j++) {
                c = c.concat(' ' + a[j].trim());
            }
        }
        return c;
    }
    _setSVGAttributes() {
        if (this._svgOptions.width)
            this._svg.setAttribute('width', this._svgOptions.width);
        if (this._svgOptions.height)
            this._svg.setAttribute('height', this._svgOptions.height);
        if (this._svgOptions.viewBox)
            this._svg.setAttribute('viewBox', this._svgOptions.viewBox);
        if (this._svgOptions.xmlns)
            this._svg.setAttribute('xmlns', this._svgOptions.xmlns);
    }
    _drawFirstPath() {
        this._path = this._svg.querySelector("#initPath");
        this._path.setAttribute('d', this._pathList[0]);
        if (this._fillColor.length > 0)
            this._path.setAttribute('fill', this._fillColor[0]);
    }
    async _getPath() {
        const svg = this.el.querySelector('svg');
        this.isSVG = false;
        if (svg !== null) {
            this._svgOptions = {};
            this._pathList = [];
            this._fillColor = [];
            let width = svg.getAttribute('width');
            let height = svg.getAttribute('height');
            let viewBox = svg.getAttribute('viewBox');
            let xmlns = svg.getAttribute('xmlns');
            this._svgOptions.width = width ? width : false;
            this._svgOptions.height = height ? height : false;
            this._svgOptions.viewBox = viewBox ? viewBox : false;
            this._svgOptions.xmlns = xmlns ? xmlns : false;
            if (svg.childElementCount > 0) {
                for (let i = 0; i < svg.childElementCount; i++) {
                    let d = svg.children[i].getAttribute('d');
                    let a = d.split(/\r?\n|\r/g);
                    if (a.length > 1) {
                        let c = '';
                        for (let j = 0; j < a.length; j++) {
                            c = c.concat(' ' + a[j].trim());
                        }
                        this._pathList = [...this._pathList, c.trim()];
                    }
                    else {
                        this._pathList = [...this._pathList, d];
                    }
                    const color = svg.children[i].getAttribute('fill');
                    if (color != null && !this._isUniqueColor) {
                        this._fillColor = [...this._fillColor, color];
                    }
                }
            }
            const ncolor = await this.getOccurrence(this._fillColor, this._fillColor[0]);
            if (ncolor === this._fillColor.length) {
                this._isUniqueColor = true;
                this._uniqueColor = this._fillColor[0];
            }
            this.el.removeChild(svg);
            let kTimes = this.innerKeytimes != null ? this.innerKeytimes.split(';').length : 0;
            let kSplines = this.innerKeysplines != null ? this.innerKeysplines.split(';').length : 0;
            let b = this.innerCalcmode === 'spline' && kSplines != kTimes - 1 ? false : true;
            let c = kTimes === 0 || kTimes === this._pathList.length ? true : false;
            if (b && c)
                this.isSVG = true;
        }
    }
    async _alignPaths() {
        // align paths
        let startIndex;
        for (let i = 0; i < this._pathList.length; i++) {
            startIndex = this.innerPathindex != null && this.innerPathindex[i] ? this.innerPathindex[i] : 0;
            const cbp = await cubicBezierfromPath(this._pathList[i], startIndex);
            this._cBList = [...this._cBList, cbp];
        }
        this._alignPathList = await alignPathSegments(this._cBList, this.innerNsegment);
        return;
    }
    _setAnimation() {
        // path animation set values
        let animPath = this._path.querySelector('#animPath');
        this._valuesPath = "";
        for (let i = 0; i < this._alignPathList.length; i++) {
            if (this._alignPathList[i].cBz != null)
                this._valuesPath = this._valuesPath.concat(this._alignPathList[i].cBz + ';');
        }
        animPath.setAttribute("attributeName", "d");
        animPath.setAttribute("values", this._valuesPath);
        animPath.setAttribute("dur", this.innerDuration);
        animPath.setAttribute("xlink:href", "#initPath");
        if (this.innerFill != null)
            animPath.setAttribute("fill", this.innerFill);
        if (this.innerRepeatcount != null)
            animPath.setAttribute("repeatCount", this.innerRepeatcount);
        if (this.innerKeytimes != null)
            animPath.setAttribute("keyTimes", this.innerKeytimes);
        animPath.setAttribute("calcMode", this.innerCalcmode);
        if (this.innerKeysplines != null)
            animPath.setAttribute("keySplines", this.innerKeysplines);
        if (this._fillColor.length > 1 && !this._isUniqueColor) {
            let animFill = this._path.querySelector('#animFill');
            ;
            // fill animation set values
            this._valuesFill = "";
            for (let i = 0; i < this._fillColor.length; i++) {
                if (this._alignPathList[i].cBz != null)
                    this._valuesFill = this._valuesFill.concat(this._fillColor[i] + ';');
            }
            animFill.setAttribute("attributeName", "fill");
            animFill.setAttribute("values", this._valuesFill);
            animFill.setAttribute("dur", this.innerDuration);
            animFill.setAttribute("xlink:href", "#initPath");
            if (this.innerFill != null)
                animFill.setAttribute("fill", this.innerFill);
            if (this.innerRepeatcount != null)
                animFill.setAttribute("repeatCount", this.innerRepeatcount);
            if (this.innerKeytimes != null)
                animPath.setAttribute("keyTimes", this.innerKeytimes);
            animPath.setAttribute("calcMode", this.innerCalcmode);
            if (this.innerKeysplines != null)
                animPath.setAttribute("keySplines", this.innerKeysplines);
        }
        return;
    }
    async getOccurrence(array, value) {
        return array.filter((v) => (v === value)).length;
    }
    async _renderSVGFirstPath() {
        this._container = this._element.querySelector('#morph-container');
        this._svg = this._container.querySelector('#morph-svg');
        this._setSVGAttributes();
        if (this._pathList && this._pathList[0]) {
            this._drawFirstPath();
            await this._alignPaths();
            this._setAnimation();
        }
        return Promise.resolve();
    }
    //*************************
    //* Rendering JSX Element *
    //*************************
    render() {
        if (this.isSVG) {
            return (core.h("div", { id: "morph-container" }, core.h("div", { id: "morph-svg-container" }, core.h("svg", { id: "morph-svg", width: "500", height: "500", viewBox: "0 0 500 500", xmlns: "http://www.w3.org/2000/svg" }, core.h("path", { id: "initPath" }, core.h("animate", { id: "animPath", begin: "initPath.click" }), this._fillColor.length > 1 && !this._uniqueColor
                ? core.h("animate", { id: "animFill", begin: "animPath.begin" })
                : null)))));
        }
        else {
            return (core.h("div", { id: "fake-container" }));
        }
    }
    get el() { return core.getElement(this); }
    static get watchers() { return {
        "duration": ["parseDurationProp"],
        "repeatcount": ["parseRepeatcountProp"],
        "pathindex": ["parsePathindexProp"],
        "nsegment": ["parseNsegmentProp"],
        "keytimes": ["parseKeytimesProp"],
        "calcmode": ["parseCalcmodeProp"],
        "keysplines": ["parseKeysplinesProp"],
        "fill": ["parseFillProp"]
    }; }
    static get style() { return ":host {\n    --height:500px;\n    --width:500px;\n    --top:30px;\n    --left:10px;\n}\n#morph-container {\n    position:relative;\n    left:0px;\n    top:0px;\n    width: 100%;\n    height:calc(var(--height) + var(--top));\n}\n#morph-svg-container {\n    position:relative;\n    left:var(--left);\n    top:var(--top);\n    width:var(--width);\n    height:var(--height);\n}\nsvg {\n    width: 100%;\n    height: 100%;\n}"; }
};

exports.jeep_svgmorph = JeepSvgmorph;
