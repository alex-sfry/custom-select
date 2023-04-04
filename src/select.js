import './scss/styles.scss';
import createHTML from './createhtml.js';
import handleKeyboard from './handle-keyboard.js';
import filterOptionItems from './filter-option-items.js';

export default class Select {
    constructor(config) {
        if (!config.select) return console.log('provide id of select element');
        this.select = document.querySelector(`#${config.select}`);
        this.isMulti = this.select.multiple;
        if (!this.select) return console.log(`select element with id '${config.select}' not found`);

        this.createHTML = createHTML.bind(this);
        this.handleKeyboard = handleKeyboard.bind(this);
        this.filterOptionItems = filterOptionItems.bind(this);

        this.idSelect = `c-select${this.uniqueID()}`;
        this.options = this.select.querySelectorAll('option');

        this.createHTML();
        this.createOptionList();

        this.firstOptionItem = document.querySelector(`#${this.idSelect} .c-select__dropdown-item:first-of-type`);
        this.selectOptions = document.querySelectorAll(`#${this.idSelect} option`);

        this.setEventListeners(config);
        this.filterOptionItems();

        this.input = document.querySelector(`#${this.idSelect} .c-select__input`);
        this.selectedDiv = document.querySelector(`#${this.idSelect} .c-select__selected`);
        this.inputDiv = document.querySelector(`#${this.idSelect} .c-select__input-div`);
        this.arrowIcon = document.querySelector(`#${this.idSelect} .c-select__arrow-icon`);
        this.dropdown = document.querySelector(`#${this.idSelect} .c-select__dropdown`);
        this.SPACEBAR_KEY_CODE = 32;
        this.ENTER_KEY_CODE = 13;
        this.UP_KEY_CODE = 38;
        this.DOWN_KEY_CODE = 40;
        this.dropdownItems = document.querySelectorAll(`#${this.idSelect} .c-select__dropdown-item`);
    }

    uniqueID() {
        return Math.floor(Math.random() * Date.now()).toString();
    }

    getSelectedItems() {
        return document.querySelectorAll(`#${this.idSelect} .c-select__selected-div`);
    }

    removeElem(elemToRemove) {
        elemToRemove ? elemToRemove.remove() : null;
    }

    createOptionList() {
        for (let i = 1; i < this.options.length; i++) {
            const optionItem = document.createElement('li');
            const dropdownItemList = document.querySelector(`#${this.idSelect} .c-select__dropdown`);
            optionItem.classList.add("c-select__dropdown-item");
            optionItem.textContent = this.options[i].value;
            optionItem.tabIndex = '0';
            dropdownItemList.appendChild(optionItem);
        }
    }

    setEventListeners() {
        document.querySelector(`#${this.idSelect} .c-select__option-list`)
            .addEventListener('click', (e) => this.handleClick(e));

        document.querySelector('body')
            .addEventListener('click', (e) => this.handleOutsideClick(e));

        document.querySelectorAll(`#${this.idSelect} .c-select__dropdown-item`)
            .forEach(item => item.addEventListener("keydown", (e) => this.handleKeyboard(e)));

        document.querySelectorAll(`.c-select__dropdown-item`).forEach(item => {
            item.addEventListener('focus', (e) => e.target.focus());
        });
    }

    handleClick(e) {
        const activeSelects = document.querySelectorAll(`.c-select__option-list .active`);

        if (e.target.classList.contains('c-select__selected') ||
            e.target.classList.contains('c-select__arrow') ||
            e.target.classList.contains('c-select__arrow-icon')) {
            this.input.value = '';
            this.input.dispatchEvent(new Event('input'));
            this.selectedDiv.classList.toggle('active');
            this.inputDiv.classList.toggle('active');
            this.arrowIcon.classList.toggle('active');
            this.dropdown.classList.toggle('active');

            if (activeSelects.length >= 4) {
                activeSelects.forEach(select => {
                    select.dataset.id !== this.idSelect && select.classList.toggle('active');
                });
            }
        }

        e.target.classList.contains('c-select__dropdown-item') &&
            this.handleOptionItemsClick(e, this.selectedDiv);

        e.target.classList.contains('c-select__selected-remove') ||
            e.target.classList.contains('c-select__selected-single-remove') ?
            this.handleSelectedClick(e, this.selectOptions) : null;
    }

    handleSelectedClick(e, selectOptions) {
        const selectedItemTextContent = !this.isMulti ? this.getSelectedItems()[0].textContent : 
        e.target.previousSibling.textContent;
        const elemToRemove = !this.isMulti ? this.getSelectedItems()[0] : e.target.parentElement;
        !this.isMulti ? this.removeElem(document.querySelector(`#${this.idSelect} .c-select__selected-single-remove`)) :
        null;

        this.removeElem(elemToRemove);
        const selectedDropdownItems = document.querySelectorAll('.c-select__dropdown-item_selected');

        [...selectOptions].find(option => {
            return option.value === selectedItemTextContent;
        }).selected = false;

        [...selectedDropdownItems].find(item => item.textContent === elemToRemove.textContent)
            .classList.remove('c-select__dropdown-item_selected');
    }

    handleOptionItemsClick(e, selectedDiv) {
        if (e.target === this.firstOptionItem) return;
        const selectedArr = [];
        const selectedItems = selectedDiv.querySelectorAll('.c-select__selected-div');
        selectedItems.forEach(elem => selectedArr.push(elem.textContent));
        !selectedArr.includes(e.target.textContent) &&
            this.addToSelected(e, this.selectOptions, selectedDiv, selectedItems);
        e.target.classList.add('c-select__dropdown-item_selected');
    }

    addToSelected(e, selectOptions, selectedDiv, selectedItems) {
        if (!this.isMulti && selectedItems.length > 0) this.handleSingleSelect(selectedItems);

        [...selectOptions].find(option => option.value === e.target.textContent).selected = true;
        const selectedItemDiv = document.createElement('div');
        const selectedItemP = document.createElement('p');
        selectedItemDiv.classList.add('c-select__selected-div');
        selectedItemP.classList.add('c-select__selected-p');
        selectedItemP.textContent = e.target.textContent;
        selectedItemDiv.appendChild(selectedItemP);
        const removeItemBtn = document.createElement('button');

        if (this.isMulti) {
            removeItemBtn.classList.add('c-select__selected-remove');
            selectedItemDiv.appendChild(removeItemBtn);
        } else {
            this.removeElem(document.querySelector(`#${this.idSelect} .c-select__selected-single-remove`));
            removeItemBtn.classList.add('c-select__selected-single-remove');
            this.selectedDiv.appendChild(removeItemBtn);
        }

        selectedDiv.appendChild(selectedItemDiv);
    }

    handleSingleSelect(selectedItems) {
        const selectedDropdownItem = document.querySelector('.c-select__dropdown-item_selected');
        selectedDropdownItem.classList.remove('c-select__dropdown-item_selected');
        this.removeElem(selectedItems[0]);
    }

    handleOutsideClick(e) {
        const selectedDiv = document.querySelector(`#${this.idSelect} .c-select__selected`);
        const inputDiv = document.querySelector(`#${this.idSelect} .c-select__input-div`);
        const arrowIcon = document.querySelector(`#${this.idSelect} .c-select__arrow-icon`);

        if (selectedDiv.classList.contains('active')) {
            if (this.isClickedOutside(e)) {
                selectedDiv.classList.remove('active');
                inputDiv.classList.remove('active');
                arrowIcon.classList.remove('active');
                this.dropdown.classList.remove('active');
            }
        }
    }

    isClickedOutside(e) {
        const classListArr = [
            'c-select__selected',
            'c-select__input-div',
            'c-select__input',
            'c-select__dropdown-item',
            'c-select__dropdown',
            'c-select__arrow',
            'c-select__arrow-icon',
            'c-select__selected-div',
            'c-select__selected-p',
            'c-select__selected-remove'
        ];
        this.isOutside = true;
        classListArr.forEach(item => e.target.classList.contains(item) ? this.isOutside = false : undefined);
        return this.isOutside;
    }
}