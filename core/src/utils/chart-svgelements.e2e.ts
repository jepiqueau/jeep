import { newE2EPage, E2EPage } from '@stencil/core/testing';
import { Point, Rect } from '../global/interfaces/geom';

import { createText, createSVGElement, updateText, createLine, updateLine, createMarker,
    createRect, updateRect, createPolyline, updatePolyline, createAnimation, createLabel,
    measureText } from './chart-svgelements';

describe('svgelements', () => {
    let page: E2EPage;
    let innerWidth: number;
    let innerHeight: number;

    beforeEach(async () => {
        page = await newE2EPage();
        await page.setViewport({width: 800, height: 600, deviceScaleFactor: 1});
        innerWidth = await page.evaluate(_ => {return window.innerWidth})
        innerHeight = await page.evaluate(_ => {return window.innerHeight})
    });
    afterEach(() => {
        page = null;
    });    
    it('Should createSVGElement SVG', async () => {
        const svgEl: Element = createSVGElement("svg");
        expect(svgEl).not.toBeNull();
        expect(svgEl.tagName.toUpperCase()).toEqual('SVG');
    });
    it('Should createSVGElement Line & append it to SVG', async () => {
        const svgEl: Element = createSVGElement("svg");
        const lineEl: Element = createSVGElement('line',svgEl)
        expect(lineEl).not.toBeNull();
        expect(lineEl.tagName.toUpperCase()).toEqual('LINE');
        const lEl = svgEl.firstElementChild;
        expect(lEl).not.toBeNull();
        expect(lEl.tagName.toUpperCase()).toEqual('LINE');
    });
    it('createText', async () => {
        const pos:Point = {x:innerWidth /2, y:innerHeight/2};
        const opt:any = {
            id: "text",
            fontFamily: "Verdana",
            fontSize: "25px",
            fill: "#000000",
            anchor: "middle"
        };
        const svgEl: Element= createSVGElement("svg");
        const gEl: Element = createSVGElement("g",svgEl);
        const textEl: Element = createText(gEl,"Chart Title Test",pos,opt);
        expect(textEl).toBeDefined(); 
        expect(textEl.getAttribute('id')).toEqual("text"); 
        expect(textEl.getAttribute('font-family')).toEqual("Verdana"); 
        expect(textEl.getAttribute('font-size')).toEqual("25px"); 
        expect(textEl.getAttribute('fill')).toEqual("#000000"); 
        expect(textEl.getAttribute('text-anchor')).toEqual("middle"); 
        expect(textEl.getAttribute('x')).toEqual("400"); 
        expect(textEl.getAttribute('y')).toEqual("300"); 
    });
    it('updateText', async () => {
        const svgEl: Element = createSVGElement("svg");
        svgEl.setAttributeNS (null, "viewBox", "0 0 " + innerWidth.toString()+ " " + innerHeight.toString());
        svgEl.setAttributeNS (null, "width", innerWidth.toString());
        svgEl.setAttributeNS (null, "height", innerHeight.toString());
        const pos:Point = {x:innerWidth /2, y:innerHeight/2};
        const opt:any = {
            id: "text",
            fontFamily: "Verdana",
            fontSize: "25px",
            fill: "#000000",
            anchor: "middle"
        };
        let textEl: Element = createText(svgEl,"Chart Title Test",pos,opt);
        const pos1:Point = {x:25, y:innerHeight/2};
        textEl = updateText(svgEl,"text","start", pos1);
        expect(textEl).not.toBeNull(); 
        expect(textEl.getAttribute('text-anchor')).toEqual("start"); 
        expect(textEl.getAttribute('x')).toEqual("25"); 
        expect(textEl.getAttribute('y')).toEqual("300"); 
    });
    it('createLine', async () => {
        const pos:Point = {x:10, y:40};
        const pos1:Point = {x:50, y:100};
        const opt:any = {
            id: "line",
            stroke: "#ff0000",
            strokeWidth: "1"
        };
        const svgEl: Element = createSVGElement("svg");
        const lineEl: Element = createLine(svgEl,pos,pos1,opt);
        expect(lineEl).not.toBeNull(); 
        expect(lineEl.getAttribute('id')).toEqual("line"); 
        expect(lineEl.getAttribute('stroke-width')).toEqual("1"); 
        expect(lineEl.getAttribute('stroke')).toEqual("#ff0000"); 
        expect(lineEl.getAttribute('x1')).toEqual("10"); 
        expect(lineEl.getAttribute('y1')).toEqual("40"); 
        expect(lineEl.getAttribute('x2')).toEqual("50"); 
        expect(lineEl.getAttribute('y2')).toEqual("100"); 
    });
    it('updateLine', async () => {
        const svgEl: Element = createSVGElement("svg");
        svgEl.setAttributeNS (null, "viewBox", "0 0 " + innerWidth.toString()+ " " + innerHeight.toString());
        svgEl.setAttributeNS (null, "width", innerWidth.toString());
        svgEl.setAttributeNS (null, "height", innerHeight.toString());
        const pos:Point = {x:10, y:40};
        const pos1:Point = {x:50, y:100};
        const opt:any = {
            id: "line",
            stroke: "#ff0000",
            strokeWidth: "1"
        };
        let lineEl: Element = createLine(svgEl,pos,pos1,opt);
        const pos2:Point = {x:20, y:10};
        const pos3:Point = {x:80, y:150};
        lineEl = updateLine(svgEl,"line",pos2,pos3);
        expect(lineEl).toBeDefined(); 
        expect(lineEl.getAttribute('id')).toEqual("line"); 
        expect(lineEl.getAttribute('stroke-width')).toEqual("1"); 
        expect(lineEl.getAttribute('stroke')).toEqual("#ff0000"); 
        expect(lineEl.getAttribute('x1')).toEqual("20"); 
        expect(lineEl.getAttribute('y1')).toEqual("10"); 
        expect(lineEl.getAttribute('x2')).toEqual("80"); 
        expect(lineEl.getAttribute('y2')).toEqual("150"); 
    });
    it('createRect', async () => {
        const rec:Rect = {left:10, top:40, width:100, height:150};
        const opt:any = {
            id: "rectangle",
            stroke: "#ff0000",
            strokeWidth: "2",
            fill:"#0000ff",
        };
        const svgEl: Element = createSVGElement("svg");
        const rectEl: Element = createRect(svgEl,rec,opt);
        expect(rectEl).not.toBeNull(); 
        expect(rectEl.getAttribute('id')).toEqual("rectangle"); 
        expect(rectEl.getAttribute('fill')).toEqual("#0000ff"); 
        expect(rectEl.getAttribute('stroke')).toEqual("#ff0000"); 
        expect(rectEl.getAttribute('stroke-width')).toEqual("2"); 
        expect(rectEl.getAttribute('x')).toEqual("10"); 
        expect(rectEl.getAttribute('y')).toEqual("40"); 
        expect(rectEl.getAttribute('width')).toEqual("100"); 
        expect(rectEl.getAttribute('height')).toEqual("150"); 
    });
    it('updateRect', async () => {
        const svgEl: Element = createSVGElement("svg");
        svgEl.setAttributeNS (null, "viewBox", "0 0 " + innerWidth.toString()+ " " + innerHeight.toString());
        svgEl.setAttributeNS (null, "width", innerWidth.toString());
        svgEl.setAttributeNS (null, "height", innerHeight.toString());
        const rec:Rect = {left:10, top:40, width:100, height:150};
        const opt:any = {
            id: "rectangle",
            fill: "#00ff00",
        };
        let rectEl: Element = createRect(svgEl,rec,opt);
        const rec1:Rect = {left:30, top:20, width:140, height:90};
        rectEl = updateRect(svgEl,"rectangle",rec1);
        expect(rectEl).toBeDefined(); 
        expect(rectEl.getAttribute('id')).toEqual("rectangle"); 
        expect(rectEl.getAttribute('fill')).toEqual("#00ff00"); 
        expect(rectEl.getAttribute('x')).toEqual("30"); 
        expect(rectEl.getAttribute('y')).toEqual("20"); 
        expect(rectEl.getAttribute('width')).toEqual("140"); 
        expect(rectEl.getAttribute('height')).toEqual("90"); 
    });
    it('createPolyline', async () => {
        const points: string = "10,20 15,5 30,45";
        const opt:any = {
            id: "polyline",
            stroke: "#ff0000",
            strokeWidth: "2"
    };
        const svgEl: Element = createSVGElement("svg");
        const polyEl: Element = createPolyline(svgEl,points,opt);
        expect(polyEl).not.toBeNull(); 
        expect(polyEl.getAttribute('id')).toEqual("polyline"); 
        expect(polyEl.getAttribute('stroke')).toEqual("#ff0000"); 
        expect(polyEl.getAttribute('stroke-width')).toEqual("2"); 
        expect(polyEl.getAttribute('points')).toEqual("10,20 15,5 30,45"); 
    });
    it('updatePolyline', () => {
        const svgEl: Element = createSVGElement("svg");
        svgEl.setAttributeNS (null, "viewBox", "0 0 " + innerWidth.toString()+ " " + innerHeight.toString());
        svgEl.setAttributeNS (null, "width", innerWidth.toString());
        svgEl.setAttributeNS (null, "height", innerHeight.toString());
        const opt:any = {
            id: "polyline",
            stroke: "#ff0000",
            strokeWidth: "2"
        };
        let points: string = "10,20 15,5 30,45"
        let plineEl: Element = createPolyline(svgEl,points,opt);
        points = "15,25 10,15 20,35"
        plineEl = updatePolyline(svgEl,opt.id,points);
        expect(plineEl).toBeTruthy();
        expect(svgEl.childElementCount).toEqual(1);
        expect(plineEl.getAttribute('id')).toEqual('polyline');
        expect(plineEl.getAttribute('stroke')).toEqual('#ff0000');
        expect(plineEl.getAttribute('stroke-width')).toEqual('2');
        expect(plineEl.getAttribute('points')).toEqual("15,25 10,15 20,35");
    });    
    it('createMarker circle', () => {
        const svgEl: Element = createSVGElement("svg");
        const defs: Element = createSVGElement('defs',svgEl);
        const opt:any = {};
        opt.id = "marker-circle";
        opt.viewbox = "0 0 10 10";
        // markerType Circle size 10x10
        const d:string = "M0,5 A5,5 0 1,1 10,5 A5,5 0 0,1 0,5 Z";
        createMarker(defs,d,opt);
        const marker: Element = svgEl.querySelector("#"+opt.id);
        expect(marker.nodeName.toUpperCase()).toEqual('G');
        expect(marker.hasAttribute('viewbox')).toBeTruthy;
        expect(marker.childElementCount).toEqual(1);
        expect(marker.children[0].nodeName.toUpperCase()).toEqual('PATH');
        expect(marker.children[0].hasAttribute('d')).toBeTruthy;
        expect(marker.children[0].getAttribute('d')).toEqual("M0,5 A5,5 0 1,1 10,5 A5,5 0 0,1 0,5 Z");
    });  
    it('createAnimation', async () => {
        const rec:Rect = {left:10, top:40, width:100, height:150};
        const opt:any = {
            id: "rectangle",
            stroke: "#ff0000",
            strokeWidth: "2",
            fill:"#0000ff",
        };
        const svgEl: Element = createSVGElement("svg");
        const rectEl: Element = createRect(svgEl,rec,opt);
        const animOpt:any = {};
        animOpt.attributeName="height";
        animOpt.from="0";
        animOpt.to="150";
        animOpt.dur="0.5s";
        animOpt.fill="freeze";
        const animEl:Element = createAnimation(rectEl,animOpt);
        expect(animEl).not.toBeNull(); 
        expect(animEl.getAttribute('attributeName')).toEqual("height"); 
        expect(animEl.getAttribute('from')).toEqual("0"); 
        expect(animEl.getAttribute('to')).toEqual("150"); 
        expect(animEl.getAttribute('dur')).toEqual("0.5s"); 
        expect(animEl.getAttribute('fill')).toEqual("freeze"); 

    });
    it('measureText', async () => {
        const svgEl:Element = createSVGElement("svg");
        svgEl.setAttributeNS (null, "viewBox", "0 0 " + innerWidth.toString()+ " " + innerHeight.toString());
        svgEl.setAttributeNS (null, "width", innerWidth.toString());
        svgEl.setAttributeNS (null, "height", innerHeight.toString());

        const opt:any = {
            fontFamily: "Verdana",
            fontSize: '12px',
            fill: "#000000",
            anchor: "middle"
        };
        const getBoundingClientRect = jest.fn().mockImplementation((el: Element,delay:number) => {
            return Promise.resolve({left:0,top:0,right:100,bottom:20,width:100,height:20})});
        const textBB:ClientRect = await measureText(svgEl,'Apple',opt,getBoundingClientRect);
        expect(textBB).toEqual({left:0,top:0,right:100,bottom:20,width:100,height:20});
    });
    it('createLabel', async () => {
        const svgEl:Element = createSVGElement("svg");
        svgEl.setAttributeNS (null, "viewBox", "0 0 " + innerWidth.toString()+ " " + innerHeight.toString());
        svgEl.setAttributeNS (null, "width", innerWidth.toString());
        svgEl.setAttributeNS (null, "height", innerHeight.toString());

        const opt:any = {
            fontFamily: "Verdana",
            fontSize: '12px',
            fill: "#000000",
            anchor: "middle"
        };
        const lbPos:Rect = {top: 50, left: 100, height: 30, width: 100};
        createLabel(svgEl,"linechart-label-value","Mango : 30",lbPos,"#0000ff",opt);
        const gEl: Element = svgEl.querySelector("#linechart-label-value");
        expect(gEl).not.toBeNull();
        const rectEl: Element = gEl.querySelector("rect");
        expect(rectEl).not.toBeNull();
        expect(rectEl.getAttribute('x')).toEqual("100");
        expect(rectEl.getAttribute('y')).toEqual("50");
        expect(rectEl.getAttribute('width')).toEqual("100");
        expect(rectEl.getAttribute('height')).toEqual("30");
        const textEl: Element = gEl.querySelector("text");
        expect(textEl).not.toBeNull();
        expect(textEl.textContent).toEqual("Mango : 30");
        expect(textEl.getAttribute('x')).toEqual("150");
        expect(textEl.getAttribute('y')).toEqual("72.5");
    });
    
});

