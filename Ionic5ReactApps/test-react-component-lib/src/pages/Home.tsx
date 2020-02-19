import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import React , {Component} from 'react';
import "./Home.css";

type Props = {}

class Home extends Component<Props> {
    render() {
        return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Jeep React App</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonButton href="/colorpicker" expand="block">ColorPicker Test</IonButton>
            <IonButton href="/svgmorph" expand="block">SvgMorph Test</IonButton>
            <IonButton href="/columnchart" expand="block">ColumnChart Test</IonButton>
            <IonButton href="/linechart" expand="block">LineChart Test</IonButton>
            <IonButton href="/flipimages" expand="block">FlipImages Test</IonButton>
            <IonButton href="/slides" expand="block">Slides Test</IonButton>
            <IonButton href="/stretchyheader" expand="block">Stretchy Header Test</IonButton>
            <IonButton href="/htmltoprint" expand="block">HTML to Print Test</IonButton>
            <IonButton href="/carousel" expand="block">Carousel Test</IonButton>
          </IonContent>
        </IonPage>
        );
      };
    
}
export default Home;