import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'colorpicker', loadChildren: './colorpicker/colorpicker.module#ColorpickerPageModule' },
  { path: 'flipimages', loadChildren: './flipimages/flipimages.module#FlipimagesPageModule' },
  { path: 'linechart', loadChildren: './linechart/linechart.module#LinechartPageModule'},
  { path: 'columnchart', loadChildren: './columnchart/columnchart.module#ColumnchartPageModule'},
  { path: 'slides', loadChildren: './slides/slides.module#SlidesPageModule'},
  { path: 'svgmorphing', loadChildren: './svgmorphing/svgmorphing.module#SVGMorphingPageModule'},
  { path: 'stretchyheader', loadChildren: './stretchyheader/stretchyheader.module#StretchyheaderPageModule' },
  { path: 'htmltoprint', loadChildren: './htmltoprint/htmltoprint.module#HtmltoprintPageModule' },
  { path: 'carousel', loadChildren: './carousel/carousel.module#CarouselPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
