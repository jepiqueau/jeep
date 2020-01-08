import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import React , {Component} from 'react';
import { JeepFlipimages } from '@jeepq/react';
import "./FlipImages.css";

type Props = {}
class FlipImages extends Component<Props> {
  root = document.documentElement;
  handleImgLoaded(){
    console.log('onImgLoaded: first image loaded');
  }


  render() {
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>FlipImages Test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <JeepFlipimages className="flipimages" type="horizontal" fpadding="5" onJeepFlipImagesImgLoaded={this.handleImgLoaded.bind(this)}>
          <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/deerl.jpg" alt="deer"></img>
          <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/elephantl.jpg" alt="elephant"></img>
          <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/tigerl.jpg" alt="tiger"></img>
          <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/lionl.jpg" alt="lion"></img>
          <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/eaglel.jpg" alt="eagle"></img>
          <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/eagleheadl.jpg" alt="eagle head"></img> 
        </JeepFlipimages>
      </IonContent>
    </IonPage>
    );
  };
};

export default FlipImages;