# Jeep Angular Component Library

This is a library of Angular Web Component built on top of the Jeep Stencil Components library.

The library includes the following Angular components:

 - JeepColorpicker
 - JeepLinechart
 - JeepFlipimages
 - JeepSvgmorph
 - JeepSlides
 - JeepStretchyHeader


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
