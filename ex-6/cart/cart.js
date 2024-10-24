function loadCart() {
    // Recupera o carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Seleciona o div onde os produtos serão exibidos
    const cartProductsDiv = document.getElementById('cart-products');

    // Verifica se o carrinho está vazio
    if (cart.length === 0) {
        cartProductsDiv.innerHTML = '<p>Your cart is empty</p>';
    } else {
        // Para cada produto no carrinho, cria um elemento para exibi-lo
        cart.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('cart-product');
            productDiv.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <span>Price: $${product.price}</span>
            `;
            cartProductsDiv.appendChild(productDiv);
        });
    }
}

// Carrega o carrinho ao carregar a página
loadCart();