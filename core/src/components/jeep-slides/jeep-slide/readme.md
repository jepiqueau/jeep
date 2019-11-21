# jeep-navigation

## Local custom CSS variables

| Variable                                          | Default                                 |
| ------------------------------------------------- | --------------------------------------- | 
|  --slide-scroll-snap-align                        | start                                   |
|  --slide-min-width                                | 100vw                                   |
|  --slide-height                                   | 100vh                                   |
|  --slide-background                               | var(--slides-slide-background, #ffffff) |
|  --slide-color                                    | var(--slides-slide-color,#000)          |
|  --slide-font-size                                | calc(1rem + 3vmin)                      |
|  --slide-display                                  | flex                                    |
|  --slide-align-items                              | center                                  |
|  --slide-justify-content                          | center                                  |
|  --slide-text-align                               | center                                  |
|  --slide-flex-direction                           | column                                  |
|  --slide-title-font-size                          | calc(1rem + 3vmin)                      |
|  --slide-subtitle-font-size                       | calc(1rem + 1.5vmin)                    |
|  --slide-content-top                              | 0px                                     |
|  --slide-content-padding                          | 0                                       |
|  --slide-content-font-size                        | calc(1rem + 0.5vmin)                    |
|  --slide-content-text-align                       | center                                  |
|  --slide-header-top                               | 0px                                     |
| ------------------------------------------------- | --------------------------------------- | 


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description        | Type     | Default     |
| ---------- | ---------- | ------------------ | -------- | ----------- |
| `cstyle`   | `cstyle`   | The slide subtitle | `string` | `undefined` |
| `stitle`   | `stitle`   | The slide title    | `string` | `undefined` |
| `subtitle` | `subtitle` | The slide subtitle | `string` | `undefined` |


## Events

| Event              | Description                                  | Type               |
| ------------------ | -------------------------------------------- | ------------------ |
| `jeepSlideDidLoad` | Emitted when a pagination bullet was clicked | `CustomEvent<any>` |


## Methods

### `init() => Promise<void>`

Init data from properties.

#### Returns

Type: `Promise<void>`



### `setSlide() => Promise<void>`

Set the slide component.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
