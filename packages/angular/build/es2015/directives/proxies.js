/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable */
/* auto-generated angular directive proxies */
import { Component, ElementRef, ChangeDetectorRef } from '@angular/core';
import { fromEvent } from 'rxjs';
/**
 * @param {?} Cmp
 * @param {?} inputs
 * @return {?}
 */
function proxyInputs(Cmp, inputs) {
    /** @type {?} */
    const Prototype = Cmp.prototype;
    inputs.forEach((/**
     * @param {?} item
     * @return {?}
     */
    item => {
        Object.defineProperty(Prototype, item, {
            /**
             * @return {?}
             */
            get() { return this.el[item]; },
            /**
             * @param {?} val
             * @return {?}
             */
            set(val) { this.el[item] = val; },
        });
    }));
}
/**
 * @param {?} Cmp
 * @param {?} methods
 * @return {?}
 */
function proxyMethods(Cmp, methods) {
    /** @type {?} */
    const Prototype = Cmp.prototype;
    methods.forEach((/**
     * @param {?} methodName
     * @return {?}
     */
    methodName => {
        Prototype[methodName] = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const args = arguments;
            return this.el.componentOnReady().then((/**
             * @param {?} el
             * @return {?}
             */
            (el) => el[methodName].apply(el, args)));
        });
    }));
}
/**
 * @param {?} instance
 * @param {?} el
 * @param {?} events
 * @return {?}
 */
function proxyOutputs(instance, el, events) {
    events.forEach((/**
     * @param {?} eventName
     * @return {?}
     */
    eventName => instance[eventName] = fromEvent(el, eventName)));
}
export class JeepColorpicker {
    /**
     * @param {?} c
     * @param {?} r
     */
    constructor(c, r) {
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepColorpickerGetColor', 'jeepColorpickerOpen', 'jeepColorpickerClose']);
    }
}
JeepColorpicker.decorators = [
    { type: Component, args: [{ selector: 'jeep-colorpicker', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity'] },] },
];
/** @nocollapse */
JeepColorpicker.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    JeepColorpicker.prototype.jeepColorpickerGetColor;
    /** @type {?} */
    JeepColorpicker.prototype.jeepColorpickerOpen;
    /** @type {?} */
    JeepColorpicker.prototype.jeepColorpickerClose;
    /**
     * @type {?}
     * @protected
     */
    JeepColorpicker.prototype.el;
}
proxyMethods(JeepColorpicker, ['init', 'open', 'close']);
proxyInputs(JeepColorpicker, ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity']);
export class JeepCpicker {
    /**
     * @param {?} c
     * @param {?} r
     */
    constructor(c, r) {
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepCpickerOpen', 'jeepCpickerClose', 'jeepCpickerInstantColor']);
    }
}
JeepCpicker.decorators = [
    { type: Component, args: [{ selector: 'jeep-cpicker', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity'] },] },
];
/** @nocollapse */
JeepCpicker.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    JeepCpicker.prototype.jeepCpickerOpen;
    /** @type {?} */
    JeepCpicker.prototype.jeepCpickerClose;
    /** @type {?} */
    JeepCpicker.prototype.jeepCpickerInstantColor;
    /**
     * @type {?}
     * @protected
     */
    JeepCpicker.prototype.el;
}
proxyMethods(JeepCpicker, ['init', 'getStateProperties', 'getWrapperCssVariables', 'calcH', 'calcS', 'calcB', 'calcO']);
proxyInputs(JeepCpicker, ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity']);
export class JeepFullscreen {
    /**
     * @param {?} c
     * @param {?} r
     */
    constructor(c, r) {
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepFullscreenRequest', 'jeepFullscreenExit', 'jeepFullscreenChange']);
    }
}
JeepFullscreen.decorators = [
    { type: Component, args: [{ selector: 'jeep-fullscreen', changeDetection: 0, template: '<ng-content></ng-content>' },] },
];
/** @nocollapse */
JeepFullscreen.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    JeepFullscreen.prototype.jeepFullscreenRequest;
    /** @type {?} */
    JeepFullscreen.prototype.jeepFullscreenExit;
    /** @type {?} */
    JeepFullscreen.prototype.jeepFullscreenChange;
    /**
     * @type {?}
     * @protected
     */
    JeepFullscreen.prototype.el;
}
proxyMethods(JeepFullscreen, ['init', 'setFullscreen', 'setJeepFullscreenVisibility', 'fullscreenRequest', 'fullscreenExit', 'isFullscreen']);
export class JeepLinechart {
    /**
     * @param {?} c
     * @param {?} r
     */
    constructor(c, r) {
        c.detach();
        this.el = r.nativeElement;
    }
}
JeepLinechart.decorators = [
    { type: Component, args: [{ selector: 'jeep-linechart', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['animation', 'cborder', 'cstyle', 'ctitle', 'data', 'delay', 'subtitle', 'xtitle', 'ytitle'] },] },
];
/** @nocollapse */
JeepLinechart.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    JeepLinechart.prototype.el;
}
proxyMethods(JeepLinechart, ['init', 'getStatus', 'renderChart', 'getWindowSize', 'getCssProperties']);
proxyInputs(JeepLinechart, ['animation', 'cborder', 'cstyle', 'ctitle', 'data', 'delay', 'subtitle', 'xtitle', 'ytitle']);
export class JeepNavigation {
    /**
     * @param {?} c
     * @param {?} r
     */
    constructor(c, r) {
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepNavigationPrev', 'jeepNavigationNext']);
    }
}
JeepNavigation.decorators = [
    { type: Component, args: [{ selector: 'jeep-navigation', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['name'] },] },
];
/** @nocollapse */
JeepNavigation.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    JeepNavigation.prototype.jeepNavigationPrev;
    /** @type {?} */
    JeepNavigation.prototype.jeepNavigationNext;
    /**
     * @type {?}
     * @protected
     */
    JeepNavigation.prototype.el;
}
proxyMethods(JeepNavigation, ['init', 'setNavigation', 'setJeepNavigationVisibility', 'setJeepNavigationPrevDisabled', 'setJeepNavigationNextDisabled', 'getJeepNavigationIconFamily']);
proxyInputs(JeepNavigation, ['name']);
export class JeepPagination {
    /**
     * @param {?} c
     * @param {?} r
     */
    constructor(c, r) {
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepPaginationIndex']);
    }
}
JeepPagination.decorators = [
    { type: Component, args: [{ selector: 'jeep-pagination', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['clickable', 'direction', 'ndisplay'] },] },
];
/** @nocollapse */
JeepPagination.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    JeepPagination.prototype.jeepPaginationIndex;
    /**
     * @type {?}
     * @protected
     */
    JeepPagination.prototype.el;
}
proxyMethods(JeepPagination, ['init', 'setJeepPaginationVisibility', 'setJeepPaginationSlidesNumber', 'setJeepPaginationActiveIndex', 'getJeepPaginationBulletNumber']);
proxyInputs(JeepPagination, ['clickable', 'direction', 'ndisplay']);
export class JeepPlayControls {
    /**
     * @param {?} c
     * @param {?} r
     */
    constructor(c, r) {
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepPlayControlsIsBeginning', 'jeepPlayControlsIsEnd', 'jeepPlayControlsCurrentIndex', 'jeepPlayControlsAutoplayStart', 'jeepPlayControlsAutoplayStop', 'jeepPlayControlsAutoplayPause', 'jeepPlayControlsAutoplaySkipBackward', 'jeepPlayControlsAutoplaySkipForward']);
    }
}
JeepPlayControls.decorators = [
    { type: Component, args: [{ selector: 'jeep-play-controls', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['duration', 'fromslide', 'nslides', 'toslide'] },] },
];
/** @nocollapse */
JeepPlayControls.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    JeepPlayControls.prototype.jeepPlayControlsIsBeginning;
    /** @type {?} */
    JeepPlayControls.prototype.jeepPlayControlsIsEnd;
    /** @type {?} */
    JeepPlayControls.prototype.jeepPlayControlsCurrentIndex;
    /** @type {?} */
    JeepPlayControls.prototype.jeepPlayControlsAutoplayStart;
    /** @type {?} */
    JeepPlayControls.prototype.jeepPlayControlsAutoplayStop;
    /** @type {?} */
    JeepPlayControls.prototype.jeepPlayControlsAutoplayPause;
    /** @type {?} */
    JeepPlayControls.prototype.jeepPlayControlsAutoplaySkipBackward;
    /** @type {?} */
    JeepPlayControls.prototype.jeepPlayControlsAutoplaySkipForward;
    /**
     * @type {?}
     * @protected
     */
    JeepPlayControls.prototype.el;
}
proxyMethods(JeepPlayControls, ['init', 'setPlayControls', 'setJeepPlayControlsVisibility', 'setJeepPlayControlsSkipBackwardDisabled', 'setJeepPlayControlsSkipForwardDisabled', 'getJeepPlayControlsDuration', 'autoplayStart', 'autoplayStop', 'autoplayPause', 'isPlaying', 'getCurrentIndex', 'setActiveIndexAndPlay', 'setCurrentIndex']);
proxyInputs(JeepPlayControls, ['duration', 'fromslide', 'nslides', 'toslide']);
export class JeepSlide {
    /**
     * @param {?} c
     * @param {?} r
     */
    constructor(c, r) {
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepSlideDidLoad']);
    }
}
JeepSlide.decorators = [
    { type: Component, args: [{ selector: 'jeep-slide', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['cstyle', 'stitle', 'subtitle'] },] },
];
/** @nocollapse */
JeepSlide.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    JeepSlide.prototype.jeepSlideDidLoad;
    /**
     * @type {?}
     * @protected
     */
    JeepSlide.prototype.el;
}
proxyMethods(JeepSlide, ['init', 'setSlide']);
proxyInputs(JeepSlide, ['cstyle', 'stitle', 'subtitle']);
export class JeepSlides {
    /**
     * @param {?} c
     * @param {?} r
     */
    constructor(c, r) {
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepSlidesHeaderVisibility']);
    }
}
JeepSlides.decorators = [
    { type: Component, args: [{ selector: 'jeep-slides', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['options'] },] },
];
/** @nocollapse */
JeepSlides.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    JeepSlides.prototype.jeepSlidesHeaderVisibility;
    /**
     * @type {?}
     * @protected
     */
    JeepSlides.prototype.el;
}
proxyMethods(JeepSlides, ['init', 'setSlides', 'getActiveSlideIndex']);
proxyInputs(JeepSlides, ['options']);
export class JeepSvgmorph {
    /**
     * @param {?} c
     * @param {?} r
     */
    constructor(c, r) {
        c.detach();
        this.el = r.nativeElement;
    }
}
JeepSvgmorph.decorators = [
    { type: Component, args: [{ selector: 'jeep-svgmorph', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['calcmode', 'duration', 'fill', 'keysplines', 'keytimes', 'nsegment', 'pathindex', 'repeatcount'] },] },
];
/** @nocollapse */
JeepSvgmorph.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    JeepSvgmorph.prototype.el;
}
proxyMethods(JeepSvgmorph, ['init', 'getStateProperties', 'getPath', 'getPathList', 'getFillColor', 'renderSVGFirstPath', 'getAlignedPaths']);
proxyInputs(JeepSvgmorph, ['calcmode', 'duration', 'fill', 'keysplines', 'keytimes', 'nsegment', 'pathindex', 'repeatcount']);
