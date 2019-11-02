import { EventEmitter } from '../../stencil.core';
import { Color } from '../../global/interfaces//color';
import { CloseData } from '../../global/interfaces/jeep-colorpicker';
export declare class JeepColorpicker {
    el: HTMLJeepColorpickerElement;
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
    parseColorProp(newValue: string): void;
    parseOpacityProp(newValue: string): void;
    parseButtonsProp(newValue: string): void;
    parseHideButtonsProp(newValue: boolean): void;
    parseHideHeaderProp(newValue: boolean): void;
    parseHideOpacityProp(newValue: boolean): void;
    innerColor: string;
    innerOpacity: string;
    innerButtons: string[];
    innerHideButtons: boolean;
    innerHideHeader: boolean;
    innerHideOpacity: boolean;
    show: boolean;
    getColor: EventEmitter<Color>;
    openCpicker: EventEmitter;
    closeCpicker: EventEmitter<CloseData>;
    openColorPickerHandler(): void;
    closeColorPickerHandler(event: CustomEvent): void;
    instantColorPickerHandler(event: CustomEvent): void;
    /**
     * Method initialize
     */
    init(): Promise<void>;
    /**
     * Method open the cpicker component
     */
    open(): Promise<void>;
    /**
     * Method close the cpicker component
     */
    close(color: Color, button: number): Promise<void>;
    _cpickerButtons: string;
    _color: Color;
    componentWillLoad(): Promise<void>;
    private _init;
    _handleClick(): Promise<void>;
    render(): any;
}
