import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-htmltoprint',
  styleUrl: 'app-htmltoprint.css',
  shadow: true
})
export class AppHtmltoprint {

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="light">
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/"></ion-back-button>
            </ion-buttons>
            <ion-title>JeepHTMLtoPrint ViewMe</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-card>
            <ion-item>
              <ion-router-link color="primary" href="/htmltoprint/viewme" routerDirection="forward">HTML to Print</ion-router-link>
            </ion-item>
          </ion-card>
        </ion-content>
      </Host>
    );
  }

}
