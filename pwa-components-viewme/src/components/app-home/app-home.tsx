import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="light">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <h2>Jeep ViewMe PWA</h2>
        <p>
          Welcome to the Jeep ViewMe PWA App.
        </p> 
        <p>
          This application has been made to demonstrate the use of Jeep Stencil Web Components through ViewMe Pages.

        </p>

        <ion-button href="/about" expand="block">About Page</ion-button>
        <ion-button href="/colorpicker" expand="block">ColorPicker Viewme</ion-button>
        <ion-button href="/columnchart" expand="block">ColumnChart Viewme</ion-button>
        <ion-button href="/linechart" expand="block">LineChart Viewme</ion-button>
        <ion-button href="/flipimages" expand="block">FlipImages Viewme</ion-button>
        <ion-button href="/svgmorph" expand="block">SVGMorphing Viewme</ion-button>
        <ion-button href="/slides" expand="block">Slides Viewme</ion-button>
        <ion-button href="/stretchyheader" expand="block">StretchyHeader Viewme</ion-button>
        <ion-button href="/carousel" expand="block">Carousel Viewme</ion-button>
        <ion-button href="/htmltoprint" expand="block">HTML to Print Viewme</ion-button>
      </ion-content>
    ];
  }
}
