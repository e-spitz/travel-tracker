/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_lagos_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_lagos_jpg__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-family: \"Raleway\", sans-serif;\n  color: #093d39;\n  line-height: 1.75;\n}\n\nbody {\n  background: white;\n}\n\n.login-page {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat;\n  background-attachment: fixed;\n  background-size: cover;\n  margin: 0;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 5%;\n}\n\n.login-title {\n  font-size: 3em;\n  margin: 5px 0px 0px 0px;\n  text-decoration: 1px underline;\n  text-underline-offset: 40%;\n}\n\n.sign-in {\n  font-size: 1.8em;\n  font-style: italic;\n  margin-bottom: 7%;\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 7%;\n  background: #093d39;\n  opacity: 80%;\n}\n\n.login-btn {\n  padding: 1% 2%;\n  margin-left: 5%;\n  font-size: 1em;\n  border-radius: 5%;\n}\n\n.login-inputs {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 90%;\n  color: white;\n}\n\n.login-fields {\n  border-radius: 5%;\n  width: 15%;\n  padding: 0.5%;\n}\n\n.password,\n.username {\n  font-size: 1.5em;\n  margin-right: 2%;\n  margin-left: 2%;\n  color: white;\n}\n\n.login-error,\n.booking-error {\n  color: #093d39;\n  text-align: center;\n  font-size: 2em;\n}\n\n.login-error {\n  color: white;\n  background: #093d39;\n}\n\n.click-to-book {\n  font-size: 2.5em;\n  margin-top: 2%;\n  text-align: center;\n  border-bottom: solid 0.5px #093d39;\n  padding-bottom: 1.6%;\n}\n\nh5 {\n  margin-left: 1.5%;\n  font-size: 2em;\n  font-weight: bold;\n  margin-top: 1%;\n}\n\n.total-spent-msg {\n  font-size: 1em;\n}\n\n.total-spent {\n  font-size: 1.5em;\n}\n\n.main-header {\n  display: flex;\n  justify-content: flex-end;\n  border-bottom: solid 0.5px #093d39;\n  color: white;\n  background: #093d39;\n}\n.main-header .main-title {\n  color: white;\n  background: #093d39;\n  font-size: 2em;\n  margin-right: 1.5%;\n}\n.main-header .fas {\n  color: white;\n  background: #093d39;\n  font-size: 1.2em;\n  letter-spacing: 0.2em;\n}\n.main-header .logout-btn {\n  color: white;\n  background: #093d39;\n  width: 4%;\n  height: 50%;\n  border: solid 1px white;\n  text-align: center;\n  border-radius: 2%;\n  font-size: 0.8em;\n  box-shadow: 0.5px 0.5px 5px 0px white;\n}\n\n.greeting-msg {\n  font-size: 4.6em;\n  display: flex;\n  margin-right: 3%;\n  margin-left: 3%;\n}\n\n.cost-logout-section {\n  float: right;\n  text-align: center;\n  padding: 0.5%;\n  width: 15%;\n}\n\n.nav-buttons {\n  display: flex;\n  justify-content: space-evenly;\n  margin-left: 10%;\n  margin-right: 10%;\n  margin-bottom: 1%;\n}\n\n.nav-btn {\n  padding: 0.5% 2%;\n  border-radius: 2%;\n  border: none;\n  box-shadow: 1px 0.5px 3px 0px black;\n  width: 15%;\n  font-size: 1em;\n}\n\n.login-btn:hover,\n.nav-btn:hover {\n  cursor: pointer;\n  color: purple;\n  transform: translateY(-2px);\n  transition: 0.4s;\n}\n\n.logout-btn:hover {\n  cursor: pointer;\n  background: white;\n  color: purple;\n}\n\n.trip-cards-container {\n  display: grid;\n  padding: 0.5em;\n  grid-template-columns: repeat(4, 1fr);\n  align-items: center;\n  gap: 2em;\n  margin-top: 0.5em;\n  width: 100%;\n  height: 100%;\n}\n\n.trip-card {\n  border: solid 1px black;\n  font-size: 1em;\n  border-radius: 0.5em;\n  padding: 1em;\n  margin-left: 0.5em;\n  margin-right: 0.5em;\n  box-shadow: 0.01em 0.1em 0.5em black;\n}\n\n.no-trip {\n  font-size: 1em;\n  margin-left: 4%;\n}\n\n.img-wrapper {\n  height: 100%;\n  width: 100%;\n}\n\n.trip-img {\n  height: 8%;\n  width: 100%;\n  border-radius: 5%;\n}\n\n.click-to-book:hover {\n  cursor: pointer;\n  color: purple;\n  transition-property: all;\n  transition-duration: 0.4s;\n  transition-timing-function: ease-in-out;\n  letter-spacing: 5px;\n}\n\n.booking-form {\n  font-size: 1.4em;\n  display: flex;\n  padding: 2em;\n  border-bottom: solid 0.5px #093d39;\n}\n\n.form-fields {\n  font-size: 0.7em;\n  border: solid 0.2px purple;\n  border-radius: 5%;\n  padding: 1%;\n  box-shadow: 0.2px 0.2px 1px 0px #093d39;\n}\n\n.cost-btn,\n.book-btn {\n  display: inline-flex;\n  justify-content: center;\n  font-size: 0.7em;\n  width: 100%;\n  height: 35%;\n  margin-left: 5%;\n  box-shadow: 0.5px 0.5px 5px 0px #093d39;\n}\n\n.cost-btn:hover,\n.book-btn:hover {\n  cursor: pointer;\n  color: purple;\n  transform: translateY(-2px);\n  transition: 0.4s;\n}\n\n.cost-btn {\n  margin-bottom: 2%;\n}\n\n.cost-modal,\n.book-modal {\n  display: flex;\n  align-items: center;\n  position: fixed;\n  width: 100%;\n  height: 100vh;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  justify-content: center;\n}\n\n.trip-costs,\n.booking-confirm-msg {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  font-family: sans-serif;\n}\n\n.trip-cost,\n.trip-cost-per-person {\n  margin-top: -4%;\n  font-size: 3em;\n  color: purple;\n}\n\n.modal-content,\n.book-modal-content {\n  z-index: 2;\n  background-color: white;\n  padding: 0px;\n  border: 1px solid #888;\n  width: 35%;\n  height: 40%;\n  overflow-y: scroll;\n  box-shadow: 0px 7px 29px 0px black;\n  justify-content: center;\n}\n\n.book-modal-content {\n  height: 30%;\n}\n\n.booking-msg-info {\n  text-align: center;\n  font-size: 1.3em;\n  color: purple;\n}\n\n.close-modal {\n  display: flex;\n  justify-content: flex-end;\n  font-size: 2.7em;\n  font-weight: bold;\n  margin-right: 2%;\n  margin-top: -2%;\n}\n\n.book-close-modal {\n  display: flex;\n  justify-content: flex-end;\n  font-size: 2.7em;\n  font-weight: bold;\n  margin-right: 2%;\n  margin-top: -2%;\n}\n\n.close-modal:hover,\n.book-close-modal:hover {\n  cursor: pointer;\n}\n\n.hidden {\n  display: none;\n}\n\n@media screen and (max-width: 1110px) {\n  .booking-form {\n    font-size: 1em;\n    flex-direction: column;\n  }\n\n  .form-fields {\n    font-size: 0.4em;\n    border: solid 0.1px purple;\n    border-radius: 5%;\n    padding: 0.3%;\n  }\n\n  .cost-btn,\n.book-btn {\n    display: flex;\n    flex-direction: column;\n    width: 25%;\n    height: 40%;\n    margin-top: 2%;\n    margin-left: 0;\n  }\n}\n@media screen and (max-width: 1050px) {\n  .trip-cards-container {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .cost-logout-section {\n    font-size: 1.2em;\n  }\n\n  .main-title {\n    font-size: 2em;\n  }\n\n  .logout-btn {\n    font-size: 0.5em;\n  }\n\n  .click-to-book {\n    font-size: 1.5em;\n  }\n}\n@media screen and (max-width: 990px) {\n  .main-header {\n    justify-content: flex-start;\n  }\n}\n@media screen and (max-width: 750px) {\n  .login-btn,\n.password,\n.username {\n    font-size: 1em;\n    margin-left: 5%;\n  }\n\n  .total-spent-msg {\n    font-size: 0.7em;\n  }\n\n  .total-spent {\n    font-size: 1em;\n  }\n}\n@media screen and (max-width: 650px) {\n  .greeting-msg {\n    font-size: 3.5em;\n  }\n\n  .nav-btn {\n    font-size: 0.6em;\n  }\n\n  .login-inputs {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .login-fields {\n    margin: 4%;\n    width: 35%;\n    padding: 1%;\n  }\n\n  .trip-cards-container {\n    grid-template-columns: repeat(1, 1fr);\n  }\n\n  .username,\n.password,\n.login-btn {\n    margin: 0;\n  }\n\n  .login-btn {\n    margin-top: 2%;\n    width: 35%;\n  }\n}\n@media screen and (max-width: 425px) {\n  .greeting-msg {\n    font-size: 2.5em;\n  }\n\n  .click-to-book {\n    font-size: 1em;\n  }\n}\n@media screen and (max-width: 350px) {\n  .login-title {\n    font-size: 2em;\n  }\n\n  .sign-in {\n    font-size: 1em;\n  }\n\n  .main-title {\n    font-size: 1em;\n  }\n}", "",{"version":3,"sources":["webpack://./src/css/base.scss"],"names":[],"mappings":"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","sourcesContent":["* {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-family: \"Raleway\", sans-serif;\n  color: #093d39;\n  line-height: 1.75;\n}\n\n$primary-background: white;\n$primary-color: #093d39;\n$secondary-color: purple;\n$primary-cursor: pointer;\n\n\nbody {\n  background: $primary-background;\n}\n\n.login-page {\n  background: url(../images/lagos.jpg) no-repeat;\n  background-attachment: fixed;\n  background-size: cover;\n  margin: 0;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 5%;\n}\n  .login-title {\n    font-size: 3em;\n    margin: 5px 0px 0px 0px;\n    text-decoration: 1px underline;\n    text-underline-offset: 40%;\n  }\n\n  .sign-in {\n    font-size: 1.8em;\n    font-style: italic;\n    margin-bottom: 7%;\n  }\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 7%;\n  background: $primary-color;\n  opacity: 80%;\n}\n\n.login-btn {\n  padding: 1% 2%;\n  margin-left: 5%;\n  font-size: 1em;\n  border-radius: 5%;\n}\n\n.login-inputs {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 90%;\n  color: white;\n}\n\n.login-fields {\n  border-radius: 5%;\n  width: 15%;\n  padding: .5%;\n}\n\n.password,\n.username {\n  font-size: 1.5em;\n  margin-right: 2%;\n  margin-left: 2%;\n  color: white;\n}\n\n.login-error,\n.booking-error {\n  color: $primary-color;\n  text-align: center;\n  font-size: 2em;\n}\n\n.login-error {\n  color: white;\n  background: $primary-color;\n}\n\n.click-to-book {\n  font-size: 2.5em;\n  margin-top: 2%;\n  text-align: center;\n  border-bottom: solid .5px $primary-color;\n  padding-bottom: 1.6%;\n}\n\nh5 {\n  margin-left: 1.5%;\n  font-size: 2em;\n  font-weight: bold;\n  margin-top: 1%;\n}\n\n.total-spent-msg {\n  font-size: 1em;\n}\n\n.total-spent {\n  font-size: 1.5em;\n}\n\n.main-header {\n  display: flex;\n  justify-content: flex-end;\n  border-bottom: solid .5px $primary-color;\n  color: white;\n  background: $primary-color;\n    .main-title {\n      color: white;\n      background: $primary-color;\n      font-size: 2em;\n      margin-right: 1.5%;\n    }\n\n    .fas {\n      color: white;\n      background: $primary-color;\n      font-size: 1.2em;\n      letter-spacing: .2em;\n    }\n\n    .logout-btn {\n      color: white;\n      background: $primary-color;\n      width: 4%;\n      height: 50%;\n      border: solid 1px white;\n      text-align: center;\n      border-radius: 2%;\n      font-size: .8em;\n      box-shadow: .5px .5px 5px 0px white;\n    }\n}\n\n.greeting-msg {\n  font-size: 4.6em;\n  display: flex;\n  margin-right: 3%;\n  margin-left: 3%;\n}\n\n.cost-logout-section {\n  float: right;\n  text-align: center;\n  padding: .5%;\n  width: 15%;\n}\n\n.nav-buttons {\n  display: flex;\n  justify-content: space-evenly;\n  margin-left: 10%;\n  margin-right: 10%;\n  margin-bottom: 1%;\n}\n\n.nav-btn {\n  padding: .5% 2%;\n  border-radius: 2%;\n  border: none;\n  box-shadow: 1px .5px 3px 0px black;\n  width: 15%;\n  font-size: 1em;\n}\n\n.login-btn:hover,\n.nav-btn:hover {\n  cursor: $primary-cursor;\n  color: $secondary-color;\n  transform: translateY(-2px);\n  transition: .4s;\n}\n\n.logout-btn:hover {\n  cursor: $primary-cursor;\n  background: white;\n  color: $secondary-color;\n}\n\n.trip-cards-container {\n  display: grid;\n  padding: .5em;\n  grid-template-columns: repeat(4, 1fr);\n  align-items: center;\n  gap: 2em;\n  margin-top: .5em;\n  width: 100%;\n  height: 100%;\n}\n\n.trip-card {\n  border: solid 1px black;\n  font-size: 1em;\n  border-radius: .5em;\n  padding: 1em;\n  margin-left: .5em;\n  margin-right: .5em;\n  box-shadow: .01em .1em .5em black;\n}\n\n.no-trip {\n  font-size: 1em;\n  margin-left: 4%;\n}\n\n.img-wrapper {\n  height: 100%;\n  width: 100%;\n}\n\n.trip-img {\n  height: 8%;\n  width: 100%;\n  border-radius: 5%;\n}\n\n.click-to-book:hover {\n  cursor: $primary-cursor;\n  color: $secondary-color;\n  transition-property: all;\n  transition-duration: .4s;\n  transition-timing-function: ease-in-out;\n  letter-spacing: 5px;\n}\n\n.booking-form {\n  font-size: 1.4em;\n  display: flex;\n  padding: 2em;\n  border-bottom: solid .5px $primary-color;\n}\n\n.form-fields {\n  font-size: .7em;\n  border: solid .2px $secondary-color;\n  border-radius: 5%;\n  padding: 1%;\n  box-shadow: .2px .2px 1px 0px $primary-color;\n}\n\n.cost-btn,\n.book-btn {\n  display: inline-flex;\n  justify-content: center;\n  font-size: .7em;\n  width: 100%;\n  height: 35%;\n  margin-left: 5%;\n  box-shadow: .5px .5px 5px 0px $primary-color;\n}\n\n.cost-btn:hover,\n.book-btn:hover {\n  cursor: $primary-cursor;\n  color: $secondary-color;\n  transform: translateY(-2px);\n  transition: .4s;\n}\n\n.cost-btn {\n  margin-bottom: 2%;\n}\n\n// MODAL POP UPS\n\n.cost-modal,\n.book-modal {\n  display: flex;\n  align-items: center;\n  position: fixed;\n  width: 100%;\n  height: 100vh;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  justify-content: center;\n}\n\n.trip-costs,\n.booking-confirm-msg {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  font-family: sans-serif;\n}\n\n.trip-cost,\n.trip-cost-per-person {\n  margin-top: -4%;\n  font-size: 3em;\n  color: $secondary-color;\n}\n\n.modal-content,\n.book-modal-content {\n  z-index: 2;\n  background-color: white;\n  padding: 0px;\n  border: 1px solid #888;\n  width: 35%;\n  height: 40%;\n  overflow-y: scroll;\n  box-shadow: 0px 7px 29px 0px black;\n  justify-content: center;\n}\n\n.book-modal-content {\n  height: 30%;\n}\n\n.booking-msg-info {\n  text-align: center;\n  font-size: 1.3em;\n  color: $secondary-color;\n}\n\n.close-modal {\n  display: flex;\n  justify-content: flex-end;\n  font-size: 2.7em;\n  font-weight: bold;\n  margin-right: 2%;\n  margin-top: -2%;\n}\n\n.book-close-modal {\n  display: flex;\n  justify-content: flex-end;\n  font-size: 2.7em;\n  font-weight: bold;\n  margin-right: 2%;\n  margin-top: -2%;\n}\n\n.close-modal:hover,\n.book-close-modal:hover {\n  cursor: $primary-cursor;\n}\n\n// HIDDEN\n\n.hidden {\n  display: none;\n}\n\n// MEDIA QUERIES\n\n@media screen and (max-width: 1110px) {\n  .booking-form {\n    font-size: 1em;\n    flex-direction: column;\n  }\n\n  .form-fields {\n    font-size: .4em;\n    border: solid .1px $secondary-color;\n    border-radius: 5%;\n    padding: .3%;\n  }\n\n  .cost-btn,\n  .book-btn {\n    display: flex;\n    flex-direction: column;\n    width: 25%;\n    height: 40%;\n    margin-top: 2%;\n    margin-left: 0;\n  }\n\n}\n\n@media screen and (max-width: 1050px) {\n\n  .trip-cards-container {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .cost-logout-section {\n    font-size: 1.2em;\n  }\n\n  .main-title {\n    font-size: 2em;\n  }\n\n  .logout-btn {\n    font-size: .5em;\n  }\n\n  .click-to-book {\n    font-size: 1.5em;\n  }\n}\n\n@media screen and (max-width: 990px) {\n  .main-header {\n    justify-content: flex-start;\n  }\n}\n\n@media screen and (max-width: 750px) {\n\n  .login-btn,\n  .password,\n  .username {\n    font-size: 1em;\n    margin-left: 5%;\n  }\n\n  .total-spent-msg {\n    font-size: .7em;\n  }\n\n  .total-spent {\n    font-size: 1em;\n  }\n}\n\n@media screen and (max-width: 650px) {\n\n  .greeting-msg {\n    font-size: 3.5em;\n  }\n\n  .nav-btn {\n    font-size: .6em;\n  }\n\n  .login-inputs {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .login-fields {\n    margin: 4%;\n    width: 35%;\n    padding: 1%;\n  }\n\n  .trip-cards-container {\n    grid-template-columns: repeat(1, 1fr);\n  }\n\n  .username,\n  .password,\n  .login-btn {\n    margin: 0;\n  }\n\n  .login-btn {\n   margin-top: 2%;\n   width: 35%;\n  }\n}\n\n@media screen and (max-width: 425px) {\n  .greeting-msg {\n    font-size: 2.5em;\n  }\n\n  .click-to-book {\n    font-size: 1em;\n  }\n}\n\n@media screen and (max-width: 350px) {\n  .login-title {\n    font-size: 2em;\n  }\n\n  .sign-in {\n    font-size: 1em;\n  }\n\n  .main-title {\n    font-size: 1em;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/lagos.jpg");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAll": () => (/* binding */ fetchAll),
/* harmony export */   "postNewTrip": () => (/* binding */ postNewTrip)
/* harmony export */ });
const fetchAPIData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(response => response.json())
    .catch(err => console.log(err))
}

const fetchSingleTraveler = (id) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response => response.json())
    .catch(err => console.log(err))
}

const fetchAll = (id) => {
  return Promise.all([
    fetchAPIData('travelers'),
    fetchAPIData('trips'),
    fetchAPIData('destinations'),
    fetchSingleTraveler(`${id}`)
  ])
    .catch(err => console.log(err))
}

const postNewTrip = (newTrip) => {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(newTrip),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkForError(response))
    .catch(err => err)
}

const checkForError = (response) => {
  if (!response.ok) {
    throw new Error('404 error');
  } else {
    return response.json();
  }
}




/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domUpdates": () => (/* binding */ domUpdates)
/* harmony export */ });
const domUpdates = {

  displayTravelerName(traveler) {
    const greetingMsg = document.getElementById('greetingMsg');
    const firstName = traveler.name.split(' ')[0];
    greetingMsg.innerText = `Howdy, ${firstName}!`;
  },

  displayYearlyTotal(total) {
    const totalSpent = document.getElementById('totalSpent');
    const totalToCurrency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    totalSpent.innerText = `${totalToCurrency.format(total)}`;
  },

  displayCardSectionHeader(header) {
    const newHeader = document.getElementById('tripCardsHeader')
    newHeader.innerText = `${header}`;
  },

  displayTripCards(travelerTrips, allDestinations) {
    let cardContainer = document.getElementById('tripCardsContainer')
    cardContainer.innerHTML = '';

    if (travelerTrips.length > 0) {
      travelerTrips.forEach(trip => {
        let destination = allDestinations.find(dest => dest.id === trip.destinationID)
        let splitDate = trip.date.split('/');
        let updateDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
        let cardInfo = `
          <article class="trip-card">
            <div class="img-wrapper">
              <h3 class="destination-name">${destination.destination}</h3>
              <img class="trip-img" src=${destination.image} alt=${destination.alt}>
            </div>
            <p>departure date: ${updateDate}</p>
            <p>travelers: ${trip.travelers}</p>
            <p>duration: ${trip.duration} days</p>
            <p>status: ${trip.status}</p>
          </article>`;
        cardContainer.insertAdjacentHTML('beforeend', cardInfo);
      });
    } else {
      cardContainer.innerHTML = `<article class='no-trip'>You do not have any matching trips.</article>`
    }
  },

  loadBookingDestinations(allDestinations) {
    const destList = document.getElementById('destinationChoices')
    let destNames = allDestinations.sort((a, b) => a.destination.localeCompare(b.destination))
    destNames.forEach(d => {
      let destSelect = `
      <option class='form-fields' value='${d.id}' required>${d.destination}</option>`
      destList.insertAdjacentHTML('beforeend', destSelect)
    });
  },

  displayTripCostsModal(cost, perPerson) {
    const costModal = document.getElementById('costModal')
    this.toggleView(costModal);
    costModal.innerHTML = `
    <article class="modal-content" id='modalContent'>
    <span class="close-modal" id="closeModal">&times;</span>
      <div class='trip-costs' id='tripCosts'>
        <label for='trip-cost'>ESTIMATED TRIP COST:</label>
        <p class='trip-cost'>$${cost}</p>
        <label for='trip-cost-per-person'>COST PER PERSON:</label>
        <p class='trip-cost-per-person'>$${perPerson}</p>
      </div>
    </article>`;
  },

  hideModal() {
    const costModal = document.getElementById('costModal')
    this.toggleView(costModal)
  },

  hideBookingModal() {
    const bookModal = document.getElementById('bookModal')
    const bookingForm = document.getElementById('bookingForm')
    this.clearFormFields();
    this.toggleView(bookModal);
    this.toggleView(bookingForm);
  },

  displayBookingModal(newTrip, allDestinations) {
    const dest = this.findBookedDestination(newTrip, allDestinations)
    const bookModal = document.getElementById('bookModal')
    this.toggleView(bookModal)
    bookModal.innerHTML = `
    <article class="book-modal-content" id='bookModalContent'>
    <span class="book-close-modal" id="bookCloseModal">&times;</span>
      <div class='booking-confirm-msg'>
        <label for='booking-msg' class='booking-msg'>YOU JUST BOOKED A VACATION TO:</label>
        <p class='booking-msg-info'>${dest.destination} for ${newTrip.duration} days!</p>
      </div>
    </article>`;
  },

  displayPostErrorModal() {
    const bookingError = document.getElementById('bookingError');
    const bookingForm = document.getElementById('bookingForm')
    bookingError.innerText = "There was a problem with the server. Please try booking at a later time.";
    setTimeout(() => {
      this.toggleView(bookingError);
    }, 5000)
    setTimeout(()=> {
      this.toggleView(bookingForm)
    }, 5000)
  },

  findBookedDestination(newTrip, allDestinations) {
    const matchedDest = allDestinations.find(d => d.id === newTrip.destinationID)
    return matchedDest;
  },

  clearFormFields() {
    const bookingForm = document.getElementById('bookingForm')
    bookingForm.reset();
  },

  toggleView(element) {
    element.classList.toggle('hidden')
  }

}


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Trip {
  constructor(singleTrip) {
    this.id = singleTrip.id;
    this.userID = singleTrip.userID;
    this.destinationID = singleTrip.destinationID;
    this.travelers = singleTrip.travelers;
    this.date = singleTrip.date;
    this.duration = singleTrip.duration;
    this.status = singleTrip.status;
    this.suggestedActivities = singleTrip.suggestedActivities;
    this.startDateTimeStamp = 0;
    this.endDateTimeStamp = 0;
    this.tripCost = 0;
  }

  getTripTimeStamps() {
    const startTime = new Date(this.date).getTime();
    const addedTime = new Date(this.date).getDate() + this.duration;
    const endTime = new Date(this.date).setDate(addedTime);
    this.startDateTimeStamp = startTime;
    this.endDateTimeStamp = endTime;
  }

  calculateTripCost(destinations) {
    const matchedDestination = destinations.find(dest => dest.id === this.destinationID);
    const lodgingTotal = matchedDestination.estimatedLodgingCostPerDay * this.duration;
    const flightTotal = matchedDestination.estimatedFlightCostPerPerson * this.travelers;
    const tripTotal = ((lodgingTotal + flightTotal) * 1.1);
    this.tripCost = ~~(tripTotal)
    return this.tripCost;
  }

  calculateCostPerPersonPerTrip(totalCost) {
    const perPerson = totalCost / this.travelers;
    return ~~(perPerson);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Trip);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Trip_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


class Traveler {
  constructor(singleTraveler) {
    this.id = singleTraveler.id;
    this.name = singleTraveler.name;
    this.travelerType = singleTraveler.travelerType;
    this.username = `customer${singleTraveler.id}`;
    this.trips = [];
    this.amountSpent = 0;
  }

  sortTrips() {
    this.trips.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }

  findTrips(tripsData, destinationsData) {
    tripsData.forEach(trip => {
      if (trip.userID === this.id) {
        this.trips.push(new _Trip_js__WEBPACK_IMPORTED_MODULE_0__.default(trip));
      }
    });
    this.trips.forEach(trip => trip.getTripTimeStamps());
    this.trips.forEach(trip => trip.calculateTripCost(destinationsData));
    this.sortTrips();
  }

  findPastTrips(todayDate) {
    const todayTimeStamp = new Date(todayDate).getTime();
    const pastTrips = this.trips.filter(trip => trip.endDateTimeStamp < todayTimeStamp);
    return pastTrips;
  }

  findPresentTrips(todayDate) {
    const todayTimeStamp = new Date(todayDate).getTime();
    const presentTrips = this.trips.filter(trip => trip.startDateTimeStamp <= todayTimeStamp && trip.endDateTimeStamp >= todayTimeStamp);
    return presentTrips;
  }

  findUpcomingTrips(todayDate) {
    const todayTimeStamp = new Date(todayDate).getTime();
    const upcomingTrips = this.trips.filter(trip => trip.startDateTimeStamp > todayTimeStamp);
    return upcomingTrips;
  }

  findPendingTrips() {
    const pendingTrips = this.trips.filter(trip => trip.status === 'pending');
    return pendingTrips;
  }

  calculateTotalAmountSpent(todayDate, destinationsData) {
    const currentYear = todayDate.toString().split(' ')[3];
    this.amountSpent = this.trips.reduce((sum, trip) => {
      let tripYear = trip.date.split('/')[0];
      if (tripYear === currentYear) {
        sum += trip.calculateTripCost(destinationsData);
      }
      return sum;
    }, 0)
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Traveler);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Destination {
  constructor(singleDest) {
    this.id = singleDest.id;
    this.destination = singleDest.destination;
    this.estimatedLodgingCostPerDay = singleDest.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = singleDest.estimatedFlightCostPerPerson;
    this.image = singleDest.image;
    this.alt = singleDest.alt; 
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Destination);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _Trip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _Traveler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _Destination__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);

// import './css/styles.scss';






let navButtons = document.querySelectorAll('.nav-btn');
let clickToBook = document.getElementById('clickToBook');
let bookForm = document.getElementById('bookingForm');
let loginBtn = document.getElementById('loginBtn');
let logoutBtn = document.getElementById('logoutBtn');
let loginPage = document.getElementById('loginPage');
let mainPage = document.getElementById('mainPage');
let estimatedTripCostBtn = document.getElementById('costBtn');
let closeCostModal = document.getElementById('costModal');
let bookYourTripBtn = document.getElementById('bookBtn');
let closeBookModal = document.getElementById('bookModal');

let traveler, travelers;
let allDestinations, allTrips;
let date = new Date();
let fetchSingleTravelerData, fetchTravelersData, fetchTripsData, fetchDestinationsData;

navButtons.forEach(button => button.addEventListener('click', renderCards))
clickToBook.addEventListener('click', showBookingForm)
logoutBtn.addEventListener('click', logInLogOut)
loginBtn.addEventListener('click', function() {
  validateLogin(event);
})
estimatedTripCostBtn.addEventListener('click', function() {
  showTripCosts(event)
});
closeCostModal.addEventListener('click', function() {
  closeModalWindow(event)
});
bookYourTripBtn.addEventListener('click', function() {
  bookNewTrip(event);
});
closeBookModal.addEventListener('click', function() {
  closeBookWindow(event)
})

function validateLogin(event) {
  event.preventDefault();
  const usernameInput = document.getElementById('username').value;
  const travelerID = usernameInput.split('traveler')[1]
  const passwordInput = document.getElementById('password').value;
  const loginInputs = document.getElementById('loginInputs')

  if (usernameInput !== '' && passwordInput !== ''
  && usernameInput.includes('traveler') && passwordInput === 'travel2020'
  && travelerID > 0 && travelerID < 51 && travelerID.length <= 2) {
    logInLogOut();
    getAllData(travelerID);
  } else {
    const loginErrMsg = document.getElementById('loginError');
    _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.toggleView(loginErrMsg);
    setTimeout(() => {
      _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.toggleView(loginErrMsg);
    }, 3000)
  }
  loginInputs.reset()
}

const getAllData = (userID) => {
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchAll)(userID)
    .then(data => {
      fetchTravelersData = data[0].travelers;
      fetchTripsData = data[1].trips;
      fetchDestinationsData = data[2].destinations;
      fetchSingleTravelerData = data[3];
      traveler = new _Traveler__WEBPACK_IMPORTED_MODULE_4__.default(fetchSingleTravelerData)
      travelers = fetchTravelersData.map(trav => new _Traveler__WEBPACK_IMPORTED_MODULE_4__.default(trav));
      allTrips = fetchTripsData.map(trip => new _Trip__WEBPACK_IMPORTED_MODULE_3__.default(trip));
      allDestinations = fetchDestinationsData.map(dest => new _Destination__WEBPACK_IMPORTED_MODULE_5__.default(dest));
      renderTraveler()
    })
}

const renderTraveler = () => {
  traveler.findTrips(allTrips, allDestinations);
  traveler.calculateTotalAmountSpent(date, allDestinations);
  displayTravelerInfo();
}

const displayTravelerInfo = () => {
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.displayTravelerName(traveler);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.displayYearlyTotal(traveler.amountSpent);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.displayCardSectionHeader('ALL TRIPS');
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.displayTripCards(traveler.trips, allDestinations);
}

function renderCards(event) {
  let btnID = event.target.id;
  let trips, cardHeader;
  if (btnID === 'all') {
    cardHeader = 'ALL TRIPS';
    trips = traveler.trips;
  }
  if (btnID === 'past') {
    cardHeader = 'PAST TRIPS';
    trips = traveler.findPastTrips(date);
  }
  if (btnID === 'present') {
    cardHeader = 'PRESENT TRIPS';
    trips = traveler.findPresentTrips(date);
  }
  if (btnID === 'future') {
    cardHeader = 'FUTURE TRIPS';
    trips = traveler.findUpcomingTrips(date);
  }
  if (btnID === 'pending') {
    cardHeader = 'PENDING TRIPS'
    trips = traveler.findPendingTrips();
  }
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.displayCardSectionHeader(cardHeader)
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.displayTripCards(trips, allDestinations)
}

function showBookingForm() {
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.toggleView(bookForm)
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.loadBookingDestinations(allDestinations)
}

function logInLogOut() {
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.toggleView(loginPage)
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.toggleView(mainPage)
}

function loadFormValues() {
  const destinationID = document.getElementById('destinationChoices').value;
  const departureDate = document.getElementById('departureDateInput').value;
  const changeDate = departureDate.split('-');
  const fixedDate = changeDate.join('/');
  const tripLength = document.getElementById('durationInput').value;
  const numOfTravelers = document.getElementById('travelersInput').value;

  let postTripObject = {
    "id": allTrips.length + 1,
    "userID": traveler.id,
    "destinationID": parseInt(destinationID),
    "travelers": parseInt(numOfTravelers),
    "date": fixedDate,
    "duration": parseInt(tripLength),
    "status": "pending",
    "suggestedActivities": []
  }
  return postTripObject;
}

function checkFormFields(newTrip) {
  const departureDate = document.getElementById('departureDateInput').value;
  const changeDate = departureDate.split('-');
  const fixedDate = changeDate.join('/');
  const checkDate = new Date(fixedDate).getTime();

  let filledOut = true;
  if (!newTrip.destinationID || !newTrip.date || !newTrip.duration || !newTrip.travelers || checkDate < date) {
    filledOut = false;
  }
  return filledOut;
}

function showTripCosts(event) {
  event.preventDefault()
  const formTripData = loadFormValues();
  const newTrip = new _Trip__WEBPACK_IMPORTED_MODULE_3__.default(formTripData)
  const formFields = checkFormFields(newTrip);
  if (!formFields) {
    alert('Please check to make sure all fields are filled out and departure date is a future date.')
  } else {
    const tripCost = newTrip.calculateTripCost(allDestinations)
    const perPerson = newTrip.calculateCostPerPersonPerTrip(tripCost)
    _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.displayTripCostsModal(tripCost, perPerson)
  }
}

function closeModalWindow(event) {
  if (event.target.id === 'closeModal') {
    _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.hideModal()
  }
}

function bookNewTrip(event) {
  event.preventDefault()
  const postTripObj = loadFormValues();
  const newTrip = new _Trip__WEBPACK_IMPORTED_MODULE_3__.default(postTripObj)
  const formFields = checkFormFields(newTrip);

  if (!formFields) {
    alert('Please check to make sure all fields are filled out and departure date is today or later.')
  } else {
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.postNewTrip)(newTrip)
      .then(response => {
        console.log(response.message);
        if (response.message !== '404 error') {
          getAllData(traveler.id);
          _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.displayBookingModal(newTrip, allDestinations);
        } else {
          _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.displayPostErrorModal();
        }
      })
  }
}

function closeBookWindow(event) {
  if (event.target.id === 'bookCloseModal') {
    _domUpdates__WEBPACK_IMPORTED_MODULE_2__.domUpdates.hideBookingModal()
  }
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map