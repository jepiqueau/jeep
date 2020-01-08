export const sliderPresentation:string = [
  '<div slot="slides">',
    '<jeep-slide stitle="Section One" cstyle=":host{--slide-background: #49b293;\
    --slide-display:block;--slide-header-top:10vmin;--slide-content-top:8vmin;--slide-content-padding: 0 2vmin;\
    --slide-content-text-align:left;--slide-content-font-size:4.5vmin;}">',
      '<h4 style="margin-top:2vmin;margin-bottom:2vmin;font-size:5vmin;font-weight:bold;">Below a list of items :</h4>',
      '<ul style="margin-top:0.5vmin;">',
        '<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec.</li>',
        '<li>Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.</li>',
      '</ul>',
    '</jeep-slide>', 
    '<jeep-slide cstyle=":host{--slide-background: #c94e4b;}">Section Two</jeep-slide>',
    '<jeep-slide cstyle=":host{--slide-background: #4cc1be;}">Section Three</jeep-slide>',
    '<jeep-slide cstyle=":host{--slide-background: #8360a6;}">Section Four</jeep-slide>',
    '<jeep-slide cstyle=":host{--slide-background: #4c67c1;}">Section Five</jeep-slide>',
    '<jeep-slide cstyle=":host{--slide-background: rgb(178, 180, 72);}">Section Six</jeep-slide>',
    '<jeep-slide>',
      '<img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/italy-mountains.jpeg"\
        style="width:100%;max-width:var(--slide-min-width);height:auto;max-height:var(--slide-height);\
        box-sizing:border-box;border:1vmin solid var(--gslider-slide-background)"></img>',
    '</jeep-slide>',
    '<jeep-slide>',
      '<img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/lake-sunset-twilight.jpeg"\
      style="width:100%;max-width:var(--slide-min-width);height:auto;max-height:var(--slide-height);\
      box-sizing:border-box;border:1vmin solid var(--gslider-slide-background)"></img>',
    '</jeep-slide>',
    '<jeep-slide>',
      '<img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/deerl.jpg" alt="deer"\
      style="width:75%;max-width:var(--slide-min-width);height:auto;max-height:var(--slide-height);\
      box-sizing:border-box;border:1vmin solid var(--gslider-slide-background)"></img>',
    '</jeep-slide>',
    '<jeep-slide cstyle=":host{--slide-background: #eeeeee;--slide-color:#000;}">Section Ten</jeep-slide>',        
    '<jeep-slide cstyle=":host{--slide-background: rgb(184, 71, 184);}">Section Eleven</jeep-slide>',
    '<jeep-slide cstyle=":host{--slide-background: rgb(57, 153, 148);}">Section Twelve</jeep-slide>',        
  '</div>',
].join('');
