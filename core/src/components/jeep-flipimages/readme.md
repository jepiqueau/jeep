# jeep-flipimages
   FlipImages is a Web Component to flip a set of images of same size.
 
   FlipImages may flip a series of images 
       either horizontally (mid y view axis) 
       or vertically (mid x view axis)
 
   The flip is controlled by mouse or finger movements on the last flip block moved starting with upper / left block for horizontal / vertical flip:

       for horizontal flip
           flip block upper position
               move down : incremental direction
               move up   : decremental direction
           flip block lower position
               move up   : incremental direction
               move down : decremental direction

       for vertical flip
           flip block left position
               move right : incremental direction
               move left  : decremental direction
           flip block right position
               move left  : incremental direction
               move right : decremental direction

   Any mouse or finger motion outside the flip block will keep the current image in position

## Local custom CSS variables

| Variable                               | Default   |
| -------------------------------------- | --------- | 
|  --flipimages-border-width             | 10px      |
|  --flipimages-border-color             | #ffffff   |
|  --flipimages-shadow-width             | 20px      |
|  --flipimages-shadow-color             | #808080   |


## Usage

  - without type property defined (flip horizontally by default) 

   ```html
   <jeep-flipimages>
        <img src="../../../assets/images/deerl.jpg" alt="deer">
        <img src="../../../assets/images/elephantl.jpg" alt="elephant">
   </jeep-flipimages>
   ```
  - with type property = "horizontal" and padding property = "5"

   ```html
   <jeep-flipimages type='horizontal' padding="5">
        <img src="../../../assets/images/deerl.jpg" alt="deer">
        <img src="../../../assets/images/elephantl.jpg" alt="elephant">
        <img src="../../../assets/images/tigerl.jpg" alt="tiger">
   </jeep-flipimages>
   ```
  - with type property = "vertical" and odd number of images

   ```html
   <jeep-flipimages type='vertical'>
        <img src="../../../assets/images/deerl.jpg" alt="deer">
        <img src="../../../assets/images/elephantl.jpg" alt="elephant">
        <img src="../../../assets/images/tigerl.jpg" alt="tiger">
        <img src="../../../assets/images/lionl.jpg" alt="lion">
        <img src="../../../assets/images/eaglel.jpg" alt="eagle">
        <img src="../../../assets/images/eagleheadl.jpg" alt="eagle head"> 
   </jeep-flipimages>
   ```
  - with type property = "vertical" and even number of images

   ```html
   <jeep-flipimages type='vertical'>
        <img src="../../../assets/images/deerl.jpg" alt="deer">
        <img src="../../../assets/images/elephantl.jpg" alt="elephant">
        <img src="../../../assets/images/tigerl.jpg" alt="tiger">
        <img src="../../../assets/images/lionl.jpg" alt="lion">
        <img src="../../../assets/images/eaglel.jpg" alt="eagle">
        <img src="../../../assets/images/eagleheadl.jpg" alt="eagle head"> 
   </jeep-flipimages>
   ```   


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                              | Type     | Default        |
| ---------- | ---------- | ---------------------------------------- | -------- | -------------- |
| `fpadding` | `fpadding` | The container padding                    | `string` | `"0"`          |
| `type`     | `type`     | The type of image horizontal or vertical | `string` | `"horizontal"` |


## Events

| Event                     | Description                            | Type                            |
| ------------------------- | -------------------------------------- | ------------------------------- |
| `jeepFlipImagesImgLoaded` | Emitted when the first image is loaded | `CustomEvent<HTMLImageElement>` |


## Methods

### `init() => Promise<void>`

Method initialize

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
