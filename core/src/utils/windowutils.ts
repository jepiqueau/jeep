import { Rect } from '../global/interfaces/geom';
export const windowSize = (window:any): Rect => {
  return {
    top: 0,
    left: 0,
    width: window.innerWidth,
    height: window.innerHeight
  };
}