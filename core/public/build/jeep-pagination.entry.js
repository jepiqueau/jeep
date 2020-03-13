import { r as registerInstance, c as createEvent, h, H as Host, d as getElement } from './core-7a7a831b.js';

const JeepPagination = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.visibility = 'visible';
        this.nbItems = 0;
        this.activeIndex = 0;
        this.onPaginationIndex = createEvent(this, "jeepPaginationIndex", 7);
    }
    //*****************************
    //* Watch on Property Changes *
    //*****************************
    parseNDisplayProp(newValue) {
        if (newValue) {
            let val = newValue;
            this.innerNDisplay = val % 2 ? val : val + 1;
            this._delta = Math.floor(this.innerNDisplay / 2);
        }
    }
    parseDirectionProp(newValue) {
        const dirs = ["horizontal", "vertical"];
        this.innerDirection = dirs.includes(newValue) ? newValue : "horizontal";
    }
    parseClickableProp(newValue) {
        this.innerClickable = newValue ? newValue : false;
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
     * Set the Pagination Visibility (visible/hidden)
     */
    setJeepPaginationVisibility(state) {
        if (state && state.visibility) {
            this.visibility = state.visibility;
        }
        return;
    }
    /**
     * Set the Pagination Slides Number
     */
    setJeepPaginationSlidesNumber(state) {
        if (state && state.slides) {
            this.nbItems = state.slides;
        }
        return;
    }
    /**
     * Set the Pagination Active Index
     */
    setJeepPaginationActiveIndex(state) {
        if (state && state.activeIndex) {
            this.activeIndex = Number(state.activeIndex);
        }
        return;
    }
    /**
     * Get the Pagination Number of bullets displayed
     */
    async getJeepPaginationBulletNumber() {
        return this.innerNDisplay;
    }
    async componentWillLoad() {
        await this.init();
    }
    async _init() {
        this._element = this.el.shadowRoot;
        this.parseNDisplayProp(this.ndisplay ? this.ndisplay : 5);
        this.parseDirectionProp(this.direction ? this.direction : "horizontal");
        this.parseClickableProp(this.clickable ? this.clickable : false);
        return;
    }
    _handleClick(i) {
        if (this.innerClickable) {
            this.onPaginationIndex.emit({ index: i.toString() });
        }
    }
    _setPaginationBullets(nbItems) {
        let bullets = [];
        let initIndex = this.activeIndex - this._delta;
        const classname = `pagination-bullet pagination-bullet-${this.innerDirection}`;
        for (let i = 0; i < this.innerNDisplay; i++) {
            let appliedClass = classname;
            if (initIndex + i < 0) {
                appliedClass = `${classname} hidden-bullet`;
            }
            else if (initIndex + i === this.activeIndex) {
                appliedClass = `${classname} active-bullet`;
            }
            else if (initIndex + i > nbItems - 1) {
                appliedClass = `${classname} hidden-bullet`;
            }
            bullets = [...bullets,
                h("span", { class: appliedClass, onClick: () => this._handleClick(initIndex + i) })];
        }
        //        this.initialIndex = initIndex;
        return bullets;
    }
    render() {
        const paginationBullets = this.nbItems > 0 ? this._setPaginationBullets(this.nbItems) : [];
        const containerClass = `pagination-container pagination-container-${this.innerDirection}`;
        return (h(Host, null, h("div", { class: containerClass }, this.visibility === "visible"
            ?
                h("div", { class: "pagination-wrapper" }, paginationBullets)
            : null)));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "ndisplay": ["parseNDisplayProp"],
        "direction": ["parseDirectionProp"],
        "clickable": ["parseClickableProp"]
    }; }
    static get style() { return ":host {\n  --pagination-top: 5%;\n  --pagination-left: 0;\n  --pagination-width: 100vw;\n  --pagination-height: 100vh;\n  --bullet-background: #000000;\n  --bullet-opacity: 0.5;\n  --bullet-active-background: #ff8000;\n  --bullet-active-opacity: 1;\n  --bullet-active-diameter: 22px;\n  --bullet-diameter: 15px;\n }\n\n.pagination-container {\n    position: absolute;\n    z-index: 8;\n    text-align: center;\n    padding: 0;\n}\n.pagination-container-horizontal {\n    top: var(--pagination-top);\n    left: var(--pagination-left);\n    margin-top: calc(-1 * var(--bullet-active-diameter) / 2);\n    width: var(--pagination-width);\n    height: auto;\n}\n.pagination-container-vertical {\n    top: var(--pagination-top);\n    left: var(--pagination-left);\n    width: calc(var(--bullet-active-diameter));\n    height: var(--pagination-height);\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: center;\n    align-items: center;\n}\n.pagination-wrapper {\n    margin: 0 auto;\n    width: 100%;\n    height: auto;\n}\n.pagination-bullet {\n    display:inline-block;\n    width: var(--bullet-diameter);\n    height: var(--bullet-diameter);\n    border-radius: 100%;\n    opacity: var(--bullet-opacity);\n    background: var(--bullet-background);\n    visibility: visible;\n}\n.pagination-bullet-horizontal {\n    margin: 0 4px;\n}\n.pagination-bullet-vertical {\n    margin: 4px 0;\n}\n.active-bullet {\n    width: var(--bullet-active-diameter);\n    height: var(--bullet-active-diameter);\n    opacity: var(--bullet-active-opacity);\n    background: var(--bullet-active-background);\n}\n.hidden-bullet {\n    visibility: hidden;\n}\n.hidden {\n    visibility: hidden;\n}"; }
};

export { JeepPagination as jeep_pagination };
