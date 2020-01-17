import { h, Component, Prop, Element } from '@stencil/core';
import { carouselImages, carouselLazyImages, carouselCoverImages
  , carouselParallaxSlides, carouselParallaxXSlides, carouselParallaxYSlides, carouselParallaxXYSlides } from '../../helpers/utils';

@Component({
  tag: 'app-carousel-viewme',
  styleUrl: 'app-carousel-viewme.css'/*,
  shadow: true*/
})
export class AppCarouselViewme {
  @Element() el!: HTMLAppCarouselViewmeElement;

  @Prop() type: string;



  render() {
    if (this.type) {
      let carousel: Array<any> = [];
      let root: HTMLElement = document.documentElement;
      root.style.setProperty('--swiper-slide-display','flex');
      root.style.setProperty('--swiper-slide-align-items','center');
      root.style.setProperty('--swiper-slide-justify-content','center');
      root.style.setProperty('--swiper-container-position','relative');
      root.style.setProperty('--swiper-container-top','auto');
      root.style.setProperty('--swiper-container-left','auto');
      root.style.setProperty('--swiper-container-width','100%');
      root.style.setProperty('--swiper-container-height','100%');
      root.style.setProperty('--swiper-slide-color','#000');
      root.style.setProperty('--swiper-slide-width','100%');
      root.style.setProperty('--swiper-slide-height','100%');
      root.style.setProperty('--swiper-slide-top','auto');
      root.style.setProperty('--navigation-next-background','initial');
      root.style.setProperty('--navigation-prev-background','initial');
      root.style.setProperty('--navigation-height','initial');
      root.style.setProperty('--navigation-width','initial');
      root.style.setProperty('--parallax-width','initial');
      root.style.setProperty('--parallax-height','initial');
      root.style.setProperty('--parallax-background-position','initial');

      switch(this.type) { 
        case "basichorizontal": {
          carousel = [
            <jeep-carousel  
              data = {carouselImages}
              cstyle = ".image {width: 75%;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"horizontal"}'
              >
            </jeep-carousel>
          ];    
          break; 
        } 
        case "basicvertical": {
          carousel = [
            <jeep-carousel  
              data = {carouselImages}
              cstyle = ".image {width: 75%;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"vertical"}'
              >
            </jeep-carousel>
          ];    
          break; 
        } 
        case "navigationarrowdefault": { 
          carousel = [
            <jeep-carousel  
              data = {carouselImages}
              cstyle = ".image {width: 75%;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];   
          break;   
        }
        case "navigationarrowcircle": { 
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          carousel = [
            <jeep-carousel  
              data = {carouselImages}
              cstyle = ".image {width: 75%;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;   
        }
        case "navigationarrowround": { 
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20fill=%22%23ff0000%22%20d=%22M284.9%20412.6l138.1-134c6-5.8%209-13.7%209-22.4v-.4c0-8.7-3-16.6-9-22.4l-138.1-134c-12-12.5-31.3-12.5-43.2%200-11.9%2012.5-11.9%2032.7%200%2045.2l83%2079.4h-214c-17%200-30.7%2014.3-30.7%2032%200%2018%2013.7%2032%2030.6%2032h214l-83%2079.4c-11.9%2012.5-11.9%2032.7%200%2045.2%2012%2012.5%2031.3%2012.5%2043.3%200z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20fill=%22%23ff0000%22%20d=%22M401.4%20224h-214l83-79.4c11.9-12.5%2011.9-32.7%200-45.2s-31.2-12.5-43.2%200L89%20233.4c-6%205.8-9%2013.7-9%2022.4v.4c0%208.7%203%2016.6%209%2022.4l138.1%20134c12%2012.5%2031.3%2012.5%2043.2%200%2011.9-12.5%2011.9-32.7%200-45.2l-83-79.4h214c16.9%200%2030.6-14.3%2030.6-32%20.1-18-13.6-32-30.5-32z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          carousel = [
            <jeep-carousel  
              data = {carouselImages}
              cstyle = ".image {width: 75%;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
              </jeep-carousel>
          ];    
          break;   
        }
        case "paginationhorizontalnotclickable": { 
          root.style.setProperty('--bullet-diameter','20px');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#007aff');
          root.style.setProperty('--bullet-active-opacity','1');
          carousel = [
            <jeep-carousel  
              data = {carouselImages}
              cstyle = ".image {width: 75%;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"horizontal",\
              "pagination":{"el":".swiper-pagination","type":"bullets"}}'
              >
            </jeep-carousel>
          ];    
          break;   
        }
        case "paginationhorizontalclickable": { 
          root.style.setProperty('--bullet-diameter','3vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          carousel = [
            <jeep-carousel  
              data = {carouselImages}
              cstyle = ".image {width: 75%;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"horizontal",\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true}}'
              >
            </jeep-carousel>
          ];    
          break;   
        }
        case "paginationhorizontaldynamicbulletsclickable": { 
          root.style.setProperty('--container-background-color','#888888');
          root.style.setProperty('--bullet-diameter','4vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          carousel = [
            <jeep-carousel  
              data = {carouselImages}
              cstyle = ".image {width: 75%;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"horizontal",\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true,"dynamicBullets": true}}'
              >
            </jeep-carousel>
          ];        
          break;   
        }    
        case "paginationverticalnotclickable": { 
          root.style.setProperty('--bullet-diameter','20px');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#007aff');
          root.style.setProperty('--bullet-active-opacity','1');
          carousel = [
            <jeep-carousel  
              data = {carouselImages}
              cstyle = ".image {width: 75%;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"vertical",\
              "pagination":{"el":".swiper-pagination","type":"bullets"}}'
              >
            </jeep-carousel>
          ];    
          break;   
        }
        case "paginationverticalclickable": { 
          root.style.setProperty('--bullet-diameter','3vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          carousel = [
            <jeep-carousel  
              data = {carouselImages}
              cstyle = ".image {width: 75%;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"vertical",\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true}}'
              >
            </jeep-carousel>
          ];    
          break;   
        }
        case "paginationnavigationfraction": {
          root.style.setProperty('--fraction-font-family','Arial, Helvetica, sans-serif');
          root.style.setProperty('--fraction-font-size','3.6vmax');
          root.style.setProperty('--fraction-font-weight','bold');
          root.style.setProperty('--fraction-font-style','italic');
          root.style.setProperty('--fraction-text-color','#ffffff');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          carousel = [
            <jeep-carousel  
              data = {carouselImages}
              cstyle = ".image {width: 75%;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"vertical",\
              "pagination":{"el":".swiper-pagination","type":"fraction"},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;       
        }
        case "paginationprogressbarhorizontalnavigation": {
          root.style.setProperty('--progress-bar-height','6px');
          root.style.setProperty('--progress-bar-width','90%');
          root.style.setProperty('--progress-bar-top','96%');
          root.style.setProperty('--progress-bar-left','5%');
          root.style.setProperty('--progress-bar-color','#ff0000');
          root.style.setProperty('--progress-bar-background-color','rgb(255,255,255,0.5)');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          carousel = [
            <jeep-carousel  
              data = {carouselImages}
              cstyle = ".image {width: 75%;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"horizontal",\
              "pagination":{"el":".swiper-pagination","type":"progressbar"},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;   
        } 
        case "paginationprogressbarverticalnavigation": {
          root.style.setProperty('--progress-bar-height','90%');
          root.style.setProperty('--progress-bar-width','6px');
          root.style.setProperty('--progress-bar-top','5%');
          root.style.setProperty('--progress-bar-left','96%');
          root.style.setProperty('--progress-bar-color','#ffff00');
          root.style.setProperty('--progress-bar-background-color','rgb(255,255,255,0.5)');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          carousel = [
            <jeep-carousel  
              data = {carouselImages}
              cstyle = ".image {width: 75%;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"vertical",\
              "pagination":{"el":".swiper-pagination","type":"progressbar"},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;        
        }
        case "paginationprogressbarverticaloppositenavigation": {
          root.style.setProperty('--progress-bar-height','1%');
          root.style.setProperty('--progress-bar-width','78%');
          root.style.setProperty('--progress-bar-top','2%');
          root.style.setProperty('--progress-bar-left','11%');
          root.style.setProperty('--progress-bar-color','#ffff00');
          root.style.setProperty('--progress-bar-background-color','rgb(255,255,255,0.5)');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          carousel = [
            <jeep-carousel  
              data = {carouselImages}
              cstyle = ".image {width: 75%;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"vertical",\
              "pagination":{"el":".swiper-pagination","type":"progressbar","progressbarOpposite":true},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;   
        }
        case "autoplaywithoutplaycontrols": {
          root.style.setProperty('--bullet-diameter','vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          carousel = [
            <jeep-carousel  
              data = {carouselImages}
              cstyle = ".image {width: 75%;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"horizontal",\
              "autoplay":{"delay":5000,"disableOnInteraction":false,"stopOnLastSlide":true},\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;       
        }
        case "autoplaywithplaycontrols": {
          root.style.setProperty('--playcontrols-height','3vmax');
          root.style.setProperty('--playcontrols-width','3vmax');
          carousel = [
            <jeep-carousel playcontrols 
              data = {carouselImages}
              cstyle = ".image {width: 75%;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"horizontal",\
              "autoplay":{"delay":5000,"disableOnInteraction":false,"stopOnLastSlide":true}}'
              >
            </jeep-carousel>
          ];    
          break;       
        }
        case "fadeeffect": {
          root.style.setProperty('--bullet-diameter','2vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          carousel = [
            <jeep-carousel 
              data = {carouselImages}
              cstyle = ".image {width: auto;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"horizontal","effect":"fade","speed":1000,\
              "fadeEffect": {"crossFade": true},\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;        
        }
        case "flipeffect":{
          root.style.setProperty('--bullet-diameter','2vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          carousel = [
            <jeep-carousel 
              data = {carouselImages}
              cstyle = ".image {width: auto;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"horizontal","effect":"flip",\
              "flipEffect": {"rotate": 30,"slideShadows": false},\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;        
        }
        case "coverfloweffect":{
          root.style.setProperty('--bullet-diameter','2vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          root.style.setProperty('--swiper-slide-width','100vmin');
          root.style.setProperty('--swiper-slide-height','calc(var(--swiper-slide-width) * 1024 / 1366)');
          root.style.setProperty('--swiper-slide-top','calc((100% - var(--swiper-slide-height)) / 2)');
          root.style.setProperty('--swiper-slide-display','initial');
          carousel = [
            <jeep-carousel 
              data = {carouselImages}
              cstyle = ".image {width: auto;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"horizontal","effect":"coverflow",\
              "centeredSlides":true,"slidesPerView":"auto",\
              "coverflowEffect": {"rotate": 50,"stretch":0,"depth":100,"modifier":1,"slideShadows":true},\
              "pagination":{"el":".swiper-pagination","type":"bullets"}}'
              >
            </jeep-carousel>
          ];    
          break;        
        }
        case "cubeeffect":{
          root.style.setProperty('--swiper-container-width','76vmin');
          root.style.setProperty('--swiper-container-height','calc(var(--swiper-container-width) * 1024 / 1366)');
          root.style.setProperty('--swiper-container-position','absolute');
          root.style.setProperty('--swiper-container-top','calc( (100% - var(--swiper-container-height)) / 2)');
          root.style.setProperty('--swiper-container-left','calc( (100% - var(--swiper-container-width)) / 2)');
          root.style.setProperty('--bullet-diameter','2vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          root.style.setProperty('--swiper-slide-display','initial');   
          carousel = [
            <jeep-carousel 
              data = {carouselImages}
              cstyle = ".image {width: auto;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"effect":"cube",\
              "cubeEffect": {"shadow": true,"slideShadows": true,"shadowOffset": 20,"shadowScale": 0.94},\
              "pagination":{"el":".swiper-pagination","type":"bullets"}}'
              >
            </jeep-carousel>
          ];    
          break;        
        }
        case "lazyloadingimages": {
          root.style.setProperty('--bullet-diameter','3vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          carousel = [
            <jeep-carousel 
              data = {carouselLazyImages}
              cstyle = ".image {width: auto;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"horizontal",\
              "lazy":{"loadPrevNext": true},\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;              
        }
        case "rtllayout": {
          root.style.setProperty('--bullet-diameter','3vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          carousel = [
            <jeep-carousel rtl
              data = {carouselImages}
              cstyle = ".image {width: auto;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"horizontal",\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;              
        }
        case "scrollbarhorizontaldraggable": {
          root.style.setProperty('--scrollbar-height','2vmax');
          root.style.setProperty('--scrollbar-width','96%');
          root.style.setProperty('--scrollbar-bottom','1%');
          root.style.setProperty('--scrollbar-left','2%');
          root.style.setProperty('--scrollbar-color','#007aff');
          root.style.setProperty('--scrollbar-background-color','rgba(255,255,255,0.5)');
          carousel = [
            <jeep-carousel 
              data = {carouselImages}
              cstyle = ".image {width: auto;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"horizontal",\
              "scrollbar": {"el": ".swiper-scrollbar","draggable": true}}'
              >
            </jeep-carousel>
          ];    
          break;                    
        }
        case "scrollbarverticaldraggable": {
          root.style.setProperty('--scrollbar-height','96%');
          root.style.setProperty('--scrollbar-width','2vmax');
          root.style.setProperty('--scrollbar-bottom','2%');
          root.style.setProperty('--scrollbar-left','97%');
          root.style.setProperty('--scrollbar-color','#007aff');
          root.style.setProperty('--scrollbar-background-color','rgba(255,255,255,0.5)');
          carousel = [
            <jeep-carousel 
              data = {carouselImages}
              cstyle = ".image {width: auto;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"vertical",\
              "scrollbar": {"el": ".swiper-scrollbar","draggable": true}}'
              >
            </jeep-carousel>
          ];    
          break;                    
        }
        case "parallaxhorizontal": {
          root.style.setProperty('--bullet-diameter','3vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          root.style.setProperty('--parallax-width','130%');
          root.style.setProperty('--parallax-height','100%');
          root.style.setProperty('--swiper-slide-color','#fff');
          root.style.setProperty('--swiper-slide-padding','40px 60px 40px 60px');
          carousel = [
            <jeep-carousel parallaxoptions='{"imageUrl":"url(../../assets/images/deerl.jpg)",
            "dataSwiperParallax":"-23%"}'
              data = {carouselParallaxSlides}
              cstyle = ".swiper-slide .title {font-size: 9vmin;font-weight: bold;}\
              .swiper-slide .subtitle {font-size: 7.5vmin;}\
              .swiper-slide .text {font-size: 5.5vmin;max-width: 60vW;line-height: 1.1}"
              options = '{"direction":"horizontal",\
              "speed":300,"parallax":true,\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;              
        }
        case "parallaxvertical": {
          root.style.setProperty('--bullet-diameter','3vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          root.style.setProperty('--navigation-position','5vmax');
          root.style.setProperty('--parallax-width','100%');
          root.style.setProperty('--parallax-height','110%');
          root.style.setProperty('--swiper-slide-color','#fff');
          root.style.setProperty('--swiper-slide-padding','40px 60px 40px 60px');
          carousel = [
            <jeep-carousel parallaxoptions='{"imageUrl":"url(../../assets/images/deerl.jpg)",
            "dataSwiperParallax":"-8%"}'
              data = {carouselParallaxSlides}
              cstyle = ".swiper-slide .title {font-size: 9vmin;font-weight: bold;}\
              .swiper-slide .subtitle {font-size: 7.5vmin;}\
              .swiper-slide .text {font-size: 5.5vmin;max-width: 60vW;line-height: 1.1}"
              options = '{"direction":"vertical",\
              "speed":300,"parallax":true,\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;              
        }
        case "parallaxx": {
          root.style.setProperty('--bullet-diameter','3vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          root.style.setProperty('--parallax-width','130%');
          root.style.setProperty('--parallax-height','100%');
          root.style.setProperty('--swiper-slide-color','#fff');
          root.style.setProperty('--swiper-slide-padding','40px 60px 40px 60px');
          carousel = [
            <jeep-carousel parallaxoptions='{"imageUrl":"url(../../assets/images/deerl.jpg)",
            "dataSwiperParallaxX":"-23%"}'
              data = {carouselParallaxXSlides}
              cstyle = ".swiper-slide .title {font-size: 9vmin;font-weight: bold;}\
              .swiper-slide .subtitle {font-size: 7.5vmin;}\
              .swiper-slide .text {font-size: 5.5vmin;max-width: 60vW;line-height: 1.1}"
              options = '{\
              "speed":300,"parallax":true,\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;              
        }
        case "parallaxy": {
          root.style.setProperty('--bullet-diameter','3vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          root.style.setProperty('--navigation-position','5vmax');
          root.style.setProperty('--parallax-width','100%');
          root.style.setProperty('--parallax-height','110%');
          root.style.setProperty('--swiper-slide-color','#fff');
          root.style.setProperty('--swiper-slide-padding','40px 60px 40px 60px');
          carousel = [
            <jeep-carousel parallaxoptions='{"imageUrl":"url(../../assets/images/deerl.jpg)","dataSwiperParallaxY":"-8%"}'
              data = {carouselParallaxYSlides}
              cstyle = ".swiper-slide .title {font-size: 9vmin;font-weight: bold;}\
              .swiper-slide .subtitle {font-size: 7.5vmin;}\
              .swiper-slide .text {font-size: 5.5vmin;max-width: 60vW;line-height: 1.1}"
              options = '{\
              "speed":300,"parallax":true,\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;              
        }
        case "parallaxxy": {
          root.style.setProperty('--bullet-diameter','3vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          root.style.setProperty('--parallax-width','112%');
          root.style.setProperty('--parallax-height','110%');
          root.style.setProperty('--parallax-background-position','left top');
          root.style.setProperty('--swiper-slide-color','#fff');
          root.style.setProperty('--swiper-slide-padding','40px 60px 40px 60px');
          carousel = [
            <jeep-carousel parallaxoptions='{"imageUrl":"url(../../assets/images/deerl.jpg)",
              "dataSwiperParallaxX":"-10%",
              "dataSwiperParallaxY":"-10%"}'
              data = {carouselParallaxXYSlides}
              cstyle = ".swiper-slide .title {font-size: 9vmin;font-weight: bold;}\
              .swiper-slide .subtitle {font-size: 7.5vmin;}\
              .swiper-slide .text {font-size: 5.5vmin;max-width: 60vW;line-height: 1.1}"
              options = '{\
              "speed":300,"parallax":true,\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;              
        }
        case "thumbsgallerybackgroundimages": {
          root.style.setProperty('--swiper-container-height','100%');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20fill=%22%23f6be8a%22%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20fill=%22%23f6be8a%22%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          root.style.setProperty('--gallery-thumbs-height','20%');
          root.style.setProperty('--gallery-thumbs-width','20%');
          root.style.setProperty('--gallery-thumbs-opacity','0.4');
          root.style.setProperty('--gallery-thumbs-padding','10px 0');
          root.style.setProperty('--gallery-thumbs-top','80%');
          root.style.setProperty('--gallery-thumbs-background-color','#eeeeee');
          carousel = [
            <jeep-carousel
              data = {carouselCoverImages}
              cstyle = ".cover-image {background-size: cover;background-position: center;}"
              options = '{"direction":"horizontal",\
              "spaceBetween": 10,\
              "thumbs": {\
                "swiper": {\
                  "el": ".swiper-container-thumbs",\
                  "slidesPerView": 5,\
                  "spaceBetween": 10,\
                  "freeMode": true,\
                  "watchSlidesVisibility": true,\
                  "watchSlidesProgress": true\
                }\
              },\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;                 
        }
        case "thumbsgalleryimages": {
          root.style.setProperty('--swiper-container-height','100%');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20fill=%22%23f6be8a%22%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20fill=%22%23f6be8a%22%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          root.style.setProperty('--gallery-thumbs-height','20%');
          root.style.setProperty('--gallery-thumbs-width','20%');
          root.style.setProperty('--gallery-thumbs-opacity','0.4');
          root.style.setProperty('--gallery-thumbs-padding','10px 0');
          root.style.setProperty('--gallery-thumbs-top','80%');
          root.style.setProperty('--gallery-thumbs-background-color','#eeeeee');
          carousel = [
            <jeep-carousel
              data = {carouselImages}
              cstyle = ".image {width: auto;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"horizontal",\
              "spaceBetween": 10,\
              "thumbs": {\
                "swiper": {\
                  "el": ".swiper-container-thumbs",\
                  "slidesPerView": 5,\
                  "spaceBetween": 10,\
                  "freeMode": true,\
                  "watchSlidesVisibility": true,\
                  "watchSlidesProgress": true\
                }\
              },\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;                 
        }
        case "zoom": {
          root.style.setProperty('--bullet-diameter','3vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','5vmax');
          root.style.setProperty('--navigation-width','5vmax');
          carousel = [
            <jeep-carousel
              data = {carouselImages}
              cstyle = ".image {width: auto;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"horizontal",\
              "zoom":{"minRatio":1,"maxRatio":5},\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;              
        }
        case "keyboardcontrolhorizontal": {
          root.style.setProperty('--bullet-diameter','3vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','8vmax');
          root.style.setProperty('--navigation-width:','8vmax');
          carousel = [
            <jeep-carousel 
              data = {carouselImages}
              cstyle = ".image {width: auto;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"horizontal",\
              "slidesPerView": 1,\
              "keyboard": {"enabled": true},\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;              
        }
        case "keyboardcontrolvertical": {
          root.style.setProperty('--bullet-diameter','3vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
          root.style.setProperty('--navigation-height','8vmax');
          root.style.setProperty('--navigation-width:','8vmax');
          carousel = [
            <jeep-carousel 
              data = {carouselImages}
              cstyle = ".image {width: auto;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"vertical",\
              "slidesPerView": 1,\
              "keyboard": {"enabled": true},\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true},\
              "navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'
              >
            </jeep-carousel>
          ];    
          break;              
        }
        case "mousewheelvertical": {
          root.style.setProperty('--bullet-diameter','3vmax');
          root.style.setProperty('--bullet-background','#000000');
          root.style.setProperty('--bullet-opacity','0.5');
          root.style.setProperty('--bullet-active-background','#ff8000');
          root.style.setProperty('--bullet-active-opacity','1');
          carousel = [
            <jeep-carousel 
              data = {carouselImages}
              cstyle = ".image {width: auto;max-width: 100%;height: auto;max-height: 100%;}"
              options = '{"direction":"vertical",\
              "slidesPerView": 1,\
              "mousewheel": true,\
              "pagination":{"el":".swiper-pagination","type":"bullets","clickable":true}}'
              >
            </jeep-carousel>
          ];    
          break;              
        }
        default: {
          carousel =  [
            <div id="fake-carousel">
            </div>
          ];  
          break;
        }
      }
      return [
        <ion-header>
          <ion-toolbar color="light">
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/carousel" />
            </ion-buttons>
          </ion-toolbar>
        </ion-header>,
        <ion-content class="ion-padding">
          {carousel}
        </ion-content>
      ]
    }
  }
}
