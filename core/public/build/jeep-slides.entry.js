import { r as registerInstance, c as createEvent, h, H as Host, d as getElement } from './core-7a7a831b.js';
import { g as getBoundingClientRect } from './common-9d7d4db4.js';

const JeepSlides = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fullScreen = false;
        this._slidesParams = {};
        this._ticking = false;
        this._oriMargin = {};
        this._touchStart = false;
        this._touchMove = false;
        this.onSlidesHeaderVisibility = createEvent(this, "jeepSlidesHeaderVisibility", 7);
    }
    //*****************************
    //* Watch on Property Changes *
    //*****************************
    parseOptionsProp(newValue) {
        if (newValue)
            this.innerOptions = JSON.parse(newValue);
    }
    //*******************************
    //* Listen to Event Definitions *
    //*******************************
    handleWindowResize() {
        this._windowResize();
    }
    async handleJeepNavigationPrev() {
        await this.goToPreviousSlide();
    }
    async handleJeepNavigationNext() {
        await this.goToNextSlide();
    }
    async handleJeepPaginationIndex(event) {
        if (event.detail && event.detail.index) {
            await this.goToSlideIndex(Number(event.detail.index));
            if (this.innerOptions.navigation)
                this._setNavigationButtons();
            await this._pagEl.setJeepPaginationActiveIndex({ activeIndex: this._slidesParams.curSlide.toString() });
        }
    }
    async handleJeepPlayControlsCurrentIndex(event) {
        if (event.detail && event.detail.index) {
            await this.goToSlideIndex(Number(event.detail.index));
        }
    }
    async handleJeepFullscreenRequest() {
        this._setProperties(false);
        await this._fullEl.fullscreenRequest(document.documentElement);
        this.fullScreen = true;
        this._windowResize();
    }
    async handleJeepFullscreenExit() {
        await this._fullEl.fullscreenExit();
        this._setProperties(true);
        this.fullScreen = false;
        this._windowResize();
    }
    async handleJeepFullscreenChange() {
        this._setProperties(true);
        this.fullScreen = false;
        this._windowResize();
    }
    async handleKeydown(event) {
        event.preventDefault();
        const key = event.key ? event.key : null;
        const keycode = event.keyCode || event.which ? event.keyCode || event.which : null;
        const pressKey = key !== null ? key : keycode.toString();
        switch (pressKey) {
            case 'ArrowLeft' || '37': // LEFT
                if (this._direction === 'horizontal') {
                    await this.goToPreviousSlide();
                }
                break;
            case 'ArrowUp' || '38': // UP
                if (this._direction === 'vertical') {
                    await this.goToPreviousSlide();
                }
                break;
            case 'ArrowRight' || '39': // RIGHT
                if (this._direction === 'horizontal') {
                    await this.goToNextSlide();
                }
                break;
            case 'ArrowDown' || '40': // DOWN
                if (this._direction === 'vertical') {
                    await this.goToNextSlide();
                }
                break;
            default:
        }
    }
    handleTouchstart() {
        this._touchStart = true;
    }
    handleTouchmove() {
        this._touchMove = true;
    }
    async handleTouchend() {
        if (!this._touchStart || !this._touchMove) {
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
    init() {
        return Promise.resolve(this._init());
    }
    /**
     * Set the slides.
     */
    setSlides() {
        return Promise.resolve(this._setSlides());
    }
    /**
     * Get Active Slide Index.
     */
    async getActiveSlideIndex() {
        const curSlide = await this._getCurrentSlideIndex();
        return Promise.resolve(curSlide);
    }
    /**
     *  Go Previous Slide
     */
    async goToPreviousSlide() {
        return await this._goPrev();
    }
    /**
     *  Go Next Slide
     */
    async goToNextSlide() {
        return await this._goNext();
    }
    /**
     *  Go To Slide with given index
     */
    async goToSlideIndex(index) {
        return await this._scrollToPosition(index);
    }
    async componentWillLoad() {
        await this.init();
    }
    async componentDidLoad() {
        await this.setSlides();
    }
    async _init() {
        this._element = this.el.shadowRoot;
        this._slidesNumber = 0;
        const defOpt = { direction: "horizontal" };
        this.parseOptionsProp(this.options ? this.options : JSON.stringify(defOpt));
        this._direction = this.innerOptions.direction ? this.innerOptions.direction : "horizontal";
        this._navIcon = this.innerOptions.navigation && this.innerOptions.navigation.icon ? this.innerOptions.navigation.icon : "arrow-circle";
        this._oriMargin.top = window.getComputedStyle(this.el).getPropertyValue('--slides-margin-top');
        this._oriMargin.left = window.getComputedStyle(this.el).getPropertyValue('--slides-margin-left');
        this._oriMargin.bottom = window.getComputedStyle(this.el).getPropertyValue('--slides-margin-bottom');
        this._oriMargin.right = window.getComputedStyle(this.el).getPropertyValue('--slides-margin-right');
    }
    async _setSlides() {
        this._containerEl = this._element.querySelector('.slides-container');
        this._wrapperEl = this._containerEl.querySelector('.slides-wrapper');
        this._slidesEl = this._wrapperEl.querySelector('.slides');
        this._slidesEl.classList.add(`slides-${this._direction}`);
        this._slotEl = this._slidesEl.querySelector('slot');
        if (this._slotEl !== null) {
            this._arrSlidesEl = await this._getElementsInSlot();
            if (this._arrSlidesEl !== null && this._arrSlidesEl.length > 0) {
                //<-- required to be added as the scroll horizontal does not work with slot element
                // loop through the slot element , add the elements to the render
                // store elements which are in slot
                this._slidesNumber = this._arrSlidesEl.length;
                for (let i = 0; i < this._slidesNumber; i++) {
                    this._slidesEl.append(this._arrSlidesEl[i]);
                }
                // delete the slot element
                const div = Array.from(this.el.querySelectorAll('div'));
                if (div !== null) {
                    for (let i = 0; i < div.length; i++) {
                        if (div[i].slot === "slides")
                            this.el.removeChild(div[i]);
                    }
                    this._slidesEl.removeChild(this._slotEl);
                }
                //-->
                if (this.innerOptions.fullscreen)
                    this._fullEl = this._containerEl.querySelector('#jeep-slides-fullscreen');
                if (!this.innerOptions.autoplay && this.innerOptions.navigation)
                    this._navEl = this._containerEl.querySelector('#jeep-slides-navigation');
                if (!this.innerOptions.autoplay && this.innerOptions.pagination) {
                    const pagId = `#jeep-slides-pagination-${this.innerOptions.direction}`;
                    this._pagEl = this._containerEl.querySelector(pagId);
                    await this._pagEl.setJeepPaginationSlidesNumber({ slides: this._arrSlidesEl.length });
                }
                if (this.innerOptions.autoplay)
                    this._playEl = this._containerEl.querySelector('#jeep-slides-autoplay');
                // add scroll event
                this._slidesEl.addEventListener('scroll', () => {
                    const prevIndex = this._slidesParams.curSlide;
                    if (!this._ticking) {
                        setTimeout(async () => {
                            this._slidesParams.curSlide = await this.getActiveSlideIndex();
                            this._slidesParams.position = this._slidesParams.axis === 'x' ? Number(this._slidesEl.scrollLeft) : Number(this._slidesEl.scrollTop);
                            if (this.innerOptions.navigation && this._slidesParams.curSlide !== prevIndex)
                                this._setNavigationButtons();
                            if (this.innerOptions.pagination && this._slidesParams.curSlide !== prevIndex)
                                this._syncPagination();
                            if (this.innerOptions.autoplay && this._slidesParams.curSlide !== prevIndex)
                                this._playEl.setActiveIndexAndPlay(this._slidesParams.curSlide);
                            this._ticking = false;
                        }, 200);
                        this._ticking = true;
                    }
                }, false);
                // add click event
                this._slidesEl.addEventListener('click', async () => {
                    this._initial = await this._doHide(this.innerOptions.duration ? this.innerOptions.duration : 2500);
                }, false);
                // fill the slidesParams
                this._slidesParams.axis = this._direction === 'vertical' ? 'y' : 'x';
                this._slidesParams.curSlide = 0;
                this._slidesParams.nbSlides = this._arrSlidesEl.length;
                await this._initScrollParams();
                if (!this.innerOptions.autoplay && (this.innerOptions.navigation && this._slidesParams.nbSlides > 1))
                    await this._navEl.setJeepNavigationNextDisabled({ disabled: false });
                this._initial = await this._doHide(this.innerOptions.duration ? this.innerOptions.duration : 2500);
                this.nSlides = this._arrSlidesEl.length;
            }
        }
    }
    _setProperties(back) {
        if (!back) {
            this.el.style.setProperty('--slides-margin-top', '0px');
            this.el.style.setProperty('--slides-margin-bottom', '0px');
            this.el.style.setProperty('--slides-margin-left', '0px');
            this.el.style.setProperty('--slides-margin-right', '0px');
        }
        else {
            this.el.style.setProperty('--slides-margin-top', this._oriMargin.top);
            this.el.style.setProperty('--slides-margin-bottom', this._oriMargin.bottom);
            this.el.style.setProperty('--slides-margin-left', this._oriMargin.left);
            this.el.style.setProperty('--slides-margin-right', this._oriMargin.right);
        }
    }
    async _windowResize() {
        this.el.style.setProperty('--slides-width', `${window.innerWidth}px`);
        this.el.style.setProperty('--slides-height', `${window.innerHeight}px`);
        await this._initScrollParams();
        await this.goToSlideIndex(this._slidesParams.curSlide);
    }
    async _getElementsInSlot() {
        let elems = null;
        const nodes = this._slotEl.assignedNodes();
        const cmpSlides = nodes.filter((item) => {
            return item.slot === 'slides' ? item : null;
        });
        if (cmpSlides !== null && cmpSlides.length > 0) {
            elems = Array.from(cmpSlides[0].querySelectorAll('jeep-slide'));
        }
        return elems;
    }
    async _initScrollParams() {
        const rect = await getBoundingClientRect(this._arrSlidesEl[0], 100);
        this._slidesParams.slideLength = this._slidesParams.axis === 'x' ? rect.width : rect.height;
        this._slidesParams.scrollLength = this._slidesParams.axis === 'x' ? this._slidesEl.scrollWidth :
            this._slidesEl.scrollHeight;
        this._slidesParams.position = this._slidesParams.curSlide * this._slidesParams.slideLength;
    }
    async _doHide(duration) {
        clearTimeout(this._initial);
        await this._doVisible();
        let initial = setTimeout(async () => {
            this.onSlidesHeaderVisibility.emit({ visibility: 'hidden' });
            if (this._navEl && this.innerOptions.navigation.hidden)
                await this._navEl.setJeepNavigationVisibility({ visibility: 'hidden' });
            if (this._pagEl && this.innerOptions.pagination.hidden)
                await this._pagEl.setJeepPaginationVisibility({ visibility: 'hidden' });
            if (this._playEl && this.innerOptions.autoplay.hidden)
                await this._playEl.setJeepPlayControlsVisibility({ visibility: 'hidden' });
            if (this._fullEl && this.innerOptions.fullscreen.hidden)
                await this._fullEl.setJeepFullscreenVisibility({ visibility: 'hidden' });
        }, duration);
        return initial;
    }
    async _doVisible() {
        if (this._slidesParams.curSlide === 0 || this._slidesParams.curSlide === this._slidesNumber - 1)
            this.onSlidesHeaderVisibility.emit({ visibility: 'visible' });
        if (this._navEl && this.innerOptions.navigation.hidden)
            await this._navEl.setJeepNavigationVisibility({ visibility: 'visible' });
        if (this._pagEl && this.innerOptions.pagination.hidden)
            await this._pagEl.setJeepPaginationVisibility({ visibility: 'visible' });
        if (this._playEl && this.innerOptions.autoplay.hidden)
            await this._playEl.setJeepPlayControlsVisibility({ visibility: 'visible' });
        if (this._fullEl && this.innerOptions.fullscreen.hidden)
            await this._fullEl.setJeepFullscreenVisibility({ visibility: 'visible' });
        return;
    }
    async _getCurrentSlideIndex() {
        let index = 0;
        this._slidesParams.position = this._slidesParams.axis === 'x' ? Number(this._slidesEl.scrollLeft) : Number(this._slidesEl.scrollTop);
        if (Math.abs(this._slidesParams.scrollLength / this._slidesParams.nbSlides - this._slidesParams.slideLength) < 2) {
            // slide constant width
            index = Math.round(this._slidesParams.position / this._slidesParams.slideLength);
        }
        return index;
    }
    async _goPrev() {
        this._slidesParams.curSlide -= 1;
        if (this._slidesParams.curSlide < 0)
            this._slidesParams.curSlide = 0;
        if (this.innerOptions.autoplay) {
            this._playEl.setActiveIndexAndPlay(this._slidesParams.curSlide);
        }
        else {
            this._setNavigationButtons();
            if (this.innerOptions.pagination)
                this._syncPagination();
        }
        await this.goToSlideIndex(this._slidesParams.curSlide);
    }
    async _goNext() {
        this._slidesParams.curSlide += 1;
        if (this._slidesParams.curSlide >= this._slidesParams.nbSlides)
            this._slidesParams.curSlide = this._slidesParams.nbSlides - 1;
        if (this.innerOptions.autoplay) {
            this._playEl.setActiveIndexAndPlay(this._slidesParams.curSlide);
        }
        else {
            this._setNavigationButtons();
            if (this.innerOptions.pagination)
                this._syncPagination();
        }
        await this.goToSlideIndex(this._slidesParams.curSlide);
    }
    async _setNavigationButtons() {
        if (this._navEl) {
            if (this._slidesParams.curSlide === 0)
                await this._navEl.setJeepNavigationPrevDisabled({ disabled: true });
            if (this._slidesParams.curSlide >= 1)
                await this._navEl.setJeepNavigationPrevDisabled({ disabled: false });
            if (this._slidesParams.curSlide === this._slidesParams.nbSlides - 1)
                await this._navEl.setJeepNavigationNextDisabled({ disabled: true });
            if (this._slidesParams.curSlide <= this._slidesParams.nbSlides - 2)
                await this._navEl.setJeepNavigationNextDisabled({ disabled: false });
        }
    }
    _syncPagination() {
        if (this._pagEl)
            this._pagEl.setJeepPaginationActiveIndex({ activeIndex: this._slidesParams.curSlide.toString() });
    }
    async _scrollToPosition(index) {
        if (index !== this._slidesParams.curSlide)
            this._slidesParams.curSlide = index;
        this._slidesParams.position = this._slidesParams.curSlide * this._slidesParams.slideLength;
        if (this._slidesParams.axis === 'x') {
            if (this._slidesEl)
                this._slidesEl.scrollTo(this._slidesParams.position, 0);
        }
        else {
            if (this._slidesEl)
                this._slidesEl.scrollTo(0, this._slidesParams.position);
        }
    }
    render() {
        return (h(Host, null, h("div", { class: "slides-container" }, h("div", { class: "slides-wrapper" }, h("div", { class: "slides" }, h("slot", { name: "slides" }))), !this.innerOptions.autoplay && this.innerOptions.navigation
            ? h("jeep-navigation", { id: "jeep-slides-navigation", name: this._navIcon })
            : null, !this.innerOptions.autoplay && this.innerOptions.pagination
            ? h("jeep-pagination", { id: `jeep-slides-pagination-${this._direction}`, ndisplay: this.innerOptions.pagination.bulletsDisplay ? this.innerOptions.pagination.bulletsDisplay : 5, clickable: this.innerOptions.pagination.clickable ? this.innerOptions.pagination.clickable : false, direction: this._direction })
            : null, this.innerOptions.autoplay
            ? h("jeep-play-controls", { id: "jeep-slides-autoplay", duration: this.innerOptions.autoplay.duration, nslides: this.nSlides })
            : null, this.innerOptions.fullscreen
            ? h("jeep-fullscreen", { id: "jeep-slides-fullscreen" })
            : null)));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "options": ["parseOptionsProp"]
    }; }
    static get style() { return ":host {\n  --slides-width: 100vw;\n  --slides-height: 100vh;\n  --slides-margin-top: var(--gslides-margin-top,0px);\n  --slides-margin-left:  var(--gslides-margin-left,0px);\n  --slides-margin-right: var(--gslides-margin-right,0px);\n  --slides-margin-bottom: var(--gslides-margin-bottom,0px);\n  --slides-background-color: var(--gslides-background-color,transparent);\n  --slides-pagination-bottom: var(--gslides-pagination-bottom,15px);\n  --slides-pagination-right: var(--gslides-pagination-right,5px);\n  --slides-bullet-active-diameter: var(--gslides-bullet-active-diameter,24px);\n  --slides-bullet-diameter: var(--gslides-bullet-diameter,15px);\n  --slides-bullet-background: var(--gslides-bullet-background,#000000);\n  --slides-bullet-opacity: var(--gslides-bullet-opacity,0.5);\n  --slides-bullet-active-background: var(--gslides-bullet-active-background,#ff8000);\n  --slides-bullet-active-opacity: var(--gslides-bullet-active-opacity,1);\n  --slides-navigation-button-width: var(--gslides-navigation-button-width,50px);\n  --slides-navigation-button-height: var(--gslides-navigation-button-height,50px);\n  --slides-navigation-padding-horizontal: var(--gslides-navigation-padding-horizontal,10px);\n  --slides-navigation-button-icon-color: var(--gslides-navigation-button-icon-color,#222428);\n  --slides-slide-scroll-snap-align: var(--gslides-slide-scroll-snap-align,start);\n  --slides-slide-background: var(--gslides-slide-background);\n  --slides-slide-color: var(--gslides-slide-color);\n  --slides-slide-title-font-size: var(--gslides-slide-title-font-size);\n  --slides-slide-subtitle-font-size: var(--gslides-slide-subtitle-font-size);\n  --slides-slide-content-top: var(--gslides-slide-content-top);\n  --slides-slide-content-padding: var(--gslides-slide-content-padding);\n  --slides-slide-content-font-size : var(--gslides-slide-content-font-size);\n  --slides-slide-content-text-align: var(--gslides-slide-content-text-align);\n  --slides-slide-header-top: var(--gslides-slide-header-top);\n  --slides-playcontrols-bottom: var(--gslides-playcontrols-bottom,20px);\n  --slides-playcontrols-button-width: var(--gslides-playcontrols-button-width,50px);\n  --slides-playcontrols-button-height: var(--gslides-playcontrols-button-height,50px);\n\n  --slides-fullscreen-top: var(--gslides-fullscreen-top,10px);\n  --slides-fullscreen-left: var(--gslides-fullscreen-left,10px);\n  --slides-fullscreen-button-width: var(--gslides-fullscreen-button-width,50px);\n  --slides-fullscreen-button-height: var(--gslides-fullscreen-button-height,50px);\n  --slides-fullscreen-button-icon-color: var(--gslides-fullscreen-button-icon-color,#222428);\n\n}\n\n.slides-container {\n  position: absolute; \n  top: 0; \n  bottom: 0; \n  right: 0; \n  left: 0; \n  overflow: hidden;\n  background-color: var(--slides-background-color);\n}\n\n.slides-wrapper {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 0;\n  margin-top: var(--slides-margin-top);\n  margin-bottom: var(--slides-margin-bottom);\n  margin-left: var(--slides-margin-left);\n  margin-right: var(--slides-margin-right);\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n\n.slides {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n  width: calc(var(--slides-width) - var(--slides-margin-left) - var(--slides-margin-right));\n  height: calc(var(--slides-height) - var(--slides-margin-top) - var(--slides-margin-bottom));\n  display: -ms-flexbox;\n  display: flex;\n  overflow: auto;\n  scroll-snap-type: mandatory; /* Firefox */  \n  -ms-scroll-snap-type: mandatory; /* IE/Edge */  \n  -webkit-scroll-snap-type: mandatory; /* Safari */  \n  -webkit-scroll-snap-destination: 0% 0%;  \n  -webkit-overflow-scrolling: touch; /* important for iOS */  \n}\n.slides.slides-horizontal {\n  -webkit-scroll-snap-type: x mandatory;\n  -ms-scroll-snap-type: x mandatory;\n  scroll-snap-type: x mandatory;\n  -webkit-scroll-snap-points-x: repeat(100%);\n  scroll-snap-points-x: repeat(100%);\n  -ms-scroll-snap-points-x: repeat(100%);\n  overflow-x: scroll;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  overflow-y: hidden;\n}\n.slides.slides-vertical {\n  -webkit-scroll-snap-type: y mandatory;\n  -ms-scroll-snap-type: y mandatory;\n  scroll-snap-type: y mandatory;\n  -webkit-scroll-snap-points-x: initial;\n  scroll-snap-points-x: initial;\n  -ms-scroll-snap-points-x: initial;\n  -webkit-scroll-snap-points-y: repeat(100%);\n  scroll-snap-points-y: repeat(100%);\n  -ms-scroll-snap-points-y: repeat(100%);\n  overflow-y: scroll;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  overflow-x: hidden;\n}\n\n\n#jeep-slides-navigation {\n  --navigation-top: calc(var(--slides-height) / 2 + var(--slides-margin-top) / 2 - var(--slides-margin-bottom) / 2);\n  --navigation-left: var(--slides-margin-left);\n  --navigation-width: calc(var(--slides-width) - var(--slides-margin-left) - var(--slides-margin-right));\n  --navigation-button-width: var(--slides-navigation-button-width);\n  --navigation-button-height: var(--slides-navigation-button-height);\n  --navigation-padding-horizontal: var(--slides-navigation-padding-horizontal);\n  --navigation-button-icon-color: var(--slides-navigation-button-icon-color);\n}\n#jeep-slides-pagination-horizontal {\n  --pagination-top: calc(var(--slides-height) - var(--slides-margin-bottom) - var(--slides-pagination-bottom));\n  --pagination-left: var(--slides-margin-left);\n  --pagination-height: auto;\n  --pagination-width: calc(var(--slides-width) - var(--slides-margin-left) - var(--slides-margin-right));\n  --bullet-active-diameter: var(--slides-bullet-active-diameter);\n  --bullet-diameter: var(--slides-bullet-diameter);\n  --bullet-background: var(--slides-bullet-background);\n  --bullet-opacity: var(--slides-bullet-opacity);\n  --bullet-active-background: var(--slides-bullet-active-background);\n  --bullet-active-opacity: var(--slides-bullet-active-opacity);\n}\n#jeep-slides-pagination-vertical {\n  --pagination-top: var(--slides-margin-top);\n  --pagination-left: calc(var(--slides-width) - var(--slides-pagination-right) - var(--slides-margin-right) - var(--slides-bullet-active-diameter));\n  --pagination-width: calc(var(--slides-bullet-active-diameter));\n  --pagination-height: calc(var(--slides-height) - var(--slides-margin-top) - var(--slides-margin-bottom));\n  --bullet-active-diameter: var(--slides-bullet-active-diameter);\n  --bullet-diameter: var(--slides-bullet-diameter);\n  --bullet-background: var(--slides-bullet-background);\n  --bullet-opacity: var(--slides-bullet-opacity);\n  --bullet-active-background: var(--slides-bullet-active-background);\n  --bullet-active-opacity: var(--slides-bullet-active-opacity);\n  visibility:visible;\n}\n#jeep-slides-autoplay {\n  --playcontrols-top: calc(var(--slides-height) - var(--slides-margin-bottom) - var(--slides-playcontrols-bottom) - var(--slides-playcontrols-button-height) );\n  --playcontrols-left: var(--slides-margin-left);\n  --playcontrols-width: calc(var(--slides-width) - var(--slides-margin-left) - var(--slides-margin-right));\n  --playcontrols-button-width: var(--slides-playcontrols-button-width);\n  --playcontrols-button-height: var(--slides-playcontrols-button-height);\n  visibility:visible;\n}\n#jeep-slides-fullscreen {\n  --fullscreen-top: calc( var(--slides-margin-top) + var(--slides-fullscreen-top) );\n  --fullscreen-left: calc( var(--slides-margin-left) + var(--slides-fullscreen-left) );\n  --fullscreen-width: calc(var(--slides-width) - var(--slides-margin-left) - var(--slides-margin-right) - var(--slides-fullscreen-left));\n  --fullscreen-button-width: var(--slides-fullscreen-button-width);\n  --fullscreen-button-height: var(--slides-fullscreen-button-height);\n  --fullscreen-button-icon-color: var(--slides-fullscreen-button-icon-color);\n  visibility:visible;\n}\njeep-slide {\n--slide-scroll-snap-align: var(--slides-slide-scroll-snap-align);\n--slide-min-width: calc(var(--slides-width) - var(--slides-margin-left) - var(--slides-margin-right));\n--slide-height: calc(var(--slides-height) - var(--slides-margin-top) - var(--slides-margin-bottom));\n}"; }
};

export { JeepSlides as jeep_slides };
