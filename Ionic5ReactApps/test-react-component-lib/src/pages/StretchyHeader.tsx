import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import React , {Component} from 'react';
import { JeepStretchyHeader } from '@jeepq/react';
import "./StretchyHeader.css";

type Props = {}
class StretchyHeader extends Component<Props> {

  handleStretchyHeaderToolbar(ev: CustomEvent){
    const toolbar = document.querySelector('ion-toolbar')
    if(toolbar) toolbar.style.setProperty("--ion-color-base", `${ev.detail.color}`,"important");
    if(toolbar) toolbar.style.setProperty("--ion-color-contrast", `${ev.detail.contrastColor}`,"important");
  }

  render() {
    return (
    <IonPage>
      <JeepStretchyHeader headerheight="25%" 
        headerbackground="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.75)) , 
        url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/italy-mountains.jpeg)"
        headerbackgroundblur toolbarcontrastcolor="#ffffff" onJeepStretchyHeaderToolbar={this.handleStretchyHeaderToolbar.bind(this)}>
        <IonHeader>
          <IonToolbar color="light">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Stretching Header Test</IonTitle>
          </IonToolbar>
        </IonHeader>
      </JeepStretchyHeader>
      <IonContent class="ion-padding">
        <h1>A Stretchy Header Web Component</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>      
      </IonContent>
    </IonPage>
    );
  };
};

export default StretchyHeader;