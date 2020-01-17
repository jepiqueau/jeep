export function debounce(context,func:Function,wait:number,immediate:boolean) {
  let timeout: NodeJS.Timer;
  return () => {
      const args:IArguments = arguments;
      const later = () => {
          timeout = null;
          if (!immediate) func.apply(context, args);
      };
      const callNow:boolean  = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
  };    
}    

export const getValueFromCss = (data:string,type:string): Promise<number> => {
  return new Promise ((resolve) => {

    if(data.indexOf('calc') === 0) {
      const formula: string = data.substring(data.indexOf('(')+1,data.length-1).replace(/  +/g, ' ');
      const arr: Array<string> = formula.split(' ');
      let retArr: Array<string> = [];
      let retValue: string;
      for (let i:number = 0; i < arr.length; i++) {
        if(arr[i] !== '+' && arr[i] !== '-' && arr[i] !== '*' && arr[i] !== '/') {
          getValueFromCss(arr[i],type).then(value => {
            retArr[i] = value.toString()
            if(i === arr.length -1) {
              resolve(evaluateString(retArr.join().replace(/,/g,' ')));
            }      
          });
        } else if (arr[i] !== "") {
          retValue = arr[i];
          retArr[i] = retValue
        } 
      }

    } else if(data.slice(-2) === "px") {
      resolve(Number(data.slice(0,-2)));
    } else if(data.slice(-1) === "%") {
      if(type === 'x') {
        resolve(Number(data.slice(0,-1)) * window.innerWidth / 100);
      } else if(type === 'y') {
        resolve(Number(data.slice(0,-1)) * window.innerHeight / 100);
      } else {
        resolve(null);
      }
    } else if(data.slice(-2) === 'vw') {
      resolve(Number(data.slice(0,-2)) * window.innerWidth / 100);
    } else if(data.slice(-2) === 'vh') {
      resolve(Number(data.slice(0,-2)) * window.innerHeight / 100);
    } else if(data.slice(-4) === 'vmin') {
      const v:number = Math.min(window.innerWidth,window.innerHeight);
      resolve(Number(data.slice(0,-4)) * v  / 100);
    } else if(data.slice(-4) === 'vmax') {
      const v:number = Math.max(window.innerWidth,window.innerHeight);
      resolve(Number(data.slice(0,-4)) * v  / 100);
    } else {
      resolve(null);
    }
  });

}

export const cssVar = (elem: any,name:string,value?:string): string => {
  if(name[0]!='-') name = '--'+name;//allow passing with or without --
  if(value) elem.style.setProperty(name, value);
  // below required to work with Unit Tests
  let propVal: string = elem.style.getPropertyValue(name);
  propVal = propVal ? propVal : window.getComputedStyle(elem).getPropertyValue(name);
  return propVal.trim();
}
export const getDim = (css:string, wind:number, pad:string): number =>{
  let w: number;
  let vpad:number = 0;
  if(pad !== "0"){
    if (pad.length > 2 && pad.slice(-2) === "px") {
      vpad = parseFloat(pad.split('px',2)[0]);
    } 
  }
  if(css && css !== "0"){
    if (css.length > 1 && css.slice(-1) === "%") {
      w = parseFloat(css.split('%',2)[0]);
      if (w > 100) w = 100;
      let ret:number = Math.round(((w * wind / 100) -vpad));
      return ret;
    } else if (css.length > 2 && css.slice(-2) === "px") {
      w = parseFloat(css.split('px',2)[0]);
      if (w > (wind-vpad)) {
        return wind-vpad;
      } else {
        return w-vpad;
      }  
    } else {
      return wind-vpad;
    }
  } else {
    return wind-vpad;
  } 
}
export const convertCSSNumber = (css:string): number => {
  if (css.length > 2 && css.slice(-2) === "px") {
    return parseFloat(css.split('px',2)[0]); 
  } else {
    return 0;
  } 
}
export const convertCSSBoolean = (css:string): boolean => {
  if (css.length > 2 && css.slice(-2) === "ue") {
    return true; 
  } else {
    return false;
  } 
}
export const getInstanceCSSProperties = (parent:HTMLElement | Element,instanceId:string): Promise<any> => {
  let prop:any = null;
  if(instanceId != null && parent != null) {
    if(parent.previousElementSibling !=null && parent.previousElementSibling.tagName === 'STYLE') {
      prop = getCssPropertyFromInnerHTML(parent.previousElementSibling.innerHTML,instanceId);
      if (prop != null) {
        return prop;
      } else {
        return getInstanceCSSProperties(parent.previousElementSibling,instanceId);
      }
    } else {
      return getInstanceCSSProperties(parent.parentElement,instanceId);
    }
  }
  return prop;
}
export const getCssPropertyFromInnerHTML = (innerHTML:string,instanceId:string): any => {
  let prop:any = null;
  if(innerHTML.length > 0 && instanceId !=null) {
    const str: string = innerHTML.replace(/}/g, '#').replace(/{/g,'#').replace(/ /g,'').replace(/\n/g,'');
    const arr: Array<string> = str.split('#');
    let id:string = instanceId;
    if( instanceId.charAt( 0 ) === '0' ) {
      id = instanceId.slice( 1 );
    }
    const ind:number = arr.indexOf(id);
    if(ind > -1) {
      const arrInst:Array<string> =arr[ind+1].replace(/:/g,';').split(';').slice(0,-1);
      if(arrInst.length % 2 === 0) {
        prop = {};
        for(let i: number =0;i< arrInst.length; i+=2) {
          prop[arrInst[i].replace(/-/g,'')] = arrInst[i+1];
        }
        return prop;
      }
    } 
  } 
    return prop;
}
export const getCssPropertyFromString = async (cstyle:string, type?:string): Promise<any> => {
  let prop: any = null;
  const stype:string = type ? `--${type}-` : `--`;
  const styles = cstyle.replace(/:host{/g,'').replace(/}/g,'').replace(/[\n\r]+/g, '').replace(/:/g,';').split(';').slice(0,-1);

  if(styles.length % 2 === 0) {
    prop = {};
    for(let i: number =0;i< styles.length; i+=2) {
      prop[styles[i].replace(stype,'').replace(/(\-\w)/g, (m) => {return m[1].toUpperCase();}).trim()] = styles[i+1].trim();
    }
  }
  return prop;
}

export const evaluateString = (s: string): number => {
    const arr: Array<string> = s.split(' ');
    for(let i:number =0; i< arr.length; i+=2) {
      if(i >= arr.length -1 ) {
        return arr[i] !== null ? Number(arr[i]) : null;
      }
      const val = arr[i] !== null ? calculate(Number(arr[i]),Number(arr[i+2]),arr[i+1]) : null;
      arr[i+2] = val !== null ? val.toString() : null;
    }
}
const calculate = (a:number,b:number,op:string): number => {

    if (op === "+") {
      return a + b;
    } else if (op === "-") {
      return a - b;
    } else if (op === "*") {
      return a * b;
    } else if (op === "/") {
      return a / b;
    } else {
      return null;
    }
}
export const getBoundingClientRect = (el:Element | HTMLElement,delay:number): Promise<ClientRect> => {
  return new Promise((resolve) => {
      const i_delay: number  = delay ? delay : 300;
      const i_el: Element | HTMLElement = el ? el : null;
      if(i_el !== null) {
        setTimeout(() => {
            const rectBB:ClientRect = i_el.getBoundingClientRect();
            resolve(rectBB);
        },i_delay);
      } else {
        resolve(null);
      }    
    });
}
