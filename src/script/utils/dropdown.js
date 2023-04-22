//filter
import FilterSearch from "../filter/searchv1.js";
/*import FilterSearch from "../filter/searchv2.js";*/

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

        if (!dropdownContainer.classList.contains("active")) {
          this.openPopup(dropdownContainer);
        }
        return;
      });
    });
    this.buttonClose.forEach((button) => {
      button.addEventListener("click", (e) => {
        const dropdownContainer = button.parentElement.parentElement;

        if (dropdownContainer.classList.contains("active")) {
          this.closePopup(dropdownContainer);
        } else {
          this.openPopup(dropdownContainer);
        }
      });
    });
  }
  //when we open the popup the dropdown_container will be active.
  openPopup(dropdownContainer) {
    dropdownContainer.classList.add("active");
  }
  //when we close the popup the dropdown_container will be active.
  closePopup(dropdownContainer) {
    console.log("ça ferme");
    dropdownContainer.classList.remove("active");
  }
}

export default DropDown;
