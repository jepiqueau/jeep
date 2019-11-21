export interface SlidesOptions {
    direction?: string;
    duration?: number; // controls hidden time
    navigation?: {
        icon?: string; // "arrow-circle" or "arrow-round"
        hidden?: boolean;
    };
    pagination?: {
        bulletsDisplay: number;
        hidden?: boolean;
        clickable?: boolean;
    };
    autoplay?: {
        duration?: number;
        hidden?: boolean;
    };
    fullscreen?: {
        hidden?: boolean;
    };
}
export interface SlidesParams {
    axis?: string;
    slideLength?: number;
    scrollLength?: number;
    curSlide?: number;
    position?: number;
    nbSlides?: number;
}
export interface SlidesMargins {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
}
export interface HeaderVisibility {
    visibility?: string;
}
export interface PaginationIndex {
    index?: string;
}
export interface slideLocalCssVariables {
    scrollSnapAlign?: string;
    minWidth?: string;
    height?: string;
    background?: string;
    color?: string;
    fontSize?: string;
    display?: string;
    alignItems?: string;
    justifyContent?: string;
    textAlign?: string;
    flexDirection?: string;
    titleFontSize?: string;
    subtitleFontSize?: string;
    contentTop?: string;
    contentPadding?: string;
    contentFontSize?: string;
    contentTextAlign?: string;
    headerTop?: string;
}
