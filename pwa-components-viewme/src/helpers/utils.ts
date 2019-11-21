export const slidesPresentation1: string =   '<div slot="slides">\
<jeep-slide stitle="Section One" cstyle=":host{--slide-background: #49b293;--slide-display:block;--slide-header-top:2vmin;--slide-content-top:4vmin;--slide-content-padding: 0 2vmin;--slide-content-text-align:left;--slide-content-font-size:4.5vmin;}">\
<h4 style="margin-top:2vmin;margin-bottom:2vmin;font-size:5vmin;font-weight:bold;">Below a list of items :</h4>\
<ul style="margin-top:0.5vmin;">\
<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec.</li>\
<li>Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.</li>\
</ul>\
</jeep-slide>\
<jeep-slide cstyle=":host{--slide-background: #c94e4b;}">Section Two</jeep-slide>\
<jeep-slide cstyle=":host{--slide-background: #4cc1be;}">Section Three</jeep-slide>\
<jeep-slide cstyle=":host{--slide-background: #8360a6;}">Section Four</jeep-slide>\
<jeep-slide cstyle=":host{--slide-background: #4c67c1;}">Section Five</jeep-slide>\
<jeep-slide cstyle=":host{--slide-background: rgb(178, 180, 72);}">Section Six</jeep-slide>\
<jeep-slide>\
<img src="../../assets/images/italy-mountains.jpeg"\
  style="width:100%;max-width:var(--slide-min-width);height:auto;max-height:var(--slide-height);\
  box-sizing:border-box;border:1vmin solid var(--gslider-slide-background)"></img>\
</jeep-slide>\
<jeep-slide>\
<img src="../../assets/images/lake-sunset-twilight.jpeg"\
style="width:100%;max-width:var(--slide-min-width);height:auto;max-height:var(--slide-height);\
box-sizing:border-box;border:1vmin solid var(--gslider-slide-background)"></img>\
</jeep-slide>\
<jeep-slide>\
<img src="../../assets/images/deerl.jpg" alt="deer"\
style="width:75%;max-width:var(--slide-min-width);height:auto;max-height:var(--slide-height);\
box-sizing:border-box;border:1vmin solid var(--gslider-slide-background)"></img>\
</jeep-slide>\
<jeep-slide cstyle=":host{--slide-background: #eeeeee;--slide-color:#000;}">Section Ten</jeep-slide>\
<jeep-slide cstyle=":host{--slide-background: rgb(184, 71, 184);}">Section Eleven</jeep-slide>\
<jeep-slide cstyle=":host{--slide-background: rgb(57, 153, 148);}">Section Twelve</jeep-slide>\
</div>' 

export const slidesPresentation:string = [
  '<div slot="slides">',
    '<jeep-slide stitle="Section One" cstyle=":host{--slide-background: #49b293;\
    --slide-display:block;--slide-header-top:2vmin;--slide-content-top:4vmin;--slide-content-padding: 0 2vmin;\
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
      '<img src="../../assets/images/italy-mountains.jpeg"\
        style="width:100%;max-width:var(--slide-min-width);height:auto;max-height:var(--slide-height);\
        box-sizing:border-box;border:1vmin solid var(--gslider-slide-background)"></img>',
    '</jeep-slide>',
    '<jeep-slide>',
      '<img src="../../assets/images/lake-sunset-twilight.jpeg"\
      style="width:100%;max-width:var(--slide-min-width);height:auto;max-height:var(--slide-height);\
      box-sizing:border-box;border:1vmin solid var(--gslider-slide-background)"></img>',
    '</jeep-slide>',
    '<jeep-slide>',
      '<img src="../../assets/images/deerl.jpg" alt="deer"\
      style="width:75%;max-width:var(--slide-min-width);height:auto;max-height:var(--slide-height);\
      box-sizing:border-box;border:1vmin solid var(--gslider-slide-background)"></img>',
    '</jeep-slide>',
    '<jeep-slide cstyle=":host{--slide-background: #eeeeee;--slide-color:#000;}">Section Ten</jeep-slide>',        
    '<jeep-slide cstyle=":host{--slide-background: rgb(184, 71, 184);}">Section Eleven</jeep-slide>',
    '<jeep-slide cstyle=":host{--slide-background: rgb(57, 153, 148);}">Section Twelve</jeep-slide>',        
  '</div>',
].join('');

export const carouselImages:string = JSON.stringify({slides:[
  {slide:['<img class="image" src="../../assets/images/deerl.jpg" alt="deer"></img>']},
  {slide:['<img class="image" src="../../assets/images/elephantl.jpg" alt="elephant"></img>']},
  {slide:['<img class="image" src="../../assets/images/tigerl.jpg" alt="tiger"></img>']},
  {slide:['<img class="image" src="../../assets/images/lionl.jpg" alt="lion"></img>']},
  {slide:['<img class="image" src="../../assets/images/eaglel.jpg" alt="eagle"></img>']},
  {slide:['<img class="image" src="../../assets/images/eagleheadl.jpg" alt="eagle head"></img>']}
]});

export const carouselLazyImages:string = JSON.stringify({slides:[
  {slide:['<img class="swiper-lazy image" data-src="../../assets/images/deerl.jpg" alt="deer"></img>']},
  {slide:['<img class="swiper-lazy image" data-src="../../assets/images/elephantl.jpg" alt="elephant"></img>']},
  {slide:['<img class="swiper-lazy image" data-src="../../assets/images/tigerl.jpg" alt="tiger"></img>']},
  {slide:['<img class="swiper-lazy image" data-src="../../assets/images/lionl.jpg" alt="lion"></img>']},
  {slide:['<img class="swiper-lazy image" data-src="../../assets/images/eaglel.jpg" alt="eagle"></img>']},
  {slide:['<img class="swiper-lazy image" data-src="../../assets/images/eagleheadl.jpg" alt="eagle head"></img>']} 
]});

export const carouselCoverImages:string = JSON.stringify({slides:[
  {slide:['<div class="swiper-slide cover-image" style="background-image:url(../../assets/images/italy-mountains.jpeg)"></div>']},
  {slide:['<div class="swiper-slide cover-image" style="background-image:url(../../assets/images/lake-sunset-twilight.jpeg)"></div>']},
  {slide:['<div class="swiper-slide cover-image" style="background-image:url(../../assets/images/pexels-photo-67517s.jpeg)"></div>']},
  {slide:['<div class="swiper-slide cover-image" style="background-image:url(../../assets/images/pexels-photo-247474s.jpeg)"></div>']},
  {slide:['<div class="swiper-slide cover-image" style="background-image:url(../../assets/images/pexels-photo-268633s.jpeg)"></div>']},
  {slide:['<div class="swiper-slide cover-image" style="background-image:url(../../assets/images/pexels-photo-371589s.jpeg)"></div>']},
  {slide:['<div class="swiper-slide cover-image" style="background-image:url(../../assets/images/pexels-photo-414171s.jpeg)"></div>']},
  {slide:['<div class="swiper-slide cover-image" style="background-image:url(../../assets/images/pexels-photo-414513s.jpeg)"></div>']},
  {slide:['<div class="swiper-slide cover-image" style="background-image:url(../../assets/images/pexels-photo-814499s.jpeg)"></div>']},
  {slide:['<div class="swiper-slide cover-image" style="background-image:url(../../assets/images/pexels-photo-910368s.jpeg)"></div>']}
]});

export const carouselParallaxSlides:string = JSON.stringify({slides:[
  {slide:['<div class="title" data-swiper-parallax="-100">Slide 1</div>',
    '<div class="subtitle" data-swiper-parallax="-200">Subtitle 1</div>',
    '<div class="text" data-swiper-parallax="-300" data-swiper-parallax-duration="600">',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>',
    '</div>'
  ]},
  {slide:['<div class="title" data-swiper-parallax="-100">Slide 2</div>',
    '<div class="subtitle" data-swiper-parallax="-200">Subtitle 2</div>',
    '<div class="text" data-swiper-parallax="-300" data-swiper-parallax-duration="600">',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>',
    '</div>'
  ]},
  {slide:['<div class="title" data-swiper-parallax="-100">Slide 3</div>',
    '<div class="subtitle" data-swiper-parallax="-200">Subtitle 3</div>',
    '<div class="text" data-swiper-parallax="-300" data-swiper-parallax-duration="600">',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>',
    '</div>'
  ]},
  {slide:['<div class="title" data-swiper-parallax="-100">Slide 4</div>',
    '<div class="subtitle" data-swiper-parallax="-200">Subtitle 4</div>',
    '<div class="text" data-swiper-parallax="-300" data-swiper-parallax-duration="600">',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>',
    '</div>'
  ]}      
]});
export const carouselParallaxXSlides:string = JSON.stringify({slides:[
  {slide:['<div class="title" data-swiper-parallax-x="-100">Slide 1</div>',
    '<div class="subtitle" data-swiper-parallax-x="-200">Subtitle 1</div>',
    '<div class="text" data-swiper-parallax-x="-300" data-swiper-parallax-duration="600">',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>',
    '</div>'
  ]},
  {slide:['<div class="title" data-swiper-parallax-x="-100">Slide 2</div>',
    '<div class="subtitle" data-swiper-parallax-x="-200">Subtitle 2</div>',
    '<div class="text" data-swiper-parallax-x="-300" data-swiper-parallax-duration="600">',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>',
    '</div>'
  ]},
  {slide:['<div class="title" data-swiper-parallax-x="-100">Slide 3</div>',
    '<div class="subtitle" data-swiper-parallax-x="-200">Subtitle 3</div>',
    '<div class="text" data-swiper-parallax-x="-300" data-swiper-parallax-duration="600">',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>',
    '</div>'
  ]},
  {slide:['<div class="title" data-swiper-parallax-x="-100">Slide 4</div>',
    '<div class="subtitle" data-swiper-parallax-x="-200">Subtitle 4</div>',
    '<div class="text" data-swiper-parallax-x="-300" data-swiper-parallax-duration="600">',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>',
    '</div>'
  ]}      
]});
export const carouselParallaxYSlides:string = JSON.stringify({slides:[
  {slide:['<div class="title" data-swiper-parallax-y="700">Slide 1</div>',
    '<div class="subtitle" data-swiper-parallax-y="800">Subtitle 1</div>',
    '<div class="text" data-swiper-parallax-y="900" data-swiper-parallax-duration="600">',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>',
    '</div>'
  ]},
  {slide:['<div class="title" data-swiper-parallax-y="700">Slide 2</div>',
    '<div class="subtitle" data-swiper-parallax-y="800">Subtitle 2</div>',
    '<div class="text" data-swiper-parallax-y="900" data-swiper-parallax-duration="600">',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>',
    '</div>'
  ]},
  {slide:['<div class="title" data-swiper-parallax-y="700">Slide 3</div>',
    '<div class="subtitle" data-swiper-parallax-y="800">Subtitle 3</div>',
    '<div class="text" data-swiper-parallax-y="900" data-swiper-parallax-duration="600">',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>',
    '</div>'
  ]},
  {slide:['<div class="title" data-swiper-parallax-y="700">Slide 4</div>',
    '<div class="subtitle" data-swiper-parallax-y="800">Subtitle 4</div>',
    '<div class="text" data-swiper-parallax-y="900" data-swiper-parallax-duration="600">',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>',
    '</div>'
  ]}      
]});
export const carouselParallaxXYSlides:string = JSON.stringify({slides:[
  {slide:['<div class="title" data-swiper-parallax-x="-100" data-swiper-parallax-y="-700">Slide 1</div>',
    '<div class="subtitle" data-swiper-parallax-x="-200" data-swiper-parallax-y="-800">Subtitle 1</div>',
    '<div class="text" data-swiper-parallax-x="-300" data-swiper-parallax-y="-900" data-swiper-parallax-duration="600">',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>',
    '</div>'
  ]},
  {slide:['<div class="title" data-swiper-parallax-x="-100" data-swiper-parallax-y="-700">Slide 2</div>',
    '<div class="subtitle" data-swiper-parallax-x="-200" data-swiper-parallax-y="-800">Subtitle 2</div>',
    '<div class="text" data-swiper-parallax-x="-300" data-swiper-parallax-y="-900" data-swiper-parallax-duration="600">',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>',
    '</div>'
  ]},
  {slide:['<div class="title" data-swiper-parallax-x="-100" data-swiper-parallax-y="-700">Slide 3</div>',
    '<div class="subtitle" data-swiper-parallax-x="-200" data-swiper-parallax-y="-800">Subtitle 3</div>',
    '<div class="text" data-swiper-parallax-x="-300" data-swiper-parallax-y="-900" data-swiper-parallax-duration="600">',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>',
    '</div>'
  ]},
  {slide:['<div class="title" data-swiper-parallax-x="-100" data-swiper-parallax-y="-700">Slide 4</div>',
    '<div class="subtitle" data-swiper-parallax-x="-200" data-swiper-parallax-y="-800">Subtitle 4</div>',
    '<div class="text" data-swiper-parallax-x="-300" data-swiper-parallax-y="-900" data-swiper-parallax-duration="600">',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>',
    '</div>'
  ]}      
]});

