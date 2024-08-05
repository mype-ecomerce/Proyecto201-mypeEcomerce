'use strict';

const img = [
    'casacaAdidas',
    'casacaAdidasBlanca',
    'chalinaCuadros',
    'chalinaMarron',
    'chaquetaPloma',
    'chompaEstrella',
    'chompaRayas',
    'poleraNegra',
    'sacoBotones',
];

const state = {
    totalProducts: [],
};

class Products {
    constructor(name, route) {
        this.name = name;
        this.route = route;
        this.price = 200;
    }

    addToLocalStorage() {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        storedProducts.push({
            name: this.name,
            route: this.route,
            price: this.price,
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
        const div = this.createProductElement();
        fill.appendChild(div);
    }

    createProductElement() {
        const div = document.createElement('div');
        div.className = 'products';

        const imgElement = document.createElement('img');
        imgElement.src = this.route;
        imgElement.alt = this.name;
        imgElement.style.maxWidth = '50%';

        const nameText = document.createElement('p');
        nameText.textContent = this.capitalizeAndSpace(this.name);

        const priceText = document.createElement('p');
        priceText.textContent = `S/${this.price}`;

        const button = this.createBuyButton();

        div.appendChild(imgElement);
        div.appendChild(nameText);
        div.appendChild(priceText);
        div.appendChild(button);

        return div;
    }

    createBuyButton() {
        const button = document.createElement('button');
        button.textContent = 'Agregar al carrito';
        button.addEventListener('click', () => {
            this.addToLocalStorage();
        });

        return button;
    }
}

function objMaker() {
    img.forEach(imageName => {
        const product = new Products(imageName, `../img/${imageName}.png`);
        state.totalProducts.push(product);
    });
}

function renderAllProducts() {
    state.totalProducts.forEach(product => {
        product.renderImg();
    });
}
objMaker();
renderAllProducts();
