import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('app-colorpicker-viewme', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-colorpicker-viewme></app-colorpicker-viewme>');

    const element:E2EElement = await page.find('app-colorpicker-viewme');
    expect(element).toHaveClass('hydrated');
  });
});
