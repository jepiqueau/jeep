import { h, Host, Element, Component, Prop, Method, State, Watch, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'jeep-play-controls',
  styleUrl: 'jeep-play-controls.css',
  shadow: true
})
export class JeepPlayControls {

    @Element() el!: HTMLJeepPlayControlsElement;

    //************************
    //* Property Definitions *
    //************************


    /**
     * The play controls duration time
     * time to stay on same slide
     */
    @Prop() duration: number;

    /**
     * The play controls slides number
     */
    @Prop() nslides: number;


    /**
     * The play controls from slides number
     * The first slide index is 0
     */
    @Prop() fromslide: number;

    /**
     * The play controls to slides number
     * The last slide index is slides.length - 1
     */
    @Prop() toslide: number;

    //*****************************
    //* Watch on Property Changes *
    //*****************************
  
    @Watch('duration')
    parseDurationProp(newValue: number) {
      if (newValue) this.innerDuration = newValue;
    }

    @Watch('nslides')
    parseNSlidesProp(newValue: number) {
        if (newValue !== 0) {
          this.innerNSlides = newValue;
          this.innerToSlide = this.innerNSlides - 1;
        } else {
            this.innerNSlides = 0;
            this.innerToSlide = 0;  
        }
    }

    @Watch('fromslide')
    parseFromSlideProp(newValue: number) {
        if (newValue !== 0 ) {
            this.innerFromSlide = newValue;
        } else {
            this.innerFromSlide = 0;
        }
    }

    @Watch('toslide')
    parseToSlideProp(newValue: number) {
        if (newValue !== 0 ) {
            this.innerToSlide = newValue;
        } else {
            this.innerToSlide = 0;
        }
    }

    //************************
    //* State Definitions *
    //************************

    @State() innerDuration: number;
    @State() innerNSlides: number;
    @State() innerFromSlide: number;
    @State() innerToSlide: number;
    @State() visibility: string = 'visible';
    @State() play: boolean = false;

    //*********************
    //* Event Definitions *
    //*********************

    /**
     * Emitted when current index is fromslide
     */
    @Event({eventName:'jeepPlayControlsIsBeginning'}) onPlayControlsIsBeginning!: EventEmitter<void>;

    /**
     * Emitted when current index is toslide
     */
    @Event({eventName:'jeepPlayControlsIsEnd'}) onPlayControlsIsEnd!: EventEmitter<void>;

    /**
     * Emitted when the current index change
     */
    @Event({eventName:'jeepPlayControlsCurrentIndex'}) onPlayControlsCurrentIndex!: EventEmitter<{index:string}>;

    /**
     * Emitted when autoplay start button clicked
     */
    @Event({eventName:'jeepPlayControlsAutoplayStart'}) onPlayControlsAutoplayStart!: EventEmitter<void>;

    /**
     * Emitted when autoplay stop button clicked
     */
    @Event({eventName:'jeepPlayControlsAutoplayStop'}) onPlayControlsAutoplayStop!: EventEmitter<void>;

    /**
     * Emitted when autoplay pause button clicked
     */
    @Event({eventName:'jeepPlayControlsAutoplayPause'}) onPlayControlsAutoplayPause!: EventEmitter<void>;

    /**
     * Emitted when autoplay skip backward button clicked
     */
    @Event({eventName:'jeepPlayControlsAutoplaySkipBackward'}) onPlayControlsAutoplaySkipBackward!: EventEmitter<void>;

    /**
     * Emitted when autoplay skip forward button clicked
     */
    @Event({eventName:'jeepPlayControlsAutoplaySkipForward'}) onPlayControlsAutoplaySkipForward!: EventEmitter<void>;

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
     * Set the PlayControls component.
     */
    @Method()
    setPlayControls(): Promise<void> {
        return Promise.resolve(this._setPlayControls());
    }

    /**
     * Set the PlayControls Visibility (visible/hidden)
     */
    @Method()
    async setJeepPlayControlsVisibility(state:any): Promise<void>  { 
        if(state && state.visibility) {
            if(state.visibility === 'hidden') {
                if(!this._playContainerEl.classList.contains('hidden')) this._playContainerEl.classList.add('hidden');           
            } else {
                if(this._playContainerEl.classList.contains('hidden')) this._playContainerEl.classList.remove('hidden');           
            }
            this.visibility = state.visibility;
        }
        return;
    }   

    /**
     * Set the PlayControls skipbackward icon to enable/disable
     */
    @Method()
    async setJeepPlayControlsSkipBackwardDisabled(state: any): Promise<void>  {
        this._skipBackwardDisabled = state.disabled;
        this._setSkipBackwardDisabled();
        return;
    }   

    /**
     * Set the PlayControls skipforward icon to enable/disable
     */
    @Method()
    async setJeepPlayControlsSkipForwardDisabled(state: any): Promise<void>  { 
        this._skipForwardDisabled = state.disabled;
        this._setSkipForwardDisabled();
        return;
    }   

    /**
     * Get the PlayControls duration
     */
    @Method()
    async getJeepPlayControlsDuration(): Promise<number> {
        return this.innerDuration;
    }

    /**
     * Start autoplay
     */
    @Method()
    async autoplayStart(): Promise<void> {
        this.play = true;
        this.onPlayControlsAutoplayStart.emit();
        this._playContent();
        return;
    }

    /**
     * Stop autoplay
     */
    @Method()
    async autoplayStop(): Promise<void> {
        this.play = false;
        this.onPlayControlsAutoplayStop.emit();
        clearInterval(this._initial);
        await this.setCurrentIndex(this.innerFromSlide);
        return;
    }

    /**
     * Pause autoplay
     */
    @Method()
    async autoplayPause(): Promise<void> {
        this.play = false;
        this.onPlayControlsAutoplayPause.emit();
        clearInterval(this._initial);
        return;
    }

    /**
     * Is Playing
     */
    @Method()
    async isPlaying(): Promise<boolean> {
        return this.play;
    }

    /**
     * Get PlayControls Current Index
     */
    @Method()
    async getCurrentIndex(): Promise<number> {
        return this._currentIndex;
    }
    /**
     * Set PlayControls Active Index
     */
    @Method()
    async setActiveIndexAndPlay(index:number): Promise<void> {
        clearInterval(this._initial);
        this.setCurrentIndex(index)
        this.autoplayStart();
        return;
    }

    /**
     * Set PlayControls Current Index
     */
    @Method()
    async setCurrentIndex(index:number,notemit?:boolean): Promise<void> {
        const willEmit: boolean = notemit ? !notemit : true;
        this._currentIndex = index;
        this.onPlayControlsCurrentIndex.emit({index:this._currentIndex.toString()});
        this._setSkipButtons();
        if(willEmit && this._currentIndex === this.innerFromSlide) this.onPlayControlsIsBeginning.emit();
        if(willEmit && this._currentIndex === this.innerToSlide) this.onPlayControlsIsEnd.emit();
        return;
    }
    //*********************************
    //* Internal Variable Definitions *
    //*********************************

    _skipBackwardButton: string;
    _skipForwardButton: string;
    _element: any;
    _playContainerEl: HTMLElement;
    _playEl: HTMLElement;
    _playSkipBackwardEl: HTMLElement;
    _playSkipForwardEl: HTMLElement;
    _skipForwardDisabled: boolean = true;
    _skipBackwardDisabled: boolean = false;
    _currentIndex:number;
    _initial: NodeJS.Timer;

    async componentWillLoad() {
        await this.init();
    }
    async componentDidLoad() {
        await this.setPlayControls();
      } 
        
    private async _init(): Promise<void> {
        this._element = this.el.shadowRoot;
        this.parseDurationProp(this.duration ? this.duration : 1000);
        this.parseNSlidesProp(this.nslides ? this.nslides : 0);
        this.parseFromSlideProp(this.fromslide ? this.fromslide : 0);
        this.parseToSlideProp(this.toslide ? this.toslide : this.innerNSlides > 0 ? this.innerNSlides -1 :0);
        await this.setCurrentIndex(this.innerFromSlide,true);
        return;
    }

    private async _setPlayControls(): Promise<void> {
        this._playContainerEl = this._element.querySelector(".playcontrols-container");
        this._playSkipBackwardEl = this._playContainerEl.querySelector('.playcontrols-button-skip-backward');
        this._playSkipForwardEl = this._playContainerEl.querySelector('.playcontrols-button-skip-forward');
        this.setJeepPlayControlsSkipBackwardDisabled({disabled:true});
        this.onPlayControlsIsBeginning.emit();
        if(this.innerToSlide > 0 ) {
            this.setJeepPlayControlsSkipForwardDisabled({disabled:false});
        } else {
            this.setJeepPlayControlsSkipForwardDisabled({disabled:true});
            this.onPlayControlsIsEnd.emit();
        }
        return;
    }
    _setSkipBackwardDisabled() {
        if(this._skipBackwardDisabled) {
            if(!this._playSkipBackwardEl.classList.contains('disabled')) this._playSkipBackwardEl.classList.add('disabled');           
        } else {
            if(this._playSkipBackwardEl.classList.contains('disabled')) this._playSkipBackwardEl.classList.remove('disabled');           
        }
    }    

    _setSkipForwardDisabled() {
        if(this._skipForwardDisabled) {
            if(!this._playSkipForwardEl.classList.contains('disabled')) this._playSkipForwardEl.classList.add('disabled');           
        } else {
            if(this._playSkipForwardEl.classList.contains('disabled')) this._playSkipForwardEl.classList.remove('disabled');           
        }
    }
    private async _handleClick(event) {
         if(event.target.classList.contains('playcontrols-button-play') && event.target.classList.contains('play')) {
            if(this.innerToSlide > 0 && this._currentIndex < this.innerToSlide) {
                await this.autoplayStart();
            }

        } else if(event.target.classList.contains('playcontrols-button-skip-backward')) {
            if(!this._playSkipBackwardEl.classList.contains('disabled') || this._currentIndex > this.innerFromSlide) {
                this.onPlayControlsAutoplaySkipBackward.emit();
                await this.setActiveIndexAndPlay(this._currentIndex - 1);
            }        
        } else if(event.target.classList.contains('playcontrols-button-skip-forward')) {
             if(!this._playSkipForwardEl.classList.contains('disabled') || this._currentIndex < this.innerToSlide) {
                this.onPlayControlsAutoplaySkipForward.emit();
                await this.setActiveIndexAndPlay(this._currentIndex + 1);
            }        
        } else {
            if(this.play) {
                await this.autoplayPause();
            }
        }
    }
    private _playContent() {
        let index:number = 0;
        if(this.play){
            this._initial = setInterval(() => {
                if(index === 0 ) {
                    index = this._currentIndex + 1;
                }
                if(index > this.innerToSlide) { 
                    this.play = false;
                    this.setCurrentIndex(this.innerFromSlide);
                    clearInterval(this._initial);
                } else {
                    this.setCurrentIndex(index);
                    index ++;    
                }    
            },this.innerDuration);
        } else {
            clearInterval(this._initial);
            return;
        }
    }

    _setSkipButtons() {
        if (this._playSkipBackwardEl && this._playSkipForwardEl) {
            if(this._currentIndex === this.innerFromSlide) {
                this.setJeepPlayControlsSkipBackwardDisabled({disabled:true});
            } else {
                this.setJeepPlayControlsSkipBackwardDisabled({disabled:false});
            }
            if(this._currentIndex === this.innerToSlide) {
                this.setJeepPlayControlsSkipForwardDisabled({disabled:true});
            } else {
                this.setJeepPlayControlsSkipForwardDisabled({disabled:false});
            }    
        }
    }
    
    render() { 
        this._setSkipButtons();
        return (
            <Host>
                <div class="playcontrols-container"> 
                    <div class="playcontrols-button playcontrols-button-skip-backward disabled" onClick={ (event: UIEvent) => this._handleClick(event)}></div>
                    {this.play
                    ? <div class="playcontrols-button playcontrols-button-play pause" onClick={ (event: UIEvent) => this._handleClick(event)}></div>
                    : <div class="playcontrols-button playcontrols-button-play play" onClick={ (event: UIEvent) => this._handleClick(event)}></div>
                    }      
                    <div class="playcontrols-button playcontrols-button-skip-forward disabled" onClick={ (event: UIEvent) => this._handleClick(event)}></div>
                </div>
            </Host>
        );
    }     

}
