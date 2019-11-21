import { h, Host, Element, Component, Prop, Method, State, Watch, Event, EventEmitter } from '@stencil/core';
import { slideLocalCssVariables } from '../../../global/interfaces/jeep-slides';
import { getCssPropertyFromString } from '../../../utils/common';

@Component({
  tag: 'jeep-slide',
  styleUrl: 'jeep-slide.css',
  shadow: true
})
export class JeepSlide {

    @Element() el!: HTMLJeepSlideElement;

    //************************
    //* Property Definitions *
    //************************

    /**
     * The slide title
     */
    @Prop() stitle: string;

    /**
     * The slide subtitle
     */
    @Prop() subtitle: string;

    /**
     * The slide subtitle
     */
    @Prop() cstyle: string;
  
    //*****************************
    //* Watch on Property Changes *
    //*****************************/
    
    @Watch('stitle')
    parseTitleProp(newValue: string) {
      if (newValue) this.innerTitle = newValue;
    }
    @Watch('subtitle')
    parseSubTitleProp(newValue: string) {
      if (newValue) this.innerSubTitle = newValue;
    }
    @Watch('cstyle')
    async parseStyleProp(newValue: string) {
      if (newValue) {
        this._lcssvar = await getCssPropertyFromString(newValue,'slide');
        this._setLocalCssVariables();
        this.innerStyle = newValue;
      }
    }

    //************************
    //* State Definitions *
    //************************

    @State() innerTitle: string;
    @State() innerSubTitle: string;
    @State() innerStyle: string;

    //*********************
    //* Event Definitions *
    //*********************

    /**
     * Emitted when a pagination bullet was clicked
     */
    @Event({eventName:'jeepSlideDidLoad'}) onSlideDidLoad!: EventEmitter;


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
     * Set the slide component.
     */
    @Method()
    setSlide(): Promise<void> {
        return Promise.resolve(this._setSlide());
    }

    //*********************************
    //* Internal Variable Definitions *
    //*********************************

    _element: any;
    _lcssvar: slideLocalCssVariables;

    async componentWillLoad() {
        await this.init();
    }

    async componentDidLoad() {
        await this.setSlide();
    }

    private async _init(): Promise<void> {
        this._element = this.el.shadowRoot;
        this.parseTitleProp(this.stitle ? this.stitle : null);
        this.parseSubTitleProp(this.subtitle ? this.subtitle : null);
        await this.parseStyleProp(this.cstyle ? this.cstyle : null);       
        return;
    }
    private _setLocalCssVariables() {
        if (this._lcssvar.alignItems) this.el.style.setProperty('--slide-align-items',this._lcssvar.alignItems);    
        if (this._lcssvar.background) this.el.style.setProperty('--slide-background',this._lcssvar.background);    
        if (this._lcssvar.color) this.el.style.setProperty('--slide-color',this._lcssvar.color);    
        if (this._lcssvar.contentFontSize) this.el.style.setProperty('--slide-content-font-size',this._lcssvar.contentFontSize);    
        if (this._lcssvar.contentPadding) this.el.style.setProperty('--slide-content-padding',this._lcssvar.contentPadding);    
        if (this._lcssvar.contentTextAlign) this.el.style.setProperty('--slide-content-text-align',this._lcssvar.contentTextAlign);    
        if (this._lcssvar.contentTop) this.el.style.setProperty('--slide-content-top',this._lcssvar.contentTop);    
        if (this._lcssvar.display) this.el.style.setProperty('--slide-display',this._lcssvar.display);    
        if (this._lcssvar.flexDirection) this.el.style.setProperty('--slide-flex-direction',this._lcssvar.flexDirection);    
        if (this._lcssvar.fontSize) this.el.style.setProperty('--slide-font-size',this._lcssvar.fontSize);    
        if (this._lcssvar.headerTop) this.el.style.setProperty('--slide-header-top',this._lcssvar.headerTop);    
        if (this._lcssvar.height) this.el.style.setProperty('--slide-height',this._lcssvar.height);    
        if (this._lcssvar.justifyContent) this.el.style.setProperty('--slide-justify-content',this._lcssvar.justifyContent);    
        if (this._lcssvar.minWidth) this.el.style.setProperty('--slide-min-width',this._lcssvar.minWidth);    
        if (this._lcssvar.scrollSnapAlign) this.el.style.setProperty('--slide-scroll-snap-align',this._lcssvar.scrollSnapAlign);    
        if (this._lcssvar.subtitleFontSize) this.el.style.setProperty('--slide-subtitle-font-size',this._lcssvar.subtitleFontSize);    
        if (this._lcssvar.textAlign) this.el.style.setProperty('--slide-text-align',this._lcssvar.textAlign);    
        if (this._lcssvar.titleFontSize) this.el.style.setProperty('--slide-title-font-size',this._lcssvar.titleFontSize);    

    }
    private async _setSlide(): Promise<void> {
        this.onSlideDidLoad.emit();
        return; 
    }
    render() { 
        return (
            <Host>
                <div class="slide-container">
                    <div class="slide-wrapper">
                        <div class="slide-header">
                            { this.innerTitle != null
                            ? <div class="slide-title">{this.innerTitle}</div>
                            : null}
                            { this.innerSubTitle != null
                            ? <div class="slide-subtitle">{this.innerSubTitle}</div>
                            : null}
                        </div>
                        <div class="slide-content">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </Host>
        );   
    }

}

/*
            <style id="slide-cstyle">{ this.innerStyle != null ? this.innerStyle : null}</style>,

*/