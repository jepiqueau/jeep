import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone } from '@angular/core';
export declare const proxyInputs: (Cmp: any, inputs: string[]) => void;
export declare const proxyMethods: (Cmp: any, methods: string[]) => void;
export declare const proxyOutputs: (instance: any, el: any, events: string[]) => void;
export declare function ProxyCmp(opts: {
    inputs?: any;
    methods?: any;
}): (cls: any) => any;
import { Components } from '@jeepq/core';
export declare interface JeepColorpicker extends Components.JeepColorpicker {
}
export declare class JeepColorpicker {
    protected z: NgZone;
    jeepColorpickerGetColor: EventEmitter<CustomEvent>;
    jeepColorpickerOpen: EventEmitter<CustomEvent>;
    jeepColorpickerClose: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface JeepCpicker extends Components.JeepCpicker {
}
export declare class JeepCpicker {
    protected z: NgZone;
    jeepCpickerOpen: EventEmitter<CustomEvent>;
    jeepCpickerClose: EventEmitter<CustomEvent>;
    jeepCpickerInstantColor: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface JeepFlipimages extends Components.JeepFlipimages {
}
export declare class JeepFlipimages {
    protected z: NgZone;
    jeepFlipImagesImgLoaded: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface JeepFullscreen extends Components.JeepFullscreen {
}
export declare class JeepFullscreen {
    protected z: NgZone;
    jeepFullscreenRequest: EventEmitter<CustomEvent>;
    jeepFullscreenExit: EventEmitter<CustomEvent>;
    jeepFullscreenChange: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface JeepLinechart extends Components.JeepLinechart {
}
export declare class JeepLinechart {
    protected z: NgZone;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface JeepNavigation extends Components.JeepNavigation {
}
export declare class JeepNavigation {
    protected z: NgZone;
    jeepNavigationPrev: EventEmitter<CustomEvent>;
    jeepNavigationNext: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface JeepPagination extends Components.JeepPagination {
}
export declare class JeepPagination {
    protected z: NgZone;
    jeepPaginationIndex: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface JeepPlayControls extends Components.JeepPlayControls {
}
export declare class JeepPlayControls {
    protected z: NgZone;
    jeepPlayControlsIsBeginning: EventEmitter<CustomEvent>;
    jeepPlayControlsIsEnd: EventEmitter<CustomEvent>;
    jeepPlayControlsCurrentIndex: EventEmitter<CustomEvent>;
    jeepPlayControlsAutoplayStart: EventEmitter<CustomEvent>;
    jeepPlayControlsAutoplayStop: EventEmitter<CustomEvent>;
    jeepPlayControlsAutoplayPause: EventEmitter<CustomEvent>;
    jeepPlayControlsAutoplaySkipBackward: EventEmitter<CustomEvent>;
    jeepPlayControlsAutoplaySkipForward: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface JeepSlide extends Components.JeepSlide {
}
export declare class JeepSlide {
    protected z: NgZone;
    jeepSlideDidLoad: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface JeepSlides extends Components.JeepSlides {
}
export declare class JeepSlides {
    protected z: NgZone;
    jeepSlidesHeaderVisibility: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface JeepStretchyHeader extends Components.JeepStretchyHeader {
}
export declare class JeepStretchyHeader {
    protected z: NgZone;
    jeepStretchyHeaderToolbar: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface JeepSvgmorph extends Components.JeepSvgmorph {
}
export declare class JeepSvgmorph {
    protected z: NgZone;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
