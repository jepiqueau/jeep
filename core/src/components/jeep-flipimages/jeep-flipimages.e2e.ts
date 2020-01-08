import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';

describe('jeep-flipimages', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<jeep-flipimages></jeep-flipimages>');

    const element = await page.find('jeep-flipimages');
    expect(element).toHaveClass('hydrated');
  });
  describe('rendering', () => {
    let page: E2EPage;
    let element: E2EElement;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent('<jeep-flipimages>\
        <img src="../../../assets/images/deerl.jpg" alt="deer">\
        <img src="../../assets/images/elephantl.jpg" alt="elephant">\
        </jeep-flipimages>');
        element = await page.find('jeep-flipimages');
        });
    afterEach(() => {
        page = null;
        element = null;
    });
    it('should work without parameters', async () => {
        expect(element).toBeTruthy();
        const contEl: E2EElement = await page.find('jeep-flipimages >>> #flip-toggle');
        const bTopEl: E2EElement = await contEl.find('#back-top');
        const FlipEl: E2EElement = await contEl.find('#flipper');
        const bBotEl: E2EElement = await contEl.find('#back-bottom');
        const fBotEl: E2EElement = await contEl.find('#front-bottom');
        expect(contEl).toBeTruthy();
        expect(bTopEl).toBeTruthy();
        expect(FlipEl).toBeTruthy();
        expect(bBotEl).toBeTruthy();
        expect(fBotEl).toBeTruthy();
    });
    it('should work with property type set to "horizontal"', async () => {
      element.setProperty('type',"horizontal");
      await element.callMethod('init');
      await page.waitForChanges();
      const contEl: E2EElement = await page.find('jeep-flipimages >>> #flip-toggle');
      const bTopEl: E2EElement = await contEl.find('#back-top');
      const FlipEl: E2EElement = await contEl.find('#flipper');
      const bBotEl: E2EElement = await contEl.find('#back-bottom');
      const fBotEl: E2EElement = await contEl.find('#front-bottom');
      expect(contEl).toBeTruthy();
      expect(bTopEl).toBeTruthy();
      expect(FlipEl).toBeTruthy();
      expect(bBotEl).toBeTruthy();
      expect(fBotEl).toBeTruthy();
    });
    it('should work with property type set to "vertical"', async () => {
      element.setProperty('type',"vertical");
      await element.callMethod('init');
      await page.waitForChanges();
      const contEl: E2EElement = await page.find('jeep-flipimages >>> #flip-toggle');
      let bLefEl: E2EElement = await contEl.find('#back-left');
      let FlipEl: E2EElement = await contEl.find('#flipper');
      let bRigEl: E2EElement = await contEl.find('#back-right');
      let fRigEl: E2EElement = await contEl.find('#front-right');
      expect(contEl).toBeTruthy();
      expect(bLefEl).toBeTruthy();
      expect(FlipEl).toBeTruthy();
      expect(bRigEl).toBeTruthy();
      expect(fRigEl).toBeTruthy();
    });        
  });
});
