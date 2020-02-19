# test-react-component-lib

Sample project uses to demonstrate the integration of [@jeepq/react Web Component Library](https://github.com/jepiqueau/jeep/blob/master/packages/react/README.md) 
in Ionic/React App.

## Project set-up

Create a new Ionic project using React framework
```
npm install -g ionic@latest
ionic start ionic-react-test-app blank --type=react
cd ionic-react-test-app
``` 

Install the @jeepq/react components library

``` 
npm install --save @jeepq/react@latest
``` 

## Project coding

### Index.tx
update the file index.tx according to the Ionic/Stencil documentation (https://stenciljs.com/docs/react )
as follow :

``` 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

```

### App.tsx
Modify as follows:

```
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ColorPicker from './pages/ColorPicker';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FunctionComponent = () => (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/colorpicker" component={ColorPicker} />
          <Route path="/home" component={Home} />
          <Redirect exact from="/" to="/home" />
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
```

### Home.tsx in pages folder
Modify as follows:

```
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import React , {Component} from 'react';
import "./Home.css";

type Props = {}

class Home extends Component<Props> {
    render() {
        return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Jeep React App</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonButton href="/colorpicker" expand="block">ColorPicker Test</IonButton>
          </IonContent>
        </IonPage>
        );
      };
    
}
export default Home;
```

### Create a ColorPicker.tsx file in the page folder

``` 
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
```

### Create a ColorPicker.css file

```
#grid {
    position: absolute;
    top: 60vh;
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px;
    padding: 10px;
  }
  #grid > div {
    text-align: left;
    font-size: 14px;
  }
  .colorpicker {
    --colorpicker-top: 2vh; 
    --colorpicker-left: 2vw;
    --colorpicker-width: 96vw; 
    --colorpicker-height: 50vh; 
    --colorpicker-button-font-size: 18px;
    --colorpicker-button-margin-top: 50px;
    --colorpicker-button-margin-left: 100px;
  }
```

## Build and run the project

```bash
npm run build
npm start
```


