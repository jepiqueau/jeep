import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('app-columnchart', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-columnchart></app-columnchart>');

    const element:E2EElement = await page.find('app-columnchart');
    expect(element).toHaveClass('hydrated');
  });


});
