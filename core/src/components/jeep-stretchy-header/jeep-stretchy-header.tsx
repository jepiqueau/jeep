import { Component, Host, h, Element, Prop, State, Watch, Method, Event, EventEmitter  } from '@stencil/core';
import { Point } from '../../global/interfaces/geom';
import { StretchyHeaderToolbar } from '../../global/interfaces/stretchyheader';
import { getValueFromCss, cssVar } from '../../utils/common';

@Component({
  tag: 'jeep-stretchy-header',
  styleUrl: 'jeep-stretchy-header.css',
  shadow: true
})
export class JeepStretchyHeader {
  @Element() el!: HTMLJeepStretchyHeaderElement;

  //************************
  //* Property Definitions *
  //************************
  /**
   * The Header Height
   */
  @Prop() headerheight: string = "20%";

  /**
   * The Header Background Linear Gtradient if any and Url
   *  headerbackground="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.75)) , 
   *  url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/italy-mountains.jpeg)"
   *
   */
  @Prop() headerbackground: string = "url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/lake-sunset-twilight.jpeg)";
  
  /**
   * The blur effect
   */
  @Prop() headerbackgroundblur: boolean = false;

  /**
   * The Navbar Contrast Color
   */
  @Prop() toolbarcontrastcolor: string = "#ffffff";


  @State() innerHeadHeight: string;
  @State() innerUrl: string;
  @State() innerGradient: string;
  @State() innerBlur: boolean = false;
  @State() innerContrastCol: string;

  //*****************************
  //* Watch on Property Changes *
  //*****************************
  @Watch('headerheight')
  async parseHeaderHeight(newValue: string) {
    this._heightIni = newValue ? await getValueFromCss(newValue,'y') : await getValueFromCss("20%",'y');
    const headHeight = cssVar(this.el,"--jeep-stretchy-header-height",`${this._heightIni}px`);
    this._height = this._heightIni;
    this.innerHeadHeight = headHeight;

  }

  @Watch('headerbackground')
  parseHeaderBackground(newValue: string) {
    this.innerUrl = newValue ? newValue : "url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/lake-sunset-twilight.jpeg)";
  }

  @Watch('headerbackgroundblur')
  parseBlur(newValue: boolean) {
    this.innerBlur = newValue ? newValue : false;
  }

  @Watch('toolbarcontrastcolor')
  parseToolbarContrastColor(newValue: string) {
    this.innerContrastCol = newValue ? newValue : "#ffffff";
  }

  //*********************
  //* Event Definitions *
  //*********************
  /**
   * Emitted the Header visibility change
   */

  @Event({eventName:'jeepStretchyHeaderToolbar'}) onStretchyHeaderToolbar: EventEmitter<StretchyHeaderToolbar>;

  //*******************************
  //* Listen to Event Definitions *
  //*******************************

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
  //*********************************
  //* Internal Variable Definitions *
  //*********************************

  private _window: Window | any;
  private _document: Document | any;
  private _root:Element | any;
  private _element: any;
  private _header: HTMLDivElement;
  private _mouseStart: boolean = false;
  private _ptStart:Point = {} as Point;
  private _headerBackground: HTMLDivElement;
  private _ionHeader?: any;
  private _ionToolbar?: any;
  private _ionContent?: any;
  private _heightIni: number;
  private _height:number;
  private _minHeight: number;
  private _isScroll:boolean = false;
  private _scrollTop: number = 0;
  private _prevScrollTop: number = -1;
  private _ionColor: string;
  private _ionColorContrast: string;

  //*******************************
  //* Component Lifecycle Methods *
  //*******************************

  async componentWillLoad() {
    this._window = window;
    await this.init();
  }
  async componentDidLoad() {
    this._header = this._element.querySelector('.stretchy-header');
    this._header.style.setProperty('height',this.innerHeadHeight);
    this._headerBackground = this._element.querySelector('.stretchy-header-background');
    this._headerBackground.style.setProperty("background-image",this.innerUrl);
    this._ionHeader = this.el.querySelector('ion-header');
    this._ionToolbar = this._ionHeader.querySelector('ion-toolbar');
    this._ionContent = this.el.parentNode.querySelector('ion-content');
    if(this._ionHeader) await this._setHeader();
    if(this._ionToolbar) await this._setToolbar();
    if(this._ionContent) await this._setContent();
    if(this._header.classList.contains("back")) this._header.classList.remove("back");
    if(this.innerBlur && this._headerBackground.classList.contains("blur")) this._headerBackground.classList.remove("blur");
  }

  //******************************
  //* Private Method Definitions *
  //******************************


  private async _init(): Promise<void> {
    this._document = this._window.document;
    this._root = this._document.documentElement;
    this._element = this.el.shadowRoot;
    this.parseHeaderHeight(this.headerheight ? this.headerheight : "20%");
    this.parseHeaderBackground(this.headerbackground ? this.headerbackground : "url(https://ununsplash.imgix.net/photo-1421091242698-34f6ad7fc088?fit=crop&fm=jpg&h=650&q=75&w=950)");
    this.parseBlur(this.headerbackgroundblur ? this.headerbackgroundblur : false);
    this.parseToolbarContrastColor(this.toolbarcontrastcolor ? this.toolbarcontrastcolor : null);
    return;
  }
  private async _setHeader(): Promise<void> {
    this._ionHeader.style.setProperty("position", "absolute");
    this._ionHeader.style.setProperty("top", "0");
    this._ionHeader.style.setProperty("left", "0");
    return;
  }
  private async _setToolbar(): Promise<void> {
    const color: string = this._ionToolbar.color;
    this._ionColor = cssVar(this._root,`--ion-color-${color}`);
    this._ionColorContrast = cssVar(this._root,`--ion-color-${color}-contrast`);
    this._minHeight = this._ionToolbar.classList.contains('ios') ? 44 : 56;
    this._setTranslucent('add');
    return;
  }
  private async _setContent(): Promise<void> {
    this._ionContent.scrollEvents = true;

    this._ionContent.addEventListener('ionScrollStart', async () => {
      if(this._height < this._heightIni) {
        this._isScroll = true;
        this._mouseStart = false;
        if(this._prevScrollTop === -1 ) {
          this._prevScrollTop = 0;
          await this._ionContent.scrollToTop(); 
        }  
      }
    });

    this._ionContent.addEventListener('ionScroll', async (ev) => {
      if(this._height < this._heightIni) {
        if(!this._isScroll) this._isScroll= true;
        this._scrollTop = ev.detail.scrollTop;
        this._height -= this._scrollTop;
        this._height = this._height <= this._minHeight ? this._minHeight : this._height;
        if(this._height > this._minHeight) {
          this._setTranslucent('add');
          await this._ionContent.scrollToTop();
          this._prevScrollTop = -1;
        } else {
          this._setTranslucent('remove');
        }
        this._header.style.setProperty('height',`${this._height}px`);
        if(this._prevScrollTop !== -1 && this._scrollTop === 0) {
          this._setTranslucent('remove');
          this._isScroll = false;
          this._mouseStart = true;
        } 
        this._prevScrollTop = this._scrollTop;
      }

    });

    this._ionContent.addEventListener('ionScrollEnd', () => {
        this._isScroll = false;
    });

    this._ionContent.addEventListener('touchstart', (ev) => {
      if(!this._isScroll && this._prevScrollTop <= 0) {
        this._handleStart(ev);
      }
    });
    this._ionContent.addEventListener('touchmove', (ev) => {
      this._handleMove(ev);
    });

    this._ionContent.addEventListener('touchend', () => {
      if(this._mouseStart) {
        this._handleEnd();
      }
    });

    this._ionContent.addEventListener('mousedown', (ev) => {
      if(!this._isScroll && this._prevScrollTop <= 0) {
        this._handleStart(ev);
      }
    });

    this._ionContent.addEventListener('mousemove', (ev) => {
      this._handleMove(ev);
    });
    this._ionContent.addEventListener('mouseup', () => {
      if(this._mouseStart) {
        this._handleEnd();
      }
    });
    this._ionContent.addEventListener('mouseleave', () => {
      if(this._mouseStart) {
        this._handleEnd();
      }
    });   
  }

  private _setTranslucent(mode:string) {
    if (mode === 'add') {
      this.onStretchyHeaderToolbar.emit({
        color: `${this._ionColor}00`,
        contrastColor: this.innerContrastCol
      });
    } else if (mode === 'remove') {
      this.onStretchyHeaderToolbar.emit({
        color: this._ionColor,
        contrastColor: this._ionColorContrast
      });
    }
  }
  private _handleStart(ev) {
    this._ptStart = ev.touches && ev.touches[0] ? {x: ev.touches[0].pageX, y: ev.touches[0].pageY} : {x: ev.pageX, y: ev.pageY};
    if(!this._isScroll &&  this._height >= this._minHeight) {
      this._mouseStart = true;
    }

  }
  private async _handleMove(ev) {
    const pt  = ev.touches && ev.touches[0] ? {x: ev.touches[0].pageX, y: ev.touches[0].pageY} : {x: ev.pageX, y: ev.pageY};
    const dy:number = pt.y - this._ptStart.y;
    this._ptStart = {x:pt.x,y:pt.y};
    if(this._mouseStart && !this._isScroll) {
      this._height +=  dy;
      if(dy > 0) {
        this._setTranslucent('add');
        if(this._height > this._heightIni + 2) {
          if(this.innerBlur && this._headerBackground.classList.contains('unblur')) this._headerBackground.classList.remove("unblur");
          if(this._header.classList.contains('back')) this._header.classList.remove('back'); 
          if(this.innerBlur && !this._headerBackground.classList.contains('blur')) this._headerBackground.classList.add("blur");
        }
      } else {
        if(this.innerBlur && this._headerBackground.classList.contains('blur')) this._headerBackground.classList.remove("blur");
        if(this.innerBlur && !this._headerBackground.classList.contains('unblur')) this._headerBackground.classList.add("unblur");
        if (this._height <= this._heightIni) {
          if(this._header.classList.contains('back')) this._header.classList.remove('back'); 
        }
        if(this._height <= this._minHeight) {
          this._height = this._minHeight;
          this._setTranslucent('remove');
        } else {
          this._setTranslucent('add');
        }
      }
      this._header.style.setProperty('height',`${this._height}px`);
      if( this._height >= this._heightIni) await this._ionContent.scrollToTop();

    }
  }

  private async _handleEnd() {
    if(!this._isScroll) {
      if(this._height >= this._heightIni) {
        if(!this._header.classList.contains('back')) this._header.classList.add('back');
        if(this.innerBlur && this._headerBackground.classList.contains('blur')) this._headerBackground.classList.remove("blur");
        if(this.innerBlur && !this._headerBackground.classList.contains('unblur')) this._headerBackground.classList.add("unblur");
        this._height = this._heightIni;   
        this._header.style.setProperty('height',`${this._height}px`);
      } else {
        if(this._header.classList.contains('back')) this._header.classList.remove('back'); 
        if(this._height <= this._minHeight + 2) {
          this._height = this._minHeight;   
          this._setTranslucent('remove');
          if(this.innerBlur && this._headerBackground.classList.contains("blur")) this._headerBackground.classList.remove("blur") ;
          if(this.innerBlur && this._headerBackground.classList.contains('unblur')) this._headerBackground.classList.remove("unblur");
        }         
        this._header.style.setProperty('height',`${this._height}px`);
      }

    }
    if(this.innerBlur && this._headerBackground.classList.contains('unblur')) this._headerBackground.classList.remove("unblur");
    this._mouseStart = false;

  }


  render() {
    return (
      <Host>
        <div class="stretchy-header">
          <div class="stretchy-header-background">
          </div>
          <slot></slot>
        </div>
      </Host>
    );
  }

}
