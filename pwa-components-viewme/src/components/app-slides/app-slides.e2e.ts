import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('app-slides', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-slides></app-slides>');

    const element:E2EElement = await page.find('app-slides');
    expect(element).toHaveClass('hydrated');
  });


});
