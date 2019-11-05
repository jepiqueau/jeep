import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ColorpickerPage } from './colorpicker.page';
import { ComponentLibraryModule } from '@jeepq/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentLibraryModule,
    RouterModule.forChild([
      {
        path: '',
        component: ColorpickerPage
      }
    ])
  ],
  declarations: [ColorpickerPage],

})
export class ColorpickerPageModule {}
