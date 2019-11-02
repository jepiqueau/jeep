import { h, Component, Prop, Element } from '@stencil/core';


@Component({
  tag: 'app-linechart-viewme',
  styleUrl: 'app-linechart-viewme.css',
  shadow: true
})
export class AppLinechartViewme {
  
  @Element() el!: HTMLAppLinechartViewmeElement;
  @Prop() type: string;

  _root: HTMLElement;
  _title: string;

  componentWillLoad() {
    this._root = document.documentElement;
    this._root.style.setProperty('--chart-width', '100%');
    this._root.style.setProperty('--chart-height', '400px');
    this._root.style.setProperty('--chart-top','0px');
    this._root.style.setProperty('--chart-left','0px');
    this._root.style.setProperty('--chart-background-color','#ffffff');
    this._root.style.setProperty('--chart-axis-color','#000000');   
    this._root.style.setProperty('--chart-font-family','Verdana'); 
    this._root.style.setProperty('--chart-label-font-size','10px');
    this._root.style.setProperty('--chart-title-color','#000000');
    this._root.style.setProperty('--chart-title-font-size','25px');
    this._root.style.setProperty('--chart-subtitle-color','#000000');
    this._root.style.setProperty('--chart-subtitle-font-size','20px');
    this._root.style.setProperty('--chart-axis-title-color','#000000');
    this._root.style.setProperty('--chart-axis-title-font-size','15px');
    this._root.style.setProperty('--chart-line-color','#4ba96e');
    this._root.style.setProperty('--chart-label-color','#000000');
    this._root.style.setProperty('--chart-tick-x-length','5px');
    this._root.style.setProperty('--chart-tick-y-length','4px');
    this._root.style.setProperty('--chart-grid-x','false');
    this._root.style.setProperty('--chart-axis-x-zero','false');
    this._root.style.setProperty('--chart-axis-y-zero','alse');
    this._root.style.setProperty('--chart-axis-x-interval','20');
    this._root.style.setProperty('--chart-axis-y-interval','50');
    this._root.style.setProperty('--chart-animation-duration','1s');
    this._root.style.setProperty('--chart-legend-font-size','12px');
    this._root.style.setProperty('--chart-legend-top','true');
    this._root.style.setProperty('--chart-border-color','#000000');
    this._root.style.setProperty('--chart-border-width','4');   

  }  


  render() {
    if (this.type) {
      let chart: Array<any> = [];

      switch(this.type) { 
        case "basic": {
          this._title = "Line Basic";
          this._root.style.setProperty('--chart-axis-x-interval','1');
          chart = [
            <jeep-linechart ctitle="Basic Line Chart" subtitle="test sub-title" xtitle="test for x axis" ytitle="test for y axis" 
              data='{
                  "color": "#425cef",
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
                      { "x": "2012-01-12", "y": 510 }]}'  
              animation cborder
              cstyle="--height:70%;--width:90%;--top:20px;--left:5%;">
            </jeep-linechart>
          ];   
          break; 
        } 
        case "basic-y" : {
          this._title = "Line Non Y Zero & Y Interval";
          this._root.style.setProperty('--chart-axis-x-zero:','false');
          this._root.style.setProperty('--chart-axis-y-zero:','false');
          this._root.style.setProperty('--chart-axis-x-interval','20');
          this._root.style.setProperty('--chart-axis-y-interval','50');
          chart = [
            <jeep-linechart ctitle="Basic-Y Line Chart" subtitle="test sub-title" xtitle="test for x axis" ytitle="test for y axis" 
            data='{
              "color": "#425cef",
              "name": "Line 1",
              "dataPoints":[
                { "x": 14, "y": 450 },
                { "x": 20, "y": 414 },
                { "x": 30, "y": 520 },
                { "x": 40, "y": 460 },
                { "x": 50, "y": 450 },
                { "x": 60, "y": 500 },
                { "x": 70, "y": 480 },
                { "x": 80, "y": 480 },
                { "x": 90, "y": 410 },
                { "x": 100, "y": 500 },
                { "x": 110, "y": 480 },
                { "x": 120, "y": 510 }]}'
            animation
            cstyle="--height:70%;--width:90%;--top:20px;--left:5%;">
            </jeep-linechart>
          ];        
          break;
        }
        case "markers": { 
          this._title = "Line with Markers";
          this._root.style.setProperty('--chart-axis-x-interval','20');
          chart = [
            <jeep-linechart ctitle="Basic Line Chart" subtitle="With Markers" xtitle="test for x axis" ytitle="test for y axis" 
              data='{
                    "color": "#425cef",
                    "name": "Line 1",
                    "markerType": "plus",
                    "markerSize": 10,
                    "markerColor": "#d543ef",
                "dataPoints":[
                { "x": 14, "y": 450 },
                { "x": 20, "y": 414 },
                { "x": 30, "y": 520 },
                { "x": 40, "y": 460 },
                { "x": 50, "y": 450 },
                { "x": 60, "y": 500 },
                { "x": 70, "y": 480 },
                { "x": 80, "y": 480 },
                { "x": 90, "y": 410 },
                { "x": 100, "y": 500 },
                { "x": 110, "y": 480 },
                { "x": 120, "y": 510 }]}'
              cstyle="--height:80%;--width:90%;--top:20px;--left:5%;">
            </jeep-linechart> 
          ];   
          break; 
        } 
        case "multiplelines": { 
          this._title = "Multiple Lines";
          this._root.style.setProperty('--chart-axis-x-interval','2');
          chart = [
            <jeep-linechart ctitle="Multiple Lines Chart" subtitle="With Markers" 
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
            </jeep-linechart>     
          ];
          break;   
        }
        case "multipleplots": { 
          this._title = "Multiple Charts";
          this._root.style.setProperty('--chart-axis-x-interval','2');
          chart = [
            <jeep-linechart id="basic" ctitle="Basic Line Chart" subtitle="test sub-title" xtitle="test for x axis" ytitle="test for y axis" 
              data='{
                  "color": "#425cef",
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
                      { "x": "2012-01-12", "y": 510 }]}'  
              animation cborder
              cstyle="--height:38%;--width:70%;--top:20px;--left:15%;--backgroundcolor: rgb(248, 243, 222);">
            </jeep-linechart>,
            <jeep-linechart  id="multiple" ctitle="Multiple Lines Chart" subtitle="With Markers" 
              xtitle="test for x axis" ytitle="test for y axis" 
              data='[{
                  "color": "#425cef",
                  "name": "Line 1",
                  "markerType": "plus",
                  "markerSize": 10,
                  "markerColor": "#d543ef",
                  "dataPoints":[
                      { "x": 2, "y": 450 },
                      { "x": 4, "y": 414 },
                      { "x": 5, "y": 520 },
                      { "x": 7, "y": 460 },
                      { "x": 8, "y": 450 },
                      { "x": 9, "y": 500 },
                      { "x": 10, "y": 480 },
                      { "x": 12, "y": 480 },
                      { "x": 15, "y": 410 },
                      { "x": 16, "y": 500 },
                      { "x": 18, "y": 480 },
                      { "x": 20, "y": 510 }]},
                  {
                  "color": "#efd543",
                  "name": "Line 2",
                  "markerType": "square",
                  "markerSize": 6,
                  "markerColor": "#5def43",
                  "dataPoints":[
                      { "x": 2, "y": 430 },
                      { "x": 4, "y": 510 },
                      { "x": 5, "y": 450 },
                      { "x": 7, "y": 470 },
                      { "x": 8, "y": 430 },
                      { "x": 9, "y": 500 },
                      { "x": 10, "y": 420 },
                      { "x": 12, "y": 450 },
                      { "x": 15, "y": 380 },
                      { "x": 16, "y": 390 },
                      { "x": 18, "y": 495 },
                      { "x": 20, "y": 505 }]},
                  {
                  "color": "#ff0000",
                  "name": "Line 3",
                  "lineThickness": 2,
                  "markerType": "circle",
                  "markerSize": 10,
                  "markerColor": "#ff0000",
                  "dataPoints":[
                      { "x": 2, "y": 530 },
                      { "x": 4, "y": 410 },
                      { "x": 5, "y": 550 },
                      { "x": 7, "y": 440 },
                      { "x": 8, "y": 330 },
                      { "x": 9, "y": 400 },
                      { "x": 10, "y": 520 },
                      { "x": 12, "y": 550 },
                      { "x": 15, "y": 280 },
                      { "x": 16, "y": 590 },
                      { "x": 18, "y": 395 },
                      { "x": 20, "y": 455 }]}]'
                  animation cborder
                  cstyle="--height:48%;--width:90%;--top:30px;--left:5%;">
            </jeep-linechart>      
          ];
          break;   
        }
        default: {
          chart =  [
            <div id="fake-chart">
            </div>
          ];  
          break;
        }
      }
      return [
        <ion-header>
          <ion-toolbar color="light">
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/linechart" />
            </ion-buttons>
            <ion-title>{this._title}</ion-title>
          </ion-toolbar>
        </ion-header>,
        <ion-content class="ion-padding">
          {chart}
        </ion-content>
      ]
    }
  }
}
