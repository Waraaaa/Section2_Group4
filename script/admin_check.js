document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3030/check-admin', {
            method: 'GET',
            credentials: 'include',  // Ensure cookies are sent with the request
        });

        if (response.ok) {
            const data = await response.json();

            if (data.isAdmin) {
                // Find the <ul> element by its class or id
                const navList = document.querySelector('ul');

                // Create a new <li> element for "Product Management"
                const adminLink = document.createElement('li');
                const adminAnchor = document.createElement('a');
                adminAnchor.href = '/management';  // Link to product management
                adminAnchor.textContent = 'Product Management';
                adminLink.appendChild(adminAnchor);

                // Append the new link to the <ul>
                navList.appendChild(adminLink);
            }
        } 
    } catch (error) {
        console.warn('Error:', error);
    }
});
