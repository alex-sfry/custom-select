import './scss/styles.scss';
import createHTML from './createHTML';

function initSelect(config) {
    if (!config.select) return;
    const select = document.querySelector(`#${config.select}`); //existing select element
    const uniqueID = () => Math.floor(Math.random() * Date.now()).toString();
    const idSelect = `c-select${uniqueID()}`; //select element id
    const options = select.querySelectorAll('option');

    createHTML(idSelect, select); //create main html
    createOptionList(); //create options for native <select>
    
    const firstOptionItem = document.querySelector(`#${idSelect} .c-select__dropdown-item:first-of-type`);
    const selectOptions = document.querySelectorAll(`#${idSelect} option`);

    setEventListeners();
    filterOptionItems();

    //function creates elements
    async function createOptionList() {
        for (let i = 1; i < options.length; i++) {
            const optionItem = document.createElement('li');
            const dropdownItemList = document.querySelector(`#${idSelect} .c-select__dropdown`);
            optionItem.classList.add("c-select__dropdown-item");
            optionItem.textContent = options[i].value;
            dropdownItemList.appendChild(optionItem);
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
}

initSelect({
    select: 'sel1',
});
initSelect({
    select: 'sel2',
    type: 'multi',
});