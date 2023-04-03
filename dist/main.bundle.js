/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/createHTML.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createHTML(idSelect, select) {
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
  var inputElem = createElem('input', classList.input, [['type', 'text']]);
  var ulElem = createElem('ul', classList.dropdown, [['data-id', idSelect]]);
  var liElem = createElem('li', classList.dropdownItem);
  ulElem.appendChild(liElem);
  var divElem = createElem('div', classList.wrapper);
  divElem.style.width = "".concat(select.offsetWidth, "px");
  select.parentNode.insertBefore(divElem, select);
  divElem.appendChild(select);
  select.classList.add("isHidden");
  var wrapper = divElem;
  wrapper.id = idSelect;
  divElem = createElem('div', classList.optionList);
  wrapper.appendChild(divElem);
  var optionList = wrapper.querySelector(".".concat(classList.optionList));
  divElem = createElem('div', classList.selected, [['data-id', idSelect]]);
  optionList.appendChild(divElem);
  var selected = optionList.querySelector(".".concat(classList.selected));
  divElem = createElem('div', classList.arrow);
  divElem.innerHTML = "<svg width=\"14px\" height=\"14px\" viewBox=\"0 0 1024 1024\" class=\"c-select__arrow-icon\" \n    data-id = ".concat(idSelect, " version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z\" fill=\"#000000\" /></svg>");
  selected.appendChild(divElem);
  divElem = createElem('div', classList.inputDiv, [['data-id', idSelect]]);
  optionList.appendChild(divElem);
  var inputDiv = optionList.querySelector(".".concat(classList.inputDiv));
  inputDiv.appendChild(inputElem);
  inputDiv.appendChild(ulElem);
  function createElem(tagName, className, attrList) {
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
}
;// CONCATENATED MODULE: ./src/main.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || main_unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function main_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return main_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return main_arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return main_arrayLikeToArray(arr); }
function main_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


function initSelect(config) {
  if (!config.select) return;
  var select = document.querySelector("#".concat(config.select)); //existing select element
  var uniqueID = function uniqueID() {
    return Math.floor(Math.random() * Date.now()).toString();
  };
  var idSelect = "c-select".concat(uniqueID()); //select element id
  var options = select.querySelectorAll('option');
  createHTML(idSelect, select); //create main html
  createOptionList(); //create options for native <select>

  var firstOptionItem = document.querySelector("#".concat(idSelect, " .c-select__dropdown-item:first-of-type"));
  var selectOptions = document.querySelectorAll("#".concat(idSelect, " option"));
  setEventListeners();
  filterOptionItems();

  //function creates elements
  function createOptionList() {
    return _createOptionList.apply(this, arguments);
  }
  function _createOptionList() {
    _createOptionList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var i, optionItem, dropdownItemList;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            for (i = 1; i < options.length; i++) {
              optionItem = document.createElement('li');
              dropdownItemList = document.querySelector("#".concat(idSelect, " .c-select__dropdown"));
              optionItem.classList.add("c-select__dropdown-item");
              optionItem.textContent = options[i].value;
              dropdownItemList.appendChild(optionItem);
            }
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _createOptionList.apply(this, arguments);
  }
  function setEventListeners() {
    document.querySelector("#".concat(idSelect, " .c-select__option-list")).addEventListener('click', handleClick);
    document.querySelector('body').addEventListener('click', handleOutsideClick);
  }
  function handleOutsideClick(e) {
    var selectedDiv = document.querySelector("#".concat(idSelect, " .c-select__selected"));
    var inputDiv = document.querySelector("#".concat(idSelect, " .c-select__input-div"));
    var arrowIcon = document.querySelector("#".concat(idSelect, " .c-select__arrow-icon"));
    var dropdown = document.querySelector("#".concat(idSelect, " .c-select__dropdown"));
    if (selectedDiv.classList.contains('active')) {
      if (isClickedOutside(e)) {
        selectedDiv.classList.remove('active');
        inputDiv.classList.remove('active');
        arrowIcon.classList.remove('active');
        dropdown.classList.remove('active');
      }
    }
  }
  function isClickedOutside(e) {
    var classListArr = ['c-select__selected', 'c-select__input-div', 'c-select__input', 'c-select__dropdown-item', 'c-select__dropdown', 'c-select__arrow', 'c-select__arrow-icon', 'c-select__selected-div', 'c-select__selected-p', 'c-select__selected-remove'];
    var isOutside = true;
    classListArr.forEach(function (item) {
      return e.target.classList.contains(item) ? isOutside = false : undefined;
    });
    return isOutside;
  }
  function handleClick(e) {
    var input = document.querySelector("#".concat(idSelect, " .c-select__input"));
    var selectedDiv = document.querySelector("#".concat(idSelect, " .c-select__selected"));
    var inputDiv = document.querySelector("#".concat(idSelect, " .c-select__input-div"));
    var activeSelects = document.querySelectorAll('.c-select__option-list .active');
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
          select.dataset.id !== idSelect && select.classList.toggle('active');
        });
      }
    }
    e.target.classList.contains('c-select__dropdown-item') && handleOptionItemsClick(e);
    e.target.classList.contains('c-select__selected-remove') && handleSelectedClick(e);
  }
  function handleOptionItemsClick(e) {
    var selectedDiv = document.querySelector("#".concat(idSelect, " .c-select__selected"));
    if (e.target === firstOptionItem) return;
    var selectedArr = [];
    var selectedItems = selectedDiv.querySelectorAll('.c-select__selected-div');
    selectedItems.forEach(function (elem) {
      return selectedArr.push(elem.textContent);
    });
    !selectedArr.includes(e.target.textContent) && addToSelected();
    e.target.classList.add('c-select__dropdown-item_selected');
    function addToSelected() {
      _toConsumableArray(selectOptions).find(function (option) {
        return option.textContent === e.target.textContent;
      }).selected = true;
      if (config.type !== 'multi' && selectedItems.length > 0) handleSingleSelect();
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
      function handleSingleSelect() {
        var selectedDropdownItem = document.querySelector('.c-select__dropdown-item_selected');
        selectedDropdownItem.classList.remove('c-select__dropdown-item_selected');
        selectedItems[0].remove();
      }
    }
  }
  function handleSelectedClick(e) {
    _toConsumableArray(selectOptions).find(function (option) {
      return option.textContent === e.target.textContent;
    }).selected = false;
    e.target.parentElement.remove();
    var selectedDropdownItems = document.querySelectorAll('.c-select__dropdown-item_selected');
    _toConsumableArray(selectedDropdownItems).find(function (item) {
      return item.textContent === e.target.parentElement.textContent;
    }).classList.remove('c-select__dropdown-item_selected');
  }

  //filter function
  function filterOptionItems() {
    var input = document.querySelector("#".concat(idSelect, " .c-select__input"));
    input.addEventListener('input', function (e) {
      var dropdownItems = document.querySelectorAll("#".concat(idSelect, " .c-select__dropdown-item"));
      dropdownItems.forEach(function (item, index) {
        !item.textContent.toLowerCase().includes(e.target.value.toLowerCase()) && index !== 0 ? item.classList.add('isHidden') : item.classList.remove('isHidden');
      });
      if (_toConsumableArray(dropdownItems).filter(function (elem) {
        return elem.classList.contains('isHidden');
      }).length === dropdownItems.length - 1) {
        firstOptionItem.textContent = 'no results';
      } else firstOptionItem.textContent = '';
    });
  }
}
initSelect({
  select: 'sel1'
});
initSelect({
  select: 'sel2',
  type: 'multi'
});
/******/ })()
;