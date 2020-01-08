import { h, Component, Element } from '@stencil/core';


@Component({
  tag: 'app-flipimages',
  styleUrl: 'app-flipimages.css',
  shadow: true
})
export class AppFlipImages {
  
  @Element() el!: HTMLAppFlipimagesElement;


  render() {
    return [
      <ion-header>
        <ion-toolbar color="light">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
          </ion-buttons>
          <ion-title>JeepFlipImages ViewMe</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <ion-card>
          <ion-item>
            <ion-router-link color="primary" href="/flipimages/viewme/l_horizontal" routerDirection="forward">Flip L Images Horizontal</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/flipimages/viewme/l_vertical" routerDirection="forward">Flip L Images Vertical</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/flipimages/viewme/p_horizontal" routerDirection="forward">Flip P Images Horizontal</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/flipimages/viewme/p_vertical" routerDirection="forward">Flip P Images Vertical</ion-router-link>
          </ion-item>
        </ion-card>
      </ion-content>

    ]
  }
}
