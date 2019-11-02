import { h, Component } from '@stencil/core';


@Component({
  tag: 'app-colorpicker',
  styleUrl: 'app-colorpicker.css',
  shadow:true
})
export class AppColorpicker {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="light">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
          </ion-buttons>
          <ion-title>JeepColorPicker ViewMe</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content class="ion-padding">
        <ion-card>
          <ion-item>
            <ion-router-link color="primary" href="/colorpicker/viewme/basic" routerDirection="forward">ColorPicker Basic</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/colorpicker/viewme/buttons-named" routerDirection="forward">ColorPicker Buttons Customized Text</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/colorpicker/viewme/no-header" routerDirection="forward">ColorPicker Hide Header</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/colorpicker/viewme/no-buttons" routerDirection="forward">ColorPicker Hide Buttons</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/colorpicker/viewme/no-opacity" routerDirection="forward">ColorPicker Hide Opacity Slider</ion-router-link>
          </ion-item>
        </ion-card>
      </ion-content>
    ];
  }
}
