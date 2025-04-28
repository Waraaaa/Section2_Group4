document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('customize-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('http://localhost:3030/customize', {
                method: 'POST',
                credentials: 'include', // Send cookies (important for createdBy)
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                alert('Customization request submitted successfully!');
                form.reset(); // Clear form
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('An error occurred. Please try again.');
        }
    });
});
