import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';
import { StateProperties } from '../../../global/interfaces/jeep-colorpicker';
import { Viewport } from 'puppeteer';

describe('jeep-cpicker', () => {
  let page: E2EPage;
  let cmp: E2EElement;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    cmp = await page.find('jeep-cpicker');
  });
  afterEach(() => {
    page = null;
    cmp = null;
  });
  it('renders', async () => {
    expect(cmp).toHaveClass('hydrated');
    expect(cmp.getAttribute('color')).toEqual("#ff0000");
    expect(cmp.getAttribute('opacity')).toEqual("1.000");
  });

  it('should work without parameters', async () => {
    expect(cmp).toEqualHtml(`
      <jeep-cpicker class="hydrated" color="#ff0000" opacity="1.000">
        <mock:shadow-root>
          <div class="cpicker-container">
          <div class="cpicker-wrapper" style="top: 60px; left: 80px; width: 420px; height: 300px;">
            <svg height="100%" width="100%">
                <defs>
                  <pattern height="14.399999999999999" id="pattern-transparency" patternUnits="userSpaceOnUse" width="14.399999999999999" x="0" y="0">
                    <rect class="pattern-cube" height="7.199999999999999" width="7.199999999999999" x="0" y="0"></rect>
                    <rect class="pattern-cube" height="7.199999999999999" width="7.199999999999999" x="7.199999999999999" y="7.199999999999999"></rect>
                  </pattern>
                  <lineargradient id="cpickerHue">
                    <stop offset="0" stop-color="#ffffff" stop-opacity="1"></stop>
                    <stop offset="1" stop-color="#ffffff" stop-opacity="0"></stop>
                  </lineargradient>
                  <lineargradient id="cpickerBrightness" x2="0" y2="1">
                    <stop offset="0" stop-color="#000000" stop-opacity="0"></stop>
                    <stop offset="1" stop-color="#000000" stop-opacity="1"></stop>
                  </lineargradient>
                  <lineargradient id="colorSliderGradient" x2="0" y2="1">
                    <stop offset="0" stop-color="hsl(0,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.06" stop-color="hsl(20,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.11" stop-color="hsl(40,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.17" stop-color="hsl(60,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.22" stop-color="hsl(80,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.28" stop-color="hsl(100,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.33" stop-color="hsl(120,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.39" stop-color="hsl(140,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.44" stop-color="hsl(160,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.50" stop-color="hsl(180,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.56" stop-color="hsl(200,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.61" stop-color="hsl(220,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.67" stop-color="hsl(240,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.72" stop-color="hsl(260,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.78" stop-color="hsl(280,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.83" stop-color="hsl(300,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.89" stop-color="hsl(320,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.94" stop-color="hsl(340,100%,50%" stop-opacity="1"></stop>
                    <stop offset="1.00" stop-color="hsl(360,100%,50%" stop-opacity="1"></stop>
                  </lineargradient>
                  <lineargradient id="opacitySliderGradient" x2="0" y2="1">
                    <stop offset="0" stop-color="#ff0000" stop-opacity="1"></stop>
                    <stop offset="1" stop-color="#ff0000" stop-opacity="0"></stop>
                  </lineargradient>
                </defs>
                <rect height="100%" id="cpickerBackground" width="100%"></rect>
                <g id="cpickerHeader">
                  <rect id="cpickerWhite" width="289.800" height="36.000" x="0" y="0"></rect>
                  <rect id="cpickerTransparency" width="289.800" height="36.000" x="0" y="0" fill="url(http://localhost:3333/#pattern-transparency)"></rect>
                  <rect id="cpickerSelColor" width="289.800" height="36.000" x="0" y="0" fill="#ff0000" fill-opacity="1.000"></rect>
                  <rect id="cpickerHueColor" width="130.200" height="36.000" x="289.800" y="0" fill="#ff0000"></rect>
                  <text fill="#ffffff" font-family="Verdana" font-size="15.600" font-weight="bold" id="cpickerText" text-anchor="middle" x="144.900" y="8.5%">
                    #ff0000ff
                  </text>
                </g>
                <g id="cpickerSBColor">
                  <rect id="cpickerPickColor" width="277.200" height="198.000" x="3%" y="45.000" fill="#ff0000"></rect>
                  <rect id="cpickerGradientS" rx="2" ry="2" width="277.200" height="198.000" x="3%" y="45.000" fill="url(http://localhost:3333/#cpickerHue)"></rect>
                  <rect id="cpickerGradientB" rx="2" ry="2" width="277.200" height="198.000" x="3%" y="45.000" fill="url(http://localhost:3333/#cpickerBrightness)"></rect>
                  <circle id="cpickerHandler" r="1.5%" cx="289.800" cy="45.000" fill="none" stroke="#ffffff" stroke-width="2"></circle>
                </g>
                <g id="cpickerOpacity">
                  <rect id="cpickerSliderWhite" width="11%" height="198.000" x="72%" y="45.000"></rect>
                  <rect id="cpickerTransparencySlider" width="11%" height="198.000" x="72%" y="45.000" fill="url(http://localhost:3333/#pattern-transparency)"></rect>
                  <rect id="cpickerSliderOpacity" width="11%" height="198.000" x="72%" y="45.000" fill="url(http://localhost:3333/#opacitySliderGradient)"></rect>
                  <rect id="cpickerOpaSliderHandler" width="11.4%" height="1.2%" x="71.8%" y="43.200" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                </g>
                <g id="cpickerHueColor">
                  <rect id="cpickerSliderHueColor" width="11%" height="198.000" x="86%" y="45.000" fill="url(http://localhost:3333/#colorSliderGradient)"></rect>
                  <rect id="cpickerColSliderHandler" width="11.4%" height="1.2%" x="85.8%" y="43.200" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                </g>
                <g id="cpickerFooter">
                  <rect id="cpickerOkay" width="126.000" height="33.000" x="71.400" y="85%" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                  <rect id="cpickerCancel" width="126.000" height="33.000" x="53%" y="85%"  fill="none" stroke="#ffffff" stroke-width="2"></rect>
                  <text fill="#ffffff" font-family="Verdana" font-size="21.000" id="cpickerOkayText" text-anchor="middle" x="134.400" y="93%">
                    Okay
                  </text>
                  <text fill="#ffffff" font-family="Verdana" font-size="21.000" id="cpickerCancelText" text-anchor="middle" x="285.600" y="93%">
                    Cancel
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </mock:shadow-root>
      </jeep-colorpicker>
    `);
    expect(cmp.innerHTML).toEqualHtml(``);
    expect(cmp.shadowRoot).toEqualHtml(`
      <div class="cpicker-container">
        <div class="cpicker-wrapper" style="top: 60px; left: 80px; width: 420px; height: 300px;">
          <svg height="100%" width="100%">
            <defs>
              <pattern height="14.399999999999999" id="pattern-transparency" patternUnits="userSpaceOnUse" width="14.399999999999999" x="0" y="0">
                <rect class="pattern-cube" height="7.199999999999999" width="7.199999999999999" x="0" y="0"></rect>
                <rect class="pattern-cube" height="7.199999999999999" width="7.199999999999999" x="7.199999999999999" y="7.199999999999999"></rect>
              </pattern>
              <lineargradient id="cpickerHue">
                <stop offset="0" stop-color="#ffffff" stop-opacity="1"></stop>
                <stop offset="1" stop-color="#ffffff" stop-opacity="0"></stop>
              </lineargradient>
              <lineargradient id="cpickerBrightness" x2="0" y2="1">
                <stop offset="0" stop-color="#000000" stop-opacity="0"></stop>
                <stop offset="1" stop-color="#000000" stop-opacity="1"></stop>
              </lineargradient>
              <lineargradient id="colorSliderGradient" x2="0" y2="1">
                <stop offset="0" stop-color="hsl(0,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.06" stop-color="hsl(20,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.11" stop-color="hsl(40,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.17" stop-color="hsl(60,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.22" stop-color="hsl(80,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.28" stop-color="hsl(100,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.33" stop-color="hsl(120,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.39" stop-color="hsl(140,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.44" stop-color="hsl(160,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.50" stop-color="hsl(180,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.56" stop-color="hsl(200,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.61" stop-color="hsl(220,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.67" stop-color="hsl(240,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.72" stop-color="hsl(260,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.78" stop-color="hsl(280,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.83" stop-color="hsl(300,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.89" stop-color="hsl(320,100%,50%" stop-opacity="1"></stop>
                <stop offset="0.94" stop-color="hsl(340,100%,50%" stop-opacity="1"></stop>
                <stop offset="1.00" stop-color="hsl(360,100%,50%" stop-opacity="1"></stop>
              </lineargradient>
              <lineargradient id="opacitySliderGradient" x2="0" y2="1">
                <stop offset="0" stop-color="#ff0000" stop-opacity="1"></stop>
                <stop offset="1" stop-color="#ff0000" stop-opacity="0"></stop>
              </lineargradient>
            </defs>
            <rect height="100%" id="cpickerBackground" width="100%"></rect>
            <g id="cpickerHeader">
              <rect id="cpickerWhite" width="289.800" height="36.000" x="0" y="0"></rect>
              <rect id="cpickerTransparency" width="289.800" height="36.000" x="0" y="0" fill="url(http://localhost:3333/#pattern-transparency)"></rect>
              <rect id="cpickerSelColor" width="289.800" height="36.000" x="0" y="0" fill="#ff0000" fill-opacity="1.000"></rect>
              <rect id="cpickerHueColor" width="130.200" height="36.000" x="289.800" y="0" fill="#ff0000"></rect>
              <text fill="#ffffff" font-family="Verdana" font-size="15.600" font-weight="bold" id="cpickerText" text-anchor="middle" x="144.900" y="8.5%">
                #ff0000ff
              </text>
            </g>
            <g id="cpickerSBColor">
              <rect id="cpickerPickColor" width="277.200" height="198.000" x="3%" y="45.000" fill="#ff0000"></rect>
              <rect id="cpickerGradientS" rx="2" ry="2" width="277.200" height="198.000" x="3%" y="45.000" fill="url(http://localhost:3333/#cpickerHue)"></rect>
              <rect id="cpickerGradientB" rx="2" ry="2" width="277.200" height="198.000" x="3%" y="45.000" fill="url(http://localhost:3333/#cpickerBrightness)"></rect>
              <circle id="cpickerHandler" r="1.5%" cx="289.800" cy="45.000" fill="none" stroke="#ffffff" stroke-width="2"></circle>
            </g>
            <g id="cpickerOpacity">
              <rect id="cpickerSliderWhite" width="11%" height="198.000" x="72%" y="45.000"></rect>
              <rect id="cpickerTransparencySlider" width="11%" height="198.000" x="72%" y="45.000" fill="url(http://localhost:3333/#pattern-transparency)"></rect>
              <rect id="cpickerSliderOpacity" width="11%" height="198.000" x="72%" y="45.000" fill="url(http://localhost:3333/#opacitySliderGradient)"></rect>
              <rect id="cpickerOpaSliderHandler" width="11.4%" height="1.2%" x="71.8%" y="43.200" fill="none" stroke="#ffffff" stroke-width="2"></rect>
            </g>
            <g id="cpickerHueColor">
              <rect id="cpickerSliderHueColor" width="11%" height="198.000" x="86%" y="45.000" fill="url(http://localhost:3333/#colorSliderGradient)"></rect>
              <rect id="cpickerColSliderHandler" width="11.4%" height="1.2%" x="85.8%" y="43.200" fill="none" stroke="#ffffff" stroke-width="2"></rect>
            </g>
            <g id="cpickerFooter">
              <rect id="cpickerOkay" width="126.000" height="33.000" x="71.400" y="85%" fill="none" stroke="#ffffff" stroke-width="2"></rect>
              <rect id="cpickerCancel" width="126.000" height="33.000" x="53%" y="85%"  fill="none" stroke="#ffffff" stroke-width="2"></rect>
              <text fill="#ffffff" font-family="Verdana" font-size="21.000" id="cpickerOkayText" text-anchor="middle" x="134.400" y="93%">
                Okay
              </text>
              <text fill="#ffffff" font-family="Verdana" font-size="21.000" id="cpickerCancelText" text-anchor="middle" x="285.600" y="93%">
                Cancel
              </text>
            </g>
          </svg>
        </div>
      </div>
    `);
  });
});

describe('jeep-cpicker overall', () => {
  let page: E2EPage;

  async function getBoundingClientRect(component:string,selector:string) : Promise<any> {
    const retRect:any = await page.evaluate((component,selector) => {
      const cmpEl = document.querySelector(component);
      const selEl = cmpEl.shadowRoot.querySelector(selector);
      const rect = selEl.getBoundingClientRect();
      return {top:rect.top,left:rect.left,width:rect.width,height:rect.height}},component,selector)
    return retRect;
  }
  async function getSVGFillColor(component:string,selector:string) : Promise<string> {
    const fillColor: string = await page.evaluate((component,selector) => {
      const cmpEl: Element = document.querySelector(component);
      const selEl:SVGElement = cmpEl.shadowRoot.querySelector(selector);
      const fillColor:string = window.getComputedStyle(selEl, null).getPropertyValue('fill');
      return fillColor;
    },component,selector)
    return fillColor;
  }

  beforeEach(async () => {
    page = await newE2EPage(); 
    const viewPort: Viewport = {width:360,height:640, deviceScaleFactor: 1};
    page.setViewport(viewPort);
  });
  it('should display with default color and opacity', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    expect(await cmp.getProperty('color')).toEqual("#ff0000");
    expect(await cmp.getProperty('opacity')).toEqual("1.000");
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    await page.waitForChanges();
    expect(states.color.hex.hex).toEqual("#ff0000");
    expect(states.colorHeadline).toEqual("#ff0000ff");
    expect(states.pickerHandler.x).toBeCloseTo(173.88);
    expect(states.pickerHandler.y).toBeCloseTo(27);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color "#17bb17" and default opacity', async () => {
    await page.setContent('<jeep-cpicker color="#17bb17"></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    expect(await cmp.getProperty('color')).toEqual("#17bb17");
    expect(await cmp.getProperty('opacity')).toEqual("1.000");
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    await page.waitForChanges();
    expect(states.color.hex.hex).toEqual("#17bb17");
    expect(states.colorHeadline).toEqual("#17bb17ff");
    expect(states.pickerHandler.x).toBeCloseTo(153.424);
    expect(states.pickerHandler.y).toBeCloseTo(58.680);
    expect(states.hueHandlerY).toBeCloseTo(65.52);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color "#17bb17" and opacity "0.750"', async () => {
    await page.setContent('<jeep-cpicker color="#17bb17" opacity="0.750"></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    expect(await cmp.getProperty('color')).toEqual("#17bb17");
    expect(await cmp.getProperty('opacity')).toEqual("0.750");
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    await page.waitForChanges();
    expect(states.color.hex.hex).toEqual("#17bb17");
    expect(states.colorHeadline).toEqual("#17bb17bf");
    expect(states.pickerHandler.x).toBeCloseTo(153.424);
    expect(states.pickerHandler.y).toBeCloseTo(58.680);
    expect(states.hueHandlerY).toBeCloseTo(65.52);
    expect(states.opaHandlerY).toBeCloseTo(55.62);
  });
  it('should display with default css variables', async () => {
    await page.setContent('<jeep-cpicker color="#17bb17" opacity="0.525"></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    expect(await cmp.getProperty('color')).toEqual("#17bb17");
    expect(await cmp.getProperty('opacity')).toEqual("0.525");
    const rect:any = await getBoundingClientRect('jeep-cpicker','.cpicker-wrapper'); 
    expect(rect.top).toEqual(64);
    expect(rect.left).toEqual(36);
    expect(rect.width).toEqual(252);
    expect(rect.height).toEqual(180);
    const bgColor:string = await getSVGFillColor('jeep-cpicker','#cpickerBackground'); 
    expect(bgColor).toEqual("rgb(36, 36, 36)");
  });
  it('should display with css variable --cpicker-top set to 20vh', async () => {
    await page.setContent('<jeep-cpicker style="--cpicker-top:20vh;" color="#17bb17" opacity="0.525"></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    expect(await cmp.getProperty('color')).toEqual("#17bb17");
    expect(await cmp.getProperty('opacity')).toEqual("0.525");
    const rect:any = await getBoundingClientRect('jeep-cpicker','.cpicker-wrapper'); 
    expect(rect.top).toEqual(128);
    expect(rect.left).toEqual(36);
    expect(rect.width).toEqual(252);
    expect(rect.height).toEqual(180);
    const bgColor:string = await getSVGFillColor('jeep-cpicker','#cpickerBackground'); 
    expect(bgColor).toEqual("rgb(36, 36, 36)");
  });
  it('should display with css variable --cpicker-left set to 5vw', async () => {
    await page.setContent('<jeep-cpicker style="--cpicker-left:5vw;" color="#17bb17" opacity="0.525"></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    expect(await cmp.getProperty('color')).toEqual("#17bb17");
    expect(await cmp.getProperty('opacity')).toEqual("0.525");
    const rect:any = await getBoundingClientRect('jeep-cpicker','.cpicker-wrapper'); 
    expect(rect.top).toEqual(64);
    expect(rect.left).toEqual(18);
    expect(rect.width).toEqual(252);
    expect(rect.height).toEqual(180);
    const bgColor:string = await getSVGFillColor('jeep-cpicker','#cpickerBackground'); 
    expect(bgColor).toEqual("rgb(36, 36, 36)");
  });
  it('should display with css variable --cpicker-width set to 80vw', async () => {
    await page.setContent('<jeep-cpicker style="--cpicker-width:80vw;" color="#17bb17" opacity="0.525"></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    expect(await cmp.getProperty('color')).toEqual("#17bb17");
    expect(await cmp.getProperty('opacity')).toEqual("0.525");
    const rect:any = await getBoundingClientRect('jeep-cpicker','.cpicker-wrapper'); 
    expect(rect.top).toEqual(64);
    expect(rect.left).toEqual(36);
    expect(rect.width).toEqual(288);
    expect(rect.height).toEqual(180);
    const bgColor:string = await getSVGFillColor('jeep-cpicker','#cpickerBackground'); 
    expect(bgColor).toEqual("rgb(36, 36, 36)");
  });
  it('should display with css variable --cpicker-height set to 40vh', async () => {
    await page.setContent('<jeep-cpicker style="--cpicker-height:40vh;" color="#17bb17" opacity="0.525"></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    expect(await cmp.getProperty('color')).toEqual("#17bb17");
    expect(await cmp.getProperty('opacity')).toEqual("0.525");
    const rect:any = await getBoundingClientRect('jeep-cpicker','.cpicker-wrapper'); 
    expect(rect.top).toEqual(64);
    expect(rect.left).toEqual(36);
    expect(rect.width).toEqual(252);
    expect(rect.height).toEqual(256);
    const bgColor:string = await getSVGFillColor('jeep-cpicker','#cpickerBackground'); 
    expect(bgColor).toEqual("rgb(36, 36, 36)");
  });
  it('should display with css variable --cpicker-background-color set to #ff0000', async () => {
    await page.setContent('<jeep-cpicker style="--cpicker-background-color:#ff0000;" color="#17bb17" opacity="0.525"></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    expect(await cmp.getProperty('color')).toEqual("#17bb17");
    expect(await cmp.getProperty('opacity')).toEqual("0.525");
    const rect:any = await getBoundingClientRect('jeep-cpicker','.cpicker-wrapper'); 
    expect(rect.top).toEqual(64);
    expect(rect.left).toEqual(36);
    expect(rect.width).toEqual(252);
    expect(rect.height).toEqual(180);
    const bgColor:string = await getSVGFillColor('jeep-cpicker','#cpickerBackground'); 
    expect(bgColor).toEqual("rgb(255, 0, 0)");
  });
  it('should display with all css variables set to new values', async () => {
    await page.setContent('<jeep-cpicker\
     style="--cpicker-top:15vh;--cpicker-left:5vw;--cpicker-width:40vw;--cpicker-height:30vh;\
     --cpicker-background-color:#ffff00;"\
     color="#17bb17" opacity="0.525"></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    expect(await cmp.getProperty('color')).toEqual("#17bb17");
    expect(await cmp.getProperty('opacity')).toEqual("0.525");
    const rect:any = await getBoundingClientRect('jeep-cpicker','.cpicker-wrapper'); 
    expect(rect.top).toEqual(96);
    expect(rect.left).toEqual(18);
    expect(rect.width).toEqual(144);
    expect(rect.height).toEqual(192);
    const bgColor:string = await getSVGFillColor('jeep-cpicker','#cpickerBackground'); 
    expect(bgColor).toEqual("rgb(255, 255, 0)");
  });
  it('should change picker-wrapper size when trigerring window resize event', async () => {
    await page.setContent('<jeep-cpicker\
     style="--cpicker-top:15vh;--cpicker-left:5vw;--cpicker-width:40vw;--cpicker-height:30vh;\
     --cpicker-background-color:#ffff00;"\
     color="#17bb17" opacity="0.525"></jeep-cpicker>');
    const viewPort: Viewport = {width:1024,height:1366, deviceScaleFactor: 1};
    await page.setViewport(viewPort);
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.waitForChanges();
    const rect:any = await getBoundingClientRect('jeep-cpicker','.cpicker-wrapper'); 
    expect(rect.top).toEqual(204.890625);
    expect(rect.left).toEqual(51.1875);
    expect(rect.width).toEqual(409.59375);
    expect(rect.height).toEqual(409.796875);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#17bb1786');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(249.375);
    expect(states.pickerHandler.y).toBeCloseTo(133.5957);
    expect(states.hueHandlerY).toBeCloseTo(149.1672);
    expect(states.opaHandlerY).toBeCloseTo(187.4835);
  });
  it('should display with color text type = "hex" on init', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    await page.waitForChanges();
    expect(states.colorHeadline).toEqual('#ff0000ff');
    expect(states.textType).toEqual('hex');
  });
  it('should display with color text type = "rgb" on mouse click(85,78)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(85,78);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('RGBA(255,0,0,1.000)');
    expect(states.textType).toEqual('rgb');
  });
  it('should display with color text type = "hsl" on twice mouse click(85,78)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(85,78);
    await page.mouse.click(85,78);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('HSLA(0,100%,50%,1.000)');
    expect(states.textType).toEqual('hsl');
  });
  it('should display with color text type = "hsb" on third mouse click(85,78)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(85,78);
    await page.mouse.click(85,78);
    await page.mouse.click(85,78);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('HSBA(0,100%,100%,1.000)');
    expect(states.textType).toEqual('hsb');
  });
  it('should not change the color text type = "rgb" on mouse move(110,80)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.down({button:'left'})
    await page.mouse.click(85,78);
    await page.mouse.move(110,80);
    await page.mouse.up({button:'left'})
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('RGBA(255,0,0,1.000)');
    expect(states.textType).toEqual('rgb');
  });
  it('should display with color text type = "hex" on fourth mouse click(85,78)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(85,78);
    await page.mouse.click(85,78);
    await page.mouse.click(85,78);
    await page.mouse.click(85,78);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#ff0000ff');
    expect(states.textType).toEqual('hex');
  });
  it('should display with color text = "#ffffff" on mouse click(44,91)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(45,91);
    await page.waitForChanges();
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#ffffffff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(7.56);
    expect(states.pickerHandler.y).toBeCloseTo(27);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color text = "#000000" on mouse click(209,209)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(209,209);
    await page.waitForChanges();
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#000000ff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(173.88);
    expect(states.pickerHandler.y).toBeCloseTo(145.8);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });

  it('should display with color text = "#ff0000" on mouse click(209,92)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(209,92);
    await page.waitForChanges();
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#ff0000ff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(173.88);
    expect(states.pickerHandler.y).toBeCloseTo(27);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color text = "#000000" on mouse click(45,209)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(45,209);
    await page.waitForChanges();
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#000000ff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(7.56);
    expect(states.pickerHandler.y).toBeCloseTo(145.8);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color text = "#ff8080" on mouse click(127,92)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(127,92);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#ff8080ff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(90.72);
    expect(states.pickerHandler.y).toBeCloseTo(27);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color text = "#800000" on mouse click(209,150.5)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(209,150.5);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#800000ff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(173.88);
    expect(states.pickerHandler.y).toBeCloseTo(86.4);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color text = "#804040" on mouse click(127,150.5)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(127,150.5);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#804040ff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(90.72);
    expect(states.pickerHandler.y).toBeCloseTo(86.4);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color text = "#bf3030" on mouse click(168,121.25)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(168,121.25);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#bf3030ff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(132.3);
    expect(states.pickerHandler.y).toBeCloseTo(56.7);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color text = "#eb1c1cff" on mouse click(168,121.25) & mouse move(190,100)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(168,121.25);
    await page.mouse.down({button:'left'})
    await page.mouse.move(168,121.25);
    await page.mouse.move(190,100);
    await page.mouse.up({button:'left'})
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#eb1c1cff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(153.9216);
    expect(states.pickerHandler.y).toBeCloseTo(36.504);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color text = "#bf0000ff" on mouse click(168,121.25) & mouse move outside the color area', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(168,121.25);
    await page.mouse.down({button:'left'})
    await page.mouse.move(168,121.25);
    await page.mouse.move(209,121.25);
    await page.mouse.move(250,121.25);
    await page.mouse.up({button:'left'})
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#bf0000ff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(173.88);
    expect(states.pickerHandler.y).toBeCloseTo(56.7);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color text = "#ff0000ff" on mouse click(228,92)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(228,92);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#ff0000ff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(173.88);
    expect(states.pickerHandler.y).toBeCloseTo(27);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color text = "#ff0000ab" on mouse click(228,130)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(228,130);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#ff0000ab');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(173.88);
    expect(states.pickerHandler.y).toBeCloseTo(27);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(64.92);
  });
  it('should display with color text = "#ff00004b" on mouse click(228,175)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(228,175);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#ff00004b');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(173.88);
    expect(states.pickerHandler.y).toBeCloseTo(27);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(109.92);
  });
  it('should display with color text = "#ff000000" on mouse click(228,209)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(228,209);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#ff000000');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(173.88);
    expect(states.pickerHandler.y).toBeCloseTo(27);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(144.72);
  });
  it('should display with color text = "#ff0000ff" on mouse click(228,205) & mouse move outside the opacity area', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(228,205);
    await page.mouse.down({button:'left'})
    await page.mouse.move(228,205);
    await page.mouse.move(228,92);
    await page.mouse.move(228,70);
    await page.mouse.up({button:'left'})
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#ff0000ff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(173.88);
    expect(states.pickerHandler.y).toBeCloseTo(27);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color text = "#ff0000ff" on mouse click(267,92)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(267,92);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#ff0000ff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(173.88);
    expect(states.pickerHandler.y).toBeCloseTo(27);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color text = "#d4ff00ff" on mouse click(267,114)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(267,114);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#d4ff00ff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(173.88);
    expect(states.pickerHandler.y).toBeCloseTo(27);
    expect(states.hueHandlerY).toBeCloseTo(49.02);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color text = "#3300ffff" on mouse click(267,174)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(267,174);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#3300ffff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(173.88);
    expect(states.pickerHandler.y).toBeCloseTo(27);
    expect(states.hueHandlerY).toBeCloseTo(109.08);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color text = "#ff0000ff" on mouse click(267,209)', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(267,209);
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#ff0000ff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(173.88);
    expect(states.pickerHandler.y).toBeCloseTo(27);
    expect(states.hueHandlerY).toBeCloseTo(144.72);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });
  it('should display with color text = "#ff0000ff" on mouse click(267,165) & mouse move outside the hue area', async () => {
    await page.setContent('<jeep-cpicker></jeep-cpicker>');
    const cmp: E2EElement = await page.find('jeep-cpicker');
    await page.mouse.click(267,165);
    await page.mouse.down({button:'left'})
    await page.mouse.move(267,165);
    await page.mouse.move(267,92);
    await page.mouse.move(267,70);
    await page.mouse.up({button:'left'})
    const states: StateProperties = await cmp.callMethod('getStateProperties');
    expect(states.colorHeadline).toEqual('#ff0000ff');
    expect(states.textType).toEqual('hex');
    expect(states.pickerHandler.x).toBeCloseTo(173.88);
    expect(states.pickerHandler.y).toBeCloseTo(27);
    expect(states.hueHandlerY).toBeCloseTo(25.92);
    expect(states.opaHandlerY).toBeCloseTo(25.92);
  });

});

