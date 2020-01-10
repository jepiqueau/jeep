import { newE2EPage } from '@stencil/core/testing';

describe('jeep-stretchy-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('\
    <jeep-stretchy-header headerheight="25%" \
        headerbackground="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.75)) , \
        url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/italy-mountains.jpeg)"\
        headerbackgroundblur toolbarcontrastcolor="#ffffff">\
      <ion-header>\
        <ion-toolbar color="light">\
          <ion-buttons slot="start">\
              <ion-button>\
                  <ion-icon slot="start" name="star"></ion-icon>\
                  Left Icon\
              </ion-button>\
          </ion-buttons>\
          <ion-title>Stretchy Header</ion-title>\
        </ion-toolbar>\
      </ion-header>\
    </jeep-stretchy-header>\
    ');
    const element = await page.find('jeep-stretchy-header');
    expect(element).toHaveClass('hydrated');
  });
});
