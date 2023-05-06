"use strict";
(self["webpackChunkto_do_list_project"] = self["webpackChunkto_do_list_project"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tasksToDo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasksToDo.js */ "./src/tasksToDo.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _img_reload_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/reload.png */ "./src/img/reload.png");
/* harmony import */ var _img_enter_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./img/enter.png */ "./src/img/enter.png");
/* harmony import */ var _img_more_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./img/more.png */ "./src/img/more.png");
/* harmony import */ var _img_trash_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./img/trash.png */ "./src/img/trash.png");






const task = new _tasksToDo_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const localTasks = JSON.parse(localStorage.getItem('localTasks'));
const items = document.querySelector('.items');
if (localTasks != null) {
  localTasks.forEach(localtask => {
    const obj = {
      desc: localtask.desc,
      completed: localtask.completed,
      index: localtask.index
    };
    task.arrayTasks.push(obj);
    items.innerHTML += `<form class='item item${localtask.index}'>
      <div class='item-desc'><div class='check'><input type='checkbox' id='check${localtask.index}' class='checkbox'></div><input type='text' id='desc${localtask.index}' class='desc' value='${localtask.desc}'></div>
      <div class='hamburger'><img class='hamburger-image hamburger-image${localtask.index}' src='img/more.png' alt='hamburger'> <img class='trash-image trash-image${localtask.index}' src='img/trash.png' alt='trash'></div>
      </form>`;
  });
}
const submitButton = document.querySelector('.add-input');
submitButton.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    task.newTask(submitButton.value, false, task.arrayTasks.length);
  }
});
task.displayTasks();
const trashBtn = document.querySelectorAll('.trash-image');
task.deleteTask(trashBtn);
const descInput = document.querySelectorAll('.desc');
task.updateTasksList(descInput);
const reloadBtn = document.querySelector('.reload-image');
task.reloadTasks(reloadBtn);
const completed = document.querySelectorAll('.checkbox');
task.completeTask(completed);
const btnClear = document.querySelector('.btn-clear');
const checkedBox = [];
task.arrayTasks.forEach((completedTask, idx) => {
  if (completedTask.completed === true) {
    checkedBox.push(idx);
  }
});
task.clearList(btnClear, checkedBox);

/***/ }),

/***/ "./src/tasksToDo.js":
/*!**************************!*\
  !*** ./src/tasksToDo.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TasksToDo)
/* harmony export */ });
class TasksToDo {
  constructor() {
    this.arrayTasks = [];
  }
  newTask = (desc, completed, index) => {
    const task = {
      desc,
      completed,
      index
    };
    this.arrayTasks.push(task);
    localStorage.setItem('localTasks', JSON.stringify(this.arrayTasks));
    window.location.reload();
  };
  displayTasks = () => {
    const tasks = document.querySelectorAll('.item');
    tasks.forEach((item, index) => {
      item.addEventListener('click', () => {
        const itemContent = document.querySelector(`.item${index}`);
        const trashImage = document.querySelector(`.trash-image${index}`);
        const moreImage = document.querySelector(`.hamburger-image${index}`);
        const selected = document.querySelector('.selected');
        const trashImageActive = document.querySelector('.trash-image-show');
        const moreImageHide = document.querySelector('.more-image-hide');
        if (selected != null) {
          selected.classList.remove('selected');
          trashImageActive.classList.remove('trash-image-show');
          moreImageHide.classList.remove('more-image-hide');
        }
        itemContent.classList.add('selected');
        trashImage.classList.add('trash-image-show');
        moreImage.classList.add('more-image-hide');
      });
    });
  };
  adjustDescription = () => {
    let lenght = 0;
    this.arrayTasks.forEach(item => {
      // eslint-disable-next-line no-self-assign
      item.desc = item.desc;
      item.index = lenght;
      // eslint-disable-next-line no-self-assign
      item.completed = item.completed;
      lenght += 1;
    });
  };
  deleteTask = btn => {
    btn.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        this.arrayTasks = this.arrayTasks.filter((item, i) => i !== index);
        this.adjustDescription();
        localStorage.setItem('localTasks', JSON.stringify(this.arrayTasks));
        window.location.reload();
      });
    });
  };
  updateTasksList = iDescription => {
    iDescription.forEach((desc, index) => {
      desc.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
          this.arrayTasks[index].desc = desc.value;
          localStorage.setItem('localTasks', JSON.stringify(this.arrayTasks));
          window.location.reload();
        }
      });
    });
  };
  reloadTasks = rTBtn => {
    rTBtn.addEventListener('click', () => {
      window.location.reload();
    });
  };
  completeTask = checkBox => {
    checkBox.forEach((item, index) => {
      const descInput = document.querySelector(`.desc${index}`);
      item.addEventListener('change', () => {
        if (descInput) {
          if (item.checked === true) {
            this.arrayTasks[index].completed = true;
            localStorage.setItem('localTasks', JSON.stringify(this.arrayTasks));
            descInput.classList.add('completed');
          } else {
            this.arrayTasks[index].completed = false;
            localStorage.setItem('localTasks', JSON.stringify(this.arrayTasks));
            descInput.classList.remove('completed');
          }
          window.location.reload();
        }
      });
    });
  };
  clearList = (btn, checkIndex) => {
    btn.addEventListener('click', () => {
      const elements = this.arrayTasks.filter((item, index) => checkIndex.indexOf(index) === -1);
      this.arrayTasks = elements;
      this.adjustDescription();
      localStorage.setItem('localTasks', JSON.stringify(this.arrayTasks));
      window.location.reload();
    });
  };
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*,\r\n::before,\r\n::after {\r\n  box-sizing: border-box;\r\n  font-family: \"Poppins\", sans-serif;\r\n}\r\n\r\nbody {\r\n  background-color: #e5e5e5;\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin-top: 10rem;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 40%;\r\n  background-color: #fff;\r\n  box-shadow: 5px 10px 8px 10px #888;\r\n}\r\n\r\n.header {\r\n  display: flex;\r\n  width: 100%;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 10px;\r\n  border-bottom: 2px solid #d4d2d2;\r\n}\r\n\r\n.header-name {\r\n  font-size: 20px;\r\n}\r\n\r\n.reload-image {\r\n  width: 20px;\r\n  height: 20px;\r\n}\r\n\r\n.to-do-items {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 100%;\r\n  margin-top: 10px;\r\n}\r\n\r\n.add {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  width: 100%;\r\n  padding: 10px;\r\n  border-bottom: 2px solid #d4d2d2;\r\n}\r\n\r\n.enter-image {\r\n  width: 20px;\r\n  height: 20px;\r\n}\r\n\r\n::-webkit-input-placeholder {\r\n  font-style: italic;\r\n}\r\n\r\n.add-input {\r\n  border-top-style: hidden;\r\n  border-right-style: hidden;\r\n  border-left-style: hidden;\r\n  border-bottom-style: none;\r\n  outline: none;\r\n  font-size: 16px;\r\n}\r\n\r\n.desc {\r\n  width: 100%;\r\n  border-top-style: hidden;\r\n  border-right-style: hidden;\r\n  border-left-style: hidden;\r\n  border-bottom-style: none;\r\n  outline: none;\r\n  background-color: transparent;\r\n  font-size: 16px;\r\n}\r\n\r\n.items {\r\n  width: 100%;\r\n}\r\n\r\n.item {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  width: 100%;\r\n  border-bottom: 2px solid #d4d2d2;\r\n  padding: 10px;\r\n}\r\n\r\n.item-desc {\r\n  display: flex;\r\n  gap: 15px;\r\n}\r\n\r\n.hamburger-image {\r\n  width: 30px;\r\n  height: 30px;\r\n}\r\n\r\n.trash-image {\r\n  width: 30px;\r\n  height: 30px;\r\n  display: none;\r\n}\r\n\r\n.trash-image-show {\r\n  display: inline;\r\n}\r\n\r\n.more-image-hide {\r\n  display: none;\r\n}\r\n\r\n.clear {\r\n  width: 100%;\r\n}\r\n\r\n.btn-clear {\r\n  width: 100%;\r\n  font-size: 18px;\r\n  color: #777575;\r\n  height: 50px;\r\n}\r\n\r\n.selected {\r\n  background-color: #fffec4;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAEA;;;EAGE,sBAAsB;EACtB,kCAAkC;AACpC;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,iBAAiB;EACjB,mBAAmB;EACnB,uBAAuB;EACvB,UAAU;EACV,sBAAsB;EACtB,kCAAkC;AACpC;;AAEA;EACE,aAAa;EACb,WAAW;EACX,8BAA8B;EAC9B,mBAAmB;EACnB,aAAa;EACb,gCAAgC;AAClC;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,WAAW;EACX,aAAa;EACb,gCAAgC;AAClC;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,0BAA0B;EAC1B,yBAAyB;EACzB,yBAAyB;EACzB,aAAa;EACb,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,wBAAwB;EACxB,0BAA0B;EAC1B,yBAAyB;EACzB,yBAAyB;EACzB,aAAa;EACb,6BAA6B;EAC7B,eAAe;AACjB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,WAAW;EACX,gCAAgC;EAChC,aAAa;AACf;;AAEA;EACE,aAAa;EACb,SAAS;AACX;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;EACX,eAAe;EACf,cAAc;EACd,YAAY;AACd;;AAEA;EACE,yBAAyB;AAC3B","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap\");\r\n\r\n*,\r\n::before,\r\n::after {\r\n  box-sizing: border-box;\r\n  font-family: \"Poppins\", sans-serif;\r\n}\r\n\r\nbody {\r\n  background-color: #e5e5e5;\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin-top: 10rem;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 40%;\r\n  background-color: #fff;\r\n  box-shadow: 5px 10px 8px 10px #888;\r\n}\r\n\r\n.header {\r\n  display: flex;\r\n  width: 100%;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 10px;\r\n  border-bottom: 2px solid #d4d2d2;\r\n}\r\n\r\n.header-name {\r\n  font-size: 20px;\r\n}\r\n\r\n.reload-image {\r\n  width: 20px;\r\n  height: 20px;\r\n}\r\n\r\n.to-do-items {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 100%;\r\n  margin-top: 10px;\r\n}\r\n\r\n.add {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  width: 100%;\r\n  padding: 10px;\r\n  border-bottom: 2px solid #d4d2d2;\r\n}\r\n\r\n.enter-image {\r\n  width: 20px;\r\n  height: 20px;\r\n}\r\n\r\n::-webkit-input-placeholder {\r\n  font-style: italic;\r\n}\r\n\r\n.add-input {\r\n  border-top-style: hidden;\r\n  border-right-style: hidden;\r\n  border-left-style: hidden;\r\n  border-bottom-style: none;\r\n  outline: none;\r\n  font-size: 16px;\r\n}\r\n\r\n.desc {\r\n  width: 100%;\r\n  border-top-style: hidden;\r\n  border-right-style: hidden;\r\n  border-left-style: hidden;\r\n  border-bottom-style: none;\r\n  outline: none;\r\n  background-color: transparent;\r\n  font-size: 16px;\r\n}\r\n\r\n.items {\r\n  width: 100%;\r\n}\r\n\r\n.item {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  width: 100%;\r\n  border-bottom: 2px solid #d4d2d2;\r\n  padding: 10px;\r\n}\r\n\r\n.item-desc {\r\n  display: flex;\r\n  gap: 15px;\r\n}\r\n\r\n.hamburger-image {\r\n  width: 30px;\r\n  height: 30px;\r\n}\r\n\r\n.trash-image {\r\n  width: 30px;\r\n  height: 30px;\r\n  display: none;\r\n}\r\n\r\n.trash-image-show {\r\n  display: inline;\r\n}\r\n\r\n.more-image-hide {\r\n  display: none;\r\n}\r\n\r\n.clear {\r\n  width: 100%;\r\n}\r\n\r\n.btn-clear {\r\n  width: 100%;\r\n  font-size: 18px;\r\n  color: #777575;\r\n  height: 50px;\r\n}\r\n\r\n.selected {\r\n  background-color: #fffec4;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/img/enter.png":
/*!***************************!*\
  !*** ./src/img/enter.png ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "img/enter.png");

/***/ }),

/***/ "./src/img/more.png":
/*!**************************!*\
  !*** ./src/img/more.png ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "img/more.png");

/***/ }),

/***/ "./src/img/reload.png":
/*!****************************!*\
  !*** ./src/img/reload.png ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "img/reload.png");

/***/ }),

/***/ "./src/img/trash.png":
/*!***************************!*\
  !*** ./src/img/trash.png ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "img/trash.png");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
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
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
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
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvX2RvX2xpc3RfcHJvamVjdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3Byb2plY3QvLi9zcmMvdGFza3NUb0RvLmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcHJvamVjdC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3Byb2plY3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3Byb2plY3QvLi9zcmMvaW1nL2VudGVyLnBuZyIsIndlYnBhY2s6Ly90b19kb19saXN0X3Byb2plY3QvLi9zcmMvaW1nL21vcmUucG5nIiwid2VicGFjazovL3RvX2RvX2xpc3RfcHJvamVjdC8uL3NyYy9pbWcvcmVsb2FkLnBuZyIsIndlYnBhY2s6Ly90b19kb19saXN0X3Byb2plY3QvLi9zcmMvaW1nL3RyYXNoLnBuZyIsIndlYnBhY2s6Ly90b19kb19saXN0X3Byb2plY3QvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3Byb2plY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3Byb2plY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFza3NUb0RvIGZyb20gJy4vdGFza3NUb0RvLmpzJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0ICcuL2ltZy9yZWxvYWQucG5nJztcbmltcG9ydCAnLi9pbWcvZW50ZXIucG5nJztcbmltcG9ydCAnLi9pbWcvbW9yZS5wbmcnO1xuaW1wb3J0ICcuL2ltZy90cmFzaC5wbmcnO1xuXG5jb25zdCB0YXNrID0gbmV3IFRhc2tzVG9EbygpO1xuY29uc3QgbG9jYWxUYXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvY2FsVGFza3MnKSk7XG5jb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pdGVtcycpO1xuXG5pZiAobG9jYWxUYXNrcyAhPSBudWxsKSB7XG4gIGxvY2FsVGFza3MuZm9yRWFjaCgobG9jYWx0YXNrKSA9PiB7XG4gICAgY29uc3Qgb2JqID0ge1xuICAgICAgZGVzYzogbG9jYWx0YXNrLmRlc2MsXG4gICAgICBjb21wbGV0ZWQ6IGxvY2FsdGFzay5jb21wbGV0ZWQsXG4gICAgICBpbmRleDogbG9jYWx0YXNrLmluZGV4LFxuICAgIH07XG4gICAgdGFzay5hcnJheVRhc2tzLnB1c2gob2JqKTtcbiAgICBpdGVtcy5pbm5lckhUTUwgKz0gYDxmb3JtIGNsYXNzPSdpdGVtIGl0ZW0ke2xvY2FsdGFzay5pbmRleH0nPlxuICAgICAgPGRpdiBjbGFzcz0naXRlbS1kZXNjJz48ZGl2IGNsYXNzPSdjaGVjayc+PGlucHV0IHR5cGU9J2NoZWNrYm94JyBpZD0nY2hlY2ske2xvY2FsdGFzay5pbmRleH0nIGNsYXNzPSdjaGVja2JveCc+PC9kaXY+PGlucHV0IHR5cGU9J3RleHQnIGlkPSdkZXNjJHtsb2NhbHRhc2suaW5kZXh9JyBjbGFzcz0nZGVzYycgdmFsdWU9JyR7bG9jYWx0YXNrLmRlc2N9Jz48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9J2hhbWJ1cmdlcic+PGltZyBjbGFzcz0naGFtYnVyZ2VyLWltYWdlIGhhbWJ1cmdlci1pbWFnZSR7bG9jYWx0YXNrLmluZGV4fScgc3JjPSdpbWcvbW9yZS5wbmcnIGFsdD0naGFtYnVyZ2VyJz4gPGltZyBjbGFzcz0ndHJhc2gtaW1hZ2UgdHJhc2gtaW1hZ2Uke2xvY2FsdGFzay5pbmRleH0nIHNyYz0naW1nL3RyYXNoLnBuZycgYWx0PSd0cmFzaCc+PC9kaXY+XG4gICAgICA8L2Zvcm0+YDtcbiAgfSk7XG59XG5cbmNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtaW5wdXQnKTtcbnN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChldmVudCkgPT4ge1xuICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgdGFzay5uZXdUYXNrKHN1Ym1pdEJ1dHRvbi52YWx1ZSwgZmFsc2UsIHRhc2suYXJyYXlUYXNrcy5sZW5ndGgpO1xuICB9XG59KTtcblxudGFzay5kaXNwbGF5VGFza3MoKTtcblxuY29uc3QgdHJhc2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHJhc2gtaW1hZ2UnKTtcbnRhc2suZGVsZXRlVGFzayh0cmFzaEJ0bik7XG5cbmNvbnN0IGRlc2NJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZXNjJyk7XG50YXNrLnVwZGF0ZVRhc2tzTGlzdChkZXNjSW5wdXQpO1xuXG5jb25zdCByZWxvYWRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVsb2FkLWltYWdlJyk7XG50YXNrLnJlbG9hZFRhc2tzKHJlbG9hZEJ0bik7XG5cbmNvbnN0IGNvbXBsZXRlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVja2JveCcpO1xudGFzay5jb21wbGV0ZVRhc2soY29tcGxldGVkKTtcblxuY29uc3QgYnRuQ2xlYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWNsZWFyJyk7XG5jb25zdCBjaGVja2VkQm94ID0gW107XG50YXNrLmFycmF5VGFza3MuZm9yRWFjaCgoY29tcGxldGVkVGFzaywgaWR4KSA9PiB7XG4gIGlmIChjb21wbGV0ZWRUYXNrLmNvbXBsZXRlZCA9PT0gdHJ1ZSkge1xuICAgIGNoZWNrZWRCb3gucHVzaChpZHgpO1xuICB9XG59KTtcblxudGFzay5jbGVhckxpc3QoYnRuQ2xlYXIsIGNoZWNrZWRCb3gpO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza3NUb0RvIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hcnJheVRhc2tzID0gW107XG4gIH1cblxuICBuZXdUYXNrID0gKGRlc2MsIGNvbXBsZXRlZCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCB0YXNrID0ge1xuICAgICAgZGVzYyxcbiAgICAgIGNvbXBsZXRlZCxcbiAgICAgIGluZGV4LFxuICAgIH07XG4gICAgdGhpcy5hcnJheVRhc2tzLnB1c2godGFzayk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvY2FsVGFza3MnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmFycmF5VGFza3MpKTtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH07XG5cbiAgZGlzcGxheVRhc2tzID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLml0ZW0nKTtcbiAgICB0YXNrcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgaXRlbUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuaXRlbSR7aW5kZXh9YCk7XG4gICAgICAgIGNvbnN0IHRyYXNoSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudHJhc2gtaW1hZ2Uke2luZGV4fWApO1xuICAgICAgICBjb25zdCBtb3JlSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuaGFtYnVyZ2VyLWltYWdlJHtpbmRleH1gKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQnKTtcbiAgICAgICAgY29uc3QgdHJhc2hJbWFnZUFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50cmFzaC1pbWFnZS1zaG93Jyk7XG4gICAgICAgIGNvbnN0IG1vcmVJbWFnZUhpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9yZS1pbWFnZS1oaWRlJyk7XG4gICAgICAgIGlmIChzZWxlY3RlZCAhPSBudWxsKSB7XG4gICAgICAgICAgc2VsZWN0ZWQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICB0cmFzaEltYWdlQWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ3RyYXNoLWltYWdlLXNob3cnKTtcbiAgICAgICAgICBtb3JlSW1hZ2VIaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ21vcmUtaW1hZ2UtaGlkZScpO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW1Db250ZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgIHRyYXNoSW1hZ2UuY2xhc3NMaXN0LmFkZCgndHJhc2gtaW1hZ2Utc2hvdycpO1xuICAgICAgICBtb3JlSW1hZ2UuY2xhc3NMaXN0LmFkZCgnbW9yZS1pbWFnZS1oaWRlJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkanVzdERlc2NyaXB0aW9uID0gKCkgPT4ge1xuICAgIGxldCBsZW5naHQgPSAwO1xuICAgIHRoaXMuYXJyYXlUYXNrcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1hc3NpZ25cbiAgICAgIGl0ZW0uZGVzYyA9IGl0ZW0uZGVzYztcbiAgICAgIGl0ZW0uaW5kZXggPSBsZW5naHQ7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1hc3NpZ25cbiAgICAgIGl0ZW0uY29tcGxldGVkID0gaXRlbS5jb21wbGV0ZWQ7XG4gICAgICBsZW5naHQgKz0gMTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZVRhc2sgPSAoYnRuKSA9PiB7XG4gICAgYnRuLmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcbiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdGhpcy5hcnJheVRhc2tzID0gdGhpcy5hcnJheVRhc2tzLmZpbHRlcigoaXRlbSwgaSkgPT4gaSAhPT0gaW5kZXgpO1xuICAgICAgICB0aGlzLmFkanVzdERlc2NyaXB0aW9uKCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2NhbFRhc2tzJywgSlNPTi5zdHJpbmdpZnkodGhpcy5hcnJheVRhc2tzKSk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlVGFza3NMaXN0ID0gKGlEZXNjcmlwdGlvbikgPT4ge1xuICAgIGlEZXNjcmlwdGlvbi5mb3JFYWNoKChkZXNjLCBpbmRleCkgPT4ge1xuICAgICAgZGVzYy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgdGhpcy5hcnJheVRhc2tzW2luZGV4XS5kZXNjID0gZGVzYy52YWx1ZTtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9jYWxUYXNrcycsIEpTT04uc3RyaW5naWZ5KHRoaXMuYXJyYXlUYXNrcykpO1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZWxvYWRUYXNrcyA9IChyVEJ0bikgPT4ge1xuICAgIHJUQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgY29tcGxldGVUYXNrID0gKGNoZWNrQm94KSA9PiB7XG4gICAgY2hlY2tCb3guZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGRlc2NJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5kZXNjJHtpbmRleH1gKTtcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBpZiAoZGVzY0lucHV0KSB7XG4gICAgICAgICAgaWYgKGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5hcnJheVRhc2tzW2luZGV4XS5jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvY2FsVGFza3MnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmFycmF5VGFza3MpKTtcbiAgICAgICAgICAgIGRlc2NJbnB1dC5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcnJheVRhc2tzW2luZGV4XS5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2NhbFRhc2tzJywgSlNPTi5zdHJpbmdpZnkodGhpcy5hcnJheVRhc2tzKSk7XG4gICAgICAgICAgICBkZXNjSW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnY29tcGxldGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjbGVhckxpc3QgPSAoYnRuLCBjaGVja0luZGV4KSA9PiB7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudHMgPSB0aGlzLmFycmF5VGFza3MuZmlsdGVyKChpdGVtLCBpbmRleCkgPT4gY2hlY2tJbmRleC5pbmRleE9mKGluZGV4KSA9PT0gLTEpO1xuICAgICAgdGhpcy5hcnJheVRhc2tzID0gZWxlbWVudHM7XG4gICAgICB0aGlzLmFkanVzdERlc2NyaXB0aW9uKCk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9jYWxUYXNrcycsIEpTT04uc3RyaW5naWZ5KHRoaXMuYXJyYXlUYXNrcykpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuICB9XG59IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Qb3BwaW5zOndnaHRANTAwOzYwMDs3MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKixcXHJcXG46OmJlZm9yZSxcXHJcXG46OmFmdGVyIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBmb250LWZhbWlseTogXFxcIlBvcHBpbnNcXFwiLCBzYW5zLXNlcmlmO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlNWU1ZTU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIG1hcmdpbi10b3A6IDEwcmVtO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgd2lkdGg6IDQwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxyXFxuICBib3gtc2hhZG93OiA1cHggMTBweCA4cHggMTBweCAjODg4O1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNkNGQyZDI7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXItbmFtZSB7XFxyXFxuICBmb250LXNpemU6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi5yZWxvYWQtaW1hZ2Uge1xcclxcbiAgd2lkdGg6IDIwcHg7XFxyXFxuICBoZWlnaHQ6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi50by1kby1pdGVtcyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5hZGQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2Q0ZDJkMjtcXHJcXG59XFxyXFxuXFxyXFxuLmVudGVyLWltYWdlIHtcXHJcXG4gIHdpZHRoOiAyMHB4O1xcclxcbiAgaGVpZ2h0OiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG46Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbn1cXHJcXG5cXHJcXG4uYWRkLWlucHV0IHtcXHJcXG4gIGJvcmRlci10b3Atc3R5bGU6IGhpZGRlbjtcXHJcXG4gIGJvcmRlci1yaWdodC1zdHlsZTogaGlkZGVuO1xcclxcbiAgYm9yZGVyLWxlZnQtc3R5bGU6IGhpZGRlbjtcXHJcXG4gIGJvcmRlci1ib3R0b20tc3R5bGU6IG5vbmU7XFxyXFxuICBvdXRsaW5lOiBub25lO1xcclxcbiAgZm9udC1zaXplOiAxNnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZGVzYyB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGJvcmRlci10b3Atc3R5bGU6IGhpZGRlbjtcXHJcXG4gIGJvcmRlci1yaWdodC1zdHlsZTogaGlkZGVuO1xcclxcbiAgYm9yZGVyLWxlZnQtc3R5bGU6IGhpZGRlbjtcXHJcXG4gIGJvcmRlci1ib3R0b20tc3R5bGU6IG5vbmU7XFxyXFxuICBvdXRsaW5lOiBub25lO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxufVxcclxcblxcclxcbi5pdGVtcyB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLml0ZW0ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjZDRkMmQyO1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLml0ZW0tZGVzYyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZ2FwOiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaGFtYnVyZ2VyLWltYWdlIHtcXHJcXG4gIHdpZHRoOiAzMHB4O1xcclxcbiAgaGVpZ2h0OiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udHJhc2gtaW1hZ2Uge1xcclxcbiAgd2lkdGg6IDMwcHg7XFxyXFxuICBoZWlnaHQ6IDMwcHg7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4udHJhc2gtaW1hZ2Utc2hvdyB7XFxyXFxuICBkaXNwbGF5OiBpbmxpbmU7XFxyXFxufVxcclxcblxcclxcbi5tb3JlLWltYWdlLWhpZGUge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNsZWFyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuLWNsZWFyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgZm9udC1zaXplOiAxOHB4O1xcclxcbiAgY29sb3I6ICM3Nzc1NzU7XFxyXFxuICBoZWlnaHQ6IDUwcHg7XFxyXFxufVxcclxcblxcclxcbi5zZWxlY3RlZCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZWM0O1xcclxcbn1cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBOzs7RUFHRSxzQkFBc0I7RUFDdEIsa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsVUFBVTtFQUNWLHNCQUFzQjtFQUN0QixrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztFQUNYLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCxhQUFhO0VBQ2IsZ0NBQWdDO0FBQ2xDOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QiwwQkFBMEI7RUFDMUIseUJBQXlCO0VBQ3pCLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2IsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCx3QkFBd0I7RUFDeEIsMEJBQTBCO0VBQzFCLHlCQUF5QjtFQUN6Qix5QkFBeUI7RUFDekIsYUFBYTtFQUNiLDZCQUE2QjtFQUM3QixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGdDQUFnQztFQUNoQyxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsU0FBUztBQUNYOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osYUFBYTtBQUNmOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxlQUFlO0VBQ2YsY0FBYztFQUNkLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybChcXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Qb3BwaW5zOndnaHRANTAwOzYwMDs3MDAmZGlzcGxheT1zd2FwXFxcIik7XFxyXFxuXFxyXFxuKixcXHJcXG46OmJlZm9yZSxcXHJcXG46OmFmdGVyIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBmb250LWZhbWlseTogXFxcIlBvcHBpbnNcXFwiLCBzYW5zLXNlcmlmO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlNWU1ZTU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIG1hcmdpbi10b3A6IDEwcmVtO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgd2lkdGg6IDQwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxyXFxuICBib3gtc2hhZG93OiA1cHggMTBweCA4cHggMTBweCAjODg4O1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNkNGQyZDI7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXItbmFtZSB7XFxyXFxuICBmb250LXNpemU6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi5yZWxvYWQtaW1hZ2Uge1xcclxcbiAgd2lkdGg6IDIwcHg7XFxyXFxuICBoZWlnaHQ6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi50by1kby1pdGVtcyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5hZGQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2Q0ZDJkMjtcXHJcXG59XFxyXFxuXFxyXFxuLmVudGVyLWltYWdlIHtcXHJcXG4gIHdpZHRoOiAyMHB4O1xcclxcbiAgaGVpZ2h0OiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG46Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbn1cXHJcXG5cXHJcXG4uYWRkLWlucHV0IHtcXHJcXG4gIGJvcmRlci10b3Atc3R5bGU6IGhpZGRlbjtcXHJcXG4gIGJvcmRlci1yaWdodC1zdHlsZTogaGlkZGVuO1xcclxcbiAgYm9yZGVyLWxlZnQtc3R5bGU6IGhpZGRlbjtcXHJcXG4gIGJvcmRlci1ib3R0b20tc3R5bGU6IG5vbmU7XFxyXFxuICBvdXRsaW5lOiBub25lO1xcclxcbiAgZm9udC1zaXplOiAxNnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZGVzYyB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGJvcmRlci10b3Atc3R5bGU6IGhpZGRlbjtcXHJcXG4gIGJvcmRlci1yaWdodC1zdHlsZTogaGlkZGVuO1xcclxcbiAgYm9yZGVyLWxlZnQtc3R5bGU6IGhpZGRlbjtcXHJcXG4gIGJvcmRlci1ib3R0b20tc3R5bGU6IG5vbmU7XFxyXFxuICBvdXRsaW5lOiBub25lO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxufVxcclxcblxcclxcbi5pdGVtcyB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLml0ZW0ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjZDRkMmQyO1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLml0ZW0tZGVzYyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZ2FwOiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaGFtYnVyZ2VyLWltYWdlIHtcXHJcXG4gIHdpZHRoOiAzMHB4O1xcclxcbiAgaGVpZ2h0OiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udHJhc2gtaW1hZ2Uge1xcclxcbiAgd2lkdGg6IDMwcHg7XFxyXFxuICBoZWlnaHQ6IDMwcHg7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4udHJhc2gtaW1hZ2Utc2hvdyB7XFxyXFxuICBkaXNwbGF5OiBpbmxpbmU7XFxyXFxufVxcclxcblxcclxcbi5tb3JlLWltYWdlLWhpZGUge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNsZWFyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuLWNsZWFyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgZm9udC1zaXplOiAxOHB4O1xcclxcbiAgY29sb3I6ICM3Nzc1NzU7XFxyXFxuICBoZWlnaHQ6IDUwcHg7XFxyXFxufVxcclxcblxcclxcbi5zZWxlY3RlZCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZWM0O1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvZW50ZXIucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9tb3JlLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvcmVsb2FkLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvdHJhc2gucG5nXCI7IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiVGFza3NUb0RvIiwidGFzayIsImxvY2FsVGFza3MiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiaXRlbXMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJmb3JFYWNoIiwibG9jYWx0YXNrIiwib2JqIiwiZGVzYyIsImNvbXBsZXRlZCIsImluZGV4IiwiYXJyYXlUYXNrcyIsInB1c2giLCJpbm5lckhUTUwiLCJzdWJtaXRCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJrZXkiLCJuZXdUYXNrIiwidmFsdWUiLCJsZW5ndGgiLCJkaXNwbGF5VGFza3MiLCJ0cmFzaEJ0biIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkZWxldGVUYXNrIiwiZGVzY0lucHV0IiwidXBkYXRlVGFza3NMaXN0IiwicmVsb2FkQnRuIiwicmVsb2FkVGFza3MiLCJjb21wbGV0ZVRhc2siLCJidG5DbGVhciIsImNoZWNrZWRCb3giLCJjb21wbGV0ZWRUYXNrIiwiaWR4IiwiY2xlYXJMaXN0IiwiY29uc3RydWN0b3IiLCJzZXRJdGVtIiwic3RyaW5naWZ5Iiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJ0YXNrcyIsIml0ZW0iLCJpdGVtQ29udGVudCIsInRyYXNoSW1hZ2UiLCJtb3JlSW1hZ2UiLCJzZWxlY3RlZCIsInRyYXNoSW1hZ2VBY3RpdmUiLCJtb3JlSW1hZ2VIaWRlIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiYWRqdXN0RGVzY3JpcHRpb24iLCJsZW5naHQiLCJidG4iLCJmaWx0ZXIiLCJpIiwiaURlc2NyaXB0aW9uIiwiclRCdG4iLCJjaGVja0JveCIsImNoZWNrZWQiLCJjaGVja0luZGV4IiwiZWxlbWVudHMiLCJpbmRleE9mIl0sInNvdXJjZVJvb3QiOiIifQ==