import { ElementRef, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Components } from '@jeepq/core';
export declare interface JeepColorpicker extends Components.JeepColorpicker {
}
export declare class JeepColorpicker {
    jeepColorpickerGetColor: EventEmitter<CustomEvent>;
    jeepColorpickerOpen: EventEmitter<CustomEvent>;
    jeepColorpickerClose: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef);
}
export declare interface JeepCpicker extends Components.JeepCpicker {
}
export declare class JeepCpicker {
    jeepCpickerOpen: EventEmitter<CustomEvent>;
    jeepCpickerClose: EventEmitter<CustomEvent>;
    jeepCpickerInstantColor: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef);
}
export declare interface JeepFullscreen extends Components.JeepFullscreen {
}
export declare class JeepFullscreen {
    jeepFullscreenRequest: EventEmitter<CustomEvent>;
    jeepFullscreenExit: EventEmitter<CustomEvent>;
    jeepFullscreenChange: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef);
}
export declare interface JeepLinechart extends Components.JeepLinechart {
}
export declare class JeepLinechart {
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef);
}
export declare interface JeepNavigation extends Components.JeepNavigation {
}
export declare class JeepNavigation {
    jeepNavigationPrev: EventEmitter<CustomEvent>;
    jeepNavigationNext: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef);
}
export declare interface JeepPagination extends Components.JeepPagination {
}
export declare class JeepPagination {
    jeepPaginationIndex: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef);
}
export declare interface JeepPlayControls extends Components.JeepPlayControls {
}
export declare class JeepPlayControls {
    jeepPlayControlsIsBeginning: EventEmitter<CustomEvent>;
    jeepPlayControlsIsEnd: EventEmitter<CustomEvent>;
    jeepPlayControlsCurrentIndex: EventEmitter<CustomEvent>;
    jeepPlayControlsAutoplayStart: EventEmitter<CustomEvent>;
    jeepPlayControlsAutoplayStop: EventEmitter<CustomEvent>;
    jeepPlayControlsAutoplayPause: EventEmitter<CustomEvent>;
    jeepPlayControlsAutoplaySkipBackward: EventEmitter<CustomEvent>;
    jeepPlayControlsAutoplaySkipForward: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef);
}
export declare interface JeepSlide extends Components.JeepSlide {
}
export declare class JeepSlide {
    jeepSlideDidLoad: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef);
}
export declare interface JeepSlides extends Components.JeepSlides {
}
export declare class JeepSlides {
    jeepSlidesHeaderVisibility: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef);
}
export declare interface JeepSvgmorph extends Components.JeepSvgmorph {
}
export declare class JeepSvgmorph {
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef);
}
