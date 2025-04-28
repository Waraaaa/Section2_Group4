async function checkLogin() {
    try {
        const response = await fetch('http://localhost:3030/user-info', {
            method: 'GET',
            credentials: 'include' // Send cookies
        });

        if (response.ok) {
            const data = await response.json();
            const accountIcon = document.querySelector('.account-icon');
            if (accountIcon) {
                accountIcon.innerHTML = `<i class="fas fa-user"></i> ${data.username}`;
                accountIcon.href = "#"; // Change link if you want
            }
        } else {
            console.log('User not logged in.');
        }
    } catch (err) {
        console.error('Error checking login:', err);
    }
}

// Run when page loads
checkLogin();