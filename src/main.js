import './scss/styles.scss';

async function initSelect(idSelect, optionList) {
    if (!optionList) return;
    await createOptionList('option', optionList); //create options for native <select>
    await createOptionList('li', optionList); //create option items for custom select (p elements inside div)   
    const OptionItemState = new Map();
    optionList.forEach(item => OptionItemState.set(item, false));
    setEventListeners();
    //first option item is empty by default
    const firstOptionItem = document.querySelector(`${idSelect} .c-select__dropdown-item:first-of-type`);
    const selectOptions = document.querySelectorAll(`${idSelect} option`);
    const optionItems = document.querySelectorAll(`${idSelect} .c-select__dropdown-item`);
    //pass native <select> options to custom select (li elements inside div)
    selectOptions.forEach((item, index) => optionItems[index].textContent = item.value);
    filterOptionItems();
    //function creates elements
    async function createOptionList(tagName, optionList) {
        const selectOptions = document.querySelector(`${idSelect} .c-select__select`);

        for (let i = 0; i < optionList.length; i++) {
            const optionItem = document.createElement(tagName);
            const dropdownItemList = document.querySelector(`${idSelect} .c-select__dropdown`);
            tagName === 'li' && optionItem.classList.add("c-select__dropdown-item");
            optionItem.textContent = optionList[i];
            if (tagName === 'option') optionItem.value = optionList[i];
            tagName === 'li' && dropdownItemList.appendChild(optionItem);
            tagName === 'option' && selectOptions.appendChild(optionItem);
        }
    }

    function setEventListeners() {
        document.querySelector(`${idSelect} .c-select__option-list`).addEventListener('click', handleClick);
    }

    function handleClick(e) {
        const input = document.querySelector(`${idSelect} .c-select__input`);
        const selectedDiv = document.querySelector(`${idSelect} .c-select__selected`);
        const inputDiv = document.querySelector(`${idSelect} .c-select__input-div`);

        if (e.target.classList.contains('c-select__selected')) {
            input.value = '';
            input.dispatchEvent(new Event('input'));
            selectedDiv.classList.toggle('active');
            inputDiv.classList.toggle('active');
        }

        e.target.classList.contains('c-select__dropdown-item') && handleOptionItemsClick(e, selectedDiv);
        e.target.classList.contains('c-select__selected-remove') && handleSelectedClick(e);
    }

    function handleOptionItemsClick(e, selectedDiv) {
        if (e.target === firstOptionItem) return;
        const selectedArr = [];
        const selectedItems = selectedDiv.querySelectorAll('.c-select__selected-div');
        selectedItems.forEach((elem) => selectedArr.push(elem.textContent));
        !selectedArr.includes(e.target.textContent) && addToSelected();
        e.target.classList.add('c-select__dropdown-item_selected');

        function addToSelected() {
            [...selectOptions].find(option => option.textContent === e.target.textContent).selected = true;
            const selectedItemDiv = document.createElement('div');
            const selectedItemSpan = document.createElement('span');
            const removeItemBtn = document.createElement('button');
            selectedItemDiv.classList.add('c-select__selected-div');
            selectedItemSpan.classList.add('c-select__selected-span');
            removeItemBtn.classList.add('c-select__selected-remove');
            selectedItemSpan.textContent = e.target.textContent;
            selectedItemDiv.appendChild(selectedItemSpan);
            selectedItemDiv.appendChild(removeItemBtn);       
            selectedDiv.appendChild(selectedItemDiv);
        }
    }

    function handleSelectedClick(e) {
        [...selectOptions].find(option => option.textContent === e.target.textContent).selected = false;
        e.target.parentElement.remove();
        const dropdownItem = document.querySelectorAll('.c-select__dropdown-item_selected');
        [...dropdownItem].find(item => item.textContent === e.target.parentElement.textContent)
            .classList.remove('c-select__dropdown-item_selected');
    }
    //filter function
    function filterOptionItems() {
        document.querySelector(`${idSelect} .c-select__input`).addEventListener('input', (e) => {
            const dropdownItems = document.querySelectorAll(`${idSelect} .c-select__dropdown-item`);

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

initSelect("#c-select", ["Fleet carrier administration", "Orbital 2", "Orbital 3"]);
initSelect("#c-select-2", ["Orbital 4", "Orbital 5", "Orbital 6"]);