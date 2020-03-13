import { r as registerInstance, c as createEvent, h, H as Host, d as getElement } from './core-7a7a831b.js';

const JeepFullscreen = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //************************
        //* Property Definitions *
        //************************
        //*****************************
        //* Watch on Property Changes *
        //*****************************
        //************************
        //* State Definitions *
        //************************
        this.visibility = 'visible';
        this.fullscreen = false;
        this._fullscreenIcons = {
            request: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M396.795 396.8H320V448h128V320h-51.205zM396.8 115.205V192H448V64H320v51.205zM115.205 115.2H192V64H64v128h51.205zM115.2 396.795V320H64v128h128v-51.205z"/></svg>',
            exit: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 371.2h76.795V448H192V320H64v51.2zm76.795-230.4H64V192h128V64h-51.205v76.8zM320 448h51.2v-76.8H448V320H320v128zm51.2-307.2V64H320v128h128v-51.2h-76.8z"/></svg>'
        };
        this._fullscreenChange = false;
        this.onFullscreenRequest = createEvent(this, "jeepFullscreenRequest", 7);
        this.onFullscreenExit = createEvent(this, "jeepFullscreenExit", 7);
        this.onFullscreenChange = createEvent(this, "jeepFullscreenChange", 7);
    }
    //*******************************
    //* Listen to Event Definitions *
    //*******************************
    handleFullScreenChange() {
        if (this.fullscreen && this._fullscreenChange) {
            this.fullscreen = false;
            this.onFullscreenChange.emit();
        }
        this._fullscreenChange = !this._fullscreenChange;
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
     * Set the Fullscreen component.
     */
    setFullscreen() {
        return Promise.resolve(this._setFullscreen());
    }
    /**
     * Set the Fullscreen Visibility (visible/hidden)
     */
    async setJeepFullscreenVisibility(state) {
        if (state && state.visibility) {
            if (state.visibility === 'hidden') {
                if (!this._screenContainerEl.classList.contains('hidden'))
                    this._screenContainerEl.classList.add('hidden');
            }
            else {
                if (this._screenContainerEl.classList.contains('hidden'))
                    this._screenContainerEl.classList.remove('hidden');
            }
            this.visibility = state.visibility;
        }
        return;
    }
    /**
     * Request Fullscreen
     */
    async fullscreenRequest(elem) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
        else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        }
        else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        else {
            this.fullscreen = false;
            console.log('Fullscreen API is not supported.');
        }
        return;
    }
    /**
     * Exit Fullscreen
     */
    async fullscreenExit() {
        let doc = document;
        if (doc && doc.exitFullscreen) {
            doc.exitFullscreen();
        }
        else if (doc && doc.webkitExitFullscreen) {
            doc.webkitExitFullscreen();
        }
        else if (doc && doc.mozExitFullscreen) {
            doc.mozExitFullscreen();
        }
        else if (doc && doc.msExitFullscreen) {
            doc.msExitFullscreen();
        }
        else {
            console.log('Fullscreen API is not supported.');
        }
        return;
    }
    /**
     * Is Fullscreen
     */
    async isFullscreen() {
        return this.fullscreen;
    }
    async componentWillLoad() {
        await this.init();
    }
    async componentDidLoad() {
        await this.setFullscreen();
    }
    async _init() {
        this._element = this.el.shadowRoot;
        return;
    }
    async _setFullscreen() {
        this._screenContainerEl = this._element.querySelector(".fullscreen-container");
        this._fullscreenEl = this._screenContainerEl.querySelector('.fullscreen-button');
        if (this._fullscreenEl) {
            this._fullscreenEl.innerHTML = this._fullscreenIcons.request;
            this._fullscreenEl.addEventListener('click', async () => {
                if (this._fullscreenEl.classList.contains('fullscreen-button') && this._fullscreenEl.classList.contains('request')) {
                    this.fullscreen = true;
                    this.onFullscreenRequest.emit();
                }
                else {
                    if (this.fullscreen) {
                        this.fullscreen = false;
                        this.onFullscreenExit.emit();
                    }
                }
            }, false);
        }
        return;
    }
    render() {
        if (this._fullscreenEl) {
            this._fullscreenEl.innerHTML = this.fullscreen ? this._fullscreenIcons.exit : this._fullscreenIcons.request;
        }
        return (h(Host, null, h("div", { class: "fullscreen-container" }, !this.fullscreen
            ? h("div", { class: "fullscreen-button request" })
            : h("div", { class: "fullscreen-button exit" }))));
    }
    get el() { return getElement(this); }
    static get style() { return ":host {\n  --fullscreen-top: 10px;\n  --fullscreen-left: 10px;\n  --fullscreen-width: 100%;\n  --fullscreen-button-width: 50px;\n  --fullscreen-button-height: 50px;\n  --fullscreen-button-icon-color: #222428;\n\n}\n/*\n.fullscreen-button.request {\n    background-image : url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M396.795%20396.8H320V448h128V320h-51.205zM396.8%20115.205V192H448V64H320v51.205zM115.205%20115.2H192V64H64v128h51.205zM115.2%20396.795V320H64v128h128v-51.205z%22/%3E%3C/svg%3E\");\n}\n.fullscreen-button.exit {\n    background-image : url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20512%20512%22%3E%3Cpath%20d=%22M64%20371.2h76.795V448H192V320H64v51.2zm76.795-230.4H64V192h128V64h-51.205v76.8zM320%20448h51.2v-76.8H448V320H320v128zm51.2-307.2V64H320v128h128v-51.2h-76.8z%22/%3E%3C/svg%3E\");\n}\n*/\n.fullscreen-container {\n    position: absolute;\n    top: var(--fullscreen-top);\n    left: var(--fullscreen-left);\n    width: var(--fullscreen-width);\n    height: auto;\n    z-index: 12;\n    visibility: visible;\n}\n.fullscreen-button {\n    display: inline-block;\n    width: var(--fullscreen-button-width,20px);\n    height: var(--fullscreen-button-height,20px);\n    fill: var(--fullscreen-button-icon-color);\n\n}\n\n.hidden {\n    visibility: hidden;\n}"; }
};

export { JeepFullscreen as jeep_fullscreen };
