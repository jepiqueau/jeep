import { h, Component, Element, Host, Prop, State, Method, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'jeep-carousel',
  styleUrl: 'jeep-carousel.css',
  assetsDir: 'swiper',
})
export class JeepCarousel {
  @Element() el: HTMLElement;

  /************************
   * Property Definitions *
   ************************/

  /**
   * Slide data 
   */
  @Prop() data: string;

  /**
   * Slide data style 
   */
  @Prop() cstyle: string;

  /**
   * Swiper options
   */
  @Prop() options: string;

  /**
   * Swiper RTL Layout
   */
  @Prop() rtl: boolean;

  /**
   * Swiper data-swiper-parallax
   */
  @Prop() parallaxoptions: string;

  /**
   * PlayControls when autoplay
   */
  @Prop() playcontrols: boolean;

  /**
   * Clean styles when swiper destroys 
   */
  @Prop() notcleanstyles: boolean;

  /*********************
   * State Definitions *
   *********************/
  @State() innerData: Array<string>= [];
  @State() innerStyle: string;
  @State() innerOptions: any;
  @State() innerRtl: boolean;
  @State() innerParallaxOptions: any;
  @State() innerPlayControls: boolean;
  @State() innerNotCleanStyles: boolean;
  @State() pause:boolean = false;
  @State() backward:boolean = false;
  @State() forward:boolean = true;

  @Watch('data')
  parseDataProp(newValue: string) {
    let slides: Array<string> = [];
    if(newValue) {
      const inpData: any = JSON.parse(newValue);
      for(let i:number = 0; i < inpData.slides.length; i++) {
        let slide: string;
        if(inpData.slides[i].slide[0].indexOf("swiper-slide") !== -1) {
          slide = inpData.slides[i].slide[0];
        } else {
          slide = '<div class="swiper-slide">'; 
          if(this._zoom && inpData.slides[i].slide[0].indexOf("<img") === 0) slide += '<div class="swiper-zoom-container">';
          for(let j:number = 0; j< inpData.slides[i].slide.length; j++) {
            slide += inpData.slides[i].slide[j];
          }
          if(this._zoom && inpData.slides[i].slide[0].indexOf("<img") === 0) slide += '</div>';
          if(this._lazy && inpData.slides[i].slide[0].indexOf("swiper-lazy") !== -1) {
            slide += '<div class="swiper-lazy-preloader"></div>';
          }    
          slide += '</div>';
        }
        slides = [...slides,slide];
      }
    }
    this.innerData = slides;
  }

  @Watch('cstyle')
  parseStyleProp(newValue: string) {
    this.innerStyle = newValue ? newValue : null;
  }

  @Watch('options')
  async parseOptionsProp(newValue: string) {
     const options: any = newValue ? JSON.parse(newValue) : null;
    if(options !== null) {
      this._parallax = options.parallax ? true : false;
      this._thumbs = options.thumbs ? true : false;
      if(this._thumbs) {
        if(options.thumbs.swiper) {
          if(options.thumbs.swiper.el) {
            this._thumbsClass = 
              options.thumbs.swiper.el.indexOf('.') === 0 
              ? options.thumbs.swiper.el.substr(1) 
              : options.thumbs.swiper.el;
            delete options.thumbs.swiper.el;
            this._thumbsOptions = options.thumbs.swiper;            
          } else {
            this._thumbsClass = "swiper-container-thumbs";
            this._thumbsOptions = options.thumbs.swiper;            
          }

        } else {
          this._thumbsClass = "swiper-container-thumbs";
          this._thumbsOptions = {slidesPerView : 4, 
            spaceBetween: 10, 
          }
        }
        if(!this._thumbsOptions.watchSlidesProgress) this._thumbsOptions.watchSlidesProgress = true;
      }
      this._lazy = options.lazy ? true : false;
      this._zoom = options.zoom ? true : false;
      this._pagination = options.pagination ? true : false; 
      this._navigation = options.navigation ? true : false; 
      this._scrollbar = options.scrollbar ? true : false; 
      this._autoplay = options.autoplay ? true : false;
    }
    if(this._didInit && options !== null) {
      Object.assign(this._swiper.params, options);
      await this.update();
    }
    this.innerOptions = options;
  }
  @Watch('rtl')
  parseRtlProp(newValue: boolean) {
    this.innerRtl = newValue ? newValue : false;
  }

  @Watch('parallaxoptions')
  parseParallaxOptions(newValue:string) {
    let parallaxOptions:any = newValue ? JSON.parse(newValue) : null;
    if(this._parallax) {
      this._parallaxStyle = {"background-image": parallaxOptions.imageUrl};
    } else {
      parallaxOptions = null;
    }
    this.innerParallaxOptions = parallaxOptions;
}

  @Watch('playcontrols')
  parsePlayControlsProp(newValue: boolean) {
    this.innerPlayControls = this._autoplay && newValue ? newValue : false;
  }

  @Watch('notcleanstyles')
  parseNotCleanStylesProp(newValue: boolean) {
    const notCleanStyles = newValue ? newValue : false;
    this._cleanstyles = !notCleanStyles;
    this.innerNotCleanStyles = notCleanStyles;
  }

  /*********************
   * Event Definitions *
   *********************/

  /**
   * Emitted after Swiper initialization
   */
  @Event({eventName:'jeepCarouselDidLoad'}) didLoad!: EventEmitter<void>;

  /**
   * Emitted before Swiper destroy
   */
  @Event({eventName:'jeepCarouselBeforeDestroy'}) beforeDestroy!: EventEmitter<void>;

  /**
   * Emitted after Swiper destroy
   */
  @Event({eventName:'jeepCarouselAfterDestroy'}) afterDestroy!: EventEmitter<void>;

  /**
   * Emitted when the user taps/clicks on the slide's container.
   */
  @Event({eventName:'jeepCarouselTap'}) tap!: EventEmitter<void>;

  /**
   * Emitted when the user double taps on the slide's container.
   */
  @Event({eventName:'jeepCarouselDoubleTap'}) doubleTap!: EventEmitter<void>;

  /**
   * Emitted when the active slide has changed.
   */
  @Event({eventName:'jeepCarouselSlideChange'}) slideChange!: EventEmitter<void>;

  /**
   * Emitted before the active slide has changed.
   */
  @Event({eventName:'jeepCarouselWillChange'}) willChange!: EventEmitter<void>;

  /**
   * Emitted after the active slide has changed.
   */
  @Event({eventName:'jeepCarouselDidChange'}) didChange!: EventEmitter<void>;

  /**
   * Emitted when the next slide has started.
   */
  @Event({eventName:'jeepCarouselNextStart'}) nextStart!: EventEmitter<void>;

  /**
   * Emitted when the previous slide has started.
   */
  @Event({eventName:'jeepCarouselPrevStart'}) prevStart!: EventEmitter<void>;

  /**
   * Emitted when the next slide has ended.
   */
  @Event({eventName:'jeepCarouselNextEnd'}) nextEnd!: EventEmitter<void>;

  /**
   * Emitted when the previous slide has ended.
   */
  @Event({eventName:'jeepCarouselPrevEnd'}) prevEnd!: EventEmitter<void>;

  /**
   * Emitted when the slide transition has started.
   */
  @Event({eventName:'jeepCarouselTransitionStart'}) transitionStart!: EventEmitter<void>;

  /**
   * Emitted when the slide transition has ended.
   */
  @Event({eventName:'jeepCarouselTransitionEnd'}) transitionEnd!: EventEmitter<void>;

  /**
   * Emitted when the slider is actively being moved.
   */
  @Event({eventName:'jeepCarouselDrag'}) drag!: EventEmitter<void>;

  /**
   * Emitted when the slider is at its initial position.
   */
  @Event({eventName:'jeepCarouselReachStart'}) reachStart!: EventEmitter<void>;

  /**
   * Emitted when the slider is at the last slide.
   */
  @Event({eventName:'jeepCarouselReachEnd'}) reachEnd!: EventEmitter<void>;

  /**
   * Emitted when the user first touches the slider.
   */
  @Event({eventName:'jeepCarouselTouchStart'}) touchStart!: EventEmitter<void>;

  /**
   * Emitted when the user releases the touch.
   */
  @Event({eventName:'jeepCarouselTouchEnd'}) touchEnd!: EventEmitter<void>;


  /**********************
   * Method Definitions *
   **********************/

  /**
   * Init data from properties.
   */
  @Method()
  init(): Promise<void> {
      return Promise.resolve(this._init());
  }

  /**
   * Set the swiper.
   */
  @Method()
  setSwiper(): Promise<void> {
      return Promise.resolve(this._setSwiper());
  }

  /**
   * Update the underlying slider implementation. Call this if you've added or removed
   * child slides.
   */
  @Method()
  async update() {
    this._swiper.update();
  }

  /**
   * Append new slides 
   * slides could be HTMLElement or HTML string with new slide
   * or array with such slides 
   */
  @Method()
  async appendSlide(slides:any) {
    this._swiper.appendSlide(slides);
  }

  /**
   * Add new slides to required index
   * slides could be HTMLElement or HTML string with new slide
   * or array with such slides 
   */
  @Method()
  async addSlide(index:number,slides:any) {
    this._swiper.addSlide(index,slides);
  }

  /**
   * Transition to the specified slide.
   */
  @Method()
  async slideTo(index: number, speed?: number, runCallbacks?: boolean) {
    this._swiper.slideTo(index, speed, runCallbacks);
  }

  /**
   * Transition to the next slide.
   */
  @Method()
  async slideNext(speed?: number, runCallbacks?: boolean) {
    this._swiper.slideNext(speed!, runCallbacks!);
  }

  /**
   * Transition to the previous slide.
   */
  @Method()
  async slidePrev(speed?: number, runCallbacks?: boolean) {
    this._swiper.slidePrev(speed, runCallbacks);
  }

  /**
   * Get the index of the active slide.
   */
  @Method()
  async getActiveIndex(): Promise<number> {
    return this._swiper.activeIndex;
  } 

  /**
   * Get the index of the previous slide.
   */
  @Method()
  async getPreviousIndex(): Promise<number> {
    return this._swiper.previousIndex;
  }

  /**
   * Get the total number of slides.
   */
  @Method()
  async length(): Promise<number> {
    return this._swiper.slides.length;
  }

  /**
   * Get whether or not the current slide is the last slide.
   *
   */
  @Method()
  async isEnd(): Promise<boolean> {
    return this._swiper.isEnd;
  }

  /**
   * Get whether or not the current slide is the first slide.
   */
  @Method()
  async isBeginning(): Promise<boolean> {
    return this._swiper.isBeginning;
  }

  /**
   * Start auto play.
   */
  @Method()
  async startAutoplay() {
    if (this._swiper.autoplay) {
      this._swiper.autoplay.start();
    }
  }

  /**
   * Stop auto play.
   */
  @Method()
  async stopAutoplay() {
    if (this._swiper.autoplay) {
      this._swiper.autoplay.stop();
    }
  }

  /**
   * Swiper destroy.
   */
  @Method()
  async swiperDestroy(cleanstyles:boolean) {
    if(this._swiper) {
      this._swiper.removeAllSlides();
      this._swiper.detachEvents();
      this._swiper.destroy(true, cleanstyles);
      this.afterDestroy.emit();
      if(this._thumbs) {
        this._swiperThumbs.removeAllSlides();
        this._swiperThumbs.detachEvents();
        this._swiperThumbs.destroy(true, true);
      }
      this._didInit = false;
      this._swiper = null;
    }
  }

  /*********************************
   * Internal Variable Definitions *
   *********************************/
  _swiper: any = null; // cannot be Swiper as method init not in @types/swiper
  _swiperThumbs: any;
  _parallaxStyle: any;
  _didInit: boolean = false;
  _pagination: boolean = false;
  _navigation: boolean = false;
  _scrollbar: boolean = false;
  _zoom: boolean = false;
  _parallax: boolean = false;
  _thumbs: boolean = false;
  _autoplay:boolean = false;
  _lazy:boolean = false;
  _thumbsOptions: any = {};
  _thumbsClass: string;
  _initial: NodeJS.Timer;
  _scrollbarEl: HTMLElement;
  _paginationEl: HTMLElement;
  _navNextEl: HTMLElement;
  _navPrevEl: HTMLElement;
  _navButtons: HTMLElement;
  _playControlsEl: HTMLElement;
  _playBackwardEl: HTMLElement;
  _playForwardEl: HTMLElement;
  _swiperThumbsEl: HTMLElement;
  _cleanstyles: boolean = true;

  async componentWillLoad() {
    await this.init();
  }

  async componentDidLoad() {
    await this.setSwiper();
  }

  async componentDidUnload() {
    await this.swiperDestroy(this._cleanstyles);
  }

  private async _init(): Promise<void> {

    const defParallaxOptions: any = {
      imageUrl: "url(http://lorempixel.com/900/600/nightlife/2/)",
      dataSwiperParallax: "-23%"
    };

    this.parseOptionsProp(this.options ? this.options : null);
    this.parseNotCleanStylesProp(this.notcleanstyles ? this.notcleanstyles : false);
    this.parseParallaxOptions(this.parallaxoptions ? this.parallaxoptions : JSON.stringify(defParallaxOptions));
    this.parsePlayControlsProp(this.playcontrols ? true : false);
    this.parseDataProp(this.data ? this.data : null);
    this.parseStyleProp(this.cstyle ? this.cstyle : null);
    this.parseRtlProp(this.rtl ? true : false);
    return;
  }
  private async _setSwiper(): Promise<void> {
    const { Swiper } = await import('./swiper/swiper.js');

    /**
     * Thumbs Swiper Container if any
     */
    if(this._thumbs) {
      this._swiperThumbsEl = this.el.querySelector('.'+this._thumbsClass);
      if(this.innerData && this.innerData.length > 0 && this._swiperThumbsEl !== null) {
        this._swiperThumbs = new Swiper(this._swiperThumbsEl,this._thumbsOptions);
        this._swiperThumbs.appendSlide(this.innerData);
        this._swiperThumbs.update();
        this.innerOptions.thumbs = {swiper: this._swiperThumbs};
      }
    }

    /**
     * Main Swiper Container
     */
    const swiperEl: HTMLElement = this.el.querySelector('.swiper-container');
    this.innerOptions = this.innerOptions !== null ? this.innerOptions : {};
    this.innerOptions.init = false;
    if(swiperEl !== null) {
      this._swiper = new Swiper(swiperEl,this.innerOptions);
      /**
       * add some events
       */
      
      this._swiper.on('init', () => {
        setTimeout(() => {
          this._didInit = true;
          this.didLoad.emit();
        }, 20);
      });
      this._swiper.on('slideChange',  async () => {
        if (this._didInit) {
          await this.update();
        }
    
        this.slideChange.emit();

        if(this.innerPlayControls) {
          if(this._swiper.isBeginning) {
            this.backward = false;
          } else if(this._swiper.isEnd) {
            this.pause = false;
            this.forward = false;
          } else {
            this.backward = true;
            this.forward = true;
          }
        }        
      });
      this._swiper.on('beforeDestroy',  () => {
        this.beforeDestroy.emit();
      });
      this._swiper.on('tap',  () => {
        this.tap.emit();
      });
      this._swiper.on('doubleTap',  () => {
        this.doubleTap.emit();
      });
      this._swiper.on('slideChangeTransitionStart',  () => {
        this.willChange.emit();
      });
      this._swiper.on('slideChangeTransitionEnd',  () => {
        this.didChange.emit();
      });
      this._swiper.on('slideNextTransitionStart',  () => {
        this.nextStart.emit();
      });
      this._swiper.on('slidePrevTransitionStart',  () => {
        this.prevStart.emit();
      });
      this._swiper.on('slideNextTransitionEnd',  () => {
        this.nextEnd.emit();
      });
      this._swiper.on('slidePrevTransitionEnd',  () => {
        this.prevEnd.emit();
      });
      this._swiper.on('transitionStart',  () => {
        this.transitionStart.emit();
      });
      this._swiper.on('transitionEnd',  () => {

        this.transitionEnd.emit();
      });
      this._swiper.on('sliderMove',  () => {
        this.drag.emit();
      });
      this._swiper.on('reachBeginning',  () => {
        this.reachStart.emit();
      });
      this._swiper.on('reachEnd',  () => {
        this.reachEnd.emit();
      });
      this._swiper.on('touchStart',  async () => {
        this.touchStart.emit();
        this._initial = await this._doHide(2500);
        if(this._autoplay && !this._swiper.autoplay.running && !this.innerPlayControls) this._swiper.autoplay.start();
      });
      this._swiper.on('touchEnd',  () => {
        this.touchEnd.emit();
      });

      /**
       * swiper init
       */  
      this._swiper.init();

      /**
       * add slides
       */
      if(this.innerData && this.innerData.length > 0) {
        await this.appendSlide(this.innerData);
        if (this._lazy) {
          this._swiper.lazy.loadInSlide(0);
          this._swiper.lazy.loadInSlide(1);
        }
        await this.update();
      }

      if(!this.innerPlayControls && this._scrollbar) this._scrollbarEl = swiperEl.querySelector('.swiper-scrollbar');  
      if(!this.innerPlayControls && this._pagination) this._paginationEl = swiperEl.querySelector('.swiper-pagination');
      if(!this.innerPlayControls && this._navigation) {
        this._navButtons = swiperEl.querySelector('.swiper-navigation-buttons');
        this._navPrevEl = this._navButtons.querySelector('.swiper-button-prev');
        this._navNextEl = this._navButtons.querySelector('.swiper-button-next');
        let nextStyle: string = "background-image:var(--navigation-next-background,";
        nextStyle += "url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2027%2044%22%3E%3Cpath%20fill=%22%23007aff%22%20d=%22M27%2022L27%2022L5%2044l-2.1-2.1L22.8%2022L2.9%202.1L5%200z%22/%3E%3C/svg%3E));";
        nextStyle += "right: var(--navigation-position,10px);"
        let constStyle = "width: var(--navigation-width,27px);height: var(--navigation-height,44px);";
        constStyle += "background-size: var(--navigation-width,27px) var(--navigation-height,44px);-moz-background-size: var(--navigation-width,27px) var(--navigation-height,44px);";
        constStyle += "-webkit-background-size: var(--navigation-width,27px) var(--navigation-height,44px);";
        let prevStyle: string = "background-image:var(--navigation-prev-background,";
        prevStyle += "url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2027%2044%22%3E%3Cpath%20fill=%22%23007aff%22%20d=%22M0%2022L22%200l2.1%202.1L4.2%2022l19.9%2019.9L22%2044z%22/%3E%3C/svg%3E));";
        prevStyle += "left: var(--navigation-position,10px);"
        if(this.innerRtl) {
          this._navNextEl.setAttribute("style",prevStyle + constStyle);
          this._navPrevEl.setAttribute("style",nextStyle + constStyle);  
        } else {
          this._navNextEl.setAttribute("style",nextStyle + constStyle);
          this._navPrevEl.setAttribute("style",prevStyle + constStyle);  
        }
      }
      if(this.playcontrols) {
        this._playControlsEl = swiperEl.querySelector('.swiper-playcontrols-buttons');
        this._playBackwardEl = swiperEl.querySelector('.autoplay-button-skip-backward');
        this._playForwardEl = swiperEl.querySelector('.autoplay-button-skip-forward');
      }
      this._initial = await this._doHide(20);

      if(this._autoplay && !this.innerPlayControls) {
            this._swiper.autoplay.start();
      } else {
        this._swiper.autoplay.stop();
      }
    }
    return;
  }
  private async _doVisible(): Promise<void> {
    if(this._scrollbarEl && this._scrollbarEl.classList.contains('hidden')) this._scrollbarEl.classList.remove('hidden');
    if(this._paginationEl && this._paginationEl.classList.contains('hidden')) this._paginationEl.classList.remove('hidden');
    if(this._navButtons && this._navButtons.classList.contains('hidden')) this._navButtons.classList.remove('hidden');
    if(this._playControlsEl && this._playControlsEl.classList.contains('hidden')) this._playControlsEl.classList.remove('hidden');
    if(this._thumbs && this._swiperThumbsEl && this._swiperThumbsEl.classList.contains('hidden')) {
      this._swiperThumbsEl.classList.remove('hidden');
    }
    return;
  }

  private async _doHide(duration:number): Promise<NodeJS.Timeout>{
    clearTimeout( this._initial );
    await this._doVisible();
    let initial: NodeJS.Timeout =  setTimeout( () => {
      if(this._scrollbarEl) this._scrollbarEl.classList.add('hidden');
      if(this._paginationEl) this._paginationEl.classList.add('hidden');
      if(this._navButtons) this._navButtons.classList.add('hidden');
      if(this._playControlsEl) this._playControlsEl.classList.add('hidden');
      if(this._thumbs && this._swiperThumbsEl) {
        this._swiperThumbsEl.classList.add('hidden');
      }
    }, duration);
    return initial;
  }

  private _handleClick(event) {
    if(event.target.classList.contains('autoplay-button-play')) {
      if(this._swiper.isEnd) {
        this._swiper.slideTo(0,0,false);
        this.forward = true;
      }
      this._swiper.autoplay.start();
      this.pause = true;
    } else if(event.target.classList.contains('autoplay-button-skip-backward')) {
      this._swiper.slidePrev(0,false);
    } else if(event.target.classList.contains('autoplay-button-skip-forward')) {
      this._swiper.slideNext(0,false);
    } else {
      this._swiper.autoplay.stop();
        this.pause = false;
    }
  }

  render() {
    let toRender: any[] = [];
    if(this.innerData && this.innerData.length > 0) {
      // swiper-container elements
      let swiperContent: any[] = [];
      // add parallax-bg if any
      if(this._parallax) {
        if(this.innerParallaxOptions.dataSwiperParallax) {
          swiperContent = [...swiperContent,
            <div class="parallax-bg"
              style= {this._parallaxStyle}
              data-swiper-parallax={this.innerParallaxOptions.dataSwiperParallax}>
            </div>];  
        } if(this.innerParallaxOptions.dataSwiperParallaxX && this.innerParallaxOptions.dataSwiperParallaxY) {
          swiperContent = [...swiperContent,
            <div class="parallax-bg"
              style= {this._parallaxStyle}
              data-swiper-parallax-x={this.innerParallaxOptions.dataSwiperParallaxX} 
              data-swiper-parallax-y={this.innerParallaxOptions.dataSwiperParallaxY}>
            </div>];  

        } else if(this.innerParallaxOptions.dataSwiperParallaxX) {
          swiperContent = [...swiperContent,
            <div class="parallax-bg"
              style= {this._parallaxStyle}
              data-swiper-parallax-x={this.innerParallaxOptions.dataSwiperParallaxX}>
            </div>];  
        } else if(this.innerParallaxOptions.dataSwiperParallaxY) {
          swiperContent = [...swiperContent,
            <div class="parallax-bg"
              style= {this._parallaxStyle}
              data-swiper-parallax-y={this.innerParallaxOptions.dataSwiperParallaxY}>
            </div>];  
        }
      }
      // add swiper-wrapper
      swiperContent = [...swiperContent,
        <div class="swiper-wrapper">
        </div>
      ];
      // add swiper-scrollbar if any
      if(!this.innerPlayControls && this._scrollbar) {
        swiperContent = [...swiperContent,
          <div class="swiper-scrollbar"></div>];  
      }
      // add swiper-pagination if any
      if(!this.innerPlayControls && this._pagination) {
        swiperContent = [...swiperContent,
          <div class="swiper-pagination"></div>];
      }
      // add swiper-navigation-buttons id any
      if(!this.innerPlayControls && this._navigation) {
        swiperContent = [...swiperContent,
          <div class="swiper-navigation-buttons">
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
          </div>]; 
      }
      // add swiper-playcontrols-buttons if any
      if(this.innerPlayControls) {
        swiperContent = [...swiperContent,
          <div class="swiper-playcontrols-buttons">
            {this.backward
            ? <div class="swiper-playcontrols-button autoplay-button-skip-backward" onClick={ (event: UIEvent) => this._handleClick(event)}></div>
            : null
            }
            {this.pause
            ? <div class="swiper-playcontrols-button autoplay-button-pause" onClick={ (event: UIEvent) => this._handleClick(event)}></div>
            : <div class="swiper-playcontrols-button autoplay-button-play" onClick={ (event: UIEvent) => this._handleClick(event)}></div>
            }      
            {this.forward
            ? <div class="swiper-playcontrols-button autoplay-button-skip-forward" onClick={ (event: UIEvent) => this._handleClick(event)}></div>
            : null
            }
          </div>];
      }
      // swiper-container-thumbs elements if any
      let swiperThumbsContent: any[] = [];
      if(this._thumbs) {
        // add swiper-wrapper
        swiperThumbsContent = [...swiperThumbsContent,
          <div class="swiper-wrapper">
          </div>
        ];
      }
      toRender = [...toRender,
        <style>{this.innerStyle}</style>,
        <div class="container">
          { this.innerRtl
          ?<div class="swiper-container" dir='rtl'>          
            {swiperContent}
          </div>
          :<div class="swiper-container">
            {swiperContent}
          </div>
          }
          { this._thumbs
          ?
            <div class={"swiper-container " + this._thumbsClass + " gallery-thumbs"}>
              {swiperThumbsContent}
            </div>
          :
            null
          }
        </div>
      ];
    } else {
      toRender = [...toRender,
        <div id='fake-card'></div>
      ];
    }
    return (
      <Host>{toRender}</Host>  
    );

  }
}