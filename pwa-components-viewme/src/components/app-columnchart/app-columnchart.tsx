import { h, Component, Element } from '@stencil/core';


@Component({
  tag: 'app-columnchart',
  styleUrl: 'app-columnchart.css',
  shadow: true
})
export class AppColumnChart {
  
  @Element() el!: HTMLAppColumnchartElement;


  render() {
    return [
      <ion-header>
        <ion-toolbar color="light">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
          </ion-buttons>
          <ion-title>JeepColumnChart ViewMe</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <ion-card>
          <ion-item>
            <ion-router-link color="primary" href="/columnchart/viewme/basic-positive" routerDirection="forward">Column Chart Basic all Positive</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/columnchart/viewme/basic-negative" routerDirection="forward">Column Chart Basic all Negative</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/columnchart/viewme/cstyle" routerDirection="forward">Column Chart Basic with Cstyle</ion-router-link>
          </ion-item>
        </ion-card>
      </ion-content>

    ]
  }
}
