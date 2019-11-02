import { newSpecPage} from '@stencil/core/testing';
import { JeepCpicker } from './jeep-cpicker';
import { StateProperties } from '../../../global/interfaces/jeep-colorpicker';

describe('jeep-cpicker', () => {
    let page: any;
    let root: any;
    beforeEach(async () => {
      page = await newSpecPage({
        components: [JeepCpicker],
        html:'<jeep-cpicker></jeep-cpicker>'
      });
      root = page.root;
    });
    afterEach (async () => {
      page = null;
      root =null;
    });
    it('should display cpicker on load', async () => {
        expect(root).toEqualHtml(`<jeep-cpicker color="#ff0000" opacity="1.000" 
          style="--cpicker-background-color: #242424; --cpicker-top: 10vh; --cpicker-left: 10vw; --cpicker-width: 70vmin; --cpicker-height: 50vmin;">
          <mock:shadow-root>
            <div class="cpicker-container">
              <div class="cpicker-wrapper" style="top: 76.8px; left: 136.6px; width: 537.6px; height: 384px;">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern height="18.432" id="pattern-transparency" patternUnits="userSpaceOnUse" width="18.432" x="0" y="0">
                      <rect class="pattern-cube" height="9.216" width="9.216" x="0" y="0"></rect>
                      <rect class="pattern-cube" height="9.216" width="9.216" x="9.216" y="9.216"></rect>                  
                    </pattern>
                    <lineargradient id="cpickerHue">
                      <stop offset="0" stop-color="#ffffff" stop-opacity="1"></stop>
                      <stop offset="1" stop-color="#ffffff" stop-opacity="0"></stop>
                    </lineargradient>
                    <lineargradient id="cpickerBrightness" x2="0" y2="1">
                      <stop offset="0" stop-color="#000000" stop-opacity="0"></stop>
                      <stop offset="1" stop-color="#000000" stop-opacity="1"></stop>
                    </lineargradient>
                    <lineargradient id="colorSliderGradient" x2="0" y2="1">
                      <stop offset="0" stop-color="hsl(0,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.06" stop-color="hsl(20,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.11" stop-color="hsl(40,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.17" stop-color="hsl(60,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.22" stop-color="hsl(80,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.28" stop-color="hsl(100,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.33" stop-color="hsl(120,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.39" stop-color="hsl(140,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.44" stop-color="hsl(160,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.50" stop-color="hsl(180,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.56" stop-color="hsl(200,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.61" stop-color="hsl(220,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.67" stop-color="hsl(240,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.72" stop-color="hsl(260,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.78" stop-color="hsl(280,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.83" stop-color="hsl(300,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.89" stop-color="hsl(320,100%,50%" stop-opacity="1"></stop>
                      <stop offset="0.94" stop-color="hsl(340,100%,50%" stop-opacity="1"></stop>
                      <stop offset="1.00" stop-color="hsl(360,100%,50%" stop-opacity="1"></stop>
                    </lineargradient>
                    <lineargradient id="opacitySliderGradient" x2="0" y2="1">
                      <stop offset="0" stop-color="#ff0000" stop-opacity="1"></stop>
                      <stop offset="1" stop-color="#ff0000" stop-opacity="0"></stop>
                    </lineargradient>
                  </defs>
                  <rect id="cpickerBackground" width="100%" height="100%"></rect>
                  <g id="cpickerHeader">
                  <rect id="cpickerWhite" width="370.944" height="46.080" x="0" y="0"></rect>
                  <rect id="cpickerTransparency" width="370.944" height="46.080" x="0" y="0" fill="url(http://testing.stenciljs.com/#pattern-transparency)"></rect>
                  <rect id="cpickerSelColor" width="370.944" height="46.080" x="0" y="0" fill="#ff0000" fill-opacity="1.000"></rect>
                  <rect id="cpickerHueColor" width="166.656" height="46.080" x="370.944" y="0" fill="#ff0000"></rect>
                  <text fill="#ffffff" font-family="Verdana" font-size="19.968" font-weight="bold" id="cpickerText" text-anchor="middle" x="185.472" y="8.5%">
                     #ff0000ff
                  </text>
                  </g>
                  <g id="cpickerSBColor">
                  <rect id="cpickerPickColor" width="354.816" height="253.440" x="3%" y="57.600" fill="#ff0000"></rect>
                  <rect id="cpickerGradientS" rx="2" ry="2" width="354.816" height="253.440" x="3%" y="57.600" fill="url(http://testing.stenciljs.com/#cpickerHue)"></rect>
                  <rect id="cpickerGradientB" rx="2" ry="2" width="354.816" height="253.440" x="3%" y="57.600" fill="url(http://testing.stenciljs.com/#cpickerBrightness)"></rect>
                  <circle id="cpickerHandler" r="1.5%" cx="370.944" cy="57.600" fill="none" stroke="#ffffff" stroke-width="2"></circle>
                  </g>
                  <g id="cpickerOpacity">
                  <rect id="cpickerSliderWhite" width="11%" height="253.440" x="72%" y="57.600"></rect>
                  <rect id="cpickerTransparencySlider" width="11%" height="253.440" x="72%" y="57.600" fill="url(http://testing.stenciljs.com/#pattern-transparency)"></rect>
                  <rect id="cpickerSliderOpacity" width="11%" height="253.440" x="72%" y="57.600" fill="url(http://testing.stenciljs.com/#opacitySliderGradient)"></rect>
                  <rect id="cpickerOpaSliderHandler" width="11.4%" height="1.2%" x="71.8%" y="55.296" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                  </g>
                  <g id="cpickerHueColor">
                  <rect id="cpickerSliderHueColor" width="11%" height="253.440" x="86%" y="57.600" fill="url(http://testing.stenciljs.com/#colorSliderGradient)"></rect>
                  <rect id="cpickerColSliderHandler" width="11.4%" height="1.2%" x="85.8%" y="55.296" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                  </g>
                  <g id="cpickerFooter">
                  <rect id="cpickerOkay" width="161.280" height="42.240" x="91.392" y="85%" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                  <rect id="cpickerCancel" width="161.280" height="42.240" x="53%" y="85%"  fill="none" stroke="#ffffff" stroke-width="2"></rect>
                  <text fill="#ffffff" font-family="Verdana" font-size="26.880" id="cpickerOkayText" text-anchor="middle" x="172.032" y="93%">
                    Okay
                  </text>
                  <text fill="#ffffff" font-family="Verdana" font-size="26.880" id="cpickerCancelText" text-anchor="middle" x="365.568" y="93%">
                    Cancel
                  </text>
                  </g>
                </svg>
              </div>
            </div>
          </mock:shadow-root>
        </jeep-cpicker>`);
    }); 
    it('should display cpicker on load with no buttons', async () => {
      root.hidebuttons = true;
      await page.waitForChanges();
      expect(root).toEqualHtml(`<jeep-cpicker color="#ff0000" opacity="1.000" hidebuttons
        style="--cpicker-background-color: #242424; --cpicker-top: 10vh; --cpicker-left: 10vw; --cpicker-width: 70vmin; --cpicker-height: 50vmin;">
        <mock:shadow-root>
          <div class="cpicker-container">
            <div class="cpicker-wrapper" style="top: 76.8px; left: 136.6px; width: 537.6px; height: 384px;">
              <svg width="100%" height="100%">
                <defs>
                  <pattern height="18.432" id="pattern-transparency" patternUnits="userSpaceOnUse" width="18.432" x="0" y="0">
                    <rect class="pattern-cube" height="9.216" width="9.216" x="0" y="0"></rect>
                    <rect class="pattern-cube" height="9.216" width="9.216" x="9.216" y="9.216"></rect>                  
                  </pattern>
                  <lineargradient id="cpickerHue">
                    <stop offset="0" stop-color="#ffffff" stop-opacity="1"></stop>
                    <stop offset="1" stop-color="#ffffff" stop-opacity="0"></stop>
                  </lineargradient>
                  <lineargradient id="cpickerBrightness" x2="0" y2="1">
                    <stop offset="0" stop-color="#000000" stop-opacity="0"></stop>
                    <stop offset="1" stop-color="#000000" stop-opacity="1"></stop>
                  </lineargradient>
                  <lineargradient id="colorSliderGradient" x2="0" y2="1">
                    <stop offset="0" stop-color="hsl(0,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.06" stop-color="hsl(20,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.11" stop-color="hsl(40,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.17" stop-color="hsl(60,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.22" stop-color="hsl(80,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.28" stop-color="hsl(100,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.33" stop-color="hsl(120,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.39" stop-color="hsl(140,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.44" stop-color="hsl(160,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.50" stop-color="hsl(180,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.56" stop-color="hsl(200,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.61" stop-color="hsl(220,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.67" stop-color="hsl(240,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.72" stop-color="hsl(260,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.78" stop-color="hsl(280,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.83" stop-color="hsl(300,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.89" stop-color="hsl(320,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.94" stop-color="hsl(340,100%,50%" stop-opacity="1"></stop>
                    <stop offset="1.00" stop-color="hsl(360,100%,50%" stop-opacity="1"></stop>
                  </lineargradient>
                  <lineargradient id="opacitySliderGradient" x2="0" y2="1">
                    <stop offset="0" stop-color="#ff0000" stop-opacity="1"></stop>
                    <stop offset="1" stop-color="#ff0000" stop-opacity="0"></stop>
                  </lineargradient>
                </defs>
                <rect id="cpickerBackground" width="100%" height="100%"></rect>
                <g id="cpickerHeader">
                  <rect id="cpickerWhite" width="370.944" height="46.080" x="0" y="0"></rect>
                  <rect id="cpickerTransparency" width="370.944" height="46.080" x="0" y="0" fill="url(http://testing.stenciljs.com/#pattern-transparency)"></rect>
                  <rect id="cpickerSelColor" width="370.944" height="46.080" x="0" y="0" fill="#ff0000" fill-opacity="1.000"></rect>
                  <rect id="cpickerHueColor" width="166.656" height="46.080" x="370.944" y="0" fill="#ff0000"></rect>
                  <text fill="#ffffff" font-family="Verdana" font-size="19.968" font-weight="bold" id="cpickerText" text-anchor="middle" x="185.472" y="8.5%">
                    #ff0000ff
                  </text>
                </g>
                <g id="cpickerSBColor">
                  <rect id="cpickerPickColor" width="354.816" height="299.520" x="3%" y="57.600" fill="#ff0000"></rect>
                  <rect id="cpickerGradientS" rx="2" ry="2" width="354.816" height="299.520" x="3%" y="57.600" fill="url(http://testing.stenciljs.com/#cpickerHue)"></rect>
                  <rect id="cpickerGradientB" rx="2" ry="2" width="354.816" height="299.520" x="3%" y="57.600" fill="url(http://testing.stenciljs.com/#cpickerBrightness)"></rect>
                  <circle id="cpickerHandler" r="1.5%" cx="370.944" cy="57.600" fill="none" stroke="#ffffff" stroke-width="2"></circle>
                  </g>
                <g id="cpickerOpacity">
                  <rect id="cpickerSliderWhite" width="11%" height="299.520" x="72%" y="57.600"></rect>
                  <rect id="cpickerTransparencySlider" width="11%" height="299.520" x="72%" y="57.600" fill="url(http://testing.stenciljs.com/#pattern-transparency)"></rect>
                  <rect id="cpickerSliderOpacity" width="11%" height="299.520" x="72%" y="57.600" fill="url(http://testing.stenciljs.com/#opacitySliderGradient)"></rect>
                  <rect id="cpickerOpaSliderHandler" width="11.4%" height="1.2%" x="71.8%" y="55.296" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                </g>
                <g id="cpickerHueColor">
                  <rect id="cpickerSliderHueColor" width="11%" height="299.520" x="86%" y="57.600" fill="url(http://testing.stenciljs.com/#colorSliderGradient)"></rect>
                  <rect id="cpickerColSliderHandler" width="11.4%" height="1.2%" x="85.8%" y="55.296" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                </g>
              </svg>
            </div>
          </div>
        </mock:shadow-root>
      </jeep-cpicker>`);
    }); 
    it('should display cpicker on load with no header', async () => {
      root.hideheader = true;
      await page.waitForChanges();
      expect(root).toEqualHtml(`<jeep-cpicker color="#ff0000" opacity="1.000" hideheader
        style="--cpicker-background-color: #242424; --cpicker-top: 10vh; --cpicker-left: 10vw; --cpicker-width: 70vmin; --cpicker-height: 50vmin;">
        <mock:shadow-root>
          <div class="cpicker-container">
            <div class="cpicker-wrapper" style="top: 76.8px; left: 136.6px; width: 537.6px; height: 384px;">
              <svg width="100%" height="100%">
                <defs>
                  <pattern height="18.432" id="pattern-transparency" patternUnits="userSpaceOnUse" width="18.432" x="0" y="0">
                    <rect class="pattern-cube" height="9.216" width="9.216" x="0" y="0"></rect>
                    <rect class="pattern-cube" height="9.216" width="9.216" x="9.216" y="9.216"></rect>                  
                  </pattern>
                  <lineargradient id="cpickerHue">
                    <stop offset="0" stop-color="#ffffff" stop-opacity="1"></stop>
                    <stop offset="1" stop-color="#ffffff" stop-opacity="0"></stop>
                  </lineargradient>
                  <lineargradient id="cpickerBrightness" x2="0" y2="1">
                    <stop offset="0" stop-color="#000000" stop-opacity="0"></stop>
                    <stop offset="1" stop-color="#000000" stop-opacity="1"></stop>
                  </lineargradient>
                  <lineargradient id="colorSliderGradient" x2="0" y2="1">
                    <stop offset="0" stop-color="hsl(0,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.06" stop-color="hsl(20,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.11" stop-color="hsl(40,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.17" stop-color="hsl(60,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.22" stop-color="hsl(80,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.28" stop-color="hsl(100,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.33" stop-color="hsl(120,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.39" stop-color="hsl(140,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.44" stop-color="hsl(160,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.50" stop-color="hsl(180,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.56" stop-color="hsl(200,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.61" stop-color="hsl(220,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.67" stop-color="hsl(240,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.72" stop-color="hsl(260,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.78" stop-color="hsl(280,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.83" stop-color="hsl(300,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.89" stop-color="hsl(320,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.94" stop-color="hsl(340,100%,50%" stop-opacity="1"></stop>
                    <stop offset="1.00" stop-color="hsl(360,100%,50%" stop-opacity="1"></stop>
                  </lineargradient>
                  <lineargradient id="opacitySliderGradient" x2="0" y2="1">
                    <stop offset="0" stop-color="#ff0000" stop-opacity="1"></stop>
                    <stop offset="1" stop-color="#ff0000" stop-opacity="0"></stop>
                  </lineargradient>
                </defs>
                <rect id="cpickerBackground" width="100%" height="100%"></rect>
                <g id="cpickerSBColor">
                  <rect id="cpickerPickColor" width="354.816" height="299.520" x="3%" y="11.520" fill="#ff0000"></rect>
                  <rect id="cpickerGradientS" rx="2" ry="2" width="354.816" height="299.520" x="3%" y="11.520" fill="url(http://testing.stenciljs.com/#cpickerHue)"></rect>
                  <rect id="cpickerGradientB" rx="2" ry="2" width="354.816" height="299.520" x="3%" y="11.520" fill="url(http://testing.stenciljs.com/#cpickerBrightness)"></rect>
                  <circle id="cpickerHandler" r="1.5%" cx="370.944" cy="11.520" fill="none" stroke="#ffffff" stroke-width="2"></circle>
                </g>
                <g id="cpickerOpacity">
                  <rect id="cpickerSliderWhite" width="11%" height="299.520" x="72%" y="11.520"></rect>
                  <rect id="cpickerTransparencySlider" width="11%" height="299.520" x="72%" y="11.520" fill="url(http://testing.stenciljs.com/#pattern-transparency)"></rect>
                  <rect id="cpickerSliderOpacity" width="11%" height="299.520" x="72%" y="11.520" fill="url(http://testing.stenciljs.com/#opacitySliderGradient)"></rect>
                  <rect id="cpickerOpaSliderHandler" width="11.4%" height="1.2%" x="71.8%" y="9.216" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                </g>
                <g id="cpickerHueColor">
                  <rect id="cpickerSliderHueColor" width="11%" height="299.520" x="86%" y="11.520" fill="url(http://testing.stenciljs.com/#colorSliderGradient)"></rect>
                  <rect id="cpickerColSliderHandler" width="11.4%" height="1.2%" x="85.8%" y="9.216" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                </g>
                <g id="cpickerFooter">
                  <rect id="cpickerOkay" width="161.280" height="42.240" x="91.392" y="85%" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                  <rect id="cpickerCancel" width="161.280" height="42.240" x="53%" y="85%"  fill="none" stroke="#ffffff" stroke-width="2"></rect>
                  <text fill="#ffffff" font-family="Verdana" font-size="26.880" id="cpickerOkayText" text-anchor="middle" x="172.032" y="93%">
                    Okay
                  </text>
                  <text fill="#ffffff" font-family="Verdana" font-size="26.880" id="cpickerCancelText" text-anchor="middle" x="365.568" y="93%">
                    Cancel
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </mock:shadow-root>
      </jeep-cpicker>`);
    }); 
    it('should display cpicker on load with no opacity', async () => {
      root.hideopacity = true;
      await page.waitForChanges();
      expect(root).toEqualHtml(`<jeep-cpicker color="#ff0000" opacity="1.000" hideopacity
        style="--cpicker-background-color: #242424; --cpicker-top: 10vh; --cpicker-left: 10vw; --cpicker-width: 70vmin; --cpicker-height: 50vmin;">
        <mock:shadow-root>
          <div class="cpicker-container">
            <div class="cpicker-wrapper" style="top: 76.8px; left: 136.6px; width: 537.6px; height: 384px;">
              <svg width="100%" height="100%">
                <defs>
                  <pattern height="18.432" id="pattern-transparency" patternUnits="userSpaceOnUse" width="18.432" x="0" y="0">
                    <rect class="pattern-cube" height="9.216" width="9.216" x="0" y="0"></rect>
                    <rect class="pattern-cube" height="9.216" width="9.216" x="9.216" y="9.216"></rect>                  
                  </pattern>
                  <lineargradient id="cpickerHue">
                    <stop offset="0" stop-color="#ffffff" stop-opacity="1"></stop>
                    <stop offset="1" stop-color="#ffffff" stop-opacity="0"></stop>
                  </lineargradient>
                  <lineargradient id="cpickerBrightness" x2="0" y2="1">
                    <stop offset="0" stop-color="#000000" stop-opacity="0"></stop>
                    <stop offset="1" stop-color="#000000" stop-opacity="1"></stop>
                  </lineargradient>
                  <lineargradient id="colorSliderGradient" x2="0" y2="1">
                    <stop offset="0" stop-color="hsl(0,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.06" stop-color="hsl(20,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.11" stop-color="hsl(40,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.17" stop-color="hsl(60,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.22" stop-color="hsl(80,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.28" stop-color="hsl(100,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.33" stop-color="hsl(120,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.39" stop-color="hsl(140,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.44" stop-color="hsl(160,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.50" stop-color="hsl(180,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.56" stop-color="hsl(200,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.61" stop-color="hsl(220,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.67" stop-color="hsl(240,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.72" stop-color="hsl(260,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.78" stop-color="hsl(280,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.83" stop-color="hsl(300,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.89" stop-color="hsl(320,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.94" stop-color="hsl(340,100%,50%" stop-opacity="1"></stop>
                    <stop offset="1.00" stop-color="hsl(360,100%,50%" stop-opacity="1"></stop>
                  </lineargradient>
                  <lineargradient id="opacitySliderGradient" x2="0" y2="1">
                    <stop offset="0" stop-color="#ff0000" stop-opacity="1"></stop>
                    <stop offset="1" stop-color="#ff0000" stop-opacity="0"></stop>
                  </lineargradient>
                </defs>
                <rect id="cpickerBackground" width="100%" height="100%"></rect>
                <g id="cpickerHeader">
                <rect id="cpickerWhite" width="446.208" height="46.080" x="0" y="0"></rect>
                <rect id="cpickerTransparency" width="446.208" height="46.080" x="0" y="0" fill="url(http://testing.stenciljs.com/#pattern-transparency)"></rect>
                <rect id="cpickerSelColor" width="446.208" height="46.080" x="0" y="0" fill="#ff0000" fill-opacity="1.000"></rect>
                <rect id="cpickerHueColor" width="91.392" height="46.080" x="446.208" y="0" fill="#ff0000"></rect>
                <text fill="#ffffff" font-family="Verdana" font-size="19.968" font-weight="bold" id="cpickerText" text-anchor="middle" x="215.040" y="8.5%">
                   #ff0000ff
                </text>
                </g>
                <g id="cpickerSBColor">
                <rect id="cpickerPickColor" width="430.080" height="253.440" x="3%" y="57.600" fill="#ff0000"></rect>
                <rect id="cpickerGradientS" rx="2" ry="2" width="430.080" height="253.440" x="3%" y="57.600" fill="url(http://testing.stenciljs.com/#cpickerHue)"></rect>
                <rect id="cpickerGradientB" rx="2" ry="2" width="430.080" height="253.440" x="3%" y="57.600" fill="url(http://testing.stenciljs.com/#cpickerBrightness)"></rect>
                <circle id="cpickerHandler" r="1.5%" cx="446.208" cy="57.600" fill="none" stroke="#ffffff" stroke-width="2"></circle>
                </g>
                <g id="cpickerHueColor">
                <rect id="cpickerSliderHueColor" width="11%" height="253.440" x="86%" y="57.600" fill="url(http://testing.stenciljs.com/#colorSliderGradient)"></rect>
                <rect id="cpickerColSliderHandler" width="11.4%" height="1.2%" x="85.8%" y="55.296" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                </g>
                <g id="cpickerFooter">
                <rect id="cpickerOkay" width="161.280" height="42.240" x="91.392" y="85%" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                <rect id="cpickerCancel" width="161.280" height="42.240" x="53%" y="85%"  fill="none" stroke="#ffffff" stroke-width="2"></rect>
                <text fill="#ffffff" font-family="Verdana" font-size="26.880" id="cpickerOkayText" text-anchor="middle" x="172.032" y="93%">
                  Okay
                </text>
                <text fill="#ffffff" font-family="Verdana" font-size="26.880" id="cpickerCancelText" text-anchor="middle" x="365.568" y="93%">
                  Cancel
                </text>
                </g>
              </svg>
            </div>
          </div>
        </mock:shadow-root>
      </jeep-cpicker>`);
    }); 
    it('should display cpicker on load with button text Valid, Cancel', async () => {
      root.buttons = "[Valid,Cancel]";
      await page.waitForChanges();
      expect(root).toEqualHtml(`<jeep-cpicker color="#ff0000" opacity="1.000" buttons="[Valid,Cancel]"
        style="--cpicker-background-color: #242424; --cpicker-top: 10vh; --cpicker-left: 10vw; --cpicker-width: 70vmin; --cpicker-height: 50vmin;">
        <mock:shadow-root>
          <div class="cpicker-container">
            <div class="cpicker-wrapper" style="top: 76.8px; left: 136.6px; width: 537.6px; height: 384px;">
              <svg width="100%" height="100%">
                <defs>
                  <pattern height="18.432" id="pattern-transparency" patternUnits="userSpaceOnUse" width="18.432" x="0" y="0">
                    <rect class="pattern-cube" height="9.216" width="9.216" x="0" y="0"></rect>
                    <rect class="pattern-cube" height="9.216" width="9.216" x="9.216" y="9.216"></rect>                  
                  </pattern>
                  <lineargradient id="cpickerHue">
                    <stop offset="0" stop-color="#ffffff" stop-opacity="1"></stop>
                    <stop offset="1" stop-color="#ffffff" stop-opacity="0"></stop>
                  </lineargradient>
                  <lineargradient id="cpickerBrightness" x2="0" y2="1">
                    <stop offset="0" stop-color="#000000" stop-opacity="0"></stop>
                    <stop offset="1" stop-color="#000000" stop-opacity="1"></stop>
                  </lineargradient>
                  <lineargradient id="colorSliderGradient" x2="0" y2="1">
                    <stop offset="0" stop-color="hsl(0,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.06" stop-color="hsl(20,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.11" stop-color="hsl(40,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.17" stop-color="hsl(60,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.22" stop-color="hsl(80,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.28" stop-color="hsl(100,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.33" stop-color="hsl(120,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.39" stop-color="hsl(140,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.44" stop-color="hsl(160,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.50" stop-color="hsl(180,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.56" stop-color="hsl(200,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.61" stop-color="hsl(220,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.67" stop-color="hsl(240,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.72" stop-color="hsl(260,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.78" stop-color="hsl(280,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.83" stop-color="hsl(300,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.89" stop-color="hsl(320,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.94" stop-color="hsl(340,100%,50%" stop-opacity="1"></stop>
                    <stop offset="1.00" stop-color="hsl(360,100%,50%" stop-opacity="1"></stop>
                  </lineargradient>
                  <lineargradient id="opacitySliderGradient" x2="0" y2="1">
                    <stop offset="0" stop-color="#ff0000" stop-opacity="1"></stop>
                    <stop offset="1" stop-color="#ff0000" stop-opacity="0"></stop>
                  </lineargradient>
                </defs>
                <rect id="cpickerBackground" width="100%" height="100%"></rect>
                <g id="cpickerHeader">
                <rect id="cpickerWhite" width="370.944" height="46.080" x="0" y="0"></rect>
                <rect id="cpickerTransparency" width="370.944" height="46.080" x="0" y="0" fill="url(http://testing.stenciljs.com/#pattern-transparency)"></rect>
                <rect id="cpickerSelColor" width="370.944" height="46.080" x="0" y="0" fill="#ff0000" fill-opacity="1.000"></rect>
                <rect id="cpickerHueColor" width="166.656" height="46.080" x="370.944" y="0" fill="#ff0000"></rect>
                <text fill="#ffffff" font-family="Verdana" font-size="19.968" font-weight="bold" id="cpickerText" text-anchor="middle" x="185.472" y="8.5%">
                   #ff0000ff
                </text>
                </g>
                <g id="cpickerSBColor">
                <rect id="cpickerPickColor" width="354.816" height="253.440" x="3%" y="57.600" fill="#ff0000"></rect>
                <rect id="cpickerGradientS" rx="2" ry="2" width="354.816" height="253.440" x="3%" y="57.600" fill="url(http://testing.stenciljs.com/#cpickerHue)"></rect>
                <rect id="cpickerGradientB" rx="2" ry="2" width="354.816" height="253.440" x="3%" y="57.600" fill="url(http://testing.stenciljs.com/#cpickerBrightness)"></rect>
                <circle id="cpickerHandler" r="1.5%" cx="370.944" cy="57.600" fill="none" stroke="#ffffff" stroke-width="2"></circle>
                </g>
                <g id="cpickerOpacity">
                <rect id="cpickerSliderWhite" width="11%" height="253.440" x="72%" y="57.600"></rect>
                <rect id="cpickerTransparencySlider" width="11%" height="253.440" x="72%" y="57.600" fill="url(http://testing.stenciljs.com/#pattern-transparency)"></rect>
                <rect id="cpickerSliderOpacity" width="11%" height="253.440" x="72%" y="57.600" fill="url(http://testing.stenciljs.com/#opacitySliderGradient)"></rect>
                <rect id="cpickerOpaSliderHandler" width="11.4%" height="1.2%" x="71.8%" y="55.296" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                </g>
                <g id="cpickerHueColor">
                <rect id="cpickerSliderHueColor" width="11%" height="253.440" x="86%" y="57.600" fill="url(http://testing.stenciljs.com/#colorSliderGradient)"></rect>
                <rect id="cpickerColSliderHandler" width="11.4%" height="1.2%" x="85.8%" y="55.296" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                </g>
                <g id="cpickerFooter">
                <rect id="cpickerOkay" width="161.280" height="42.240" x="91.392" y="85%" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                <rect id="cpickerCancel" width="161.280" height="42.240" x="53%" y="85%"  fill="none" stroke="#ffffff" stroke-width="2"></rect>
                <text fill="#ffffff" font-family="Verdana" font-size="26.880" id="cpickerOkayText" text-anchor="middle" x="172.032" y="93%">
                  Valid
                </text>
                <text fill="#ffffff" font-family="Verdana" font-size="26.880" id="cpickerCancelText" text-anchor="middle" x="365.568" y="93%">
                  Cancel
                </text>
                </g>
              </svg>
            </div>
          </div>
        </mock:shadow-root>
      </jeep-cpicker>`);
    }); 
    it('should display cpicker on load with button text Valid, Dismiss', async () => {
      root.buttons = "[Valid,Dismiss]";
      await page.waitForChanges();
      expect(root).toEqualHtml(`<jeep-cpicker color="#ff0000" opacity="1.000" buttons="[Valid,Dismiss]"
        style="--cpicker-background-color: #242424; --cpicker-top: 10vh; --cpicker-left: 10vw; --cpicker-width: 70vmin; --cpicker-height: 50vmin;">
        <mock:shadow-root>
          <div class="cpicker-container">
            <div class="cpicker-wrapper" style="top: 76.8px; left: 136.6px; width: 537.6px; height: 384px;">
              <svg width="100%" height="100%">
                <defs>
                  <pattern height="18.432" id="pattern-transparency" patternUnits="userSpaceOnUse" width="18.432" x="0" y="0">
                    <rect class="pattern-cube" height="9.216" width="9.216" x="0" y="0"></rect>
                    <rect class="pattern-cube" height="9.216" width="9.216" x="9.216" y="9.216"></rect>                  
                  </pattern>
                  <lineargradient id="cpickerHue">
                    <stop offset="0" stop-color="#ffffff" stop-opacity="1"></stop>
                    <stop offset="1" stop-color="#ffffff" stop-opacity="0"></stop>
                  </lineargradient>
                  <lineargradient id="cpickerBrightness" x2="0" y2="1">
                    <stop offset="0" stop-color="#000000" stop-opacity="0"></stop>
                    <stop offset="1" stop-color="#000000" stop-opacity="1"></stop>
                  </lineargradient>
                  <lineargradient id="colorSliderGradient" x2="0" y2="1">
                    <stop offset="0" stop-color="hsl(0,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.06" stop-color="hsl(20,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.11" stop-color="hsl(40,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.17" stop-color="hsl(60,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.22" stop-color="hsl(80,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.28" stop-color="hsl(100,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.33" stop-color="hsl(120,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.39" stop-color="hsl(140,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.44" stop-color="hsl(160,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.50" stop-color="hsl(180,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.56" stop-color="hsl(200,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.61" stop-color="hsl(220,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.67" stop-color="hsl(240,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.72" stop-color="hsl(260,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.78" stop-color="hsl(280,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.83" stop-color="hsl(300,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.89" stop-color="hsl(320,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.94" stop-color="hsl(340,100%,50%" stop-opacity="1"></stop>
                    <stop offset="1.00" stop-color="hsl(360,100%,50%" stop-opacity="1"></stop>
                  </lineargradient>
                  <lineargradient id="opacitySliderGradient" x2="0" y2="1">
                    <stop offset="0" stop-color="#ff0000" stop-opacity="1"></stop>
                    <stop offset="1" stop-color="#ff0000" stop-opacity="0"></stop>
                  </lineargradient>
                </defs>
                <rect id="cpickerBackground" width="100%" height="100%"></rect>
                <g id="cpickerHeader">
                <rect id="cpickerWhite" width="370.944" height="46.080" x="0" y="0"></rect>
                <rect id="cpickerTransparency" width="370.944" height="46.080" x="0" y="0" fill="url(http://testing.stenciljs.com/#pattern-transparency)"></rect>
                <rect id="cpickerSelColor" width="370.944" height="46.080" x="0" y="0" fill="#ff0000" fill-opacity="1.000"></rect>
                <rect id="cpickerHueColor" width="166.656" height="46.080" x="370.944" y="0" fill="#ff0000"></rect>
                <text fill="#ffffff" font-family="Verdana" font-size="19.968" font-weight="bold" id="cpickerText" text-anchor="middle" x="185.472" y="8.5%">
                   #ff0000ff
                </text>
                </g>
                <g id="cpickerSBColor">
                <rect id="cpickerPickColor" width="354.816" height="253.440" x="3%" y="57.600" fill="#ff0000"></rect>
                <rect id="cpickerGradientS" rx="2" ry="2" width="354.816" height="253.440" x="3%" y="57.600" fill="url(http://testing.stenciljs.com/#cpickerHue)"></rect>
                <rect id="cpickerGradientB" rx="2" ry="2" width="354.816" height="253.440" x="3%" y="57.600" fill="url(http://testing.stenciljs.com/#cpickerBrightness)"></rect>
                <circle id="cpickerHandler" r="1.5%" cx="370.944" cy="57.600" fill="none" stroke="#ffffff" stroke-width="2"></circle>
                </g>
                <g id="cpickerOpacity">
                <rect id="cpickerSliderWhite" width="11%" height="253.440" x="72%" y="57.600"></rect>
                <rect id="cpickerTransparencySlider" width="11%" height="253.440" x="72%" y="57.600" fill="url(http://testing.stenciljs.com/#pattern-transparency)"></rect>
                <rect id="cpickerSliderOpacity" width="11%" height="253.440" x="72%" y="57.600" fill="url(http://testing.stenciljs.com/#opacitySliderGradient)"></rect>
                <rect id="cpickerOpaSliderHandler" width="11.4%" height="1.2%" x="71.8%" y="55.296" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                </g>
                <g id="cpickerHueColor">
                <rect id="cpickerSliderHueColor" width="11%" height="253.440" x="86%" y="57.600" fill="url(http://testing.stenciljs.com/#colorSliderGradient)"></rect>
                <rect id="cpickerColSliderHandler" width="11.4%" height="1.2%" x="85.8%" y="55.296" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                </g>
                <g id="cpickerFooter">
                <rect id="cpickerOkay" width="161.280" height="42.240" x="91.392" y="85%" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                <rect id="cpickerCancel" width="161.280" height="42.240" x="53%" y="85%"  fill="none" stroke="#ffffff" stroke-width="2"></rect>
                <text fill="#ffffff" font-family="Verdana" font-size="26.880" id="cpickerOkayText" text-anchor="middle" x="172.032" y="93%">
                  Valid
                </text>
                <text fill="#ffffff" font-family="Verdana" font-size="26.880" id="cpickerCancelText" text-anchor="middle" x="365.568" y="93%">
                  Dismiss
                </text>
                </g>
              </svg>
            </div>
          </div>
        </mock:shadow-root>
      </jeep-cpicker>`);
    }); 
    it('should display cpicker on load with button text V, X and color #00ff00,#ff0000', async () => {
      root.buttons = "[V,X]";
      await page.waitForChanges();
      expect(root).toEqualHtml(`<jeep-cpicker color="#ff0000" opacity="1.000" buttons="[V,X]"
        style="--cpicker-background-color: #242424; --cpicker-top: 10vh; --cpicker-left: 10vw; --cpicker-width: 70vmin; --cpicker-height: 50vmin;">
        <mock:shadow-root>
          <div class="cpicker-container">
            <div class="cpicker-wrapper" style="top: 76.8px; left: 136.6px; width: 537.6px; height: 384px;">
              <svg width="100%" height="100%">
                <defs>
                  <pattern height="18.432" id="pattern-transparency" patternUnits="userSpaceOnUse" width="18.432" x="0" y="0">
                    <rect class="pattern-cube" height="9.216" width="9.216" x="0" y="0"></rect>
                    <rect class="pattern-cube" height="9.216" width="9.216" x="9.216" y="9.216"></rect>                  
                  </pattern>
                  <lineargradient id="cpickerHue">
                    <stop offset="0" stop-color="#ffffff" stop-opacity="1"></stop>
                    <stop offset="1" stop-color="#ffffff" stop-opacity="0"></stop>
                  </lineargradient>
                  <lineargradient id="cpickerBrightness" x2="0" y2="1">
                    <stop offset="0" stop-color="#000000" stop-opacity="0"></stop>
                    <stop offset="1" stop-color="#000000" stop-opacity="1"></stop>
                  </lineargradient>
                  <lineargradient id="colorSliderGradient" x2="0" y2="1">
                    <stop offset="0" stop-color="hsl(0,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.06" stop-color="hsl(20,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.11" stop-color="hsl(40,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.17" stop-color="hsl(60,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.22" stop-color="hsl(80,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.28" stop-color="hsl(100,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.33" stop-color="hsl(120,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.39" stop-color="hsl(140,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.44" stop-color="hsl(160,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.50" stop-color="hsl(180,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.56" stop-color="hsl(200,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.61" stop-color="hsl(220,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.67" stop-color="hsl(240,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.72" stop-color="hsl(260,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.78" stop-color="hsl(280,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.83" stop-color="hsl(300,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.89" stop-color="hsl(320,100%,50%" stop-opacity="1"></stop>
                    <stop offset="0.94" stop-color="hsl(340,100%,50%" stop-opacity="1"></stop>
                    <stop offset="1.00" stop-color="hsl(360,100%,50%" stop-opacity="1"></stop>
                  </lineargradient>
                  <lineargradient id="opacitySliderGradient" x2="0" y2="1">
                    <stop offset="0" stop-color="#ff0000" stop-opacity="1"></stop>
                    <stop offset="1" stop-color="#ff0000" stop-opacity="0"></stop>
                  </lineargradient>
                </defs>
                <rect id="cpickerBackground" width="100%" height="100%"></rect>
                <g id="cpickerHeader">
                <rect id="cpickerWhite" width="370.944" height="46.080" x="0" y="0"></rect>
                <rect id="cpickerTransparency" width="370.944" height="46.080" x="0" y="0" fill="url(http://testing.stenciljs.com/#pattern-transparency)"></rect>
                <rect id="cpickerSelColor" width="370.944" height="46.080" x="0" y="0" fill="#ff0000" fill-opacity="1.000"></rect>
                <rect id="cpickerHueColor" width="166.656" height="46.080" x="370.944" y="0" fill="#ff0000"></rect>
                <text fill="#ffffff" font-family="Verdana" font-size="19.968" font-weight="bold" id="cpickerText" text-anchor="middle" x="185.472" y="8.5%">
                   #ff0000ff
                </text>
                </g>
                <g id="cpickerSBColor">
                <rect id="cpickerPickColor" width="354.816" height="253.440" x="3%" y="57.600" fill="#ff0000"></rect>
                <rect id="cpickerGradientS" rx="2" ry="2" width="354.816" height="253.440" x="3%" y="57.600" fill="url(http://testing.stenciljs.com/#cpickerHue)"></rect>
                <rect id="cpickerGradientB" rx="2" ry="2" width="354.816" height="253.440" x="3%" y="57.600" fill="url(http://testing.stenciljs.com/#cpickerBrightness)"></rect>
                <circle id="cpickerHandler" r="1.5%" cx="370.944" cy="57.600" fill="none" stroke="#ffffff" stroke-width="2"></circle>
                </g>
                <g id="cpickerOpacity">
                <rect id="cpickerSliderWhite" width="11%" height="253.440" x="72%" y="57.600"></rect>
                <rect id="cpickerTransparencySlider" width="11%" height="253.440" x="72%" y="57.600" fill="url(http://testing.stenciljs.com/#pattern-transparency)"></rect>
                <rect id="cpickerSliderOpacity" width="11%" height="253.440" x="72%" y="57.600" fill="url(http://testing.stenciljs.com/#opacitySliderGradient)"></rect>
                <rect id="cpickerOpaSliderHandler" width="11.4%" height="1.2%" x="71.8%" y="55.296" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                </g>
                <g id="cpickerHueColor">
                <rect id="cpickerSliderHueColor" width="11%" height="253.440" x="86%" y="57.600" fill="url(http://testing.stenciljs.com/#colorSliderGradient)"></rect>
                <rect id="cpickerColSliderHandler" width="11.4%" height="1.2%" x="85.8%" y="55.296" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                </g>
                <g id="cpickerFooter">
                <rect id="cpickerOkay" width="43.008" height="42.240" x="209.664" y="85%" fill="none" stroke="#ffffff" stroke-width="2"></rect>
                <rect id="cpickerCancel" width="43.008" height="42.240" x="53%" y="85%"  fill="none" stroke="#ffffff" stroke-width="2"></rect>
                <text fill="#00ff00" font-family="Verdana" font-size="26.880" id="cpickerOkayText" text-anchor="middle" x="231.168" y="93%">
                  V
                </text>
                <text fill="#ff0000" font-family="Verdana" font-size="26.880" id="cpickerCancelText" text-anchor="middle" x="306.432" y="93%">
                  X
                </text>
                </g>
              </svg>
            </div>
          </div>
        </mock:shadow-root>
      </jeep-cpicker>`);
    }); 

    it('should init without color, opacity properties given', async () => {
      const states: StateProperties = await root.getStateProperties();
      expect(states.color.hex.hex).toEqual('#ff0000');
      expect(states.opacity).toEqual('1.000');
      expect(states.hue).toEqual('#ff0000');
      expect(states.colorHeadline).toEqual('#ff0000ff');
      expect(states.textType).toEqual('hex');
      expect(states.pickerHandler.x).toBeCloseTo(370.944);
      expect(states.pickerHandler.y).toBeCloseTo(57.6);
      expect(states.hueHandlerY).toBeCloseTo(55.296);
      expect(states.opaHandlerY).toBeCloseTo(55.296);
      const cssVar:any = await root.getWrapperCssVariables();
      expect(cssVar.backColor).toEqual('#242424');
      expect(cssVar.top).toEqual('10vh');
      expect(cssVar.left).toEqual('10vw');
      expect(cssVar.width).toEqual('70vmin');
      expect(cssVar.height).toEqual('50vmin');
      expect(states.colorText).toEqual('#ffffff');
      expect(states.colorHandle).toEqual('#ffffff');
    });
    it('should init with color property given', async () => {
      root.color = "#2cb465";
      await page.waitForChanges();
      const states: StateProperties = await root.getStateProperties();
      expect(states.color.hex.hex).toEqual('#2cb465');
      expect(states.opacity).toEqual('1.000');
      expect(states.hue).toEqual('#00ff6b');
      expect(states.colorHeadline).toEqual('#2cb465ff');
      expect(states.textType).toEqual('hex');
      expect(states.colorText).toEqual('#000000');
      expect(states.colorHandle).toEqual('#ffffff');
      expect(states.pickerHandler.x).toBeCloseTo(284.213);
      expect(states.pickerHandler.y).toBeCloseTo(132.1418);
      expect(states.hueHandlerY).toBeCloseTo(157.4795);
      expect(states.opaHandlerY).toBeCloseTo(55.296);
    });
    it('should init with opacity property given', async () => {
      root.opacity = "0.725";
      await page.waitForChanges();
      const states: StateProperties = await root.getStateProperties();
      expect(states.color.hex.hex).toEqual('#ff0000');
      expect(states.opacity).toEqual('0.725');
      expect(states.hue).toEqual('#ff0000');
      expect(states.colorHeadline).toEqual('#ff0000b9');
      expect(states.textType).toEqual('hex');
      expect(states.colorText).toEqual('#ffffff');
      expect(states.colorHandle).toEqual('#ffffff');
      expect(states.pickerHandler.x).toBeCloseTo(370.944);
      expect(states.pickerHandler.y).toBeCloseTo(57.6);
      expect(states.hueHandlerY).toBeCloseTo(55.296);
      expect(states.opaHandlerY).toBeCloseTo(124.992);
    });
    it('should init with color & opacity properties given', async () => {
      root.color = "#3e1cbb";
      root.opacity = "0.5";
      await page.waitForChanges();
      const states: StateProperties = await root.getStateProperties();
      expect(states.color.hex.hex).toEqual('#3e1cbb');
      expect(states.opacity).toEqual('0.500');
      expect(states.hue).toEqual('#3700ff');
      expect(states.colorHeadline).toEqual('#3e1cbb80');
      expect(states.textType).toEqual('hex');
      expect(states.colorText).toEqual('#ffffff');
      expect(states.colorHandle).toEqual('#ffffff');
      expect(states.pickerHandler.x).toBeCloseTo(317.8174);
      expect(states.pickerHandler.y).toBeCloseTo(125.1848);
      expect(states.hueHandlerY).toBeCloseTo(233.288);
      expect(states.opaHandlerY).toBeCloseTo(182.016);
    });
    it('should render with background color #ffff00 & other css variables set to default ', async () => {
      root.style.setProperty('--cpicker-background-color','#ffff00');
      root.opacity = "0.5";
      root.init();
      await page.waitForChanges();
      const states: StateProperties = await root.getStateProperties();
      const cssVar:any = await root.getWrapperCssVariables();
      expect(cssVar.backColor).toEqual('#ffff00');
      expect(cssVar.top).toEqual('10vh');
      expect(cssVar.left).toEqual('10vw');
      expect(cssVar.width).toEqual('70vmin');
      expect(cssVar.height).toEqual('50vmin');
      expect(states.colorText).toEqual('#ffffff');
      expect(states.colorHandle).toEqual('#000000');
    });
    it('should render with --cpicker-top set to 30vh & other css variables set to default', async () => {
      root.style.setProperty('--cpicker-top','30vh');
      root.init();
      await page.waitForChanges();
      const cssVar:any = await root.getWrapperCssVariables();
      expect(cssVar.backColor).toEqual('#242424');
      expect(cssVar.top).toEqual('30vh');
      expect(cssVar.left).toEqual('10vw');
      expect(cssVar.width).toEqual('70vmin');
      expect(cssVar.height).toEqual('50vmin');
    });
    it('should render with --cpicker-left set to 5vw & other css variables set to default', async () => {
      root.style.setProperty('--cpicker-left','5vw');
      root.init();
      await page.waitForChanges();
      const cssVar:any = await root.getWrapperCssVariables();
      expect(cssVar.backColor).toEqual('#242424');
      expect(cssVar.top).toEqual('10vh');
      expect(cssVar.left).toEqual('5vw');
      expect(cssVar.width).toEqual('70vmin');
      expect(cssVar.height).toEqual('50vmin');
    });
    it('should render with --cpicker-width set to 50vw & other css variables set to default', async () => {
      root.style.setProperty('--cpicker-width','50vw');
      root.init();
      await page.waitForChanges();
      const cssVar:any = await root.getWrapperCssVariables();
      expect(cssVar.backColor).toEqual('#242424');
      expect(cssVar.top).toEqual('10vh');
      expect(cssVar.left).toEqual('10vw');
      expect(cssVar.width).toEqual('50vw');
      expect(cssVar.height).toEqual('50vmin');
    });
    it('should render with --cpicker-height set to 40vh & other css variables set to default', async () => {
      root.style.setProperty('--cpicker-height','40vh');
      root.init();
      await page.waitForChanges();
      const cssVar:any = await root.getWrapperCssVariables();
      expect(cssVar.backColor).toEqual('#242424');
      expect(cssVar.top).toEqual('10vh');
      expect(cssVar.left).toEqual('10vw');
      expect(cssVar.width).toEqual('70vmin');
      expect(cssVar.height).toEqual('40vh');
    });
    it('should render with color text type = "hex" on init', async () => {
      let states: StateProperties = await root.getStateProperties();
      expect(states.colorHeadline).toEqual('#ff0000ff');
      expect(states.textType).toEqual('hex');
      });
    it('should set Hue color to 360', async () => {
        const hue = await root.calcH(150,150);
        expect(hue).toEqual(360);
    });
    it('should set Hue color to 192', async () => {
        const hue = await root.calcH(80,150);
        expect(hue).toEqual(192);
    });
    it('should set Hue color to 108', async () => {
        const hue = await root.calcH(45,150);
        expect(hue).toEqual(108);
    });
    it('should set Hue color to 0', async () => {
        const hue = await root.calcH(0,150);
        expect(hue).toEqual(0);
    });
    it('should set Opacity to 0', async () => {
        const opa = await root.calcO(150,150);
        expect(opa).toEqual(0);
    });
    it('should set Opacity to 0.1267', async () => {
        const opa = await root.calcO(131,150);
        expect(opa).toBeCloseTo(0.1267);
    });
    it('should set Opacity to 0.34', async () => {
        const opa = await root.calcO(99,150);
        expect(opa).toBeCloseTo(0.34);
    });
    it('should set Opacity to 0.72', async () => {
        const opa = await root.calcO(42,150);
        expect(opa).toBeCloseTo(0.72);
    });
    it('should set Opacity to 1', async () => {
        const opa = await root.calcO(0,150);
        expect(opa).toEqual(1);
    });
    it('should set Saturation to 100', async () => {
        const sat = await root.calcS(180,180);
        expect(sat).toEqual(100);
    });
    it('should set Saturation to 91.667', async () => {
        const sat = await root.calcS(165,180);
        expect(sat).toBeCloseTo(91.667);
    });
    it('should set Saturation to 52.778', async () => {
        const sat = await root.calcS(95,180);
        expect(sat).toBeCloseTo(52.778);
    });
    it('should set Saturation to 0', async () => {
        const sat = await root.calcS(0,180);
        expect(sat).toEqual(0);
    });
    it('should set Brightness to 100', async () => {
        const bri = await root.calcB(0,150);
        expect(bri).toEqual(100);
    });
    it('should set Brightness to 61.333', async () => {
        const bri = await root.calcB(58,150);
        expect(bri).toBeCloseTo(61.333);
    });
    it('should set Brightness to 52', async () => {
        const bri = await root.calcB(72,150);
        expect(bri).toBeCloseTo(52);
    });
    it('should set Brightness to 0', async () => {
        const bri = await root.calcB(150,150);
        expect(bri).toEqual(0);
    });
});