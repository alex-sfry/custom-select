export default function createHTML(idSelect, select) {
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

    const inputElem = createElem('input', classList.input, [['type', 'text']]);
    const ulElem = createElem('ul', classList.dropdown, [['data-id', idSelect]]);
    const liElem = createElem('li', classList.dropdownItem);
    ulElem.appendChild(liElem);
    
    let divElem = createElem('div', classList.wrapper);
    divElem.style.width = `${select.offsetWidth}px`;
    select.parentNode.insertBefore(divElem, select);
    divElem.appendChild(select);
    select.classList.add("isHidden");

    const wrapper = divElem;
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