import { r as registerInstance, c as createEvent, h, H as Host, d as getElement } from './core-7a7a831b.js';

const JeepPlayControls = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.visibility = 'visible';
        this.play = false;
        this._skipForwardDisabled = true;
        this._skipBackwardDisabled = false;
        this.onPlayControlsIsBeginning = createEvent(this, "jeepPlayControlsIsBeginning", 7);
        this.onPlayControlsIsEnd = createEvent(this, "jeepPlayControlsIsEnd", 7);
        this.onPlayControlsCurrentIndex = createEvent(this, "jeepPlayControlsCurrentIndex", 7);
        this.onPlayControlsAutoplayStart = createEvent(this, "jeepPlayControlsAutoplayStart", 7);
        this.onPlayControlsAutoplayStop = createEvent(this, "jeepPlayControlsAutoplayStop", 7);
        this.onPlayControlsAutoplayPause = createEvent(this, "jeepPlayControlsAutoplayPause", 7);
        this.onPlayControlsAutoplaySkipBackward = createEvent(this, "jeepPlayControlsAutoplaySkipBackward", 7);
        this.onPlayControlsAutoplaySkipForward = createEvent(this, "jeepPlayControlsAutoplaySkipForward", 7);
    }
    //*****************************
    //* Watch on Property Changes *
    //*****************************
    parseDurationProp(newValue) {
        if (newValue)
            this.innerDuration = newValue;
    }
    parseNSlidesProp(newValue) {
        if (newValue !== 0) {
            this.innerNSlides = newValue;
            this.innerToSlide = this.innerNSlides - 1;
        }
        else {
            this.innerNSlides = 0;
            this.innerToSlide = 0;
        }
    }
    parseFromSlideProp(newValue) {
        if (newValue !== 0) {
            this.innerFromSlide = newValue;
        }
        else {
            this.innerFromSlide = 0;
        }
    }
    parseToSlideProp(newValue) {
        if (newValue !== 0) {
            this.innerToSlide = newValue;
        }
        else {
            this.innerToSlide = 0;
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
     * Set the PlayControls component.
     */
    setPlayControls() {
        return Promise.resolve(this._setPlayControls());
    }
    /**
     * Set the PlayControls Visibility (visible/hidden)
     */
    async setJeepPlayControlsVisibility(state) {
        if (state && state.visibility) {
            if (state.visibility === 'hidden') {
                if (!this._playContainerEl.classList.contains('hidden'))
                    this._playContainerEl.classList.add('hidden');
            }
            else {
                if (this._playContainerEl.classList.contains('hidden'))
                    this._playContainerEl.classList.remove('hidden');
            }
            this.visibility = state.visibility;
        }
        return;
    }
    /**
     * Set the PlayControls skipbackward icon to enable/disable
     */
    async setJeepPlayControlsSkipBackwardDisabled(state) {
        this._skipBackwardDisabled = state.disabled;
        this._setSkipBackwardDisabled();
        return;
    }
    /**
     * Set the PlayControls skipforward icon to enable/disable
     */
    async setJeepPlayControlsSkipForwardDisabled(state) {
        this._skipForwardDisabled = state.disabled;
        this._setSkipForwardDisabled();
        return;
    }
    /**
     * Get the PlayControls duration
     */
    async getJeepPlayControlsDuration() {
        return this.innerDuration;
    }
    /**
     * Start autoplay
     */
    async autoplayStart() {
        this.play = true;
        this.onPlayControlsAutoplayStart.emit();
        this._playContent();
        return;
    }
    /**
     * Stop autoplay
     */
    async autoplayStop() {
        this.play = false;
        this.onPlayControlsAutoplayStop.emit();
        clearInterval(this._initial);
        await this.setCurrentIndex(this.innerFromSlide);
        return;
    }
    /**
     * Pause autoplay
     */
    async autoplayPause() {
        this.play = false;
        this.onPlayControlsAutoplayPause.emit();
        clearInterval(this._initial);
        return;
    }
    /**
     * Is Playing
     */
    async isPlaying() {
        return this.play;
    }
    /**
     * Get PlayControls Current Index
     */
    async getCurrentIndex() {
        return this._currentIndex;
    }
    /**
     * Set PlayControls Active Index
     */
    async setActiveIndexAndPlay(index) {
        clearInterval(this._initial);
        this.setCurrentIndex(index);
        this.autoplayStart();
        return;
    }
    /**
     * Set PlayControls Current Index
     */
    async setCurrentIndex(index, notemit) {
        const willEmit = notemit ? !notemit : true;
        this._currentIndex = index;
        this.onPlayControlsCurrentIndex.emit({ index: this._currentIndex.toString() });
        this._setSkipButtons();
        if (willEmit && this._currentIndex === this.innerFromSlide)
            this.onPlayControlsIsBeginning.emit();
        if (willEmit && this._currentIndex === this.innerToSlide)
            this.onPlayControlsIsEnd.emit();
        return;
    }
    async componentWillLoad() {
        await this.init();
    }
    async componentDidLoad() {
        await this.setPlayControls();
    }
    async _init() {
        this._element = this.el.shadowRoot;
        this.parseDurationProp(this.duration ? this.duration : 1000);
        this.parseNSlidesProp(this.nslides ? this.nslides : 0);
        this.parseFromSlideProp(this.fromslide ? this.fromslide : 0);
        this.parseToSlideProp(this.toslide ? this.toslide : this.innerNSlides > 0 ? this.innerNSlides - 1 : 0);
        await this.setCurrentIndex(this.innerFromSlide, true);
        return;
    }
    async _setPlayControls() {
        this._playContainerEl = this._element.querySelector(".playcontrols-container");
        this._playSkipBackwardEl = this._playContainerEl.querySelector('.playcontrols-button-skip-backward');
        this._playSkipForwardEl = this._playContainerEl.querySelector('.playcontrols-button-skip-forward');
        this.setJeepPlayControlsSkipBackwardDisabled({ disabled: true });
        this.onPlayControlsIsBeginning.emit();
        if (this.innerToSlide > 0) {
            this.setJeepPlayControlsSkipForwardDisabled({ disabled: false });
        }
        else {
            this.setJeepPlayControlsSkipForwardDisabled({ disabled: true });
            this.onPlayControlsIsEnd.emit();
        }
        return;
    }
    _setSkipBackwardDisabled() {
        if (this._skipBackwardDisabled) {
            if (!this._playSkipBackwardEl.classList.contains('disabled'))
                this._playSkipBackwardEl.classList.add('disabled');
        }
        else {
            if (this._playSkipBackwardEl.classList.contains('disabled'))
                this._playSkipBackwardEl.classList.remove('disabled');
        }
    }
    _setSkipForwardDisabled() {
        if (this._skipForwardDisabled) {
            if (!this._playSkipForwardEl.classList.contains('disabled'))
                this._playSkipForwardEl.classList.add('disabled');
        }
        else {
            if (this._playSkipForwardEl.classList.contains('disabled'))
                this._playSkipForwardEl.classList.remove('disabled');
        }
    }
    async _handleClick(event) {
        if (event.target.classList.contains('playcontrols-button-play') && event.target.classList.contains('play')) {
            if (this.innerToSlide > 0 && this._currentIndex < this.innerToSlide) {
                await this.autoplayStart();
            }
        }
        else if (event.target.classList.contains('playcontrols-button-skip-backward')) {
            if (!this._playSkipBackwardEl.classList.contains('disabled') || this._currentIndex > this.innerFromSlide) {
                this.onPlayControlsAutoplaySkipBackward.emit();
                await this.setActiveIndexAndPlay(this._currentIndex - 1);
            }
        }
        else if (event.target.classList.contains('playcontrols-button-skip-forward')) {
            if (!this._playSkipForwardEl.classList.contains('disabled') || this._currentIndex < this.innerToSlide) {
                this.onPlayControlsAutoplaySkipForward.emit();
                await this.setActiveIndexAndPlay(this._currentIndex + 1);
            }
        }
        else {
            if (this.play) {
                await this.autoplayPause();
            }
        }
    }
    _playContent() {
        let index = 0;
        if (this.play) {
            this._initial = setInterval(() => {
                if (index === 0) {
                    index = this._currentIndex + 1;
                }
                if (index > this.innerToSlide) {
                    this.play = false;
                    this.setCurrentIndex(this.innerFromSlide);
                    clearInterval(this._initial);
                }
                else {
                    this.setCurrentIndex(index);
                    index++;
                }
            }, this.innerDuration);
        }
        else {
            clearInterval(this._initial);
            return;
        }
    }
    _setSkipButtons() {
        if (this._playSkipBackwardEl && this._playSkipForwardEl) {
            if (this._currentIndex === this.innerFromSlide) {
                this.setJeepPlayControlsSkipBackwardDisabled({ disabled: true });
            }
            else {
                this.setJeepPlayControlsSkipBackwardDisabled({ disabled: false });
            }
            if (this._currentIndex === this.innerToSlide) {
                this.setJeepPlayControlsSkipForwardDisabled({ disabled: true });
            }
            else {
                this.setJeepPlayControlsSkipForwardDisabled({ disabled: false });
            }
        }
    }
    render() {
        this._setSkipButtons();
        return (h(Host, null, h("div", { class: "playcontrols-container" }, h("div", { class: "playcontrols-button playcontrols-button-skip-backward disabled", onClick: (event) => this._handleClick(event) }), this.play
            ? h("div", { class: "playcontrols-button playcontrols-button-play pause", onClick: (event) => this._handleClick(event) })
            : h("div", { class: "playcontrols-button playcontrols-button-play play", onClick: (event) => this._handleClick(event) }), h("div", { class: "playcontrols-button playcontrols-button-skip-forward disabled", onClick: (event) => this._handleClick(event) }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "duration": ["parseDurationProp"],
        "nslides": ["parseNSlidesProp"],
        "fromslide": ["parseFromSlideProp"],
        "toslide": ["parseToSlideProp"]
    }; }
    static get style() { return ":host {\n  --playcontrols-top: calc(100vh -20px);\n  --playcontrols-left: 0px;\n  --playcontrols-width: 100%;\n  --playcontrols-button-width: 50px;\n  --playcontrols-button-height: 50px;\n}\n.playcontrols-button-play.pause {\n    background-image : url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M199.9%20416h-63.8c-4.5%200-8.1-3.6-8.1-8V104c0-4.4%203.6-8%208.1-8h63.8c4.5%200%208.1%203.6%208.1%208v304c0%204.4-3.6%208-8.1%208zM375.9%20416h-63.8c-4.5%200-8.1-3.6-8.1-8V104c0-4.4%203.6-8%208.1-8h63.8c4.5%200%208.1%203.6%208.1%208v304c0%204.4-3.6%208-8.1%208z%22/%3E%3C/svg%3E\");\n    width: calc(var(--playcontrols-button-width,20px) * 1.4 ) !important;\n    height: calc(var(--playcontrols-button-height,20px) * 1.4 ) !important;\n    padding-bottom: 0px !important;\n}\n.playcontrols-button-play.play {\n    background-image : url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M128%20104.3v303.4c0%206.4%206.5%2010.4%2011.7%207.2l240.5-151.7c5.1-3.2%205.1-11.1%200-14.3L139.7%2097.2c-5.2-3.3-11.7.7-11.7%207.1z%22/%3E%3C/svg%3E\");\n    width: calc(var(--playcontrols-button-width,20px) * 1.4 ) !important;\n    height: calc(var(--playcontrols-button-height,20px) * 1.4 ) !important;\n    padding-bottom: 0px !important;\n}\n.playcontrols-button-skip-forward {\n    background-image : url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M337%20100v137.8L108.1%2098.1C102.7%2095%2096%2098.8%2096%20105v302c0%206.2%206.7%2010%2012.1%206.9L337%20274.2V412c0%202.2%201.8%204%204%204h71c2.2%200%204-1.8%204-4V100c0-2.2-1.8-4-4-4h-71c-2.2%200-4%201.8-4%204z%22/%3E%3C/svg%3E\");\n}\n.playcontrols-button-skip-backward {\n    background-image : url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M175%20100v137.8L403.9%2098.1c5.3-3.1%2012.1.7%2012.1%206.9v302c0%206.2-6.7%2010-12.1%206.9L175%20274.2V412c0%202.2-1.8%204-4%204h-71c-2.2%200-4-1.8-4-4V100c0-2.2%201.8-4%204-4h71c2.2%200%204%201.8%204%204z%22/%3E%3C/svg%3E\");\n}\n.playcontrols-container {\n    position: absolute;\n    top: var(--playcontrols-top);\n    left: var(--playcontrols-left);\n    width: var(--playcontrols-width);\n    height: auto;\n    text-align: center;\n    z-index: 11;\n    visibility: visible;\n}\n.playcontrols-button {\n    display: inline-block;\n    width: var(--playcontrols-button-width,20px);\n    height: var(--playcontrols-button-height,20px);\n    padding-bottom: calc(var(--playcontrols-button-height,20px) * 0.2 );\n}\n\n.disabled {\n    opacity: 0.2;\n}\n.hidden {\n    visibility: hidden;\n}"; }
};

export { JeepPlayControls as jeep_play_controls };
