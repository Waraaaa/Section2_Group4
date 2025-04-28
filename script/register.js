document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const username = document.getElementsByName('username')[0].value;
    const fName = document.getElementsByName('fName')[0].value;
    const lName = document.getElementsByName('lName')[0].value;
    const age = document.getElementsByName('age')[0].value;
    const tel = document.getElementsByName('tel')[0].value;
    const lineID = document.getElementsByName('lineID')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const address = document.getElementsByName('address')[0].value;
    const password = document.getElementsByName('password')[0].value;
    const confirmPassword = document.getElementsByName('confirm-password')[0].value;

    console.log({ username, fName, lName, age, tel, lineID, email, address, password });

    // Basic validation (password confirmation check)
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Prepare data to be sent to the server
    const data = {
        username,
        fName,
        lName,
        age,
        tel,
        lineID,
        email,
        password,
        address
    };

    // Send data to the backend (POST request)
    fetch('http://localhost:3030/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/login'; // Redirect to login page
        } else {
            alert("Registration failed: " + data.error);
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alert("Something went wrong, please try again later.");
    });
});
