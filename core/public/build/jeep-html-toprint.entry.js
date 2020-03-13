import { r as registerInstance, c as createEvent, h, H as Host, d as getElement } from './core-7a7a831b.js';

const JeepHtmlToprint = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.innerSlotStyle = null;
        this._error = null;
        this.printPage = createEvent(this, "jeepHtmlToPrint", 7);
        this.printPageReady = createEvent(this, "jeepHtmlToPrintReady", 7);
        this.printPageCompleted = createEvent(this, "jeepHtmlToPrintCompleted", 7);
    }
    //*****************************
    //* Watch on Property Changes *
    //*****************************
    parseSlotStyleProp(newValue) {
        if (newValue)
            this.innerSlotStyle = newValue ? newValue : null;
    }
    //*******************************
    //* Listen to Event Definitions *
    //*******************************
    printDocHandler() {
        this.window.print();
        this.printPageCompleted.emit();
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
    async load() {
        return await this._load();
    }
    async emitPrint() {
        this.printPage.emit();
        return;
    }
    async getSlotStyle() {
        return this.innerSlotStyle;
    }
    //*******************************
    //* Component Lifecycle Methods *
    //*******************************
    async componentWillLoad() {
        await this.init();
    }
    async componentDidLoad() {
        await this.load();
    }
    //******************************
    //* Private Method Definitions *
    //******************************
    async _init() {
        this.window = window;
        //    this._element = this.el.shadowRoot;
        this.parseSlotStyleProp(this.slotstyle ? this.slotstyle : null);
        // check if there is a ion-menu and dismiss it
        this._menu = document.querySelector('ion-menu');
        if (this._menu !== null) {
            this._menu.setAttribute('disabled', 'true');
        }
        return;
    }
    async _load() {
        const divs = Array.from(this.el.querySelectorAll('div'));
        if (divs && divs.length > 0) {
            const slotDivEl = divs.filter((item) => {
                return (item.slot && item.slot === 'toprint') || item.outerHTML.indexOf('slot="toprint"') !== -1 ? item : null;
            });
            this._error = slotDivEl && slotDivEl.length > 0 ? null : "Error: slot name toprint doesn't exist";
            if (this._error === null) {
                const erEl = this.el.shadowRoot.querySelector('#error-div');
                erEl.style.setProperty('display', 'none');
                slotDivEl[0].innerHTML = this.innerSlotStyle !== null ? this.innerSlotStyle + slotDivEl[0].innerHTML : slotDivEl[0].innerHTML;
                this.printPageReady.emit();
            }
        }
        else {
            this._error = "Error: slot name toprint doesn't exist";
        }
        return;
    }
    //*************************
    //* Rendering JSX Element *
    //*************************
    render() {
        /*
        let toRender: any[] = [];
        if (this._error !== null) {
          toRender = [...toRender,
            <div id="error-div">{this._error}</div>
          ];
        } else {
          toRender = [...toRender,
            <slot name='toprint'></slot>
          ];
        }
        */
        return (h(Host, null, h("div", { id: "error-div" }, "Error: slot name toprint doesn't exist"), h("slot", { name: 'toprint' })));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "slotstyle": ["parseSlotStyleProp"]
    }; }
    static get style() { return ":host {\n  display: block;\n}\n#error-div {\n  width: 100%;\n  height: 50px;\n  background-color: #d6a0a0;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  font-size: 1.3rem;\n  color: #000000;\n}"; }
};

export { JeepHtmlToprint as jeep_html_toprint };
