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
          <ion-route url="/columnchart" component="app-columnchart" />
          <ion-route url="/columnchart/viewme/:type" component="app-columnchart-viewme" />
          <ion-route url="/linechart" component="app-linechart" />
          <ion-route url="/linechart/viewme/:type" component="app-linechart-viewme" />
          <ion-route url="/svgmorph" component="app-svgmorph" />
          <ion-route url="/svgmorph/viewme/:type" component="app-svgmorph-viewme" />
          <ion-route url="/slides" component="app-slides" />
          <ion-route url="/slides/viewme/:type" component="app-slides-viewme" />
          <ion-route url="/flipimages" component="app-flipimages" />
          <ion-route url="/flipimages/viewme/:type" component="app-flipimages-viewme" />
          <ion-route url="/stretchyheader" component="app-stretchyheader" />
          <ion-route url="/stretchyheader/viewme/" component="app-stretchyheader-viewme" />
          <ion-route url="/carousel" component="app-carousel" />
          <ion-route url="/carousel/viewme/:type" component="app-carousel-viewme" />
          <ion-route url="/htmltoprint" component="app-htmltoprint" />
          <ion-route url="/htmltoprint/viewme/" component="app-htmltoprint-viewme" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
