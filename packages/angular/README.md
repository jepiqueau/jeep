[![npm version](https://img.shields.io/npm/v/@jeepq/angular/latest.svg)](https://www.npmjs.com/package/@jeepq/angular)
[![license](https://img.shields.io/npm/l/@jeepq/angular.svg)](https://github.com/jepiqueau/jeep/blob/master/packages/angular/LICENSE)

# Jeep Angular Component Library

This is a library of Angular Web Component built on top of the Jeep Stencil Components library.

The library includes the following Angular components:

 - JeepColorpicker
 - JeepLinechart
 - JeepColumnchart
 - JeepFlipimages
 - JeepSvgmorph
 - JeepSlides
 - JeepStretchyHeader
 - JeepHtmlToPrint
 - JeepCarousel


## Usage
In your Angular project install @jeepq/angular.

```
npm install --save @jeepq/angular@latest
``` 

and import the Angular Components you would like to use

```
import { ComponentLibraryModule } from '@jeepq/angular';

@NgModule({
  ...
  imports: [
    ComponentLibraryModule
  ],
  ...
})
export class AppModule { }

```
