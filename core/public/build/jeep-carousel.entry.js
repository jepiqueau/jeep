import { r as registerInstance, c as createEvent, h, H as Host, d as getElement } from './core-7a7a831b.js';

const JeepCarousel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /*********************
         * State Definitions *
         *********************/
        this.innerData = [];
        this.pause = false;
        this.backward = false;
        this.forward = true;
        /*********************************
         * Internal Variable Definitions *
         *********************************/
        this._swiper = null; // cannot be Swiper as method init not in @types/swiper
        this._didInit = false;
        this._pagination = false;
        this._navigation = false;
        this._scrollbar = false;
        this._zoom = false;
        this._parallax = false;
        this._thumbs = false;
        this._autoplay = false;
        this._lazy = false;
        this._thumbsOptions = {};
        this._cleanstyles = true;
        this.didLoad = createEvent(this, "jeepCarouselDidLoad", 7);
        this.beforeDestroy = createEvent(this, "jeepCarouselBeforeDestroy", 7);
        this.afterDestroy = createEvent(this, "jeepCarouselAfterDestroy", 7);
        this.tap = createEvent(this, "jeepCarouselTap", 7);
        this.doubleTap = createEvent(this, "jeepCarouselDoubleTap", 7);
        this.slideChange = createEvent(this, "jeepCarouselSlideChange", 7);
        this.willChange = createEvent(this, "jeepCarouselWillChange", 7);
        this.didChange = createEvent(this, "jeepCarouselDidChange", 7);
        this.nextStart = createEvent(this, "jeepCarouselNextStart", 7);
        this.prevStart = createEvent(this, "jeepCarouselPrevStart", 7);
        this.nextEnd = createEvent(this, "jeepCarouselNextEnd", 7);
        this.prevEnd = createEvent(this, "jeepCarouselPrevEnd", 7);
        this.transitionStart = createEvent(this, "jeepCarouselTransitionStart", 7);
        this.transitionEnd = createEvent(this, "jeepCarouselTransitionEnd", 7);
        this.drag = createEvent(this, "jeepCarouselDrag", 7);
        this.reachStart = createEvent(this, "jeepCarouselReachStart", 7);
        this.reachEnd = createEvent(this, "jeepCarouselReachEnd", 7);
        this.touchStart = createEvent(this, "jeepCarouselTouchStart", 7);
        this.touchEnd = createEvent(this, "jeepCarouselTouchEnd", 7);
    }
    parseDataProp(newValue) {
        let slides = [];
        if (newValue) {
            const inpData = JSON.parse(newValue);
            for (let i = 0; i < inpData.slides.length; i++) {
                let slide;
                if (inpData.slides[i].slide[0].indexOf("swiper-slide") !== -1) {
                    slide = inpData.slides[i].slide[0];
                }
                else {
                    slide = '<div class="swiper-slide">';
                    if (this._zoom && inpData.slides[i].slide[0].indexOf("<img") === 0)
                        slide += '<div class="swiper-zoom-container">';
                    for (let j = 0; j < inpData.slides[i].slide.length; j++) {
                        slide += inpData.slides[i].slide[j];
                    }
                    if (this._zoom && inpData.slides[i].slide[0].indexOf("<img") === 0)
                        slide += '</div>';
                    if (this._lazy && inpData.slides[i].slide[0].indexOf("swiper-lazy") !== -1) {
                        slide += '<div class="swiper-lazy-preloader"></div>';
                    }
                    slide += '</div>';
                }
                slides = [...slides, slide];
            }
        }
        this.innerData = slides;
    }
    parseStyleProp(newValue) {
        this.innerStyle = newValue ? newValue : null;
    }
    async parseOptionsProp(newValue) {
        const options = newValue ? JSON.parse(newValue) : null;
        if (options !== null) {
            this._parallax = options.parallax ? true : false;
            this._thumbs = options.thumbs ? true : false;
            if (this._thumbs) {
                if (options.thumbs.swiper) {
                    if (options.thumbs.swiper.el) {
                        this._thumbsClass =
                            options.thumbs.swiper.el.indexOf('.') === 0
                                ? options.thumbs.swiper.el.substr(1)
                                : options.thumbs.swiper.el;
                        delete options.thumbs.swiper.el;
                        this._thumbsOptions = options.thumbs.swiper;
                    }
                    else {
                        this._thumbsClass = "swiper-container-thumbs";
                        this._thumbsOptions = options.thumbs.swiper;
                    }
                }
                else {
                    this._thumbsClass = "swiper-container-thumbs";
                    this._thumbsOptions = { slidesPerView: 4,
                        spaceBetween: 10,
                    };
                }
                if (!this._thumbsOptions.watchSlidesProgress)
                    this._thumbsOptions.watchSlidesProgress = true;
            }
            this._lazy = options.lazy ? true : false;
            this._zoom = options.zoom ? true : false;
            this._pagination = options.pagination ? true : false;
            this._navigation = options.navigation ? true : false;
            this._scrollbar = options.scrollbar ? true : false;
            this._autoplay = options.autoplay ? true : false;
        }
        if (this._didInit && options !== null) {
            Object.assign(this._swiper.params, options);
            await this.update();
        }
        this.innerOptions = options;
    }
    parseRtlProp(newValue) {
        this.innerRtl = newValue ? newValue : false;
    }
    parseParallaxOptions(newValue) {
        let parallaxOptions = newValue ? JSON.parse(newValue) : null;
        if (this._parallax) {
            this._parallaxStyle = { "background-image": parallaxOptions.imageUrl };
        }
        else {
            parallaxOptions = null;
        }
        this.innerParallaxOptions = parallaxOptions;
    }
    parsePlayControlsProp(newValue) {
        this.innerPlayControls = this._autoplay && newValue ? newValue : false;
    }
    parseNotCleanStylesProp(newValue) {
        const notCleanStyles = newValue ? newValue : false;
        this._cleanstyles = !notCleanStyles;
        this.innerNotCleanStyles = notCleanStyles;
    }
    /**********************
     * Method Definitions *
     **********************/
    /**
     * Init data from properties.
     */
    init() {
        return Promise.resolve(this._init());
    }
    /**
     * Set the swiper.
     */
    setSwiper() {
        return Promise.resolve(this._setSwiper());
    }
    /**
     * Update the underlying slider implementation. Call this if you've added or removed
     * child slides.
     */
    async update() {
        this._swiper.update();
    }
    /**
     * Append new slides
     * slides could be HTMLElement or HTML string with new slide
     * or array with such slides
     */
    async appendSlide(slides) {
        this._swiper.appendSlide(slides);
    }
    /**
     * Add new slides to required index
     * slides could be HTMLElement or HTML string with new slide
     * or array with such slides
     */
    async addSlide(index, slides) {
        this._swiper.addSlide(index, slides);
    }
    /**
     * Transition to the specified slide.
     */
    async slideTo(index, speed, runCallbacks) {
        this._swiper.slideTo(index, speed, runCallbacks);
    }
    /**
     * Transition to the next slide.
     */
    async slideNext(speed, runCallbacks) {
        this._swiper.slideNext(speed, runCallbacks);
    }
    /**
     * Transition to the previous slide.
     */
    async slidePrev(speed, runCallbacks) {
        this._swiper.slidePrev(speed, runCallbacks);
    }
    /**
     * Get the index of the active slide.
     */
    async getActiveIndex() {
        return this._swiper.activeIndex;
    }
    /**
     * Get the index of the previous slide.
     */
    async getPreviousIndex() {
        return this._swiper.previousIndex;
    }
    /**
     * Get the total number of slides.
     */
    async length() {
        return this._swiper.slides.length;
    }
    /**
     * Get whether or not the current slide is the last slide.
     *
     */
    async isEnd() {
        return this._swiper.isEnd;
    }
    /**
     * Get whether or not the current slide is the first slide.
     */
    async isBeginning() {
        return this._swiper.isBeginning;
    }
    /**
     * Start auto play.
     */
    async startAutoplay() {
        if (this._swiper.autoplay) {
            this._swiper.autoplay.start();
        }
    }
    /**
     * Stop auto play.
     */
    async stopAutoplay() {
        if (this._swiper.autoplay) {
            this._swiper.autoplay.stop();
        }
    }
    /**
     * Swiper destroy.
     */
    async swiperDestroy(cleanstyles) {
        if (this._swiper) {
            this._swiper.removeAllSlides();
            this._swiper.detachEvents();
            this._swiper.destroy(true, cleanstyles);
            this.afterDestroy.emit();
            if (this._thumbs) {
                this._swiperThumbs.removeAllSlides();
                this._swiperThumbs.detachEvents();
                this._swiperThumbs.destroy(true, true);
            }
            this._didInit = false;
            this._swiper = null;
        }
    }
    async componentWillLoad() {
        await this.init();
    }
    async componentDidLoad() {
        await this.setSwiper();
    }
    async componentDidUnload() {
        await this.swiperDestroy(this._cleanstyles);
    }
    async _init() {
        const defParallaxOptions = {
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
    async _setSwiper() {
        const { Swiper } = await __sc_import_jeep('./swiper-ce3ee4f0.js');
        /**
         * Thumbs Swiper Container if any
         */
        if (this._thumbs) {
            this._swiperThumbsEl = this.el.querySelector('.' + this._thumbsClass);
            if (this.innerData && this.innerData.length > 0 && this._swiperThumbsEl !== null) {
                this._swiperThumbs = new Swiper(this._swiperThumbsEl, this._thumbsOptions);
                this._swiperThumbs.appendSlide(this.innerData);
                this._swiperThumbs.update();
                this.innerOptions.thumbs = { swiper: this._swiperThumbs };
            }
        }
        /**
         * Main Swiper Container
         */
        const swiperEl = this.el.querySelector('.swiper-container');
        this.innerOptions = this.innerOptions !== null ? this.innerOptions : {};
        this.innerOptions.init = false;
        if (swiperEl !== null) {
            this._swiper = new Swiper(swiperEl, this.innerOptions);
            /**
             * add some events
             */
            this._swiper.on('init', () => {
                setTimeout(() => {
                    this._didInit = true;
                    this.didLoad.emit();
                }, 20);
            });
            this._swiper.on('slideChange', async () => {
                if (this._didInit) {
                    await this.update();
                }
                this.slideChange.emit();
                if (this.innerPlayControls) {
                    if (this._swiper.isBeginning) {
                        this.backward = false;
                    }
                    else if (this._swiper.isEnd) {
                        this.pause = false;
                        this.forward = false;
                    }
                    else {
                        this.backward = true;
                        this.forward = true;
                    }
                }
            });
            this._swiper.on('beforeDestroy', () => {
                this.beforeDestroy.emit();
            });
            this._swiper.on('tap', () => {
                this.tap.emit();
            });
            this._swiper.on('doubleTap', () => {
                this.doubleTap.emit();
            });
            this._swiper.on('slideChangeTransitionStart', () => {
                this.willChange.emit();
            });
            this._swiper.on('slideChangeTransitionEnd', () => {
                this.didChange.emit();
            });
            this._swiper.on('slideNextTransitionStart', () => {
                this.nextStart.emit();
            });
            this._swiper.on('slidePrevTransitionStart', () => {
                this.prevStart.emit();
            });
            this._swiper.on('slideNextTransitionEnd', () => {
                this.nextEnd.emit();
            });
            this._swiper.on('slidePrevTransitionEnd', () => {
                this.prevEnd.emit();
            });
            this._swiper.on('transitionStart', () => {
                this.transitionStart.emit();
            });
            this._swiper.on('transitionEnd', () => {
                this.transitionEnd.emit();
            });
            this._swiper.on('sliderMove', () => {
                this.drag.emit();
            });
            this._swiper.on('reachBeginning', () => {
                this.reachStart.emit();
            });
            this._swiper.on('reachEnd', () => {
                this.reachEnd.emit();
            });
            this._swiper.on('touchStart', async () => {
                this.touchStart.emit();
                this._initial = await this._doHide(2500);
                if (this._autoplay && !this._swiper.autoplay.running && !this.innerPlayControls)
                    this._swiper.autoplay.start();
            });
            this._swiper.on('touchEnd', () => {
                this.touchEnd.emit();
            });
            /**
             * swiper init
             */
            this._swiper.init();
            /**
             * add slides
             */
            if (this.innerData && this.innerData.length > 0) {
                await this.appendSlide(this.innerData);
                if (this._lazy) {
                    this._swiper.lazy.loadInSlide(0);
                    this._swiper.lazy.loadInSlide(1);
                }
                await this.update();
            }
            if (!this.innerPlayControls && this._scrollbar)
                this._scrollbarEl = swiperEl.querySelector('.swiper-scrollbar');
            if (!this.innerPlayControls && this._pagination)
                this._paginationEl = swiperEl.querySelector('.swiper-pagination');
            if (!this.innerPlayControls && this._navigation) {
                this._navButtons = swiperEl.querySelector('.swiper-navigation-buttons');
                this._navPrevEl = this._navButtons.querySelector('.swiper-button-prev');
                this._navNextEl = this._navButtons.querySelector('.swiper-button-next');
                let nextStyle = "background-image:var(--navigation-next-background,";
                nextStyle += "url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2027%2044%22%3E%3Cpath%20fill=%22%23007aff%22%20d=%22M27%2022L27%2022L5%2044l-2.1-2.1L22.8%2022L2.9%202.1L5%200z%22/%3E%3C/svg%3E));";
                nextStyle += "right: var(--navigation-position,10px);";
                let constStyle = "width: var(--navigation-width,27px);height: var(--navigation-height,44px);";
                constStyle += "background-size: var(--navigation-width,27px) var(--navigation-height,44px);-moz-background-size: var(--navigation-width,27px) var(--navigation-height,44px);";
                constStyle += "-webkit-background-size: var(--navigation-width,27px) var(--navigation-height,44px);";
                let prevStyle = "background-image:var(--navigation-prev-background,";
                prevStyle += "url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2027%2044%22%3E%3Cpath%20fill=%22%23007aff%22%20d=%22M0%2022L22%200l2.1%202.1L4.2%2022l19.9%2019.9L22%2044z%22/%3E%3C/svg%3E));";
                prevStyle += "left: var(--navigation-position,10px);";
                if (this.innerRtl) {
                    this._navNextEl.setAttribute("style", prevStyle + constStyle);
                    this._navPrevEl.setAttribute("style", nextStyle + constStyle);
                }
                else {
                    this._navNextEl.setAttribute("style", nextStyle + constStyle);
                    this._navPrevEl.setAttribute("style", prevStyle + constStyle);
                }
            }
            if (this.playcontrols) {
                this._playControlsEl = swiperEl.querySelector('.swiper-playcontrols-buttons');
                this._playBackwardEl = swiperEl.querySelector('.autoplay-button-skip-backward');
                this._playForwardEl = swiperEl.querySelector('.autoplay-button-skip-forward');
            }
            this._initial = await this._doHide(20);
            if (this._autoplay && !this.innerPlayControls) {
                this._swiper.autoplay.start();
            }
            else {
                this._swiper.autoplay.stop();
            }
        }
        return;
    }
    async _doVisible() {
        if (this._scrollbarEl && this._scrollbarEl.classList.contains('hidden'))
            this._scrollbarEl.classList.remove('hidden');
        if (this._paginationEl && this._paginationEl.classList.contains('hidden'))
            this._paginationEl.classList.remove('hidden');
        if (this._navButtons && this._navButtons.classList.contains('hidden'))
            this._navButtons.classList.remove('hidden');
        if (this._playControlsEl && this._playControlsEl.classList.contains('hidden'))
            this._playControlsEl.classList.remove('hidden');
        if (this._thumbs && this._swiperThumbsEl && this._swiperThumbsEl.classList.contains('hidden')) {
            this._swiperThumbsEl.classList.remove('hidden');
        }
        return;
    }
    async _doHide(duration) {
        clearTimeout(this._initial);
        await this._doVisible();
        let initial = setTimeout(() => {
            if (this._scrollbarEl)
                this._scrollbarEl.classList.add('hidden');
            if (this._paginationEl)
                this._paginationEl.classList.add('hidden');
            if (this._navButtons)
                this._navButtons.classList.add('hidden');
            if (this._playControlsEl)
                this._playControlsEl.classList.add('hidden');
            if (this._thumbs && this._swiperThumbsEl) {
                this._swiperThumbsEl.classList.add('hidden');
            }
        }, duration);
        return initial;
    }
    _handleClick(event) {
        if (event.target.classList.contains('autoplay-button-play')) {
            if (this._swiper.isEnd) {
                this._swiper.slideTo(0, 0, false);
                this.forward = true;
            }
            this._swiper.autoplay.start();
            this.pause = true;
        }
        else if (event.target.classList.contains('autoplay-button-skip-backward')) {
            this._swiper.slidePrev(0, false);
        }
        else if (event.target.classList.contains('autoplay-button-skip-forward')) {
            this._swiper.slideNext(0, false);
        }
        else {
            this._swiper.autoplay.stop();
            this.pause = false;
        }
    }
    render() {
        let toRender = [];
        if (this.innerData && this.innerData.length > 0) {
            // swiper-container elements
            let swiperContent = [];
            // add parallax-bg if any
            if (this._parallax) {
                if (this.innerParallaxOptions.dataSwiperParallax) {
                    swiperContent = [...swiperContent,
                        h("div", { class: "parallax-bg", style: this._parallaxStyle, "data-swiper-parallax": this.innerParallaxOptions.dataSwiperParallax })];
                }
                if (this.innerParallaxOptions.dataSwiperParallaxX && this.innerParallaxOptions.dataSwiperParallaxY) {
                    swiperContent = [...swiperContent,
                        h("div", { class: "parallax-bg", style: this._parallaxStyle, "data-swiper-parallax-x": this.innerParallaxOptions.dataSwiperParallaxX, "data-swiper-parallax-y": this.innerParallaxOptions.dataSwiperParallaxY })];
                }
                else if (this.innerParallaxOptions.dataSwiperParallaxX) {
                    swiperContent = [...swiperContent,
                        h("div", { class: "parallax-bg", style: this._parallaxStyle, "data-swiper-parallax-x": this.innerParallaxOptions.dataSwiperParallaxX })];
                }
                else if (this.innerParallaxOptions.dataSwiperParallaxY) {
                    swiperContent = [...swiperContent,
                        h("div", { class: "parallax-bg", style: this._parallaxStyle, "data-swiper-parallax-y": this.innerParallaxOptions.dataSwiperParallaxY })];
                }
            }
            // add swiper-wrapper
            swiperContent = [...swiperContent,
                h("div", { class: "swiper-wrapper" })
            ];
            // add swiper-scrollbar if any
            if (!this.innerPlayControls && this._scrollbar) {
                swiperContent = [...swiperContent,
                    h("div", { class: "swiper-scrollbar" })];
            }
            // add swiper-pagination if any
            if (!this.innerPlayControls && this._pagination) {
                swiperContent = [...swiperContent,
                    h("div", { class: "swiper-pagination" })];
            }
            // add swiper-navigation-buttons id any
            if (!this.innerPlayControls && this._navigation) {
                swiperContent = [...swiperContent,
                    h("div", { class: "swiper-navigation-buttons" }, h("div", { class: "swiper-button-prev" }), h("div", { class: "swiper-button-next" }))];
            }
            // add swiper-playcontrols-buttons if any
            if (this.innerPlayControls) {
                swiperContent = [...swiperContent,
                    h("div", { class: "swiper-playcontrols-buttons" }, this.backward
                        ? h("div", { class: "swiper-playcontrols-button autoplay-button-skip-backward", onClick: (event) => this._handleClick(event) })
                        : null, this.pause
                        ? h("div", { class: "swiper-playcontrols-button autoplay-button-pause", onClick: (event) => this._handleClick(event) })
                        : h("div", { class: "swiper-playcontrols-button autoplay-button-play", onClick: (event) => this._handleClick(event) }), this.forward
                        ? h("div", { class: "swiper-playcontrols-button autoplay-button-skip-forward", onClick: (event) => this._handleClick(event) })
                        : null)];
            }
            // swiper-container-thumbs elements if any
            let swiperThumbsContent = [];
            if (this._thumbs) {
                // add swiper-wrapper
                swiperThumbsContent = [...swiperThumbsContent,
                    h("div", { class: "swiper-wrapper" })
                ];
            }
            toRender = [...toRender,
                h("style", null, this.innerStyle),
                h("div", { class: "container" }, this.innerRtl
                    ? h("div", { class: "swiper-container", dir: 'rtl' }, swiperContent)
                    : h("div", { class: "swiper-container" }, swiperContent), this._thumbs
                    ?
                        h("div", { class: "swiper-container " + this._thumbsClass + " gallery-thumbs" }, swiperThumbsContent)
                    :
                        null)
            ];
        }
        else {
            toRender = [...toRender,
                h("div", { id: 'fake-card' })
            ];
        }
        return (h(Host, null, toRender));
    }
    static get assetsDirs() { return ["swiper"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "data": ["parseDataProp"],
        "cstyle": ["parseStyleProp"],
        "options": ["parseOptionsProp"],
        "rtl": ["parseRtlProp"],
        "parallaxoptions": ["parseParallaxOptions"],
        "playcontrols": ["parsePlayControlsProp"],
        "notcleanstyles": ["parseNotCleanStylesProp"]
    }; }
    static get style() { return "/**\n * Swiper 4.4.6\n * Most modern mobile touch slider and framework with hardware accelerated transitions\n * http://www.idangero.us/swiper/\n *\n * Copyright 2014-2018 Vladimir Kharlampidi\n *\n * Released under the MIT License\n *\n * Released on: December 19, 2018\n */\n.swiper-container {\n  margin: 0 auto;\n  position: relative;\n  overflow: hidden;\n  list-style: none;\n  padding: 0;\n  /* Fix of Webkit flickering */\n  z-index: 1;\n}\n.swiper-container-no-flexbox .swiper-slide {\n  float: left;\n}\n.swiper-container-vertical > .swiper-wrapper {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n}\n.swiper-wrapper {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-transition-property: -webkit-transform;\n  transition-property: -webkit-transform;\n  -o-transition-property: transform;\n  transition-property: transform;\n  transition-property: transform, -webkit-transform;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box;\n}\n.swiper-container-android .swiper-slide,\n.swiper-wrapper {\n  -webkit-transform: translate3d(0px, 0, 0);\n  transform: translate3d(0px, 0, 0);\n}\n.swiper-container-multirow > .swiper-wrapper {\n  -webkit-flex-wrap: wrap;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n}\n.swiper-container-free-mode > .swiper-wrapper {\n  -webkit-transition-timing-function: ease-out;\n  -o-transition-timing-function: ease-out;\n  transition-timing-function: ease-out;\n  margin: 0 auto;\n}\n.swiper-slide {\n  -webkit-flex-shrink: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  width: 100%;\n  height: 100%;\n  position: relative;\n  -webkit-transition-property: -webkit-transform;\n  transition-property: -webkit-transform;\n  -o-transition-property: transform;\n  transition-property: transform;\n  transition-property: transform, -webkit-transform;\n}\n.swiper-slide-invisible-blank {\n  visibility: hidden;\n}\n/* Auto Height */\n.swiper-container-autoheight,\n.swiper-container-autoheight .swiper-slide {\n  height: auto;\n}\n.swiper-container-autoheight .swiper-wrapper {\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n  -ms-flex-align: start;\n  align-items: flex-start;\n  -webkit-transition-property: height, -webkit-transform;\n  transition-property: height, -webkit-transform;\n  -o-transition-property: transform, height;\n  transition-property: transform, height;\n  transition-property: transform, height, -webkit-transform;\n}\n/* 3D Effects */\n.swiper-container-3d {\n  -webkit-perspective: 1200px;\n  perspective: 1200px;\n}\n.swiper-container-3d .swiper-wrapper,\n.swiper-container-3d .swiper-slide,\n.swiper-container-3d .swiper-slide-shadow-left,\n.swiper-container-3d .swiper-slide-shadow-right,\n.swiper-container-3d .swiper-slide-shadow-top,\n.swiper-container-3d .swiper-slide-shadow-bottom,\n.swiper-container-3d .swiper-cube-shadow {\n  -webkit-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n}\n.swiper-container-3d .swiper-slide-shadow-left,\n.swiper-container-3d .swiper-slide-shadow-right,\n.swiper-container-3d .swiper-slide-shadow-top,\n.swiper-container-3d .swiper-slide-shadow-bottom {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  z-index: 10;\n}\n.swiper-container-3d .swiper-slide-shadow-left {\n  background-image: -webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\n  background-image: -webkit-linear-gradient(right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  background-image: -o-linear-gradient(right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n}\n.swiper-container-3d .swiper-slide-shadow-right {\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n}\n.swiper-container-3d .swiper-slide-shadow-top {\n  background-image: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\n  background-image: -webkit-linear-gradient(bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  background-image: -o-linear-gradient(bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n}\n.swiper-container-3d .swiper-slide-shadow-bottom {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\n  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n}\n/* IE10 Windows Phone 8 Fixes */\n.swiper-container-wp8-horizontal,\n.swiper-container-wp8-horizontal > .swiper-wrapper {\n  -ms-touch-action: pan-y;\n  touch-action: pan-y;\n}\n.swiper-container-wp8-vertical,\n.swiper-container-wp8-vertical > .swiper-wrapper {\n  -ms-touch-action: pan-x;\n  touch-action: pan-x;\n}\n.swiper-button-prev,\n.swiper-button-next {\n  position: absolute;\n  top: 50%;\n  width: 27px;\n  height: 44px;\n  margin-top: -22px;\n  z-index: 10;\n  cursor: pointer;\n  background-size: 27px 44px;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n.swiper-button-prev.swiper-button-disabled,\n.swiper-button-next.swiper-button-disabled {\n  opacity: 0.35;\n  cursor: auto;\n  pointer-events: none;\n}\n.swiper-button-prev,\n.swiper-container-rtl .swiper-button-next {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z\'%20fill%3D\'%23007aff\'%2F%3E%3C%2Fsvg%3E\");\n  left: 10px;\n  right: auto;\n}\n.swiper-button-next,\n.swiper-container-rtl .swiper-button-prev {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z\'%20fill%3D\'%23007aff\'%2F%3E%3C%2Fsvg%3E\");\n  right: 10px;\n  left: auto;\n}\n.swiper-button-prev.swiper-button-white,\n.swiper-container-rtl .swiper-button-next.swiper-button-white {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z\'%20fill%3D\'%23ffffff\'%2F%3E%3C%2Fsvg%3E\");\n}\n.swiper-button-next.swiper-button-white,\n.swiper-container-rtl .swiper-button-prev.swiper-button-white {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z\'%20fill%3D\'%23ffffff\'%2F%3E%3C%2Fsvg%3E\");\n}\n.swiper-button-prev.swiper-button-black,\n.swiper-container-rtl .swiper-button-next.swiper-button-black {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z\'%20fill%3D\'%23000000\'%2F%3E%3C%2Fsvg%3E\");\n}\n.swiper-button-next.swiper-button-black,\n.swiper-container-rtl .swiper-button-prev.swiper-button-black {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z\'%20fill%3D\'%23000000\'%2F%3E%3C%2Fsvg%3E\");\n}\n.swiper-button-lock {\n  display: none;\n}\n.swiper-pagination {\n  position: absolute;\n  text-align: center;\n  -webkit-transition: 300ms opacity;\n  -o-transition: 300ms opacity;\n  transition: 300ms opacity;\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n  z-index: 10;\n}\n.swiper-pagination.swiper-pagination-hidden {\n  opacity: 0;\n}\n/* Common Styles */\n.swiper-pagination-fraction,\n.swiper-pagination-custom,\n.swiper-container-horizontal > .swiper-pagination-bullets {\n  bottom: 10px;\n  left: 0;\n  width: 100%;\n}\n/* Bullets */\n.swiper-pagination-bullets-dynamic {\n  overflow: hidden;\n  font-size: 0;\n}\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {\n  -webkit-transform: scale(0.33);\n  -ms-transform: scale(0.33);\n  transform: scale(0.33);\n  position: relative;\n}\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active {\n  -webkit-transform: scale(1);\n  -ms-transform: scale(1);\n  transform: scale(1);\n}\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main {\n  -webkit-transform: scale(1);\n  -ms-transform: scale(1);\n  transform: scale(1);\n}\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev {\n  -webkit-transform: scale(0.66);\n  -ms-transform: scale(0.66);\n  transform: scale(0.66);\n}\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev {\n  -webkit-transform: scale(0.33);\n  -ms-transform: scale(0.33);\n  transform: scale(0.33);\n}\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next {\n  -webkit-transform: scale(0.66);\n  -ms-transform: scale(0.66);\n  transform: scale(0.66);\n}\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next {\n  -webkit-transform: scale(0.33);\n  -ms-transform: scale(0.33);\n  transform: scale(0.33);\n}\n.swiper-pagination-bullet {\n  width: 8px;\n  height: 8px;\n  display: inline-block;\n  border-radius: 100%;\n  background: #000;\n  opacity: 0.2;\n}\nbutton.swiper-pagination-bullet {\n  border: none;\n  margin: 0;\n  padding: 0;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n.swiper-pagination-clickable .swiper-pagination-bullet {\n  cursor: pointer;\n}\n.swiper-pagination-bullet-active {\n  opacity: 1;\n  background: #007aff;\n}\n.swiper-container-vertical > .swiper-pagination-bullets {\n  right: 10px;\n  top: 50%;\n  -webkit-transform: translate3d(0px, -50%, 0);\n  transform: translate3d(0px, -50%, 0);\n}\n.swiper-container-vertical > .swiper-pagination-bullets .swiper-pagination-bullet {\n  margin: 6px 0;\n  display: block;\n}\n.swiper-container-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  transform: translateY(-50%);\n  width: 8px;\n}\n.swiper-container-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {\n  display: inline-block;\n  -webkit-transition: 200ms top, 200ms -webkit-transform;\n  transition: 200ms top, 200ms -webkit-transform;\n  -o-transition: 200ms transform, 200ms top;\n  transition: 200ms transform, 200ms top;\n  transition: 200ms transform, 200ms top, 200ms -webkit-transform;\n}\n.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {\n  margin: 0 4px;\n}\n.swiper-container-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  -ms-transform: translateX(-50%);\n  transform: translateX(-50%);\n  white-space: nowrap;\n}\n.swiper-container-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {\n  -webkit-transition: 200ms left, 200ms -webkit-transform;\n  transition: 200ms left, 200ms -webkit-transform;\n  -o-transition: 200ms transform, 200ms left;\n  transition: 200ms transform, 200ms left;\n  transition: 200ms transform, 200ms left, 200ms -webkit-transform;\n}\n.swiper-container-horizontal.swiper-container-rtl > .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {\n  -webkit-transition: 200ms right, 200ms -webkit-transform;\n  transition: 200ms right, 200ms -webkit-transform;\n  -o-transition: 200ms transform, 200ms right;\n  transition: 200ms transform, 200ms right;\n  transition: 200ms transform, 200ms right, 200ms -webkit-transform;\n}\n/* Progress */\n.swiper-pagination-progressbar {\n  background: rgba(0, 0, 0, 0.25);\n  position: absolute;\n}\n.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {\n  background: #007aff;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  -webkit-transform: scale(0);\n  -ms-transform: scale(0);\n  transform: scale(0);\n  -webkit-transform-origin: left top;\n  -ms-transform-origin: left top;\n  transform-origin: left top;\n}\n.swiper-container-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {\n  -webkit-transform-origin: right top;\n  -ms-transform-origin: right top;\n  transform-origin: right top;\n}\n.swiper-container-horizontal > .swiper-pagination-progressbar,\n.swiper-container-vertical > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite {\n  width: 100%;\n  height: 4px;\n  left: 0;\n  top: 0;\n}\n.swiper-container-vertical > .swiper-pagination-progressbar,\n.swiper-container-horizontal > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite {\n  width: 4px;\n  height: 100%;\n  left: 0;\n  top: 0;\n}\n.swiper-pagination-white .swiper-pagination-bullet-active {\n  background: #ffffff;\n}\n.swiper-pagination-progressbar.swiper-pagination-white {\n  background: rgba(255, 255, 255, 0.25);\n}\n.swiper-pagination-progressbar.swiper-pagination-white .swiper-pagination-progressbar-fill {\n  background: #ffffff;\n}\n.swiper-pagination-black .swiper-pagination-bullet-active {\n  background: #000000;\n}\n.swiper-pagination-progressbar.swiper-pagination-black {\n  background: rgba(0, 0, 0, 0.25);\n}\n.swiper-pagination-progressbar.swiper-pagination-black .swiper-pagination-progressbar-fill {\n  background: #000000;\n}\n.swiper-pagination-lock {\n  display: none;\n}\n/* Scrollbar */\n.swiper-scrollbar {\n  border-radius: 10px;\n  position: relative;\n  -ms-touch-action: none;\n  background: rgba(0, 0, 0, 0.1);\n}\n.swiper-container-horizontal > .swiper-scrollbar {\n  position: absolute;\n  left: 1%;\n  bottom: 3px;\n  z-index: 50;\n  height: 5px;\n  width: 98%;\n}\n.swiper-container-vertical > .swiper-scrollbar {\n  position: absolute;\n  right: 3px;\n  top: 1%;\n  z-index: 50;\n  width: 5px;\n  height: 98%;\n}\n.swiper-scrollbar-drag {\n  height: 100%;\n  width: 100%;\n  position: relative;\n  background: rgba(0, 0, 0, 0.5);\n  border-radius: 10px;\n  left: 0;\n  top: 0;\n}\n.swiper-scrollbar-cursor-drag {\n  cursor: move;\n}\n.swiper-scrollbar-lock {\n  display: none;\n}\n.swiper-zoom-container {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  text-align: center;\n}\n.swiper-zoom-container > img,\n.swiper-zoom-container > svg,\n.swiper-zoom-container > canvas {\n  max-width: 100%;\n  max-height: 100%;\n  -o-object-fit: contain;\n  object-fit: contain;\n}\n.swiper-slide-zoomed {\n  cursor: move;\n}\n/* Preloader */\n.swiper-lazy-preloader {\n  width: 42px;\n  height: 42px;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin-left: -21px;\n  margin-top: -21px;\n  z-index: 10;\n  -webkit-transform-origin: 50%;\n  -ms-transform-origin: 50%;\n  transform-origin: 50%;\n  -webkit-animation: swiper-preloader-spin 1s steps(12, end) infinite;\n  animation: swiper-preloader-spin 1s steps(12, end) infinite;\n}\n.swiper-lazy-preloader:after {\n  display: block;\n  content: \'\';\n  width: 100%;\n  height: 100%;\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D\'0%200%20120%20120\'%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20xmlns%3Axlink%3D\'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink\'%3E%3Cdefs%3E%3Cline%20id%3D\'l\'%20x1%3D\'60\'%20x2%3D\'60\'%20y1%3D\'7\'%20y2%3D\'27\'%20stroke%3D\'%236c6c6c\'%20stroke-width%3D\'11\'%20stroke-linecap%3D\'round\'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(30%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(60%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(90%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(120%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(150%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.37\'%20transform%3D\'rotate(180%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.46\'%20transform%3D\'rotate(210%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.56\'%20transform%3D\'rotate(240%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.66\'%20transform%3D\'rotate(270%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.75\'%20transform%3D\'rotate(300%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.85\'%20transform%3D\'rotate(330%2060%2C60)\'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n  background-position: 50%;\n  background-size: 100%;\n  background-repeat: no-repeat;\n}\n.swiper-lazy-preloader-white:after {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D\'0%200%20120%20120\'%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20xmlns%3Axlink%3D\'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink\'%3E%3Cdefs%3E%3Cline%20id%3D\'l\'%20x1%3D\'60\'%20x2%3D\'60\'%20y1%3D\'7\'%20y2%3D\'27\'%20stroke%3D\'%23fff\'%20stroke-width%3D\'11\'%20stroke-linecap%3D\'round\'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(30%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(60%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(90%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(120%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(150%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.37\'%20transform%3D\'rotate(180%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.46\'%20transform%3D\'rotate(210%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.56\'%20transform%3D\'rotate(240%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.66\'%20transform%3D\'rotate(270%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.75\'%20transform%3D\'rotate(300%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.85\'%20transform%3D\'rotate(330%2060%2C60)\'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n}\n\@-webkit-keyframes swiper-preloader-spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\@keyframes swiper-preloader-spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n/* a11y */\n.swiper-container .swiper-notification {\n  position: absolute;\n  left: 0;\n  top: 0;\n  pointer-events: none;\n  opacity: 0;\n  z-index: -1000;\n}\n.swiper-container-fade.swiper-container-free-mode .swiper-slide {\n  -webkit-transition-timing-function: ease-out;\n  -o-transition-timing-function: ease-out;\n  transition-timing-function: ease-out;\n}\n.swiper-container-fade .swiper-slide {\n  pointer-events: none;\n  -webkit-transition-property: opacity;\n  -o-transition-property: opacity;\n  transition-property: opacity;\n}\n.swiper-container-fade .swiper-slide .swiper-slide {\n  pointer-events: none;\n}\n.swiper-container-fade .swiper-slide-active,\n.swiper-container-fade .swiper-slide-active .swiper-slide-active {\n  pointer-events: auto;\n}\n.swiper-container-cube {\n  overflow: visible;\n}\n.swiper-container-cube .swiper-slide {\n  pointer-events: none;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  z-index: 1;\n  visibility: hidden;\n  -webkit-transform-origin: 0 0;\n  -ms-transform-origin: 0 0;\n  transform-origin: 0 0;\n  width: 100%;\n  height: 100%;\n}\n.swiper-container-cube .swiper-slide .swiper-slide {\n  pointer-events: none;\n}\n.swiper-container-cube.swiper-container-rtl .swiper-slide {\n  -webkit-transform-origin: 100% 0;\n  -ms-transform-origin: 100% 0;\n  transform-origin: 100% 0;\n}\n.swiper-container-cube .swiper-slide-active,\n.swiper-container-cube .swiper-slide-active .swiper-slide-active {\n  pointer-events: auto;\n}\n.swiper-container-cube .swiper-slide-active,\n.swiper-container-cube .swiper-slide-next,\n.swiper-container-cube .swiper-slide-prev,\n.swiper-container-cube .swiper-slide-next + .swiper-slide {\n  pointer-events: auto;\n  visibility: visible;\n}\n.swiper-container-cube .swiper-slide-shadow-top,\n.swiper-container-cube .swiper-slide-shadow-bottom,\n.swiper-container-cube .swiper-slide-shadow-left,\n.swiper-container-cube .swiper-slide-shadow-right {\n  z-index: 0;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n}\n.swiper-container-cube .swiper-cube-shadow {\n  position: absolute;\n  left: 0;\n  bottom: 0px;\n  width: 100%;\n  height: 100%;\n  background: #000;\n  opacity: 0.6;\n  -webkit-filter: blur(50px);\n  filter: blur(50px);\n  z-index: 0;\n}\n.swiper-container-flip {\n  overflow: visible;\n}\n.swiper-container-flip .swiper-slide {\n  pointer-events: none;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  z-index: 1;\n}\n.swiper-container-flip .swiper-slide .swiper-slide {\n  pointer-events: none;\n}\n.swiper-container-flip .swiper-slide-active,\n.swiper-container-flip .swiper-slide-active .swiper-slide-active {\n  pointer-events: auto;\n}\n.swiper-container-flip .swiper-slide-shadow-top,\n.swiper-container-flip .swiper-slide-shadow-bottom,\n.swiper-container-flip .swiper-slide-shadow-left,\n.swiper-container-flip .swiper-slide-shadow-right {\n  z-index: 0;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n}\n.swiper-container-coverflow .swiper-wrapper {\n  /* Windows 8 IE 10 fix */\n  -ms-perspective: 1200px;\n}\n\n\n#fake-card {\n    margin: 1.5em;\n    height: 400px;\n    background-image: linear-gradient(100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80%), linear-gradient(lightgray 20px, transparent 0), linear-gradient(lightgray 20px, transparent 0), linear-gradient(lightgray 100px, transparent 0);\n    background-size: 100% 220px;\n    background-position: 10px 0, 10px 120px, 10px 160px;\n}\n.container {\n  position: absolute; \n  top: 0; \n  bottom: 0; \n  right: 0; \n  left: 0; \n  overflow: hidden;\n  background-color: transparent;\n}\n.swiper-container {\n  margin: 0 auto;\n  padding: 0;\n  background-color: var(--container-background-color,#eeeeee);\n  top: var(--swiper-container-top,auto) !important;\n  left: var(--swiper-container-left,auto) !important;\n  position: var(--swiper-container-position,relative) !important;\n  width: var(--swiper-container-width,100%) !important;\n  height: var(--swiper-container-height,100%) !important;\n  z-index: 1;\n}\n.parallax-bg {\n  position: var(--parallax-position,absolute) !important;\n  left: var(--parallax-left,0) !important;\n  top: var(--parallax-top,0) !important;\n  width: var(--parallax-width,130%) !important;\n  height: var(--parallax-height,100%) !important;\n  -webkit-background-size: var(--parallax-background-size,cover) !important;\n  background-size: var(--parallax-background-size,cover) !important;\n  background-position: var(--parallax-background-position,center) !important;\n}\n.swiper-container .swiper-wrapper {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n}    \n.swiper-container .swiper-slide {\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  color: var(--swiper-slide-color,#000) !important;\n  width: var(--swiper-slide-width,100%);\n  height: var(--swiper-slide-height,100%);\n  padding: var(--swiper-slide-padding,0);\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  top: var(--swiper-slide-top,auto) !important;\n  position: relative;\n  display: var(--swiper-slide-display,initial);\n  -ms-flex-direction: var(--swiper-slide-flex-direction,column);\n  flex-direction: var(--swiper-slide-flex-direction,column);\n  -ms-flex-align: var(--swiper-slide-align-items,initial);\n  align-items: var(--swiper-slide-align-items,initial);\n  -ms-flex-pack: var(--swiper-slide-justify-content,initial);\n  justify-content: var(--swiper-slide-justify-content,initial);\n}\n\n.swiper-pagination {\n  visibility: visible;\n}\n.swiper-pagination-bullet {\n  width: var(--bullet-diameter,15px) !important;\n  height: var(--bullet-diameter,15px) !important;\n  opacity: var(--bullet-opacity,0.5) !important;\n  background: var(--bullet-background,#000000) !important;\n}       \n.swiper-pagination-bullet-active {\n  opacity: var(--bullet-active-opacity,1) !important;\n  background: var(--bullet-active-background,#007aff) !important;\n} \n.swipper-button-prev,.swipper-button-next {\n  visibility: visible;\n}\n.gallery-thumbs {\n  position: absolute !important;\n  top: var(--gallery-thumbs-top,80%) !important;\n  height: var(--gallery-thumbs-height,20%) !important;\n  padding: var(--gallery-thumbs-padding,10px 0);\n  background-color: var(--gallery-thumbs-background-color,#000);\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  visibility: visible;\n  z-index:10\n}\n.gallery-thumbs .swiper-slide {\n  width: var(--gallery-thumbs-width,25%);\n  height: 100%;\n  opacity: var(--galery-thumbs-opacity,0.4);\n}\n.gallery-thumbs .swiper-slide-thumb-active {\n  opacity: 1;\n} \n.gallery-thumbs .swiper-slide img {\n  width: 100%;\n  height: auto;\n}\n.hidden {\n  visibility: hidden;\n}\n.autoplay-button-pause {\n  background-image : url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M199.9%20416h-63.8c-4.5%200-8.1-3.6-8.1-8V104c0-4.4%203.6-8%208.1-8h63.8c4.5%200%208.1%203.6%208.1%208v304c0%204.4-3.6%208-8.1%208zM375.9%20416h-63.8c-4.5%200-8.1-3.6-8.1-8V104c0-4.4%203.6-8%208.1-8h63.8c4.5%200%208.1%203.6%208.1%208v304c0%204.4-3.6%208-8.1%208z%22/%3E%3C/svg%3E\");\n  width: calc(var(--playcontrols-width,20px) * 1.4 ) !important;\n  height: calc(var(--playcontrols-height,20px) * 1.4 ) !important;\n  padding-bottom: 0px !important;\n}\n.autoplay-button-play {\n  background-image : url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M128%20104.3v303.4c0%206.4%206.5%2010.4%2011.7%207.2l240.5-151.7c5.1-3.2%205.1-11.1%200-14.3L139.7%2097.2c-5.2-3.3-11.7.7-11.7%207.1z%22/%3E%3C/svg%3E\");\n  width: calc(var(--playcontrols-width,20px) * 1.4 ) !important;\n  height: calc(var(--playcontrols-height,20px) * 1.4 ) !important;\n  padding-bottom: 0px !important;\n}\n.autoplay-button-skip-forward {\n  background-image : url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M337%20100v137.8L108.1%2098.1C102.7%2095%2096%2098.8%2096%20105v302c0%206.2%206.7%2010%2012.1%206.9L337%20274.2V412c0%202.2%201.8%204%204%204h71c2.2%200%204-1.8%204-4V100c0-2.2-1.8-4-4-4h-71c-2.2%200-4%201.8-4%204z%22/%3E%3C/svg%3E\");\n}\n.autoplay-button-skip-backward {\n  background-image : url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M175%20100v137.8L403.9%2098.1c5.3-3.1%2012.1.7%2012.1%206.9v302c0%206.2-6.7%2010-12.1%206.9L175%20274.2V412c0%202.2-1.8%204-4%204h-71c-2.2%200-4-1.8-4-4V100c0-2.2%201.8-4%204-4h71c2.2%200%204%201.8%204%204z%22/%3E%3C/svg%3E\");\n}\n.swiper-playcontrols-buttons {\n  position: absolute;\n  bottom: 10px;\n  left: 0;\n  width: 100%;\n  text-align: center;\n  z-index: 100;\n}\n.swiper-playcontrols-button {\n  display: inline-block;\n  width: var(--playcontrols-width,20px);\n  height: var(--playcontrols-height,20px);\n  padding-bottom: calc(var(--playcontrols-height,20px) * 0.2 );\n}\n.swiper-pagination-progressbar {\n  background: var(--progress-bar-background-color,rgb(0,0,0,.25)) !important;\n}\n.swiper-container-horizontal>.swiper-pagination-progressbar,\n.swiper-container-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,\n.swiper-container-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,\n.swiper-container-vertical>.swiper-pagination-progressbar  {\n  width: var(--progress-bar-width,100%) !important;\n  height: var(--progress-bar-height,0.5%) !important;\n  top: var(--progress-bar-top,0) !important;\n  left: var(--progress-bar-left,0) !important;\n}\n.swiper-pagination-progressbar-fill {\n  background: var(--progress-bar-color,#007aff) !important;\n}\n.swiper-pagination-fraction {\n  font-family: var(--fraction-font-family,\"Times New Roman\", Times, serif) !important;\n  font-size: var(--fraction-font-size,15px) !important;\n  font-weight: var(--fraction-font-weight,normal) !important;\n  font-style: var(--fraction-font-style,normal) !important;\n  color: var(--fraction-text-color,#000000) !important; \n}\n.swiper-scrollbar-drag {\n  background: var(--scrollbar-color,rgba(0,0,0,.5)) !important;\n}\n.swiper-container-horizontal>.swiper-scrollbar,\n.swiper-container-vertical>.swiper-scrollbar {\n  left: var(--scrollbar-left,1%) !important;\n  bottom: var(--scrollbar-bottom,3px) !important;\n  height: var(--scrollbar-height,5px) !important;\n  width: var(--scrollbar-width,98%) !important;\n  background: var(--scrollbar-background-color,rgba(0,0,0,.1)) !important;\n}"; }
};

export { JeepCarousel as jeep_carousel };
