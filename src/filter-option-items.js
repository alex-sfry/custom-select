export default function filterOptionItems() {
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