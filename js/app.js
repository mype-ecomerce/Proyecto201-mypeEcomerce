"use strict";

const img = [
  { name: "busoMen", price: 129.9 },
  { name: "busoPink", price: 119.9 },
  { name: "cafarenaGuinda", price: 99.9 },
  { name: "cafarenaMen", price: 98.9 },
  { name: "cafarenaNegra", price: 97.9 },
  { name: "cafarenaOrang", price: 90.9 },
  { name: "casacaAdidas", price: 289.9 },
  { name: "casacaAdidasBlanca", price: 289.9 },
  { name: "casacaNegra", price: 179.9 },
  { name: "casacaVerde", price: 159.9 },
  { name: "chalecoGris", price: 119.9 },
  { name: "chalinaCuadros", price: 34.9 },
  { name: "chalinaMarron", price: 35.9 },
  { name: "chaquetaPloma", price: 239.9 },
  { name: "chompaEstrella", price: 149.9 },
  { name: "chompaRayas", price: 159.9 },
  { name: "drillVerde", price: 129.9 },
  { name: "gorrito", price: 19.9 },
  { name: "gorritoOrange", price: 19.9 },
  { name: "poleraNegra", price: 69.9 },
  { name: "ponchoMarron", price: 319.9 },
  { name: "ponchoPeruano", price: 439.9 },
  { name: "sacoBotones", price: 289.9 },
  { name: "zapatillasBlancas", price: 259.9 },
  { name: "zapatosInvierno", price: 249.9 }
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
    imgElement.style.maxWidth = "60%";

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
    const product = new Products(item.name, `../img/${item.name}.png`, item.price);
    state.totalProducts.push(product);
  }
}
function renderAllProducts() {
  state.totalProducts.forEach((product) => {
    product.renderImg();
  });
}
objMaker();
renderAllProducts();
