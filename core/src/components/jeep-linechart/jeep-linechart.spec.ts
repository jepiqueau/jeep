jest.mock('../../utils/windowutils', () => ({
  windowSize: (window:any) => { const win:any = {top:0,left:0,width:800,height:600}; return win;},
}));

import { newSpecPage} from '@stencil/core/testing';
import { JeepLinechart } from './jeep-linechart';
import { convertCSSBoolean } from '../../utils/common';
import { Rect } from '../../global/interfaces/geom';

describe('jeep-linechart', () => {
  let page: any;
  let root: any;
  let rootInstance:any;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [JeepLinechart],
      html: '<jeep-linechart></jeep-linechart>'
    });
    root = page.root;
    rootInstance = page.rootInstance
  });
  afterEach (async () => {
    page = null;
    root = null;
    rootInstance = null;
  });

  it('should return error when no data property given', async () => {
    expect(root).toEqualHtml(`<jeep-linechart style="--top: 0; --left: 0; --width: 800px; --height: 600px; --backgroundcolor: #ffffff;">
      <mock:shadow-root>
        <div id="div-error-message">
          <p id="p-error-message">
          Error: no data property
          </p>
        </div>
      </mock:shadow-root>
    </jeep-linechart>`);
    const status = await root.getStatus();
    expect(status.status).toEqual(400);
    expect(status.message).toEqual("Error: no data property");      
  });

  it('should return error when no data given', async () => {
    root.data = JSON.stringify({});
    await page.waitForChanges(); 
    expect(root).toEqualHtml(`<jeep-linechart 
      data=${root.data}
      style="--top: 0; --left: 0; --width: 800px; --height: 600px; --backgroundcolor: #ffffff;">
      <mock:shadow-root>
        <div id="div-error-message">
          <p id="p-error-message">
          Error: no data provided
          </p>
        </div>
      </mock:shadow-root>
    </jeep-linechart>`);
    const status = await root.getStatus();
    expect(status.status).toEqual(400);
    expect(status.message).toEqual("Error: no data provided");      
  });
  it('should return error when no dataPoints given in data', async () => {
    root.data = JSON.stringify({color:"#425cef",name:"Line1"});
    await page.waitForChanges(); 
    expect(root).toEqualHtml(`<jeep-linechart 
      data=${root.data}
      style="--top: 0; --left: 0; --width: 800px; --height: 600px; --backgroundcolor: #ffffff;">
      <mock:shadow-root>
        <div id="div-error-message">
          <p id="p-error-message">
          Error: no dataPoints object in dataset: 0 of data property
          </p>
        </div>
      </mock:shadow-root>
    </jeep-linechart>`);
    const status = await root.getStatus();
    expect(status.status).toEqual(400);
    expect(status.message).toEqual("Error: no dataPoints object in dataset: 0 of data property");      
  });
  it('should return error when no y in dataPoints given in data', async () => {
    root.data = JSON.stringify({ 
      color: "#425cef",name: "Line1",
      dataPoints:[{ x: "2012-01-01"},{ x: "2012-01-02" }]
    });
    await page.waitForChanges(); 
    expect(root).toEqualHtml(`<jeep-linechart 
      data=${root.data}
      style="--top: 0; --left: 0; --width: 800px; --height: 600px; --backgroundcolor: #ffffff;">
      <mock:shadow-root>
        <div id="div-error-message">
          <p id="p-error-message">
          Error: no y data in dataset: 0 of data property
          </p>
        </div>
      </mock:shadow-root>
    </jeep-linechart>`);
    const status = await root.getStatus();
    expect(status.status).toEqual(400);
    expect(status.message).toEqual("Error: no y data in dataset: 0 of data property");      
  });
  it('should return error when no x in dataPoints given in data', async () => {
    root.data = JSON.stringify({ 
      color: "#425cef",name: "Line1",
      dataPoints:[{ y: 450},{ y: 414 }]
    });
    await page.waitForChanges(); 
    expect(root).toEqualHtml(`<jeep-linechart 
      data=${root.data}
      style="--top: 0; --left: 0; --width: 800px; --height: 600px; --backgroundcolor: #ffffff;">
      <mock:shadow-root>
        <div id="div-error-message">
          <p id="p-error-message">
          Error: no x data in dataset: 0 of data property
          </p>
        </div>
      </mock:shadow-root>
    </jeep-linechart>`);
    const status = await root.getStatus();
    expect(status.status).toEqual(400);
    expect(status.message).toEqual("Error: no x data in dataset: 0 of data property");      
  });

  it('should return status 200 when dataPoints given in data', async () => {
    root.data = JSON.stringify({ 
      color: "#425cef",name: "Line1",
      dataPoints:[
        { x: 14, y: 450 },
        { x: 20, y: 414 },
        { x: 30, y: 520 },
        { x: 40, y: 460 },
        { x: 50, y: 450 }
      ]
    });
    await page.waitForChanges(); 
    expect(root).toEqualHtml(`<jeep-linechart
      data=${root.data}
      style="--top: 0; --left: 0; --width: 800px; --height: 600px; --backgroundcolor: #ffffff;">
      <mock:shadow-root>
        <div id="div-linechart-container">
          <div id="div-linechart-chart">
            <svg height="600" id="svg-linechart" viewBox="0 0 800 600" width="800">
              <rect class="border-rect hidden" fill="none" fill-opacity="0" height="600" id="svg-border-rect" stroke="#000000" stroke-width="1" width="800" x="0" y="0"></rect>
            </svg>
          </div>        
        </div>
      </mock:shadow-root>
    </jeep-linechart>`);
    const status = await root.getStatus();
    expect(status.status).toEqual(200);
  });
  it('should return status 200 when 2 datasets given in data', async () => {
    root.data = JSON.stringify([{ 
      color: "#425cef",name: "Line1",
      dataPoints:[
        { x: 14, y: 450 },
        { x: 20, y: 414 },
        { x: 30, y: 520 },
        { x: 40, y: 460 },
        { x: 50, y: 450 }
      ]
    },
    {
      color: "#425cef",name: "Line2",
      dataPoints:[
        { x: 14, y: 200 },
        { x: 20, y: 350 },
        { x: 30, y: 530 },
        { x: 40, y: 410 },
        { x: 50, y: 375 }
      ]
    }
    ]);
    await page.waitForChanges(); 
    expect(root).toEqualHtml(`<jeep-linechart
      data=${root.data}
      style="--top: 0; --left: 0; --width: 800px; --height: 600px; --backgroundcolor: #ffffff;">
      <mock:shadow-root>
        <div id="div-linechart-container">
          <div id="div-linechart-chart">
            <svg height="600" id="svg-linechart" viewBox="0 0 800 600" width="800">
              <rect class="border-rect hidden" fill="none" fill-opacity="0" height="600" id="svg-border-rect" stroke="#000000" stroke-width="1" width="800" x="0" y="0"></rect>
            </svg>
          </div>        
        </div>
      </mock:shadow-root>
    </jeep-linechart>`);
    const status = await root.getStatus();
    expect(status.status).toEqual(200);
  });
  it('should return status 400 when dataPoints given and no name in data', async () => {
    root.data = JSON.stringify([{ 
      color: "#425cef",name: "Line1",
      dataPoints:[
        { x: 14, y: 450 },
        { x: 20, y: 414 },
        { x: 30, y: 520 },
        { x: 40, y: 460 },
        { x: 50, y: 450 }
      ]
    },
    {
      color: "#425cef",
      dataPoints:[
        { x: 14, y: 200 },
        { x: 20, y: 350 },
        { x: 30, y: 530 },
        { x: 40, y: 410 },
        { x: 50, y: 375 }
      ]
    }
    ]);
    await page.waitForChanges(); 
    expect(root).toEqualHtml(`<jeep-linechart
      data=${root.data}
      style="--top: 0; --left: 0; --width: 800px; --height: 600px; --backgroundcolor: #ffffff;">
      <mock:shadow-root>
        <div id="div-error-message">
          <p id="p-error-message">
            Error: name attribute missing in some datasets
          </p>
        </div>
      </mock:shadow-root>
    </jeep-linechart>`);
    const status = await root.getStatus();
    expect(status.status).toEqual(400);
    expect(status.message).toEqual("Error: name attribute missing in some datasets");      
  });

  it('should return null when no ctitle property given', async () => {
    expect(root.getAttribute('ctitle')).toBeNull();
    expect(rootInstance.innerTitle).toBeNull();
  });
  it('should return titleText when ctitle property given', async () => {
    root.ctitle = "Chart Title Test";
    await page.waitForChanges(); 
    expect(root.getAttribute('ctitle')).toEqual('Chart Title Test');
    expect(rootInstance.innerTitle).toEqual('Chart Title Test');;
  });
  it('should return null when no subtitle property given', async () => {
    expect(root.getAttribute('subtitle')).toBeNull();
    expect(rootInstance.innerSubTitle).toBeNull();
  });
  it('should return subTitleText when subtitle property given', async () => {
    root.subtitle = "Chart SubTitle Test";
    await page.waitForChanges(); 
    expect(root.getAttribute('subtitle')).toEqual('Chart SubTitle Test');
    expect(rootInstance.innerSubTitle).toEqual('Chart SubTitle Test');;
  });
  it('should return null when no xtitle property given', async () => {
    expect(root.getAttribute('xtitle')).toBeNull();
    expect(rootInstance.innerXTitle).toBeNull();
  });
  it('should return titleX when xtitle property given', async () => {
    root.xtitle = "X-axis Test";
    await page.waitForChanges(); 
    expect(root.getAttribute('xtitle')).toEqual('X-axis Test');
    expect(rootInstance.innerXTitle).toEqual('X-axis Test');;
  });
  it('should return null when no ytitle property given', async () => {
    expect(root.getAttribute('ytitle')).toBeNull();
    expect(rootInstance.innerYTitle).toBeNull();
  });
  it('should return titleY when ytitle property given', async () => {
    root.ytitle = "Y-axis Test";
    await page.waitForChanges(); 
    expect(root.getAttribute('ytitle')).toEqual('Y-axis Test');
    expect(rootInstance.innerYTitle).toEqual('Y-axis Test');;
  });
  it('should return false when no animation property given', async () => {
    expect(root.getAttribute('animation')).toBeNull();
    expect(rootInstance.innerAnimation).toBeFalsy();
  });
  it('should return true when animation property given', async () => {
    root.animation = true;
    await page.waitForChanges(); 
    expect(root.getAttribute('animation')).not.toBeNull();
    expect(rootInstance.innerAnimation).toBeTruthy();
  });
  it('should return false when no border property given', async () => {
    expect(root.getAttribute('border')).toBeNull();
    expect(rootInstance.innerBorder).toBeFalsy();
  });
  it('should return true when border property given', async () => {
    root.cborder = true;
    await page.waitForChanges(); 
    expect(root.getAttribute('cborder')).not.toBeNull();
    expect(rootInstance.innerBorder).toBeTruthy();
  });
  it('should return null when no delay property given', async () => {
    expect(root.getAttribute('delay')).toBeNull();
    expect(rootInstance.innerDelay).toEqual(100);
  });
  it('should return 2000 when delay property given', async () => {
    root.delay = "2000";
    await page.waitForChanges(); 
    expect(root.getAttribute('delay')).toEqual('2000');
    expect(rootInstance.innerDelay).toEqual(2000);;
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
  it('_setPropertyValue should return default for --chart-axis-x-zero', () => {
    const def:string = rootInstance._setPropertyValue('--chart-axis-x-zero');
    expect(convertCSSBoolean(def)).toBeTruthy();
  });
  it('_setPropertyValue should return false for --chart-axis-x-zero', () => {
    const col:string = rootInstance._setPropertyValue('--chart-axis-x-zero','false');
    expect(convertCSSBoolean(col)).toBeFalsy();
  });
  it('_setPropertyValue should return default for --chart-axis-y-zero', () => {
    const def:string = rootInstance._setPropertyValue('--chart-axis-y-zero');
    expect(convertCSSBoolean(def)).toBeTruthy();
  });
  it('_setPropertyValue should return false for --chart-axis-y-zero', () => {
    const col:string = rootInstance._setPropertyValue('--chart-axis-y-zero','false');
    expect(convertCSSBoolean(col)).toBeFalsy();
  });
  it('_setPropertyValue should return default for --chart-legend-top', () => {
    const def:string = rootInstance._setPropertyValue('--chart-legend-top');
    expect(convertCSSBoolean(def)).toBeFalsy();
  });
  it('_setPropertyValue should return true for --chart-legend-top', () => {
    const col:string = rootInstance._setPropertyValue('--chart-legend-top','true');
    expect(convertCSSBoolean(col)).toBeTruthy();
  });
  it('_setPropertyValue should return default for --chart-axis-x-interval', () => {
    const def:string = rootInstance._setPropertyValue('--chart-axis-x-interval');
    expect(def).toEqual('0');
  });
  it('_setPropertyValue should return 4px for --chart-axis-x-interval', () => {
    const col:string = rootInstance._setPropertyValue('--chart-axis-x-interval','5px');
    expect(col).toEqual('5px');
  });
  it('_setPropertyValue should return default for --chart-axis-y-interval', () => {
    const def:string = rootInstance._setPropertyValue('--chart-axis-y-interval');
    expect(def).toEqual('0');
  });
  it('_setPropertyValue should return 4px for --chart-axis-y-interval', () => {
    const col:string = rootInstance._setPropertyValue('--chart-axis-y-interval','5px');
    expect(col).toEqual('5px');
  });
  it('_setPropertyValue should return default for --chart-legend-font-size', () => {
    const def:string = rootInstance._setPropertyValue('--chart-legend-font-size');
    expect(def).toEqual("10px");
  });
  it('_setPropertyValue should return 15px for --chart-legend-font-size', () => {
    const col:string = rootInstance._setPropertyValue('--chart-legend-font-size','15px');
    expect(col).toEqual("15px");
  });
  it('_setPropertyValue should return default for --chart-animation-duration', () => {
    const def:string = rootInstance._setPropertyValue('--chart-animation-duration');
    expect(def).toEqual('1s');
  });
  it('_setPropertyValue should return 4px for --chart-animation-duration', () => {
    const col:string = rootInstance._setPropertyValue('--chart-animation-duration','1s');
    expect(col).toEqual('1s');
  });
  it('_setPropertyValue should return default for --chart-border-color', () => {
    const bod:string = rootInstance._setPropertyValue('--chart-border-color');
    expect(bod).toEqual('#000000');
  });
  it('_setPropertyValue should return #ff00ff for --chart-border-color', () => {
    const bod:string = rootInstance._setPropertyValue('--chart-border-color','#ff00ff');
    expect(bod).toEqual('#ff00ff');
  });
  it('_setPropertyValue should return default for --chart-border-width', () => {
    const bodwidth:string = rootInstance._setPropertyValue('--chart-border-width');
    expect(bodwidth).toEqual('1');
  });
  it('_setPropertyValue should return 4 for --chart-border-width', () => {
    const bodwidth:string = rootInstance._setPropertyValue('--chart-border-width','4');
    expect(bodwidth).toEqual('4');
  });
});


describe('functions', () => {
  let page: any;
  let root: any;
  let rootInstance: any;
  let doc: Document;
  let win: Window;
  let spyWindowSize: jest.SpyInstance<any>;
  let spyContainerSize: jest.SpyInstance<any>;
  let spyRenderChart: jest.SpyInstance<any>;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [JeepLinechart],
      html: '<jeep-linechart></jeep-linechart>'
    });
    root = page.root;
    rootInstance = page.rootInstance;
    win = page.win;
    doc = page.doc;
    root.data = JSON.stringify({ 
      color: "#425cef",name: "Line_1",
      dataPoints:[
        { x: 14, y: 450 },
        { x: 20, y: 414 },
        { x: 30, y: 520 },
        { x: 40, y: 460 },
        { x: 50, y: 450 }
      ]
    }); 
  });

  afterEach( () => {
    root = null;
    win = null;
    doc = null;
    rootInstance = null;
    if(spyWindowSize) spyWindowSize.mockReset();
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
  it('getDataPoints one dataset', async () => {
    const status = await root.getStatus();
    expect(status.status).toEqual(200);
    const res: any = { "color": "#425cef","name": "Line_1",
      "dataPoints":[
        { "x": 14, "y": 450 },
        { "x": 20, "y": 414 },
        { "x": 30, "y": 520 },
        { "x": 40, "y": 460 },
        { "x": 50, "y": 450 }
      ]};
    expect(rootInstance.innerDatapoints).toEqual(res.data);
    expect(rootInstance._axisType).toEqual([ 'x', 'y' ]);
    expect(rootInstance._legendNames).toEqual([ 'Line_1' ]);
    expect(rootInstance._legendThicknesses).toEqual([ 1 ]);
    expect(rootInstance._legendColors).toEqual([ '#425cef' ]);
  });
  it('getDataPoints two datasets', async () => {
    root.data = JSON.stringify([{ 
      color: "#425cef",name: "Line_1",
      dataPoints:[
        { x: 14, y: 450 },
        { x: 20, y: 414 },
        { x: 30, y: 520 },
        { x: 40, y: 460 },
        { x: 50, y: 450 }
      ]
    },
    {
      color: "#379cab",name: "Line_2",
      dataPoints:[
        { x: 14, y: 200 },
        { x: 20, y: 350 },
        { x: 30, y: 530 },
        { x: 40, y: 410 },
        { x: 50, y: 375 }
      ]
    }    
    ]); 
    await page.waitForChanges(); 
    const status = await root.getStatus();
    expect(status.status).toEqual(200);
    const res: any = [{ "color": "#425cef","name": "Line_1",
      "dataPoints":[
        { "x": 14, "y": 450 },
        { "x": 20, "y": 414 },
        { "x": 30, "y": 520 },
        { "x": 40, "y": 460 },
        { "x": 50, "y": 450 }
      ]},
      { "color": "#379cab","name": "Line_2",
      "dataPoints":[
        { "x": 14, "y": 200 },
        { "x": 20, "y": 350 },
        { "x": 30, "y": 530 },
        { "x": 40, "y": 410 },
        { "x": 50, "y": 375 }
      ]}];
    expect(JSON.parse(root.data)).toEqual(res);
    expect(rootInstance._axisType).toEqual([ 'x', 'y' ]);
    expect(rootInstance._legendNames).toEqual([ 'Line_1', 'Line_2' ]);
    expect(rootInstance._legendThicknesses).toEqual([ 1, 1 ]);
    expect(rootInstance._legendColors).toEqual([ '#425cef','#379cab' ]);
  });
  it('getDataPoints two datasets and markers', async () => {
    root.data = JSON.stringify([{ 
      color: "#425cef",name: "Line_1",
      markerType: "plus",markerSize: 10,markerColor: "#0000ff",
      dataPoints:[
        { x: 14, y: 450 },
        { x: 20, y: 414 },
        { x: 30, y: 520 },
        { x: 40, y: 460 },
        { x: 50, y: 450 }
      ]
    },
    {
      color: "#379cab",name: "Line_2",
      markerType: "circle",markerSize: 10,markerColor: "#00ff00",
      dataPoints:[
        { x: 14, y: 200 },
        { x: 20, y: 350 },
        { x: 30, y: 530 },
        { x: 40, y: 410 },
        { x: 50, y: 375 }
      ]
    }    
    ]); 
    await page.waitForChanges(); 
    const status = await root.getStatus();
    expect(status.status).toEqual(200);
    const res: any = [{ "color": "#425cef","name": "Line_1",
      "markerType": "plus","markerSize": 10,"markerColor": "#0000ff",
      "dataPoints":[
        { "x": 14, "y": 450 },
        { "x": 20, "y": 414 },
        { "x": 30, "y": 520 },
        { "x": 40, "y": 460 },
        { "x": 50, "y": 450 }
      ]},
      { "color": "#379cab","name": "Line_2",
      "markerType": "circle","markerSize": 10,"markerColor": "#00ff00",
      "dataPoints":[
        { "x": 14, "y": 200 },
        { "x": 20, "y": 350 },
        { "x": 30, "y": 530 },
        { "x": 40, "y": 410 },
        { "x": 50, "y": 375 }
      ]}];
    expect(JSON.parse(root.data)).toEqual(res);
    expect(rootInstance._axisType).toEqual([ 'x', 'y' ]);
    expect(rootInstance._legendNames).toEqual([ 'Line_1', 'Line_2' ]);
    expect(rootInstance._legendThicknesses).toEqual([ 1, 1 ]);
    expect(rootInstance._legendColors).toEqual([ '#425cef','#379cab' ]);
  });
  it('_windowResize  without data', async () => {
      spyWindowSize = jest.spyOn(rootInstance,'getWindowSize');
      spyContainerSize = jest.spyOn(rootInstance,'_setContainerSize');
      spyRenderChart = jest.spyOn(rootInstance,'_renderChart');
      root.cstyle="--height:400px;--width:800px;--top:0px;--left:0px;"
      root.data = '';
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
});

