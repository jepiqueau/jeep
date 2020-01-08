import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('app-flipimages', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-flipimages></app-flipimages>');

    const element:E2EElement = await page.find('app-flipimages');
    expect(element).toHaveClass('hydrated');
  });


});
