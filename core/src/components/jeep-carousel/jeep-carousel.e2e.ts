import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';

describe('jeep-carousel', () => {
  it('should build', async () => {
    const page: E2EPage = await newE2EPage();

    await page.setContent('<jeep-carousel></jeep-carousel>');
    const component: E2EElement = await page.find('jeep-carousel');
    expect(component).toBeTruthy();

  });
  describe('renders', () => {
    let page: E2EPage;
    let component: E2EElement;
    const data: any = {"slides":[
      {"slide":["<img class=\"image\" src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/deerl.jpg\" alt=\"deer\"></img>"]},
      {"slide":["<img class=\"image\" src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/elephantl.jpg\" alt=\"elephant\"></img>"]},
      {"slide":["<img class=\"image\" src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/tigerl.jpg\" alt=\"tiger\"></img>"]},
      {"slide":["<img class=\"image\" src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/lionl.jpg\" alt=\"lion\"></img>"]},
      {"slide":["<img class=\"image\" src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/eaglel.jpg\" alt=\"eagle\"></img>"]},
      {"slide":["<img class=\"image\" src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/eagleheadl.jpg\" alt=\"eagle head\"></img>"]}
      ]};    
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`<jeep-carousel></jeep-carousel>`);
      component = await page.find('jeep-carousel');
    });
    afterEach(() => {
      page = null;
      component = null;
    });
    it('should render fake card when no data given', async () => {
     expect(component).toEqualHtml(`
      <jeep-carousel class="hydrated">
          <div id='fake-card'></div>
      </jeep-carousel>
    `);
     const element = await page.find('jeep-carousel  div');
      expect(element.getAttribute('id')).toEqual(`fake-card`);
    });

    it('should render container when data given', async () => {
      await component.callMethod('swiperDestroy',true);
      await page.waitForChanges();
      component.setProperty('data', JSON.stringify(data));
      await component.callMethod('init');
      await page.waitForChanges();
      await component.callMethod('setSwiper');
      await page.waitForChanges();
      expect(component).toEqualHtml(`
      <jeep-carousel class="hydrated">
        <style></style>
        <div class="container">
          <div class="swiper-container swiper-container-horizontal">
            <div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px);">
              <div class="swiper-slide swiper-slide-active" style="width: 800px;">
                <img alt="deer" class="image" src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/deerl.jpg">
              </div>
              <div class="swiper-slide swiper-slide-next" style="width: 800px;">
                <img alt="elephant" class="image" src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/elephantl.jpg">
              </div>
              <div class="swiper-slide" style="width: 800px;">
                <img alt="tiger" class="image" src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/tigerl.jpg">
              </div>
              <div class="swiper-slide" style="width: 800px;">
                <img alt="lion" class="image" src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/lionl.jpg">
              </div>
              <div class="swiper-slide" style="width: 800px;">
                <img alt="eagle" class="image" src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/eaglel.jpg">
              </div>
              <div class="swiper-slide" style="width: 800px;">
                <img alt="eagle head" class="image" src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/eagleheadl.jpg">
              </div>
            </div>
            <span aria-atomic="true" aria-live="assertive" class="swiper-notification"></span>
          </div>
        </div>
      </jeep-carousel>
      `);
    });
    it('should render swiper-container when data given and no options', async () => {
      await component.callMethod('swiperDestroy',true);
      await page.waitForChanges();
      component.setProperty('data', JSON.stringify(data));
      await page.waitForChanges();
      await component.callMethod('init');
      await page.waitForChanges();
      await component.callMethod('setSwiper');
      await page.waitForChanges();
      const element:E2EElement = await page.find('jeep-carousel > div');
      const swiper:E2EElement = await element.find('.swiper-container');
      expect(swiper).toBeTruthy();
    });
   it('should render swiper-container with swiper-navigation-buttons when data given and navigation options', async () => {
    await component.callMethod('swiperDestroy',true);
    await page.waitForChanges();
    const options:any = { 
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };
      component.setProperty('options', JSON.stringify(options));
      component.setProperty('data', JSON.stringify(data));
      await component.callMethod('init');
      await page.waitForChanges();
      await component.callMethod('setSwiper');
      await page.waitForChanges();
      const element:E2EElement = await page.find('jeep-carousel > div');
      const swiper:E2EElement = await element.find('.swiper-container');
      expect(swiper).toBeTruthy();
      const buttons:E2EElement = await element.find('.swiper-navigation-buttons');
      expect(buttons).toBeTruthy();
    });
    it('should render two buttons in swiper-navigation-buttons when data given and navigation options', async () => {
      await component.callMethod('swiperDestroy',true);
      await page.waitForChanges();
      const options:any = { 
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };
      component.setProperty('options', JSON.stringify(options));
      component.setProperty('data', JSON.stringify(data));
      await component.callMethod('init');
      await page.waitForChanges();
      await component.callMethod('setSwiper');
      await page.waitForChanges();
      const element:E2EElement = await page.find('jeep-carousel > div');
      const buttons:E2EElement = await element.find('.swiper-navigation-buttons');
      const buttonsEls:E2EElement[] = await buttons.findAll('div');
      expect(buttonsEls.length).toEqual(2);
      expect(buttonsEls[0]).toHaveClass(`swiper-button-prev`);
      expect(buttonsEls[1]).toHaveClass(`swiper-button-next`);
    });
    it('should hide the swiper-navigation-buttons after 2500ms', async () => {
      await component.callMethod('swiperDestroy',true);
      await page.waitForChanges();
      const options:any = { 
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };
      component.setProperty('options', JSON.stringify(options));
      component.setProperty('data', JSON.stringify(data));
      await component.callMethod('init');
      await page.waitForChanges();
      await component.callMethod('setSwiper');
      await page.waitForChanges();
      const element:E2EElement = await page.find('jeep-carousel > div');
      await page.waitFor(2510);
      await page.waitForChanges();
      const buttons:E2EElement = await element.find('.swiper-navigation-buttons');
      expect(buttons).toHaveClass(`hidden`);
    });
    it('should disable the swiper-button-prev when on the first slide', async () => {
      await component.callMethod('swiperDestroy',true);
      await page.waitForChanges();
      const options:any = { 
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };
      component.setProperty('options', JSON.stringify(options));
      component.setProperty('data', JSON.stringify(data));
      await component.callMethod('init');
      await page.waitForChanges();
      await component.callMethod('setSwiper');
      await page.waitForChanges();
      const element:E2EElement = await page.find('jeep-carousel > div');
      const button:E2EElement = await element.find('.swiper-button-prev');
      expect(button).toHaveClass(`swiper-button-disabled`);
    });
    it('should not disable the swiper-button-next when on the first slide', async () => {
      await component.callMethod('swiperDestroy',true);
      await page.waitForChanges();
      const options:any = { 
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };
      component.setProperty('options', JSON.stringify(options));
      component.setProperty('data', JSON.stringify(data));
      await component.callMethod('init');
      await page.waitForChanges();
      await component.callMethod('setSwiper');
      await page.waitForChanges();
      const element:E2EElement = await page.find('jeep-carousel > div');
      const button:E2EElement = await element.find('.swiper-button-next');
      expect(button).not.toHaveClass(`swiper-button-disabled`);
    });
    it('should not disable the swiper-button-prev when on the second slide', async () => {
      await component.callMethod('swiperDestroy',true);
      await page.waitForChanges();
      const options:any = { 
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };
      component.setProperty('options', JSON.stringify(options));
      component.setProperty('data', JSON.stringify(data));
      await component.callMethod('init');
      await page.waitForChanges();
      await component.callMethod('setSwiper');
      await page.waitForChanges();
      await component.callMethod('slideTo',1)
      await page.waitForChanges();
      const element:E2EElement = await page.find('jeep-carousel > div');
      const button:E2EElement = await element.find('.swiper-button-prev');
      expect(button).not.toHaveClass(`swiper-button-disabled`);
    });
    it('should not disable the swiper-button-next when on the second slide', async () => {
      await component.callMethod('swiperDestroy',true);
      await page.waitForChanges();
      const options:any = { 
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };
      component.setProperty('options', JSON.stringify(options));
      component.setProperty('data', JSON.stringify(data));
      await component.callMethod('init');
      await page.waitForChanges();
      await component.callMethod('setSwiper');
      await page.waitForChanges();
      await component.callMethod('slideTo',1)
      await page.waitForChanges();
      const element:E2EElement = await page.find('jeep-carousel > div');
      const button:E2EElement = await element.find('.swiper-button-next');
      expect(button).not.toHaveClass(`swiper-button-disabled`);
    });
    it('should not disable the swiper-button-prev when on the sixth slide', async () => {
      await component.callMethod('swiperDestroy',true);
      await page.waitForChanges();
      const options:any = { 
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };
      component.setProperty('options', JSON.stringify(options));
      component.setProperty('data', JSON.stringify(data));
      await component.callMethod('init');
      await page.waitForChanges();
      await component.callMethod('setSwiper');
      await page.waitForChanges();
      await component.callMethod('slideTo',5)
      await page.waitForChanges();
      const element:E2EElement = await page.find('jeep-carousel > div');
      const button:E2EElement = await element.find('.swiper-button-prev');
      expect(button).not.toHaveClass(`swiper-button-disabled`);
    });
    it('should disable the swiper-button-next when on the sixth slide', async () => {
      await component.callMethod('swiperDestroy',true);
      await page.waitForChanges();
      const options:any = { 
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };
      component.setProperty('options', JSON.stringify(options));
      component.setProperty('data', JSON.stringify(data));
      await component.callMethod('init');
      await page.waitForChanges();
      await component.callMethod('setSwiper');
      await page.waitForChanges();
      await component.callMethod('slideTo',5)
      await page.waitForChanges();
      const isEnd:boolean = await component.callMethod('isEnd');
      expect(isEnd).toBeTruthy();
      const swContainer:E2EElement = await page.find('jeep-carousel .container .swiper-container');
      const swWrapper:E2EElement = await swContainer.find('.swiper-wrapper');
      const slidesEl:Array<E2EElement> = await swWrapper.findAll('.swiper-slide');
      expect(slidesEl.length).toEqual(6);
      const button:E2EElement = await swContainer.find('.swiper-button-next');
      expect(button).toHaveClass(`swiper-button-disabled`);
    });
    it('should render swiper-container with swiper-pagination when data given and pagination options', async () => {
      await component.callMethod('swiperDestroy',true);
      await page.waitForChanges();
      const options:any = { 
        direction: "horizontal",
        pagination: {
          el:".swiper-pagination",type:"bullets"
        },
      };
      component.setProperty('options', JSON.stringify(options));
      component.setProperty('data', JSON.stringify(data));
      await component.callMethod('init');
      await page.waitForChanges();
      await component.callMethod('setSwiper');
      await page.waitForChanges();
      const swiper:E2EElement = await page.find('jeep-carousel .container .swiper-container');
      expect(swiper).toBeTruthy();
      const pagination:E2EElement = await swiper.find('.swiper-pagination');
      expect(pagination).toBeTruthy();
      expect(pagination).toHaveClass(`swiper-pagination-bullets`);
      const bulletEls = await pagination.findAll(`.swiper-pagination-bullet`);
      expect(bulletEls.length).toEqual(6);
    });
    it('should render swiper-pagination-bullet clickable when pagination clickable option set to true', async () => {
      await component.callMethod('swiperDestroy',true);
      await page.waitForChanges();
      const options:any = { 
        direction: "horizontal",
        pagination: {
          el:".swiper-pagination",type:"bullets",clickable:true
        },
      };
      component.setProperty('options', JSON.stringify(options));
      component.setProperty('data', JSON.stringify(data));
      await component.callMethod('init');
      await page.waitForChanges();
      await component.callMethod('setSwiper');
      await page.waitForChanges();
      const swiper:E2EElement = await page.find('jeep-carousel .container .swiper-container');
      const pagination:E2EElement = await swiper.find('.swiper-pagination');
      expect(pagination).toBeTruthy();
      expect(pagination).toHaveClass(`swiper-pagination-bullets`);
      expect(pagination).toHaveClass(`swiper-pagination-clickable`);
    });
    it('should hide swiper-pagination-bullet after 2500ms', async () => {
      await component.callMethod('swiperDestroy',true);
      await page.waitForChanges();
      const options:any = { 
        direction: "horizontal",
        pagination: {
          el:".swiper-pagination",type:"bullets",clickable:true
        },
      };
      component.setProperty('options', JSON.stringify(options));
      component.setProperty('data', JSON.stringify(data));
      await page.waitForChanges();
      await component.callMethod('init');
      await page.waitForChanges();
      await component.callMethod('setSwiper');
      await page.waitForChanges();
      const swiper:E2EElement = await page.find('jeep-carousel .container .swiper-container');
      const pagination:E2EElement = await swiper.find('.swiper-pagination');
      expect(pagination).toBeTruthy();
      await page.waitFor(2510);
      await page.waitForChanges();
      expect(pagination).toHaveClass(`hidden`);
    });
  });
});
