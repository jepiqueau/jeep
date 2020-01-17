# jeep-carousel

Stencil Web Component using Swiper API driven by CSS custom variables. 

The following Swiper API components have been implemented :
  
  - Navigation
  - Pagination
  - Scrollbar
  - Autoplay
  - Parallax
  - Lazy Loading
  - Thumbs
  - Zoom
  - Fade Effect
  - Coverflow effect
  - Flip Effect
  - Cube Effect

Autoplay component has been enhanced by the addition of "PlayControls" buttons.

Navigation, Pagination, Scrollbar, Thumbs, PlayControls components are automatically hidden after 2500ms. Click on the "Swiper Container" to toggle visibility.

Demonstrations are available at the **tests/carousel** project folder

## CSS Custom Variables

### Container custom variables
    --container-background-color:#888888;

### Swiper-container custom variables
    --swiper-container-position: relative;
    --swiper-container-top: auto;
    --swiper-container-left: auto;
    --swiper-container-width: 100%;
    --swiper-container-height: 100%;

### Swiper-slide custom variables
    --swiper-slide-color: #000;
    --swiper-slide-width: 100%;
    --swiper-slide-height: 100%;
    --swiper-slide-top: auto;
    --swiper-slide-align-items: center;
    --swiper-slide-justify-content: center;
    --swiper-slide-display: flex;
    --swiper-slide-flex-direction: column;
    --swiper-slide-padding: 0;

### Pagination bullet custom variables
    --bullet-diameter: 20px;
    --bullet-background: #000000;
    --bullet-opacity: 0.5;
    --bullet-active-background: #007aff;
    --bullet-active-opacity: 1;

### Pagination bullet custom variables
    --progress-bar-height: 6px;
    --progress-bar-width: 100%;
    --progress-bar-top: 0;
    --progress-bar-left: 0;
    --progress-bar-color: #007aff;
    --progress-bar-background-color: rgba(255,255,255,0.5);

### Pagination fraction custom variables
    --fraction-font-family: Arial, Helvetica, sans-serif;
    --fraction-font-size: 4vmax;
    --fraction-font-weight: bold;
    --fraction-font-style: normal;
    --fraction-text-color: #ffffff;

### Navigation custom variables
    --navigation-next-background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E");
    --navigation-prev-background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E");
    --navigation-height: 50px;
    --navigation-width: 50px;
    --navigation-position: 10px;

### Scrollbar custom variables
    --scrollbar-height: 6px;
    --scrollbar-width: 100%;
    --scrollbar-bottom: 0;
    --scrollbar-left: 0;
    --scrollbar-color: #007aff;
    --scrollbar-background-color: rgba(255,255,255,0.5);

### Playcontrols custom variables
    --playcontrols-height: 30px;
    --playcontrols-width: 30px;

### Parallax custom variables
    --parallax-position: absolute;
    --parallax-top: 0;
    --parallax-left: 0;
    --parallax-width: 130%;
    --parallax-height: 100%;
    --parallax-background-size: cover;
    --parallax-background-position: center;

###Thumbs custom variables
    --gallery-thumbs-height: 20%;
    --gallery-thumbs-width: 25%;
    --gallery-thumbs-opacity: 0.4;
    --gallery-thumbs-padding: 10px 0;
    --gallery-thumbs-top: 80%;
    --gallery-thumbs-background-color: #000;

## Usage
  - AUTOPLAY With PLAYCONTROLS

    ```html
    <jeep-carousel playcontrols  
      data = '{"slides":[
      {"slide":["<img class=\"image\" src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/deerl.jpg\" alt=\"deer\"></img>"]},
      {"slide":["<img class=\"image\" src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/assets/images/elephantl.jpg\" alt=\"elephant\"></img>"]},
      {"slide":["<img class=\"image\" src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/tigerl.jpg\" alt=\"tiger\"></img>"]},
      {"slide":["<img class=\"image\" src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/lionl.jpg\" alt=\"lion\"></img>"]},
      {"slide":["<img class=\"image\" src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/eaglel.jpg\" alt=\"eagle\"></img>"]},
      {"slide":["<img class=\"image\" src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/eagleheadl.jpg\" alt=\"eagle head\"></img>"]}
      ]}'
      cstyle = ".image {width: auto;max-width: 100%;height: auto;max-height: 100%;}"
      options = '{"direction":"horizontal",
      "autoplay":{"delay":5000,"disableOnInteraction":false,"stopOnLastSlide":true}}'
      >
    </jeep-carousel>
    ```

  - AUTOPLAY Without PLAYCONTROLS

    ```html
    <jeep-carousel  
      data = '{"slides":[
      {"slide":["<img src=\"../../../../assets/images/deerl.jpg\"></img>"]},
      {"slide":["<img class=\"image\" src=\"../../../../assets/images/elephantl.jpg\"></img>"]},
      {"slide":["<img class=\"image\" src=\"../../../../assets/images/tigerl.jpg\"></img>"]},
      {"slide":["<img class=\"image\" src=\"../../../../assets/images/lionl.jpg\"></img>"]},
      {"slide":["<img class=\"image\" src=\"../../../../assets/images/eaglel.jpg\"></img>"]},
      {"slide":["<img class=\"image\" src=\"../../../../assets/images/eagleheadl.jpg\"></img>"]}
      ]}'
      cstyle = ".image {  width: auto;max-width: 100%;height: auto;max-height: 100%;}"
      options = '{"direction":"horizontal",
      "autoplay":{"delay":5000,"disableOnInteraction":false,"stopOnLastSlide":true},
      "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true},
      "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
      >
    </jeep-carousel>
    ```

  - PAGINATION && NAVIGATION

    ```html
    <jeep-carousel 
      data = '{"slides":[
      {"slide":["<img src=\"../../../../assets/images/deerl.jpg\"></img>"]},
      {"slide":["<img class=\"image\" src=\"../../../../assets/images/elephantl.jpg\"></img>"]},
      {"slide":["<img class=\"image\" src=\"../../../../assets/images/tigerl.jpg\"></img>"]},
      {"slide":["<img class=\"image\" src=\"../../../../assets/images/lionl.jpg\"></img>"]},
      {"slide":["<img class=\"image\" src=\"../../../../assets/images/eaglel.jpg\"></img>"]},
      {"slide":["<img class=\"image\" src=\"../../../../assets/images/eagleheadl.jpg\"></img>"]}
      ]}'
      cstyle = ".image {  width: auto;max-width: 100%;height: auto;max-height: 100%;}"
      options = '{"direction":"horizontal",
      "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true},
      "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
      >
    </jeep-carousel>
    ```

  - LAZY LOADING IMAGES With PAGINATION & NAVIGATION

    ```html
    <jeep-carousel  
      data = '{"slides":[
      {"slide":["<img class=\"swiper-lazy image\" data-src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/deerl.jpg\" alt=\"deer\"></img>"]},
      {"slide":["<img class=\"swiper-lazy image\" data-src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/assets/images/elephantl.jpg\" alt=\"elephant\"></img>"]},
      {"slide":["<img class=\"swiper-lazy image\" data-src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/tigerl.jpg\" alt=\"tiger\"></img>"]},
      {"slide":["<img class=\"swiper-lazy image\" data-src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/lionl.jpg\" alt=\"lion\"></img>"]},
      {"slide":["<img class=\"swiper-lazy image\" data-src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/eaglel.jpg\" alt=\"eagle\"></img>"]},
      {"slide":["<img class=\"swiper-lazy image\" data-src=\"https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/eagleheadl.jpg\" alt=\"eagle head\"></img>"]} 
      ]}'
      cstyle = ".image {width: auto;max-width: 100%;height: auto;max-height: 100%;}"
      options = '{"direction":"horizontal",
      "lazy":{"loadPrevNext": true},
      "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true},
      "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
      >
    </jeep-carousel>
    ```

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute         | Description                       | Type      | Default     |
| ----------------- | ----------------- | --------------------------------- | --------- | ----------- |
| `cstyle`          | `cstyle`          | Slide data style                  | `string`  | `undefined` |
| `data`            | `data`            | Slide data                        | `string`  | `undefined` |
| `notcleanstyles`  | `notcleanstyles`  | Clean styles when swiper destroys | `boolean` | `undefined` |
| `options`         | `options`         | Swiper options                    | `string`  | `undefined` |
| `parallaxoptions` | `parallaxoptions` | Swiper data-swiper-parallax       | `string`  | `undefined` |
| `playcontrols`    | `playcontrols`    | PlayControls when autoplay        | `boolean` | `undefined` |
| `rtl`             | `rtl`             | Swiper RTL Layout                 | `boolean` | `undefined` |


## Events

| Event                         | Description                                                 | Type                |
| ----------------------------- | ----------------------------------------------------------- | ------------------- |
| `jeepCarouselAfterDestroy`    | Emitted after Swiper destroy                                | `CustomEvent<void>` |
| `jeepCarouselBeforeDestroy`   | Emitted before Swiper destroy                               | `CustomEvent<void>` |
| `jeepCarouselDidChange`       | Emitted after the active slide has changed.                 | `CustomEvent<void>` |
| `jeepCarouselDidLoad`         | Emitted after Swiper initialization                         | `CustomEvent<void>` |
| `jeepCarouselDoubleTap`       | Emitted when the user double taps on the slide's container. | `CustomEvent<void>` |
| `jeepCarouselDrag`            | Emitted when the slider is actively being moved.            | `CustomEvent<void>` |
| `jeepCarouselNextEnd`         | Emitted when the next slide has ended.                      | `CustomEvent<void>` |
| `jeepCarouselNextStart`       | Emitted when the next slide has started.                    | `CustomEvent<void>` |
| `jeepCarouselPrevEnd`         | Emitted when the previous slide has ended.                  | `CustomEvent<void>` |
| `jeepCarouselPrevStart`       | Emitted when the previous slide has started.                | `CustomEvent<void>` |
| `jeepCarouselReachEnd`        | Emitted when the slider is at the last slide.               | `CustomEvent<void>` |
| `jeepCarouselReachStart`      | Emitted when the slider is at its initial position.         | `CustomEvent<void>` |
| `jeepCarouselSlideChange`     | Emitted when the active slide has changed.                  | `CustomEvent<void>` |
| `jeepCarouselTap`             | Emitted when the user taps/clicks on the slide's container. | `CustomEvent<void>` |
| `jeepCarouselTouchEnd`        | Emitted when the user releases the touch.                   | `CustomEvent<void>` |
| `jeepCarouselTouchStart`      | Emitted when the user first touches the slider.             | `CustomEvent<void>` |
| `jeepCarouselTransitionEnd`   | Emitted when the slide transition has ended.                | `CustomEvent<void>` |
| `jeepCarouselTransitionStart` | Emitted when the slide transition has started.              | `CustomEvent<void>` |
| `jeepCarouselWillChange`      | Emitted before the active slide has changed.                | `CustomEvent<void>` |


## Methods

### `addSlide(index: number, slides: any) => Promise<void>`

Add new slides to required index
slides could be HTMLElement or HTML string with new slide
or array with such slides

#### Returns

Type: `Promise<void>`



### `appendSlide(slides: any) => Promise<void>`

Append new slides 
slides could be HTMLElement or HTML string with new slide
or array with such slides

#### Returns

Type: `Promise<void>`



### `getActiveIndex() => Promise<number>`

Get the index of the active slide.

#### Returns

Type: `Promise<number>`



### `getPreviousIndex() => Promise<number>`

Get the index of the previous slide.

#### Returns

Type: `Promise<number>`



### `init() => Promise<void>`

Init data from properties.

#### Returns

Type: `Promise<void>`



### `isBeginning() => Promise<boolean>`

Get whether or not the current slide is the first slide.

#### Returns

Type: `Promise<boolean>`



### `isEnd() => Promise<boolean>`

Get whether or not the current slide is the last slide.

#### Returns

Type: `Promise<boolean>`



### `length() => Promise<number>`

Get the total number of slides.

#### Returns

Type: `Promise<number>`



### `setSwiper() => Promise<void>`

Set the swiper.

#### Returns

Type: `Promise<void>`



### `slideNext(speed?: number, runCallbacks?: boolean) => Promise<void>`

Transition to the next slide.

#### Returns

Type: `Promise<void>`



### `slidePrev(speed?: number, runCallbacks?: boolean) => Promise<void>`

Transition to the previous slide.

#### Returns

Type: `Promise<void>`



### `slideTo(index: number, speed?: number, runCallbacks?: boolean) => Promise<void>`

Transition to the specified slide.

#### Returns

Type: `Promise<void>`



### `startAutoplay() => Promise<void>`

Start auto play.

#### Returns

Type: `Promise<void>`



### `stopAutoplay() => Promise<void>`

Stop auto play.

#### Returns

Type: `Promise<void>`



### `swiperDestroy(cleanstyles: boolean) => Promise<void>`

Swiper destroy.

#### Returns

Type: `Promise<void>`



### `update() => Promise<void>`

Update the underlying slider implementation. Call this if you've added or removed
child slides.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
