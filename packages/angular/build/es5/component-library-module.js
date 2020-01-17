/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { defineCustomElements } from "@jeepq/core/loader";
import { JeepColorpicker, JeepLinechart, JeepColumnchart, JeepSvgmorph, JeepSlides, JeepFlipimages, JeepStretchyHeader, JeepHtmlToprint, JeepCarousel } from "./directives/proxies";
defineCustomElements(window);
/** @type {?} */
var DECLARATIONS = [
    // proxies
    JeepColorpicker,
    JeepLinechart,
    JeepColumnchart,
    JeepSvgmorph,
    JeepSlides,
    JeepFlipimages,
    JeepStretchyHeader,
    JeepHtmlToprint,
    JeepCarousel
];
var ComponentLibraryModule = /** @class */ (function () {
    function ComponentLibraryModule() {
    }
    ComponentLibraryModule.decorators = [
        { type: NgModule, args: [{
                    declarations: DECLARATIONS,
                    exports: DECLARATIONS,
                    imports: [],
                    providers: []
                },] },
    ];
    return ComponentLibraryModule;
}());
export { ComponentLibraryModule };
