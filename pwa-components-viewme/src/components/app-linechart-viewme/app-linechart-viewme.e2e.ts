import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('app-linechart-viewme', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-linechart-viewme></app-linechart-viewme>');

    const element:E2EElement = await page.find('app-linechart-viewme');
    expect(element).toHaveClass('hydrated');
  });


});
