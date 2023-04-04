export default function createHTML() {
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

    const inputElem = createElement('input', classList.input, [['type', 'text']]);
    const ulElem = createElement('ul', classList.dropdown, [['data-id', this.idSelect]]);
    const liElem = createElement('li', classList.dropdownItem);
    ulElem.appendChild(liElem);

    let divElem = createElement('div', classList.wrapper);
    divElem.style.width = `${this.select.offsetWidth}px`;
    this.select.parentNode.insertBefore(divElem, this.select);
    divElem.appendChild(this.select);
    this.select.classList.add("select-hidden");

    const wrapper = divElem;
    wrapper.id = this.idSelect;
    divElem = createElement('div', classList.optionList);
    wrapper.appendChild(divElem);
    const optionList = wrapper.querySelector(`.${classList.optionList}`);
    divElem = createElement('div', classList.selected, [['data-id', this.idSelect]]);

    //if single select add specific class
    !this.isMulti ? divElem.classList.add('c-select__selected_single') : null;

    optionList.appendChild(divElem);
    const selected = optionList.querySelector(`.${classList.selected}`);
    divElem = createElement('div', classList.arrow);
    divElem.innerHTML = `<svg width="14px" height="14px" viewBox="0 0 1024 1024" class="c-select__arrow-icon" 
    data-id = ${this.idSelect} version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000" /></svg>`;
    selected.appendChild(divElem);
    divElem = createElement('div', classList.inputDiv, [['data-id', this.idSelect]]);
    optionList.appendChild(divElem);
    const inputDiv = optionList.querySelector(`.${classList.inputDiv}`);
    inputDiv.appendChild(inputElem);
    inputDiv.appendChild(ulElem);
}

function createElement(tagName, className, attrList) {
    const newElem = document.createElement(tagName);
    if (className) newElem.className = className;
    if (!attrList) return newElem;
    for (const attr of attrList) newElem.setAttribute(attr[0], attr[1]);
    return newElem;
}