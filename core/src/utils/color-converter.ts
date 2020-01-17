import {Color, HEX, RGB, HSB, HSL } from "../global/interfaces/color"

// Color utility functions
export const initSelectedColor = (currentColor:string,currentOpacity:string): Color => {
    let color: Color = {} as Color;
    color.hex = hextoHEX(currentColor,currentOpacity);
    color.rgb = hextoRGB(currentColor,currentOpacity);
    color.hsb = hextoHSB(currentColor,currentOpacity); 
    color.hsl = hextoHSL(currentColor,currentOpacity); 
    color.opacity = Number(parseFloat(currentOpacity).toFixed(3));
    return color;       
}
export const hextoHEX = (hex:string,opacity?:string): HEX => {
    let opa:number = parseFloat(opacity) <= 1 ? parseFloat(opacity) : 1;
    let ret:HEX = {} as HEX;
    ret.hex = hex;
    let n:number = Math.round(opa * 255);
    let b:string = n.toString(16);
    b = b.length === 1 ? `0${b}` : b;
    ret.hexa = hex + b;
    return ret;
}
export const hextoRGB = (hex:string,opacity?:string): RGB => {
    let opa:number = parseFloat(opacity) <= 1 ? parseFloat(opacity) : 1;
    let hex1:string = hex.replace(/#/, "");
    let ret:RGB = {} as RGB;
    let bigint:number = parseInt(hex1,16);
    ret.r = (bigint >> 16) & 255;
    ret.g = (bigint >> 8) & 255;
    ret.b = bigint & 255;
    ret.rgb = "RGB(" + ret.r + "," + ret.g + "," + ret.b + ")";
    ret.rgba = "RGBA(" + ret.r + "," + ret.g + "," + ret.b + "," + opa.toFixed(3) + ")";
    return ret;
}
export const hextoHSB = (hex:string,opacity?:string): HSB => {
    let opa:number = parseFloat(opacity) <= 1 ? parseFloat(opacity) : 1;
    let ret:HSB = {} as HSB;
    const rgb: RGB = hextoRGB(hex, opa.toString());
    const min: number = Math.min(rgb.r,rgb.g,rgb.b);
    const max: number = Math.max(rgb.r,rgb.g,rgb.b);
    const d = max - min; 
    const s = max == 0 ? 0 : d / max;
    const b = max / 255;
    let h: number;
    switch (max) {
        case min: h = 0; break;
        case rgb.r: h = (rgb.g - rgb.b) + d * (rgb.g < rgb.b ? 6 : 0); h /= 6 * d; break;
        case rgb.g: h = (rgb.b - rgb.r) + d * 2; h /= 6 * d; break;
        case rgb.b: h = (rgb.r - rgb.g) + d * 4; h /= 6 * d; break;
    }
    ret.h = parseFloat((h * 360).toFixed(3));
    ret.s = parseFloat((s * 100).toFixed(3));
    ret.b = parseFloat((b * 100).toFixed(3));
    ret.hsb = "HSB(" + ret.h.toFixed(0) + "," + ret.s.toFixed(0) + "%," + ret.b.toFixed(0) + "%)";
    ret.hsba = "HSBA(" + ret.h.toFixed(0) + "," + ret.s.toFixed(0) + "%," + ret.b.toFixed(0) + "%," + opa.toFixed(3) + ")";
    return ret;
}
export const hextoHSL= (hex:string,opacity?:string): HSL => {
    let opa:number = parseFloat(opacity) <= 1 ? parseFloat(opacity) : 1;
    const rgb: RGB = hextoRGB(hex, opa.toString());
    let ret:HSL = RGBtoHSL(rgb);
    return ret;      
}
export const RGBtoHSL= (rgb:RGB): HSL => {
    const opa:number = opacityfromRGB(rgb);
    let ret:HSL = {} as HSL;
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const min: number = Math.min(r,g,b);
    const max: number = Math.max(r,g,b);
    let h: number = (max + min) / 2; 
    let s: number = h;
    let l: number  = h;
    if (max == min) {
        h = s = 0; //achromatic
    } else {
        const d: number = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);   
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0);break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /=6;
    }
    ret.h = parseFloat((h * 360).toFixed(3));
    ret.s = parseFloat((s * 100).toFixed(3));
    ret.l = parseFloat((l * 100).toFixed(3));
    ret.hsl = "HSL(" + ret.h.toFixed(0) + "," + ret.s.toFixed(0) + "%," + ret.l.toFixed(0) + "%)";
    ret.hsla = "HSLA(" + ret.h.toFixed(0) + "," + ret.s.toFixed(0) + "%," + ret.l.toFixed(0) + "%," + opa.toFixed(3) + ")";
    return ret;
}
export const HSBtoRGB = (hsb: HSB): RGB => {
    let ret: RGB = {} as RGB;
    const opa:number = opacityfromHSB(hsb);


    const h: number = hsb.h / 360;
    const i: number = Math.floor(h * 6);
    const values = (() => {
        const [s, b] = [hsb.s, hsb.b].map(val => Number(val) / 100);
        const f = h * 6 - i;
        const p = b * (1 - s);
        const q = b * (1 - f * s);
        const t = b * (1 - (1 - f) * s);

        return {
        0: [b, t, p],
        1: [q, b, p],
        2: [p, b, t],
        3: [p, q, b],
        4: [t, p, b],
        5: [b, p, q]
        };
    })();

    const [r, g, b] = values[i % 6].map(val => Math.round(val * 255));
    ret.r = r;
    ret.g = g;
    ret.b = b;
    ret.rgb = "RGB(" + ret.r + "," + ret.g + "," + ret.b + ")";
    ret.rgba = "RGBA(" + ret.r + "," + ret.g + "," + ret.b + "," + opa.toFixed(3) + ")";
    return ret;
}
export const RGBtoHEX = (rgb: RGB): HEX => {
    let val: Array<string> = rgb.rgba.split('(')[1].slice(0,-1).split(',')
    let hex: string = "#";
    val.forEach((item,index) => {
        if(index === 3) {
            let a:string = (Math.round(parseFloat(item) * 255)).toString(16);
            if(a.length <2) a = `0${a}`;
            hex += a;
        } else {
            let a:string = (parseFloat(item)).toString(16);
            if(a.length <2) a = `0${a}`;
            hex += a;
        }
    });
    let ret: HEX = {} as HEX;
    ret.hex = hex.slice(0,-2);
    ret.hexa = hex;
    return ret;
}
export const HSBtoHEX = (hsb:HSB): HEX => {
    let rgb:RGB = HSBtoRGB(hsb);
    return RGBtoHEX(rgb);
}
export const HSLtoHEX = (hsl:HSL): HEX => {
    let rgb:RGB = HSLtoRGB(hsl);
    return RGBtoHEX(rgb);
}
export const HSLtoRGB = (hsl: HSL): RGB => {
    let ret: RGB = {} as RGB;
    const opa:number = opacityfromHSL(hsl);
    const h: number = hsl.h / 360;
    const s: number = hsl.s / 100;
    const l: number = hsl.l / 100;
    if (s === 0) {
        ret.r = ret.g = ret.b = l; // achromatic
    } else {
        const hue2rgb: any  = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        ret.r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
        ret.g = Math.round(hue2rgb(p, q, h) * 255);
        ret.b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
    }
    ret.rgb = "RGB(" + ret.r + "," + ret.g + "," + ret.b + ")";
    ret.rgba = "RGBA(" + ret.r + "," + ret.g + "," + ret.b + "," + opa.toFixed(3) + ")";
    return ret;
}
export const HcolortoHEX = (hsb:HSB): HEX => {
    // clone hsb
    let ret:HSB = Object.assign({},hsb);
    let opa:number = opacityfromHSB(ret);
    ret.s = 100;
    ret.b = 100;
    ret.hsb = "HSB(" + ret.h.toFixed(0) + "," + ret.s.toFixed(0) + "%," + ret.b.toFixed(0) + "%)";
    ret.hsba = "HSBA(" + ret.h.toFixed(0) + "," + ret.s.toFixed(0) + "%," + ret.b.toFixed(0) + "%," + opa.toFixed(3) + ")";
    return HSBtoHEX(ret); 
}
export const opacityfromRGB = (rgb:RGB): number => {
    return parseFloat(rgb.rgba.split(',')[3].slice(0,-1));       
}
export const opacityfromHEX = (hex:HEX): number => {
    return parseInt(hex.hexa.slice(hex.hexa.length-2,hex.hexa.length),16) / 255;
}
export const opacityfromHSB = (hsb:HSB): number => {
    return parseFloat(hsb.hsba.split(',')[3].slice(0,-1));       
}
export const opacityfromHSL = (hsl:HSL): number => {
    return parseFloat(hsl.hsla.split(',')[3].slice(0,-1));       
}
export const fillColor = (value: HSB | RGB | HEX | HSL): Color => {
    let color:Color = {} as Color;
    color.hex = {} as HEX;
    color.rgb = {} as RGB;
    color.hsb = {} as HSB;
    color.hsl = {} as HSL;
    if(value['hex']) {        
        color.hex.hex = value['hex'];
        color.hex.hexa = value['hexa'];
        color.opacity = opacityfromHEX(color.hex);
        color.rgb = hextoRGB(color.hex.hex,color.opacity.toString());
        color.hsb = hextoHSB(color.hex.hex,color.opacity.toString());
        color.hsl = hextoHSL(color.hex.hex,color.opacity.toString());
    }
    if(value['rgb']) {
        color.rgb.r = value['r'];
        color.rgb.g = value['g'];
        color.rgb.b = value['b'];
        color.rgb.rgb = value['rgb'];
        color.rgb.rgba = value['rgba'];
        color.opacity = opacityfromRGB(color.rgb);
        color.hex = RGBtoHEX(color.rgb);
        color.hsb = hextoHSB(color.hex.hex,color.opacity.toString());
        color.hsl = RGBtoHSL(color.rgb);
    }
    if(value['hsb']) {
        color.hsb.h = value['h'];
        color.hsb.s = value['s'];
        color.hsb.b = value['b'];
        color.hsb.hsb = value['hsb'];
        color.hsb.hsba = value['hsba'];
        color.opacity = opacityfromHSB(color.hsb);
        color.hex = HSBtoHEX(color.hsb);
        color.rgb = HSBtoRGB(color.hsb);
        color.hsl = RGBtoHSL(color.rgb);
    }
    if(value['hsl']) {
        color.hsl.h = value['h'];
        color.hsl.s = value['s'];
        color.hsl.l = value['l'];
        color.hsl.hsl = value['hsl'];
        color.hsl.hsla = value['hsla'];
        color.opacity = opacityfromHSL(color.hsl);
        color.hex = HSLtoHEX(color.hsl);
        color.rgb = HSLtoRGB(color.hsl);
        color.hsb = hextoHSB(color.hex.hex,color.opacity.toString());
    }
    return color;
} 
export const printColor = () => {
    let color: Color = this.initSelectedColor();
    console.log('hex %s rgb %s hsb %s hsl %s', 
          color.hex.hexa,
          color.rgb.rgba,
          color.hsb.hsba,
          color.hsl.hsla,
    );  
}
export const randomColor = () : string => {
    var start = 40;
    var end = 255;
    var color = "#";
    for(var i = 0;i < 3; i++) {
      let a: string = (Math.floor(Math.random() * (end-start+1)) + start).toString(16);
      if(a.length <2) a = `0${a}`;
      color += a;
    }
    return color;
}
export const randomHexColor = (start:number,end:number) : string => {
    let hsb:HSB = {} as HSB;
    const opa: number = 1.0;
    hsb.h = randomHue(start,end);
    hsb.s = randomSB();
    hsb.b = randomSB();
    hsb.hsb = "HSB(" + hsb.h.toFixed(0) + "," + hsb.s.toFixed(0) + "%," + hsb.b.toFixed(0) + "%)";
    hsb.hsba = "HSBA(" + hsb.h.toFixed(0) + "," + hsb.s.toFixed(0) + "%," + hsb.b.toFixed(0) + "%," + opa.toFixed(3) + ")";
    let rgb:RGB = HSBtoRGB(hsb);
    let hex:HEX = RGBtoHEX(rgb);
    return hex.hex;  
}
export const randomHue = (start:number,end:number): number => {
    return Math.floor(Math.random() * (end-start+1)) + start;
}
export const randomSB = (): number => {
    let start: number = 50;
    let end: number = 100;
    return Math.floor(Math.random() * (end-start+1)) + start;
}