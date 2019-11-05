import { NgModule } from "@angular/core";
import { defineCustomElements } from "@jeepq/core/loader";

import { JeepColorpicker, JeepLinechart, JeepSvgmorph } from "./directives/proxies";

defineCustomElements(window);

const DECLARATIONS = [
  // proxies
  JeepColorpicker,
  JeepLinechart,
  JeepSvgmorph
];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [],
  providers: []
})
export class ComponentLibraryModule {}