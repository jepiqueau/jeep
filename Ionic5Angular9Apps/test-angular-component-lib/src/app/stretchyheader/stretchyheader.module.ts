import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { StretchyheaderPage } from './stretchyheader.page';

const routes: Routes = [
  {
    path: '',
    component: StretchyheaderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StretchyheaderPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class StretchyheaderPageModule {}
