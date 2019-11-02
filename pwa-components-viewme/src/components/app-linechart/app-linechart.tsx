import { h, Component, Element } from '@stencil/core';


@Component({
  tag: 'app-linechart',
  styleUrl: 'app-linechart.css',
  shadow: true
})
export class AppLineChart {
  
  @Element() el!: HTMLAppLinechartElement;


  render() {
    return [
      <ion-header>
        <ion-toolbar color="light">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
          </ion-buttons>
          <ion-title>JeepLineChart ViewMe</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <ion-card>
          <ion-item>
            <ion-router-link color="primary" href="/linechart/viewme/basic" routerDirection="forward">Line Basic</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/linechart/viewme/basic-y" routerDirection="forward">Line Non Y Zero and Y Interval</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/linechart/viewme/markers" routerDirection="forward">Line with Markers</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/linechart/viewme/multiplelines" routerDirection="forward">Multiple Lines</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/linechart/viewme/multipleplots" routerDirection="forward">Multiple Plots</ion-router-link>
          </ion-item>
        </ion-card>
      </ion-content>

    ]
  }
}
