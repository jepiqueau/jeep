import { createSVGElement } from './chart-svgelements';
import { cubicBezierfromPath, isRegularShape, splitCubicBezier, getPointsFromCBPath,
    alignPathSegmentWithMax, alignPathSegments, cubicBezierAverageLength, permutePoints } from './svgelements'
import { CubicBezier, CubicBezierSplitCurves } from '../global/interfaces/svggeom';
import { Point } from './geom-maths';

describe('createSVG-utils', () => {
    let container: HTMLElement;
    let svg: Element;
    beforeEach( async () => {
        container = document.createElement('div');
        await document.body.appendChild(container);
        container.setAttribute("id","svg-container");
        svg = createSVGElement('svg',container);
    });
    afterEach(() => {
        container = null;
        svg = null;
    });
    it('should have created the container element', () => {
        expect(container).toBeTruthy();
    }); 
    it('should have created the svg element', () => {
        expect(svg).toBeTruthy();
        expect(container.childElementCount).toEqual(1);
    }); 
    it('should have created a path element', () => {
        let path: Element = createSVGElement('path',svg);
        expect(path).toBeTruthy();
        expect(svg.childElementCount).toEqual(1);
    }); 
    it('should define the d attribute of a path element', () => {
        let path: Element = createSVGElement('path',svg);
        path.setAttribute('d','M 10,10 H 50 V 40 H 10 Z')
         expect(path.getAttribute('d')).toEqual('M 10,10 H 50 V 40 H 10 Z');
    });
    it('should not return a cubic bezier path when d="" ', async () => {
        const d: string = '';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.length).toEqual(0);
    });
    it('should not return a cubic bezier path when the first char of d is not "M" ', async () => {
        const d: string = 'L 50 100 70 80';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.length).toEqual(0);
    });
    it('should not return a cubic bezier path when the first char of d is not "m" ', async () => {
        const d: string = 'L 50 100 70 80';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.length).toEqual(0);
    });
    it('should return a cubic bezier path of a line path "M 10 10 L 70 80"', async () => {
        const d: string = 'M 10 10 L 70 80';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual('M 10,10 C 30.00,33.33 50.00,56.67 70,80');
        expect(cbp.cLength[0]).toBeCloseTo(92.1954446);   
        expect(cbp.tLength).toBeCloseTo(92.1954446);   
    });
    it('should return a cubic bezier path of a line path "M10,10 L70,80"', async () => {
        const d: string = 'M10,10 L70,80';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual('M 10,10 C 30.00,33.33 50.00,56.67 70,80');
        expect(cbp.cLength[0]).toBeCloseTo(92.1954446);   
        expect(cbp.tLength).toBeCloseTo(92.1954446);   
    });
    it('should return a cubic bezier path of a line path "M 10 10 l 70 80"', async () => {
        const d: string = 'M 10 10 l 70 80';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual('M 10,10 C 33.33,36.67 56.67,63.33 80,90');
        expect(cbp.cLength[0]).toBeCloseTo(106.301458);   
        expect(cbp.tLength).toBeCloseTo(106.301458);   
    });

    it('should return a cubic bezier path of a line path "M10,10 L70,80 150,210"', async () => {
        const d: string = 'M10,10 L70,80 150,200';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual("M 10,10 C 30.00,33.33 50.00,56.67 70,80 C 96.67,120.00 123.33,160.00 150,200");
        expect(cbp.cLength[0]).toBeCloseTo(92.1954446);   
        expect(cbp.cLength[1]).toBeCloseTo(144.222051);   
        expect(cbp.tLength).toBeCloseTo(236.4174956);   
    });
    it('should return a cubic bezier path of a line path "M10,10 H70 V80 L10,80 10,10"', async () => {
        const d: string = 'M10,10 H70 V80 L10,80 10,10';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual("M 10,10 C 30,10 50,10 70,10 C 70.00,33.33 70.00,56.67 70,80 C 50,80 30,80 10,80 C 10.00,56.67 10.00,33.33 10,10");
        expect(cbp.cLength[0]).toBeCloseTo(60.0);   
        expect(cbp.cLength[1]).toBeCloseTo(70.0);   
        expect(cbp.cLength[2]).toBeCloseTo(60.0);   
        expect(cbp.cLength[3]).toBeCloseTo(70.0);   
        expect(cbp.tLength).toBeCloseTo(260.0);   
    });
    it('should return a cubic bezier path of a line path "M 10,10 H 70 V 80 L 10,80 10,10"', async () => {
        const d: string = 'M 10,10 H 70 V 80 L 10,80 10,10';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual("M 10,10 C 30,10 50,10 70,10 C 70.00,33.33 70.00,56.67 70,80 C 50,80 30,80 10,80 C 10.00,56.67 10.00,33.33 10,10");
        expect(cbp.cLength[0]).toBeCloseTo(60.0);   
        expect(cbp.cLength[1]).toBeCloseTo(70.0);   
        expect(cbp.cLength[2]).toBeCloseTo(60.0);   
        expect(cbp.cLength[3]).toBeCloseTo(70.0);   
        expect(cbp.tLength).toBeCloseTo(260.0);   
    });
    it('should return a cubic bezier path of a line path "M 10,10 H 70 V 80 H 10 V 10"', async () => {
        const d: string = 'M 10,10 H 70 V 80 H 10 V 10';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual("M 10,10 C 30,10 50,10 70,10 C 70.00,33.33 70.00,56.67 70,80 C 50,80 30,80 10,80 C 10.00,56.67 10.00,33.33 10,10");
        expect(cbp.cLength[0]).toBeCloseTo(60.0);   
        expect(cbp.cLength[1]).toBeCloseTo(70.0);   
        expect(cbp.cLength[2]).toBeCloseTo(60.0);   
        expect(cbp.cLength[3]).toBeCloseTo(70.0);   
        expect(cbp.tLength).toBeCloseTo(260.0);   
    });
   it('should return a cubic bezier path of a line path "M 10,10 h 70 v 80 h -70 v -80"', async () => {
        const d: string = 'M 10,10 h 70 v 80 h -70 v -80';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual("M 10,10 C 33.33,10.00 56.67,10.00 80,10 C 80.00,36.67 80.00,63.33 80,90 C 56.67,90.00 33.33,90.00 10,90 C 10.00,63.33 10.00,36.67 10,10");
        expect(cbp.cLength[0]).toBeCloseTo(70.0);   
        expect(cbp.cLength[1]).toBeCloseTo(80.0);   
        expect(cbp.cLength[2]).toBeCloseTo(70.0);   
        expect(cbp.cLength[3]).toBeCloseTo(80.0);   
        expect(cbp.tLength).toBeCloseTo(300.0);   
    });
    it('should return a cubic bezier path of a line path "M10,10 h70 v80 h-70 v-80"', async () => {
        const d: string = 'M10,10 h70 v80 h-70 v-80';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual("M 10,10 C 33.33,10.00 56.67,10.00 80,10 C 80.00,36.67 80.00,63.33 80,90 C 56.67,90.00 33.33,90.00 10,90 C 10.00,63.33 10.00,36.67 10,10");
        expect(cbp.cLength[0]).toBeCloseTo(70.0);   
        expect(cbp.cLength[1]).toBeCloseTo(80.0);   
        expect(cbp.cLength[2]).toBeCloseTo(70.0);   
        expect(cbp.cLength[3]).toBeCloseTo(80.0);   
        expect(cbp.tLength).toBeCloseTo(300.0);   
    });
    it('should return a cubic bezier path of a line path "M10,10 h70 v80 H 10 V 10"', async () => {
        const d: string = 'M10,10 h70 v80 H 10 V 10';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual("M 10,10 C 33.33,10.00 56.67,10.00 80,10 C 80.00,36.67 80.00,63.33 80,90 C 56.67,90.00 33.33,90.00 10,90 C 10.00,63.33 10.00,36.67 10,10");
        expect(cbp.cLength[0]).toBeCloseTo(70.0);   
        expect(cbp.cLength[1]).toBeCloseTo(80.0);   
        expect(cbp.cLength[2]).toBeCloseTo(70.0);   
        expect(cbp.cLength[3]).toBeCloseTo(80.0);   
        expect(cbp.tLength).toBeCloseTo(300.0);   
    });
    it('should return a cubic bezier path of a quadratic path "M 100 250 Q 250 100 400 250"', async () => {
        const d: string = 'M 100 250 Q 250 100 400 250';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual('M 100,250 C 200,150 300,150 400,250');
        expect(cbp.cLength[0]).toBeCloseTo(341.421);   
        expect(cbp.tLength).toBeCloseTo(341.421);   
    });

    it('should return a cubic bezier path of a quadratic path "M 100,250 Q 250,100 400,250"', async () => {
        const d: string = 'M 100,250 Q 250,100 400,250';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual('M 100,250 C 200,150 300,150 400,250');
        expect(cbp.cLength[0]).toBeCloseTo(341.421);   
        expect(cbp.tLength).toBeCloseTo(341.421);   
    });
    it('should return a cubic bezier path of a quadratic path "M100 250 Q250 100 400 250"', async () => {
        const d: string = 'M100 250 Q250 100 400 250';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual('M 100,250 C 200,150 300,150 400,250');
        expect(cbp.cLength[0]).toBeCloseTo(341.421);   
        expect(cbp.tLength).toBeCloseTo(341.421);   
    });

    it('should return a cubic bezier path of a quadratic path "M100,250 Q250,100 400,250"', async () => {
        const d: string = 'M100,250 Q250,100 400,250';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual('M 100,250 C 200,150 300,150 400,250');
        expect(cbp.cLength[0]).toBeCloseTo(341.421);   
        expect(cbp.tLength).toBeCloseTo(341.421);   
    });
    it('should return a cubic bezier path of a quadratic path "M100,250 q150,-150 300,0"', async () => {
        const d: string = 'M100,250 q150,-150 300,0';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual('M 100,250 C 200,150 300,150 400,250');
        expect(cbp.cLength[0]).toBeCloseTo(341.421);   
        expect(cbp.tLength).toBeCloseTo(341.421);   
    });
    it('should return a cubic bezier path of a two quadratic path "M100,250 Q250,100 400,250 Q550,400 700,250"', async () => {
        const d: string = 'M100,250 Q250,100 400,250 Q550,400 700,250';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual('M 100,250 C 200,150 300,150 400,250 C 500,350 600,350 700,250');
        expect(cbp.cLength[0]).toBeCloseTo(341.421);   
        expect(cbp.cLength[1]).toBeCloseTo(341.421);   
        expect(cbp.tLength).toBeCloseTo(682.842);   
    });
    it('should return a cubic bezier path of a two quadratic path "M100,250 Q250,100 400,250 550,400 700,250"', async () => {
        const d: string = 'M100,250 Q250,100 400,250 550,400 700,250';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual('M 100,250 C 200,150 300,150 400,250 C 500,350 600,350 700,250');
        expect(cbp.cLength[0]).toBeCloseTo(341.421);   
        expect(cbp.cLength[1]).toBeCloseTo(341.421);   
        expect(cbp.tLength).toBeCloseTo(682.842);   
    });
    it('should return a cubic bezier path of a two quadratic path "M100,250 q150,-150 300,0 150,150 300,0"', async () => {
        const d: string = 'M100,250 q150,-150 300,0 150,150 300,0';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual('M 100,250 C 200,150 300,150 400,250 C 500,350 600,350 700,250');
        expect(cbp.cLength[0]).toBeCloseTo(341.421);   
        expect(cbp.cLength[1]).toBeCloseTo(341.421);   
        expect(cbp.tLength).toBeCloseTo(682.842);   
    });
    it('should return a cubic bezier path of a two quadratic path "M250,100 H 350 Q500,100 500,250 V 350 Q500,500 350,500 H 250 Q100,500 100,350 V 250 Q100,100 250,100"', async () => {
        const d: string = 'M250,100 H 350 Q500,100 500,250 V 350 Q500,500 350,500 H 250 Q100,500 100,350 V 250 Q100,100 250,100';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual("M 250,100 C 283.33,100.00 316.67,100.00 350,100 C 450,100 500,150 500,250 C 500.00,283.33 500.00,316.67 500,350 C 500,450 450,500 350,500 C 316.67,500.00 283.33,500.00 250,500 C 150,500 100,450 100,350 C 100.00,316.67 100.00,283.33 100,250 C 100,150 150,100 250,100");
        expect(cbp.cLength[0]).toBeCloseTo(100);   
        expect(cbp.cLength[1]).toBeCloseTo(241.421);   
        expect(cbp.cLength[2]).toBeCloseTo(100);   
        expect(cbp.cLength[3]).toBeCloseTo(241.421);   
        expect(cbp.cLength[4]).toBeCloseTo(100);   
        expect(cbp.cLength[5]).toBeCloseTo(241.421);   
        expect(cbp.cLength[6]).toBeCloseTo(100);   
        expect(cbp.cLength[7]).toBeCloseTo(241.421);   
        expect(cbp.tLength).toBeCloseTo(1365.6854);   
    });
    it('should return a cubic bezier path of a cubic bezier path "M 250,230 C 280,100 450,150 400,250"', async () => {
        const d: string = 'M 250,230 C 280,100 450,150 400,250';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual('M 250,230 C 280,100 450,150 400,250');
        expect(cbp.cLength[0]).toBeCloseTo(286.874);   
        expect(cbp.tLength).toBeCloseTo(286.874);   
    });
    it('should return a cubic bezier path of a cubic bezier path "M250,230 C280,100 450,150 400,250"', async () => {
        const d: string = 'M250,230 C280,100 450,150 400,250';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual('M 250,230 C 280,100 450,150 400,250');
        expect(cbp.cLength[0]).toBeCloseTo(286.874);   
        expect(cbp.tLength).toBeCloseTo(286.874);   
    });
    it('should return a cubic bezier path of a cubic bezier path "M250,230 c30,-130 200,-80 150,20"', async () => {
        const d: string = 'M250,230 c30,-130 200,-80 150,20';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual('M 250,230 C 280,100 450,150 400,250');
        expect(cbp.cLength[0]).toBeCloseTo(286.874);   
        expect(cbp.tLength).toBeCloseTo(286.874);   
    });
    it('should return a cubic bezier path from two cubic bezier paths "M100,250 C 50,150 220,100 250,230 C280,100 450,150 400,250"', async () => {
        const d: string = 'M100,250 C 50,150 220,100 250,230 C280,100 450,150 400,250';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual('M 100,250 C 50,150 220,100 250,230 C 280,100 450,150 400,250');
        expect(cbp.cLength[0]).toBeCloseTo(286.874);   
        expect(cbp.cLength[1]).toBeCloseTo(286.874);   
        expect(cbp.tLength).toBeCloseTo(573.748);   
    });
    it('should return a cubic bezier path from two cubic bezier paths "M100,250 C 50,150 220,100 250,230 280,100 450,150 400,250"', async () => {
        const d: string = 'M100,250 C 50,150 220,100 250,230 280,100 450,150 400,250';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual('M 100,250 C 50,150 220,100 250,230 C 280,100 450,150 400,250');
        expect(cbp.cLength[0]).toBeCloseTo(286.874);   
        expect(cbp.cLength[1]).toBeCloseTo(286.874);   
        expect(cbp.tLength).toBeCloseTo(573.748);   
    });
    it('should return a cubic bezier path from three cubic bezier and two line paths "M 250,230 C 280,100 450,150 400,250 L 280,450 C 260,480 240,480 220,450 L100,250 C 50,150 220,100 250,230"', async () => {
        const d: string = 'M 250,230 C 280,100 450,150 400,250 L 280,450 C 260,480 240,480 220,450 L100,250 C 50,150 220,100 250,230';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        expect(cbp.cBz.trim()).toEqual("M 250,230 C 280,100 450,150 400,250 C 360.00,316.67 320.00,383.33 280,450 C 260,480 240,480 220,450 C 180.00,383.33 140.00,316.67 100,250 C 50,150 220,100 250,230");
        expect(cbp.cLength[0]).toBeCloseTo(286.874);   
        expect(cbp.cLength[1]).toBeCloseTo(233.238);   
        expect(cbp.cLength[2]).toBeCloseTo(76.0555);   
        expect(cbp.cLength[3]).toBeCloseTo(233.238);   
        expect(cbp.cLength[4]).toBeCloseTo(286.874);   
        expect(cbp.tLength).toBeCloseTo(1116.2796);   
    });
    it('should return the average length of a cubic bezier path "M 250,230 C 280,100 450,150 400,250"', async () => {
        const d: string = 'M 250,230 C 280,100 450,150 400,250';
        const len:number = cubicBezierAverageLength(new Point(250,230),new Point(280,100),
                            new Point(450,150), new Point(400,250));
        expect(len).toBeCloseTo(286.874);   
    });
    it('should return the average length of a cubic bezier path "M 100,250 C 50,150 220,100 250,230"', async () => {
        const d: string = 'M 100,250 C 50,150 220,100 250,230';
        const len:number = cubicBezierAverageLength(new Point(100,250),new Point(50,150),
                            new Point(220,100), new Point(250,230));
        expect(len).toBeCloseTo(286.874);   
    });
    
    it('should return regularShape false for the cubic bezier path of a line path "M10,10 h70 v80 H 10 V 10"', async () => {
        const d: string = 'M10,10 h70 v80 H 10 V 10';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        const res = isRegularShape(cbp);
        expect(res).toBeFalsy();   
    });
    it('should return regularShape true for the cubic bezier path of a line path "M10,10 h70 v70 H 10 V 10"', async () => {
        const d: string = 'M10,10 h70 v70 H 10 V 10';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        const res = isRegularShape(cbp);
        expect(res).toBeTruthy();   
    });
    it('should return regularShape true for the cubic bezier path of a line path "M 171.29942,60 H 328.70057 L 440,171.29942 V 328.70057 L 328.70057,440 H 171.29942 L 60,328.70057 V 171.29942 L 171.29942,60"', async () => {
        const d: string = 'M 171.29942,60 H 328.70057 L 440,171.29942 V 328.70057 L 328.70057,440 H 171.29942 L 60,328.70057 V 171.29942 L 171.29942,60';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        const res = isRegularShape(cbp);
        expect(res).toBeTruthy();   
    });
    it('should return regularShape true for the cubic bezier path of a line path "M 250,100 L 300,200 400,250 300,300 250,400 200,300 100,250 200,200 250,100"', async () => {
        const d: string = 'M 250,100 L 300,200 400,250 300,300 250,400 200,300 100,250 200,200 250,100';
        const cbp: CubicBezier = await cubicBezierfromPath(d);
        const res = isRegularShape(cbp);
        expect(res).toBeTruthy();   
    });
    it('should split a cubic bezier path given by P1,P2,P3,P4 at z=0.5', async () => {
        let oriPoints: Array<Point> = [];
        oriPoints = [...oriPoints,new Point(10,60)]
        oriPoints = [...oriPoints,new Point(10,20)]
        oriPoints = [...oriPoints,new Point(70,20)]
        oriPoints = [...oriPoints,new Point(70,60)]
        let curves: CubicBezierSplitCurves = splitCubicBezier(oriPoints,0.5);
        expect(curves.C1[0]).toEqual(new Point(10,60));
        expect(curves.C1[1]).toEqual(new Point(10,40));
        expect(curves.C1[2]).toEqual(new Point(25,30));
        expect(curves.C1[3]).toEqual(new Point(40,30));
        expect(curves.C2[0]).toEqual(new Point(40,30));
        expect(curves.C2[1]).toEqual(new Point(55,30));
        expect(curves.C2[2]).toEqual(new Point(70,40));
        expect(curves.C2[3]).toEqual(new Point(70,60));
    });
    it('should split a cubic bezier path given by P1,P2,P3,P4 at z=0.33333', async () => {
        let oriPoints: Array<Point> = [];
        oriPoints = [...oriPoints,new Point(10,60)]
        oriPoints = [...oriPoints,new Point(10,20)]
        oriPoints = [...oriPoints,new Point(70,20)]
        oriPoints = [...oriPoints,new Point(70,60)]
        let curves: CubicBezierSplitCurves = splitCubicBezier(oriPoints,0.33333);
        expect(curves.C1[0]).toEqual(new Point(10,60));
        expect(curves.C1[1].x).toBeCloseTo(10);
        expect(curves.C1[1].y).toBeCloseTo(46.6668);
        expect(curves.C1[2].x).toBeCloseTo(16.6665);
        expect(curves.C1[2].y).toBeCloseTo(37.7779);
        expect(curves.C1[3].x).toBeCloseTo(25.55529);
        expect(curves.C1[3].y).toBeCloseTo(33.33320);
        expect(curves.C2[0].x).toBeCloseTo(25.55529);
        expect(curves.C2[0].y).toBeCloseTo(33.33320);
        expect(curves.C2[1].x).toBeCloseTo(43.333067);
        expect(curves.C2[1].y).toBeCloseTo(24.444356);
        expect(curves.C2[2].x).toBeCloseTo(70);
        expect(curves.C2[2].y).toBeCloseTo(33.33320);
        expect(curves.C2[3]).toEqual(new Point(70,60));
    });
    it('should split a cubic bezier path given by P1,P2,P3,P4 at z=0.33333 and 0.66666', async () => {
        let oriPoints: Array<Point> = [];
        oriPoints = [...oriPoints,new Point(10,60)]
        oriPoints = [...oriPoints,new Point(10,20)]
        oriPoints = [...oriPoints,new Point(70,20)]
        oriPoints = [...oriPoints,new Point(70,60)]
        let curves: CubicBezierSplitCurves = splitCubicBezier(oriPoints,0.33333);
        expect(curves.C1[0]).toEqual(new Point(10,60));
        expect(curves.C1[1].x).toBeCloseTo(10);
        expect(curves.C1[1].y).toBeCloseTo(46.6668);
        expect(curves.C1[2].x).toBeCloseTo(16.6665);
        expect(curves.C1[2].y).toBeCloseTo(37.7779);
        expect(curves.C1[3].x).toBeCloseTo(25.55529);
        expect(curves.C1[3].y).toBeCloseTo(33.33320);
        expect(curves.C2[0].x).toBeCloseTo(25.55529);
        expect(curves.C2[0].y).toBeCloseTo(33.33320);
        expect(curves.C2[1].x).toBeCloseTo(43.333067);
        expect(curves.C2[1].y).toBeCloseTo(24.444356);
        expect(curves.C2[2].x).toBeCloseTo(70);
        expect(curves.C2[2].y).toBeCloseTo(33.33320);
        expect(curves.C2[3]).toEqual(new Point(70,60));
        let curves1: CubicBezierSplitCurves = splitCubicBezier(curves.C2,0.33333);
        expect(curves1.C1[0].x).toBeCloseTo(25.55529);
        expect(curves1.C1[0].y).toBeCloseTo(33.33320);
        expect(curves1.C1[1].x).toBeCloseTo(31.481155);
        expect(curves1.C1[1].y).toBeCloseTo(30.370459);
        expect(curves1.C1[2].x).toBeCloseTo(38.394686);
        expect(curves1.C1[2].y).toBeCloseTo(29.38274);
        expect(curves1.C1[3].x).toBeCloseTo(44.9790288);
        expect(curves1.C1[3].y).toBeCloseTo(30.370311);
        expect(curves1.C2[0].x).toBeCloseTo(44.9790288);
        expect(curves1.C2[0].y).toBeCloseTo(30.370311);
        expect(curves1.C2[1].x).toBeCloseTo(58.147911);
        expect(curves1.C2[1].y).toBeCloseTo(32.34548);
        expect(curves1.C2[2].x).toBeCloseTo(70);
        expect(curves1.C2[2].y).toBeCloseTo(42.22204);
        expect(curves1.C2[3]).toEqual(new Point(70,60));
    });
    it('should split a cubic bezier path (line) given by P1,P2,P3,P4 at z=0.5', async () => {
        let oriPoints: Array<Point> = [];
        oriPoints = [...oriPoints,new Point(10,10)]
        oriPoints = [...oriPoints,new Point(30,33.33)]
        oriPoints = [...oriPoints,new Point(50,56.57)]
        oriPoints = [...oriPoints,new Point(70,80)]
        let curves: CubicBezierSplitCurves = splitCubicBezier(oriPoints,0.5);
        expect(curves.C1[0]).toEqual(new Point(10,10));
        expect(curves.C1[1]).toEqual(new Point(20,21.665));
        expect(curves.C1[2]).toEqual(new Point(30,33.3075));
        expect(curves.C1[3]).toEqual(new Point(40,44.9625));
        expect(curves.C2[0]).toEqual(new Point(40,44.9625));
        expect(curves.C2[1]).toEqual(new Point(50,56.6175));
        expect(curves.C2[2]).toEqual(new Point(60,68.285));
        expect(curves.C2[3]).toEqual(new Point(70,80));
    });
    it('should split a cubic bezier path (line) given by P1,P2,P3,P4 at z=0.25', async () => {
        let oriPoints: Array<Point> = [];
        oriPoints = [...oriPoints,new Point(100,100)]
        oriPoints = [...oriPoints,new Point(200,100)]
        oriPoints = [...oriPoints,new Point(300,100)]
        oriPoints = [...oriPoints,new Point(400,100)]
        let curves: CubicBezierSplitCurves = splitCubicBezier(oriPoints,0.25);
        expect(curves.C1[0]).toEqual(new Point(100,100));
        expect(curves.C1[1]).toEqual(new Point(125,100));
        expect(curves.C1[2]).toEqual(new Point(150,100));
        expect(curves.C1[3]).toEqual(new Point(175,100));
        expect(curves.C2[0]).toEqual(new Point(175,100));
        expect(curves.C2[1]).toEqual(new Point(250,100));
        expect(curves.C2[2]).toEqual(new Point(325,100));
        expect(curves.C2[3]).toEqual(new Point(400,100));
    });
    it('should return the points from a path "M100,100 H400 V400 H 100 V 100"', async () => {
        const d: string = 'M100,100 H400 V400 H 100 V 100';
        const cbp: CubicBezier = await cubicBezierfromPath(d,0);
        const points: Array<Point> = getPointsFromCBPath(cbp); 
        expect(points[0]).toEqual(new Point(100,100));
        expect(points[1]).toEqual(new Point(200,100));
        expect(points[2]).toEqual(new Point(300,100));
        expect(points[3]).toEqual(new Point(400,100));
        expect(points[4]).toEqual(new Point(400,200));
        expect(points[5]).toEqual(new Point(400,300));
        expect(points[6]).toEqual(new Point(400,400));
        expect(points[7]).toEqual(new Point(300,400));
        expect(points[8]).toEqual(new Point(200,400));
        expect(points[9]).toEqual(new Point(100,400));
        expect(points[10]).toEqual(new Point(100,300));
        expect(points[11]).toEqual(new Point(100,200));
        expect(points[12]).toEqual(new Point(100,100));
    });
    it('should return the points from a path "M 250,100 L 270,230 400,250 270,270 250,400 230,270 100,250 230,230 250,100"', async () => {
        const d: string = 'M 250,100 L 270,230 400,250 270,270 250,400 230,270 100,250 230,230 250,100';
        const cbp: CubicBezier = await cubicBezierfromPath(d,0);
        const points: Array<Point> = getPointsFromCBPath(cbp);
        expect(points[0]).toEqual(new Point(250,100 ));
        expect(points[1]).toEqual(new Point(256.67, 143.33));
        expect(points[2]).toEqual(new Point(263.33, 186.67));
        expect(points[3]).toEqual(new Point(270, 230));
        expect(points[4]).toEqual(new Point(313.33, 236.67));
        expect(points[5]).toEqual(new Point(356.67, 243.33));
        expect(points[6]).toEqual(new Point(400, 250));
        expect(points[7]).toEqual(new Point(356.67, 256.67));
        expect(points[8]).toEqual(new Point(313.33, 263.33));
        expect(points[9]).toEqual(new Point(270, 270));
        expect(points[10]).toEqual(new Point(263.33, 313.33));
        expect(points[11]).toEqual(new Point(256.67, 356.67));
        expect(points[12]).toEqual(new Point(250, 400));
        expect(points[13]).toEqual(new Point(243.33, 356.67));
        expect(points[14]).toEqual(new Point(236.67, 313.33));
        expect(points[15]).toEqual(new Point(230, 270));
        expect(points[16]).toEqual(new Point(186.67, 263.33));
        expect(points[17]).toEqual(new Point(143.33, 256.67));
        expect(points[18]).toEqual(new Point(100, 250));
        expect(points[19]).toEqual(new Point(143.33, 243.33));
        expect(points[20]).toEqual(new Point(186.67, 236.67));
        expect(points[21]).toEqual(new Point(230, 230));
        expect(points[22]).toEqual(new Point(236.67, 186.67));
        expect(points[23]).toEqual(new Point(243.33,143.33));
        expect(points[24]).toEqual(new Point(250,100));
    }); 
    it('should return the points from a path "M100,100 H400 V400 H 100 V 100" permuted with pathIndex = 1', async () => {
        const d: string = 'M100,100 H400 V400 H 100 V 100';
        const cbp: CubicBezier = await cubicBezierfromPath(d,1);
        const pts: Array<Point> = getPointsFromCBPath(cbp);
        const points: Array<Point> = permutePoints(pts,1); 
        expect(points[0]).toEqual(new Point(400,100));
        expect(points[1]).toEqual(new Point(400,200));
        expect(points[2]).toEqual(new Point(400,300));
        expect(points[3]).toEqual(new Point(400,400));
        expect(points[4]).toEqual(new Point(300,400));
        expect(points[5]).toEqual(new Point(200,400));
        expect(points[6]).toEqual(new Point(100,400));
        expect(points[7]).toEqual(new Point(100,300));
        expect(points[8]).toEqual(new Point(100,200));
        expect(points[9]).toEqual(new Point(100,100));
        expect(points[10]).toEqual(new Point(200,100));
        expect(points[11]).toEqual(new Point(300,100));
        expect(points[12]).toEqual(new Point(400,100));
    });
    it('should return the points from a path "M100,100 H400 V400 H 100 V 100" permuted with pathIndex = 2', async () => {
        const d: string = 'M100,100 H400 V400 H 100 V 100';
        const cbp: CubicBezier = await cubicBezierfromPath(d,2);
        const pts: Array<Point> = getPointsFromCBPath(cbp);
        const points: Array<Point> = permutePoints(pts,2); 
        expect(points[0]).toEqual(new Point(400,400));
        expect(points[1]).toEqual(new Point(300,400));
        expect(points[2]).toEqual(new Point(200,400));
        expect(points[3]).toEqual(new Point(100,400));
        expect(points[4]).toEqual(new Point(100,300));
        expect(points[5]).toEqual(new Point(100,200));
        expect(points[6]).toEqual(new Point(100,100));
        expect(points[7]).toEqual(new Point(200,100));
        expect(points[8]).toEqual(new Point(300,100));
        expect(points[9]).toEqual(new Point(400,100));
        expect(points[10]).toEqual(new Point(400,200));
        expect(points[11]).toEqual(new Point(400,300));
        expect(points[12]).toEqual(new Point(400,400));
    });
    it('should return the points from a path "M100,100 H400 V400 H 100 V 100" permuted with pathIndex = -1', async () => {
        const d: string = 'M100,100 H400 V400 H 100 V 100';
        const cbp: CubicBezier = await cubicBezierfromPath(d,-1);
        const pts: Array<Point> = getPointsFromCBPath(cbp);
        const points: Array<Point> = permutePoints(pts,-1); 
        expect(points[0]).toEqual(new Point(100,400));
        expect(points[1]).toEqual(new Point(100,300));
        expect(points[2]).toEqual(new Point(100,200));
        expect(points[3]).toEqual(new Point(100,100));
        expect(points[4]).toEqual(new Point(200,100));
        expect(points[5]).toEqual(new Point(300,100));
        expect(points[6]).toEqual(new Point(400,100));
        expect(points[7]).toEqual(new Point(400,200));
        expect(points[8]).toEqual(new Point(400,300));
        expect(points[9]).toEqual(new Point(400,400));
        expect(points[10]).toEqual(new Point(300,400));
        expect(points[11]).toEqual(new Point(200,400));
        expect(points[12]).toEqual(new Point(100,400));
    });
    it('should return the points from a path "M100,100 H400 V400 H 100 V 100" permuted with pathIndex = -2', async () => {
        const d: string = 'M100,100 H400 V400 H 100 V 100';
        const cbp: CubicBezier = await cubicBezierfromPath(d,-2);
        const pts: Array<Point> = getPointsFromCBPath(cbp);
        const points: Array<Point> = permutePoints(pts,-2); 
        expect(points[0]).toEqual(new Point(400,400));
        expect(points[1]).toEqual(new Point(300,400));
        expect(points[2]).toEqual(new Point(200,400));
        expect(points[3]).toEqual(new Point(100,400));
        expect(points[4]).toEqual(new Point(100,300));
        expect(points[5]).toEqual(new Point(100,200));
        expect(points[6]).toEqual(new Point(100,100));
        expect(points[7]).toEqual(new Point(200,100));
        expect(points[8]).toEqual(new Point(300,100));
        expect(points[9]).toEqual(new Point(400,100));
        expect(points[10]).toEqual(new Point(400,200));
        expect(points[11]).toEqual(new Point(400,300));
        expect(points[12]).toEqual(new Point(400,400));
    });
    it('should align the modulo Shape "M100,100 H400 V400 H 100 V 100" with twice number of Points', async () => {
        const d: string = 'M100,100 H400 V400 H 100 V 100';
        const cbp: CubicBezier = await cubicBezierfromPath(d,0);
        const res = isRegularShape(cbp);
        expect(res).toBeTruthy(); 
        const newCB: CubicBezier = await alignPathSegmentWithMax(cbp,8);
        let path:string = 'M 100,100 C 150,100 200,100 250,100 C 300,100 350,100 400,100 C 400,150 400,200 400,250 ';
        path = path.concat('C 400,300 400,350 400,400 C 350,400 300,400 250,400 C 200,400 150,400 100,400 ');
        path = path.concat('C 100,350 100,300 100,250 C 100,200 100,150 100,100');
        expect(newCB.cBz).toEqual(path); 
    });
    it('should align the modulo Shape "M100,100 H400 V400 H 100 V 100" with a ratio of 4', async () => {
        const d: string = 'M100,100 H400 V400 H 100 V 100';
        const cbp: CubicBezier = await cubicBezierfromPath(d,0);
        const res = isRegularShape(cbp);
        expect(res).toBeTruthy(); 
        const newCB: CubicBezier = await alignPathSegmentWithMax(cbp,16);
        let path:string = "M 100,100 C 125,100 150,100 175,100 C 200,100 225,100 250,100 C 275,100 300,100 325,100 ";
        path = path.concat('C 350,100 375,100 400,100 C 400,125 400,150 400,175 C 400,200 400,225 400,250 C 400,275 400,300 400,325 ');
        path = path.concat('C 400,350 400,375 400,400 C 375,400 350,400 325,400 C 300,400 275,400 250,400 C 225,400 200,400 175,400 ');

        path = path.concat('C 150,400 125,400 100,400 C 100,375 100,350 100,325 C 100,300 100,275 100,250 C 100,225 100,200 100,175 ');
        path = path.concat('C 100,150 100,125 100,100');
        expect(newCB.cBz).toEqual(path); 
    });
    it('should align two modulo Shapes ', async () => {
        const d1: string = 'M100,100 H400 V400 H 100 V 100';
        const cbp1: CubicBezier = await cubicBezierfromPath(d1,0);
        const d2: string = 'M 250,100 L 300,200 400,250 300,300 250,400 200,300 100,250 200,200 250,100';
        const cbp2: CubicBezier = await cubicBezierfromPath(d2,0);
        const res: CubicBezier = await alignPathSegmentWithMax(cbp1,cbp2.cLength.length);
        expect(res.cLength.length).toEqual(8)                 
        let path:string = 'M 100,100 C 150,100 200,100 250,100 C 300,100 350,100 400,100 C 400,150 400,200 400,250 ';
        path = path.concat('C 400,300 400,350 400,400 C 350,400 300,400 250,400 C 200,400 150,400 100,400 ');
        path = path.concat('C 100,350 100,300 100,250 C 100,200 100,150 100,100');
        expect(res.cBz).toEqual(path); 
    });
    it('should align two modulo Shapes  with segments ratio = 2', async () => {
        const d1: string = 'M 175,200 C 230,20 270,20 325,200 V 300 C 270,480 230,480 175,300 V 200';
        const cbp1: CubicBezier = await cubicBezierfromPath(d1,0);
        const d2: string = 'M 250,100 L 300,200 400,250 300,300 250,400 200,300 100,250 200,200 250,100';
        const cbp2: CubicBezier = await cubicBezierfromPath(d2,0);
        const res: CubicBezier = await alignPathSegmentWithMax(cbp1,cbp2.cLength.length);
        expect(res.cLength.length).toEqual(8)    
        let path:string = 'M 175,200 C 202.50,110.00 226.25,65.00 250,65 C 273.75,65.00 297.50,110.00 325,200 C 325.00,216.67 325.00,233.33 325,250 ';
        path = path.concat('C 325.00,266.67 325.00,283.33 325,300 C 297.50,390.00 273.75,435.00 250,435 C 226.25,435.00 202.50,390.00 175,300 ');
        path = path.concat('C 175.00,283.33 175.00,266.67 175,250 C 175.00,233.33 175.00,216.67 175,200');
        expect(res.cBz).toEqual(path); 
    });
    it('should align two modulo Shapes  with segments ratio = 4', async () => {
        const d1: string = 'M 175,250 C 230,20 270,20 325,250 C 270,480 230,480 175,250';
        const cbp1: CubicBezier = await cubicBezierfromPath(d1,0);
        const d2: string = 'M 250,100 L 300,200 400,250 300,300 250,400 200,300 100,250 200,200 250,100';
        const cbp2: CubicBezier = await cubicBezierfromPath(d2,0);
        const res: CubicBezier = await alignPathSegmentWithMax(cbp1,cbp2.cLength.length);
        expect(res.cLength.length).toEqual(8)         
        let path:string = 'M 175,250 C 188.75,192.50 201.56,149.38 213.91,120.63 C 226.25,91.88 238.13,77.50 250.00,77.50 ';
        path = path.concat('C 261.88,77.50 273.75,91.88 286.09,120.63 C 298.44,149.38 311.25,192.50 325,250 C 311.25,307.50 298.44,350.63 286.09,379.38 ');
        path = path.concat('C 273.75,408.13 261.88,422.50 250.00,422.50 C 238.13,422.50 226.25,408.13 213.91,379.38 C 201.56,350.63 188.75,307.50 175,250');
        expect(res.cBz).toEqual(path); 
    });
    it('should return null when aligning two modulo Shapes with the second shape having got more points', async () => {
        const d1: string = 'M100,100 H400 V400 H 100 V 100';
        const cbp1: CubicBezier = await cubicBezierfromPath(d1,0);
        const d2: string = 'M 250,100 L 300,200 400,250 300,300 250,400 200,300 100,250 200,200 250,100';
        const cbp2: CubicBezier = await cubicBezierfromPath(d2,0);
        const res: CubicBezier = await alignPathSegmentWithMax(cbp2,cbp1.cLength.length);
        expect(res).toBeNull(); 
    });
    it('should align two non-modulo Shapes ', async () => {
        const d1: string = 'M100,100 H400 V400 H 100 V 100';
        const cbp1: CubicBezier = await cubicBezierfromPath(d1,0);
        const d2: string = 'M 250,230 C 280,100 450,150 400,250 L 280,450 C 260,480 240,480 220,450 L100,250 C 50,150 220,100 250,230';
        const cbp2: CubicBezier = await cubicBezierfromPath(d2,0);
        const res: CubicBezier = await alignPathSegmentWithMax(cbp1,cbp2.cLength.length);
        expect(res.cLength.length).toEqual(5)                     
        let path:string = 'M 100,100 C 200,100 300,100 400,100 C 400,200 400,300 400,400 C 300,400 200,400 100,400 ';
        path = path.concat('C 100,300 100,200 100,100 C 100,100 100,100 100,100');
        expect(res.cBz).toEqual(path); 
    });
   it('should align two non-modulo Shapes with 10 segments', async () => {
        const d1: string = 'M100,100 H400 V400 H 100 V 100';
        const cbp1: CubicBezier = await cubicBezierfromPath(d1,0);
        const d2: string = 'M 250,230 C 280,100 450,150 400,250 L 280,450 C 260,480 240,480 220,450 L100,250 C 50,150 220,100 250,230';
        const cbp2: CubicBezier = await cubicBezierfromPath(d2,0);
        const res: CubicBezier = await alignPathSegmentWithMax(cbp1,2*cbp2.cLength.length);
        expect(res.cLength.length).toEqual(10)                     
        
        let path:string = 'M 100,100 C 150,100 200,100 250,100 C 300,100 350,100 400,100 C 400,150 400,200 400,250 ';
        path = path.concat('C 400,300 400,350 400,400 C 350,400 300,400 250,400 C 200,400 150,400 100,400 C 100,350 100,300 100,250 ');
        path = path.concat('C 100,200 100,150 100,100 C 100,100 100,100 100,100 C 100,100 100,100 100,100');
        expect(res.cBz).toEqual(path); 
    });
    it('should align two path segments ', async () => {
        let paths:Array<CubicBezier> = [];
        const d1: string = 'M100,100 H400 V400 H 100 V 100';
        const cbp1: CubicBezier = await cubicBezierfromPath(d1,0);
        const d2: string = 'M 250,100 L 300,200 400,250 300,300 250,400 200,300 100,250 200,200 250,100';
        const cbp2: CubicBezier = await cubicBezierfromPath(d2,0);
        paths = [...paths,cbp1];
        paths = [...paths,cbp2];
        const alignedPaths:Array<CubicBezier> = await alignPathSegments(paths);
        expect(alignedPaths.length).toEqual(2)
        let path1:string = 'M 100,100 C 150,100 200,100 250,100 C 300,100 350,100 400,100 C 400,150 400,200 400,250 ';
        path1 = path1.concat('C 400,300 400,350 400,400 C 350,400 300,400 250,400 C 200,400 150,400 100,400 C 100,350 100,300 100,250 C 100,200 100,150 100,100');
        let path2:string = 'M 250,100 C 266.67,133.33 283.33,166.67 300,200 C 333.33,216.67 366.67,233.33 400,250 C 366.67,266.67 333.33,283.33 300,300 ';
        path2 = path2.concat('C 283.33,333.33 266.67,366.67 250,400 C 233.33,366.67 216.67,333.33 200,300 C 166.67,283.33 133.33,266.67 100,250 ');
        path2 = path2.concat('C 133.33,233.33 166.67,216.67 200,200 C 216.67,166.67 233.33,133.33 250,100');
        expect(alignedPaths[0].cLength.length).toEqual(8);
        expect(alignedPaths[1].cLength.length).toEqual(8);
        expect(alignedPaths[0].cBz).toEqual(path1);
        expect(alignedPaths[1].cBz).toEqual(path2);
    });

});

    //        const d: string ="M10 315 L 50, 255 110 215 A 30 30 0 0 0 162.55 162.45 L 172.55 152.45 A 50 50 0 0 1 215.1 109.9 L 315 10 110 10 Z";
