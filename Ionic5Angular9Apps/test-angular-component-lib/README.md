# test-angular-component-lib

Sample project uses to demonstrate the integration of [@jeepq/angular Web Component Library](https://github.com/jepiqueau/jeep/blob/master/packages/angular/README.md) 
in Ionic/Angular App.

## Project set-up

Create a new Ionic project using Angular framework
```bash
npm install -g ionic@latest
ionic start ionic-angular-test-app blank --type=angular
cd ionic-angular-test-app
``` 

Install the @jeepq/angular components library

```bash 
npm install --save @jeepq/angular@latest
``` 

## Project coding

### app.module.ts
update the file app.module.ts as follow :

```ts 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ComponentLibraryModule } from '@jeepq/angular';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
     AppRoutingModule, ComponentLibraryModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

### app-routing.module.ts
Modify as follows:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'colorpicker', loadChildren: './colorpicker/colorpicker.module#ColorpickerPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### home.page.html
Modify as follows:

```html
<ion-header>
  <ion-toolbar>
    <ion-title>
      Test Angular Web Components Library
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-button href="/colorpicker" expand="block">ColorPicker Test</ion-button>
</ion-content>
```

### Create a colorpicker page

```bash
ionic generate page colorpicker
```

### colorpicker.module.ts
Modify as follows:

```ts 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ColorpickerPage } from './colorpicker.page';
import { ComponentLibraryModule } from '@jeepq/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentLibraryModule,
    RouterModule.forChild([
      {
        path: '',
        component: ColorpickerPage
      }
    ])
  ],
  declarations: [ColorpickerPage],

})
export class ColorpickerPageModule {}

```

### colorpicker.page.ts
Modify as follows:

```ts
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
```

### colorpicker.page.html
Modify as follows:

```html
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/"></ion-back-button>
    </ion-buttons>
    <ion-title>
      Color-Picker Test
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>

    <jeep-colorpicker color={{propColor}} opacity={{propOpacity}} buttons="[Color,V,X]"></jeep-colorpicker>
    <ng-template [ngIf]="isColor">
      <ion-grid>
        <ion-row>
          <div style="width:50px;height:30px;border:1px solid black" [style.background-color]=color.hex.hex [style.opacity]=color.opacity></div>     
        </ion-row>
        <ion-row>
          <ion-col col-5>{{color.hex.hex}}</ion-col>
          <ion-col col-7>{{color.opacity}}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col col-5>{{color.rgb.rgb}}</ion-col>
          <ion-col col-7>{{color.rgb.rgba}}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col col-5>{{color.hsl.hsl}}</ion-col>
          <ion-col col-7>{{color.hsl.hsla}}</ion-col>
        </ion-row>        
      </ion-grid>
    </ng-template>

</ion-content>
```

### colorpicker.page.scss
Modify as follows:

```css
app-home {
    ion-grid {
        position: absolute;
        top: 65vmin;
        font-size: 0.85rem;
    }
    jeep-colorpicker {
        --colorpicker-background-color: #242424;
        --colorpicker-top: 20vh;
        --colorpicker-left: 10vmin;
        --colorpicker-width: 80vmin;
        --colorpicker-height: 60vmin;
        --colorpicker-button-margin-top: 5vh;
        --colorpicker-button-margin-left: 5vw;
    }    
}
```

## Build and run the project

```bash
npm run build
npm start
```


