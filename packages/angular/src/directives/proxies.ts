/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { fromEvent } from 'rxjs';

export const proxyInputs = (Cmp: any, inputs: string[]) => {
  const Prototype = Cmp.prototype;
  inputs.forEach(item => {
    Object.defineProperty(Prototype, item, {
      get() { return this.el[item]; },
      set(val: any) { this.z.runOutsideAngular(() => (this.el[item] = val)); }
    });
  });
};

export const proxyMethods = (Cmp: any, methods: string[]) => {
  const Prototype = Cmp.prototype;
  methods.forEach(methodName => {
    Prototype[methodName] = function () {
      const args = arguments;
      return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
    };
  });
};

export const proxyOutputs = (instance: any, el: any, events: string[]) => {
  events.forEach(eventName => instance[eventName] = fromEvent(el, eventName));
}

// tslint:disable-next-line: only-arrow-functions
export function ProxyCmp(opts: { inputs?: any; methods?: any }) {
  const decorator =  function(cls: any){
    if (opts.inputs) {
      proxyInputs(cls, opts.inputs);
    }
    if (opts.methods) {
      proxyMethods(cls, opts.methods);
    }
    return cls;
  };
  return decorator;
}

import { Components } from '@jeepq/core'

export declare interface JeepCarousel extends Components.JeepCarousel {}
@ProxyCmp({inputs: ['cstyle', 'data', 'notcleanstyles', 'options', 'parallaxoptions', 'playcontrols', 'rtl'], 'methods': ['init', 'setSwiper', 'update', 'appendSlide', 'addSlide', 'slideTo', 'slideNext', 'slidePrev', 'getActiveIndex', 'getPreviousIndex', 'length', 'isEnd', 'isBeginning', 'startAutoplay', 'stopAutoplay', 'swiperDestroy']})
@Component({ selector: 'jeep-carousel', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['cstyle', 'data', 'notcleanstyles', 'options', 'parallaxoptions', 'playcontrols', 'rtl'] })
export class JeepCarousel {
  jeepCarouselDidLoad!: EventEmitter<CustomEvent>;
  jeepCarouselBeforeDestroy!: EventEmitter<CustomEvent>;
  jeepCarouselAfterDestroy!: EventEmitter<CustomEvent>;
  jeepCarouselTap!: EventEmitter<CustomEvent>;
  jeepCarouselDoubleTap!: EventEmitter<CustomEvent>;
  jeepCarouselSlideChange!: EventEmitter<CustomEvent>;
  jeepCarouselWillChange!: EventEmitter<CustomEvent>;
  jeepCarouselDidChange!: EventEmitter<CustomEvent>;
  jeepCarouselNextStart!: EventEmitter<CustomEvent>;
  jeepCarouselPrevStart!: EventEmitter<CustomEvent>;
  jeepCarouselNextEnd!: EventEmitter<CustomEvent>;
  jeepCarouselPrevEnd!: EventEmitter<CustomEvent>;
  jeepCarouselTransitionStart!: EventEmitter<CustomEvent>;
  jeepCarouselTransitionEnd!: EventEmitter<CustomEvent>;
  jeepCarouselDrag!: EventEmitter<CustomEvent>;
  jeepCarouselReachStart!: EventEmitter<CustomEvent>;
  jeepCarouselReachEnd!: EventEmitter<CustomEvent>;
  jeepCarouselTouchStart!: EventEmitter<CustomEvent>;
  jeepCarouselTouchEnd!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepCarouselDidLoad', 'jeepCarouselBeforeDestroy', 'jeepCarouselAfterDestroy', 'jeepCarouselTap', 'jeepCarouselDoubleTap', 'jeepCarouselSlideChange', 'jeepCarouselWillChange', 'jeepCarouselDidChange', 'jeepCarouselNextStart', 'jeepCarouselPrevStart', 'jeepCarouselNextEnd', 'jeepCarouselPrevEnd', 'jeepCarouselTransitionStart', 'jeepCarouselTransitionEnd', 'jeepCarouselDrag', 'jeepCarouselReachStart', 'jeepCarouselReachEnd', 'jeepCarouselTouchStart', 'jeepCarouselTouchEnd']);
  }
}

export declare interface JeepColorpicker extends Components.JeepColorpicker {}
@ProxyCmp({inputs: ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity'], 'methods': ['init', 'open', 'close']})
@Component({ selector: 'jeep-colorpicker', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity'] })
export class JeepColorpicker {
  jeepColorpickerGetColor!: EventEmitter<CustomEvent>;
  jeepColorpickerOpen!: EventEmitter<CustomEvent>;
  jeepColorpickerClose!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepColorpickerGetColor', 'jeepColorpickerOpen', 'jeepColorpickerClose']);
  }
}

export declare interface JeepColumnchart extends Components.JeepColumnchart {}
@ProxyCmp({inputs: ['animation', 'cborder', 'color', 'cstyle', 'ctitle', 'datapoints', 'delay', 'subtitle', 'xtitle', 'ytitle'], 'methods': ['init', 'getStatus', 'renderChart', 'getWindowSize', 'getCssProperties']})
@Component({ selector: 'jeep-columnchart', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animation', 'cborder', 'color', 'cstyle', 'ctitle', 'datapoints', 'delay', 'subtitle', 'xtitle', 'ytitle'] })
export class JeepColumnchart {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface JeepCpicker extends Components.JeepCpicker {}
@ProxyCmp({inputs: ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity'], 'methods': ['init', 'getStateProperties', 'getWrapperCssVariables', 'calcH', 'calcS', 'calcB', 'calcO']})
@Component({ selector: 'jeep-cpicker', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity'] })
export class JeepCpicker {
  jeepCpickerOpen!: EventEmitter<CustomEvent>;
  jeepCpickerClose!: EventEmitter<CustomEvent>;
  jeepCpickerInstantColor!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepCpickerOpen', 'jeepCpickerClose', 'jeepCpickerInstantColor']);
  }
}

export declare interface JeepFlipimages extends Components.JeepFlipimages {}
@ProxyCmp({inputs: ['fpadding', 'type'], 'methods': ['init']})
@Component({ selector: 'jeep-flipimages', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['fpadding', 'type'] })
export class JeepFlipimages {
  jeepFlipImagesImgLoaded!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepFlipImagesImgLoaded']);
  }
}

export declare interface JeepFullscreen extends Components.JeepFullscreen {}
@ProxyCmp({'methods': ['init', 'setFullscreen', 'setJeepFullscreenVisibility', 'fullscreenRequest', 'fullscreenExit', 'isFullscreen']})
@Component({ selector: 'jeep-fullscreen', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class JeepFullscreen {
  jeepFullscreenRequest!: EventEmitter<CustomEvent>;
  jeepFullscreenExit!: EventEmitter<CustomEvent>;
  jeepFullscreenChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepFullscreenRequest', 'jeepFullscreenExit', 'jeepFullscreenChange']);
  }
}

export declare interface JeepHtmlToprint extends Components.JeepHtmlToprint {}
@ProxyCmp({inputs: ['slotstyle'], 'methods': ['init', 'load', 'emitPrint', 'getSlotStyle']})
@Component({ selector: 'jeep-html-toprint', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['slotstyle'] })
export class JeepHtmlToprint {
  jeepHtmlToPrint!: EventEmitter<CustomEvent>;
  jeepHtmlToPrintReady!: EventEmitter<CustomEvent>;
  jeepHtmlToPrintCompleted!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepHtmlToPrint', 'jeepHtmlToPrintReady', 'jeepHtmlToPrintCompleted']);
  }
}

export declare interface JeepLinechart extends Components.JeepLinechart {}
@ProxyCmp({inputs: ['animation', 'cborder', 'cstyle', 'ctitle', 'data', 'delay', 'subtitle', 'xtitle', 'ytitle'], 'methods': ['init', 'getStatus', 'renderChart', 'getWindowSize', 'getCssProperties']})
@Component({ selector: 'jeep-linechart', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animation', 'cborder', 'cstyle', 'ctitle', 'data', 'delay', 'subtitle', 'xtitle', 'ytitle'] })
export class JeepLinechart {
  jeepLinechartReady!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepLinechartReady']);
  }
}

export declare interface JeepNavigation extends Components.JeepNavigation {}
@ProxyCmp({inputs: ['name'], 'methods': ['init', 'setNavigation', 'setJeepNavigationVisibility', 'setJeepNavigationPrevDisabled', 'setJeepNavigationNextDisabled', 'getJeepNavigationIconFamily']})
@Component({ selector: 'jeep-navigation', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['name'] })
export class JeepNavigation {
  jeepNavigationPrev!: EventEmitter<CustomEvent>;
  jeepNavigationNext!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepNavigationPrev', 'jeepNavigationNext']);
  }
}

export declare interface JeepPagination extends Components.JeepPagination {}
@ProxyCmp({inputs: ['clickable', 'direction', 'ndisplay'], 'methods': ['init', 'setJeepPaginationVisibility', 'setJeepPaginationSlidesNumber', 'setJeepPaginationActiveIndex', 'getJeepPaginationBulletNumber']})
@Component({ selector: 'jeep-pagination', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['clickable', 'direction', 'ndisplay'] })
export class JeepPagination {
  jeepPaginationIndex!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepPaginationIndex']);
  }
}

export declare interface JeepPlayControls extends Components.JeepPlayControls {}
@ProxyCmp({inputs: ['duration', 'fromslide', 'nslides', 'toslide'], 'methods': ['init', 'setPlayControls', 'setJeepPlayControlsVisibility', 'setJeepPlayControlsSkipBackwardDisabled', 'setJeepPlayControlsSkipForwardDisabled', 'getJeepPlayControlsDuration', 'autoplayStart', 'autoplayStop', 'autoplayPause', 'isPlaying', 'getCurrentIndex', 'setActiveIndexAndPlay', 'setCurrentIndex']})
@Component({ selector: 'jeep-play-controls', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['duration', 'fromslide', 'nslides', 'toslide'] })
export class JeepPlayControls {
  jeepPlayControlsIsBeginning!: EventEmitter<CustomEvent>;
  jeepPlayControlsIsEnd!: EventEmitter<CustomEvent>;
  jeepPlayControlsCurrentIndex!: EventEmitter<CustomEvent>;
  jeepPlayControlsAutoplayStart!: EventEmitter<CustomEvent>;
  jeepPlayControlsAutoplayStop!: EventEmitter<CustomEvent>;
  jeepPlayControlsAutoplayPause!: EventEmitter<CustomEvent>;
  jeepPlayControlsAutoplaySkipBackward!: EventEmitter<CustomEvent>;
  jeepPlayControlsAutoplaySkipForward!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepPlayControlsIsBeginning', 'jeepPlayControlsIsEnd', 'jeepPlayControlsCurrentIndex', 'jeepPlayControlsAutoplayStart', 'jeepPlayControlsAutoplayStop', 'jeepPlayControlsAutoplayPause', 'jeepPlayControlsAutoplaySkipBackward', 'jeepPlayControlsAutoplaySkipForward']);
  }
}

export declare interface JeepSlide extends Components.JeepSlide {}
@ProxyCmp({inputs: ['cstyle', 'stitle', 'subtitle'], 'methods': ['init', 'setSlide']})
@Component({ selector: 'jeep-slide', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['cstyle', 'stitle', 'subtitle'] })
export class JeepSlide {
  jeepSlideDidLoad!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepSlideDidLoad']);
  }
}

export declare interface JeepSlides extends Components.JeepSlides {}
@ProxyCmp({inputs: ['options'], 'methods': ['init', 'setSlides', 'getActiveSlideIndex']})
@Component({ selector: 'jeep-slides', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['options'] })
export class JeepSlides {
  jeepSlidesHeaderVisibility!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepSlidesHeaderVisibility']);
  }
}

export declare interface JeepStretchyHeader extends Components.JeepStretchyHeader {}
@ProxyCmp({inputs: ['headerbackground', 'headerbackgroundblur', 'headerheight', 'toolbarcontrastcolor'], 'methods': ['init']})
@Component({ selector: 'jeep-stretchy-header', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['headerbackground', 'headerbackgroundblur', 'headerheight', 'toolbarcontrastcolor'] })
export class JeepStretchyHeader {
  jeepStretchyHeaderToolbar!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepStretchyHeaderToolbar']);
  }
}

export declare interface JeepSvgmorph extends Components.JeepSvgmorph {}
@ProxyCmp({inputs: ['calcmode', 'duration', 'fill', 'keysplines', 'keytimes', 'nsegment', 'pathindex', 'repeatcount'], 'methods': ['init', 'getStateProperties', 'getPath', 'getPathList', 'getFillColor', 'renderSVGFirstPath', 'getAlignedPaths']})
@Component({ selector: 'jeep-svgmorph', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['calcmode', 'duration', 'fill', 'keysplines', 'keytimes', 'nsegment', 'pathindex', 'repeatcount'] })
export class JeepSvgmorph {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
