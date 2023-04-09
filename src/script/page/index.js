//api
import MenuApi from "../api/api.js";
//template
import MenuCard from "../template/menuCardTemplate.js";
import IngredientCard from "../template/ingredientCardTemplate.js";
//utils
import DropDown from "../utils/dropdown.js";

class App {
  constructor() {
    //get the Api
    this.dataApi = new MenuApi("./src/data/menu.json");
    this.menusCards = document.querySelector(".menus_cards");
  }

  async sendData() {
    const { menus } = await this.dataApi.get();
    // Display the menus objects, send to dom display. For each menu, launch MenuCard Classn abd open dom display
    menus.forEach((menu) => {
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
  //activate the class
  const app = new App();
  const dropdown = new DropDown();
  //launch the function
  app.sendData();
  dropdown.ingredientDropDown();
}

init();
