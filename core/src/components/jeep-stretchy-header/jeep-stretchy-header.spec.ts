import { newSpecPage} from '@stencil/core/testing';
import { JeepStretchyHeader } from './jeep-stretchy-header';

describe('jeep-stretchy-header', () => {
  let page: any;
  let root: any;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [JeepStretchyHeader],
      html: `<jeep-stretchy-header>
        <ion-header>
          <ion-toolbar color="light">
            <ion-buttons slot="start">
                <ion-button>
                    <ion-icon slot="start" name="star"></ion-icon>\
                    Left Icon
                </ion-button>
            </ion-buttons>
            <ion-title>Stretchy Header</ion-title>
          </ion-toolbar>
        </ion-header>
      </jeep-stretchy-header>`
    });
    root = page.root;

  });
  afterEach (async () => {
    page = null;
  });

  it('should built', async () => {
    await page.waitForChanges();
    expect(root).toBeDefined();
  });
  it('should return container structure when no data property given', async () => {
    expect(root.shadowRoot).toEqualHtml(`
        <div class="stretchy-header">
          <div class="stretchy-header-background"></div>
          <slot></slot>
        </div>
    `);
  });

});
