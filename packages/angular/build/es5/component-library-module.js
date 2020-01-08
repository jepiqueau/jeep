/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { defineCustomElements } from "@jeepq/core/loader";
import { JeepColorpicker, JeepLinechart, JeepSvgmorph, JeepSlides, JeepFlipimages } from "./directives/proxies";
defineCustomElements(window);
/** @type {?} */
var DECLARATIONS = [
    // proxies
    JeepColorpicker,
    JeepLinechart,
    JeepSvgmorph,
    JeepSlides,
    JeepFlipimages
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
