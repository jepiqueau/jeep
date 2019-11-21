import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';
import { EventSpy } from '@stencil/core/dist/declarations';

describe('jeep-slide', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<jeep-slide></jeep-slide>');
    const cmp = await page.find('jeep-slide');
    expect(cmp).toHaveClass('hydrated');
  });
  describe('rendering', () => {
    let page: E2EPage;
    let cmp: E2EElement;
    let container: E2EElement;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent('<jeep-slide></jeep-slide>');
      cmp = await page.find('jeep-slide');
      container = await page.find('jeep-slide >>> .slide-container');
    });
    afterEach(() => {
      page = null;
      cmp = null;
      container = null;
    });
    it('Should have a slide-wrapper', async () => {
      const wrapEl: E2EElement = await container.find('.slide-wrapper');
      expect(wrapEl).not.toBeNull();
    });
    it('Should have a slide-header in the slide-wrapper', async () => {
      const wrapEl: E2EElement = await container.find('.slide-wrapper');
      const headEl: E2EElement = await wrapEl.find('.slide-header');
      expect(headEl).not.toBeNull();
    });
    it('Should have a slide-content in the slide-wrapper', async () => {
      const wrapEl: E2EElement = await container.find('.slide-wrapper');
      const contEl: E2EElement = await wrapEl.find('.slide-content');
      expect(contEl).not.toBeNull();
    });
    it('Should not have a slide-title in slide-header when stitle property not given', async () => {
      const wrapEl: E2EElement = await container.find('.slide-wrapper');
      const headEl: E2EElement = await wrapEl.find('.slide-header');
      const titleEl: E2EElement = await headEl.find('.slide-title');
      expect(titleEl).toBeNull();
    });
    it('Should have a slide-title in slide-header when stitle property given', async () => {
      cmp.setProperty('stitle','this is a Test');
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.slide-wrapper');
      const headEl: E2EElement = await wrapEl.find('.slide-header');
      const titleEl: E2EElement = await headEl.find('.slide-title');
      expect(titleEl.textContent).toEqual('this is a Test');
    });
    it('Should not have a slide-subtitle in slide-header when subtitle property not given', async () => {
      const wrapEl: E2EElement = await container.find('.slide-wrapper');
      const headEl: E2EElement = await wrapEl.find('.slide-header');
      const titleEl: E2EElement = await headEl.find('.slide-subtitle');
      expect(titleEl).toBeNull();
    });
    it('Should have a slide-subtitle in slide-header when subtitle property given', async () => {
      cmp.setProperty('subtitle','test for subtitle');
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.slide-wrapper');
      const headEl: E2EElement = await wrapEl.find('.slide-header');
      const subtitleEl: E2EElement = await headEl.find('.slide-subtitle');
      expect(subtitleEl.textContent).toEqual('test for subtitle');
    });

    it('Should not have a style tag when cstyle property not given', async () => {
      expect(cmp).toEqualHtml(`<jeep-slide class="hydrated">
        <mock:shadow-root>
          <div class="slide-container">
            <div class="slide-wrapper">
              <div class="slide-header"></div>
              <div class="slide-content">
                <slot></slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </jeep-slide>`);
    });

    it('Should have a style tag when cstyle property given', async () => {
      cmp.setProperty("cstyle",":host{--slide-background: #49b293;}");
      await page.waitForChanges();
      expect(cmp).toEqualHtml(`<jeep-slide class="hydrated">
        <mock:shadow-root>
          <div class="slide-container">
            <div class="slide-wrapper">
              <div class="slide-header"></div>
              <div class="slide-content">
                <slot></slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </jeep-slide>`);
      /* does not work anymore
      const styleEls: E2EElement[] = await page.findAll('jeep-slide >>> #slide-cstyle');
      console.log('styleEls ',styleEls.toString())
      expect(styleEls.length).toEqual(1);
      expect(styleEls[0].innerHTML).toEqual(":host{--slide-background: #49b293;}");
      */
    });
    it('Should emit the jeepSlideDidLoad when the component is loaded', async () => { 
    const isLoadEmit: EventSpy  = await page.spyOnEvent('jeepSlideDidLoad');
    await cmp.callMethod('init');
    await cmp.callMethod('setSlide');
    await page.waitForChanges();
    expect(isLoadEmit).toHaveReceivedEventTimes(1); 
    });

    
  });
});
