import {  h, Component, Host, Prop, Element, Watch, State, Event, EventEmitter, Method, Listen} from '@stencil/core';
import {  Color }  from '../../global/interfaces/color';
import { CloseData} from '../../global/interfaces/jeep-colorpicker';
import { JsxElement } from 'typescript';

@Component({
  tag: 'jeep-colorpicker',
  styleUrl: 'jeep-colorpicker.css',
  shadow: true
})
export class JeepColorpicker {
  @Element() el!: HTMLJeepColorpickerElement;

  //************************
  //* Property Definitions *
  //************************

  /**
   * The preselected color
   */
  @Prop({
    reflectToAttr: true
  }) color: string = "#ff0000";

  /**
   * The preselected opacity
   */
  @Prop({
    reflectToAttr: true
  }) opacity: string = "1";

  /**
   * The buttons text 
   */
  @Prop({
    reflectToAttr: true
  }) buttons: string;

  /**
   * Validation buttons hidden
   */
  @Prop({
    reflectToAttr: true
  }) hidebuttons: boolean = false;

  /**
   * Header hidden
   */
  @Prop({
    reflectToAttr: true
  }) hideheader: boolean = false;

  /**
   * Opacity Slider hidden
   */
  @Prop({
    reflectToAttr: true
  }) hideopacity: boolean = false;
  
  //*****************************
  //* Watch on Property Changes *
  //*****************************

  @Watch('color')
  parseColorProp(newValue: string) {
    this.innerColor = newValue ? newValue : "#ff0000";
  }

  @Watch('opacity')
  parseOpacityProp(newValue: string) {
    this.innerOpacity = newValue ? newValue : "1";
  }

  @Watch('buttons')
  parseButtonsProp(newValue: string) {
    let butts: string[];
    butts = newValue ? newValue.substr(1).slice(0,-1).split(',') : ["Color Picker","Okay","Cancel"];
    if (butts.length > 1 ) {
      butts = butts.length > 2 
      ? butts 
      : [butts[0],butts[1],"Cancel"];
    } else {
      butts = butts[0].length > 0 
      ? butts =[butts[0],"Okay","Cancel"]
      : butts =["Color Picker","Okay","Cancel"];
    }
    let val: string[] = butts.slice();
    val.shift();
    this._cpickerButtons=`[${val[0]},${val[1]}]`;
    this.innerButtons = butts;
  }

  @Watch('hidebuttons')
  parseHideButtonsProp(newValue: boolean) {
    this.innerHideButtons = newValue ? newValue : false;
  }

  @Watch('hideheader')
  parseHideHeaderProp(newValue: boolean) {
    this.innerHideHeader = newValue ? newValue : false;
  }

  @Watch('hideopacity')
  parseHideOpacityProp(newValue: boolean) {
    this.innerHideOpacity = newValue ? newValue : false;
    this.innerOpacity =  this.innerHideOpacity ? "1" : this.innerOpacity ;    
  }

  //************************
  //* State Definitions *
  //************************

  @State() innerColor: string;
  @State() innerOpacity: string;
  @State() innerButtons: string[];
  @State() innerHideButtons: boolean;
  @State() innerHideHeader: boolean;
  @State() innerHideOpacity: boolean;
  @State() show: boolean = false;

  //*********************
  //* Event Definitions *
  //*********************

  @Event({eventName:'jeepColorpickerGetColor'}) getColor: EventEmitter<Color>;
  @Event({eventName:'jeepColorpickerOpen'}) openCpicker: EventEmitter;
  @Event({eventName:'jeepColorpickerClose'}) closeCpicker: EventEmitter<CloseData>;

  //*******************************
  //* Listen to Event Definitions *
  //*******************************

  @Listen('jeepCpickerOpen')
  openColorPickerHandler() {
    if(this.show) {
      this.openCpicker.emit();
    }
  }
  @Listen('jeepCpickerClose')
  closeColorPickerHandler(event: CustomEvent) {
    if(this.show) {
      this._color = event.detail.color;
      this.close(this._color,event.detail.button); 
    }
  }
  @Listen('jeepCpickerInstantColor')
  instantColorPickerHandler(event: CustomEvent) {
    this._color = event.detail;
    this.getColor.emit(event.detail);
  }

  //**********************
  //* Method Definitions *
  //**********************

  /**
   * Method initialize
   */
  @Method()
  async init(): Promise<void> {
    return await this._init();
  }

  /**
   * Method open the cpicker component
   */
  @Method()
  async open () {
    this.show = true;
  }

  /**
   * Method close the cpicker component
   */
  @Method()
  async close(color:Color,button:number) {
    this.show = false;
    this.closeCpicker.emit({color:color,button:button});
  }

  //*********************************
  //* Internal Variable Definitions *
  //*********************************

  _cpickerButtons: string;
  _color: Color = null;

  //*******************************
  //* Component Lifecycle Methods *
  //*******************************

  async componentWillLoad() {
    await this.init();
  }


  //******************************
  //* Private Method Definitions *
  //******************************

  private async _init(): Promise<void> {
    this.parseColorProp(this.color ? this.color : "#ff0000");
    this.parseOpacityProp(this.opacity ? this.opacity : "1"); 
    this.parseButtonsProp(this.buttons ? this.buttons : '[Color Picker,Okay,Cancel]'); 
    this.parseHideButtonsProp (this.hidebuttons ? this.hidebuttons :false);     
    this.parseHideHeaderProp (this.hideheader ? this.hideheader :false);     
    this.parseHideOpacityProp (this.hideopacity ? this.hideopacity :false); 
    return;
  }

  async _handleClick() {
    await this.open();
  }
  //*************************
  //* Rendering JSX Element *
  //*************************

  render() {
    let cpicker: JsxElement;
    if(this.show) {
      cpicker = this.innerHideButtons 
      ?
        <jeep-cpicker color={this.innerColor} opacity={this.innerOpacity}
        hidebuttons={this.innerHideButtons} hideheader={this.innerHideHeader} hideopacity={this.innerHideOpacity}>
        </jeep-cpicker>
      :
        <jeep-cpicker color={this.innerColor} opacity={this.innerOpacity} buttons={this._cpickerButtons}
        hideheader={this.innerHideHeader} hideopacity={this.innerHideOpacity}>
        </jeep-cpicker>
      ;
    }
    return (
      <Host>
        <div class="colorpicker-container">
          { this.show
          ?
          cpicker
          :
          <button class="colorpicker-button" onClick={ () => this._handleClick()}>{this.innerButtons[0]}</button>
        }
        </div>
      </Host>
    )
  }
}