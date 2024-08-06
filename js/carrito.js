'use strict';

const state = {
    totalProducts: [],
};

class Products {
    constructor(name, route, price) {
        this.name = name;
        this.route = route;
        this.price = Number(price);
    }

    capitalizeAndSpace(str) {
        return str
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (match) => match.toUpperCase());
    }

    renderBoughtProducts() {
        const fill = document.getElementById('carrito');
        fill.innerHTML = '';

        if (state.totalProducts.length !== 0) {
            this.renderProducts(fill);
        } else {
            this.renderEmptyCartMessage(fill);
        }
    }

    renderProducts(fill) {
        state.totalProducts.forEach(product => {
            const productDiv = this.createProductElement(product);
            fill.appendChild(productDiv);
        });

        this.updateTotalPrice();
    }

    createProductElement(product) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const separatorDiv = document.createElement('div');
        separatorDiv.classList.add('separator');

        const nameElement = document.createElement('h3');
        nameElement.textContent = this.capitalizeAndSpace(product.name);

        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: ${product.price}`;

        const imageElement = document.createElement('img');
        imageElement.src = product.route;
        imageElement.alt = product.name;

        const buttonElement = document.createElement('button');
        buttonElement.textContent = 'Quitar del carrito';
        buttonElement.addEventListener('click', () => {
            this.removeProduct(product);
            this.renderBoughtProducts();
        });

        productDiv.appendChild(imageElement);
        separatorDiv.appendChild(nameElement);
        separatorDiv.appendChild(priceElement);
        separatorDiv.appendChild(buttonElement);
        productDiv.appendChild(separatorDiv);

        return productDiv;
    }

    renderEmptyCartMessage(fill) {
        const emptyMessage = document.createElement('div');
        emptyMessage.classList.add('empty');

        const messageHeader = document.createElement('h2');
        messageHeader.textContent = 'Tu Carrito esta vacío!?!';

        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = 'Accede a nuestro catalogo para agregar productos';

        const catalogLink = document.createElement('a');
        catalogLink.href = './catalogo.html';
        catalogLink.textContent = 'Catalogo';

        emptyMessage.appendChild(messageHeader);
        emptyMessage.appendChild(messageParagraph);
        emptyMessage.appendChild(catalogLink);
        fill.appendChild(emptyMessage);

        this.updateTotalPrice();
    }

    calculateTotal() {
        return state.totalProducts.reduce(function(total, product) {
            return total + product.price;
        }, 0);
    }

    updateTotalPrice() {
        const priceDisplay = document.getElementById('total');
        const total = this.calculateTotal();
        priceDisplay.textContent = `S/${total.toFixed(2)}`;
    }

    removeProduct(productToRemove) {
        state.totalProducts = state.totalProducts.filter(product => product !== productToRemove);
        localStorage.setItem('products', JSON.stringify(state.totalProducts));
        this.updateTotalPrice();
    }
}

function renderStoredProducts() {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    storedProducts.forEach(product => {
        if (product.name && product.route && product.price) {
            const storedProduct = new Products(product.name, product.route, product.price);
            state.totalProducts.push(storedProduct);
        }
    });

    const productInstance = new Products();
    productInstance.renderBoughtProducts();
}

renderStoredProducts();