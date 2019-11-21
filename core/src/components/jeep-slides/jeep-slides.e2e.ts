import { newE2EPage } from '@stencil/core/testing';

describe('jeep-slides', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<jeep-slides></jeep-slides>');
    const cmp = await page.find('jeep-slides');
    expect(cmp).toHaveClass('hydrated');
  });

});
