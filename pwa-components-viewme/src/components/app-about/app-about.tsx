import { h, Component, Element } from '@stencil/core';
import { APPVERSION } from '../../global/constants';

@Component({
  tag: 'app-about',
  styleUrl: 'app-about.css'
})
export class AppAbout {
  @Element() el: Element;

  render() {
      const version:string = APPVERSION;
    return [
      <ion-header>
        <ion-toolbar color="ligth">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
          </ion-buttons>
          <ion-title>About</ion-title>
        </ion-toolbar>
      </ion-header>,
        <ion-content class="ion-padding">
            <div id='about-div'>
                <ion-card id='about-card' class="about-card">
                <ion-card-title class="about-card-title" >JEEP COMPONENTS VIEWME APP</ion-card-title>
                <ion-card-subtitle class="about-card-subtitle" >Version : {version}</ion-card-subtitle>
                </ion-card>
            </div>
        </ion-content>
    ];
  }

}
