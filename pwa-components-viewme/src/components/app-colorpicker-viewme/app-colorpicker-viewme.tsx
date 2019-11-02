import { h, Component, Element, Prop, Listen, State } from '@stencil/core';


@Component({
  tag: 'app-colorpicker-viewme',
  styleUrl: 'app-colorpicker-viewme.css',
  shadow:true
})
export class AppColorpickerViewme {
    @Element() el!: HTMLAppColorpickerViewmeElement;
    @Prop() type: string;

    @State() result: boolean = false;
    @State() toggle: boolean = false;

    _color: any;
    _propColor: string;
    _propOpacity: string;
    _gridStyle: any;
    _title: string;

    @Listen('jeepColorpickerGetColor')
    onColorHandler(event: CustomEvent) {
        this._color = event.detail;
        this._showColor(this._color);
      }
    @Listen('jeepColorpickerOpen')
    openCpickerHandler() {
      this.result = false;
    }
    @Listen('jeepColorpickerClose')
    closeCpickerHandler(event: CustomEvent) {
      this._color = event.detail.color;
      this._showColor(this._color);
    }

    componentWillLoad() {
        this._propColor = "#55cc45";
        this._propOpacity = "0.725";
    }

    _showColor(color) {
      if(color !== null) {
        this._propColor = color.hex.hex;
        this._propOpacity = color.opacity.toString();
        this._gridStyle = {
          width: '50px',
          height: '30px',
          border:'1px solid black',
          backgroundColor: `${color.hex.hex}`,
          opacity: `${color.opacity}`
        }   
        this.result = true; 
        this.toggle = !this.toggle;
      } else {
        this.result = false;
      }
    }
          
    render() {
      if (this.type) {
        let picker: Array<any> = [];
        switch(this.type) { 
          case "basic": {
            this._title = "ColorPicker Basic";
            picker = [
              <jeep-colorpicker color={this._propColor} opacity={this._propOpacity}></jeep-colorpicker>
            ];   
            break; 
          } 
          case "buttons-named": {
            this._title = "ColorPicker Buttons Customized Text";
            picker = [
              <jeep-colorpicker color="#ff0000" opacity="1" buttons="[Color,Valid,Dismiss]"></jeep-colorpicker>
            ];   
            break; 
          } 
          case "no-header": {
            this._title = "ColorPicker Hide Header";
            picker = [
              <jeep-colorpicker color="#ff0000" opacity="1" buttons="[Color,✔,X]" hideheader></jeep-colorpicker>
            ];   
            break; 
          } 
          case "no-buttons": {
            this._title = "ColorPicker Hide Buttons";
            picker = [
              <jeep-colorpicker color="#ff0000" opacity="1" buttons="[Color]" hidebuttons></jeep-colorpicker>
            ];   
            break; 
          } 
          case "no-opacity": {
            this._title = "ColorPicker Hide Opacity Slider";
            picker = [
              <jeep-colorpicker color="#ff0000" opacity="1" buttons="[Color,✔,X]" hideopacity></jeep-colorpicker>
            ];   
            break; 
          } 
          default: {
            picker =  [
              <div id="fake-colorpicker">
              </div>
            ];  
            break;
          }
        }
  
        return [
          <ion-header>
            <ion-toolbar color="light">
              <ion-buttons slot="start">
                <ion-back-button defaultHref="/colorpicker" />
              </ion-buttons>
              <ion-title>{this._title}</ion-title>
            </ion-toolbar>
          </ion-header>,
          <ion-content class="ion-padding">
            {picker}
            { this.result
            ? <ion-grid>
                <ion-row> 
                    <div style={this._gridStyle}></div>     
                </ion-row>
                <ion-row>
                    <ion-col col-5>{this._color.hex.hex}</ion-col>
                    <ion-col col-7>{this._color.opacity}</ion-col>
                </ion-row>
                <ion-row>
                    <ion-col col-5>{this._color.rgb.rgb}</ion-col>
                    <ion-col col-7>{this._color.rgb.rgba}</ion-col>
                </ion-row>
                <ion-row>
                    <ion-col col-5>{this._color.hsl.hsl}</ion-col>
                    <ion-col col-7>{this._color.hsl.hsla}</ion-col>
                </ion-row> 
              </ion-grid>
            :null
            }
          </ion-content>
        ];

      }
    }
}

/*
          <ion-back-button defaultHref="/colorpicker"></ion-back-button>

*/