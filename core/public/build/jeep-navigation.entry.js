import { r as registerInstance, c as createEvent, h, H as Host, d as getElement } from './core-7a7a831b.js';

const icons = {
    "arrow-circle": {
        back: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm43.4 289.1c7.5 7.5 7.5 19.8 0 27.3-3.8 3.8-8.7 5.6-13.6 5.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5 19.7-7.6 27.3 0 7.5 7.5 7.6 19.7 0 27.3l-81.9 81 79.9 81.1z"/></svg>',
        forward: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 256c0 114.9 93.1 208 208 208s208-93.1 208-208S370.9 48 256 48 48 141.1 48 256zm244.5 0l-81.9-81.1c-7.5-7.5-7.5-19.8 0-27.3s19.8-7.5 27.3 0l95.4 95.7c7.3 7.3 7.5 19.1.6 26.6l-94 94.3c-3.8 3.8-8.7 5.7-13.7 5.7-4.9 0-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7 0-27.3l79.9-81z"/></svg>'
    },
    "arrow-round": {
        back: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"/></svg>',
        forward: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M284.9 412.6l138.1-134c6-5.8 9-13.7 9-22.4v-.4c0-8.7-3-16.6-9-22.4l-138.1-134c-12-12.5-31.3-12.5-43.2 0-11.9 12.5-11.9 32.7 0 45.2l83 79.4h-214c-17 0-30.7 14.3-30.7 32 0 18 13.7 32 30.6 32h214l-83 79.4c-11.9 12.5-11.9 32.7 0 45.2 12 12.5 31.3 12.5 43.3 0z"/></svg>'
    }
};
function getIcons(name) {
    if (name === 'arrow-circle' || name === 'arrow-round')
        return icons[name];
    return null;
}

const JeepNavigation = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.visibility = 'visible';
        this._prevDisabled = true;
        this._nextDisabled = false;
        this.onNavigationPrev = createEvent(this, "jeepNavigationPrev", 7);
        this.onNavigationNext = createEvent(this, "jeepNavigationNext", 7);
    }
    //*****************************
    //* Watch on Property Changes *
    //*****************************
    parseNameProp(newValue) {
        if (newValue)
            this.innerName = newValue;
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
     * Set the navigation component.
     */
    setNavigation() {
        return Promise.resolve(this._setNavigation());
    }
    /**
     * Set the Navigation Visibility (visible/hidden)
     */
    setJeepNavigationVisibility(state) {
        if (state && state.visibility) {
            this.visibility = state.visibility;
            if (this.visibility === "visible") {
                this._navContainerEl.classList.remove('hidden');
            }
            else {
                this._navContainerEl.classList.add('hidden');
            }
        }
        return;
    }
    /**
     * Set the Navigation previous button to enable/disable
     */
    setJeepNavigationPrevDisabled(state) {
        this._prevDisabled = state.disabled;
        this._setPrevDisabled();
        return;
    }
    /**
     * Set the Navigation next button to enable/disable
     */
    setJeepNavigationNextDisabled(state) {
        this._nextDisabled = state.disabled;
        this._setNextDisabled();
        return;
    }
    /**
     * Get icon name
     */
    async getJeepNavigationIconFamily() {
        return this._icons !== null ? this.innerName : null;
    }
    async componentWillLoad() {
        await this.init();
    }
    async componentDidLoad() {
        await this.setNavigation();
    }
    async componentDidUpdate() {
        if (this.visibility === "visible") {
            await this.setNavigation();
            this._setPrevDisabled();
            this._setNextDisabled();
        }
        else {
            this._navPrevEl = null;
            this._navNextEl = null;
        }
    }
    async _init() {
        this._element = this.el.shadowRoot;
        this.parseNameProp(this.name ? this.name : "arrow-circle");
        return;
    }
    async _setNavigation() {
        this._navContainerEl = this._element.querySelector(".navigation-container");
        this._navPrevEl = this._navContainerEl.querySelector('.navigation-prev');
        this._navNextEl = this._navContainerEl.querySelector('.navigation-next');
        this._navPrevEl.innerHTML = this._prevButton;
        this._navNextEl.innerHTML = this._nextButton;
        const svgEls = Array.from(this._navContainerEl.querySelectorAll('svg'));
        for (let i = 0; i < svgEls.length; i++) {
            svgEls[i].classList.add('icon');
        }
        this._navPrevEl.addEventListener('click', () => {
            if (!this._navPrevEl.classList.contains('disabled'))
                this.onNavigationPrev.emit();
        }, false);
        this._navNextEl.addEventListener('click', () => {
            if (!this._navNextEl.classList.contains('disabled'))
                this.onNavigationNext.emit();
        }, false);
        return;
    }
    _setPrevDisabled() {
        if (this._navPrevEl) {
            if (this._prevDisabled) {
                if (!this._navPrevEl.classList.contains('disabled'))
                    this._navPrevEl.classList.add('disabled');
            }
            else {
                if (this._navPrevEl.classList.contains('disabled'))
                    this._navPrevEl.classList.remove('disabled');
            }
        }
    }
    _setNextDisabled() {
        if (this._navNextEl) {
            if (this._nextDisabled) {
                if (!this._navNextEl.classList.contains('disabled'))
                    this._navNextEl.classList.add('disabled');
            }
            else {
                if (this._navNextEl.classList.contains('disabled'))
                    this._navNextEl.classList.remove('disabled');
            }
        }
    }
    render() {
        this._icons = getIcons(this.innerName);
        this._prevButton = this._icons !== null ? this._icons.back : null;
        this._nextButton = this._icons !== null ? this._icons.forward : null;
        return (h(Host, null, h("div", { class: "navigation-container" }, this.visibility === "visible"
            ?
                h("div", { class: "navigation-wrapper" }, h("button", { class: 'navigation-prev icon disabled' }), h("button", { class: 'navigation-next icon disabled' }))
            : null)));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "name": ["parseNameProp"]
    }; }
    static get style() { return ":host {\n  --navigation-top: 50%;\n  --navigation-left: 0;\n  --navigation-width: 100vw;\n  --navigation-button-width: 50px;\n  --navigation-button-height: 50px;\n  --navigation-padding-horizontal: 10px;\n  --navigation-button-icon-color: #222428;\n }\n\n.navigation-container {\n    position: absolute;\n    top: var(--navigation-top);\n    left: var(--navigation-left);\n    margin-top: calc(-1 * var(--navigation-button-height) / 2);\n    z-index: 10;\n    width: var(--navigation-width);\n    height: auto;\n    display: -ms-flexbox;\n    display: flex;\n    padding: 0 var(--navigation-padding-horizontal);\n    visibility: visible;\n}\n.navigation-wrapper {\n    width: calc(100% - 2 * var(--navigation-padding-horizontal));\n    height: auto;\n}\n.icon {\n    position:relative;\n    width: var(--navigation-button-width);\n    height: var(--navigation-button-height);\n    fill: var(--navigation-button-icon-color);\n    visibility: visible;\n}\n.navigation-prev {\n    padding: 0;\n    border-width: 0px;\n    background: transparent;\n    border-color: transparent;\n    border-radius: 100%;\n    left: 0;\n    opacity: 1;\n}\n.navigation-next {\n    padding: 0;\n    border-width: 0px;\n    background: transparent;\n    border-color: transparent;\n    border-radius: 100%;\n    left: calc(100% - 2 * var(--navigation-button-width));\n    opacity: 1;\n}\n.disabled {\n    opacity: 0.2;\n}\n.hidden {\n    visibility: hidden;\n}"; }
};

export { JeepNavigation as jeep_navigation };
