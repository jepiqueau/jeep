import { newE2EPage, E2EPage, E2EElement} from '@stencil/core/testing';
import { EventSpy } from '@stencil/core/dist/declarations';

describe('jeep-html-toprint', () => {
  it('renders', async () => {
    const page: E2EPage = await newE2EPage();

    await page.setContent('<jeep-html-toprint></jeep-html-toprint>');
    const cmp: E2EElement = await page.find('jeep-html-toprint');
    expect(cmp).toHaveClass('hydrated');
  });
  it('Should return error when slot toprint not defined', async () => {
    const page: E2EPage = await newE2EPage();
    await page.setContent('<jeep-html-toprint><p>Hello, World!</p></jeep-html-toprint>');
    const slotEl: E2EElement = await page.find('jeep-html-toprint >>> #error-div');
    expect(slotEl.textContent).toEqual(`Error: slot name toprint doesn't exist`);

  });

  it('Should return error when slot name attribute != "toprint" when slot defined', async () => {
    const page: E2EPage = await newE2EPage();
    await page.setContent('<jeep-html-toprint><div slot="end"><p>Hello, World!</p></div></jeep-html-toprint>');
    const slotEl: E2EElement = await page.find('jeep-html-toprint >>> slot');
    expect(slotEl).toBeNull();
    const errorEl: E2EElement = await page.find('jeep-html-toprint >>> #error-div');
    expect(errorEl.textContent).toEqual(`Error: slot name toprint doesn't exist`);

  }); 
  
  it('Should return name attribute = "toprint" when slot toprint defined', async () => {
    const page: E2EPage = await newE2EPage();
    await page.setContent('<jeep-html-toprint><div slot="toprint"><p>Hello, World!</p></div></jeep-html-toprint>');
    const slotEl: E2EElement = await page.find('jeep-html-toprint >>> slot');
    const name = slotEl.getAttribute('name');
    expect(name).toEqual(`toprint`);
  });
   it('Should return "Hello, World!" when slot toprint defined', async () => {
    const page: E2EPage = await newE2EPage();
    await page.setContent('<jeep-html-toprint><div slot="toprint"><p>Hello, World!</p></div></jeep-html-toprint>');
    const pEl: E2EElement = await page.find('p');
    expect(pEl.textContent).toEqual(`Hello, World!`);
  });
  it('Should not emit "jeepHtmlToPrintReady" event when component not loaded', async () => {
    const page: E2EPage = await newE2EPage();
    await page.setContent('<jeep-html-toprint><div slot="toprint"><p>Hello, World!</p></div></jeep-html-toprint>');
    const cmp:E2EElement = await page.find('jeep-html-toprint');
    const eventSpy:EventSpy = await cmp.spyOnEvent('jeepHtmlToPrintReady');
    await cmp.callMethod('init');
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(0);
  });
  it('Should emit "jeepHtmlToPrintReady" event when component loaded', async () => {
    const page: E2EPage = await newE2EPage();
    await page.setContent('<jeep-html-toprint><div slot="toprint"><p>Hello, World!</p></div></jeep-html-toprint>');
    const cmp:E2EElement = await page.find('jeep-html-toprint');
    const eventSpy:EventSpy = await cmp.spyOnEvent('jeepHtmlToPrintReady');
    await cmp.callMethod('init');
    await page.waitForChanges();
    await cmp.callMethod('load');
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(1);
  });
/*
  it('Should have fired "jeepHtmlToPrint" ', async () => {
    const page = await newE2EPage();
    window.print = jest.fn(()=> console.log('in window.print'));
    await page.waitForChanges();
    await page.setContent('<jeep-html-toprint><div slot="toprint"><p>Hello, World!</p></div></jeep-html-toprint>');
    const cmp = await page.find('jeep-html-toprint');
    const spyWindowPrint: jest.SpyInstance<any> = jest.spyOn(window,'print');
    const cusEvent:CustomEvent = new CustomEvent('jeepHtmlToPrint',{});
    await cmp.callMethod('init');
    await page.waitForChanges();
    await cmp.callMethod('load');
    await page.waitForChanges();
    cmp.triggerEvent('jeepHtmlToPrint',cusEvent);
    await page.waitForChanges();
    expect(spyWindowPrint).toHaveBeenCalledTimes(1);
  });
*/
});
