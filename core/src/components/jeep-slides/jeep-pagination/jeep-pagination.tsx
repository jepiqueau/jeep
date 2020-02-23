import { h, Host, JSX, Element, Component, Prop, Method, State, Watch, Event, EventEmitter } from '@stencil/core';
import { PaginationIndex  } from '../../../global/interfaces/jeep-slides';

@Component({
  tag: 'jeep-pagination',
  styleUrl: 'jeep-pagination.css',
  shadow: true
})
export class JeepPagination {

    @Element() el!: HTMLJeepPaginationElement;

    //************************
    //* Property Definitions *
    //************************

    /**
     * The pagination number of items display
     */
    @Prop() ndisplay: number;

    /**
     * The pagination direction
     */
    @Prop() direction: string;

    /**
     * The pagination clickable option
     */
    @Prop() clickable: boolean;
  
    //*****************************
    //* Watch on Property Changes *
    //*****************************
    
    @Watch('ndisplay')
    parseNDisplayProp(newValue: number) {
        if (newValue) {
          let val:number = newValue;
          this.innerNDisplay = val%2 ? val : val + 1;
          this._delta = Math.floor(this.innerNDisplay / 2)
        }
    }
    @Watch('direction')
    parseDirectionProp(newValue: string) {
        const dirs: Array<string> = ["horizontal","vertical"];
        this.innerDirection = dirs.includes(newValue) ? newValue : "horizontal";
    }
    @Watch('clickable')
    parseClickableProp(newValue: boolean) {
      this.innerClickable = newValue ? newValue : false;
    }

    //************************
    //* State Definitions *
    //************************

    @State() innerNDisplay: number;
    @State() innerDirection: string;
    @State() innerClickable: boolean;
    @State() visibility: string = 'visible';
    @State() nbItems: number =0;
    @State() activeIndex: number = 0;
//    @State() initialIndex: number = 0;


    //*********************
    //* Event Definitions *
    //*********************

    /**
     * Emitted when a pagination bullet was clicked
     */
    @Event({eventName:'jeepPaginationIndex'}) onPaginationIndex!: EventEmitter<PaginationIndex >;


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
     * Set the Pagination Visibility (visible/hidden)
     */
    @Method()
    setJeepPaginationVisibility(state:any): Promise<void> { 
        if(state && state.visibility) {
            this.visibility = state.visibility;
        }
        return;
    }   

    /**
     * Set the Pagination Slides Number
     */
    @Method()
    setJeepPaginationSlidesNumber(state:any): Promise<void> { 
        if(state && state.slides) {
            this.nbItems = state.slides;
        }
        return;
    }   
    
    /**
     * Set the Pagination Active Index
     */
    @Method()
    setJeepPaginationActiveIndex(state:any): Promise<void> { 
        if(state && state.activeIndex) {
            this.activeIndex = Number(state.activeIndex);
        }
        return;
    }   
    /**
     * Get the Pagination Number of bullets displayed
     */
    @Method()
    async getJeepPaginationBulletNumber(): Promise<number> {
        return this.innerNDisplay;
    }

    //*********************************
    //* Internal Variable Definitions *
    //********************************* 

    _element: any;
    _pagSpanEls: Array<HTMLElement>;
    _activeEl: HTMLElement;
    _delta: number;

    async componentWillLoad() {
        await this.init();
    }
        
    private async _init(): Promise<void> {
        this._element = this.el.shadowRoot;
        this.parseNDisplayProp(this.ndisplay ? this.ndisplay : 5);
        this.parseDirectionProp(this.direction ? this.direction : "horizontal");       
        this.parseClickableProp(this.clickable ? this.clickable : false);
        return;
    }

    private _handleClick(i:number) {
        if( this.innerClickable ) {
            this.onPaginationIndex.emit({index:i.toString()});
        }
    }
    private _setPaginationBullets(nbItems:number): Array<JSX.Element> {
        let bullets:JSX.Element[] = [];
        let initIndex  = this.activeIndex - this._delta;
        const classname: string = `pagination-bullet pagination-bullet-${this.innerDirection}`;

        for(let i:number = 0; i < this.innerNDisplay; i++) {
            let appliedClass: string = classname;
            if(initIndex + i < 0) { 
                appliedClass = `${classname} hidden-bullet`;
            } else if(initIndex + i === this.activeIndex) {
                appliedClass = `${classname} active-bullet`;
            } else if ( initIndex + i > nbItems -1) {
                appliedClass = `${classname} hidden-bullet`;
            }
            bullets = [...bullets,
                <span class={appliedClass} onClick={ () => this._handleClick(initIndex + i)}></span>];      
        }
//        this.initialIndex = initIndex;
        return bullets;
    }
    render() {
        const paginationBullets: JSX.Element[] = this.nbItems > 0 ? this._setPaginationBullets(this.nbItems) : [];
        const containerClass: string = `pagination-container pagination-container-${this.innerDirection}`;
        return (
            <Host>
                <div class={containerClass}> 
                { this.visibility === "visible"
                ? 
                    <div class="pagination-wrapper">
                        {paginationBullets}
                    </div>
                : null}
                </div>
            </Host>
        );   
    }

}
