import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';
import { EventSpy } from '@stencil/core/dist/declarations';
import { StyleTagOptions, Viewport } from 'puppeteer';

describe('jeep-colorpicker', () => {
  let page: E2EPage;
  let cmp: E2EElement;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<jeep-colorpicker></jeep-colorpicker>');
    cmp = await page.find('jeep-colorpicker');
  });
  afterEach(() => {
    page = null;
    cmp = null;
  });

  it('renders', async () => {
    expect(cmp).toHaveClass('hydrated');
    expect(cmp.getAttribute('color')).toEqual("#ff0000");
    expect(cmp.getAttribute('opacity')).toEqual("1");
  });

  it('should work without parameters', async () => {
    await cmp.callMethod('init');
    await page.waitForChanges();

    expect(cmp).toEqualHtml(`
      <jeep-colorpicker class="hydrated" color="#ff0000" opacity="1">
        <mock:shadow-root>
          <div class="colorpicker-container">
            <button class="colorpicker-button">Color Picker</button>
          </div>
        </mock:shadow-root>
      </jeep-colorpicker>
    `);
    expect(cmp.innerHTML).toEqualHtml(``);
    expect(cmp.shadowRoot).toEqualHtml(`
      <div class="colorpicker-container">
        <button class="colorpicker-button">Color Picker</button>
      </div>
  ` );
  });

  it('renders changes to the color property', async () => {
    cmp.setProperty('color', '#a8bed6');
    await cmp.callMethod('init');
    await page.waitForChanges();
  expect(cmp.getAttribute('color')).toEqual("#a8bed6");
    expect(cmp.getAttribute('opacity')).toEqual("1");
  });
  it('renders changes to the opacity property', async () => {
    cmp.setProperty('opacity', '0.525');
    await cmp.callMethod('init');
    await page.waitForChanges();
    expect(cmp.getAttribute('color')).toEqual("#ff0000");
    expect(cmp.getAttribute('opacity')).toEqual("0.525");
  });
  it('renders changes to the color & opacity properties', async () => {
    cmp.setProperty('color', '#a8bed6');
    cmp.setProperty('opacity', '0.525');
    await cmp.callMethod('init');
    await page.waitForChanges();
    expect(cmp.getAttribute('color')).toEqual("#a8bed6");
    expect(cmp.getAttribute('opacity')).toEqual("0.525");
  });

  it('renders changes to the buttons [Color] properties', async () => {
    cmp.setProperty('buttons', '[Color]');
    await cmp.callMethod('init');
    await page.waitForChanges();
    await cmp.callMethod('open');
    await page.waitForChanges();
    expect(cmp).toEqualHtml(`
      <jeep-colorpicker class="hydrated" color="#ff0000" opacity="1" buttons="[Color]">
        <mock:shadow-root>
          <div class="colorpicker-container">
            <jeep-cpicker class="hydrated" color="#ff0000" opacity="1" buttons="[Okay,Cancel]"></jeep-cpicker>
          </div>
        </mock:shadow-root>
      </jeep-colorpicker>
    `);
  });
  it('renders changes to the buttons [Color,Valid] properties', async () => {
    cmp.setProperty('buttons', '[Color,Valid]');
    await cmp.callMethod('init');
    await page.waitForChanges();
    await cmp.callMethod('open');
    await page.waitForChanges();
    expect(cmp).toEqualHtml(`
      <jeep-colorpicker class="hydrated" color="#ff0000" opacity="1" buttons="[Color,Valid]">
        <mock:shadow-root>
          <div class="colorpicker-container">
            <jeep-cpicker class="hydrated" color="#ff0000" opacity="1" buttons="[Valid,Cancel]"></jeep-cpicker>
          </div>
        </mock:shadow-root>
      </jeep-colorpicker>
    `);
  });
  it('renders changes to the buttons [Color,Valid,Dismiss] properties', async () => {
    cmp.setProperty('buttons', '[Color,Valid,Dismiss]');
    await cmp.callMethod('init');
    await page.waitForChanges();
    await cmp.callMethod('open');
    await page.waitForChanges();
    expect(cmp).toEqualHtml(`
      <jeep-colorpicker class="hydrated" color="#ff0000" opacity="1" buttons="[Color,Valid,Dismiss]">
        <mock:shadow-root>
          <div class="colorpicker-container">
            <jeep-cpicker class="hydrated" color="#ff0000" opacity="1" buttons="[Valid,Dismiss]"></jeep-cpicker>
          </div>
        </mock:shadow-root>
      </jeep-colorpicker>
    `);
  });
  it('renders changes to the hidebuttons properties', async () => {
    cmp.setProperty('hidebuttons', true);
    await cmp.callMethod('init');
    await page.waitForChanges();
    await cmp.callMethod('open');
    await page.waitForChanges();
    expect(cmp).toEqualHtml(`
      <jeep-colorpicker class="hydrated" color="#ff0000" opacity="1" hidebuttons>
        <mock:shadow-root>
          <div class="colorpicker-container">
            <jeep-cpicker class="hydrated" color="#ff0000" opacity="1" hidebuttons></jeep-cpicker>
          </div>
        </mock:shadow-root>
      </jeep-colorpicker>
    `);
  });
  it('renders changes to the hideheader properties', async () => {
    cmp.setProperty('hideheader', true);
    await cmp.callMethod('init');
    await page.waitForChanges();
    await cmp.callMethod('open');
    await page.waitForChanges();
    expect(cmp).toEqualHtml(`
      <jeep-colorpicker class="hydrated" color="#ff0000" opacity="1" hideheader>
        <mock:shadow-root>
          <div class="colorpicker-container">
            <jeep-cpicker class="hydrated" color="#ff0000" opacity="1"  buttons="[Okay,Cancel]" hideheader></jeep-cpicker>
          </div>
        </mock:shadow-root>
      </jeep-colorpicker>
    `);
  });
  it('renders changes to the hideopacity properties when opacity not given', async () => {
    cmp.setProperty('hideopacity', true);
    await cmp.callMethod('init');
    await page.waitForChanges();
    await cmp.callMethod('open');
    await page.waitForChanges();
    expect(cmp).toEqualHtml(`
      <jeep-colorpicker class="hydrated" color="#ff0000" opacity="1" hideopacity>
        <mock:shadow-root>
          <div class="colorpicker-container">
            <jeep-cpicker class="hydrated" color="#ff0000" opacity="1"  buttons="[Okay,Cancel]" hideopacity></jeep-cpicker>
          </div>
        </mock:shadow-root>
      </jeep-colorpicker>
    `);
  });
  it('renders changes to the hideopacity properties when opacity is given', async () => {
    cmp.setProperty('opacity', "0.45");
    cmp.setProperty('hideopacity', true);
    await cmp.callMethod('init');
    await page.waitForChanges();
    await cmp.callMethod('open');
    await page.waitForChanges();
    expect(cmp).toEqualHtml(`
      <jeep-colorpicker class="hydrated" color="#ff0000" opacity="0.45" hideopacity>
        <mock:shadow-root>
          <div class="colorpicker-container">
            <jeep-cpicker class="hydrated" color="#ff0000" opacity="1"  buttons="[Okay,Cancel]" hideopacity></jeep-cpicker>
          </div>
        </mock:shadow-root>
      </jeep-colorpicker>
    `);
  });
  it('should display colorpicker-button when initiates', async () => {
    const butEl: E2EElement = await page.find('jeep-colorpicker >>> .colorpicker-button');
    expect(butEl).toBeTruthy();
    expect(butEl).toEqualText(`Color Picker`);
  });

  it('should not display jeep-cpicker when initiates', async () => {
    const pickEl: E2EElement = await page.find('jeep-colorpicker >>> jeep-cpicker');
    expect(pickEl).toBeNull();
  });
  it('should display jeep-cpicker when method "open" is call', async () => {
    await cmp.callMethod('open');
    await page.waitForChanges();
    const pickEl: E2EElement = await page.find('jeep-colorpicker >>> jeep-cpicker');
    expect(pickEl).toBeTruthy();
    expect(cmp).toEqualHtml(`
      <jeep-colorpicker class="hydrated" color="#ff0000" opacity="1">
        <mock:shadow-root>
          <div class="colorpicker-container">
            <jeep-cpicker class="hydrated" color="#ff0000" opacity="1" buttons="[Okay,Cancel]"></jeep-cpicker>
          </div>
        </mock:shadow-root>
      </jeep-colorpicker>
    `);
    expect(cmp.innerHTML).toEqualHtml(``);
    expect(cmp.shadowRoot).toEqualHtml(`
      <div class="colorpicker-container">
        <jeep-cpicker class="hydrated" color="#ff0000" opacity="1" buttons="[Okay,Cancel]"></jeep-cpicker>
      </div>
  ` );
  });
  it('should define cpicker properties without color, opacity properties given when calling open method', async () => {
    await cmp.callMethod('open');
    await page.waitForChanges();
    const pickEl: E2EElement = await page.find('jeep-colorpicker >>> jeep-cpicker');
    expect(await pickEl.getProperty('color')).toEqual("#ff0000");
    expect(await pickEl.getProperty('opacity')).toEqual("1");
  });
  it('should define cpicker properties with color, opacity properties given when calling open method', async () => {
    cmp.setProperty('color', '#a8bed6');
    cmp.setProperty('opacity', '0.525');
    await cmp.callMethod('init');
    await page.waitForChanges();
    await cmp.callMethod('open');
    await page.waitForChanges();
    const pickEl: E2EElement = await page.find('jeep-colorpicker >>> jeep-cpicker');
    expect(await pickEl.getProperty('color')).toEqual("#a8bed6");
    expect(await pickEl.getProperty('opacity')).toEqual("0.525");
  });
  it('should define cpicker properties with buttons [Okay,Cancel] properties when buttons [Color] given & calling open method', async () => {
    cmp.setProperty('buttons', '[Color]');
    await cmp.callMethod('init');
    await page.waitForChanges();
    await cmp.callMethod('open');
    await page.waitForChanges();
    const pickEl: E2EElement = await page.find('jeep-colorpicker >>> jeep-cpicker');
    expect(await pickEl.getProperty('buttons')).toEqual("[Okay,Cancel]");
  });
  it('should define cpicker properties with buttons [Valid,Cancel] properties when buttons [Color,Valid] given & calling open method', async () => {
    cmp.setProperty('buttons', '[Color,Valid]');
    await cmp.callMethod('init');
    await page.waitForChanges();
    await cmp.callMethod('open');
    await page.waitForChanges();
    const pickEl: E2EElement = await page.find('jeep-colorpicker >>> jeep-cpicker');
    expect(await pickEl.getProperty('buttons')).toEqual("[Valid,Cancel]");
  });
  it('should define cpicker properties with buttons [Valid,Dismiss] properties when buttons [Color,Valid,Dismiss] given & calling open method', async () => {
    cmp.setProperty('buttons', '[Color,Valid,Dismiss]');
    await cmp.callMethod('init');
    await page.waitForChanges();
    await cmp.callMethod('open');
    await page.waitForChanges();
    const pickEl: E2EElement = await page.find('jeep-colorpicker >>> jeep-cpicker');
    expect(await pickEl.getProperty('buttons')).toEqual("[Valid,Dismiss]");
  });

  it('should fire "jeepColorpickerOpen" event when calling open method', async () => {
    const openCpickerSpy:EventSpy = await page.spyOnEvent('jeepColorpickerOpen');
    cmp.setProperty('color', '#a8bed6');
    cmp.setProperty('opacity', '0.525');
    await cmp.callMethod('init');
    await page.waitForChanges();
    await cmp.callMethod('open');
    await page.waitForChanges();
    expect(openCpickerSpy).toHaveReceivedEventTimes(1);
  });
  it('should fire "jeepColorpickerClose" event when calling close method', async () => {
    const closeCpickerSpy:EventSpy = await page.spyOnEvent('jeepColorpickerClose');
    const color: any = {hex: {hex:"#17bb17", hexa: "#17bb1780"}, 
    rgb: {r: 23, g: 187, b: 23, rgb: "RGB(23,187,23)", rgba: "RGBA(23,187,23,0.500)"}, 
    hsb: {h: 120, s: 88, b: 73, hsb: "HSB(120,88%,73%)", hsba: "HSBA(120,88%,73%,0.500)"}, 
    hsl: {h: 120, s: 78, l: 41, hsl: "HSL(120,78%,41%)", hsla: "HSLA(120,78%,41%,0.500)"}, 
    opacity: 0.5};
    cmp.setProperty('color', '#a8bed6');
    cmp.setProperty('opacity', '0.525');
    await cmp.callMethod('init');
    await page.waitForChanges();
    await cmp.callMethod('open');
    await page.waitForChanges();
    await cmp.callMethod('close',{color:color,button:1});
    await page.waitForChanges();
    expect(closeCpickerSpy).toHaveReceivedEventTimes(1);
  });
  it('should fire "jeepColorpickerClose" events when triggering "jeepCpickerClose" event', async () => {
    const onColorSpy:EventSpy = await page.spyOnEvent('jeepColorpickerGetColor');
    const closeCpickerSpy:EventSpy = await page.spyOnEvent('jeepColorpickerClose');
    const color: any = {hex: {hex:"#17bb17", hexa: "#17bb1780"}, 
    rgb: {r: 23, g: 187, b: 23, rgb: "RGB(23,187,23)", rgba: "RGBA(23,187,23,0.500)"}, 
    hsb: {h: 120, s: 88, b: 73, hsb: "HSB(120,88%,73%)", hsba: "HSBA(120,88%,73%,0.500)"}, 
    hsl: {h: 120, s: 78, l: 41, hsl: "HSL(120,78%,41%)", hsla: "HSLA(120,78%,41%,0.500)"}, 
    opacity: 0.500};
    cmp.setProperty('color', '#17bb17');
    cmp.setProperty('opacity', '0.500');
    await cmp.callMethod('init');
    await page.waitForChanges();
    await cmp.callMethod('open');
    await page.waitForChanges();
    cmp.triggerEvent('jeepCpickerClose',{detail:{color:color,button:1}});
    await page.waitForChanges();
    expect(onColorSpy).toHaveReceivedEventTimes(0);
    expect(closeCpickerSpy).toHaveReceivedEventTimes(1);
    expect(closeCpickerSpy).toHaveReceivedEventDetail({color:color,button:1});
  });
  
});

describe('jeep-colorpicker overall', () => {
  let page: E2EPage;

  async function getBoundingClientRect(colorpicker:string,cpicker:string,selector:string) : Promise<any> {
    const retRect:any = await page.evaluate((colorpicker,cpicker,selector) => {
      const cmpEl = document.querySelector(colorpicker);
      const cpickerEl = cmpEl.shadowRoot.querySelector(cpicker);
      const selEl = cpickerEl.shadowRoot.querySelector(selector);
      const rect = selEl.getBoundingClientRect();
      return {top:rect.top,left:rect.left,width:rect.width,height:rect.height}},colorpicker,cpicker,selector)
    return retRect;
  }
  async function getSVGFillColor(colorpicker:string,cpicker:string,selector:string) : Promise<string> {
    const fillColor: string = await page.evaluate((colorpicker,cpicker,selector) => {
      const cmpEl: Element = document.querySelector(colorpicker);
      const cpickerEl: Element = cmpEl.shadowRoot.querySelector(cpicker);
      const selEl:SVGElement = cpickerEl.shadowRoot.querySelector(selector);
      const fillColor:string = window.getComputedStyle(selEl, null).getPropertyValue('fill');
      return fillColor;
    },colorpicker,cpicker,selector)
    return fillColor;
  }
  async function getHeadlineText(colorpicker:string,cpicker:string,selector:string) : Promise<string> {
    const selColor: string = await page.evaluate((colorpicker,cpicker,selector) => {
      const cmpEl: Element = document.querySelector(colorpicker);
      const cpickerEl: Element = cmpEl.shadowRoot.querySelector(cpicker);
      const selEl:SVGElement = cpickerEl.shadowRoot.querySelector(selector);

      const selColor:string = selEl.textContent;
      return selColor;
    },colorpicker,cpicker,selector)
    return selColor;
  }

  beforeEach(async () => {
    page = await newE2EPage(); 
    const viewPort: Viewport = {width:360,height:640, deviceScaleFactor: 1};
    page.setViewport(viewPort);

  });  
  it('should display cpicker when colorpicker-button is clicked & default css properties', async () => {
    await page.setContent('<jeep-colorpicker color="#17bb17" opacity="0.525"></jeep-colorpicker>');
    const button: E2EElement = await page.find('jeep-colorpicker >>> .colorpicker-button');
    button.click();
    await page.waitForChanges();
    const pickEl: E2EElement = await page.find('jeep-colorpicker >>> jeep-cpicker');
    expect(await pickEl.getProperty('color')).toEqual("#17bb17");
    expect(await pickEl.getProperty('opacity')).toEqual("0.525");
    const rect:any = await getBoundingClientRect('jeep-colorpicker','jeep-cpicker','.cpicker-wrapper'); 
    expect(rect.top).toEqual(64);
    expect(rect.left).toEqual(36);
    expect(rect.width).toEqual(252);
    expect(rect.height).toEqual(180);
    const bgColor:string = await getSVGFillColor('jeep-colorpicker','jeep-cpicker','#cpickerBackground'); 
    expect(bgColor).toEqual("rgb(36, 36, 36)");
  });
  it('should display cpicker when colorpicker-button is clicked & global css properties given', async () => {
    await page.setContent('<jeep-colorpicker color="#17bb17" opacity="0.525"></jeep-colorpicker>');
    const opts:StyleTagOptions = {content:':root{--gcolorpicker-top:5vh;--gcolorpicker-left:5vw;--gcolorpicker-width:60vw;\
      --gcolorpicker-height:40vh;--gcolorpicker-background-color:#4a4a4a;}'};
    page.addStyleTag(opts);
    const button: E2EElement = await page.find('jeep-colorpicker >>> .colorpicker-button');
    button.click();
    await page.waitForChanges();
    const pickEl: E2EElement = await page.find('jeep-colorpicker >>> jeep-cpicker');
    expect(await pickEl.getProperty('color')).toEqual("#17bb17");
    expect(await pickEl.getProperty('opacity')).toEqual("0.525");
    const rect:any = await getBoundingClientRect('jeep-colorpicker','jeep-cpicker','.cpicker-wrapper'); 
    expect(rect.top).toEqual(32);
    expect(rect.left).toEqual(18);
    expect(rect.width).toEqual(216);
    expect(rect.height).toEqual(256);
    const bgColor:string = await getSVGFillColor('jeep-colorpicker','jeep-cpicker','#cpickerBackground'); 
    expect(bgColor).toEqual("rgb(74, 74, 74)");
  });

  it('should display cpicker when colorpicker-button is clicked & local css properties given', async () => {
    await page.setContent('<jeep-colorpicker\
     style="--colorpicker-top:15vh;--colorpicker-left:5vw;--colorpicker-width:40vw;--colorpicker-height:30vh;\
     --colorpicker-background-color:#ffff00;"\
     color="#17bb17" opacity="0.525"></jeep-colorpicker>');
    const button: E2EElement = await page.find('jeep-colorpicker >>> .colorpicker-button');
    button.click();
    await page.waitForChanges();
    const pickEl: E2EElement = await page.find('jeep-colorpicker >>> jeep-cpicker');
    expect(await pickEl.getProperty('color')).toEqual("#17bb17");
    expect(await pickEl.getProperty('opacity')).toEqual("0.525");
    const rect:any = await getBoundingClientRect('jeep-colorpicker','jeep-cpicker','.cpicker-wrapper'); 
    expect(rect.top).toEqual(96);
    expect(rect.left).toEqual(18);
    expect(rect.width).toEqual(144);
    expect(rect.height).toEqual(192);
    const bgColor:string = await getSVGFillColor('jeep-colorpicker','jeep-cpicker','#cpickerBackground'); 
    expect(bgColor).toEqual("rgb(255, 255, 0)");
  });

  it('should select color "#3c9699ba" when going trough the full process & click on Okay button', async () => {
    await page.setContent('<jeep-colorpicker></jeep-colorpicker>');
    const onColorSpy:EventSpy = await page.spyOnEvent('jeepColorpickerGetColor');
    const closeCpickerSpy:EventSpy = await page.spyOnEvent('jeepColorpickerClose');
    const openCpickerSpy:EventSpy = await page.spyOnEvent('jeepColorpickerOpen');
    const button: E2EElement = await page.find('jeep-colorpicker >>> .colorpicker-button');
    button.click();
    await page.waitForChanges();
    expect(openCpickerSpy).toHaveReceivedEventTimes(1);
    const pickEl: E2EElement = await page.find('jeep-colorpicker >>> jeep-cpicker');
    expect(await pickEl.getProperty('color')).toEqual("#ff0000");
    expect(await pickEl.getProperty('opacity')).toEqual("1");
    const rect:any = await getBoundingClientRect('jeep-colorpicker','jeep-cpicker','.cpicker-wrapper'); 
    expect(rect.top).toEqual(64);
    expect(rect.left).toEqual(36);
    expect(rect.width).toEqual(252);
    expect(rect.height).toEqual(180);
    const bgColor:string = await getSVGFillColor('jeep-colorpicker','jeep-cpicker','#cpickerBackground'); 
    expect(bgColor).toEqual("rgb(36, 36, 36)");
    // click on the color gradient picker
    await page.mouse.click(145,139);
    // get the selected color from the headline text
    await page.waitForChanges();
    let selColor:string = await getHeadlineText('jeep-colorpicker','jeep-cpicker','#cpickerText');
    expect(selColor).toEqual('#993c3cff');
    // click on the Opacity picker
    await page.mouse.click(229,123);
    await page.waitForChanges();
    selColor = await getHeadlineText('jeep-colorpicker','jeep-cpicker','#cpickerText');
    expect(selColor).toEqual('#993c3cba');
    // click on the Hue picker
    await page.mouse.click(266,151);
    await page.waitForChanges();
    selColor = await getHeadlineText('jeep-colorpicker','jeep-cpicker','#cpickerText');
    expect(selColor).toEqual('#3c9699ba');
    // click on the Headline
    await page.mouse.click(130,76);
    await page.waitForChanges();
    selColor = await getHeadlineText('jeep-colorpicker','jeep-cpicker','#cpickerText');
    expect(selColor).toEqual('RGBA(60,150,153,0.731)');
    const color: any = {hex: {hex:"#3c9699", hexa: "#3c9699ba"}, 
    rgb: {r: 60, g: 150, b: 153, rgb: "RGB(60,150,153)", rgba: "RGBA(60,150,153,0.731)"}, 
    hsb: {h: 182, s: 61, b: 60, hsb: "HSB(182,61%,60%)", hsba: "HSBA(182,61%,60%,0.731)"}, 
    hsl: {h: 181.935, s: 43.662, l: 41.765, hsl: "HSL(182,44%,42%)", hsla: "HSLA(182,44%,42%,0.731)"}, 
    opacity: 0.731};
    expect(onColorSpy).toHaveReceivedEventTimes(3);
    expect(onColorSpy).toHaveReceivedEventDetail(color);
    // click the Ok button
    await page.mouse.click(121,228);
    await page.waitForChanges();
    expect(closeCpickerSpy).toHaveReceivedEventTimes(1);
    expect(closeCpickerSpy).toHaveReceivedEventDetail({color:color,button:1});
  });
  it('should return color initial when going trough the full process & click on Cancel button', async () => {
    await page.setContent('<jeep-colorpicker></jeep-colorpicker>');
    const onColorSpy:EventSpy = await page.spyOnEvent('jeepColorpickerGetColor');
    const closeCpickerSpy:EventSpy = await page.spyOnEvent('jeepColorpickerClose');
    const openCpickerSpy:EventSpy = await page.spyOnEvent('jeepColorpickerOpen');
    const button: E2EElement = await page.find('jeep-colorpicker >>> .colorpicker-button');
    button.click();
    await page.waitForChanges();
    expect(openCpickerSpy).toHaveReceivedEventTimes(1);
    const pickEl: E2EElement = await page.find('jeep-colorpicker >>> jeep-cpicker');
    expect(await pickEl.getProperty('color')).toEqual("#ff0000");
    expect(await pickEl.getProperty('opacity')).toEqual("1");
    const rect:any = await getBoundingClientRect('jeep-colorpicker','jeep-cpicker','.cpicker-wrapper'); 
    expect(rect.top).toEqual(64);
    expect(rect.left).toEqual(36);
    expect(rect.width).toEqual(252);
    expect(rect.height).toEqual(180);
    const bgColor:string = await getSVGFillColor('jeep-colorpicker','jeep-cpicker','#cpickerBackground'); 
    expect(bgColor).toEqual("rgb(36, 36, 36)");
    // click on the color gradient picker
    await page.mouse.click(145,139);
    // get the selected color from the headline text
    await page.waitForChanges();
    let selColor:string = await getHeadlineText('jeep-colorpicker','jeep-cpicker','#cpickerText');
    expect(selColor).toEqual('#993c3cff');
    // click on the Opacity picker
    await page.mouse.click(229,123);
    await page.waitForChanges();
    selColor = await getHeadlineText('jeep-colorpicker','jeep-cpicker','#cpickerText');
    expect(selColor).toEqual('#993c3cba');
    // click on the Hue picker
    await page.mouse.click(266,151);
    await page.waitForChanges();
    selColor = await getHeadlineText('jeep-colorpicker','jeep-cpicker','#cpickerText');
    expect(selColor).toEqual('#3c9699ba');
    // click on the Headline
    await page.mouse.click(130,76);
    await page.waitForChanges();
    selColor = await getHeadlineText('jeep-colorpicker','jeep-cpicker','#cpickerText');
    expect(selColor).toEqual('RGBA(60,150,153,0.731)');
    // click on the Cancel button
    await page.mouse.click(210,228);
    await page.waitForChanges();
    const color: any = {hex: {hex:"#3c9699", hexa: "#3c9699ba"}, 
    rgb: {r: 60, g: 150, b: 153, rgb: "RGB(60,150,153)", rgba: "RGBA(60,150,153,0.731)"}, 
    hsb: {h: 182, s: 61, b: 60, hsb: "HSB(182,61%,60%)", hsba: "HSBA(182,61%,60%,0.731)"}, 
    hsl: {h: 181.935, s: 43.662, l: 41.765, hsl: "HSL(182,44%,42%)", hsla: "HSLA(182,44%,42%,0.731)"}, 
    opacity: 0.731};
    const colorini: any = {hex: {hex: "#ff0000", hexa: "#ff0000ff"}, 
      hsb: {h: 0, s: 100, b: 100, hsb: "HSB(0,100%,100%)", hsba: "HSBA(0,100%,100%,1.000)"},
      hsl: {h: 0, s: 100, l: 50, hsl: "HSL(0,100%,50%)", hsla: "HSLA(0,100%,50%,1.000)"},
      opacity: 1, 
      rgb: {r: 255, g: 0, b: 0, rgb: "RGB(255,0,0)", rgba: "RGBA(255,0,0,1.000)"}}
    expect(onColorSpy).toHaveReceivedEventTimes(3);
    expect(onColorSpy).toHaveReceivedEventDetail(color);
    expect(closeCpickerSpy).toHaveReceivedEventTimes(1);
    expect(closeCpickerSpy).toHaveReceivedEventDetail({color:colorini,button:2});
  });
});
