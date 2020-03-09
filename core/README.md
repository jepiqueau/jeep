[![npm version](https://img.shields.io/npm/v/@jeepq/core/latest.svg)](https://www.npmjs.com/package/@jeepq/core)
[![license](https://img.shields.io/npm/l/@jeepq/core.svg)](https://github.com/jepiqueau/jeep/blob/master/core/LICENSE)
### 
![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Jeep Stencil Components Library

This is a library of Stencil Web Components including
 - [jeep-colorpicker    ](https://github.com/jepiqueau/jeep/blob/master/core/src/components/jeep-colorpicker/readme.md)
 - [jeep-linechart      ](https://github.com/jepiqueau/jeep/blob/master/core/src/components/jeep-linechart/readme.md)
 - [jeep-columnchart      ](https://github.com/jepiqueau/jeep/blob/master/core/src/components/jeep-columnchart/readme.md)
 - [jeep-svgmorph       ](https://github.com/jepiqueau/jeep/blob/master/core/src/components/jeep-svgmorph/readme.md)
 - [jeep-slides         ](https://github.com/jepiqueau/jeep/blob/master/core/src/components/jeep-slides/readme.md)
 - [jeep-flipimages     ](https://github.com/jepiqueau/jeep/blob/master/core/src/components/jeep-flipimages/readme.md)
 - [jeep-stretchy-header](https://github.com/jepiqueau/jeep/blob/master/core/src/components/jeep-stretchy-header/readme.md)
 - [jeep-html-toprint](https://github.com/jepiqueau/jeep/blob/master/core/src/components/jeep-html-toprint/readme.md)
 - [jeep-carousel](https://github.com/jepiqueau/jeep/blob/master/core/src/components/jeep-carousel/readme.md)


## Jeep Components Viewme

 - [Colorpicker ViewMe](https://jeep-viewme-app.firebaseapp.com/colorpicker)

 - [LineChart ViewMe](https://jeep-viewme-app.firebaseapp.com/linechart)

 - [ColumnChart ViewMe](https://jeep-viewme-app.firebaseapp.com/columnchart)

 - [SVGMorphing ViewMe](https://jeep-viewme-app.firebaseapp.com/svgmorph)

 - [Slides ViewMe](https://jeep-viewme-app.firebaseapp.com/slides)

 - [Flipimages ViewMe](https://jeep-viewme-app.firebaseapp.com/flipimages)

 - [StretchyHeader ViewMe](https://jeep-viewme-app.firebaseapp.com/stretchyheader)

 - [HtmlToPrint ViewMe](https://jeep-viewme-app.firebaseapp.com/htmltoprint)

 - [Carousel ViewMe](https://jeep-viewme-app.firebaseapp.com/carousel)

## Using this library

### Script tag

- Put a script tag similar to this in the head of your index.html

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@jeepq/core@latest/dist/jeep/jeep.esm.js"></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@jeepq/core@latest/dist/jeep/jeep.js"></script>
```


- Then you can use the web component library anywhere in your template, JSX, html etc


### In a stencil-starter app

- Run `npm install @jeepq/core --save`
- Add an import to the npm packages `import @jeepq/core;`
- Then you can use the web component library anywhere in your template, JSX, html etc

### For other Frameworks
Go to the different application examples

#### @Ionic/Angular app

- [test-angular-component-lib] (https://github.com/jepiqueau/jeep/tree/master/IonicAngularApps/test-angular-component-lib)

#### @Ionic5/Angular9 app

 - [test-angular-component-lib] (https://github.com/jepiqueau/jeep/tree/master/Ionic5Angular9Apps/test-angular-component-lib)

#### @Ionic/React app

- [test-react-component-lib] (https://github.com/jepiqueau/jeep/tree/master/IonicReactApps/test-react-component-lib)

#### @Ionic5/React app

 - [test-react-component-lib] (https://github.com/jepiqueau/jeep/tree/master/Ionic5ReactApps/test-react-component-lib)

#### Vue app

#### React app

- [react-colorpicker-app] (https://github.com/jepiqueau/jeep/tree/master/ReactApps/react-colorpicker-app)

#### PWA app

- [Jeep Viewme App] (https://github.com/jepiqueau/jeep/tree/master/pwa-components-viewme)

#### Python Django Flask Jinja2 app

- [python-django-flask-jinja2-ionic-app] (https://github.com/jepiqueau/python-django-flask-jinja2-ionic-app)
