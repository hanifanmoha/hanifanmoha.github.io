webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./src/components/PokeCard/PokeCard.js":
/*!*********************************************!*\
  !*** ./src/components/PokeCard/PokeCard.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PokeCard_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PokeCard.scss */ "./src/components/PokeCard/PokeCard.scss");
/* harmony import */ var _PokeCard_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_PokeCard_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _target_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./target.svg */ "./src/components/PokeCard/target.svg");
/* harmony import */ var _target_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_target_svg__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\Users\\hanifan\\Github\\web-remake\\pokedex\\src\\components\\PokeCard\\PokeCard.js";





var PokeCard = function PokeCard(_ref) {
  var className = _ref.className,
      data = _ref.data;
  var img;

  try {
    var ename = data.ename.replace(/[^\x00-\x7F]/g, "").replace(/\./, '_').replace(/\s/, '');
    img = __webpack_require__("./data/thm sync recursive ^\\.\\/.*\\.png$")("./".concat(data.id).concat(ename, ".png"));
  } catch (e) {}

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, _PokeCard_scss__WEBPACK_IMPORTED_MODULE_0___default.a.root),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _PokeCard_scss__WEBPACK_IMPORTED_MODULE_0___default.a.ballContainer,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: _target_svg__WEBPACK_IMPORTED_MODULE_3___default.a,
    className: _PokeCard_scss__WEBPACK_IMPORTED_MODULE_0___default.a.ball,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _PokeCard_scss__WEBPACK_IMPORTED_MODULE_0___default.a.pokeImage,
    style: {
      backgroundImage: "url(".concat(img, ")")
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _PokeCard_scss__WEBPACK_IMPORTED_MODULE_0___default.a.pokeData,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", {
    className: _PokeCard_scss__WEBPACK_IMPORTED_MODULE_0___default.a.name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, data.ename), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", {
    className: _PokeCard_scss__WEBPACK_IMPORTED_MODULE_0___default.a.cname,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, data.cname)));
};

/* harmony default export */ __webpack_exports__["default"] = (PokeCard);

/***/ })

})
//# sourceMappingURL=index.js.c4738a2bf4c697ddce82.hot-update.js.map