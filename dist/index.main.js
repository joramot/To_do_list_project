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
    if (localtask.completed === true) {
      items.innerHTML += `<form class='item item${localtask.index}'>
      <div class='item-desc'><div class='check'><input type='checkbox' id='check${localtask.index}' class='checkbox'></div><input type='text' id='desc${localtask.index}' class='desc' value='${localtask.desc}'></div>
      <div class='hamburger'><img class='hamburger-image hamburger-image${localtask.index}' src='img/more.png' alt='hamburger'> <img class='trash-image trash-image${localtask.index}' src='img/trash.png' alt='trash'></div>
      </form>`;
    } else {
      items.innerHTML += `<form class='item item${localtask.index}'>
    <div class='item-desc'><div class='check'><input type='checkbox' id='check${localtask.index}' class='checkbox checkbox${localtask.index}'></div><input type='text' id='desc${localtask.index}' class='desc desc${localtask.index}' value='${localtask.desc}'></div>
    <div class='hamburger'><img class='hamburger-image hamburger-image${localtask.index}' src='img/more.png' alt='hamburger'> <img class='trash-image trash-image${localtask.index}' src='img/trash.png' alt='trash'></div>
    </form>`;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbkZhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvX2RvX2xpc3RfcHJvamVjdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3Byb2plY3QvLi9zcmMvdGFza3NUb0RvLmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcHJvamVjdC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3Byb2plY3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3Byb2plY3QvLi9zcmMvaW1nL2VudGVyLnBuZyIsIndlYnBhY2s6Ly90b19kb19saXN0X3Byb2plY3QvLi9zcmMvaW1nL21vcmUucG5nIiwid2VicGFjazovL3RvX2RvX2xpc3RfcHJvamVjdC8uL3NyYy9pbWcvcmVsb2FkLnBuZyIsIndlYnBhY2s6Ly90b19kb19saXN0X3Byb2plY3QvLi9zcmMvaW1nL3RyYXNoLnBuZyIsIndlYnBhY2s6Ly90b19kb19saXN0X3Byb2plY3QvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3Byb2plY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3Byb2plY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFza3NUb0RvIGZyb20gJy4vdGFza3NUb0RvLmpzJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0ICcuL2ltZy9yZWxvYWQucG5nJztcbmltcG9ydCAnLi9pbWcvZW50ZXIucG5nJztcbmltcG9ydCAnLi9pbWcvbW9yZS5wbmcnO1xuaW1wb3J0ICcuL2ltZy90cmFzaC5wbmcnO1xuXG5jb25zdCB0YXNrID0gbmV3IFRhc2tzVG9EbygpO1xuY29uc3QgbG9jYWxUYXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvY2FsVGFza3MnKSk7XG5jb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pdGVtcycpO1xuXG5pZiAobG9jYWxUYXNrcyAhPSBudWxsKSB7XG4gIGxvY2FsVGFza3MuZm9yRWFjaCgobG9jYWx0YXNrKSA9PiB7XG4gICAgY29uc3Qgb2JqID0ge1xuICAgICAgZGVzYzogbG9jYWx0YXNrLmRlc2MsXG4gICAgICBjb21wbGV0ZWQ6IGxvY2FsdGFzay5jb21wbGV0ZWQsXG4gICAgICBpbmRleDogbG9jYWx0YXNrLmluZGV4LFxuICAgIH07XG4gICAgdGFzay5hcnJheVRhc2tzLnB1c2gob2JqKTtcbiAgICBpZiAobG9jYWx0YXNrLmNvbXBsZXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgaXRlbXMuaW5uZXJIVE1MICs9IGA8Zm9ybSBjbGFzcz0naXRlbSBpdGVtJHtsb2NhbHRhc2suaW5kZXh9Jz5cbiAgICAgIDxkaXYgY2xhc3M9J2l0ZW0tZGVzYyc+PGRpdiBjbGFzcz0nY2hlY2snPjxpbnB1dCB0eXBlPSdjaGVja2JveCcgaWQ9J2NoZWNrJHtsb2NhbHRhc2suaW5kZXh9JyBjbGFzcz0nY2hlY2tib3gnPjwvZGl2PjxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nZGVzYyR7bG9jYWx0YXNrLmluZGV4fScgY2xhc3M9J2Rlc2MnIHZhbHVlPScke2xvY2FsdGFzay5kZXNjfSc+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPSdoYW1idXJnZXInPjxpbWcgY2xhc3M9J2hhbWJ1cmdlci1pbWFnZSBoYW1idXJnZXItaW1hZ2Uke2xvY2FsdGFzay5pbmRleH0nIHNyYz0naW1nL21vcmUucG5nJyBhbHQ9J2hhbWJ1cmdlcic+IDxpbWcgY2xhc3M9J3RyYXNoLWltYWdlIHRyYXNoLWltYWdlJHtsb2NhbHRhc2suaW5kZXh9JyBzcmM9J2ltZy90cmFzaC5wbmcnIGFsdD0ndHJhc2gnPjwvZGl2PlxuICAgICAgPC9mb3JtPmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZW1zLmlubmVySFRNTCArPSBgPGZvcm0gY2xhc3M9J2l0ZW0gaXRlbSR7bG9jYWx0YXNrLmluZGV4fSc+XG4gICAgPGRpdiBjbGFzcz0naXRlbS1kZXNjJz48ZGl2IGNsYXNzPSdjaGVjayc+PGlucHV0IHR5cGU9J2NoZWNrYm94JyBpZD0nY2hlY2ske2xvY2FsdGFzay5pbmRleH0nIGNsYXNzPSdjaGVja2JveCBjaGVja2JveCR7bG9jYWx0YXNrLmluZGV4fSc+PC9kaXY+PGlucHV0IHR5cGU9J3RleHQnIGlkPSdkZXNjJHtsb2NhbHRhc2suaW5kZXh9JyBjbGFzcz0nZGVzYyBkZXNjJHtsb2NhbHRhc2suaW5kZXh9JyB2YWx1ZT0nJHtsb2NhbHRhc2suZGVzY30nPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9J2hhbWJ1cmdlcic+PGltZyBjbGFzcz0naGFtYnVyZ2VyLWltYWdlIGhhbWJ1cmdlci1pbWFnZSR7bG9jYWx0YXNrLmluZGV4fScgc3JjPSdpbWcvbW9yZS5wbmcnIGFsdD0naGFtYnVyZ2VyJz4gPGltZyBjbGFzcz0ndHJhc2gtaW1hZ2UgdHJhc2gtaW1hZ2Uke2xvY2FsdGFzay5pbmRleH0nIHNyYz0naW1nL3RyYXNoLnBuZycgYWx0PSd0cmFzaCc+PC9kaXY+XG4gICAgPC9mb3JtPmA7XG4gICAgfVxuICB9KTtcbn1cblxuY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1pbnB1dCcpO1xuc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGV2ZW50KSA9PiB7XG4gIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICB0YXNrLm5ld1Rhc2soc3VibWl0QnV0dG9uLnZhbHVlLCBmYWxzZSwgdGFzay5hcnJheVRhc2tzLmxlbmd0aCk7XG4gIH1cbn0pO1xuXG50YXNrLmRpc3BsYXlUYXNrcygpO1xuXG5jb25zdCB0cmFzaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50cmFzaC1pbWFnZScpO1xudGFzay5kZWxldGVUYXNrKHRyYXNoQnRuKTtcblxuY29uc3QgZGVzY0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlc2MnKTtcbnRhc2sudXBkYXRlVGFza3NMaXN0KGRlc2NJbnB1dCk7XG5cbmNvbnN0IHJlbG9hZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZWxvYWQtaW1hZ2UnKTtcbnRhc2sucmVsb2FkVGFza3MocmVsb2FkQnRuKTtcblxuY29uc3QgY29tcGxldGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNoZWNrYm94Jyk7XG50YXNrLmNvbXBsZXRlVGFzayhjb21wbGV0ZWQpO1xuXG5jb25zdCBidG5DbGVhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tY2xlYXInKTtcbmNvbnN0IGNoZWNrZWRCb3ggPSBbXTtcbnRhc2suYXJyYXlUYXNrcy5mb3JFYWNoKChjb21wbGV0ZWRUYXNrLCBpZHgpID0+IHtcbiAgaWYgKGNvbXBsZXRlZFRhc2suY29tcGxldGVkID09PSB0cnVlKSB7XG4gICAgY2hlY2tlZEJveC5wdXNoKGlkeCk7XG4gIH1cbn0pO1xuXG50YXNrLmNsZWFyTGlzdChidG5DbGVhciwgY2hlY2tlZEJveCk7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrc1RvRG8ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmFycmF5VGFza3MgPSBbXTtcbiAgfVxuXG4gIG5ld1Rhc2sgPSAoZGVzYywgY29tcGxldGVkLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHRhc2sgPSB7XG4gICAgICBkZXNjLFxuICAgICAgY29tcGxldGVkLFxuICAgICAgaW5kZXgsXG4gICAgfTtcbiAgICB0aGlzLmFycmF5VGFza3MucHVzaCh0YXNrKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9jYWxUYXNrcycsIEpTT04uc3RyaW5naWZ5KHRoaXMuYXJyYXlUYXNrcykpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfTtcblxuICBkaXNwbGF5VGFza3MgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaXRlbScpO1xuICAgIHRhc2tzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBpdGVtQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5pdGVtJHtpbmRleH1gKTtcbiAgICAgICAgY29uc3QgdHJhc2hJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC50cmFzaC1pbWFnZSR7aW5kZXh9YCk7XG4gICAgICAgIGNvbnN0IG1vcmVJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5oYW1idXJnZXItaW1hZ2Uke2luZGV4fWApO1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZCcpO1xuICAgICAgICBjb25zdCB0cmFzaEltYWdlQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRyYXNoLWltYWdlLXNob3cnKTtcbiAgICAgICAgY29uc3QgbW9yZUltYWdlSGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3JlLWltYWdlLWhpZGUnKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkICE9IG51bGwpIHtcbiAgICAgICAgICBzZWxlY3RlZC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgIHRyYXNoSW1hZ2VBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZSgndHJhc2gtaW1hZ2Utc2hvdycpO1xuICAgICAgICAgIG1vcmVJbWFnZUhpZGUuY2xhc3NMaXN0LnJlbW92ZSgnbW9yZS1pbWFnZS1oaWRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbUNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgdHJhc2hJbWFnZS5jbGFzc0xpc3QuYWRkKCd0cmFzaC1pbWFnZS1zaG93Jyk7XG4gICAgICAgIG1vcmVJbWFnZS5jbGFzc0xpc3QuYWRkKCdtb3JlLWltYWdlLWhpZGUnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRqdXN0RGVzY3JpcHRpb24gPSAoKSA9PiB7XG4gICAgbGV0IGxlbmdodCA9IDA7XG4gICAgdGhpcy5hcnJheVRhc2tzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWFzc2lnblxuICAgICAgaXRlbS5kZXNjID0gaXRlbS5kZXNjO1xuICAgICAgaXRlbS5pbmRleCA9IGxlbmdodDtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWFzc2lnblxuICAgICAgaXRlbS5jb21wbGV0ZWQgPSBpdGVtLmNvbXBsZXRlZDtcbiAgICAgIGxlbmdodCArPSAxO1xuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlVGFzayA9IChidG4pID0+IHtcbiAgICBidG4uZm9yRWFjaCgoYnRuLCBpbmRleCkgPT4ge1xuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmFycmF5VGFza3MgPSB0aGlzLmFycmF5VGFza3MuZmlsdGVyKChpdGVtLCBpKSA9PiBpICE9PSBpbmRleCk7XG4gICAgICAgIHRoaXMuYWRqdXN0RGVzY3JpcHRpb24oKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvY2FsVGFza3MnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmFycmF5VGFza3MpKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVUYXNrc0xpc3QgPSAoaURlc2NyaXB0aW9uKSA9PiB7XG4gICAgaURlc2NyaXB0aW9uLmZvckVhY2goKGRlc2MsIGluZGV4KSA9PiB7XG4gICAgICBkZXNjLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICB0aGlzLmFycmF5VGFza3NbaW5kZXhdLmRlc2MgPSBkZXNjLnZhbHVlO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2NhbFRhc2tzJywgSlNPTi5zdHJpbmdpZnkodGhpcy5hcnJheVRhc2tzKSk7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbG9hZFRhc2tzID0gKHJUQnRuKSA9PiB7XG4gICAgclRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG4gIH1cblxuICBjb21wbGV0ZVRhc2sgPSAoY2hlY2tCb3gpID0+IHtcbiAgICBjaGVja0JveC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZGVzY0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmRlc2Mke2luZGV4fWApO1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGlmIChkZXNjSW5wdXQpIHtcbiAgICAgICAgICBpZiAoaXRlbS5jaGVja2VkID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmFycmF5VGFza3NbaW5kZXhdLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9jYWxUYXNrcycsIEpTT04uc3RyaW5naWZ5KHRoaXMuYXJyYXlUYXNrcykpO1xuICAgICAgICAgICAgZGVzY0lucHV0LmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFycmF5VGFza3NbaW5kZXhdLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvY2FsVGFza3MnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmFycmF5VGFza3MpKTtcbiAgICAgICAgICAgIGRlc2NJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFyTGlzdCA9IChidG4sIGNoZWNrSW5kZXgpID0+IHtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50cyA9IHRoaXMuYXJyYXlUYXNrcy5maWx0ZXIoKGl0ZW0sIGluZGV4KSA9PiBjaGVja0luZGV4LmluZGV4T2YoaW5kZXgpID09PSAtMSk7XG4gICAgICB0aGlzLmFycmF5VGFza3MgPSBlbGVtZW50cztcbiAgICAgIHRoaXMuYWRqdXN0RGVzY3JpcHRpb24oKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2NhbFRhc2tzJywgSlNPTi5zdHJpbmdpZnkodGhpcy5hcnJheVRhc2tzKSk7XG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG4gIH1cbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBvcHBpbnM6d2dodEA1MDA7NjAwOzcwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqLFxcclxcbjo6YmVmb3JlLFxcclxcbjo6YWZ0ZXIge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUG9wcGluc1xcXCIsIHNhbnMtc2VyaWY7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZTVlNTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgbWFyZ2luLXRvcDogMTByZW07XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICB3aWR0aDogNDAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG4gIGJveC1zaGFkb3c6IDVweCAxMHB4IDhweCAxMHB4ICM4ODg7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2Q0ZDJkMjtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlci1uYW1lIHtcXHJcXG4gIGZvbnQtc2l6ZTogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnJlbG9hZC1pbWFnZSB7XFxyXFxuICB3aWR0aDogMjBweDtcXHJcXG4gIGhlaWdodDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvLWRvLWl0ZW1zIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmFkZCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjZDRkMmQyO1xcclxcbn1cXHJcXG5cXHJcXG4uZW50ZXItaW1hZ2Uge1xcclxcbiAgd2lkdGg6IDIwcHg7XFxyXFxuICBoZWlnaHQ6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbjo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XFxyXFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxufVxcclxcblxcclxcbi5hZGQtaW5wdXQge1xcclxcbiAgYm9yZGVyLXRvcC1zdHlsZTogaGlkZGVuO1xcclxcbiAgYm9yZGVyLXJpZ2h0LXN0eWxlOiBoaWRkZW47XFxyXFxuICBib3JkZXItbGVmdC1zdHlsZTogaGlkZGVuO1xcclxcbiAgYm9yZGVyLWJvdHRvbS1zdHlsZTogbm9uZTtcXHJcXG4gIG91dGxpbmU6IG5vbmU7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxufVxcclxcblxcclxcbi5kZXNjIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYm9yZGVyLXRvcC1zdHlsZTogaGlkZGVuO1xcclxcbiAgYm9yZGVyLXJpZ2h0LXN0eWxlOiBoaWRkZW47XFxyXFxuICBib3JkZXItbGVmdC1zdHlsZTogaGlkZGVuO1xcclxcbiAgYm9yZGVyLWJvdHRvbS1zdHlsZTogbm9uZTtcXHJcXG4gIG91dGxpbmU6IG5vbmU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gIGZvbnQtc2l6ZTogMTZweDtcXHJcXG59XFxyXFxuXFxyXFxuLml0ZW1zIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4uaXRlbSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNkNGQyZDI7XFxyXFxuICBwYWRkaW5nOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaXRlbS1kZXNjIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBnYXA6IDE1cHg7XFxyXFxufVxcclxcblxcclxcbi5oYW1idXJnZXItaW1hZ2Uge1xcclxcbiAgd2lkdGg6IDMwcHg7XFxyXFxuICBoZWlnaHQ6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi50cmFzaC1pbWFnZSB7XFxyXFxuICB3aWR0aDogMzBweDtcXHJcXG4gIGhlaWdodDogMzBweDtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi50cmFzaC1pbWFnZS1zaG93IHtcXHJcXG4gIGRpc3BsYXk6IGlubGluZTtcXHJcXG59XFxyXFxuXFxyXFxuLm1vcmUtaW1hZ2UtaGlkZSB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uY2xlYXIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi5idG4tY2xlYXIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBmb250LXNpemU6IDE4cHg7XFxyXFxuICBjb2xvcjogIzc3NzU3NTtcXHJcXG4gIGhlaWdodDogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdGVkIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZlYzQ7XFxyXFxufVxcclxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7OztFQUdFLHNCQUFzQjtFQUN0QixrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixVQUFVO0VBQ1Ysc0JBQXNCO0VBQ3RCLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixXQUFXO0VBQ1gsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IsZ0NBQWdDO0FBQ2xDOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGFBQWE7RUFDYixnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLDBCQUEwQjtFQUMxQix5QkFBeUI7RUFDekIseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztFQUNYLHdCQUF3QjtFQUN4QiwwQkFBMEI7RUFDMUIseUJBQXlCO0VBQ3pCLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2IsNkJBQTZCO0VBQzdCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsZ0NBQWdDO0VBQ2hDLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztFQUNYLGVBQWU7RUFDZixjQUFjO0VBQ2QsWUFBWTtBQUNkOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKFxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBvcHBpbnM6d2dodEA1MDA7NjAwOzcwMCZkaXNwbGF5PXN3YXBcXFwiKTtcXHJcXG5cXHJcXG4qLFxcclxcbjo6YmVmb3JlLFxcclxcbjo6YWZ0ZXIge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUG9wcGluc1xcXCIsIHNhbnMtc2VyaWY7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZTVlNTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgbWFyZ2luLXRvcDogMTByZW07XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICB3aWR0aDogNDAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG4gIGJveC1zaGFkb3c6IDVweCAxMHB4IDhweCAxMHB4ICM4ODg7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2Q0ZDJkMjtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlci1uYW1lIHtcXHJcXG4gIGZvbnQtc2l6ZTogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnJlbG9hZC1pbWFnZSB7XFxyXFxuICB3aWR0aDogMjBweDtcXHJcXG4gIGhlaWdodDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvLWRvLWl0ZW1zIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmFkZCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjZDRkMmQyO1xcclxcbn1cXHJcXG5cXHJcXG4uZW50ZXItaW1hZ2Uge1xcclxcbiAgd2lkdGg6IDIwcHg7XFxyXFxuICBoZWlnaHQ6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbjo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XFxyXFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxufVxcclxcblxcclxcbi5hZGQtaW5wdXQge1xcclxcbiAgYm9yZGVyLXRvcC1zdHlsZTogaGlkZGVuO1xcclxcbiAgYm9yZGVyLXJpZ2h0LXN0eWxlOiBoaWRkZW47XFxyXFxuICBib3JkZXItbGVmdC1zdHlsZTogaGlkZGVuO1xcclxcbiAgYm9yZGVyLWJvdHRvbS1zdHlsZTogbm9uZTtcXHJcXG4gIG91dGxpbmU6IG5vbmU7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxufVxcclxcblxcclxcbi5kZXNjIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYm9yZGVyLXRvcC1zdHlsZTogaGlkZGVuO1xcclxcbiAgYm9yZGVyLXJpZ2h0LXN0eWxlOiBoaWRkZW47XFxyXFxuICBib3JkZXItbGVmdC1zdHlsZTogaGlkZGVuO1xcclxcbiAgYm9yZGVyLWJvdHRvbS1zdHlsZTogbm9uZTtcXHJcXG4gIG91dGxpbmU6IG5vbmU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gIGZvbnQtc2l6ZTogMTZweDtcXHJcXG59XFxyXFxuXFxyXFxuLml0ZW1zIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4uaXRlbSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNkNGQyZDI7XFxyXFxuICBwYWRkaW5nOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaXRlbS1kZXNjIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBnYXA6IDE1cHg7XFxyXFxufVxcclxcblxcclxcbi5oYW1idXJnZXItaW1hZ2Uge1xcclxcbiAgd2lkdGg6IDMwcHg7XFxyXFxuICBoZWlnaHQ6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi50cmFzaC1pbWFnZSB7XFxyXFxuICB3aWR0aDogMzBweDtcXHJcXG4gIGhlaWdodDogMzBweDtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi50cmFzaC1pbWFnZS1zaG93IHtcXHJcXG4gIGRpc3BsYXk6IGlubGluZTtcXHJcXG59XFxyXFxuXFxyXFxuLm1vcmUtaW1hZ2UtaGlkZSB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uY2xlYXIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi5idG4tY2xlYXIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBmb250LXNpemU6IDE4cHg7XFxyXFxuICBjb2xvcjogIzc3NzU3NTtcXHJcXG4gIGhlaWdodDogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdGVkIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZlYzQ7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9lbnRlci5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1nL21vcmUucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9yZWxvYWQucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy90cmFzaC5wbmdcIjsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJUYXNrc1RvRG8iLCJ0YXNrIiwibG9jYWxUYXNrcyIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJpdGVtcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImZvckVhY2giLCJsb2NhbHRhc2siLCJvYmoiLCJkZXNjIiwiY29tcGxldGVkIiwiaW5kZXgiLCJhcnJheVRhc2tzIiwicHVzaCIsImlubmVySFRNTCIsInN1Ym1pdEJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImtleSIsIm5ld1Rhc2siLCJ2YWx1ZSIsImxlbmd0aCIsImRpc3BsYXlUYXNrcyIsInRyYXNoQnRuIiwicXVlcnlTZWxlY3RvckFsbCIsImRlbGV0ZVRhc2siLCJkZXNjSW5wdXQiLCJ1cGRhdGVUYXNrc0xpc3QiLCJyZWxvYWRCdG4iLCJyZWxvYWRUYXNrcyIsImNvbXBsZXRlVGFzayIsImJ0bkNsZWFyIiwiY2hlY2tlZEJveCIsImNvbXBsZXRlZFRhc2siLCJpZHgiLCJjbGVhckxpc3QiLCJjb25zdHJ1Y3RvciIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsInRhc2tzIiwiaXRlbSIsIml0ZW1Db250ZW50IiwidHJhc2hJbWFnZSIsIm1vcmVJbWFnZSIsInNlbGVjdGVkIiwidHJhc2hJbWFnZUFjdGl2ZSIsIm1vcmVJbWFnZUhpZGUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJhZGp1c3REZXNjcmlwdGlvbiIsImxlbmdodCIsImJ0biIsImZpbHRlciIsImkiLCJpRGVzY3JpcHRpb24iLCJyVEJ0biIsImNoZWNrQm94IiwiY2hlY2tlZCIsImNoZWNrSW5kZXgiLCJlbGVtZW50cyIsImluZGV4T2YiXSwic291cmNlUm9vdCI6IiJ9