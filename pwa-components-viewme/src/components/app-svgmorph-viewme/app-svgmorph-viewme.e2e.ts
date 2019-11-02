import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('app-svgmorph-viewme', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-svgmorph-viewme></app-svgmorph-viewme>');

    const element:E2EElement = await page.find('app-svgmorph-viewme');
    expect(element).toHaveClass('hydrated');
  });


});
