//api
import MenuApi from "../api/api.js";
//filter
/*import FilterSearch from "../filter/searchv1.js";*/
import FilterSearch from "../filter/searchv2.js";
//template
import MenuCard from "../template/menuCardTemplate.js";
import IngredientCard from "../template/ingredientCardTemplate.js";
//util
import DropDown from "../utils/dropdown.js";

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
  //Send filtred menus to DOM template
  displayMenu() {
    //deletes articles create when we launch the method
    this.menusCards.innerHTML = "";
    // Display the menus objects, send to dom display. For each menu, launch MenuCard Classn add open dom display
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

function init() {
  //launch App class and sendData method
  const app = new App();
  app.sendData();
  //launch the dropdown class
  const dropdown = new DropDown();
  dropdown.ingredientDropDown();
}

init();

export default App;
