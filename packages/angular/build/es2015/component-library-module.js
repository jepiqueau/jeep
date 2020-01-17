/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { defineCustomElements } from "@jeepq/core/loader";
import { JeepColorpicker, JeepLinechart, JeepColumnchart, JeepSvgmorph, JeepSlides, JeepFlipimages, JeepStretchyHeader, JeepHtmlToprint, JeepCarousel } from "./directives/proxies";
defineCustomElements(window);
/** @type {?} */
const DECLARATIONS = [
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
export class ComponentLibraryModule {
}
ComponentLibraryModule.decorators = [
    { type: NgModule, args: [{
                declarations: DECLARATIONS,
                exports: DECLARATIONS,
                imports: [],
                providers: []
            },] },
];
