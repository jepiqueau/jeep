export interface HEX {
    hex?: string;
    hexa?: string;
}
export interface RGB {
    r?: number;
    g?: number;
    b?: number;
    rgb?: string;
    rgba?: string;
}
export interface HSB {
    h?: number;
    s?: number;
    b?: number;
    hsb?: string;
    hsba?: string;
}
export interface HSL {
    h?: number;
    s?: number;
    l?: number;
    hsl?: string;
    hsla?: string;
}
export interface Color {
    hex?: HEX;
    rgb?: RGB;
    hsb?: HSB;
    hsl?: HSL;
    opacity?: number;
}
