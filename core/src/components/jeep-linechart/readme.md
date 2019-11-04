# jeep-linechart

  JeepLinechart is a Web Component to display a line chart using SVG Elements.

  JeepLinechart may display a series or multiple series of dataPoints connected
  by straigh line segments.

  The line chart options are driven by Global CSS custom properties defined in variables.css file.

## Global custom CSS variables

| Variable                       | Default  |
| ------------------------------ | -------- | 
|  --chart-width                 | 100%     |
|  --chart-height                | 400px    |
|  --chart-top                   | 0px      |
|  --chart-left                  | 0px      |
|  --chart-background-color      | #ffffff  |
|  --chart-axis-color            | #000000  |   
|  --chart-font-family           | Verdana  | 
|  --chart-label-font-size       | 10px     |
|  --chart-title-color           | #000000  |
|  --chart-title-font-size       | 25px     |
|  --chart-subtitle-color        | #000000  |
|  --chart-subtitle-font-size    | 20px     |
|  --chart-axis-title-color      | #000000  |
|  --chart-axis-title-font-size  | 15px     |
|  --chart-line-color            | #4ba96e  |
|  --chart-label-color           | #000000  |
|  --chart-tick-x-length         | 5px      |
|  --chart-tick-y-length         | 4px      |
|  --chart-grid-x                | false    |
|  --chart-axis-x-zero           | false    |
|  --chart-axis-y-zero           | false    |
|  --chart-axis-x-interval       | 20       |
|  --chart-axis-y-interval       | 50       |
|  --chart-animation-duration    | 1s       |
|  --chart-legend-font-size      | 12px     |
|  --chart-legend-top            | true     |
|  --chart-border-color          | #000000  |
|  --chart-border-width          | 4        |    

## Usage
  - with no property defined

      ```html
      <jeep-linechart></jeep-linechart>
      ```
    error message Error: no datapoints property
 
  - with datapoints property defining a series of dataPoints

      ```html
      <jeep-linechart  
          data='{
              "color": "#425cef",
              "dataPoints":[
                  { "x": "2012-01-01", "y": 450 },
                  { "x": "2012-01-02", "y": 414 },
                  { "x": "2012-01-03", "y": 520 },
                  { "x": "2012-01-04", "y": 460 },
                  { "x": "2012-01-05", "y": 450 },
                  { "x": "2012-01-06", "y": 500 },
                  { "x": "2012-01-07", "y": 480 },
                  { "x": "2012-01-08", "y": 480 },
                  { "x": "2012-01-09", "y": 410 },
                  { "x": "2012-01-10", "y": 500 },
                  { "x": "2012-01-11", "y": 480 },
                  { "x": "2012-01-12", "y": 510 }]}'
      ></jeep-linechart>
      ```

  - with datapoints property (x: string) including marker

      ```html
      <jeep-linechart  
          data='{
              "color": "#425cef",
              "markerType": "plus",             // cross,circle,square,plus,triangle
              "markerSize": 10,
              "markerColor": "#d543ef",
              "dataPoints":[
                  { "x": "2012-01-01", "y": 450 },
                  { "x": "2012-01-02", "y": 414 },
                  { "x": "2012-01-03", "y": 520 },
                  { "x": "2012-01-04", "y": 460 },
                  { "x": "2012-01-05", "y": 450 },
                  { "x": "2012-01-06", "y": 500 },
                  { "x": "2012-01-07", "y": 480 },
                  { "x": "2012-01-08", "y": 480 },
                  { "x": "2012-01-09", "y": 410 },
                  { "x": "2012-01-10", "y": 500 },
                  { "x": "2012-01-11", "y": 480 },
                  { "x": "2012-01-12", "y": 510 }]}'
      ></jeep-linechart>
      ```

  - with datapoints property (x: number) including marker

      ```html
      <jeep-linechart  
          data='{
              "color": "#ff0000",
              "markerType": "circle",             // cross,circle,square,plus,triangle
              "markerSize": 8,
              "markerColor": "#ff0000",
              "dataPoints":[
                  { "x": 1.5, "y": 450 },
                  { "x": 2.0, "y": 414 },
                  { "x": 3.25, "y": 520 },
                  { "x": 4.75, "y": 460 },
                  { "x": 5.35, "y": 450 },
                  { "x": 6.42, "y": 500 },
                  { "x": 7.36, "y": 480 },
                  { "x": 8.0, "y": 480 },
                  { "x": 9.14, "y": 410 },
                  { "x": 10.87, "y": 500 },
                  { "x": 11.35, "y": 480 },
                  { "x": 12.45, "y": 510 }]}'
      ></jeep-linechart>
      ```
 
  - with a title

      ```html
      <jeep-linechart ctitle="Basic Line Chart"  
          data='{
              "color": "#425cef",
              "dataPoints":[
                  { "x": 1.5, "y": 450 },
                  { "x": 5.35, "y": 450 },
                  { "x": 12.45, "y": 510 }]}'
      ></jeep-linechart>
      ```

  - with a subtitle

      ```html
      <jeep-linechart ctitle="Basic Line Chart" subtitle="test sub-title" 
          data='{
              "color": "#425cef",
              "dataPoints":[
                  { "x": 1.5, "y": 450 },
                  { "x": 5.35, "y": 450 },
                  { "x": 12.45, "y": 510 }]}'
      ></jeep-linechart>
      ```

  - with axes title 

      ```html
      <jeep-linechart ctitle="Basic Line Chart" subtitle="test sub-title" 
      xtitle="test for x axis" ytitle="test for y axis" 
          data='{
              "color": "#425cef",
              "dataPoints":[
                  { "x": 1.5, "y": 450 },
                  { "x": 5.35, "y": 450 },
                  { "x": 12.45, "y": 510 }]}'
      ></jeep-linechart>
      ```

  - with line animation 

      ```html
      <jeep-linechart ctitle="Basic Line Chart" subtitle="test sub-title" 
          xtitle="test for x axis" ytitle="test for y axis" 
          data='{
              "color": "#425cef",
              "dataPoints":[
                  { "x": 1.5, "y": 450 },
                  { "x": 5.35, "y": 450 },
                  { "x": 12.45, "y": 510 }]}'
          animation>
      </jeep-linechart>
      ```

  - with a border 

      ```html
      <jeep-linechart ctitle="Basic Line Chart" subtitle="test sub-title" 
          xtitle="test for x axis" ytitle="test for y axis" 
          data='{
              "color": "#425cef",
              "dataPoints":[
                  { "x": 1.5, "y": 450 },
                  { "x": 5.35, "y": 450 },
                  { "x": 12.45, "y": 510 }]}'
          cborder>
      </jeep-linechart>
      ```

  - with local style 

      ```html
      <jeep-linechart ctitle="Basic Line Chart" subtitle="test sub-title" 
          xtitle="test for x axis" ytitle="test for y axis" 
          data='{
              "color": "#425cef",
              "dataPoints":[
                  { "x": 1.5, "y": 450 },
                  { "x": 5.35, "y": 450 },
                  { "x": 12.45, "y": 510 }]}'
          cborder
          cstyle="--height:350px;--top:30px;--left:15px;--width:50%;--backgroundcolor: rgb(248, 243, 222);">
      </jeep-linechart>
      ```

  - with delay property (timeout for the getBoundingClientRect function)

      ```html
      <jeep-linechart ctitle="Basic Line Chart" subtitle="test sub-title" 
          xtitle="test for x axis" ytitle="test for y axis" 
          data='{
              "color": "#425cef",
              "dataPoints":[
                  { "x": 1.5, "y": 450 },
                  { "x": 5.35, "y": 450 },
                  { "x": 12.45, "y": 510 }]}'
          cborder
          delay="200">
      </jeep-linechart>
      ```

  - with datapoints property defining multiple series of dataPoints
  
      ```html
      <jeep-linechart ctitle="Basic Line Chart" subtitle="test sub-title" 
          xtitle="test for x axis" ytitle="test for y axis" 
          data='[{
              "color": "#425cef",
              "name": "Line 1",
              "markerType": "plus",
              "markerSize": 10,
              "markerColor": "#d543ef",
              "dataPoints":[
                  { "x": "2012-01-01", "y": 450 },
                  { "x": "2012-01-02", "y": 414 },
                  { "x": "2012-01-03", "y": 520 },
                  { "x": "2012-01-04", "y": 460 },
                  { "x": "2012-01-05", "y": 450 },
                  { "x": "2012-01-06", "y": 500 },
                  { "x": "2012-01-07", "y": 480 },
                  { "x": "2012-01-08", "y": 480 },
                  { "x": "2012-01-09", "y": 410 },
                  { "x": "2012-01-10", "y": 500 },
                  { "x": "2012-01-11", "y": 480 },
                  { "x": "2012-01-12", "y": 510 }]},
          {
              "color": "#efd543",
              "name": "Line 2",
              "markerType": "square",
              "markerSize": 6,
              "markerColor": "#5def43",
              "dataPoints":[
                  { "x": "2012-01-01", "y": 430 },
                  { "x": "2012-01-02", "y": 510 },
                  { "x": "2012-01-03", "y": 450 },
                  { "x": "2012-01-04", "y": 470 },
                  { "x": "2012-01-05", "y": 430 },
                  { "x": "2012-01-06", "y": 500 },
                  { "x": "2012-01-07", "y": 420 },
                  { "x": "2012-01-08", "y": 450 },
                  { "x": "2012-01-09", "y": 380 },
                  { "x": "2012-01-10", "y": 390 },
                  { "x": "2012-01-11", "y": 495 },
                  { "x": "2012-01-12", "y": 505 }]},
          {
              "color": "#ff0000",
              "name": "Line 3",
              "lineThickness": 2,
              "markerType": "circle",
              "markerSize": 10,
              "markerColor": "#ff0000",
              "dataPoints":[
                  { "x": "2012-01-01", "y": 530 },
                  { "x": "2012-01-02", "y": 410 },
                  { "x": "2012-01-03", "y": 550 },
                  { "x": "2012-01-04", "y": 440 },
                  { "x": "2012-01-05", "y": 330 },
                  { "x": "2012-01-06", "y": 400 },
                  { "x": "2012-01-07", "y": 520 },
                  { "x": "2012-01-08", "y": 550 },
                  { "x": "2012-01-09", "y": 280 },
                  { "x": "2012-01-10", "y": 590 },
                  { "x": "2012-01-11", "y": 395 },
                  { "x": "2012-01-12", "y": 455 }]}]'
          animation>
      </jeep-linechart>
      ```


<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type      | Default     |
| ----------- | ----------- | ----------- | --------- | ----------- |
| `animation` | `animation` |             | `boolean` | `undefined` |
| `cborder`   | `cborder`   |             | `boolean` | `undefined` |
| `cstyle`    | `cstyle`    |             | `string`  | `undefined` |
| `ctitle`    | `ctitle`    |             | `string`  | `undefined` |
| `data`      | `data`      |             | `string`  | `undefined` |
| `delay`     | `delay`     |             | `string`  | `undefined` |
| `subtitle`  | `subtitle`  |             | `string`  | `undefined` |
| `xtitle`    | `xtitle`    |             | `string`  | `undefined` |
| `ytitle`    | `ytitle`    |             | `string`  | `undefined` |


## Methods

### `getCssProperties() => Promise<Variables>`



#### Returns

Type: `Promise<Variables>`



### `getStatus() => Promise<Status>`



#### Returns

Type: `Promise<Status>`



### `getWindowSize() => Promise<Rect>`



#### Returns

Type: `Promise<Rect>`



### `init() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `renderChart() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
