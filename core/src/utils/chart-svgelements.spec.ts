import { Rect, Point } from '../global/interfaces/geom';
import { SVGOptions, DataSet, AxisLength, NearestPoint, DataPoint }  from '../global/interfaces/charts';
import { axisMaxArrayAttribute, axisMinArrayAttribute, axisMaxArrayLabel , axisRange,
        axisNiceNumber, axisGetNumber, maxLegend, axisConvertX, axisConvertY,
        scalarDistance, getTotalLength, getNearest, getSVGOptions, checkDataSetsValidity} from './chart-svgelements';

describe('svgelements', () => {

    describe('SVGOptions-utils', () => {
        it('should return the default SVGOptions', () => {
            let opt:SVGOptions = getSVGOptions();
            expect(opt.id).toBeNull();
            expect(opt.fontFamily).toEqual("Verdana");
            expect(opt.fontSize).toEqual("10px");
            expect(opt.fill).toBeNull();
            expect(opt.fillOpacity).toBeNull();
            expect(opt.anchor).toBeNull();
            expect(opt.stroke).toBeNull();
            expect(opt.strokeWidth).toBeNull();
            expect(opt.strokeOpacity).toBeNull();
            expect(opt.strokeLinejoin).toBeNull();
            expect(opt.strokeLinecap).toBeNull();
            expect(opt.strokeMiterlimit).toBeNull();
            expect(opt.strokeDasharray).toBeNull();
            expect(opt.strokeDashoffset).toBeNull();
        });    
        it('should set the id SVGOptions', () => {
            let options: SVGOptions = {id:"testid"};
            let opt:SVGOptions = getSVGOptions(options);
            expect(opt.id).toEqual("testid");
            expect(opt.fontFamily).toEqual("Verdana");
            expect(opt.fontSize).toEqual("10px");
            expect(opt.fill).toBeNull();
            expect(opt.fillOpacity).toBeNull();
            expect(opt.anchor).toBeNull();
            expect(opt.stroke).toBeNull();
            expect(opt.strokeWidth).toBeNull();
            expect(opt.strokeOpacity).toBeNull();
            expect(opt.strokeLinejoin).toBeNull();
            expect(opt.strokeLinecap).toBeNull();
            expect(opt.strokeMiterlimit).toBeNull();
            expect(opt.strokeDasharray).toBeNull();
            expect(opt.strokeDashoffset).toBeNull();
        });    
        it('should set the text SVGOptions', () => {
            let options: SVGOptions = { fontFamily:"Arial",
                                        fontSize: "20px"};
            let opt:SVGOptions = getSVGOptions(options);
            expect(opt.id).toBeNull();
            expect(opt.fontFamily).toEqual("Arial");
            expect(opt.fontSize).toEqual("20px");
            expect(opt.fill).toBeNull();
            expect(opt.fillOpacity).toBeNull();
            expect(opt.anchor).toBeNull();
            expect(opt.stroke).toBeNull();
            expect(opt.strokeWidth).toBeNull();
            expect(opt.strokeOpacity).toBeNull();
            expect(opt.strokeLinejoin).toBeNull();
            expect(opt.strokeLinecap).toBeNull();
            expect(opt.strokeMiterlimit).toBeNull();
            expect(opt.strokeDasharray).toBeNull();
            expect(opt.strokeDashoffset).toBeNull();
        });    
        it('should set the text anchor SVGOptions to "start"', () => {
            let options: SVGOptions = { anchor: "start"};
            let opt:SVGOptions = getSVGOptions(options);
            expect(opt.id).toBeNull();
            expect(opt.fontFamily).toEqual("Verdana");
            expect(opt.fontSize).toEqual("10px");
            expect(opt.fill).toBeNull();
            expect(opt.fillOpacity).toBeNull();
            expect(opt.anchor).toEqual('start');
            expect(opt.stroke).toBeNull();
            expect(opt.strokeWidth).toBeNull();
            expect(opt.strokeOpacity).toBeNull();
            expect(opt.strokeLinejoin).toBeNull();
            expect(opt.strokeLinecap).toBeNull();
            expect(opt.strokeMiterlimit).toBeNull();
            expect(opt.strokeDasharray).toBeNull();
            expect(opt.strokeDashoffset).toBeNull();
        });    
        it('should set the text anchor SVGOptions to "middle"', () => {
            let options: SVGOptions = { anchor: "middle"};
            let opt:SVGOptions = getSVGOptions(options);
            expect(opt.id).toBeNull();
            expect(opt.fontFamily).toEqual("Verdana");
            expect(opt.fontSize).toEqual("10px");
            expect(opt.fill).toBeNull();
            expect(opt.fillOpacity).toBeNull();
            expect(opt.anchor).toEqual('middle');
            expect(opt.stroke).toBeNull();
            expect(opt.strokeWidth).toBeNull();
            expect(opt.strokeOpacity).toBeNull();
            expect(opt.strokeLinejoin).toBeNull();
            expect(opt.strokeLinecap).toBeNull();
            expect(opt.strokeMiterlimit).toBeNull();
            expect(opt.strokeDasharray).toBeNull();
            expect(opt.strokeDashoffset).toBeNull();
        });    
        it('should set the text anchor SVGOptions to "end"', () => {
            let options: SVGOptions = { anchor: "end"};
            let opt:SVGOptions = getSVGOptions(options);
            expect(opt.id).toBeNull();
            expect(opt.fontFamily).toEqual("Verdana");
            expect(opt.fontSize).toEqual("10px");
            expect(opt.fill).toBeNull();
            expect(opt.fillOpacity).toBeNull();
            expect(opt.anchor).toEqual('end');
            expect(opt.stroke).toBeNull();
            expect(opt.strokeWidth).toBeNull();
            expect(opt.strokeOpacity).toBeNull();
            expect(opt.strokeLinejoin).toBeNull();
            expect(opt.strokeLinecap).toBeNull();
            expect(opt.strokeMiterlimit).toBeNull();
            expect(opt.strokeDasharray).toBeNull();
            expect(opt.strokeDashoffset).toBeNull();
        });    
        it('should return null for the text anchor SVGOptions not in "start,middle,end"', () => {
            let options: SVGOptions = { anchor: "top"};
            let opt:SVGOptions = getSVGOptions(options);
            expect(opt.id).toBeNull();
            expect(opt.fontFamily).toEqual("Verdana");
            expect(opt.fontSize).toEqual("10px");
            expect(opt.fill).toBeNull();
            expect(opt.fillOpacity).toBeNull();
            expect(opt.anchor).toBeNull();
            expect(opt.stroke).toBeNull();
            expect(opt.strokeWidth).toBeNull();
            expect(opt.strokeOpacity).toBeNull();
            expect(opt.strokeLinejoin).toBeNull();
            expect(opt.strokeLinecap).toBeNull();
            expect(opt.strokeMiterlimit).toBeNull();
            expect(opt.strokeDasharray).toBeNull();
            expect(opt.strokeDashoffset).toBeNull();
        });    
        it('should return the fill SVGOptions', () => {
            let options: SVGOptions = { fill:'#ff0000', fillOpacity:'0.5'};
            let opt:SVGOptions = getSVGOptions(options);
            expect(opt.id).toBeNull();
            expect(opt.fontFamily).toEqual("Verdana");
            expect(opt.fontSize).toEqual("10px");
            expect(opt.fill).toEqual("#ff0000");
            expect(opt.fillOpacity).toEqual("0.5");
            expect(opt.anchor).toBeNull();
            expect(opt.stroke).toBeNull();
            expect(opt.strokeWidth).toBeNull();
            expect(opt.strokeOpacity).toBeNull();
            expect(opt.strokeLinejoin).toBeNull();
            expect(opt.strokeLinecap).toBeNull();
            expect(opt.strokeMiterlimit).toBeNull();
            expect(opt.strokeDasharray).toBeNull();
            expect(opt.strokeDashoffset).toBeNull();
        });    
        it('should return the stroke SVGOptions', () => {
            let options: SVGOptions = { stroke: "#00ff00", strokeWidth:"3", strokeOpacity:"1"};
            let opt:SVGOptions = getSVGOptions(options);
            expect(opt.id).toBeNull();
            expect(opt.fontFamily).toEqual("Verdana");
            expect(opt.fontSize).toEqual("10px");
            expect(opt.fill).toBeNull();
            expect(opt.fillOpacity).toBeNull();
            expect(opt.anchor).toBeNull();
            expect(opt.stroke).toEqual('#00ff00');
            expect(opt.strokeWidth).toEqual('3');
            expect(opt.strokeOpacity).toEqual('1');
            expect(opt.strokeLinejoin).toBeNull();
            expect(opt.strokeLinecap).toBeNull();
            expect(opt.strokeMiterlimit).toBeNull();
            expect(opt.strokeDasharray).toBeNull();
            expect(opt.strokeDashoffset).toBeNull();
        });    
        it('should return the stroke-linecap SVGOptions', () => {
            let options: SVGOptions = { strokeLinecap:"square"};
            let opt:SVGOptions = getSVGOptions(options);
            expect(opt.id).toBeNull();
            expect(opt.fontFamily).toEqual("Verdana");
            expect(opt.fontSize).toEqual("10px");
            expect(opt.fill).toBeNull();
            expect(opt.fillOpacity).toBeNull();
            expect(opt.anchor).toBeNull();
            expect(opt.stroke).toBeNull();
            expect(opt.strokeWidth).toBeNull();
            expect(opt.strokeOpacity).toBeNull();
            expect(opt.strokeLinejoin).toBeNull();
            expect(opt.strokeLinecap).toEqual("square");
            expect(opt.strokeMiterlimit).toBeNull();
            expect(opt.strokeDasharray).toBeNull();
            expect(opt.strokeDashoffset).toBeNull();
        });    
        it('should return the stroke-linejoin SVGOptions', () => {
            let options: SVGOptions = { strokeLinejoin:"round"};
            let opt:SVGOptions = getSVGOptions(options);
            expect(opt.id).toBeNull();
            expect(opt.fontFamily).toEqual("Verdana");
            expect(opt.fontSize).toEqual("10px");
            expect(opt.fill).toBeNull();
            expect(opt.fillOpacity).toBeNull();
            expect(opt.anchor).toBeNull();
            expect(opt.stroke).toBeNull();
            expect(opt.strokeWidth).toBeNull();
            expect(opt.strokeOpacity).toBeNull();
            expect(opt.strokeLinejoin).toEqual("round");
            expect(opt.strokeLinecap).toBeNull();
            expect(opt.strokeMiterlimit).toBeNull();
            expect(opt.strokeDasharray).toBeNull();
            expect(opt.strokeDashoffset).toBeNull();
        });    
        it('should return the stroke-dash SVGOptions', () => {
            let options: SVGOptions = { strokeDasharray:"20,10,5,5,5,10",strokeDashoffset:"2"};
            let opt:SVGOptions = getSVGOptions(options);
            expect(opt.id).toBeNull();
            expect(opt.fontFamily).toEqual("Verdana");
            expect(opt.fontSize).toEqual("10px");
            expect(opt.fill).toBeNull();
            expect(opt.fillOpacity).toBeNull();
            expect(opt.anchor).toBeNull();
            expect(opt.stroke).toBeNull();
            expect(opt.strokeWidth).toBeNull();
            expect(opt.strokeOpacity).toBeNull();
            expect(opt.strokeLinejoin).toBeNull();
            expect(opt.strokeLinecap).toBeNull();
            expect(opt.strokeMiterlimit).toBeNull();
            expect(opt.strokeDasharray).toEqual("20,10,5,5,5,10");
            expect(opt.strokeDashoffset).toEqual("2");
        });    
    });
    describe('axis-utils', () => {
        let data1: Array<DataSet>;
        let data2: Array<DataSet>;
        beforeEach( () => { 
            data1 = [{
                color: '#ff0000',
                markerType: 'plus',
                markerSize: 10,
                markerColor: '#0000ff',
                dataPoints: [
                    { x: '2012-01-01', y: 450 },
                    { x: '2012-01-02', y: 414 },
                    { x: '2012-01-03', y: 520 },
                    { x: '2012-01-04', y: 460 },
                    { x: '2012-01-05', y: 450 },
                    { x: '2012-01-06', y: 500 },
                    { x: '2012-01-07', y: 480 },
                    { x: '2012-01-08', y: 480 },
                    { x: '2012-01-09', y: 410 },
                    { x: '2012-01-10', y: 500 },
                    { x: '2012-01-11', y: 480 },
                    { x: '2012-01-12', y: 510 }
                ] 
            },
            {
                color: '#ff0000',
                markerType: 'plus',
                markerSize: 10,
                markerColor: '#0000ff',
                dataPoints: [
                    { x: '2012-01-01', y: 430 },
                    { x: '2012-01-02', y: 420 },
                    { x: '2012-01-03', y: 510 },
                    { x: '2012-01-04', y: 410 },
                    { x: '2012-01-05', y: 430 },
                    { x: '2012-01-06', y: 505 },
                    { x: '2012-01-07', y: 470 },
                    { x: '2012-01-08', y: 440 },
                    { x: '2012-01-09', y: 390 },
                    { x: '2012-01-10', y: 380 },
                    { x: '2012-01-11', y: 420 },
                    { x: '2012-01-12', y: 500 }
                ] 
            }];
            data2 = [{
                color: '#00ff00',
                markerType: 'square',
                markerSize: 10,
                markerColor: '#00ff00',
                dataPoints: [
                    { x: 5, y: 450 },
                    { x: 15, y: 414 },
                    { x: 25, y: 520 },
                    { x: 30, y: 460 },
                    { x: 35, y: 450 },
                    { x: 40, y: 500 },
                    { x: 50, y: 480 },
                    { x: 75, y: 480 },
                    { x: 90, y: 410 },
                    { x: 100, y: 500 },
                    { x: 110, y: 480 },
                    { x: 125, y: 510 }
                ] 
            }];
        });
        afterEach( () => {
            data1 = null;
            data2 = null;
        });
        it('should return the DataPoint for the maximum value of the "y" axis', async () => {
            let value: DataPoint = await axisMaxArrayAttribute(data1,"y");
            expect(value).toEqual({"x": "2012-01-03", "y": 520});
        });
        it('should return the DataPoint for the maximum value of the "y" axis when data1[0].dataPoints[0].y = 0', async () => {
            data1[0].dataPoints[0].y = 0;
            let value: DataPoint = await axisMaxArrayAttribute(data1,"y");
            expect(value).toEqual({"x": "2012-01-03", "y": 520});
        });

        it('should return the DataPoint for the minimum value of the "y" axis', () => {
            let value: DataPoint = axisMinArrayAttribute(data1,"y");
            expect(value).toEqual({"x": "2012-01-10", "y": 380});
        }); 
        it('should return the DataPoint for the minimum value of the "y" axis when data1[0].dataPoints[0].y = 0', () => {
            data1[0].dataPoints[0].y = 0;
            let value: DataPoint = axisMinArrayAttribute(data1,"y");
            expect(value).toEqual({"x": "2012-01-01", "y": 0});
        }); 
        it('should return the DataPoint for the maximum value of the "x" axis when x:number', () => {
            let value: DataPoint = axisMaxArrayAttribute(data2,"x");
            expect(value).toEqual({"x": 125, "y": 510});
        });        
        it('should return the DataPoint for the minimum value of the "x" axis when x:number', () => {
            let value: DataPoint = axisMinArrayAttribute(data2,"x");
            expect(value).toEqual({"x": 5, "y": 450});
        });        
        it('should return the DataPoint for the maximum value of the "x" axis when x:string', () => {
            let value: DataPoint = axisMaxArrayLabel(data1,"x");
            expect(value).toEqual({"x": '2012-01-01', "y": 450});
        });        
        it('should not return the DataPoint for the maximum value of the "label" axis', () => {
            let data:Array<DataSet> = [{dataPoints:[
            {label:"Apple",y:10,color:"#e34c46"},
            {label:"Orange",y:-17,color:"#d1b038"},
            {label:"Banana",y:12,color:"#48a37c"},
            {label:"Mango",y:30,color:"#111782"},
            {label:"Grape",y:28,color:"#db123a"}]}];
            let value: DataPoint = axisMaxArrayLabel(data,"x");
            expect(value).toBeNull();
        });        
        it('should return the DataPoint for the maximum value of the "label" axis', () => {
            let data:Array<DataSet> = [{dataPoints:[
            {label:"Apple",y:10,color:"#e34c46"},
            {label:"Orange",y:-17,color:"#d1b038"},
            {label:"Banana",y:12,color:"#48a37c"},
            {label:"Mango",y:30,color:"#111782"},
            {label:"Grape",y:28,color:"#db123a"}]}];
            let value: DataPoint = axisMaxArrayLabel(data,"label");
            expect(value).toEqual({"color": "#d1b038", "label": "Orange", "y": -17});
        }); 
        it('should return 20 for axisNiceNumber(65,true,false)', () => {
            const n:number = axisNiceNumber(65,true,false);
            expect(n).toEqual(20);
        });
        it('should return 20 for axisNiceNumber(65,true,true)', () => {
            const n:number = axisNiceNumber(65,true,true);
            expect(n).toEqual(20);
        });
        it('should return 60 for axisNiceNumber(65,false,true)', () => {
            const n:number = axisNiceNumber(65,false,true);
            expect(n).toEqual(60);
        });

        it('should return 5 for axisNiceNumber(17,true,false)', () => {
            const n:number = axisNiceNumber(17,true,false);
            expect(n).toEqual(5);
        });
        it('should return 100 for axisNiceNumber(470,true,false)', () => {
            const n:number = axisNiceNumber(470,true,false);
            expect(n).toEqual(100);
        });
        it('should return 70 for axisNiceNumber(65,false,false)', () => {
            const n:number = axisNiceNumber(65,false,false);
            expect(n).toEqual(70);
        });
        it('should return 20 for axisNiceNumber(17,false,false)', () => {
            const n:number = axisNiceNumber(17,false,false);
            expect(n).toEqual(20);
        });
        it('should return 150 for axisNiceNumber(147,false,false)', () => {
            const n:number = axisNiceNumber(147,false,false);
            expect(n).toEqual(150);
        });
        it('should return 3000 for axisNiceNumber(2500,false,false)', () => {
            const n:number = axisNiceNumber(2500,false,false);
            expect(n).toEqual(3000);
        });
        it('should return 4000 for axisNiceNumber(3430,false,false)', () => {
            const n:number = axisNiceNumber(3430,false,false);
            expect(n).toEqual(4000);
        });
        it('should return 50000 for axisNiceNumber(47000,false,false)', () => {
            const n:number = axisNiceNumber(47000,false,false);
            expect(n).toEqual(50000);
        });
        it('should return 600 for axisNiceNumber(575,false,false)', () => {
            const n:number = axisNiceNumber(575,false,false);
            expect(n).toEqual(600);
        });
        it('should return 1000 for axisNiceNumber(730,false,false)', () => {
            const n:number = axisNiceNumber(730,false,false);
            expect(n).toEqual(1000);
        });
        it('should return 100 for axisNiceNumber(85,false,false)', () => {
            const n:number = axisNiceNumber(85,false,false);
            expect(n).toEqual(100);
        });
        it('should return 10 for axisNiceNumber(9.4,false,false)', () => {
            const n:number = axisNiceNumber(9.4,false,false);
            expect(n).toEqual(10);
        });
        it('should return 3000 for axisGetNumber(2500,0,false,false)', () => {
            const n:number = axisGetNumber(2500,0,false,false);
            expect(n).toEqual(3000);
        });
        it('should return 1000 for axisGetNumber(2500,0,true,false)', () => {
            const n:number = axisGetNumber(2500,0,true,false);
            expect(n).toEqual(1000);
        });
        it('should return 1000 for axisGetNumber(2500,0,true,true)', () => {
            const n:number = axisGetNumber(2500,0,true,true);
            expect(n).toEqual(1000);
        });
        it('should return 2000 for axisGetNumber(2500,0,false,true)', () => {
            const n:number = axisGetNumber(2500,0,false,true);
            expect(n).toEqual(2000);
        });
        it('should return the axis range of the "y" axis with zero', () => {
            let value: AxisLength = axisRange(data1,"y",0,true);
            expect(value).toEqual({ "type": 'number', "top": 600, "bottom": 0, "interval": 200, "length": 600 });
        });    
        it('should return the axis range of the "y" axis no interval without zero', () => {
            let value: AxisLength = axisRange(data1,"y");
            expect(value).toEqual({ "type": 'number', "top": 600, "bottom": 300, "interval": 50, "length": 300 });
        });    
        it('should return the axis range of the "y" axis without zero', () => {
            let value: AxisLength = axisRange(data1,"y",0,false);
            expect(value).toEqual({ "type": 'number', "top": 600, "bottom": 300, "interval": 50, "length": 300 });
        });    
        it('should return the axis range of the "y" axis with one y value negative', () => {
            data1[0].dataPoints[0].y = -data1[0].dataPoints[0].y;
            let value: AxisLength = axisRange(data1,"y",0,false);
            expect(value).toEqual({ "type": 'number', "top": 600, "bottom": -600, "interval": 200, "length": 1200 });
        });    
        it('should return the axis range of the "y" axis with one y value negative and interval 50', () => {
            data1[0].dataPoints[0].y = -data1[0].dataPoints[0].y;
            let value: AxisLength = axisRange(data1,"y",50,false);
            expect(value).toEqual({ "type": 'number', "top": 550, "bottom": -450, "interval": 50, "length": 1000 });
        });    
        it('should return the axis range of the "y" axis with one y value set to 0', () => {
            data1[0].dataPoints[0].y = 0;
            let value: AxisLength = axisRange(data1,"y",0,false);
            expect(value).toEqual({ "type": 'number', "top": 600, "bottom": 0, "interval": 200, "length": 600 });
        }); 
        it('should return the string of max length from an array of string', () => {
            const arr: Array<string> = ['one','two','three','four','five'];
            const value: string = maxLegend(arr);
            expect(value).toEqual('three');
        }); 
        it('should return y=59 from axisConvertY', () => {
            const yaxis:Rect = {left:48,top:59,width:0,height:495};
            const lenY:AxisLength = {top:0,bottom:-40,interval:-10,length:40};
            const yzero:number = axisConvertY(yaxis,lenY,0);
            expect(yzero).toEqual(59);
        });
        it('should return y=554 from axisConvertY', () => {
            const yaxis:Rect = {left:43,top:59,width:0,height:495};
            const lenY:AxisLength = {top:40,bottom:0,interval:10,length:40};
            const yzero:number = axisConvertY(yaxis,lenY,0);
            expect(yzero).toEqual(554);
        });
        it('should return y=343.625 from axisConvertY', () => {
            const yaxis:Rect = {left:43,top:59,width:0,height:495};
            const lenY:AxisLength = {top:40,bottom:0,interval:10,length:40};
            const yzero:number = axisConvertY(yaxis,lenY,17);
            expect(yzero).toEqual(343.625);
        });
        it('should return y=204.0714286 from axisConvertX', () => {
            const xaxis:Rect = {left:53,top:0,width:705,height:0};
            const lenX:AxisLength = {top:140,bottom:0,interval:20,type:"number",length:140};
            const x:number = axisConvertX(xaxis,lenX,30);
            expect(Number(x.toFixed(7))).toEqual(204.0714286);
        });
        it('should return y=556.57143 from axisConvertX', () => {
            const xaxis:Rect = {left:53,top:0,width:705,height:0};
            const lenX:AxisLength = {top:140,bottom:0,interval:20,type:"number",length:140};
            const x:number = axisConvertX(xaxis,lenX,100);
            expect(Number(x.toFixed(5))).toEqual(556.57143);
        });
        it('should return distance = 111.803399 from scalarDistance', () => {
            const val: Point = {x:50,y:100};
            const pt: Point = {x:0,y:0};
            const dis:number = scalarDistance(val,pt); 
            expect(Number(dis.toFixed(6))).toEqual(111.803399);       
        });
        it('should return distance = 200 from scalarDistance', () => {
            const arr: Array<Point> = [{x:0,y:0},{x:100,y:0},{x:100,y:50},{x:50,y:50}];
            const len:number = getTotalLength(arr); 
            expect(len).toEqual(200);       
        });
        it('should return the nearest point from an Array<Array<Point>>', () => {
            const arr: Array<Array<Point>> = [[
                {y: 257.7, x: 123.5},
                {y: 325.6, x: 153.7},
                {y: 125.6, x: 204.1},
                {y: 238.8, x: 254.43},
                {y: 257.7, x: 304.8},
                {y: 163.3, x: 355.1},
                {y: 201.1, x: 405.5},
                {y: 201.1, x: 455.9},
                {y: 333.1, x: 506.2},
                {y: 163.3, x: 556.6},
                {y: 201.1, x: 606.9},
                {y: 144.5, x: 657.3}        
            ]]
            const pt:Point = {x: 484.1, y: 242.1};
            const near: NearestPoint = getNearest(arr,pt); 
            expect(near.line).toEqual(0);
            expect(near.index).toEqual(7);
            expect(near.point.x).toBeCloseTo(455.9);            
            expect(near.point.y).toBeCloseTo(201.1);            
        });
        it('should return the nearest point from an Array<Array<Point>>', () => {
            const arr: Array<Array<Point>> = [[
                    {y: 185.3, x: 111.75},
                    {y: 216.4, x: 199.9},
                    {y: 124.9, x: 376.1},
                    {y: 176.7, x: 493.6},
                    {y: 219.9, x: 640.5}       
                ],
                [
                    {y: 358, x: 111.75},
                    {y: 107.6, x: 199.9},
                    {y: 150.8, x: 376.1},
                    {y: 133.5, x: 493.6},
                    {y: 215.6, x: 640.5}       
                ],
                [
                    {y: 188.6, x: 111.75},
                    {y: 219.9, x: 199.9},
                    {y: 271.7, x: 376.1},
                    {y: 124.9, x: 493.6},
                    {y: 224.2, x: 640.5}       
                ]
            ]
            let pt:Point = {x: 115.4, y: 198.4};
            let near: NearestPoint = getNearest(arr,pt); 
            expect(near.line).toEqual(2);
            expect(near.index).toEqual(0);
            expect(near.point.x).toBeCloseTo(111.75);            
            expect(near.point.y).toBeCloseTo(188.6);            
            pt = {x: 115.7, y: 182.3};
            near = getNearest(arr,pt); 
            expect(near.line).toEqual(0);
            expect(near.index).toEqual(0);
            expect(near.point.x).toBeCloseTo(111.75);            
            expect(near.point.y).toBeCloseTo(185.3);            
            pt = {x: 409.7, y: 157.1};
            near = getNearest(arr,pt); 
            expect(near.line).toEqual(1);
            expect(near.index).toEqual(2);
            expect(near.point.x).toBeCloseTo(376.1);            
            expect(near.point.y).toBeCloseTo(150.8);            
            pt = {x: 494.4, y: 160.7};
            near = getNearest(arr,pt); 
            expect(near.line).toEqual(0);
            expect(near.index).toEqual(3);
            expect(near.point.x).toBeCloseTo(493.6);            
            expect(near.point.y).toBeCloseTo(176.7);            
            pt = {x: 492, y: 145};
            near = getNearest(arr,pt); 
            expect(near.line).toEqual(1);
            expect(near.index).toEqual(3);
            expect(near.point.x).toBeCloseTo(493.6);            
            expect(near.point.y).toBeCloseTo(133.5);            
            pt = {x: 492, y: 127.7};
            near = getNearest(arr,pt); 
            expect(near.line).toEqual(2);
            expect(near.index).toEqual(3);
            expect(near.point.x).toBeCloseTo(493.6);            
            expect(near.point.y).toBeCloseTo(124.9);            
        });
    });
    describe('dataSets validity', () => {

        it('should return error when key not in ["x","label","y"]', () => {
            var axisType = ['x','y'];
            var data1: Array<any> = [{
                color: '#ff0000',
                dataPoints: [
                    { x: '2012-01-01', y: 450 },
                    { v: '2012-01-02', y: 414 },
                    { x: '2012-01-03', y: 520 },
                ] 
            }];
            var dataSets = checkDataSetsValidity(data1,axisType);
            expect(dataSets.dataSets).toBeNull();
            expect(dataSets.message).toEqual("Non consistent key in dataPoints key in [" + axisType + "]");
            data1 = [{
                color: '#ff0000',
                dataPoints: [
                    { x: '2012-01-01', y: 450 },
                    { x: '2012-01-02', y: 414 },
                    { x: '2012-01-03', z: 520 },
                ] 
            }];
            dataSets = checkDataSetsValidity(data1,axisType);
            expect(dataSets.dataSets).toBeNull();
            expect(dataSets.message).toEqual("Non consistent key in dataPoints key in [" + axisType + "]");
            axisType = ['label','y'];
            data1 = [{
                color: '#ff0000',
                dataPoints: [
                    { label: '2012-01-01', y: 450 },
                    { x: '2012-01-02', y: 414 },
                    { label: '2012-01-03', y: 520 },
                ] 
            }];
            dataSets = checkDataSetsValidity(data1,axisType);
            expect(dataSets.dataSets).toBeNull();
            expect(dataSets.message).toEqual("Non consistent key in dataPoints key in [" + axisType + "]");
            axisType = ['x','y'];
            data1 = [{
                color: '#ff0000',
                dataPoints: [
                    { label: '2012-01-01', y: 450 },
                    { label: '2012-01-02', y: 414 },
                    { label: '2012-01-03', y: 520 },
                ] 
            }];
            dataSets = checkDataSetsValidity(data1,axisType);
            expect(dataSets.dataSets).toBeNull();
            expect(dataSets.message).toEqual("Non consistent key in dataPoints key in [" + axisType + "]");

        });
        it('should return error when key "x" or "label" are not of consistent type', () => {
            var axisType = ['x','y'];
            var data1: Array<any> = [{
                color: '#ff0000',
                dataPoints: [
                    { x: '2012-01-01', y: 450 },
                    { x: 1, y: 414 },
                    { x: '2012-01-03', y: 520 },
                ] 
            }];
            var dataSets = checkDataSetsValidity(data1,axisType);
            expect(dataSets.dataSets).toBeNull();
            expect(dataSets.message).toEqual("Non consistent " + axisType[0] + " type in dataPoints");

            data1 = [{
                color: '#ff0000',
                dataPoints: [
                    { x: 1, y: 450 },
                    { x: 5, y: 414 },
                    { x: "10", y: 520 },
                ] 
            }];
            var dataSets = checkDataSetsValidity(data1,axisType);
            expect(dataSets.dataSets).toBeNull();
            expect(dataSets.message).toEqual("Non consistent " + axisType[0] + " type in dataPoints");
            axisType = ['label','y'];
            data1 = [{
                color: '#ff0000',
                dataPoints: [
                    { label: '2012-01-01', y: 450 },
                    { label: 1, y: 414 },
                    { label: '2012-01-03', y: 520 },
                ] 
            }];
            var dataSets = checkDataSetsValidity(data1,axisType);
            expect(dataSets.dataSets).toBeNull();
            expect(dataSets.message).toEqual("Non consistent " + axisType[0] + " type in dataPoints");
        });
        it('should return error when "label" is not of type string', () => {
            var axisType = ['label','y'];
            var data1: Array<any> = [{
                color: '#ff0000',
                dataPoints: [
                    { label: 1, y: 450 },
                    { label: 3, y: 414 },
                    { label: 5, y: 520 },
                ] 
            }];
            var dataSets = checkDataSetsValidity(data1,axisType);
            expect(dataSets.dataSets).toBeNull();
            expect(dataSets.message).toEqual("DataPoints label must be of type string");
        });
        it('should return error when DataSet DataPoints "label" not the same length', () => {
            var axisType = ['label','y'];
            var data1: Array<any> = [{
                color: '#ff0000',
                dataPoints: [
                    { label: '2012-01-01', y: 450 },
                    { label: '2012-01-02', y: 414 },
                    { label: '2012-01-03', y: 520 },
                ]
            }, {
                color: '#ffff00',
                dataPoints: [
                    { label: '2012-01-02', y: 414 },
                ]
            }];
            var dataSets = checkDataSetsValidity(data1,axisType);
            expect(dataSets.dataSets).toBeNull();
            expect(dataSets.message).toEqual("DataSet DataPoints having 'label' or 'x' of type string must be of same length");
        });
        it('should return error when DataSet DataPoints "x" of type string not the same length', () => {
            var axisType = ['x','y'];
            var data1: Array<any> = [{
                color: '#ff0000',
                dataPoints: [
                    { x: '2012-01-01', y: 450 },
                ]
            }, {
                color: '#ffff00',
                dataPoints: [
                    { x: '2012-01-01', y: 450 },
                    { x: '2012-01-02', y: 414 },
                    { x: '2012-01-03', y: 520 },
                ]
            }];
            var dataSets = checkDataSetsValidity(data1,axisType);
            expect(dataSets.dataSets).toBeNull();
            expect(dataSets.message).toEqual("DataSet DataPoints having 'label' or 'x' of type string must be of same length");
        });

    });
});
