import { h, JSX, Host, Element, Component, Prop, Method, Watch, Listen, State, Event, EventEmitter } from '@stencil/core';
import { SlidesOptions, SlidesParams, SlidesMargins, HeaderVisibility } from '../../global/interfaces/jeep-slides';
import { getBoundingClientRect } from '../../utils/common';

@Component({
  tag: 'jeep-slides',
  styleUrl: 'jeep-slides.css',
  shadow: true
})
export class JeepSlides {

  @Element() el!: HTMLJeepSlidesElement;

  //************************
  //* Property Definitions *
  //************************

  /**
   * The slides options
   */
  @Prop() options: string;

  @State() innerOptions: SlidesOptions;
  @State() nSlides: number;
  @State() fullScreen: boolean = false;
  

  //*****************************
  //* Watch on Property Changes *
  //*****************************

  @Watch('options')
  parseOptionsProp(newValue: string) {
    if (newValue) this.innerOptions = JSON.parse(newValue);
  }

  //*********************
  //* Event Definitions *
  //*********************


  /**
   * Emitted the Header visibility change
   */

  @Event({eventName:'jeepSlidesHeaderVisibility'}) onSlidesHeaderVisibility: EventEmitter<HeaderVisibility>;



  //*******************************
  //* Listen to Event Definitions *
  //*******************************
  @Listen('resize', { target: 'window' })
  handleWindowResize() {
    this._windowResize();
  }

  @Listen('jeepNavigationPrev')
  async handleJeepNavigationPrev() { 
    await this.goToPreviousSlide();
  }

  @Listen('jeepNavigationNext')
  async handleJeepNavigationNext() {
    await this.goToNextSlide();
  }

  @Listen('jeepPaginationIndex')
  async handleJeepPaginationIndex(event: CustomEvent) {
    if(event.detail && event.detail.index) {
      await this.goToSlideIndex(Number(event.detail.index));
      if(this.innerOptions.navigation) this._setNavigationButtons();
      await this._pagEl.setJeepPaginationActiveIndex({activeIndex:this._slidesParams.curSlide.toString()});

    }
  }

  @Listen('jeepPlayControlsCurrentIndex')
  async handleJeepPlayControlsCurrentIndex(event: CustomEvent) {
    if(event.detail && event.detail.index) {
      await this.goToSlideIndex(Number(event.detail.index));
    }
  }

  @Listen('jeepFullscreenRequest')
  async handleJeepFullscreenRequest() {
    this._setProperties(false);
    await this._fullEl.fullscreenRequest(document.documentElement);
    this.fullScreen = true;
    this._windowResize();
  }

  @Listen('jeepFullscreenExit')
  async handleJeepFullscreenExit() {
    await this._fullEl.fullscreenExit();
    this._setProperties(true);
    this.fullScreen = false;
    this._windowResize();
  }

  @Listen('jeepFullscreenChange')
  async handleJeepFullscreenChange() {
    this._setProperties(true);
    this.fullScreen = false;
    this._windowResize();
  }

  @Listen('keydown', { target: "document" })
  async handleKeydown(event: KeyboardEvent) {
    event.preventDefault();
    const key:string = event.key ? event.key : null;
    const keycode: number = event.keyCode || event.which ? event.keyCode || event.which : null;
    const pressKey: string = key !== null ? key: keycode.toString();
    switch (pressKey) {
      case 'ArrowLeft' || '37': // LEFT
        if(this._direction === 'horizontal') {
          await this.goToPreviousSlide();
        }
        break;
      case 'ArrowUp' || '38': // UP
        if(this._direction === 'vertical') {
          await this.goToPreviousSlide();
        }
        break;
      case 'ArrowRight' || '39': // RIGHT
        if(this._direction === 'horizontal') {
          await this.goToNextSlide();
        }
        break;
      case 'ArrowDown' || '40': // DOWN
        if(this._direction === 'vertical') {
          await this.goToNextSlide();
        }
        break;
      default:
    }
  }

  @Listen('touchstart')
  handleTouchstart() {
      this._touchStart = true;
  }
  @Listen('touchmove')
  handleTouchmove() {
      this._touchMove = true;
  }
  @Listen('touchend')
  async handleTouchend() {
    if(!this._touchStart || !this._touchMove) {
      this._initial = await this._doHide(this.innerOptions.duration ? this.innerOptions.duration : 2500);
    }
    this._touchStart = false;
    this._touchMove = false;
    
  }

  //**********************
  //* Method Definitions *
  //**********************

  /**
   * Init data from properties.
   */
  @Method()
  init(): Promise<void> {
      return Promise.resolve(this._init());
  }

  /**
   * Set the slides.
   */
  @Method()
  setSlides(): Promise<void> {
    return Promise.resolve(this._setSlides());
  }

  /**
   * Get Active Slide Index.
   */
  @Method()
  async getActiveSlideIndex(): Promise<number> {
    const curSlide:number = await this._getCurrentSlideIndex();
    return Promise.resolve(curSlide);
  }

  /**
   *  Go Previous Slide
   */
  async goToPreviousSlide(): Promise<void> {
    return await this._goPrev();
  }

  /**
   *  Go Next Slide
   */
  async goToNextSlide(): Promise<void> {
    return await this._goNext();
  }

  /**
   *  Go To Slide with given index
   */
  async goToSlideIndex(index:number): Promise<void> {
    return await this._scrollToPosition(index);
  }

  //*********************************
  //* Internal Variable Definitions *
  //*********************************

  _element: any;
  _containerEl: HTMLElement;
  _wrapperEl: HTMLElement;
  _slidesEl: HTMLElement;
  _arrSlidesEl: Array<HTMLElement>;
  _slotEl:HTMLSlotElement;
  _navEl: HTMLJeepNavigationElement;
  _pagEl: HTMLJeepPaginationElement;
  _playEl: HTMLJeepPlayControlsElement;
  _fullEl:HTMLJeepFullscreenElement;
  _slidesParams: SlidesParams = {};
  _ticking: boolean =false;
  _direction: string;
  _navIcon: string;
  _initial: NodeJS.Timer;
  _elementsInSlot: JSX.Element[];
  _slidesNumber: number;
  _oriMargin: SlidesMargins = {};
  _touchStart: boolean = false;
  _touchMove: boolean = false;
  
  async componentWillLoad() {
    await this.init();
  }

  async componentDidLoad() {
    await this.setSlides();
  } 

  private async _init(): Promise<void> {
    this._element = this.el.shadowRoot;
    this._slidesNumber = 0;
    const defOpt: SlidesOptions = {direction:"horizontal"};
    this.parseOptionsProp(this.options ? this.options : JSON.stringify(defOpt));
    this._direction = this.innerOptions.direction ? this.innerOptions.direction : "horizontal";
    this._navIcon = this.innerOptions.navigation && this.innerOptions.navigation.icon ? this.innerOptions.navigation.icon : "arrow-circle";
    this._oriMargin.top = window.getComputedStyle(this.el).getPropertyValue('--slides-margin-top');
    this._oriMargin.left = window.getComputedStyle(this.el).getPropertyValue('--slides-margin-left');
    this._oriMargin.bottom = window.getComputedStyle(this.el).getPropertyValue('--slides-margin-bottom');
    this._oriMargin.right = window.getComputedStyle(this.el).getPropertyValue('--slides-margin-right');
  }
  private async _setSlides(): Promise<void> {

    this._containerEl = this._element.querySelector('.slides-container');
    this._wrapperEl = this._containerEl.querySelector('.slides-wrapper');
    this._slidesEl = this._wrapperEl.querySelector('.slides');
    this._slidesEl.classList.add(`slides-${this._direction}`)
    this._slotEl  = this._slidesEl.querySelector( 'slot' );
    if(this._slotEl !== null ) {
      this._arrSlidesEl = await this._getElementsInSlot();
      if(this._arrSlidesEl !==null && this._arrSlidesEl.length > 0) {

        //<-- required to be added as the scroll horizontal does not work with slot element
        // loop through the slot element , add the elements to the render

        // store elements which are in slot
        this._slidesNumber = this._arrSlidesEl.length;
        for(let i:number =0; i < this._slidesNumber; i++) {
          this._slidesEl.append(this._arrSlidesEl[i])
        }
        // delete the slot element
        const div:Array<HTMLElement> = Array.from(this.el.querySelectorAll('div'))
        if(div !== null ) {
          for(let i:number = 0; i< div.length; i++) {
            if(div[i].slot === "slides") this.el.removeChild(div[i]);
          }
          this._slidesEl.removeChild(this._slotEl);
        }
        //-->
        if(this.innerOptions.fullscreen) this._fullEl = this._containerEl.querySelector('#jeep-slides-fullscreen');
        if(!this.innerOptions.autoplay && this.innerOptions.navigation) this._navEl = this._containerEl.querySelector('#jeep-slides-navigation');
        if(!this.innerOptions.autoplay && this.innerOptions.pagination) {
          const pagId = `#jeep-slides-pagination-${this.innerOptions.direction}`;
          this._pagEl = this._containerEl.querySelector(pagId);
          await this._pagEl.setJeepPaginationSlidesNumber({slides:this._arrSlidesEl.length})
        }
        if(this.innerOptions.autoplay) this._playEl  = this._containerEl.querySelector('#jeep-slides-autoplay');

        // add scroll event
        this._slidesEl.addEventListener('scroll', () => {
          const prevIndex:number = this._slidesParams.curSlide;
          if (!this._ticking) {
            setTimeout(async () => {
              this._slidesParams.curSlide = await this.getActiveSlideIndex();
              this._slidesParams.position = this._slidesParams.axis === 'x' ? Number(this._slidesEl.scrollLeft) : Number(this._slidesEl.scrollTop);
              if(this.innerOptions.navigation && this._slidesParams.curSlide !== prevIndex) this._setNavigationButtons();
              if(this.innerOptions.pagination && this._slidesParams.curSlide !== prevIndex) this._syncPagination();
              if(this.innerOptions.autoplay && this._slidesParams.curSlide !== prevIndex) this._playEl.setActiveIndexAndPlay(this._slidesParams.curSlide);           
              this._ticking = false;
            },200);
            this._ticking = true;
          }
        },false);
        // add click event
        this._slidesEl.addEventListener('click', async () => {
          this._initial = await this._doHide(this.innerOptions.duration ? this.innerOptions.duration : 2500);
        },false);

        // fill the slidesParams
        this._slidesParams.axis = this._direction === 'vertical' ? 'y' : 'x';
        this._slidesParams.curSlide = 0;
        this._slidesParams.nbSlides = this._arrSlidesEl.length;
        await this._initScrollParams();
        if(!this.innerOptions.autoplay && (this.innerOptions.navigation && this._slidesParams.nbSlides > 1))
          await this._navEl.setJeepNavigationNextDisabled({disabled:false});

        this._initial = await this._doHide(this.innerOptions.duration ? this.innerOptions.duration : 2500);
        this.nSlides = this._arrSlidesEl.length
      }
    } 
  }
  private _setProperties(back:boolean) {
    if(!back) {
      this.el.style.setProperty('--slides-margin-top','0px');
      this.el.style.setProperty('--slides-margin-bottom','0px');
      this.el.style.setProperty('--slides-margin-left','0px');
      this.el.style.setProperty('--slides-margin-right','0px');
    } else {
      this.el.style.setProperty('--slides-margin-top',this._oriMargin.top);
      this.el.style.setProperty('--slides-margin-bottom',this._oriMargin.bottom);
      this.el.style.setProperty('--slides-margin-left',this._oriMargin.left);
      this.el.style.setProperty('--slides-margin-right',this._oriMargin.right);  
    }
  }
  private async _windowResize() {
    this.el.style.setProperty('--slides-width',`${window.innerWidth}px`);    
    this.el.style.setProperty('--slides-height',`${window.innerHeight}px`);
    await this._initScrollParams();
    await this.goToSlideIndex(this._slidesParams.curSlide);

  }

  private async _getElementsInSlot(): Promise<Array<HTMLJeepSlideElement>> {
    let elems: Array<HTMLJeepSlideElement> = null;
    const nodes:any = this._slotEl.assignedNodes();
    const cmpSlides:Array<any> = nodes.filter((item) => {
      return item.slot === 'slides' ? item: null});
    if(cmpSlides !==null && cmpSlides.length > 0 ) {
      elems = Array.from(cmpSlides[0].querySelectorAll('jeep-slide'));
    }
    return elems;
  }

  private async _initScrollParams() {
    const rect: ClientRect = await getBoundingClientRect(this._arrSlidesEl[0],100);
    this._slidesParams.slideLength = this._slidesParams.axis === 'x' ? rect.width : rect.height;
    this._slidesParams.scrollLength = this._slidesParams.axis === 'x' ? this._slidesEl.scrollWidth : 
                                      this._slidesEl.scrollHeight; 
    this._slidesParams.position = this._slidesParams.curSlide *this._slidesParams.slideLength;
  }

  private async _doHide(duration:number): Promise<NodeJS.Timeout>{
    clearTimeout( this._initial );
    await this._doVisible();
    let initial: NodeJS.Timeout =  setTimeout( async () => {
      this.onSlidesHeaderVisibility.emit({visibility:'hidden'});
      if(this._navEl && this.innerOptions.navigation.hidden) await this._navEl.setJeepNavigationVisibility({visibility:'hidden'});
      if(this._pagEl && this.innerOptions.pagination.hidden) await this._pagEl.setJeepPaginationVisibility({visibility:'hidden'});
      if(this._playEl && this.innerOptions.autoplay.hidden) await this._playEl.setJeepPlayControlsVisibility({visibility:'hidden'});
      if(this._fullEl && this.innerOptions.fullscreen.hidden) await this._fullEl.setJeepFullscreenVisibility({visibility:'hidden'});

    }, duration);
    return initial;
  }

  private async _doVisible(): Promise<void> {
    if(this._slidesParams.curSlide === 0 || this._slidesParams.curSlide === this._slidesNumber - 1) this.onSlidesHeaderVisibility.emit({visibility:'visible'});
    if(this._navEl && this.innerOptions.navigation.hidden) await this._navEl.setJeepNavigationVisibility({visibility:'visible'});
    if(this._pagEl && this.innerOptions.pagination.hidden) await this._pagEl.setJeepPaginationVisibility({visibility:'visible'});
    if(this._playEl && this.innerOptions.autoplay.hidden) await this._playEl.setJeepPlayControlsVisibility({visibility:'visible'});
    if(this._fullEl && this.innerOptions.fullscreen.hidden) await this._fullEl.setJeepFullscreenVisibility({visibility:'visible'});
    return;
  }

  private async _getCurrentSlideIndex(): Promise<number> {
    let index: number = 0;
    this._slidesParams.position = this._slidesParams.axis === 'x' ? Number(this._slidesEl.scrollLeft) : Number(this._slidesEl.scrollTop);
    if(Math.abs(this._slidesParams.scrollLength/this._slidesParams.nbSlides - this._slidesParams.slideLength) < 2) {
      // slide constant width
      index = Math.round(this._slidesParams.position/this._slidesParams.slideLength);
    }
    return index;
  }
  private async _goPrev(): Promise<void>  {
    this._slidesParams.curSlide -= 1;
    if(this._slidesParams.curSlide < 0 ) this._slidesParams.curSlide = 0;      
    if(this.innerOptions.autoplay) {
      this._playEl.setActiveIndexAndPlay(this._slidesParams.curSlide);
    } else {
      this._setNavigationButtons();
      if(this.innerOptions.pagination) this._syncPagination();  
    }
    await this.goToSlideIndex(this._slidesParams.curSlide);
  }
  private async _goNext(): Promise<void>  {
    this._slidesParams.curSlide += 1;
    if(this._slidesParams.curSlide >= this._slidesParams.nbSlides ) this._slidesParams.curSlide = this._slidesParams.nbSlides -1;      
    if(this.innerOptions.autoplay) {
      this._playEl.setActiveIndexAndPlay(this._slidesParams.curSlide);
    } else {
      this._setNavigationButtons();
      if(this.innerOptions.pagination) this._syncPagination();
    }
    await this.goToSlideIndex(this._slidesParams.curSlide);
  }

  private async _setNavigationButtons() {
    if(this._navEl) {
      if(this._slidesParams.curSlide === 0) await this._navEl.setJeepNavigationPrevDisabled({disabled:true});
      if(this._slidesParams.curSlide >= 1) await this._navEl.setJeepNavigationPrevDisabled({disabled:false});
      if(this._slidesParams.curSlide === this._slidesParams.nbSlides - 1) await this._navEl.setJeepNavigationNextDisabled({disabled:true});
      if(this._slidesParams.curSlide <= this._slidesParams.nbSlides - 2) await this._navEl.setJeepNavigationNextDisabled({disabled:false});  
    }
  } 
  private _syncPagination() {
    if(this._pagEl) this._pagEl.setJeepPaginationActiveIndex({activeIndex:this._slidesParams.curSlide.toString()});
  }
  private async _scrollToPosition(index: number): Promise<void>  {
    if(index !== this._slidesParams.curSlide) this._slidesParams.curSlide = index;
    this._slidesParams.position = this._slidesParams.curSlide *this._slidesParams.slideLength;
    if(this._slidesParams.axis === 'x') {
      if(this._slidesEl) this._slidesEl.scrollTo(this._slidesParams.position,0);
    } else {
      if(this._slidesEl) this._slidesEl.scrollTo(0,this._slidesParams.position);
    }
  }

  render() {
      return (
        <Host>
        <div class="slides-container">
          <div class="slides-wrapper">
            <div class="slides">
              <slot name="slides"></slot>             
            </div>  
          </div>
          {!this.innerOptions.autoplay && this.innerOptions.navigation 
          ? <jeep-navigation id="jeep-slides-navigation" name={this._navIcon}></jeep-navigation>
          : null
          }
          {!this.innerOptions.autoplay && this.innerOptions.pagination 
          ? <jeep-pagination id={`jeep-slides-pagination-${this._direction}`}
            ndisplay={this.innerOptions.pagination.bulletsDisplay ? this.innerOptions.pagination.bulletsDisplay : 5 } 
            clickable={this.innerOptions.pagination.clickable ? this.innerOptions.pagination.clickable : false}
            direction={this._direction}>
            </jeep-pagination>
          : null
          }
          {this.innerOptions.autoplay
          ? <jeep-play-controls id="jeep-slides-autoplay" duration={this.innerOptions.autoplay.duration} nslides={this.nSlides}></jeep-play-controls>
          : null
          }
          {this.innerOptions.fullscreen
          ? <jeep-fullscreen id="jeep-slides-fullscreen"></jeep-fullscreen>
          : null
          }
        </div>
        </Host>
      );
  }
}
