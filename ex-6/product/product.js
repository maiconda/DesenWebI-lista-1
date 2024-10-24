function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Captura o ID do produto da URL
const productId = getProductIdFromUrl();

if (productId) {
    // Faz a busca do produto específico na API
    fetch(`https://dummyjson.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            const productDetailsDiv = document.getElementById('product-details');

            // Preenche a div com os detalhes do produto
            productDetailsDiv.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <span>Price: $${product.price}</span>
                <button id="add-to-cart-btn">Add to Cart</button>
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
    // Verifica se já existe um carrinho no localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Adiciona o novo produto ao carrinho
    cart.push(product);

    // Atualiza o localStorage com o carrinho atualizado
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Produto adicionado ao carrinho!');
}