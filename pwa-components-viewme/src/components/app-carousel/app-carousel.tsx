import { h, Component, Element } from '@stencil/core';


@Component({
  tag: 'app-carousel',
  styleUrl: 'app-carousel.css',
  shadow: true
})
export class AppCarousel {
  
  @Element() el!: HTMLAppCarouselElement;


  render() {
    return [
      <ion-header>
        <ion-toolbar color="light">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
          </ion-buttons>
          <ion-title>JeepCarousel ViewMe</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <ion-card>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/basichorizontal" routerDirection="forward">Carousel Basic Horizontal</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/basicvertical" routerDirection="forward">Carousel Basic Vertical</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/navigationarrowdefault" routerDirection="forward">Carousel Navigation Arrow Default</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/navigationarrowcircle" routerDirection="forward">Carousel Navigation Arrow Circle</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/navigationarrowround" routerDirection="forward">Carousel Navigation Arrow Round</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/paginationhorizontalnotclickable" routerDirection="forward">Carousel Pagination Horizontal not Clickable</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/paginationhorizontalclickable" routerDirection="forward">Carousel Pagination Horizontal Clickable</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/paginationhorizontaldynamicbulletsclickable" routerDirection="forward">Carousel Pagination Horizontal Dynamic Bullets Clickable</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/paginationverticalnotclickable" routerDirection="forward">Carousel Pagination Vertical not Clickable</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/paginationverticalclickable" routerDirection="forward">Carousel Pagination Vertical Clickable</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/paginationnavigationfraction" routerDirection="forward">Carousel Pagination Navigation Fraction</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/paginationprogressbarhorizontalnavigation" routerDirection="forward">Carousel Pagination Progress Bar Horizontal Navigation</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/paginationprogressbarverticalnavigation" routerDirection="forward">Carousel Pagination Progress Bar Vertical Navigation</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/paginationprogressbarverticaloppositenavigation" routerDirection="forward">Carousel Pagination Progress Bar Vertical Opposite Navigation</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/autoplaywithoutplaycontrols" routerDirection="forward">Carousel Autoplay without PlayControls</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/autoplaywithplaycontrols" routerDirection="forward">Carousel Autoplay with PlayControls</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/fadeeffect" routerDirection="forward">Carousel Fade Effect</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/flipeffect" routerDirection="forward">Carousel Flip Effect</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/coverfloweffect" routerDirection="forward">Carousel Coverflow Effect</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/cubeeffect" routerDirection="forward">Carousel Cube Effect</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/lazyloadingimages" routerDirection="forward">Carousel Lazy Loading Images</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/rtllayout" routerDirection="forward">Carousel Rtl Layout</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/scrollbarhorizontaldraggable" routerDirection="forward">Carousel Scrollbar Horizontal Draggable</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/scrollbarverticaldraggable" routerDirection="forward">Carousel Scrollbar Vertical Draggable</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/parallaxhorizontal" routerDirection="forward">Carousel Parallax Horizontal</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/parallaxvertical" routerDirection="forward">Carousel Parallax Vertical</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/parallaxx" routerDirection="forward">Carousel Parallax X</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/parallaxy" routerDirection="forward">Carousel Parallax Y</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/parallaxxy" routerDirection="forward">Carousel Parallax XY</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/thumbsgallerybackgroundimages" routerDirection="forward">Carousel Thumbs Gallery Background Images</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/thumbsgalleryimages" routerDirection="forward">Carousel Thumbs Gallery Images</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/zoom" routerDirection="forward">Carousel Zoom</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/keyboardcontrolhorizontal" routerDirection="forward">Carousel Keyboard Control Horizontal</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/keyboardcontrolvertical" routerDirection="forward">Carousel Keyboard Control Vertical</ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link color="primary" href="/carousel/viewme/mousewheelvertical" routerDirection="forward">Carousel Mousewheel Vertical</ion-router-link>
          </ion-item>
        </ion-card>
      </ion-content>

    ]
  }
}
