/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/createhtml.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createHTML() {
  var classList = {
    wrapper: 'c-select',
    optionList: 'c-select__option-list',
    selected: 'c-select__selected',
    inputDiv: 'c-select__input-div',
    input: 'c-select__input',
    dropdown: 'c-select__dropdown',
    dropdownItem: 'c-select__dropdown-item',
    arrow: 'c-select__arrow',
    selectedDiv: 'c-select__selected-div'
  };
  var inputElem = createElement('input', classList.input, [['type', 'text']]);
  var ulElem = createElement('ul', classList.dropdown, [['data-id', this.idSelect]]);
  var liElem = createElement('li', classList.dropdownItem);
  ulElem.appendChild(liElem);
  var divElem = createElement('div', classList.wrapper);
  divElem.style.width = "".concat(this.select.offsetWidth, "px");
  this.select.parentNode.insertBefore(divElem, this.select);
  divElem.appendChild(this.select);
  this.select.classList.add("select-hidden");
  var wrapper = divElem;
  wrapper.id = this.idSelect;
  divElem = createElement('div', classList.optionList);
  wrapper.appendChild(divElem);
  var optionList = wrapper.querySelector(".".concat(classList.optionList));
  divElem = createElement('div', classList.selected, [['data-id', this.idSelect]]);

  //if single select add specific class
  !this.isMulti ? divElem.classList.add('c-select__selected_single') : null;
  optionList.appendChild(divElem);
  var selected = optionList.querySelector(".".concat(classList.selected));
  divElem = createElement('div', classList.arrow);
  divElem.innerHTML = "<svg width=\"14px\" height=\"14px\" viewBox=\"0 0 1024 1024\" class=\"c-select__arrow-icon\" \n    data-id = ".concat(this.idSelect, " version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z\" fill=\"#000000\" /></svg>");
  selected.appendChild(divElem);
  divElem = createElement('div', classList.inputDiv, [['data-id', this.idSelect]]);
  optionList.appendChild(divElem);
  var inputDiv = optionList.querySelector(".".concat(classList.inputDiv));
  inputDiv.appendChild(inputElem);
  inputDiv.appendChild(ulElem);
}
function createElement(tagName, className, attrList) {
  var newElem = document.createElement(tagName);
  if (className) newElem.className = className;
  if (!attrList) return newElem;
  var _iterator = _createForOfIteratorHelper(attrList),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var attr = _step.value;
      newElem.setAttribute(attr[0], attr[1]);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return newElem;
}
;// CONCATENATED MODULE: ./src/handle-keyboard.js
function handleKeyboard(e) {
  var _this = this;
  if (!e.target.classList.contains('c-select__dropdown-item')) return;
  e.keyCode === this.ENTER_KEY_CODE || e.keyCode === this.SPACEBAR_KEY_CODE ? this.handleClick(e) : null;
  if (e.keyCode === this.UP_KEY_CODE) {
    this.dropdownItems.forEach(function (item, index) {
      if (item === e.target) {
        index > 1 ? _this.dropdownItems[index - 1].dispatchEvent(new Event('focus')) : _this.dropdownItems[_this.dropdownItems.length - 1].dispatchEvent(new Event('focus'));
      }
    });
  }
  if (e.keyCode === this.DOWN_KEY_CODE) {
    this.dropdownItems.forEach(function (item, index) {
      if (item === e.target) {
        index < _this.dropdownItems.length - 1 ? _this.dropdownItems[index + 1].dispatchEvent(new Event('focus')) : _this.dropdownItems[1].dispatchEvent(new Event('focus'));
      }
    });
  }
}
;// CONCATENATED MODULE: ./src/filter-option-items.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || filter_option_items_unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function filter_option_items_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return filter_option_items_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return filter_option_items_arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return filter_option_items_arrayLikeToArray(arr); }
function filter_option_items_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function filterOptionItems() {
  var _this = this;
  var input = document.querySelector("#".concat(this.idSelect, " .c-select__input"));
  input.addEventListener('input', function (e) {
    _this.dropdownItems.forEach(function (item, index) {
      !item.textContent.toLowerCase().includes(e.target.value.toLowerCase()) && index !== 0 ? item.classList.add('isHidden') : item.classList.remove('isHidden');
    });
    if (_toConsumableArray(_this.dropdownItems).filter(function (elem) {
      return elem.classList.contains('isHidden');
    }).length === _this.dropdownItems.length - 1) {
      _this.firstOptionItem.textContent = 'no results';
    } else _this.firstOptionItem.textContent = '';
  });
}
;// CONCATENATED MODULE: ./src/select.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function select_toConsumableArray(arr) { return select_arrayWithoutHoles(arr) || select_iterableToArray(arr) || select_unsupportedIterableToArray(arr) || select_nonIterableSpread(); }
function select_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function select_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return select_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return select_arrayLikeToArray(o, minLen); }
function select_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function select_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return select_arrayLikeToArray(arr); }
function select_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




var Select = /*#__PURE__*/function () {
  function Select(config) {
    _classCallCheck(this, Select);
    if (!config.select) return console.log('provide id of select element');
    this.select = document.querySelector("#".concat(config.select));
    this.isMulti = this.select.multiple;
    if (!this.select) return console.log("select element with id '".concat(config.select, "' not found"));
    this.createHTML = createHTML.bind(this);
    this.handleKeyboard = handleKeyboard.bind(this);
    this.filterOptionItems = filterOptionItems.bind(this);
    this.idSelect = "c-select".concat(this.uniqueID());
    this.options = this.select.querySelectorAll('option');
    this.createHTML();
    this.createOptionList();
    this.firstOptionItem = document.querySelector("#".concat(this.idSelect, " .c-select__dropdown-item:first-of-type"));
    this.selectOptions = document.querySelectorAll("#".concat(this.idSelect, " option"));
    this.setEventListeners(config);
    this.filterOptionItems();
    this.input = document.querySelector("#".concat(this.idSelect, " .c-select__input"));
    this.selectedDiv = document.querySelector("#".concat(this.idSelect, " .c-select__selected"));
    this.inputDiv = document.querySelector("#".concat(this.idSelect, " .c-select__input-div"));
    this.arrowIcon = document.querySelector("#".concat(this.idSelect, " .c-select__arrow-icon"));
    this.dropdown = document.querySelector("#".concat(this.idSelect, " .c-select__dropdown"));
    this.SPACEBAR_KEY_CODE = 32;
    this.ENTER_KEY_CODE = 13;
    this.UP_KEY_CODE = 38;
    this.DOWN_KEY_CODE = 40;
    this.dropdownItems = document.querySelectorAll("#".concat(this.idSelect, " .c-select__dropdown-item"));
  }
  _createClass(Select, [{
    key: "uniqueID",
    value: function uniqueID() {
      return Math.floor(Math.random() * Date.now()).toString();
    }
  }, {
    key: "getSelectedItems",
    value: function getSelectedItems() {
      return document.querySelectorAll("#".concat(this.idSelect, " .c-select__selected-div"));
    }
  }, {
    key: "removeElem",
    value: function removeElem(elemToRemove) {
      elemToRemove ? elemToRemove.remove() : null;
    }
  }, {
    key: "createOptionList",
    value: function createOptionList() {
      for (var i = 1; i < this.options.length; i++) {
        var optionItem = document.createElement('li');
        var dropdownItemList = document.querySelector("#".concat(this.idSelect, " .c-select__dropdown"));
        optionItem.classList.add("c-select__dropdown-item");
        optionItem.textContent = this.options[i].value;
        optionItem.tabIndex = '0';
        dropdownItemList.appendChild(optionItem);
      }
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this = this;
      document.querySelector("#".concat(this.idSelect, " .c-select__option-list")).addEventListener('click', function (e) {
        return _this.handleClick(e);
      });
      document.querySelector('body').addEventListener('click', function (e) {
        return _this.handleOutsideClick(e);
      });
      document.querySelectorAll("#".concat(this.idSelect, " .c-select__dropdown-item")).forEach(function (item) {
        return item.addEventListener("keydown", function (e) {
          return _this.handleKeyboard(e);
        });
      });
      document.querySelectorAll(".c-select__dropdown-item").forEach(function (item) {
        item.addEventListener('focus', function (e) {
          return e.target.focus();
        });
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      var _this2 = this;
      var activeSelects = document.querySelectorAll(".c-select__option-list .active");
      if (e.target.classList.contains('c-select__selected') || e.target.classList.contains('c-select__arrow') || e.target.classList.contains('c-select__arrow-icon')) {
        this.input.value = '';
        this.input.dispatchEvent(new Event('input'));
        this.selectedDiv.classList.toggle('active');
        this.inputDiv.classList.toggle('active');
        this.arrowIcon.classList.toggle('active');
        this.dropdown.classList.toggle('active');
        if (activeSelects.length >= 4) {
          activeSelects.forEach(function (select) {
            select.dataset.id !== _this2.idSelect && select.classList.toggle('active');
          });
        }
      }
      e.target.classList.contains('c-select__dropdown-item') && this.handleOptionItemsClick(e, this.selectedDiv);
      e.target.classList.contains('c-select__selected-remove') || e.target.classList.contains('c-select__selected-single-remove') ? this.handleSelectedClick(e, this.selectOptions) : null;
    }
  }, {
    key: "handleSelectedClick",
    value: function handleSelectedClick(e, selectOptions) {
      var selectedItemTextContent = !this.isMulti ? this.getSelectedItems()[0].textContent : e.target.previousSibling.textContent;
      var elemToRemove = !this.isMulti ? this.getSelectedItems()[0] : e.target.parentElement;
      !this.isMulti ? this.removeElem(document.querySelector("#".concat(this.idSelect, " .c-select__selected-single-remove"))) : null;
      this.removeElem(elemToRemove);
      var selectedDropdownItems = document.querySelectorAll('.c-select__dropdown-item_selected');
      select_toConsumableArray(selectOptions).find(function (option) {
        return option.value === selectedItemTextContent;
      }).selected = false;
      select_toConsumableArray(selectedDropdownItems).find(function (item) {
        return item.textContent === elemToRemove.textContent;
      }).classList.remove('c-select__dropdown-item_selected');
    }
  }, {
    key: "handleOptionItemsClick",
    value: function handleOptionItemsClick(e, selectedDiv) {
      if (e.target === this.firstOptionItem) return;
      var selectedArr = [];
      var selectedItems = selectedDiv.querySelectorAll('.c-select__selected-div');
      selectedItems.forEach(function (elem) {
        return selectedArr.push(elem.textContent);
      });
      !selectedArr.includes(e.target.textContent) && this.addToSelected(e, this.selectOptions, selectedDiv, selectedItems);
      e.target.classList.add('c-select__dropdown-item_selected');
    }
  }, {
    key: "addToSelected",
    value: function addToSelected(e, selectOptions, selectedDiv, selectedItems) {
      if (!this.isMulti && selectedItems.length > 0) this.handleSingleSelect(selectedItems);
      select_toConsumableArray(selectOptions).find(function (option) {
        return option.value === e.target.textContent;
      }).selected = true;
      var selectedItemDiv = document.createElement('div');
      var selectedItemP = document.createElement('p');
      selectedItemDiv.classList.add('c-select__selected-div');
      selectedItemP.classList.add('c-select__selected-p');
      selectedItemP.textContent = e.target.textContent;
      selectedItemDiv.appendChild(selectedItemP);
      var removeItemBtn = document.createElement('button');
      if (this.isMulti) {
        removeItemBtn.classList.add('c-select__selected-remove');
        selectedItemDiv.appendChild(removeItemBtn);
      } else {
        this.removeElem(document.querySelector("#".concat(this.idSelect, " .c-select__selected-single-remove")));
        removeItemBtn.classList.add('c-select__selected-single-remove');
        this.selectedDiv.appendChild(removeItemBtn);
      }
      selectedDiv.appendChild(selectedItemDiv);
    }
  }, {
    key: "handleSingleSelect",
    value: function handleSingleSelect(selectedItems) {
      var selectedDropdownItem = document.querySelector('.c-select__dropdown-item_selected');
      selectedDropdownItem.classList.remove('c-select__dropdown-item_selected');
      this.removeElem(selectedItems[0]);
    }
  }, {
    key: "handleOutsideClick",
    value: function handleOutsideClick(e) {
      var selectedDiv = document.querySelector("#".concat(this.idSelect, " .c-select__selected"));
      var inputDiv = document.querySelector("#".concat(this.idSelect, " .c-select__input-div"));
      var arrowIcon = document.querySelector("#".concat(this.idSelect, " .c-select__arrow-icon"));
      if (selectedDiv.classList.contains('active')) {
        if (this.isClickedOutside(e)) {
          selectedDiv.classList.remove('active');
          inputDiv.classList.remove('active');
          arrowIcon.classList.remove('active');
          this.dropdown.classList.remove('active');
        }
      }
    }
  }, {
    key: "isClickedOutside",
    value: function isClickedOutside(e) {
      var _this3 = this;
      var classListArr = ['c-select__selected', 'c-select__input-div', 'c-select__input', 'c-select__dropdown-item', 'c-select__dropdown', 'c-select__arrow', 'c-select__arrow-icon', 'c-select__selected-div', 'c-select__selected-p', 'c-select__selected-remove'];
      this.isOutside = true;
      classListArr.forEach(function (item) {
        return e.target.classList.contains(item) ? _this3.isOutside = false : undefined;
      });
      return this.isOutside;
    }
  }]);
  return Select;
}();

;// CONCATENATED MODULE: ./src/index.js

new Select({
  select: 'select1'
});
new Select({
  select: 'select2'
});
/******/ })()
;