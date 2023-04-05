//api
import menuApi from "../api/api.js";

class App {
  constructor() {
    //get the Api
    this.dataApi = new menuApi("./src/data/menu.json");
  }
  async displayData() {
    const menuListData = await this.dataApi.get();
    console.log(menuListData);
  }
}

const appModel = new App();

//init function for launch the class function
function init() {
  appModel.displayData();
}

init();
