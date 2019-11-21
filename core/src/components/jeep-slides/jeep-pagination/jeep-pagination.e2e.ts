import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';

describe('jeep-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<jeep-pagination></jeep-pagination>');
    const cmp = await page.find('jeep-pagination');
    expect(cmp).toHaveClass('hydrated');
  });

  describe('rendering', () => {
    let page: E2EPage;
    let cmp: E2EElement;
    let container: E2EElement;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent('<jeep-pagination></jeep-pagination>');
      cmp = await page.find('jeep-pagination');
      container = await page.find('jeep-pagination >>> .pagination-container');
    });
    afterEach(() => {
      page = null;
      cmp = null;
      container = null;
    }); 

    it('Should have the pagination container visible on start', async () => {
      const wrapEl:E2EElement = await container.find('.pagination-wrapper');
      expect(wrapEl).not.toBeNull();
    });
    it('Should have the pagination container hidden', async () => {
      await cmp.callMethod('setJeepPaginationVisibility',{visibility:'hidden'});
      await page.waitForChanges();
      const wrapEl:E2EElement = await container.find('.pagination-wrapper');
      expect(wrapEl).toBeNull();
    });
    it('Should have the pagination container visible', async () => {
      await cmp.callMethod('setJeepPaginationVisibility',{visibility:'visible'});
      await page.waitForChanges();
      const wrapEl:E2EElement = await container.find('.pagination-wrapper');
      expect(wrapEl).not.toBeNull();
    });
    it('Should have the pagination-container-horizontal when property direction not given', async () => {
      expect(container).toHaveClass('pagination-container-horizontal');
    });
    it('Should have the pagination-container-horizontal when property direction set to "horizontal"', async () => {
      cmp.setProperty('direction','horizontal');
      await page.waitForChanges();
      expect(container).toHaveClass('pagination-container-horizontal');
    });
    it('Should have the pagination-container-vertical when property direction set to "vertical"', async () => {
      cmp.setProperty('direction','vertical');
      await page.waitForChanges();
      expect(container).toHaveClass('pagination-container-vertical');
    });
    it('Should return pagination-container-horizontal when property direction is not in ["horizontal","vertical]', async () => {
      cmp.setProperty('direction','oblique');
      await page.waitForChanges();
      expect(container).toHaveClass('pagination-container-horizontal');
    });

    it('Should set the number of bullets to 5 when property ndisplay not given', async () => {
      const nBullets: number = await cmp.callMethod('getJeepPaginationBulletNumber');
      expect(nBullets).toEqual(5);
    });
    it('Should have 9 bullets when property ndisplay set to 9', async () => {
      cmp.setProperty('ndisplay',9);
      await page.waitForChanges();
      const nBullets: number = await cmp.callMethod('getJeepPaginationBulletNumber');
      expect(nBullets).toEqual(9);
    });
    it('Should have 7 bullets when property ndisplay set to 6', async () => {
      cmp.setProperty('ndisplay',6);
      await page.waitForChanges();
      const nBullets: number = await cmp.callMethod('getJeepPaginationBulletNumber');
      expect(nBullets).toEqual(7);
    });

    it('Should not display bullets when the number of slides is not provides', async () => {
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(0);
    });
    it('Should display 3 bullets when the number of slides is set to 8', async () => {
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 8});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      expect(spanEls[0].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[1].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[2].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[3].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[4].classList.contains('hidden-bullet')).toBeFalsy();
    });
    it('Should display 3 bullets when the number of slides is set to 5', async () => {
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 5});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      expect(spanEls[0].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[1].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[2].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[3].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[4].classList.contains('hidden-bullet')).toBeFalsy();
    });
    it('Should display 3 bullets when the number of slides is set to 4', async () => {
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 4});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      expect(spanEls[0].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[1].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[2].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[3].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[4].classList.contains('hidden-bullet')).toBeFalsy();
    });
    it('Should display 3 bullets when the number of slides is set to 3', async () => {
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 3});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      expect(spanEls[0].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[1].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[2].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[3].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[4].classList.contains('hidden-bullet')).toBeFalsy();
    });
    it('Should display 2 bullets when the number of slides is set to 2', async () => {
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 2});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      expect(spanEls[0].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[1].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[2].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[3].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[4].classList.contains('hidden-bullet')).toBeTruthy();
    });
    it('Should display 1 bullets when the number of slides is set to 1', async () => {
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 1});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      expect(spanEls[0].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[1].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[2].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[3].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[4].classList.contains('hidden-bullet')).toBeTruthy();
    });
    it('Should display 3 bullets when the active index not given and the number of slides is set to 8', async () => {
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 8});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      expect(spanEls[0].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[1].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[2].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[2].classList.contains('active-bullet')).toBeTruthy();
      expect(spanEls[3].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[4].classList.contains('hidden-bullet')).toBeFalsy();
    });

    it('Should display 3 bullets when the active index is set to 0 and the number of slides is set to 8', async () => {
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 8});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:0});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      expect(spanEls[0].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[1].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[2].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[2].classList.contains('active-bullet')).toBeTruthy();
      expect(spanEls[3].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[4].classList.contains('hidden-bullet')).toBeFalsy();
    });
    it('Should display 4 bullets when the active index is set to 1 and the number of slides is set to 8', async () => {
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 8});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:1});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      expect(spanEls[0].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[1].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[2].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[2].classList.contains('active-bullet')).toBeTruthy();
      expect(spanEls[3].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[4].classList.contains('hidden-bullet')).toBeFalsy();
    });
    it('Should display 5 bullets when the active index is set to 2 and the number of slides is set to 8', async () => {
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 8});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:2});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      expect(spanEls[0].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[1].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[2].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[2].classList.contains('active-bullet')).toBeTruthy();
      expect(spanEls[3].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[4].classList.contains('hidden-bullet')).toBeFalsy();
    });
    it('Should display 5 bullets when the active index is set to 3 and the number of slides is set to 6', async () => {
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:3});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      expect(spanEls[0].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[1].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[2].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[2].classList.contains('active-bullet')).toBeTruthy();
      expect(spanEls[3].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[4].classList.contains('hidden-bullet')).toBeFalsy();
    });
    it('Should display 4 bullets when the active index is set to 4 and the number of slides is set to 6', async () => {
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:4});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      expect(spanEls[0].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[1].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[2].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[2].classList.contains('active-bullet')).toBeTruthy();
      expect(spanEls[3].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[4].classList.contains('hidden-bullet')).toBeTruthy();
    });
    it('Should display 3 bullets when the active index is set to 5 and the number of slides is set to 6 ', async () => {
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:5});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      expect(spanEls[0].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[1].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[2].classList.contains('hidden-bullet')).toBeFalsy();
      expect(spanEls[2].classList.contains('active-bullet')).toBeTruthy();
      expect(spanEls[3].classList.contains('hidden-bullet')).toBeTruthy();
      expect(spanEls[4].classList.contains('hidden-bullet')).toBeTruthy();
    });
    it('Should not emit jeepPaginationIndex when property clickable not given ', async () => {
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:0});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[0].click();
      await spanEls[1].click();
      await spanEls[2].click();
      await spanEls[3].click();
      await spanEls[4].click();
      expect(indexEmit).toHaveReceivedEventTimes(0); 
    });
    it('Should not emit jeepPaginationIndex when property clickable set to false ', async () => {
      cmp.setProperty('clickable',false)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:0});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[0].click();
      await spanEls[1].click();
      await spanEls[2].click();
      await spanEls[3].click();
      await spanEls[4].click();
      expect(indexEmit).toHaveReceivedEventTimes(0); 
    });

    it('Should not emit jeepPaginationIndex when the active index is set to 0, the number of slides set to 6 and the first bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:0});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[0].click();
      expect(indexEmit).toHaveReceivedEventTimes(0); 
    });
    it('Should not emit jeepPaginationIndex when the active index is set to 0, the number of slides set to 6 and the second bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:0});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[1].click();
      expect(indexEmit).toHaveReceivedEventTimes(0); 
    });
    it('Should emit jeepPaginationIndex when the active index is set to 0, the number of slides set to 6 and the third bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:0});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[2].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"0"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 0, the number of slides set to 6 and the fourth bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:0});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[3].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"1"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 0, the number of slides set to 6 and the fifth bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:0});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[4].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"2"});
    });
    it('Should not emit jeepPaginationIndex when the active index is set to 1, the number of slides set to 6 and the first bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:1});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[0].click();
      expect(indexEmit).toHaveReceivedEventTimes(0); 
    });
    it('Should emit jeepPaginationIndex when the active index is set to 1, the number of slides set to 6 and the second bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:1});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[1].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"0"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 1, the number of slides set to 6 and the third bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:1});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[2].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"1"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 1, the number of slides set to 6 and the fourth bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:1});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[3].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"2"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 1, the number of slides set to 6 and the fifth bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:1});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[4].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"3"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 2, the number of slides set to 6 and the first bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:2});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[0].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"0"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 2, the number of slides set to 6 and the second bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:2});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[1].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"1"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 2, the number of slides set to 6 and the third bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:2});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[2].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"2"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 2, the number of slides set to 6 and the fourth bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:2});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[3].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"3"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 2, the number of slides set to 6 and the fifth bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:2});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[4].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"4"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 3, the number of slides set to 6 and the first bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:3});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[0].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"1"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 3, the number of slides set to 6 and the second bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:3});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[1].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"2"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 3, the number of slides set to 6 and the third bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:3});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[2].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"3"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 3, the number of slides set to 6 and the fourth bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:3});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[3].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"4"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 3, the number of slides set to 6 and the fifth bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:3});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[4].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"5"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 4, the number of slides set to 6 and the first bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:4});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[0].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"2"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 4, the number of slides set to 6 and the second bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:4});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[1].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"3"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 4, the number of slides set to 6 and the third bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:4});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[2].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"4"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 4, the number of slides set to 6 and the fourth bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:4});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[3].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"5"});
    });
    it('Should not emit jeepPaginationIndex when the active index is set to 4, the number of slides set to 6 and the fifth bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:4});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[4].click();
      expect(indexEmit).toHaveReceivedEventTimes(0); 
    });
    it('Should emit jeepPaginationIndex when the active index is set to 5, the number of slides set to 6 and the first bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:5});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[0].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"3"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 5, the number of slides set to 6 and the second bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:5});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[1].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"4"});
    });
    it('Should emit jeepPaginationIndex when the active index is set to 5, the number of slides set to 6 and the third bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:5});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[2].click();
      expect(indexEmit).toHaveReceivedEventTimes(1); 
      expect(indexEmit).toHaveReceivedEventDetail({index:"5"});
    });
    it('Should not emit jeepPaginationIndex when the active index is set to 5, the number of slides set to 6 and the fourth bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:5});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[3].click();
      expect(indexEmit).toHaveReceivedEventTimes(0); 
    });
    it('Should not emit jeepPaginationIndex when the active index is set to 5, the number of slides set to 6 and the fifth bullet clicked ', async () => {
      cmp.setProperty('clickable',true)
      await page.waitForChanges();
      const indexEmit  = await cmp.spyOnEvent('jeepPaginationIndex');
      await cmp.callMethod('setJeepPaginationSlidesNumber',{slides: 6});
      await cmp.callMethod('setJeepPaginationActiveIndex',{activeIndex:5});
      await page.waitForChanges();
      const wrapEl: E2EElement = await container.find('.pagination-wrapper');
      const spanEls: E2EElement[] = await wrapEl.findAll('.pagination-bullet');
      expect(spanEls.length).toEqual(5);
      await spanEls[4].click();
      expect(indexEmit).toHaveReceivedEventTimes(0); 
    });

  });
});
