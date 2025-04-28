// Function to fetch all products (without search)
function fetchProductsWithoutSearch() {
    fetch('http://localhost:3030/shop')  // Endpoint for all products
        .then(response => response.json())
        .then(products => {
            const productGrid = document.getElementById('product-grid');
            productGrid.innerHTML = '';  // Clear existing products

            // Loop through products and create HTML for each
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                
                productCard.innerHTML = `
                    <div class="product-type">${product.pType}</div>
                    <div class="product-info">
                        <p class="product-name">${product.pName}</p>
                        <p class="product-price">${product.price} $</p>
                    </div>
                    <a href="/shop/${product.SKU}" class="view-details-btn">
                        <div class="product-pic">
                            <img src="/${product.imgpath || ""}" alt="${product.pName}">
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

// Function to fetch products based on the product name search (using POST)
function fetchProducts(searchParams = {}) {
    const { productName } = searchParams;

    // Prepare the data to be sent in the body of the POST request
    const data = { productName };

    fetch('http://localhost:3030/shop/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)  // Send the search data as JSON
    })
        .then(response => response.json())
        .then(products => {
            const productGrid = document.getElementById('product-grid');
            productGrid.innerHTML = '';  // Clear existing products

            // Loop through products and create HTML for each
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                productCard.innerHTML = `
                    <div class="product-type">${product.pType}</div>
                    <div class="product-info">
                        <p class="product-name">${product.pName}</p>
                        <p class="product-price">${product.price} $</p>
                    </div>
                    <a href="/shop/${product.SKU}" class="view-details-btn">
                        <div class="product-pic">
                            <img src="/${product.mainImg || ""}" alt="${product.pName}">
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

// Function to handle the search bar "Enter" key press
function handleSearch(event) {
    if (event.key === 'Enter') {
        const productSearch = document.getElementById('product-search').value.trim();
        
        // Call the fetch function with productName
        fetchProducts({ productName: productSearch });
    }
}

// Add event listener for "Enter" key on search input field
document.getElementById('product-search').addEventListener('keypress', handleSearch);

// Call the fetchProductsWithoutSearch function when the page loads
window.onload = fetchProductsWithoutSearch;
