import { h, Component, Prop, Element } from '@stencil/core';


@Component({
  tag: 'app-flipimages-viewme',
  styleUrl: 'app-flipimages-viewme.css',
  shadow: true
})
export class AppFlipImagesViewme {
  
  @Element() el!: HTMLAppFlipimagesViewmeElement;
  @Prop() type: string;



  render() {
    if (this.type) {
      let flip: Array<any> = [];
      let stype: Array<string> = this.type.split('_');
      if(stype[0] === 'l') {
        flip =  [
          <jeep-flipimages id="flip1" type={stype[1]} fpadding="5">
            <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/deerl.jpg" alt="deer"></img>
            <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/elephantl.jpg" alt="elephant"></img>
            <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/tigerl.jpg" alt="tiger"></img>
            <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/lionl.jpg" alt="lion"></img>
            <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/eaglel.jpg" alt="eagle"></img>
            <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/eagleheadl.jpg" alt="eagle head"></img> 
          </jeep-flipimages>
        ];
      } else {
        flip =  [
          <jeep-flipimages id="flip2" type={stype[1]} fpadding="10">
            <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/ara.jpg" alt="ara"></img>
            <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/dog.jpg" alt="dog"></img>
            <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/gorilla.jpg" alt="gorilla"></img>
            <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/lion.jpg" alt="lion"></img>
            <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/penguin.jpg" alt="penguin"></img>
          </jeep-flipimages>
        ];
      }
      return [
        <ion-header>
          <ion-toolbar color="light">
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/flipimages" />
            </ion-buttons>
          </ion-toolbar>
        </ion-header>,
        <ion-content class="ion-padding">
          {flip}
        </ion-content>
      ]
    }
  }
}
