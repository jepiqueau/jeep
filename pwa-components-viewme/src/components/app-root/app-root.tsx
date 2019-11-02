import { Component, h } from '@stencil/core';
import '@jeepq/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/about" component="app-about"></ion-route>  
          <ion-route url="/colorpicker" component="app-colorpicker" />
          <ion-route url="/colorpicker/viewme/:type" component="app-colorpicker-viewme" />
          <ion-route url="/linechart" component="app-linechart" />
          <ion-route url="/linechart/viewme/:type" component="app-linechart-viewme" />
          <ion-route url="/svgmorph" component="app-svgmorph" />
          <ion-route url="/svgmorph/viewme/:type" component="app-svgmorph-viewme" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
