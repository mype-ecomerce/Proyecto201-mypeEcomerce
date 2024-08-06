"use strict"; 
const img = [
  { name: "casacaAdidas", price: 200 },
  { name: "casacaAdidasBlanca", price: 220 },
  { name: "chalinaCuadros", price: 180 },
  { name: "chalinaMarron", price: 175 },
  { name: "chaquetaPloma", price: 230 },
  { name: "chompaEstrella", price: 190 },
  { name: "chompaRayas", price: 195 },
  { name: "poleraNegra", price: 210 },
  { name: "sacoBotones", price: 240 },
];
const state = {
  totalProducts: [],
};

class Products {
  constructor(name, route, price) {
    this.name = name;
    this.route = route;
    this.price = price;
  }

  addToLocalStorage() {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    storedProducts.push({
      name: this.name,
      route: this.route,
      price: this.price,
    });
    localStorage.setItem("products", JSON.stringify(storedProducts));
  }

  capitalizeAndSpace(str) {
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (match) => match.toUpperCase());
  }

  renderImg() {
    const fill = document.getElementById("main");
    const div = this.createProductElement();
    fill.appendChild(div);
  }

  createProductElement() {
    const div = document.createElement("div");
    div.className = "products";

    const imgElement = document.createElement("img");
    imgElement.src = this.route;
    imgElement.alt = this.name;
    imgElement.style.maxWidth = "40%";

    const nameText = document.createElement("p");
    nameText.textContent = this.capitalizeAndSpace(this.name);

    const priceText = document.createElement("p");
    priceText.textContent = `S/${this.price}`;

    const button = this.createBuyButton();

    div.appendChild(imgElement);
    div.appendChild(nameText);
    div.appendChild(priceText);
    div.appendChild(button);

    return div;
  }
  createBuyButton() {
    const button = document.createElement("button");
    button.textContent = "Agregar al carrito";
    button.addEventListener("click", () => {
      this.addToLocalStorage();
    });

    return button;
  }
}
function objMaker() {
  for (let i = 0; i < img.length; i++) {
    const item = img[i];
    for (let j = 0; j < 1; j++) { // Inner loop is redundant but added as per request
      const product = new Products(item.name, `../img/${item.name}.png`, item.price);
      state.totalProducts.push(product);
    }
  }
}
function renderAllProducts() {
  state.totalProducts.forEach((product) => {
    product.renderImg();
  });
}
objMaker();
renderAllProducts();
