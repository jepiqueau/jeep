var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, h, g as getElement } from './core-fa39fbc1.js';
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Point.prototype.toString = function () {
        return this.x + ',' + this.y;
    };
    Point.prototype.toFixed = function (n) {
        if (this.x % 1 === 0 && this.y % 1 === 0) {
            return this.x + ',' + this.y;
        }
        else {
            return this.x.toFixed(n) + ',' + this.y.toFixed(n);
        }
    };
    Point.prototype.fromString = function (ptstr) {
        var arr = ptstr.split(',');
        var ret = false;
        if (arr.length === 2) {
            this.x = Number(arr[0]);
            this.y = Number(arr[1]);
            ret = true;
        }
        return ret;
    };
    Point.prototype.clone = function () {
        var ret = new Point();
        ret.x = this.x;
        ret.y = this.y;
        return ret;
    };
    Point.prototype.multNumber = function (a) {
        var ret = new Point();
        ret.x = this.x * a;
        ret.y = this.y * a;
        return ret;
    };
    Point.prototype.multPoint = function (coeff) {
        var ret = new Point();
        ret.x = this.x * coeff.x;
        ret.y = this.y * coeff.y;
        return ret;
    };
    Point.prototype.multMatrix = function (a) {
        var ret = new Point;
        ret.x = a[0][0] * this.x + a[0][1] * this.y;
        ret.y = a[1][0] * this.x + a[1][1] * this.y;
        return ret;
    };
    Point.prototype.addPoint = function (pt) {
        var ret = new Point();
        ret.x = this.x + pt.x;
        ret.y = this.y + pt.y;
        return ret;
    };
    Point.prototype.substractPoint = function (pt) {
        var ret = new Point();
        ret.x = this.x - pt.x;
        ret.y = this.y - pt.y;
        return ret;
    };
    Point.prototype.middlePoint = function (pt) {
        var ret = new Point();
        ret.x = (this.x + pt.x) / 2.0;
        ret.y = (this.y + pt.y) / 2.0;
        return ret;
    };
    Point.prototype.distance = function (pt) {
        var ret = new Point();
        ret.x = pt.x - this.x;
        ret.y = pt.y - this.y;
        return ret;
    };
    Point.prototype.dotProduct = function (ptEnd, pt) {
        return (pt.x - this.x) * (ptEnd.x - this.x)
            + (pt.y - this.y) * (ptEnd.y - this.y);
    };
    Point.prototype.isPointOnLine = function (ptEnd, pt) {
        var ret = false;
        var l = this.scalarDistance(ptEnd);
        var r = this.dotProduct(ptEnd, pt) / (l * l);
        var ptP = this.addPoint(ptEnd.substractPoint(this).multNumber(r));
        var s = ptP.scalarDistance(pt);
        if (Math.abs(s) < 0.0001)
            ret = true;
        return ret;
    };
    Point.prototype.scalarDistance = function (pt) {
        return Math.sqrt((pt.x - this.x) * (pt.x - this.x) + (pt.y - this.y) * (pt.y - this.y));
    };
    Point.prototype.atDistancePoint = function (pt, distance) {
        var distPt = this.distance(pt).multNumber(distance);
        return this.addPoint(distPt);
    };
    return Point;
}());
var Matrix = /** @class */ (function () {
    function Matrix(size) {
        if (size === void 0) { size = null; }
        if (size != null) {
            this._size = size;
            this.zeros();
        }
    }
    Object.defineProperty(Matrix.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (arr) {
            this._size = arr;
            this.zeros();
        },
        enumerable: true,
        configurable: true
    });
    Matrix.prototype.zeros = function () {
        var mat = [];
        var x;
        if (typeof this._size === "number")
            x = 1;
        if (this._size instanceof Array)
            x = this._size.length;
        switch (x) {
            case 1:
                var len = this._size instanceof Array ? this._size[0] : this._size;
                for (var i = 0; i < len; i++) {
                    mat = __spreadArrays(mat, [0]);
                }
                break;
            case 2:
                for (var i = 0; i < this._size[0]; i++) {
                    var row = [];
                    for (var j = 0; j < this._size[1]; j++)
                        row = __spreadArrays(row, [0]);
                    mat = __spreadArrays(mat, [row]);
                }
                break;
            default:
                mat = [];
        }
        this.matrix = mat;
    };
    Matrix.prototype.identity = function () {
        var mat = [];
        var x;
        if (typeof this._size === "number")
            x = 1;
        if (this._size instanceof Array)
            x = this._size.length;
        switch (x) {
            case 1:
                var len = this._size instanceof Array ? this._size[0] : this._size;
                for (var i = 0; i < len; i++) {
                    if (i === 0) {
                        mat = __spreadArrays(mat, [1]);
                    }
                    else {
                        mat = __spreadArrays(mat, [0]);
                    }
                }
                break;
            case 2:
                for (var i = 0; i < this._size[0]; i++) {
                    var row = [];
                    for (var j = 0; j < this._size[1]; j++) {
                        if (i === j) {
                            row = __spreadArrays(row, [1]);
                        }
                        else {
                            row = __spreadArrays(row, [0]);
                        }
                    }
                    mat = __spreadArrays(mat, [row]);
                }
                break;
            default:
                mat = [];
        }
        this.matrix = mat;
    };
    Matrix.prototype.clone = function () {
        var retMat = new Matrix(this._size);
        var mat = [];
        var x;
        if (typeof this._size === "number")
            x = 1;
        if (this._size instanceof Array)
            x = this._size.length;
        switch (x) {
            case 1:
                var len = this._size instanceof Array ? this._size[0] : this._size;
                for (var i = 0; i < len; i++) {
                    mat = __spreadArrays(mat, [this.matrix[i]]);
                }
                break;
            case 2:
                for (var i = 0; i < this._size[0]; i++) {
                    mat = __spreadArrays(mat, [this.matrix[i]]);
                }
                break;
            default:
                mat = [];
        }
        retMat.matrix = mat;
        return retMat;
    };
    Matrix.prototype.circularPermuteRow = function (opt) {
        var index = opt.index ? opt.index : null;
        var rowIndex = opt.rowIndex ? opt.rowIndex : false;
        var mat = [];
        var x;
        if (typeof this._size === "number")
            x = 1;
        if (this._size instanceof Array)
            x = this._size.length;
        switch (x) {
            case 1:
                var len = this._size instanceof Array ? this._size[0] : this._size;
                for (var i = 0; i < len; i++) {
                    mat = __spreadArrays(mat, [this.matrix[i]]);
                }
                var times = index != null ? index : 0;
                while (times > 0) {
                    var t = mat.shift();
                    mat = __spreadArrays(mat, [t]);
                    times--;
                }
                break;
            case 2:
                for (var i = 0; i < this._size[0]; i++) {
                    mat = __spreadArrays(mat, [this.matrix[i]]);
                }
                for (var i = 0; i < this._size[0] - 1; i++) {
                    var times_1 = rowIndex && this._size[0] === this._size[1] ? i + 1 : index != null ? index : 0;
                    while (times_1 > 0) {
                        var t = mat[i].shift();
                        mat[i] = __spreadArrays(mat[i], [t]);
                        times_1--;
                    }
                }
                break;
            default:
                mat = [];
        }
        this.matrix = mat;
    };
    Matrix.prototype.flipRow = function () {
        var mat = [];
        var len = this._size instanceof Array ? this._size[0] : this._size;
        for (var i = 0; i < len; i++) {
            mat = __spreadArrays(mat, [this.matrix[i]]);
        }
        this.matrix = mat.reverse();
    };
    Matrix.prototype.multiply = function (bMat) {
        var row;
        var col;
        var tmp;
        var tmp1;
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
        var rMat = new Matrix([row, col]);
        rMat.zeros();
        if (tmp === 1) {
            var a = this.matrix;
            var b = bMat.matrix;
            for (var i = 0; i < row; i++) {
                for (var j = 0; j < col; j++) {
                    rMat.matrix[i][j] = rMat.matrix[i][j] + a[i] * b[j];
                }
            }
        }
        else {
            for (var i = 0; i < row; i++) {
                for (var j = 0; j < col; j++) {
                    for (var k = 0; k < tmp; k++) {
                        rMat.matrix[i][j] = rMat.matrix[i][j] + this.matrix[i][k] * bMat.matrix[k][j];
                    }
                }
            }
        }
        return rMat;
    };
    Matrix.prototype.multiplyByVectorPoints = function (vPoints) {
        var nPoints = [];
        var mat = this.matrix;
        if (typeof this._size === "number") {
            if (this._size != vPoints.length)
                return null;
            nPoints[0] = new Point();
            for (var i = 0; i < this._size; i++) {
                nPoints[0] = nPoints[0].addPoint(vPoints[i].multNumber(mat[i]));
            }
        }
        else {
            var row = !this._size[1] ? 1 : this._size[0];
            var col = this._size[1] ? this._size[1] : this._size[0];
            if (col != vPoints.length)
                return null;
            for (var i = 0; i < row; i++) {
                nPoints[i] = new Point();
                for (var j = 0; j < col; j++) {
                    nPoints[i] = nPoints[i].addPoint(vPoints[j].multNumber(mat[i][j]));
                }
            }
        }
        return nPoints;
    };
    return Matrix;
}());
var isALetter = function (charVal) {
    if (charVal.toUpperCase() != charVal.toLowerCase())
        return true;
    else
        return false;
};
var maxSegmentPath = function (cBPaths) {
    var idMax = 0;
    var segMax = cBPaths[0].cLength.length;
    for (var i = 1; i < cBPaths.length; i++) {
        if (cBPaths[i].cLength.length > segMax) {
            idMax = i;
            segMax = cBPaths[i].cLength.length;
        }
    }
    return { idx: idMax, segMax: segMax };
};
var splitCubicBezier = function (cB, z) {
    // check if cB are all on a line 
    var retCurves = {};
    var r1 = cB[0].isPointOnLine(cB[3], cB[1]);
    var r2 = cB[0].isPointOnLine(cB[3], cB[2]);
    if (r1 && r2) {
        retCurves.C1 = [];
        retCurves.C2 = [];
        retCurves.C1 = __spreadArrays(retCurves.C1, [cB[0]]);
        var ptEnd = cB[0].addPoint(cB[3].substractPoint(cB[0]).multNumber(z));
        var pt1 = cB[0].addPoint(ptEnd.substractPoint(cB[0]).multNumber(1.0 / 3.0));
        var pt2 = cB[0].addPoint(ptEnd.substractPoint(cB[0]).multNumber(2.0 / 3.0));
        retCurves.C1 = __spreadArrays(retCurves.C1, [pt1]);
        retCurves.C1 = __spreadArrays(retCurves.C1, [pt2]);
        retCurves.C1 = __spreadArrays(retCurves.C1, [ptEnd]);
        retCurves.C2 = __spreadArrays(retCurves.C2, [ptEnd]);
        pt1 = ptEnd.addPoint(cB[3].substractPoint(ptEnd).multNumber(1.0 / 3.0));
        pt2 = ptEnd.addPoint(cB[3].substractPoint(ptEnd).multNumber(2.0 / 3.0));
        retCurves.C2 = __spreadArrays(retCurves.C2, [pt1]);
        retCurves.C2 = __spreadArrays(retCurves.C2, [pt2]);
        retCurves.C2 = __spreadArrays(retCurves.C2, [cB[3]]);
    }
    else {
        var mat = new Matrix([4, 4]);
        mat.identity();
        var z1 = z - 1;
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
var getCubicBezierFromPoints = function (points) {
    var d = "";
    for (var i = 0; i < points.length - 1; i += 3) {
        if (i === 0)
            d = d.concat('M ').concat(points[i].toFixed(2)).concat(' ');
        d = d.concat('C ').concat(points[i + 1].toFixed(2)).concat(' ');
        d = d.concat(points[i + 2].toFixed(2)).concat(' ');
        d = d.concat(points[i + 3].toFixed(2)).concat(' ');
    }
    d = d.trim();
    return d;
};
var initCurvePoints = function (P1, P2, P3, P4) {
    var pts = [];
    pts = __spreadArrays(pts, [P1]);
    pts = __spreadArrays(pts, [P2]);
    pts = __spreadArrays(pts, [P3]);
    pts = __spreadArrays(pts, [P4]);
    return pts;
};
var getPointsFromCBPath = function (cB) {
    var arr = cB.cBz.split('C');
    var points = [];
    for (var i = 0; i < arr.length; i++) {
        if (i === 0 && arr[i].charAt(0) === 'M')
            arr[i] = arr[i].slice(1);
        var ar = arr[i].trim().split(' ');
        if (ar.length > 0) {
            for (var j = 0; j < ar.length; j++) {
                var pt = new Point();
                var res = pt.fromString(ar[j]);
                if (res)
                    points = __spreadArrays(points, [pt]);
            }
        }
    }
    return points;
};
var permuteCubicBezier = function (points, startIndex) {
    var newPoints = [];
    newPoints = permutePoints(points, startIndex);
    var cBz = getCubicBezierFromPoints(newPoints);
    return cBz;
};
var permutePoints = function (points, index) {
    var pts = points;
    var t = [];
    if (index > 0) {
        //circular permutation
        for (var i = 0; i < index; i++) {
            // remove the first
            pts.splice(0, 1);
            // move the next two to the end
            for (var j = 0; j < 2; j++) {
                t = pts.shift();
                pts = __spreadArrays(pts, [t]);
            }
            // copy the first to the end
            t = pts[0];
            pts = __spreadArrays(pts, [t]);
        }
    }
    else {
        //reverse circular permutation
        for (var i = 0; i < Math.abs(index); i++) {
            // remove the last one
            pts.splice(-1);
            // move the last two to the top
            for (var j = 0; j < 2; j++) {
                pts.splice(0, 0, pts.splice(-1)[0]);
            }
            // copy the last one to top
            pts.splice(0, 0, pts[pts.length - 1]);
        }
    }
    return pts;
};
var cubicBezierAverageLength = function (P1, P2, P3, P4) {
    var lgthMin = P1.scalarDistance(P4);
    var lgthMax = P1.scalarDistance(P2) + P2.scalarDistance(P3) + P3.scalarDistance(P4);
    return (lgthMax + lgthMin) / 2;
};
var alignSegmentPath = function (cB, ratio) {
    var points = [];
    var segLength = [];
    var newPoints = [];
    points = getPointsFromCBPath(cB);
    if (ratio > 1.0) {
        // generate new points by splitting curves
        for (var i = 0; i < points.length - 1; i += 3) {
            var nbSplit = ratio;
            if (i === 0)
                newPoints = __spreadArrays(newPoints, [points[i]]);
            var tmpPt = initCurvePoints(points[i], points[i + 1], points[i + 2], points[i + 3]);
            while (nbSplit > 1) {
                var z = 1.0 / nbSplit;
                var pts = initCurvePoints(tmpPt[0], tmpPt[1], tmpPt[2], tmpPt[3]);
                var curves = splitCubicBezier(pts, z);
                newPoints = __spreadArrays(newPoints, [curves.C1[1]]);
                newPoints = __spreadArrays(newPoints, [curves.C1[2]]);
                newPoints = __spreadArrays(newPoints, [curves.C1[3]]);
                segLength = __spreadArrays(segLength, [cubicBezierAverageLength(curves.C1[0], curves.C1[1], curves.C1[2], curves.C1[3])]);
                nbSplit--;
                if (nbSplit === 1) {
                    newPoints = __spreadArrays(newPoints, [curves.C2[1]]);
                    newPoints = __spreadArrays(newPoints, [curves.C2[2]]);
                    newPoints = __spreadArrays(newPoints, [curves.C2[3]]);
                    segLength = __spreadArrays(segLength, [cubicBezierAverageLength(curves.C2[0], curves.C2[1], curves.C2[2], curves.C2[3])]);
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
var addSegmentToPath = function (points, segLength, nSegment) {
    var newPoints = points;
    var newSegLength = segLength;
    var lastPoint = newPoints.slice(-1)[0];
    for (var i = 0; i < nSegment; i++) {
        newPoints = __spreadArrays(newPoints, [lastPoint]);
        newPoints = __spreadArrays(newPoints, [lastPoint]);
        newPoints = __spreadArrays(newPoints, [lastPoint]);
        newSegLength = __spreadArrays(newSegLength, [0]);
    }
    return { points: newPoints, segLength: newSegLength };
};
var alignPathSegmentWithMax = function (cB, nSegment) {
    var cBzNew = {};
    cBzNew.index = cB.index;
    cBzNew.startIndex = cB.startIndex;
    cBzNew.oriCBz = cB.oriCBz;
    cBzNew.tLength = cB.tLength;
    cBzNew.cLength = [];
    if (nSegment / cB.cLength.length < 1.0)
        return Promise.resolve(null);
    // find number of splits
    var nbSplit = Math.floor(nSegment / cB.cLength.length);
    // find number of adds
    var nbAdds = nSegment % cB.cLength.length;
    var res;
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
var alignPathSegments = function (cBPaths, nSegment) { return __awaiter(void 0, void 0, void 0, function () {
    var alignCBPaths, pathMax, nSeg, i, newPath, points, cBz;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                alignCBPaths = [];
                pathMax = maxSegmentPath(cBPaths);
                nSeg = nSegment && nSegment != null && nSegment > cBPaths[pathMax.idx].cLength.length ? nSegment : cBPaths[pathMax.idx].cLength.length;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < cBPaths.length)) return [3 /*break*/, 5];
                if (!(nSeg > cBPaths[i].cLength.length)) return [3 /*break*/, 3];
                return [4 /*yield*/, alignPathSegmentWithMax(cBPaths[i], nSeg)];
            case 2:
                newPath = _a.sent();
                alignCBPaths = __spreadArrays(alignCBPaths, [newPath]);
                return [3 /*break*/, 4];
            case 3:
                if (cBPaths[i].startIndex != 0) {
                    points = getPointsFromCBPath(cBPaths[i]);
                    cBz = permuteCubicBezier(points, cBPaths[i].startIndex);
                    cBPaths[i].cBz = cBz;
                }
                alignCBPaths = __spreadArrays(alignCBPaths, [cBPaths[i]]);
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/, Promise.resolve(alignCBPaths)];
        }
    });
}); };
var cubicBezierfromPath = function (path, startIndex) { return __awaiter(void 0, void 0, void 0, function () {
    var cBezier, oriPath, letter, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                cBezier = {};
                cBezier.index = 0;
                cBezier.startIndex = startIndex ? startIndex : 0;
                cBezier.cBz = "";
                cBezier.oriCBz = "";
                cBezier.cType = '';
                cBezier.lPoint = new Point();
                cBezier.cLength = [];
                cBezier.tLength = 0;
                if (!(path.length > 0 && isALetter(path.charAt(0)) && path.charAt(0).toUpperCase() === "M")) return [3 /*break*/, 10];
                oriPath = path.trim().replace(/([A-Za-z](?!$))/g, ' $1 ')
                    .trim().replace(/([\-](?!$))/g, ' $1').split(/[ ,]+/);
                cBezier.index = 3;
                cBezier.lPoint.x = Number(oriPath[1]);
                cBezier.lPoint.y = Number(oriPath[2]);
                cBezier.cBz = cBezier.cBz.concat('M ');
                cBezier.cBz = cBezier.cBz.concat(cBezier.lPoint.toFixed(2) + " ");
                _b.label = 1;
            case 1:
                if (!(cBezier.index < oriPath.length)) return [3 /*break*/, 10];
                letter = false;
                if (isALetter(oriPath[cBezier.index].charAt(0))) {
                    cBezier.cType = oriPath[cBezier.index].charAt(0);
                    letter = true;
                }
                _a = cBezier.cType.toUpperCase();
                switch (_a) {
                    case "H": return [3 /*break*/, 2];
                    case "V": return [3 /*break*/, 2];
                    case "L": return [3 /*break*/, 2];
                    case "Q": return [3 /*break*/, 4];
                    case "C": return [3 /*break*/, 6];
                    case "Z": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 9];
            case 2: return [4 /*yield*/, lineToCubicBezier(cBezier, oriPath, letter)];
            case 3:
                cBezier = _b.sent();
                return [3 /*break*/, 9];
            case 4: return [4 /*yield*/, quadraticToCubicBezier(cBezier, oriPath, letter)];
            case 5:
                //TODO add T & t
                cBezier = _b.sent();
                return [3 /*break*/, 9];
            case 6: return [4 /*yield*/, cubicToCubicBezier(cBezier, oriPath, letter)];
            case 7:
                //TODO add S & s
                cBezier = _b.sent();
                return [3 /*break*/, 9];
            case 8:
                cBezier.cBz = cBezier.cBz.concat("Z");
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 1];
            case 10:
                cBezier.cBz = cBezier.cBz.trim();
                cBezier.oriCBz = cBezier.cBz;
                return [2 /*return*/, Promise.resolve(cBezier)];
        }
    });
}); };
var lineToCubicBezier = function (cBezier, oPath, letter) {
    var cBz = cBezier;
    var tPoint = new Point();
    var nPoint = new Point();
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
    var lgth = cBz.lPoint.scalarDistance(nPoint);
    cBz.cLength = __spreadArrays(cBz.cLength, [lgth]);
    cBz.tLength += lgth;
    cBz.lPoint = nPoint;
    return Promise.resolve(cBz);
};
var quadraticToCubicBezier = function (cBezier, oPath, letter) {
    var cBz = cBezier;
    var tP2 = new Point();
    var tP3 = new Point();
    var nP2 = new Point();
    var nP3 = new Point();
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
    var cP1 = cBz.lPoint.addPoint(nP2.substractPoint(cBz.lPoint).multNumber(2.0 / 3.0));
    cBz.cBz = cBz.cBz.concat(cP1.toFixed(2) + " ");
    var cP2 = nP3.addPoint(nP2.substractPoint(nP3).multNumber(2.0 / 3.0));
    cBz.cBz = cBz.cBz.concat(cP2.toFixed(2) + " ");
    cBz.cBz = cBz.cBz.concat(nP3.toFixed(2) + " ");
    // quick approximate length
    var lgthMin = cBz.lPoint.scalarDistance(nP3);
    var lgthMax = cBz.lPoint.scalarDistance(cP1) + cP1.scalarDistance(cP2) + cP2.scalarDistance(nP3);
    cBz.cLength = __spreadArrays(cBz.cLength, [(lgthMax + lgthMin) / 2]);
    cBz.tLength += (lgthMax + lgthMin) / 2;
    cBz.lPoint = nP3;
    return Promise.resolve(cBz);
};
var cubicToCubicBezier = function (cBezier, oPath, letter) {
    var cBz = cBezier;
    var tP2 = new Point();
    var tP3 = new Point();
    var tP4 = new Point();
    var nP2 = new Point();
    var nP3 = new Point();
    var nP4 = new Point();
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
    var len = cubicBezierAverageLength(cBz.lPoint, nP2, nP3, nP4);
    cBz.cLength = __spreadArrays(cBz.cLength, [len]);
    cBz.tLength += len;
    cBz.lPoint = nP4;
    return Promise.resolve(cBz);
};
var JeepSvgmorph = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
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
    class_1.prototype.parseDurationProp = function (newValue) {
        this.innerDuration = newValue ? newValue : "2000ms";
    };
    class_1.prototype.parseRepeatcountProp = function (newValue) {
        this.innerRepeatcount = newValue ? newValue : null;
    };
    class_1.prototype.parsePathindexProp = function (newValue) {
        this.innerPathindex = newValue ? this._removeCarriageReturn(newValue).split(';').map(Number) : null;
    };
    class_1.prototype.parseNsegmentProp = function (newValue) {
        this.innerNsegment = newValue ? Number(newValue) : null;
    };
    class_1.prototype.parseKeytimesProp = function (newValue) {
        this.innerKeytimes = newValue ? this._removeCarriageReturn(newValue) : null;
    };
    class_1.prototype.parseCalcmodeProp = function (newValue) {
        this.innerCalcmode = newValue ? newValue : "linear";
    };
    class_1.prototype.parseKeysplinesProp = function (newValue) {
        this.innerKeysplines = newValue ? this._removeCarriageReturn(newValue) : null;
    };
    class_1.prototype.parseFillProp = function (newValue) {
        this.innerFill = newValue ? newValue : null;
    };
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
    class_1.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._init()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    class_1.prototype.getStateProperties = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stateProperties;
            return __generator(this, function (_a) {
                stateProperties = {};
                stateProperties.duration = this.innerDuration;
                stateProperties.repeatCount = this.innerRepeatcount;
                stateProperties.pathIndex = this.innerPathindex;
                stateProperties.nSegment = this.innerNsegment;
                stateProperties.keyTimes = this.innerKeytimes;
                stateProperties.calcMode = this.innerCalcmode;
                stateProperties.keySplines = this.innerKeysplines;
                stateProperties.fill = this.innerFill;
                return [2 /*return*/, stateProperties];
            });
        });
    };
    class_1.prototype.getPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._getPath()];
            });
        });
    };
    class_1.prototype.getPathList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._pathList];
            });
        });
    };
    class_1.prototype.getFillColor = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._fillColor];
            });
        });
    };
    class_1.prototype.renderSVGFirstPath = function () {
        return this._renderSVGFirstPath();
    };
    class_1.prototype.getAlignedPaths = function (calc) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!calc) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._alignPaths()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this._alignPathList];
                }
            });
        });
    };
    //*******************************
    //* Component Lifecycle Methods *
    //*******************************
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.componentDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._element = this.el.shadowRoot;
                        if (!this.isSVG) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._renderSVGFirstPath()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    //******************************
    //* Private Method Definitions *
    //******************************
    class_1.prototype._init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        return [4 /*yield*/, this.getPath()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype._removeCarriageReturn = function (s) {
        var a = s.split(/\r?\n|\r/g);
        var c = s;
        if (a.length > 1) {
            c = '';
            for (var j = 0; j < a.length; j++) {
                c = c.concat(' ' + a[j].trim());
            }
        }
        return c;
    };
    class_1.prototype._setSVGAttributes = function () {
        if (this._svgOptions.width)
            this._svg.setAttribute('width', this._svgOptions.width);
        if (this._svgOptions.height)
            this._svg.setAttribute('height', this._svgOptions.height);
        if (this._svgOptions.viewBox)
            this._svg.setAttribute('viewBox', this._svgOptions.viewBox);
        if (this._svgOptions.xmlns)
            this._svg.setAttribute('xmlns', this._svgOptions.xmlns);
    };
    class_1.prototype._drawFirstPath = function () {
        this._path = this._svg.querySelector("#initPath");
        this._path.setAttribute('d', this._pathList[0]);
        if (this._fillColor.length > 0)
            this._path.setAttribute('fill', this._fillColor[0]);
    };
    class_1.prototype._getPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var svg, width, height, viewBox, xmlns, i, d, a, c_1, j, color, ncolor, kTimes, kSplines, b, c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        svg = this.el.querySelector('svg');
                        this.isSVG = false;
                        if (!(svg !== null)) return [3 /*break*/, 2];
                        this._svgOptions = {};
                        this._pathList = [];
                        this._fillColor = [];
                        width = svg.getAttribute('width');
                        height = svg.getAttribute('height');
                        viewBox = svg.getAttribute('viewBox');
                        xmlns = svg.getAttribute('xmlns');
                        this._svgOptions.width = width ? width : false;
                        this._svgOptions.height = height ? height : false;
                        this._svgOptions.viewBox = viewBox ? viewBox : false;
                        this._svgOptions.xmlns = xmlns ? xmlns : false;
                        if (svg.childElementCount > 0) {
                            for (i = 0; i < svg.childElementCount; i++) {
                                d = svg.children[i].getAttribute('d');
                                a = d.split(/\r?\n|\r/g);
                                if (a.length > 1) {
                                    c_1 = '';
                                    for (j = 0; j < a.length; j++) {
                                        c_1 = c_1.concat(' ' + a[j].trim());
                                    }
                                    this._pathList = __spreadArrays(this._pathList, [c_1.trim()]);
                                }
                                else {
                                    this._pathList = __spreadArrays(this._pathList, [d]);
                                }
                                color = svg.children[i].getAttribute('fill');
                                if (color != null && !this._isUniqueColor) {
                                    this._fillColor = __spreadArrays(this._fillColor, [color]);
                                }
                            }
                        }
                        return [4 /*yield*/, this.getOccurrence(this._fillColor, this._fillColor[0])];
                    case 1:
                        ncolor = _a.sent();
                        if (ncolor === this._fillColor.length) {
                            this._isUniqueColor = true;
                            this._uniqueColor = this._fillColor[0];
                        }
                        this.el.removeChild(svg);
                        kTimes = this.innerKeytimes != null ? this.innerKeytimes.split(';').length : 0;
                        kSplines = this.innerKeysplines != null ? this.innerKeysplines.split(';').length : 0;
                        b = this.innerCalcmode === 'spline' && kSplines != kTimes - 1 ? false : true;
                        c = kTimes === 0 || kTimes === this._pathList.length ? true : false;
                        if (b && c)
                            this.isSVG = true;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype._alignPaths = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startIndex, i, cbp, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < this._pathList.length)) return [3 /*break*/, 4];
                        startIndex = this.innerPathindex != null && this.innerPathindex[i] ? this.innerPathindex[i] : 0;
                        return [4 /*yield*/, cubicBezierfromPath(this._pathList[i], startIndex)];
                    case 2:
                        cbp = _b.sent();
                        this._cBList = __spreadArrays(this._cBList, [cbp]);
                        _b.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        _a = this;
                        return [4 /*yield*/, alignPathSegments(this._cBList, this.innerNsegment)];
                    case 5:
                        _a._alignPathList = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype._setAnimation = function () {
        // path animation set values
        var animPath = this._path.querySelector('#animPath');
        this._valuesPath = "";
        for (var i = 0; i < this._alignPathList.length; i++) {
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
            var animFill = this._path.querySelector('#animFill');
            // fill animation set values
            this._valuesFill = "";
            for (var i = 0; i < this._fillColor.length; i++) {
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
    };
    class_1.prototype.getOccurrence = function (array, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, array.filter(function (v) { return (v === value); }).length];
            });
        });
    };
    class_1.prototype._renderSVGFirstPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._container = this._element.querySelector('#morph-container');
                        this._svg = this._container.querySelector('#morph-svg');
                        this._setSVGAttributes();
                        if (!(this._pathList && this._pathList[0])) return [3 /*break*/, 2];
                        this._drawFirstPath();
                        return [4 /*yield*/, this._alignPaths()];
                    case 1:
                        _a.sent();
                        this._setAnimation();
                        _a.label = 2;
                    case 2: return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    //*************************
    //* Rendering JSX Element *
    //*************************
    class_1.prototype.render = function () {
        if (this.isSVG) {
            return (h("div", { id: "morph-container" }, h("div", { id: "morph-svg-container" }, h("svg", { id: "morph-svg", width: "500", height: "500", viewBox: "0 0 500 500", xmlns: "http://www.w3.org/2000/svg" }, h("path", { id: "initPath" }, h("animate", { id: "animPath", begin: "initPath.click" }), this._fillColor.length > 1 && !this._uniqueColor
                ? h("animate", { id: "animFill", begin: "animPath.begin" })
                : null)))));
        }
        else {
            return (h("div", { id: "fake-container" }));
        }
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "duration": ["parseDurationProp"],
                "repeatcount": ["parseRepeatcountProp"],
                "pathindex": ["parsePathindexProp"],
                "nsegment": ["parseNsegmentProp"],
                "keytimes": ["parseKeytimesProp"],
                "calcmode": ["parseCalcmodeProp"],
                "keysplines": ["parseKeysplinesProp"],
                "fill": ["parseFillProp"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ":host{--height:500px;--width:500px;--top:30px;--left:10px}#morph-container{position:relative;left:0;top:0;width:100%;height:calc(var(--height) + var(--top))}#morph-svg-container{position:relative;left:var(--left);top:var(--top);width:var(--width);height:var(--height)}svg{width:100%;height:100%}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { JeepSvgmorph as jeep_svgmorph };
