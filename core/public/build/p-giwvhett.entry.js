import{r as t,c as s,h as i,H as h,g as e}from"./p-a9009a8c.js";import{f as a,h as r}from"./p-a5313538.js";const o=class{constructor(i){t(this,i),this.headerheight="20%",this.headerbackground="url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/lake-sunset-twilight.jpeg)",this.headerbackgroundblur=!1,this.toolbarcontrastcolor="#ffffff",this.innerBlur=!1,this._mouseStart=!1,this._ptStart={},this._isScroll=!1,this._scrollTop=0,this._prevScrollTop=-1,this.onStretchyHeaderToolbar=s(this,"jeepStretchyHeaderToolbar",7)}async parseHeaderHeight(t){this._heightIni=t?await a(t,"y"):await a("20%","y");const s=r(this.el,"--jeep-stretchy-header-height",`${this._heightIni}px`);this._height=this._heightIni,this.innerHeadHeight=s}parseHeaderBackground(t){this.innerUrl=t||"url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/lake-sunset-twilight.jpeg)"}parseBlur(t){this.innerBlur=t||!1}parseToolbarContrastColor(t){this.innerContrastCol=t||"#ffffff"}init(){return Promise.resolve(this._init())}async componentWillLoad(){this._window=window,await this.init()}async componentDidLoad(){this._header=this._element.querySelector(".stretchy-header"),this._header.style.setProperty("height",this.innerHeadHeight),this._headerBackground=this._element.querySelector(".stretchy-header-background"),this._headerBackground.style.setProperty("background-image",this.innerUrl),this._ionHeader=this.el.querySelector("ion-header"),this._ionToolbar=this._ionHeader.querySelector("ion-toolbar"),this._ionContent=this.el.parentNode.querySelector("ion-content"),this._ionHeader&&await this._setHeader(),this._ionToolbar&&await this._setToolbar(),this._ionContent&&await this._setContent(),this._header.classList.contains("back")&&this._header.classList.remove("back"),this.innerBlur&&this._headerBackground.classList.contains("blur")&&this._headerBackground.classList.remove("blur")}async _init(){this._document=this._window.document,this._root=this._document.documentElement,this._element=this.el.shadowRoot,this.parseHeaderHeight(this.headerheight?this.headerheight:"20%"),this.parseHeaderBackground(this.headerbackground?this.headerbackground:"url(https://ununsplash.imgix.net/photo-1421091242698-34f6ad7fc088?fit=crop&fm=jpg&h=650&q=75&w=950)"),this.parseBlur(!!this.headerbackgroundblur&&this.headerbackgroundblur),this.parseToolbarContrastColor(this.toolbarcontrastcolor?this.toolbarcontrastcolor:null)}async _setHeader(){this._ionHeader.style.setProperty("position","absolute"),this._ionHeader.style.setProperty("top","0"),this._ionHeader.style.setProperty("left","0")}async _setToolbar(){const t=this._ionToolbar.color;this._ionColor=r(this._root,`--ion-color-${t}`),this._ionColorContrast=r(this._root,`--ion-color-${t}-contrast`),this._minHeight=this._ionToolbar.classList.contains("ios")?44:56,this._setTranslucent("add")}async _setContent(){this._ionContent.scrollEvents=!0,this._ionContent.addEventListener("ionScrollStart",async()=>{this._height<this._heightIni&&(this._isScroll=!0,this._mouseStart=!1,-1===this._prevScrollTop&&(this._prevScrollTop=0,await this._ionContent.scrollToTop()))}),this._ionContent.addEventListener("ionScroll",async t=>{this._height<this._heightIni&&(this._isScroll||(this._isScroll=!0),this._scrollTop=t.detail.scrollTop,this._height-=this._scrollTop,this._height=this._height<=this._minHeight?this._minHeight:this._height,this._height>this._minHeight?(this._setTranslucent("add"),await this._ionContent.scrollToTop(),this._prevScrollTop=-1):this._setTranslucent("remove"),this._header.style.setProperty("height",`${this._height}px`),-1!==this._prevScrollTop&&0===this._scrollTop&&(this._setTranslucent("remove"),this._isScroll=!1,this._mouseStart=!0),this._prevScrollTop=this._scrollTop)}),this._ionContent.addEventListener("ionScrollEnd",()=>{this._isScroll=!1}),this._ionContent.addEventListener("touchstart",t=>{!this._isScroll&&this._prevScrollTop<=0&&this._handleStart(t)}),this._ionContent.addEventListener("touchmove",t=>{this._handleMove(t)}),this._ionContent.addEventListener("touchend",()=>{this._mouseStart&&this._handleEnd()}),this._ionContent.addEventListener("mousedown",t=>{!this._isScroll&&this._prevScrollTop<=0&&this._handleStart(t)}),this._ionContent.addEventListener("mousemove",t=>{this._handleMove(t)}),this._ionContent.addEventListener("mouseup",()=>{this._mouseStart&&this._handleEnd()}),this._ionContent.addEventListener("mouseleave",()=>{this._mouseStart&&this._handleEnd()})}_setTranslucent(t){"add"===t?this.onStretchyHeaderToolbar.emit({color:`${this._ionColor}00`,contrastColor:this.innerContrastCol}):"remove"===t&&this.onStretchyHeaderToolbar.emit({color:this._ionColor,contrastColor:this._ionColorContrast})}_handleStart(t){this._ptStart=t.touches&&t.touches[0]?{x:t.touches[0].pageX,y:t.touches[0].pageY}:{x:t.pageX,y:t.pageY},!this._isScroll&&this._height>=this._minHeight&&(this._mouseStart=!0)}async _handleMove(t){const s=t.touches&&t.touches[0]?{x:t.touches[0].pageX,y:t.touches[0].pageY}:{x:t.pageX,y:t.pageY},i=s.y-this._ptStart.y;this._ptStart={x:s.x,y:s.y},this._mouseStart&&!this._isScroll&&(this._height+=i,i>0?(this._setTranslucent("add"),this._height>this._heightIni+2&&(this.innerBlur&&this._headerBackground.classList.contains("unblur")&&this._headerBackground.classList.remove("unblur"),this._header.classList.contains("back")&&this._header.classList.remove("back"),this.innerBlur&&!this._headerBackground.classList.contains("blur")&&this._headerBackground.classList.add("blur"))):(this.innerBlur&&this._headerBackground.classList.contains("blur")&&this._headerBackground.classList.remove("blur"),this.innerBlur&&!this._headerBackground.classList.contains("unblur")&&this._headerBackground.classList.add("unblur"),this._height<=this._heightIni&&this._header.classList.contains("back")&&this._header.classList.remove("back"),this._height<=this._minHeight?(this._height=this._minHeight,this._setTranslucent("remove")):this._setTranslucent("add")),this._header.style.setProperty("height",`${this._height}px`),this._height>=this._heightIni&&await this._ionContent.scrollToTop())}async _handleEnd(){this._isScroll||(this._height>=this._heightIni?(this._header.classList.contains("back")||this._header.classList.add("back"),this.innerBlur&&this._headerBackground.classList.contains("blur")&&this._headerBackground.classList.remove("blur"),this.innerBlur&&!this._headerBackground.classList.contains("unblur")&&this._headerBackground.classList.add("unblur"),this._height=this._heightIni,this._header.style.setProperty("height",`${this._height}px`)):(this._header.classList.contains("back")&&this._header.classList.remove("back"),this._height<=this._minHeight+2&&(this._height=this._minHeight,this._setTranslucent("remove"),this.innerBlur&&this._headerBackground.classList.contains("blur")&&this._headerBackground.classList.remove("blur"),this.innerBlur&&this._headerBackground.classList.contains("unblur")&&this._headerBackground.classList.remove("unblur")),this._header.style.setProperty("height",`${this._height}px`))),this.innerBlur&&this._headerBackground.classList.contains("unblur")&&this._headerBackground.classList.remove("unblur"),this._mouseStart=!1}render(){return i(h,null,i("div",{class:"stretchy-header"},i("div",{class:"stretchy-header-background"}),i("slot",null)))}get el(){return e(this)}static get watchers(){return{headerheight:["parseHeaderHeight"],headerbackground:["parseHeaderBackground"],headerbackgroundblur:["parseBlur"],toolbarcontrastcolor:["parseToolbarContrastColor"]}}static get style(){return":host{display:block}.stretchy-header-background{background-size:cover;background-position:50%;height:100%}.stretchy-header.back{-webkit-transition:height .4s linear;transition:height .4s linear}.stretchy-header-background.blur{transition:all 1s ease-in-out;-webkit-transition:all 1s ease-in-out;filter:blur(6px);-webkit-filter:blur(6px)}.stretchy-header-background.unblur{transition:all .4s ease;-webkit-transition:all .4s ease;filter:blur(0);-webkit-filter:blur(0)}"}};export{o as jeep_stretchy_header};