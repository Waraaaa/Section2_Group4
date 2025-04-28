
async function checkLogin() {
    try {
        const response = await fetch('http://localhost:3030/user-info', {
            method: 'GET',
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            const accountIcon = document.getElementById('accountName');
            if (accountIcon) {
                accountIcon.innerHTML = `<i class="fas fa-user"></i> ${data.username}`;
                accountIcon.href = "#";

                // 🚀 ADD THIS:
                accountIcon.addEventListener('click', (e) => {
                    e.preventDefault(); // stop link jump
                    const menu = document.getElementById('accountMenu');
                    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
                });
            }
        }
    } catch (err) {
        console.error('Error checking login:', err);
    }
}

async function logout() {
    await fetch('http://localhost:3030/logout', { method: 'POST', credentials: 'include' });
    window.location.reload();
}

async function deleteAccount() {
    if (!confirm('Are you sure you want to delete your account?')) {
        return;
    }
    await fetch('http://localhost:3030/delete-account', { method: 'DELETE', credentials: 'include' });
    window.location.href = '/register';
}

document.getElementById('logoutBtn').addEventListener('click', logout);
document.getElementById('deleteAccountBtn').addEventListener('click', deleteAccount);

// 🔥 Run on page load
checkLogin();

