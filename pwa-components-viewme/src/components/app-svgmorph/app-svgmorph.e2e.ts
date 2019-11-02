import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('app-svgmorph', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-svgmorph></app-svgmorph>');

    const element:E2EElement = await page.find('app-svgmorph');
    expect(element).toHaveClass('hydrated');
  });


});
