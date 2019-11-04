import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import React , {Component} from 'react';
import { JeepColorpicker } from '@jeepq/react';
import "./ColorPicker.css";

type Props = {}
type State = {
  color: string,
  opacity: string
}
class ColorPicker extends Component<Props, State> {
  state = {color:"#ff0000",opacity:"1"};

  showColor(color) {
    const grid = document.querySelector("#grid");

    if(grid ) {
      if(color != null) {
        this.setState({color:color.hex.hex,opacity:color.opacity.toString()});
        grid.innerHTML =
        `
          <div style="width:50px;height:30px;border:1px solid black;background-color:` +
            color.hex.hex +
            `;opacity:` +
            color.opacity +`">
          </div>
          <div></div>     
          <div>` +
            color.hex.hex +`
          </div>
          <div>` +
            color.opacity +`
          </div>
          <div>` +
            color.rgb.rgb +`
          </div>
          <div>` +
            color.rgb.rgba +`
          </div>
          <div>` +
            color.hsl.hsl +`
          </div>
          <div>` +
            color.hsl.hsla +`
          </div>
        `;

      } else {
        grid.innerHTML = ``;
      }
    }
  }
  handleColor(ev: CustomEvent) {
    console.log('onColor ',ev.detail);
    this.showColor(ev.detail);
  }

  handleOpen(){
    console.log('onOpen');
    const grid = document.querySelector("#grid");
    if(grid) grid.innerHTML = ``;
  }
  handleClose(ev: CustomEvent){
    console.log('onClose closeData: ',ev.detail); 
    this.showColor(ev.detail.color);
  }

  render() {
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>ColorPicker Test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <JeepColorpicker className="colorpicker" color={this.state.color} opacity={this.state.opacity} buttons='[Color,✔,X]' 
          onJeepColorpickerGetColor={this.handleColor.bind(this)} onJeepColorpickerOpen={this.handleOpen} onJeepColorpickerClose={this.handleClose.bind(this)}/>
          <div id="grid"></div>
      </IonContent>
    </IonPage>
    );
  };
};

export default ColorPicker;