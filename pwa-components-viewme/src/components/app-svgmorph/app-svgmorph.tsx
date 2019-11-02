import { h, Component, Element } from '@stencil/core';


@Component({
  tag: 'app-svgmorph',
  styleUrl: 'app-svgmorph.css',
  shadow: true
})
export class AppSvgMorph {
  
  @Element() el!: HTMLAppSvgmorphElement;


  render() {
    return [
      <ion-header>
        <ion-toolbar color="light">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
          </ion-buttons>
          <ion-title>JeepSvgMorph ViewMe</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <ion-card>
          <ion-item>
            <ion-router-link color="primary" href="/svgmorph/viewme/basic" routerDirection="forward">Basic Path</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/svgmorph/viewme/pathIndex" routerDirection="forward">PathIndex Control</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/svgmorph/viewme/fullControl" routerDirection="forward">Full Control</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/svgmorph/viewme/silhouette" routerDirection="forward">Silhouettes</ion-router-link>
          </ion-item>
        </ion-card>
      </ion-content>

    ]
  }
}
