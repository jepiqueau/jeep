import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('app-home', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-home></app-home>');

    const element = await page.find('app-home');
    expect(element).toHaveClass('hydrated');
  });

  it('contains a "About Page" button', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-home></app-home>');

    const elArray:E2EElement[] = await page.findAll('app-home ion-content ion-button');
    expect(elArray.length).toEqual(4);
    expect(elArray[0].textContent).toEqual('About Page');
  });
  it('contains a "ColorPicker Viewme" button', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-home></app-home>');

    const elArray:E2EElement[] = await page.findAll('app-home ion-content ion-button');
    expect(elArray.length).toEqual(4);
    expect(elArray[1].textContent).toEqual('ColorPicker Viewme');
  });
  it('contains a "LineChart Viewme" button', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-home></app-home>');

    const elArray:E2EElement[] = await page.findAll('app-home ion-content ion-button');
    expect(elArray.length).toEqual(4);
    expect(elArray[2].textContent).toEqual('LineChart Viewme');
  });
  it('contains a "SVGMorphing Viewme" button', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-home></app-home>');

    const elArray:E2EElement[] = await page.findAll('app-home ion-content ion-button');
    expect(elArray.length).toEqual(4);
    expect(elArray[3].textContent).toEqual('SVGMorphing Viewme');
  });

  
});
