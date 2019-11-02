import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('app-linechart', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-linechart></app-linechart>');

    const element:E2EElement = await page.find('app-linechart');
    expect(element).toHaveClass('hydrated');
  });


});
