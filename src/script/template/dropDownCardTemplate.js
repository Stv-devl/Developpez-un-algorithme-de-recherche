class DropDownCard {
  constructor() {
    this.displayFilterItem = document.querySelector(".display_filter_item");
    this.ingredientItem = document.getElementById("ingredientItem");
    this.deviceItem = document.getElementById("deviceItem");
    this.ustensilItem = document.getElementById("ustensilItem");
  }

  //display in dom the clicked element
  displayClickedElement(item, getUlId) {
    const itemType = getUlId.split("I")[0];
    const existingItem = document.getElementById(`item`);

    if (!existingItem) {
      const filterItemWrapper = document.createElement("div");
      //add color to the items
      filterItemWrapper.classList.add(
        "filter_item_wrapper",
        itemType === "ingredient"
          ? "blue"
          : itemType === "device"
          ? "green"
          : "red"
      );
      //create html elements
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
    this.ingredientItem.innerHTML = "";
    this.deviceItem.innerHTML = "";
    this.ustensilItem.innerHTML = "";

    const itemList = [ingredientList, deviceList, ustensilList];
    const itemType = ["ingredientItem", "deviceItem", "ustensilItem"];

    itemList.forEach((itemList, index) => {
      itemList.forEach((item) => {
        this.listDisplayDom(item, itemType[index]);
      });
    });
  }

  //display the Item Lists in the dom
  listDisplayDom(item, itemType) {
    console.log(item, itemType);
    const dropdownItem = document.createElement("li");
    dropdownItem.setAttribute(
      "class",
      `dropdown_${itemType}_item dropdown_item`
    );
    dropdownItem.innerHTML = item;
    //choose the appendChild in fonction of item type
    console.log(this[itemType]);
    this[itemType].appendChild(dropdownItem);
  }
}

export default DropDownCard;
