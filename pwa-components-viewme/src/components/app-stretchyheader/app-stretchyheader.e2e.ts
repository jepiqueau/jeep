import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('app-stretchyheader', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-stretchyheader></app-stretchyheader>');

    const element:E2EElement = await page.find('app-stretchyheader');
    expect(element).toHaveClass('hydrated');
  });

});
