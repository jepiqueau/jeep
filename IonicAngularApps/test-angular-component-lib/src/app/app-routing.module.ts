import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'colorpicker', loadChildren: './colorpicker/colorpicker.module#ColorpickerPageModule' },
  { path: 'flipimages', loadChildren: './flipimages/flipimages.module#FlipimagesPageModule' },
  { path: 'linechart', loadChildren: './linechart/linechart.module#LinechartPageModule'},
  { path: 'slides', loadChildren: './slides/slides.module#SlidesPageModule'},
  { path: 'svgmorphing', loadChildren: './svgmorphing/svgmorphing.module#SVGMorphingPageModule'},
  { path: 'stretchyheader', loadChildren: './stretchyheader/stretchyheader.module#StretchyheaderPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
