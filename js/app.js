'use strict'

const img=[`abrigo`,`casacaNegra`,`casacaRoja`,`chalinas`,`chaqueta`,`cuero`,`motociclista`,`pelusa`,`sacoLargo`]
const state = {
    totalProducts: [],
};
class Products {
    constructor(name, route) {
        this.name = name;
        this.route = route;
        this.price = `S/200`;
    }
    addToLocalStorage() {
        let storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        storedProducts.push({
            name: this.name,
            route: this.route,
            price: this.price
        });
        localStorage.setItem('products', JSON.stringify(storedProducts));
    }
    capitalizeAndSpace(str) {
        return str
            .replace(/([A-Z])/g, ' $1') 
            .replace(/^./, (match) => match.toUpperCase()); 
    }
    renderImg() {
        const fill = document.getElementById('main');
        const div = document.createElement('div');
        div.className = 'products';

        const imgElement = document.createElement('img');
        imgElement.src = this.route;
        imgElement.alt = this.name;
        imgElement.style.maxWidth = '30%';

        const nameText = document.createElement('p');
        nameText.textContent = this.capitalizeAndSpace(this.name);

        const priceText = document.createElement('p');
        priceText.textContent = this.price;

        const button = document.createElement('button');
        button.textContent = 'Buy Now';
        button.addEventListener('click', () => {
            this.addToLocalStorage();
        });

        div.appendChild(imgElement);
        div.appendChild(nameText);
        div.appendChild(priceText);
        div.appendChild(button);
        fill.appendChild(div);
    }
}
function objMaker() {
        for (let i = 0; i < img.length; i++) {
            let product = new Products(img[i], `../img/img_${img[i]}.png`);
            state.totalProducts.push(product);
        }
}
function renderAllProducts() {
    for (let i = 0; i < state.totalProducts.length; i++) {
        state.totalProducts[i].renderImg();
    }
}
objMaker()
renderAllProducts() 


