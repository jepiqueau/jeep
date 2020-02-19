export const getBackButtonText = (text:string): string => {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? text : '';
  }