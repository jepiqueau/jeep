/*
Despite the fact that StencilJS in the component.d.ts file of stencil-colorpicker 
  export { LocalJSX as JSX };
and that LocalJSX as the interface IntrinsicElements defined as 
  interface IntrinsicElements {
    'jeep-colorpicker': JeepColorpicker;
    'jeep-cpicker': JeepCpicker;
  }
we got the following error at compile time
  the property 'jeep-colorpicker' does not exist on type 'JSX.IntrinsicElements'

To workaround this error, i created a declarations file in the src folder of the react app
to declare the IntrinsicElements Interface of the namespace JSX

I could not understand the reason for this, but it works

*/
/*
declare namespace JSX {
    interface IntrinsicElements {
      "jeep-colorpicker": any;
    }
}
*/