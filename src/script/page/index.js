//api
import MenuApi from "../api/api.js";
//filter
import FilterSearch from "../filter/searchv1.js";
//template
import MenuCard from "../template/menuCardTemplate.js";
import IngredientCard from "../template/ingredientCardTemplate.js";

class App {
  constructor() {
    //get the Api
    this.dataApi = new MenuApi("./src/data/menu.json");
    this.menusCards = document.querySelector(".menus_cards");
    this.menus = [];
    this.filteredMenus = [];
  }

  //Get data from APY, array this.menus and this.filteredMenus implemented with data.
  async sendData() {
    const { menus } = await this.dataApi.get();
    this.filteredMenus = menus;

    //launch the filter
    const filtersearch = new FilterSearch();
    filtersearch.launchFilter(menus);
  }

  //We get return from filter and launch the display.
  async launchingFiltered(filteredMenus) {
    if (filteredMenus) {
      this.filteredMenus = filteredMenus;
      this.displayMenu();
    } else return;
  }
  //Send filtred elements to DOM template
  displayMenu() {
    //deletes articles create when we launch the function
    this.menusCards.innerHTML = "";
    // Display the menus objects, send to dom display. For each menu, launch MenuCard Classn abd open dom display
    this.filteredMenus.forEach((menu) => {
      const menucardtemplate = new MenuCard(menu);
      this.menusCards.appendChild(menucardtemplate.displayMenuCard());
      // Get all <article> with the id number, get ingredient wrapper for every <article>
      const menuArticle = document.querySelector(`#card${menu.id}`);
      const ingredientWrapper = menuArticle.querySelector(
        ".ingredient_wrapper"
      );
      //for each menu.ingredients, launch the class and display the ingredients in the dom.
      menu.ingredients.forEach((ingredient) => {
        const ingredientCard = new IngredientCard(ingredient);
        ingredientWrapper.appendChild(ingredientCard.displayIngredients());
      });
    });
  }
}

//Class for open drowpdown
class DropDown {
  constructor() {
    this.buttons = document.querySelectorAll(".btn");
    this.dropdownInputs = document.querySelectorAll(".dropdown_input");
    this.ingredientLists = document.querySelectorAll(".item_list");
    this.ingredientList = document.querySelector(".dropdown_ingredient_list");
    this.deviceList = document.querySelector(".dropdown_material_list");
    this.utensilList = document.querySelector(".dropdown_utensil_list");
    this.menuList = [];
    this.itemlist;
    this.containerList;
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

//launch App class and data function
function init() {
  //launch App class and fonction
  const app = new App();
  app.sendData();
  //launch the dropdown
  const dropdown = new DropDown();
  dropdown.ingredientDropDown();
}

init();

export default App;
