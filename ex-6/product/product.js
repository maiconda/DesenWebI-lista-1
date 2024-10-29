function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

const productId = getProductIdFromUrl();

if (productId) {
    fetch(`https://dummyjson.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            const productDetailsDiv = document.getElementById('product-details');

            productDetailsDiv.innerHTML = `
                <div>
                <img src="${product.thumbnail}" alt="${product.title}">
                </div>
                <div>
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <span>Price: $${product.price}</span>
                <button id="add-to-cart-btn">Add to Cart</button>
                </div>
            `;

            const addToCartButton = document.getElementById('add-to-cart-btn');
                    addToCartButton.addEventListener('click', function() {
                        addToCart(product);
                    });
        })
        .catch(error => console.error('Erro ao buscar produto:', error));
} else {
    console.error('ID do produto não encontrado na URL');
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push(product);

    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Added to cart!');
}