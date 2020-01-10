import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('app-stretchyheader-viewme', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-stretchyheader-viewme></app-colorpicker-viewme>');

    const element:E2EElement = await page.find('app-stretchyheader-viewme');
    expect(element).toHaveClass('hydrated');
  });
});
