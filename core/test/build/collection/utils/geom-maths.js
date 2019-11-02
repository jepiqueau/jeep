export class Point {
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
export class CubicBezierCurve {
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
export class Matrix {
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
