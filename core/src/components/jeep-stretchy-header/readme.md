# jeep-stretchy-header

``` jeep-stretchy-header ``` is a web component to re-create stretchy header effect in a ``` ion-app ``` application.

## Usage

  - with default value 

```html
    <ion-app>  
        <jeep-stretchy-header >
            <ion-header>
                <ion-toolbar color="light">
                    <ion-buttons slot="start">
                        <ion-button>
                            <ion-icon slot="start" name="star"></ion-icon>
                            Left Icon
                        </ion-button>
                    </ion-buttons>
                    <ion-title>Stretchy Header</ion-title>
                </ion-toolbar>
            </ion-header>
        </jeep-stretchy-header>
        <ion-content class="ion-padding">
        <h1>A Stretchy Header Web Component</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>      
        </ion-content>
    </ion-app>  

```

  - with given headerheight

```html
    <ion-app>  
        <jeep-stretchy-header headerheight="25%">
            <ion-header>
                <ion-toolbar color="light">
                    <ion-title>Stretchy Header</ion-title>
                </ion-toolbar>
            </ion-header>
        </jeep-stretchy-header>
        <ion-content class="ion-padding">
        <h1>A Stretchy Header Web Component</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        </ion-content>
    </ion-app>  

```
  - with given headerbackground url 

```html
    <ion-app>  
        <jeep-stretchy-header headerheight="25%" headerbackground="url(https://ununsplash.imgix.net/photo-1421091242698-34f6ad7fc088?fit=crop&fm=jpg&h=650&q=75&w=950)">
            <ion-header>
                <ion-toolbar color="light">
                    <ion-title>Stretchy Header</ion-title>
                </ion-toolbar>
            </ion-header>
        </jeep-stretchy-header>
        <ion-content class="ion-padding">
        <h1>A Stretchy Header Web Component</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        </ion-content>
    </ion-app>  

``` 

  - with given headerbackground url && linear gradient effect

```html
    <ion-app>  
        <jeep-stretchy-header headerheight="25%" headerbackground="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.25)) , url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/italy-mountains.jpeg)">
            <ion-header>
                <ion-toolbar color="light">
                    <ion-title>Stretchy Header</ion-title>
                </ion-toolbar>
            </ion-header>
        </jeep-stretchy-header>
        <ion-content class="ion-padding">
        <h1>A Stretchy Header Web Component</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        </ion-content>
    </ion-app>  

``` 

  - with given headerbackgroundblur

```html
    <ion-app>  
        <jeep-stretchy-header headerheight="25%" headerbackground="url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/italy-mountains.jpeg)" headerbackgroundblur>
            <ion-header>
                <ion-toolbar color="light">
                    <ion-title>Stretchy Header</ion-title>
                </ion-toolbar>
            </ion-header>
        </jeep-stretchy-header>
        <ion-content class="ion-padding">
        <h1>A Stretchy Header Web Component</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        </ion-content>
    </ion-app>  

``` 

  - with given toolbarcontrastcolor="#ffffff"

```html
    <ion-app>  
        <jeep-stretchy-header headerheight="25%" headerbackground="url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/italy-mountains.jpeg)" toolbarcontrastcolor="#ffffff">
            <ion-header>
                <ion-toolbar color="light">
                    <ion-title>Stretchy Header</ion-title>
                </ion-toolbar>
            </ion-header>
        </jeep-stretchy-header>
        <ion-content class="ion-padding">
        <h1>A Stretchy Header Web Component</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
        </ion-content>
    </ion-app>  

``` 

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute              | Description                                                                                                                                                                                                                                 | Type      | Default                                                                                             |
| ---------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------- |
| `headerbackground`     | `headerbackground`     | The Header Background Linear Gtradient if any and Url   headerbackground="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.75)) ,    url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/italy-mountains.jpeg)" | `string`  | `"url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/italy-mountains.jpeg)"` |
| `headerbackgroundblur` | `headerbackgroundblur` | The blur effect                                                                                                                                                                                                                             | `boolean` | `false`                                                                                             |
| `headerheight`         | `headerheight`         | The Header Height                                                                                                                                                                                                                           | `string`  | `"150px"`                                                                                           |
| `toolbarcontrastcolor` | `toolbarcontrastcolor` | The Navbar Contrast Color                                                                                                                                                                                                                   | `string`  | `"#ffffff"`                                                                                         |


## Events

| Event                       | Description                          | Type                                 |
| --------------------------- | ------------------------------------ | ------------------------------------ |
| `jeepStretchyHeaderToolbar` | Emitted the Header visibility change | `CustomEvent<StretchyHeaderToolbar>` |


## Methods

### `init() => Promise<void>`

Init data from properties.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
