import { newSpecPage} from '@stencil/core/testing';
import { JeepSvgmorph } from './jeep-svgmorph';
import { StateProperties } from '../../global/interfaces/jeep-svgmorph';
import { CubicBezier}  from '../../global/interfaces/svggeom';

const path1: string = "M100,100 H400 V400 H 100 V 100";
const path2: string = "M 250,100 L 300,200 400,250 300,300 250,400 200,300 100,250 200,200 250,100"; 
const path3: string = "M 171.29942,60 H 328.70057 L 440,171.29942 V 328.70057 L 328.70057,440 H 171.29942 \
L 60,328.70057 V 171.29942 L 171.29942,60"; 
const alPath1: string = "M 100,100 C 150,100 200,100 250,100 C 300,100 350,100 400,100 \
C 400,150 400,200 400,250 C 400,300 400,350 400,400 C 350,400 300,400 250,400 \
C 200,400 150,400 100,400 C 100,350 100,300 100,250 C 100,200 100,150 100,100";
const alPath2: string = "M 250,100 C 266.67,133.33 283.33,166.67 300,200 C 333.33,216.67 366.67,233.33 400,250 \
C 366.67,266.67 333.33,283.33 300,300 C 283.33,333.33 266.67,366.67 250,400 C 233.33,366.67 216.67,333.33 200,300 \
C 166.67,283.33 133.33,266.67 100,250 C 133.33,233.33 166.67,216.67 200,200 C 216.67,166.67 233.33,133.33 250,100";
const alPath3: string = "M 171.30,60.00 C 223.77,60.00 276.23,60.00 328.70,60.00 \
C 365.80,97.10 402.90,134.20 440.00,171.30 C 440.00,223.77 440.00,276.23 440.00,328.70 \
C 402.90,365.80 365.80,402.90 328.70,440.00 C 276.23,440.00 223.77,440.00 171.30,440.00 \
C 134.20,402.90 97.10,365.80 60.00,328.70 C 60.00,276.23 60.00,223.77 60.00,171.30 \
C 97.10,134.20 134.20,97.10 171.30,60.00";
const nPath1: string = "M 100,100 C 125,100 150,100 175,100 C 200,100 225,100 250,100 \
C 275,100 300,100 325,100 C 350,100 375,100 400,100 C 400,125 400,150 400,175 \
C 400,200 400,225 400,250 C 400,275 400,300 400,325 C 400,350 400,375 400,400 \
C 375,400 350,400 325,400 C 300,400 275,400 250,400 C 225,400 200,400 175,400 \
C 150,400 125,400 100,400 C 100,375 100,350 100,325 C 100,300 100,275 100,250 \
C 100,225 100,200 100,175 C 100,150 100,125 100,100";
const nPath2: string = "M 250,100 C 258.34,116.67 266.67,133.33 275,150 C 283.33,166.67 291.66,183.33 300,200 \
C 316.66,208.33 333.33,216.67 350,225 C 366.67,233.33 383.34,241.67 400,250 \
C 383.34,258.34 366.67,266.67 350,275 C 333.33,283.33 316.66,291.66 300,300 \
C 291.66,316.66 283.33,333.33 275,350 C 266.67,366.67 258.34,383.34 250,400 \
C 241.67,383.34 233.33,366.67 225,350 C 216.67,333.33 208.33,316.66 200,300 \
C 183.33,291.66 166.67,283.33 150,275 C 133.33,266.67 116.67,258.34 100,250 \
C 116.67,241.67 133.33,233.33 150,225 C 166.67,216.67 183.33,208.33 200,200 \
C 208.33,183.33 216.67,166.67 225,150 C 233.33,133.33 241.67,116.67 250,100";

const pathTag0:string = '<path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287"></path>'; 
const pathTag1c:string = '<path d="M 250,100 L 270,230 400,250 270,270 250,400 230,270 100,250 230,230 250,100" fill="#f8ef07"></path>';
const pathTag1:string = '<path d="M 250,100 L 270,230 400,250 270,270 250,400 230,270 100,250 230,230 250,100" fill="#1eb287"></path>';
const pathTag2:string = '<path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287"></path>'; 
const pathAll:string = pathTag0 + pathTag1 + pathTag2;
const pathNotAll:string = pathTag0 + pathTag1c + pathTag2;
let svgData: string ='<svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">';
svgData += pathAll; 
svgData += '</svg>';
let svgDataNotAll: string ='<svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">';
svgDataNotAll += pathNotAll; 
svgDataNotAll += '</svg>';
const aligncBz0:string = "M 250,100 C 275,100 300,100 325,100 C 350,100 375,\
100 400,100 C 400,125 400,150 400,175 C 400,200 400,225 400,250 C 400,275 400,300 400,\
325 C 400,350 400,375 400,400 C 375,400 350,400 325,400 C 300,400 275,400 250,400 C 225,\
400 200,400 175,400 C 150,400 125,400 100,400 C 100,375 100,350 100,325 C 100,300 100,\
275 100,250 C 100,225 100,200 100,175 C 100,150 100,125 100,100 C 125,100 150,100 175,100 C 200,100 225,100 250,100";
const aligncLength0:Array<number>= [75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75];
const oriCBz0:string = "M 100,100 C 200,100 300,100 400,100 C 400,200 400,300 400,400 C 300,400 200,\
400 100,400 C 100,300 100,200 100,100";
const aligncBz1:string = "M 250,100 C 253.34,121.67 256.67,143.33 260,165 C 263.33,186.67 266.66,\
208.33 270,230 C 291.66,233.33 313.33,236.67 335,240 C 356.67,243.33 378.34,246.67 400,250 C 378.34,\
253.34 356.67,256.67 335,260 C 313.33,263.33 291.66,266.66 270,270 C 266.66,291.66 263.33,313.33 260,\
335 C 256.67,356.67 253.34,378.34 250,400 C 246.67,378.34 243.33,356.67 240,335 C 236.67,313.33 233.33,\
291.66 230,270 C 208.33,266.66 186.67,263.33 165,260 C 143.33,256.67 121.67,253.34 100,250 C 121.67,246.67 143.33,\
243.33 165,240 C 186.67,236.67 208.33,233.33 230,230 C 233.33,208.33 236.67,186.67 240,165 C 243.33,143.33 246.67,121.67 250,100";
const aligncLength1:Array<number> = [65.76473225163218, 65.76473225163218, 65.76473225163218, 65.76473225163218, 65.76473225163218, 65.76473225163218, 65.76473225163218, 65.76473225163218, 65.76473225163218, 65.76473225163218, 65.76473225163218, 65.76473225163218, 65.76473225163218, 65.76473225163218, 65.76473225163218, 65.76473225163218];
const oriCBz1:string = "M 250,100 C 256.67,143.33 263.33,186.67 270,230 C 313.33,236.67 356.67,243.33 400,250 C 356.67,\
256.67 313.33,263.33 270,270 C 263.33,313.33 256.67,356.67 250,400 C 243.33,356.67 236.67,313.33 230,270 C 186.67,263.33 143.33,\
256.67 100,250 C 143.33,243.33 186.67,236.67 230,230 C 236.67,186.67 243.33,143.33 250,100";



describe('jeep-svgmorph', () => {

    let page: any;
    let root: any;
    let rootInstance: any;
    let doc: Document;
    beforeEach(async () => {
      page = await newSpecPage({
        components: [JeepSvgmorph],
        html: '<jeep-svgmorph></jeep-svgmorph>'
      });
      root = page.root;
      rootInstance = page.rootInstance; 
      doc = page.doc;
    });
    afterEach (async () => {
      page = null;
      root = null;
      rootInstance = null;
      doc = null;
    });

    it('should render "fake-container" when no properties defined and no svg given', async () => {
      expect(root).toEqualHtml(`<jeep-svgmorph calcmode="linear" duration="2000ms">
        <mock:shadow-root>
          <div id="fake-container">
          </div>
        </mock:shadow-root>
      </jeep-jeep-svgmorph>`);
      expect(root.getAttribute('duration')).toEqual("2000ms");
      expect(root.getAttribute('repeatcount')).toBeNull();
      expect(root.getAttribute('pathindex')).toBeNull();
      expect(root.getAttribute('nsegment')).toBeNull();
      expect(root.getAttribute('keytimes')).toBeNull();
      expect(root.getAttribute('calcmode')).toEqual("linear");
      expect(root.getAttribute('keysplines')).toBeNull();
      expect(root.getAttribute('fill')).toBeNull();
    });
    it('should have a duration property defined', async () => {
      root.duration = "4000ms";
      const states: StateProperties = await root.getStateProperties();
      expect(states.duration).toEqual("4000ms");
    });
    it('should have a repeatcount property defined', async () => {
      root.repeatcount = "2";
      const states: StateProperties = await root.getStateProperties();
      expect(states.repeatCount).toEqual("2"); 
    });
    it('should have a pathindex property defined', async () => {
      root.pathindex = "2;0;2";
      const states: StateProperties = await root.getStateProperties();
      expect(states.pathIndex.length).toEqual(3);
      expect(states.pathIndex[0]).toEqual(2);
      expect(states.pathIndex[1]).toEqual(0);
      expect(states.pathIndex[2]).toEqual(2); 
    });
    it('should have a nsegment property defined', async () => {
      root.nsegment = "16";
      const states: StateProperties = await root.getStateProperties();
      expect(states.nSegment).toEqual(16);
    });
    it('should not have a keytimes property defined', async () => {
      root.keytimes = "0;.5;1";
      const states: StateProperties = await root.getStateProperties();
      expect(states.keyTimes).toEqual("0;.5;1");
    });
    it('should have a calcmode property defined', async () => {
      root.calcmode = "spline";
      const states: StateProperties = await root.getStateProperties();
      expect(states.calcMode).toEqual("spline");
    });
    it('should not have a keysplines property defined', async () => {
      root.keysplines = "0.645,0.045,0.355,1;0.645,0.045,0.355,1";
      const states: StateProperties = await root.getStateProperties();
      expect(states.keySplines).toEqual("0.645,0.045,0.355,1;0.645,0.045,0.355,1");
    });
    it('should not have a fill property defined', async () => {
      root.fill = "#000000";
      const states: StateProperties = await root.getStateProperties();
      expect(states.fill).toEqual("#000000"); 
    });
    it('should call init on componentWillLoad', async () => {
      const spyInit: jest.SpyInstance<any> = jest.spyOn(rootInstance,'init');
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      expect(spyInit).toHaveBeenCalledTimes(1);
    });
    it('should call getPath on componentWillLoad', async () => {
      const spyGetPath: jest.SpyInstance<any> = jest.spyOn(rootInstance,'getPath');
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      expect(spyGetPath).toHaveBeenCalledTimes(1);
      expect(rootInstance._svgOptions).toBeUndefined();
      expect(rootInstance._pathList).toBeUndefined();
      expect(rootInstance._fillColor).toBeUndefined();
    });
    it('should get _svgOptions, _pathList and _fillColor defined on getPath when svg defined', async () => {
      const svg = doc.createElementNS("http://www.w3.org/2000/svg",'svg');     
      rootInstance.el.appendChild(svg);
      const spyInit: jest.SpyInstance<any> = jest.spyOn(rootInstance,'init');
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      expect(spyInit).toHaveBeenCalledTimes(1);
      expect(rootInstance._svgOptions).toBeDefined();
      expect(rootInstance._pathList).toBeDefined();
      expect(rootInstance._fillColor).toBeDefined();
      expect(rootInstance._svgOptions.width).toBeFalsy();
      expect(rootInstance._svgOptions.height).toBeFalsy();
      expect(rootInstance._svgOptions.viewBox).toBeFalsy();
      expect(rootInstance._svgOptions.xmlns).toBeFalsy();
      expect(rootInstance._pathList.length).toEqual(0);
      expect(rootInstance._fillColor.length).toEqual(0);
    });
    it('should get _svgOptions filled on componentWillLoad when svg defined', async () => {
      const svg: SVGSVGElement = doc.createElementNS("http://www.w3.org/2000/svg",'svg');     
      svg.setAttributeNS(null,'width',"500");
      svg.setAttributeNS(null,'height',"500");
      svg.setAttributeNS(null,'viewBox',"0 0 500 500");
      svg.setAttributeNS(null,'xmlns',"http://www.w3.org/2000/svg");
      rootInstance.el.appendChild(svg);
      const spyInit: jest.SpyInstance<any> = jest.spyOn(rootInstance,'init');
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      expect(spyInit).toHaveBeenCalledTimes(1);
      expect(rootInstance._svgOptions.width).toEqual("500");
      expect(rootInstance._svgOptions.height).toEqual("500");
      expect(rootInstance._svgOptions.viewBox).toEqual("0 0 500 500");
      expect(rootInstance._svgOptions.xmlns).toEqual("http://www.w3.org/2000/svg");
    });
    it('should get _pathList filled on componentWillLoad when svg defined', async () => {
      rootInstance.el.innerHTML = svgDataNotAll;
      const spyInit: jest.SpyInstance<any> = jest.spyOn(rootInstance,'init');
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      expect(spyInit).toHaveBeenCalledTimes(1);
      const pathList: Array<string> = await root.getPathList();
      expect(pathList.length).toEqual(3);
      expect(pathList[0]).toEqual("M100,100 H400 V400 H 100 V 100");
      expect(pathList[1]).toEqual("M 250,100 L 270,230 400,250 270,270 250,400 230,270 100,250 230,230 250,100");
      expect(pathList[2]).toEqual("M100,100 H400 V400 H 100 V 100");
    });
    it('should get _fillColor filled on componentWillLoad when svg defined', async () => {
      rootInstance.el.innerHTML = svgDataNotAll;
      const spyInit: jest.SpyInstance<any> = jest.spyOn(rootInstance,'init');
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      expect(spyInit).toHaveBeenCalledTimes(1);
      const fillColor: Array<string> = await root.getFillColor();
      expect(fillColor.length).toEqual(3);
      expect(fillColor[0]).toEqual("#1eb287");
      expect(fillColor[1]).toEqual("#f8ef07");
      expect(fillColor[2]).toEqual("#1eb287");
    });
    it('should get isSVG to be false', async () => {
      rootInstance.el.innerHTML = svgDataNotAll;
      root.keysplines = "0.645,0.045,0.355,1;0.645,0.045,0.355,1";
      root.calcmode = "spline";
      root.keytimes = "0;1";
      root.nsegment = "16";
      root.pathindex = "2;0;2";
      root.repeatcount = "2";
      root.duration = "4000ms";
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      expect(rootInstance.isSVG).toBeFalsy();
    });
    it('should get isSVG to be true', async () => {
      rootInstance.el.innerHTML = svgDataNotAll;
      root.keysplines = "0.645,0.045,0.355,1;0.645,0.045,0.355,1";
      root.calcmode = "spline";
      root.keytimes = "0;.5;1";
      root.nsegment = "16";
      root.pathindex = "2;0;2";
      root.repeatcount = "2";
      root.duration = "4000ms";
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      expect(rootInstance.isSVG).toBeTruthy();
    });
    it('should align paths to same number of segments when svg defined', async () => {
      rootInstance.el.innerHTML = svgData;
      root.keysplines = "0.645,0.045,0.355,1;0.645,0.045,0.355,1";
      root.calcmode = "spline";
      root.keytimes = "0;.5;1";
      root.nsegment = "16";
      root.pathindex = "2;0;2";
      root.repeatcount = "2";
      root.duration = "4000ms";
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      const alignedPath: Array<CubicBezier> = await root.getAlignedPaths(true);
      expect(alignedPath.length).toEqual(3);
      expect(alignedPath[0].cBz).toEqual(aligncBz0);
      expect(alignedPath[0].cLength).toEqual(aligncLength0);
      expect(alignedPath[0].index).toEqual(11);
      expect(alignedPath[0].oriCBz).toEqual(oriCBz0);
      expect(alignedPath[0].startIndex).toEqual(2)
      expect(alignedPath[0].tLength).toEqual(1200);
      expect(alignedPath[1].cBz).toEqual(aligncBz1);
      expect(alignedPath[1].cLength).toEqual(aligncLength1);
      expect(alignedPath[1].index).toEqual(20);
      expect(alignedPath[1].oriCBz).toEqual(oriCBz1);
      expect(alignedPath[1].startIndex).toEqual(0)
      expect(alignedPath[1].tLength).toEqual(1052.2357150372725);
      expect(alignedPath[2].cBz).toEqual(aligncBz0);
      expect(alignedPath[2].cLength).toEqual(aligncLength0);
      expect(alignedPath[2].index).toEqual(11);
      expect(alignedPath[2].oriCBz).toEqual(oriCBz0);
      expect(alignedPath[2].startIndex).toEqual(2)
      expect(alignedPath[2].tLength).toEqual(1200);
    });
    it('should not render the first path when no svg path given', async () => {
      const div = doc.createElement('div');
      div.setAttribute('id',"morph-container");
      const svg = doc.createElementNS("http://www.w3.org/2000/svg",'svg');     
      svg.setAttribute('id',"morph-svg");
      div.appendChild(svg);
      rootInstance.el.appendChild(div);
      root.keysplines = "0.645,0.045,0.355,1;0.645,0.045,0.355,1";
      root.calcmode = "spline";
      root.keytimes = "0;.5;1";
      root.nsegment = "16";
      root.pathindex = "2;0;2";
      root.repeatcount = "2";
      root.duration = "4000ms";
      rootInstance._element = rootInstance.el;
      rootInstance._svgOptions = {};
      rootInstance._svgOptions.width = "500";
      rootInstance._svgOptions.height = "500";
      rootInstance._svgOptions.viewBox = "0 0 500 500";
      rootInstance._svgOptions.xmlns = "http://www.w3.org/2000/svg";
      const spySetSVGAttributes: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_setSVGAttributes');
      const spyDrawFirstPath: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_drawFirstPath');
      const spyAlignPaths: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_alignPaths');
      const spySetAnimation: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_setAnimation');
      await rootInstance._renderSVGFirstPath();
      expect(spySetSVGAttributes).toHaveBeenCalledTimes(1);
      expect(spyDrawFirstPath).toHaveBeenCalledTimes(0);
      expect(spyAlignPaths).toHaveBeenCalledTimes(0);
      expect(spySetAnimation).toHaveBeenCalledTimes(0);
    });
    it('should render the first path when svg defined and all data paths got the same color', async () => {
      rootInstance.el.innerHTML = svgData;
      root.keysplines = "0.645,0.045,0.355,1;0.645,0.045,0.355,1";
      root.calcmode = "spline";
      root.keytimes = "0;.5;1";
      root.nsegment = "16";
      root.pathindex = "2;0;2";
      root.repeatcount = "2";
      root.duration = "4000ms";
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      const div = doc.createElement('div');
      div.setAttribute('id',"morph-container");
      const svg = doc.createElementNS("http://www.w3.org/2000/svg",'svg');     
      svg.setAttribute('id',"morph-svg");
      const path = doc.createElementNS("http://www.w3.org/2000/svg",'path');     
      path.setAttribute('id',"initPath");
      const animPath = doc.createElementNS("http://www.w3.org/2000/svg",'anim');     
      animPath.setAttribute('id',"animPath");
      path.appendChild(animPath);
      svg.appendChild(path);
      div.appendChild(svg);
      rootInstance.el.appendChild(div);
      rootInstance._element = rootInstance.el;
      const spySetSVGAttributes: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_setSVGAttributes');
      const spyDrawFirstPath: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_drawFirstPath');
      const spyAlignPaths: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_alignPaths');
      const spySetAnimation: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_setAnimation');
      await rootInstance._renderSVGFirstPath();
      expect(spySetSVGAttributes).toHaveBeenCalledTimes(1);
      expect(spyDrawFirstPath).toHaveBeenCalledTimes(1);
      expect(spyAlignPaths).toHaveBeenCalledTimes(1);
      expect(spySetAnimation).toHaveBeenCalledTimes(1);
    });
    it('should render the first path when svg defined and all data paths do not have the same color', async () => {
      rootInstance.el.innerHTML = svgDataNotAll;
      root.keysplines = "0.645,0.045,0.355,1;0.645,0.045,0.355,1";
      root.calcmode = "spline";
      root.keytimes = "0;.5;1";
      root.nsegment = "16";
      root.pathindex = "2;0;2";
      root.repeatcount = "2";
      root.duration = "4000ms";
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      const div = doc.createElement('div');
      div.setAttribute('id',"morph-container");
      const svg = doc.createElementNS("http://www.w3.org/2000/svg",'svg');     
      svg.setAttribute('id',"morph-svg");
      const path = doc.createElementNS("http://www.w3.org/2000/svg",'path');     
      path.setAttribute('id',"initPath");
      const animPath = doc.createElementNS("http://www.w3.org/2000/svg",'anim');     
      animPath.setAttribute('id',"animPath");
      path.appendChild(animPath);
      const animFill = doc.createElementNS("http://www.w3.org/2000/svg",'anim');     
      animFill.setAttribute('id',"animFill");
      path.appendChild(animFill);
      svg.appendChild(path);
      div.appendChild(svg);
      rootInstance.el.appendChild(div);
      rootInstance._element = rootInstance.el;
      const spySetSVGAttributes: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_setSVGAttributes');
      const spyDrawFirstPath: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_drawFirstPath');
      const spyAlignPaths: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_alignPaths');
      const spySetAnimation: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_setAnimation');
      await rootInstance._renderSVGFirstPath();
      expect(spySetSVGAttributes).toHaveBeenCalledTimes(1);
      expect(spyDrawFirstPath).toHaveBeenCalledTimes(1);
      expect(spyAlignPaths).toHaveBeenCalledTimes(1);
      expect(spySetAnimation).toHaveBeenCalledTimes(1);
    });
    it('should render the first path when svg defined and property fill', async () => {
      rootInstance.el.innerHTML = svgDataNotAll;
      root.keysplines = "0.645,0.045,0.355,1;0.645,0.045,0.355,1";
      root.calcmode = "spline";
      root.keytimes = "0;.5;1";
      root.nsegment = "16";
      root.pathindex = "2;0;2";
      root.repeatcount = "2";
      root.duration = "4000ms";
      root.fill = "#ff0000";
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      const div = doc.createElement('div');
      div.setAttribute('id',"morph-container");
      const svg = doc.createElementNS("http://www.w3.org/2000/svg",'svg');     
      svg.setAttribute('id',"morph-svg");
      const path = doc.createElementNS("http://www.w3.org/2000/svg",'path');     
      path.setAttribute('id',"initPath");
      const animPath = doc.createElementNS("http://www.w3.org/2000/svg",'anim');     
      animPath.setAttribute('id',"animPath");
      path.appendChild(animPath);
      svg.appendChild(path);
      div.appendChild(svg);
      rootInstance.el.appendChild(div);
      rootInstance._element = rootInstance.el;
      const spySetSVGAttributes: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_setSVGAttributes');
      const spyDrawFirstPath: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_drawFirstPath');
      const spyAlignPaths: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_alignPaths');
      const spySetAnimation: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_setAnimation');
      await rootInstance._renderSVGFirstPath();
      expect(spySetSVGAttributes).toHaveBeenCalledTimes(1);
      expect(spyDrawFirstPath).toHaveBeenCalledTimes(1);
      expect(spyAlignPaths).toHaveBeenCalledTimes(1);
      expect(spySetAnimation).toHaveBeenCalledTimes(1);
    });

    it('should return "fake-container" without svg element', async () => {
      const divEl = rootInstance.el.shadowRoot.querySelector('div');
      expect(divEl.getAttribute('id')).toEqual('fake-container');
    });
    it('should return "morph-container" with svg element', async () => {
      rootInstance.el.innerHTML = svgDataNotAll;
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      await rootInstance.componentDidLoad();
      await page.waitForChanges();
      // bug in stencil with animate calcMode and calcmode
      /*
      expect(root).toEqualHtml(`<jeep-svgmorph calcmode="linear" duration="2000ms">
        <mock:shadow-root>
          <div id="morph-container">
            <div id="morph-svg-container">
              <svg height="500" id="morph-svg" viewBox="0 0 500 500" width="500" xmlns="http://www.w3.org/2000/svg">
                <path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287" id="initPath">                
                  <animate attributeName="d" begin="initPath.click" calcMode="linear" dur="2000ms" id="animPath" values="M 100,100 C 150,100 200,100 250,100 C 300,100 350,100 400,100 C 400,150 400,200 400,250 C 400,300 400,350 400,400 C 350,400 300,400 250,400 C 200,400 150,400 100,400 C 100,350 100,300 100,250 C 100,200 100,150 100,100;M 250,100 C 256.67,143.33 263.33,186.67 270,230 C 313.33,236.67 356.67,243.33 400,250 C 356.67,256.67 313.33,263.33 270,270 C 263.33,313.33 256.67,356.67 250,400 C 243.33,356.67 236.67,313.33 230,270 C 186.67,263.33 143.33,256.67 100,250 C 143.33,243.33 186.67,236.67 230,230 C 236.67,186.67 243.33,143.33 250,100;M 100,100 C 150,100 200,100 250,100 C 300,100 350,100 400,100 C 400,150 400,200 400,250 C 400,300 400,350 400,400 C 350,400 300,400 250,400 C 200,400 150,400 100,400 C 100,350 100,300 100,250 C 100,200 100,150 100,100;" xlink:href="#initPath"></animate>
                  <animate attributeName="fill" begin="animPath.begin" dur="2000ms" id="animFill" values="#1eb287;#f8ef07;#1eb287;" xlink:href="#initPath"></animate>
                </path>
              </svg>
            </div>
          </div>
        </mock:shadow-root>
      </jeep-jeep-svgmorph>`);
      */
      const divEl = rootInstance.el.shadowRoot.querySelector('div');
      expect(divEl.getAttribute('id')).toEqual('morph-container');
      const svgEl = divEl.querySelector('svg');
      expect(svgEl).toBeDefined();
      expect(svgEl.getAttribute('width')).toEqual('500');
      expect(svgEl.getAttribute('height')).toEqual('500');
      expect(svgEl.getAttribute('viewBox')).toEqual("0 0 500 500");
      expect(svgEl.getAttribute('xmlns')).toEqual("http://www.w3.org/2000/svg");
    });
    it('should return the pathList and fillColor arrays ', async () => {
      let svg = doc.createElementNS("http://www.w3.org/2000/svg",'svg');
      svg.setAttribute('width',"500");
      svg.setAttribute('height',"500");
      svg.setAttribute('viewBox',"0 0 500 500");
      svg.setAttribute('xmlns',"http://www.w3.org/2000/svg");
      let path1El = doc.createElementNS("http://www.w3.org/2000/svg",'path');
      path1El.setAttribute('d',path1);
      path1El.setAttribute('fill',"#1eb287");
      svg.appendChild(path1El);
      let path2El = doc.createElementNS("http://www.w3.org/2000/svg",'path');
      path2El.setAttribute('d',path2);
      svg.appendChild(path2El);
      let path3El = doc.createElementNS("http://www.w3.org/2000/svg",'path');
      path3El.setAttribute('d',path3);
      svg.appendChild(path3El);
      rootInstance.el.appendChild(svg);
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      const pathList: Array<string> = await root.getPathList();
      const fillColor: Array<string> = await root.getFillColor();
      expect(pathList.length).toEqual(3);
      expect(fillColor.length).toEqual(1);
      expect(pathList[0]).toEqual(path1);
      expect(pathList[1]).toEqual(path2);
      expect(pathList[2]).toEqual(path3);
    });
    it('should display the first given path ', async () => {
      let svg = doc.createElementNS("http://www.w3.org/2000/svg",'svg');
      svg.setAttribute('width',"500");
      svg.setAttribute('height',"500");
      svg.setAttribute('viewBox',"0 0 500 500");
      svg.setAttribute('xmlns',"http://www.w3.org/2000/svg");
      let path1El = doc.createElementNS("http://www.w3.org/2000/svg",'path');
      path1El.setAttribute('d',path1);
      path1El.setAttribute('fill',"#1eb287");
      svg.appendChild(path1El);
      let path2El = doc.createElementNS("http://www.w3.org/2000/svg",'path');
      path2El.setAttribute('d',path2);
      svg.appendChild(path2El);
      let path3El = doc.createElementNS("http://www.w3.org/2000/svg",'path');
      path3El.setAttribute('d',path3);
      svg.appendChild(path3El);
      rootInstance.el.appendChild(svg);
      const spyDrawFirstPath: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_drawFirstPath');
      const spyRenderSVGFirstPath: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_renderSVGFirstPath');
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      await rootInstance.componentDidLoad();
      await page.waitForChanges();
      expect(spyRenderSVGFirstPath).toHaveBeenCalledTimes(1);
      expect(spyDrawFirstPath).toHaveBeenCalledTimes(1);
      // bug in stencil with animate calcMode and calcmode
      /*
      expect(root).toEqualHtml(`<jeep-svgmorph calcmode="linear" duration="2000ms">
        <mock:shadow-root>
          <div id="morph-container">
            <div id="morph-svg-container">
              <svg height="500" id="morph-svg" viewBox="0 0 500 500" width="500" xmlns="http://www.w3.org/2000/svg">
                <path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287" id="initPath">
                  <animate attributeName="d" begin="initPath.click" calcMode="linear" dur="2000ms" id="animPath" values="M 100,100 C 150,100 200,100 250,100 C 300,100 350,100 400,100 C 400,150 400,200 400,250 C 400,300 400,350 400,400 C 350,400 300,400 250,400 C 200,400 150,400 100,400 C 100,350 100,300 100,250 C 100,200 100,150 100,100;M 250,100 C 266.67,133.33 283.33,166.67 300,200 C 333.33,216.67 366.67,233.33 400,250 C 366.67,266.67 333.33,283.33 300,300 C 283.33,333.33 266.67,366.67 250,400 C 233.33,366.67 216.67,333.33 200,300 C 166.67,283.33 133.33,266.67 100,250 C 133.33,233.33 166.67,216.67 200,200 C 216.67,166.67 233.33,133.33 250,100;M 171.30,60.00 C 223.77,60.00 276.23,60.00 328.70,60.00 C 365.80,97.10 402.90,134.20 440.00,171.30 C 440.00,223.77 440.00,276.23 440.00,328.70 C 402.90,365.80 365.80,402.90 328.70,440.00 C 276.23,440.00 223.77,440.00 171.30,440.00 C 134.20,402.90 97.10,365.80 60.00,328.70 C 60.00,276.23 60.00,223.77 60.00,171.30 C 97.10,134.20 134.20,97.10 171.30,60.00;" xlink:href="#initPath"></animate>
                </path>
              </svg>
            </div>
          </div>
        </mock:shadow-root>
      </jeep-jeep-svgmorph>`);
      */
      const divEl = rootInstance.el.shadowRoot.querySelector('#morph-container');
      const svgEl = divEl.querySelector('#morph-svg');
      expect(svgEl.childElementCount).toEqual(1);
      expect(svgEl.children[0].getAttribute('d')).toEqual(path1);
      expect(svgEl.children[0].getAttribute('fill')).toEqual("#1eb287");
    });
    it('should align the three given paths with no nSegment defined', async () => {
      const spyAlignPaths: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_alignPaths');
      const spySetAnimation: jest.SpyInstance<any> = jest.spyOn(rootInstance,'_setAnimation');
      let svg = doc.createElementNS("http://www.w3.org/2000/svg",'svg');
      svg.setAttribute('width',"500");
      svg.setAttribute('height',"500");
      svg.setAttribute('viewBox',"0 0 500 500");
      svg.setAttribute('xmlns',"http://www.w3.org/2000/svg");
      let path1El = doc.createElementNS("http://www.w3.org/2000/svg",'path');
      path1El.setAttribute('d',path1);
      path1El.setAttribute('fill',"#1eb287");
      svg.appendChild(path1El);
      let path2El = doc.createElementNS("http://www.w3.org/2000/svg",'path');
      path2El.setAttribute('d',path2);
      svg.appendChild(path2El);
      let path3El = doc.createElementNS("http://www.w3.org/2000/svg",'path');
      path3El.setAttribute('d',path3);
      svg.appendChild(path3El);
      rootInstance.el.appendChild(svg);
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      await root.renderSVGFirstPath();
      await page.waitForChanges();
      expect(spyAlignPaths).toHaveBeenCalledTimes(1);
      expect(spySetAnimation).toHaveBeenCalledTimes(1);
      // bug in stencil with animate calcMode and calcmode
      /*
      expect(root).toEqualHtml(`<jeep-svgmorph calcmode="linear" duration="2000ms">
        <mock:shadow-root>
          <div id="morph-container">
            <div id="morph-svg-container">
              <svg height="500" id="morph-svg" viewBox="0 0 500 500" width="500" xmlns="http://www.w3.org/2000/svg">
                <path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287" id="initPath">
                  <animate attributeName="d" begin="initPath.click" calcMode="linear" dur="2000ms" id="animPath" values="M 100,100 C 150,100 200,100 250,100 C 300,100 350,100 400,100 C 400,150 400,200 400,250 C 400,300 400,350 400,400 C 350,400 300,400 250,400 C 200,400 150,400 100,400 C 100,350 100,300 100,250 C 100,200 100,150 100,100;M 250,100 C 266.67,133.33 283.33,166.67 300,200 C 333.33,216.67 366.67,233.33 400,250 C 366.67,266.67 333.33,283.33 300,300 C 283.33,333.33 266.67,366.67 250,400 C 233.33,366.67 216.67,333.33 200,300 C 166.67,283.33 133.33,266.67 100,250 C 133.33,233.33 166.67,216.67 200,200 C 216.67,166.67 233.33,133.33 250,100;M 171.30,60.00 C 223.77,60.00 276.23,60.00 328.70,60.00 C 365.80,97.10 402.90,134.20 440.00,171.30 C 440.00,223.77 440.00,276.23 440.00,328.70 C 402.90,365.80 365.80,402.90 328.70,440.00 C 276.23,440.00 223.77,440.00 171.30,440.00 C 134.20,402.90 97.10,365.80 60.00,328.70 C 60.00,276.23 60.00,223.77 60.00,171.30 C 97.10,134.20 134.20,97.10 171.30,60.00;" xlink:href="#initPath"></animate>
                </path>
              </svg>
            </div>
          </div>
        </mock:shadow-root>
      </jeep-jeep-svgmorph>`);
      */
      const alPaths: Array<any> = await root.getAlignedPaths(false);
      expect(alPaths.length).toEqual(3);
      expect(alPaths[0].cBz).toEqual(alPath1);
      expect(alPaths[1].cBz).toEqual(alPath2);
      expect(alPaths[2].cBz).toEqual(alPath3);
    });
    it('should align the two given paths with nSegment="16"', async () => {
      let svg = doc.createElementNS("http://www.w3.org/2000/svg",'svg');
      svg.setAttribute('width',"500");
      svg.setAttribute('height',"500");
      svg.setAttribute('viewBox',"0 0 500 500");
      svg.setAttribute('xmlns',"http://www.w3.org/2000/svg");
      let path1El = doc.createElementNS("http://www.w3.org/2000/svg",'path');
      path1El.setAttribute('d',path1);
      path1El.setAttribute('fill',"#1eb287");
      svg.appendChild(path1El);
      let path2El = doc.createElementNS("http://www.w3.org/2000/svg",'path');
      path2El.setAttribute('d',path2);
      svg.appendChild(path2El);
      rootInstance.el.appendChild(svg);
      root.nsegment = "16";
      await rootInstance.componentWillLoad();
      await page.waitForChanges();
      await root.renderSVGFirstPath();
      await page.waitForChanges();
      const alPaths: Array<any> = await root.getAlignedPaths(false);
      expect(alPaths.length).toEqual(2);
      expect(alPaths[0].cBz).toEqual(nPath1);
      expect(alPaths[1].cBz).toEqual(nPath2);
    });

});
