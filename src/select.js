import './scss/styles.scss';
import createHTML from './createhtml.js';

export class Select {
    constructor(config) {
        if (!config.select) return console.log('provide id of select element');
        this.select = document.querySelector(`#${config.select}`);
        this.multi = this.select.multiple;
        if (!this.select) return console.log(`select element with id '${config.select}' not found`);

        this.createHTML = createHTML.bind(this);
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

    handleKeyboard(e) {
        if (!e.target.classList.contains('c-select__dropdown-item')) return;      

        e.keyCode === this.ENTER_KEY_CODE || e.keyCode === this.SPACEBAR_KEY_CODE ? this.handleClick(e) : null;

        if (e.keyCode === this.UP_KEY_CODE) {
            this.dropdownItems.forEach((item, index) => {
                if (item === e.target) {
                    index > 1 ? this.dropdownItems[index - 1].dispatchEvent(new Event('focus'))
                        : this.dropdownItems[this.dropdownItems.length - 1]
                            .dispatchEvent(new Event('focus'));
                }
            });
        }

        if (e.keyCode === this.DOWN_KEY_CODE) {
            this.dropdownItems.forEach((item, index) => {
                if (item === e.target) {
                    index < this.dropdownItems.length - 1 ? this.dropdownItems[index + 1]
                        .dispatchEvent(new Event('focus'))
                        : this.dropdownItems[1].dispatchEvent(new Event('focus'));
                }
            });           
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
        if (!this.multi && selectedItems.length > 0) this.handleSingleSelect(selectedItems);

        [...selectOptions].find(option => option.value === e.target.textContent).selected = true;
        const selectedItemDiv = document.createElement('div');
        const selectedItemP = document.createElement('p');
        selectedItemDiv.classList.add('c-select__selected-div');
        selectedItemP.classList.add('c-select__selected-p');
        selectedItemP.textContent = e.target.textContent;
        selectedItemDiv.appendChild(selectedItemP);
        const removeItemBtn = document.createElement('button');

        if (this.multi) {
            removeItemBtn.classList.add('c-select__selected-remove');
            selectedItemDiv.appendChild(removeItemBtn);
        } else {
            removeItemBtn.classList.add('c-select__selected-single-remove');           
            selectedItemDiv.appendChild(removeItemBtn);
        }

        selectedDiv.appendChild(selectedItemDiv);
    }

    handleSingleSelect(selectedItems) {
        const selectedDropdownItem = document.querySelector('.c-select__dropdown-item_selected');
        selectedDropdownItem.classList.remove('c-select__dropdown-item_selected');
        selectedItems[0].remove();
    }

    handleSelectedClick(e, selectOptions) {
        [...selectOptions].find(option => {
            return option.value === e.target.previousSibling.textContent;
        }).selected = false;
        e.target.parentElement.remove();
        const selectedDropdownItems = document.querySelectorAll('.c-select__dropdown-item_selected');
        [...selectedDropdownItems].find(item => item.textContent === e.target.parentElement.textContent)
            .classList.remove('c-select__dropdown-item_selected');
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

    filterOptionItems() {
        const input = document.querySelector(`#${this.idSelect} .c-select__input`);
        input.addEventListener('input', (e) => {

            this.dropdownItems.forEach((item, index) => {
                !item.textContent.toLowerCase().includes(e.target.value.toLowerCase()) && index !== 0
                    ? item.classList.add('isHidden') :
                    item.classList.remove('isHidden');
            });

            if ([...this.dropdownItems]
                .filter(elem => elem.classList.contains('isHidden')).length === this.dropdownItems.length - 1) {
                this.firstOptionItem.textContent = 'no results';
            } else this.firstOptionItem.textContent = '';
        });
    }
}