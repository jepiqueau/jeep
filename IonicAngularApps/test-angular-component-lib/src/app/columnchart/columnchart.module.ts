import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentLibraryModule } from '@jeepq/angular';

import { ColumnchartPage } from './columnchart.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentLibraryModule,
    RouterModule.forChild([
      {
        path: '',
        component: ColumnchartPage
      }
    ])
  ],
  declarations: [ColumnchartPage],
})
export class ColumnchartPageModule {}
