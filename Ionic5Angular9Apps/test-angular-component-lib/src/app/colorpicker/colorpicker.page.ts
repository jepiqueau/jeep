import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-colorpicker',
  templateUrl: 'colorpicker.page.html',
  styleUrls: ['colorpicker.page.scss'],
})
export class ColorpickerPage  implements OnInit {
  public color:any;
  public isColor: boolean;
  public propColor: string;
  public propOpacity: string;
  private _picker: any;

  constructor() { 
  }
  ngOnInit() {
    this.isColor = false;
    this.propColor = "#55cc45";
    this.propOpacity = "0.725";

  }
  ngAfterViewInit() {
    this._picker = document.querySelector('jeep-colorpicker');
    this._picker.addEventListener('jeepColorpickerGetColor', (ev) => {
      console.log('selected color ',ev.detail)
      this.isColor = false;
      if(ev.detail != null) {
        this.color = ev.detail;
        this.propColor = this.color.hex.hex;
        this.propOpacity = this.color.opacity.toString();
        this.isColor = true;    
      }
    },false );
    this._picker.addEventListener('jeepColorpickerClose', (ev) => {
      console.log('selected color ',ev.detail.color)
      this.isColor = false;
      if(ev.detail.color != null) {
        this.color = ev.detail.color;
        this.propColor = this.color.hex.hex;
        this.propOpacity = this.color.opacity.toString();
        this.isColor = true;    
      }
    },false );
    this._picker.addEventListener("jeepColorpickerOpen", () => {
      this.isColor = false;
    },false);
  
  }
}
