import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentLibraryModule } from '@jeepq/angular';

import { CarouselPage } from './carousel.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentLibraryModule,
    RouterModule.forChild([
      {
        path: '',
        component: CarouselPage
      }
    ])
  ],
  declarations: [CarouselPage],
})
export class CarouselPageModule {}
