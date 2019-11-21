import { newE2EPage, E2EPage, E2EElement  } from '@stencil/core/testing';

describe('jeep-fullscreen', () => {

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<jeep-fullscreen></jeep-fullscreen>');
    const cmp = await page.find('jeep-fullscreen');
    const container: E2EElement = await page.find('jeep-fullscreen >>> .fullscreen-container');
    expect(cmp).toHaveClass('hydrated');
    expect(container).toHaveClass('fullscreen-container');
  });

  describe('rendering', () => {
    let page: E2EPage;
    let cmp: E2EElement;
    let container: E2EElement;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent('<jeep-fullscreen></jeep-fullscreen>');
      cmp = await page.find('jeep-fullscreen');
      container = await page.find('jeep-fullscreen >>> .fullscreen-container');
    });
    afterEach(() => {
      page = null;
      cmp = null;
      container = null;
    });   
    it('Should have the request fullscreen button on start', async () => {
      const requestEl: E2EElement = await container.find('.fullscreen-button.request');
      expect(requestEl).not.toBeNull();
      expect(requestEl).toHaveClass('request');
    });
    it('Should return the isFullscreen to false on start', async () => {
      const isFullscreen = await cmp.callMethod('isFullscreen');
      expect(isFullscreen).toBeFalsy();
    });
    it('Should emit the jeepFullscreenRequest when clicking on fullscreen button', async () => {
      const isRequestEmit  = await cmp.spyOnEvent('jeepFullscreenRequest');
      const requestEl: E2EElement = await container.find('.fullscreen-button.request');
      await requestEl.click();
      expect(isRequestEmit).toHaveReceivedEventTimes(1); 
    });
    it('Should have the exit fullscreen button when in fullscreen mode', async () => {
      const request: E2EElement = await container.find('.fullscreen-button.request');
      await request.click();
      const requestEl: E2EElement = await container.find('.fullscreen-button.exit');
      expect(requestEl).not.toBeNull();
      expect(requestEl).toHaveClass('exit');
    });

    it('Should return the isFullscreen to true when in fullscreen mode', async () => {
      const requestEl: E2EElement = await container.find('.fullscreen-button.request');
      await requestEl.click();
      const isFullscreen = await cmp.callMethod('isFullscreen');
      expect(isFullscreen).toBeTruthy();
    });
    it('Should return the isFullscreen to false when going back to normal mode', async () => {
      const requestEl: E2EElement = await container.find('.fullscreen-button.request');
      await requestEl.click();
      await page.waitFor(10);
      const exitEl: E2EElement = await container.find('.fullscreen-button.exit');
      await exitEl.click();
      const isFullscreen = await cmp.callMethod('isFullscreen');
      expect(isFullscreen).toBeFalsy();
    });
    it('Should emit the jeepFullscreenExit when going back to normal mode', async () => {
      const isExitEmit  = await cmp.spyOnEvent('jeepFullscreenExit');
      const requestEl: E2EElement = await container.find('.fullscreen-button.request');
      await requestEl.click();
      await page.waitFor(10);
      const exitEl: E2EElement = await container.find('.fullscreen-button.exit');
      await exitEl.click();
      expect(isExitEmit).toHaveReceivedEventTimes(1); 
    });
    it('Should have the fullscreen container visible on start', async () => {
      expect(container).not.toHaveClass('hidden');
    });
    it('Should have the fullscreen container hidden', async () => {
      await cmp.callMethod('setJeepFullscreenVisibility',{visibility:'hidden'});
      await page.waitForChanges();
      expect(container).toHaveClass('hidden');
    });
    it('Should have the fullscreen container visible', async () => {
      await cmp.callMethod('setJeepFullscreenVisibility',{visibility:'visible'});
      await page.waitForChanges();
      expect(container).not.toHaveClass('hidden');
    });

  });

});
