import { h, Host, Element, Component, Method, State, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
  tag: 'jeep-fullscreen',
  styleUrl: 'jeep-fullscreen.css',
  shadow: true
})
export class JeepFullscreen {

    @Element() el!: HTMLJeepFullscreenElement;

    //************************
    //* Property Definitions *
    //************************

    //*****************************
    //* Watch on Property Changes *
    //*****************************

    //************************
    //* State Definitions *
    //************************

    @State() visibility: string = 'visible';
    @State() fullscreen: boolean = false;

    //*********************
    //* Event Definitions *
    //*********************

    /**
     * Emitted when Fullscreen Requested
     */
    @Event({eventName:'jeepFullscreenRequest'}) onFullscreenRequest: EventEmitter<void>;

    /**
     * Emitted when Fullscreen Exit
     */
    @Event({eventName:'jeepFullscreenExit'}) onFullscreenExit!: EventEmitter<void>;

    /**
     * Emitted when Fullscreen Change
     */
    @Event({eventName:'jeepFullscreenChange'}) onFullscreenChange!: EventEmitter<void>;

    //*******************************
    //* Listen to Event Definitions *
    //*******************************
    @Listen('fullscreenchange', { target: 'document' })
    @Listen('webkitfullscreenchange', { target: 'document' })
    @Listen('mozfullscreenchange', { target: 'document' })
    @Listen('msfullscreenchange', { target: 'document' })
    handleFullScreenChange(){
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

    @Method()
    init(): Promise<void> {
        return Promise.resolve(this._init());
    }

    /**
     * Set the Fullscreen component.
     */
    @Method()
    setFullscreen(): Promise<void> {
        return Promise.resolve(this._setFullscreen());
    }

    /**
     * Set the Fullscreen Visibility (visible/hidden)
     */
    @Method()
    async setJeepFullscreenVisibility(state:any): Promise<void>  { 
        if(state && state.visibility) {
            if(state.visibility === 'hidden') {
                if(!this._screenContainerEl.classList.contains('hidden')) this._screenContainerEl.classList.add('hidden');           
            } else {
                if(this._screenContainerEl.classList.contains('hidden')) this._screenContainerEl.classList.remove('hidden');           
            }
            this.visibility = state.visibility;
        }
        return;
    }   

    /**
     * Request Fullscreen
     */
    @Method()
    async fullscreenRequest(elem:any): Promise<void> {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else {
            this.fullscreen = false;
            console.log('Fullscreen API is not supported.');
        }
        return;
    }

    /**
     * Exit Fullscreen
     */
    @Method()
    async fullscreenExit(): Promise<void> {
        let doc:any = document
        if (doc && doc.exitFullscreen) {
            doc.exitFullscreen();
        } else if (doc && doc.webkitExitFullscreen) {
            doc.webkitExitFullscreen();
        } else if (doc && doc.mozExitFullscreen) {
            doc.mozExitFullscreen();
        } else if (doc && doc.msExitFullscreen) {
            doc.msExitFullscreen();
        } else {
            console.log('Fullscreen API is not supported.');
        } 
        return;
    }

    /**
     * Is Fullscreen
     */
    @Method()
    async isFullscreen(): Promise<boolean> {
        return this.fullscreen;
    }

    //*********************************
    //* Internal Variable Definitions *
    //*********************************

    _element: any;
    _screenContainerEl: any;
    _fullscreenEl: any;
    _fullscreenIcons:any = {
        request:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M396.795 396.8H320V448h128V320h-51.205zM396.8 115.205V192H448V64H320v51.205zM115.205 115.2H192V64H64v128h51.205zM115.2 396.795V320H64v128h128v-51.205z"/></svg>',
        exit:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 371.2h76.795V448H192V320H64v51.2zm76.795-230.4H64V192h128V64h-51.205v76.8zM320 448h51.2v-76.8H448V320H320v128zm51.2-307.2V64H320v128h128v-51.2h-76.8z"/></svg>'
    }
    _fullscreenChange: boolean = false;

    async componentWillLoad() {
        await this.init();
    }
    async componentDidLoad() {
        await this.setFullscreen();
      } 
        
    private async _init(): Promise<void> {
        this._element = this.el.shadowRoot;
        return;
    }

    private async _setFullscreen(): Promise<void> {
        this._screenContainerEl = this._element.querySelector(".fullscreen-container");
        this._fullscreenEl = this._screenContainerEl.querySelector('.fullscreen-button');
        if(this._fullscreenEl) {
            this._fullscreenEl.innerHTML = this._fullscreenIcons.request;
            this._fullscreenEl.addEventListener('click', async () => {
                if(this._fullscreenEl.classList.contains('fullscreen-button') && this._fullscreenEl.classList.contains('request')) {
                    this.fullscreen = true;
                    this.onFullscreenRequest.emit();
                } else {
                    if(this.fullscreen) {
                        this.fullscreen = false;
                        this.onFullscreenExit.emit();
                    }       
                }
            },false);
        } 
        return;
    }
    
    render() { 
        if(this._fullscreenEl) {
            this._fullscreenEl.innerHTML = this.fullscreen ? this._fullscreenIcons.exit : this._fullscreenIcons.request;
        }
        return (
            <Host>
                <div class="fullscreen-container"> 
                    {!this.fullscreen
                    ? <div class="fullscreen-button request"></div>
                    : <div class="fullscreen-button exit"></div>
                    }      
                </div>
            </Host>
        );
    }     

}
