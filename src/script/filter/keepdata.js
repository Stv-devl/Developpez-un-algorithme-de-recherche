//api
import MenuApi from "../api/api.js";

//Class for keep the data in array for display and the algorithme
class KeepData {
  constructor() {
    this.dataApi = new MenuApi("./src/data/menu.json");
    //keep ustensils in array
    this.ustensils = [
      "Bol",
      "Casserole",
      "Couteau",
      "Cuillère à melon",
      "Cuillère à Soupe",
      "Cuillère en bois",
      "Econome",
      "Fouet",
      "Fourchette",
      "Louche",
      "Moule",
      "Moule à gateaux",
      "Moule à tarte",
      "Moule à tartelettes (6)",
      "Passoire",
      "Plat à gratin",
      "Presse citron",
      "Râpe à fromage",
      "Rouleau à patisserie",
      "Saladier",
      "Spatule",
      "Verres",
    ];
    //keep devices in array
    this.devices = ["Cocotte minute", "Plaque de cuisson", "Poêle à frire"];
    this.ingredientsListArray = [];
    this.allElementListArray = [];
  }

  //keep ingredient in array
  async getData() {
    const { menus } = await this.dataApi.get();

    //filter ingredients
    const filterAllIngredient = menus.map((data) => data.ingredients);

    //Get an array with the list of ingredients => flatmap for get all array in 1, filter is for delete repeat elements, sort for list ingredients in alphabet order
    this.ingredientsListArray = filterAllIngredient
      .flatMap((current) => current.map((data) => data.ingredient))
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b));
  }
}
export default KeepData;
