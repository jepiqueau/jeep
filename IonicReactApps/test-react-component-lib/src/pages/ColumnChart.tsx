import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import React , {Component} from 'react';
import { JeepColumnchart } from '@jeepq/react';
import "./ColumnChart.css";

type Props = {}
class ColumnChart extends Component<Props> {
  root = document.documentElement;

  render() {
    this.root.style.setProperty('--chart-axis-x-interval','1');
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>ColumnChart Test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <JeepColumnchart ctitle="Basic Column Chart" subtitle="test sub-title" 
          xtitle="test for x axis" ytitle="test for y axis" 
          datapoints='{"data":[
          {"label":"Apple","y":10,"color":"#e34c46"},
          {"label":"Orange","y":-17,"color":"#d1b038"},
          {"label":"Banana","y":12,"color":"#48a37c"},
          {"label":"Mango","y":-30,"color":"#111782"},
          {"label":"Grape","y":28,"color":"#db123a"}]}'
          animation cborder
          cstyle="--height:450px;--width:80%;--top:30px;--left:10%;">
        </JeepColumnchart>
      </IonContent>
    </IonPage>
    );
  };
};

export default ColumnChart;