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
        const fill = document.getElementById('pasarela');
        fill.innerHTML = '';

        if (state.totalProducts.length !== 0) {
            this.attachCouponEventListeners()
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

        productDiv.appendChild(imageElement);
        separatorDiv.appendChild(nameElement);
        separatorDiv.appendChild(priceElement);
        productDiv.appendChild(separatorDiv);

        return productDiv;
    }
    attachCouponEventListeners() {
        const cuponButton = document.getElementById('cupon');
        const couponForm = document.getElementById('couponForm');
        const couponCodeInput = document.getElementById('couponCode');

        cuponButton.addEventListener('click', () => {
            couponForm.style.display = 'block';
        });

        couponForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.applyCoupon(couponCodeInput);
        });
    }

    applyCoupon(couponCodeInput) {
        const couponForm = document.getElementById('couponForm');
        const cuponButton = document.getElementById('cupon');
        const priceDisplay = document.getElementById('total');

        if (localStorage.getItem('couponUsed') === 'true') {
            alert('Coupon has already been used.');
            cuponButton.style.display = 'block';
            return;
        }

        const couponCode = couponCodeInput.value.trim();
        const discount = 0.20;
        let total = this.calculateTotal();

        if (couponCode === 'Ecommerce') {
            const discountAmount = total * discount;
            total -= discountAmount;
            priceDisplay.textContent = `S/${total.toFixed(2)}`;
            localStorage.setItem('couponUsed', 'true');
        }
        couponForm.style.display = 'none';
        couponCodeInput.value = '';
        cuponButton.style.display = 'block';
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

renderStoredProducts()
document.getElementById('userInfoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const direccion = document.getElementById('direccion').value;
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const idType = document.getElementById('idType').value;
    const documento = document.getElementById('documento').value;
    const celular = document.getElementById('celular').value;
    const formData = `Dirección: ${direccion}\nNombres: ${nombres}\nApellidos: ${apellidos}\nTipo de documento: ${idType}\nNúmero de documento: ${documento}\nCelular: ${celular}`;
    const cartItems = state.totalProducts;
    if (cartItems.length === 0) {
        alert('El carrito está vacío.');
        return;
    }
    const cartData = cartItems.map(product => `${product.name}`).join('\n');
    const couponUsed = localStorage.getItem('couponUsed') === 'true' ? 'Sí' : 'No';
    const couponInfo = `Cupón utilizado: ${couponUsed}`
    const message = `${formData}\n\nProductos*:\n${cartData}\n\n${couponInfo}`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '+51979771933';
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
});