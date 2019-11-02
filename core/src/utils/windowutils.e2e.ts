import { newE2EPage } from '@stencil/core/testing';
import { windowSize } from './windowutils';
import { Rect } from '../global/interfaces/geom';

describe('plotsize', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36')
    await page.setViewport({width: 1024, height: 768, deviceScaleFactor: 1});
    const innerWidth = await page.evaluate(_ => {return window.innerWidth})
    const innerHeight = await page.evaluate(_ => {return window.innerHeight})
    const window = {innerWidth:innerWidth,innerHeight:innerHeight};
    let size:Rect = windowSize(window);
    expect(size.top).toEqual(0);
    expect(size.left).toEqual(0);
    expect(size.width).toEqual(1024);
    expect(size.height).toEqual(768);

  });
});
