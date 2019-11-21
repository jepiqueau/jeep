/* tslint:disable */
/* auto-generated angular directive proxies */
import { Component, ElementRef, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';

function proxyInputs(Cmp: any, inputs: string[]) {
  const Prototype = Cmp.prototype;
  inputs.forEach(item => {
    Object.defineProperty(Prototype, item, {
      get() { return this.el[item]; },
      set(val: any) { this.el[item] = val; },
    });
  });
}

function proxyMethods(Cmp: any, methods: string[]) {
  const Prototype = Cmp.prototype;
  methods.forEach(methodName => {
    Prototype[methodName] = function() {
      const args = arguments;
      return this.el.componentOnReady().then((el: any) => el[methodName].apply(el, args));
    };
  });
}

function proxyOutputs(instance: any, el: any, events: string[]) {
  events.forEach(eventName => instance[eventName] = fromEvent(el, eventName));
}

import { Components } from '@jeepq/core'

export declare interface JeepColorpicker extends Components.JeepColorpicker {}
@Component({ selector: 'jeep-colorpicker', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity'] })
export class JeepColorpicker {
  jeepColorpickerGetColor!: EventEmitter<CustomEvent>;
  jeepColorpickerOpen!: EventEmitter<CustomEvent>;
  jeepColorpickerClose!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepColorpickerGetColor', 'jeepColorpickerOpen', 'jeepColorpickerClose']);
  }
}
proxyMethods(JeepColorpicker, ['init', 'open', 'close']);
proxyInputs(JeepColorpicker, ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity']);

export declare interface JeepCpicker extends Components.JeepCpicker {}
@Component({ selector: 'jeep-cpicker', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity'] })
export class JeepCpicker {
  jeepCpickerOpen!: EventEmitter<CustomEvent>;
  jeepCpickerClose!: EventEmitter<CustomEvent>;
  jeepCpickerInstantColor!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepCpickerOpen', 'jeepCpickerClose', 'jeepCpickerInstantColor']);
  }
}
proxyMethods(JeepCpicker, ['init', 'getStateProperties', 'getWrapperCssVariables', 'calcH', 'calcS', 'calcB', 'calcO']);
proxyInputs(JeepCpicker, ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity']);

export declare interface JeepFullscreen extends Components.JeepFullscreen {}
@Component({ selector: 'jeep-fullscreen', changeDetection: 0, template: '<ng-content></ng-content>' })
export class JeepFullscreen {
  jeepFullscreenRequest!: EventEmitter<CustomEvent>;
  jeepFullscreenExit!: EventEmitter<CustomEvent>;
  jeepFullscreenChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepFullscreenRequest', 'jeepFullscreenExit', 'jeepFullscreenChange']);
  }
}
proxyMethods(JeepFullscreen, ['init', 'setFullscreen', 'setJeepFullscreenVisibility', 'fullscreenRequest', 'fullscreenExit', 'isFullscreen']);

export declare interface JeepLinechart extends Components.JeepLinechart {}
@Component({ selector: 'jeep-linechart', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['animation', 'cborder', 'cstyle', 'ctitle', 'data', 'delay', 'subtitle', 'xtitle', 'ytitle'] })
export class JeepLinechart {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyMethods(JeepLinechart, ['init', 'getStatus', 'renderChart', 'getWindowSize', 'getCssProperties']);
proxyInputs(JeepLinechart, ['animation', 'cborder', 'cstyle', 'ctitle', 'data', 'delay', 'subtitle', 'xtitle', 'ytitle']);

export declare interface JeepNavigation extends Components.JeepNavigation {}
@Component({ selector: 'jeep-navigation', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['name'] })
export class JeepNavigation {
  jeepNavigationPrev!: EventEmitter<CustomEvent>;
  jeepNavigationNext!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepNavigationPrev', 'jeepNavigationNext']);
  }
}
proxyMethods(JeepNavigation, ['init', 'setNavigation', 'setJeepNavigationVisibility', 'setJeepNavigationPrevDisabled', 'setJeepNavigationNextDisabled', 'getJeepNavigationIconFamily']);
proxyInputs(JeepNavigation, ['name']);

export declare interface JeepPagination extends Components.JeepPagination {}
@Component({ selector: 'jeep-pagination', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['clickable', 'direction', 'ndisplay'] })
export class JeepPagination {
  jeepPaginationIndex!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepPaginationIndex']);
  }
}
proxyMethods(JeepPagination, ['init', 'setJeepPaginationVisibility', 'setJeepPaginationSlidesNumber', 'setJeepPaginationActiveIndex', 'getJeepPaginationBulletNumber']);
proxyInputs(JeepPagination, ['clickable', 'direction', 'ndisplay']);

export declare interface JeepPlayControls extends Components.JeepPlayControls {}
@Component({ selector: 'jeep-play-controls', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['duration', 'fromslide', 'nslides', 'toslide'] })
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
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepPlayControlsIsBeginning', 'jeepPlayControlsIsEnd', 'jeepPlayControlsCurrentIndex', 'jeepPlayControlsAutoplayStart', 'jeepPlayControlsAutoplayStop', 'jeepPlayControlsAutoplayPause', 'jeepPlayControlsAutoplaySkipBackward', 'jeepPlayControlsAutoplaySkipForward']);
  }
}
proxyMethods(JeepPlayControls, ['init', 'setPlayControls', 'setJeepPlayControlsVisibility', 'setJeepPlayControlsSkipBackwardDisabled', 'setJeepPlayControlsSkipForwardDisabled', 'getJeepPlayControlsDuration', 'autoplayStart', 'autoplayStop', 'autoplayPause', 'isPlaying', 'getCurrentIndex', 'setActiveIndexAndPlay', 'setCurrentIndex']);
proxyInputs(JeepPlayControls, ['duration', 'fromslide', 'nslides', 'toslide']);

export declare interface JeepSlide extends Components.JeepSlide {}
@Component({ selector: 'jeep-slide', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['cstyle', 'stitle', 'subtitle'] })
export class JeepSlide {
  jeepSlideDidLoad!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepSlideDidLoad']);
  }
}
proxyMethods(JeepSlide, ['init', 'setSlide']);
proxyInputs(JeepSlide, ['cstyle', 'stitle', 'subtitle']);

export declare interface JeepSlides extends Components.JeepSlides {}
@Component({ selector: 'jeep-slides', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['options'] })
export class JeepSlides {
  jeepSlidesHeaderVisibility!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['jeepSlidesHeaderVisibility']);
  }
}
proxyMethods(JeepSlides, ['init', 'setSlides', 'getActiveSlideIndex']);
proxyInputs(JeepSlides, ['options']);

export declare interface JeepSvgmorph extends Components.JeepSvgmorph {}
@Component({ selector: 'jeep-svgmorph', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['calcmode', 'duration', 'fill', 'keysplines', 'keytimes', 'nsegment', 'pathindex', 'repeatcount'] })
export class JeepSvgmorph {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyMethods(JeepSvgmorph, ['init', 'getStateProperties', 'getPath', 'getPathList', 'getFillColor', 'renderSVGFirstPath', 'getAlignedPaths']);
proxyInputs(JeepSvgmorph, ['calcmode', 'duration', 'fill', 'keysplines', 'keytimes', 'nsegment', 'pathindex', 'repeatcount']);
