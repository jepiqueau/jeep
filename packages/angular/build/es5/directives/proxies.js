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
            function (val) { this.el[item] = val; },
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
            /** @type {?} */
            var args = arguments;
            return this.el.componentOnReady().then((/**
             * @param {?} el
             * @return {?}
             */
            function (el) { return el[methodName].apply(el, args); }));
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
    function (eventName) { return instance[eventName] = fromEvent(el, eventName); }));
}
var JeepColorpicker = /** @class */ (function () {
    function JeepColorpicker(c, r) {
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepColorpickerGetColor', 'jeepColorpickerOpen', 'jeepColorpickerClose']);
    }
    JeepColorpicker.decorators = [
        { type: Component, args: [{ selector: 'jeep-colorpicker', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity'] },] },
    ];
    /** @nocollapse */
    JeepColorpicker.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
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
}
proxyMethods(JeepColorpicker, ['init', 'open', 'close']);
proxyInputs(JeepColorpicker, ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity']);
var JeepCpicker = /** @class */ (function () {
    function JeepCpicker(c, r) {
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['jeepCpickerOpen', 'jeepCpickerClose', 'jeepCpickerInstantColor']);
    }
    JeepCpicker.decorators = [
        { type: Component, args: [{ selector: 'jeep-cpicker', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity'] },] },
    ];
    /** @nocollapse */
    JeepCpicker.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
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
}
proxyMethods(JeepCpicker, ['init', 'getStateProperties', 'getWrapperCssVariables', 'calcH', 'calcS', 'calcB', 'calcO']);
proxyInputs(JeepCpicker, ['buttons', 'color', 'hidebuttons', 'hideheader', 'hideopacity', 'opacity']);
var JeepLinechart = /** @class */ (function () {
    function JeepLinechart(c, r) {
        c.detach();
        this.el = r.nativeElement;
    }
    JeepLinechart.decorators = [
        { type: Component, args: [{ selector: 'jeep-linechart', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['animation', 'cborder', 'cstyle', 'ctitle', 'data', 'delay', 'subtitle', 'xtitle', 'ytitle'] },] },
    ];
    /** @nocollapse */
    JeepLinechart.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    return JeepLinechart;
}());
export { JeepLinechart };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    JeepLinechart.prototype.el;
}
proxyMethods(JeepLinechart, ['init', 'getStatus', 'renderChart', 'getWindowSize', 'getCssProperties']);
proxyInputs(JeepLinechart, ['animation', 'cborder', 'cstyle', 'ctitle', 'data', 'delay', 'subtitle', 'xtitle', 'ytitle']);
var JeepSvgmorph = /** @class */ (function () {
    function JeepSvgmorph(c, r) {
        c.detach();
        this.el = r.nativeElement;
    }
    JeepSvgmorph.decorators = [
        { type: Component, args: [{ selector: 'jeep-svgmorph', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['calcmode', 'duration', 'fill', 'keysplines', 'keytimes', 'nsegment', 'pathindex', 'repeatcount'] },] },
    ];
    /** @nocollapse */
    JeepSvgmorph.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    return JeepSvgmorph;
}());
export { JeepSvgmorph };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    JeepSvgmorph.prototype.el;
}
proxyMethods(JeepSvgmorph, ['init', 'getStateProperties', 'getPath', 'getPathList', 'getFillColor', 'renderSVGFirstPath', 'getAlignedPaths']);
proxyInputs(JeepSvgmorph, ['calcmode', 'duration', 'fill', 'keysplines', 'keytimes', 'nsegment', 'pathindex', 'repeatcount']);
