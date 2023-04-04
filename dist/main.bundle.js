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
;// CONCATENATED MODULE: ./src/select.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || select_unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function select_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return select_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return select_arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return select_arrayLikeToArray(arr); }
function select_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var Select = /*#__PURE__*/function () {
  function Select(config) {
    _classCallCheck(this, Select);
    if (!config.select) {
      return console.log('provide id of select element');
    }
    this.select = document.querySelector("#".concat(config.select));
    this.multi = this.select.multiple;
    if (!this.select) {
      return console.log("select element with id '".concat(config.select, "' not found"));
    }
    this.createHTML = createHTML.bind(this);
    this.idSelect = "c-select".concat(this.uniqueID());
    this.options = this.select.querySelectorAll('option');
    this.createHTML();
    this.createOptionList();
    this.firstOptionItem = document.querySelector("#".concat(this.idSelect, " .c-select__dropdown-item:first-of-type"));
    this.selectOptions = document.querySelectorAll("#".concat(this.idSelect, " option"));
    this.setEventListeners(config);
    this.filterOptionItems();
  }
  _createClass(Select, [{
    key: "uniqueID",
    value: function uniqueID() {
      return Math.floor(Math.random() * Date.now()).toString();
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners(config) {
      var _this = this;
      document.querySelector("#".concat(this.idSelect, " .c-select__option-list")).addEventListener('click', function (e) {
        return _this.handleClick(e, _this.idSelect, config);
      });
      document.querySelector('body').addEventListener('click', function (e) {
        return _this.handleOutsideClick(e, _this.idSelect);
      });
      document.querySelectorAll("#".concat(this.idSelect, " .c-select__dropdown-item")).forEach(function (item) {
        return item.addEventListener("keydown", function (e) {
          return _this.handleKeyboard(e, _this.idSelect, config);
        });
      });
      document.querySelectorAll(".c-select__dropdown-item").forEach(function (item) {
        item.addEventListener('focus', function (e) {
          return e.target.focus();
        });
      });
    }
  }, {
    key: "handleKeyboard",
    value: function handleKeyboard(e, idSelect, config) {
      if (!e.target.classList.contains('c-select__dropdown-item')) return;
      var SPACEBAR_KEY_CODE = 32;
      var ENTER_KEY_CODE = 13;
      var UP_KEY_CODE = 38;
      var DOWN_KEY_CODE = 40;
      var dropdownItems = document.querySelectorAll("#".concat(idSelect, " .c-select__dropdown-item"));
      switch (e.keyCode) {
        case ENTER_KEY_CODE:
          this.handleClick(e, idSelect, config);
          break;
        case SPACEBAR_KEY_CODE:
          this.handleClick(e, idSelect, config);
          break;
        case UP_KEY_CODE:
          dropdownItems.forEach(function (item, index) {
            if (item === e.target) {
              item.dispatchEvent(new Event('blur'));
              index > 1 ? dropdownItems[index - 1].dispatchEvent(new Event('focus')) : dropdownItems[dropdownItems.length - 1].dispatchEvent(new Event('focus'));
            }
          });
          break;
        case DOWN_KEY_CODE:
          dropdownItems.forEach(function (item, index) {
            if (item === e.target) {
              item.dispatchEvent(new Event('blur'));
              index < dropdownItems.length - 1 ? dropdownItems[index + 1].dispatchEvent(new Event('focus')) : dropdownItems[1].dispatchEvent(new Event('focus'));
            }
          });
          break;
      }
    }
  }, {
    key: "handleOutsideClick",
    value: function handleOutsideClick(e, idSelect) {
      var selectedDiv = document.querySelector("#".concat(idSelect, " .c-select__selected"));
      var inputDiv = document.querySelector("#".concat(idSelect, " .c-select__input-div"));
      var arrowIcon = document.querySelector("#".concat(idSelect, " .c-select__arrow-icon"));
      var dropdown = document.querySelector("#".concat(idSelect, " .c-select__dropdown"));
      if (selectedDiv.classList.contains('active')) {
        if (this.isClickedOutside(e)) {
          selectedDiv.classList.remove('active');
          inputDiv.classList.remove('active');
          arrowIcon.classList.remove('active');
          dropdown.classList.remove('active');
        }
      }
    }
  }, {
    key: "isClickedOutside",
    value: function isClickedOutside(e) {
      var _this2 = this;
      var classListArr = ['c-select__selected', 'c-select__input-div', 'c-select__input', 'c-select__dropdown-item', 'c-select__dropdown', 'c-select__arrow', 'c-select__arrow-icon', 'c-select__selected-div', 'c-select__selected-p', 'c-select__selected-remove'];
      this.isOutside = true;
      classListArr.forEach(function (item) {
        return e.target.classList.contains(item) ? _this2.isOutside = false : undefined;
      });
      return this.isOutside;
    }
  }, {
    key: "handleClick",
    value: function handleClick(e, idSelect, config) {
      var _this3 = this;
      var input = document.querySelector("#".concat(idSelect, " .c-select__input"));
      var selectedDiv = document.querySelector("#".concat(idSelect, " .c-select__selected"));
      var inputDiv = document.querySelector("#".concat(idSelect, " .c-select__input-div"));
      var activeSelects = document.querySelectorAll(".c-select__option-list .active");
      var arrowIcon = document.querySelector("#".concat(idSelect, " .c-select__arrow-icon"));
      var dropdown = document.querySelector("#".concat(idSelect, " .c-select__dropdown"));
      if (e.target.classList.contains('c-select__selected') || e.target.classList.contains('c-select__arrow') || e.target.classList.contains('c-select__arrow-icon')) {
        input.value = '';
        input.dispatchEvent(new Event('input'));
        selectedDiv.classList.toggle('active');
        inputDiv.classList.toggle('active');
        arrowIcon.classList.toggle('active');
        dropdown.classList.toggle('active');
        if (activeSelects.length >= 4) {
          activeSelects.forEach(function (select) {
            select.dataset.id !== _this3.idSelect && select.classList.toggle('active');
          });
        }
      }
      e.target.classList.contains('c-select__dropdown-item') && this.handleOptionItemsClick(e, this.idSelect, config);
      e.target.classList.contains('c-select__selected-remove') && this.handleSelectedClick(e, this.selectOptions);
    }
  }, {
    key: "handleOptionItemsClick",
    value: function handleOptionItemsClick(e, idSelect, config) {
      var selectedDiv = document.querySelector("#".concat(idSelect, " .c-select__selected"));
      if (e.target === this.firstOptionItem) return;
      var selectedArr = [];
      var selectedItems = selectedDiv.querySelectorAll('.c-select__selected-div');
      selectedItems.forEach(function (elem) {
        return selectedArr.push(elem.textContent);
      });
      !selectedArr.includes(e.target.textContent) && this.addToSelected(e, this.selectOptions, config, selectedDiv, selectedItems);
      e.target.classList.add('c-select__dropdown-item_selected');
    }
  }, {
    key: "addToSelected",
    value: function addToSelected(e, selectOptions, config, selectedDiv, selectedItems) {
      if (!this.multi && selectedItems.length > 0) {
        this.handleSingleSelect(e, selectedItems, selectOptions);
      }
      _toConsumableArray(selectOptions).find(function (option) {
        return option.value === e.target.textContent;
      }).selected = true;
      var selectedItemDiv = document.createElement('div');
      var selectedItemP = document.createElement('p');
      var removeItemBtn = document.createElement('button');
      selectedItemDiv.classList.add('c-select__selected-div');
      selectedItemP.classList.add('c-select__selected-p');
      removeItemBtn.classList.add('c-select__selected-remove');
      selectedItemP.textContent = e.target.textContent;
      selectedItemDiv.appendChild(selectedItemP);
      selectedItemDiv.appendChild(removeItemBtn);
      selectedDiv.appendChild(selectedItemDiv);
    }
  }, {
    key: "handleSingleSelect",
    value: function handleSingleSelect(e, selectedItems) {
      var selectedDropdownItem = document.querySelector('.c-select__dropdown-item_selected');
      selectedDropdownItem.classList.remove('c-select__dropdown-item_selected');
      selectedItems[0].remove();
    }
  }, {
    key: "handleSelectedClick",
    value: function handleSelectedClick(e, selectOptions) {
      _toConsumableArray(selectOptions).find(function (option) {
        return option.value === e.target.previousSibling.textContent;
      }).selected = false;
      e.target.parentElement.remove();
      var selectedDropdownItems = document.querySelectorAll('.c-select__dropdown-item_selected');
      _toConsumableArray(selectedDropdownItems).find(function (item) {
        return item.textContent === e.target.parentElement.textContent;
      }).classList.remove('c-select__dropdown-item_selected');
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
    key: "filterOptionItems",
    value: function filterOptionItems() {
      var _this4 = this;
      var input = document.querySelector("#".concat(this.idSelect, " .c-select__input"));
      input.addEventListener('input', function (e) {
        var dropdownItems = document.querySelectorAll("#".concat(_this4.idSelect, " .c-select__dropdown-item"));
        dropdownItems.forEach(function (item, index) {
          !item.textContent.toLowerCase().includes(e.target.value.toLowerCase()) && index !== 0 ? item.classList.add('isHidden') : item.classList.remove('isHidden');
        });
        if (_toConsumableArray(dropdownItems).filter(function (elem) {
          return elem.classList.contains('isHidden');
        }).length === dropdownItems.length - 1) {
          _this4.firstOptionItem.textContent = 'no results';
        } else _this4.firstOptionItem.textContent = '';
      });
    }
  }]);
  return Select;
}();
;// CONCATENATED MODULE: ./src/index.js

new Select({
  select: 'sel1'
});
new Select({
  select: 'sel2'
});
/******/ })()
;