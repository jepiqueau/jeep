import { EventEmitter } from '../../../stencil.core';
import { Color } from '../../../global/interfaces/color';
import { StateProperties, BoundingBoxes, CloseData } from '../../../global/interfaces/jeep-colorpicker';
export declare class JeepCpicker {
    el: HTMLJeepCpickerElement;
    /**
     * The preselected color
     */
    color: string;
    /**
     * The preselected opacity
     */
    opacity: string;
    /**
     * The buttons text
     */
    buttons: string;
    /**
     * Validation buttons hidden
     */
    hidebuttons: boolean;
    /**
     * Header hidden
     */
    hideheader: boolean;
    /**
     * Opacity Slider hidden
     */
    hideopacity: boolean;
    parseColorProp(newValue: string): Promise<void>;
    parseOpacityProp(newValue: string): Promise<void>;
    parseButtonsProp(newValue: string): Promise<void>;
    parseHideButtonsProp(newValue: boolean): Promise<void>;
    parseHideHeaderProp(newValue: boolean): Promise<void>;
    parseHideOpacityProp(newValue: boolean): Promise<void>;
    innerColor: string;
    innerOpacity: number;
    innerButtons: string[];
    innerHideButtons: boolean;
    innerHideHeader: boolean;
    innerHideOpacity: boolean;
    toggleDisplay: boolean;
    onOpen: EventEmitter;
    onClose: EventEmitter<CloseData>;
    onInstantColor: EventEmitter<Color>;
    handleWindowResize(): Promise<void>;
    /**
     * Method initialize
     */
    init(): Promise<void>;
    /**
     * Method get StateProperties
     */
    getStateProperties(): Promise<StateProperties>;
    /**
     * Method get local wrapper css variables
     */
    getWrapperCssVariables(): Promise<any>;
    /**
     * Method get the vertical position for the hue slider handler
     */
    calcH(y: number, height: number): Promise<number>;
    /**
     * Method get the horizontal position for the saturation slider handler
     */
    calcS(x: number, width: number): Promise<number>;
    /**
     * Method get the vertical position for the brightness slider handler
     */
    calcB(y: number, height: number): Promise<number>;
    /**
     * Method get the vertical position for the opacity slider handler
     */
    calcO(y: number, height: number): Promise<number>;
    _stateProperties: StateProperties;
    _textType: Array<string>;
    _wrapCss: any;
    _wrapperSize: any;
    _pickX: number;
    _pickWidth: number;
    _sliderWidth: number;
    _sliderX1: number;
    _sliderX2: number;
    _sliderY1: number;
    _sliderHeight: number;
    _textHeight: number;
    _wrapperEl: HTMLDivElement;
    _circleEl: SVGCircleElement;
    _pickEl: SVGRectElement;
    _pickHueEl: SVGRectElement;
    _pickHueSliderHandleEl: SVGRectElement;
    _pickOpaEl: SVGRectElement;
    _pickOpaSliderHandleEl: SVGRectElement;
    _headlineEl: SVGRectElement;
    _okEl: SVGRectElement;
    _cancelEl: SVGRectElement;
    _bboxes: BoundingBoxes;
    _mouseStart: boolean;
    _timeout: any;
    _resize: boolean;
    _onElement: string;
    _oriColor: Color;
    componentWillLoad(): Promise<void>;
    componentDidLoad(): Promise<void>;
    componentDidUpdate(): Promise<void>;
    private _init;
    private _setCssVariable;
    private _setSelected;
    private _setBoundingBoxes;
    private _windowResize;
    private _setTextColor;
    private _toggleTextType;
    private _okColorPickerHandler;
    private _cancelColorPickerHandler;
    private _pickColor;
    private _pickHue;
    private _pickOpacity;
    private _getPickCoordinates;
    private _updateStateProperties;
    private _calcH;
    private _calcS;
    private _calcB;
    private _calcO;
    private _selectAction;
    private _getOnElement;
    private _movePoint;
    private _handleMouseDown;
    private _handleMouseMove;
    private _handleMouseEnd;
    private _handleTouchStart;
    private _handleTouchMove;
    private _handleTouchEnd;
    render(): any;
}
