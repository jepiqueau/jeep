import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
   IonBackButton, IonButton, IonIcon } from '@ionic/react';
import React , {Component} from 'react';
import { JeepHtmlToprint} from '@jeepq/react';
import "./HtmltoPrint.css";
import { print } from "ionicons/icons";


type Props = {}
class HtmltoPrint extends Component<Props> {



  _handlePrintClick() {
    const cmpt: any  = document.querySelector("jeep-html-toprint");
    if(cmpt) {
      cmpt.emitPrint();
    }

  }

  render() {
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>HTML to Print Test</IonTitle>
          <IonButtons slot='end'>
              <IonButton  onClick={this._handlePrintClick.bind(this)}>
                <IonIcon slot="end" icon={print} color="dark"/>
              </IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <JeepHtmlToprint>
          <div slot="toprint">
              <h2>Hello World</h2>
              <table>
                <thead>
                  <tr className="table-tr-header">
                    <th className="left">Firstname</th>
                    <th className="left">Lastname</th> 
                    <th className="center">Age</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="left">Jill</td>
                    <td className="left">Smith</td> 
                    <td className="center">50</td>
                  </tr>
                  <tr>
                    <td className="left">Eve</td>
                    <td className="left">Jackson</td> 
                    <td className="center">94</td>
                  </tr>
                </tbody>
              </table> 
          </div>   
        </JeepHtmlToprint>
      </IonContent>
    </IonPage>
    );
  };
};

export default HtmltoPrint;