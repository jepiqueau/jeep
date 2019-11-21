import { newE2EPage, E2EPage, E2EElement, } from '@stencil/core/testing';

describe('jeep-navigation', () => {
  it('renders', async () => {

    const page = await newE2EPage();

    await page.setContent('<jeep-navigation></jeep-navigation>');
    const cmp = await page.find('jeep-navigation');
    const container: E2EElement = await page.find('jeep-navigation >>> .navigation-container');
    expect(cmp).toHaveClass('hydrated');
    expect(container).toHaveClass('navigation-container');
  });

  describe('rendering', () => {
    let page: E2EPage;
    let cmp: E2EElement;
    let container: E2EElement;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent('<jeep-navigation></jeep-navigation>');
      cmp = await page.find('jeep-navigation');
      container = await page.find('jeep-navigation >>> .navigation-container');
    });
    afterEach(() => {
      page = null;
      cmp = null;
      container = null;
    });
    it('Should have the navigation-prev button disabled on start', async () => {
      const prevEl: E2EElement = await container.find('.navigation-prev');
      expect(prevEl).not.toBeNull();
      expect(prevEl).toHaveClass('disabled');
    });
    it('Should have the navigation-prev enabled', async () => {
      await cmp.callMethod('setJeepNavigationPrevDisabled',{disabled:false});
      await page.waitForChanges();
      const prevEl: E2EElement = await container.find('.navigation-prev');
      expect(prevEl).not.toHaveClass('disabled');
    });
    it('Should have the navigation-prev disabled', async () => {
      await cmp.callMethod('setJeepNavigationPrevDisabled',{disabled:true});
      await page.waitForChanges();
      const prevEl: E2EElement = await container.find('.navigation-prev');
      expect(prevEl).toHaveClass('disabled');
    });
    it('Should have the navigation-next button disabled on start', async () => {
      const nextEl: E2EElement = await container.find('.navigation-next');
      expect(nextEl).not.toBeNull();
      expect(nextEl).toHaveClass('disabled');
    });
    it('Should have the navigation-next enabled', async () => {
      await cmp.callMethod('setJeepNavigationNextDisabled',{disabled:false});
      await page.waitForChanges();
      const nextEl: E2EElement = await container.find('.navigation-next');
      expect(nextEl).not.toHaveClass('disabled');
    });
    it('Should have the navigation-next disabled', async () => {
      await cmp.callMethod('setJeepNavigationNextDisabled',{disabled:true});
      await page.waitForChanges();
      const nextEl: E2EElement = await container.find('.navigation-next');
      expect(nextEl).toHaveClass('disabled');
    });
    it('Should have the navigation container visible on start', async () => {
      expect(container).not.toHaveClass('hidden');
    });
    it('Should have the navigation container hidden', async () => {
      await cmp.callMethod('setJeepNavigationVisibility',{visibility:'hidden'});
      await page.waitForChanges();
      expect(container).toHaveClass('hidden');
    });
    it('Should have the navigation container visible', async () => {
      await cmp.callMethod('setJeepNavigationVisibility',{visibility:'visible'});
      await page.waitForChanges();
      expect(container).not.toHaveClass('hidden');
    });
    it('Should return "arrow-circle" as icon family when name property not given', async () => {
      const iconName = await cmp.callMethod('getJeepNavigationIconFamily');
      expect(iconName).toEqual('arrow-circle');
    });
    it('Should return "arrow-circle" as icon family when name property set to "arrow-circle"', async () => {
      cmp.setProperty('name','arrow-circle');
      await page.waitForChanges();
      const iconName = await cmp.callMethod('getJeepNavigationIconFamily');
      expect(iconName).toEqual('arrow-circle');
    });
    it('Should return "arrow-round" as icon family when name property set to "arrow-round"', async () => {
      cmp.setProperty('name','arrow-round');
      await page.waitForChanges();
      const iconName = await cmp.callMethod('getJeepNavigationIconFamily');
      expect(iconName).toEqual('arrow-round');
    });
    it('Should return null when name property is neither "arrow-circle" or "arrow-round"', async () => {
      cmp.setProperty('name','arrow-line');
      await page.waitForChanges();
      const iconName = await cmp.callMethod('getJeepNavigationIconFamily');
      expect(iconName).toBeNull();
    });
    it('Should return "arrow-circle" when name property change from "arrow-line" to "arrow-circle"', async () => {
      cmp.setProperty('name','arrow-line');
      await page.waitForChanges();
      const iconName = await cmp.callMethod('getJeepNavigationIconFamily');
      expect(iconName).toBeNull();
      cmp.setProperty('name','arrow-circle');
      await page.waitForChanges();
      const iconName1 = await cmp.callMethod('getJeepNavigationIconFamily');
      expect(iconName1).toEqual('arrow-circle');
    });
    it('Should not emit the jeepNavigationPrev when clicking on navigation-prev button if disabled', async () => {
      const isPrevEmit  = await cmp.spyOnEvent('jeepNavigationPrev');
      const prevEl: E2EElement = await container.find('.navigation-prev');
      await prevEl.click();
      expect(isPrevEmit).toHaveReceivedEventTimes(0); 
    });
    it('Should emit the jeepNavigationPrev when clicking on navigation-prev button if enabled', async () => {
      const isPrevEmit  = await cmp.spyOnEvent('jeepNavigationPrev');
      await cmp.callMethod('setJeepNavigationPrevDisabled',{disabled:false});
      await page.waitForChanges();
      const prevEl: E2EElement = await container.find('.navigation-prev');
      await prevEl.click();
      expect(isPrevEmit).toHaveReceivedEventTimes(1); 
    });

    it('Should not emit the jeepNavigationNext when clicking on navigation-next button if disabled', async () => {
      const isNextEmit  = await cmp.spyOnEvent('jeepNavigationNext');
      const nextEl: E2EElement = await container.find('.navigation-next');
      await nextEl.click();
      expect(isNextEmit).toHaveReceivedEventTimes(0); 
    });
    it('Should emit the jeepNavigationNext when clicking on navigation-next button if enabled', async () => {
      const isNextEmit  = await cmp.spyOnEvent('jeepNavigationNext');
      await cmp.callMethod('setJeepNavigationNextDisabled',{disabled:false});
      await page.waitForChanges();
      const nextEl: E2EElement = await container.find('.navigation-next');
      await nextEl.click();
      expect(isNextEmit).toHaveReceivedEventTimes(1); 
    });

  });

});
