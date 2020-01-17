jest.mock('../../utils/windowutils', () => ({
  windowSize: (window:any) => { const win:any = {top:0,left:0,width:800,height:600}; return win;},
}));

import { newSpecPage} from '@stencil/core/testing';
import { JeepColumnchart } from './jeep-columnchart';
import { convertCSSBoolean } from '../../utils/common';
import { Rect } from '../../global/interfaces/geom';

describe('jeep-columnchart', () => {
  let page: any;
  let root: any;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [JeepColumnchart],
      html: '<jeep-columnchart></jeep-columnchart>'
    });
    root = page.root;
  });
  afterEach (async () => {
    page = null;
  });

  it('should return error when no datapoints property given', async () => {
    expect(root).toEqualHtml(`<jeep-columnchart style="--top: 0; --left: 0; --width: 800px; --height: 600px; --backgroundcolor: #ffffff;">
      <mock:shadow-root>
        <div id="div-error-message">
          <p id="p-error-message">
          Error: no datapoints property
          </p>
        </div>
      </mock:shadow-root>
    </jeep-columnchart>`);
    const status = await root.getStatus();
    expect(status.status).toEqual(400);
    expect(status.message).toEqual("Error: no datapoints property");      
  });

  it('should return error when no datapoints given', async () => {
    root.datapoints = '{}';
    await page.waitForChanges(); 
    expect(root).toEqualHtml(`<jeep-columnchart datapoints="{}" style="--top: 0; --left: 0; --width: 800px; --height: 600px; --backgroundcolor: #ffffff;">
      <mock:shadow-root>
        <div id="div-error-message">
          <p id="p-error-message">
          Error: no data object in datapoints property
          </p>
        </div>
      </mock:shadow-root>
    </jeep-columnchart>`);
    const status = await root.getStatus();
    expect(status.status).toEqual(400);
    expect(status.message).toEqual("Error: no data object in datapoints property");      
    
  });
  it('should return error when no data in datapoints given', async () => {
    root.datapoints = '{"data":[]}';
    await page.waitForChanges(); 
    expect(root).toEqualHtml(`<jeep-columnchart datapoints=${root.datapoints} style="--top: 0; --left: 0; --width: 800px; --height: 600px; --backgroundcolor: #ffffff;">
      <mock:shadow-root>
        <div id="div-error-message">
          <p id="p-error-message">
          Error: data object empty in datapoints property
          </p>
        </div>
      </mock:shadow-root>
    </jeep-columnchart>`);
    const status = await root.getStatus();
    expect(status.status).toEqual(400);
    expect(status.message).toEqual("Error: data object empty in datapoints property");      
  });
  it('should return null when no ctitle property given', async () => {
    expect(root.getAttribute('ctitle')).toBeNull();
  });
  it('should return the title when ctitle property given', async () => {
    root.ctitle = "Chart Title Test";
    await page.waitForChanges(); 
    expect(root.getAttribute('ctitle')).toEqual("Chart Title Test");
  });

  it('should return null when no subtitle property given', async () => {
    expect(root.getAttribute('subtitle')).toBeNull();
  });
  it('should return subTitleText when subtitle property given', async () => {
    root.subtitle = "Chart SubTitle Test";
    await page.waitForChanges(); 
    expect(root.getAttribute('subtitle')).toEqual("Chart SubTitle Test");
  });
  it('should return null when no xtitle property given', async () => {
    expect(root.getAttribute('xtitle')).toBeNull();
  });
  it('should return titleX when xtitle property given', async () => {
    root.xtitle = "X-axis Test";
    await page.waitForChanges(); 
    expect(root.getAttribute('xtitle')).toEqual("X-axis Test");
  });
  it('should return null when no ytitle property given', async () => {
    expect(root.getAttribute('ytitle')).toBeNull();
  });
  it('should return titleY when ytitle property given', async () => {
    root.ytitle = "Y-axis Test";
    await page.waitForChanges(); 
    expect(root.getAttribute('ytitle')).toEqual("Y-axis Test");
  });
  it('should return null when no color property given', async () => {
    expect(root.getAttribute('color')).toBeNull();
  });
  it('should return constColor when color property given', async () => {
    root.color = "#e42b78";
    await page.waitForChanges(); 
    expect(root.getAttribute('color')).toEqual("#e42b78");
  });

  it('should return false when no animation property given', async () => {
    expect(root.getAttribute('animation')).toBeNull();
  });
  it('should return true when animation property given', async () => {
    root.animation = true;
    await page.waitForChanges(); 
    expect(root.getAttribute('animation')).not.toBeNull();
  });
});

describe('functions', () => {
    let page: any;
    let root: any;
    let rootInstance: any;
    let win: Window;
    let spyWindowSize: jest.SpyInstance<any>;
    let spyContainerSize: jest.SpyInstance<any>;
    let spyRenderChart: jest.SpyInstance<any>;
    beforeEach(async () => {
      page = await newSpecPage({
        components: [JeepColumnchart],
        html: '<jeep-columnchart></jeep-columnchart>'
      });
      root = page.root;
      rootInstance = page.rootInstance;
      win = page.win;
      root.datapoints = '{"data":[ \
        {"label":"Apple","y":10,"color":"#e34c46"},\
        {"label":"Orange","y":-17,"color":"#d1b038"},\
        {"label":"Banana","y":12,"color":"#48a37c"},\
        {"label":"Mango","y":30,"color":"#111782"},\
        {"label":"Grape","y":28,"color":"#db123a"}]}'
    });
    afterEach (async () => {
      page = null;
      root = null;
      rootInstance = null;
      win = null;
      if(spyContainerSize) spyContainerSize.mockReset();
      if(spyRenderChart) spyRenderChart.mockReset();
    });

    it('_init', async () => {
      win.addEventListener = jest.fn();
      spyContainerSize = jest.spyOn(rootInstance,'_setContainerSize');
      root.cstyle="--height:400px;--width:800px;--top:30px;--left:20px;"
      await page.waitForChanges(); 
      await root.init();
      await page.waitForChanges(); 
      expect(win.addEventListener).toHaveBeenCalledTimes(1);
      expect(rootInstance.innerTitle).toBeNull();
      expect(rootInstance.innerSubTitle).toBeNull();
      expect(rootInstance.innerXTitle).toBeNull();
      expect(rootInstance.innerYTitle).toBeNull();
      expect(rootInstance.innerColor).toBeNull();
      expect(rootInstance.innerAnimation).toBeFalsy();
      expect(rootInstance.innerBorder).toBeFalsy();
      expect(rootInstance.innerDelay).toEqual(100);
      expect(spyContainerSize).toHaveBeenCalled();
      expect(rootInstance.innerStyle).toEqual( '--height:400px;--width:800px;--top:30px;--left:20px;');
      const winSize: Rect = await root.getWindowSize();
      expect(winSize).toEqual({ top: 0, left: 0, width: 800, height: 600 });
      const status = await root.getStatus();
      expect(status.status).toEqual(200);
      expect(rootInstance._wSize).toEqual({ top: 0, left: 0, width: 800, height: 600 });
      expect(rootInstance._prop.topPlot).toEqual("30px");
      expect(rootInstance._prop.leftPlot).toEqual("20px");
      expect(rootInstance._prop.widthPlot).toEqual("800px");
      expect(rootInstance._prop.heightPlot).toEqual("400px");
      expect(rootInstance._prop.bgColor).toEqual("#ffffff");

    });

    it('getDataPoints', async () => {
      const status = await root.getStatus();
      expect(status.status).toEqual(200);
      const res: any = {"data":[
        {"label":"Apple","y":10,"color":"#e34c46"},
        {"label":"Orange","y":-17,"color":"#d1b038"},
        {"label":"Banana","y":12,"color":"#48a37c"},
        {"label":"Mango","y":30,"color":"#111782"},
        {"label":"Grape","y":28,"color":"#db123a"}
      ]};
      expect(rootInstance.innerDatapoints).toEqual(res.data);
    });
    it('getDataPoint with label in data', async () => {
      await root.init();
      await page.waitForChanges(); 
      const status = await root.getStatus();
      expect(status.status).toEqual(200);
      expect(rootInstance._label).toBeTruthy();
      const result:any = rootInstance._getDataPoint("Mango");
      expect(result.index).toEqual(3);
      expect(result.datapoint).toEqual({"label":"Mango","y":30,"color":"#111782"});
    });

    it('getDataPoint with label not in data', async () => {
      await root.init();
      await page.waitForChanges(); 
      const status = await root.getStatus();
      expect(status.status).toEqual(200);
      expect(rootInstance._label).toBeTruthy();
      const result:any = rootInstance._getDataPoint("Kiwi");
      expect(result.index).toEqual(-1);
      expect(result.datapoint).toBeNull();
    });

    it('getDataPoint with x in data', async () => {

      root.datapoints = '{"data":[\
        {"x":0,"y":10},\
        {"x":1,"y":17},\
        {"x":2,"y":12},\
        {"x":3,"y":30},\
        {"x":4,"y":28}]}';

      await page.waitForChanges(); 
     
      await root.init();
      await page.waitForChanges(); 
      const status = await root.getStatus();
      expect(status.status).toEqual(200);
      expect(rootInstance._label).toBeFalsy();
      const result:any = rootInstance._getDataPoint("1");
      expect(result.index).toEqual(1);
      expect(result.datapoint.x).toEqual(1);
      expect(result.datapoint.y).toEqual(17);
      expect(result.datapoint.color).not.toBeNull();
    });

    it('getDataPoint with x not in data', async () => {
      root.datapoints = '{"data":[\
        {"x":0,"y":10},\
        {"x":1,"y":17},\
        {"x":2,"y":12},\
        {"x":3,"y":30},\
        {"x":4,"y":28}]}';
      await page.waitForChanges(); 
      await root.init();
      await page.waitForChanges(); 
      const status = await root.getStatus();
      expect(status.status).toEqual(200);
      expect(rootInstance._label).toBeFalsy();
      const result:any = rootInstance._getDataPoint("5");
      expect(result.index).toEqual(-1);
      expect(result.datapoint).toBeNull();
    });

    it('_windowResize  without datapoints', async () => {
      spyWindowSize = jest.spyOn(rootInstance,'getWindowSize');
      spyContainerSize = jest.spyOn(rootInstance,'_setContainerSize');
      spyRenderChart = jest.spyOn(rootInstance,'_renderChart');
      root.cstyle="--height:400px;--width:800px;--top:0px;--left:0px;"
      root.datapoints = '';
      await page.waitForChanges(); 
      await root.init();
      await page.waitForChanges(); 
      await rootInstance._windowResize();
      await page.waitForChanges(); 
      expect(rootInstance._update).toBeTruthy();
      expect(spyWindowSize).toHaveBeenCalled();
      expect(spyContainerSize).toHaveBeenCalled();
      expect(spyRenderChart).not.toHaveBeenCalled();
    });
    it('_windowResize  with datapoints', async () => {
      const mockRenderChart = jest.fn().mockReturnValue(Promise.resolve());
      rootInstance._renderChart = mockRenderChart;
      spyWindowSize = jest.spyOn(rootInstance,'getWindowSize');
      spyContainerSize = jest.spyOn(rootInstance,'_setContainerSize');
      spyRenderChart = jest.spyOn(rootInstance,'_renderChart');
      root.cstyle="--height:400px;--width:800px;--top:0px;--left:0px;"
      await page.waitForChanges(); 
      await root.init();
      await page.waitForChanges(); 
      const status = await root.getStatus();
      expect(status.status).toEqual(200);
      await rootInstance._windowResize();
      await page.waitForChanges(); 
      expect(rootInstance._update).toBeTruthy();
      expect(spyWindowSize).toHaveBeenCalled();
      expect(spyContainerSize).toHaveBeenCalled();
      expect(spyRenderChart).toHaveBeenCalled();
    });
    it('_setPropertyValue should return default for --chart-background-color', () => {
      const def:string = rootInstance._setPropertyValue('--chart-background-color');
      expect(def).toEqual("#ffffff");
    });
    it('_setPropertyValue should return #000000 for --chart-background-color', () => {
      const col:string = rootInstance._setPropertyValue('--chart-background-color','#000000');
      expect(col).toEqual("#000000");
    });
    it('_setPropertyValue should return default for --chart-axis-color', () => {
      const def:string = rootInstance._setPropertyValue('--chart-axis-color');
      expect(def).toEqual("#000000");
    });
    it('_setPropertyValue should return #0000ff for --chart-axis-color', () => {
      const col:string = rootInstance._setPropertyValue('--chart-axis-color','#0000ff');
      expect(col).toEqual("#0000ff");
    });
    it('_setPropertyValue should return default for --chart-title-color', () => {
      const def:string = rootInstance._setPropertyValue('--chart-title-color');
      expect(def).toEqual("#000000");
    });
    it('_setPropertyValue should return #0000ff for --chart-title-color', () => {
      const col:string = rootInstance._setPropertyValue('--chart-title-color','#0000ff');
      expect(col).toEqual("#0000ff");
    });
    it('_setPropertyValue should return default for --chart-subtitle-color', () => {
      const def:string = rootInstance._setPropertyValue('--chart-subtitle-color');
      expect(def).toEqual("#000000");
    });
    it('_setPropertyValue should return #0000ff for --chart-subtitle-color', () => {
      const col:string = rootInstance._setPropertyValue('--chart-subtitle-color','#0000ff');
      expect(col).toEqual("#0000ff");
    });
    it('_setPropertyValue should return default for --chart-axis-title-color', () => {
      const def:string = rootInstance._setPropertyValue('--chart-axis-title-color');
      expect(def).toEqual("#000000");
    });
    it('_setPropertyValue should return #0000ff for --chart-axis-title-color', () => {
      const col:string = rootInstance._setPropertyValue('--chart-axis-title-color','#0000ff');
      expect(col).toEqual("#0000ff");
    });
    it('_setPropertyValue should return default for --chart-line-color', () => {
      const def:string = rootInstance._setPropertyValue('--chart-line-color');
      expect(def).toEqual("#000000");
    });
    it('_setPropertyValue should return #0000ff for --chart-line-color', () => {
      const col:string = rootInstance._setPropertyValue('--chart-line-color','#0000ff');
      expect(col).toEqual("#0000ff");
    });
    it('_setPropertyValue should return default for --chart-label-color', () => {
      const def:string = rootInstance._setPropertyValue('--chart-label-color');
      expect(def).toEqual("#000000");
    });
    it('_setPropertyValue should return #0000ff for --chart-label-color', () => {
      const col:string = rootInstance._setPropertyValue('--chart-label-color','#0000ff');
      expect(col).toEqual("#0000ff");
    });
    it('_setPropertyValue should return default for --chart-font-family', () => {
      const def:string = rootInstance._setPropertyValue('--chart-font-family');
      expect(def).toEqual("Verdana");
    });
    it('_setPropertyValue should return Arial for --chart-font-family', () => {
      const col:string = rootInstance._setPropertyValue('--chart-font-family','Arial');
      expect(col).toEqual("Arial");
    });
    it('_setPropertyValue should return default for --chart-title-font-size', () => {
      const def:string = rootInstance._setPropertyValue('--chart-title-font-size');
      expect(def).toEqual("10px");
    });
    it('_setPropertyValue should return 25px for --chart-title-font-size', () => {
      const col:string = rootInstance._setPropertyValue('--chart-title-font-size','25px');
      expect(col).toEqual("25px");
    });
    it('_setPropertyValue should return default for --chart-subtitle-font-size', () => {
      const def:string = rootInstance._setPropertyValue('--chart-subtitle-font-size');
      expect(def).toEqual("10px");
    });
    it('_setPropertyValue should return 20px for --chart-subtitle-font-size', () => {
      const col:string = rootInstance._setPropertyValue('--chart-subtitle-font-size','20px');
      expect(col).toEqual("20px");
    });
    it('_setPropertyValue should return default for --chart-label-font-size', () => {
      const def:string = rootInstance._setPropertyValue('--chart-label-font-size');
      expect(def).toEqual("10px");
    });
    it('_setPropertyValue should return 15px for --chart-label-font-size', () => {
      const col:string = rootInstance._setPropertyValue('--chart-label-font-size','15px');
      expect(col).toEqual("15px");
    });
    it('_setPropertyValue should return default for --chart-axis-title-font-size', () => {
      const def:string = rootInstance._setPropertyValue('--chart-axis-title-font-size');
      expect(def).toEqual("10px");
    });
    it('_setPropertyValue should return 15px for --chart-axis-title-font-size', () => {
      const col:string = rootInstance._setPropertyValue('--chart-axis-title-font-size','15px');
      expect(col).toEqual("15px");
    });
    it('_setPropertyValue should return default for --chart-grid-x', () => {
      const def:string = rootInstance._setPropertyValue('--chart-grid-x');
      expect(convertCSSBoolean(def)).toBeFalsy();
    });
    it('_setPropertyValue should return true for --chart-grid-x', () => {
      const col:string = rootInstance._setPropertyValue('--chart-grid-x','true');
      expect(convertCSSBoolean(col)).toBeTruthy();
    });
    it('_setPropertyValue should return default for --chart-grid-y', () => {
      const def:string = rootInstance._setPropertyValue('--chart-grid-y');
      expect(convertCSSBoolean(def)).toBeFalsy();
    });
    it('_setPropertyValue should return true for --chart-grid-y', () => {
      const col:string = rootInstance._setPropertyValue('--chart-grid-y','true');
      expect(convertCSSBoolean(col)).toBeTruthy();
    });
    it('_setPropertyValue should return default for --chart-width', () => {
      const def:string = rootInstance._setPropertyValue('--chart-width');
      expect(def).toEqual('0');
    });
    it('_setPropertyValue should return 100% for --chart-width', () => {
      const col:string = rootInstance._setPropertyValue('--chart-width','100%');
      expect(col).toEqual('100%');
    });
    it('_setPropertyValue should return default for --chart-height', () => {
      const def:string = rootInstance._setPropertyValue('--chart-height');
      expect(def).toEqual('0');
    });
    it('_setPropertyValue should return 325px for --chart-height', () => {
      const col:string = rootInstance._setPropertyValue('--chart-height','325px');
      expect(col).toEqual('325px');
    });
    it('_setPropertyValue should return default for --chart-top', () => {
      const def:string = rootInstance._setPropertyValue('--chart-top');
      expect(def).toEqual('0');
    });
    it('_setPropertyValue should return 5px for --chart-top', () => {
      const col:string = rootInstance._setPropertyValue('--chart-top','5px');
      expect(col).toEqual('5px');
    });
    it('_setPropertyValue should return default for --chart-left', () => {
      const def:string = rootInstance._setPropertyValue('--chart-left');
      expect(def).toEqual('0');
    });
    it('_setPropertyValue should return 10px for --chart-left', () => {
      const col:string = rootInstance._setPropertyValue('--chart-left','10px');
      expect(col).toEqual('10px');
    });
    it('_setPropertyValue should return default for --chart-tick-x-length', () => {
      const def:string = rootInstance._setPropertyValue('--chart-tick-x-length');
      expect(def).toEqual('0');
    });
    it('_setPropertyValue should return 4px for --chart-tick-x-length', () => {
      const col:string = rootInstance._setPropertyValue('--chart-tick-x-length','4px');
      expect(col).toEqual('4px');
    });
    it('_setPropertyValue should return default for --chart-tick-y-length', () => {
      const def:string = rootInstance._setPropertyValue('--chart-tick-y-length');
      expect(def).toEqual('0');
    });
    it('_setPropertyValue should return 4px for --chart-tick-y-length', () => {
      const col:string = rootInstance._setPropertyValue('--chart-tick-y-length','5px');
      expect(col).toEqual('5px');
    });
});
