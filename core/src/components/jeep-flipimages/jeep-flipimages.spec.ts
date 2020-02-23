import { newSpecPage} from '@stencil/core/testing';
import { JeepFlipimages } from './jeep-flipimages';

describe('jeep-flipimages', () => {
  let page: any;
  let root: any;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [JeepFlipimages],
      html: '<jeep-flipimages></jeep-flipimages>'
    });
    root = page.root;
  });
  afterEach (async () => {
    page = null;
  });
it('should return container structure when no data property given', async () => {
    expect(root).toEqualHtml(`
    <jeep-flipimages fpadding="0" type="horizontal" style="--container-padding: 0px;">
      <mock:shadow-root>
        <slot>
          <div class="container">
            <div class="image-dim"><img></div>
              <div class="flip-container horizontal" id="flip-toggle">
                <div class="back-top" id="back-top">
                  <div class="image-back-top">
                    <img id="image-back-top">
                  </div>
                </div>
                <div class="flipper" id="flipper">
                  <div class="front-top" id="front-top">
                    <div class="image-front-top">
                      <img id="image-front-top">
                    </div>
                  </div>
                  <div class="back-bottom" id="back-bottom">
                    <div class="image-back-bottom">
                      <img id="image-back-bottom">
                    </div>
                  </div>
                </div>
                <div class="front-bottom" id="front-bottom">
                  <div class="image-front-bottom">
                    <img id="image-front-bottom">
                  </div>
                </div>
              </div>
            </div>
          </slot>
        </mock:shadow-root>
    </jeep-flipimages>
    `);
  });
});
