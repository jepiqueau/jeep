import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';

describe('jeep-svgmorph', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<jeep-svgmorph></jeep-svgmorph>');
    const element = await page.find('jeep-svgmorph');
    expect(element).toHaveClass('hydrated');
  });
  describe('rendering', () => {
    let page: E2EPage;
    let cmp: E2EElement;
    let contentStart: string = '<body style="margin:0px;font-family:sans-serif;overflow:hidden;';
    contentStart += 'height:100vh;padding:2vmin;background:%23fcfcfc;">';
    contentStart += '<jeep-svgmorph>';
    let contentEnd: string = '</jeep-svgmorph></body>';
    let svgData: string ='<svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">';
    svgData += '<path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287"></path>';   
    svgData += '<path d="M 250,100 L 270,230 400,250 270,270 250,400 230,270 100,250 230,230 250,100" fill="#f8ef07"></path>';   
    svgData += '<path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287"></path>';  
    svgData += '</svg>';
    let svgData1: string ='<svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">';
    svgData1 += '<path d="M100,100 H400 V400 H 100 V 100"></path>';   
    svgData1 += '<path d="M 250,100 L 270,230 400,250 270,270 250,400 230,270 100,250 230,230 250,100"></path>';   
    svgData1 += '<path d="M100,100 H400 V400 H 100 V 100"></path>';  
    svgData1 += '</svg>';
    let svgData2: string ='<svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">';
    svgData2 += '<path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287"></path>';   
    svgData2 += '<path d="M 250,100 L 270,230 400,250 270,270 250,400 230,270 100,250 230,230 250,100" fill="#1eb287"></path>';   
    svgData2 += '<path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287"></path>';  
    svgData2 += '</svg>';

    let animPath:string = "M 100,100 C 150,100 200,100 250,100 C 300,100 350,100 400,100 C 400,150 400,200 400,250 C 400,300 400,350 400,400 C 350,400 300,400 250,400 C 200,400 150,400 100,400 C 100,350 100,300 100,250 C 100,200 100,150 100,100;M 250,100 C 256.67,143.33 263.33,186.67 270,230 C 313.33,236.67 356.67,243.33 400,250 C 356.67,256.67 313.33,263.33 270,270 C 263.33,313.33 256.67,356.67 250,400 C 243.33,356.67 236.67,313.33 230,270 C 186.67,263.33 143.33,256.67 100,250 C 143.33,243.33 186.67,236.67 230,230 C 236.67,186.67 243.33,143.33 250,100;M 100,100 C 150,100 200,100 250,100 C 300,100 350,100 400,100 C 400,150 400,200 400,250 C 400,300 400,350 400,400 C 350,400 300,400 250,400 C 200,400 150,400 100,400 C 100,350 100,300 100,250 C 100,200 100,150 100,100;M 400,100 C 400,150 400,200 400,250 C 400,300 400,350 400,400 C 350,400 300,400 250,400 C 200,400 150,400 100,400 C 100,350 100,300 100,250 C 100,200 100,150 100,100 C 150,100 200,100 250,100 C 300,100 350,100 400,100;M 250,100 C 256.67,143.33 263.33,186.67 270,230 C 313.33,236.67 356.67,243.33 400,250 C 356.67,256.67 313.33,263.33 270,270 C 263.33,313.33 256.67,356.67 250,400 C 243.33,356.67 236.67,313.33 230,270 C 186.67,263.33 143.33,256.67 100,250 C 143.33,243.33 186.67,236.67 230,230 C 236.67,186.67 243.33,143.33 250,100;M 400,100 C 400,150 400,200 400,250 C 400,300 400,350 400,400 C 350,400 300,400 250,400 C 200,400 150,400 100,400 C 100,350 100,300 100,250 C 100,200 100,150 100,100 C 150,100 200,100 250,100 C 300,100 350,100 400,100;"
    beforeEach(async () => {
      page = await newE2EPage();
    });
    afterEach(() => {
      page = null;
      cmp = null;
     });
    it('should return "fake-container" without svg element', async () => {
      await page.setContent(`${contentStart}${contentEnd}`);
      cmp = await page.find('jeep-svgmorph');
      const divEl: E2EElement = await page.find('jeep-svgmorph >>> div');
      expect(divEl.getAttribute('id')).toEqual('fake-container');
      expect(cmp).toEqualHtml(`<jeep-svgmorph calcmode="linear" class="hydrated" duration="2000ms">
        <mock:shadow-root>
          <div id="fake-container"></div>
        </mock:shadow-root>
      </jeep-svgmorph>`);
    });
    it('should return "morph-container" with svg element', async () => {
      await page.setContent(`${contentStart}${svgData}${contentEnd}`);
      cmp = await page.find('jeep-svgmorph');
      const divEl: E2EElement = await page.find('jeep-svgmorph >>> div');
      expect(divEl.getAttribute('id')).toEqual('morph-container');
      const svgEl = await divEl.find('svg');
      expect(svgEl).not.toBeNull();
      expect(svgEl).toEqualHtml(`<svg height="500" id="morph-svg" viewBox="0 0 500 500" width="500" xmlns="http://www.w3.org/2000/svg">
        <path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287" id="initPath">
          <animate attributename="d" begin="initPath.click" calcmode="linear" dur="2000ms" xlink:href="#initPath" 
            id="animPath" values="M 100,100 C 150,100 200,100 250,100 C 300,100 350,100 400,100 C 400,150 400,200 400,250 C 400,300 400,350 400,400 C 350,400 300,400 250,400 C 200,400 150,400 100,400 C 100,350 100,300 100,250 C 100,200 100,150 100,100;M 250,100 C 256.67,143.33 263.33,186.67 270,230 C 313.33,236.67 356.67,243.33 400,250 C 356.67,256.67 313.33,263.33 270,270 C 263.33,313.33 256.67,356.67 250,400 C 243.33,356.67 236.67,313.33 230,270 C 186.67,263.33 143.33,256.67 100,250 C 143.33,243.33 186.67,236.67 230,230 C 236.67,186.67 243.33,143.33 250,100;M 100,100 C 150,100 200,100 250,100 C 300,100 350,100 400,100 C 400,150 400,200 400,250 C 400,300 400,350 400,400 C 350,400 300,400 250,400 C 200,400 150,400 100,400 C 100,350 100,300 100,250 C 100,200 100,150 100,100;">
          </animate>
          <animate attributename="fill" begin="animPath.begin" dur="2000ms" xlink:href="#initPath" id="animFill" values="#1eb287;#f8ef07;#1eb287;">
          </animate>
        </path>
      </svg>`);
    });
    it('should return the id of the svg element', async () => {
      await page.setContent(`${contentStart}${svgData}${contentEnd}`);
      cmp = await page.find('jeep-svgmorph');
      const divEl: E2EElement = await page.find('jeep-svgmorph >>> div');
      const svgEl: E2EElement = await divEl.find('svg');
      expect(svgEl.getAttribute('id')).toEqual('morph-svg');
    });
    it('should return the width of the svg element', async () => {
      await page.setContent(`${contentStart}${svgData}${contentEnd}`);
      cmp = await page.find('jeep-svgmorph');
      const divEl: E2EElement = await page.find('jeep-svgmorph >>> div');
      const svgEl: E2EElement = await divEl.find('svg');
      expect(svgEl.getAttribute('width')).toEqual('500');
    });
    it('should return the height of the svg element', async () => {
      await page.setContent(`${contentStart}${svgData}${contentEnd}`);
      cmp = await page.find('jeep-svgmorph');
      const divEl: E2EElement = await page.find('jeep-svgmorph >>> div');
      const svgEl: E2EElement = await divEl.find('svg');
      expect(svgEl.getAttribute('height')).toEqual('500');
    });
    it('should return the viewbox of the svg element', async () => {
      await page.setContent(`${contentStart}${svgData}${contentEnd}`);
      cmp = await page.find('jeep-svgmorph');
      const divEl: E2EElement = await page.find('jeep-svgmorph >>> div');
      const svgEl: E2EElement = await divEl.find('svg');
      expect(svgEl.getAttribute('viewBox')).toEqual('0 0 500 500');
    });
    it('should return the pathlist', async () => {
      await page.setContent(`${contentStart}${svgData}${contentEnd}`);
      cmp = await page.find('jeep-svgmorph');
      const pathList = await cmp.callMethod('getPathList')
      expect(pathList.length).toEqual(3);
    });
    it('should return the fillColor', async () => {
      await page.setContent(`${contentStart}${svgData}${contentEnd}`);
      cmp = await page.find('jeep-svgmorph');
      const fillColor = await cmp.callMethod('getFillColor')
      expect(fillColor.length).toEqual(3);
    });
    it('should renderSVGFirstPath and have a div element', async () => {
      await page.setContent(`${contentStart}${svgData}${contentEnd}`);
      cmp = await page.find('jeep-svgmorph');
      await cmp.callMethod('renderSVGFirstPath');
      await page.waitForChanges();
      const divEl: E2EElement = await page.find('jeep-svgmorph >>> #morph-container');
      expect(divEl).toBeTruthy();
    });
    it('should renderSVGFirstPath and have a svg element', async () => {
      await page.setContent(`${contentStart}${svgData}${contentEnd}`);
      cmp = await page.find('jeep-svgmorph');
      await cmp.callMethod('renderSVGFirstPath');
      await page.waitForChanges();
      const divEl: E2EElement = await page.find('jeep-svgmorph >>> #morph-container');
      const svgEl: E2EElement = await divEl.find('#morph-svg');
      expect(svgEl).toBeTruthy();
      expect(svgEl.getAttribute('viewBox')).toEqual("0 0 500 500");
      expect(svgEl.getAttribute('width')).toEqual("500");
      expect(svgEl.getAttribute('height')).toEqual("500");
    });
    it('should renderSVGFirstPath and have path in the svg element', async () => {
      await page.setContent(`${contentStart}${svgData}${contentEnd}`);
      cmp = await page.find('jeep-svgmorph');
      await cmp.callMethod('renderSVGFirstPath');
      await page.waitForChanges();
      const divEl: E2EElement = await page.find('jeep-svgmorph >>> #morph-container');
      const svgEl: E2EElement = await divEl.find('#morph-svg');
      const pathEls: E2EElement[] = await svgEl.findAll('path')
      expect(pathEls.length).toEqual(1);
      expect(pathEls[0].getAttribute('d')).toEqual("M100,100 H400 V400 H 100 V 100");
      expect(pathEls[0].getAttribute('fill')).toEqual("#1eb287");
    });
    it('should renderSVGFirstPath and have two animate elements in the path of the svg element', async () => {
      await page.setContent(`${contentStart}${svgData}${contentEnd}`);
      cmp = await page.find('jeep-svgmorph');
      cmp.setProperty("duration","4000ms");
      cmp.setProperty("repeatcount","2");
      cmp.setProperty("pathindex","2;0;2");
      cmp.setProperty("nsegment","2");
      cmp.setProperty("keytimes","0;.5;1");
      cmp.setProperty("calcmode","spline");
      cmp.setProperty("keysplines","0.645,0.045,0.355,1;0.645,0.045,0.355,1");
      await page.waitForChanges();
      await cmp.callMethod('renderSVGFirstPath');
      await page.waitForChanges();
      const divEl: E2EElement = await page.find('jeep-svgmorph >>> #morph-container');
      const svgEl: E2EElement = await divEl.find('#morph-svg');
      const pathEls: E2EElement[] = await svgEl.findAll('path');
      const animEls: E2EElement[] = await pathEls[0].findAll('animate');
      expect(animEls.length).toEqual(2);
      expect(animEls[0].getAttribute('id')).toEqual("animPath");
      expect(animEls[0].getAttribute('begin')).toEqual("initPath.click");
      expect(animEls[0].getAttribute('attributeName')).toEqual("d");
      expect(animEls[0].getAttribute('values')).toEqual(animPath);
      expect(animEls[0].getAttribute('dur')).toEqual("4000ms");
      expect(animEls[0].getAttribute('xlink:href')).toEqual("#initPath");
      expect(animEls[0].getAttribute('repeatcount')).toEqual("2");
      expect(animEls[0].getAttribute('keytimes')).toEqual("0;.5;1");
      expect(animEls[0].getAttribute('calcmode')).toEqual("spline");
      expect(animEls[0].getAttribute('keysplines')).toEqual("0.645,0.045,0.355,1;0.645,0.045,0.355,1");
      expect(animEls[1].getAttribute('id')).toEqual("animFill");
      expect(animEls[1].getAttribute('begin')).toEqual("animPath.begin");
      expect(animEls[1].getAttribute('attributeName')).toEqual("fill");
      expect(animEls[1].getAttribute('values')).toEqual("#1eb287;#f8ef07;#1eb287;");
      expect(animEls[1].getAttribute('dur')).toEqual("4000ms");
      expect(animEls[1].getAttribute('xlink:href')).toEqual("#initPath");
      expect(animEls[1].getAttribute('repeatcount')).toEqual("2");
    });
    it('should renderSVGFirstPath and have one animate element in the path of the svg element when the fill property is set', async () => {
      await page.setContent(`${contentStart}${svgData1}${contentEnd}`);
      cmp = await page.find('jeep-svgmorph');
      cmp.setProperty("duration","4000ms");
      cmp.setProperty("repeatcount","2");
      cmp.setProperty("pathindex","2;0;2");
      cmp.setProperty("nsegment","2");
      cmp.setProperty("keytimes","0;.5;1");
      cmp.setProperty("calcmode","spline");
      cmp.setProperty("keysplines","0.645,0.045,0.355,1;0.645,0.045,0.355,1");
      cmp.setProperty("fill","#1eb287");
      await page.waitForChanges();
      await cmp.callMethod('renderSVGFirstPath');
      await page.waitForChanges();
      const divEl: E2EElement = await page.find('jeep-svgmorph >>> #morph-container');
      const svgEl: E2EElement = await divEl.find('#morph-svg');
      const pathEls: E2EElement[] = await svgEl.findAll('path');
      const animEls: E2EElement[] = await pathEls[0].findAll('animate');
      expect(animEls.length).toEqual(1);
      expect(animEls[0].getAttribute('id')).toEqual("animPath");
      expect(animEls[0].getAttribute('begin')).toEqual("initPath.click");
      expect(animEls[0].getAttribute('attributeName')).toEqual("d");
      expect(animEls[0].getAttribute('values')).toEqual(animPath);
      expect(animEls[0].getAttribute('dur')).toEqual("4000ms");
      expect(animEls[0].getAttribute('xlink:href')).toEqual("#initPath");
      expect(animEls[0].getAttribute('repeatcount')).toEqual("2");
      expect(animEls[0].getAttribute('keytimes')).toEqual("0;.5;1");
      expect(animEls[0].getAttribute('calcmode')).toEqual("spline");
      expect(animEls[0].getAttribute('keysplines')).toEqual("0.645,0.045,0.355,1;0.645,0.045,0.355,1");
    });
    it('should renderSVGFirstPath and have one animate element in the path of the svg element when the path color are identical', async () => {
      await page.setContent(`${contentStart}${svgData2}${contentEnd}`);
      cmp = await page.find('jeep-svgmorph');
      cmp.setProperty("duration","4000ms");
      cmp.setProperty("repeatcount","2");
      cmp.setProperty("pathindex","2;0;2");
      cmp.setProperty("nsegment","2");
      cmp.setProperty("keytimes","0;.5;1");
      cmp.setProperty("calcmode","spline");
      cmp.setProperty("keysplines","0.645,0.045,0.355,1;0.645,0.045,0.355,1");
      await page.waitForChanges();
      await cmp.callMethod('renderSVGFirstPath');
      await page.waitForChanges();
      const divEl: E2EElement = await page.find('jeep-svgmorph >>> #morph-container');
      const svgEl: E2EElement = await divEl.find('#morph-svg');
      const pathEls: E2EElement[] = await svgEl.findAll('path');
      const animEls: E2EElement[] = await pathEls[0].findAll('animate');
      expect(animEls.length).toEqual(1);
      expect(animEls[0].getAttribute('id')).toEqual("animPath");
      expect(animEls[0].getAttribute('begin')).toEqual("initPath.click");
      expect(animEls[0].getAttribute('attributeName')).toEqual("d");
      expect(animEls[0].getAttribute('values')).toEqual(animPath);
      expect(animEls[0].getAttribute('dur')).toEqual("4000ms");
      expect(animEls[0].getAttribute('xlink:href')).toEqual("#initPath");
      expect(animEls[0].getAttribute('repeatcount')).toEqual("2");
      expect(animEls[0].getAttribute('keytimes')).toEqual("0;.5;1");
      expect(animEls[0].getAttribute('calcmode')).toEqual("spline");
      expect(animEls[0].getAttribute('keysplines')).toEqual("0.645,0.045,0.355,1;0.645,0.045,0.355,1");
    });
  });
});