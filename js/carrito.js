'use strict';

const state = {
    totalProducts: [],
};

class Products {
    constructor(name, route) {
        this.name = name;
        this.route = route;
        this.price = `S/200`;
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
            for (let i = 0; i < state.totalProducts.length; i++) {
                const product = state.totalProducts[i];
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                const nameElement = document.createElement('h3');
                nameElement.textContent = this.capitalizeAndSpace(product.name);

                const priceElement = document.createElement('p');
                priceElement.textContent = `Price: ${product.price}`;

                const imageElement = document.createElement('img');
                imageElement.src = product.route;
                imageElement.alt = product.name;

                const buttonElement = document.createElement('button');
                buttonElement.textContent = 'Remove';
                buttonElement.onclick = () => {
                    this.removeProduct(product);
                    this.renderBoughtProducts(); 
                };

                productDiv.appendChild(nameElement);
                productDiv.appendChild(priceElement);
                productDiv.appendChild(imageElement);
                productDiv.appendChild(buttonElement);

                fill.appendChild(productDiv);
            }
        }else {
            const emptyMessage = document.createElement('div');
            const messageHeader = document.createElement('h2');
            messageHeader.textContent = 'Tu Carrito esta vacio!?!';
            const messageParagraph = document.createElement('p');
            messageParagraph.textContent = 'Accede a nuestro catalogo para agregar productos';
            const catalogLink = document.createElement('a');
            catalogLink.href = './catalogo.html';
            catalogLink.textContent = 'Catalogo';

            emptyMessage.appendChild(messageHeader);
            emptyMessage.appendChild(messageParagraph);
            emptyMessage.appendChild(catalogLink);
            fill.appendChild(emptyMessage);
        }
    }

    removeProduct(productToRemove) {
        const newTotalProducts = [];
        for (let i = 0; i < state.totalProducts.length; i++) {
            if (state.totalProducts[i] !== productToRemove) {
                newTotalProducts.push(state.totalProducts[i]);
            }
        }
        state.totalProducts = newTotalProducts;
        localStorage.setItem('products', JSON.stringify(state.totalProducts));
    }
}

function renderStoredProducts() {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    for (let i = 0; i < storedProducts.length; i++) {
        const product = storedProducts[i];
        const storedProduct = new Products(product.name, product.route);
        storedProduct.price = product.price;
        state.totalProducts.push(storedProduct);
    }

    const productInstance = new Products();
    productInstance.renderBoughtProducts();
}

renderStoredProducts();
console.log(state.totalProducts);