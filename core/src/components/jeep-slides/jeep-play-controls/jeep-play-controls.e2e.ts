import { newE2EPage, E2EPage, E2EElement  } from '@stencil/core/testing';
import { EventSpy } from '@stencil/core/dist/declarations';

describe('jeep-play-controls', () => {

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<jeep-play-controls></jeep-play-controls>');
    const cmp = await page.find('jeep-play-controls');
    const container: E2EElement = await page.find('jeep-play-controls >>> .playcontrols-container');
    expect(cmp).toHaveClass('hydrated');
    expect(cmp).toEqualHtml(`<jeep-play-controls class="hydrated">
      <mock:shadow-root>
        <div class="playcontrols-container">
          <div class="disabled playcontrols-button playcontrols-button-skip-backward"></div>
          <div class="play playcontrols-button playcontrols-button-play"></div>
          <div class="disabled playcontrols-button playcontrols-button-skip-forward"></div>
        </div>
      </mock:shadow-root>
    </jeep-play-controls>`);
    expect(container).toHaveClass('playcontrols-container');
  });

  describe('rendering', () => {
    let page: E2EPage;
    let cmp: E2EElement;
    let container: E2EElement;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent('<jeep-play-controls></jeep-play-controls>');
      cmp = await page.find('jeep-play-controls');
      container = await page.find('jeep-play-controls >>> .playcontrols-container');
    });
    afterEach(() => {
      page = null;
      cmp = null;
      container = null;
    });   
    it('Should have the skipBackward disabled on start', async () => {
      const skipBackwardEl: E2EElement = await container.find('.playcontrols-button-skip-backward');
      expect(skipBackwardEl).toHaveClass('disabled');
    });
    it('Should have the skipBackward disabled', async () => {
     await cmp.callMethod('setJeepPlayControlsSkipBackwardDisabled',{disabled:true});
     await page.waitForChanges();
      const skipBackwardEl: E2EElement = await container.find('.playcontrols-button-skip-backward');
      expect(skipBackwardEl).toHaveClass('disabled');
    });
    it('Should have the skipBackward enabled', async () => {
      await cmp.callMethod('setJeepPlayControlsSkipBackwardDisabled',{disabled:false});
      await page.waitForChanges();
      const skipBackwardEl: E2EElement = await container.find('.playcontrols-button-skip-backward');
      expect(skipBackwardEl).not.toHaveClass('disabled');
    });
    it('Should have the skipForward disabled on start', async () => {
      const skipForwardEl: E2EElement = await container.find('.playcontrols-button-skip-forward');
      expect(skipForwardEl).toHaveClass('disabled');
    });
    it('Should have the skipForward disabled', async () => {
     await cmp.callMethod('setJeepPlayControlsSkipForwardDisabled',{disabled:true});
     await page.waitForChanges();
      const skipForwardEl: E2EElement = await container.find('.playcontrols-button-skip-forward');
      expect(skipForwardEl).toHaveClass('disabled');
    });
    it('Should have the skipForward enabled', async () => {
      await cmp.callMethod('setJeepPlayControlsSkipForwardDisabled',{disabled:false});
      await page.waitForChanges();
      const skipForwardEl: E2EElement = await container.find('.playcontrols-button-skip-forward');
      expect(skipForwardEl).not.toHaveClass('disabled');
    }); 
    it('Should have the playcontrols container visible on start', async () => {
      expect(container).not.toHaveClass('hidden');
    });
    it('Should have the playcontrols container hidden', async () => {
      await cmp.callMethod('setJeepPlayControlsVisibility',{visibility:'hidden'});
      await page.waitForChanges();
      expect(container).toHaveClass('hidden');
    });
    it('Should have the playcontrols container visible', async () => {
      await cmp.callMethod('setJeepPlayControlsVisibility',{visibility:'visible'});
      await page.waitForChanges();
      expect(container).not.toHaveClass('hidden');
    });
    it('Should have the playcontrols play button to play on start', async () => {
      const playBut = await container.find('.playcontrols-button-play');
      expect(playBut).toHaveClass('play');
    });

    it('Should work with no duration property given', async () => {
      const duration: number = await cmp.callMethod('getJeepPlayControlsDuration');
      await page.waitForChanges();
      expect(duration).toEqual(1000);
    });
    it('Should return duration', async () => {
      cmp.setProperty('duration','2500');
      const duration: number = await cmp.callMethod('getJeepPlayControlsDuration');
      await page.waitForChanges();
      expect(duration).toEqual(2500);
    });
    it('Should jeepPlayControlsCurrentIndex emit on start', async () => {
      const curIndex  = await cmp.spyOnEvent('jeepPlayControlsCurrentIndex');
      await cmp.callMethod('init');
      await page.waitForChanges();
      expect(curIndex).toHaveReceivedEventDetail({index:"0"});
    });
    it('Should jeepPlayControlsIsBeginning emit on start', async () => {
      const isBeginning  = await page.spyOnEvent('jeepPlayControlsIsBeginning');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls')
      await page.waitForChanges();
      expect(isBeginning).toHaveReceivedEvent();
    });
    it('Should jeepPlayControlsIsEnd emit on start if no toslide property given', async () => {
      const isEnd  = await page.spyOnEvent('jeepPlayControlsIsEnd');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls')
      await page.waitForChanges();
      expect(isEnd).toHaveReceivedEvent();
    });
    it('Should not emit jeepPlayControlsIsEnd on start if toslide property given', async () => {
      cmp.setProperty('toslide','4');
      const isEnd  = await page.spyOnEvent('jeepPlayControlsIsEnd');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls')
      await page.waitForChanges();
      expect(isEnd).not.toHaveReceivedEvent();
    });
    it('Should have a skipForward enabled on start if toslide property given', async () => {
      cmp.setProperty('toslide','4');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls')
      await page.waitForChanges();
      const skipForwardEl: E2EElement = await container.find('.playcontrols-button-skip-forward');
      expect(skipForwardEl).not.toHaveClass('disabled');
    });
    it('Should jeepPlayControlsCurrentIndex emit on start when fromslide property is given', async () => {
      const curIndex  = await cmp.spyOnEvent('jeepPlayControlsCurrentIndex');
      cmp.setProperty('fromslide','3');
      await cmp.callMethod('init');
      await page.waitForChanges();
      expect(curIndex).toHaveReceivedEventDetail({index:"3"});
    });
    it('Should have a skipBackward disabled on start when fromslide property given', async () => {
      cmp.setProperty('fromslide','2');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls')
      await page.waitForChanges();
      const skipBackwardEl: E2EElement = await container.find('.playcontrols-button-skip-backward');
      expect(skipBackwardEl).toHaveClass('disabled');
    });
    it('Should not play on start', async () => {
      cmp.setProperty('toslide','5');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await page.waitForChanges();
      const isPlaying: boolean = await cmp.callMethod('isPlaying');
      expect(isPlaying).toBeFalsy();
    });
    it('Should emit jeepPlayControlsAutoplayStart when autoplayStart', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      const playStart = await cmp.spyOnEvent('jeepPlayControlsAutoplayStart');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart')
      await page.waitForChanges();
      expect(playStart).toHaveReceivedEventTimes(1);
    });
    it('Should play when autoplayStart', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      const curIndex  = await cmp.spyOnEvent('jeepPlayControlsCurrentIndex');
      const playStart = await cmp.spyOnEvent('jeepPlayControlsAutoplayStart');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart')
      await page.waitFor(100);
      const isPlaying: boolean = await cmp.callMethod('isPlaying');
      const index = await cmp.callMethod('getCurrentIndex');
      expect(isPlaying).toBeTruthy();
      expect(index).toEqual(0); 
      expect(curIndex).toHaveReceivedEventTimes(1);
      expect(playStart).toHaveReceivedEventTimes(1);
    });    

    it('Should play slide 1 after duration 200', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      const curIndex  = await cmp.spyOnEvent('jeepPlayControlsCurrentIndex');
      const playStart = await cmp.spyOnEvent('jeepPlayControlsAutoplayStart');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart')
      await page.waitFor(300);
      const isPlaying: boolean = await cmp.callMethod('isPlaying');
      const index = await cmp.callMethod('getCurrentIndex');
      expect(isPlaying).toBeTruthy();
      expect(index).toEqual(1); 
      expect(curIndex).toHaveReceivedEventTimes(2);
      expect(playStart).toHaveReceivedEventTimes(1);
    });
    it('Should play slide 2 after duration 400', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      const curIndex  = await cmp.spyOnEvent('jeepPlayControlsCurrentIndex');
      const playStart = await cmp.spyOnEvent('jeepPlayControlsAutoplayStart');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart')
      await page.waitFor(500);
      const isPlaying: boolean = await cmp.callMethod('isPlaying');
      const index = await cmp.callMethod('getCurrentIndex');
      expect(isPlaying).toBeTruthy();
      expect(index).toEqual(2); 
      expect(curIndex).toHaveReceivedEventTimes(3);
      expect(playStart).toHaveReceivedEventTimes(1);
    });

    it('Should play slide 3 after duration 600', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      const curIndex  = await cmp.spyOnEvent('jeepPlayControlsCurrentIndex');
      const isEnd  = await cmp.spyOnEvent('jeepPlayControlsIsEnd');
      const playStart = await cmp.spyOnEvent('jeepPlayControlsAutoplayStart');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart')
      await page.waitFor(700);
      const isPlaying: boolean = await cmp.callMethod('isPlaying');
      const index = await cmp.callMethod('getCurrentIndex');
      expect(isPlaying).toBeTruthy();
      expect(index).toEqual(3);
      expect(isEnd).toHaveReceivedEvent(); 
      expect(curIndex).toHaveReceivedEventTimes(4);
      expect(playStart).toHaveReceivedEventTimes(1);
    });
    it('Should get back to the fromslide after duration 800', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      const curIndex  = await cmp.spyOnEvent('jeepPlayControlsCurrentIndex');
      const isBeginning  = await cmp.spyOnEvent('jeepPlayControlsIsBeginning');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart')
      await page.waitFor(900);
      const isPlaying: boolean = await cmp.callMethod('isPlaying');
      expect(isPlaying).toBeFalsy();
      const index = await cmp.callMethod('getCurrentIndex');
      expect(index).toEqual(0); 
      expect(isBeginning).toHaveReceivedEvent(); 
      expect(curIndex).toHaveReceivedEventTimes(5);
    });
    it('Should emit jeepPlayControlsAutoplayStop when autoplayStop', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      const playStop = await cmp.spyOnEvent('jeepPlayControlsAutoplayStop');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart')
      await page.waitFor(100);
      await cmp.callMethod('autoplayStop')
      await page.waitForChanges();
      expect(playStop).toHaveReceivedEventTimes(1);
    });
    it('Should stop after 400ms', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      const curIndex  = await cmp.spyOnEvent('jeepPlayControlsCurrentIndex');
      const isBeginning  = await cmp.spyOnEvent('jeepPlayControlsIsBeginning');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart');
      await page.waitFor(450);
      await cmp.callMethod('autoplayStop');
      await page.waitForChanges();
      const isPlaying: boolean = await cmp.callMethod('isPlaying');
      expect(isPlaying).toBeFalsy();
      expect(isBeginning).toHaveReceivedEventTimes(2); 
      expect(curIndex).toHaveReceivedEventTimes(4);
      const index = await cmp.callMethod('getCurrentIndex');
      expect(index).toEqual(0); 
    });
    it('Should emit jeepPlayControlsAutoplayPause when autoplayPause', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      const playPause = await cmp.spyOnEvent('jeepPlayControlsAutoplayPause');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart')
      await page.waitFor(100);
      await cmp.callMethod('autoplayPause')
      await page.waitForChanges();
      expect(playPause).toHaveReceivedEventTimes(1);
    });
    it('Should pause after 400ms', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      const curIndex  = await cmp.spyOnEvent('jeepPlayControlsCurrentIndex');
      const isBeginning  = await cmp.spyOnEvent('jeepPlayControlsIsBeginning');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart');
      await page.waitFor(420);
      await cmp.callMethod('autoplayPause');
      await page.waitForChanges();
      const isPlaying: boolean = await cmp.callMethod('isPlaying');
      expect(isPlaying).toBeFalsy();
      const index = await cmp.callMethod('getCurrentIndex');
      expect(index).toEqual(2); 
      expect(isBeginning).toHaveReceivedEventTimes(1); 
      expect(curIndex).toHaveReceivedEventTimes(3);
    });
    it('Should restart on same slide after a pause after 400ms', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      const curIndex  = await cmp.spyOnEvent('jeepPlayControlsCurrentIndex');
      const isBeginning  = await cmp.spyOnEvent('jeepPlayControlsIsBeginning');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart');
      await page.waitFor(420);
      await cmp.callMethod('autoplayPause');
      await page.waitFor(100);
      await cmp.callMethod('autoplayStart');
      const index = await cmp.callMethod('getCurrentIndex');
      await page.waitFor(100);
      const isPlaying: boolean = await cmp.callMethod('isPlaying');
      expect(isPlaying).toBeTruthy();
      expect(index).toEqual(2); 
      expect(isBeginning).toHaveReceivedEventTimes(1); 
      expect(curIndex).toHaveReceivedEventTimes(3);
    });
    it('Should restart on same slide after a pause after 400ms and reach the next one after 200ms', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      const curIndex  = await cmp.spyOnEvent('jeepPlayControlsCurrentIndex');
      const isEnd  = await cmp.spyOnEvent('jeepPlayControlsIsEnd');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart');
      await page.waitFor(420);
      await cmp.callMethod('autoplayPause');
      await page.waitFor(100);
      await cmp.callMethod('autoplayStart');
      await page.waitFor(220);
      const isPlaying: boolean = await cmp.callMethod('isPlaying');
      expect(isPlaying).toBeTruthy();
      const index = await cmp.callMethod('getCurrentIndex');
      expect(index).toEqual(3); 
      expect(isEnd).toHaveReceivedEventTimes(1); 
      expect(curIndex).toHaveReceivedEventTimes(4);
    });
    it('Should have the skipBackward disabled when on Slide 1', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart');
      await page.waitFor(100);
      const skipBackwardEl: E2EElement = await container.find('.playcontrols-button-skip-backward');
      expect(skipBackwardEl).toHaveClass('disabled');
    });
    it('Should have the skipBackward enabled when on Slide 2', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart');
      await page.waitFor(250);
      const skipBackwardEl: E2EElement = await container.find('.playcontrols-button-skip-backward');
      expect(skipBackwardEl).not.toHaveClass('disabled');
    });
    it('Should have the skipBackward enabled when on Slide 3', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart');
      await page.waitFor(450);
      const skipBackwardEl: E2EElement = await container.find('.playcontrols-button-skip-backward');
      expect(skipBackwardEl).not.toHaveClass('disabled');
    });
    it('Should have the skipBackward enabled when on Slide 4', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart');
      await page.waitFor(650);
      const skipBackwardEl: E2EElement = await container.find('.playcontrols-button-skip-backward');
      expect(skipBackwardEl).not.toHaveClass('disabled');
    });
    it('Should have the skipBackward disabled after 800ms', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart');
      await page.waitFor(850);
      const skipBackwardEl: E2EElement = await container.find('.playcontrols-button-skip-backward');
      expect(skipBackwardEl).toHaveClass('disabled');
    });
    it('Should have the skipForward enabled when on Slide 1', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart');
      await page.waitFor(100);
      const skipForwardEl: E2EElement = await container.find('.playcontrols-button-skip-forward');
      expect(skipForwardEl).not.toHaveClass('disabled');
    });
    it('Should have the skipForward enabled when on Slide 2', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart');
      await page.waitFor(220);
      const skipForwardEl: E2EElement = await container.find('.playcontrols-button-skip-forward');
      expect(skipForwardEl).not.toHaveClass('disabled');
    });
    it('Should have the skipForward enabled when on Slide 3', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart');
      await page.waitFor(420);
      const skipForwardEl: E2EElement = await container.find('.playcontrols-button-skip-forward');
      expect(skipForwardEl).not.toHaveClass('disabled');
    });
    it('Should have the skipForward disabled when on Slide 4', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart');
      await page.waitFor(620);
      const skipForwardEl: E2EElement = await container.find('.playcontrols-button-skip-forward');
      expect(skipForwardEl).toHaveClass('disabled');
    });
    it('Should have the skipForward enabled after 800ms', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      await cmp.callMethod('autoplayStart');
      await page.waitFor(820);
      const skipForwardEl: E2EElement = await container.find('.playcontrols-button-skip-forward');
      expect(skipForwardEl).not.toHaveClass('disabled');
    });
    it('Should emit jeepPlayControlsAutoplayStart when clicking on start button', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      const playStart = await cmp.spyOnEvent('jeepPlayControlsAutoplayStart');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      const startEl: E2EElement = await container.find('.playcontrols-button-play.play');
      await startEl.click();
      expect(playStart).toHaveReceivedEventTimes(1);
    });
    it('Should emit jeepPlayControlsAutoplayPause when clicking on pause button', async () => {
      cmp.setProperty('duration','200');
      cmp.setProperty('toslide','3');
      const pauseStart = await cmp.spyOnEvent('jeepPlayControlsAutoplayPause');
      await cmp.callMethod('init');
      await page.waitForChanges();
      await cmp.callMethod('setPlayControls');
      const playEl: E2EElement = await container.find('.playcontrols-button-play.play');
      await playEl.click();
      const pauseEl: E2EElement = await container.find('.playcontrols-button-play.pause');
      await pauseEl.click();
      expect(pauseStart).toHaveReceivedEventTimes(1);
    });

  });

});
