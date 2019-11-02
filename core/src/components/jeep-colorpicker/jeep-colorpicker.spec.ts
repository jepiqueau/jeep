import { newSpecPage} from '@stencil/core/testing';
import { JeepColorpicker} from './jeep-colorpicker';

describe('jeep-colorpicker', () => {
    let page: any;
    let root: any;
    let doc: Document;
    beforeEach(async () => {
      page = await newSpecPage({
        components: [JeepColorpicker],
        html: '<jeep-colorpicker></jeep-colorpicker>'
      });
      root = page.root;
      doc = page.doc;
    });
    afterEach (async () => {
      page = null;
    });

    
    it('should display colorpicker button on load', async () => {
        expect(root).toEqualHtml(`<jeep-colorpicker color="#ff0000" opacity="1">
            <mock:shadow-root>
                <div class="colorpicker-container">
                    <button class="colorpicker-button">
                        Color Picker
                    </button>
                </div>
            </mock:shadow-root>
        </jeep-colorpicker>`);
        expect(root.getAttribute('color')).toEqual("#ff0000");
        expect(root.getAttribute('opacity')).toEqual("1");
    }); 

    it('should open the cpicker with default values when no properties given on button click', async() => {
      const button = await root.shadowRoot.querySelector('.colorpicker-button');
      button.click();
      await page.waitForChanges();
      expect(root).toEqualHtml(`<jeep-colorpicker color="#ff0000" opacity="1">
        <mock:shadow-root>
            <div class="colorpicker-container">
                <jeep-cpicker color="#ff0000" opacity="1" buttons="[Okay,Cancel]"></jeep-cpicker>
            </div>
        </mock:shadow-root>
      </jeep-colorpicker>`);
      const cpicker: HTMLJeepCpickerElement = await root.shadowRoot.querySelector('jeep-cpicker');
      expect(cpicker.getAttribute('color')).toEqual("#ff0000");
      expect(cpicker.getAttribute('opacity')).toEqual("1");
    });
    it('should open the cpicker with color property given on button click', async() => {
      root.color = "#55cc45"
      const button = await root.shadowRoot.querySelector('.colorpicker-button');
      button.click();
      await page.waitForChanges();
      expect(root).toEqualHtml(`<jeep-colorpicker color="#55cc45" opacity="1">
        <mock:shadow-root>
            <div class="colorpicker-container">
                <jeep-cpicker color="#55cc45" opacity="1" buttons="[Okay,Cancel]"></jeep-cpicker>
            </div>
        </mock:shadow-root>
      </jeep-colorpicker>`);
      const cpicker: HTMLJeepCpickerElement = await root.shadowRoot.querySelector('jeep-cpicker');
      expect(cpicker.getAttribute('color')).toEqual("#55cc45");
      expect(cpicker.getAttribute('opacity')).toEqual("1");
    });
    it('should open the cpicker with opacity property given on button click', async() => {
      root.opacity = "0.725"
      const button = await root.shadowRoot.querySelector('.colorpicker-button');
      button.click();
      await page.waitForChanges();
      expect(root).toEqualHtml(`<jeep-colorpicker color="#ff0000" opacity="0.725">
        <mock:shadow-root>
            <div class="colorpicker-container">
                <jeep-cpicker color="#ff0000" opacity="0.725" buttons="[Okay,Cancel]"></jeep-cpicker>
            </div>
        </mock:shadow-root>
      </jeep-colorpicker>`);
      const cpicker: HTMLJeepCpickerElement = await root.shadowRoot.querySelector('jeep-cpicker');
      expect(cpicker.getAttribute('color')).toEqual("#ff0000");
      expect(cpicker.getAttribute('opacity')).toEqual("0.725");
    });

    it('should open the cpicker with color & opacity properties given on button click', async() => {
      root.color = "#55cc45"
      root.opacity = "0.725"
      const button = await root.shadowRoot.querySelector('.colorpicker-button');
      button.click();
      await page.waitForChanges();
      expect(root).toEqualHtml(`<jeep-colorpicker color="#55cc45" opacity="0.725">
        <mock:shadow-root>
            <div class="colorpicker-container">
                <jeep-cpicker color="#55cc45" opacity="0.725" buttons="[Okay,Cancel]"></jeep-cpicker>
            </div>
        </mock:shadow-root>
      </jeep-colorpicker>`);
      const cpicker: HTMLJeepCpickerElement = await root.shadowRoot.querySelector('jeep-cpicker');
      expect(cpicker.getAttribute('color')).toEqual("#55cc45");
      expect(cpicker.getAttribute('opacity')).toEqual("0.725");
    });
    it('should open the cpicker with buttons properties [Color] given on button click', async() => {
      root.buttons = "[Color]";
      const button = await root.shadowRoot.querySelector('.colorpicker-button');
      await page.waitForChanges();
      expect(button.textContent).toEqual('Color');
      button.click();
      await page.waitForChanges();
      expect(root).toEqualHtml(`<jeep-colorpicker color="#ff0000" opacity="1" buttons="[Color]">
        <mock:shadow-root>
            <div class="colorpicker-container">
                <jeep-cpicker color="#ff0000" opacity="1" buttons="[Okay,Cancel]"></jeep-cpicker>
            </div>
        </mock:shadow-root>
      </jeep-colorpicker>`);
      const cpicker: HTMLJeepCpickerElement = await root.shadowRoot.querySelector('jeep-cpicker');
      expect(cpicker.getAttribute('color')).toEqual("#ff0000");
      expect(cpicker.getAttribute('opacity')).toEqual("1");
    });
    it('should open the cpicker with buttons properties [Color,Valid] given on button click', async() => {
      root.buttons = "[Color,Valid]"
      const button = await root.shadowRoot.querySelector('.colorpicker-button');
      await page.waitForChanges();
      expect(button.textContent).toEqual('Color');
      button.click();
      await page.waitForChanges();
      expect(button.textContent).toEqual('Color');
      expect(root).toEqualHtml(`<jeep-colorpicker color="#ff0000" opacity="1" buttons="[Color,Valid]">
        <mock:shadow-root>
            <div class="colorpicker-container">
                <jeep-cpicker color="#ff0000" opacity="1" buttons="[Valid,Cancel]"></jeep-cpicker>
            </div>
        </mock:shadow-root>
      </jeep-colorpicker>`);
      const cpicker: HTMLJeepCpickerElement = await root.shadowRoot.querySelector('jeep-cpicker');
      expect(cpicker.getAttribute('color')).toEqual("#ff0000");
      expect(cpicker.getAttribute('opacity')).toEqual("1");
    });    
    it('should open the cpicker with buttons properties [Color,Valid,Dismiss] given on button click', async() => {
      root.buttons = "[Color,Valid,Dismiss]"
      const button = await root.shadowRoot.querySelector('.colorpicker-button');
      await page.waitForChanges();
      expect(button.textContent).toEqual('Color');
      button.click();
      await page.waitForChanges();
      expect(button.textContent).toEqual('Color');
      expect(root).toEqualHtml(`<jeep-colorpicker color="#ff0000" opacity="1" buttons="[Color,Valid,Dismiss]">
        <mock:shadow-root>
            <div class="colorpicker-container">
                <jeep-cpicker color="#ff0000" opacity="1" buttons="[Valid,Dismiss]"></jeep-cpicker>
            </div>
        </mock:shadow-root>
      </jeep-colorpicker>`);
      const cpicker: HTMLJeepCpickerElement = await root.shadowRoot.querySelector('jeep-cpicker');
      expect(cpicker.getAttribute('color')).toEqual("#ff0000");
      expect(cpicker.getAttribute('opacity')).toEqual("1");
    });    
    it('should emit "JeepColorpickerOpen" on open ', async () => {
      root.addEventListener('JeepColorpickerOpen',(ev: CustomEvent) => {
        expect(ev.type).toEqual('JeepColorpickerOpen');
      },false);
      root.open();
      await page.waitForChanges();
    });
    it('should emit "JeepColorpickerClose" on close with button 1', async () => {
      root.addEventListener('JeepColorpickerClose',(ev: CustomEvent) => {
        expect(ev.type).toEqual('JeepColorpickerClose');
        expect(ev.detail.button).toEqual(1);
        expect(ev.detail.color).toEqual(color);
      },false);
      const color: any = {hex: {hex:"#17bb17", hexa: "#17bb1780"}, 
      rgb: {r: 23, g: 187, b: 23, rgb: "RGB(23,187,23)", rgba: "RGBA(23,187,23,0.500)"}, 
      hsb: {h: 120, s: 88, b: 73, hsb: "HSB(120,88%,73%)", hsba: "HSBA(120,88%,73%,0.500)"}, 
      hsl: {h: 120, s: 78, l: 41, hsl: "HSL(120,78%,41%)", hsla: "HSLA(120,78%,41%,0.500)"}, 
      opacity: 0.5};
      root.open();
      await page.waitForChanges();
      root.close(color,1);
      await page.waitForChanges();
    });
    it('should emit "JeepColorpickerClose" on close with button 2', async () => {
      root.addEventListener('JeepColorpickerClose',(ev: CustomEvent) => {
        expect(ev.type).toEqual('JeepColorpickerClose');
        expect(ev.detail.button).toEqual(2);
        expect(ev.detail.color).toEqual(color);
      },false);
      const color: any = {hex: {hex:"#17bb17", hexa: "#17bb1780"}, 
      rgb: {r: 23, g: 187, b: 23, rgb: "RGB(23,187,23)", rgba: "RGBA(23,187,23,0.500)"}, 
      hsb: {h: 120, s: 88, b: 73, hsb: "HSB(120,88%,73%)", hsba: "HSBA(120,88%,73%,0.500)"}, 
      hsl: {h: 120, s: 78, l: 41, hsl: "HSL(120,78%,41%)", hsla: "HSLA(120,78%,41%,0.500)"}, 
      opacity: 0.5};
      root.open();
      await page.waitForChanges();
      root.close(color,2);
      await page.waitForChanges();
    });
    it('should respond to "JeepCpickerClose" by firing "JeepColorpickerGetColor" & "JeepColorpickerClose"', async () => {
      root.addEventListener('JeepColorpickerClose',(ev: CustomEvent) => {
        expect(ev.type).toEqual('JeepColorpickerClose');
      },false);
      root.addEventListener('JeepColorpickerGetColor',(ev: CustomEvent) => {
        expect(ev.type).toEqual('JeepColorpickerGetColor');
        expect(ev.detail).toEqual(color);
      },false);

      const color: any = {hex: {hex:"#17bb17", hexa: "#17bb1780"}, 
      rgb: {r: 23, g: 187, b: 23, rgb: "RGB(23,187,23)", rgba: "RGBA(23,187,23,0.500)"}, 
      hsb: {h: 120, s: 88, b: 73, hsb: "HSB(120,88%,73%)", hsba: "HSBA(120,88%,73%,0.500)"}, 
      hsl: {h: 120, s: 78, l: 41, hsl: "HSL(120,78%,41%)", hsla: "HSLA(120,78%,41%,0.500)"}, 
      opacity: 0.5};

      const custEvent = new CustomEvent("JeepCpickerClose", {
        detail: {color : color, button : 1}
      });
      doc.dispatchEvent(custEvent); 
      await page.waitForChanges();

    });
});