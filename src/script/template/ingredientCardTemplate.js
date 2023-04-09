class IngredientCard {
  constructor(data) {
    this.data = data;
  }

  displayIngredients() {
    const ingredientListWrapper = document.createElement("div");
    ingredientListWrapper.setAttribute("class", "ingredient_list_wrapper");
    const ingredientDisplay = document.createElement("p");
    ingredientDisplay.setAttribute("class", "ingredients");
    const bold = document.createElement("span");
    bold.setAttribute("class", "bold");
    bold.innerHTML += `${this.data.ingredient}`;
    ingredientDisplay.appendChild(bold);
    //if quantity not undefined const = this.data.quantity else empty
    const quantityDisplay =
      this.data.quantity != undefined ? `${this.data.quantity}` : "";
    //if unit not undefined const = this.data.unit else empty
    const unitDisplay = this.data.unit != undefined ? `${this.data.unit}` : "";
    //display quantityDisplay & unitDisplay in dom
    ingredientDisplay.innerHTML += `: ${quantityDisplay}${unitDisplay}`;
    ingredientListWrapper.appendChild(ingredientDisplay);
    return ingredientListWrapper;
  }
}

export default IngredientCard;
