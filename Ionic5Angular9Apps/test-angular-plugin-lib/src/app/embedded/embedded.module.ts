import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { EmbeddedPage } from './embedded.page';
import { EmbeddedPageRoutingModule } from './embedded-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmbeddedPageRoutingModule
  ],
  declarations: [EmbeddedPage]
})
export class EmbeddedPageModule {}
