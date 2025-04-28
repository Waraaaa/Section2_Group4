document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelector('.add-to-cart-btn');

    if (addToCartButton) {
        const url = window.location.href;
        const SKU = url.split('/').pop(); // take SKU00001

        addToCartButton.setAttribute('data-sku', SKU); // Set data-sku dynamically

        addToCartButton.addEventListener('click', () => {
            fetch('http://localhost:3030/cart/add', {
                method: 'POST',
                credentials: 'include', // Send cookies (userId)
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ SKU })
            })
            .then(res => res.json())
            .then(data => {
                alert(data.message || 'Added to cart!');
            })
            .catch(err => {
                console.error('Error adding to cart:', err);
            });
        });
    }
});
