fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(data => {
    console.log(data)
    const productsSection = document.getElementById('products');
    data.products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <span>Price: $${product.price}</span>
        <a href="product/product.html?id=${product.id}">View Product</a> <!-- Aqui adicionamos o link -->
    `;
        productsSection.appendChild(card);
    });
})
.catch(error => console.error('Erro ao buscar produtos:', error));