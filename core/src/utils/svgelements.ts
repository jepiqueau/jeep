import { Point, Matrix} from './geom-maths';
import { CubicBezier, /*BoundingBox,*/ CubicBezierSplitCurves } from '../global/interfaces/svggeom';

export const isALetter = (charVal): Boolean => {
    if( charVal.toUpperCase() != charVal.toLowerCase() )
       return true;
    else
       return false;
}
export const maxSegmentPath = (cBPaths: Array<CubicBezier>) : any => {
    let idMax = 0;
    let segMax = cBPaths[0].cLength.length;
    for(let i:number = 1; i < cBPaths.length; i++) {
        if(cBPaths[i].cLength.length > segMax) {
            idMax = i;
            segMax = cBPaths[i].cLength.length;
        }
    }
    return {idx: idMax, segMax: segMax};    
}
export const isRegularShape = (shape:CubicBezier): boolean => {
    let ret :boolean = false;
    let sideLength = Math.max(...shape.cLength);
    if(Math.abs(sideLength * shape.cLength.length - shape.tLength) < 0.01) ret = true;
    return ret;
}
export const splitCubicBezier = (cB:Array<Point>, z:number): CubicBezierSplitCurves => {
    // check if cB are all on a line 
    let retCurves: CubicBezierSplitCurves = {} as CubicBezierSplitCurves;
    let r1 = cB[0].isPointOnLine(cB[3],cB[1]);
    let r2 = cB[0].isPointOnLine(cB[3],cB[2]); 
    if (r1 && r2 ){
        retCurves.C1 = [];
        retCurves.C2 = [];
        retCurves.C1 = [...retCurves.C1,cB[0]];
        let ptEnd:Point = cB[0].addPoint(cB[3].substractPoint(cB[0]).multNumber(z));
        let pt1:Point = cB[0].addPoint(ptEnd.substractPoint(cB[0]).multNumber(1.0/3.0));
        let pt2:Point = cB[0].addPoint(ptEnd.substractPoint(cB[0]).multNumber(2.0/3.0));
        retCurves.C1 = [...retCurves.C1,pt1];
        retCurves.C1 = [...retCurves.C1,pt2];
        retCurves.C1 = [...retCurves.C1,ptEnd];
        retCurves.C2 = [...retCurves.C2,ptEnd];
        pt1 = ptEnd.addPoint(cB[3].substractPoint(ptEnd).multNumber(1.0/3.0));
        pt2 = ptEnd.addPoint(cB[3].substractPoint(ptEnd).multNumber(2.0/3.0));
        retCurves.C2 = [...retCurves.C2,pt1];
        retCurves.C2 = [...retCurves.C2,pt2]; 
        retCurves.C2 = [...retCurves.C2,cB[3]];
    } else {
        let mat: Matrix = new Matrix([4,4]);
        mat.identity();
        let z1:number = z-1;
        mat.matrix[1][0] = -z1;
        mat.matrix[2][0] = z1*z1;
        mat.matrix[3][0] = -z1*z1*z1;
        mat.matrix[1][1] = z;
        mat.matrix[2][1] = -2*z1*z;
        mat.matrix[3][1] = 3*z1*z1*z;
        mat.matrix[2][2] = z*z;
        mat.matrix[3][2] = -3*z1*z*z;
        mat.matrix[3][3] = z*z*z;
        retCurves.C1 = mat.multiplyByVectorPoints(cB);
        // apply circular permutation and flip to the matrix
        mat.circularPermuteRow({rowIndex:true})
        mat.flipRow();
        retCurves.C2 = mat.multiplyByVectorPoints(cB);
    }
    return retCurves;
}
export const getCubicBezierFromPoints = (points:Array<Point>): string => {
    let d: string = "";
    for(let i:number = 0; i< points.length-1 ; i+=3) {
        if(i === 0 ) d = d.concat('M ').concat(points[i].toFixed(2)).concat(' ');
        d = d.concat('C ').concat(points[i+1].toFixed(2)).concat(' ');
        d = d.concat(points[i+2].toFixed(2)).concat(' ');
        d = d.concat(points[i+3].toFixed(2)).concat(' ');
    }
    d = d.trim();
    return d;
}
export const initCurvePoints = (P1: Point,P2: Point,P3: Point,P4: Point): Array<Point> => {
    let pts: Array<Point> = [];
    pts = [...pts,P1];
    pts = [...pts,P2];
    pts = [...pts,P3];
    pts = [...pts,P4];
    return pts;
}
export const getPointsFromCBPath = (cB:CubicBezier): Array<Point> => {
    const arr: Array<string> = cB.cBz.split('C');
    let points: Array<Point> = [];
    for(let i:number = 0;i<arr.length;i++) {
        if( i === 0 && arr[i].charAt( 0 ) === 'M' ) arr[i] = arr[i].slice( 1 );
        let ar: Array<string> =arr[i].trim().split(' ');
        if(ar.length > 0) {
            for (let j:number =0;j < ar.length; j++) {
                let pt:Point =  new Point();
                let res:boolean = pt.fromString(ar[j]);
                if(res) points = [...points,pt];
            }
        }
    }
    return points;
}
export const permuteCubicBezier = (points:Array<Point>,startIndex:number): string => {
    let newPoints: Array<Point> = [];
    newPoints = permutePoints(points,startIndex);
    let cBz:string = getCubicBezierFromPoints(newPoints);
    return cBz;
}
export const permutePoints = (points:Array<Point>,index:number): Array<any> => {
    let pts:Array<any> = points;
    let t: Array<Point> = [];
    if(index > 0) {
        //circular permutation
        for (let i:number =0; i< index; i++) {
            // remove the first
            pts.splice(0,1);
            // move the next two to the end
            for(let j:number =0; j < 2; j++) {
                t = pts.shift();
                pts = [...pts,t];
            }
            // copy the first to the end
            t = pts[0];
            pts=[...pts,t];
        }
    } else {
        //reverse circular permutation
        for (let i:number =0; i< Math.abs(index); i++) {
            // remove the last one
            pts.splice(-1);
            // move the last two to the top
            for(let j:number =0; j < 2; j++) {
                pts.splice(0,0,pts.splice(-1)[0]);
            }
            // copy the last one to top
            pts.splice(0,0,pts[pts.length-1]);
        }
    }
    return pts;
}
export const cubicBezierAverageLength = (P1:Point,P2:Point,P3:Point,P4:Point): number => {
    let lgthMin: number = P1.scalarDistance(P4);
    let lgthMax: number = P1.scalarDistance(P2) + P2.scalarDistance(P3)+ P3.scalarDistance(P4);
    return (lgthMax+lgthMin)/2;
}
export const alignSegmentPath = (cB:CubicBezier,ratio:number): {points:Array<Point>,segLength:Array<number>} => {
    let points: Array<Point> = [];
    let segLength: Array<number> = [];
    let newPoints: Array<Point> = [];
    points = getPointsFromCBPath(cB);
    if(ratio > 1.0) {
        // generate new points by splitting curves
        for(let i:number = 0; i< points.length-1 ; i+=3) {
            let nbSplit = ratio;
            if(i === 0) newPoints = [...newPoints,points[i]];
            let tmpPt: Array<Point> = initCurvePoints(points[i],points[i+1],points[i+2],points[i+3]);
            while ( nbSplit > 1) {
                let z = 1.0 / nbSplit;
                let pts: Array<Point> = initCurvePoints(tmpPt[0],tmpPt[1],tmpPt[2],tmpPt[3]);
                let curves: CubicBezierSplitCurves = splitCubicBezier(pts,z);
                newPoints = [...newPoints,curves.C1[1]];
                newPoints = [...newPoints,curves.C1[2]];
                newPoints = [...newPoints,curves.C1[3]];
                segLength = [...segLength,cubicBezierAverageLength(curves.C1[0],curves.C1[1],
                                    curves.C1[2],curves.C1[3])];
                nbSplit--;
                if (nbSplit === 1) {
                    newPoints = [...newPoints,curves.C2[1]];
                    newPoints = [...newPoints,curves.C2[2]];
                    newPoints = [...newPoints,curves.C2[3]];
                    segLength = [...segLength,cubicBezierAverageLength(curves.C2[0],curves.C2[1],
                                    curves.C2[2],curves.C2[3])];
                } else {
                    tmpPt = initCurvePoints(curves.C2[0],curves.C2[1],curves.C2[2],curves.C2[3]);
                }
            }
        }
        points = newPoints;
    }
    return {points:points,segLength:segLength};
}
export const addSegmentToPath = (points:Array<Point>,segLength:Array<number>,
    nSegment:number): {points:Array<Point>,segLength:Array<number>} => {
    let newPoints: Array<Point> = points;
    let newSegLength: Array<number> = segLength;
    let lastPoint = newPoints.slice(-1)[0];
    for(let i:number = 0; i< nSegment ; i++) {
        newPoints = [...newPoints,lastPoint];
        newPoints = [...newPoints,lastPoint];
        newPoints = [...newPoints,lastPoint];
        newSegLength = [...newSegLength,0];
    }
    return {points:newPoints,segLength:newSegLength};
}
export const alignPathSegmentWithMax = (cB:CubicBezier, nSegment:number): Promise<CubicBezier> => {
    let cBzNew: CubicBezier = {} as CubicBezier;

    cBzNew.index = cB.index;
    cBzNew.startIndex = cB.startIndex;
    cBzNew.oriCBz = cB.oriCBz;
    cBzNew.tLength = cB.tLength;
    cBzNew.cLength = [];
    if(nSegment/cB.cLength.length < 1.0) return Promise.resolve(null);
    // find number of splits
    let nbSplit: number = Math.floor(nSegment/cB.cLength.length);
    // find number of adds
    let nbAdds: number = nSegment % cB.cLength.length;
    let res: any;
    if( nbSplit > 1) {
        // create splits
        res = alignSegmentPath(cB,nbSplit);
        // create adds
        if (nbAdds > 0 ) res = addSegmentToPath(res.points,res.segLength,nbAdds);
    } else {
        res = {};
        res.points = getPointsFromCBPath(cB);
        res.segLength = cB.cLength;
        // create adds
        if (nbAdds > 0 ) res = addSegmentToPath(res.points,res.segLength,nbAdds);
    }
    
    cBzNew.cLength = res.segLength;
    if(cB.startIndex != 0) {
        // circular permutation
        cBzNew.cBz = permuteCubicBezier(res.points,cB.startIndex);
    } else {
        cBzNew.cBz = getCubicBezierFromPoints(res.points);
    }
    return Promise.resolve(cBzNew);
}
export const alignPathSegments = async (cBPaths: Array<CubicBezier>, nSegment?:number): Promise<Array<CubicBezier>> => {
    let alignCBPaths: Array<CubicBezier> = [];
    let pathMax: any = maxSegmentPath(cBPaths);
    let nSeg:number = nSegment && nSegment != null && nSegment > cBPaths[pathMax.idx].cLength.length ? nSegment : cBPaths[pathMax.idx].cLength.length;
    for(let i:number = 0; i < cBPaths.length; i++) {
        if( nSeg > cBPaths[i].cLength.length) {
                let newPath:CubicBezier = await alignPathSegmentWithMax(cBPaths[i],nSeg);
                alignCBPaths = [...alignCBPaths,newPath];
        } else {
            if(cBPaths[i].startIndex != 0) {
                let points: Array<Point> = getPointsFromCBPath(cBPaths[i]);
                let cBz:string = permuteCubicBezier(points,cBPaths[i].startIndex);
                cBPaths[i].cBz = cBz;
            }
            alignCBPaths = [...alignCBPaths,cBPaths[i]];           
        }
    }
    return Promise.resolve(alignCBPaths);
}
export const cubicBezierfromPath = async (path:string,startIndex?:number): Promise<CubicBezier> => {
    let cBezier: CubicBezier = {} as CubicBezier;
    cBezier.index = 0;
    cBezier.startIndex = startIndex ? startIndex : 0;
    cBezier.cBz = "";
    cBezier.oriCBz = "";
    cBezier.cType = '';
    cBezier.lPoint = new Point();
    cBezier.cLength = [];
    cBezier.tLength = 0;
    if(path.length > 0 && isALetter(path.charAt(0)) && path.charAt(0).toUpperCase() === "M") {
        let oriPath: Array<string> = path.trim().replace(/([A-Za-z](?!$))/g,' $1 ')
                                        .trim().replace(/([\-](?!$))/g,' $1').split(/[ ,]+/);
        cBezier.index = 3;
        cBezier.lPoint.x = Number(oriPath[1]);            
        cBezier.lPoint.y = Number(oriPath[2]);            
        cBezier.cBz = cBezier.cBz.concat('M ');
        cBezier.cBz = cBezier.cBz.concat(cBezier.lPoint.toFixed(2)+" ");
        while( cBezier.index < oriPath.length) {
            let letter: boolean = false;
            if(isALetter(oriPath[cBezier.index].charAt(0))) {
                cBezier.cType = oriPath[cBezier.index].charAt(0);
                letter = true;
            }
            switch(cBezier.cType.toUpperCase()) {
                // Line case
                case "H":
                case "V":
                case "L":
                    cBezier = await lineToCubicBezier(cBezier,oriPath,letter);
                    break;
                case "Q":
                    //TODO add T & t
                    cBezier = await quadraticToCubicBezier(cBezier,oriPath,letter);
                    break;
                case "C":
                    //TODO add S & s
                    cBezier = await cubicToCubicBezier(cBezier,oriPath,letter);
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
}
export const lineToCubicBezier = (cBezier: CubicBezier,oPath:Array<string>,letter:boolean): Promise<CubicBezier> => {
    let cBz: CubicBezier = cBezier;
    let tPoint: Point = new Point();
    let nPoint: Point = new Point();
    if(letter) {
        switch(cBz.cType.toUpperCase()) {
            case "H":
                tPoint.x = Number(oPath[cBz.index+1]);            
                tPoint.y = cBz.lPoint.y;
                cBz.index += 2;
                break;                     
            case "V":
                tPoint.y = Number(oPath[cBz.index+1]);            
                tPoint.x = cBz.lPoint.x;
                cBz.index += 2;
                break;                            
            case "L":
                tPoint.x = Number(oPath[cBz.index+1]);            
                tPoint.y = Number(oPath[cBz.index+2]);            
                cBz.index += 3;
                break;
            default:
        }
    } else {
        if (cBz.cType.toUpperCase() === "L") {
            tPoint.x = Number(oPath[cBz.index]);            
            tPoint.y = Number(oPath[cBz.index+1]);            
            cBz.index += 2; 
        }      
    }
    if(cBz.cType === "l") {
        nPoint.x = cBz.lPoint.x + tPoint.x;
        nPoint.y = cBz.lPoint.y + tPoint.y;
    } else if(cBz.cType === "h") {
        nPoint.x = cBz.lPoint.x + tPoint.x;
        nPoint.y = cBz.lPoint.y;
    } else if(cBz.cType === "v") {
        nPoint.y = cBz.lPoint.y + tPoint.y;
        nPoint.x = cBz.lPoint.x;     
    } else {
        nPoint = tPoint;
    }
    cBz.cBz = cBz.cBz.concat('C ');
    cBz.cBz = cBz.cBz.concat(cBz.lPoint.atDistancePoint(nPoint,1.0/3.0).toFixed(2)+" ");
    cBz.cBz = cBz.cBz.concat(cBz.lPoint.atDistancePoint(nPoint,2.0/3.0).toFixed(2)+" ");
    cBz.cBz = cBz.cBz.concat(nPoint.toFixed(2)+" ");
    let lgth: number = cBz.lPoint.scalarDistance(nPoint);
    cBz.cLength = [...cBz.cLength, lgth];
    cBz.tLength += lgth;
    cBz.lPoint = nPoint;
    return Promise.resolve(cBz);
}
export const quadraticToCubicBezier = (cBezier: CubicBezier,oPath:Array<string>,letter:boolean): Promise<CubicBezier> => {
    let cBz: CubicBezier = cBezier;
    let tP2: Point = new Point();
    let tP3: Point = new Point();
    let nP2: Point = new Point();
    let nP3: Point = new Point();
    if(letter) {
        tP2.x = Number(oPath[cBz.index+1]);            
        tP2.y = Number(oPath[cBz.index+2]);            
        tP3.x = Number(oPath[cBz.index+3]);            
        tP3.y = Number(oPath[cBz.index+4]);            
        cBz.index += 5;
    } else {
        tP2.x = Number(oPath[cBz.index]);            
        tP2.y = Number(oPath[cBz.index+1]);            
        tP3.x = Number(oPath[cBz.index+2]);            
        tP3.y = Number(oPath[cBz.index+3]);            
        cBz.index += 4; 
    }
    if(cBz.cType === "q") {
        nP2.x = cBz.lPoint.x + tP2.x;
        nP2.y = cBz.lPoint.y + tP2.y;
        nP3.x = cBz.lPoint.x + tP3.x;
        nP3.y = cBz.lPoint.y + tP3.y;
    } else {
        nP2 = tP2;
        nP3 = tP3;
    }
    cBz.cBz = cBz.cBz.concat('C ');
    const cP1: Point = cBz.lPoint.addPoint(nP2.substractPoint(cBz.lPoint).multNumber(2.0/3.0));
    cBz.cBz = cBz.cBz.concat(cP1.toFixed(2)+" ");
    const cP2: Point = nP3.addPoint(nP2.substractPoint(nP3).multNumber(2.0/3.0));  
    cBz.cBz = cBz.cBz.concat(cP2.toFixed(2)+" ");
    cBz.cBz = cBz.cBz.concat(nP3.toFixed(2)+" ");
    // quick approximate length
    let lgthMin: number = cBz.lPoint.scalarDistance(nP3);
    let lgthMax: number = cBz.lPoint.scalarDistance(cP1) + cP1.scalarDistance(cP2)+ cP2.scalarDistance(nP3);
    cBz.cLength = [...cBz.cLength, (lgthMax+lgthMin)/2];
    cBz.tLength += (lgthMax+lgthMin)/2;
    cBz.lPoint = nP3;
    return Promise.resolve(cBz);
}
export const cubicToCubicBezier = (cBezier: CubicBezier,oPath:Array<string>,letter:boolean): Promise<CubicBezier> => {
    let cBz: CubicBezier = cBezier;
    let tP2: Point = new Point();
    let tP3: Point = new Point();
    let tP4: Point = new Point();
    let nP2: Point = new Point();
    let nP3: Point = new Point();
    let nP4: Point = new Point();
    if(letter) {
        tP2.x = Number(oPath[cBz.index+1]);            
        tP2.y = Number(oPath[cBz.index+2]);            
        tP3.x = Number(oPath[cBz.index+3]);            
        tP3.y = Number(oPath[cBz.index+4]);            
        tP4.x = Number(oPath[cBz.index+5]);            
        tP4.y = Number(oPath[cBz.index+6]);            
        cBz.index += 7;
    } else {
        tP2.x = Number(oPath[cBz.index]);            
        tP2.y = Number(oPath[cBz.index+1]);            
        tP3.x = Number(oPath[cBz.index+2]);            
        tP3.y = Number(oPath[cBz.index+3]);            
        tP4.x = Number(oPath[cBz.index+4]);            
        tP4.y = Number(oPath[cBz.index+5]);            
        cBz.index += 6; 
    }
    if(cBz.cType === "c") {
        nP2.x = cBz.lPoint.x + tP2.x;
        nP2.y = cBz.lPoint.y + tP2.y;
        nP3.x = cBz.lPoint.x + tP3.x;
        nP3.y = cBz.lPoint.y + tP3.y;
        nP4.x = cBz.lPoint.x + tP4.x;
        nP4.y = cBz.lPoint.y + tP4.y;
    } else {
        nP2 = tP2;
        nP3 = tP3;
        nP4 = tP4;
    }
    cBz.cBz = cBz.cBz.concat('C ');
    cBz.cBz = cBz.cBz.concat(nP2.toFixed(2)+" ");
    cBz.cBz = cBz.cBz.concat(nP3.toFixed(2)+" ");
    cBz.cBz = cBz.cBz.concat(nP4.toFixed(2)+" ");
    // quick approximate length
    let len:number = cubicBezierAverageLength(cBz.lPoint,nP2,nP3,nP4);
    cBz.cLength = [...cBz.cLength, len];
    cBz.tLength += len;
    cBz.lPoint = nP4;
    return Promise.resolve(cBz);
}
