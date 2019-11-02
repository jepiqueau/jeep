'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-2a74ea97.js');

const defineCustomElements = (win, options) => {
  return core.patchEsm().then(() => {
    core.globals();
    core.bootstrapLazy([["jeep-cpicker.cjs",[[1,"jeep-cpicker",{"color":[513],"opacity":[513],"buttons":[513],"hidebuttons":[516],"hideheader":[516],"hideopacity":[516],"innerColor":[32],"innerOpacity":[32],"innerButtons":[32],"innerHideButtons":[32],"innerHideHeader":[32],"innerHideOpacity":[32],"toggleDisplay":[32],"init":[64],"getStateProperties":[64],"getWrapperCssVariables":[64],"calcH":[64],"calcS":[64],"calcB":[64],"calcO":[64]},[[9,"resize","handleWindowResize"]]]]],["jeep-colorpicker.cjs",[[1,"jeep-colorpicker",{"color":[513],"opacity":[513],"buttons":[513],"hidebuttons":[516],"hideheader":[516],"hideopacity":[516],"innerColor":[32],"innerOpacity":[32],"innerButtons":[32],"innerHideButtons":[32],"innerHideHeader":[32],"innerHideOpacity":[32],"show":[32],"init":[64],"open":[64],"close":[64]},[[0,"jeepCpickerOpen","openColorPickerHandler"],[0,"jeepCpickerClose","closeColorPickerHandler"],[0,"jeepCpickerInstantColor","instantColorPickerHandler"]]]]],["jeep-linechart.cjs",[[1,"jeep-linechart",{"ctitle":[513],"subtitle":[513],"xtitle":[513],"ytitle":[513],"data":[513],"cstyle":[513],"animation":[516],"cborder":[516],"delay":[513],"innerTitle":[32],"innerSubTitle":[32],"innerXTitle":[32],"innerYTitle":[32],"innerData":[32],"innerStyle":[32],"innerAnimation":[32],"innerBorder":[32],"innerDelay":[32],"status":[32],"w_width":[32],"w_height":[32],"toggle":[32],"init":[64],"getStatus":[64],"renderChart":[64],"getWindowSize":[64],"getCssProperties":[64]}]]],["jeep-svgmorph.cjs",[[1,"jeep-svgmorph",{"duration":[513],"repeatcount":[513],"pathindex":[513],"nsegment":[513],"keytimes":[513],"calcmode":[513],"keysplines":[513],"fill":[513],"isSVG":[32],"innerDuration":[32],"innerRepeatcount":[32],"innerPathindex":[32],"innerNsegment":[32],"innerKeytimes":[32],"innerCalcmode":[32],"innerKeysplines":[32],"innerFill":[32],"init":[64],"getStateProperties":[64],"getPath":[64],"getPathList":[64],"getFillColor":[64],"renderSVGFirstPath":[64],"getAlignedPaths":[64]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
