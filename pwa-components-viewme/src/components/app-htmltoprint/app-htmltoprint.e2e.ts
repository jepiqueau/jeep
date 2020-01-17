import { newE2EPage } from '@stencil/core/testing';

describe('app-htmltoprint', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-htmltoprint></app-htmltoprint>');

    const element = await page.find('app-htmltoprint');
    expect(element).toHaveClass('hydrated');
  });
});
