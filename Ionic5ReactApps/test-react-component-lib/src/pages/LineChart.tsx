import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import React , {Component} from 'react';
import { JeepLinechart } from '@jeepq/react';
import "./LineChart.css";

type Props = {}
class LineChart extends Component<Props> {
  root = document.documentElement;

  render() {
    this.root.style.setProperty('--chart-axis-x-interval','2');
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>LineChart Test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <JeepLinechart ctitle="Multiple Lines Chart" subtitle="With Markers" 
            xtitle="test for x axis" ytitle="test for y axis" 
            data='[{
                "color": "#425cef",
                "name": "Line 1",
                "markerType": "plus",
                "markerSize": 10,
                "markerColor": "#d543ef",
                "dataPoints":[
                    { "x": "2012-01-01", "y": 450 },
                    { "x": "2012-01-02", "y": 414 },
                    { "x": "2012-01-03", "y": 520 },
                    { "x": "2012-01-04", "y": 460 },
                    { "x": "2012-01-05", "y": 450 },
                    { "x": "2012-01-06", "y": 500 },
                    { "x": "2012-01-07", "y": 480 },
                    { "x": "2012-01-08", "y": 480 },
                    { "x": "2012-01-09", "y": 410 },
                    { "x": "2012-01-10", "y": 500 },
                    { "x": "2012-01-11", "y": 480 },
                    { "x": "2012-01-12", "y": 510 }]},
                {
                "color": "#efd543",
                "name": "Line 2",
                "markerType": "square",
                "markerSize": 6,
                "markerColor": "#5def43",
                "dataPoints":[
                    { "x": "2012-01-01", "y": 430 },
                    { "x": "2012-01-02", "y": 510 },
                    { "x": "2012-01-03", "y": 450 },
                    { "x": "2012-01-04", "y": 470 },
                    { "x": "2012-01-05", "y": 430 },
                    { "x": "2012-01-06", "y": 500 },
                    { "x": "2012-01-07", "y": 420 },
                    { "x": "2012-01-08", "y": 450 },
                    { "x": "2012-01-09", "y": 380 },
                    { "x": "2012-01-10", "y": 390 },
                    { "x": "2012-01-11", "y": 495 },
                    { "x": "2012-01-12", "y": 505 }]},
                {
                "color": "#ff0000",
                "name": "Line 3",
                "lineThickness": 2,
                "markerType": "circle",
                "markerSize": 10,
                "markerColor": "#ff0000",
                "dataPoints":[
                    { "x": "2012-01-01", "y": 530 },
                    { "x": "2012-01-02", "y": 410 },
                    { "x": "2012-01-03", "y": 550 },
                    { "x": "2012-01-04", "y": 440 },
                    { "x": "2012-01-05", "y": 330 },
                    { "x": "2012-01-06", "y": 400 },
                    { "x": "2012-01-07", "y": 520 },
                    { "x": "2012-01-08", "y": 550 },
                    { "x": "2012-01-09", "y": 280 },
                    { "x": "2012-01-10", "y": 590 },
                    { "x": "2012-01-11", "y": 395 },
                    { "x": "2012-01-12", "y": 455 }]}]'
            animation cborder
            cstyle="--height:80%;--width:90%;--top:20px;--left:5%;">
        </JeepLinechart>     
      </IonContent>
    </IonPage>
    );
  };
};

export default LineChart;