import { h, Component, Prop, Element } from '@stencil/core';


@Component({
  tag: 'app-columnchart-viewme',
  styleUrl: 'app-columnchart-viewme.css',
  shadow: true
})
export class AppColumnchartViewme {
  
  @Element() el!: HTMLAppColumnchartViewmeElement;
  @Prop() type: string;

  _root: HTMLElement;

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

  }  


  render() {
    if (this.type) {
      let chart: Array<any> = [];
      switch(this.type) { 
        case "basic-positive": {
          this._root.style.setProperty('--chart-axis-x-interval','1');
          chart = [
            <jeep-columnchart ctitle="Basic Column Chart" subtitle="all positive" xtitle="test for x axis" ytitle="test for y axis" datapoints='{"data":[
              {"label":"Apple","y":10,"color":"#e34c46"},
              {"label":"Orange","y":17,"color":"#d1b038"},
              {"label":"Banana","y":12,"color":"#48a37c"},
              {"label":"Mango","y":30,"color":"#111782"},
              {"label":"Grape","y":28,"color":"#db123a"}]}'
              animation>
            </jeep-columnchart>
          ];   
          break; 
        } 
        case "basic-negative": {
          this._root.style.setProperty('--chart-axis-x-interval','1');
          chart = [
            <jeep-columnchart ctitle="Basic Column Chart" subtitle="all negative" xtitle="test for x axis" ytitle="test for y axis" datapoints='{"data":[
              {"label":"Apple","y":-10,"color":"#e34c46"},
              {"label":"Orange","y":-17,"color":"#d1b038"},
              {"label":"Banana","y":-12,"color":"#48a37c"},
              {"label":"Mango","y":-30,"color":"#111782"},
              {"label":"Grape","y":-28,"color":"#db123a"}]}'
              animation>
            </jeep-columnchart>
          ];   
          break; 
        } 
        case "cstyle": {
          this._root.style.setProperty('--chart-axis-x-interval','1');
          chart = [
            <jeep-columnchart ctitle="Column Chart" subtitle="with cstyle property" xtitle="test for x axis" ytitle="test for y axis" datapoints='{"data":[
              {"label":"Apple","y":10,"color":"#e34c46"},
              {"label":"Orange","y":-17,"color":"#d1b038"},
              {"label":"Banana","y":12,"color":"#48a37c"},
              {"label":"Mango","y":-30,"color":"#111782"},
              {"label":"Grape","y":28,"color":"#db123a"}]}'
              animation cborder 
              cstyle="--height:450px;--width:80%;--top:30px;--left:10%;">
            </jeep-columnchart>                    ];   
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
              <ion-back-button defaultHref="/columnchart" />
            </ion-buttons>
          </ion-toolbar>
        </ion-header>,
        <ion-content class="ion-padding">
          {chart}
        </ion-content>
      ]
    }
  }
}
