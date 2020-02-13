import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmbeddedPage } from './embedded.page';

const routes: Routes = [
  {
    path: '',
    component: EmbeddedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmbeddedPageRoutingModule {}
