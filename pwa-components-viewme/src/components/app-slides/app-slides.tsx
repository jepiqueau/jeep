import { h, Component, Element } from '@stencil/core';


@Component({
  tag: 'app-slides',
  styleUrl: 'app-slides.css',
  shadow: true
})
export class AppSlides {
  
  @Element() el!: HTMLAppSlidesElement;


  render() {
    return [
      <ion-header>
        <ion-toolbar color="ligth">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
          </ion-buttons>
          <ion-title>JeepSlides ViewMe</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <ion-card>
          <ion-item>
            <ion-router-link color="primary" href="/slides/viewme/basichorizontal" routerDirection="forward">slides Basic Horizontal</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/slides/viewme/basicvertical" routerDirection="forward">slides Basic Vertical</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/slides/viewme/navigationhorizontal" routerDirection="forward">slides Navigation Horizontal</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/slides/viewme/navigationvertical" routerDirection="forward">slides Navigation Vertical</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/slides/viewme/paginationhorizontal" routerDirection="forward">slides Pagination Horizontal</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/slides/viewme/paginationvertical" routerDirection="forward">slides Pagination Vertical</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/slides/viewme/paginationnavigationhorizontal" routerDirection="forward">slides Pagination Navigation Horizontal</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/slides/viewme/autoplayhorizontal" routerDirection="forward">slides Autoplay Horizontal</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/slides/viewme/autoplayvertical" routerDirection="forward">slides Autoplay Vertical</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/slides/viewme/fullscreenhorizontal" routerDirection="forward">slides Fullscreen Horizontal</ion-router-link>
          </ion-item>
        </ion-card>
      </ion-content>

    ]
  }
}
