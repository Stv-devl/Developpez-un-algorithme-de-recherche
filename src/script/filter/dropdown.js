//filter
import DropDownCard from "../template/dropDownCardTemplate.js";

//Class for open drowpdown
class DropDown {
  constructor() {
    this.buttons = document.querySelectorAll(".btn");
    this.dropdownInputs = document.querySelectorAll(".dropdown_input");
    this.ingredientLists = document.querySelectorAll(".item_list");
    this.ingredientList = document.querySelector(".dropdown_ingredient_list");
    this.deviceList = document.querySelector(".dropdown_material_list");
    this.utensilList = document.querySelector(".dropdown_utensil_list");
    this.keepdata = new KeepData();
    this.menuList = [];
    this.itemlist;
    this.containerList;
  }

  // If have no already <li>, For each "itemList" element create <li> and display item value in the "containerList"
  dropDownDisplay() {
    if (this.containerList.childElementCount === 0) {
      this.itemlist.forEach((item) => {
        const dropdownCardTemplate = new DropDownCard(item);
        this.containerList.appendChild(
          dropdownCardTemplate.dropDownDisplayDom()
        );
      });
    } else return;
  }
  //at click on each button launch closePopup or openPopup
  ingredientDropDown(menus) {
    this.menuList = menus;
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
          this.filterItemArray(dropdownList);
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
