# react-colorpicker-app
Sample project that shows an integration of [color-picker web component build with StencilJS](https://github.com/jepiqueau/jeep/blob/master/core/src/components/jeep-colorpicker/readme.md) 
in React App.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project


```bash
npm install --save @jeepq/react@latest

```

## Usage

```js
import React from "react";

import ReactDOM from "react-dom";
import { JeepColorpicker } from "@jeepq/react";
import "./App.css";

class App extends React.Component{
  constructor() {
    super();
    this.state = {color:"#ff0000",opacity:"1"};
    
  }
  showColor(color) {
    const grid = document.querySelector("#grid");

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
  handleColor(ev) {
    this.showColor(ev.detail);
  }

  async handleOpen(){
    const grid = document.querySelector("#grid");
    grid.innerHTML = ``;
  }
  handleClose(ev){
    console.log('onClose closeData: ',ev.detail); 
    this.showColor(ev.detail.color);
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <div id="header">
            <p id="title">Test Jeep Color Picker</p>
          </div>
          <div id="content">
            <JeepColorpicker id="jcp-first" color={this.state.color} opacity={this.state.opacity} buttons='[Color,✔,X]' 
            onJeepColorpickerGetColor={this.handleColor.bind(this)} onJeepColorpickerOpen={this.handleOpen} onJeepColorpickerClose={this.handleClose.bind(this)}/>
            <div id="grid"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById("root") || document.createElement('div');  // for testing purposes
ReactDOM.render(<App />, rootElement);

export default App;

```


