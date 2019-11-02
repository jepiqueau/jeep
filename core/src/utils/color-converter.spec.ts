import {HEX, RGB, HSB, HSL, Color} from '../global/interfaces/color';
import { hextoHEX, hextoRGB, hextoHSB, hextoHSL, 
    RGBtoHSL, HSBtoRGB, RGBtoHEX, HSBtoHEX, HSLtoHEX, HSLtoRGB, HcolortoHEX, 
    opacityfromHEX, opacityfromRGB, opacityfromHSB, opacityfromHSL, 
    initSelectedColor, fillColor} from './color-converter';

describe('color-converter-utils', () => {

    describe('hextoHEX', () => {
        it('should return an HEX obj from an hex without opacity', () => {
            let hex: HEX = hextoHEX('#a3b4cf');
            expect(hex.hex).toEqual('#a3b4cf'); 
            expect(hex.hexa).toEqual('#a3b4cfff'); 
        });
        it('should return an HEX obj from an hex with opacity 0.5', () => {
            let hex: HEX = hextoHEX('#a3b4cf','0.5');
            expect(hex.hex).toEqual('#a3b4cf'); 
            expect(hex.hexa).toEqual('#a3b4cf80'); 
        });
        it('should return an HEX obj from an hex with opacity 0.01', () => {
            let hex: HEX = hextoHEX('#a3b4cf','0.01');
            expect(hex.hex).toEqual('#a3b4cf'); 
            expect(hex.hexa).toEqual('#a3b4cf03'); 
        });
    });
    describe('hextoRGB', () => {
        it('should return an RGB obj from an hex without opacity', () => {
            let rgb: RGB = hextoRGB('#a3b4cf');
            expect(rgb.r).toEqual(163); 
            expect(rgb.g).toEqual(180); 
            expect(rgb.b).toEqual(207); 
            expect(rgb.rgb).toEqual('RGB(163,180,207)'); 
            expect(rgb.rgba).toEqual('RGBA(163,180,207,1.000)'); 
        });
        it('should return an RGB obj from an hex with opacity', () => {
            let rgb: RGB = hextoRGB('#cc6645','0.769');
            expect(rgb.r).toEqual(204); 
            expect(rgb.g).toEqual(102); 
            expect(rgb.b).toEqual(69); 
            expect(rgb.rgb).toEqual('RGB(204,102,69)'); 
            expect(rgb.rgba).toEqual('RGBA(204,102,69,0.769)'); 
        });
    });
    describe('hextoHSB', () => {
        it('should return an HSB obj from an hex without opacity', () => {
            let hsb: HSB = hextoHSB('#8f8581');
            expect(Math.round(hsb.h)).toEqual(17); 
            expect(Math.round(hsb.s)).toEqual(10); 
            expect(Math.round(hsb.b)).toEqual(56); 
            expect(hsb.hsb).toEqual('HSB(17,10%,56%)'); 
            expect(hsb.hsba).toEqual('HSBA(17,10%,56%,1.000)'); 
        });
        it('should return an HSB obj from an hex with opacity', () => {
            let hsb: HSB = hextoHSB('#e76035','0.34');
            expect(Math.round(hsb.h)).toEqual(14); 
            expect(Math.round(hsb.s)).toEqual(77); 
            expect(Math.round(hsb.b)).toEqual(91); 
            expect(hsb.hsb).toEqual('HSB(14,77%,91%)'); 
            expect(hsb.hsba).toEqual('HSBA(14,77%,91%,0.340)'); 
        });
    });
    describe('hextoHSL', () => {
        it('should return an HSL obj from an hex without opacity', () => {
            let hsl: HSL = hextoHSL('#55cc45');
            expect(Math.round(hsl.h)).toEqual(113); 
            expect(Math.round(hsl.s)).toEqual(57); 
            expect(Math.round(hsl.l)).toEqual(54); 
            expect(hsl.hsl).toEqual('HSL(113,57%,54%)'); 
            expect(hsl.hsla).toEqual('HSLA(113,57%,54%,1.000)'); 
        });
        it('should return an HSL obj from an hex with opacity', () => {
            let hsl: HSL = hextoHSL('#457bcc','0.34');
            expect(Math.round(hsl.h)).toEqual(216); 
            expect(Math.round(hsl.s)).toEqual(57); 
            expect(Math.round(hsl.l)).toEqual(54); 
            expect(hsl.hsl).toEqual('HSL(216,57%,54%)'); 
            expect(hsl.hsla).toEqual('HSLA(216,57%,54%,0.340)'); 
        });
    });
    describe('HSBtoRGB', () => {
        it('should return an RGB obj from an HSB without opacity', () => {
            let hsb: HSB = hextoHSB('#0d2f63');
            let rgb: RGB = HSBtoRGB(hsb);
            expect(rgb.r).toEqual(13); 
            expect(rgb.g).toEqual(47); 
            expect(rgb.b).toEqual(99); 
            expect(rgb.rgb).toEqual('RGB(13,47,99)'); 
            expect(rgb.rgba).toEqual('RGBA(13,47,99,1.000)'); 
        });
        it('should return an RGB obj from an HSB with opacity', () => {
            let hsb: HSB = hextoHSB('#a3b4cf','0.768');
            let rgb: RGB = HSBtoRGB(hsb);
            expect(rgb.r).toEqual(163); 
            expect(rgb.g).toEqual(180); 
            expect(rgb.b).toEqual(207); 
            expect(rgb.rgb).toEqual('RGB(163,180,207)'); 
            expect(rgb.rgba).toEqual('RGBA(163,180,207,0.768)'); 
        });
    });
    describe('RGBtoHEX', () => {
        it('should return an HEX obj from an RGB without opacity', () => {
            let hsb: HSB = hextoHSB('#a3b4cf');
            let rgb: RGB = HSBtoRGB(hsb);
            let hex: HEX = RGBtoHEX(rgb);
            expect(hex.hex).toEqual('#a3b4cf'); 
            expect(hex.hexa).toEqual('#a3b4cfff'); 
        });
        it('should return an HEX obj from an RGB with opacity', () => {
            let hsb: HSB = hextoHSB('#a3b4cf','0.5');
            let rgb: RGB = HSBtoRGB(hsb);
            let hex: HEX = RGBtoHEX(rgb);
            expect(hex.hex).toEqual('#a3b4cf'); 
            expect(hex.hexa).toEqual('#a3b4cf80'); 
        });
    });
    describe('RGBtoHSL', () => {
        it('should return an HSL obj from an RGB without opacity', () => {
            let hsb: HSB = hextoHSB('#457bcc');
            let rgb: RGB = HSBtoRGB(hsb);
            let hsl: HSL = RGBtoHSL(rgb);
            expect(Math.round(hsl.h)).toEqual(216); 
            expect(Math.round(hsl.s)).toEqual(57); 
            expect(Math.round(hsl.l)).toEqual(54); 
            expect(hsl.hsl).toEqual('HSL(216,57%,54%)'); 
            expect(hsl.hsla).toEqual('HSLA(216,57%,54%,1.000)'); 
        });
        it('should return an HSL obj from an RGB with opacity', () => {
            let hsb: HSB = hextoHSB('#457bcc','0.34');
            let rgb: RGB = HSBtoRGB(hsb);
            let hsl: HSL = RGBtoHSL(rgb);
            expect(Math.round(hsl.h)).toEqual(216); 
            expect(Math.round(hsl.s)).toEqual(57); 
            expect(Math.round(hsl.l)).toEqual(54); 
            expect(hsl.hsl).toEqual('HSL(216,57%,54%)'); 
            expect(hsl.hsla).toEqual('HSLA(216,57%,54%,0.340)'); 
        });
    });
    describe('HSBtoHEX', () => {
        it('should return an HEX obj from an HSB without opacity', () => {
            let hsb: HSB = hextoHSB('#cc6645');
            let hex: HEX = HSBtoHEX(hsb);
            expect(hex.hex).toEqual('#cc6645'); 
            expect(hex.hexa).toEqual('#cc6645ff'); 
        });
        it('should return an HEX obj from an HSB with opacity', () => {
            let hsb: HSB = hextoHSB('#8f8581','0.5');
            let hex: HEX = HSBtoHEX(hsb);
            expect(hex.hex).toEqual('#8f8581'); 
            expect(hex.hexa).toEqual('#8f858180'); 
        });
    });
    describe('HSLtoHEX', () => {
        it('should return an HEX obj from an HSL without opacity', () => {
            let hsl: HSL = hextoHSL('#d9567e');
            let hex: HEX = HSLtoHEX(hsl);
            expect(hex.hex).toEqual('#d9567e'); 
            expect(hex.hexa).toEqual('#d9567eff'); 
        });
        it('should return an HEX obj from an HSL with opacity', () => {
            let hsl: HSL = hextoHSL('#d9567e','0.625');
            let hex: HEX = HSLtoHEX(hsl);
            expect(hex.hex).toEqual('#d9567e'); 
            expect(hex.hexa).toEqual('#d9567e9f'); 
        });
        it('should return an HEX obj from a HUE Component of an HSL with opacity', () => {
            let hsb: HSB = hextoHSB('#d9567e','0.625');
            let hex: HEX = HcolortoHEX(hsb);
            expect(hex.hex).toEqual('#ff004e'); 
            expect(hex.hexa).toEqual('#ff004e9f'); 
        });
    });
    describe('HSLtoRGB', () => {
        it('should return an RGB obj from an HSL without opacity', () => {
            let hsl: HSL = hextoHSL('#a3b4cf');
            let rgb: RGB = HSLtoRGB(hsl);
            expect(rgb.r).toEqual(163); 
            expect(rgb.g).toEqual(180); 
            expect(rgb.b).toEqual(207); 
            expect(rgb.rgb).toEqual('RGB(163,180,207)'); 
            expect(rgb.rgba).toEqual('RGBA(163,180,207,1.000)'); 
        });
        it('should return an RGB obj from an HSL with opacity', () => {
            let hsl: HSL = hextoHSL('#cc6645','0.769');
            let rgb: RGB = HSLtoRGB(hsl);
            expect(rgb.r).toEqual(204); 
            expect(rgb.g).toEqual(102); 
            expect(rgb.b).toEqual(69); 
            expect(rgb.rgb).toEqual('RGB(204,102,69)'); 
            expect(rgb.rgba).toEqual('RGBA(204,102,69,0.769)'); 
        });
    });
    describe('Opacityfrom', () => {
        it('should return opacity from an HEX', () => {
            let hsb: HSB = hextoHSB('#a3b4cf','0.5');
            let hex: HEX = HSBtoHEX(hsb);
            let opa: number = opacityfromHEX(hex);
            expect(opa).toBeCloseTo(0.5); 
        });
        it('should return opacity from an HSB', () => {
            let hsb: HSB = hextoHSB('#a3b4cf','0.5');
            let opa: number = opacityfromHSB(hsb);
            expect(opa).toBeCloseTo(0.5); 
        });
        it('should return opacity from an RGB', () => {
            let hsb: HSB = hextoHSB('#a3b4cf','0.5');
            let rgb: RGB = HSBtoRGB(hsb);
            let opa: number = opacityfromRGB(rgb);
            expect(opa).toBeCloseTo(0.5); 
        });
        it('should return opacity from an HSL', () => {
            let hsb: HSB = hextoHSB('#a3b4cf','0.5');
            let rgb: RGB = HSBtoRGB(hsb);
            let hsl: HSL = RGBtoHSL(rgb);
            let opa: number = opacityfromHSL(hsl);
            expect(opa).toBeCloseTo(0.5); 
        });
    });
    describe('Color Object', () => {
        it('should initialize the Color Object', () => {
            let color:Color = initSelectedColor('#a3b4cf','0.250');
            expect(color.hex.hex).toEqual("#a3b4cf"); 
            expect(color.hex.hexa).toEqual("#a3b4cf40");
            expect(color.opacity).toBeCloseTo(0.25); 
            expect(color.rgb.r).toEqual(163); 
            expect(color.rgb.g).toEqual(180); 
            expect(color.rgb.b).toEqual(207); 
            expect(color.rgb.rgb).toEqual("RGB(163,180,207)"); 
            expect(color.rgb.rgba).toEqual("RGBA(163,180,207,0.250)"); 
            expect(Math.round(color.hsb.h)).toEqual(217); 
            expect(Math.round(color.hsb.s)).toEqual(21); 
            expect(Math.round(color.hsb.b)).toEqual(81); 
            expect(color.hsb.hsb).toEqual("HSB(217,21%,81%)"); 
            expect(color.hsb.hsba).toEqual("HSBA(217,21%,81%,0.250)"); 
            expect(Math.round(color.hsl.h)).toEqual(217); 
            expect(Math.round(color.hsl.s)).toEqual(31); 
            expect(Math.round(color.hsl.l)).toEqual(73); 
            expect(color.hsl.hsl).toEqual("HSL(217,31%,73%)"); 
            expect(color.hsl.hsla).toEqual("HSLA(217,31%,73%,0.250)"); 
        });
        it('should return color object from an HEX', () => {
            let hex: HEX = hextoHEX('#a3b4cf','0.25');
            let color: Color = fillColor(hex);
            expect(color.hex.hex).toEqual("#a3b4cf"); 
            expect(color.hex.hexa).toEqual("#a3b4cf40");
            expect(color.opacity).toBeCloseTo(0.25); 
            expect(color.rgb.r).toEqual(163); 
            expect(color.rgb.g).toEqual(180); 
            expect(color.rgb.b).toEqual(207); 
            expect(color.rgb.rgb).toEqual("RGB(163,180,207)"); 
            expect(color.rgb.rgba).toEqual("RGBA(163,180,207,0.251)"); 
            expect(Math.round(color.hsb.h)).toEqual(217); 
            expect(Math.round(color.hsb.s)).toEqual(21); 
            expect(Math.round(color.hsb.b)).toEqual(81); 
            expect(color.hsb.hsb).toEqual("HSB(217,21%,81%)"); 
            expect(color.hsb.hsba).toEqual("HSBA(217,21%,81%,0.251)"); 
            expect(Math.round(color.hsl.h)).toEqual(217); 
            expect(Math.round(color.hsl.s)).toEqual(31); 
            expect(Math.round(color.hsl.l)).toEqual(73); 
            expect(color.hsl.hsl).toEqual("HSL(217,31%,73%)"); 
            expect(color.hsl.hsla).toEqual("HSLA(217,31%,73%,0.251)"); 
        });
        it('should return color object from an RGB', () => {
            let rgb: RGB = hextoRGB('#a3b4cf','0.25');
            let color: Color = fillColor(rgb);
            expect(color.hex.hex).toEqual("#a3b4cf"); 
            expect(color.hex.hexa).toEqual("#a3b4cf40");
            expect(color.opacity).toBeCloseTo(0.25); 
            expect(color.rgb.r).toEqual(163); 
            expect(color.rgb.g).toEqual(180); 
            expect(color.rgb.b).toEqual(207); 
            expect(color.rgb.rgb).toEqual("RGB(163,180,207)"); 
            expect(color.rgb.rgba).toEqual("RGBA(163,180,207,0.250)"); 
            expect(Math.round(color.hsb.h)).toEqual(217); 
            expect(Math.round(color.hsb.s)).toEqual(21); 
            expect(Math.round(color.hsb.b)).toEqual(81); 
            expect(color.hsb.hsb).toEqual("HSB(217,21%,81%)"); 
            expect(color.hsb.hsba).toEqual("HSBA(217,21%,81%,0.250)"); 
            expect(Math.round(color.hsl.h)).toEqual(217); 
            expect(Math.round(color.hsl.s)).toEqual(31); 
            expect(Math.round(color.hsl.l)).toEqual(73); 
            expect(color.hsl.hsl).toEqual("HSL(217,31%,73%)"); 
            expect(color.hsl.hsla).toEqual("HSLA(217,31%,73%,0.250)"); 
        });
        it('should return color object from an HSB', () => {
            let hsb: HSB = hextoHSB('#a3b4cf','0.25');
            let color: Color = fillColor(hsb);
            expect(color.hex.hex).toEqual("#a3b4cf"); 
            expect(color.hex.hexa).toEqual("#a3b4cf40");
            expect(color.opacity).toBeCloseTo(0.25); 
            expect(color.rgb.r).toEqual(163); 
            expect(color.rgb.g).toEqual(180); 
            expect(color.rgb.b).toEqual(207); 
            expect(color.rgb.rgb).toEqual("RGB(163,180,207)"); 
            expect(color.rgb.rgba).toEqual("RGBA(163,180,207,0.250)"); 
            expect(Math.round(color.hsb.h)).toEqual(217); 
            expect(Math.round(color.hsb.s)).toEqual(21); 
            expect(Math.round(color.hsb.b)).toEqual(81); 
            expect(color.hsb.hsb).toEqual("HSB(217,21%,81%)"); 
            expect(color.hsb.hsba).toEqual("HSBA(217,21%,81%,0.250)"); 
            expect(Math.round(color.hsl.h)).toEqual(217); 
            expect(Math.round(color.hsl.s)).toEqual(31); 
            expect(Math.round(color.hsl.l)).toEqual(73); 
            expect(color.hsl.hsl).toEqual("HSL(217,31%,73%)"); 
            expect(color.hsl.hsla).toEqual("HSLA(217,31%,73%,0.250)"); 
        });
        it('should return color object from an HSL', () => {
            let hsl: HSL = hextoHSL('#a3b4cf','0.25');
            let color: Color = fillColor(hsl);
            expect(color.hex.hex).toEqual("#a3b4cf"); 
            expect(color.hex.hexa).toEqual("#a3b4cf40");
            expect(color.opacity).toBeCloseTo(0.25); 
            expect(color.rgb.r).toEqual(163); 
            expect(color.rgb.g).toEqual(180); 
            expect(color.rgb.b).toEqual(207); 
            expect(color.rgb.rgb).toEqual("RGB(163,180,207)"); 
            expect(color.rgb.rgba).toEqual("RGBA(163,180,207,0.250)"); 
            expect(Math.round(color.hsb.h)).toEqual(217); 
            expect(Math.round(color.hsb.s)).toEqual(21); 
            expect(Math.round(color.hsb.b)).toEqual(81); 
            expect(color.hsb.hsb).toEqual("HSB(217,21%,81%)"); 
            expect(color.hsb.hsba).toEqual("HSBA(217,21%,81%,0.250)"); 
            expect(Math.round(color.hsl.h)).toEqual(217); 
            expect(Math.round(color.hsl.s)).toEqual(31); 
            expect(Math.round(color.hsl.l)).toEqual(73); 
            expect(color.hsl.hsl).toEqual("HSL(217,31%,73%)"); 
            expect(color.hsl.hsla).toEqual("HSLA(217,31%,73%,0.250)"); 
        });
    });   
});
