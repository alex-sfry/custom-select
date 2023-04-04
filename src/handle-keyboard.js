export default function handleKeyboard(e) {
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