function fetchProducts() {
    fetch('http://localhost:3030/management')  // Adjust the URL to your server's endpoint
        .then(response => response.json())
        .then(products => {
            const productGrid = document.getElementById('product-grid');
            productGrid.innerHTML = '';  // Clear existing products

            // Loop through products and create HTML for each
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                productCard.innerHTML = `
                <div class="product-type">${product.type}</div>
                    <div class="product-info">
                        <p class="product-name">${product.pName}</p>
                        <p class="product-price">${product.price} $</p>
                    </div>
                <a href="/management/${product.SKU}" class="view-details-btn">
                    <div class="product-pic">
                        <img src="${product.imgpath || ""}" alt="${product.pName}">
                    </div>
                </a>
                `;

                productGrid.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

// Call the fetchProducts function when the page loads
window.onload = fetchProducts;