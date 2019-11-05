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
