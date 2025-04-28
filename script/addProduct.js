document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addProductForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form); // Send form including file

        try {
            const response = await fetch('http://localhost:3030/addProduct', {
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            // Get raw response text
            const responseText = await response.text();
            console.log('Response:', responseText);  // Log the response for debugging

            let result;
            try {
                result = JSON.parse(responseText); // Try to parse JSON
            } catch (err) {
                console.error('Failed to parse JSON:', err); // Handle JSON parsing error
            }

            // Check if the response was successful
            if (response.ok) {
                alert('Product added successfully!');
                form.reset();
            } else {
                alert('Error adding product: ' + (result?.error || 'Unknown error'));
            }
        } catch (err) {
            console.error('Error:', err); // Catch network or other errors
            alert('Error adding product.');
        }
    });

    // Fetch categories for dropdown
    fetch('http://localhost:3030/categories', { credentials: 'include' })
    .then(res => res.json())
    .then(categories => {
        const catSelect = document.getElementById('catID');
        catSelect.innerHTML = '';  // Clear existing options
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.catID;
            option.textContent = cat.catName;
            catSelect.appendChild(option);
        });
    })
    .catch(err => {
        console.error('Error loading categories:', err);
        document.getElementById('catID').innerHTML = '<option value="">Failed to load categories</option>';
    });
});
