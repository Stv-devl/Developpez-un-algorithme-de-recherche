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
  displayClickedElement(
    item,
    getUlId,
    ingredientList,
    deviceList,
    ustensilList
  ) {
    //if item match with the item list && the <ul> Id we will launch displayElement
    if (
      ingredientList.filter((el) => el.includes(item)).length > 0 &&
      getUlId === "ingredientItem"
    ) {
      this.displayElement(item, "ingredient");
    }
    if (
      deviceList.filter((el) => el.includes(item)).length > 0 &&
      getUlId === "deviceItem"
    ) {
      this.displayElement(item, "device");
    }
    if (
      ustensilList.filter((el) => el.includes(item)).length > 0 &&
      getUlId === "ustensilItem"
    ) {
      this.displayElement(item, "ustensil");
    }
  }

  displayElement(item, itemType) {
    const existingItem = document.getElementById(`item`);
    if (!existingItem) {
      const filterItemWrapper = document.createElement("div");

      if (itemType === "ingredient") {
        filterItemWrapper.classList.add("filter_item_wrapper", "blue");
      }
      if (itemType === "device") {
        filterItemWrapper.classList.add("filter_item_wrapper", "green");
      }
      if (itemType === "ustensil") {
        filterItemWrapper.classList.add("filter_item_wrapper", "red");
      }
      /* filterItemWrapper.setAttribute("id", itemType + item);*/

      const itemTextDisplay = document.createElement("p");
      itemTextDisplay.setAttribute("class", "item_text_display");
      itemTextDisplay.textContent = item;

      const itemLogo = document.createElement("i");
      itemLogo.setAttribute("class", "fa-regular fa-circle-xmark item_logo");

      filterItemWrapper.appendChild(itemTextDisplay);
      filterItemWrapper.appendChild(itemLogo);
      this.displayFilterItem.appendChild(filterItemWrapper);
    } else return;
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
