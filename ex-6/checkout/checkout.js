function getTotalPriceFromCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((acc, item) => acc + item.price , 0);
    return total.toFixed(2);
}

document.getElementById('total-price').textContent = `$${getTotalPriceFromCart()}`;