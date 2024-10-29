function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartProductsDiv = document.getElementById('cart-products');

    if (cart.length === 0) {
        cartProductsDiv.innerHTML = '<p>Your cart is empty</p>';
    } else {
        cart.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('cart-product');
            productDiv.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <div>
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <span>Price: $${product.price}</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
            cartProductsDiv.appendChild(productDiv);
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productIndex = this.getAttribute('data-index');
                removeFromCart(productIndex);
            });
        });
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

loadCart();