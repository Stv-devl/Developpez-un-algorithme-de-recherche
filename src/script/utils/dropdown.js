//class for open drowpdown
class DropDown {
  constructor() {
    this.buttons = document.querySelectorAll(".btn");
  }
  //at click on each button launch closePopup or openPopup
  ingredientDropDown() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const dropdownInput = button.nextElementSibling;
        const dropdownList = button.parentElement.children[3];

        if (
          dropdownInput.classList.contains("active") &&
          dropdownList.classList.contains("active")
        ) {
          this.closePopup(dropdownInput, dropdownList);
        } else {
          this.openPopup(dropdownInput, dropdownList);
        }
      });
    });
  }
  //when we open the popup the dropwdown search input and the drowdown ingredient list will be active. Launch getData
  openPopup(dropdownInput, dropdownList) {
    dropdownInput.classList.add("active");
    dropdownList.classList.add("active");
  }
  //when we close the popup the dropwdown search input and the drowdown ingredient we remove active.Launch getData
  closePopup(dropdownInput, dropdownList) {
    dropdownInput.classList.remove("active");
    dropdownList.classList.remove("active");
  }
}

export default DropDown;
