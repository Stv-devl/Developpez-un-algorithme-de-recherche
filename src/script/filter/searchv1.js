//index
import App from "../page/index.js";
//template
import DropDownCard from "../template/dropDownCardTemplate.js";

class FilterSearch {
  constructor() {
    this.search = document.getElementById("search");
    this.listArray = []; //array with the list of menus from Api
    this.filteredList = []; //array with the filtered list of menus
    this.filterClickedElement = []; //array with clicked tag inside
    this.ingredientList = []; //array for ingredient tag
    this.deviceList = []; //array for device tag
    this.ustensilList = []; //array for ustensil tag
    this.itemInputValue = ""; //to save the 3 tags inputs
    this.searchInputValue = ""; //to save search input data
    this.itemChoice; //for selected the input user is writing
    this.app = new App(); //activate App class from index.js
    this.dropdowncard = new DropDownCard(); //activate DropDownCard class from template
  }
  //This method is used to manage filters of the search bar, tag inputs, search on click on Tag...etc.
  searchFilter() {
    //if have something write in the tag input
    if (this.itemInputValue.length >= 1) {
      this.launchTheTagInputFilter(); //tag input filter
    }
    //if have something write in the tag input and in the search bar
    if (this.itemInputValue.length >= 1 && this.searchInputValue.length >= 1) {
      this.launchThisFilteredFilter(); //this.filteredList array filter
      this.launchTheTagInputFilter(); //tags input filter
    }
    //if have a tag clicked and nothing is write int the items inputs
    if (
      this.filterClickedElement.length > 0 &&
      this.itemInputValue.length === 0
    ) {
      this.filteredWitchClickedArray(); //we filter with the clicked tags
      this.launchThisFilteredFilter(); //this.filteredList array filter
    }
    //if more than 3 elements in input search and nothing is write in the input tags
    if (this.searchInputValue.length >= 3 && this.itemInputValue.length === 0) {
      this.launchThisFilteredFilter(); //this.filteredList array filter
    }
    //if nothing is written in the input search & items & nothing is clicked we will display the tags array and menus with all element in the dom
    if (
      this.itemInputValue.length === 0 &&
      this.search.value.length === 0 &&
      this.filterClickedElement.length === 0
    ) {
      this.filteredList = this.listArray;
      this.launchThisFilteredFilter(); //this.filteredList array filter
    }
  }

  //method to launch the principal filter with this.filteredArray
  launchThisFilteredFilter() {
    this.launchTagArrays(); //method to filter the 3 tags array with this.filteredList
    this.launchElementListDisplay(); //display the 3 tags array
    this.launchDisplayMenu(); //method to send in the dom the menu list
    this.addEventListenerClickedItem(); //listen the addeventlistener
  }
  //method to filter tags with inputs, here we dont register anything in this.filteredList
  launchTheTagInputFilter() {
    this.filterWithItemInput(); //we filter the tags array with the the input value
    this.launchElementListDisplay(); //we display the new tags array
    this.addEventListenerClickedItem(); //we listen the addeventlisteners on click
  }
  //launch the 3 tags arrays filter
  launchTagArrays() {
    this.filteredMenusIngredient();
    this.filteredMenusDevice();
    this.filteredMenusUstensil();
  }
  //launch the display of tag array in the dom
  launchElementListDisplay() {
    this.dropdowncard.elementListDisplay(
      this.ingredientList,
      this.deviceList,
      this.ustensilList
    );
  }
  //launch the display of menus in the dom
  launchDisplayMenu() {
    this.app.displayMenu(this.filteredList);
  }
  //launch the addEventListener listenClickOnList() & closeItemLogo()
  addEventListenerClickedItem() {
    this.listenClickOnList();
    this.closeItemLogo();
  }

  //V1 FILTER SEARCH//
  //When we do search in the search bar. ListArray (the list of 50 menus) is filtered with the input result. we will filter every part of array who have text.
  filterSearchMenu() {
    //if user write uppercase in input it will become lowercase
    const inputResult = this.searchInputValue.toLowerCase();
    //filter description, appliance, name, ustensils, ingredients with inputResult
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
  //if have more than 3 characters or filterClickedElement array is not empty. we filter the result of filterSearchMenu(). Else, if have nothing in the search input. Send to elementFilter()
  filteredWitchClickedArray() {
    //every for read if have more than 1 element in the array
    if (
      this.searchInputValue.length >= 3 ||
      this.filterClickedElement.length > 1
    ) {
      this.filteredList = this.filterSearchMenu().filter((el) =>
        this.filterClickedElement.every((filterEl) =>
          this.elementFilter(el, filterEl)
        )
      );
    } else {
      this.filteredList = this.listArray.filter((el) =>
        this.filterClickedElement.some((filterEl) =>
          this.elementFilter(el, filterEl)
        )
      );
    }
  }
  //methode for finish the filter without repeat 2 times
  elementFilter(el, filterEl) {
    return (
      filterEl.toLowerCase().includes(el.appliance.toLowerCase()) ||
      el.ustensils.some((element) =>
        filterEl.toLowerCase().includes(element.toLowerCase())
      ) ||
      el.ingredients.some((ingr) =>
        filterEl.toLowerCase().includes(ingr.ingredient.toLowerCase())
      )
    );
  }

  //filter item dropwdown elements when we write in the input the tags element will be filtered
  filterWithItemInput() {
    const inputResult = this.itemInputValue.toLowerCase();

    switch (this.itemChoice) {
      case "ingredient":
        //filter the secondary array this.ingredientList with the input value
        this.ingredientList = this.ingredientList.filter((el) =>
          el.toLowerCase().includes(inputResult)
        );
        break;
      case "device":
        //filter the secondary array this.deviceList with the input value
        this.deviceList = this.deviceList.filter((el) =>
          el.toLowerCase().includes(inputResult)
        );
        break;
      case "ustensil":
        //filter the secondary array this.ustensilList with the input value
        this.ustensilList = this.ustensilList.filter((el) =>
          el.toLowerCase().includes(inputResult)
        );
        break;
    }
  }
  //Create a secondary array for ingredient.Flatmap will take all ingredients and put them in the same array. Filter will delete all element who is write more than 1 time. Sort in alphabetical order
  filteredMenusIngredient() {
    this.ingredientList = this.filteredList //we use this.filteredList for keep only filtered elements
      .flatMap((data) => data.ingredients.flatMap((ing) => ing.ingredient))
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b));
    return this.ingredientList;
  }
  //Create a secondary array for device. Map will take all devices. Filter will delete all element who is write more than 1 time. Sort in alphabetical order
  filteredMenusDevice() {
    this.deviceList = this.filteredList //we use this.filteredList for keep only filtered elements
      .map((data) => data.appliance)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b));
    return this.deviceList;
  }
  //Create a secondary array for ingredient.Flatmap will take all ingredients and put them in the same array. Filter will delete all element who is write more than 1 time. Sort in alphabetical order
  filteredMenusUstensil() {
    this.ustensilList = this.filteredList //we use this.filteredList for keep only filtered elements
      .flatMap((data) => data.ustensils)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b));
    return this.ustensilList;
  }

  //addeventlistener for get the tag inputs, when we write in a input the 2 we empty the 2 others one. We add the value to the itemChoice variable
  listenItemInput() {
    inputIngredient.addEventListener("input", (e) => {
      this.itemInputValue = e.target.value;
      inputDevice.value = "";
      inputUstensil.value = "";
      this.itemChoice = "ingredient";
      this.searchFilter();
    });
    inputDevice.addEventListener("input", (e) => {
      this.itemInputValue = e.target.value;
      inputIngredient.value = "";
      inputUstensil.value = "";
      this.itemChoice = "device";
      this.searchFilter();
    });
    inputUstensil.addEventListener("input", (e) => {
      this.itemInputValue = e.target.value;
      inputIngredient.value = "";
      inputDevice.value = "";
      this.itemChoice = "ustensil";
      this.searchFilter();
    });
  }

  //AddEventListener at click on element from tag list. We create item who is the textcontent of the tag. If the array this.filterClickedElement dont include already the item textcontent so we will push the item in the array. We launch the method who show the selected items on the dom. We launch the searchFilter() method for filter the filteredList array with the selected item.
  listenClickOnList() {
    const dropdownItem = document.querySelectorAll(".dropdown_item");
    const dropdownInput = document.querySelectorAll(".dropdown_input");

    dropdownItem.forEach((button) => {
      button.addEventListener("click", (e) => {
        //get id of parentelement of clicked item (so the <ul>) and get textcontent of clicked element
        const getUlId = button.parentElement.id;
        const item = e.target.textContent;
        //deletes inputs values when we click
        dropdownInput.forEach((input) => {
          input.value = "";
          this.itemInputValue = input.value;
        });
        //send to the dom
        if (!this.filterClickedElement.includes(item)) {
          this.filterClickedElement.push(item);
          this.dropdowncard.displayClickedElement(
            item,
            getUlId,
            this.ingredientList,
            this.deviceList,
            this.ustensilList
          );
          //send to filter
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
        //we remove item in html and send array and item to the remove method. ItemValue will be the tag textcontent from the array
        const ItemValue = button.parentElement.children[0].textContent;
        button.parentElement.remove();
        this.removeItemFromArray(this.filterClickedElement, ItemValue);
        this.filteredWitchClickedArray();
        this.searchFilter();
      });
    });
  }
  //methode for delete an element from this.filterClickedElement array
  removeItemFromArray(array, item) {
    let index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
  //AddEventlisten for the search bar. We save the input value in a variable, the array this.filteredList will be = to the filter this.filterSearchMenu(); we launch search filter
  listenSearchInput() {
    this.search.addEventListener("input", (e) => {
      this.searchInputValue = e.target.value;
      this.filteredList = this.filterSearchMenu(); //filter menus
      this.searchFilter();
    });
  }

  //this methode is activate in index.js page. We get the list of 50 menus and put them in this.listArray. We launch the addEventListener on input. We launch searchFilter. Here searchFilter without anything selected will display the 50 menus and all the tags list
  async launchFilter(menus) {
    this.listArray = menus;
    this.listenSearchInput();
    this.listenItemInput();
    this.searchFilter();
  }
}

export default FilterSearch;
