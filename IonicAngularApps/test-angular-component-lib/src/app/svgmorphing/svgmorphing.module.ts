import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SVGMorphingPage } from './svgmorphing.page';
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
        component: SVGMorphingPage
      }
    ])
  ],
  declarations: [SVGMorphingPage],
  
})
export class SVGMorphingPageModule {}
