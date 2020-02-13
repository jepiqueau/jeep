import { NgModule } from '@angular/core';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

console.log('location.pathname.length ',location.pathname.length)
console.log('location.pathname ',location.pathname)


const applicationContextPath = (): String => {
  if (location.pathname.split('/').length > 2) {
  console.log('in > 2 location.pathname ',location.pathname)
      return `${location.pathname.slice(0,location.pathname.lastIndexOf('/')+1)}`;
  } else
      return "./";
}
console.log('applicationContextPath ',applicationContextPath())
const appPath: String = applicationContextPath();
const routes: Routes = [
  /*
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import(`/Users/queaujeanpierre/Documents/StencilWebComponent/publishLibrary/jeep/Ionic5Angular9Apps/test-angular-plugin-lib/src/app/home/home.module`).then( m => m.HomePageModule)},
  { path: 'embedded', loadChildren: () => import("../../src/app/embedded/embedded.module").then( m => m.EmbeddedPageModule)},
*/
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'embedded',
    loadChildren: () => import('./embedded/embedded.module').then( m => m.EmbeddedPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
