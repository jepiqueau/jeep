import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.page.html',
  styleUrls: ['./carousel.page.scss']
})
export class CarouselPage implements OnInit {
  type: string;
  title: string;
  carousel: Element;
  clineContent: Element;
  jeepCarousel: Element;
  carouselImages:string = JSON.stringify({slides:[
    {slide:['<img class="image" src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/deerl.jpg" alt="deer"></img>']},
    {slide:['<img class="image" src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/elephantl.jpg" alt="elephant"></img>']},
    {slide:['<img class="image" src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/tigerl.jpg" alt="tiger"></img>']},
    {slide:['<img class="image" src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/lionl.jpg" alt="lion"></img>']},
    {slide:['<img class="image" src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/eaglel.jpg" alt="eagle"></img>']},
    {slide:['<img class="image" src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/eagleheadl.jpg" alt="eagle head"></img>']}
  ]});
  carouselCstyle: string;
  carouselOptions: string;

  constructor() { }

  ngOnInit() {

    const root: HTMLElement = document.documentElement;
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
    root.style.setProperty('--navigation-next-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M48%20256c0%20114.9%2093.1%20208%20208%20208s208-93.1%20208-208S370.9%2048%20256%2048%2048%20141.1%2048%20256zm244.5%200l-81.9-81.1c-7.5-7.5-7.5-19.8%200-27.3s19.8-7.5%2027.3%200l95.4%2095.7c7.3%207.3%207.5%2019.1.6%2026.6l-94%2094.3c-3.8%203.8-8.7%205.7-13.7%205.7-4.9%200-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7%200-27.3l79.9-81z%22/%3E%3C/svg%3E")');
    root.style.setProperty('--navigation-prev-background','url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M256%2048C141.1%2048%2048%20141.1%2048%20256s93.1%20208%20208%20208%20208-93.1%20208-208S370.9%2048%20256%2048zm43.4%20289.1c7.5%207.5%207.5%2019.8%200%2027.3-3.8%203.8-8.7%205.6-13.6%205.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5%2019.7-7.6%2027.3%200%207.5%207.5%207.6%2019.7%200%2027.3l-81.9%2081%2079.9%2081.1z%22/%3E%3C/svg%3E")');
    root.style.setProperty('--navigation-height','5vmax');
    root.style.setProperty('--navigation-width','5vmax');
    root.style.setProperty('--bullet-diameter','3vmax');
    root.style.setProperty('--bullet-background','#af0ea7');
    root.style.setProperty('--bullet-opacity','0.5');
    root.style.setProperty('--bullet-active-background','#ff8000');
    root.style.setProperty('--bullet-active-opacity','1');

    this.type = "paginationnavigation";
    this.title = 'Carousel Pagination Navigation'; 
    this.carouselOptions = JSON.stringify({direction:"horizontal",
    pagination:{el:".swiper-pagination",type:"bullets",clickable:true},
    navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});
  }
}
