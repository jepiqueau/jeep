function debounce(context, func, wait, immediate) {
    var timeout;
    return function () {
        var args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}
var getValueFromCss = function (data, type) {
    return new Promise(function (resolve) {
        if (data.indexOf('calc') === 0) {
            var formula = data.substring(data.indexOf('(') + 1, data.length - 1).replace(/  +/g, ' ');
            var arr_1 = formula.split(' ');
            var retArr_1 = [];
            var retValue = void 0;
            var _loop_1 = function (i) {
                if (arr_1[i] !== '+' && arr_1[i] !== '-' && arr_1[i] !== '*' && arr_1[i] !== '/') {
                    getValueFromCss(arr_1[i], type).then(function (value) {
                        retArr_1[i] = value.toString();
                        if (i === arr_1.length - 1) {
                            resolve(evaluateString(retArr_1.join().replace(/,/g, ' ')));
                        }
                    });
                }
                else if (arr_1[i] !== "") {
                    retValue = arr_1[i];
                    retArr_1[i] = retValue;
                }
            };
            for (var i = 0; i < arr_1.length; i++) {
                _loop_1(i);
            }
        }
        else if (data.slice(-2) === "px") {
            resolve(Number(data.slice(0, -2)));
        }
        else if (data.slice(-1) === "%") {
            if (type === 'x') {
                resolve(Number(data.slice(0, -1)) * window.innerWidth / 100);
            }
            else if (type === 'y') {
                resolve(Number(data.slice(0, -1)) * window.innerHeight / 100);
            }
            else {
                resolve(null);
            }
        }
        else if (data.slice(-2) === 'vw') {
            resolve(Number(data.slice(0, -2)) * window.innerWidth / 100);
        }
        else if (data.slice(-2) === 'vh') {
            resolve(Number(data.slice(0, -2)) * window.innerHeight / 100);
        }
        else if (data.slice(-4) === 'vmin') {
            var v = Math.min(window.innerWidth, window.innerHeight);
            resolve(Number(data.slice(0, -4)) * v / 100);
        }
        else if (data.slice(-4) === 'vmax') {
            var v = Math.max(window.innerWidth, window.innerHeight);
            resolve(Number(data.slice(0, -4)) * v / 100);
        }
        else {
            resolve(null);
        }
    });
};
var cssVar = function (elem, name, value) {
    if (name[0] != '-')
        name = '--' + name; //allow passing with or without --
    if (value)
        elem.style.setProperty(name, value);
    // below required to work with Unit Tests
    var propVal = elem.style.getPropertyValue(name);
    propVal = propVal ? propVal : window.getComputedStyle(elem).getPropertyValue(name);
    return propVal.trim();
};
var getDim = function (css, wind, pad) {
    var w;
    var vpad = 0;
    if (pad && pad != "0") {
        if (pad.slice(-2) === "px") {
            vpad = parseFloat(pad.split('px', 2)[0]);
        }
    }
    if (css && css != "0") {
        if (css.slice(-1) === "%") {
            w = parseFloat(css.split('%', 2)[0]);
            if (w > 100)
                w = 100;
            var ret = Math.round(((w * wind / 100) - vpad));
            return ret;
        }
        else if (css.slice(-2) === "px") {
            w = parseFloat(css.split('px', 2)[0]);
            if (w > (wind - vpad)) {
                return wind - vpad;
            }
            else {
                return w - vpad;
            }
        }
        else {
            return wind - vpad;
        }
    }
    else {
        return wind - vpad;
    }
};
var convertCSSNumber = function (css) {
    if (css.slice(-2) === "px") {
        return parseFloat(css.split('px', 2)[0]);
    }
    else {
        return 0;
    }
};
var convertCSSBoolean = function (css) {
    if (css.slice(-2) === "ue") {
        return true;
    }
    else {
        return false;
    }
};
var getCssPropertyFromString = function (cstyle) {
    var prop = null;
    var styles = cstyle.replace(/:/g, ';').split(';').slice(0, -1);
    if (styles.length % 2 === 0) {
        prop = {};
        for (var i = 0; i < styles.length; i += 2) {
            prop[styles[i].replace(/-/g, '')] = styles[i + 1].replace(/ /g, '');
        }
        return prop;
    }
    return prop;
};
var evaluateString = function (s) {
    var arr = s.split(' ');
    for (var i = 0; i < arr.length; i += 2) {
        if (i >= arr.length - 1) {
            return arr[i] !== null ? Number(arr[i]) : null;
        }
        var val = arr[i] !== null ? calculate(Number(arr[i]), Number(arr[i + 2]), arr[i + 1]) : null;
        arr[i + 2] = val !== null ? val.toString() : null;
    }
};
var calculate = function (a, b, op) {
    if (op === "+") {
        return a + b;
    }
    else if (op === "-") {
        return a - b;
    }
    else if (op === "*") {
        return a * b;
    }
    else if (op === "/") {
        return a / b;
    }
    else {
        return null;
    }
};
export { getDim as a, convertCSSBoolean as b, convertCSSNumber as c, debounce as d, cssVar as e, getValueFromCss as f, getCssPropertyFromString as g };
