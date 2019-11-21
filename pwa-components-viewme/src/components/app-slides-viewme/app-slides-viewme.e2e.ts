import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('app-slides-viewme', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-slides-viewme></app-slides-viewme>');

    const element:E2EElement = await page.find('app-slides-viewme');
    expect(element).toHaveClass('hydrated');
  });

});
