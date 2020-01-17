import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('app-carousel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-carousel></app-carousel>');

    const element:E2EElement = await page.find('app-carousel');
    expect(element).toHaveClass('hydrated');
  });


});
