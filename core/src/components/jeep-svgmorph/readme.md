# jeep-svgmorph

The JeepSvgmorph is Web Component allowing for the control of morphing process from SVG path to path through its properties.
The morphing process provides:
    - the conversion of any given svg paths in cubic bezier segments and align the number of segments of each path to either the number of segments of the path which got the maximum number of segments or on a number of segments given by a property.
    - a pathIndex property which control the alignment of the path starting points (circular permutation clockwise >0 anticlockwise <0)
    - the morphing animation which might be controlled by the use of several properties like the keyTimes, the calcMode ("linear, spline") and the keySplines.

## SVG Paths Restriction
this release includes for Path definition (M,m,L,l,H,h,V,v,Q,q,C,c) and excludes (A,a,S,s,T,t)

## Usage

  - without default properties and one color 

    ```html
    <jeep-svgmorph>
        <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287"></path>   
        <path d="M 250,100 L 270,230 400,250 270,270 250,400 230,270 100,250 230,230 250,100"></path>   
        <path d="M 171.29942,60 H 328.70057 L 440,171.29942 V 328.70057 L 328.70057,440 H 171.29942 L 60,328.70057 V 171.29942 L 171.29942,60"></path>   
        </svg>
    </jeep-svgmorph>
    ```
    it will run one time and all the paths will have the color #1eb287

  - with repeatCount property set to two

    ```html
    <jeep-svgmorph repeatCount="2">
        <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287"></path>   
        <path d="M 250,100 L 270,230 400,250 270,270 250,400 230,270 100,250 230,230 250,100"></path>   
        <path d="M 171.29942,60 H 328.70057 L 440,171.29942 V 328.70057 L 328.70057,440 H 171.29942 L 60,328.70057 V 171.29942 L 171.29942,60"></path>   
        </svg>
    </jeep-svgmorph>
    ```
    it will run twice and all the paths will have the color #1eb287

  - with duration property set to 4000ms,repeatCount property set to indefinite and color defined for each path

    ```html
    <jeep-svgmorph duration="4000ms" repeatcount="indefinite">
        <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287"></path>   
        <path d="M 250,100 L 270,230 400,250 270,270 250,400 230,270 100,250 230,230 250,100" fill="#f8ef07"></path>   
        <path d="M 171.29942,60 H 328.70057 L 440,171.29942 V 328.70057 L 328.70057,440 H 171.29942 L 60,328.70057 V 171.29942 L 171.29942,60" fill='#142de2'></path>   
        </svg>
    </jeep-svgmorph>
    ```
    it will run indefinitely morphing the paths and colors over a period of 4000ms

  - with pathIndex property set to "1;0;1"

    ```html
    <jeep-svgmorph duration="4000ms" repeatcount="2" pathindex="1;0;1">
        <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287"></path>   
        <path d="M 250,100 L 270,230 400,250 270,270 250,400 230,270 100,250 230,230 250,100" fill="#f8ef07"></path>   
        <path d="M 171.29942,60 H 328.70057 L 440,171.29942 V 328.70057 L 328.70057,440 H 171.29942 L 60,328.70057 V 171.29942 L 171.29942,60" fill='#142de2'></path>   
        </svg>
    </jeep-svgmorph>
    ```
    now the square and the star are aligned regarding starting points but not the star to the octogon

  - with pathIndex property set to "2;0;1" and the nSegment property set to 16

    ```html
    <jeep-svgmorph duration="4000ms" repeatcount="2" pathindex="2;0;1" nsegment="16">
        <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287"></path>   
        <path d="M 250,100 L 270,230 400,250 270,270 250,400 230,270 100,250 230,230 250,100" fill="#f8ef07"></path>   
        <path d="M 171.29942,60 H 328.70057 L 440,171.29942 V 328.70057 L 328.70057,440 H 171.29942 L 60,328.70057 V 171.29942 L 171.29942,60" fill='#142de2'></path>   
        </svg>
    </jeep-svgmorph>
    ```
    now the square and the star and the octogon paths are aligned regarding starting points

  - with keyTimes property set to "0;.30;1"

    ```html
    <jeep-svgmorph duration="4000ms" repeatcount="2" pathindex="2;0;1" nsegment="16"
        keytimes="0;.30;1" >
        <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287"></path>   
        <path d="M 250,100 L 270,230 400,250 270,270 250,400 230,270 100,250 230,230 250,100" fill="#f8ef07"></path>   
        <path d="M 171.29942,60 H 328.70057 L 440,171.29942 V 328.70057 L 328.70057,440 H 171.29942 L 60,328.70057 V 171.29942 L 171.29942,60" fill='#142de2'></path>   
        </svg>
    </jeep-svgmorph>
    ```
    now the square to star morphing takes 30% of the duration and the star to octogon morphing takes 70% of the duration

  - with calcMode property set to "spline" and keySplines set

    ```html
    <jeep-svgmorph duration="4000ms" repeatcount="2" pathindex="2;0;1;0;0;2" nsegment="16" 
        keytimes="0;.2;.4;.55;.85;1" calcmode="spline" 
        keysplines="0.645,0.045,0.355,1;0.645,0.045,0.355,1;0.645,0.045,0.355,1;
        0.645,0.045,0.355,1;0.645,0.045,0.355,1">
        <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287"></path>   
        <path d="M 250,100 L 270,230 400,250 270,270 250,400 230,270 100,250 230,230 250,100" fill="#f8ef07"></path>   
        <path d="M 171.29942,60 H 328.70057 L 440,171.29942 V 328.70057 L 328.70057,440 H 171.29942 L 60,328.70057 V 171.29942 L 171.29942,60" fill='#142de2'></path>   
        <path d="M 250,230 C 280,100 450,150 400,250 L 280,450 C 260,480 240,480 220,450 L100,250 C 50,150 220,100 250,230" fill="#ff0000"></path>
        <path d="M 250,50 C 270,50 370,250 270,150 V 230 H 350 C 370,230 450,230 450,250 
        C 450,270 370,270 350,270 H 270 V 350 C 270,370 270 450 250,450 C 230 450 230 370 230 350 
        V 270 H 150 C 130,270 50,270 50,250 C 50,230 130,230 150,230 H 230 V 150 
        C 130,250 230,50 250 50" fill="#e97f0d"></path>
        <path d="M100,100 H400 V400 H 100 V 100" fill="#1eb287"></path>   
        </svg>
    </jeep-svgmorph>
    ```
    you got a quite control morphing set


<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                        | Type     | Default     |
| ------------- | ------------- | ---------------------------------- | -------- | ----------- |
| `calcmode`    | `calcmode`    | The preselected calculation mode   | `string` | `"linear"`  |
| `duration`    | `duration`    | The preselected duration           | `string` | `"2000ms"`  |
| `fill`        | `fill`        | The preselected fill color         | `string` | `undefined` |
| `keysplines`  | `keysplines`  | The preselected key splines        | `string` | `undefined` |
| `keytimes`    | `keytimes`    | The preselected key times          | `string` | `undefined` |
| `nsegment`    | `nsegment`    | The preselected number of segments | `string` | `undefined` |
| `pathindex`   | `pathindex`   | The preselected path index         | `string` | `undefined` |
| `repeatcount` | `repeatcount` | The preselected repeat count       | `string` | `undefined` |


## Methods

### `getAlignedPaths(calc: boolean) => Promise<CubicBezier[]>`



#### Returns

Type: `Promise<CubicBezier[]>`



### `getFillColor() => Promise<string[]>`



#### Returns

Type: `Promise<string[]>`



### `getPath() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getPathList() => Promise<string[]>`



#### Returns

Type: `Promise<string[]>`



### `getStateProperties() => Promise<StateProperties>`



#### Returns

Type: `Promise<StateProperties>`



### `init() => Promise<void>`

Method initialize

#### Returns

Type: `Promise<void>`



### `renderSVGFirstPath() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
