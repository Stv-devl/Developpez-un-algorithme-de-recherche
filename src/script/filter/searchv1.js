//api
import MenuApi from "../api/api.js";
//api
import App from "../page/index.js";

class FilterSearch {
  constructor() {
    this.dataApi = new MenuApi("./src/data/menu.json");
    this.search = document.getElementById("search");
    this.listArray = [];
    this.AllListArray = [];
  }
  async getData() {
    this.dataApi = new MenuApi("./src/data/menu.json");
    const { menus } = await this.dataApi.get();
    this.listArray = menus;
  }

  filterMenu(value) {
    //if user write uppercase in input it will become lowercase
    const inputResult = value.toLowerCase();
    //filter description, appliance, name, ustensils, ingredients
    this.AllListArray = this.listArray.filter(
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
    //send filter result to index.js
    const app = new App();
    app.setMenuFilteredChoice(this.AllListArray, this.listArray, value);
  }

  launchFilter() {
    this.getData();
    search.addEventListener("input", (e) => {
      this.filterMenu(e.target.value);
    });
  }
}

export default FilterSearch;
