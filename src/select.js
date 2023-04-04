import './scss/styles.scss';
import createHTML from './createhtml.js';

export class Select {
    constructor(config) {
        if (!config.select) {
            return console.log('provide id of select element');
        }

        this.select = document.querySelector(`#${config.select}`);
        this.multi = this.select.multiple;

        if (!this.select) {
            return console.log(`select element with id '${config.select}' not found`);
        }

        this.createHTML = createHTML.bind(this);
        this.idSelect = `c-select${this.uniqueID()}`;
        this.options = this.select.querySelectorAll('option');
        this.createHTML();
        this.createOptionList();
        this.firstOptionItem = document.querySelector(`#${this.idSelect} .c-select__dropdown-item:first-of-type`);
        this.selectOptions = document.querySelectorAll(`#${this.idSelect} option`);
        this.setEventListeners(config);
        this.filterOptionItems();
    }

    uniqueID() {
        return Math.floor(Math.random() * Date.now()).toString();
    }

    setEventListeners(config) {
        document.querySelector(`#${this.idSelect} .c-select__option-list`)
            .addEventListener('click', (e) => this.handleClick(e, this.idSelect, config));

        document.querySelector('body')
            .addEventListener('click', (e) => this.handleOutsideClick(e, this.idSelect));
        
        document.querySelectorAll(`#${this.idSelect} .c-select__dropdown-item`)
            .forEach(item => item.addEventListener("keydown", (e) => this.handleKeyboard(e, this.idSelect, config)));

        document.querySelectorAll(`.c-select__dropdown-item`).forEach(item => {
            item.addEventListener('focus', (e) => e.target.focus());
        });
    }

    handleKeyboard(e, idSelect, config) {
        if (!e.target.classList.contains('c-select__dropdown-item')) return;
        const SPACEBAR_KEY_CODE = 32;
        const ENTER_KEY_CODE = 13;
        const UP_KEY_CODE = 38;
        const DOWN_KEY_CODE = 40;
        const dropdownItems = document.querySelectorAll(`#${idSelect} .c-select__dropdown-item`);
        
        switch (e.keyCode) {
            case ENTER_KEY_CODE :
                this.handleClick(e, idSelect, config);
                break;
            case SPACEBAR_KEY_CODE :
                this.handleClick(e, idSelect, config);
                break;
            case UP_KEY_CODE :
                dropdownItems.forEach((item, index) => {
                    if (item === e.target) {
                        item.dispatchEvent(new Event('blur'));
                        index > 1 ? dropdownItems[index - 1].dispatchEvent(new Event('focus'))
                        : dropdownItems[dropdownItems.length - 1]
                            .dispatchEvent(new Event('focus'));                       
                    }
                });
                break;
            case DOWN_KEY_CODE :
                dropdownItems.forEach((item, index) => {
                    if (item === e.target) {
                        item.dispatchEvent(new Event('blur'));
                        index < dropdownItems.length - 1 ? dropdownItems[index + 1].dispatchEvent(new Event('focus'))
                        : dropdownItems[1].dispatchEvent(new Event('focus'));   
                    }
                });
            break;                       
        }
    }

    handleOutsideClick(e, idSelect) {
        const selectedDiv = document.querySelector(`#${idSelect} .c-select__selected`);
        const inputDiv = document.querySelector(`#${idSelect} .c-select__input-div`);
        const arrowIcon = document.querySelector(`#${idSelect} .c-select__arrow-icon`);
        const dropdown = document.querySelector(`#${idSelect} .c-select__dropdown`);

        if (selectedDiv.classList.contains('active')) {
            if (this.isClickedOutside(e)) {
                selectedDiv.classList.remove('active');
                inputDiv.classList.remove('active');
                arrowIcon.classList.remove('active');
                dropdown.classList.remove('active');
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

    handleClick(e, idSelect, config) {
        const input = document.querySelector(`#${idSelect} .c-select__input`);
        const selectedDiv = document.querySelector(`#${idSelect} .c-select__selected`);
        const inputDiv = document.querySelector(`#${idSelect} .c-select__input-div`);
        const activeSelects = document.querySelectorAll(`.c-select__option-list .active`);
        const arrowIcon = document.querySelector(`#${idSelect} .c-select__arrow-icon`);
        const dropdown = document.querySelector(`#${idSelect} .c-select__dropdown`);

        if (e.target.classList.contains('c-select__selected') ||
            e.target.classList.contains('c-select__arrow') ||
            e.target.classList.contains('c-select__arrow-icon')) {
            input.value = '';
            input.dispatchEvent(new Event('input'));
            selectedDiv.classList.toggle('active');
            inputDiv.classList.toggle('active');
            arrowIcon.classList.toggle('active');
            dropdown.classList.toggle('active');

            if (activeSelects.length >= 4) {
                activeSelects.forEach(select => {
                    select.dataset.id !== this.idSelect && select.classList.toggle('active');
                });
            }
        }

        e.target.classList.contains('c-select__dropdown-item') && this.handleOptionItemsClick(e, this.idSelect, config);
        e.target.classList.contains('c-select__selected-remove') && this.handleSelectedClick(e, this.selectOptions);
    }

    handleOptionItemsClick(e, idSelect, config) {
        const selectedDiv = document.querySelector(`#${idSelect} .c-select__selected`);
        if (e.target === this.firstOptionItem) return;
        const selectedArr = [];
        const selectedItems = selectedDiv.querySelectorAll('.c-select__selected-div');
        selectedItems.forEach(elem => selectedArr.push(elem.textContent));
        !selectedArr.includes(e.target.textContent) &&
            this.addToSelected(e, this.selectOptions, config, selectedDiv, selectedItems);
        e.target.classList.add('c-select__dropdown-item_selected');
    }

    addToSelected(e, selectOptions, config, selectedDiv, selectedItems) {
        if (!this.multi && selectedItems.length > 0){
            this.handleSingleSelect(e, selectedItems, selectOptions);
        } 
        [...selectOptions].find(option => option.value === e.target.textContent).selected = true;       
        const selectedItemDiv = document.createElement('div');
        const selectedItemP = document.createElement('p');
        const removeItemBtn = document.createElement('button');
        selectedItemDiv.classList.add('c-select__selected-div');
        selectedItemP.classList.add('c-select__selected-p');
        removeItemBtn.classList.add('c-select__selected-remove');
        selectedItemP.textContent = e.target.textContent;
        selectedItemDiv.appendChild(selectedItemP);
        selectedItemDiv.appendChild(removeItemBtn);
        selectedDiv.appendChild(selectedItemDiv);
    }

    handleSingleSelect(e, selectedItems) {
        const selectedDropdownItem = document.querySelector('.c-select__dropdown-item_selected');
        selectedDropdownItem.classList.remove('c-select__dropdown-item_selected');
        selectedItems[0].remove();
    }

    handleSelectedClick(e, selectOptions) {
        [...selectOptions].find(option =>{
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
            optionItem.tabIndex='0';
            dropdownItemList.appendChild(optionItem);
        }
    }

    filterOptionItems() {
        const input = document.querySelector(`#${this.idSelect} .c-select__input`);
        input.addEventListener('input', (e) => {
            const dropdownItems = document.querySelectorAll(`#${this.idSelect} .c-select__dropdown-item`);

            dropdownItems.forEach((item, index) => {
                !item.textContent.toLowerCase().includes(e.target.value.toLowerCase()) && index !== 0
                    ? item.classList.add('isHidden') :
                    item.classList.remove('isHidden');
            });

            if ([...dropdownItems]
                .filter(elem => elem.classList.contains('isHidden')).length === dropdownItems.length - 1) {
                this.firstOptionItem.textContent = 'no results';
            } else this.firstOptionItem.textContent = '';
        });
    }
}