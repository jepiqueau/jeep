import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { sliderPresentation } from '../../helpers/utils';

@Component({
  selector: 'app-slides',
  templateUrl: 'slides.page.html',
  styleUrls: ['slides.page.scss'],
})
export class SlidesPage implements OnInit {
  header: Element;

  @HostListener('document:jeepSlidesHeaderVisibility', ['$event'])
  jeepHeaderVisibilityHandler(event: CustomEvent) {
    if(event.detail && event.detail.visibility) {
      console.log('event.detail.visibility ',event.detail.visibility)
      if(event.detail.visibility === 'visible') {
        if(this.header.classList.contains('hidden')) this.header.classList.remove('hidden');
      } else {
        this.header.classList.add('hidden');
      }
    }
  }

  constructor(private elRef: ElementRef) { 

  }

  ngOnInit() {
      const root: HTMLElement = document.documentElement;
      root.style.setProperty('--gslides-background-color','#eeeeee');
      root.style.setProperty('--gslides-slide-color','#ffffff');
      root.style.setProperty('--gslides-slide-background','#6d6c6c');
      root.style.setProperty('--gslides-slide-content-font-size','7vmin');
      root.style.setProperty('--gslides-margin-top','0px');
      root.style.setProperty('--gslides-margin-left','5vmin');
      root.style.setProperty('--gslides-margin-right','5vmin');
      root.style.setProperty('--gslides-margin-bottom','10vmin');
      root.style.setProperty('--gslides-fullscreen-top','56px');

  }
  ngAfterViewInit() {
    console.log('this.elRef ',this.elRef.nativeElement)
    this.header = this.elRef.nativeElement.querySelector('ion-header');
    console.log('this.header ',this.header)
    const content = this.elRef.nativeElement.querySelector('ion-content');
    const slides:any = content.querySelector("jeep-slides");
    console.log('slides ',slides)
    slides.innerHTML = sliderPresentation;
    console.log('slides.innerHTML ',slides.innerHTML)
  }

}
