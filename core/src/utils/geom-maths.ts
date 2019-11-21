import { BoundingBox } from '../global/interfaces/svggeom';

export class MPoint {
    public x: number;
    public y: number;
      constructor(x:number = 0, y:number = 0)
      {
          this.x = x;
          this.y = y;
      }
    public toString(): string {
      return this.x + ',' + this.y;
    }
    public toFixed(n:number): string {
      if (this.x %1 === 0 && this.y %1 === 0) {
        return this.x + ',' + this.y;
      } else {
        return this.x.toFixed(n) + ',' + this.y.toFixed(n);
      }
    }
    public fromString(ptstr:string): boolean {
      let arr: Array<string> = ptstr.split(',');
      let ret :boolean = false;
      if(arr.length === 2) {
        this.x = Number(arr[0]);
        this.y = Number(arr[1]);
        ret = true;
      }
      return ret;
    }
    public clone(): MPoint {
      let ret:MPoint = new MPoint();
      ret.x = this.x;
      ret.y = this.y;
      return ret;
      
    }
    public multNumber(a:number): MPoint {
      let ret:MPoint = new MPoint();
      ret.x = this.x * a;
      ret.y = this.y * a;
      return ret;
    }
    public multMPoint(coeff:MPoint): MPoint {
      let ret:MPoint = new MPoint();
      ret.x = this.x * coeff.x;
      ret.y = this.y * coeff.y;
      return ret;
    }
    public multMatrix(a:Array<Array<number>>): MPoint {
      let ret :MPoint = new MPoint;
        ret.x = a[0][0] * this.x + a[0][1] * this.y;
        ret.y = a[1][0] * this.x + a[1][1] * this.y;
      return ret;
    } 
    public addMPoint(pt:MPoint): MPoint {
      let ret:MPoint = new MPoint();
      ret.x = this.x + pt.x;
      ret.y = this.y + pt.y;
      return ret;
    }
    public substractMPoint(pt:MPoint): MPoint {
      let ret:MPoint = new MPoint();
      ret.x = this.x - pt.x;
      ret.y = this.y - pt.y;
      return ret;
    }
    public middleMPoint(pt:MPoint): MPoint {
      let ret:MPoint = new MPoint();
      ret.x = (this.x + pt.x) / 2.0;
      ret.y = (this.y + pt.y) / 2.0;    
      return ret;    
    }
    public distance(pt:MPoint): MPoint {
      let ret:MPoint = new MPoint();
      ret.x = pt.x - this.x;
      ret.y = pt.y - this.y; 
      return ret; 
    }
    public dotProduct(ptEnd:MPoint,pt:MPoint) : number {
      return (pt.x-this.x)*(ptEnd.x-this.x)
            + (pt.y-this.y)*(ptEnd.y-this.y);
    }
    public isMPointOnLine (ptEnd:MPoint,pt:MPoint) : boolean {
      let ret:boolean = false;
      let l:number = this.scalarDistance(ptEnd);
      let r : number = this.dotProduct(ptEnd,pt) / (l*l);
      let ptP: MPoint = this.addMPoint(ptEnd.substractMPoint(this).multNumber(r));
      let s: number = ptP.scalarDistance(pt);
      if(Math.abs(s) < 0.0001)  ret = true;
      return ret;
    }
    public scalarDistance(pt:MPoint): number {
      return Math.sqrt((pt.x - this.x)*(pt.x - this.x) + (pt.y - this.y)*(pt.y - this.y));
    }
    public atDistanceMPoint(pt:MPoint,distance:number): MPoint {
        let distPt = this.distance(pt).multNumber(distance)
        return this.addMPoint(distPt);
       
    }
} 
export class CubicBezierCurve {
  public P1: MPoint;
  public P2: MPoint;
  public P3: MPoint;
  public P4: MPoint;
  constructor(p1:MPoint = new MPoint(),p2:MPoint = new MPoint(),
                p3:MPoint = new MPoint(),p4:MPoint = new MPoint()) {
    this.P1 = p1;
    this.P2 = p2;
    this.P3 = p3;
    this.P4 = p4;
  }
  public onCurveMPointAtTpos(t:number) : MPoint {
    let ret:MPoint = new MPoint();
    if(t < 0 ) return null;
    if (t > 1) return null;
      ret = this.P1.multNumber(Math.pow(1.0-t,3))
          .addMPoint(this.P2.multNumber(3*t*Math.pow(1-t,2))
          .addMPoint(this.P3.multNumber(3*(1.0-t)*Math.pow(t,2))
          .addMPoint(this.P4.multNumber(Math.pow(t,3))
          )));
    return ret;
  }
  public getSegmentBox(pt0:MPoint,pt1:MPoint,pt2:MPoint,pt3:MPoint): { bBox:BoundingBox, bMPoints: Array<MPoint>, bTValues:Array<number>} {
    let ret: { bBox:BoundingBox, bMPoints: Array<MPoint>, bTValues:Array<number>} = {} as { bBox:BoundingBox, bMPoints: Array<MPoint>, bTValues:Array<number>};
    ret.bBox = {} as BoundingBox;
    ret.bBox.minBox = new MPoint();
    ret.bBox.maxBox = new MPoint();
    ret.bMPoints = [];
    ret.bTValues= [];
    let tvalues:Array<number> = new Array();
    let bounds:Array<Array<number>> = [new Array(),new Array()];
    let MPoints:Array<MPoint> = new Array();

    let a: number;
    let b: number;
    let c: number;
    let t: number;
    let t1: number;
    let t2: number;
    let b2ac: number;
    let sqrtb2ac: number;

    for (let i:number = 0;i<2; i++) {
      if(i == 0) {
        b = 6 * pt0.x - 12 * pt1.x + 6 * pt2.x;
        a = -3 * pt0.x + 9 * pt1.x - 9 * pt2.x + 3 * pt3.x;
        c = 3 * pt1.x - 3 * pt0.x;
      } else {
        b = 6 * pt0.y - 12 * pt1.y + 6 * pt2.y;
        a = -3 * pt0.y + 9 * pt1.y - 9 * pt2.y + 3 * pt3.y;
        c = 3 * pt1.y - 3 * pt0.y;
      }
      if (Math.abs(a) < 1e-12)
      {
        if(Math.abs(b) < 1e-12)
        {
          continue;
        }
        t = - c / b;
        if (0 < t && t < 1)
        {
          tvalues.push(t);
        }
        continue;
      }
      b2ac = b * b - 4 * c * a;
      sqrtb2ac = Math.sqrt(b2ac);
      if (b2ac < 0)
      {
        continue;
      }
      t1 = (-b + sqrtb2ac) / (2 * a);
      if (0 < t1 && t1 < 1)
      {
        tvalues.push(t1);
      }
      t2 = (-b - sqrtb2ac) / (2 * a);
      if (0 < t2 && t2 < 1)
      {
        tvalues.push(t2);
      }
    }

    let x: number;
    let y: number;
    let j: number = tvalues.length;
    let jlen: number = j;
    let mt: number;
    while (j--)
    {
      t = tvalues[j];
      mt = 1 - t;
      x = (mt * mt * mt * pt0.x) + (3 * mt * mt * t * pt1.x) + (3 * mt * t * t * pt2.x) + (t * t * t * pt3.x);
      bounds[0][j] = x;

      y = (mt * mt * mt * pt0.y) + (3 * mt * mt * t * pt1.y) + (3 * mt * t * t * pt2.y) + (t * t * t * pt3.y);
      bounds[1][j] = y;
      let MPt:MPoint = new MPoint();
      MPt.x = x;
      MPt.y = y;
      MPoints[j] = MPt;
    }
    tvalues[jlen] = 0;
    tvalues[jlen + 1] = 1;
    MPoints[jlen] = pt0 ;
    MPoints[jlen + 1] = pt3;
    bounds[0][jlen] = pt0.x;
    bounds[1][jlen] = pt0.y;
    bounds[0][jlen + 1] = pt3.x;
    bounds[1][jlen + 1] = pt3.y;
    tvalues.length = bounds[0].length = bounds[1].length = MPoints.length = jlen + 2;
    ret.bBox.minBox.x = Math.min.apply(null,bounds[0]);
    ret.bBox.minBox.y = Math.min.apply(null,bounds[1]);
    ret.bBox.maxBox.x = Math.max.apply(null,bounds[0]);
    ret.bBox.maxBox.y = Math.max.apply(null,bounds[1]);
    ret.bMPoints = MPoints;
    ret.bTValues = tvalues;
    return ret;
  }
} 
export class Matrix {
  public matrix:Array<Array<number>> | Array<number>;
  private _size: Array<number> | number;
  constructor(msize:Array<number> | number = null) {
    if(msize != null) {
      this._size=msize;
      this.zeros();
    }
    
  }
  setSize(arr:Array<number> | number ) {
    this._size = arr;
    this.zeros();
  }
  getSize(): Array<number> | number {
    return this._size;
  }
  zeros() {
    let mat: Array<any> = [];
    let x: number;
    if(typeof this._size === "number") x = 1;
    if(this._size instanceof Array) x = this._size.length;
    switch(x) {
      case 1:
        let len: number =  this._size instanceof Array ? this._size[0] : this._size;
        for (let i:number = 0;i<len; i++) {
          mat = [...mat,0];
        }
        break;
      case 2:
        for (let i:number = 0;i<this._size[0]; i++) {
          let row:Array<number> = [];
          for (let j:number =0;j<this._size[1]; j++) row = [...row,0];
          mat = [...mat,row];
        }
        break;
      default:
        mat = [];
    } 
    this.matrix = mat;   
  }
  identity() {
    let mat: Array<any> = [];
    let x: number;
    if(typeof this._size === "number") x = 1;
    if(this._size instanceof Array) x = this._size.length;
    switch(x) {
      case 1:
        let len: number =  this._size instanceof Array ? this._size[0] : this._size;
        for (let i:number = 0;i<len; i++) {
          if( i === 0) {
            mat = [...mat,1];
          } else {
            mat = [...mat,0];
          }
        }
        break;
      case 2:
        for (let i:number = 0;i<this._size[0]; i++) {
          let row:Array<number> = [];
          for (let j:number =0;j<this._size[1]; j++) {
            if(i === j ) {
              row = [...row,1];
            } else {
              row = [...row,0];
            }                
          }
          mat = [...mat,row];
        }
        break;
      default:
        mat = [];
    } 
    this.matrix = mat;     
  }
  clone(): Matrix {
    let retMat: Matrix = new Matrix(this._size);
    let mat: Array<any> = [];
    let x: number;
    if(typeof this._size === "number") x = 1;
    if(this._size instanceof Array) x = this._size.length;
    switch(x) {
      case 1:
        let len: number =  this._size instanceof Array ? this._size[0] : this._size;
        for (let i:number = 0;i<len; i++) {
            mat = [...mat,this.matrix[i]];
        }
        break;
      case 2:
        for (let i:number = 0;i<this._size[0]; i++) {
          mat = [...mat,this.matrix[i]];
        }
        break;
      default:
        mat = [];
    } 
    retMat.matrix = mat;
    return retMat;
  }
  circularPermuteRow(opt:any) {
    let index:number = opt.index ? opt.index : null;
    let rowIndex: boolean = opt.rowIndex ? opt.rowIndex : false;
    let mat: Array<any> = [];
    let x: number;
    if(typeof this._size === "number") x = 1;
    if(this._size instanceof Array) x = this._size.length;
    switch(x) {
      case 1:
        let len: number =  this._size instanceof Array ? this._size[0] : this._size;
        for (let i:number = 0;i<len; i++) {
            mat = [...mat,this.matrix[i]];
        }
        let times = index != null ? index : 0 ;
        while(times > 0){ 
          let t: Array<any> = mat.shift();
          mat=[...mat,t];
          times--;
        }        
        break;
      case 2:
        for (let i:number = 0;i<this._size[0]; i++) {
          mat = [...mat,this.matrix[i]];
        }

        for (let i:number = 0;i<this._size[0] - 1; i++) {
          let times:number = rowIndex && this._size[0] === this._size[1] ? i+1 : index != null ? index : 0 ;
          while(times > 0) { 
            let t: Array<any> = mat[i].shift();
            mat[i]=[...mat[i],t];
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
    let mat: Array<any> = [];
    let len: number =  this._size instanceof Array ? this._size[0] : this._size;
    for (let i:number = 0;i<len; i++) {
      mat = [...mat,this.matrix[i]];
    }
    this.matrix = mat.reverse();          
  }
  multiply(bMat:Matrix): Matrix {
    let row: number;
    let col: number; 
    let tmp: number;   
    let tmp1: number;   
    if(typeof this._size === "number") {
      row = this._size;
      col = typeof bMat.getSize === "number" ? bMat.getSize : bMat.getSize[0] ? bMat.getSize[0] : null;
      tmp = !bMat.getSize[1] ? 1 : null;
    } else {
      row = this._size[0];
      tmp = this._size[1] ? this._size[1] : 1;
      col = bMat.getSize[1] ? bMat.getSize[1] : bMat.getSize[0] ? bMat.getSize[0] : bMat.getSize;
      tmp1 = !bMat.getSize[1] ? 1: bMat.getSize[0];
      tmp = tmp1 === tmp ? tmp : null;
    }  
    if(row === null || col === null || tmp === null) return null;
    let rMat:Matrix = new Matrix([row,col]);
    rMat.zeros();
    if( tmp === 1 ) {
      let a: any = this.matrix;
      let b: any = bMat.matrix;
      for(let i:number = 0;i<row; i++ ) {
        for(let j:number = 0;j<col; j++ ) {
            rMat.matrix[i][j] = rMat.matrix[i][j] + a[i] * b[j];
        }
      } 

    } else {
      for(let i:number = 0;i<row; i++ ) {
        for(let j:number = 0;j<col; j++ ) {
          for (let k:number = 0; k < tmp; k++) {
            rMat.matrix[i][j] = rMat.matrix[i][j] + this.matrix[i][k] * bMat.matrix[k][j];
          }
        }
      } 
    }
    return rMat;
  }
  multiplyByVectorMPoints(vMPoints: Array<MPoint>): Array<MPoint> {
    let nMPoints:Array<MPoint> = [];
    let mat: any = this.matrix;
    if(typeof this._size === "number") {
      if(this._size != vMPoints.length) return null;
      nMPoints[0] = new MPoint();
      for(let i:number = 0; i<this._size; i++) {
        nMPoints[0] = nMPoints[0].addMPoint(vMPoints[i].multNumber(mat[i])); 
      }
    } else {
      let row: number = !this._size[1] ? 1 : this._size[0];
      let col : number = this._size[1] ? this._size[1] : this._size[0];
      if(col != vMPoints.length) return null;
      for(let i:number = 0; i<row; i++) {
        nMPoints[i] = new MPoint();
        for(let j:number = 0; j<col; j++) {
          nMPoints[i] = nMPoints[i].addMPoint(vMPoints[j].multNumber(mat[i][j])); 
        }     
      }
    }
    return nMPoints;
  }
}