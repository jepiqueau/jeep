import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-columnchart',
  templateUrl: './columnchart.page.html',
  styleUrls: ['./columnchart.page.scss'],
})
export class ColumnchartPage implements OnInit {
  type: string;
  title: string;
  constructor() { }

  ngOnInit() {
      const root: HTMLElement = document.documentElement;
      root.style.setProperty('--chart-width', '100%');
      root.style.setProperty('--chart-height', '400px');
      root.style.setProperty('--chart-top','0px');
      root.style.setProperty('--chart-left','0px');
      root.style.setProperty('--chart-background-color','#ffffff');
      root.style.setProperty('--chart-axis-color','#000000');   
      root.style.setProperty('--chart-font-family','Verdana'); 
      root.style.setProperty('--chart-label-font-size','10px');
      root.style.setProperty('--chart-title-color','#000000');
      root.style.setProperty('--chart-title-font-size','25px');
      root.style.setProperty('--chart-subtitle-color','#000000');
      root.style.setProperty('--chart-subtitle-font-size','20px');
      root.style.setProperty('--chart-axis-title-color','#000000');
      root.style.setProperty('--chart-axis-title-font-size','15px');
      root.style.setProperty('--chart-line-color','#4ba96e');
      root.style.setProperty('--chart-label-color','#000000');
      root.style.setProperty('--chart-tick-x-length','5px');
      root.style.setProperty('--chart-tick-y-length','4px');
      root.style.setProperty('--chart-grid-x','true');
      root.style.setProperty('--chart-animation-duration','0.5s');
      root.style.setProperty('--chart-border-color','#000000');
      root.style.setProperty('--chart-border-width','4');
      root.style.setProperty('--chart-axis-x-interval','1');
         
      this.type = "cstyle"
      this.title = 'Column Chart with Style' 
    }
}
