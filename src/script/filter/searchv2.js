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
    //search with lopp for

    //send to index.js
    const app = new App();
    app.setMenuFilteredChoice(this.AllListArray, this.listArray, value);
  }

  //launching function, lauch data, listen input
  launchSearch() {
    this.getData();
    search.addEventListener("input", (e) => {
      this.filterMenu(e.target.value);
    });
  }
}

export default FilterSearch;
