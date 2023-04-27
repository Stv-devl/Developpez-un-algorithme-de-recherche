//class for open drowpdown
class DropDown {
  constructor() {
    this.buttons = document.querySelectorAll(".dropdown_input");
    this.buttonClose = document.querySelectorAll(".btnClose");
  }
  //at click on each button launch closePopup or openPopup
  ingredientDropDown() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const dropdownContainer = button.parentElement.parentElement;
        const dropdownIcone = button.parentElement.children[1];

        if (!dropdownContainer.classList.contains("active")) {
          this.openPopup(dropdownContainer, dropdownIcone);
        }
        return;
      });
    });
    this.buttonClose.forEach((button) => {
      button.addEventListener("click", (e) => {
        const dropdownContainer = button.parentElement.parentElement;
        if (dropdownContainer.classList.contains("active")) {
          this.closePopup(dropdownContainer, button);
        } else {
          this.openPopup(dropdownContainer, button);
        }
      });
    });
  }
  //when we open the popup the dropdown_container will be active.
  openPopup(dropdownContainer, dropdownIcone) {
    dropdownContainer.classList.add("active");
    dropdownIcone.classList.add("rotate");
  }
  //when we close the popup the dropdown_container will be active.
  closePopup(dropdownContainer, dropdownIcone) {
    dropdownContainer.classList.remove("active");
    dropdownIcone.classList.remove("rotate");
  }
}

export default DropDown;
