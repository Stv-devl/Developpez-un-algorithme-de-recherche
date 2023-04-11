//api
import MenuApi from "../api/api.js";
//filter
import DropDown from "../filter/dropdown.js";
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

  //Get data from APY
  async sendData() {
    const { menus } = await this.dataApi.get();
    this.menus = menus;
    this.filteredMenus = menus;
    this.displayMenu();

    const filtersearch = new FilterSearch();
    filtersearch.launchFilter();
  }

  setMenuFilteredChoice(filteredMenus, menus, value) {
    if (value.length >= 3) {
      this.filteredMenus = filteredMenus;
    } else {
      this.filteredMenus = menus;
    }
    this.displayMenu();
  }

  //Send filtred elements to dom template
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
export default App;

function init() {
  //activate the class
  const app = new App();
  const dropdown = new DropDown();

  //launch the function
  app.sendData();
  dropdown.ingredientDropDown();
}

init();
