class MenuCard {
  constructor(data) {
    this.data = data;
  }
  //display menu card (without the list of ingredients)
  displayMenuCard() {
    //html elements
    const article = document.createElement("article");
    article.setAttribute("id", `card${this.data.id}`);
    const futurPicture = document.createElement("div");
    futurPicture.setAttribute("class", "futur_picture");
    //receipt_container
    const receiptContainer = document.createElement("div");
    receiptContainer.setAttribute("class", "receipt_container");
    //title_wrapper
    const titleWrapper = document.createElement("div");
    titleWrapper.setAttribute("class", "title_wrapper");
    const title = document.createElement("h2");
    title.textContent = this.data.name;
    const timeWrapper = document.createElement("div");
    timeWrapper.setAttribute("class", "time_wrapper");
    const timeIcone = document.createElement("i");
    timeIcone.setAttribute("class", "fa-regular fa-clock");
    const timeDisplay = document.createElement("p");
    timeDisplay.setAttribute("class", "time_display");
    timeDisplay.textContent = this.data.time;
    //receipt_wrapper
    const receiptWrapper = document.createElement("div");
    receiptWrapper.setAttribute("class", "receipt_wrapper");
    //ingredient_wrapper
    const ingredientWrapper = document.createElement("div");
    ingredientWrapper.setAttribute("class", "ingredient_wrapper");
    //menu_description
    const menuDescription = document.createElement("p");
    menuDescription.setAttribute("class", "menu_description");
    menuDescription.textContent = this.data.description;
    //appendChild
    timeWrapper.appendChild(timeDisplay);
    timeWrapper.appendChild(timeIcone);
    titleWrapper.appendChild(title);
    titleWrapper.appendChild(timeWrapper);
    receiptWrapper.appendChild(ingredientWrapper);
    receiptWrapper.appendChild(menuDescription);
    receiptContainer.appendChild(titleWrapper);
    receiptContainer.appendChild(receiptWrapper);
    article.appendChild(futurPicture);
    article.appendChild(receiptContainer);
    return article;
  }
}

export default MenuCard;
