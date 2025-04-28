// Grab the form element
const form = document.getElementById('loginForm'); // Fix here

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
        const response = await fetch('http://localhost:3030/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include' // Allow cookies
        });

        // Ensure the response is valid JSON
        if (!response.ok) {
        const errorData = await response.text();  // Get raw response as text
        throw new Error(errorData);  // Throw error with response text
        }

        const data = await response.json(); // Parse the JSON data

        if (data.success) {
        window.location.href = '/home';  // Success => go to home
        } else {
        alert(data.error || 'Login failed. Please try again.');
        }
    } catch (err) {
        console.error('Login error:', err);
        alert(err);
    }
});

// async function checkLogin() {
//     try {
//         const response = await fetch('http://localhost:3030/user-info', {
//             method: 'GET',
//             credentials: 'include' // Send cookies
//         });

//         if (response.ok) {
//             const data = await response.json();
//             const accountIcon = document.querySelector('.account-icon');
//             if (accountIcon) {
//                 accountIcon.innerHTML = `<i class="fas fa-user"></i> ${data.username}`;
//                 accountIcon.href = "#"; // Change link if you want
//             }
//         } else {
//             console.log('User not logged in.');
//         }
//     } catch (err) {
//         console.error('Error checking login:', err);
//     }
// }

// // Run when page loads
// checkLogin();