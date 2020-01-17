import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('app-columnchart-viewme', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-columnchart-viewme></app-columnchart-viewme>');

    const element:E2EElement = await page.find('app-columnchart-viewme');
    expect(element).toHaveClass('hydrated');
  });


});
