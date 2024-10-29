
function renderProducts(products) {
    const productsSection = document.getElementById('products');
    productsSection.innerHTML = ''; 

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>Price: $${product.price}</p>
            <button><a href="product/product.html?id=${product.id}">View Product</a></button>
        `;
        productsSection.appendChild(card);
    });
}

function searchProducts(query, allProducts) {
    const filteredProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase())
    );
    renderProducts(filteredProducts);
}

fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(data => {
    const allProducts = data.products;
    renderProducts(allProducts);

    document.getElementById('search').addEventListener('input', function() {
        const query = this.value;
        searchProducts(query, allProducts);
    });
})
.catch(error => console.error('Erro ao buscar produtos:', error));
