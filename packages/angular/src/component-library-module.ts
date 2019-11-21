import { NgModule } from "@angular/core";
import { defineCustomElements } from "@jeepq/core/loader";

import { JeepColorpicker, JeepLinechart, JeepSvgmorph, JeepSlides } from "./directives/proxies";

defineCustomElements(window);

const DECLARATIONS = [
  // proxies
  JeepColorpicker,
  JeepLinechart,
  JeepSvgmorph,
  JeepSlides
];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [],
  providers: []
})
export class ComponentLibraryModule {}