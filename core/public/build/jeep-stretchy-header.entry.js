import { r as registerInstance, c as createEvent, h, H as Host, d as getElement } from './core-7a7a831b.js';
import { f as getValueFromCss, h as cssVar } from './common-9d7d4db4.js';

const JeepStretchyHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //************************
        //* Property Definitions *
        //************************
        /**
         * The Header Height
         */
        this.headerheight = "150px";
        /**
         * The Header Background Linear Gtradient if any and Url
         *  headerbackground="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.75)) ,
         *  url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/italy-mountains.jpeg)"
         *
         */
        this.headerbackground = "url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/italy-mountains.jpeg)";
        /**
         * The blur effect
         */
        this.headerbackgroundblur = false;
        /**
         * The Navbar Contrast Color
         */
        this.toolbarcontrastcolor = "#ffffff";
        this.innerBlur = false;
        this._mouseStart = false;
        this._ptStart = {};
        this._isScroll = false;
        this._scrollTop = 0;
        this._prevScrollTop = -1;
        this.onStretchyHeaderToolbar = createEvent(this, "jeepStretchyHeaderToolbar", 7);
    }
    //*****************************
    //* Watch on Property Changes *
    //*****************************
    async parseHeaderHeight(newValue) {
        this._heightIni = newValue ? await getValueFromCss(newValue, 'y') : await getValueFromCss("150px", 'y');
        const headHeight = cssVar(this.el, "--jeep-stretchy-header-height", `${this._heightIni}px`);
        this._height = this._heightIni;
        this.innerHeadHeight = headHeight;
    }
    parseHeaderBackground(newValue) {
        const url = newValue ? newValue : "url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/lake-sunset-twilight.jpeg)";
        const backUrl = cssVar(this.el, "--jeep-stretchy-header-image", `${url}`);
        this.innerUrl = backUrl;
    }
    parseBlur(newValue) {
        this.innerBlur = newValue ? newValue : false;
    }
    parseToolbarContrastColor(newValue) {
        this.innerContrastCol = newValue ? newValue : "#ffffff";
    }
    //*******************************
    //* Listen to Event Definitions *
    //*******************************
    //**********************
    //* Method Definitions *
    //**********************
    /**
     * Init data from properties.
     */
    init() {
        return Promise.resolve(this._init());
    }
    //*******************************
    //* Component Lifecycle Methods *
    //*******************************
    async componentWillLoad() {
        this._window = window;
        await this.init();
    }
    async componentDidLoad() {
        this._header = this.el.shadowRoot.querySelector('.stretchy-header');
        //    this._header.style.setProperty('height',this.innerHeadHeight);
        this._headerBackground = this.el.shadowRoot.querySelector('.stretchy-header-background');
        //    this._headerBackground.style.setProperty("background-image",this.innerUrl);
        this._ionHeader = this.el.querySelector('ion-header');
        this._ionToolbar = this._ionHeader.querySelector('ion-toolbar');
        this._ionContent = this.el.parentNode.querySelector('ion-content');
        if (this._ionHeader)
            await this._setHeader();
        if (this._ionToolbar)
            await this._setToolbar();
        if (this._ionContent)
            await this._setContent();
        if (this._header.classList.contains("back"))
            this._header.classList.remove("back");
        if (this.innerBlur && this._headerBackground.classList.contains("blur"))
            this._headerBackground.classList.remove("blur");
    }
    //******************************
    //* Private Method Definitions *
    //******************************
    async _init() {
        this._document = this._window.document;
        this._root = this._document.documentElement;
        this.parseHeaderHeight(this.headerheight ? this.headerheight : "20%");
        this.parseHeaderBackground(this.headerbackground ? this.headerbackground : "url(https://ununsplash.imgix.net/photo-1421091242698-34f6ad7fc088?fit=crop&fm=jpg&h=650&q=75&w=950)");
        this.parseBlur(this.headerbackgroundblur ? this.headerbackgroundblur : false);
        this.parseToolbarContrastColor(this.toolbarcontrastcolor ? this.toolbarcontrastcolor : null);
        return;
    }
    async _setHeader() {
        this._ionHeader.style.setProperty("position", "absolute");
        this._ionHeader.style.setProperty("top", "0");
        this._ionHeader.style.setProperty("left", "0");
        return;
    }
    async _setToolbar() {
        const color = this._ionToolbar.color;
        this._ionColor = cssVar(this._root, `--ion-color-${color}`);
        this._ionColorContrast = cssVar(this._root, `--ion-color-${color}-contrast`);
        this._minHeight = this._ionToolbar.classList.contains('ios') ? 44 : 56;
        this._setTranslucent('add');
        return;
    }
    async _setContent() {
        this._ionContent.scrollEvents = true;
        this._ionContent.addEventListener('ionScrollStart', async () => {
            if (this._height < this._heightIni) {
                this._isScroll = true;
                this._mouseStart = false;
                if (this._prevScrollTop === -1) {
                    this._prevScrollTop = 0;
                    await this._ionContent.scrollToTop();
                }
            }
        });
        this._ionContent.addEventListener('ionScroll', async (ev) => {
            if (this._height < this._heightIni) {
                if (!this._isScroll)
                    this._isScroll = true;
                this._scrollTop = ev.detail.scrollTop;
                this._height -= this._scrollTop;
                this._height = this._height <= this._minHeight ? this._minHeight : this._height;
                if (this._height > this._minHeight) {
                    this._setTranslucent('add');
                    await this._ionContent.scrollToTop();
                    this._prevScrollTop = -1;
                }
                else {
                    this._setTranslucent('remove');
                }
                this._header.style.setProperty('height', `${this._height}px`);
                if (this._prevScrollTop !== -1 && this._scrollTop === 0) {
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
            if (!this._isScroll && this._prevScrollTop <= 0) {
                this._handleStart(ev);
            }
        });
        this._ionContent.addEventListener('touchmove', (ev) => {
            this._handleMove(ev);
        });
        this._ionContent.addEventListener('touchend', () => {
            if (this._mouseStart) {
                this._handleEnd();
            }
        });
        this._ionContent.addEventListener('mousedown', (ev) => {
            if (!this._isScroll && this._prevScrollTop <= 0) {
                this._handleStart(ev);
            }
        });
        this._ionContent.addEventListener('mousemove', (ev) => {
            this._handleMove(ev);
        });
        this._ionContent.addEventListener('mouseup', () => {
            if (this._mouseStart) {
                this._handleEnd();
            }
        });
        this._ionContent.addEventListener('mouseleave', () => {
            if (this._mouseStart) {
                this._handleEnd();
            }
        });
    }
    _setTranslucent(mode) {
        if (mode === 'add') {
            this.onStretchyHeaderToolbar.emit({
                color: `${this._ionColor}00`,
                contrastColor: this.innerContrastCol
            });
        }
        else if (mode === 'remove') {
            this.onStretchyHeaderToolbar.emit({
                color: this._ionColor,
                contrastColor: this._ionColorContrast
            });
        }
    }
    _handleStart(ev) {
        this._ptStart = ev.touches && ev.touches[0] ? { x: ev.touches[0].pageX, y: ev.touches[0].pageY } : { x: ev.pageX, y: ev.pageY };
        if (!this._isScroll && this._height >= this._minHeight) {
            this._mouseStart = true;
        }
    }
    async _handleMove(ev) {
        const pt = ev.touches && ev.touches[0] ? { x: ev.touches[0].pageX, y: ev.touches[0].pageY } : { x: ev.pageX, y: ev.pageY };
        const dy = pt.y - this._ptStart.y;
        this._ptStart = { x: pt.x, y: pt.y };
        if (this._mouseStart && !this._isScroll) {
            this._height += dy;
            if (dy > 0) {
                this._setTranslucent('add');
                if (this._height > this._heightIni + 2) {
                    if (this.innerBlur && this._headerBackground.classList.contains('unblur'))
                        this._headerBackground.classList.remove("unblur");
                    if (this._header.classList.contains('back'))
                        this._header.classList.remove('back');
                    if (this.innerBlur && !this._headerBackground.classList.contains('blur'))
                        this._headerBackground.classList.add("blur");
                }
            }
            else {
                if (this.innerBlur && this._headerBackground.classList.contains('blur'))
                    this._headerBackground.classList.remove("blur");
                if (this.innerBlur && !this._headerBackground.classList.contains('unblur'))
                    this._headerBackground.classList.add("unblur");
                if (this._height <= this._heightIni) {
                    if (this._header.classList.contains('back'))
                        this._header.classList.remove('back');
                }
                if (this._height <= this._minHeight) {
                    this._height = this._minHeight;
                    this._setTranslucent('remove');
                }
                else {
                    this._setTranslucent('add');
                }
            }
            this._header.style.setProperty('height', `${this._height}px`);
            if (this._height >= this._heightIni)
                await this._ionContent.scrollToTop();
        }
    }
    async _handleEnd() {
        if (!this._isScroll) {
            if (this._height >= this._heightIni) {
                if (!this._header.classList.contains('back'))
                    this._header.classList.add('back');
                if (this.innerBlur && this._headerBackground.classList.contains('blur'))
                    this._headerBackground.classList.remove("blur");
                if (this.innerBlur && !this._headerBackground.classList.contains('unblur'))
                    this._headerBackground.classList.add("unblur");
                this._height = this._heightIni;
                this._header.style.setProperty('height', `${this._height}px`);
            }
            else {
                if (this._header.classList.contains('back'))
                    this._header.classList.remove('back');
                if (this._height <= this._minHeight + 2) {
                    this._height = this._minHeight;
                    this._setTranslucent('remove');
                    if (this.innerBlur && this._headerBackground.classList.contains("blur"))
                        this._headerBackground.classList.remove("blur");
                    if (this.innerBlur && this._headerBackground.classList.contains('unblur'))
                        this._headerBackground.classList.remove("unblur");
                }
                this._header.style.setProperty('height', `${this._height}px`);
            }
        }
        if (this.innerBlur && this._headerBackground.classList.contains('unblur'))
            this._headerBackground.classList.remove("unblur");
        this._mouseStart = false;
    }
    render() {
        return (h(Host, null, h("div", { class: "stretchy-header" }, h("div", { class: "stretchy-header-background" }), h("slot", null))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "headerheight": ["parseHeaderHeight"],
        "headerbackground": ["parseHeaderBackground"],
        "headerbackgroundblur": ["parseBlur"],
        "toolbarcontrastcolor": ["parseToolbarContrastColor"]
    }; }
    static get style() { return ":host {\n  display: block;\n  --jeep-stretchy-header-image:url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/italy-mountains.jpeg);\n  --jeep-stretchy-header-height: 150px;\n}\n\n.stretchy-header {\n  height: var(--jeep-stretchy-header-height);\n}\n\n.stretchy-header-background {\n  background-image: var(--jeep-stretchy-header-image);\n  background-size: cover;\n  background-position: center;\n  height: 100%;\n}\n.stretchy-header.back {\n  -webkit-transition: height 0.4s linear;\n  transition: height 0.4s linear;\n}\n.stretchy-header-background.blur {\n  transition:all 1.0s ease-in-out;\n  -webkit-transition:all 1.0s ease-in-out;\n  filter: blur(6px);\n  -webkit-filter: blur(6px);\n}\n.stretchy-header-background.unblur {\n  transition:all 0.4s ease;\n  -webkit-transition:all 0.4s ease;\n  filter: blur(0px);\n  -webkit-filter: blur(0px);\n}"; }
};

export { JeepStretchyHeader as jeep_stretchy_header };
