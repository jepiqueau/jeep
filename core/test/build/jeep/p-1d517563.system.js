System.register([],(function(e){"use strict";return{execute:function(){e("d",r);function r(e,r,i,n){var l;return function(){var t=arguments;var u=function(){l=null;if(!n)r.apply(e,t)};var s=n&&!l;clearTimeout(l);l=setTimeout(u,i);if(s)r.apply(e,t)}}var i=e("f",(function(e,r){return new Promise((function(n){if(e.indexOf("calc")===0){var l=e.substring(e.indexOf("(")+1,e.length-1).replace(/  +/g," ");var t=l.split(" ");var u=[];var s=void 0;var f=function(e){if(t[e]!=="+"&&t[e]!=="-"&&t[e]!=="*"&&t[e]!=="/"){i(t[e],r).then((function(r){u[e]=r.toString();if(e===t.length-1){n(a(u.join().replace(/,/g," ")))}}))}else if(t[e]!==""){s=t[e];u[e]=s}};for(var c=0;c<t.length;c++){f(c)}}else if(e.slice(-2)==="px"){n(Number(e.slice(0,-2)))}else if(e.slice(-1)==="%"){if(r==="x"){n(Number(e.slice(0,-1))*window.innerWidth/100)}else if(r==="y"){n(Number(e.slice(0,-1))*window.innerHeight/100)}else{n(null)}}else if(e.slice(-2)==="vw"){n(Number(e.slice(0,-2))*window.innerWidth/100)}else if(e.slice(-2)==="vh"){n(Number(e.slice(0,-2))*window.innerHeight/100)}else if(e.slice(-4)==="vmin"){var o=Math.min(window.innerWidth,window.innerHeight);n(Number(e.slice(0,-4))*o/100)}else if(e.slice(-4)==="vmax"){var o=Math.max(window.innerWidth,window.innerHeight);n(Number(e.slice(0,-4))*o/100)}else{n(null)}}))}));var n=e("e",(function(e,r,i){if(r[0]!="-")r="--"+r;if(i)e.style.setProperty(r,i);var n=e.style.getPropertyValue(r);n=n?n:window.getComputedStyle(e).getPropertyValue(r);return n.trim()}));var l=e("a",(function(e,r,i){var n;var l=0;if(i&&i!="0"){if(i.slice(-2)==="px"){l=parseFloat(i.split("px",2)[0])}}if(e&&e!="0"){if(e.slice(-1)==="%"){n=parseFloat(e.split("%",2)[0]);if(n>100)n=100;var t=Math.round(n*r/100-l);return t}else if(e.slice(-2)==="px"){n=parseFloat(e.split("px",2)[0]);if(n>r-l){return r-l}else{return n-l}}else{return r-l}}else{return r-l}}));var t=e("c",(function(e){if(e.slice(-2)==="px"){return parseFloat(e.split("px",2)[0])}else{return 0}}));var u=e("b",(function(e){if(e.slice(-2)==="ue"){return true}else{return false}}));var s=e("g",(function(e){var r=null;var i=e.replace(/:/g,";").split(";").slice(0,-1);if(i.length%2===0){r={};for(var n=0;n<i.length;n+=2){r[i[n].replace(/-/g,"")]=i[n+1].replace(/ /g,"")}return r}return r}));var a=function(e){var r=e.split(" ");for(var i=0;i<r.length;i+=2){if(i>=r.length-1){return r[i]!==null?Number(r[i]):null}var n=r[i]!==null?f(Number(r[i]),Number(r[i+2]),r[i+1]):null;r[i+2]=n!==null?n.toString():null}};var f=function(e,r,i){if(i==="+"){return e+r}else if(i==="-"){return e-r}else if(i==="*"){return e*r}else if(i==="/"){return e/r}else{return null}}}}}));