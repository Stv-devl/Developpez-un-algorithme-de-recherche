//index
import App from "../page/index.js";
import DropDownCard from "../template/dropDownCardTemplate.js";

class FilterSearch {
  constructor() {
    this.search = document.getElementById("search");
    this.ingredientItem = document.getElementById("ingredientItem");
    this.deviceItem = document.getElementById("deviceItem");
    this.ustensilItem = document.getElementById("ustensilItem");
    this.displayFilterItem = document.querySelector(".display_filter_item");
    this.listArray = []; // element list from Apy
    this.filteredList = []; // element list
    this.filterClickedElement = []; // to keep filtered element at click
    this.ingredientList = [];
    this.deviceList = [];
    this.ustensilList = [];
    this.itemInputValue = ""; //to keep input data
    this.searchInputValue = ""; //to keep input data
    this.inputId;
    this.containerList;
    this.app = new App();
    this.dropdowncard = new DropDownCard();
  }
  //Fonction to take care all filter
  searchFilter(remove) {
    if (remove) {
      this.filteredWitchClickedArray();
    }
    //ici on va filtrer les 3 sous-tableaux quand on va taper dans les inputs des items. le filtre ne sera pas enregistrer dans this.filteredList. Il faudra surement créer une autre variable
    if (
      this.itemInputValue.length >= 1 /*&& this.searchInputValue.length < 3*/
    ) {
      this.filterWithItemInput();
      this.dropdowncard.elementListDisplay(
        this.ingredientList,
        this.deviceList,
        this.ustensilList
      );
    }
    this.listenClickOnList();
    //si on clique sur un des boutons on ajoute un element un filtre dans un tableau. Cette element peux être supprimé au clique dans le dom
    if (
      this.filterClickedElement.length > 0 &&
      this.itemInputValue.length === 0
    ) {
      this.filteredWitchClickedArray();
      this.launchItemFilter();
      this.app.launchingFiltered(this.filteredList);
    }
    //si plus 3 elements dans input search et que rien n'est écrit dans l'inputValue On lance launchItemFilter et on display.
    if (this.searchInputValue.length >= 3 && this.itemInputValue.length === 0) {
      this.launchItemFilter();
      this.app.launchingFiltered(this.filteredList);
    }
    //si rien n'est écris dans l'input search & items & rien n'est cliqué
    if (
      this.itemInputValue.length === 0 &&
      this.search.value.length === 0 &&
      this.filterClickedElement.length === 0
    ) {
      this.filteredList = this.listArray;
      this.launchItemFilter();
      this.app.launchingFiltered(this.filteredList);
    }
  }

  //launch item filter functions, filters item, and send to dom card
  launchItemFilter() {
    this.filteredMenusIngredient();
    this.filteredMenusDevice();
    this.filteredMenusUstensil();
    this.dropdowncard.elementListDisplay(
      this.ingredientList,
      this.deviceList,
      this.ustensilList
    );
    this.listenClickOnList();
    this.closeItemLogo();
  }

  //filter for search bar
  filterSearchMenu() {
    //if user write uppercase in input it will become lowercase
    const inputResult = this.searchInputValue.toLowerCase();
    //filter description, appliance, name, ustensils, ingredients
    const filterMenus = this.listArray.filter(
      (el) =>
        el.description.toLowerCase().includes(inputResult) ||
        el.appliance.toLowerCase().includes(inputResult) ||
        el.name.toLowerCase().includes(inputResult) ||
        el.ustensils.some((element) =>
          element.toLowerCase().includes(inputResult)
        ) ||
        el.ingredients.some((ingr) =>
          ingr.ingredient.toLowerCase().includes(inputResult)
        )
    );
    return filterMenus;
  }

  filteredWitchClickedArray() {
    //every for read all elements in the array
    if (
      this.searchInputValue.length >= 3 ||
      this.filterClickedElement.length > 1
    ) {
      this.filteredList = this.filterSearchMenu().filter((el) =>
        this.filterClickedElement.every(
          (filterEl) =>
            filterEl.toLowerCase().includes(el.appliance.toLowerCase()) ||
            el.ustensils.some((element) =>
              filterEl.toLowerCase().includes(element.toLowerCase())
            ) ||
            el.ingredients.some((ingr) =>
              filterEl.toLowerCase().includes(ingr.ingredient.toLowerCase())
            )
        )
      );
    } else {
      this.filteredList = this.listArray.filter((el) =>
        this.filterClickedElement.some(
          (filterEl) =>
            filterEl.toLowerCase().includes(el.appliance.toLowerCase()) ||
            el.ustensils.some((element) =>
              filterEl.toLowerCase().includes(element.toLowerCase())
            ) ||
            el.ingredients.some((ingr) =>
              filterEl.toLowerCase().includes(ingr.ingredient.toLowerCase())
            )
        )
      );
    }
  }
  //filter item dropwdown elements when we write in the input
  filterWithItemInput() {
    console.log(this.ingredientList);
    console.log(this.inputId);

    const inputResult = this.itemInputValue.toLowerCase();
    switch (this.inputId) {
      case "inputIngredient":
        this.ingredientList = this.ingredientList.filter((el) =>
          el.toLowerCase().includes(inputResult)
        );
        break;
      case "inputDevice":
        this.deviceList = this.deviceList.filter((el) =>
          el.toLowerCase().includes(inputResult)
        );
        break;
      case "inputUstensil":
        this.ustensilList = this.ustensilList.filter((el) =>
          el.toLowerCase().includes(inputResult)
        );
        break;
    }
    console.log(this.ingredientList);
  }

  filteredMenusIngredient() {
    this.ingredientList = this.filteredList
      .flatMap((data) => data.ingredients.flatMap((ing) => ing.ingredient))
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b));
    return this.ingredientList;
  }

  filteredMenusDevice() {
    this.deviceList = this.filteredList
      .map((data) => data.appliance)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b));
    return this.deviceList;
  }

  filteredMenusUstensil() {
    this.ustensilList = this.filteredList
      .flatMap((data) => data.ustensils)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b));
    return this.ustensilList;
  }

  //addeventlistener for items inputs
  listenItemInput() {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const dropdownInput = button.nextElementSibling;
        this.inputId = button.parentElement.children[1].id;
        dropdownInput.addEventListener("input", (e) => {
          this.itemInputValue = e.target.value;
          this.searchFilter();
        });
      });
    });
  }
  //AddEventListener at click on element from item list
  listenClickOnList() {
    const dropdownItem = document.querySelectorAll(".dropdown_item");
    dropdownItem.forEach((button) => {
      button.addEventListener("click", (e) => {
        const item = e.target.textContent;
        if (!this.filterClickedElement.includes(item)) {
          this.filterClickedElement.push(item);
          this.dropdowncard.displayClickedElement(item);
          this.searchFilter();
        }
      });
    });
  }
  //AddEventListener at click when we delete an item
  closeItemLogo() {
    const itemLogo = document.querySelectorAll(".item_logo");
    itemLogo.forEach((button) => {
      button.addEventListener("click", (e) => {
        //we remove item in html and send array and item to the remove function
        const ItemId = button.parentElement.parentElement.id;
        button.parentElement.parentElement.remove();
        this.removeItemFromArray(this.filterClickedElement, ItemId);
        //we launch searchFilter for filter again without the delete element
        let remove = true;
        this.searchFilter(remove);
      });
    });
  }
  //function for delete an element from this.filterClickedElement array
  removeItemFromArray(array, item) {
    let index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  //AddEventlisten for the search bar
  listenSearchInput() {
    this.search.addEventListener("input", (e) => {
      this.searchInputValue = e.target.value;
      this.filteredList = this.filterSearchMenu();
      this.searchFilter();
    });
  }

  //launching function
  async launchFilter(menus) {
    this.listArray = menus;
    this.listenSearchInput();
    this.listenItemInput();
    this.searchFilter();
  }
}

export default FilterSearch;
