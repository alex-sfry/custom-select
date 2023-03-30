import './scss/styles.scss';

function initSelect(config) {
    if (!config.optionList) return;
    const uniqueID = () => Math.floor(Math.random() * Date.now()).toString();
    const idSelect = `c-select${uniqueID()}`; //select element unique id
    createHTML(idSelect, config.name, config.type);
    createOptionList('option', config.optionList); //create options for native <select>
    createOptionList('li', config.optionList); //create option items for custom select (p elements inside div)

    const OptionItemState = new Map(); //useless for now
    config.optionList.forEach(item => OptionItemState.set(item, false)); //useless for now

    const wrapperDiv = document.querySelector(`#${idSelect}`);
    ['S', 'M', 'L', 'XL', 'parent'].includes(config.elemSize) &&
        wrapperDiv.classList.add(`c-select_size_${config.elemSize}`);

    //first option item is empty by default
    const firstOptionItem = document.querySelector(`#${idSelect} .c-select__dropdown-item:first-of-type`);
    const selectOptions = document.querySelectorAll(`#${idSelect} option`);
    const optionItems = document.querySelectorAll(`#${idSelect} .c-select__dropdown-item`);
    setEventListeners();

    //pass native <select> options to custom select (li elements inside div)
    selectOptions.forEach((item, index) => optionItems[index].textContent = item.value);
    filterOptionItems();

    //function creates elements
    async function createOptionList(tagName, optionList) {
        const selectOptions = document.querySelector(`#${idSelect} .c-select__select`);

        for (let i = 0; i < optionList.length; i++) {
            const optionItem = document.createElement(tagName);
            const dropdownItemList = document.querySelector(`#${idSelect} .c-select__dropdown`);
            tagName === 'li' && optionItem.classList.add("c-select__dropdown-item");
            optionItem.textContent = optionList[i];
            if (tagName === 'option') optionItem.value = optionList[i];
            tagName === 'li' && dropdownItemList.appendChild(optionItem);
            tagName === 'option' && selectOptions.appendChild(optionItem);
        }
    }

    function setEventListeners() {
        document.querySelector(`#${idSelect} .c-select__option-list`).addEventListener('click', handleClick);
        document.querySelector('body').addEventListener('click', handleOutsideClick);
    }

    function handleOutsideClick(e) {
        const selectedDiv = document.querySelector(`#${idSelect} .c-select__selected`);
        const inputDiv = document.querySelector(`#${idSelect} .c-select__input-div`);
        const arrowIcon = document.querySelector(`#${idSelect} .c-select__arrow-icon`);
        const dropdown = document.querySelector(`#${idSelect} .c-select__dropdown`);

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
        let isOutside = true;
        classListArr.forEach(item => e.target.classList.contains(item) ? isOutside = false : undefined);
        return isOutside;
    }

    function handleClick(e) {
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
                    select.dataset.id !== idSelect && select.classList.toggle('active');
                });
            }
        }

        e.target.classList.contains('c-select__dropdown-item') && handleOptionItemsClick(e);
        e.target.classList.contains('c-select__selected-remove') && handleSelectedClick(e);
    }

    function handleOptionItemsClick(e) {
        const selectedDiv = document.querySelector(`#${idSelect} .c-select__selected`);
        if (e.target === firstOptionItem) return;
        const selectedArr = [];
        const selectedItems = selectedDiv.querySelectorAll('.c-select__selected-div');       
        selectedItems.forEach(elem => selectedArr.push(elem.textContent));
        !selectedArr.includes(e.target.textContent) && addToSelected();
        e.target.classList.add('c-select__dropdown-item_selected');

        function addToSelected() {
            [...selectOptions].find(option => option.textContent === e.target.textContent).selected = true;
            if (config.type !== 'multi' && selectedItems.length > 0) handleSingleSelect();
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

            function handleSingleSelect() {
                const selectedDropdownItem = document.querySelector('.c-select__dropdown-item_selected');
                selectedDropdownItem.classList.remove('c-select__dropdown-item_selected');
                selectedItems[0].remove();
            }
        }  
    }

    function handleSelectedClick(e) {
        [...selectOptions].find(option => option.textContent === e.target.textContent).selected = false;
        e.target.parentElement.remove();
        const selectedDropdownItems = document.querySelectorAll('.c-select__dropdown-item_selected');
        [...selectedDropdownItems].find(item => item.textContent === e.target.parentElement.textContent)
            .classList.remove('c-select__dropdown-item_selected');
    }

    //filter function
    function filterOptionItems() {
        const input = document.querySelector(`#${idSelect} .c-select__input`);
        input.addEventListener('input', (e) => {
            const dropdownItems = document.querySelectorAll(`#${idSelect} .c-select__dropdown-item`);

            dropdownItems.forEach((item, index) => {
                !item.textContent.toLowerCase().includes(e.target.value.toLowerCase()) && index !== 0
                    ? item.classList.add('isHidden') :
                    item.classList.remove('isHidden');
            });

            if ([...dropdownItems]
                .filter(elem => elem.classList.contains('isHidden')).length === dropdownItems.length - 1) {
                firstOptionItem.textContent = 'no results';
            } else firstOptionItem.textContent = '';
        });
    }

    //create initial HTML and put it inside parent element
    function createHTML(idSelect, name, type) {
        const classList = {
            wrapper: 'c-select',
            select: 'c-select__select',
            optionList: 'c-select__option-list',
            selected: 'c-select__selected',
            inputDiv: 'c-select__input-div',
            input: 'c-select__input',
            dropdown: 'c-select__dropdown',
            dropdownItem: 'c-select__dropdown-item',
            arrow: 'c-select__arrow',
            selectedDiv: 'c-select__selected-div',
        };
        const container = document.querySelector(`.${config.parentContainer}`);
        const selectElem = createElem('select', classList.select, [['name', name]]);
        type === 'multi' ? selectElem.setAttribute('multiple', 'multiple') : null;
        const selectOptionElem = createElem('option');
        selectElem.appendChild(selectOptionElem);
        const inputElem = createElem('input', classList.input, [['type', 'text']]);
        const ulElem = createElem('ul', classList.dropdown, [['data-id', idSelect]]);
        const liElem = createElem('li', classList.dropdownItem);
        ulElem.appendChild(liElem);
        
        let divElem = createElem('div', classList.wrapper);
        divElem.appendChild(selectElem);
        container.appendChild(divElem);

        const wrapper = container.querySelector(`.${classList.wrapper}`);
        wrapper.id = idSelect;
        divElem = createElem('div', classList.optionList);
        wrapper.appendChild(divElem);
        const optionList = wrapper.querySelector(`.${classList.optionList}`);
        divElem = createElem('div', classList.selected, [['data-id', idSelect]]);
        optionList.appendChild(divElem);
        const selected = optionList.querySelector(`.${classList.selected}`);
        divElem = createElem('div', classList.arrow);
        divElem.innerHTML = `<svg width="14px" height="14px" viewBox="0 0 1024 1024" class="c-select__arrow-icon" 
        data-id = ${idSelect} version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000" /></svg>`;
        selected.appendChild(divElem);
        divElem =createElem('div', classList.inputDiv, [['data-id', idSelect]]);
        optionList.appendChild(divElem);
        const inputDiv = optionList.querySelector(`.${classList.inputDiv}`);
        inputDiv.appendChild(inputElem);
        inputDiv.appendChild(ulElem);

        function createElem(tagName, className, attrList) {
            const newElem = document.createElement(tagName);
            if (className) newElem.className = className; 
            if (!attrList) return newElem;
            for (const attr of attrList) newElem.setAttribute(attr[0], attr[1]);
            return newElem;           
        }
    }
}

initSelect({
    elemSize: 'parent',
    optionList: [
        "Fleet carrier administration", "Orbital 2", "Orbital 3", "Orbital 4", "Orbital 5", "Orbital 6"
    ],
    parentContainer: 'container-1',
    name: 'station_type[]'
});
initSelect({
    elemSize: 'parent',
    optionList: [
        "Fleet carrier administration", "Orbital 2", "Orbital 3", "Orbital 4", "Orbital 5", "Orbital 6"
    ],
    parentContainer: 'container-2',
    name: 'station_services[]',
    type: 'multi'
});