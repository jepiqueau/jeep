import { newE2EPage } from '@stencil/core/testing';

describe('app-htmltoprint-viewme', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-htmltoprint-viewme></app-htmltoprint-viewme>');

    const element = await page.find('app-htmltoprint-viewme');
    expect(element).toHaveClass('hydrated');
  });
});
