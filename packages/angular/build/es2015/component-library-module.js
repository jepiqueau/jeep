/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { defineCustomElements } from "@jeepq/core/loader";
import { JeepColorpicker, JeepLinechart, JeepSvgmorph, JeepSlides, JeepFlipimages } from "./directives/proxies";
defineCustomElements(window);
/** @type {?} */
const DECLARATIONS = [
    // proxies
    JeepColorpicker,
    JeepLinechart,
    JeepSvgmorph,
    JeepSlides,
    JeepFlipimages
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
