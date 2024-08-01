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
            const priceDisplay = document.getElementById('total');
            let total = 0;
            for (let i = 0; i < state.totalProducts.length; i++) {
                total += state.totalProducts[i].price;
                const product = state.totalProducts[i];
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
                buttonElement.textContent = 'Remove';
                buttonElement.addEventListener('click', () => {
                    this.removeProduct(product);
                    this.renderBoughtProducts();
                });
                productDiv.appendChild(imageElement);
                separatorDiv.appendChild(nameElement);
                separatorDiv.appendChild(priceElement);
                separatorDiv.appendChild(buttonElement);
                productDiv.appendChild(separatorDiv);
                fill.appendChild(productDiv);
                priceDisplay.textContent = `S/${total}`;
            }
            const cuponButton = document.getElementById('cupon');
            const couponForm = document.getElementById('couponForm');
            const couponCodeInput = document.getElementById('couponCode');
            cuponButton.addEventListener('click', () => {
                cuponButton.style.display = 'none';
                couponForm.style.display = 'block';
            });
            couponForm.addEventListener('submit', (event) => {
                event.preventDefault();
                if (localStorage.getItem('couponUsed') === 'true') {
                    alert('Coupon has already been used.');
                    couponForm.style.display = 'none';
                    cuponButton.style.display = 'block';
                    return;
                }
                const couponCode = couponCodeInput.value.trim();
                const discount = 0.20;
                if (couponCode === 'Ecommerce') {
                    const discountAmount = total * discount;
                    total -= discountAmount;
                    priceDisplay.textContent = `S/${total.toFixed(2)}`;
                    localStorage.setItem('couponUsed', 'true');
                    alert('Coupon applied successfully.');
                } else {
                    alert('Invalid coupon code.');
                }
                couponForm.style.display = 'none';
                couponCodeInput.value = '';
                cuponButton.style.display = 'block';
            });
        } else {
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
            const priceDisplay = document.getElementById('total');
            let total = 0;
            for (let i = 0; i < state.totalProducts.length; i++) {
                total += state.totalProducts[i].price;
            }
            priceDisplay.innerHTML = '';
            priceDisplay.textContent = `S/${total}`;
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
        if (product.name && product.route && product.price) {
            const storedProduct = new Products(product.name, product.route, product.price);
            state.totalProducts.push(storedProduct);
        }
    }
    const productInstance = new Products();
    productInstance.renderBoughtProducts();
}
renderStoredProducts();