import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('app-carousel-viewme', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-carousel-viewme></app-carousel-viewme>');

    const element:E2EElement = await page.find('app-carousel-viewme');
    expect(element).toHaveClass('hydrated');
  });

});
