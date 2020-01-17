/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';
import { fromEvent } from 'rxjs';
/** @type {?} */
export var proxyInputs = (/**
 * @param {?} Cmp
 * @param {?} inputs
 * @return {?}
 */
function (Cmp, inputs) {
    /** @type {?} */
    var Prototype = Cmp.prototype;
    inputs.forEach((/**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        Object.defineProperty(Prototype, item, {
            get: /**
             * @return {?}
             */
            function () { return this.el[item]; },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                var _this = this;
                this.z.runOutsideAngular((/**
                 * @return {?}
                 */
                function () { return (_this.el[item] = val); }));
            }
        });
    }));
});
/** @type {?} */
export var proxyMethods = (/**
 * @param {?} Cmp
 * @param {?} methods
 * @return {?}
 */
function (Cmp, methods) {
    /** @type {?} */
    var Prototype = Cmp.prototype;
    methods.forEach((/**
     * @param {?} methodName
     * @return {?}
     */
    function (methodName) {
        Prototype[methodName] = (/**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var args = arguments;
            return this.z.runOutsideAngular((/**
             * @return {?}
             */
            function () { return _this.el[methodName].apply(_this.el, args); }));
        });
    }));
});
/** @type {?} */
export var proxyOutputs = (/**
 * @param {?} instance
 * @param {?} el
 * @param {?} events
 * @return {?}
 */
function (instance, el, events) {
    events.forEach((/**
     * @param {?} eventName
     * @return {?}
     */
    function (eventName) { return instance[eventName] = fromEvent(el, eventName); }));
})
// tslint:disable-next-line: only-arrow-functions
;
// tslint:disable-next-line: only-arrow-functions
/**
 * @param {?} opts
 * @return {?}
 */
export function ProxyCmp(opts) {
    /** @type {?} */
    var decorator = (/**
     * @param {?} cls
     * @return {?}
     */
    function (cls) {
        if (opts.inputs) {
            proxyInputs(cls, opts.inputs);
        }
        if (opts.methods) {
            proxyMethods(cls, opts.methods);
        }
        return cls;
    });
    return decorator;
}
var JeepCarousel = /** @class */ (function () {
    function JeepCarousel(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepCarouselDidLoad', 'jeepCarouselBeforeDestroy', 'jeepCarouselAfterDestroy', 'jeepCarouselTap', 'jeepCarouselDoubleTap', 'jeepCarouselSlideChange', 'jeepCarouselWillChange', 'jeepCarouselDidChange', 'jeepCarouselNextStart', 'jeepCarouselPrevStart', 'jeepCarouselNextEnd', 'jeepCarouselPrevEnd', 'jeepCarouselTransitionStart', 'jeepCarouselTransitionEnd', 'jeepCarouselDrag', 'jeepCarouselReachStart', 'jeepCarouselReachEnd', 'jeepCarouselTouchStart', 'jeepCarouselTouchEnd']);
    }
    JeepCarousel.decorators = [
        { type: Component, args: [{ selector: 'jeep-carousel', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['cstyle', 'data', 'notcleanstyles', 'options', 'parallaxoptions', 'playcontrols', 'rtl'] },] },
    ];
    /** @nocollapse */
    JeepCarousel.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    JeepCarousel = tslib_1.__decorate([
        ProxyCmp({ inputs: ['cstyle', 'data', 'notcleanstyles', 'options', 'parallaxoptions', 'playcontrols', 'rtl'], 'methods': ['init', 'setSwiper', 'update', 'appendSlide', 'addSlide', 'slideTo', 'slideNext', 'slidePrev', 'getActiveIndex', 'getPreviousIndex', 'length', 'isEnd', 'isBeginning', 'startAutoplay', 'stopAutoplay', 'swiperDestroy'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], JeepCarousel);
    return JeepCarousel;
}());
export { JeepCarousel };
if (false) {
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselDidLoad;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselBeforeDestroy;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselAfterDestroy;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselTap;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselDoubleTap;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselSlideChange;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselWillChange;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselDidChange;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselNextStart;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselPrevStart;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselNextEnd;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselPrevEnd;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselTransitionStart;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselTransitionEnd;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselDrag;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselReachStart;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselReachEnd;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselTouchStart;
    /** @type {?} */
    JeepCarousel.prototype.jeepCarouselTouchEnd;
    /**
     * @type {?}
     * @protected
     */
    JeepCarousel.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    JeepCarousel.prototype.z;
}
var JeepColorpicker = /** @class */ (function () {
    function JeepColorpicker(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepColorpickerGetColor', 'jeepColorpickerOpen', 'jeepColorpickerClose']);
    }
    JeepColorpicker.decorators = [
        { type: Component, args: [{ selector: 'jeep-colorpicker', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity'] },] },
    ];
    /** @nocollapse */
    JeepColorpicker.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    JeepColorpicker = tslib_1.__decorate([
        ProxyCmp({ inputs: ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity'], 'methods': ['init', 'open', 'close'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], JeepColorpicker);
    return JeepColorpicker;
}());
export { JeepColorpicker };
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
    /**
     * @type {?}
     * @protected
     */
    JeepColorpicker.prototype.z;
}
var JeepColumnchart = /** @class */ (function () {
    function JeepColumnchart(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    JeepColumnchart.decorators = [
        { type: Component, args: [{ selector: 'jeep-columnchart', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animation', 'cborder', 'color', 'cstyle', 'ctitle', 'datapoints', 'delay', 'subtitle', 'xtitle', 'ytitle'] },] },
    ];
    /** @nocollapse */
    JeepColumnchart.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    JeepColumnchart = tslib_1.__decorate([
        ProxyCmp({ inputs: ['animation', 'cborder', 'color', 'cstyle', 'ctitle', 'datapoints', 'delay', 'subtitle', 'xtitle', 'ytitle'], 'methods': ['init', 'getStatus', 'renderChart', 'getWindowSize', 'getCssProperties'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], JeepColumnchart);
    return JeepColumnchart;
}());
export { JeepColumnchart };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    JeepColumnchart.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    JeepColumnchart.prototype.z;
}
var JeepCpicker = /** @class */ (function () {
    function JeepCpicker(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepCpickerOpen', 'jeepCpickerClose', 'jeepCpickerInstantColor']);
    }
    JeepCpicker.decorators = [
        { type: Component, args: [{ selector: 'jeep-cpicker', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity'] },] },
    ];
    /** @nocollapse */
    JeepCpicker.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    JeepCpicker = tslib_1.__decorate([
        ProxyCmp({ inputs: ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity'], 'methods': ['init', 'getStateProperties', 'getWrapperCssVariables', 'calcH', 'calcS', 'calcB', 'calcO'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], JeepCpicker);
    return JeepCpicker;
}());
export { JeepCpicker };
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
    /**
     * @type {?}
     * @protected
     */
    JeepCpicker.prototype.z;
}
var JeepFlipimages = /** @class */ (function () {
    function JeepFlipimages(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepFlipImagesImgLoaded']);
    }
    JeepFlipimages.decorators = [
        { type: Component, args: [{ selector: 'jeep-flipimages', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['fpadding', 'type'] },] },
    ];
    /** @nocollapse */
    JeepFlipimages.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    JeepFlipimages = tslib_1.__decorate([
        ProxyCmp({ inputs: ['fpadding', 'type'], 'methods': ['init'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], JeepFlipimages);
    return JeepFlipimages;
}());
export { JeepFlipimages };
if (false) {
    /** @type {?} */
    JeepFlipimages.prototype.jeepFlipImagesImgLoaded;
    /**
     * @type {?}
     * @protected
     */
    JeepFlipimages.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    JeepFlipimages.prototype.z;
}
var JeepFullscreen = /** @class */ (function () {
    function JeepFullscreen(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepFullscreenRequest', 'jeepFullscreenExit', 'jeepFullscreenChange']);
    }
    JeepFullscreen.decorators = [
        { type: Component, args: [{ selector: 'jeep-fullscreen', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' },] },
    ];
    /** @nocollapse */
    JeepFullscreen.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    JeepFullscreen = tslib_1.__decorate([
        ProxyCmp({ 'methods': ['init', 'setFullscreen', 'setJeepFullscreenVisibility', 'fullscreenRequest', 'fullscreenExit', 'isFullscreen'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], JeepFullscreen);
    return JeepFullscreen;
}());
export { JeepFullscreen };
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
    /**
     * @type {?}
     * @protected
     */
    JeepFullscreen.prototype.z;
}
var JeepHtmlToprint = /** @class */ (function () {
    function JeepHtmlToprint(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepHtmlToPrint', 'jeepHtmlToPrintReady', 'jeepHtmlToPrintCompleted']);
    }
    JeepHtmlToprint.decorators = [
        { type: Component, args: [{ selector: 'jeep-html-toprint', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['slotstyle'] },] },
    ];
    /** @nocollapse */
    JeepHtmlToprint.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    JeepHtmlToprint = tslib_1.__decorate([
        ProxyCmp({ inputs: ['slotstyle'], 'methods': ['init', 'load', 'emitPrint', 'getSlotStyle'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], JeepHtmlToprint);
    return JeepHtmlToprint;
}());
export { JeepHtmlToprint };
if (false) {
    /** @type {?} */
    JeepHtmlToprint.prototype.jeepHtmlToPrint;
    /** @type {?} */
    JeepHtmlToprint.prototype.jeepHtmlToPrintReady;
    /** @type {?} */
    JeepHtmlToprint.prototype.jeepHtmlToPrintCompleted;
    /**
     * @type {?}
     * @protected
     */
    JeepHtmlToprint.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    JeepHtmlToprint.prototype.z;
}
var JeepLinechart = /** @class */ (function () {
    function JeepLinechart(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    JeepLinechart.decorators = [
        { type: Component, args: [{ selector: 'jeep-linechart', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animation', 'cborder', 'cstyle', 'ctitle', 'data', 'delay', 'subtitle', 'xtitle', 'ytitle'] },] },
    ];
    /** @nocollapse */
    JeepLinechart.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    JeepLinechart = tslib_1.__decorate([
        ProxyCmp({ inputs: ['animation', 'cborder', 'cstyle', 'ctitle', 'data', 'delay', 'subtitle', 'xtitle', 'ytitle'], 'methods': ['init', 'getStatus', 'renderChart', 'getWindowSize', 'getCssProperties'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], JeepLinechart);
    return JeepLinechart;
}());
export { JeepLinechart };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    JeepLinechart.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    JeepLinechart.prototype.z;
}
var JeepNavigation = /** @class */ (function () {
    function JeepNavigation(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepNavigationPrev', 'jeepNavigationNext']);
    }
    JeepNavigation.decorators = [
        { type: Component, args: [{ selector: 'jeep-navigation', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['name'] },] },
    ];
    /** @nocollapse */
    JeepNavigation.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    JeepNavigation = tslib_1.__decorate([
        ProxyCmp({ inputs: ['name'], 'methods': ['init', 'setNavigation', 'setJeepNavigationVisibility', 'setJeepNavigationPrevDisabled', 'setJeepNavigationNextDisabled', 'getJeepNavigationIconFamily'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], JeepNavigation);
    return JeepNavigation;
}());
export { JeepNavigation };
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
    /**
     * @type {?}
     * @protected
     */
    JeepNavigation.prototype.z;
}
var JeepPagination = /** @class */ (function () {
    function JeepPagination(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepPaginationIndex']);
    }
    JeepPagination.decorators = [
        { type: Component, args: [{ selector: 'jeep-pagination', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['clickable', 'direction', 'ndisplay'] },] },
    ];
    /** @nocollapse */
    JeepPagination.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    JeepPagination = tslib_1.__decorate([
        ProxyCmp({ inputs: ['clickable', 'direction', 'ndisplay'], 'methods': ['init', 'setJeepPaginationVisibility', 'setJeepPaginationSlidesNumber', 'setJeepPaginationActiveIndex', 'getJeepPaginationBulletNumber'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], JeepPagination);
    return JeepPagination;
}());
export { JeepPagination };
if (false) {
    /** @type {?} */
    JeepPagination.prototype.jeepPaginationIndex;
    /**
     * @type {?}
     * @protected
     */
    JeepPagination.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    JeepPagination.prototype.z;
}
var JeepPlayControls = /** @class */ (function () {
    function JeepPlayControls(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepPlayControlsIsBeginning', 'jeepPlayControlsIsEnd', 'jeepPlayControlsCurrentIndex', 'jeepPlayControlsAutoplayStart', 'jeepPlayControlsAutoplayStop', 'jeepPlayControlsAutoplayPause', 'jeepPlayControlsAutoplaySkipBackward', 'jeepPlayControlsAutoplaySkipForward']);
    }
    JeepPlayControls.decorators = [
        { type: Component, args: [{ selector: 'jeep-play-controls', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['duration', 'fromslide', 'nslides', 'toslide'] },] },
    ];
    /** @nocollapse */
    JeepPlayControls.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    JeepPlayControls = tslib_1.__decorate([
        ProxyCmp({ inputs: ['duration', 'fromslide', 'nslides', 'toslide'], 'methods': ['init', 'setPlayControls', 'setJeepPlayControlsVisibility', 'setJeepPlayControlsSkipBackwardDisabled', 'setJeepPlayControlsSkipForwardDisabled', 'getJeepPlayControlsDuration', 'autoplayStart', 'autoplayStop', 'autoplayPause', 'isPlaying', 'getCurrentIndex', 'setActiveIndexAndPlay', 'setCurrentIndex'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], JeepPlayControls);
    return JeepPlayControls;
}());
export { JeepPlayControls };
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
    /**
     * @type {?}
     * @protected
     */
    JeepPlayControls.prototype.z;
}
var JeepSlide = /** @class */ (function () {
    function JeepSlide(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepSlideDidLoad']);
    }
    JeepSlide.decorators = [
        { type: Component, args: [{ selector: 'jeep-slide', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['cstyle', 'stitle', 'subtitle'] },] },
    ];
    /** @nocollapse */
    JeepSlide.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    JeepSlide = tslib_1.__decorate([
        ProxyCmp({ inputs: ['cstyle', 'stitle', 'subtitle'], 'methods': ['init', 'setSlide'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], JeepSlide);
    return JeepSlide;
}());
export { JeepSlide };
if (false) {
    /** @type {?} */
    JeepSlide.prototype.jeepSlideDidLoad;
    /**
     * @type {?}
     * @protected
     */
    JeepSlide.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    JeepSlide.prototype.z;
}
var JeepSlides = /** @class */ (function () {
    function JeepSlides(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepSlidesHeaderVisibility']);
    }
    JeepSlides.decorators = [
        { type: Component, args: [{ selector: 'jeep-slides', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['options'] },] },
    ];
    /** @nocollapse */
    JeepSlides.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    JeepSlides = tslib_1.__decorate([
        ProxyCmp({ inputs: ['options'], 'methods': ['init', 'setSlides', 'getActiveSlideIndex'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], JeepSlides);
    return JeepSlides;
}());
export { JeepSlides };
if (false) {
    /** @type {?} */
    JeepSlides.prototype.jeepSlidesHeaderVisibility;
    /**
     * @type {?}
     * @protected
     */
    JeepSlides.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    JeepSlides.prototype.z;
}
var JeepStretchyHeader = /** @class */ (function () {
    function JeepStretchyHeader(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepStretchyHeaderToolbar']);
    }
    JeepStretchyHeader.decorators = [
        { type: Component, args: [{ selector: 'jeep-stretchy-header', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['headerbackground', 'headerbackgroundblur', 'headerheight', 'toolbarcontrastcolor'] },] },
    ];
    /** @nocollapse */
    JeepStretchyHeader.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    JeepStretchyHeader = tslib_1.__decorate([
        ProxyCmp({ inputs: ['headerbackground', 'headerbackgroundblur', 'headerheight', 'toolbarcontrastcolor'], 'methods': ['init'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], JeepStretchyHeader);
    return JeepStretchyHeader;
}());
export { JeepStretchyHeader };
if (false) {
    /** @type {?} */
    JeepStretchyHeader.prototype.jeepStretchyHeaderToolbar;
    /**
     * @type {?}
     * @protected
     */
    JeepStretchyHeader.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    JeepStretchyHeader.prototype.z;
}
var JeepSvgmorph = /** @class */ (function () {
    function JeepSvgmorph(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    JeepSvgmorph.decorators = [
        { type: Component, args: [{ selector: 'jeep-svgmorph', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['calcmode', 'duration', 'fill', 'keysplines', 'keytimes', 'nsegment', 'pathindex', 'repeatcount'] },] },
    ];
    /** @nocollapse */
    JeepSvgmorph.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    JeepSvgmorph = tslib_1.__decorate([
        ProxyCmp({ inputs: ['calcmode', 'duration', 'fill', 'keysplines', 'keytimes', 'nsegment', 'pathindex', 'repeatcount'], 'methods': ['init', 'getStateProperties', 'getPath', 'getPathList', 'getFillColor', 'renderSVGFirstPath', 'getAlignedPaths'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], JeepSvgmorph);
    return JeepSvgmorph;
}());
export { JeepSvgmorph };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    JeepSvgmorph.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    JeepSvgmorph.prototype.z;
}
