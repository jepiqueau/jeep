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
export declare interface JeepLinechart extends Components.JeepLinechart {
}
export declare class JeepLinechart {
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef);
}
export declare interface JeepSvgmorph extends Components.JeepSvgmorph {
}
export declare class JeepSvgmorph {
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef);
}
