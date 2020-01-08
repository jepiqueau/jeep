import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ColorPicker from './pages/ColorPicker';
import SvgMorph from './pages/SvgMorph';
import LineChart from './pages/LineChart';
import FlipImages from './pages/FlipImages';
import Slides from './pages/Slides';

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
          <Route path="/slides" component={Slides} />
          <Route path="/flipimages" component={FlipImages} />
          <Route path="/linechart" component={LineChart} />
          <Route path="/svgmorph" component={SvgMorph} />
          <Route path="/colorpicker" component={ColorPicker} />
          <Route path="/home" component={Home} />
          <Redirect exact from="/" to="/home" />
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
