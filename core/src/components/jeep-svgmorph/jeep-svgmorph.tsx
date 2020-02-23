import { h, Component, Host, Element, State, Prop, Method, Watch } from '@stencil/core';
import { CubicBezier}  from '../../global/interfaces/svggeom';
import { cubicBezierfromPath, alignPathSegments } from '../../utils/svgelements'
import { StateProperties } from '../../global/interfaces/jeep-svgmorph';

@Component({
  tag: 'jeep-svgmorph',
  styleUrl: 'jeep-svgmorph.css',
  shadow: true
})
export class JeepSvgmorph {

  @Element() el!: HTMLJeepSvgmorphElement;

  //************************
  //* Property Definitions *
  //************************

  /**
   * The preselected duration
   */
  @Prop({
    reflectToAttr: true
  }) duration: string ="2000ms";
  
  /**
   * The preselected repeat count
   */
  @Prop({
    reflectToAttr: true
  }) repeatcount: string;
  
  /**
   * The preselected path index
   */
  @Prop({
    reflectToAttr: true
  }) pathindex: string;
  
  /**
   * The preselected number of segments
   */
  @Prop({
    reflectToAttr: true
  }) nsegment: string;
  
  /**
   * The preselected key times
   */
  @Prop({
    reflectToAttr: true
  }) keytimes:string;
  
  /**
   * The preselected calculation mode
   */
  @Prop({
    reflectToAttr: true
  }) calcmode:string = "linear";
  
  /**
   * The preselected key splines
   */
  @Prop({
    reflectToAttr: true
  }) keysplines:string;
  
  /**
   * The preselected fill color
   */
  @Prop({
    reflectToAttr: true
  }) fill: string;

  //************************
  //* State Definitions *
  //************************

  @State() isSVG: boolean;
  @State() innerDuration: string;
  @State() innerRepeatcount: string;
  @State() innerPathindex: Array<number>;
  @State() innerNsegment: number;
  @State() innerKeytimes:string;
  @State() innerCalcmode:string;
  @State() innerKeysplines:string;
  @State() innerFill: string;

  //*****************************
  //* Watch on Property Changes *
  //*****************************

  @Watch('duration')
  parseDurationProp(newValue: string) {
    this.innerDuration = newValue ? newValue : "2000ms";
  }
  @Watch('repeatcount')
  parseRepeatcountProp(newValue: string) {
    this.innerRepeatcount = newValue ? newValue : null;
  }
  @Watch('pathindex')
  parsePathindexProp(newValue: string) {
    this.innerPathindex = newValue ? this._removeCarriageReturn(newValue).split(';').map(Number) : null;
  }
  @Watch('nsegment')
  parseNsegmentProp(newValue: string) {
    this.innerNsegment = newValue ? Number(newValue) : null;
  }
  @Watch('keytimes')
  parseKeytimesProp(newValue: string) {
    this.innerKeytimes = newValue ? this._removeCarriageReturn(newValue) : null;
  }
  @Watch('calcmode')
  parseCalcmodeProp(newValue: string) {
    this.innerCalcmode = newValue ? newValue : "linear";
  }
  @Watch('keysplines')
  parseKeysplinesProp(newValue: string) {
    this.innerKeysplines = newValue ? this._removeCarriageReturn(newValue) : null;
  }
  @Watch('fill')
  parseFillProp(newValue: string) {
    this.innerFill = newValue ? newValue : null;
  }

  //*********************
  //* Event Definitions *
  //*********************

  //*******************************
  //* Listen to Event Definitions *
  //*******************************


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
  @Method()
  async getStateProperties(): Promise<StateProperties> {
    const stateProperties: StateProperties = {} as StateProperties;
    stateProperties.duration = this.innerDuration;
    stateProperties.repeatCount = this.innerRepeatcount;
    stateProperties.pathIndex = this.innerPathindex;
    stateProperties.nSegment = this.innerNsegment;
    stateProperties.keyTimes = this.innerKeytimes;
    stateProperties.calcMode = this.innerCalcmode;
    stateProperties.keySplines = this.innerKeysplines;
    stateProperties.fill = this.innerFill;
    return stateProperties;
  }
  @Method()
  async getPath(): Promise<void> {
    return this._getPath();
  }
  @Method()
  async getPathList(): Promise<Array<string>> {
    return this._pathList;
  }
  @Method()
  async getFillColor(): Promise<Array<string>> {
    return this._fillColor;
  }
  @Method()
  renderSVGFirstPath(): Promise<void> {
    return this._renderSVGFirstPath();
  }
  @Method()
  async getAlignedPaths(calc: boolean): Promise<Array<CubicBezier>> {
    if (calc) await this._alignPaths();
    return this._alignPathList;
  }

  //*********************************
  //* Internal Variable Definitions *
  //*********************************

  private _pathList: Array<string>;
  private _alignPathList: Array<CubicBezier> = [];
  private _cBList: Array<CubicBezier> = [];
  private _fillColor: Array<string>;
  private _element: any;
  private _svgOptions: any;
  private _svg: SVGSVGElement;
  private _container: HTMLDivElement;
  private _path:SVGPathElement;
  private _valuesPath :string = "";
  private _valuesFill :string = "";
  private _isUniqueColor: boolean = false;
  private _uniqueColor:string;

  //*******************************
  //* Component Lifecycle Methods *
  //*******************************

  async componentWillLoad() {
    await this.init();
  }
  async componentDidLoad() {
    this._element = this.el.shadowRoot;
    if(this.isSVG) {
      await this._renderSVGFirstPath();
    }
  }

  //******************************
  //* Private Method Definitions *
  //******************************
  private async _init(): Promise<void> {
    this.parseDurationProp(this.duration ? this.duration : "2000ms");
    this.parsePathindexProp(this.pathindex ? this.pathindex : null);
    this.parseNsegmentProp(this.nsegment ? this.nsegment : null);
    this.parseRepeatcountProp(this.repeatcount ? this.repeatcount : null); 
    this.parseFillProp(this.fill ? this.fill : null);
    this.parseKeytimesProp(this.keytimes ? this.keytimes : null);
    this.parseCalcmodeProp(this.calcmode ? this.calcmode : 'linear');
    this.parseKeysplinesProp(this.keysplines ? this.keysplines : null);
    if(this.innerFill != null) {
      this._uniqueColor = this.innerFill;
      this._isUniqueColor = true;
    }
    await this.getPath();
    return;
  }

  private _removeCarriageReturn(s:string): string {
    let a: Array<string> = s.split(/\r?\n|\r/g);
    let c:string = s;
    if(a.length > 1) {
      c = '';
      for (let j:number =0 ;j< a.length;j++) {
        c = c.concat(' ' + a[j].trim());
      }
    }
    return c;
  }
  private _setSVGAttributes(): void{
    if(this._svgOptions.width) this._svg.setAttribute('width',this._svgOptions.width);
    if(this._svgOptions.height) this._svg.setAttribute('height',this._svgOptions.height);
    if(this._svgOptions.viewBox) this._svg.setAttribute('viewBox',this._svgOptions.viewBox);
    if(this._svgOptions.xmlns) this._svg.setAttribute('xmlns',this._svgOptions.xmlns);
  }
  private _drawFirstPath(): void { 
    this._path = this._svg.querySelector("#initPath");
    this._path.setAttribute('d',this._pathList[0]);
    if(this._fillColor.length > 0) this._path.setAttribute('fill',this._fillColor[0]);
  }
  private async _getPath() {
    const svg: SVGElement = this.el.querySelector('svg');
    this.isSVG = false;

    if(svg !== null) {
      this._svgOptions = {};
      this._pathList = [];
      this._fillColor = [];
      let width:string = svg.getAttribute('width');
      let height:string = svg.getAttribute('height');
      let viewBox:string = svg.getAttribute('viewBox');
      let xmlns:string = svg.getAttribute('xmlns');
      this._svgOptions.width = width ? width : false;
      this._svgOptions.height = height ? height : false;
      this._svgOptions.viewBox = viewBox ? viewBox : false;
      this._svgOptions.xmlns = xmlns ? xmlns : false;
      if(svg.childElementCount > 0 ) {
        for (let i:number =0 ;i< svg.childElementCount;i++) {
          let d: string = svg.children[i].getAttribute('d');
          let a: Array<string> = d.split(/\r?\n|\r/g);
          if(a.length > 1) {
            let c:string = '';
            for (let j:number =0 ;j< a.length;j++) {
              c = c.concat(' ' + a[j].trim());
            }
            this._pathList = [...this._pathList,c.trim()];
          } else {
            this._pathList = [...this._pathList,d];
          }
          const color = svg.children[i].getAttribute('fill');
          if(color != null && !this._isUniqueColor) {
            this._fillColor = [...this._fillColor, color];
          }
        } 
      }
      const ncolor:number = await this.getOccurrence(this._fillColor,this._fillColor[0]);
      if(ncolor === this._fillColor.length) {
        this._isUniqueColor = true;
        this._uniqueColor = this._fillColor[0];
      }
      this.el.removeChild(svg)
      let kTimes: number = this.innerKeytimes != null ? this.innerKeytimes.split(';').length: 0;
      let kSplines: number = this.innerKeysplines != null ? this.innerKeysplines.split(';').length: 0;
      let b: boolean = this.innerCalcmode === 'spline' && kSplines != kTimes - 1 ? false : true;
      let c: boolean = kTimes === 0 || kTimes === this._pathList.length ? true : false;
      if(b && c ) this.isSVG = true;
    }
  }
  private async _alignPaths(): Promise<void> {
    // align paths
      let startIndex:number;
      for (let i: number = 0 ; i < this._pathList.length; i++) {
        startIndex = this.innerPathindex !=null && this.innerPathindex[i] ? this.innerPathindex[i] : 0;
        const cbp: CubicBezier = await cubicBezierfromPath(this._pathList[i],startIndex);
        this._cBList = [...this._cBList,cbp];     
      }
      this._alignPathList = await alignPathSegments(this._cBList,this.innerNsegment);
      return;
    }
    private  _setAnimation() {
      // path animation set values
    let animPath: HTMLElement = this._path.querySelector('#animPath');
    this._valuesPath = "";
    for(let i:number = 0; i<this._alignPathList.length; i++) {
      if (this._alignPathList[i].cBz !=null)
          this._valuesPath = this._valuesPath.concat(this._alignPathList[i].cBz+';');
    }
    animPath.setAttribute("attributeName","d");
    animPath.setAttribute("values",this._valuesPath);
    animPath.setAttribute("dur",this.innerDuration);
    animPath.setAttribute("xlink:href","#initPath");
    if(this.innerFill != null) animPath.setAttribute("fill",this.innerFill);
    if(this.innerRepeatcount != null) animPath.setAttribute("repeatCount",this.innerRepeatcount);
    if(this.innerKeytimes != null) animPath.setAttribute("keyTimes",this.innerKeytimes);
    animPath.setAttribute("calcMode",this.innerCalcmode);
    if(this.innerKeysplines != null) animPath.setAttribute("keySplines",this.innerKeysplines);
    if(this._fillColor.length > 1 && !this._isUniqueColor) {
      let animFill: HTMLElement = this._path.querySelector('#animFill');;
      // fill animation set values
      this._valuesFill = "";
      for(let i:number = 0; i<this._fillColor.length; i++) {
        if (this._alignPathList[i].cBz !=null)
          this._valuesFill = this._valuesFill.concat(this._fillColor[i]+';');
      }
      animFill.setAttribute("attributeName","fill"); 
      animFill.setAttribute("values",this._valuesFill);
      animFill.setAttribute("dur",this.innerDuration);
      animFill.setAttribute("xlink:href","#initPath");
      if(this.innerFill != null) animFill.setAttribute("fill",this.innerFill);
      if(this.innerRepeatcount != null) animFill.setAttribute("repeatCount",this.innerRepeatcount);
      if(this.innerKeytimes != null) animPath.setAttribute("keyTimes",this.innerKeytimes);
      animPath.setAttribute("calcMode",this.innerCalcmode);
      if(this.innerKeysplines != null) animPath.setAttribute("keySplines",this.innerKeysplines);
      }
    return;
  }
  private async getOccurrence(array, value): Promise<number> {
    return array.filter((v) => (v === value)).length;
  }
  private async _renderSVGFirstPath(): Promise<void> {
    this._container = this._element.querySelector('#morph-container');
    this._svg = this._container.querySelector('#morph-svg');
    this._setSVGAttributes();
    if(this._pathList && this._pathList[0]) {
      this._drawFirstPath();
      await this._alignPaths();
      this._setAnimation(); 

    }
    return Promise.resolve();
  }

  //*************************
  //* Rendering JSX Element *
  //*************************

  render() {
    let toRender: any[] = [];
    if(this.isSVG) {
      toRender = [...toRender,
          <div id="morph-container">
            <div id="morph-svg-container">
              <svg id="morph-svg" width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                  <path id="initPath">
                    <animate id="animPath" begin="initPath.click"/>
                    { this._fillColor.length > 1 && !this._uniqueColor
                    ? <animate id="animFill" begin="animPath.begin"/>
                    : null}
                  </path>
              </svg>
            </div>
          </div>
      ];
    } else {
      toRender = [...toRender,
        <div id="fake-container">
        </div> 
      ]
    }
    return (
      <Host>{toRender}</Host>  
    );
  }
}
