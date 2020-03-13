import { r as registerInstance, c as createEvent, h, H as Host, d as getElement } from './core-7a7a831b.js';
import { a as getCssPropertyFromString } from './common-9d7d4db4.js';

const JeepSlide = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.onSlideDidLoad = createEvent(this, "jeepSlideDidLoad", 7);
    }
    //*****************************
    //* Watch on Property Changes *
    //*****************************/
    parseTitleProp(newValue) {
        if (newValue)
            this.innerTitle = newValue;
    }
    parseSubTitleProp(newValue) {
        if (newValue)
            this.innerSubTitle = newValue;
    }
    async parseStyleProp(newValue) {
        if (newValue) {
            this._lcssvar = await getCssPropertyFromString(newValue, 'slide');
            this._setLocalCssVariables();
            this.innerStyle = newValue;
        }
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
    /**
     * Set the slide component.
     */
    setSlide() {
        return Promise.resolve(this._setSlide());
    }
    async componentWillLoad() {
        await this.init();
    }
    async componentDidLoad() {
        await this.setSlide();
    }
    async _init() {
        this._element = this.el.shadowRoot;
        this.parseTitleProp(this.stitle ? this.stitle : null);
        this.parseSubTitleProp(this.subtitle ? this.subtitle : null);
        await this.parseStyleProp(this.cstyle ? this.cstyle : null);
        return;
    }
    _setLocalCssVariables() {
        if (this._lcssvar.alignItems)
            this.el.style.setProperty('--slide-align-items', this._lcssvar.alignItems);
        if (this._lcssvar.background)
            this.el.style.setProperty('--slide-background', this._lcssvar.background);
        if (this._lcssvar.color)
            this.el.style.setProperty('--slide-color', this._lcssvar.color);
        if (this._lcssvar.contentFontSize)
            this.el.style.setProperty('--slide-content-font-size', this._lcssvar.contentFontSize);
        if (this._lcssvar.contentPadding)
            this.el.style.setProperty('--slide-content-padding', this._lcssvar.contentPadding);
        if (this._lcssvar.contentTextAlign)
            this.el.style.setProperty('--slide-content-text-align', this._lcssvar.contentTextAlign);
        if (this._lcssvar.contentTop)
            this.el.style.setProperty('--slide-content-top', this._lcssvar.contentTop);
        if (this._lcssvar.display)
            this.el.style.setProperty('--slide-display', this._lcssvar.display);
        if (this._lcssvar.flexDirection)
            this.el.style.setProperty('--slide-flex-direction', this._lcssvar.flexDirection);
        if (this._lcssvar.fontSize)
            this.el.style.setProperty('--slide-font-size', this._lcssvar.fontSize);
        if (this._lcssvar.headerTop)
            this.el.style.setProperty('--slide-header-top', this._lcssvar.headerTop);
        if (this._lcssvar.height)
            this.el.style.setProperty('--slide-height', this._lcssvar.height);
        if (this._lcssvar.justifyContent)
            this.el.style.setProperty('--slide-justify-content', this._lcssvar.justifyContent);
        if (this._lcssvar.minWidth)
            this.el.style.setProperty('--slide-min-width', this._lcssvar.minWidth);
        if (this._lcssvar.scrollSnapAlign)
            this.el.style.setProperty('--slide-scroll-snap-align', this._lcssvar.scrollSnapAlign);
        if (this._lcssvar.subtitleFontSize)
            this.el.style.setProperty('--slide-subtitle-font-size', this._lcssvar.subtitleFontSize);
        if (this._lcssvar.textAlign)
            this.el.style.setProperty('--slide-text-align', this._lcssvar.textAlign);
        if (this._lcssvar.titleFontSize)
            this.el.style.setProperty('--slide-title-font-size', this._lcssvar.titleFontSize);
    }
    async _setSlide() {
        this.onSlideDidLoad.emit();
        return;
    }
    render() {
        return (h(Host, null, h("div", { class: "slide-container" }, h("div", { class: "slide-wrapper" }, h("div", { class: "slide-header" }, this.innerTitle != null
            ? h("div", { class: "slide-title" }, this.innerTitle)
            : null, this.innerSubTitle != null
            ? h("div", { class: "slide-subtitle" }, this.innerSubTitle)
            : null), h("div", { class: "slide-content" }, h("slot", null))))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "stitle": ["parseTitleProp"],
        "subtitle": ["parseSubTitleProp"],
        "cstyle": ["parseStyleProp"]
    }; }
    static get style() { return ":host {\n  --slide-scroll-snap-align: start;\n  --slide-min-width: 100vw;\n  --slide-height: 100vh;\n  --slide-background:var(--slides-slide-background, #ffffff);\n  --slide-color: var(--slides-slide-color,#000);\n  --slide-font-size : calc(1rem + 3vmin);\n  --slide-display: flex;\n  --slide-align-items: center;\n  --slide-justify-content: center;\n  --slide-text-align: center;\n  --slide-flex-direction: column;\n  --slide-title-font-size: var(--slides-slide-title-font-size,calc(1rem + 3vmin));\n  --slide-subtitle-font-size: var(--slides-slide-subtitle-font-size,calc(1rem + 1.5vmin));\n  --slide-content-top: var(--slides-slide-content-top,0px);\n  --slide-content-padding: var(--slides-slide-content-padding,0);\n  --slide-content-font-size : var(--slides-slide-content-font-size,calc(1rem + 0.5vmin));\n  --slide-content-text-align: var(--slides-slide-content-text-align,center);\n  --slide-header-top: var(--slides-slide-header-top,0px);\n}\n\n.slide-container {\n    z-index: 2;\n    position: relative;\n    margin: 0 auto;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    scroll-snap-align: var(--slide-scroll-snap-align);\n    -ms-scroll-snap-coordinate: 0% 0%;\n    scroll-snap-coordinate: 0% 0%; /* older (Firefox/IE) */  \n    -webkit-scroll-snap-coordinate: 0% 0%; /* older (Safari) */  \n    -ms-flex-negative: 0;  \n    flex-shrink: 0;\n    min-width: var(--slide-min-width);\n    height: var(--slide-height);\n    min-width: var(--slide-min-width);\n    height: var(--slide-height);\n    color: var(--slide-color);\n    background: var(--slide-background);\n}\n.slide-wrapper {\n    -webkit-box-sizing: var(--slide-box-sizing);\n    box-sizing: var(--slide-box-sizing);\n    margin: 0 auto;\n    padding: 0;\n    display: var(--slide-display);\n    -ms-flex-direction: var(--slide-flex-direction);\n    flex-direction: var(--slide-flex-direction);\n    position: relative;  \n    -ms-flex-negative: 0;  \n    flex-shrink: 0;\n    -ms-flex-align: var(--slide-align-items);\n    align-items: var(--slide-align-items);\n    -ms-flex-pack: var(--slide-justify-content);\n    justify-content: var(--slide-justify-content);\n    width: 100%;\n    height: 100%;\n    font-size: var(--slide-font-size);\n}\n.slide-header {\n    position: relative;\n    top: var(--slide-header-top);\n    text-align: center;\n}\n\n.slide-title {\n    font-size: var(--slide-title-font-size);\n    font-weight: bold;\n}\n.slide-subtitle {\n    text-align:center;\n    font-size: var(--slide-subtitle-font-size);\n}\n.slide-content {\n    position: relative;\n    top: var(--slide-content-top);\n    padding: var(--slide-content-padding);\n    text-align: var(--slide-content-text-align);\n    font-size: var(--slide-content-font-size);\n}\n.slide-image {\n    width: auto;\n    max-width: 100vw;\n    height: auto;\n    max-height: 100vh;  \n}"; }
};

export { JeepSlide as jeep_slide };
