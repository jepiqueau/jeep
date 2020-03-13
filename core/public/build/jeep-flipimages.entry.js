import { r as registerInstance, c as createEvent, h, H as Host, d as getElement } from './core-7a7a831b.js';
import { c as convertCSSNumber } from './common-9d7d4db4.js';

const JeepFlipimages = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //************************
        //* Property Definitions *
        //************************
        /**
         * The type of image horizontal or vertical
         */
        this.type = "horizontal";
        /**
         * The container padding
         */
        this.fpadding = "0";
        this.defBlocks = false;
        this._typeArray = ['horizontal', 'vertical'];
        this._localCSS = {};
        this.dimImgloaded = createEvent(this, "jeepFlipImagesImgLoaded", 7);
    }
    //*****************************
    //* Watch on Property Changes *
    //*****************************
    parseTypeProp(newValue) {
        this.innerType = newValue && this._typeArray.indexOf(newValue) >= 0 ? newValue : "horizontal";
    }
    parseFpaddingProp(newValue) {
        this.innerPadding = newValue ? parseFloat(newValue) : 0;
    }
    //*******************************
    //* Listen to Event Definitions *
    //*******************************
    async handleDimImgloaded(event) {
        let img = event.detail;
        this._preload(this._imagesUrl, 2, this._imagesUrl.length - 1);
        this.imageRatio = img.naturalHeight / img.naturalWidth;
        this._bbContainer = this._container.getBoundingClientRect();
        this._imageWidth = this._bbContainer.width - 2 * this.innerPadding -
            2 * convertCSSNumber(this._localCSS.borderWidth) - 2 * convertCSSNumber(this._localCSS.shadowWidth);
        this._imageHeight = Math.floor(this._imageWidth * this.imageRatio);
        await this._checkImageWidthHeight();
        this._container.removeChild(this._imgDim);
        this._flipToggle = this._container.querySelector('#flip-toggle');
        if (this.innerType === "vertical") {
            this._backImg1 = this._flipToggle.querySelector('#image-back-left');
            this._backImg2 = this._flipToggle.querySelector('#image-back-right');
            this._frontImg1 = this._flipToggle.querySelector('#image-front-left');
            this._frontImg2 = this._flipToggle.querySelector('#image-front-right');
        }
        else {
            this._backImg1 = this._flipToggle.querySelector('#image-back-top');
            this._backImg2 = this._flipToggle.querySelector('#image-back-bottom');
            this._frontImg1 = this._flipToggle.querySelector('#image-front-top');
            this._frontImg2 = this._flipToggle.querySelector('#image-front-bottom');
        }
        this._setCssProperties();
        this._flipToggle.classList.add("flipvisible");
        this.defBlocks = true;
    }
    //**********************
    //* Method Definitions *
    //**********************
    /**
     * Method initialize
     */
    async init() {
        return await this._init();
    }
    //*******************************
    //* Component Lifecycle Methods *
    //*******************************
    async componentWillLoad() {
        this._window = window;
        await this._init();
        this._window.addEventListener('resize', async () => {
            this._bbContainer = this._container.getBoundingClientRect();
            this._imageWidth = this._bbContainer.width - 2 * this.innerPadding -
                2 * convertCSSNumber(this._localCSS.borderWidth) - 2 * convertCSSNumber(this._localCSS.shadowWidth);
            this._imageHeight = Math.floor(this._imageWidth * this.imageRatio);
            await this._checkImageWidthHeight();
            this._setCssProperties();
            this.defBlocks = true;
        }, false);
    }
    async componentDidLoad() {
        this._element = this.el.shadowRoot;
        if (this._flipElements != null) {
            this._getImageDim();
        }
    }
    //******************************
    //* Private Method Definitions *
    //******************************
    async _init() {
        this._document = this._window.document;
        this._root = this._document.documentElement;
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
        this.el.style.setProperty('--container-padding', this.innerPadding.toString() + 'px');
        return;
    }
    // ---- Deal with Utilities ----
    _getImageDim() {
        this._container = this._element.querySelector('.container');
        this._imgDim = this._container.querySelector('.image-dim');
        let img = this._imgDim.querySelector('img');
        img.onload = async () => {
            this._images = [];
            await this._preload(this._imagesUrl, 0, 1);
            this.dimImgloaded.emit(img);
        };
    }
    _setCssProperties() {
        this.el.style.setProperty('--image-height', this._imageHeight.toString() + 'px');
        this.el.style.setProperty('--image-width', this._imageWidth.toString() + 'px');
        this.el.style.setProperty('--container-padding', this.innerPadding.toString() + 'px');
    }
    async _preload(imageArray, start, end) {
        return new Promise(async (resolve) => {
            for (let i = start; i < end + 1; i++) {
                if (imageArray[i].substring(0, 4) === 'http') {
                    let retVal = await this._toDataUrl(imageArray[i]);
                    this._images = [...this._images, retVal];
                }
                else {
                    this._images = [...this._images, imageArray[i]];
                }
                if (i === end)
                    resolve();
            }
        });
    }
    async _toDataUrl(url) {
        return new Promise((resolve) => {
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
            }).catch(async (err) => {
                console.log('Error: ', err.message);
                resolve();
            });
        });
    }
    _getElementList() {
        this._imagesUrl = [];
        this._alts = [];
        for (let i = 0; i < this.el.childElementCount; i++) {
            this._imagesUrl.push(this.el.children[i].getAttribute('src'));
            this._alts.push(this.el.children[i].getAttribute('alt'));
        }
        this._removeChilds(this.el);
    }
    _removeChilds(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }
    async _checkImageWidthHeight() {
        let maxHeight = Math.floor(this._bbContainer.height - 2 * this.innerPadding -
            2 * convertCSSNumber(this._localCSS.borderWidth) -
            2 * convertCSSNumber(this._localCSS.shadowWidth));
        if (this._imageHeight > maxHeight) {
            this._imageHeight = maxHeight;
            this._imageWidth = Math.floor(this._imageHeight / this.imageRatio);
        }
        return;
    }
    /* ---- Deal with handling event  */
    _handleMoveEventTarget() {
        if (this.innerType === "horizontal") {
            // type horizontal
            if (this._stPoint.y < this._bbContainer.height / 2) {
                // top part
                this._top = true;
                if (this._mvPoint.y < this._stPoint.y) {
                    // flip up
                    this._flipUp = true;
                }
                else {
                    // flip down
                    this._flipUp = false;
                }
            }
            else {
                // bottom part
                this._top = false;
                if (this._mvPoint.y < this._stPoint.y) {
                    // flip up
                    this._flipUp = true;
                }
                else {
                    // flip down
                    this._flipUp = false;
                }
            }
        }
        else if (this.innerType === 'vertical') {
            // type vertical
            if (this._stPoint.x < this._bbContainer.width / 2) {
                // left part
                this._left = true;
                if (this._mvPoint.x < this._stPoint.x) {
                    // flip left
                    this._flipLeft = true;
                }
                else {
                    // flip right
                    this._flipLeft = false;
                }
            }
            else {
                // right part
                this._left = false;
                if (this._mvPoint.x < this._stPoint.x) {
                    // flip left
                    this._flipLeft = true;
                }
                else {
                    // flip right
                    this._flipLeft = false;
                }
            }
        }
    }
    _handleEndEventTarget() {
        if (this._flipToggle.classList) {
            if (this.innerType === "horizontal") {
                // type horizontal
                this._handleToggle(this._top, this._flipUp);
            }
            else if (this.innerType === "vertical") {
                // type vertical
                this._handleToggle(this._left, this._flipLeft);
            }
        }
    }
    _handleToggle(block, flip) {
        if (!this.toggle) {
            if (block) {
                this._doToggle = true;
                if (!flip) {
                    this._indexFront = this._indexBack + 1;
                    if (this._indexFront === this._images.length)
                        this._indexFront = 0;
                }
                else {
                    this._indexBack = this._indexFront - 1;
                    if (this._indexBack === -1)
                        this._indexBack = this._images.length - 1;
                }
                this._flipToggle.classList.toggle("toggle");
                this.toggle = !this.toggle;
            }
            else {
                this._doToggle = false;
            }
        }
        else {
            if (!block) {
                this._doToggle = true;
                if (!flip) {
                    this._indexFront = this._indexBack - 1;
                    if (this._indexFront < 0)
                        this._indexFront = this._images.length - 1;
                }
                else {
                    this._indexBack = this._indexFront + 1;
                    if (this._indexBack === this._images.length)
                        this._indexBack = 0;
                }
                this._flipToggle.classList.toggle("toggle");
                this.toggle = !this.toggle;
            }
            else {
                this._doToggle = false;
            }
        }
    }
    _handleMouseDown(ev) {
        ev.preventDefault();
        this._stPoint = { x: ev.pageX, y: ev.pageY };
        this._mouseMove = false;
        this._mouseStart = true;
    }
    _handleMouseMove(ev) {
        ev.preventDefault();
        if (this._mouseStart) {
            this._mouseMove = true;
            this._mvPoint = { x: ev.pageX, y: ev.pageY };
            this._handleMoveEventTarget();
        }
    }
    _handleMouseEnd() {
        if (this._mouseMove) {
            this._handleEndEventTarget();
            this._mouseStart = false;
            this._mouseMove = false;
        }
    }
    _handleTouchStart(ev) {
        ev.preventDefault();
        this._stPoint = { x: ev.touches[0].pageX, y: ev.touches[0].pageY };
        this._mouseStart = true;
    }
    _handleTouchMove(ev) {
        ev.preventDefault();
        this._mvPoint = { x: ev.touches[0].pageX, y: ev.touches[0].pageY };
        this._mouseMove = true;
        this._handleMoveEventTarget();
    }
    _handleTouchEnd() {
        if (this._mouseMove) {
            this._handleEndEventTarget();
            this._mouseStart = false;
            this._mouseMove = false;
        }
    }
    //*************************
    //* Rendering JSX Element *
    //*************************
    renderFlipImages() {
        if (this._first) {
            this._first = false;
            this._frontImg1.setAttribute('src', this._images[this._indexFront]);
            this._frontImg2.setAttribute('src', this._images[this._indexFront]);
            this._backImg1.setAttribute('src', this._images[this._indexBack]);
            this._backImg2.setAttribute('src', this._images[this._indexBack]);
            if (this._alts[this._indexFront] !== null) {
                this._frontImg1.setAttribute('alt', this._alts[this._indexFront]);
                this._frontImg2.setAttribute('alt', this._alts[this._indexFront]);
            }
            if (this._alts[this._indexBack] !== null) {
                this._backImg1.setAttribute('alt', this._alts[this._indexBack]);
                this._backImg2.setAttribute('alt', this._alts[this._indexBack]);
            }
        }
        else {
            if (this._doToggle) {
                if (!this.toggle) {
                    this._frontImg1.setAttribute('src', this._images[this._indexFront]);
                    this._frontImg2.setAttribute('src', this._images[this._indexFront]);
                    if (this._alts[this._indexFront] !== null) {
                        this._frontImg1.setAttribute('alt', this._alts[this._indexFront]);
                        this._frontImg2.setAttribute('alt', this._alts[this._indexFront]);
                    }
                }
                else {
                    this._backImg1.setAttribute('src', this._images[this._indexBack]);
                    this._backImg2.setAttribute('src', this._images[this._indexBack]);
                    if (this._alts[this._indexBack] !== null) {
                        this._backImg1.setAttribute('alt', this._alts[this._indexBack]);
                        this._backImg2.setAttribute('alt', this._alts[this._indexBack]);
                    }
                }
            }
        }
    }
    render() {
        if (this._flipElements === null) {
            // initial definition
            if (this.innerType == 'horizontal') {
                this._flipElements = [
                    h("div", { class: "container" }, h("div", { class: "image-dim" }, h("img", { src: this._imagesUrl[0], alt: this._alts[0] })), h("div", { class: 'flip-container horizontal', id: 'flip-toggle', onMouseDown: this._handleMouseDown.bind(this), onMouseMove: this._handleMouseMove.bind(this), onMouseUp: this._handleMouseEnd.bind(this), onTouchStart: this._handleTouchStart.bind(this), onTouchMove: this._handleTouchMove.bind(this), onTouchEnd: this._handleTouchEnd.bind(this) }, h("div", { class: 'back-top', id: 'back-top' }, h("div", { class: 'image-back-top' }, h("img", { id: 'image-back-top' }))), h("div", { class: 'flipper', id: 'flipper' }, h("div", { class: 'front-top', id: 'front-top' }, h("div", { class: 'image-front-top' }, h("img", { id: 'image-front-top' }))), h("div", { class: 'back-bottom', id: 'back-bottom' }, h("div", { class: 'image-back-bottom' }, h("img", { id: 'image-back-bottom' })))), h("div", { class: 'front-bottom', id: 'front-bottom' }, h("div", { class: 'image-front-bottom' }, h("img", { id: 'image-front-bottom' })))))
                ];
            }
            else if (this.innerType == 'vertical') {
                this._flipElements = [
                    h("div", { class: "container" }, h("div", { class: "image-dim" }, h("img", { src: this._imagesUrl[0], alt: this._alts[0] })), h("div", { class: 'flip-container vertical', id: 'flip-toggle', onMouseDown: this._handleMouseDown.bind(this), onMouseMove: this._handleMouseMove.bind(this), onMouseUp: this._handleMouseEnd.bind(this), onTouchStart: this._handleTouchStart.bind(this), onTouchMove: this._handleTouchMove.bind(this), onTouchEnd: this._handleTouchEnd.bind(this) }, h("div", { class: 'back-left', id: 'back-left' }, h("div", { class: 'image-back-left' }, h("img", { id: 'image-back-left' }))), h("div", { class: 'flipper', id: 'flipper' }, h("div", { class: 'front-left', id: 'front-left' }, h("div", { class: 'image-front-left' }, h("img", { id: 'image-front-left' }))), h("div", { class: 'back-right', id: 'back-right' }, h("div", { class: 'image-back-right' }, h("img", { id: 'image-back-right' })))), h("div", { class: 'front-right', id: 'front-right' }, h("div", { class: 'image-front-right' }, h("img", { id: 'image-front-right' })))))
                ];
            }
            else {
                this._flipElements = null;
            }
        }
        else {
            // update
            if (this.defBlocks)
                this.renderFlipImages();
        }
        return (h(Host, null, h("slot", null, this._flipElements)));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "type": ["parseTypeProp"],
        "fpadding": ["parseFpaddingProp"]
    }; }
    static get style() { return ":host {\n  --flipimages-border-width: 10px;\n  --flipimages-border-color: #ffffff;  \n  --flipimages-shadow-width: 20px;\n  --flipimages-shadow-color: #808080;\n  --image-height: 720px;\n  --image-width: 1280px;\n  --container-padding: 0px;\n\n}\n.imghidden {\n  display:none;\n  visibility:hidden;\n}\n.container {\n  position: absolute;\n  top:0;\n  left:0;\n  bottom:0;\n  right:0;\n  overflow: hidden;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align : center;\n  align-items : center;\n  -ms-flex-pack : center;\n  justify-content : center;\n  padding: var(--container-padding);\n}\n/* image size */\n.image-dim {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  position: relative;\n  visibility: hidden;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%; \n  z-index: 10;\n}\n.image-dim img {\n  max-width: 100%;\n  max-height: 100%;\n  visibility: hidden;\n  overflow: hidden;\n}\n  \n.flip-container {\n  width: var(--image-width);\n  height: var(--image-height);\n  margin: 0;\n  -webkit-perspective: calc( 2 * var(--image-width));\n  perspective: calc( 2 * var(--image-width));\n  -webkit-box-shadow: 0px 0px var(--flipimages-shadow-width) 2px var(--flipimages-shadow-color);\n  box-shadow: 0px 0px var(--flipimages-shadow-width) 2px var(--flipimages-shadow-color);\n  border-color: var(--flipimages-border-color);\n  border-style: solid;\n  border-width: var(--flipimages-border-width);\n  border-radius: var(--flipimages-border-width);\n  visibility: hidden;\n}\n.flipvisible {\n  visibility: visible;\n}\n/* flip the pane when touched */\n.toggle.horizontal.flip-container .flipper {\n  transform: rotateX(-180deg);\n  -moz-transform: rotateX(-180deg);\n  -webkit-transform: rotateX(-180deg);\n}\n.toggle.horizontal.flip-container .back-top {\n  opacity: 1;	\n}\n.toggle.horizontal.flip-container .front-bottom {\n  opacity: 0;\n}\n/* flip the pane when touched */\n.toggle.vertical.flip-container .flipper {\n  transform: rotateY(-180deg);\n  -moz-transform: rotateY(-180deg);\n  -webkit-transform: rotateY(-180deg);\n}\n.toggle.vertical.flip-container .back-left {\n  opacity: 1;	\n}\n\n.toggle.vertical.flip-container .front-right {\n  opacity: 0;	\n}\n\n/* flip speed goes here */\n.flipper {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left:0;\n\n  transition: 0.5s;\n  -webkit-transition: 0.5s;\n  -moz-transition: 0.5s;\n  transition-timing-function: linear;\n  -webkit-transition-timing-function: linear;\n  -moz-transition-timing-function: linear;\n\n  -webkit-transform-style: preserve-3d;\n\n  transform-style: preserve-3d;\n}\n.front-top, .front-bottom, .back-top, .back-bottom {\n  max-height: calc( 1 * var(--image-height) / 2 + 2px);\n  max-width: var(--image-width);\n  overflow: hidden;\n  margin: 0;\n}      \n.front-top img, .front-bottom img, .back-top img, .back-bottom img {\n  display: block;\n  width: var(--image-width);\n} \n     \n.front-top {\n  position: absolute;\n  top: 0;\n  left: 0;\n  backface-visibility: hidden;\n  -webkit-backface-visibility: hidden;\n  z-index: 10;\n}\n.front-bottom {\n  position: absolute;\n  /*top: 50%;  50% */\n  bottom: 0;\n  left: 0;\n  backface-visibility: hidden;\n  -webkit-backface-visibility: hidden;\n  z-index: 1;\n  opacity: 1;\n  transition: opacity 0.5s;\n  -webkit-transition: opacity 0.5s;\n  -moz-transition: opacity 0.5s;\n  transition-timing-function: ease-in;\n  -webkit-transition-timing-function: ease-in;\n  -moz-transition-timing-function: ease-in;\n}\n.front-top img {\n  margin-bottom: calc( -1 * var(--image-height) / 2 + 2px);\n}\n.front-bottom img {\n  margin-top: calc( -1 * var(--image-height) / 2);\n}\n.back-top {\n  position: absolute;\n  top: 0;\n  left: 0;\n  backface-visibility: hidden;\n  -webkit-backface-visibility: hidden;\n  opacity: 0;\n  transition: opacity 0.5s;\n  -webkit-transition: opacity 0.5s;\n  -moz-transition: opacity 0.5s;\n  transition-timing-function: ease-in;\n  -webkit-transition-timing-function: ease-in;\n  -moz-transition-timing-function: ease-in;\n  z-index: -2;\n}\n.back-bottom {\n  backface-visibility: hidden;\n  -webkit-backface-visibility: hidden;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index:5;\n}\n.back-top img {\n  margin-bottom: calc( -1 * var(--image-height) / 2 + 2px);\n}\n.back-bottom img {\n  margin-top: calc( -1 * var(--image-height) / 2);\n}\n/* front pane, placed above back */\n\n.front-top {\n  /* for firefox 31 */\n  transform: rotateX(0deg);\n  -moz-transform: rotateX(0deg);\n  -webkit-transform: rotateX(0deg);\n}\n\n/* back, initially hidden pane */\n.back-bottom {\n  transform: rotateX(180deg);\n  -moz-transform: rotateX(180deg);\n  -webkit-transform: rotateX(180deg);\n}\n\n.front-left, .front-right, .back-left, .back-right {\n  max-height: var(--image-height);\n  max-width: calc( 1 * var(--image-width) / 2 + 2px);\n  overflow: hidden;\n  margin: 0;\n}      \n.front-left img, .front-right img, .back-left img, .back-right img {\n  display: block;\n  width: var(--image-width);\n}\n.front-left {\n  position: absolute;\n  top: 0;\n  left: 0;\n  backface-visibility: hidden;\n  -webkit-backface-visibility: hidden;\n  z-index: 10;\n}\n.front-right {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  backface-visibility: hidden;\n  -webkit-backface-visibility: hidden;\n  z-index: 1;\n  opacity: 1;\n  transition: opacity 0.5s;\n  -webkit-transition: opacity 0.5s;\n  -moz-transition: opacity 0.5s;\n  transition-timing-function: ease-in;\n  -webkit-transition-timing-function: ease-in;\n  -moz-transition-timing-function: ease-in;\n}\n.front-left img {\n  margin-right: calc( -1 * var(--image-width) / 2 + 2px);\n}\n.front-right img {\n  margin-left: calc( -1 * var(--image-width) / 2);\n}\n.back-left {\n  position: absolute;\n  top: 0;\n  left: 0;\n  backface-visibility: hidden;\n  -webkit-backface-visibility: hidden;\n  opacity: 0;\n  transition: opacity 0.5s;\n  -webkit-transition: opacity 0.5s;\n  -moz-transition: opacity 0.5s;\n  transition-timing-function: ease-in;\n  -webkit-transition-timing-function: ease-in;\n  -moz-transition-timing-function: ease-in;\n  z-index: -2;\n}\n.back-right {\n  backface-visibility: hidden;\n  -webkit-backface-visibility: hidden;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index:5;\n}\n.back-left img {\n  margin-right: calc( -1 * var(--image-width) / 2 + 2px);\n}\n.back-right img {\n  margin-left: calc( -1 * var(--image-width) / 2);\n}\n\n/* front pane, placed above back */\n.front-left {\n  /* for firefox 31 */\n  transform: rotateY(0deg);\n  -moz-transform: rotateY(0deg);\n  -webkit-transform: rotateY(0deg);\n}\n\n/* back, initially hidden pane */\n.back-right {\n  transform: rotateY(180deg);\n  -moz-transform: rotateY(180deg);\n  -webkit-transform: rotateY(180deg);\n}"; }
};

export { JeepFlipimages as jeep_flipimages };
