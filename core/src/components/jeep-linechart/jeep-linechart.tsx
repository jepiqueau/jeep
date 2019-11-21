import { h, Component, Host, Prop, Method, Element, State, Watch } from '@stencil/core';
import { Rect, Point } from '../../global/interfaces/geom';
import { Variables, Status, SVGOptions, DataSet, AxisLength, Legend, Anim, NearestPoint }  from '../../global/interfaces/jeep-linechart';
import { debounce, getDim, convertCSSNumber, convertCSSBoolean, getCssPropertyFromString }  from '../../utils/common';
import { windowSize } from '../../utils/windowutils';
import { createSVGElement, createMarker, createText, updateText, textScale,
    createLine, updateLine, axisRange, axisConvertY, measureLegend, createLegendLines,
    removeChilds, axisConvertX, createPolyline, updatePolyline, createAnimation,
    getTotalLength, createLineLabel, getNearest} from '../../utils/chart-svgelements';
import { getBoundingClientRect } from '../../utils/common';
  


@Component({
    tag: 'jeep-linechart',
    styleUrl: 'jeep-linechart.css',
    shadow: true
  })
  export class JeepLinechart {
    @Element() el!: HTMLJeepLinechartElement;

  //************************
  //* Property Definitions *
  //************************

    @Prop({
      reflectToAttr: true
    }) ctitle: string;
    @Prop({
      reflectToAttr: true
    }) subtitle: string;
    @Prop({
      reflectToAttr: true
    }) xtitle: string;
    @Prop({
      reflectToAttr: true
    }) ytitle: string;
    @Prop({
      reflectToAttr: true
    }) data: string;
    @Prop({
      reflectToAttr: true
    }) cstyle: string;
    @Prop({
      reflectToAttr: true
    }) animation: boolean;
    @Prop({
      reflectToAttr: true
    }) cborder: boolean;
    @Prop({
      reflectToAttr: true
    }) delay: string;

  //*****************************
  //* Watch on Property Changes *
  //*****************************

  @Watch('ctitle')
  parseTitleProp(newValue: string) {
    this.innerTitle = newValue ? newValue : null;
  }
  @Watch('subtitle')
  parseSubTitleProp(newValue: string) {
    this.innerSubTitle = newValue ? newValue : null;
  }
  @Watch('xtitle')
  parseXTitleProp(newValue: string) {
    this.innerXTitle = newValue ? newValue : null;
  }
  @Watch('ytitle')
  parseYTitleProp(newValue: string) {
    this.innerYTitle = newValue ? newValue : null;
  }
  @Watch('data')
  parseDataProp(newValue: string) {
    const data = newValue ? newValue : null;
    let dataSets: Array<DataSet> = []; 
    let status: Status = {status:200};
    if(data != null) {
      let inpData = JSON.parse(data);
      let objData: Array<DataSet> = [];
      if(inpData instanceof Array) {
        objData = inpData;
      } else {
        objData.push(inpData);
      }
      this._axisType = [];
      this._legendNames = [];
      this._legendColors = [];
      this._legendThicknesses = [];
      if(objData.length >= 1 && Object.keys(objData[0]).length >=1) {
        for(let i: number = 0; i < objData.length;i++) {
          if(objData[i].dataPoints) {
            let dataSet: DataSet = {} as DataSet;
            dataSet.color = objData[i].color ? objData[i].color : "#000000";
            dataSet.name = objData[i].name ? objData[i].name : null;  
            dataSet.lineThickness = objData[i].lineThickness ? objData[i].lineThickness: 1;
            dataSet.markerType = objData[i].markerType ? objData[i].markerType : "none";
            dataSet.markerColor = objData[i].markerColor ? objData[i].markerColor : dataSet.color;
            dataSet.markerSize = objData[i].markerSize ? objData[i].markerSize : 10;
            dataSet.dataPoints = objData[i].dataPoints;
            this._legendThicknesses.push(dataSet.lineThickness);
            this._legendColors.push(dataSet.color);
            if(dataSet.name !== null) this._legendNames.push(dataSet.name);
            if(!dataSet.dataPoints[0].x){
              dataSets = null;
              status = {status:400, message:"Error: no x data in dataset: " + i + " of data property" }            
            } else if(!dataSet.dataPoints[0].y){
                dataSets = null;
                status = {status:400, message:"Error: no y data in dataset: " + i + " of data property" }            
            } else {
              if(i === 0) {
                if(dataSet.dataPoints[0].x) this._axisType.push("x"); 
                if(dataSet.dataPoints[0].y) this._axisType.push("y"); 
              }     
              dataSets.push(dataSet);  
            }
          } else {
            dataSets = null;
            status = {status:400, message:"Error: no dataPoints object in dataset: " + i + " of data property" }            
          }
        }
        if(status.status === 200 && dataSets && dataSets.length > 1 && dataSets.length !== this._legendNames.length) {
          dataSets = null;
          status = {status:400, message:"Error: name attribute missing in some datasets"};
        } 
      } else { 
        dataSets = null;
        status = {status:400, message:"Error: no data provided"}      
      }
    } else {
      dataSets = null;
      status = {status:400, message:"Error: no data property"}      
    }
    this.status = status; 
    this.innerData = this.status.status === 200 ? [...dataSets] : null;

  }
  @Watch('cstyle')
  parseStyleProp(newValue: string) {
    this.innerStyle = newValue ? newValue : null;
  }
  @Watch('animation')
  parseAnimationProp(newValue: boolean) {
    this.innerAnimation = newValue ? newValue : false;
  }
  @Watch('cborder')
  parseBorderProp(newValue: boolean) {
    this.innerBorder = newValue ? newValue : false;
  }
  @Watch('delay')
  parseDelayProp(newValue: string) {
    this.innerDelay = newValue ? parseFloat(newValue) : 100;
  }

  //************************
  //* State Definitions *
  //************************

  @State() innerTitle:string;
  @State() innerSubTitle: string;
  @State() innerXTitle:string;
  @State() innerYTitle:string;
  @State() innerData:Array<DataSet>;
  @State() innerStyle: string;
  @State() innerAnimation: boolean;
  @State() innerBorder: boolean;
  @State() innerDelay: number;
  @State() status: Status;
  @State() w_width: number;
  @State() w_height: number;
  @State() toggle: boolean = false;

  //**********************
  //* Method Definitions *
  //**********************
  
  @Method()
  init(): Promise<void> {
      return Promise.resolve(this._init());
  }
  @Method()
  getStatus(): Promise<Status> {
    return Promise.resolve(this.status);
  }
  @Method()
  renderChart(): Promise<void> {
  return Promise.resolve(this._renderChart());
  }
  @Method()
  async getWindowSize() {
  return windowSize(this.window);
  }
  @Method()
  async getCssProperties():Promise<Variables> {
    return this._prop;
  }

  //**********************************
  //* Internal Variables Declaration *
  //**********************************

    container: HTMLElement;
    svg: HTMLElement;
    chart: HTMLElement;
    borderEl: HTMLElement;
    borderBB: ClientRect;
    window: Window | any;
    document: Document | any;
    root:Element | any;
  
    _element: any;
    _prop: Variables
    _wSize: Rect;
    _chartRect: Rect;
    _titleRect:Rect;
    _update: boolean = false;
    _Points: Array<Array<Point>>;
    _selMarker: Array<string>;
    _axisType: Array<string>;
    _legendRect: Rect;
    _legendNames: Array<string>;
    _legendColors: Array<string>;
    _legendThicknesses: Array<number>;
    _dataColor: boolean;
    _label: boolean;
    _labelRotate: boolean;
    _x_axy:number;
    _y_axy:number;
    _lenY:AxisLength;
    _lenX:AxisLength;
    _nXlines: number;
    _nYlines: number;
    _xInterval: number;
    _yaxis:Rect;
    _xaxis:Rect;
    _showTarget: any;
    _xmlns: string;
    _xlink: string;
    _mouseStart: boolean;
      
  //*******************************
  //* Component Lifecycle Methods *
  //*******************************

    async componentWillLoad() {
    this.window = window;
    this._prop = {} as Variables;
    await this._init();
    }
    componentDidLoad() {
        this._element = this.el.shadowRoot;
        if(this.status.status === 200){
            this._renderChart();
        }        
    }

  //******************************
  //* Private Method Definitions *
  //******************************

    async _init(): Promise<void> {
        // init some variables
        this.document = this.window.document;
        this.root = this.document.documentElement;
        this.window.addEventListener('resize',debounce(this,this._windowResize,100,false),false);
        this._selMarker = [];
        this._axisType = [];
        this._legendRect = {} as Rect;
        this._update = false;
        this._dataColor = false;
        this._yaxis = {} as Rect;
        this._xaxis = {} as Rect;
        this._legendRect = {} as Rect;
        let filteredAxisX: Array<string> = [];
        filteredAxisX = this._axisType.filter(element => element === "label") as Array<string>   
        this._label = false;
        if(filteredAxisX[0]=== "label") {
          this._label = true;
        }
        this._showTarget = 0;
        this._mouseStart = false;
        this._xmlns = "http://www.w3.org/2000/svg";
        this._xlink = 'http://www.w3.org/1999/xlink';            

        // reading properties
        this.parseTitleProp(this.ctitle ? this.ctitle : null);
        this.parseSubTitleProp(this.subtitle ? this.subtitle : null);
        this.parseXTitleProp(this.xtitle ? this.xtitle : null);
        this.parseYTitleProp(this.ytitle ? this.ytitle : null);
        this.parseAnimationProp(this.animation ? this.animation : false);
        this.parseBorderProp(this.cborder ? this.cborder : false);
        this.parseStyleProp(this.cstyle ? this.cstyle : null);
        this.parseDelayProp(this.delay ? this.delay : "100");
        // reading global css properties
        this._prop.topPlot = this._prop.topPlot ? this._prop.topPlot : this._setPropertyValue('--chart-top',this.window.getComputedStyle(this.root).getPropertyValue('--chart-top'));
        this._prop.leftPlot = this._prop.leftPlot ? this._prop.leftPlot : this._setPropertyValue('--chart-left',this.window.getComputedStyle(this.root).getPropertyValue('--chart-left'));
        this._prop.widthPlot = this._prop.widthPlot ? this._prop.widthPlot : this._setPropertyValue('--chart-width',this.window.getComputedStyle(this.root).getPropertyValue('--chart-width'));
        this._prop.heightPlot = this._prop.heightPlot ? this._prop.heightPlot : this._setPropertyValue('--chart-height',this.window.getComputedStyle(this.root).getPropertyValue('--chart-height'));
        this._prop.bgColor = this._prop.bgColor ? this._prop.bgColor : this._setPropertyValue('--chart-background-color',this.window.getComputedStyle(this.root).getPropertyValue('--chart-background-color'));
        this._prop.tiColor = this._setPropertyValue('--chart-title-color',this.window.getComputedStyle(this.root).getPropertyValue('--chart-title-color'));
        this._prop.stColor = this._setPropertyValue('--chart-subtitle-color',this.window.getComputedStyle(this.root).getPropertyValue('--chart-subtitle-color'));
        this._prop.ftFamily = this._setPropertyValue('--chart-font-family',this.window.getComputedStyle(this.root).getPropertyValue('--chart-font-family'));
        this._prop.ftTiSize = this._setPropertyValue('--chart-title-font-size',this.window.getComputedStyle(this.root).getPropertyValue('--chart-title-font-size'));
        this._prop.ftSTSize = this._setPropertyValue('--chart-subtitle-font-size',this.window.getComputedStyle(this.root).getPropertyValue('--chart-subtitle-font-size'));
        this._prop.axColor = this._setPropertyValue('--chart-axis-color',this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-color'));
        this._prop.lnColor = this._setPropertyValue('--chart-line-color',this.window.getComputedStyle(this.root).getPropertyValue('--chart-line-color'));
        this._prop.atColor = this._setPropertyValue('--chart-axis-title-color',this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-title-color'));
        this._prop.lbColor = this._setPropertyValue('--chart-label-color',this.window.getComputedStyle(this.root).getPropertyValue('--chart-label-color'));
        this._prop.ftLbSize = this._setPropertyValue('--chart-label-font-size',this.window.getComputedStyle(this.root).getPropertyValue('--chart-label-font-size'));
        this._prop.ftATSize = this._setPropertyValue('--chart-axis-title-font-size',this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-title-font-size'));
        this._prop.ftSTSize = this._setPropertyValue('--chart-subtitle-font-size',this.window.getComputedStyle(this.root).getPropertyValue('--chart-subtitle-font-size'));
        this._prop.tickX = this._setPropertyValue('--chart-tick-x-length',this.window.getComputedStyle(this.root).getPropertyValue('--chart-tick-x-length'));
        this._prop.tickY = this._setPropertyValue('--chart-tick-y-length',this.window.getComputedStyle(this.root).getPropertyValue('--chart-tick-y-length'));
        this._prop.gridX = this._setPropertyValue('--chart-grid-x',this.window.getComputedStyle(this.root).getPropertyValue('--chart-grid-x'));
        this._prop.xInterval = this._setPropertyValue('--chart-axis-x-interval',this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-x-interval'));
        this._prop.yInterval = this._setPropertyValue('--chart-axis-y-interval',this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-y-interval'));
        this._prop.xZero = this._setPropertyValue('--chart-axis-x-zero',this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-x-zero'));
        this._prop.yZero = this._setPropertyValue('--chart-axis-y-zero',this.window.getComputedStyle(this.root).getPropertyValue('--chart-axis-y-zero'));
        this._prop.animDuration = this._setPropertyValue('--chart-animation-duration',this.window.getComputedStyle(this.root).getPropertyValue('--chart-animation-duration'));
        this._prop.legendTop = this._setPropertyValue('--chart-legend-top',this.window.getComputedStyle(this.root).getPropertyValue('--chart-legend-top'));
        this._prop.ftLgSize = this._setPropertyValue('--chart-legend-font-size',this.window.getComputedStyle(this.root).getPropertyValue('--chart-legend-font-size'));
        this._prop.bdColor = this._setPropertyValue('--chart-border-color',this.window.getComputedStyle(this.root).getPropertyValue('--chart-border-color'));
        this._prop.bdWidth = this._setPropertyValue('--chart-border-width',this.window.getComputedStyle(this.root).getPropertyValue('--chart-border-width'));
        // reading instance css properties if any
        if(this.innerStyle !=null) {
          const propInstance:any = await getCssPropertyFromString(this.innerStyle);
          if(propInstance != null) {
            this._prop.leftPlot =  propInstance.left ? propInstance.left : this._prop.leftPlot;           
            this._prop.topPlot =  propInstance.top ? propInstance.top : this._prop.topPlot;          
            this._prop.widthPlot =  propInstance.width ? propInstance.width : this._prop.widthPlot;           
            this._prop.heightPlot =  propInstance.height ? propInstance.height : this._prop.heightPlot;
            this._prop.bgColor = propInstance.backgroundcolor ? propInstance.backgroundcolor : this._prop.bgColor;       
          }
        } 
        // reading data          
        this.parseDataProp(this.data ? this.data : null);
        // get window size and set the container size
        this._wSize = await this.getWindowSize();
        this._setContainerSize();
    }
    _setContainerSize() {
        this.w_width = getDim(this._prop.widthPlot,this._wSize.width,"0");
        this.w_height = getDim(this._prop.heightPlot,this._wSize.height,"0");
    
        this.el.style.setProperty('--top',this._prop.topPlot);    
        this.el.style.setProperty('--left',this._prop.leftPlot);    
        this.el.style.setProperty('--width',`${this.w_width}px`);    
        this.el.style.setProperty('--height',`${this.w_height}px`); 
        this.el.style.setProperty('--backgroundcolor',`${this._prop.bgColor}`); 
        this._titleRect = null;
        this._chartRect = {top:0, left:0, width: this.w_width, height: this.w_height};
    
    }
    _setPropertyValue(name:string, value?:string): string {
        if(name === '--chart-background-color') {
          return value ? value : "#ffffff";
        } else if ( name.slice(-5) === 'color') {
          return value ? value : "#000000";
        } else if ( name.slice(-12) === 'border-width') {
          return value ? value : "1";
        } else if ( name.slice(-9) === 'font-size') {
          return value ? value : "10px";
        } else if ( name.slice(-11) === 'font-family') {
          return value ? value : "Verdana";     
        } else if ( name.slice(-6).substring(0,4) === 'grid') {
          return value ? value : "false";     
        } else if ( name.slice(-4) === 'zero') {
          return value ? value : "true";
        } else if ( name.slice(-10) === 'legend-top') {
          return value ? value : "false";     
        } else if ( name.slice(-8) === 'duration') {
          return value ? value : "1s";
        } else {
          return value ? value : "0";
        }      
    }
    async _windowResize(): Promise<void> {
        this._wSize = await this.getWindowSize();
        this._setContainerSize();
        this._update = true;
        if(this.status && this.status.status === 200){
          this._renderChart();
        }
        return;
    }
    
    /* ---- Deal with Chart SVG Elements  */

    _createMarkers(): void {
        let defs: Element = createSVGElement('defs',this.svg);
        let opt:SVGOptions = {} as SVGOptions;
        opt.id = "marker-circle";
        opt.viewbox = "0 0 10 10";
        // markerType Circle size 10x10
        let d:string = "M0,5 A5,5 0 1,1 10,5 A5,5 0 0,1 0,5 Z";
        createMarker(defs,d,opt);
        // markerType Square size 10x10
        opt.id = "marker-square";
        d= "M0,0 L10,0 L10,10 L0,10 Z";
        createMarker(defs,d,opt);
        // markerType Triangle size 10x10
        opt.id = "marker-triangle";
        d= "M5,0 L10,10 L0,10 Z";
        createMarker(defs,d,opt);
        // markerType Cross size 10x10
        opt.id = "marker-cross";
        d= "M0,2 L2,0 L5,3 L8,0 L10,2 L7,5 L10,8 L8,10 L5,7 L2,10 L0,8 L3,5 Z";
        createMarker(defs,d,opt);
        // markerType Plus size 10x10
        opt.id = "marker-plus";
        d = "M0,4 L4,4 L4,0 L6,0 L6,4 L10,4 L10,6 L6,6 L6,10 L4,10 L4,6 L0,6 Z";
        createMarker(defs,d,opt);
    }   
    _createTitle(): void {
        if(this.innerTitle != null) {
          let g: Element;
          let textEl:Element;
          if(!this._update) {
            g = createSVGElement('g',this.svg);;
            g.setAttributeNS (null, "id", "linechart-title");
          } else {
            g = this.svg.querySelector("#linechart-title");
            g.removeAttributeNS(null,'transform');
          } 
          let opt:SVGOptions = {
            id: "linechart-title-text",
            fontFamily: this._prop.ftFamily,
            fontSize: this._prop.ftTiSize,
            fill: this._prop.tiColor,
            anchor: "middle"
          };
          // x centered y padding 10px
          let pos:Point = {x:Math.round(this.w_width/2),y:convertCSSNumber(this._prop.ftTiSize)+10};
          if(!this._update) {
            textEl = createText(g,this.innerTitle,pos,opt);
          } else {
            textEl = updateText(this.svg,opt.id,opt.anchor,pos);
          }
          if(this.innerSubTitle != null) {
            const bb: ClientRect = textEl.getBoundingClientRect();
            opt.id = "linechart-subtitle-text";
            opt.fontSize = this._prop.ftSTSize;
            opt.fill = this._prop.stColor;
            let y:number = Math.ceil(bb.bottom - this.borderBB.top) + 5;
            pos = {x:Math.round(this.w_width/2),y:y+10};
            if(!this._update) {
              createText(g,this.innerSubTitle,pos,opt);
            } else {
              updateText(this.svg,opt.id,opt.anchor,pos);
            }
          }
          const sbb: ClientRect = g.getBoundingClientRect();
          let scale: number = textScale(sbb.width,this.w_width,10);
          let transf: string = 'translate('+ Math.round(10-sbb.left*scale)+',0) '+'scale('+scale+','+scale+')';
          if( scale != 1) g.setAttributeNS(null,"transform",transf)
          const sbbt: ClientRect = g.getBoundingClientRect();
          this._titleRect = {left: sbbt.left-this.borderBB.left, top: sbbt.top - this.borderBB.top, width: sbbt.width, height:sbbt.height};
        }
    }
    _createAxis(): void {
        let tickXL: number = convertCSSNumber(this._prop.tickX);
        let tickYL: number = convertCSSNumber(this._prop.tickY);
        let intervalX: number  = parseFloat(this._prop.xInterval);
        let intervalY: number  = parseFloat(this._prop.yInterval);
        let g : Element;
        if(!this._update) {   
          g = createSVGElement('g',this.svg);;
          g.setAttributeNS (this._xmlns, "id", "linechart-axes");
        } else {
          g = this.svg.querySelector("#linechart-axes");
        } 
        this._initChartRect();
        if(this.innerData.length > 1) this._createLegend();
        let gTY: Element = this._createTitleY();
        let gTX: Element = this._createTitleX();
        // find the axes range
        this._lenY = axisRange(this.innerData,"y",intervalY,convertCSSBoolean(this._prop.yZero));
        if(this._label) {
          this._lenX = axisRange(this.innerData,"label",intervalX);
        } else {
          this._lenX = axisRange(this.innerData,"x",intervalX,convertCSSBoolean(this._prop.xZero));
        }
        // calculate the label sizes
        let labelYSize: any = this._labelSize(this._lenY, 0);
        this._x_axy =  3 + labelYSize.width + 2 + tickYL;
        this._nXlines = this.innerData[0].dataPoints.length;
        if(this._lenX.interval && this._lenX.type === 'number') {
          this._nXlines = Math.abs(Math.floor(this._lenX.length / this._lenX.interval)) + 1;
        }
        let xLength:number = this._chartRect.width - this._x_axy;
        this._xInterval = Math.floor(xLength/this._nXlines);
        if(this._lenX.interval && this._lenX.type === 'number') {   
             this._xInterval = xLength/(this._nXlines-1);
        }
        let lbldist:number = this._xInterval;
        if(this._lenX.interval && this._lenX.type === 'string') {
          this._nXlines = Math.abs(Math.floor(this.innerData[0].dataPoints.length / this._lenX.interval));
          lbldist = xLength/(this._nXlines);
        }
        this._labelRotate = false;
        let labelXSize: any = this._labelSize(this._lenX, 0);
        if(labelXSize.width > lbldist - 10) {
          labelXSize= this._labelSize(this._lenX, -80);
          this._labelRotate = true;
        }
        this._y_axy = 10 + labelXSize.height + 3 + tickXL;
    
        // Y axis
        this._yaxis = {} as Rect; 
        this._yaxis.left = this._chartRect.left + this._x_axy;
        this._yaxis.width = 0;
        this._yaxis.top = this._chartRect.top;
        this._yaxis.height = this._chartRect.height - this._y_axy;
        let opt:SVGOptions = {
          id: "linechart-yaxis",
          stroke: this._prop.axColor,
          strokeWidth: "1"
        };
        let posy1:Point = {x: this._yaxis.left, y:this._yaxis.top};
        let posy2:Point = {x: this._yaxis.left + this._yaxis.width, y:this._yaxis.top + this._yaxis.height};
        if(!this._update) {
          createLine(g,posy1,posy2,opt);    
        } else {
          updateLine(this.svg,opt.id,posy1,posy2);          
        }
        // center the y Axis Title
        if(gTY != null) {
          let transf: string = 'translate(0,0)';
          gTY.setAttributeNS(null,"transform",transf);    
          let titleBB: ClientRect = gTY.getBoundingClientRect();
          let trans : number = - Math.round(titleBB.top - this.borderBB.top + titleBB.height / 2 - (this._yaxis.top + this._yaxis.height / 2));
          transf = 'translate(0,'+ trans +')';
          gTY.setAttributeNS(null,"transform",transf);              
        }
        let optLabel:SVGOptions = {
          id: "linechart-ylabel0",
          stroke: this._prop.lbColor,
          strokeWidth: "1",
          fontFamily: this._prop.ftFamily,
          fontSize: this._prop.ftLbSize,
          anchor: "end"
        };
        let yft:number = Math.floor(parseFloat(this._prop.ftLbSize.split('px')[0])/2) - 2; // correction 2px 
        // Y grid lines
        this._nYlines = Math.abs(Math.floor(this._lenY.length / this._lenY.interval)) + 1;
        for (let i: number =0; i<this._nYlines; i++) {
          let s:number = this._lenY.top - i * Math.abs(this._lenY.interval);
          opt.id = "linechart-yLine"+s.toString();
          opt.stroke = this._prop.lnColor;
          if(i === this._nYlines - 1 ) {
            opt.id = "linechart-xaxis";
            opt.stroke = this._prop.axColor;
          }
          optLabel.id = "linechart-ylabel"+s.toString();
          let y: number = axisConvertY(this._yaxis,this._lenY,s);
          let posxl1:Point = {x: this._yaxis.left, y:y};
          let posxl2:Point = {x: this._chartRect.left + this._chartRect.width , y:y}   
          if(!this._update) {
            createLine(g,posxl1,posxl2,opt);
          } else {
            updateLine(this.svg,opt.id,posxl1,posxl2);          
          }
          // tick
          if(tickYL > 0) {
            let postk:Point = {x: this._yaxis.left - tickYL, y: y}   
            opt.id = "linechart-ytick"+s.toString();
            if(!this._update) {
              createLine(g,posxl1,postk,opt);
            } else {
              updateLine(this.svg,opt.id,posxl1,postk);          
            }
          }
          // label
          let pos:Point = {x: this._yaxis.left - tickYL - 2, y: y + yft};
          if(!this._update) {
            createText(g,s.toString(),pos,optLabel);
          } else {
            updateText(this.svg,optLabel.id,optLabel.anchor,pos);
          }
        }
    
        // X Grid Lines
        let xAxisEl = this.svg.querySelector("#linechart-xaxis");
        let y:number = parseFloat(xAxisEl.getAttribute("y1"));
        let x: number = Math.floor(this._xInterval / 2);
        if(this._lenX.interval && this._lenX.type === 'number') x = 0;
        optLabel = {
          id: "linechart-xlabel",
          stroke: this._prop.lbColor,
          strokeWidth: "1",
          fontFamily: this._prop.ftFamily,
          fontSize: this._prop.ftLbSize,
          anchor: "middle"
        };
        yft = Math.floor(convertCSSNumber(this._prop.ftLbSize));   
        for (let i: number =0; i<this._nXlines; i++) {
          let s:number = this._lenX.bottom + i * Math.abs(this._lenX.interval);
          let posx1:Point = {x: this._yaxis.left + x, y: y} 
          // GridX Line
          if(convertCSSBoolean(this._prop.gridX)) {
            opt.id = "linechart-xLine"+i.toString();
            if(this._lenX.interval && this._lenX.type === 'number') {
              opt.id = "linechart-xLine"+s.toString();            
            }
            if(this._lenX.interval && this._lenX.type === 'string') {
              opt.id = "linechart-xLine"+(i*this._lenX.interval).toString();            
            }
            opt.stroke = this._prop.lnColor;
            let posx2:Point  = {x: this._yaxis.left + x, y: this._yaxis.top} 
            if(!this._lenX.interval || i >= 1 || this._lenX.type != 'number') {   
              if(!this._update) {
                createLine(g,posx1,posx2,opt);
              } else {
                updateLine(this.svg,opt.id,posx1,posx2);          
              }
            }
          }
          // tick
          if(tickXL > 0) {
            let postk:Point = {x: this._yaxis.left + x, y: y + tickXL} 
            opt.id = "linechart-xtick"+i.toString();
            if(this._lenX.interval && this._lenX.type === 'number') {
              opt.id = "linechart-xtick"+s.toString();
            }
            if(this._lenX.interval && this._lenX.type === 'string') {
              opt.id = "linechart-xtick"+(i*this._lenX.interval).toString();            
            }
            if(!this._update) {
              createLine(g,posx1,postk,opt);
            } else {
              updateLine(this.svg,opt.id,posx1,postk);          
            }
          }
          // label
          let labx: string;
          if(this._lenX.type === 'string') {
            let x_inter: number = typeof this._lenX.interval != "undefined" ? this._lenX.interval : 1;
            labx = this.innerData[0].dataPoints[i * x_inter].x;
          } else {
            labx = s.toString();
          }        
          optLabel.id = "linechart-xlabel"+labx;
          let labelEl:Element;
          let pos:Point;
          let transr: string = null;
          if (this._labelRotate) {
            optLabel.anchor = 'end';
            pos = {x: this._yaxis.left + x, y: y + tickXL + 3};
            transr = 'rotate(-80,'+pos.x+','+pos.y+')';                           
          } else {
            optLabel.anchor = 'middle';
            pos = {x: this._yaxis.left + x, y: y + tickXL+ yft};
            transr = 'rotate(0,'+pos.x+','+pos.y+')';                           
          }     
          if(!this._update) {
            labelEl = createText(g,labx,pos,optLabel);
          } else {
            labelEl = updateText(this.svg,optLabel.id,optLabel.anchor,pos);
          }
          if( transr != null) labelEl.setAttributeNS(null,"transform",transr);
          if(this._lenX.interval && this._lenX.type === 'string') {
            x += this._xInterval * this._lenX.interval;
          } else {
            x += this._xInterval;
          }
        }      
        if(gTX != null) {
        let transf: string = 'translate(0,0)';
          gTX.setAttributeNS(null,"transform",transf);    
          let axisBB: ClientRect = xAxisEl.getBoundingClientRect();
          let titleBB: ClientRect = gTX.getBoundingClientRect();
          let trans: number = - Math.round(titleBB.left + titleBB.width / 2 - (axisBB.left + axisBB.width / 2));
          if (Math.abs(trans) > 0) {
            let transf: string = 'translate('+ trans +',0)';
            gTX.setAttributeNS(null,"transform",transf)
          } 
        }              
    }
    _labelSize(lenA:AxisLength, rot:number): any {
        let opt:SVGOptions = {
          fontFamily: this._prop.ftFamily,
          fontSize: this._prop.ftLbSize,
          fill: this._prop.lbColor,
          anchor: "start"
        };
        let max:string;
        if(lenA.label) {
          max = lenA.label;
        } else {
          max = lenA.top.toString();
          let min:string = lenA.bottom.toString();
          if(min.length > max.length) max = min;  
        }
        let y:number = 0;
        let x:number = 0;
        let pos:Point = {x:x,y:y};
        let textEl:Element = createText(this.svg,max,pos,opt);
        if(rot != 0) {
          let transf: string = 'rotate('+ rot +',0,0)';
          textEl.setAttributeNS(null,"transform",transf)               
        }
        let bb = textEl.getBoundingClientRect();
        this.svg.removeChild(textEl);
        return {width:Math.ceil(bb.width),height: Math.ceil(bb.height)}
      
    }
    _initChartRect(): void {    
        this._chartRect.top = 20; //20px below
        if( this._titleRect != null) this._chartRect.top += Math.round(this._titleRect.height); 
        this._chartRect.left = 0;
        this._chartRect.width = this.w_width - this._chartRect.left - 20; // 20px right
        this._chartRect.height = this.w_height - this._chartRect.top; // 20px bottom
    }
    _createLegend(): void {
        let g : Element;
        let rect:Rect = {} as Rect;
        let optLg: SVGOptions = {
          fontFamily: this._prop.ftFamily,
          fontSize: this._prop.ftLgSize,
          anchor: 'start',
        }
        let dLegend: Legend = measureLegend( this.svg,this.w_width,this._legendNames,this._legendColors,
              this._legendThicknesses,optLg);
        rect.left = dLegend.bBox.left;
        rect.width = dLegend.bBox.width;
        if(convertCSSBoolean(this._prop.legendTop)) {
          rect.top = this._chartRect.top + 15;
          this._chartRect.top += Math.ceil(dLegend.bBox.height) + 15;
        } else {
          rect.top = Math.floor(this._chartRect.top +this._chartRect.height - dLegend.bBox.height);
        }  
        rect.height = dLegend.bBox.height;
        this._chartRect.height -= Math.floor(dLegend.bBox.height) + 10;
        if(!this._update) {
          g = createSVGElement('g',this.svg);;
          g.setAttributeNS (null, "id", "linechart-legend");
          createLegendLines(g,this._legendNames,this._legendColors,this._legendThicknesses,dLegend,this.w_width,rect.top,optLg);
        } else {
          g = this.svg.querySelector("#linechart-legend");
          removeChilds(g);
          createLegendLines(g,this._legendNames,this._legendColors,this._legendThicknesses,dLegend,this.w_width,rect.top,optLg);
        } 
    }
    _createTitleY(): Element {
        let g : Element;
        let opt:SVGOptions = {
          id: "linechart-ytitle-text",
          fontFamily: this._prop.ftFamily,
          fontSize: this._prop.ftATSize,
          fill: this._prop.atColor,
          anchor: "middle"
        };
        if (this.innerYTitle != null) {
          let textEl:Element;
          if(!this._update) {
            g = createSVGElement('g',this.svg);;
            g.setAttributeNS (null, "id", "linechart-ytitle");
          } else {
            g = this.svg.querySelector("#linechart-ytitle");
          } 
          let y:number = this._chartRect.top + Math.round(this._chartRect.height / 2);
          let x:number = 5 + parseFloat(this._prop.ftATSize.split('px')[0]); 
          let pos:Point = {x:x,y:y};
          if(!this._update) {
            textEl = createText(g,this.innerYTitle,pos,opt);
           } else {
            textEl = updateText(this.svg,opt.id,opt.anchor,pos);
          }
          let transf: string = 'rotate(-90 ' + pos.x.toString() + ' ' + pos.y.toString() + ')';
          textEl.setAttributeNS(null,"transform",transf);
          let bb: ClientRect = g.getBoundingClientRect();
          this._chartRect.left = Math.ceil(bb.right - this.borderBB.left);
          this._chartRect.width -= Math.ceil(bb.right - this.borderBB.left);
          return g;
        } else {
          return null;
        } 
    }
    _createTitleX(): Element {
        let opt:SVGOptions = {
          id: "linechart-xtitle-text",
          fontFamily: this._prop.ftFamily,
          fontSize: this._prop.ftATSize,
          fill: this._prop.atColor,
          anchor: "middle"
        };
        if (this.innerXTitle != null) {
          let g : Element;
          if(!this._update) {
            g = createSVGElement('g',this.svg);;
            g.setAttributeNS (null, "id", "linechart-xtitle");
          } else {
            g = this.svg.querySelector("#linechart-xtitle");
          } 
          let y:number = this._chartRect.top + this._chartRect.height - 15;
          let x:number = Math.round(this._chartRect.left + this._chartRect.width / 2);
          let pos:Point = {x:x,y:y};
          if(!this._update) {
            createText(g,this.innerXTitle,pos,opt);
          } else {
            updateText(this.svg,opt.id,opt.anchor,pos);
          }
          let bb = g.getBoundingClientRect();
          this._chartRect.height -= Math.floor(bb.height);
          return g;
        } else {
          return null;
        }  
    }
    _createLine(): void {
        let g: Element;
        this._Points = [];
        if(!this._update) {   
          g = createSVGElement('g',this.svg)
          g.setAttributeNS (null, "id", "linechart-data");    
        } else {
          g = this.svg.querySelector("#linechart-data");
        }
        for(let l:number = 0; l<this.innerData.length; l++) {
          let viewPt: Array<Point> = []; 
          let opt:SVGOptions = {} as SVGOptions;
          opt.stroke = this.innerData[l].color;
          opt.strokeWidth = this.innerData[l].lineThickness.toString();
          opt.fill = 'none';
          opt.id = "linechart-data-"+l.toString();
          let points: string ;
          let plEl: Element;
          this._xaxis.left = this._yaxis.left;
          this._xaxis.width = this._chartRect.left + this._chartRect.width - this._xaxis.left; 
          let x: number = Math.floor(this._xInterval / 2);
          for (let i: number =0; i<this.innerData[l].dataPoints.length; i++) {
            opt.stroke = this.innerData[l].dataPoints[i].color ? this.innerData[l].dataPoints[i].color :this.innerData[l].color;
            let pt: Point = {} as Point;
            pt.y = axisConvertY(this._yaxis,this._lenY,this.innerData[l].dataPoints[i].y);
            if(this._lenX.interval && this._lenX.type === 'number') {
              pt.x = axisConvertX(this._xaxis,this._lenX,this.innerData[l].dataPoints[i].x);
            } else {
              pt.x = this._xaxis.left + x;
            }
            viewPt.push(pt);
            let scale = this.innerData[l].markerSize / 10;
            this._placeMarker("marker-"+this.innerData[l].markerType,g,pt,l,i,scale,this.innerData[l].markerColor)
            if (i === 0) {
              points = pt.x.toString()+','+pt.y.toString();
            } else {
              points += ' ' + pt.x.toString()+','+pt.y.toString();
            }
            x += this._xInterval;
          }
          opt.strokeLinejoin = 'round';
          opt.strokeLinecap = 'round';
          opt.strokeMiterlimit = '10';
          let length: number = getTotalLength(viewPt);
          if(!this._update) {
            plEl = createPolyline(g,points,opt);
          } else {
            plEl = updatePolyline(this.svg,opt.id,points);
          } 
          if(this.innerAnimation) {
            plEl.setAttributeNS (null, "stroke-dasharray", length.toString() + ',' + length.toString());
            plEl.setAttributeNS (null, "stroke-dashoffset", length.toString());
            this._setAnimation(plEl,length.toString(),this._prop.animDuration);
          }
        this._Points.push(viewPt);
        }
    }
    _setAnimation(el:Element,length:string,duration:string): void {
        let animOpt: Anim = {} as Anim;
        animOpt.attributeName="stroke-dashoffset";
        animOpt.from=length;
        animOpt.to="0";
        animOpt.dur=duration;
        animOpt.fill="freeze";
        createAnimation(el,animOpt);
    }
    _placeMarker(id:string,g:Element,pt:Point,line:number,index:number,scale:number,color:string): void {
        let use: Element;
        let symb: Element;
        if(!this._update){
          symb = createSVGElement('g',g);
          use = createSVGElement('use',symb);
        }  else  {
          symb = g.querySelector("#"+id+'-g-'+line.toString()+'-'+index.toString());
          use = symb.querySelector("#"+id+'-'+line.toString()+'-'+index.toString());
        }
        symb.setAttributeNS(null,'id',id+'-g-'+line.toString()+'-'+index.toString());
        symb.setAttribute('style','fill:'+color);
        use.setAttributeNS(this._xlink,"xlink:href","#"+id);
        use.setAttributeNS(null,'id',id+'-'+line.toString()+'-'+index.toString());
        use.setAttributeNS(null,'x',(pt.x - 5).toString());
        use.setAttributeNS(null,'y',(pt.y - 5).toString());
        use.setAttributeNS(null,'width',"10");
        use.setAttributeNS(null,'height',"10");
        this._scaleMarker(use,scale,pt);
    }
    _scaleMarker(use:Element,scale:number,pt:Point): void {
        let s: number = 1 - scale;
        let trans: Point = {} as Point;
        trans.x = s*pt.x;
        trans.y = s*pt.y;
        let transform: string = "translate("+trans.x.toString()+","+trans.y.toString()+") scale("+scale+")"
        use.setAttributeNS(null,'transform',transform);
    }
    _highlightMarker(marker:SVGElement,unhigh:boolean): void {
        let transform:string = marker.getAttributeNS(null,'transform');
        let pt:Point = {} as Point;
        pt.x =  parseFloat(marker.getAttributeNS(null,'x')) + 5;  // symbol 10px-10px
        pt.y =  parseFloat(marker.getAttributeNS(null,'y')) + 5;
        let curScale: number = 1.0;
        if(transform != null) {
          curScale = parseFloat(transform.split("scale(")[1].slice(0,-1));
        }
        if(unhigh) {
          this._scaleMarker(marker,curScale/1.5,pt);
        } else {
          this._scaleMarker(marker,curScale*1.5,pt);
        }
    }  
    _waitRemoveLabel(): void {
        if (this._mouseStart)
        {
            setTimeout( () => {
              this._removeLabel(this.svg);
              this._mouseStart = false;
              this._showTarget = 0;               
            },1200);
        }
    }
    _removeLabel(svg:Element): void {
        // remove label
        let gElems: NodeListOf<Element> = svg.querySelectorAll("#linechart-label-value");
        if( gElems.length > 0 ) {
          for(let i:number = 0; i < gElems.length; i++) {
            removeChilds(gElems[i]);
            svg.removeChild(gElems[i]);  
          }
        }
        // unhighlight marker
        if(this._selMarker.length > 0 ){
          for(let i:number = 0; i < this._selMarker.length; i++) {
            let marker : SVGElement = this.svg.querySelector(this._selMarker[i]);
            this._highlightMarker(marker, true);           
          }
        }
        this._selMarker = [];
    }
  /* ---- Deal with handling event  */
  _handleTouchDown(evt) {
    evt.preventDefault();
    this._mouseStart = true;
    let pt:Point = {x: evt.touches[0].pageX, y: evt.touches[0].pageY}
    this._handleEventTarget(evt, pt);
  }
  _handleMouseDown(evt) {
    evt.preventDefault();
    this._mouseStart = true;
    let pt:Point = {x: evt.pageX, y: evt.pageY}
    this._handleEventTarget(evt, pt);
  }
  _handleTouchUp(evt) {
    evt.preventDefault();
    this._waitRemoveLabel();
  }
  _handleMouseUp(evt) {
    evt.preventDefault();
    this._waitRemoveLabel();
  }

  _handleEventTarget(evt,pt:Point): void {
    this._showTarget = evt.target;
    // if a label exists remove it
    pt.x -= this.borderBB.left;
    pt.y -= this.borderBB.top;
    this._removeLabel(this.svg); 
    let nearestPoint: NearestPoint = getNearest(this._Points,pt);
    let data: any = this.innerData[nearestPoint.line].dataPoints[nearestPoint.index];
    let mName:string = "#marker-"+this.innerData[nearestPoint.line].markerType+'-';
    mName += nearestPoint.line.toString()+'-'+nearestPoint.index.toString();
    this._selMarker.push(mName);
    let marker : SVGElement = this.svg.querySelector(mName);
    this._highlightMarker(marker,false);
    let label: string;
    if(typeof data.x === 'number') label = data.x.toString();
    if(typeof data.x === 'string') label = data.x;
    label = label + " : " + data.y.toString();
    let ft:number = 1.2*parseFloat(this._prop.ftLbSize.split('px')[0]);
    let opt:SVGOptions = {
      fontFamily: this._prop.ftFamily,
      fontSize: ft.toString()+'px',
      fill: this._prop.lbColor,
      anchor: "middle"
    };
    let color:string = this.innerData[nearestPoint.line].color;
    createLineLabel(this.svg,label,nearestPoint,color,opt);

  }

  /* ---- Deal with rendering  */
                    
    async _renderChart() {
        this.container = this._element.querySelector('#div-linechart-container')
        this.chart = this._element.querySelector('#div-linechart-chart');
        this.svg = this._element.querySelector('#svg-linechart');
        this.borderEl = this.svg.querySelector('#svg-border-rect');    
        this.borderBB = await getBoundingClientRect(this.borderEl, this.innerDelay);
        if(this.borderBB.top != 0 || this.borderBB.left != 0 || this.borderBB.width != 0 || this.borderBB.height != 0) {
            this.container.addEventListener('touchstart',this._handleTouchDown.bind(this),false)
            this.container.addEventListener('touchend',this._handleTouchUp.bind(this),false)
            this.container.addEventListener('mousedown',this._handleMouseDown.bind(this),false)
            this.container.addEventListener('mouseup',this._handleMouseUp.bind(this),false)
            if(this.innerBorder) {
              this.borderEl.classList.remove('hidden');
            }
            this._createMarkers();
            if(this.innerTitle != null && this.innerTitle.length > 0) this._createTitle();
            this._createAxis();
            this._createLine();
        }
    }

  //*************************
  //* Rendering JSX Element *
  //*************************
    render () {
        if(this.status.status === 200) {
            let viewBox: string = `0 0 ${this.w_width.toString()} ${this.w_height.toString()}`
            return (
              <Host>
              <div id="div-linechart-container">
                <div id="div-linechart-chart">
                  <svg id="svg-linechart" width={this.w_width.toString()} height={this.w_height.toString()} viewBox={viewBox}>
                      <rect id="svg-border-rect" class="border-rect hidden" x="0" y="0" width={this.w_width.toString()} height={this.w_height.toString()} stroke={this._prop.bdColor} stroke-width={this._prop.bdWidth} fill="none" fill-opacity="0">
                      </rect>
                  </svg>
                </div>
              </div>
              </Host>
            )
        } else {
            return (
              <div id="div-error-message">
                <p id="p-error-message">{this.status.message}</p>
              </div>        
            )      
        }
    }
};  