import './scss/styles.scss';

export class Select {
    constructor(config) {
        if (!config.select) {
            return console.log('provide id of select element');
        }

        this.select = document.querySelector(`#${config.select}`);

        if (!this.select) {
            return console.log(`select element with id '${config.select}' not found`);
        }

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
        const activeSelects = document.querySelectorAll('.c-select__option-list .active');
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
        e.target.classList.contains('c-select__selected-remove') && this.handleSelectedClick(e);
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
        [...selectOptions].find(option => option.textContent === e.target.textContent).selected = true;
        if (config.type !== 'multi' && selectedItems.length > 0) this.handleSingleSelect(selectedItems);
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

    handleSingleSelect(selectedItems) {
        const selectedDropdownItem = document.querySelector('.c-select__dropdown-item_selected');
        selectedDropdownItem.classList.remove('c-select__dropdown-item_selected');
        selectedItems[0].remove();
    }

    handleSelectedClick(e) {
        [...this.selectOptions].find(option => option.textContent === e.target.textContent).selected = false;
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

    createHTML() {
        const classList = {
            wrapper: 'c-select',
            optionList: 'c-select__option-list',
            selected: 'c-select__selected',
            inputDiv: 'c-select__input-div',
            input: 'c-select__input',
            dropdown: 'c-select__dropdown',
            dropdownItem: 'c-select__dropdown-item',
            arrow: 'c-select__arrow',
            selectedDiv: 'c-select__selected-div',
        };

        const inputElem = this.Elem('input', classList.input, [['type', 'text']]);
        const ulElem = this.Elem('ul', classList.dropdown, [['data-id', this.idSelect]]);
        const liElem = this.Elem('li', classList.dropdownItem);
        ulElem.appendChild(liElem);

        let divElem = this.Elem('div', classList.wrapper);
        divElem.style.width = `${this.select.offsetWidth}px`;
        this.select.parentNode.insertBefore(divElem, this.select);
        divElem.appendChild(this.select);
        this.select.classList.add("isHidden");

        const wrapper = divElem;
        wrapper.id = this.idSelect;
        divElem = this.Elem('div', classList.optionList);
        wrapper.appendChild(divElem);
        const optionList = wrapper.querySelector(`.${classList.optionList}`);
        divElem = this.Elem('div', classList.selected, [['data-id', this.idSelect]]);
        optionList.appendChild(divElem);
        const selected = optionList.querySelector(`.${classList.selected}`);
        divElem = this.Elem('div', classList.arrow);
        divElem.innerHTML = `<svg width="14px" height="14px" viewBox="0 0 1024 1024" class="c-select__arrow-icon" 
		data-id = ${this.idSelect} version="1.1" xmlns="http://www.w3.org/2000/svg">
		<path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000" /></svg>`;
        selected.appendChild(divElem);
        divElem = this.Elem('div', classList.inputDiv, [['data-id', this.idSelect]]);
        optionList.appendChild(divElem);
        const inputDiv = optionList.querySelector(`.${classList.inputDiv}`);
        inputDiv.appendChild(inputElem);
        inputDiv.appendChild(ulElem);
    }

    Elem(tagName, className, attrList) {
        const newElem = document.createElement(tagName);
        if (className) newElem.className = className;
        if (!attrList) return newElem;
        for (const attr of attrList) newElem.setAttribute(attr[0], attr[1]);
        return newElem;
    }
}