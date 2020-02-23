import { newSpecPage} from '@stencil/core/testing';
import { JeepHtmlToprint } from './jeep-html-toprint';

describe('jeep-html-toprint', () => {
  let page: any;
  let root: any;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [JeepHtmlToprint] 
    });
  });
  afterEach (async () => {
    page = null;
    root = null;
  });


  it('returns null when no slotstyle property given', async () => {
    await page.setContent('<jeep-html-toprint></jeep-html-toprint>')
    root = page.root;
    await root.init();
    await page.waitForChanges();
    expect(await root.getSlotStyle).toBeNull;
    });
  it('return error when slot is not given ', async () => {
    await page.setContent('<jeep-html-toprint></jeep-html-toprint>')
    root = page.root;
    await root.init();
    await page.waitForChanges();
    expect(root).toEqualHtml(`<jeep-html-toprint>
      <mock:shadow-root>
          <div id="error-div">
            Error: slot name toprint doesn't exist
          </div>
          <slot name="toprint"></slot>
        </mock:shadow-root>
    </jeep-html-toprint>`);
  });
  it('render slot elements when slot given without style', async () => {
    await page.setContent('<jeep-html-toprint><div slot="toprint"><h3></h3><h2>Hello World</h2></div></jeep-html-toprint>');
    const root = page.root;
    await root.init();
    await page.waitForChanges();
    await root.load();
    await page.waitForChanges();
    expect(root).toEqualHtml(`<jeep-html-toprint>
      <mock:shadow-root>
        <div id="error-div" style="display: none;">
          Error: slot name toprint doesn't exist
        </div>
        <slot name="toprint"></slot>
      </mock:shadow-root>
      <div slot="toprint">
        <h3></h3>
        <h2>
            Hello World
        </h2>
      </div>        
    </jeep-html-toprint>`);
  });
  it('render slot elements when slot given with style', async () => {
    await page.setContent('<jeep-html-toprint><div slot="toprint"><h3></h3><h2>Hello World</h2></div></jeep-html-toprint>');
    const root = page.root;
    let slotStyle: string = "<style>";
    slotStyle += "h2 {margin:15px;font: 20px Calibri;font-weight: bold;text-align: center;}";
    slotStyle += "h3 {margin:15px;font: 12px Calibri;font-weight: normal;text-align: left;}";
    slotStyle += "table {width: 100%;font: 15px Calibri;}";
    slotStyle += "table, th, td {border: solid 1px #AAA; border-collapse: collapse;";
    slotStyle += "padding: 2px 3px;}";
    slotStyle += ".left {text-align: left;}";
    slotStyle += ".center {text-align: center;font-weight: normal;}";
    slotStyle += ".table-tr-header {background-color:rgb(193,195,203);}";
    slotStyle += "</style>";

    root.slotstyle = slotStyle;
    await page.waitForChanges();
    await root.init();
    await page.waitForChanges();
    await root.load();
    await page.waitForChanges();
    
    expect(root).toEqualHtml(`<jeep-html-toprint>
      <mock:shadow-root>
        <div id="error-div" style="display: none;">
          Error: slot name toprint doesn't exist
        </div>
        <slot name="toprint"></slot>
      </mock:shadow-root>
      <div slot="toprint">
        <style>
          h2 {margin:15px;font: 20px Calibri;font-weight: bold;text-align: center;}h3 {margin:15px;font: 12px Calibri;font-weight: normal;text-align: left;}table {width: 100%;font: 15px Calibri;}table, th, td {border: solid 1px #AAA; border-collapse: collapse;padding: 2px 3px;}.left {text-align: left;}.center {text-align: center;font-weight: normal;}.table-tr-header {background-color:rgb(193,195,203);}
        </style>
        <h3></h3>
        <h2>
            Hello World
        </h2>
      </div>        
    </jeep-html-toprint>`);
  });

});

