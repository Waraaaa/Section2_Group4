document.addEventListener("DOMContentLoaded", function () {
  const SKU = window.location.pathname.split("/").pop(); // Get SKU from the URL
  const mainImage = document.getElementById("main-product-image");
  const nameInput = document.getElementById("pName-input");
  const priceInput = document.getElementById("price-input");
  const descInput = document.getElementById("desc-input");
  const pTypeInput = document.getElementById("pType-select");
  const stockInput = document.getElementById("stock-input");
  const categoriesSelect = document.getElementById("categories-select");

  // Fetch product details
  console.log('Fetching product with SKU:', SKU);
  fetch(`http://localhost:3030/management/${SKU}`)
  .then(response => {
      console.log('Response Status:', response.status);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse the JSON response
  })
  .then(data => {
      console.log('Product data:', data);
      if (data) {
          // Set product details in input fields
          nameInput.value = data.pName;
          priceInput.value = data.price;
          descInput.value = data.desc;
          stockInput.value = data.stock;

          // Set the main image
          mainImage.src = "/" + data.mainImg;

          // Set product type (e.g., 'Figure', 'Art Toy', etc.)
          const pTypeSelect = document.getElementById('pType-select');
          pTypeSelect.value = data.pType; // Set the current pType

          // Set categories in the dropdown
          data.categories.forEach(category => {
              const option = document.createElement('option');
              option.value = category.catID; // Use the catID for value
              option.textContent = category.catName; // Use the catName for display
              categoriesSelect.appendChild(option);
          });

          // Set the current product's categories (optional, assuming multi-select)
          // If the product has associated categories, you can set them as selected
          const selectedCategories = data.categories.map(category => category.catID);
          [...categoriesSelect.options].forEach(option => {
              if (selectedCategories.includes(parseInt(option.value))) {
                  option.selected = true;
              }
          });
      } else {
          alert("Product details not found.");
      }
  })
  .catch(error => {
      console.error("Error loading product details:", error);
      alert("Error loading product details.");
  });

  // Handle Update button click
  document.getElementById("update-btn").addEventListener("click", function () {
      const updatedProduct = {
          pName: nameInput.value,
          price: priceInput.value,
          desc: descInput.value,
          pType: pTypeInput.value,  // Use pType as a product type
          stock: stockInput.value,
          categories: [...categoriesSelect.selectedOptions].map(option => option.value)  // Get selected categories (catID)
      };

      fetch(`http://localhost:3030/management/${SKU}/update`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedProduct)
      })
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert("Product updated successfully!");
                  window.location.href = "/management";
              } else {
                  alert("Error updating product.");
              }
          })
          .catch(error => {
              console.error("Error updating product:", error);
              alert("Error updating product.");
          });
  });

  // Handle Delete button click
  document.getElementById("delete-btn").addEventListener("click", function () {
      const confirmDelete = confirm("Are you sure you want to delete this product?");
      if (confirmDelete) {
          fetch(`http://localhost:3030/management/${SKU}/delete`, {
              method: "DELETE"
          })
              .then(response => response.json())
              .then(data => {
                  if (data.success) {
                      alert("Product deleted successfully!");
                      window.location.href = "/management";
                  } else {
                      alert("Error deleting product.");
                  }
              })
              .catch(error => {
                  console.error("Error deleting product:", error);
                  alert("Error deleting product.");
              });
      }
  });
});
