//filter
import KeepData from "../filter/keepdata.js";

//Class for open drowpdown
class DropDown {
  constructor() {
    this.buttons = document.querySelectorAll(".btn");
    this.dropdownInputs = document.querySelectorAll(".dropdown_input");
    this.ingredientLists = document.querySelectorAll(".item_list");
    //
    this.ingredientList = document.querySelector(".dropdown_ingredient_list");
    this.deviceList = document.querySelector(".dropdown_material_list");
    this.utensilList = document.querySelector(".dropdown_utensil_list");
  }

  //drowpDown display lists of ingredients, ustensil and devices.
  async dropDownDisplay(dropdownInput, dropdownList) {
    //launch KeepData Class for get all array, launch getData for get the array from APi.
    const keepdata = new KeepData();
    await keepdata.getData();
    //itemList for get ingredients, ustensils or devices list
    let itemlist;
    let containerList;

    //change itemlist and containerList in function of which "dropdownList" is selected
    switch (dropdownList.id) {
      case "ingredientItem":
        containerList = this.ingredientList;
        itemlist = keepdata.ingredientsListArray;
        break;
      case "deviceItem":
        containerList = this.deviceList;
        itemlist = keepdata.devices;
        break;
      case "ustensilItem":
        containerList = this.utensilList;
        itemlist = keepdata.ustensils;
        break;
    }
    // If have no already <li>, For each "itemList" element create <li> and display item value in the "containerList"
    if (containerList.childElementCount === 0) {
      itemlist.forEach((item) => {
        const dropdownItem = document.createElement("li");
        dropdownItem.setAttribute(
          "class",
          "dropdown_ingredient_item dropdown_item"
        );
        dropdownItem.innerHTML = item;
        containerList.appendChild(dropdownItem);
      });
    } else return;
  }

  //at click on each button launch closePopup or openPopup
  ingredientDropDown() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const dropdownInput = button.parentElement.children[1];
        const dropdownList = button.parentElement.children[3];
        if (
          dropdownInput.classList.contains("active") &&
          dropdownList.classList.contains("active")
        )
          return this.closePopup(dropdownInput, dropdownList);
        else return this.openPopup(dropdownInput, dropdownList);
      });
    });
  }
  //when we open the popup the dropwdonw search input and the drowdown ingredient list will be active. Launch getData
  openPopup(dropdownInput, dropdownList) {
    dropdownInput.classList.add("active");
    dropdownList.classList.add("active");
    this.dropDownDisplay(dropdownInput, dropdownList);
  }
  //when we close the popup the dropwdown search input and the drowdown ingredient we remove active.Launch getData
  closePopup(dropdownInput, dropdownList) {
    dropdownInput.classList.remove("active");
    dropdownList.classList.remove("active");
  }
}

export default DropDown;
