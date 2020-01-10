import { h, Component } from '@stencil/core';


@Component({
  tag: 'app-stretchyheader',
  styleUrl: 'app-stretchyheader.css',
  shadow:true
})
export class AppStretchyheader {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="light">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
          </ion-buttons>
          <ion-title>JeepStretchyHeader ViewMe</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content class="ion-padding">
        <ion-card>
          <ion-item>
            <ion-router-link color="primary" href="/stretchyheader/viewme" routerDirection="forward">Stretchy Header</ion-router-link>
          </ion-item>
        </ion-card>
      </ion-content>
    ];
  }
}
