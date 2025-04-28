// cart.js

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

function loadCart() {
    fetch('http://localhost:3030/cart', {
        credentials: 'include'
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to load cart items');
        }
        return res.json();
    })
    .then(data => {
        displayCartItems(data);
    })
    .catch(err => {
        console.error('Error loading cart:', err);
        const cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '<p>Unable to load your cart. Please try again later.</p>';
    });
}

function displayCartItems(items) {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    if (items.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty!</p>';
        return;
    }

    let total = 0;

    items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="/${item.imgpath}" alt="${item.pName}" class="cart-item-img">
            <div class="cart-item-details">
                <h3>${item.pName}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: $${itemTotal.toFixed(2)}</p>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    const totalElement = document.createElement('div');
    totalElement.classList.add('cart-total');
    totalElement.innerHTML = `<h2>Cart Total: $${total.toFixed(2)}</h2>`;
    cartItems.appendChild(totalElement);
}
