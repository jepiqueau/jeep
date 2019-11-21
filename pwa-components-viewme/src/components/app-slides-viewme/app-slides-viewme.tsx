import { h, Component, Prop, Element, Listen } from '@stencil/core';
import { slidesPresentation1 } from '../../helpers/utils';

@Component({
  tag: 'app-slides-viewme',
  styleUrl: 'app-slides-viewme.css',
  shadow: true
})
export class AppSlidesViewme {
  @Element() el!: HTMLAppSlidesViewmeElement;

  @Prop() type: string;

  @Listen('jeepSlidesHeaderVisibility')
  jeepHeaderVisibilityHandler(event: CustomEvent) {
    if(event.detail && event.detail.visibility) {
      console.log('event.detail.visibility ',event.detail.visibility)
      if(event.detail.visibility === 'visible') {
        if(this._header.classList.contains('hidden')) this._header.classList.remove('hidden');
      } else {
        this._header.classList.add('hidden');
      }
    }
  }

  _header: any;

  componentDidLoad() {
    this._header = this.el.shadowRoot.querySelector('ion-header');
    const slides = this.el.shadowRoot.querySelector("jeep-slides");
    slides.innerHTML = slidesPresentation1;
    slides.setSlides();
  }

  render() {
    if (this.type) {
      let slides: Array<any> = [];
      let root: HTMLElement = document.documentElement;
      root.style.setProperty('--gslides-background-color','#eeeeee');
      root.style.setProperty('--gslides-slide-color','#ffffff');
      root.style.setProperty('--gslides-slide-background','#6d6c6c');
      root.style.setProperty('--gslides-slide-content-font-size','7vmin');
      root.style.setProperty('--gslides-margin-top','0px');
      root.style.setProperty('--gslides-margin-left','5vmin');
      root.style.setProperty('--gslides-margin-right','5vmin');
      root.style.setProperty('--gslides-margin-bottom','10vmin');
      switch(this.type) { 
        case "basichorizontal": {           
          slides = [
            <jeep-slides options = '{"direction":"horizontal"}'>
            </jeep-slides>
          ];   
          break; 
        } 
        case "basicvertical": { 
            slides = [
              <jeep-slides options = '{"direction":"vertical"}'>
              </jeep-slides>
            ];
            break;   
        }
        case "navigationhorizontal": { 
            slides = [
              <jeep-slides options = '{"direction":"horizontal","duration":3000,\
              "navigation":{"hidden":true}}'>
              </jeep-slides>
            ];
            break;   
        }
        case "navigationvertical": { 
          slides = [
            <jeep-slides id="navigationvertical" options = '{"direction":"vertical","duration":3000,\
            "navigation":{"hidden":true,"icon":"arrow-round"}}'>
            </jeep-slides>
          ];
          break;   
        }
        case "paginationhorizontal": { 
          slides = [
            <jeep-slides id="paginationhorizontal" options = '{"direction":"horizontal","duration":3000,\
            "pagination":{"bulletsDisplay":7,"clickable":true,"hidden":true}}'>
            </jeep-slides>
          ];
          break;   
        }
        case "paginationvertical": { 
          slides = [
            <jeep-slides id="paginationvertical" options = '{"direction":"vertical","duration":3000,\
            "pagination":{"bulletsDisplay":7,"clickable":true,"hidden":true}}'>
            </jeep-slides>
          ];
          break;   
        }
        case "paginationnavigationhorizontal": { 
          slides = [
            <jeep-slides id="paginationnavigationhorizontal" options = '{"direction":"horizontal","duration":3000,\
            "navigation":{"hidden":true},\
            "pagination":{"bulletsDisplay":7,"clickable":true,"hidden":true}}'>
            </jeep-slides>
          ];
          break;   
        }    
        case "autoplayhorizontal": { 
          slides = [
            <jeep-slides id="autoplayhorizontal" options = '{"direction":"horizontal","duration":2500,\
            "autoplay":{"duration":3000,"hidden":true}}'>
            </jeep-slides>
          ];
          break;   
        }
        case "autoplayvertical": { 
          slides = [
            <jeep-slides id="autoplayvertical" options = '{"direction":"vertical","duration":2500,\
            "autoplay":{"duration":3000,"hidden":true}}'>
            </jeep-slides>
          ];
          break;   
        }
        case "fullscreenhorizontal": { 
          slides = [
            <jeep-slides id="fullscreenhorizontal" options = '{"direction":"horizontal","duration":2500,\
            "fullscreen":{"hidden":true},\
            "navigation":{"hidden":true},\
            "pagination":{"bulletsDisplay":7,"clickable":true,"hidden":true}}'>
            </jeep-slides>
          ];
          break;   
        }
        default: {
            slides =  [
              <div id="fake-slides">
              </div>
            ];  
            break;
        }
      }
      return [
        <ion-header>
          <ion-toolbar color="light">
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/slides" />
            </ion-buttons>
          </ion-toolbar>
        </ion-header>,
        <ion-content fullscreen>
          {slides}
        </ion-content>    
      ]
    }
  }
}
