import { NgModule } from "@angular/core";
import { defineCustomElements } from "@jeepq/core/loader";

import { JeepColorpicker, JeepLinechart, JeepColumnchart, JeepSvgmorph, JeepSlides, JeepFlipimages, 
  JeepStretchyHeader, JeepHtmlToprint, JeepCarousel } from "./directives/proxies";

defineCustomElements(window);

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

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [],
  providers: []
})
export class ComponentLibraryModule {}