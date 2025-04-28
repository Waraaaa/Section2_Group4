document.addEventListener("DOMContentLoaded", function () {
    // Fetch categories from the database and populate the dropdown
    fetch('http://localhost:3030/categories')  // This is the API endpoint for categories
        .then(response => response.json())
        .then(categories => {
            const categorySelect = document.getElementById("category");
            
            // Clear existing options
            categorySelect.innerHTML = '';

            // Add a default "Select a category" option
            const defaultOption = document.createElement("option");
            defaultOption.textContent = "Select a category";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            categorySelect.appendChild(defaultOption);

            const NullOption = document.createElement("option");
            NullOption.textContent = "";
            NullOption.value = null;
            categorySelect.appendChild(NullOption);

            // Add each category as an option
            categories.forEach(category => {
                const option = document.createElement("option");
                option.value = category.catName;  // Assuming catName is what you want to send
                option.textContent = category.catName;  // Display category name
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
        });

    // Form submission event
    document.getElementById("advancedSearchForm").addEventListener("submit", function (event) {
        event.preventDefault();  // Prevent form submission and page refresh

        // Get the values from the form inputs
        const productName = document.getElementById("productName").value.trim();
        const category = document.getElementById("category").value;
        const ptype = document.getElementById("pType").value;  // Ensure correct ID for pType

        // Prepare data to send in the POST request
        const requestData = {};

        // Only add productName if it's not empty
        if (productName) {
            requestData.productName = productName;
        }

        // Only add category if it's not the default option
        if (category && category !== "Select a category") {
            requestData.category = category;
        }

        // Only add ptype if it's not the default "None" value or empty string
        if (ptype && ptype !== "null" && ptype !== "") {
            requestData.ptype = ptype;
        }

        console.log(requestData);

        // Perform the search
        searchProducts(requestData);
    });
});

function searchProducts(data) {
    console.log("Sending search request with data:", data);  // Debugging line
    fetch('http://localhost:3030/shop/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response data:", data);  // Debugging line
        updateProductGrid(data);  // Assuming you have a function to update the product grid
    })
    .catch(error => {
        console.error("Error searching products:", error);
    });
}

function updateProductGrid(products) {
    const productGrid = document.getElementById("product-grid");
    productGrid.innerHTML = "";  // Clear existing products

    if (!Array.isArray(products) || products.length === 0) {
        productGrid.innerHTML = "<p>No products found</p>";
        return;
    }

    // Add products to the grid
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        // Get the categories for the product (assuming it comes as an array of categories)
        const categories = product.categories || []; // Assuming categories is an array in your product data
        const categoryNames = categories.map(category => category.catName).join(", ");  // Join all category names

        productCard.innerHTML = `
            <div class="product-categories">${categoryNames}</div>
            <div class="product-info">
                <p class="product-name">${product.pName}</p>
                <p class="product-price">${product.price} $</p>
            </div>
            <a href="/shop/${product.SKU}" class="view-details-btn">
                <div class="product-pic">
                    <img src="/${product.mainImg || "default.png"}" alt="${product.pName}">
                </div>
            </a>
        `;
        productGrid.appendChild(productCard);
    });
}
