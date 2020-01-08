import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SlidesPage } from './slides.page';
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
        component: SlidesPage
      }
    ])
  ],
  declarations: [SlidesPage],
})
export class SlidesPageModule {}
