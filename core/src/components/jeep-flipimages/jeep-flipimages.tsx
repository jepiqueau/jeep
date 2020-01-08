import { Component, Host, h, Element, Prop, State, Watch, Method, Event, EventEmitter, Listen } from '@stencil/core';
import { convertCSSNumber }  from '../../utils/common';
import { Point, Rect } from '../../global/interfaces/geom';
import { flipImagesLocalCssVariables } from '../../global/interfaces/jeep-flipimages';

@Component({
  tag: 'jeep-flipimages',
  styleUrl: 'jeep-flipimages.css',
  shadow: true
})
export class JeepFlipimages {
  @Element() el!: HTMLJeepFlipimagesElement;

  //************************
  //* Property Definitions *
  //************************
  /**
   * The type of image horizontal or vertical
   */
  @Prop({
    reflectToAttr: true
  }) type: string = "horizontal";
  /**
   * The container padding
   */
  @Prop({
    reflectToAttr: true
  }) fpadding: string = "0";

  //*****************************
  //* Watch on Property Changes *
  //*****************************
  @Watch('type')
  parseTypeProp(newValue: string) {
    this.innerType = newValue && this._typeArray.indexOf(newValue) >= 0 ? newValue : "horizontal";
  }
  @Watch('fpadding')
  parseFpaddingProp(newValue: string) {
    this.innerPadding = newValue ? parseFloat(newValue) : 0;
  }

  //*********************
  //* State Definitions *
  //*********************
  @State() innerType: string;
  @State() innerPadding: number;
  @State() toggle: boolean;
  @State() imageRatio: number;
  @State() defBlocks: boolean = false;

  //*********************
  //* Event Definitions *
  //*********************

  /**
   * Emitted when the first image is loaded
   */
  @Event({eventName:'jeepFlipImagesImgLoaded'}) dimImgloaded: EventEmitter<HTMLImageElement>;

  //*******************************
  //* Listen to Event Definitions *
  //*******************************

  @Listen('jeepFlipImagesImgLoaded')
  async handleDimImgloaded(event:CustomEvent) {
    let img: HTMLImageElement = event.detail;
    this._preload(this._imagesUrl,2,this._imagesUrl.length-1);
    this.imageRatio = img.naturalHeight / img.naturalWidth;
    this._bbContainer = this._container.getBoundingClientRect();

    this._imageWidth = this._bbContainer.width - 2 * this.innerPadding - 
      2 * convertCSSNumber(this._localCSS.borderWidth) - 2 * convertCSSNumber(this._localCSS.shadowWidth);
    this._imageHeight = Math.floor(this._imageWidth*this.imageRatio);
    await this._checkImageWidthHeight();   

    this._container.removeChild(this._imgDim);
    this._flipToggle = this._container.querySelector('#flip-toggle');
    if(this.innerType === "vertical" ) {
      this._backImg1 = this._flipToggle.querySelector('#image-back-left');
      this._backImg2 = this._flipToggle.querySelector('#image-back-right');
      this._frontImg1 = this._flipToggle.querySelector('#image-front-left');
      this._frontImg2 = this._flipToggle.querySelector('#image-front-right');
    } else {
      this._backImg1 = this._flipToggle.querySelector('#image-back-top');
      this._backImg2 = this._flipToggle.querySelector('#image-back-bottom');
      this._frontImg1 = this._flipToggle.querySelector('#image-front-top');
      this._frontImg2 = this._flipToggle.querySelector('#image-front-bottom');        
    }
    this._setCssProperties();
    this._flipToggle.classList.add("flipvisible")
    this.defBlocks = true;
  }

  //**********************
  //* Method Definitions *
  //**********************
  /**
   * Method initialize
   */
  @Method()
  async init(): Promise<void> {
    return await this._init();
  }
 
  //**********************************
  //* Internal Variables Declaration *
  //**********************************
  _window: Window | any;
  _document: Document | any;
  _root:Element | any;
  _wSize: Rect;
  _images: Array<any>;
  _imagesUrl: Array<string>;
  _alts: Array<string>;
  _flipElements: any;
  _mouseStart: boolean;
  _mouseMove: boolean;
  _stPoint: Point;
  _mvPoint: Point;
  _imageWidth: number;
  _imageHeight: number;
  _container: HTMLElement;
  _bbContainer: ClientRect;
  _flipToggle: HTMLElement;
  _frontImg1: HTMLElement;
  _frontImg2: HTMLElement;
  _backImg1: HTMLElement;
  _backImg2: HTMLElement;
  _indexFront: number;
  _indexBack: number;
  _flipUp: boolean;
  _flipLeft: boolean;
  _first:boolean;
  _top:boolean;
  _left:boolean;
  _doToggle:boolean;
  _element: any;
  _p_header: number;
  _typeArray: Array<string> = ['horizontal','vertical'];
  _containerWidth: number;
  _imgDim : HTMLDivElement; 
  _localCSS: flipImagesLocalCssVariables = {};
  

  //*******************************
  //* Component Lifecycle Methods *
  //*******************************
  async componentWillLoad() {
    this._window = window;
    await this._init();
    this._window.addEventListener('resize',async () => {
      this._bbContainer = this._container.getBoundingClientRect();
      
      this._imageWidth = this._bbContainer.width - 2 * this.innerPadding - 
        2 * convertCSSNumber(this._localCSS.borderWidth) - 2 * convertCSSNumber(this._localCSS.shadowWidth);
      this._imageHeight = Math.floor(this._imageWidth*this.imageRatio);
      await this._checkImageWidthHeight();
      this._setCssProperties();
      this.defBlocks = true;
  
    },false);
  }
  async componentDidLoad() {
    if(this._flipElements != null)
    {
      this._getImageDim();
    }
  }

  //******************************
  //* Private Method Definitions *
  //******************************
  private async _init(): Promise<void> {
    this._document = this._window.document;
    this._root = this._document.documentElement;
    this._element = this.el.shadowRoot;
    // reading properties
    this.parseTypeProp(this.type ? this.type : "horizontal");
    this.parseFpaddingProp(this.fpadding ? this.fpadding : "0");
    this._getElementList();
    this._indexFront = 0;
    this._indexBack = this._imagesUrl.length > 1 ? 1 : 0;
    this.toggle = false;
    this._flipUp = false;
    this._flipLeft = false;
    this._mouseStart = false;
    this._mouseMove = false;
    this._flipElements = null;
    this._first = true;
//  reading local css variables
    this._localCSS.shadowWidth = window.getComputedStyle(this.el).getPropertyValue('--flipimages-shadow-width');
    this._localCSS.shadowColor = window.getComputedStyle(this.el).getPropertyValue('--flipimages-shadow-color');
    this._localCSS.borderWidth = window.getComputedStyle(this.el).getPropertyValue('--flipimages-border-width');
    this._localCSS.borderColor = window.getComputedStyle(this.el).getPropertyValue('--flipimages-border-color');
    this.el.style.setProperty('--container-padding',this.innerPadding.toString()+'px');
    return
  }
  // ---- Deal with Utilities ----
  private _getImageDim() { 
    this._container = this._element.querySelector('.container');
    this._imgDim = this._container.querySelector('.image-dim');
    let img: HTMLImageElement  = this._imgDim.querySelector('img');
    img.onload = async () => {
      this._images = [];
      await this._preload(this._imagesUrl,0,1);
      this.dimImgloaded.emit(img);
    };
  }
  private _setCssProperties() {
    this.el.style.setProperty('--image-height',this._imageHeight.toString()+'px');
    this.el.style.setProperty('--image-width',this._imageWidth.toString()+'px');
    this.el.style.setProperty('--container-padding',this.innerPadding.toString()+'px');
  }

  private async _preload(imageArray: Array<string>,start:number,end:number): Promise<void> {
    return new Promise<any>(async (resolve) => {
      for(let i:number =start; i < end +1; i++) {
        if(imageArray[i].substring(0,4) === 'http') {
          let retVal:any = await this._toDataUrl(imageArray[i]);
          this._images = [...this._images, retVal];
        } else {
          this._images = [...this._images, imageArray[i]];
        }
        if(i === end) resolve();
      }
    });
  }
  private async _toDataUrl(url:string): Promise<any> {
    return new Promise<any>((resolve) => {
      fetch(url, {
        method: 'GET'
      }).then((res) => {
          return res.blob();
      }).then((blob) => {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            resolve(reader.result);
          }, false);
          reader.readAsDataURL(blob);
      }).catch( async (err) => {
          console.log('Error: ',err.message)
          resolve()
      });
    });
  }
  private _getElementList(): void {
    this._imagesUrl = [];
    this._alts = [];
    for (let i:number =0 ;i< this.el.childElementCount;i++) {
      this._imagesUrl.push(this.el.children[i].getAttribute('src'));
      this._alts.push(this.el.children[i].getAttribute('alt'));
    }
    this._removeChilds(this.el);
  }
  private _removeChilds(el)  {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
  }
  private async _checkImageWidthHeight(): Promise<void> {
    let maxHeight:number = Math.floor(this._bbContainer.height - 2 * this.innerPadding - 
      2 * convertCSSNumber(this._localCSS.borderWidth) - 
      2 * convertCSSNumber(this._localCSS.shadowWidth));

    if(this._imageHeight > maxHeight) {
      this._imageHeight = maxHeight;
      this._imageWidth = Math.floor(this._imageHeight / this.imageRatio);
    }
    return
  }

  /* ---- Deal with handling event  */
  private _handleMoveEventTarget() {
    if(this.innerType === "horizontal") {
        // type horizontal
      if(this._stPoint.y < this._bbContainer.height / 2) {
        // top part
        this._top = true;
        if(this._mvPoint.y < this._stPoint.y) {
          // flip up
          this._flipUp = true;
        } else {
          // flip down
          this._flipUp = false;        
        }
      } else {
        // bottom part
        this._top = false;
        if(this._mvPoint.y < this._stPoint.y) {
          // flip up
          this._flipUp = true;
        } else {
          // flip down
          this._flipUp = false;       
        }
      }
    } else if(this.innerType === 'vertical') {
      // type vertical
      if(this._stPoint.x < this._bbContainer.width / 2) {
        // left part
        this._left = true;
        if(this._mvPoint.x < this._stPoint.x) {
          // flip left
          this._flipLeft = true;
        } else {
          // flip right
          this._flipLeft = false;        
        }
      } else {
        // right part
        this._left = false;
        if(this._mvPoint.x < this._stPoint.x) {
          // flip left
          this._flipLeft = true;
        } else {
          // flip right
          this._flipLeft = false;       
        }
      }      
    } 
  }
  private _handleEndEventTarget(){
    if(this._flipToggle.classList) {
      if(this.innerType === "horizontal") {
        // type horizontal
        this._handleToggle(this._top,this._flipUp);
      } else if (this.innerType === "vertical") {
        // type vertical
        this._handleToggle(this._left,this._flipLeft);
      }
    }
  }
  private _handleToggle(block:boolean,flip:boolean) {
    if(!this.toggle) {
      if(block) {
        this._doToggle = true;
        if(!flip) {
          this._indexFront = this._indexBack + 1;
          if(this._indexFront === this._images.length) this._indexFront = 0;
        } else {
          this._indexBack = this._indexFront - 1;
          if(this._indexBack === -1) this._indexBack = this._images.length - 1;
        }
        this._flipToggle.classList.toggle("toggle");
        this.toggle = !this.toggle;    
      } else {
        this._doToggle = false;
      }
    } else {
      if(!block) {
        this._doToggle = true;
        if(!flip) {
          this._indexFront = this._indexBack - 1;
          if(this._indexFront < 0 ) this._indexFront = this._images.length - 1;                
        } else {
          this._indexBack = this._indexFront + 1;
          if(this._indexBack === this._images.length) this._indexBack = 0;                
        }
        this._flipToggle.classList.toggle("toggle");
        this.toggle = !this.toggle;    
      } else {
        this._doToggle = false;
      }
    }
  }
  private _handleMouseDown(ev) {
      ev.preventDefault();
      this._stPoint = {x: ev.pageX, y: ev.pageY}
      this._mouseMove = false;
      this._mouseStart = true;
  }
  private _handleMouseMove(ev) {
      ev.preventDefault();
      if(this._mouseStart) {
        this._mouseMove = true;
        this._mvPoint = {x: ev.pageX, y: ev.pageY}
        this._handleMoveEventTarget();      
      }
  }
  private _handleMouseEnd() {
      if(this._mouseMove) {
        this._handleEndEventTarget();
        this._mouseStart = false;
        this._mouseMove = false;
      }
  }
  private _handleTouchStart(ev) {
      ev.preventDefault();
      this._stPoint = {x: ev.touches[0].pageX, y: ev.touches[0].pageY}
      this._mouseStart = true;
  }
  private _handleTouchMove(ev) {
      ev.preventDefault();
      this._mvPoint = {x: ev.touches[0].pageX, y: ev.touches[0].pageY}
      this._mouseMove = true;
      this._handleMoveEventTarget();
  }
  private _handleTouchEnd() {
      if(this._mouseMove) {
        this._handleEndEventTarget();
        this._mouseStart = false;
        this._mouseMove = false;
      }
  } 

  //*************************
  //* Rendering JSX Element *
  //*************************

  renderFlipImages() {
    if(this._first) {
      this._first = false;
      this._frontImg1.setAttribute('src',this._images[this._indexFront]);
      this._frontImg2.setAttribute('src',this._images[this._indexFront]);
      this._backImg1.setAttribute('src',this._images[this._indexBack]);
      this._backImg2.setAttribute('src',this._images[this._indexBack]);
      if(this._alts[this._indexFront] !== null) {
        this._frontImg1.setAttribute('alt',this._alts[this._indexFront]);
        this._frontImg2.setAttribute('alt',this._alts[this._indexFront]);
      }
      if(this._alts[this._indexBack] !== null) {
        this._backImg1.setAttribute('alt',this._alts[this._indexBack]);
        this._backImg2.setAttribute('alt',this._alts[this._indexBack]);
      }
    } else {
      if(this._doToggle) {
        if (!this.toggle) {
          this._frontImg1.setAttribute('src',this._images[this._indexFront]);
          this._frontImg2.setAttribute('src',this._images[this._indexFront]);
          if(this._alts[this._indexFront] !== null) {
            this._frontImg1.setAttribute('alt',this._alts[this._indexFront]);
            this._frontImg2.setAttribute('alt',this._alts[this._indexFront]);
          }
        } else {
          this._backImg1.setAttribute('src',this._images[this._indexBack]);
          this._backImg2.setAttribute('src',this._images[this._indexBack]);
          if(this._alts[this._indexBack] !== null) {
            this._backImg1.setAttribute('alt',this._alts[this._indexBack]);
            this._backImg2.setAttribute('alt',this._alts[this._indexBack]);
          }
        }
      }
    }
  }

  render() {
        
    if(this._flipElements === null) {
      // initial definition
      if(this.innerType == 'horizontal') {
        this._flipElements= [
          <div class="container">
            <div class="image-dim">
              <img src={this._imagesUrl[0]} alt={this._alts[0]}></img>
             </div>
            <div class='flip-container horizontal' id='flip-toggle'
              onMouseDown={this._handleMouseDown.bind(this)} 
              onMouseMove={this._handleMouseMove.bind(this)} 
              onMouseUp={this._handleMouseEnd.bind(this)} 
              onTouchStart={this._handleTouchStart.bind(this)} 
              onTouchMove={this._handleTouchMove.bind(this)} 
              onTouchEnd={this._handleTouchEnd.bind(this)}>
              <div class='back-top' id='back-top'>
                <div class='image-back-top'>
                  <img id='image-back-top'></img>
                </div>
              </div>
              <div class='flipper' id='flipper'>
                <div class='front-top' id='front-top'>
                    <div class='image-front-top'>
                      <img id='image-front-top'></img>
                    </div>
                </div>
                <div class='back-bottom' id='back-bottom'>
                    <div class='image-back-bottom'>
                      <img id='image-back-bottom'></img>
                    </div>
                </div>
              </div>
              <div class='front-bottom' id='front-bottom'>
                <div class='image-front-bottom'>
                  <img id='image-front-bottom'></img>
                </div>
              </div>
            </div>
          </div>
        ]
      } else if(this.innerType == 'vertical') {
        this._flipElements= [
          <div class="container">
            <div class="image-dim">
              <img src={this._imagesUrl[0]} alt={this._alts[0]}></img>
            </div>
            <div class='flip-container vertical' id='flip-toggle'
              onMouseDown={this._handleMouseDown.bind(this)} 
              onMouseMove={this._handleMouseMove.bind(this)} 
              onMouseUp={this._handleMouseEnd.bind(this)} 
              onTouchStart={this._handleTouchStart.bind(this)} 
              onTouchMove={this._handleTouchMove.bind(this)} 
              onTouchEnd={this._handleTouchEnd.bind(this)}>
              <div class='back-left' id='back-left'>
                <div class='image-back-left'>
                  <img id='image-back-left'></img>
                </div>
              </div>
              <div class='flipper' id='flipper'>
                <div class='front-left' id='front-left'>
                    <div class='image-front-left'>
                      <img id='image-front-left'></img>
                    </div>
                </div>
                <div class='back-right' id='back-right'>
                    <div class='image-back-right'>
                      <img id='image-back-right'></img>
                    </div>
                </div>
              </div>
              <div class='front-right' id='front-right'>
                <div class='image-front-right'>
                  <img id='image-front-right'></img>
                </div>
              </div>
            </div>
          </div>
        ]
      } else {
        this._flipElements = null        
      }

    } else {
      // update
      if (this.defBlocks) this.renderFlipImages();
    }
    return (
      <Host>
        <slot>
          {this._flipElements}
        </slot>
      </Host>
    );
  }
}
