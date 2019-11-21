import { h, Host, Element, Component, Prop, Method, State, Watch, Event, EventEmitter } from '@stencil/core';
import { getIcons } from '../../../utils/navigation';

@Component({
  tag: 'jeep-navigation',
  styleUrl: 'jeep-navigation.css',
  shadow: true
})
export class JeepNavigation {

    @Element() el!: HTMLJeepNavigationElement;

    //************************
    //* Property Definitions *
    //************************


    /**
     * The navigation icon name
     * must be "arrow-circle" or "arrow-round"
     */
    @Prop() name: string;

    //*****************************
    //* Watch on Property Changes *
    //*****************************
  
    @Watch('name')
    parseNameProp(newValue: string) {
      if (newValue) this.innerName = newValue;
    }

    //************************
    //* State Definitions *
    //************************

    @State() innerName: string;
    @State() visibility: string = 'visible';

    //*********************
    //* Event Definitions *
    //*********************

    /**
     * Emitted when the previous button was clicked
     */
    @Event({eventName:'jeepNavigationPrev'}) onNavigationPrev!: EventEmitter<void>;

    /**
     * Emitted when the next button was clicked
     */
    @Event({eventName:'jeepNavigationNext'}) onNavigationNext!: EventEmitter<void>;

    //*******************************
    //* Listen to Event Definitions *
    //*******************************

    //**********************
    //* Method Definitions *
    //**********************

    /**
     * Init data from properties.
     */

    @Method()
    init(): Promise<void> {
        return Promise.resolve(this._init());
    }

    /**
     * Set the navigation component.
     */
    @Method()
    setNavigation(): Promise<void> {
        return Promise.resolve(this._setNavigation());
    }

    /**
     * Set the Navigation Visibility (visible/hidden)
     */
    @Method()
    setJeepNavigationVisibility(state:any): Promise<void> { 
        if(state && state.visibility) {
            this.visibility = state.visibility;
            if (this.visibility === "visible") { 
                this._navContainerEl.classList.remove('hidden');
            } else {
                this._navContainerEl.classList.add('hidden');
            }
        }
        return;
    }   

    /**
     * Set the Navigation previous button to enable/disable
     */
    @Method()
    setJeepNavigationPrevDisabled(state:any): Promise<void> {
        this._prevDisabled = state.disabled
        this._setPrevDisabled();
        return;
    }   

    /**
     * Set the Navigation next button to enable/disable
     */
    @Method()
    setJeepNavigationNextDisabled(state:any): Promise<void> { 
        this._nextDisabled = state.disabled
        this._setNextDisabled();
        return;
    }   

    /**
     * Get icon name
     */
    @Method()
    async getJeepNavigationIconFamily(): Promise<string> {
        return this._icons !== null ? this.innerName : null;
    }
    //*********************************
    //* Internal Variable Definitions *
    //*********************************

    _prevButton: string;
    _nextButton: string;
    _element: any;
    _navContainerEl: HTMLElement;
    _navPrevEl: HTMLElement;
    _navNextEl: HTMLElement;
    _icons: any;
    _prevDisabled: boolean = true;
    _nextDisabled: boolean = false;

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
        } else {
            this._navPrevEl = null;
            this._navNextEl = null;
        }
    } 
        
    private async _init(): Promise<void> {
        this._element = this.el.shadowRoot;
        this.parseNameProp(this.name ? this.name : "arrow-circle");
        return;
    }

    private async _setNavigation(): Promise<void> {
        this._navContainerEl = this._element.querySelector(".navigation-container");
        this._navPrevEl = this._navContainerEl.querySelector('.navigation-prev');
        this._navNextEl = this._navContainerEl.querySelector('.navigation-next');
        this._navPrevEl.innerHTML = this._prevButton;
        this._navNextEl.innerHTML = this._nextButton;
        const svgEls: Array<SVGElement> = Array.from(this._navContainerEl.querySelectorAll('svg'));
        for(let i:number = 0;i< svgEls.length;i++) {
            svgEls[i].classList.add('icon');
        }
        this._navPrevEl.addEventListener('click', () => {
            if(!this._navPrevEl.classList.contains('disabled')) this.onNavigationPrev.emit();        
        },false); 
        this._navNextEl.addEventListener('click', () => {
            if(!this._navNextEl.classList.contains('disabled')) this.onNavigationNext.emit();        
        },false); 
        return;
    }
    _setPrevDisabled() {
        if (this._navPrevEl) {
            if(this._prevDisabled) {
                if(!this._navPrevEl.classList.contains('disabled')) this._navPrevEl.classList.add('disabled');           
            } else {
                if(this._navPrevEl.classList.contains('disabled')) this._navPrevEl.classList.remove('disabled');           
            }
        }
    }    

    _setNextDisabled() {
        if(this._navNextEl) {
            if(this._nextDisabled) {
                if(!this._navNextEl.classList.contains('disabled')) this._navNextEl.classList.add('disabled');           
            } else {
                if(this._navNextEl.classList.contains('disabled')) this._navNextEl.classList.remove('disabled');           
            }
        }
    }

    render() { 
        this._icons = getIcons(this.innerName);
        this._prevButton = this._icons !== null ? this._icons.back : null; 
        this._nextButton = this._icons !== null ? this._icons.forward : null;
        return (
            <Host>
                <div class="navigation-container"> 
                { this.visibility === "visible"
                ? 
                    <div class="navigation-wrapper">
                        <button class='navigation-prev icon disabled'></button>
                        <button class='navigation-next icon disabled'></button>
                    </div>
                : null}
                </div>
            </Host>
        );
    }     

}
