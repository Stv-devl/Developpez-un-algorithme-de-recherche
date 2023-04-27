//api
import MenuApi from "../api/api.js";
//filter
import FilterSearch from "../filter/searchv1.js";
/*import FilterSearch from "../filter/searchv2.js";*/
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
    this.errorMessage = document.querySelector(".error_message ");
    this.menus = [];
    this.filteredMenus = [];
    this.test = new MenuCard();
  }

  //Get data from APY, array this.menus and this.filteredMenus implemented with data.
  async sendData() {
    const { menus } = await this.dataApi.get();
    //launch the filter class
    const filtersearch = new FilterSearch();
    filtersearch.launchFilter(menus);
  }
  //We get return from filter and launch the display.
  /*launchingFiltered(filteredMenus) {
    this.filteredMenus = filteredMenus;
    this.displayMenu();
    if (!filteredMenus.length > 0) {
      this.displayErrorMessage();
    } else return;
  }*/

  ///We get return from filter and launch the display, send filtred menus to DOM template
  displayMenu(filteredMenus) {
    //implement array this.filteredMenus
    this.filteredMenus = filteredMenus;
    //deletes span created when we launch the method
    this.errorMessage.innerHTML = "";
    //deletes articles created when we launch the method
    this.menusCards.innerHTML = "";
    //display the menus objects, send to dom display. For each menu, launch MenuCard Class, open dom display
    if (!filteredMenus.length > 0) {
      this.menusCards.innerHTML = "";
      this.displayErrorMessage();
    } else {
      this.filteredMenus.forEach((menu) => {
        const menucardtemplate = new MenuCard(menu);
        this.menusCards.appendChild(menucardtemplate.displayMenuCard());
        //get all <article> with the id number, get ingredient wrapper for every <article>
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
  //display error message if no menu found
  displayErrorMessage() {
    const error = document.createElement("span");
    error.setAttribute("class", "error");
    error.textContent = `Aucune recette ne correspond à votre critère… vous pouvez
      chercher « tarte aux pommes », « poisson », etc.
      `;
    this.errorMessage.appendChild(error);
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
