class DropDownCard {
  constructor(ingredientList, deviceList, ustensilList) {
    this.displayFilterItem = document.querySelector(".display_filter_item");
    this.ingredientItem = document.getElementById("ingredientItem");
    this.deviceItem = document.getElementById("deviceItem");
    this.ustensilItem = document.getElementById("ustensilItem");
    this.ingredientList = ingredientList;
    this.deviceList = deviceList;
    this.ustensilList = ustensilList;
  }

  //display in dom clicked element
  displayClickedElement(item) {
    const existingItem = document.getElementById(`item`);
    if (existingItem) {
      return;
    } else {
      const filterItemWrapper = document.createElement("div");
      filterItemWrapper.setAttribute("class", "filter_item_wrapper");
      filterItemWrapper.setAttribute("id", item);

      const itemTextDisplay = document.createElement("p");
      itemTextDisplay.setAttribute("class", "item_text_display");
      itemTextDisplay.textContent = item;

      const itemLogo = document.createElement("i");
      itemLogo.setAttribute("class", "fa-regular fa-circle-xmark item_logo");

      itemTextDisplay.appendChild(itemLogo);
      filterItemWrapper.appendChild(itemTextDisplay);
      this.displayFilterItem.appendChild(filterItemWrapper);
      //mettre grid CSS comme cards?
    }
  }

  //send all the items lists to the dom function
  elementListDisplay(ingredientList, deviceList, ustensilList) {
    //empty the li before add new one
    ingredientItem.innerHTML = "";
    deviceItem.innerHTML = "";
    ustensilItem.innerHTML = "";

    ingredientList.forEach((item) => {
      this.listDisplayDom(item, "ingredientItem");
    });
    deviceList.forEach((item) => {
      this.listDisplayDom(item, "deviceItem");
    });
    ustensilList.forEach((item) => {
      this.listDisplayDom(item, "ustensilItem");
    });
  }
  //display the Item Lists in the dom
  listDisplayDom(item, itemList) {
    const dropdownItem = document.createElement("li");
    dropdownItem.setAttribute(
      "class",
      `dropdown_${itemList}_item dropdown_item`
    );
    dropdownItem.innerHTML = item;

    if (itemList === "ingredientItem") {
      this.ingredientItem.appendChild(dropdownItem);
    } else if (itemList === "deviceItem") {
      this.deviceItem.appendChild(dropdownItem);
    } else if (itemList === "ustensilItem") {
      this.ustensilItem.appendChild(dropdownItem);
    }
  }
}

export default DropDownCard;
